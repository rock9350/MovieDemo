import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Part_1 from "./comp/first_page";
import Sec_page from "./comp/sec_Page";

function App() {
  let [gets, setgets] = useState();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Part_1 setgets={setgets} />}></Route>
        <Route path="/movie" element={<Sec_page gets={gets} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
