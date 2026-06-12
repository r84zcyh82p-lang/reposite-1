import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa6"; import "swiper/css";
import "swiper/css/navigation";
import { styles } from "../../styles/styles";
import { similarMovies } from "../../constants/constants";
import { Navigation } from "swiper/modules";

export default function MovieSection() {

  return (
    <div className={`${styles.container} py-10`}>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-[24px] leading-8 tracking-[.5%] text-[#F9F9F9] mb-6">Similar Movies for you</h3>

      </div>
      <div className="relative -mx-8 px-8 overflow-visible">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper w-full" slidesPerView="auto" spaceBetween={24}>
          <SwiperSlide style={{ width: "auto" }}>
            <div className="flex gap-6 items-center">
              {
                similarMovies.map((item) => (
                  <div key={item.id} className="shrink-0 flex flex-col gap-y-3 items-center cursor-pointer relative overflow-hidden rounded-2xl w-75.25 h-49.25">
                    <img src={item.img} alt={item.title} className="rounded-2xl w-full h-full object-cover" />
                    <div className="flex flex-col items-start absolute bottom-0 left-0 py-2 px-3 w-full" style={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 78.02%)" }}>
                      <h3 className="text-[#F9F9F9] font-bold w-full text-[16px] tracking-[0.5%] leading-6">{item.title}</h3>
                      <div className="w-full flex items-center">
                        <FaStar className="text-[#FFCD1A] " />
                        <h4 className="text-[#F9F9F9] font-semibold ml-1 text-[12px] leading-5">{item.rating}</h4>
                        <p className="text-[#78828A] tracking-[0.5%] ml-1 text-[12px] leading-5">{item.genre}</p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </SwiperSlide>
          <div className="absolute right-0 bottom-0 z-10 w-41.75 h-64 top_cast_shadow_bg"></div>
        </Swiper>
      </div>
      {/* <div className="absolute right-0 bottom-0 z-10 w-[167px] h-[48px] top_cast_shadow_bg"></div> */}
    </div>
  )
}
