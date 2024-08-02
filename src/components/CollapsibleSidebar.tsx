import React, { useState } from "react";
import { MenuItems } from "../data/SidebarMenu";
import { Link } from "react-router-dom";
import Portal from "./Portal";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setMenuIndex } from "../store/contentSlice";

interface MenuItem {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  navigate: string;
  // Add other properties of MenuItem here, if any
}

const CollapsibleSidebar = ({ isOpen, onClose }) => {
  const index = useSelector((state) => state.content.menuIndex);
  const dispatch = useDispatch();

  return (
    <Portal
      isOpen={isOpen}
      onClose={onClose}
      className=" !items-start !justify-start"
    >
      <div className="flex flex-col w-[50VW] shadow-sm p-4 !bg-white !h-screen ">
        <span className="flex items-center gap-4 mb-8 text-indigo-700">
          <FaUserCircle size={24} />
          User Name
        </span>
        {MenuItems.map((item: MenuItem, i: number) => (
          <Link
            key={i}
            to={item.navigate}
            onClick={() => {
              dispatch(setMenuIndex({ index: i }));
              onClose();
            }}
            className={`p-2 pl-4 rounded flex gap-2 items-center cursor-pointer mb-3 ${
              index === i
                ? "bg-gradient-to-r from-primary to-indigo-600"
                : "text-gray-500"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
    </Portal>
  );
};

export default CollapsibleSidebar;
