import React, { useState } from "react";
import { MenuItems } from "../data/SidebarMenu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMenuIndex } from "../store/contentSlice";

interface MenuItem {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  navigate: string;
}

const Sidebar = () => {
  const index = useSelector((state) => state.content.menuIndex);
  const dispatch = useDispatch();
  return (
    <div className="hidden md:flex flex-col w-[15vw] p-4 shadow-lg shadow-slate-300">
      {MenuItems.map((item: MenuItem, i: number) => (
        <Link
          key={i}
          to={item.navigate}
          onClick={() => {
            dispatch(setMenuIndex({ index: i }));
          }}
          className={`p-2 rounded flex gap-2 items-center cursor-pointer mb-3 ${
            index === i
              ? "bg-gradient-to-r from-primary to-indigo-600 text-sm"
              : "text-gray-500 text-sm"
          }`}
        >
          {item.icon}
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
