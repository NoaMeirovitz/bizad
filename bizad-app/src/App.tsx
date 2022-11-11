import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { Home } from "./components/home/Home";
import { Nav } from "./components/nav/nav";
import { About } from "./components/about/about";
import { Services, User } from "./components/services/services";
import { UpdateService } from "./components/service-page/UpdateService";

function App() {
  const [user, setUser] = useState<User | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="App">
      {user && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/services"
          element={<Services user={user} setUser={setUser} />}
        />
        <Route
          path="/:serviceName"
          element={<UpdateService user={user} setUser={setUser} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
