import { Spinner } from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";

export default function AppLoginPanel() {
  const [qrLoading, setQrLoading] = useState(true);
  return (
    <div className="w-full flex justify-center my-24 items-center gap-8">
      <div className="relative w-[212px] h-[212px] flex items-center justify-center">
        {qrLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300 animate-pulse">
            <Spinner />
          </div>
        )}
        <Image
          src={"/qrCode.png"}
          width={212}
          height={212}
          alt="QR Code"
          onLoad={() => setQrLoading(false)}
          onError={() => setQrLoading(false)}
        />
      </div>
      <Image src={"/loginPhone.png"} width={108} height={212} alt="login" />
    </div>
  );
}
