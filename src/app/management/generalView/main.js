"use client";

import OwnToken from "./ownToken";

const { default: CurrentEquity } = require("./currentEquity");
const { default: ProofReserve } = require("./proofReserve");
const { default: RecentRecord } = require("./recentRecord");
const { default: TransactionHistory } = require("./transactionHistory");

const GeneralView = () => {
  return (
    <div className="w-full flex gap-12 mb-6">
      <div className="w-3/5  flex flex-col gap-8">
        <CurrentEquity />
        <ProofReserve />
        <TransactionHistory />
      </div>
      <div className="w-2/5 flex flex-col gap-8">
        <RecentRecord />
        <OwnToken />
      </div>
    </div>
  );
};

export default GeneralView;
