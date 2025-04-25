import Image from "next/image";

const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex flex-col justify-center items-center bg-black">
      <Image src={"/loading/loading.gif"} width={140} height={10} alt="" />
      <p className="text-blue2 text-sm -mt-8">www.UZXKR.com</p>
    </div>
  );
};

export default LoadingScreen;
