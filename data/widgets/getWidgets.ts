import { FileWidget, EventWidget, Widget } from ".";
import { db } from "../../db";
import { Strata } from "../stratas";
import { File } from "../files";

interface GetFileWidgetRow extends FileWidget {
  type: "file";
  fileId: string;
  filePath: string;
  fileName: string;
  fileDescription: string;
  fileCreatedAt: string;
}

interface GetEventWidgetRow extends EventWidget {
  type: "event";
  eventId: string;
  eventName: string;
  eventDescription: string;
  eventDate: string;
}

type Row = GetFileWidgetRow | GetEventWidgetRow;

const query = `
SELECT 
    strata_widgets.*,

    files.id as fileId,
    files.name as fileName,
    files.description as fileDescription,
    files.path as filePath,
    files.created_at AS fileCreatedAt,

    events.id as eventId,
    events.name as eventName,
    events.description as eventDescription,
    events.date as eventDate
FROM strata_widgets 
    LEFT JOIN files ON strata_widgets.type = "file" 
        AND files.widget_id = strata_widgets.id
    LEFT JOIN events ON strata_widgets.type = "event" 
        AND events.widget_id = strata_widgets.id
WHERE strata_widgets.strata_id = ?
`;

export async function getWidgets(strata: Strata): Promise<Widget[]> {
  if (!db()) {
    return [
      {
        id: "018bb1be-e92e-731a-8905-d02d5939488a",
        strata_id: "018bb101-dc78-761b-ba86-2f4914bfd820",
        title: "Events",
        type: "event",
        events: [
          {
            date: new Date("2023-12-12 18:00:00"),
            description: "2023 AGM",
            id: "018bb1be-9d32-76b7-997d-758cb70589aa",
            name: "2023 AGM",
          },
        ],
      },
    ];
  }

  const result = await db().prepare(query).bind(strata.id).all<Row>();

  if (result.error) {
    console.error(result.error);
    return [];
  }

  const widgetsById: Record<string, Widget> = {};

  for (const row of result.results) {
    if (row.type === "file") {
      widgetsById[row.id] = widgetsById[row.id] || {
        ...row,
        files: [],
      };

      if (!row.fileId) {
        continue;
      }

      (widgetsById[row.id] as FileWidget).files.push({
        id: row.fileId,
        createdAt: new Date(row.fileCreatedAt),
        description: row.fileDescription,
        name: row.fileName,
        path: row.filePath,
      });
    } else if (row.type === "event") {
      widgetsById[row.id] = widgetsById[row.id] || {
        ...row,
        events: [],
      };

      if (!row.eventId) {
        continue;
      }

      (widgetsById[row.id] as EventWidget).events.push({
        date: new Date(row.eventDate),
        description: row.eventDescription,
        id: row.eventId,
        name: row.eventName,
      });
    }
  }

  return Object.values(widgetsById);
}
