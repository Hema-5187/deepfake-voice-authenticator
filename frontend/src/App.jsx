import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import Register from "./components/Auth/Register";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import DetectionPage from "./pages/DetectionPage";
import HistoryPage from "./pages/HistoryPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/register"
          element={<Register />}
        />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route

          path="/detect"

          element={

            <ProtectedRoute>

                <DetectionPage />

             </ProtectedRoute>

          }

        />



        <Route
    path="/history"
    element={
        <ProtectedRoute>
            <HistoryPage />
        </ProtectedRoute>
    }
/>

<Route
    path="/analytics"
    element={
        <ProtectedRoute>
            <AnalyticsPage />
        </ProtectedRoute>
    }
/>

<Route
    path="/profile"
    element={
        <ProtectedRoute>
            <ProfilePage />
        </ProtectedRoute>
    }
/>

<Route
    path="/settings"
    element={
        <ProtectedRoute>
            <SettingsPage />
        </ProtectedRoute>
    }
/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;