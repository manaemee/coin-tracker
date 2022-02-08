import {BrowserRouter, Routes, Route} from "react-router-dom";
import Coin from "./routes/Coin";
import Home from "./routes/Home";


interface IRouterProps{

}

function Router({}:IRouterProps){
return <BrowserRouter>
<Routes>
    <Route  path={`${process.env.PUBLIC_URL}/`} element={<Home />}/>
    <Route path="/:coinId/*" element={<Coin />}/>
</Routes>
</BrowserRouter>
}

export default Router;