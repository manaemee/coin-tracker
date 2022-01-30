import { useParams } from "react-router-dom";

function Coin(){
    const {coinId} = useParams();
    return <div>hi</div>;
}

export default Coin;