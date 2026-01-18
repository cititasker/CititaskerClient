export const signupHelpers = {
  // Save progress to localStorage
  saveProgress: (step: number, data: Record<string, any>) => {
    const progress = {
      step,
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem("signup-progress", JSON.stringify(progress));
  },

  // Load progress from localStorage
  loadProgress: () => {
    try {
      const saved = localStorage.getItem("signup-progress");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  },

  // Clear progress
  clearProgress: () => {
    const keysToRemove = [
      "signup-progress",
      "signup-token",
      "email",
      "phone_number",
    ];
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  },

  // Validate step access
  canAccessStep: (targetStep: number, completedSteps: number[]) => {
    return targetStep <= Math.max(...completedSteps, 0) + 1;
  },
};
