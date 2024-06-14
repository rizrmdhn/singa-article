import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import useAddArticle from "@/hooks/useAddArticle";
import MainLayout from "@/layout/MainLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tiptap from "@/components/TipTap";
import { createArticleSchema } from "@/schema/article";
import { ZodIssue } from "zod";

export default function AddArticlePage() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<FileList | null>(null);
  const [value, setValue] = useState("");
  const [formError, setFormError] = useState<ZodIssue[]>();

  const { mutate: addArticle, status: addArticleStatus } = useAddArticle();

  const navigate = useNavigate();

  return (
    <MainLayout>
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
                console.log(parsedData.error.issues);
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
                  navigate("/articles");
                  toast({
                    title: "Success",
                    description: "Article has been created",
                  });
                },
              });
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
