"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import type { Article } from "@/types/articles";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import moment from "moment";
import "moment/locale/id";
import useDeleteArticle from "@/hooks/useDeleteArticle";

export default function ArticleRow(article: Article) {
  const { mutate } = useDeleteArticle(article.id);

  const router = useRouter();

  return (
    <>
      <TableRow key={article.id}>
        <TableCell className="hidden sm:table-cell">
          <Image
            src={article.image_url}
            alt={article.title}
            width={56}
            height={56}
            className="h-14 w-14 rounded-md"
          />
        </TableCell>
        <TableCell className="font-medium">{article.title}</TableCell>
        <TableCell
          className="hidden h-8 max-w-sm text-ellipsis md:table-cell"
          dangerouslySetInnerHTML={{
            __html:
              article.description.length > 100
                ? article.description.slice(0, 100) + "..."
                : article.description,
          }}
        ></TableCell>
        <TableCell className="hidden md:table-cell">
          {moment(article.createdAt).locale("id").format("LL")}
        </TableCell>
        <TableCell>
          {moment(article.updatedAt).locale("id").format("LL")}
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={() => {
                  router.push(`/dashboard/articles/${article.id}/edit`);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={() => {
                  mutate();
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  );
}
