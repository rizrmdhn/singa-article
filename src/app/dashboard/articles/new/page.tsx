"use client";

import useAddArticle from "@/hooks/useAddArticle";
import React, { useState } from "react";
import type { ZodIssue } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Tiptap from "@/components/TipTap";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createArticleSchema } from "@/schema/article";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export default function AddNewArticlePage() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [value, setValue] = useState("");
  const [formError, setFormError] = useState<ZodIssue[]>();

  const { mutate: addArticle, status: addArticleStatus } = useAddArticle();

  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-start justify-between gap-2">
        <Label className="text-lg font-bold">Article Title</Label>
        <Input
          className={
            formError?.find((err) => err.path[0] === "title")
              ? "border-red-500"
              : ""
          }
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {formError?.find((err) => err.path[0] === "title") && (
          <p className="text-red-500">
            {formError.find((err) => err.path[0] === "title")?.message}
          </p>
        )}
      </div>
      <div className="flex flex-col items-start justify-between gap-2">
        <Label className="text-lg font-bold">Article Image</Label>
        <Input
          className={
            formError?.find((err) => err.path[0] === "image")
              ? "border-red-500"
              : ""
          }
          placeholder="Image URL"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setImage(reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
          accept="image/*"
          type="file"
        />
        {formError?.find((err) => err.path[0] === "image") && (
          <p className="text-red-500">
            {formError.find((err) => err.path[0] === "image")?.message}
          </p>
        )}
      </div>
      <Tiptap
        value={value}
        onChange={setValue}
        isError={
          formError?.find((err) => err.path[0] === "description") ? true : false
        }
      />
      {formError?.find((err) => err.path[0] === "description") && (
        <p className="text-red-500">
          {formError.find((err) => err.path[0] === "description")?.message}
        </p>
      )}
      <div className="flex flex-col items-start justify-between gap-2">
        <Button
          disabled={addArticleStatus === "pending"}
          className="w-full"
          onClick={() => {
            const parsedData = createArticleSchema.safeParse({
              title,
              description: value,
              image: image,
            });

            if (!parsedData.success) {
              parsedData.error.issues.forEach((issue) => {
                toast({
                  title: "Error",
                  description: issue.message,
                });
              });
              setFormError(parsedData.error.issues);
              return;
            }

            addArticle(parsedData.data, {
              onSuccess: (data) => {
                if (data?.data?.meta.status === "success") {
                  setFormError(undefined);
                  setTitle("");
                  setImage("");
                  setValue("");
                  router.push("/dashboard/articles");
                }
              },
            });
          }}
        >
          {addArticleStatus === "pending" ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Save
        </Button>
      </div>
    </div>
  );
}
