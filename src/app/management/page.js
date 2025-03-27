"use client";

import CurrentEquity from "./currentEquity";
import ProofReserve from "./proofReserve";
import TransactionHistory from "./transactionHistory";
import RecentRecord from "./recentRecord";

export default function Home() {
  return (
    <div className="content bg-white">
      <div className="brands container mx-auto my-2 overflow-hidden">
        <div className="w-full flex gap-12 my-12">
          <div className="w-3/5  flex flex-col gap-8">
            <CurrentEquity />
            <ProofReserve />
            <TransactionHistory />
          </div>
          <div className="w-2/5">
            <RecentRecord />
          </div>
        </div>
      </div>
    </div>
  );
}
