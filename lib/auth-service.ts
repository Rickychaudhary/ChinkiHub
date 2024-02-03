import { currentUser } from "@clerk/nextjs";
import { db } from "./data";

export const getSelf = async () => {
    const self = await currentUser();
    if (!self || !self.username) {
        throw new Error("No current user");
    }
    const user = await db.user.findUnique({
        where: {
            externalUserId: self.id,
        },
    });

    if(!user) {
        throw new Error("No user found");
    }

    return user;
}

export const getSelfByUsername = async (username: string) => {
    const self = await currentUser();

    if (!self || !self.username) {
        throw new Error("No current user");
    }

    const user = await db.user.findUnique({
        where: {
            username,
        },
    });

    if(!user) {
        throw new Error("No user found");
    }
    if(self.username !== user.username) {
        throw new Error("Not authorized");
    }
    return user;
};