import { Route, Routes } from "react-router";
import Dashboard from "./features/dashboard/Dashboard";
import Invoice from "./features/Invoice/Invoice";
import SplashScreen from "./features/SplashScreen/SplashScreen";
import AppScaffold from "./components/scaffold/AppScaffold";
import Authenticate from "./features/authentication/Authenticate";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import SaleForm from "./features/dashboard/features/addSale/AddSale";
import ViewSales from "./features/dashboard/features/viewSales/ViewSales";

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
        <Route
          path='/add-sale'
          element={
            <ProtectedRoute>
              <SaleForm />
            </ProtectedRoute>
          }
        />
        <Route
          path='/sales'
          element={
            <ProtectedRoute>
              <ViewSales />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
