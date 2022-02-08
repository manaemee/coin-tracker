import ApexChart from "react-apexcharts"
import {fetchCoinHistory} from "../api";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface Iohlc {
    0:number;
    1:number;
    2:number;
    3:number;
    4:number;
    }
interface IcoinIdProps{
    coinId:string;
    }    
    interface IRouterProps{
      toggleDark: () => void;
  }    
function Chart ({coinId}:IcoinIdProps,{}:IRouterProps) {
  const isDark = useRecoilValue(isDarkAtom);
 const {isLoading, data} = useQuery<Iohlc[]>(["coinId", coinId], ()=>fetchCoinHistory(coinId));
return(
      <div>{isLoading ? "Loading" : <ApexChart
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
              mode:isDark ? "dark": "light",
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
      />}</div>

  )  
}

export default Chart;