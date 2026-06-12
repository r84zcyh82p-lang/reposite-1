import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";
import { styles } from "../../styles/styles";
import { AiFillInstagram } from "react-icons/ai";
import { ImGoogle2 } from "react-icons/im";
import { Link } from "react-router-dom";

export default function Footer() {
    const navigationLinks = [
        { name: "Home", path: "/" },
        { name: "Discover", path: "/discover" },
        { name: "Influence", path: "/influence" },
        { name: "Release", path: "/release" }
    ];

  return (
    <div className={`${styles.container} pt-17.5 pb-10 flex flex-col gap-y-15 items-center`}>
      <div className="flex justify-between w-full items-center mb-15">
        <h2 className="text-[#F9F9F9] font-medium text-[40px] leading-12 w-105 ">Our platform is trusted by millions & features best updated movies all around the world.</h2>
        <div className="flex flex-col h-48 justify-between">
            <div className="flex items-center gap-x-6 mb-6">
                {navigationLinks.map((link, index) => (
                    <div key={index} className="flex items-center">
                        <Link to={link.path} className="text-[#F9F9F9] hover:opacity-75 transition-colors text-[20px] leading-8">{link.name}</Link>
                        {index < navigationLinks.length - 1 && <span className="text-[#F9F9F9] mx-3">/</span>}
                    </div>
                ))}
            </div>
            
            <div className="w-full flex items-center gap-x-10 justify-end">
                <AiFillInstagram className="text-[#FFFFFF] w-8 h-8" />
                <FaFacebookSquare className="text-[#FFFFFF] w-8 h-8" />
                <FaTwitterSquare className="text-[#FFFFFF] w-8 h-8" />
                <ImGoogle2 className="text-[#FFFFFF] w-8 h-8" />
            </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between">
        <ul className="flex gap-x-6.5">
          <li className="text-[#b6b6b7] text-[14px] leading-5.5">Privacy policy</li>
          <li className="text-[#b6b6b7] text-[14px] leading-5.5">Term of service</li>
          <li className="text-[#b6b6b7] text-[14px] leading-5.5">Language</li>
        </ul>
        <p className="text-[#b6b6b7] text-[14px] leading-5.5">© 2023 SaintStream. All rights reserved.</p>
      </div>
    </div>
  )
}

