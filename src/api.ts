const BASE_URL = `https://api.coinpaprika.com/v1`;
export  function fetchCoins(){
return fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
.then((response)=> response.json());
}

export function fetchCoinPrice(coinId : string){
    return fetch(`${BASE_URL}/tickers/${coinId}`)
    .then(response => response.json());
}