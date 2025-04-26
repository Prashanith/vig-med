import { Route, Routes } from "react-router";
import Dashboard from "./features/dashboard/Dashboard";
import Invoice from "./features/Invoice/Invoice";
import SplashScreen from "./features/SplashScreen/SplashScreen";
import AppScaffold from "./components/scaffold/AppScaffold";
import Authenticate from "./features/authentication/Authenticate";
import { ProtectedRoute } from "./utils/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path='/' element={<SplashScreen />} />
      <Route path='/login' element={<Authenticate />} />
      <Route element={<AppScaffold />}>
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/generate-bill'
          element={
            <ProtectedRoute>
              <Invoice />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
