import { Meeting, db } from "..";
import { Pagination } from "../types";

type ListMeetingsFilter = {
  startDateAfter?: number;
  startDateBefore?: number;
  strataId?: string;
};

type ListMeetingsPagination = Pagination<"meetings", Meeting>;

export function listMeetings(
  filter: ListMeetingsFilter = {},
  pagination: ListMeetingsPagination = {},
) {
  let query = db
    .selectFrom("meetings")
    .innerJoin("users", "meetings.callerId", "users.id")
    .innerJoin("events", "meetings.eventId", "events.id")
    .selectAll("meetings")
    .select(["users.name as caller", "events.startDate", "events.endDate"]);

  if (filter.strataId) {
    query = query.where("meetings.strataId", "=", filter.strataId);
  }

  if (filter.startDateBefore) {
    query = query.where("events.startDate", "<", filter.startDateBefore);
  } else if (filter.startDateAfter) {
    query = query.where("events.startDate", ">=", filter.startDateAfter);
  }

  if (pagination.limit) {
    query = query.limit(pagination.limit);
  }

  return query.orderBy("events.startDate desc").execute();
}
