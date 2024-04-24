import store from "../store";
import React, { useState, useEffect } from "react";
import { readTextFile } from "@tauri-apps/api/fs";

const shorten = (str) => {
    const fileName = str.split("\\").pop();
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
        const fetchContents = async () => {
            const contents = await readTextFile(selectedTab);
            store.dispatch({ type: "SET_EDITOR_VALUE", payload: contents });
        }
        if (selectedTab) {
            fetchContents();
        }
    }, [selectedTab]);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">Files</h1>
            </div>
            <div className="flex items-center gap-1">
                {openTabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`flex p-2 gap-2 rounded-md cursor-pointer ${
                            tab === selectedTab ? "text-white bg-gray-600" : "text-gray-400"
                        }`}
                        onClick={() => {
                            store.dispatch({ type: "SET_SELECTED_TAB", payload: tab });
                        }}
                    >
                        {/* <span className={`${tab === selectedTab ? "border-b-2 border-white" : ""}`}> */}
                            {shorten(tab)}
                        {/* </span> */}
                        <div
                        className="text-red-300 hover:text-red-500"
                         onClick={()=>{
                            store.dispatch({ type: "CLOSE_TAB", payload: tab});
                        }}>x</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
