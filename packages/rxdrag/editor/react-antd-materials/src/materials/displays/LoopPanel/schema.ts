import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [

  ],

  canBindField: true,
}

export const materialSchema: INodeSchema = createSchema(options)