import { episodes } from "../../constants/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { styles } from "../../styles/styles";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { FormControl, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import React from "react";

export default function SerialSection() {
  const [season, setSeason] = React.useState('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSeason(event.target.value as string);
  };
  return (
    <div className={` ${styles.container} py-10`}>
      <div className="flex justify-between items-center gap-4 mb-6">
        <h3 className="font-bold text-[24px] leading-8 tracking-[.5%] text-[#F9F9F9]">1-9 Episode</h3>
        <Box>
          <FormControl>
            <Select
              displayEmpty
              className="border bg-[#111827] border-[#28262D] rounded-lg w-27.75 h-7.5"
              sx={{
                color: '#FFFFFF',
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#28262D' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#28262D' },
                '.MuiSelect-select': { display: 'flex', alignItems: 'center', height: '30px', padding: '0 12px' },
                '.MuiSvgIcon-root': { color: '#FFFFFF' }
              }}
              id="demo-simple-select"
              value={season}
              onChange={handleChange}
              MenuProps={{ PaperProps: { sx: { bgcolor: '#111827', color: '#FFFFFF' } } } as any}
              renderValue={(selected) => selected || 'Season 1'}
            >
              <MenuItem value={1} sx={{ color: '#0D0C0F' }}>Season 1</MenuItem>
              <MenuItem value={2} sx={{ color: '#0D0C0F' }}>Season 2</MenuItem>
              <MenuItem value={3} sx={{ color: '#0D0C0F' }}>Season 3</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="relative -mx-8 px-8 overflow-visible">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper w-full" slidesPerView="auto" spaceBetween={24}>
          <SwiperSlide style={{ width: "auto" }}>
            <div className="flex gap-4 items-center">
              {
                episodes.map((item) => (
                  <div key={item.id} className="shrink-0 flex flex-col gap-y-3 items-center cursor-pointer relative overflow-hidden rounded-2xl w-75.25 h-49.25">
                    <img src={item.img} alt={item.title} className="rounded-2xl w-full h-full object-cover" />
                    <div className="flex flex-col items-center absolute bottom-0 left-0 py-2 px-5 w-full" style={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 78.02%)" }}>
                      <h3 className="text-[#F9F9F9] font-bold w-full text-[16px] tracking-[0.5%] leading-6">{item.title}</h3>
                      <p className="text-[#78828A] tracking-[0.5%] ml-1 text-[12px] leading-5">{item.description}</p>
                      <div className="w-full flex items-center justify-center">
                        <Box sx={{ width: 139 }}>
                          <Slider
                            color="success"
                            size="small"
                            defaultValue={50}
                            aria-label="Small"
                            valueLabelDisplay="auto"
                          />
                        </Box>
                      </div>
                    </div>
                    <div className="">

                    </div>
                  </div>
                ))
              }
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}
