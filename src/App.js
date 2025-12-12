import React, { useState, Suspense } from "react";
import "./App.css"; // Or wherever y-inspired CSS is located
const GideonsReading = React.lazy(() => import("./bible/gideonsreading.js"));
const BibleReader = React.lazy(() => import("./bible/showbiblefrom3.js"));
const VerseMemorizeOG = React.lazy(() => import("./bible/biblememorize_og"));
const VerseMemorizeKJ = React.lazy(() => import("./bible/biblememorize_kj"));
const VerseMemorizeGE = React.lazy(() => import("./bible/biblememorize_ge"));

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
        <button
          onClick={() => setActiveComponent("VerseMemorizeKJ")}
          className={activeComponent === "VerseMemorizeKJ" ? "active" : ""}
        >
          Memorizer King James
        </button>
        <button
          onClick={() => setActiveComponent("VerseMemorizeGE")}
          className={activeComponent === "VerseMemorizeGE" ? "active" : ""}
        >
          Memorizer German
        </button>
      </div>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        }
      >
        {activeComponent === "GideonsReading" && <GideonsReading />}
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        }
      >
        {activeComponent === "BibleReader" && <BibleReader />}
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        }
      >
        {activeComponent === "VerseMemorizeOG" && <VerseMemorizeOG />}
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        }
      >
        {activeComponent === "VerseMemorizeKJ" && <VerseMemorizeKJ />}
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        }
      >
        {activeComponent === "VerseMemorizeGE" && <VerseMemorizeGE />}
      </Suspense>
    </div>
  );
}

export default App;
