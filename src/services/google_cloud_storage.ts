import { env } from "@/env";
import type {
  TGCPStorage,
  TGoogleFileServiceResult,
} from "@/types/googleCloudStorageService";
import { type FileMetadata, Storage } from "@google-cloud/storage";

class GoogleCloudStorageService {
  #gcloudStorage: TGCPStorage = {} as TGCPStorage;
  #bucketName = env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME;
  #storagePath = env.GOOGLE_CLOUD_STORAGE_STORAGE_PATH;

  constructor() {
    this.init();
  }

  async init() {
    try {
      this.#gcloudStorage = new Storage();
    } catch (error) {
      const e = error as Error;
      return {
        error: true,
        message: e.message,
      };
    }
  }

  async save(
    subPath: string,
    filePath: string,
    fileName: string,
    generationMatchPrecondition = 0,
  ): Promise<TGoogleFileServiceResult<string>> {
    try {
      const gcs = this.#gcloudStorage.bucket(this.#bucketName);
      const result = await gcs.upload(filePath, {
        destination: this.generatePath(subPath, fileName),
        predefinedAcl: "publicRead",
        public: true,
        preconditionOpts: { ifGenerationMatch: generationMatchPrecondition },
      });

      const publicUrl = result[0].publicUrl();

      return {
        error: false,
        message: "File uploaded",
        data: publicUrl.replace(/%2F/g, "/"),
      };
    } catch (error) {
      const e = error as Error;
      return {
        error: true,
        message: e.message,
      };
    }
  }

  async delete(
    subPath: string,
    fileName: string,
  ): Promise<TGoogleFileServiceResult<null>> {
    try {
      const gcs = this.#gcloudStorage.bucket(this.#bucketName);
      await gcs.file(this.generatePath(subPath, fileName)).delete();

      return {
        error: false,
        message: "File deleted",
        data: null,
      };
    } catch (error) {
      const e = error as Error;
      return {
        error: true,
        message: e.message,
      };
    }
  }

  async getFileMedatata(
    subPath: string,
    fileName: string,
  ): Promise<TGoogleFileServiceResult<FileMetadata>> {
    try {
      const gcs = this.#gcloudStorage.bucket(this.#bucketName);
      const file = gcs.file(this.generatePath(subPath, fileName));
      const [metadata] = await file.getMetadata();

      return {
        error: false,
        message: "File metadata",
        data: metadata,
      };
    } catch (error) {
      const e = error as Error;
      return {
        error: true,
        message: e.message,
      };
    }
  }

  async getTotalSize(
    subPath: string,
    arrayOfFileName: string[],
  ): Promise<TGoogleFileServiceResult<number>> {
    let totalSize = 0;

    try {
      for (const fileName of arrayOfFileName) {
        const metadata = await this.getFileMedatata(subPath, fileName);

        if (metadata.error) {
          return metadata;
        }

        // in bytes
        const fileSize = metadata.data.size;

        if (typeof fileSize === "string") {
          totalSize += Number.parseInt(fileSize);
        } else if (typeof fileSize === "number") {
          totalSize += fileSize;
        } else {
          return {
            error: true,
            message: "File size is not a number",
          };
        }
      }
    } catch (error) {
      const e = error as Error;
      return {
        error: true,
        message: e.message,
      };
    }

    return {
      error: false,
      message: "Total size",
      data: totalSize,
    };
  }

  generatePath(subPath: string, fileName: string) {
    return `${this.#storagePath}/${subPath}/${fileName}`;
  }
}

const googleCloudStorageService = new GoogleCloudStorageService();

export default googleCloudStorageService;
