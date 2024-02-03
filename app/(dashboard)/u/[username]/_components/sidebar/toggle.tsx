"use client"

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useCreaterSidebar } from "@/store/use-creater-sidebar"
import { ArrowRightFromLine, ArrowLeftFromLine } from "lucide-react";

export const Toggle = () => {
    const {collapsed, onExpand, onCollapse} = useCreaterSidebar((state) => state);
    const label = collapsed ? "Expand" : "Collapse";

    return (
        <>
          {collapsed && (
              <div className="w-full hidden lg:flex items-center justify-center pt-4 mb-4">
                  <Hint label={label} side="right" asChild>
                      <Button
                         onClick={onExpand}
                        variant="ghost"
                        className="h-auto p-2"
                        >
                        <ArrowRightFromLine className="h-4 w-4"/>
                      </Button>
                  </Hint>  
              </div>
          )}
          {!collapsed && (
                <div className="w-full hidden lg:flex items-center justify-center pt-4 mb-4">
                   <p className="font-semibold text-primary">
                     Dashboard
                   </p>
                   <Hint label={label} side="right" asChild>
                       <Button
                          onClick={onCollapse}
                          variant="ghost"
                          className="h-auto p-2"
                        >
                          <ArrowLeftFromLine className="h-4 w-4"/>
                       </Button>
                   </Hint>
                </div>
          )}
        </>
    )
}