import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faGift, faWallet, faUserAlt, faMoon, faLightbulb} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Link } from "react-router-dom";
import { useSetRecoilState, useRecoilValue} from "recoil";
import { isDarkAtom } from "../atom";

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
right: 33%;
width: 480px;
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

`;
const ProfileImg = styled.img`
width:50px;
height: 50px;
margin-right: 20px;
border-radius: 50%;

`;
const TotalAssets = styled.div`
margin: 20px;
padding: 30px;
background-color: ${props=>props.theme.accentBgColor};
border-radius: 20px;

margin-top: 120px;
h2{
font-size: 15px;
margin-bottom: 10px;
font-weight:200;
}
h3{
    font-weight: 700;
    font-size: 25px;
    margin-bottom: 20px;
}
div{
    display: flex;
    justify-content: space-between;
    span{
        padding: 15px;
        border-radius: 20px;
        background-color: ${props=>props.theme.darkColor};
    }
}
`;
const Title = styled.h1`
 letter-spacing: 2px;
 margin-bottom: 12px;
 font-weight: 700;
 text-transform: uppercase;
`;
const Trending =styled.ul`
display: flex;
overflow: scroll;
margin-bottom: 20px;
`;
const TrendList = styled.li`
padding: 0 18px;
  display: flex;

  align-items: center;
margin-right: 30px;
background-color: ${props=>props.theme.darkColor};

border-radius: 20px;

img{
    width: 40px;
    height: 40px;
    margin-right: 10px;
}
`;
const Trend__left = styled.div`
display: flex;
  align-items: center;
  margin-bottom: 5px;
margin-right: 20px;
  div{
    display: flex;
    flex-direction: column;
    span{
        margin: 10px;
    }
    span:first-child{
        font-weight: 800;
        font-size: 20px;
    }
}
`;
const Trend__right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  span{
        margin-bottom: 10px;
    }
    span:last-child{
        color:red;
    }
`;
const Market = styled.div`
ul{
   li{
       img{
           width: 20px;
           height: 20px;
       }
   } 
}
`;
const Market_List = styled.li`

margin-bottom: 20px;
background-color: ${props=>props.theme.darkColor};
padding: 10px 5px;
border-radius: 20px;
a{
    display: flex;
justify-content: space-between;
align-items: center;   
}
div{
    margin-left: 10px;
    img{
   
    }
    span{
        margin-left: 10px;
        text-transform: uppercase;
    
}
}`
const Market_Title = styled.div`
display: flex;
justify-content:space-between;
margin-bottom: 20px;
padding: 0px 20px;
`
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

function Home(){
    const {isLoading, data} = useQuery<Icoins[]>("allCoins", fetchCoins);
    const isDark = useRecoilValue(isDarkAtom);
    const setterFn = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setterFn(prev => !prev);

    const trend = data?.slice(0,50).map(coin => (
        {
          name: coin.name,
          symbol: coin.symbol,
          img:coin.image,
          price:coin.current_price,
          change:coin.price_change_percentage_24h
        } 
      )).sort((a,b)=>{
          return b.change - a.change
      });
    return (
<Container>
<Header>
            <div>
                <ProfileImg src="https://i.pinimg.com/564x/57/68/8e/57688e97d2671d0656a774e5c11efdcd.jpg"/>
                </div>
                <div>
                <Username>manaemee</Username>
                </div>
                <div>
                    {isDark ?  <FontAwesomeIcon icon={faLightbulb} size="lg" onClick={toggleDarkAtom}/> :  <FontAwesomeIcon icon={faMoon} size="lg" onClick={toggleDarkAtom}/>}
               
                </div>
            </Header>


            <TotalAssets>
                <h2>Portfolio value</h2>
                <h3>$15,136.32</h3>
                <div>
                    <span>Deposit</span>
                    <span>Withdraw</span>
                </div>
            </TotalAssets>
       <Title>top gainers</Title>
       {isLoading ? "Loading. . . " : (
            <Trending>{trend?.slice(0,10).map((coin)=>
            <TrendList key={coin.name}>
                <Trend__left>
                <img src={coin.img}/>
                <div>
                    <span>{coin.name}</span> 
                    <span>{`$${coin.price}`}</span>     
                </div>
                </Trend__left>
                 <Trend__right>
                    <span>{`${coin.change.toFixed(1)}%`}</span>
                </Trend__right>
                        </TrendList>)}
                </Trending>)}     
                <Title>Market</Title>
             <Market>
                 <ul>
                     <Market_Title>
                     <span>coin</span>
                     <span>price(USD)</span>
                     <span>market cap</span>
                     </Market_Title>
                     {data?.map((coin)=>
                     <Market_List>
                         <Link to={`/${coin.id}`} state={{name:coin.id, symbol:coin.symbol, price:coin.current_price}}>
                         <div>
                        <img src={coin.image}/>
                        <span>{coin.symbol}</span> 
                        </div>
                        <span>{coin.current_price}</span>
                        <span>{coin.market_cap}</span>
                        </Link>
                     </Market_List>

                     )}
                 </ul>
                </Market> 
            <Nav>  
                <Nav__list>
                <Link to={"/coin-tracker/"}>
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
    )
}

export default Home;