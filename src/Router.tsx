import {BrowserRouter, Routes, Route} from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Home from "./routes/Home";

function Router(){
return <BrowserRouter>
<Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/coins" element={<Coins/>}></Route>
    <Route path="/coins/:coinId" element={<Coin/>}></Route>
</Routes>
</BrowserRouter>
}

export default Router;