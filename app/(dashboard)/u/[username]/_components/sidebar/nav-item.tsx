"use client";

import { LucideIcon } from "lucide-react";
import { useCreaterSidebar } from "@/store/use-creater-sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { space } from "postcss/lib/list";
import { Skeleton } from "@/components/ui/skeleton";

interface NavItemProps {
    href: string;
    label: string;
    icon: LucideIcon;
    isActive: boolean;
}

export const NavItem = ({ href, label, icon: Icon, isActive }: NavItemProps) => {
              const { collapsed } = useCreaterSidebar((state) => state);

              return (
                <Button 
                   asChild
                   variant="ghost"
                   className={cn(
                       "w-full h-12",
                       collapsed ? "justify-center" : "justify-start",
                       isActive && "bg-accent"
                   )}
                >
                    <Link href={href}>
                       <div className="flex items-center gap-x-4">
                          <Icon className={cn(
                            "h-4 w-4",
                            collapsed ? "mr-0" : "mr-2"
                          )}/>
                          {!collapsed && (
                            <span>
                                {label}
                            </span>
                          )}
                       </div>
                    </Link>

                </Button>
              );
};

export const NavItemSkeleton = () => {
    return (
        <li className="flex items-center gap-x-4 px-3 py-2">
            <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
            <div className="flex-1 hidden lg:block">
                <Skeleton className="h-6" />
            </div>
        </li>
    )
}