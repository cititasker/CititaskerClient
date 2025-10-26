// lib/contentModeration.ts
import { Filter } from "bad-words";
import { isProfaneManual } from "./manualProfanityFilter";

// Initialize profanity filter with configuration
const profanityFilter = new Filter();

// Add custom words to catch more variations
profanityFilter.addWords(
  "idiot",
  "stupid",
  "dumb",
  "hate",
  "kill",
  "fool",
  "nonsense"
  // Add more words as needed
);

// Get the default profanity list from bad-words
const profanityList = profanityFilter.list;

console.log("Loaded profanity words:", profanityList.length, "words");

// Helper function to check profanity with better real-time detection
function isProfane(text: string): boolean {
  // Remove HTML tags
  const cleanText = text.replace(/<[^>]*>/g, " ");

  // Normalize text for checking
  const normalizedText = cleanText.toLowerCase().trim();

  if (!normalizedText) return false;

  // Method 1: Use bad-words isProfane (catches complete words)
  try {
    if (profanityFilter.isProfane(cleanText)) {
      console.log("Profanity detected by bad-words isProfane");
      return true;
    }
  } catch (error) {
    console.warn("bad-words library error:", error);
  }

  // Method 2: Check against the word list manually (catches partial/incomplete)
  // Split text into words and check each one
  const words = normalizedText.split(/\s+/);

  for (const word of words) {
    // Remove punctuation from the word
    const cleanWord = word.replace(/[^\w]/g, "");

    if (cleanWord.length < 3) continue; // Skip very short words

    // Check if this word matches any profanity
    for (const profaneWord of profanityList) {
      // Exact match
      if (cleanWord === profaneWord) {
        console.log("Profanity detected (exact match):", profaneWord);
        return true;
      }

      // Partial match for words being typed (at least 3 characters)
      if (cleanWord.length >= 3 && profaneWord.startsWith(cleanWord)) {
        console.log(
          "Potential profanity detected (partial match):",
          cleanWord,
          "->",
          profaneWord
        );
        return true;
      }

      // Word contains profanity
      if (
        cleanWord.length >= 4 &&
        cleanWord.includes(profaneWord) &&
        profaneWord.length >= 4
      ) {
        console.log(
          "Profanity detected (contains):",
          profaneWord,
          "in",
          cleanWord
        );
        return true;
      }
    }
  }

  // Method 3: Fallback to manual detection for obfuscated words
  const manualCheck = isProfaneManual(text, true); // true = check partial words
  if (manualCheck) {
    console.log("Profanity detected by manual filter");
    return manualCheck;
  }

  return false;
}

export interface ModerationRule {
  name: string;
  pattern?: RegExp;
  customCheck?: (content: string) => boolean;
  message: string;
  severity: "error" | "warning";
}

export interface ModerationConfig {
  enabled: boolean;
  rules: ModerationRule[];
  customValidator?: (content: string) => { valid: boolean; message?: string };
  realTime?: boolean; // Enable real-time checking
}

export interface ModerationResult {
  valid: boolean;
  violations: string[];
  warnings: string[];
  hasIssues: boolean;
}

// Predefined rule sets
export const MODERATION_RULES = {
  // Phone numbers (various formats)
  PHONE_NUMBERS: {
    name: "phone_number",
    pattern: /(\+?\d{1,4}[\s-]?)?(\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}/g,
    message: "Phone numbers are not allowed",
    severity: "error" as const,
  },

  // URLs and links
  URLS: {
    name: "url",
    pattern:
      /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9-]+\.(com|org|net|io|co|edu|gov|uk|ca|au)[^\s]*)/gi,
    message: "Links are not allowed",
    severity: "error" as const,
  },

  // Email addresses
  EMAILS: {
    name: "email",
    pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    message: "Email addresses are not allowed",
    severity: "error" as const,
  },

  // Profanity using bad-words library
  PROFANITY: {
    name: "profanity",
    customCheck: (content: string) => {
      return isProfane(content);
    },
    message: "Inappropriate or abusive language detected",
    severity: "error" as const,
  },

  // Excessive caps
  EXCESSIVE_CAPS: {
    name: "excessive_caps",
    pattern: /\b[A-Z]{10,}\b/g,
    message: "Please avoid excessive capitalization",
    severity: "warning" as const,
  },

  // Spam patterns (repeated characters)
  SPAM_REPETITION: {
    name: "spam",
    pattern: /(.)\1{9,}/g,
    message: "Spam-like content detected",
    severity: "warning" as const,
  },

  // Multiple consecutive special characters
  EXCESSIVE_SPECIAL_CHARS: {
    name: "special_chars",
    pattern: /[!@#$%^&*()]{5,}/g,
    message: "Too many special characters",
    severity: "warning" as const,
  },
};

// Moderation preset configurations
export const MODERATION_PRESETS = {
  NONE: {
    enabled: false,
    rules: [],
    realTime: false,
  },

  BASIC: {
    enabled: true,
    rules: [MODERATION_RULES.PROFANITY, MODERATION_RULES.SPAM_REPETITION],
    realTime: true,
  },

  STRICT: {
    enabled: true,
    rules: [
      MODERATION_RULES.PHONE_NUMBERS,
      MODERATION_RULES.URLS,
      MODERATION_RULES.EMAILS,
      MODERATION_RULES.PROFANITY,
      MODERATION_RULES.SPAM_REPETITION,
      MODERATION_RULES.EXCESSIVE_CAPS,
    ],
    realTime: true,
  },

  NO_CONTACT_INFO: {
    enabled: true,
    rules: [
      MODERATION_RULES.PHONE_NUMBERS,
      MODERATION_RULES.EMAILS,
      MODERATION_RULES.URLS,
    ],
    realTime: true,
  },

  PUBLIC_COMMENT: {
    enabled: true,
    rules: [
      MODERATION_RULES.PROFANITY,
      MODERATION_RULES.PHONE_NUMBERS,
      MODERATION_RULES.EMAILS,
      MODERATION_RULES.SPAM_REPETITION,
    ],
    realTime: true,
  },
};

// Main moderation function
export function moderateContent(
  content: string,
  config: ModerationConfig
): ModerationResult {
  if (!config.enabled) {
    return { valid: true, violations: [], warnings: [], hasIssues: false };
  }

  const violations: string[] = [];
  const warnings: string[] = [];

  // Strip HTML tags for checking plain text
  const plainText = content.replace(/<[^>]*>/g, "").trim();

  // Don't check empty content
  if (!plainText) {
    return { valid: true, violations: [], warnings: [], hasIssues: false };
  }

  // Check each rule
  for (const rule of config.rules) {
    let isViolation = false;

    // Check using pattern if available
    if (rule.pattern) {
      // Reset lastIndex for global regex
      rule.pattern.lastIndex = 0;
      isViolation = rule.pattern.test(plainText);
    }

    // Check using custom function if available
    if (rule.customCheck && !isViolation) {
      isViolation = rule.customCheck(content);
    }

    if (isViolation) {
      if (rule.severity === "error") {
        violations.push(rule.message);
      } else {
        warnings.push(rule.message);
      }
    }
  }

  // Run custom validator if provided
  if (config.customValidator) {
    const customResult = config.customValidator(plainText);
    if (!customResult.valid && customResult.message) {
      violations.push(customResult.message);
    }
  }

  return {
    valid: violations.length === 0,
    violations,
    warnings,
    hasIssues: violations.length > 0 || warnings.length > 0,
  };
}

// Helper to clean profane words
export function cleanProfanity(content: string): string {
  const plainText = content.replace(/<[^>]*>/g, "");
  return profanityFilter.clean(plainText);
}

// Export the filter instance for custom configuration
export { profanityFilter };
