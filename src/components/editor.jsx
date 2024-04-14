import React, { useState, useEffect, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import store from "../store";
import {open} from "@tauri-apps/api/dialog"
import { readTextFile  } from "@tauri-apps/api/fs";
import { save } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api";
import { Editor as EditorComponent } from "primereact/editor";
import Switch from '@mui/material/Switch';

export default function Editor() {
  const [value, setValue] = useState(store.getState().editorValue);
  const [type, setType] = useState(store.getState().type);
  const [file, setFile] = useState(""); // Add a new state variable to store the path of the file to be opened
  const onChange = useCallback((val, viewUpdate) => {
    setValue(val);
  }, []);

  const openFile = async () => {
    try{
      const selectedPath = await open();
      const contents = await readTextFile(selectedPath);
      setValue(contents);
      console.log(selectedPath);
    }
    catch(e){
      console.log(e)
    }
  };
  const saveFile = async () => {
    try{
      const selectedPath = await save();
      if (!selectedPath) return;
      await invoke("save_file", { path: selectedPath, contents: value });
      console.log(selectedPath);
    }
    catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    store.dispatch({ type: "SET_EDITOR_VALUE", payload: value });
  }, [value]);

  store.subscribe(() => {
    setValue(store.getState().editorValue);
    setType(store.getState().type);
  });
  return (
    <>
      <div>
        <h1>Editor</h1>
        
        <button
          onClick={() => {
            openFile();
          }}
        >
          Open
        </button>
        <button
          onClick={() => {
            saveFile();
          }}
        >
          Save
        </button>
        <Switch
        value={type}
        onChange={(e) => {
          store.dispatch({ type: "SET_TYPE", payload: e.target.checked ? "code" : "text" });
        }}
        />
        {type === "text" ? (
          <EditorComponent
            value={value}
            onTextChange={(e) => setValue(e.htmlValue)}
            style={{ height: "49vh", backgroundColor: "#262626", color: "#ffffff", }}
          />
        ) : (
          <CodeMirror
            value={value}
            height="54vh"
            theme={vscodeDark}
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
          />
        )}
      </div>
    </>
  );
}
