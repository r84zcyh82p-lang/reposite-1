import logo from '../../assets/icons/logo.svg'
import profileImg from '../../assets/icons/profileImg.svg'
import { IoSearch } from "react-icons/io5";
import { TbBell } from "react-icons/tb";
import { styles } from '../../styles/styles';
import { FaChevronDown } from 'react-icons/fa6';
import { Link } from '@mui/material';
import { menuList } from '../../constants/constants';
import { useContext, useState } from 'react';
import { Context } from '../../hooks/Context';
export default function Navbar() {
    const { scrolled } = useContext(Context)
    const [isCLicked, setIsClicked] = useState(0)

    const handleClicked = (id: number) => {
        setIsClicked(id)
    }
    return (
        <nav className={`${styles.container} ${scrolled ? 'nav_shadow_bg' : 'bg-transparent'} z-20 pt-9.75 pb-9.75 flex items-center justify-between p-4 fixed top-0 left-0 right-0`}>
            <div className="logo"><img src={logo} alt="Logo" className="h-8 w-full" /></div>
            <ul className="flex gap-8 text-[16px] font-normal text-white">
                {
                    menuList.map((item) => (
                        <li className={`hover:font-extrabold ${isCLicked === item.id ? "font-extrabold" : ""}`} onClick={() => handleClicked(item.id)} key={item.id}><Link underline="hover" color='inherit' href={item.path}>{item.nav}</Link></li>
                    ))
                }
            </ul>

            <div className="flex items-center gap-5.75">
                <IoSearch className="text-white cursor-pointer w-6 h-6" />
                <TbBell className="text-white cursor-pointer w-6 h-6" />
                <div className="flex items-center gap-1 cursor-pointer">
                    <img src={profileImg} alt="" className="w-8 h-8" />
                    <FaChevronDown className="text-white cursor-pointer w-5 h-5" />
                </div>
            </div>
        </nav>
    )
}
