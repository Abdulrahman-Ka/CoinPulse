import CoinsPagination from "@/components/CoinsPagination";
import DataTable from "@/components/DataTable";
import { fetcher } from "@/lib/coingecko.action";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const page = async ({ searchParams }: NextPageProps) => {
  const { page } = await searchParams;

  const currentPage = Number(page) || 1;
  const perPage = 10;

  let coinsData;
  try {
    coinsData = await fetcher<CoinMarketData[]>("/coins/markets", {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: perPage,
      page: currentPage,
      sparkline: "false",
      price_change_percentage: "24h",
    });
  } catch (error) {
    console.error("error fetching coins Data : ", error);
    return (
      <main id="coins-page">
        <div className="content">
          <h4>All coins</h4>
          <p className="text-red-500">
            Failed to load coins. Please try again later.
          </p>
        </div>
      </main>
    );
  }
  const hasNextPage = coinsData?.length === perPage;
  const estimatedTotalPages =
    currentPage >= 100 ? Math.ceil(currentPage / 100) * 100 + 100 : 100;

  const columns: DataTableColumn<CoinMarketData>[] = [
    {
      header: "Rank",
      cellClassName: "rank-cell",
      cell: (coin) => (
        <Link href={`/coins/${coin.id}`} aria-label={`View ${coin.name}`}>
          #{coin.market_cap_rank}
        </Link>
      ),
    },
    {
      header: "Token",
      cellClassName: "token-cell",
      cell: (coin) => (
        <div className="token-info">
          <Image src={coin.image} alt={coin.name} width={36} height={36} />
          <p>
            {coin.name} ({coin.symbol.toUpperCase()})
          </p>
        </div>
      ),
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (coin) => formatCurrency(coin.current_price),
    },
    {
      header: "24h Change",
      cellClassName: "change-cell",
      cell: (coin) => {
        const isTrendingUp = coin.price_change_percentage_24h > 0;

        return (
          <div
            className={cn(
              "change-value",
              isTrendingUp ? "text-green-500" : "text-red-500"
            )}
          >
            <p className="flex items-center">
              {isTrendingUp && "+"}
              {formatPercentage(coin.price_change_percentage_24h)}
            </p>
          </div>
        );
      },
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: (coin) => formatCurrency(coin.market_cap),
    },
  ];

  return (
    <main id="coins-page">
      <div className="content">
        <h4 className="">All coins</h4>
        <DataTable
          columns={columns}
          data={coinsData || []}
          rowKey={(coin) => coin.id}
          tableClassName="coins-table"
        />
        <CoinsPagination
          currentPage={currentPage}
          totalPages={estimatedTotalPages}
          hasMorePages={hasNextPage}
        />
      </div>
    </main>
  );
};
export default page;
