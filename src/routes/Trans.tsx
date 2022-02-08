import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
const Form =styled.form`
margin-top: 50px;
div{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  span{
    text-transform: uppercase;
  }
}
`;
const Title = styled.h1`
 letter-spacing: 2px;
 margin-bottom: 30px;
 font-weight: 700;
 text-transform: uppercase;
`;
const Font =styled.div`
font-size: 25px;
display: flex;
justify-content: center;
`;
const Input = styled.input.attrs({reqired:true, type:"number"})<ItransactionProps>`
width: 100%;
padding: 15px 0px;
::placeholder{
    text-transform: uppercase;
    text-align:end;
   color:white;
   font-weight: 600;
}
color: white;
border: none;
background-color: ${props=>props.theme.darkColor};
font-size: 18px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
const Buttons = styled.div`
margin-top: 20px;
display: flex;
justify-content:space-around;
input{
  border: 30px 40px;
  text-align:center;
  width: 30%;
  border-radius: 5px;
  color: ${props=>props.theme.accentColor};
  font-weight: 700;
  font-size: 20px;
}
`;
interface ItransactionProps{
    symbol?:string;
    price?:number;
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

function Transaction({symbol, price}:ItransactionProps){
    const [coin, setCoin] = useState<number|string>();
    const [filpped, setFlipped] = useState(false);
 const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      setCoin(event.currentTarget.value); 
    } 
    const onSubmit = (event:React.FormEvent<HTMLInputElement>) => {
      if(coin != undefined){
        alert("succeed transaction");
        window.location.reload();
      }else{
        alert("❌ fill out the form")
      }
     
    }
    const handleReset = () =>{
      setCoin(0);
    }
    const handleFlip = () => {
      setFlipped(current => !current);
    }
    return(
    <Form >
        <Title>Transaction</Title>
    <div>
    <Input 
        placeholder="1"
        value={filpped ? Number(coin) / Number(price) :coin}
        onChange={onChange}
        disabled={filpped === true}
        /> 
      <span>{symbol}</span>
        </div>
        <Font onClick={handleFlip}>
             <FontAwesomeIcon icon={ faExchangeAlt} size="lg"/>
        </Font>    
       <div>
       <Input
        placeholder={String(price)}
        value={filpped ? coin : Number(coin) * Number(price)}
        onChange={onChange}
        disabled={filpped === false}
        /> 
       <span>USD</span>
         </div> 
         <Buttons>
           <input type="button" value="reset" onClick={handleReset}/>
           <input type="button" value="buy" onClick={onSubmit}/>
        </Buttons>
    </Form>
    )
} 
export default Transaction;