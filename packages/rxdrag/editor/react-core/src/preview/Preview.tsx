import { ComponentRender, } from "@rxdrag/react-runner"
import { ControllerFactories } from "@rxdrag/react-runner"
import { IReactComponents } from "@rxdrag/react-shared"
import { INodeSchema } from "@rxdrag/schema"
import { memo, useEffect, useState } from "react"
import { useDocument, useDocumentViewTypeState } from "../hooks"
import { VirtualForm } from "@rxdrag/react-fieldy"

export const Preview = memo((
  props: {
    components: IReactComponents
    controllerFactories: ControllerFactories,
  }
) => {
  const { components, controllerFactories } = props
  const [tree, setTree] = useState<INodeSchema>()
  const doc = useDocument()
  const [viewType] = useDocumentViewTypeState(doc?.id)
  useEffect(() => {
    setTree(doc?.getSchemaTree() || undefined)
  }, [doc, viewType])

  console.log("刷新 PreviewRender", tree)

  return (
    <VirtualForm>
      {
        tree
          ? <ComponentRender
            components={components}
            controllerFactories={controllerFactories}
            schema={tree}
          />
          : <></>
      }
    </VirtualForm>
  )
})