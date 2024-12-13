import { create } from "zustand";

interface TabBarState {
    isAdmin: boolean;
    setIsAdmin: (state: boolean) => void;
    tabBar: boolean;
    setTabBar: (state: boolean) => void;
  }

const useTabBar = create<TabBarState>(set => ({
  isAdmin: false,
  setIsAdmin: (state: boolean) => set({isAdmin: state}),
  tabBar: true,
  setTabBar: (state: boolean) => set({tabBar: state}),
}))

export default useTabBar