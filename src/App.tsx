import { Route, Routes } from "react-router-dom";
import Home from "./features/home/Home";
import BillGenerationForm from "./features/BillGeneration/BillGenerationForm";
import SplashScreen from "./features/SplashScreen/SplashScreen";
import AppScaffold from "./components/scaffold/AppScaffold";

function App() {
  return (
    <Routes>
      <Route element={<AppScaffold />}>
        <Route path='/' element={<SplashScreen />} />
        <Route path='/home' element={<Home />} />
        <Route path='/generate-bill' element={<BillGenerationForm />} />
      </Route>
    </Routes>
  );
}

export default App;
