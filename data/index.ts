import { D1Database } from "@cloudflare/workers-types";
import { ColumnType, Insertable, Kysely, Selectable, Updateable } from "kysely";

import { D1Dialect } from "./d1";
import { AccountType, Role } from "./users/permissions";

export interface EventsTable {
  id: string;
  strataId: string;
  creatorId: string;
  name: string;
  description: string;
  date: ColumnType<string, string, string>;
}

export type Event = Selectable<EventsTable>;
export type NewEvent = Insertable<EventsTable>;

export interface FilesTable {
  id: string;
  strataId: string;
  uploaderId: string | null;
  name: string;
  description: string;
  isPublic: 0 | 1;
  sizeBytes: number;
  path: string;
  createdAt: ColumnType<string, never, never>;
}

export type File = Selectable<FilesTable>;
export type NewFile = Insertable<FilesTable>;

export interface InboxMessagesTable {
  id: string;
  strataId: string;
  threadId: string;
  fileId: string | null;
  viewId: string | null;
  subject: string;
  message: string;
  senderUserId: string | null;
  senderName: string | null;
  senderEmail: string | null;
  senderPhoneNumber: string | null;
  sentAt: ColumnType<string, never, never>;
  isUnread: ColumnType<0 | 1, never, never>;
}

export type InboxMessage = Selectable<InboxMessagesTable>;
export type NewInboxMessage = Insertable<InboxMessagesTable>;

export interface InboxThreadChatsTable {
  id: string;
  threadId: string;
  messageId: string | undefined;
  chatId: string | undefined;
  fileId: string | undefined;
  message: string;
  userId: string;
  sentAt: ColumnType<string, never, never>;
}

export type InboxThreadChat = Selectable<InboxThreadChatsTable>;
export type NewInboxThreadChat = Insertable<InboxThreadChatsTable>;

export interface MeetingsTable {
  id: ColumnType<string, string, never>;
  strataId: string;
  callerId: string;
  purpose: string;
  notes: string | null;
  date: string;
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
  fileId: string;
  meetingId: string;
  state: "draft" | "published";
}

export type NewMeetingMinutes = Insertable<MeetingMinutesTable>;

export interface StratasTable {
  id: ColumnType<string, string, never>;
  name: string;
  domain: string;
  numUnits: number;
  strataId: string | null;
  streetAddress: string | null;
  postalCode: string | null;
  provinceState: string | null;
  isPublic: 0 | 1;
}

export type Strata = Selectable<StratasTable>;
export type NewStrata = Insertable<StratasTable>;
export type StrataUpdate = Updateable<StratasTable>;

export interface StrataMembershipsTable {
  strataId: ColumnType<string, string, never>;
  userId: ColumnType<string, string, never>;
  unit: string | null;
  role: Role;
  name: string;
  email: string;
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
  type: "file" | "event";
  title: string;
}

export type StrataWidget = Selectable<StrataWidgetsTable>;
export type NewStrataWidget = Insertable<StrataWidgetsTable>;

export interface UsersTable {
  id: ColumnType<string, string, never>;
  email: ColumnType<string, string, never>;
  password: string;
  name: string | null;
  accountType: ColumnType<AccountType, AccountType | null, AccountType>;
}

export type User = Selectable<UsersTable>;
export type NewUser = Insertable<UsersTable>;
export type UserUpdate = Updateable<UsersTable>;

export interface UserPasswordResetTokensTable {
  userId: string;
  token: string;
  createdAt: ColumnType<string, never, never>;
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

export interface Database {
  events: EventsTable;
  files: FilesTable;
  inbox_thread_chats: InboxThreadChatsTable;
  inbox_messages: InboxMessagesTable;
  meetings: MeetingsTable;
  meeting_agenda_items: MeetingAgendaItemsTable;
  meeting_files: MeetingFilesTable;
  strata_memberships: StrataMembershipsTable;
  strata_plans: StrataPlansTable;
  strata_widgets: StrataWidgetsTable;
  stratas: StratasTable;
  users: UsersTable;
  user_password_reset_tokens: UserPasswordResetTokensTable;
  widget_events: WidgetEventsTable;
  widget_files: WidgetFilesTable;
}

export const db = new Kysely<Database>({
  dialect: new D1Dialect({
    database: process.env.DB as unknown as D1Database,
  }),
});
