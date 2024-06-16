"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";
import type { Article } from "@/types/articles";
import useArticle from "@/hooks/useArticle";
import ArticleRow from "../ArticleRow";

export default function DashboardArticleSection() {
  const { data: articles, status } = useArticle();

  function loadingArticleRow() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Content</TableHead>
            <TableHead className="hidden md:table-cell">Created at</TableHead>
            <TableHead>Updated at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <TableRow key={index}>
                <TableCell className="hidden sm:table-cell">
                  <Skeleton className="h-14 w-14" />
                </TableCell>
                <TableCell className="font-medium">
                  <Skeleton className="h-5 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-full" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton className="h-5 w-full" />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Skeleton className="h-5 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-1/2" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  }

  function emptyArticleRow() {
    return (
      <div className="flex h-96 items-center justify-center">
        <p>No article found</p>
      </div>
    );
  }

  function errorArticleRow() {
    return (
      <div className="flex h-96 items-center justify-center">
        <p>Something went wrong</p>
      </div>
    );
  }

  function renderArticleRow(article: Article[]) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Content</TableHead>
            <TableHead className="hidden md:table-cell">Created at</TableHead>
            <TableHead>Updated at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {article?.map((article) => (
            <ArticleRow key={article.id} {...article} />
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Articles</CardTitle>
          <CardDescription>
            List of all articles in the database
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === "pending" && loadingArticleRow()}
          {status === "error" && errorArticleRow()}
          {status === "success" && articles?.length === 0 && emptyArticleRow()}
          {status === "success" &&
            articles?.length > 0 &&
            renderArticleRow(articles)}
        </CardContent>
      </Card>
    </>
  );
}
