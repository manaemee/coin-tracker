import {fechDescription} from "../api"
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface Idscription {
description:{
  en:string;
};
}
const Overview = styled.div`


`;
const OverviewItem = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Inconsolata&display=swap');
line-height: 32px;
font-family: 'Inconsolata', monospace;
overflow: scroll;
`;
function Info(){
    const {coinId} = useParams();
    const {isLoading, data} = useQuery<Idscription>("description", ()=>fechDescription(coinId!));
    return(
      <div>{isLoading ? "Loading.." : <Overview>
        <OverviewItem>
       {data?.description.en ? data?.description.en : "This page is empty"}
       </OverviewItem>
   </Overview>}</div>

    )
} 

/* function Info (){
    const {isLoading, data} = useQuery("test", fechTest);
    console.log(data);
    return (
        <div></div>
    )
} */
export default Info;