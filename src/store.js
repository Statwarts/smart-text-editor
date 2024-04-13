import { configureStore } from "@reduxjs/toolkit";
import { produce } from "immer";

const initialState = {
  editorValue: "",
  type: "text"
};

const keyReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "SET_EDITOR_VALUE":
        draft.editorValue = action.payload;
        break;
      case "SET_TYPE":
        draft.type = action.payload;
        break;
      default:
        return state;
    }
  });
};

const store = configureStore({
  reducer: keyReducer,
});

export default store;
