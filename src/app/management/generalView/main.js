"use client";

import OwnToken from "./ownToken";

const { default: CurrentEquity } = require("./currentEquity");
const { default: ProofReserve } = require("./proofReserve");
const { default: RecentRecord } = require("./recentRecord");
const { default: TransactionHistory } = require("./transactionHistory");

const GeneralView = ({ userProfile }) => {
  return (
    <div className="w-full flex md:flex-row flex-col gap-12 mb-6">
      <div className=" md:w-3/5 w-full flex flex-col gap-8">
        <CurrentEquity userProfile={userProfile} />
        <ProofReserve />
        <div className="hidden md:block">
          <TransactionHistory />
        </div>
      </div>
      <div className="md:w-2/5 w-full flex flex-col gap-8">
        <RecentRecord />
        <OwnToken />
      </div>
      <div className="block md:hidden">
        <TransactionHistory />
      </div>
    </div>
  );
};

export default GeneralView;
