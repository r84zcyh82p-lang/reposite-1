import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { styles } from '../../styles/styles';
import { topCast } from '../../constants/constants';

export default function TopCast() {


    return (
        <div className={`flex flex-col gap-y-4 mt-6 ${styles.container} relative`}>
            <h3 className="text-white font-bold text-[18px] leading-6.5 tracking-[0.12px]">Top Cast</h3>
            <div className="relative -mx-8 px-8 overflow-visible">
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper w-full" slidesPerView="auto" spaceBetween={16}>
                <SwiperSlide style={{ width: "auto" }}>
                    <div className="flex gap-6 items-center">
                        {
                            topCast.map((item) => (
                                <div key={item.id} className="shrink-0 flex gap-3 items-center cursor-pointer">
                                    <img src={item.img} alt={item.name} className="rounded-full w-12 h-12"/>
                                    <div className="">
                                        <p className="text-[#F9F9F9] font-semibold text-[16px] tracking-[0.5%] leading-6">{item.name}</p>
                                        <p className="text-[#9CA4AB] font-medium tracking-[0.5%] text-[12px] leading-5">{item.character}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: "auto" }}>
                    <div className="flex gap-6 items-center">
                        {
                            topCast.map((item) => (
                                <div key={item.id} className="shrink-0 flex gap-3 items-center cursor-pointer">
                                    <img src={item.img} alt={item.name} className="rounded-full w-12 h-12" />
                                    <div className="">
                                        <p className="text-[#F9F9F9] font-semibold text-[16px] tracking-[0.5%] leading-6">{item.name}</p>
                                        <p className="text-[#9CA4AB] font-medium tracking-[0.5%] text-[12px] leading-5">{item.character}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </SwiperSlide>
            </Swiper>
            </div>
            <div className="absolute right-0 bottom-0 z-10 w-41.75 h-12 top_cast_shadow_bg"></div>
        </div>
    )
}
