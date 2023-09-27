import React, { useState, Suspense } from "react";
import "./App.css"; // Or wherever y-inspired CSS is located
const GideonsReading = React.lazy(() => import("./bible/gideonsreading.js"));
const BibleReader = React.lazy(() => import("./bible/showbiblefrom3.js"));
const VerseMemorizeOG = React.lazy(() => import("./bible/biblememorize_og"));
//import VerseMemorizeKJ from "./bible/biblememorize_kj";

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
      </div>
      <Suspense fallback={<div className="loader"></div>}>
        {activeComponent === "GideonsReading" && <GideonsReading />}
      </Suspense>
      <Suspense fallback={<div className="loader"></div>}>
        {activeComponent === "BibleReader" && <BibleReader />}
      </Suspense>
      <Suspense fallback={<div className="loader"></div>}>
        {activeComponent === "VerseMemorizeOG" && <VerseMemorizeOG />}
      </Suspense>
    </div>
  );
}

export default App;
