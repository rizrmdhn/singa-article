import AddArticleForm from "@/components/AddArticleForm";
import Modal from "@/components/Modal";
import { DialogTitle } from "@/components/ui/dialog";
import React from "react";

export default function AddArticleModal() {
  return (
    <Modal>
      <div className="flex flex-col gap-4">
        <DialogTitle className="text-3xl font-bold">
          Add New Article
        </DialogTitle>
        <AddArticleForm />
      </div>
    </Modal>
  );
}
