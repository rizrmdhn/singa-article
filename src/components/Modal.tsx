"use client";

import React from "react";
import { Dialog, DialogOverlay, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export default function Modal({ children }: { children: React.ReactNode }) {
  // const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const router = useRouter();

  // const closeModal = () => {
  //   router.back();
  // };

  const handleOpenChange = () => {
    router.back();
  };

  return createPortal(
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay>
        <DialogContent className="w-fit overflow-x-auto overflow-y-hidden">
          {/* <AlertConfirmation
            open={showExitConfirmation}
            setOpen={setShowExitConfirmation}
            confirmationAction={closeModal}
            message="You haven't saved your changes. Please confirm you want to exit without saving."
          /> */}
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>,
    document.getElementById("modal-root")!,
  );
}
