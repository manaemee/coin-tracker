import { useQuery } from "react-query";
import { Link, useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars , faHome, faGift, faWallet, faUserAlt} from "@fortawesome/free-solid-svg-icons";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts"
import { useState } from "react";
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
const Chart = styled.div`
margin-top: 100px;
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
interface Iohlc {
0:number;
1:number;
2:number;
3:number;
4:number;
}

function Coin(){
    const {state} = useLocation() as RouterState; 
    const coinId = state.name;
   const symbol= state.symbol;
   const price = state.price;
    const {isLoading, data} = useQuery<Iohlc[]>(["coinId", coinId], ()=>fetchCoinHistory(coinId));
    return (
<Container>
            <Header>
                <div>
                <ProfileImg src="https://i.pinimg.com/564x/57/68/8e/57688e97d2671d0656a774e5c11efdcd.jpg"/>
                </div>
                <div>
                <Username>{state?.name || "Loading..."}</Username>
                </div>
                <div>
                <FontAwesomeIcon icon={faBars} size="2x" />
                </div>
            </Header>
            <Title>top gainers</Title>
            <Chart>{isLoading ? "Loading..." : <ApexChart
        type="candlestick"
        series={
            [
                {
                  data: 
                    
                        data?.map(d => ({
                            x:d[0],
                            y:[d[1], d[2], d[3], d[4]],
                        })),
                },
              ]
        }
        options={{
            
            theme:{
                mode:"dark",
            },
           chart: {
                type: 'candlestick',
                height: 500,
                toolbar:{
                    show:false,
                },
                background: "transparent",
              },

              xaxis: {
                type: 'datetime',
                
              },
              yaxis: {
                labels:{
                    formatter:(value) => `$ ${value.toFixed(2)}`,
                },
                tooltip: {
                  enabled: true
                }
              },
       
        }}
        />}</Chart>
           <Transaction symbol={symbol} price={price}/>
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

    );
}

export default Coin;