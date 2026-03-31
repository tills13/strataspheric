"use client";

import * as styles from "./style.css";

import { useTransition } from "react";

import {
  recordVoteAction,
  removeVoteAction,
} from "../../app/@app/dashboard/meetings/[meetingId]/actions";
import { AgendaItemVoteValue } from "../../data";
import { AgendaItemVoteWithUser } from "../../data/meetings/listAgendaItemVotes";
import { MeetingAttendeeWithUser } from "../../data/meetings/listMeetingAttendees";
import { pluralize } from "../../utils/pluralize";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Group } from "../Group";
import { Stack } from "../Stack";
import { Text } from "../Text";

const VOTE_OPTIONS: { value: AgendaItemVoteValue; label: string }[] = [
  { value: "for", label: "For" },
  { value: "against", label: "Against" },
  { value: "abstain", label: "Abstain" },
];

const VOTE_COLORS: Record<
  AgendaItemVoteValue,
  "success" | "error" | "default"
> = {
  for: "success",
  against: "error",
  abstain: "default",
};

const VOTE_BUTTON_COLORS: Record<
  AgendaItemVoteValue,
  "success" | "error" | "primary"
> = {
  for: "success",
  against: "error",
  abstain: "primary",
};

interface Props {
  agendaItemId: string;
  attendees: MeetingAttendeeWithUser[];
  disabled: boolean;
  meetingId: string;
  votes: AgendaItemVoteWithUser[];
}

export function VoteTracker({
  agendaItemId,
  attendees,
  disabled,
  meetingId,
  votes,
}: Props) {
  const [pending, startTransition] = useTransition();

  const votesByUser = new Map(votes.map((v) => [v.userId, v]));

  const forCount = votes.filter((v) => v.vote === "for").length;
  const againstCount = votes.filter((v) => v.vote === "against").length;
  const abstainCount = votes.filter((v) => v.vote === "abstain").length;

  function handleVote(userId: string, vote: AgendaItemVoteValue) {
    startTransition(async () => {
      const existingVote = votesByUser.get(userId);
      if (existingVote?.vote === vote) {
        await removeVoteAction(meetingId, agendaItemId, userId);
      } else {
        await recordVoteAction(meetingId, agendaItemId, userId, vote);
      }
    });
  }

  const totalVotes = votes.length;
  const allVotesIn = attendees.length > 0 && totalVotes >= attendees.length;
  const missingCount = attendees.length - totalVotes;

  return (
    <Stack gap="small">
      <Group gap="small">
        <Badge level="success">For: {forCount}</Badge>
        <Badge level="error">Against: {againstCount}</Badge>
        <Badge level="default">Abstain: {abstainCount}</Badge>
        {!disabled && attendees.length > 0 && !allVotesIn && (
          <Badge level="warning">
            {missingCount} {pluralize("vote", missingCount)} remaining
          </Badge>
        )}
      </Group>

      {attendees.length === 0 && (
        <Text color="secondary" fs="small">
          Add meeting attendees to record votes.
        </Text>
      )}

      {attendees.map((attendee) => {
        const existingVote = votesByUser.get(attendee.userId);

        return (
          <div key={attendee.userId} className={styles.voteRow}>
            <Text fs="small" fw="bold" className={styles.voteAttendeeName}>
              {attendee.name}
            </Text>
            <Group gap="small">
              {VOTE_OPTIONS.map((option) => {
                const isSelected = existingVote?.vote === option.value;
                return (
                  <Button
                    key={option.value}
                    size="small"
                    style={isSelected ? "primary" : "tertiary"}
                    color={VOTE_BUTTON_COLORS[option.value]}
                    disabled={disabled || pending}
                    onClick={() => handleVote(attendee.userId, option.value)}
                  >
                    {option.label}
                  </Button>
                );
              })}
            </Group>
          </div>
        );
      })}
    </Stack>
  );
}
