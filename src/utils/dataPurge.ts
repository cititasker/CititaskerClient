// utils/dataPurge.ts - Enhanced with better memoization and fixed timing
import { Dispatch } from "@reduxjs/toolkit";
import { purgeStateData } from "@/store/slices/task";
import { purgeData } from "@/utils";
import { useAppDispatch } from "@/store/hook";
import { useCallback } from "react";

interface PurgeOptions {
  path: string | string[] | any;
  storagePath?: string;
  delay?: number;
  dispatch: Dispatch;
}

/**
 * Reusable function to purge both Redux state and localStorage
 * Fixed timing to clear localStorage first, then Redux
 */
export const purgeTaskData = async ({
  path,
  storagePath,
  delay = 50, // Reduced delay for faster response
  dispatch,
}: PurgeOptions): Promise<void> => {
  try {
    const paths = Array.isArray(path) ? path : [path];

    // Step 1: Clear localStorage immediately (most important for persistence)
    for (const singlePath of paths) {
      purgeData({ path: singlePath, storagePath });
    }

    // Step 2: Dispatch Redux actions to clear in-memory state
    for (const singlePath of paths) {
      dispatch(purgeStateData(singlePath));
    }

    // Step 3: Small delay to ensure persistence clearing completes
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    console.log(`Successfully purged data for paths: ${paths.join(", ")}`);
  } catch (error) {
    console.error("Error purging data:", error);
    throw error;
  }
};

/**
 * Hook version with proper memoization to prevent infinite loops
 * This is the main fix - useCallback prevents recreation on every render
 */
export const usePurgeData = () => {
  const dispatch = useAppDispatch();

  // Memoize the main purge function to prevent recreation
  const purge = useCallback(
    async (
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
    },
    [dispatch]
  ); // Only recreate if dispatch changes (which it never does)

  // Memoize all convenience functions to prevent infinite loops
  const purgeTask = useCallback(() => purge("task"), [purge]);
  const purgeOffer = useCallback(() => purge("offer"), [purge]);
  const purgeAll = useCallback(() => purge(["task", "offer"]), [purge]);

  return {
    purge,
    purgeTask,
    purgeOffer,
    purgeAll,
  };
};

/**
 * Enhanced version with better error handling and validation
 * Use this for more complex purging scenarios
 */
export class DataPurgeManager {
  private dispatch: Dispatch;
  private defaultDelay: number;

  constructor(dispatch: Dispatch, defaultDelay = 50) {
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

      // localStorage clearing (most important - do first)
      if (!skipLocalStorage) {
        for (const singlePath of paths) {
          purgeData({ path: singlePath, storagePath });
          results.push(`Storage: ${singlePath}`);
        }
      }

      // Redux clearing (in-memory state)
      if (!skipRedux) {
        for (const singlePath of paths) {
          this.dispatch(purgeStateData(singlePath));
          results.push(`Redux: ${singlePath}`);
        }
      }

      // Delay only if both operations were performed
      if (delay > 0 && !skipRedux && !skipLocalStorage) {
        await new Promise((resolve) => setTimeout(resolve, delay));
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
export const createPurgeManager = (dispatch: Dispatch, defaultDelay = 50) => {
  return new DataPurgeManager(dispatch, defaultDelay);
};
