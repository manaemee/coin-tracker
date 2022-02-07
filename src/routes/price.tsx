import {fetchPriceInfo} from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";


interface IpriceProps{
name: string;
id: string;
symbol: string;
ath_date: string;
atl_date: string;
image: string;
last_updated: string;
ath:number;
ath_change_percentage:number;
atl:number;
atl_change_percentage:number;
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

const Overview = styled.div`

`;
const OverviewItem = styled.div`
padding: 10px;
background-color: ${props=>props.theme.darkColor};
margin-bottom: 20px;
text-align: center;
border-radius: 10px;
text-transform: uppercase;
font-weight: 600;
`;
interface IcoinIdProps{
    coinId:string
    }   
function Price({coinId}:IcoinIdProps){
    const {isLoading, data} = useQuery<IpriceProps[]>("price", fetchPriceInfo);
    const coin = data?.find(v => v.id === coinId);
    return(
        <div>{isLoading ? "Laoding..." :      <Overview>
        <OverviewItem>
           <span>symbol : </span>
           <span>{coin?.symbol}</span>
       </OverviewItem>
       <OverviewItem>
           <span>alh_date : </span>
           <span>{coin?.ath_date.slice(0, 10)}</span>
       </OverviewItem>
       <OverviewItem>
           <span>ath : </span>
           <span>{coin?.ath}</span>
       </OverviewItem>
       <OverviewItem>
           <span>atl_date : </span>
           <span>{coin?.atl_date.slice(0,10)}</span>
       </OverviewItem>
       <OverviewItem>
           <span>atl : </span>
           <span>{coin?.atl}</span>
       </OverviewItem>
       <OverviewItem>
           <span>ath_change_percentage : </span>
           <span>{coin?.ath_change_percentage}</span>
       </OverviewItem>
       <OverviewItem>
           <span>atl_change_percentage : </span>
           <span>{coin?.atl_change_percentage}</span>
       </OverviewItem>
       <OverviewItem>
           <span>high_24h : </span>
           <span>{coin?.high_24h}</span>
       </OverviewItem>
       <OverviewItem>
           <span>low_24h : </span>
           <span>{coin?.low_24h}</span>
       </OverviewItem>
   </Overview>}</div>
       
    )
}
export default Price;