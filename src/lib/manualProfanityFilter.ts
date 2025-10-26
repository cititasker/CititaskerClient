// Fallback if bad-words library doesn't work

// Common profane words list - expanded with more variations
const PROFANE_WORDS = [
  // Strong profanity
  "fuck",
  "fucking",
  "fucker",
  "fucked",
  "fck",
  "fuk",
  "f*ck",
  "shit",
  "shit",
  "sh!t",
  "crap",
  "ass",
  "arse",
  "@ss",
  "asshole",
  "arsehole",
  "bitch",
  "bitches",
  "bastard",
  "dick",
  "cock",
  "penis",
  "pussy",
  "vagina",
  "cunt",
  "whore",
  "slut",
  "piss",
  "damn",
  "hell",
  "motherfucker",

  // Moderate profanity & insults
  "idiot",
  "idiots",
  "stupid",
  "dumb",
  "dumbass",
  "moron",
  "retard",
  "retarded",

  // Hate/violent terms
  "hate",
  "kill",
  "murder",
  "rape",
  "die",
  "death",
  "terrorist",

  // Racial slurs (add carefully, contextually)
  // Note: Some words might be contextual

  // Drug references
  "cocaine",
  "heroin",
  "meth",

  // Add more as needed
];

// Common leetspeak/obfuscation patterns
const OBFUSCATION_MAP: Record<string, string> = {
  "@": "a",
  "4": "a",
  "3": "e",
  "1": "i",
  "!": "i",
  "0": "o",
  $: "s",
  "5": "s",
  "7": "t",
  "+": "t",
  "*": "",
  ".": "",
  "-": "",
  _: "",
};

/**
 * Normalize text to catch obfuscated profanity
 */
function normalizeText(text: string): string {
  let normalized = text.toLowerCase();

  // Replace common obfuscation characters
  for (const [char, replacement] of Object.entries(OBFUSCATION_MAP)) {
    normalized = normalized.split(char).join(replacement);
  }

  // Remove extra spaces
  normalized = normalized.replace(/\s+/g, " ").trim();

  return normalized;
}

/**
 * Check if text contains profanity (with partial word matching for real-time)
 */
export function isProfaneManual(
  text: string,
  checkPartial: boolean = true
): boolean {
  // Remove HTML tags
  const cleanText = text.replace(/<[^>]*>/g, " ");

  // Normalize the text
  const normalized = normalizeText(cleanText);

  if (!normalized.trim()) return false;

  // Split into words
  const words = normalized.split(/\s+/);

  // Check each word
  for (const word of words) {
    const cleanWord = word.replace(/[^\w]/g, "");

    if (cleanWord.length < 3) continue;

    for (const profaneWord of PROFANE_WORDS) {
      // Exact match
      if (cleanWord === profaneWord) {
        console.log("Manual profanity detected (exact):", profaneWord);
        return true;
      }

      // Partial match for real-time detection (at least 3 chars typed)
      if (
        checkPartial &&
        cleanWord.length >= 3 &&
        profaneWord.startsWith(cleanWord) &&
        profaneWord.length >= 4
      ) {
        console.log(
          "Manual profanity detected (partial):",
          cleanWord,
          "->",
          profaneWord
        );
        return true;
      }

      // Contains profanity (for obfuscation)
      if (
        cleanWord.length >= 4 &&
        cleanWord.includes(profaneWord) &&
        profaneWord.length >= 4
      ) {
        console.log("Manual profanity detected (contains):", profaneWord);
        return true;
      }
    }
  }

  return false;
}

/**
 * Get list of profane words found in text
 */
export function findProfaneWords(text: string): string[] {
  const cleanText = text.replace(/<[^>]*>/g, " ");
  const normalized = normalizeText(cleanText);
  const found: string[] = [];

  for (const word of PROFANE_WORDS) {
    const regex = new RegExp(`\\b${word}\\b`, "i");
    if (regex.test(normalized)) {
      found.push(word);
    }
  }

  return found;
}

/**
 * Clean profane words from text
 */
export function cleanProfaneWords(text: string): string {
  let cleaned = text;

  for (const word of PROFANE_WORDS) {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    cleaned = cleaned.replace(regex, "*".repeat(word.length));
  }

  return cleaned;
}
