import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import {
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiCodeSSlashLine,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiListOrdered,
  RiListUnordered,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
} from "react-icons/ri";

type ToolbarProps = {
  editor: Editor | null;
  className?: string;
};

export default function Toolbar({ editor, className }: ToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div
      className={cn(
        "bg-primaryColor mb-5 flex max-w-[600px] flex-row items-center justify-evenly gap-1 rounded-md bg-primary-foreground p-2",
        className,
      )}
    >
      <button
        className="rounded p-2 hover:bg-white hover:text-primary-foreground"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().undo().run();
        }}
      >
        <RiArrowGoBackLine />
      </button>
      <button
        className="rounded p-2 hover:bg-white hover:text-primary-foreground"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().redo().run();
        }}
      >
        <RiArrowGoForwardLine />
      </button>
      <button
        className={
          editor.isActive("bold")
            ? "rounded bg-white p-2 text-primary-foreground"
            : "rounded p-2 hover:bg-white hover:text-primary-foreground"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
      >
        <RiBold />
      </button>
      <button
        className={
          editor.isActive("italic")
            ? "rounded bg-white p-2 text-primary-foreground"
            : "rounded p-2 hover:bg-white hover:text-primary-foreground"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <RiItalic />
      </button>
      <button
        className={
          editor.isActive("strike")
            ? "rounded bg-white p-2 text-primary-foreground"
            : "rounded p-2 hover:bg-white hover:text-primary-foreground"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
      >
        <RiStrikethrough />
      </button>
      <button
        className={
          editor.isActive("code")
            ? "rounded bg-white p-2 text-primary-foreground"
            : "rounded p-2 hover:bg-white hover:text-primary-foreground"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleCode().run();
        }}
      >
        <RiCodeSSlashLine />
      </button>
      <button
        className={
          editor.isActive("heading", { level: 1 })
            ? "rounded bg-white p-2 text-primary-foreground"
            : "rounded p-2 hover:bg-white hover:text-primary-foreground"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
      >
        <RiH1 />
      </button>
      <button
        className={
          editor.isActive("heading", { level: 2 })
            ? "rounded bg-white p-2 text-primary-foreground"
            : "rounded p-2 hover:bg-white hover:text-primary-foreground"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
      >
        <RiH2 />
      </button>
      <button
        className={
          editor.isActive("heading", { level: 3 })
            ? "rounded bg-white p-2 text-primary-foreground"
            : "rounded p-2 hover:bg-white hover:text-primary-foreground"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        }}
      >
        <RiH3 />
      </button>
      <button
        className={
          editor.isActive("heading", { level: 4 })
            ? "rounded bg-white p-2 text-primary-foreground"
            : "rounded p-2 hover:bg-white hover:text-primary-foreground"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 4 }).run();
        }}
      >
        <RiH4 />
      </button>
      <button
        className={
          editor.isActive("heading", { level: 5 })
            ? "rounded bg-white p-2 text-primary-foreground"
            : "rounded p-2 hover:bg-white hover:text-primary-foreground"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 5 }).run();
        }}
      >
        <RiH5 />
      </button>
      <button
        className={
          editor.isActive("heading", { level: 6 })
            ? "rounded bg-white p-2 text-primary-foreground"
            : "rounded p-2 hover:bg-white hover:text-primary-foreground"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 6 }).run();
        }}
      >
        <RiH6 />
      </button>
      <button
        className={
          editor.isActive("bulletList")
            ? "rounded bg-white p-2 text-primary-foreground"
            : "rounded p-2 hover:bg-white hover:text-primary-foreground"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <RiListUnordered />
      </button>
      <button
        className={
          editor.isActive("orderedList")
            ? "rounded bg-white p-2 text-primary-foreground"
            : "rounded p-2 hover:bg-white hover:text-primary-foreground"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        <RiListOrdered />
      </button>
    </div>
  );
}
