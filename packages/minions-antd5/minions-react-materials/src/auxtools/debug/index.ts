
import { createUuid } from "@rxdrag/shared";
import { debugSchema } from "./schema";
import { NodeType } from "@rxdrag/minions-schema";
import { DebugActivity, IDebugConfig } from "@rxdrag/minions-activities"
import { debugIcon } from "../../icons";
import { DEFAULT_INPUT_NAME } from "@rxdrag/minions-runtime";
import { IRxDragActivityMaterial } from "../../interfaces";

export const debugMaterial: IRxDragActivityMaterial<IDebugConfig> = {
  activityName: DebugActivity.NAME,
  icon: debugIcon,
  label: "$debug",
  activityType: NodeType.Activity,
  color: "orange",
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: DEFAULT_INPUT_NAME,
        label: "",
      },
    ],
  },
  subTitle: (config?: IDebugConfig) => {
    return config?.tip
  },
  schema: debugSchema,
}