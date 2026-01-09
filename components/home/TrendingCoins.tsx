import { fetcher } from "@/lib/coingecko.action";
import DataTable from "../DataTable";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import Image from "next/image";
import { TrendingCoinsFallback } from "./fallback";
import { TrendingDown, TrendingUp } from "lucide-react";

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
        <div className="flex items-center gap-2">
          <Image
            src={coin.item.large}
            alt={coin.item.name}
            width={32}
            height={32}
            className="name-image"
          />
          <p>{coin.item.name}</p>
        </div>
      ),
    },
    {
      header: "24h Changes",
      cellClassName: "change-cell",
      cell: (coin) => {
        const item = coin.item;
        const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;

        return (
          <div
            className={cn(
              "price-change",
              isTrendingUp ? "text-green-500" : "text-red-500"
            )}
          >
            <p className="flex items-center">
              {isTrendingUp ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
              {formatPercentage(item.data.price_change_percentage_24h.usd)}
            </p>
          </div>
        );
      },
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
