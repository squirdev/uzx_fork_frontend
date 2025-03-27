"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const Logo = () => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    setImageUrl("/logo1.png");
  }, []);

  if (!imageUrl) {
    return null;
  }

  return (
    <Image
      src={imageUrl}
      alt="logo"
      width={108}
      height={42}
      loading="lazy"
    />
  );
};

export default Logo;
