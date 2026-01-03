import DataTable from "@/components/DataTable";
import Image from "next/image";

export default function Home() {
  return (
    <main className="main-container">
      <section className="home-grid">
        <div id="coin-overview">
          <div className="header pt-2">
            <Image
              src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
              alt="bitcoin"
              width={56}
              height={56}
            />
            <div className="info">
              <p>Bitcoin / BTC</p>
              <h1>$89,113.00</h1>
            </div>
          </div>
        </div>
        <p>Coin Overview</p>
        <p>Trending Coins</p>
        <DataTable columns={[{
          header: "Title",
          cell: function (row: never, index: number): React.ReactNode {
            throw new Error("Function not implemented.");
          }
        }, {
          header: "Price",
          cell: function (row: never, index: number): React.ReactNode {
            throw new Error("Function not implemented.");
          }
        }]} data={[]} rowKey={function (row: never, index: number): React.Key {
          throw new Error("Function not implemented.");
        } } />
      </section>
      <section className="w-full mt-7 space-y-4">
        <p>Categories</p>
      </section>
    </main>
  );
}
