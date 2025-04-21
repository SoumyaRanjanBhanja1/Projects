import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import LoginWithOTP from "./components/LoginWithOTP";



const App=()=>{
  return(
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Signup/>}/>
            <Route path="/Login" element={<LoginWithOTP/>}/>
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;