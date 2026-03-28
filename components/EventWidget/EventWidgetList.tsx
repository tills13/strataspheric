"use client";

import * as abstractWidgetStyles from "../AbstractWidget/style.css";
import * as styles from "./style.css";

import { startTransition, useState } from "react";

import { deleteEventAction } from "../../app/@app/dashboard/calendar/[...segments]/actions";
import { Event } from "../../data";
import { can, p } from "../../data/users/permissions";
import { useSession } from "../../hooks/useSession";
import { Button } from "../Button";
import { Date } from "../Date";
import { DropdownActions } from "../DropdownActions";
import { Header } from "../Header";
import { ArrowBackIcon } from "../Icon/ArrowBackIcon";
import { ArrowForwardIcon } from "../Icon/ArrowForwardIcon";
import { DeleteIcon } from "../Icon/DeleteIcon";
import { InfoPanel } from "../InfoPanel";
import { Text } from "../Text";

const PAGE_SIZE = 5;

interface Props {
  events: Event[];
}

export function EventWidgetList({ events }: Props) {
  const session = useSession();
  return (
    <>
      {events.length === 0 && (
        <InfoPanel alignment="center" level="default">
          <Text>There are no selected or upcoming events.</Text>
        </InfoPanel>
      )}

      {events.map((event) => (
        <div
          key={event.id}
          className={abstractWidgetStyles.abstractWidgetListItem}
        >
          <div>
            <Header as="h3">{event.name}</Header>
            <p>{event.description}</p>
          </div>
          <div className={styles.eventWidgetListActions}>
            <Date timestamp={event.startDate} />
            <DropdownActions
              actions={[
                can(session?.user, p("stratas", "widgets", "edit")) && {
                  label: "Delete Event",
                  action: () =>
                    startTransition(() => deleteEventAction(event.id)),
                  icon: <DeleteIcon />,
                },
              ]}
              buttonSize="small"
              buttonStyle="tertiary"
            />
          </div>
        </div>
      ))}
    </>
  );
}

export function PaginatedEventWidgetList({ events }: Props) {
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(events.length / PAGE_SIZE));
  const paginatedEvents = events.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE,
  );

  return (
    <>
      <div className={abstractWidgetStyles.abstractWidgetList}>
        <EventWidgetList events={paginatedEvents} />
      </div>

      {totalPages > 1 && (
        <div className={abstractWidgetStyles.abstractWidgetPagination}>
          <Button
            size="small"
            style="tertiary"
            iconOnly
            icon={<ArrowBackIcon />}
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          />
          <Text fontSize="small" color="secondary">
            {page + 1} / {totalPages}
          </Text>
          <Button
            size="small"
            style="tertiary"
            iconOnly
            icon={<ArrowForwardIcon />}
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          />
        </div>
      )}
    </>
  );
}
