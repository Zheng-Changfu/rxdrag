
import { createUuid } from "@rxdrag/shared";
import { randomSchema } from "./schema";
import { IRandomConfig, Random } from "@rxdrag/minions-activities";
import { NodeType } from "@rxdrag/minions-schema";
import { randomIcon } from "../../icons";
import { IRxDragActivityMaterial } from "../../interfaces";
import { DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";

export const randomMaterial: IRxDragActivityMaterial<IRandomConfig> = {
  icon: randomIcon,
  label: "$random",
  activityType: NodeType.Activity,
  defaultPorts: {
    inPorts: [
      {
        id: createUuid(),
        name: Random.INPUT_NAME_STARTUP,
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
  schema: randomSchema,
  activityName: Random.NAME,
  subTitle: (config?: IRandomConfig) => {
    if (config?.maxValue || config?.minValue) {
      return `${config.minValue || ""} ~ ${config.maxValue || ""}`
    }
  },
}