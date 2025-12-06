export const clearTaskLocalStorage = (): boolean => {
  if (typeof window === "undefined") return false;

  try {
    const persistKey = "persist:task";
    const persistedData = localStorage.getItem(persistKey);

    if (persistedData) {
      const parsed = JSON.parse(persistedData);

      // 🎯 HIGHLIGHT: Keep persist metadata but clear task creation data
      const clearedData = {
        ...parsed,
        task: "{}", // Clear task data
        offer: "{}", // Clear offer data
        _persist: parsed._persist, // Keep redux-persist metadata
      };

      localStorage.setItem(persistKey, JSON.stringify(clearedData));

      // 🆕 NEW: Verification logging
      console.log("✅ Task localStorage cleared successfully");
      return true;
    }

    return false;
  } catch (error) {
    console.error("❌ Failed to clear task localStorage:", error);

    // 🆕 NEW: Fallback - nuclear option
    localStorage.removeItem("persist:task");
    console.log("🗑️ Removed entire persist:task key as fallback");
    return false;
  }
};
