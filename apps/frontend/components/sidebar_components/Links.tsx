import Link from "next/link";
import React from "react";
import { FaRegStar } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { GrHomeRounded } from "react-icons/gr";
import { IoSearchSharp, IoSettingsOutline } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";

const links = [
  {
    label: "Home",
    icon: <GrHomeRounded />,
    href: "/home",
  },
  {
    label: "Search",
    icon: <IoSearchSharp />,
    href: "/search",
  },
  {
    label: "Favorites",
    icon: <FaRegStar />,
    href: "/favorites",
  },
  {
    label: "Settings",
    icon: <IoSettingsOutline />,
    href: "/settings",
  },
  {
    label: "Trash",
    icon: <GoTrash />,
    href: "/trash",
  },
  {
    label: "Community",
    icon: <TbWorld />,
    href: "/community",
  },
];

const Links = () => {
  return (
    <div className=" my-5 ">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="flex mb-1 hover:text-blue-500 duration-150  p-1 w-full items-center gap-2"
        >
          <div className="text-xl  text-gray-700">{link.icon}</div>
          <div>{link.label}</div>
        </Link>
      ))}
    </div>
  );
};

export default Links;
