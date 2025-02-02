import { Button } from "antd"
import { memo } from "react"
import { undoIcon } from "../../icons"
import { useUndo } from "@rxdrag/react-core"

export const UndoButton = memo(() => {
  const [canUndo, undo] = useUndo()
  return (
    <Button
      type={"text"}
      size="large"
      icon={undoIcon}
      disabled={!canUndo}
      onClick={undo}
    />
  )
})