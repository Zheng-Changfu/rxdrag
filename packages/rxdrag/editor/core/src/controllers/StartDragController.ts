import { DragStartEvent } from "../shell/events/mouse";
import { IDesignerEngine, NodeType, Unsubscribe } from "../interfaces";
import { getOffset, getPosition } from "../shell/utils/xycoord";
import { IPlugin } from "../interfaces/plugin";

export class StartDragControllerImpl implements IPlugin {
  name = "default.start-drag-controller";

  unsubscribe: Unsubscribe
  constructor(protected engine: IDesignerEngine) {
    this.unsubscribe = engine.getShell().subscribeTo<DragStartEvent>(DragStartEvent.Name, this.handleDragStart)
  }

  handleDragStart = (e: DragStartEvent) => {
    //禁止user select
    document.body.style.userSelect = "none"
    const canvases = this.engine.getShell()?.getAllCanvases()
    for (const key of Object.keys(canvases)) {
      const canvas = canvases[key]
      if (canvas) {
        const element = canvas.getRootElement()
        if (element) {
          element.style.userSelect = "none"
        }
      }
    }

    if (e.data.targetRx?.nodeType === NodeType.Resource) {
      e.data.targetRx?.rxId && this.engine.getActions().startDragResource({
        initialMousePosition: getPosition(e.data),
        offset: getOffset(e.data),
        resourceId: e.data.targetRx?.rxId,
        mousePosition: getPosition(e.data),
      })
    } else if (e.data.targetRx?.nodeType === NodeType.Node) {
      const nodeId = e.data.targetRx?.rxId
      if (nodeId) {
        const behavior = this.engine.getNodeBehavior(nodeId)
        const node = this.engine.getMonitor().getNode(nodeId)
        if (behavior.isDraggable() && !node?.isSlot) {
          this.engine.getActions().startDragNodes({
            initialMousePosition: getPosition(e.data),
            offset: getOffset(e.data),
            nodeIds: [nodeId],
            mousePosition: getPosition(e.data)
          })
        }
      }
    }
  }

  destroy(): void {
    this.unsubscribe()
  }

}

export const StartDragController = (engine: IDesignerEngine) => {
  return new StartDragControllerImpl(engine)
}