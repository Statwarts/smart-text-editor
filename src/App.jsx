import React from "react";
import Editor from "./components/editor";
import TerminalComponent from "./components/terminal";

export default function App() {
  return (
    <div>
      <h1>App</h1>
      <TerminalComponent />
      <Editor />
    </div>
  );
}
