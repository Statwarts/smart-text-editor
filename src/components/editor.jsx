import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import React, { useState, useEffect, useCallback } from "react";
import {vscodeDark} from '@uiw/codemirror-theme-vscode';


export default function Editor() {
  const [value, setValue] = useState("");
  const onChange = useCallback((val, viewUpdate) => {
    console.log("val:", val);
    setValue(val);
  }, []);
  return (
    <>
      <div>
        <h1>Editor</h1>
        <CodeMirror
          value={value}
          height="500px"
          theme={vscodeDark}
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
        />
      </div>
    </>
  );
}
