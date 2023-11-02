// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alerts from "./components/layout/Alerts";

import Sidebar from "./components/layout/Sidebar";

// Pages
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Assign from "./pages/Assign";
import Marks from "./pages/Marks";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// States
import AuthState from "./contexts/auth/AuthState";
import AlertState from "./contexts/alert/AlertState";
import MentorState from "./contexts/mentors/MentorState";

function App() {
  return (
    <AuthState>
      <AlertState>
        <MentorState>
          <Router>
            <Routes>
              <Route exact path="/" element={<Homepage />} />
            </Routes>
            <Alerts />
            <Routes>
              <Route
                exact
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Sidebar />
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/dashboard/assign"
                element={
                  <PrivateRoute>
                    <Sidebar />
                    <Assign />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/dashboard/marks"
                element={
                  <PrivateRoute>
                    <Sidebar />
                    <Marks />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Router>
        </MentorState>
      </AlertState>
    </AuthState>
  );
}

export default App;
