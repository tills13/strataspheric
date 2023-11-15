import { Event } from "../events";
import { type File } from "../files";

export interface BaseWidget {
  id: string;
  strataId: string;
  type: string;
  title: string;
}

export interface FileWidget extends BaseWidget {
  type: "file";
}

export interface EventWidget extends BaseWidget {
  type: "event";
}

export type Widget = FileWidget | EventWidget;
