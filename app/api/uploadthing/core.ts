import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/data";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const auth = (req: Request) => ({ id: "fakeId" }); 
 

export const ourFileRouter = {
  thumbnailUploader: f({
    image: {
        maxFileSize: "4MB",
        maxFileCount: 1
    }
  })
   .middleware(async () => {
    const self = await getSelf();
    return { user: self}
   })
   .onUploadComplete(async ({metadata, file}) => {
    await db.stream.update({
        where: {
            userId: metadata.user.id,
        },
        data: {
            thumbnailUrl: file.url,
        },
    });

    return { fileUrl: file.url};
   }),

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;