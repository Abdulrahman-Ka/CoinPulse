import { fetcher } from "@/lib/coingecko.action";
import DataTable from "../DataTable";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

const TrendingCoins = async () => {
  const trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
    "/search/trending",
    undefined,
    300
  );

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
        <p className="change-line">{coin.item.market_cap_rank}</p>
      ),
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (coin) => formatCurrency(coin.item.data.price),
    },
  ];

  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>
      <div id="trending-coins">
        <DataTable
          columns={columns}
          data={trendingCoins.coins.slice(0, 6) || []}
          rowKey={(coin) => coin.item.id}
          tableClassName="trending-coins-table"
          headerCellClassName="py-3!"
          bodyCellClassName="py-2!"
        />
      </div>
    </div>
  );
};
export default TrendingCoins;
