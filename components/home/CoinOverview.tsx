import { fetcher } from "@/lib/coingecko.action";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { CoinOverviewFallback } from "./fallback";
import CandlestickChart from "@/components/CandlestickChart";

const CoinOverview = async () => {
  // Define variables outside the try block
  let coinData;
  let ohlcData;

  try {
    // Await the data fetching
    const [coin, coinOHLCData] = await Promise.all([
      fetcher<CoinDetailsData>("/coins/bitcoin", {
        dex_pair_format: "symbol",
      }),
      fetcher<OHLCData[]>("/coins/bitcoin/ohlc", {
        vs_currency: "usd",
        days: 1,
        precision: "full",
      }),
    ]);
    // Assign data if successful
    coinData = coin;
    ohlcData = coinOHLCData;

  } catch (error) {
    // Log the error
    console.error("Error fetching coin overview:", error);
    // The main function will return the fallback because coinData/ohlcData is undefined/null
  }

  // --- Main Return Logic ---

  // If data fetching failed, `coinData` will be falsy.
  // Return the Fallback component here.
  if (!coinData || !ohlcData) {
    return <CoinOverviewFallback />;
  }

  // If we reach here, data is valid. Return the main UI.
  return (
    <div id="coin-overview">
      <CandlestickChart data={ohlcData} coinId="bitcoin">
        <div className="header pt-2">
          <Image
            src={coinData.image.large}
            alt={coinData.name}
            width={56}
            height={56}
          />
          <div className="info">
            <p>
              {coinData.name} / {coinData.symbol.toUpperCase()}
            </p>
            <h1>{formatCurrency(coinData.market_data.current_price.usd)}</h1>
          </div>
        </div>
      </CandlestickChart>
    </div>
  );
};

export default CoinOverview;
