import { FaCirclePlay } from 'react-icons/fa6'
import headerImg from '../../assets/img/headerImgJpeg.jpg'
import { styles } from '../../styles/styles'
import { FiBookmark } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";
import { BiLike } from 'react-icons/bi';
import { LuShare2 } from 'react-icons/lu';
export default function Header() {
  return (
    <div className='flex flex-col w-full relative'>
      <div className=" w-full h-162 ">
        <div className="header_shadow_bg absolute z-1 w-full h-full"></div>
        <img src={headerImg} alt="Header Image" className="w-full h-full absolute top-0 left-0" />
      </div>
      <div className={`flex items-end justify-between pb-16 pt-16 z-2 ${styles.container}`}>
        <div className="flex flex-col gap-6">
          <div className="bg-[#0D0C0F] rounded-2xl pt-1 pb-1 pl-4 pr-4 text-[#F9F9F9] text-[12px] font-medium leading-5 w-17.25">Series</div>
          <div className="">
            <h2 className="text-white text-[32px] font-bold leading-10">The Last Of Us Season 1</h2>
            <p className="text-[#9CA4AB] text-[14px] leading-5.5">9 Episodes • 2022 • Fantasy • Actions</p>
          </div>
          <div className="flex gap-6">
            <button className='text-white pt-3 pb-3 pl-6 pr-6 bg-[rgba(0,146,93,1)] rounded-[10px] font-bold text-[14px] leading-6 gap-2.5 flex items-center justify-center cursor-pointer'><FaCirclePlay className="w-6 h-6" />Continue Watching</button>
            <button className='text-white pt-3 pb-3 pl-6 pr-6 bg-none border border-white rounded-[10px] font-bold text-[14px] leading-6 gap-2.5 flex items-center justify-center cursor-pointer'><FiBookmark className="w-6 h-6" />Add Watchlist</button>
          </div>
        </div>
        <div className="flex gap-6">
          <button className='text-white pt-3 pb-3 pl-6 pr-6 bg-[#0D0C0F] border border-[#28262D] rounded-[10px] font-bold text-[14px] leading-6 gap-2.5 flex items-center justify-center cursor-pointer'><MdOutlineFileDownload className="w-6 h-6" />Download</button>
          <button className='text-white pt-3 pb-3 pl-6 pr-6 bg-[#0D0C0F] border border-[#28262D] rounded-[10px] font-bold text-[14px] leading-6 gap-2.5 flex items-center justify-center cursor-pointer'><LuShare2 className="w-6 h-6" />Share</button>
          <button className='text-white pt-3 pb-3 pl-6 pr-6 bg-[#0D0C0F] border border-[#28262D] rounded-[10px] font-bold text-[14px] leading-6 gap-2.5 flex items-center justify-center cursor-pointer'><BiLike className="w-6 h-6" />Like</button>
        </div>
      </div>
    </div>

  )
}
