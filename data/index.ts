import { D1Database } from "@cloudflare/workers-types";
import { ColumnType, Insertable, Kysely, Selectable, Updateable } from "kysely";

import { D1Dialect } from "./d1";
import { AccountType, Role } from "./users/permissions";

export interface EmailsTable {
  id: string;
  lastStatus: string | null;
  updatedAt: ColumnType<number, never, number>;
  sentAt: ColumnType<number, never, never>;
}

export type Email = Selectable<EmailsTable>;
export type NewEmail = Insertable<EmailsTable>;
export type EmailUpdate = Updateable<EmailsTable>;

export interface EventsTable {
  id: string;
  strataId: string;
  creatorId: string;
  name: string;
  description: string;
  startDate: ColumnType<number, number, number>;
  endDate: ColumnType<number, number, number>;
}

export type Event = Selectable<EventsTable>;
export type NewEvent = Insertable<EventsTable>;
export type EventUpdate = Updateable<EventsTable>;

export interface FilesTable {
  id: string;
  strataId: string;
  uploaderId: string | null;
  name: string;
  description: string;
  isPublic: 0 | 1;
  sizeBytes: number;
  path: string;
  createdAt: ColumnType<number, never, never>;
}

export type File = Selectable<FilesTable>;
export type NewFile = Insertable<FilesTable>;
export type FileUpdate = Updateable<FilesTable>;

export interface InboxMessagesTable {
  id: string;
  strataId: string;
  threadId: string;
  fileId: string | null;
  invoiceId: string | null;
  viewId: string | null;
  subject: string;
  message: string;
  senderUserId: string | null;
  senderName: string | null;
  senderEmail: string | null;
  senderPhoneNumber: string | null;
  sentAt: ColumnType<number, never, never>;
  isUnread: ColumnType<0 | 1, never, never>;
}

export type InboxMessage = Selectable<InboxMessagesTable>;
export type NewInboxMessage = Insertable<InboxMessagesTable>;

export interface InboxThreadChatsTable {
  id: string;
  threadId: string;
  messageId: string | null;
  chatId: string | null;
  fileId: string | null;
  message: string;
  userId: string;
  sentAt: ColumnType<number, never, never>;
}

export type InboxThreadChat = Selectable<InboxThreadChatsTable>;
export type NewInboxThreadChat = Insertable<InboxThreadChatsTable>;

export interface InvoicesTable {
  id: ColumnType<string, string, never>;
  strataId: string;
  payee: string | null;
  type: "incoming" | "outgoing";
  identifier: string;
  description: string | null;
  amount: number;
  fileId: string | null;
  isPaid: ColumnType<0 | 1, 0 | 1 | undefined>;
  createdAt: ColumnType<number, never, never>;
  updatedAt: ColumnType<number, never, number>;
  dueBy: number | null;
}

export type Invoice = Selectable<InvoicesTable>;
export type NewInvoice = Insertable<InvoicesTable>;
export type InvoiceUpdate = Updateable<InvoicesTable>;

export interface MeetingsTable {
  id: ColumnType<string, string, never>;
  strataId: string;
  callerId: string;
  eventId: string;
  purpose: string;
  notes: string | null;
  minutesUrl: string | null;
  minutesUrlApproverId: string | null;
}

export type Meeting = Selectable<MeetingsTable>;
export type NewMeeting = Insertable<MeetingsTable>;
export type MeetingUpdate = Updateable<MeetingsTable>;

export interface MeetingAgendaItemsTable {
  id: ColumnType<string, string, never>;
  meetingId: string;
  title: string;
  description: string;
  eventId: string | null;
  fileId: string | null;
  messageId: string | null;
  chatId: string | null;
  done: ColumnType<0 | 1, 0 | 1 | undefined, 0 | 1 | undefined>;
}

export type MeetingAgendaItem = Selectable<MeetingAgendaItemsTable>;
export type NewMeetingAgendaItem = Insertable<MeetingAgendaItemsTable>;
export type MeetingAgendaItemUpdate = Updateable<MeetingAgendaItemsTable>;

export interface MeetingFilesTable {
  fileId: string;
  meetingId: string;
}

export type NewMeetingFile = Insertable<MeetingFilesTable>;

export interface MeetingMinutesTable {
  fileId: ColumnType<string, string, never>;
  meetingId: ColumnType<string, string, never>;
  approverId: string | null;
  state: "draft" | "approved";
}

export type MeetingMinutes = Selectable<MeetingMinutesTable>;
export type MeetingMinutesUpdate = Updateable<MeetingMinutesTable>;
export type NewMeetingMinutes = Insertable<MeetingMinutesTable>;

export interface StratasTable {
  id: ColumnType<string, string, never>;
  status: ColumnType<string, string | undefined, string | undefined>;
  name: string;
  domain: string;
  domainRecordId: string;
  numUnits: number;
  strataId: string | null;
  streetAddress: string | null;
  postalCode: string | null;
  city: string | null;
  provinceState: string | null;
  isPublic: 0 | 1;
  strataActiveEmailSent: ColumnType<
    0 | 1,
    0 | 1 | undefined,
    0 | 1 | undefined
  >;
  latitude: number | null;
  longitude: number | null;
  bylawsFileId: string | null;
  createdAt: ColumnType<number, never, never>;
}

export type Strata = Selectable<StratasTable>;
export type NewStrata = Insertable<StratasTable>;
export type StrataUpdate = Updateable<StratasTable>;

export interface ThreadEmailsTable {
  threadId: string;
  emailId: string;
  userId: string | null;
}

export type ThreadEmail = Selectable<ThreadEmailsTable>;
export type NewThreadEmail = Insertable<ThreadEmailsTable>;
export type ThreadEmailUpdate = Updateable<ThreadEmailsTable>;

export interface StrataMembershipsTable {
  strataId: ColumnType<string, string, never>;
  userId: ColumnType<string, string, never>;
  unit: string | null;
  role: Role;
  phoneNumber: string | null;
}

export type StrataMembership = Selectable<StrataMembershipsTable>;
export type NewStrataMembership = Insertable<StrataMembershipsTable>;
export type StrataMembershipUpdate = Updateable<StrataMembershipsTable>;

export interface StrataPlansTable {
  id: string;
  strataId: string;
  enableInbox: 0 | 1;
}

export type StrataPlan = Selectable<StrataPlansTable>;
export type NewStrataPlan = Insertable<StrataPlansTable>;

export interface StrataWidgetsTable {
  id: string;
  strataId: string;
  type:
    | "file"
    | "files_minutes"
    | "files_recent"
    | "event"
    | "events_upcoming"
    | "info"
    | "info_contact";
  title: string;
}

export type StrataWidget = Selectable<StrataWidgetsTable>;
export type NewStrataWidget = Insertable<StrataWidgetsTable>;
export type StrataWidgetUpdate = Updateable<StrataWidgetsTable>;

export interface UsersTable {
  id: ColumnType<string, string, never>;
  email: ColumnType<string, string, never>;
  password: string;
  name: string;
  status: "pending" | "active" | "suspended";
  accountType: ColumnType<AccountType, AccountType | null, AccountType>;
}

export type User = Selectable<UsersTable>;
export type NewUser = Insertable<UsersTable>;
export type UserUpdate = Updateable<UsersTable>;

export interface UserPasswordResetTokensTable {
  userId: string;
  token: string;
  createdAt: ColumnType<number, never, never>;
}

export type UserPasswordResetToken = Selectable<UserPasswordResetTokensTable>;
export type NewUserPasswordResetToken =
  Insertable<UserPasswordResetTokensTable>;

export interface WidgetEventsTable {
  eventId: string;
  widgetId: string;
}

export type NewWidgetEvent = Insertable<WidgetEventsTable>;

export interface WidgetFilesTable {
  fileId: string;
  widgetId: string;
}

export type NewWidgetFile = Insertable<WidgetFilesTable>;

export interface WidgetInfoTable {
  body: string;
  widgetId: ColumnType<string, string, never>;
}

export type NewWidgetInfo = Insertable<WidgetInfoTable>;
export type WidgetInfoUpdate = Updateable<WidgetInfoTable>;

export interface Database {
  emails: EmailsTable;
  events: EventsTable;
  files: FilesTable;
  inbox_thread_chats: InboxThreadChatsTable;
  inbox_messages: InboxMessagesTable;
  invoices: InvoicesTable;
  meetings: MeetingsTable;
  meeting_agenda_items: MeetingAgendaItemsTable;
  meeting_files: MeetingFilesTable;
  meeting_minutes: MeetingMinutesTable;
  thread_emails: ThreadEmailsTable;
  strata_memberships: StrataMembershipsTable;
  strata_plans: StrataPlansTable;
  strata_widgets: StrataWidgetsTable;
  stratas: StratasTable;
  users: UsersTable;
  user_password_reset_tokens: UserPasswordResetTokensTable;
  widget_events: WidgetEventsTable;
  widget_files: WidgetFilesTable;
  widget_info: WidgetInfoTable;
}

export const db = new Kysely<Database>({
  dialect: new D1Dialect({
    database: process.env.DB as unknown as D1Database,
  }),
  // log: ["query"],
});
