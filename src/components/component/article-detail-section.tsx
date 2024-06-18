"use client";

import moment from "moment";
import "moment/locale/id";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";
import useGetDetailArticle from "@/hooks/useGetDetailArticle";
import { ErrorComponent } from "./error-component";
import Image from "next/image";

export function ArticleDetailSection({ id }: { id: string }) {
  const { data, status, error } = useGetDetailArticle(id);

  if (id === undefined) return <ErrorComponent error="Id not found" />;

  if (error) return <ErrorComponent error={error.message} />;

  return (
    <div className="mx-auto min-w-full max-w-6xl px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="mb-8 md:mb-10 lg:mb-12">
        {status === "pending" ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {data?.title}
          </h2>
        )}
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <div>
          {status === "pending" ? (
            <Skeleton className="h-80 w-full" />
          ) : (
            <Image
              alt={data?.title}
              className="h-auto w-full rounded-lg object-cover"
              height={500}
              src={data?.image_url}
              style={{
                aspectRatio: "800/500",
                objectFit: "cover",
              }}
              width={800}
            />
          )}
        </div>
        <div>
          {status === "pending" ? (
            <Skeleton className="mb-4 h-10 w-full" />
          ) : (
            <p className="mb-4 text-gray-500 dark:text-gray-400">
              {moment(data?.created_at).locale("id").fromNow()}
            </p>
          )}
          <div className="mb-6">
            {status === "pending" ? (
              <Skeleton className="mb-4 h-10 w-full" />
            ) : (
              <h3 className="mb-4 text-2xl font-bold">{data?.title}</h3>
            )}
          </div>
          <div className="mb-6">
            {status === "pending" ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <p
                className="prose rounded-lg p-2 text-gray-500 lg:prose-lg xl:prose-xl dark:bg-slate-500 dark:text-gray-400"
                dangerouslySetInnerHTML={{ __html: data?.description ?? "" }}
              ></p>
            )}
          </div>
          <div className="mb-6">
            <h3 className="mb-4 text-2xl font-bold">About the Author</h3>
            <div className="flex items-center space-x-4">
              {status === "pending" ? (
                <div className="flex flex-row items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ) : (
                <Avatar className="h-12 w-12 border">
                  <AvatarImage
                    alt={data?.user?.name}
                    src={data?.user?.avatarUrl ?? ""}
                  />
                  <AvatarFallback>{data?.user?.name?.[0]}</AvatarFallback>
                </Avatar>
              )}
              <div>
                {status === "pending" ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <h4 className="text-xl font-bold">{data?.user?.name}</h4>
                )}
                {status === "pending" ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    {data?.user?.role?.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
