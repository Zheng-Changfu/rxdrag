import { FieldActionPayload, SetFieldValuePayload, SET_FIELD_VALUE } from "fieldy/actions";
import { FieldState, IAction } from "fieldy/interfaces";

export function fieldReduce(state: FieldState, action: IAction<FieldActionPayload>): FieldState {
  switch (action.type) {
    case SET_FIELD_VALUE:
      const setFieldValuePayload = action.payload as SetFieldValuePayload
      return {
        ...state,
        value: setFieldValuePayload.value
      }
    default:
      return state
  }
}