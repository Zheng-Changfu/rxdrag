import { IFieldMeta } from "@rxdrag/fieldy"
import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react"
import { INodeSchema } from "@rxdrag/schema"

export interface ISlotSchema {
  name: string,
  label?: string,
}

export function transSlotSchemas(schemas: ISlotSchema[]): INodeSchema<IFieldMeta, ILogicFlowControllerMeta>[] {
  return schemas.map((schema) => ({
    componentName: "FormItem",
    props: {
      label: schema?.label,
    },
    children: [
      {
        componentName: "SlotSwitch",
        props: {
          name: schema.name
        },
      }
    ]
  }))
}