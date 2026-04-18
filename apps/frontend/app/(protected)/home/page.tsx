"use client";

import useTab from "@/hooks/useTab";
import CommunityPage from "@/pages/CommunityPage";
import FavoritesPage from "@/pages/FavoritesPage";
import HomePage from "@/pages/HomePage";
import NotePage from "@/pages/NotePage";
import SearchPage from "@/pages/SearchPage";
import TrashPage from "@/pages/TrashPage";

const components = {
  home: HomePage,
  note: NotePage,
  trash: TrashPage,
  favorites: FavoritesPage,
  search: SearchPage,
  community: CommunityPage,
};

const Page = () => {
  const { currentTab } = useTab();

  const Component = components[currentTab.type] || HomePage;

  return <Component />;
};

export default Page;
