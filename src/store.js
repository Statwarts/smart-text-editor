import { configureStore } from "@reduxjs/toolkit";
import { produce } from "immer";

const initialState = {
  editorValue: "",
  type: "text",
  openTabs : [],
  selectedTab : null
};

const keyReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "ADD_TAB":
        // console.log(action.payload);
        draft.openTabs.push(action.payload);
        draft.selectedTab = action.payload;
        break;
      case "SET_EDITOR_VALUE":
        draft.editorValue = action.payload;
        break;
      case "SET_SELECTED_TAB":
        draft.selectedTab = action.payload;
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
