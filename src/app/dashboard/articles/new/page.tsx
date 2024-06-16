"use client";

import useAddArticle from "@/hooks/useAddArticle";
import React, { Suspense, useState } from "react";
import type { ZodIssue } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Tiptap from "@/components/TipTap";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createArticleSchema } from "@/schema/article";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { LoaderCircle } from "lucide-react";

export default function AddNewArticlePage() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<FileList | null>(null);
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
          onChange={(e) => setImage(e.target.files)}
          accept="image/*"
          type="file"
        />
        {formError?.find((err) => err.path[0] === "image") && (
          <p className="text-red-500">
            {formError.find((err) => err.path[0] === "image")?.message}
          </p>
        )}
      </div>
      <Suspense
        fallback={
          <div className="flex flex-col items-start justify-between gap-2">
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full" />
          </div>
        }
      >
        <Tiptap
          text={value}
          onUpdateText={setValue}
          isError={
            formError?.find((err) => err.path[0] === "description")
              ? true
              : false
          }
        />
        {formError?.find((err) => err.path[0] === "description") && (
          <p className="text-red-500">
            {formError.find((err) => err.path[0] === "description")?.message}
          </p>
        )}
      </Suspense>
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
              onSuccess: () => {
                setFormError(undefined);
                setTitle("");
                setImage(null);
                setValue("");
                router.push("/dashboard/articles");
                toast({
                  title: "Success",
                  description: "Article has been created",
                });
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
