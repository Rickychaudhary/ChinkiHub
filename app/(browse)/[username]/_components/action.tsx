"use client";

import { Button } from "@/components/ui/button";
import { startTransition, useTransition } from "react";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";
import { onblock, onUnblock } from "@/actions/block";

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
}

export const Actions = ({
    isFollowing,
    userId,
}: ActionsProps ) => {
    const [isPending, setPending] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
            .then((data) => toast.success(`You are now following ${data.following.username}`))
            .catch(() => toast.error("Failed to follow!"));
        });
    };


    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(userId)
            .then((data) => toast.success(`You have Unfollowed ${data.following.username}`))
            .catch(() => toast.error("Failed to follow!"));
        });
    };

    const onclick = () => {
        if(isFollowing) {
            handleUnFollow();
        } else {
            handleFollow();
        }
    }
    const handleBlock = () => {
        startTransition(() => {
          onUnblock(userId)
            .then((data) => toast.success(`Unblocked the user ${data.blocked.username}`))
            .catch(() => toast.error("Something went wrong"));
        });
      };

    return (
       <>
        <Button 
         variant="primary"
         onClick={onclick}
         disabled={isPending}
         >
           {isFollowing ? "Unfollow" : "Follow"}
        </Button>
        <Button onClick={handleBlock} disabled={isPending}>
            Block
        </Button>
    </>   
    );
};