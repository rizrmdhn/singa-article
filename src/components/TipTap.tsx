"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import { Markdown } from "tiptap-markdown";
import { cn } from "@/lib/utils";

type TiptapProps = {
  text: string;
  toolBarClassName?: string;
  className?: string;
  isError?: boolean;
  attributPropsClassName?: string;
  onUpdateText: (event: string) => void;
};

const Tiptap = ({
  text,
  toolBarClassName,
  className,
  attributPropsClassName,
  onUpdateText,
}: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown.configure({
        html: true,
        transformCopiedText: true,
        transformPastedText: true,
      }),
      Document,
      Heading.configure({
        HTMLAttributes: { class: "text-black dark:text-white" },
      }),
      Paragraph.configure({
        HTMLAttributes: { class: "text-black dark:text-white" },
      }),
      Text.configure({
        HTMLAttributes: { class: "text-black dark:text-white" },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class:
            "rounded p-5 border-foreground border-2 text-black dark:text-white mb-3 mt-3",
        },
      }),
      BulletList.configure({ HTMLAttributes: { class: "list-disc" } }),
      OrderedList.configure({ HTMLAttributes: { class: "list-decimal" } }),
    ],
    content: text,
    editorProps: {
      attributes: {
        class: cn(
          "rounded p-5 border-foreground border-2 text-black dark:text-white prose-2xl",
          attributPropsClassName,
        ),
      },
    },
    onUpdate({ editor }) {
      onUpdateText(editor.getHTML());
    },
  });

  return (
    <>
      <Toolbar editor={editor} className={toolBarClassName} />
      <EditorContent
        editor={editor}
        className={cn("flex w-full flex-col", className)}
      />
    </>
  );
};

export default Tiptap;
