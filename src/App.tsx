import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./features/home/Home";
import BillGenerationForm from "./features/BillGeneration/BillGenerationForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/generate-bill' element={<BillGenerationForm />} />
      </Routes>
    </div>
  );
}

export default App;
