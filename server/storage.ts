// Simple storage interface for presentation demo
// No actual database operations needed

export interface DemoStorage {
  // Demo storage methods if needed
  healthCheck(): Promise<boolean>;
}

export class MemoryStorage implements DemoStorage {
  async healthCheck(): Promise<boolean> {
    return true;
  }
}

export const storage = new MemoryStorage();