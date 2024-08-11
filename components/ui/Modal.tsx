"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export function CustomModal({ open, setOpen, child, className = "" }: any) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                className={`max-h-[600px] md:h-fit w-full max-w-sm rounded-lg bg-[#F1F4F8] p-1 shadow-lg md:max-w-2xl lg:max-w-4xl ${className}`}
                onInteractOutside={(event: any) => {
                    if (event.target === event.currentTarget) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }}
            >
                <div className="w-full md:p-4">{child}</div>
            </DialogContent>

        </Dialog>

    );
}