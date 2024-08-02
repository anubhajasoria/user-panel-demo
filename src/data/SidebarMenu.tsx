import { FaBuildingUser } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";

export const MenuItems = [
  {
    name: "Users",
    navigate: "/",
    icon: <FaBuildingUser />,
  },
  {
    name: "Profile",
    navigate: "/profile",
    icon: <ImProfile />,
  },
];
