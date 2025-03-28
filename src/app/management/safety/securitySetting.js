"use client";

const { Button } = require("@material-tailwind/react");
const { default: Image } = require("next/image");
const {
  AiFillExclamationCircle,
  AiFillCheckCircle,
} = require("react-icons/ai");

export default function SecuritySettingItem({
  title,
  image,
  description,
  email,
  verified,
  onClick,
}) {
  return (
    <div className="w-full flex justify-between items-center py-4 border-b border-hoverblack/10">
      <div className="w-full flex items-center gap-4">
        <Image src={image} width={36} height={36} alt="image" />
        <div className="flex flex-col">
          <p>{title}</p>
          <p className="text-sm text-hoverblack/70">{description}</p>
        </div>
      </div>
      <div className="w-full flex gap-2 justify-center items-center">
        {verified ? (
          <>
            <AiFillCheckCircle className="text-2xl text-green-500" />
            <p>{email}</p>
          </>
        ) : (
          <>
            <AiFillExclamationCircle className="text-2xl text-red-500" />
            <p>Not bound</p>
          </>
        )}
      </div>
      <div className="w-full flex justify-end">
        {verified ? (
          <p className="text-sm">Already bound</p>
        ) : (
          <Button
            onClick={onClick}
            variant="outlined"
            className="rounded-full px-12"
          >
            Bind
          </Button>
        )}
      </div>
    </div>
  );
}
