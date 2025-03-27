import Image from "next/image";

const AuthBtn = ({ className, iconPath, label, alt, onClick }) => {
  return (
    <button
      className={`flex flex-col items-center ${className}`}
      onClick={onClick}
    >
      <div className="bg-blue2 w-[35px] h-[35px] rounded-[7px] flex justify-center items-center">
        <Image src={iconPath} alt={alt} width={18} height={22.8} priority />
      </div>
      <p className="text-white text-xs font-bold">{label}</p>
    </button>
  );
};

export default AuthBtn;
