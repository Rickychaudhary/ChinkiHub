"use client";

import { toast } from "sonner";
import {  useTransition } from "react";
import { cn, stringToColor } from "@/lib/utils";
import { onblock } from "@/actions/block";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { MinusCircle } from "lucide-react";




interface CommunityItemProps {
    hostName: string;
    viewerName: string;
    participantName?: string;
    participantIdentity: string;
};

export const CommunityItem = ({
    hostName,
    viewerName,
    participantName,
    participantIdentity,
}: CommunityItemProps) => {

    

    const color = stringToColor(participantName || "");
    const isSelf = participantName === viewerName;
    const isHost = viewerName === hostName;
    const [isPending, startTransition] = useTransition();
  

    const handleBlock = () => {
        if(!participantName || isSelf || !isHost) return;

        startTransition(() => {
            onblock(participantIdentity)
              .then(() => toast.success(`Blocked ${participantName}`))
              .catch(() => toast.error("Something Went Wrong"));
        });
    }

   

    return (
        <div className={cn(
            "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
            isPending && "opacity-50 pointer-events-none"
        )}>
            <p style={{ color: color}}>
                {participantName}
            </p>
            {isHost && !isSelf && (
                <Hint label="Block">
                    <Button
                    variant="ghost"
                    disabled={isPending}
                    onClick={handleBlock}
                    className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition">
                        <MinusCircle  className="h-4 w-4 text-muted-foreground"/>
                    </Button>
                </Hint>
            )}

        </div>
    );
};