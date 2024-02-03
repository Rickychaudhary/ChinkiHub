"use client";

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger, DialogTitle  } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState, useTransition, ElementRef } from "react";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";

interface BioModalProps {
    initialValue: string | null;
};

export const BioModal = ({
    initialValue,
}: BioModalProps) => {
    
       const closeRef = useRef<ElementRef<"button">>(null);
       const [value, setvalue] = useState(initialValue || "");
       const [isPending, startTransition] = useTransition();

       const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            updateUser({ bio: value })
             .then (() => {
                toast.success("Bio updated");
                closeRef?.current?.click();
             })
            .catch(() => {
                    toast.error("Something went wrong");
           })
       });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                    Edit user bio
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={onSubmit} className="space-y-4">
                     <Textarea 
                        placeholder="User bio"
                        value={value}
                        disabled={isPending}
                        className="resize-none"
                        onChange={(e) => setvalue(e.target.value)}
                       /> 
                       <div className="flex justify-between">
                        <DialogClose asChild ref={closeRef}>
                            <Button type='button' variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending} variant="primary">
                            Save
                        </Button>
                       </div>
              </form>
            </DialogContent>
        </Dialog>
    )
}