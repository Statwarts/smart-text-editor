import store from "../store";
import React, { useState, useEffect } from "react";
import { readTextFile } from "@tauri-apps/api/fs";
const shorten = (str) => {
    console.log("the input:",str);
    const fileName = str.split("\\").pop();
    console.log(fileName);
    return fileName;
};

export default function Tabs() {
  const [openTabs, setOpenTabs] = useState(store.getState().openTabs);
  const [selectedTab, setSelectedTab] = useState(store.getState().selectedTab);
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setOpenTabs(store.getState().openTabs);
      setSelectedTab(store.getState().selectedTab);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // console.log("at tabs",selectedTab);
    const fetchContents = async () => {
      const contents = await readTextFile(selectedTab);
        store.dispatch({ type: "SET_EDITOR_VALUE", payload: contents });
    }
    if (selectedTab) {
        fetchContents();
    }
  }, [selectedTab]);
  return (
    <div className="flex gap-2">
      {openTabs.map((tab, index) => (
        <div
          className="border-[1px] p-1 rounded-md"
          key={index}
          onClick={() => {
            store.dispatch({ type: "SET_SELECTED_TAB", payload: tab });
          }}
        >
          {shorten(tab)}
        </div>
      ))}
    </div>
  );
}
