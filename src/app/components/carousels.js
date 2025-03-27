"use client";

import { Carousel } from "@material-tailwind/react";

export function CarouselWithContent() {
  return (
    <Carousel
      className="w-[245px] h-[537px] border border-white rounded-lg overflow-hidden"
      autoplay={true}
      autoplayDelay={5000}
      loop={true}
      prevArrow={() => <></>}
      nextArrow={() => <></>}
    >
      <div className="relative w-[245px] h-[537px]">
        <img
          src="/gif/brand1.gif"
          alt="brand1"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative h-full w-full">
        <img
          src="/gif/brand2.gif"
          alt="brand2"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative h-full w-full">
        <img
          src="/gif/brand3.gif"
          alt="brand3"
          className="h-full w-full object-cover"
        />
      </div>
    </Carousel>
  );
}
