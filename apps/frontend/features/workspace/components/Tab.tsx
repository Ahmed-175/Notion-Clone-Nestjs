"use client"
import React, { useEffect } from 'react'
import useTab from '../hooks/useTab';
import type { Tab } from '../types/tab.type';
import { FiHome } from 'react-icons/fi';
import { GiCancel, GiTrashCan } from 'react-icons/gi';
import { FaHeart, FaUser, FaUsers } from 'react-icons/fa'
    ;
import type { TabType } from "../types/tab.type";
import { CiSearch } from 'react-icons/ci';
import { FaNoteSticky } from 'react-icons/fa6';
import { IoSettingsSharp } from 'react-icons/io5';
import Link from 'next/link';
import { routeTab } from '../core/routeTab';

export const tabIcons: Record<TabType, React.ComponentType<{ className?: string }>> = {
    home: FiHome,
    trash: GiTrashCan,
    favorites: FaHeart,
    search: CiSearch,
    note: FaNoteSticky,
    user: FaUser,
    community: FaUsers,
    settings: IoSettingsSharp
};

const Tab = ({ tab }: { tab: Tab }) => {
    const { removeTab, isActiveTab } = useTab();
    const Icon = tabIcons[tab.type];

    return (
        <Link href={`/${routeTab(tab.type, tab.params)}`}
            className={`p-2 px-4 rounded-lg flex cursor-pointer duration-100 justify-between gap-7 items-center w-fit h-fit
         ${isActiveTab(tab.id) ? "bg-black text-white" : "bg-slate-200 hover:bg-slate-300"}
       `}
        >
            <div className="flex justify-center items-center gap-1 w-fit">
                <Icon className="text-lg" />
                {tab.label}
            </div>

            <div
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    removeTab(tab.id);
                }}
            >
                <GiCancel className="text-xl hover:text-red-500 cursor-pointer duration-150" />
            </div>
        </Link>
    )
}

export default Tab