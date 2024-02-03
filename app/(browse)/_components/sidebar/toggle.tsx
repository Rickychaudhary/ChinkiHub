"use client";
import { useSidebar } from "@/store/use-sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine, ArrowRightFromLine, LucideTable2 } from "lucide-react";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";


export const Toggle = () => {
    const { collapsed,onExpand,onCollapse } = useSidebar((state) => state);

    const label = collapsed ? "Expand" : "Collapse";
    return (
        <>
           {collapsed && (
             <div>
                <Hint label={label} side="right" asChild>
                  <Button onClick={onExpand} className="h-auto p-2" variant="ghost" >
                    <ArrowRightFromLine className="h-4 w-4" />
                  </Button>
                </Hint> 
             </div>
           )}  
           {!collapsed && (
            <div className="p-3 pl-6 mb-2 flex items-center w-full">
                 <p className="font-semibold text-primary">
                    For You
                 </p>
             <Hint label={label} side="right" asChild> 
                 <Button onClick={onCollapse} className="h-auto p-2 ml-auto" variant="ghost"  >
                    <ArrowLeftFromLine className="h-4 w-4"/>
                 </Button>
                 </Hint> 
            </div>
           )}
        </>
    );
};

export const ToggleSkeleton = () => {
      return (
         <div className="p-3 pl-6 mb-2  hidden lg:flex items-center justify-center w-full">
               <Skeleton className="h-6 w-[100px]" />
               <Skeleton className="h-6 w-6" />
         </div>
      );
}