import { MeetingAgendaItem } from "../data/meetings/listMeetingAgendaItems";
import { MeetingAttendeeWithUser } from "../data/meetings/listMeetingAttendees";

export interface MeetingMinutesData {
  purpose: string;
  callerName: string;
  strataName: string;
  startDate: number;
  endDate: number;
  notes: string | null;
  attendees: MeetingAttendeeWithUser[];
  agendaItems: MeetingAgendaItem[];
}

export interface MeetingMinutesGenerator {
  generate(data: MeetingMinutesData): Promise<string>;
}

function formatDate(timestamp: number): string {
  const d = new Date(timestamp);
  return d.toLocaleDateString("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString("en-CA", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function line(text: string = ""): string {
  return text + "\n";
}

function divider(): string {
  return line("=".repeat(60));
}

function sectionHeader(title: string): string {
  return line() + divider() + line(title) + divider();
}

function formatVoteSummary(agendaItem: MeetingAgendaItem): string {
  const votes = agendaItem.votes;
  const forVotes = votes.filter((v) => v.vote === "for");
  const againstVotes = votes.filter((v) => v.vote === "against");
  const abstainVotes = votes.filter((v) => v.vote === "abstain");

  let out = "";
  out += line(`  Result: For: ${forVotes.length}, Against: ${againstVotes.length}, Abstain: ${abstainVotes.length}`);

  const totalFor = forVotes.length;
  const totalAgainst = againstVotes.length;
  if (totalFor > totalAgainst) {
    out += line("  Motion CARRIED.");
  } else if (totalAgainst > totalFor) {
    out += line("  Motion DEFEATED.");
  } else {
    out += line("  Motion TIED.");
  }

  if (forVotes.length > 0) {
    out += line(`  In Favour: ${forVotes.map((v) => v.userName).join(", ")}`);
  }
  if (againstVotes.length > 0) {
    out += line(`  Opposed: ${againstVotes.map((v) => v.userName).join(", ")}`);
  }
  if (abstainVotes.length > 0) {
    out += line(`  Abstained: ${abstainVotes.map((v) => v.userName).join(", ")}`);
  }

  return out;
}

/**
 * Default plain-text meeting minutes generator.
 *
 * To add alternative generators (e.g. AI-powered), implement the
 * MeetingMinutesGenerator interface and pass it to the generation action.
 */
export const plainTextMinutesGenerator: MeetingMinutesGenerator = {
  async generate(data: MeetingMinutesData): Promise<string> {
    const {
      purpose,
      callerName,
      strataName,
      startDate,
      endDate,
      notes,
      attendees,
      agendaItems,
    } = data;

    let out = "";

    // Header
    out += line("MINUTES OF MEETING");
    out += line(strataName.toUpperCase());
    out += line();
    out += line(`Meeting: ${purpose}`);
    out += line(`Date: ${formatDate(startDate)}`);
    out += line(`Time: ${formatTime(startDate)} - ${formatTime(endDate)}`);
    out += line(`Called by: ${callerName}`);

    // Attendance
    out += sectionHeader("ATTENDANCE");
    const confirmed = attendees.filter((a) => a.status === "confirmed");
    const declined = attendees.filter((a) => a.status === "declined");
    const invited = attendees.filter(
      (a) => a.status === "invited",
    );

    if (confirmed.length > 0) {
      out += line(`Present: ${confirmed.map((a) => a.name).join(", ")}`);
    }
    if (declined.length > 0) {
      out += line(`Regrets: ${declined.map((a) => a.name).join(", ")}`);
    }
    if (invited.length > 0) {
      out += line(`Invited (no response): ${invited.map((a) => a.name).join(", ")}`);
    }
    out += line(`Quorum: ${confirmed.length} of ${attendees.length} members present`);

    // Call to order
    out += sectionHeader("CALL TO ORDER");
    out += line(
      `The meeting was called to order at ${formatTime(startDate)} by ${callerName}.`,
    );

    if (notes) {
      out += line();
      out += line(`Chair's Notes: ${notes}`);
    }

    // Agenda
    out += sectionHeader("AGENDA");
    for (let i = 0; i < agendaItems.length; i++) {
      const item = agendaItems[i];
      const num = String(i + 1).padStart(2, "0");
      const typeLabel =
        item.type === "vote"
          ? " [VOTE]"
          : item.type === "discussion"
            ? " [DISCUSSION]"
            : "";

      out += line();
      out += line(`${num}. ${item.title}${typeLabel}`);

      if (item.description) {
        out += line(`    ${item.description}`);
      }

      if (item.type === "vote") {
        out += line();
        out += formatVoteSummary(item);
      }

      if (item.minutes) {
        out += line();
        out += line(
          item.type === "discussion" ? "  Discussion Notes:" : "  Minutes:",
        );
        for (const minuteLine of item.minutes.split("\n")) {
          out += line(`    ${minuteLine}`);
        }
      }
    }

    // Adjournment
    out += sectionHeader("ADJOURNMENT");
    out += line(
      `The meeting was adjourned at ${formatTime(endDate)}.`,
    );

    // Signature block
    out += line();
    out += line();
    out += line("_____________________________");
    out += line("Secretary / Minute Taker");
    out += line();
    out += line("_____________________________");
    out += line("Chair / Meeting Caller");

    return out;
  },
};
