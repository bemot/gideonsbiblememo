import React, { useState } from "react";
import "./App.css"; // Or wherever y-inspired CSS is located
import GideonsReading from "./bible/gideonsreading.js";
import BibleReader from "./bible/showbiblefrom3.js";
import VerseMemorizeOG from "./bible/biblememorize_og";
import VerseMemorizeKJ from "./bible/biblememorize_kj";

function App() {
  const [activeComponent, setActiveComponent] = useState("GideonsReading");

  return (
    <div className="app-container">
      <div className="nav-container">
        <button
          onClick={() => setActiveComponent("GideonsReading")}
          className={activeComponent === "GideonsReading" ? "active" : ""}
        >
          Gideons Reading on the date
        </button>
        <button
          onClick={() => setActiveComponent("BibleReader")}
          className={activeComponent === "BibleReader" ? "active" : ""}
        >
          Bible Reader
        </button>
        <button
          onClick={() => setActiveComponent("VerseMemorizeOG")}
          className={activeComponent === "VerseMemorizeOG" ? "active" : ""}
        >
          Memorizer Ogienko
        </button>
        <button
          onClick={() => setActiveComponent("VerseMemorizeKJ")}
          className={activeComponent === "VerseMemorizeKJ" ? "active" : ""}
        >
          Memorizer King James
        </button>
      </div>

      {activeComponent === "GideonsReading" && <GideonsReading />}
      {activeComponent === "BibleReader" && <BibleReader />}
      {activeComponent === "VerseMemorizeOG" && <VerseMemorizeOG />}
      {activeComponent === "VerseMemorizeKJ" && <VerseMemorizeKJ />}
    </div>
  );
}

export default App;
