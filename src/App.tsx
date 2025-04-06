import { Route, Routes } from "react-router";
import Dashboard from "./features/dashboard/Dashboard";
import Invoice from "./features/Invoice/Invoice";
import SplashScreen from "./features/SplashScreen/SplashScreen";
import AppScaffold from "./components/scaffold/AppScaffold";
import Authenticate from "./features/authentication/Authenticate";

function App() {
  return (
    <Routes>
      <Route path='/' element={<SplashScreen />} />
      <Route element={<AppScaffold />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Authenticate />} />
        <Route path='/generate-bill' element={<Invoice />} />
      </Route>
    </Routes>
  );
}

export default App;
