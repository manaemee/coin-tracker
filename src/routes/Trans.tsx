import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt} from "@fortawesome/free-solid-svg-icons";
const Form =styled.form`
margin-top: 50px;
`;
const Title = styled.h1`
 letter-spacing: 2px;
 margin-bottom: 30px;
 font-weight: 700;
 text-transform: uppercase;
`;
const Font =styled.div`
text-align: center;
font-size: 25px;
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
justify-content: center;
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


function Transaction({symbol, price}:ItransactionProps){
    const [coin, setCoin] = useState<number|string>();
 const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      setCoin(event.currentTarget.value); 
    } 
    const onSubmit = (event:React.FormEvent<HTMLInputElement>) => {
      alert("succeed transaction");
      window.location.reload();
    }
    return(
    <Form >
        <Title>Transaction</Title>
    <div>
    <Input 
        placeholder={`1 ${symbol}`}
        value={coin}
        onChange={onChange}
        /> 
        </div>
        <Font>
             <FontAwesomeIcon icon={ faExchangeAlt} size="lg"/>
        </Font>    
       <div>
       <Input
        placeholder={`${price} USD`}
        value={Number(coin) * Number(price)}
        /> 
       
         </div> 
         <Buttons>
           <input type="button" value="reset" />
           <input type="button" value="buy" onClick={onSubmit}/>
        </Buttons>
    </Form>
    )
} 
export default Transaction;