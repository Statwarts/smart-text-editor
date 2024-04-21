import React from "react";
import Editor from "./components/editor";
import TerminalComponent from "./components/terminal";
import "./App.css";
import Tabs from "./components/tabs";
export default function App() {
  return (
    <div className="text-white bg-black">
      <Tabs/>
      <TerminalComponent />
      <Editor />
    </div>
  );
}
