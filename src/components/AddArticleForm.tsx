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
import { LoaderCircle } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export default function AddArticleForm() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [value, setValue] = useState("");
  const [formError, setFormError] = useState<ZodIssue[]>();

  const { mutate, status, error } = useAddArticle();

  return (
    <div className="flex flex-col gap-4">
      {status === "error" ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold">Error</h1>
          <p className="text-center text-lg">
            Something went wrong. Please try again later.
          </p>
          <p className="text-center text-lg">{error.stack}</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-start justify-between gap-2">
            <Label className="text-lg font-bold">Article Title</Label>
            {status === "pending" ? (
              <Skeleton className="h-10 w-[500px]" />
            ) : (
              <>
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
              </>
            )}
          </div>
          <div className="flex flex-col items-start justify-between gap-2">
            <Label className="text-lg font-bold">Article Image</Label>
            {status === "pending" ? (
              <Skeleton className="h-10 w-[500px]" />
            ) : (
              <>
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
              </>
            )}
          </div>
          {status === "pending" ? (
            <Skeleton className="h-96 w-[500px] " />
          ) : (
            <>
              <Tiptap
                value={value}
                onChange={setValue}
                attributPropsClassName="max-h-96 overflow-y-auto"
              />
              {formError?.find((err) => err.path[0] === "description") && (
                <p className="text-red-500">
                  {
                    formError.find((err) => err.path[0] === "description")
                      ?.message
                  }
                </p>
              )}
            </>
          )}
          <div className="flex flex-col items-start justify-between gap-2">
            <Button
              disabled={status === "pending"}
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

                setFormError(undefined);
                mutate(parsedData.data);
              }}
            >
              {status === "pending" ? (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Save
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
