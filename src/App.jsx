import React from "react";
import Editor from "./components/editor";
import TerminalComponent from "./components/terminal";
import "./App.css";
export default function App() {
  return (
    <div className=" bg-black">
      <TerminalComponent />
      <Editor />
    </div>
  );
}
