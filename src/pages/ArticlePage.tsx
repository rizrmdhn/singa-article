import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MainLayout from "@/layout/MainLayout";
import { useState } from "react";
import moment from "moment";
import "moment/locale/id";
import { Article } from "@/types/articles";
import useArticle from "@/hooks/useArticle";
import { Skeleton } from "@/components/ui/skeleton";
import useDeleteArticle from "@/hooks/useDeleteArticle";
import { useNavigate } from "react-router-dom";

export default function ArticlePage() {
  const [articleId, setArticleId] = useState("");

  const { data: articles, status } = useArticle();
  const { mutate: deleteArticle } = useDeleteArticle(articleId);

  const navigate = useNavigate();

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
      <TableRow>
        <TableCell className="hidden sm:table-cell"></TableCell>
        <TableCell className="font-medium">Something went wrong</TableCell>
        <TableCell></TableCell>
        <TableCell className="hidden md:table-cell"></TableCell>
        <TableCell className="hidden md:table-cell"></TableCell>
        <TableCell className="hidden md:table-cell"></TableCell>
        <TableCell></TableCell>
      </TableRow>
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
            <TableRow key={article.id}>
              <TableCell className="hidden sm:table-cell">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="h-14 w-14 rounded-md"
                />
              </TableCell>
              <TableCell className="font-medium">{article.title}</TableCell>
              <TableCell className="hidden md:table-cell">
                {article.title}
              </TableCell>
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
                      onClick={() => {
                        navigate(`/articles/${article.id}`);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setArticleId(article.id);
                        deleteArticle();
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <MainLayout>
      <div className="flex items-center">
        {/* the button should be placed on the right */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/articles/new")}
          className="ml-auto"
        >
          Create Article
        </Button>
      </div>
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
    </MainLayout>
  );
}
