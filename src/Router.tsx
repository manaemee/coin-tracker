import {BrowserRouter, Routes, Route} from "react-router-dom";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Home from "./routes/Home";
import Info from "./routes/Info";

function Router(){
return <BrowserRouter>
<Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/:coinId/*" element={<Coin/>}/>
</Routes>
</BrowserRouter>
}

export default Router;