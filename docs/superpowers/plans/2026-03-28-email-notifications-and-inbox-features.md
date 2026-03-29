# Email Notifications & Inbox Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement email notifications for events, meetings, amenity bookings, and inbox messages. Add meeting attendance tracking, strata-wide inbox blast, and a global strata inbox email setting.

**Architecture:** Extend the existing Resend-based email system (`utils/sendEmail.ts`) with a notification dispatch layer. Add database tables for meeting attendees and user notification preferences. Notifications are sent at action time (event creation, message send, etc.) — no background job queue needed. A new `sendNotification` utility wraps `sendEmail` with preference checks and the strata plan's `enableEmailNotifications` gate.

**Tech Stack:** Next.js 15 server actions, Kysely/D1, Resend API, Vanilla Extract

---

## File Structure

### New Files

| File                                          | Responsibility                                    |
| --------------------------------------------- | ------------------------------------------------- |
| `migrations/033_meeting_attendees.sql`        | Meeting attendees table                           |
| `migrations/034_notification_preferences.sql` | User event notification pref + strata inbox email |
| `migrations/035_inbox_blast_permission.sql`   | Add `inbox_blasts` scope to permissions           |
| `data/meetings/listMeetingAttendees.ts`       | Query attendees for a meeting                     |
| `data/meetings/addMeetingAttendee.ts`         | Add attendee to meeting                           |
| `data/meetings/removeMeetingAttendee.ts`      | Remove attendee from meeting                      |
| `data/meetings/updateMeetingAttendee.ts`      | Update attendance confirmation                    |
| `utils/notifications.ts`                      | `sendNotification()` — checks prefs, sends email  |
| `components/MeetingAttendees/index.tsx`       | Attendee list + add/remove UI                     |
| `components/MeetingAttendees/style.css.ts`    | Styles                                            |

### Modified Files

| File                                                        | Change                                                                                                               |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `data/index.ts`                                             | Add `MeetingAttendeesTable` type, add `notifyEvents` to `StrataMembershipsTable`, add `inboxEmail` to `StratasTable` |
| `data/users/permissions.ts`                                 | Add `inbox_blasts` scope                                                                                             |
| `app/@app/dashboard/meetings/actions.ts`                    | Send notifications to attendees on meeting create/update                                                             |
| `app/@app/dashboard/meetings/[meetingId]/MeetingLayout.tsx` | Render `MeetingAttendees` component                                                                                  |
| `app/@app/dashboard/calendar/[...segments]/actions.ts`      | Send event notifications on create                                                                                   |
| `app/@app/dashboard/amenities/actions.ts`                   | Send booking notifications                                                                                           |
| `app/@app/dashboard/inbox/actions.ts`                       | Send participant notifications + blast action                                                                        |
| `app/@app/dashboard/inbox/page.tsx`                         | Add blast button for authorized users                                                                                |
| `app/@app/dashboard/settings/SettingsPage.tsx`              | Add strata inbox email field                                                                                         |
| `app/@app/actions.ts`                                       | Add `updateStrataAction` to handle new field                                                                         |
| `app/@marketing/(marketing)/profile/UpdateProfileForm.tsx`  | Add event notification toggle                                                                                        |
| `app/@marketing/(marketing)/profile/actions.ts`             | Handle notification pref update                                                                                      |
| `data/memberships/getStrataMembership.ts`                   | Include `notifyEvents` in query                                                                                      |

---

## Task 1: Database Migrations

**Files:**

- Create: `migrations/033_meeting_attendees.sql`
- Create: `migrations/034_notification_preferences.sql`

- [ ] **Step 1: Create meeting attendees migration**

```sql
-- migrations/033_meeting_attendees.sql
CREATE TABLE meeting_attendees (
    meetingId TEXT NOT NULL,
    userId TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'invited',
    respondedAt INTEGER,
    PRIMARY KEY (meetingId, userId),
    FOREIGN KEY (meetingId) REFERENCES meetings(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

`status` is one of: `"invited"`, `"confirmed"`, `"declined"`.

- [ ] **Step 2: Create notification preferences migration**

```sql
-- migrations/034_notification_preferences.sql
ALTER TABLE strata_memberships ADD COLUMN notifyEvents INTEGER NOT NULL DEFAULT 0;
ALTER TABLE stratas ADD COLUMN inboxEmail TEXT;
```

`notifyEvents` — per-member toggle for event email reminders.
`inboxEmail` — strata-level catch-all inbox email that receives all inbox message notifications.

- [ ] **Step 3: Commit**

```bash
git add migrations/033_meeting_attendees.sql migrations/034_notification_preferences.sql
git commit -m "feat: add meeting attendees and notification preferences migrations"
```

---

## Task 2: Update Database Types

**Files:**

- Modify: `data/index.ts`

- [ ] **Step 1: Add MeetingAttendeesTable and update existing types**

Add to `data/index.ts` after the `MeetingMinutesTable` type block:

```typescript
export interface MeetingAttendeesTable {
  meetingId: ColumnType<string, string, never>;
  userId: ColumnType<string, string, never>;
  status: ColumnType<
    "invited" | "confirmed" | "declined",
    "invited" | "confirmed" | "declined" | undefined,
    "invited" | "confirmed" | "declined"
  >;
  respondedAt: ColumnType<
    number | null,
    number | null | undefined,
    number | null
  >;
}

export type MeetingAttendee = Selectable<MeetingAttendeesTable>;
export type NewMeetingAttendee = Insertable<MeetingAttendeesTable>;
export type MeetingAttendeeUpdate = Updateable<MeetingAttendeesTable>;
```

Add `meeting_attendees: MeetingAttendeesTable` to the `Database` interface.

Add `notifyEvents` to `StrataMembershipsTable`:

```typescript
notifyEvents: ColumnType<0 | 1, 0 | 1 | undefined, 0 | 1>;
```

Add `inboxEmail` to `StratasTable`:

```typescript
inboxEmail: string | null;
```

- [ ] **Step 2: Commit**

```bash
git add data/index.ts
git commit -m "feat: add meeting attendees and notification preference types"
```

---

## Task 3: Meeting Attendee Data Layer

**Files:**

- Create: `data/meetings/listMeetingAttendees.ts`
- Create: `data/meetings/addMeetingAttendee.ts`
- Create: `data/meetings/removeMeetingAttendee.ts`
- Create: `data/meetings/updateMeetingAttendee.ts`

- [ ] **Step 1: Create listMeetingAttendees**

```typescript
// data/meetings/listMeetingAttendees.ts
import { db } from "..";

export function listMeetingAttendees(meetingId: string) {
  return db()
    .selectFrom("meeting_attendees")
    .innerJoin("users", "users.id", "meeting_attendees.userId")
    .select([
      "meeting_attendees.meetingId",
      "meeting_attendees.userId",
      "meeting_attendees.status",
      "meeting_attendees.respondedAt",
      "users.name",
      "users.email",
    ])
    .where("meeting_attendees.meetingId", "=", meetingId)
    .execute();
}

export type MeetingAttendeeWithUser = Awaited<
  ReturnType<typeof listMeetingAttendees>
>[number];
```

- [ ] **Step 2: Create addMeetingAttendee**

```typescript
// data/meetings/addMeetingAttendee.ts
import { db } from "..";

export function addMeetingAttendee(meetingId: string, userId: string) {
  return db()
    .insertInto("meeting_attendees")
    .values({ meetingId, userId, status: "invited" })
    .onConflict((oc) => oc.doNothing())
    .execute();
}
```

- [ ] **Step 3: Create removeMeetingAttendee**

```typescript
// data/meetings/removeMeetingAttendee.ts
import { db } from "..";

export function removeMeetingAttendee(meetingId: string, userId: string) {
  return db()
    .deleteFrom("meeting_attendees")
    .where("meetingId", "=", meetingId)
    .where("userId", "=", userId)
    .execute();
}
```

- [ ] **Step 4: Create updateMeetingAttendee**

```typescript
// data/meetings/updateMeetingAttendee.ts
import { MeetingAttendeeUpdate, db } from "..";

export function updateMeetingAttendee(
  meetingId: string,
  userId: string,
  update: MeetingAttendeeUpdate,
) {
  return db()
    .updateTable("meeting_attendees")
    .set(update)
    .where("meetingId", "=", meetingId)
    .where("userId", "=", userId)
    .execute();
}
```

- [ ] **Step 5: Commit**

```bash
git add data/meetings/listMeetingAttendees.ts data/meetings/addMeetingAttendee.ts data/meetings/removeMeetingAttendee.ts data/meetings/updateMeetingAttendee.ts
git commit -m "feat: meeting attendee CRUD data layer"
```

---

## Task 4: Notification Utility

**Files:**

- Create: `utils/notifications.ts`

- [ ] **Step 1: Create sendNotification utility**

This is the central notification dispatch. It checks `enableEmailNotifications` on the strata plan, then sends. Each caller is responsible for determining recipients — this function just handles the send + strata inbox CC.

```typescript
// utils/notifications.ts
import { getCurrentStrataPlan } from "../data/strataPlans/getStrataPlanByDomain";
import { mustGetCurrentStrata } from "../data/stratas/getStrataByDomain";
import { sendEmail } from "./sendEmail";

interface NotificationOptions {
  to: string | string[];
  subject: string;
  html: string;
  /** If true, also send to the strata's global inbox email (if configured) */
  ccStrataInbox?: boolean;
}

export async function sendNotification({
  to,
  subject,
  html,
  ccStrataInbox = false,
}: NotificationOptions) {
  const [strata, plan] = await Promise.all([
    mustGetCurrentStrata(),
    getCurrentStrataPlan(),
  ]);

  if (!plan.enableEmailNotifications) {
    return;
  }

  const recipients = typeof to === "string" ? [to] : [...to];

  if (ccStrataInbox && strata.inboxEmail) {
    recipients.push(strata.inboxEmail);
  }

  // Deduplicate
  const unique = [...new Set(recipients)].filter(Boolean);

  if (unique.length === 0) {
    return;
  }

  return sendEmail(unique, `[${strata.name}] ${subject}`, html);
}
```

- [ ] **Step 2: Commit**

```bash
git add utils/notifications.ts
git commit -m "feat: add sendNotification utility with strata inbox CC support"
```

---

## Task 5: Event Notifications on Create

**Files:**

- Modify: `app/@app/dashboard/calendar/[...segments]/actions.ts`
- Modify: `data/memberships/listStrataMemberships.ts`

- [ ] **Step 1: Update upsertEventAction to send notifications**

After the event is created (not updated) in `upsertEventAction`, send notifications to members who have `notifyEvents` enabled.

Add these imports at the top of `app/@app/dashboard/calendar/[...segments]/actions.ts`:

```typescript
import { listStrataMemberships } from "../../../../../data/memberships/listStrataMemberships";
import { sendNotification } from "../../../../../utils/notifications";
```

After the `createEvent` call (inside the `else` branch for new events), before `revalidatePath`, add:

```typescript
// Notify members who opted into event notifications
const members = await listStrataMemberships({ strataId: strata.id });
const notifyEmails = members.filter((m) => m.notifyEvents).map((m) => m.email);

if (notifyEmails.length > 0) {
  const startDate = parseTimestamp(startDateTs);
  const formattedDate = `${startDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}`;

  await sendNotification({
    to: notifyEmails,
    subject: `New Event: ${name}`,
    html: `
          <h2>${name}</h2>
          <p>${description || "No description provided."}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
        `,
  });
}
```

- [ ] **Step 2: Expose notifyEvents in membership data**

In `data/memberships/getStrataMembership.ts`, the `baseQuery` selects from `strata_memberships`. The `processRows` function builds `StrataMembership` objects. Add `notifyEvents` to the selected fields and include it in `StrataMembership`. Find the `baseQuery` function and ensure it selects `strata_memberships.notifyEvents`. Find the `processRows` function and ensure the output type includes `notifyEvents: boolean`.

The simplest approach: `notifyEvents` comes through as `0 | 1` from D1. In `processRows`, map it: `notifyEvents: row.notifyEvents === 1`.

- [ ] **Step 3: Commit**

```bash
git add app/@app/dashboard/calendar/\\[...segments\\]/actions.ts data/memberships/getStrataMembership.ts
git commit -m "feat: send email notifications on event creation"
```

---

## Task 6: Profile Event Notification Setting

**Files:**

- Modify: `app/@marketing/(marketing)/profile/UpdateProfileForm.tsx`
- Modify: `app/@marketing/(marketing)/profile/actions.ts`

- [ ] **Step 1: Add notification toggle to profile form**

In `UpdateProfileForm.tsx`, add a checkbox/toggle for event notifications. This requires knowing which strata memberships the user has. The profile page should show a toggle per strata membership.

Read the current `UpdateProfileForm.tsx` to understand its structure. Add after the existing form fields:

```tsx
<Header as="h3">Notification Preferences</Header>
<Text color="secondary">
  Receive email notifications when new events are added to your strata calendars.
</Text>
{memberships.map((membership) => (
  <Checkbox
    key={membership.strataId}
    name={`notifyEvents_${membership.strataId}`}
    label={`${membership.strataName} — Event notifications`}
    defaultChecked={membership.notifyEvents}
  />
))}
```

The component will need to receive `memberships` as a prop. Update the profile page (`page.tsx`) to fetch the user's memberships and pass them down.

- [ ] **Step 2: Handle notification pref in server action**

In `app/@marketing/(marketing)/profile/actions.ts`, after updating the user, iterate over `notifyEvents_*` form fields and update each membership:

```typescript
import { updateStrataMembership } from "../../../../data/memberships/updateStrataMembership";

// Inside the action, after user update:
const entries = Array.from(fd.entries());
for (const [key, value] of entries) {
  if (key.startsWith("notifyEvents_")) {
    const strataId = key.replace("notifyEvents_", "");
    await updateStrataMembership(strataId, session.user.id, {
      notifyEvents: value === "on" ? 1 : 0,
    });
  }
}
```

Create `data/memberships/updateStrataMembership.ts` if it doesn't exist:

```typescript
import { db } from "..";

export function updateStrataMembership(
  strataId: string,
  userId: string,
  update: { notifyEvents?: 0 | 1 },
) {
  return db()
    .updateTable("strata_memberships")
    .set(update)
    .where("strataId", "=", strataId)
    .where("userId", "=", userId)
    .execute();
}
```

- [ ] **Step 3: Commit**

```bash
git add app/@marketing/\\(marketing\\)/profile/ data/memberships/updateStrataMembership.ts
git commit -m "feat: event notification toggle on profile page"
```

---

## Task 7: Meeting Attendance UI & Notifications

**Files:**

- Modify: `app/@app/dashboard/meetings/[meetingId]/MeetingLayout.tsx`
- Modify: `app/@app/dashboard/meetings/actions.ts`
- Create: `app/@app/dashboard/meetings/[meetingId]/MeetingAttendees.tsx`

- [ ] **Step 1: Create MeetingAttendees component**

A server component that lists attendees and provides add/remove/RSVP actions.

```tsx
// app/@app/dashboard/meetings/[meetingId]/MeetingAttendees.tsx
import { auth } from "../../../../../auth";
import { Badge } from "../../../../../components/Badge";
import { Button } from "../../../../../components/Button";
import { Group } from "../../../../../components/Group";
import { Header } from "../../../../../components/Header";
import { Stack } from "../../../../../components/Stack";
import { Text } from "../../../../../components/Text";
import { listMeetingAttendees } from "../../../../../data/meetings/listMeetingAttendees";
import { listStrataMemberships } from "../../../../../data/memberships/listStrataMemberships";
import { mustGetCurrentStrata } from "../../../../../data/stratas/getStrataByDomain";
import { can } from "../../../../../data/users/permissions";
import {
  addAttendeeAction,
  removeAttendeeAction,
  rsvpAction,
} from "../actions";

interface Props {
  meetingId: string;
}

export async function MeetingAttendees({ meetingId }: Props) {
  const [session, strata, attendees] = await Promise.all([
    auth(),
    mustGetCurrentStrata(),
    listMeetingAttendees(meetingId),
  ]);

  const canEdit = can(session?.user, "stratas.meetings.edit");
  const members = canEdit
    ? await listStrataMemberships({ strataId: strata.id })
    : [];

  const nonAttendeeMembers = members.filter(
    (m) => !attendees.some((a) => a.userId === m.id),
  );

  const myAttendance = attendees.find((a) => a.userId === session?.user?.id);

  return (
    <Stack gap="normal">
      <Header as="h3">Attendees</Header>

      {attendees.length === 0 && (
        <Text color="secondary">No attendees added yet.</Text>
      )}

      {attendees.map((attendee) => (
        <Group key={attendee.userId} justify="space-between">
          <Group gap="small">
            <Text fontWeight="bold">{attendee.name}</Text>
            <Badge
              color={
                attendee.status === "confirmed"
                  ? "success"
                  : attendee.status === "declined"
                    ? "error"
                    : "default"
              }
            >
              {attendee.status}
            </Badge>
          </Group>
          {canEdit && (
            <form
              action={removeAttendeeAction.bind(
                undefined,
                meetingId,
                attendee.userId,
              )}
            >
              <Button size="small" style="tertiary" color="error">
                Remove
              </Button>
            </form>
          )}
        </Group>
      ))}

      {myAttendance && myAttendance.status === "invited" && (
        <Group gap="small">
          <form action={rsvpAction.bind(undefined, meetingId, "confirmed")}>
            <Button size="small" color="success" style="secondary">
              Confirm Attendance
            </Button>
          </form>
          <form action={rsvpAction.bind(undefined, meetingId, "declined")}>
            <Button size="small" color="error" style="secondary">
              Decline
            </Button>
          </form>
        </Group>
      )}

      {canEdit && nonAttendeeMembers.length > 0 && (
        <Stack gap="small">
          <Text color="secondary" fontSize="small">
            Add attendee:
          </Text>
          {nonAttendeeMembers.map((member) => (
            <form
              key={member.id}
              action={addAttendeeAction.bind(undefined, meetingId, member.id)}
            >
              <Button size="small" style="tertiary" color="primary">
                + {member.name}
              </Button>
            </form>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
```

- [ ] **Step 2: Add attendance server actions**

Add to `app/@app/dashboard/meetings/actions.ts`:

```typescript
import { addMeetingAttendee } from "../../../../data/meetings/addMeetingAttendee";
import { getMeeting } from "../../../../data/meetings/getMeeting";
import { listMeetingAttendees } from "../../../../data/meetings/listMeetingAttendees";
import { removeMeetingAttendee } from "../../../../data/meetings/removeMeetingAttendee";
import { updateMeetingAttendee } from "../../../../data/meetings/updateMeetingAttendee";
import { sendNotification } from "../../../../utils/notifications";

export async function addAttendeeAction(meetingId: string, userId: string) {
  const session = await auth();
  if (!session) throw new Error("not allowed");

  const strata = await mustGetCurrentStrata();
  const meeting = await getMeeting(strata.id, meetingId);

  await addMeetingAttendee(meetingId, userId);

  // Notify the newly added attendee
  const member = await getStrataMembership(strata.id, userId);
  if (member) {
    const startDate = new Date(meeting.startDate);
    await sendNotification({
      to: member.email,
      subject: `You've been added to: ${meeting.purpose}`,
      html: `
        <h2>${meeting.purpose}</h2>
        <p>You've been added as an attendee to this meeting.</p>
        <p><strong>Date:</strong> ${startDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</p>
        <p>Visit your dashboard to confirm your attendance.</p>
      `,
    });
  }

  revalidatePath("/dashboard/meetings/" + meetingId);
}

export async function removeAttendeeAction(meetingId: string, userId: string) {
  const session = await auth();
  if (!session) throw new Error("not allowed");

  await removeMeetingAttendee(meetingId, userId);
  revalidatePath("/dashboard/meetings/" + meetingId);
}

export async function rsvpAction(
  meetingId: string,
  status: "confirmed" | "declined",
) {
  const session = await auth();
  if (!session) throw new Error("not allowed");

  await updateMeetingAttendee(meetingId, session.user.id, {
    status,
    respondedAt: Date.now(),
  });

  revalidatePath("/dashboard/meetings/" + meetingId);
}
```

Add the necessary import for `getStrataMembership`:

```typescript
import { getStrataMembership } from "../../../../data/memberships/getStrataMembership";
```

- [ ] **Step 3: Render MeetingAttendees in MeetingLayout**

In `app/@app/dashboard/meetings/[meetingId]/MeetingLayout.tsx`, import and render the attendees component inside the meeting detail page, after the existing content (agenda, files, minutes sections):

```tsx
import { MeetingAttendees } from "./MeetingAttendees";

// Inside the JSX, after existing sections:
<MeetingAttendees meetingId={meetingId} />;
```

- [ ] **Step 4: Commit**

```bash
git add app/@app/dashboard/meetings/
git commit -m "feat: meeting attendance tracking with RSVP and email notifications"
```

---

## Task 8: Amenity Booking Notifications

**Files:**

- Modify: `app/@app/dashboard/amenities/actions.ts`

- [ ] **Step 1: Notify booker on booking approval/rejection**

The `approveOrRejectAmenityBookingAction` already sends inbox messages. Add email notifications to the booker.

Add import at top:

```typescript
import { getStrataMembership } from "../../../../data/memberships/getStrataMembership";
import { sendNotification } from "../../../../utils/notifications";
```

After the `createThreadMessage` call in both the approve and reject branches, add:

```typescript
// Notify the booker via email
const bookerMembership = await getStrataMembership(
  strata.id,
  amenityBooking.requesterId,
);
if (bookerMembership) {
  await sendNotification({
    to: bookerMembership.email,
    subject:
      decision === "reject"
        ? `Booking Request Denied`
        : `Booking Request Approved`,
    html:
      decision === "reject"
        ? `<p>Your booking request has been denied. Check your inbox for details.</p>`
        : `<p>Your booking request has been approved.${
            amenityBooking.invoice
              ? " Please pay the invoice by the booking start date."
              : ""
          }</p>`,
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/@app/dashboard/amenities/actions.ts
git commit -m "feat: email notifications for amenity booking decisions"
```

---

## Task 9: Inbox Message Notifications

**Files:**

- Modify: `app/@app/dashboard/inbox/actions.ts`

- [ ] **Step 1: Notify participants on new thread messages**

When a new message is added to an existing thread, notify all previous participants (users who sent messages in that thread) except the current sender. Also CC the strata inbox email.

Add import:

```typescript
import { getThreadMessages } from "../../../../data/inbox/getThreadMessages";
import { sendNotification } from "../../../../utils/notifications";
```

In `createInboxMessageAction`, after sending emails to explicit recipients and to the original sender, add participant notification logic. Before the final `revalidatePath`, add:

```typescript
// Notify thread participants (for replies to existing threads)
if (threadId) {
  const allMessages = await getThreadMessages(threadId);
  const participantUserIds = [
    ...new Set(
      allMessages
        .map((m) => m.senderUserId)
        .filter((id): id is string => !!id && id !== u?.user?.id),
    ),
  ];

  const participantEmails: string[] = [];
  for (const uid of participantUserIds) {
    const member = await getStrataMembership(strata.id, uid);
    if (member) participantEmails.push(member.email);
  }

  if (participantEmails.length > 0) {
    await sendNotification({
      to: participantEmails,
      subject: `Re: ${message0.subject}`,
      html: `
          <p><strong>${
            u?.user?.name || senderName || "Someone"
          }</strong> replied:</p>
          <p>${message}</p>
          <p><a href="${viewUrl}">View conversation</a></p>
        `,
      ccStrataInbox: true,
    });
  }
}

// For new threads, CC strata inbox
if (!threadId) {
  await sendNotification({
    to: [],
    subject: subject,
    html: `
        <p><strong>${senderName || "Someone"}</strong> sent a new message:</p>
        <p>${message}</p>
      `,
    ccStrataInbox: true,
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add app/@app/dashboard/inbox/actions.ts
git commit -m "feat: email notifications for inbox message participants"
```

---

## Task 10: Strata Inbox Email Setting

**Files:**

- Modify: `app/@app/dashboard/settings/SettingsPage.tsx`
- Modify: `app/@app/actions.ts` (the `updateStrataAction`)

- [ ] **Step 1: Add inbox email field to settings**

In `SettingsPage.tsx`, add a new section after the existing form fields (before the Content Visibility section):

```tsx
<Header as="h3">Strata Inbox Email</Header>
<Text color="secondary">
  All inbox message notifications will be copied to this email address.
  Leave blank to disable.
</Text>
<Input
  name="inboxEmail"
  label="Global Inbox Email"
  type="email"
  defaultValue={strata.inboxEmail || ""}
  placeholder="council@yourstrata.com"
/>
```

- [ ] **Step 2: Handle inboxEmail in updateStrataAction**

In the `updateStrataAction` server action (located in `app/@app/actions.ts` or `app/@app/dashboard/actions.ts`), add `inboxEmail` to the form data extraction and pass it to `updateStrata`:

```typescript
const inboxEmail = formdata.getString(fd, "inboxEmail") || null;

await updateStrata(strataId, {
  // ...existing fields
  inboxEmail,
});
```

- [ ] **Step 3: Commit**

```bash
git add app/@app/dashboard/settings/SettingsPage.tsx app/@app/actions.ts
git commit -m "feat: strata-level global inbox email setting"
```

---

## Task 11: Strata-wide Inbox Blast

**Files:**

- Modify: `app/@app/dashboard/inbox/actions.ts`
- Modify: `app/@app/dashboard/inbox/page.tsx`
- Modify: `data/users/permissions.ts`

- [ ] **Step 1: Add inbox_blasts scope to permissions**

In `data/users/permissions.ts`, add `"inbox_blasts"` to the `scopes` array:

```typescript
export const scopes = [
  "amenities",
  "amenity_bookings",
  "events",
  "files",
  "inbox_blasts",
  "inbox_messages",
  "inbox_thread_chats",
  "invoices",
  "meetings",
  "memberships",
  "settings",
  "widgets",
] as const;
```

Council roles (administrator, president, vice-president, treasurer) already have `stratas.*.*` which covers this. No role mapping changes needed.

- [ ] **Step 2: Create blast server action**

Add to `app/@app/dashboard/inbox/actions.ts`:

```typescript
import { listStrataMemberships } from "../../../../data/memberships/listStrataMemberships";
import { assertCan } from "../../../../data/users/permissions";
import { sendNotification } from "../../../../utils/notifications";

export async function sendInboxBlastAction(fd: FormData) {
  const [session, strata] = await Promise.all([auth(), mustGetCurrentStrata()]);

  if (!session) throw new Error("not allowed");
  assertCan(session.user, "stratas.inbox_blasts.create");

  const subject = formdata.getString(fd, "subject");
  const message = formdata.getString(fd, "message");

  if (!subject || !message) {
    throw new Error("Subject and message are required");
  }

  // Create the inbox thread
  const newMessage = await createThreadMessage({
    subject,
    message,
    senderUserId: session.user.id,
    strataId: strata.id,
  });

  // Get all active members
  const members = await listStrataMemberships({ strataId: strata.id });
  const recipientEmails = members
    .map((m) => m.email)
    .filter((email) => email !== session.user.email);

  if (recipientEmails.length > 0) {
    await sendNotification({
      to: recipientEmails,
      subject,
      html: `
        <p><strong>${session.user.name}</strong> sent a message to all members:</p>
        <p>${message}</p>
        <p><a href="${protocol}//${strata.domain}/dashboard/inbox/${newMessage.threadId}">View message</a></p>
      `,
      ccStrataInbox: true,
    });
  }

  revalidatePath("/dashboard/inbox");
  redirect(`/dashboard/inbox/${newMessage.threadId}`);
}
```

Add the `protocol` import at the top if not already present:

```typescript
import { protocol } from "../../../../constants";
```

- [ ] **Step 3: Add blast button to inbox page**

In `app/@app/dashboard/inbox/page.tsx`, add a "Send to All" button next to the existing action buttons. Only show it for users with `stratas.inbox_blasts.create` permission:

```tsx
{
  can(session?.user, "stratas.inbox_blasts.create") && (
    <InternalLink href="/dashboard/inbox/blast" noUnderline>
      <Button
        color="primary"
        style="secondary"
        size="small"
        icon={<SendIcon />}
      >
        Send to All
      </Button>
    </InternalLink>
  );
}
```

- [ ] **Step 4: Create blast page**

Create `app/@app/dashboard/inbox/blast/page.tsx`:

```tsx
import { mustAuth } from "../../../../../auth";
import { DashboardLayout } from "../../../../../components/DashboardLayout";
import { SendInboxMessageForm } from "../../../../../components/SendInboxMessageForm";
import { SendInboxMessageFields } from "../../../../../components/SendInboxMessageForm/SendInboxMessageFields";
import { Text } from "../../../../../components/Text";
import { assertCan } from "../../../../../data/users/permissions";
import { sendInboxBlastAction } from "../actions";

export default async function Page() {
  const session = await mustAuth();
  assertCan(session.user, "stratas.inbox_blasts.create");

  return (
    <DashboardLayout title="Send to All Members" subPageTitle="Send to All">
      <Text color="secondary">
        This message will be sent to every member of your strata via email and
        will appear in the strata inbox.
      </Text>
      <form action={sendInboxBlastAction}>
        <SendInboxMessageFields showSubjectInput />
      </form>
    </DashboardLayout>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add data/users/permissions.ts app/@app/dashboard/inbox/
git commit -m "feat: strata-wide inbox blast for council members"
```

---

## Summary

| Task | Feature                                   | Status |
| ---- | ----------------------------------------- | ------ |
| 1    | Database migrations (attendees, prefs)    |        |
| 2    | Update TypeScript types                   |        |
| 3    | Meeting attendee data layer (CRUD)        |        |
| 4    | Notification utility (`sendNotification`) |        |
| 5    | Event notifications on create             |        |
| 6    | Profile event notification toggle         |        |
| 7    | Meeting attendance UI + notifications     |        |
| 8    | Amenity booking notifications             |        |
| 9    | Inbox message participant notifications   |        |
| 10   | Strata global inbox email setting         |        |
| 11   | Strata-wide inbox blast                   |        |
