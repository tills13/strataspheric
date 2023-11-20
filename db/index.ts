import { D1Database } from "@cloudflare/workers-types";
import { ColumnType, Insertable, Kysely, Selectable, Updateable } from "kysely";
// import { D1Dialect } from "kysely-d1";

import { Role } from "./users/permissions";
import { D1Dialect } from "./d1";

export interface EventsTable {
  id: string;
  name: string;
  description: string;
  date: ColumnType<string, string, string>;
}

export type Event = Selectable<EventsTable>;
export type NewEvent = Insertable<EventsTable>;

export interface FilesTable {
  id: string;
  name: string;
  description: string;
  path: string;
  createdAt: ColumnType<string, never, never>;
}

export type File = Selectable<FilesTable>;
export type NewFile = Insertable<FilesTable>;

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
  isPaid: ColumnType<0 | 1, 0 | 1 | null, 0 | 1 | null>;
}

export type StrataMembership = Selectable<StrataMembershipsTable>;
export type NewStrataMembership = Insertable<StrataMembershipsTable>;
export type StrataMembershipUpdate = Updateable<StrataMembershipsTable>;

export interface StrataPlansTable {
  id: string;
  strataId: string;
  numSeats: number;
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
  id: string;
  email: string;
  password: string;
}

export type User = Selectable<UsersTable>;
export type NewUser = Insertable<UsersTable>;

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
  strata_memberships: StrataMembershipsTable;
  strata_plans: StrataPlansTable;
  strata_widgets: StrataWidgetsTable;
  stratas: StratasTable;
  users: UsersTable;
  widget_events: WidgetEventsTable;
  widget_files: WidgetFilesTable;
}

export const db = new Kysely<Database>({
  dialect: new D1Dialect({
    database: process.env.DB as unknown as D1Database,
  }),
});
