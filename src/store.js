import { configureStore } from "@reduxjs/toolkit";
import { produce } from "immer";

const types = {
  js: "code",
  ts: "code",
  html: "code",
  css: "code",
  py: "code",
  txt: "text",
  md: "text",
  json: "code",
  xml: "code",
  yml: "code",
  yaml: "code",
  toml: "code",
  sh: "code",
  bat: "code",
  c: "code",
  cpp: "code",
  java: "code",
  php: "code",
  go: "code",
  rb: "code",
  cs: "code",
  swift: "code",
  kt: "code",
  scala: "code",
};

const initialState = {
  editorValue: "",
  type: "text",
  openTabs: [],
  selectedTab: null,
};
let fileType;
const keyReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "ADD_TAB":
        // console.log(action.payload);
        fileType = action.payload.split(".").pop();
        draft.openTabs.push(action.payload);
        draft.selectedTab = action.payload;
        draft.type = types[fileType];
        break;
      case "SET_EDITOR_VALUE":
        draft.editorValue = action.payload;
        break;
      case "SET_SELECTED_TAB":
        fileType = action.payload.split(".").pop();
        draft.type = types[fileType];
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
