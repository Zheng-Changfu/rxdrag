import { AbstractController, INIT_EVENT_NAME } from "@rxdrag/minions-runtime-react";
import { IShortcutControllerMeta } from "./IShortcutControllerMeta";
import { REMOVE_CONTROLLER_NAME } from "./consts";

export class RemoveRecordController extends AbstractController {
  constructor(public meta: IShortcutControllerMeta) {
    super(meta)
    this.name = REMOVE_CONTROLLER_NAME
  }
  init(/*relatedControllers: Controllers | undefined*/) {
    this.events[INIT_EVENT_NAME] = this.initEvent
    this.destroyEvent = this.destroy
  }

  destroy(): void {
    throw new Error("Method not implemented.");
  }

  initEvent = () => {
    console.log("not implement")
  }

  search = () => {
    console.log("not implement")
  }
}
