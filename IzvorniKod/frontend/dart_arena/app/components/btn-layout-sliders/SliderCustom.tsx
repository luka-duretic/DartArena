"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Link from "next/link";
import adList from "@/public/ads.json";
import { useEffect, useState } from "react";

export default function SliderCustom() {
  const [ads, setAds] = useState(adList.ads);

  useEffect(() => {
    // biraj 4 radnom broja/indexa od 1 do 7(0 do 6)
    let index = [0];
    index.pop();
    while (index.length != 4) {
      let r = Math.floor(Math.random() * 7);
      if (!index.includes(r)) index.push(r);
    }

    // uzmi i spremi reklame sa random indexa u ads
    let tmp = [adList.ads[0]];
    tmp.pop();
    index.forEach((i) => tmp.push(adList.ads[i]));
    console.log(tmp);
    setAds(tmp);
  }, []);

  return (
    <>
      <div className="bg-modalBg text-textColorDark h-full rounded-lg">
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{
            delay: 4000, // slide automatski svake 4 sekunde
            disableOnInteraction: false, // ako korisnik klikne, autoplay se NE gasi
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className="h-full w-full"
        >
          {ads.map((ad, ind) =>
            ad.type === "video" ? (
              <SwiperSlide>
                <div
                  key={ind}
                  className="flex justify-center items-start h-full w-full rounded-lg p-4"
                >
                  <iframe
                    className="w-full h-[95%] rounded-lg"
                    src={ad.src}
                    title="YouTube video player"
                    allow={ad.allow}
                  ></iframe>
                </div>
              </SwiperSlide>
            ) : (
              <SwiperSlide>
                <Link
                  key={ind}
                  href={ad.link || ""}
                  className="flex justify-center items-start h-full w-full rounded-lg p-4"
                >
                  <img
                    src={ad.name}
                    alt={"ad"}
                    className="w-full h-[95%] rounded-lg object-contain md:object-cover"
                    id="about"
                  />
                </Link>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </>
  );
}
