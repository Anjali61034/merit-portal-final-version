// lib/storage.ts
// Shared in-memory document store
if (!(global as any).documentStorage) {
  (global as any).documentStorage = []
}
export const documentStorage: any[] = (global as any).documentStorage

// ✅ Shared in-memory user store (for signup/login)
if (!(global as any).userStorage) {
  (global as any).userStorage = []
}
export const userStorage: any[] = (global as any).userStorage
