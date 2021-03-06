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
const Container = styled.div`
padding:10px 20px;
`; 
function Info(){
    const {coinId} = useParams();
    const {isLoading, data} = useQuery<Idscription>("description", ()=>fechDescription(coinId!));
    return(
      <Container>{isLoading ? "Loading.." : <Overview>
        <OverviewItem>
       {data?.description.en ? data?.description.en : "This page is empty"}
       </OverviewItem>
   </Overview>}</Container>
    )
} 

export default Info;