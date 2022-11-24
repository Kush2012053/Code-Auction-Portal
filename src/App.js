import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Auction from "./components/auction/Auction";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Login from "./components/login/Login";
import Rules from "./components/rules/Rules";
import Solve from "./components/solve/Solve";
import Transaction from "./components/transaction/Transaction";
import WithNav from "./components/withnav/WithNav";
import WithoutNav from "./components/withoutnav/WithoutNav";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="bodydiv">
          <Routes>
            <Route element={<WithoutNav />}>
              <Route path="" element={<Login />} />
            </Route>
            <Route element={<WithNav />}>
              <Route path="dashboard/rules" element={<Rules />} />
              <Route path="dashboard/auction" element={<Auction />} />
              <Route path="dashboard/solve" element={<Solve />} />
              <Route path="dashboard/leaderboard" element={<Leaderboard />} />
              <Route path="dashboard/transaction" element={<Transaction />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
