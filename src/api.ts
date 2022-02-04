const BASE_URL = `https://api.coingecko.com/api/v3/coins/`;
export  function fetchCoins(){
return fetch(`${BASE_URL}/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
.then((response)=> response.json());
}


export function fetchCoinHistory(coinId: string){
    const endDate = Math.floor(Date.now()/ 1000);
    const startDate = endDate - 60*60*24*7*2;
    return fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=14`)
    .then(response => response.json());
}