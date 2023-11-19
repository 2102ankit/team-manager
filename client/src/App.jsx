import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserListPage from "./components/UserListPage";
// import { fetchUsers } from './redux/actions/userActions';
// import Team from "./components/Team";
import TeamListPage from "./components/TeamListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserListPage />}></Route>
        <Route path="/team" element={<TeamListPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
