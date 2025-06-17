export const getTokenImage = async (contractAddress) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contractAddress}`
    );
    const data = await response.json();
  } catch (error) {
    console.error("Error fetching token image:", error);
  }
};

export const getTokenDataById = async (tokenId) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${tokenId}`
    );
    const data = await response.json();

    const tokenData = {
      image: data.image.large, // Token image URL
      price: data.market_data.current_price.usd, // Price in USD
      change24h: data.market_data.price_change_percentage_24h, // 24h price change %
    };

    return tokenData;
  } catch (error) {
    console.error("Error fetching token data:", error);
    return null;
  }
};

export const getTokenData = async () => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?ids=bitcoin,ethereum,dogecoin,ripple,litecoin,filecoin,cardano,eos,binancecoin,polkadot,curve-dao-token,official-trump,sui,cronos,solana&vs_currency=usd&include_24hr_change=true`
    );
    const data = await response.json();

    console.log(data);

    return {
      btc: data[0],
      eth: data[1],
      xrp: data[2],
      bnb: data[3],
      sol: data[4],
      doge: data[5],
      ada: data[6],
      sui: data[7],
      ltc: data[8],
      dot: data[9],
      trump: data[10],
      fil: data[11],
      crv: data[12],
      eos: data[13],
    };
  } catch (error) {
    console.error("Error fetching token data:", error);
    return null;
  }
};
