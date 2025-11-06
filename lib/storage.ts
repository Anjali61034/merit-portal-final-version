// lib/storage.ts
if (!(global as any).documentStorage) {
  (global as any).documentStorage = []
}

export const documentStorage: any[] = (global as any).documentStorage
