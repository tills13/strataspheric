import { Event } from "../events";
import { type File } from "../files";

export interface BaseWidget {
  id: string;
  strata_id: string;
  type: string;
  title: string;
}

export interface FileWidget extends BaseWidget {
  type: "file";
  files: File[];
}

export interface EventWidget extends BaseWidget {
  type: "event";
  events: Event[];
}

export type Widget = FileWidget | EventWidget;
