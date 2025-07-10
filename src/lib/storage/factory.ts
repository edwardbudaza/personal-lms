import { R2StorageProvider } from './r2';
import { StorageProvider } from '.'; 

export function getStorageProvider(): StorageProvider {
  // You could switch based on env
  return R2StorageProvider;
}
