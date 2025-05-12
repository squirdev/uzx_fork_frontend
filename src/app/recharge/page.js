"use client";

import DepositStep from "./depositStep";
import DepositPanel from "./depositPanel";

export default function Home() {
  return (
    <div className="content bg-white md:px-0 px-4">
      <div className="brands container mx-auto my-2 overflow-hidden">
        <div className="w-full flex flex-col gap-12 my-12">
          <DepositStep />
          <DepositPanel />
        </div>
      </div>
    </div>
  );
}
