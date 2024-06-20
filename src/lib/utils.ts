import { type ClassValue, clsx } from "clsx";
import { Readable } from "stream";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertReadableStreamToNodeStream(
  readableStream: ReadableStream,
): Readable {
  const reader = readableStream.getReader();
  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) {
        this.push(null);
      } else {
        this.push(value);
      }
    },
  });
}
