
import { Link,  useMatch,  Route ,Routes, useParams} from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars , faHome, faGift, faWallet, faUserAlt} from "@fortawesome/free-solid-svg-icons";
import Chart from "./Chart";
import Info from "./Info";
import Price from "./price";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import Transaction  from "./Trans";

const Container = styled.div`
padding: 0px 20px;
max-width: 480px;
margin: 0 auto;
box-sizing: border-box;
`;
const Header = styled.header`
display: flex;
align-items: center;
padding: 10px 40px;
position: fixed;
top: 0;
right: 480px;
width: 33%;
div{
    width: 33%;
    &:nth-child(2){
        text-align: center;
    }
    &:last-child{
text-align: end;
    }
}
background-color: ${props=>props.theme.accentBgColor};
`;
const Username = styled.h1`
font-weight: 700;
text-transform: uppercase;
`;
const ProfileImg = styled.img`
width:50px;
height: 50px;
margin-right: 20px;
border-radius: 50%;
`;
const Title = styled.h1`
 letter-spacing: 2px;
 margin-bottom: 12px;
 font-weight: 700;
 text-transform: uppercase;
`;
const Tabs = styled.div`
display: flex;
justify-content: space-between;
margin-top: 20px;
margin-bottom: 40px;
`;
const Tab = styled.div<{ isActive: boolean }>`
padding: 10px 30px;
border-radius: 20px;
  text-transform: uppercase;
  font-size: 0px 30px;
  font-weight: 400;
  background-color: ${(props)=> props.theme.darkColor};
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const Nav = styled.nav`
 background-color: ${props=>props.theme.accentBgColor};
 width: 100%;
 padding: 20px 50px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  right: 480px;
  box-sizing: border-box;
  width: 480px;
`;

const Nav__list = styled.ul`
  display: flex;
  justify-content: space-between;
`;

interface RouterState{
    state: {
        name:string;
        symbol:string;
        price:number;
    };
    } 
interface Icoins{
        name:string;
        id:string;
        symbol:string;
        ath_date:string;
        atl_date:string;
        image:string;
        last_updated:string;
        atl:number;
        atl_change_percentage:number;
        ath:number;
        ath_change_percentage:number;
        circulating_supply:number;
        current_price:number;
        fully_diluted_valuation:number;
        high_24h:number;
        low_24h:number;
        market_cap:number;
        market_cap_change_24h:number;
        market_cap_change_percentage_24h:number;
        market_cap_rank:number;
        max_supply:number;
        price_change_24h:number;
        price_change_percentage_24h:number;
        total_supply:number;
        total_volume:number;
}
interface IRouterProps{
   
}
interface IcoinIdProps{

}
function Coin({}:IcoinIdProps){
    const {coinId} = useParams();
    const {isLoading, data} = useQuery<Icoins[]>("allCoins", fetchCoins);
    const infoMatch = useMatch("/:coinId/info");
    const chartMatch = useMatch("/:coinId");
    const priceMatch = useMatch("/:coinId/price");
    const coin = data?.find(v => v.id === coinId);
    const price = coin?.current_price;
    const symbol = coin?.symbol;
    return (
<>
 <Container>
            <Header>
                <div>
                <ProfileImg src="https://i.pinimg.com/564x/57/68/8e/57688e97d2671d0656a774e5c11efdcd.jpg"/>
                </div>
                <div>
                <Username>{coinId || "Loading..."}</Username>
                </div>
                <div>
                <FontAwesomeIcon icon={faBars} size="2x" />
                </div>
            </Header>                                 
           <Transaction symbol={symbol} price={price}/>
           <hr/>
           <Tabs>
               <Tab isActive={chartMatch !== null}>
               <Link to={`/${coinId}`}>Chart</Link>
               </Tab>
               <Tab isActive={priceMatch !== null}>
               <Link to={`/${coinId}/price`}>Price</Link>
               </Tab>
               <Tab isActive={infoMatch !== null}>
               <Link to={`/${coinId}/info`}>Info</Link>
                   </Tab>
           </Tabs>

        <Routes>
                <Route path="/" element={<Chart coinId={coinId!}/>} />
                <Route path="price" element={<Price coinId={coinId!}/>} />
                <Route path="info" element={<Info />} />
        </Routes>
            <Nav>  
                <Nav__list>
                <Link to={"/"}>
                    <li>
                   
                    <FontAwesomeIcon icon={faHome} size="lg" />
                
                    </li>
                    </Link>  
                    <li>
                    <FontAwesomeIcon icon={faGift} size="lg" />
                    </li>
                    <li>
                    <FontAwesomeIcon icon={faWallet} size="lg" />
                    </li>
                    <li>
                    <FontAwesomeIcon icon={faUserAlt} size="lg" />
                    </li>
                </Nav__list>
            </Nav>  
        </Container>
</>
    );
}

export default Coin;