import { create } from "zustand";

interface CreaterSidebarStore {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void; 
};

export const useCreaterSidebar = create<CreaterSidebarStore>((set) => ({
    collapsed: false,
    onExpand: () => set( () => ({ collapsed: false })),
    onCollapse: () => set( () => ({ collapsed: true }))
}))