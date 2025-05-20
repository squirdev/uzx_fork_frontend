export const getTokenImage = async (contractAddress) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contractAddress}`
    );
    const data = await response.json();
    console.log("Token Image URL:", data.image.large);
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

    console.log("Token Data:", tokenData);
    return tokenData;
  } catch (error) {
    console.error("Error fetching token data:", error);
    return null;
  }
};

export const getTokenData = async () => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,ripple,litecoin,filecoin,cardano,eos,binancecoin,polkadot,curve-dao-token,official-trump,sui,cronos,solana&vs_currencies=usd&include_24hr_change=true`
    );
    const data = await response.json();

    return {
      btc: data["bitcoin"],
      eth: data["ethereum"],
      doge: data["dogecoin"],
      xrp: data["ripple"],
      ltc: data["litecoin"],
      fil: data["filecoin"],
      ada: data["cardano"],
      eos: data["eos"],
      bnb: data["binancecoin"],
      dot: data["polkadot"],
      crv: data["curve-dao-token"],
      trump: data["official-trump"],
      sui: data["sui"],
      cro: data["cronos"],
      sol: data["solana"],
    };
  } catch (error) {
    console.error("Error fetching token data:", error);
    return null;
  }
};
