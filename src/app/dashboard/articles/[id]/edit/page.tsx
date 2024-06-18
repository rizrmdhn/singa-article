"use client";

import Tiptap from "@/components/TipTap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import useGetDetailArticle from "@/hooks/useGetDetailArticle";
import useUpdateArticle from "@/hooks/useUpdateArticle";
import { updateArticleSchema } from "@/schema/article";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import type { ZodIssue } from "zod";

export default function EditArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<FileList | undefined>();
  const [value, setValue] = useState("");
  const [formError, setFormError] = useState<ZodIssue[]>();

  const { data, status, error } = useGetDetailArticle(params.id);
  const { mutate: updateArticle, status: updateStatus } = useUpdateArticle(
    params.id,
    title,
    value,
    image,
  );

  useEffect(() => {
    if (status === "success" && data) {
      setTitle(data.title);
      setValue(data.description);
    }
  }, [data, status]);

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
              <Skeleton className="h-10 w-full" />
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
              <Skeleton className="h-10 w-full" />
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
                    if (e.target.files) setImage(e.target.files);
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
            <Skeleton className="h-96 w-full" />
          ) : (
            <>
              <Tiptap text={data?.description} onUpdateText={setValue} />
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
            {status === "pending" ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Button
                disabled={updateStatus === "pending"}
                className="w-full"
                onClick={() => {
                  const parsedData = updateArticleSchema.safeParse({
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
                  updateArticle();
                }}
              >
                {updateStatus === "pending" ? (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Save
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
