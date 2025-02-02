import { NodeType } from "@rxdrag/minions-schema";
import { createUuid } from "@rxdrag/shared";
import { DEFAULT_INPUT_NAME, DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";
import { IQueryActivityMaterial } from "../types";
import { objectToUrlIcon } from "../icons";
import { objectToUrlSchema } from "./schema";
import { ObjectToUrl } from "../../activities/ObjectToUrl";

export const objectToUrlMaterial: IQueryActivityMaterial = {
  activityName: ObjectToUrl.NAME,
  icon: objectToUrlIcon,
  label: "$ObjectToUrl",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: DEFAULT_INPUT_NAME,
        label: "",
      },
    ],
    outPorts: [
      {
        id: createUuid(),
        name: DEFAULT_OUTPUT_NAME,
        label: "",
      },
    ],
  },
  schema: objectToUrlSchema
}