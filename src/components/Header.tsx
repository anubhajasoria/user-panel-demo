import React, { useState } from "react";
import { SiMixpanel } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import CollapsibleSidebar from "./CollapsibleSidebar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="p-4 flex h-[10vh] shadow-lg shadow-slate-300 items-center md:justify-between w-screen bg-gradient-to-r from-primary to-indigo-600">
        <span className="md:hidden mr-8" onClick={() => setIsOpen(true)}>
          <RxHamburgerMenu />
        </span>
        <span className="flex gap-4 items-center ">
          <SiMixpanel />
          User Panel Demo
        </span>
        <span className=" hidden  md:flex items-center  gap-4">
          User Name
          <FaUserCircle size={24} />
        </span>
      </div>
      <CollapsibleSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Header;
