import { Info } from "lucide-react";
import { useMemo } from "react";
import { Hint } from "@/components/hint";

interface ChatInfoProps {
    isDelayed: boolean;
    isFollowersOnly: boolean;
};

export const ChatInfo = ({
    isDelayed,
    isFollowersOnly,
}: ChatInfoProps) => {
    const hint = useMemo(() => {
        if(isFollowersOnly && !isDelayed) {
            return "Follow to chat";
        }
        if(isFollowersOnly && isDelayed) {
            return "Only followers can chat. Messages are delayed";
        }
        if(!isFollowersOnly && isDelayed) {
            return "Messages are delayed by 3 seconds";
        }
        return "";
    },[isFollowersOnly, isDelayed]);

    const label = useMemo(() => {
        if(isFollowersOnly && !isDelayed) {
            return "Followers only";
        }
        if(isFollowersOnly && isDelayed) {
            return "Slow mode";
        }
        if(!isFollowersOnly && isDelayed) {
            return "Followers only and slow mode";
        }
        return "";
    },[isFollowersOnly, isDelayed]);

    return (
        <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
            <Hint label={hint}>
                <Info className="h-4 w-4" />
            </Hint>
            <p className="text-xs font-semibold">
                {label}
            </p>
        </div>
    )
}
