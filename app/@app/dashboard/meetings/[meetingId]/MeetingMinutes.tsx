import { s } from "../../../../../sprinkles.css";
import * as styles from "./style.css";

import { AddFileToMeetingButton } from "../../../../../components/AddFileToMeetingButton";
import { DividerText } from "../../../../../components/DividerText";
import { FileTypeIcon } from "../../../../../components/FileTypeIcon";
import { Header } from "../../../../../components/Header";
import { CircleCheckIcon } from "../../../../../components/Icon/CircleCheckIcon";
import { SaveIcon } from "../../../../../components/Icon/SaveIcon";
import { TextDocumentIcon } from "../../../../../components/Icon/TextDocumentIcon";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { Input } from "../../../../../components/Input";
import { MeetingMinutesTimelineItem } from "../../../../../components/MeetingMinutesTimelineItem";
import { MinutesApprover } from "../../../../../components/MinutesApprover";
import { Panel } from "../../../../../components/Panel";
import { RemoveButton } from "../../../../../components/RemoveButton";
import { StatusButton } from "../../../../../components/StatusButton";
import { Timeline } from "../../../../../components/Timeline";
import { getMeetingMinutes } from "../../../../../data/meetings/getMeetingMinutes";
import { classnames } from "../../../../../utils/classnames";
import { upsertFileAction } from "../../actions";
import {
  addFileToMeetingAction,
  approveMeetingMinutesAction,
  approveMeetingMinutesUrlAction,
  clearMinutesUrlAction,
  removeFileFromMeetingAction,
  updateMinutesUrlAction,
} from "./actions";

interface Props {
  className?: string;
  meetingId: string;
  minutesUrl?: string | null;
  minutesUrlApprovedByName?: string | null;
}

export async function MeetingMinutes({
  className,
  meetingId,
  minutesUrl,
  minutesUrlApprovedByName,
}: Props) {
  const files = await getMeetingMinutes(meetingId);
  const anyApproved = files.some((file) => file.state === "approved");

  return (
    <div className={className}>
      <Header className={s({ mb: "normal" })} priority={2}>
        Minutes
      </Header>

      {!minutesUrl && files.length === 0 && (
        <InfoPanel className={s({ mb: "normal" })}>
          <strong>No minutes added to this meeting.</strong> Use the button
          below to add draft minutes or add a URL where council members can view
          and collaboratively edit the minutes for this meeting.
        </InfoPanel>
      )}

      {!anyApproved && (
        <form
          className={classnames(styles.minutesUrlContainer, s({ w: "full" }))}
          action={updateMinutesUrlAction.bind(undefined, meetingId)}
        >
          <Input
            className={classnames(styles.minutesUrlInput, s({ w: "full" }))}
            name="minutesUrl"
            placeholder="https://docs.google.com/document/d/..."
            defaultValue={minutesUrl || ""}
            readOnly={!!minutesUrl || !!minutesUrlApprovedByName}
          />

          {!minutesUrl && (
            <StatusButton
              className={styles.minutesUrlApproveButton}
              iconRight={<SaveIcon />}
              iconTextBehaviour="centerRemainder"
              color="success"
            >
              Add Minutes URL
            </StatusButton>
          )}

          {minutesUrl &&
            (minutesUrlApprovedByName ? (
              <MinutesApprover
                approverName={minutesUrlApprovedByName}
                className={styles.minutesUrlApprover}
              />
            ) : (
              <div className={styles.minutesUrlActionsContainer}>
                <StatusButton
                  className={styles.minutesUrlApproveButton}
                  action={approveMeetingMinutesUrlAction.bind(
                    undefined,
                    meetingId,
                  )}
                  iconRight={<CircleCheckIcon />}
                  iconTextBehaviour="centerRemainder"
                  color="success"
                >
                  Approve
                </StatusButton>
                <RemoveButton
                  action={clearMinutesUrlAction.bind(undefined, meetingId)}
                  color="error"
                  style="tertiary"
                />
              </div>
            ))}
        </form>
      )}

      {minutesUrl && minutesUrlApprovedByName && (
        <InfoPanel className={s({ mb: "normal" })} level="success">
          The externally hosted minutes have been approved. Export them and
          upload them to Stratashperic to share them with other strata members.
        </InfoPanel>
      )}

      {!anyApproved && (
        <DividerText className={s({ w: "full", mv: "normal" })}>OR</DividerText>
      )}

      {files.length !== 0 && (
        <Timeline
          className={s({
            mt: !anyApproved ? "normal" : undefined,
            mb: !anyApproved ? "large" : undefined,
          })}
          items={files.map((file, idx) => ({
            icon: (
              <FileTypeIcon
                defaultIcon={<TextDocumentIcon />}
                filePath={file.path}
              />
            ),
            contents: (
              <MeetingMinutesTimelineItem
                approveMeetingMinutes={approveMeetingMinutesAction.bind(
                  undefined,
                  meetingId,
                  file.id,
                )}
                deleteMeetingMinutes={removeFileFromMeetingAction.bind(
                  undefined,
                  meetingId,
                  "minutes",
                  file.id,
                )}
                file={file}
                showApproveButton={!anyApproved}
                versionNum={idx + 1}
              />
            ),
          }))}
        />
      )}

      {!anyApproved && (
        <>
          <AddFileToMeetingButton
            addFileToMeeting={addFileToMeetingAction.bind(
              undefined,
              meetingId,
              "minutes",
            )}
            attachFileText="Add Minutes Document"
            disabled={!!(minutesUrl && minutesUrlApprovedByName)}
            upsertFile={upsertFileAction.bind(undefined, undefined)}
          />
        </>
      )}
    </div>
  );
}
