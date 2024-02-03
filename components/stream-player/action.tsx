"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface ActionsProps {
    hostIdentity: string;
    isFollowing: boolean;
    isHost: boolean;
};

export const Actions = ({
    hostIdentity,
    isFollowing,
    isHost,
}: ActionsProps) => {
    const {userId} = useAuth();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity) 
              .then((data) => toast.success(`you are now following ${data.following.username}`))
              .catch(() => toast.error("Unable to Follow"))
        });
    }

    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(hostIdentity) 
              .then((data) => toast.success(`you UnFollowed ${data.following.username}`))
              .catch(() => toast.error("Failed to UnFollow"))
        });
    }

    const toggleFollow = () => {
        if(!userId) {
           return router.push("/sign-in");
        }

        if(isHost) return;

        if(isFollowing) {
          handleUnFollow();
        } else {
            handleFollow();
        }
    }


    return (
       <Button
        disabled={isPending || isHost}
        onClick={toggleFollow}
        variant="primary"
        size='sm'
        className="w-full lg:w-auto"
        >
            <Heart className={cn(
                "h-4 w-4 mr-2",
                isFollowing ? "fill-white" : "fill-none"
            )} />
            {isFollowing ? "unfollow" : "Follow"}
        </Button>
    );
};

export const ActionsSkeleton = () => {
    return (
        <Skeleton className="h-10 w-full lg:w-24" />
    )
}