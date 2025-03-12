"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";

export default function Slider() {
  return (
    <>
      <div className="bg-gray-100 text-gray-700 h-[90%]">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className="h-full w-full"
        >
          <SwiperSlide>
            <div className="h-full w-full flex flex-col md:flex-row items-center md:justify-center">
              <div className="md:h-full w-[80%] md:w-[60%] flex justify-center items-start md:items-center md:pl-20 xs:mt-2 sm:mt-6 md:mt-0">
                <img
                  src={"/images/display_pic.png"}
                  alt={"game modes"}
                  className="w-full md:w-[90%] h-[15rem] xs:h-[16.5rem] md:h-[33rem] object-contain  md:-ml-23"
                  id="about"
                />
              </div>
              <div className="w-[75%] xs:w-[63%] md:w-[40%] xs:h-[63%] flex flex-col items-center xs:items-start justify-between">
                <span className="font-extrabold text-3xl xs:text-4xl lg:text-5xl break-before-left mb-5 xs:mb-4 md:mb-0 w-full h-[30%] flex items-center md:items-end lg:items-start">
                  SIGN UP AND TRY ALL GOME MODES
                </span>
                <span className="text-sm xs:text-base text-justify w-full xs:w-[85%] h-auto xs:h-[70%] pt-2 md:pt-10 flex items-start">
                  Join us today and play all the most popular dart modes out
                  there. Including Shangai, Cricket, Count Up, Split Up and the
                  best known, XO1 (simple, double and master finish). You can
                  train yourself or even challenge your friends. And with all of
                  that we will even track your progress and statistics.
                </span>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full w-full flex flex-col md:flex-row items-center gap-6">
              <div className="mt-8 md:h-full w-[80%] md:w-[60%] flex justify-center items-start md:items-center md:pl-20 sm:mt-6 md:mt-0">
                <iframe
                  className="h-[11rem] xs:h-[15rem] md:h-[20rem] lg:h-[27rem] w-full md:w-[90%] md:-ml-23"
                  src="https://www.youtube.com/embed/S2IT5twpMZ8?si=dd6b7N3W0WBnJSor"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
              <div className="w-[75%] md:w-[40%] md:h-[73%] flex flex-col items-center xs:items-start">
                <span className="font-extrabold text-3xl xs:text-4xl lg:text-5xl break-before-left mt-4 xs:mt-0 mb-3 xs:mb-0 w-full h-[30%] flex items-center xs:items-end lg:items-start">
                  Basics of the Throw: Pro Tips
                </span>
                <span className="text-sm xs:text-base text-justify w-full md:w-[85%] h-auto md:h-[70%] pt-2 xs:pt-5 md:pt-10 flex items-start">
                  Discover the secrets to a winning darts throw! Join World
                  Champion Luke Humphries and Mark Webster as they break down
                  the fundamentals of the throw. From grip and stance to release
                  and alignment, this episode is packed with tips to help
                  players of all levels improve their technique. <br />
                  <br /> Get inspired with insights into the styles of legends
                  like Phil Taylor and Adrian Lewis, all in a fun,
                  conversational format.
                </span>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full w-full flex flex-col md:flex-row items-center md:justify-center">
              <div className="md:h-full w-[80%] md:w-[60%] flex justify-center items-start md:items-center md:pl-20 xs:mt-2 sm:mt-6 md:mt-0">
                <img
                  src={"/images/promo_pic.jpg"}
                  alt={"game modes"}
                  className="w-full md:w-[90%] h-[15rem] xs:h-[18rem] md:h-[33rem] object-contain  md:-ml-23"
                  id="about"
                />
              </div>
              <div className="w-[75%] xs:w-[69%] md:w-[40%] xs:h-[63%] flex flex-col items-center xs:items-start justify-between">
                <span className="font-extrabold text-3xl xs:text-4xl lg:text-5xl break-before-left mb-5 xs:mb-4 md:mb-0 w-full h-[30%] flex items-center md:items-end lg:items-start">
                  FREE AND AVAILABLE TO EVERYONE
                </span>
                <span className="text-sm xs:text-base text-justify w-full xs:w-[85%] h-auto xs:h-[70%] pt-2 md:pt-10 flex items-start">
                  DartArena is free to use and is available on multiple
                  web-browsers. It is interactive and gives you responsive UI
                  ("User Interface") while you are playing on web by: desktop,
                  laptop or mobile phone. <br />
                  <br />
                  Train and have fun, odds are on your side!
                </span>
              </div>
            </div>
          </SwiperSlide>

          <div className="swiper-button-next" style={{ color: "gray" }}></div>
          <div className="swiper-button-prev" style={{ color: "gray" }}></div>
        </Swiper>
      </div>
    </>
  );
}
