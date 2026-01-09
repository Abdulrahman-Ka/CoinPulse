import DataTable from "@/components/DataTable";

export const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback">
      <div className="header pt-2">
        <div className="header-image skeleton" />
        <div className="info">
          <div className="header-line-sm skeleton" />
          <div className="header-line-lg skeleton" />
        </div>
      </div>
      <div className="chart">
        <div className="chart-skeleton skeleton" />
      </div>
    </div>
  );
};

export const TrendingCoinsFallback = () => {
  const columns = [
    {
      header: "Name",
      cell: () => (
        <div className="name-link">
          <div className="name-image skeleton" />
          <div className="name-line skeleton" />
        </div>
      ),
    },
    {
      header: "24h Change",
      cell: () => (
        <div className="price-change">
          <div className="change-icon skeleton" />
          <div className="change-line skeleton" />
        </div>
      ),
    },
    {
      header: "Price",
      cell: () => <div className="price-line skeleton" />,
    },
  ];

  const dummyData = Array.from({ length: 6 }, (_, i) => ({ id: i }));

  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <DataTable
        data={dummyData}
        columns={columns as any}
        rowKey={(item: any) => item.id}
        tableClassName="trending-coins-table"
      />
    </div>
  );
};

export const CategoriesFallback = () => {
  const columns = [
    {
      header: "Category",
      cellClassName: "category-cell",
      cell: () => <div className="category-line skeleton" />,
    },
    {
      header: "Top Gainers",
      cellClassName: "top-gainers-cell",
      cell: () => (
        <div className="flex gap-1">
          <div className="gainer-image skeleton" />
          <div className="gainer-image skeleton" />
          <div className="gainer-image skeleton" />
        </div>
      ),
    },
    {
      header: "24h Change",
      cellClassName: "change-header-cell",
      cell: () => (
        <div className="change-cell">
          <div className="change-icon skeleton" />
          <div className="change-line skeleton" />
        </div>
      ),
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: () => <div className="value-skeleton-lg skeleton" />,
    },
    {
      header: "24h Volume",
      cellClassName: "volume-cell",
      cell: () => <div className="value-skeleton-md skeleton" />,
    },
  ];

  const dummyData = Array.from({ length: 10 }, (_, i) => ({ id: i }));

  return (
    <div id="categories-fallback">
      <h4>Top Categories</h4>
      <DataTable
        data={dummyData}
        columns={columns as any}
        rowKey={(item: any) => item.id}
        tableClassName="mt-3"
      />
    </div>
  );
};

export const CoinsPageFallback = () => {
  const columns = [
    {
      header: "Rank",
      cellClassName: "rank-cell",
      cell: () => <div className="h-4 w-6 skeleton" />,
    },
    {
      header: "Token",
      cellClassName: "token-cell",
      cell: () => (
        <div className="token-info">
          <div className="h-7 w-7 rounded-full skeleton" />
          <div className="h-4 w-24 skeleton" />
        </div>
      ),
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: () => <div className="h-4 w-20 skeleton" />,
    },
    {
      header: "24h Change",
      cellClassName: "change-cell",
      cell: () => (
        <div className="change-value">
          <div className="h-3.5 w-3.5 rounded-full skeleton" />
          <div className="h-4 w-14 skeleton" />
        </div>
      ),
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: () => <div className="h-4 w-28 skeleton" />,
    },
  ];

  const dummyData = Array.from({ length: 10 }, (_, i) => ({ id: i }));

  return (
    <div id="coins-page">
      <div className="content">
        <h4>All coins</h4>

        <DataTable
          data={dummyData}
          columns={columns as any}
          rowKey={(item: any) => item.id}
          tableClassName="coins-table"
          bodyRowClassName="rank-cell"
        />
      </div>
    </div>
  );
};
