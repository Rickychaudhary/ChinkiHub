'use client';

import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";




interface ConatinerProps {
    children: React.ReactNode;
};


export const Container = ({
    children,
}: ConatinerProps) => {
    const matches = useMediaQuery("(max-width: 1024px)");
  
    const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

   useEffect(() => {
        if(matches) {
            onCollapse();
        }
        else{
            onExpand();
        }
   },[matches, onCollapse, onExpand]);
   return (
    <div className={cn(
        "flex-1",
        collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60"
    )} >
        {children}
    </div>
   );
};