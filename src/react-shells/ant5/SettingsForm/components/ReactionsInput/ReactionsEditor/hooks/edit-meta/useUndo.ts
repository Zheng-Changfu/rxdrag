import { useCallback } from "react"
import { ActionType } from "../../actions"
import { useEditorState } from "../useEditorState"
import { useMarkChange } from "./useMarkChange"

export function useUndo() {
  const { undoList, redoList, dispatch, selected, metas } = useEditorState()
  const markeChange = useMarkChange()
  
  const undo = useCallback(() => {
    const snapshot = undoList[undoList.length - 1]
    const { reactions, invokes } = snapshot
    dispatch({ type: ActionType.SELECTION, payload: snapshot.selected })
    dispatch({ type: ActionType.SET_METAS, payload: { reactions, invokes } })
    dispatch({ type: ActionType.SET_UNOLIST, payload: undoList.slice(0, undoList.length - 1) })
    dispatch({ type: ActionType.SET_REDOLIST, payload: [...redoList, {selected, ...metas}] })
    markeChange()
  }, [dispatch, markeChange, metas, redoList, selected, undoList])

  return undo
}