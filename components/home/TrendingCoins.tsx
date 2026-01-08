import { fetcher } from "@/lib/coingecko.action";
import DataTable from "../DataTable";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { TrendingCoinsFallback } from "./fallback";

const TrendingCoins = async () => {
  let trendingCoins;
  try {
    trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
      "/search/trending",
      undefined,
      300
    );
  } catch (error) {
    console.error("Error fetching trending coins:", error);
    return <TrendingCoinsFallback />;
  }

  const columns: DataTableColumn<TrendingCoin>[] = [
    {
      header: "Name",
      cellClassName: "name-cell",
      cell: (coin) => (
        <>
          <Image
            src={coin.item.large}
            alt={coin.item.name}
            width={32}
            height={32}
            className="name-image"
          />
          <p>{coin.item.name}</p>
        </>
      ),
    },
    {
      header: "24h Changes",
      cellClassName: "change-cell",
      cell: (coin) => (
        <p className="change-line">
          {coin.item.data.price_change_percentage_24h?.usd
            ? `${coin.item.data.price_change_percentage_24h.usd.toFixed(2)}%`
            : "N/A"}
        </p>
      ),
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (coin) => formatCurrency(coin.item.data.price),
    },
  ];

  return (
    <section id="trending-coins">
      <h4>Trending Coins</h4>
      <DataTable
        columns={columns}
        data={trendingCoins.coins.slice(0, 6) || []}
        rowKey={(coin) => coin.item.id}
        tableClassName="trending-coins-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </section>
  );
};
export default TrendingCoins;
