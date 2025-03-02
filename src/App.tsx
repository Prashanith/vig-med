import { Route, Routes } from "react-router-dom";
import Home from "./features/home/Home";
import BillGenerationForm from "./features/BillGeneration/BillGenerationForm";
import SplashScreen from "./features/SplashScreen/SplashScreen";

function App() {
  return (
    <Routes>
      <Route path='/' element={<SplashScreen />} />
      <Route path='/home' element={<Home />} />
      <Route path='/generate-bill' element={<BillGenerationForm />} />
    </Routes>
  );
}

export default App;
