import { formatCurrency, timeAgo } from "@/lib/utils";
import CandlestickChart from "./CandlestickChart";
import { Separator } from "./ui/separator";
import DataTable from "./DataTable";
import { fetcher } from "@/lib/coingecko.action";
import CoinHeader from "./CoinHeader";

const LiveDataWrapper = async ({
  coinId,
  children,
  poolId,
  coin,
  coinOHLCData,
}: LiveDataProps) => {
  //   const pool_address = poolId.replace("_", ":") ?? "";
  //   const network = "bsc";

  //   const network = await fetcher<unknown>("/onchain/networks", {
  //     "x-cg-demo-api-key": process.env.NEXT_PUBLIC_COINGECKO_API_KEY,
  //   });
  //   console.log(network);

  //   const tradeData = await fetcher<Trade>(
  //     `/network/${network}/pools/${pool_address}/trades`
  //   );

  const tradeColumns: DataTableColumn<Trade>[] = [
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (trade) => (trade.price ? formatCurrency(trade.price) : "-"),
    },
    {
      header: "Amount",
      cellClassName: "amount-cell",
      cell: (trade) => trade.amount?.toFixed(4) ?? "-",
    },
    {
      header: "Value",
      cellClassName: "value-cell",
      cell: (trade) => (trade.value ? formatCurrency(trade.value) : "-"),
    },
    {
      header: "Buy/Sell",
      cellClassName: "type-cell",
      cell: (trade) => (
        <span
          className={trade.type === "b" ? "text-green-500" : "text-red-500"}
        >
          {trade.type === "b" ? "Buy" : "Sell"}
        </span>
      ),
    },
    {
      header: "Time",
      cellClassName: "time-cell",
      cell: (trade) => (trade.timestamp ? timeAgo(trade.timestamp) : "-"),
    },
  ];

  return (
    <section id="live-data-wrapper">
      <CoinHeader
        name={coin.name}
        image={coin.image.large}
        livePrice={coin.market_data.current_price.usd}
        livePriceChangePercentage24h={
          coin.market_data.price_change_percentage_24h_in_currency.usd
        }
        priceChangePercentage30d={
          coin.market_data.price_change_percentage_30d_in_currency.usd
        }
        priceChange24h={coin.market_data.price_change_24h_in_currency.usd}
      />
      <Separator className="divider" />

      <div className="trend">
        <CandlestickChart coinId={coinId} data={coinOHLCData}>
          <h4>Trend Overview</h4>
        </CandlestickChart>
      </div>
      <Separator className="divider" />
      {/* {tradeColumns && (
        <div className="trades">
          <h4>Recent Trades</h4>
          <DataTable
            columns={tradeColumns}
            data={tradeData}
            rowKey={(_, index) => index}
            tableClassName="trades-table"
          />
        </div>
      )} */}
    </section>
  );
};
export default LiveDataWrapper;
