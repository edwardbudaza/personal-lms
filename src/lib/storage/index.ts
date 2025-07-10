export interface StorageProvider {
    upload: (file: File, path: string) => Promise<string>; // returns URL
    delete?: (path: string) => Promise<void>;
  }
  