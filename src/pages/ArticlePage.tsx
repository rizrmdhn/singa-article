import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import {
  asyncAddArticle,
  asyncDeleteArticle,
  asyncGetArticles,
} from "@/states/articles/action";
import { toast } from "@/components/ui/use-toast";
import moment from "moment";
import "moment/locale/id";
import DialogForm, { DialogFormInputProps } from "@/components/DialogForm";
import { asyncShowCreateArticleDialogActionCreator } from "@/states/showCreateArticleDialog/action";
import { createArticleSchema } from "@/schema/article";
import ConfirmationDialog from "@/components/ConfirmationDialog";

export default function ArticlePage() {
  const articles = useAppSelector((state) => state.articles);
  const showCreateArticleDialog = useAppSelector(
    (state) => state.showCreateArticleDialog,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncGetArticles(toast));
  }, [dispatch]);

  const formData: DialogFormInputProps[] = [
    {
      label: "Title",
      name: "title",
      type: "text",
      placeholder: "Title",
    },
    {
      label: "Description",
      name: "description",
      type: "text",
      placeholder: "Description",
    },
    {
      label: "Image",
      name: "image",
      type: "file",
      placeholder: "Image",
    },
  ];

  return (
    <MainLayout>
      <div className="flex items-center">
        {/* the button should be placed on the right */}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            dispatch(asyncShowCreateArticleDialogActionCreator(true))
          }
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Content</TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead>Updated at</TableHead>
              </TableRow>
            </TableHeader>
            {articles.status === "Success" && articles.data !== null ? (
              <TableBody>
                {articles.data.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="hidden sm:table-cell">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="h-14 w-14 rounded-md"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {article.title}
                    </TableCell>
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
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <ConfirmationDialog
                              alertTitle="Delete Article"
                              alertDescription="Are you sure you want to delete this article?"
                              cancelText="Cancel"
                              continueText="Delete"
                              triggerText="Delete"
                              className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                              key={article.id}
                              onDeleteAction={() =>
                                dispatch(asyncDeleteArticle(article.id, toast))
                              }
                            />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell className="hidden sm:table-cell">
                    <div className="h-14 w-14 rounded-md bg-muted"></div>
                  </TableCell>
                  <TableCell className="font-medium">
                    Laser Lemonade Machine
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Draft</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    $499.99
                  </TableCell>
                  <TableCell className="hidden md:table-cell">25</TableCell>
                  <TableCell className="hidden md:table-cell">
                    2023-07-12 10:42 AM
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>{articles.data !== null ? articles.data.length : 0}</strong>{" "}
            of{" "}
            <strong>{articles.data !== null ? articles.data.length : 0}</strong>{" "}
            Articles
          </div>
        </CardFooter>
      </Card>

      <DialogForm
        open={showCreateArticleDialog}
        openChange={() =>
          dispatch(
            asyncShowCreateArticleDialogActionCreator(!showCreateArticleDialog),
          )
        }
        dialogTitle="Create Article"
        dialogDescription="Create new article"
        schema={createArticleSchema}
        schemaValues={{ title: "", description: "", image: null }}
        data={formData}
        onSubmit={(data) =>
          dispatch(
            asyncAddArticle(
              data.title,
              data.description,
              data.image,
              toast,
              () => dispatch(asyncShowCreateArticleDialogActionCreator(false)),
            ),
          )
        }
      />
    </MainLayout>
  );
}
