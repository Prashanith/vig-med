import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path='/'></Route>
          <Route path='/generate-bill'></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
