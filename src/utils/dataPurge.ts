// utils/dataPurge.ts

import { Dispatch } from "@reduxjs/toolkit";
import { purgeStateData } from "@/store/slices/task"; // Adjust import path
import { purgeData } from "@/utils"; // Adjust import path
import { useAppDispatch } from "@/store/hook";

interface PurgeOptions {
  path: string | string[] | any;
  storagePath?: string;
  delay?: number;
  dispatch: Dispatch;
}

/**
 * Reusable function to purge both Redux state and localStorage
 * Combines Redux action dispatch with localStorage clearing
 */
export const purgeTaskData = async ({
  path,
  storagePath,
  delay = 100,
  dispatch,
}: PurgeOptions): Promise<void> => {
  try {
    const paths = Array.isArray(path) ? path : [path];

    // Step 1: Dispatch Redux actions for each path
    for (const singlePath of paths) {
      purgeData({ path: singlePath, storagePath });
    }

    // Step 2: Wait for state propagation
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    // Step 3: Clear localStorage for each path
    for (const singlePath of paths) {
      dispatch(purgeStateData(singlePath));
    }

    console.log(`Successfully purged data for paths: ${paths.join(", ")}`);
  } catch (error) {
    console.error("Error purging data:", error);
    throw error;
  }
};

/**
 * Hook version for easier use in React components
 */
export const usePurgeData = () => {
  const dispatch = useAppDispatch();

  const purge = async (
    path: string | string[],
    options?: {
      storagePath?: string;
      delay?: number;
    }
  ) => {
    await purgeTaskData({
      path,
      dispatch,
      ...options,
    });
  };

  const purgeTask = () => purge("task");
  const purgeOffer = () => purge("offer");
  const purgeAll = () => purge(["task", "offer"]);

  return {
    purge,
    purgeTask,
    purgeOffer,
    purgeAll,
  };
};

/**
 * Enhanced version with better error handling and validation
 */
export class DataPurgeManager {
  private dispatch: Dispatch;
  private defaultDelay: number;

  constructor(dispatch: Dispatch, defaultDelay = 100) {
    this.dispatch = dispatch;
    this.defaultDelay = defaultDelay;
  }

  async purge(
    path: string | string[] | any,
    options?: {
      storagePath?: string;
      delay?: number;
      skipRedux?: boolean;
      skipLocalStorage?: boolean;
    }
  ): Promise<{ success: boolean; message: string }> {
    const {
      storagePath,
      delay = this.defaultDelay,
      skipRedux = false,
      skipLocalStorage = false,
    } = options || {};

    try {
      const paths = Array.isArray(path) ? path : [path];
      const results: string[] = [];

      // Redux clearing
      if (!skipRedux) {
        for (const singlePath of paths) {
          this.dispatch(purgeStateData(singlePath));
          results.push(`Redux: ${singlePath}`);
        }
      }

      // Delay
      if (delay > 0 && !skipRedux && !skipLocalStorage) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      // localStorage clearing
      if (!skipLocalStorage) {
        for (const singlePath of paths) {
          purgeData({ path: singlePath, storagePath });
          results.push(`Storage: ${singlePath}`);
        }
      }

      return {
        success: true,
        message: `Successfully purged: ${results.join(", ")}`,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        message: `Purge failed: ${errorMessage}`,
      };
    }
  }

  // Convenience methods
  async purgeTask(options?: Parameters<typeof this.purge>[1]) {
    return this.purge("task", options);
  }

  async purgeOffer(options?: Parameters<typeof this.purge>[1]) {
    return this.purge("offer", options);
  }

  async purgeAll(options?: Parameters<typeof this.purge>[1]) {
    return this.purge(["task", "offer"], options);
  }
}

/**
 * Factory function to create a purge manager
 */
export const createPurgeManager = (dispatch: Dispatch, defaultDelay = 100) => {
  return new DataPurgeManager(dispatch, defaultDelay);
};

// Usage examples:

/*
// 1. Direct function usage
import { purgeTaskData } from '@/utils/dataPurge';
import { useAppDispatch } from '@/store/hook';

const dispatch = useAppDispatch();

// Your original pattern
await purgeTaskData({ path: "task", dispatch });

// Multiple paths
await purgeTaskData({ path: ["task", "offer"], dispatch });

// Custom options
await purgeTaskData({ 
  path: "task", 
  dispatch,
  delay: 200,
  storagePath: "persist:myCustomTask"
});

// 2. Hook usage (recommended for components)
import { usePurgeData } from '@/utils/dataPurge';

function MyComponent() {
  const { purgeTask, purgeAll, purge } = usePurgeData();
  
  const handleClear = async () => {
    await purgeTask(); // Clear just task
    // or
    await purgeAll(); // Clear task and offer
    // or  
    await purge(["task", "customField"]);
  };
}

// 3. Class-based usage (for complex scenarios)
import { createPurgeManager } from '@/utils/dataPurge';

function ComplexComponent() {
  const dispatch = useAppDispatch();
  const purgeManager = createPurgeManager(dispatch);
  
  const handleSubmit = async () => {
    const result = await purgeManager.purgeTask();
    
    if (!result.success) {
      console.error(result.message);
    }
  };
}

// 4. In your submission hook
export const useTaskSubmission = () => {
  const { purgeTask } = usePurgeData();
  
  const submitTask = async (formData: FormData, taskId?: string) => {
    // ... submission logic
    
    // Replace your original 3 lines with:
    await purgeTask();
    
    // ... rest of success handling
  };
};
*/
