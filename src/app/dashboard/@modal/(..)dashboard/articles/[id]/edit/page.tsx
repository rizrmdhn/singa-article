import Modal from "@/components/Modal";
import UpdateArticleForm from "@/components/UpdateArticleForm";
import { DialogTitle } from "@/components/ui/dialog";
import React from "react";

export default function EditArticleModal({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <div className="flex flex-col gap-4">
        <DialogTitle className="text-3xl font-bold">Update Article</DialogTitle>
        <UpdateArticleForm params={params} />
      </div>
    </Modal>
  );
}
