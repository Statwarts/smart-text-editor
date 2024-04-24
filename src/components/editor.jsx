import React, { useState, useEffect, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import store from "../store";
import { open } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";
import { save } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api";
import { Editor as EditorComponent } from "primereact/editor";
import Switch from "react-switch";
import { SwitchIconOn, SwitchIconOff } from "./switchIcon";

export default function Editor() {
  const [value, setValue] = useState(store.getState().editorValue);
  const [type, setType] = useState(store.getState().type);

  const onChange = useCallback((val, viewUpdate) => {
    setValue(val);
  }, []);

  const openFile = async () => {
    try {
      const selectedPath = await open();
      const contents = await readTextFile(selectedPath);
      store.dispatch({ type: "ADD_TAB", payload: selectedPath });
      setValue(contents);
    } catch (e) {
      console.log(e);
    }
  };

  const saveFile = async () => {
    try {
      const selectedPath = await save();
      if (!selectedPath) return;
      await invoke("save_file", { path: selectedPath, contents: value });
      console.log(selectedPath);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    store.dispatch({ type: "SET_EDITOR_VALUE", payload: value });
  }, [value]);

  store.subscribe(() => {
    setValue(store.getState().editorValue);
    setType(store.getState().type);
  });

  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-between mb-4">
        <div className="flex gap-4">
          <button
            onClick={openFile}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Open
          </button>
          <button
            onClick={saveFile}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Save
          </button>
        </div>
        <div className="flex items-center">
          {/* <span className="text-gray-500">Text</span> */}
          <Switch
            checked={type === "code"}
            onChange={(checked) => {
              store.dispatch({
                type: "SET_TYPE",
                payload: checked ? "code" : "text",
              });
            }}
            height={24}
            width={48}
            handleDiameter={24}
            borderRadius={12}
            checkedIcon={<SwitchIconOff />}
            uncheckedIcon={<SwitchIconOn />}
            onColor="#119fff"
            offColor="#114fff"
          />
          {/* <span className="text-gray-500">Code</span> */}
        </div>
      </div>
      {type === "text" ? (
        <EditorComponent
          value={value}
          onTextChange={(e) => setValue(e.htmlValue)}
          style={{ height: "50vh", backgroundColor: "#262626", color: "#ffffff" }}
        />
      ) : (
        <CodeMirror
          value={value}
          height="50vh"
          theme={vscodeDark}
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
        />
      )}
    </div>
  );
}
