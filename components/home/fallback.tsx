import DataTable from "../DataTable";

/**
 * Skeleton UI for Trending Coins.
 * Leverages classes from #trending-coins-fallback in your CSS.
 */
export const TrendingCoinsFallback = () => {
  const skeletonRows = Array.from({ length: 6 }, (_, i) => ({ id: i }));

  const columns: DataTableColumn<any>[] = [
    {
      header: "Name",
      cellClassName: "name-cell",
      cell: () => (
        <div className="name-link animate-pulse">
          {/* Matches .name-image in your CSS */}
          <div className="name-image skeleton" />
          {/* Matches .name-line in your CSS */}
          <div className="name-line skeleton" />
        </div>
      ),
    },
    {
      header: "24h Changes",
      cellClassName: "change-cell",
      cell: () => <div className="change-line skeleton animate-pulse" />,
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: () => <div className="price-line skeleton animate-pulse" />,
    },
  ];

  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <div id="trending-coins">
        <DataTable
          columns={columns}
          data={skeletonRows}
          rowKey={(item) => item.id}
          tableClassName="trending-coins-table"
          headerCellClassName="py-3!"
          bodyCellClassName="py-2!"
        />
      </div>
    </div>
  );
};

/**
 * Skeleton UI for Coin Overview.
 * Leverages classes from #coin-overview-fallback in your CSS.
 */
export const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback">
      <div className="header pt-2 animate-pulse">
        {/* Matches .header-image in your CSS (14x14 md) */}
        <div className="header-image skeleton" />

        <div className="info">
          {/* Matches .header-line-sm in your CSS */}
          <div className="header-line-sm skeleton" />
          {/* Matches .header-line-lg in your CSS */}
          <div className="header-line-lg skeleton" />
        </div>
      </div>
      {/* Optional: Add chart skeleton if your CSS .chart rules are used here */}
      <div className="chart mt-4">
        <div className="chart-skeleton skeleton opacity-20" />
      </div>
    </div>
  );
};
