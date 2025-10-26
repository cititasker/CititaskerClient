"use client";

import { useState } from "react";
import { Filter } from "bad-words";

/**
 * Debug component to test profanity detection
 * This will help you see exactly what's being detected and when
 */
export const DebugProfanityDetection = () => {
  const [text, setText] = useState("");
  const [results, setResults] = useState<any>(null);

  const filter = new Filter();
  filter.addWords("idiot", "stupid", "dumb", "hate", "kill");

  const testProfanity = () => {
    const cleanText = text.replace(/<[^>]*>/g, " ");
    const normalized = cleanText.toLowerCase().trim();
    const words = normalized.split(/\s+/);

    const badWordsList = filter.list;
    const matches: string[] = [];
    const partialMatches: string[] = [];

    // Test each word
    for (const word of words) {
      const cleanWord = word.replace(/[^\w]/g, "");

      for (const badWord of badWordsList) {
        if (cleanWord === badWord) {
          matches.push(`"${cleanWord}" = "${badWord}" (exact)`);
        } else if (cleanWord.length >= 3 && badWord.startsWith(cleanWord)) {
          partialMatches.push(`"${cleanWord}" -> "${badWord}" (partial)`);
        } else if (cleanWord.includes(badWord) && badWord.length >= 4) {
          matches.push(`"${cleanWord}" contains "${badWord}"`);
        }
      }
    }

    setResults({
      originalText: text,
      cleanText,
      normalized,
      words,
      badWordsCount: badWordsList.length,
      isProfane: filter.isProfane(cleanText),
      matches,
      partialMatches,
      sampleBadWords: badWordsList.slice(0, 20),
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Debug Profanity Detection</h2>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">
            Type text to test (try: "fuck", "shit", "idiot", etc.):
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              // Auto-test as you type
              setTimeout(() => testProfanity(), 0);
            }}
            placeholder="Type something..."
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <button
          onClick={testProfanity}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Test Detection
        </button>
      </div>

      {results && (
        <div className="space-y-4 bg-neutral-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-sm mb-2">Input Analysis:</h3>
              <div className="text-xs space-y-1 bg-white p-3 rounded">
                <p>
                  <strong>Original:</strong> {results.originalText || "(empty)"}
                </p>
                <p>
                  <strong>Clean:</strong> {results.cleanText || "(empty)"}
                </p>
                <p>
                  <strong>Normalized:</strong> {results.normalized || "(empty)"}
                </p>
                <p>
                  <strong>Words:</strong> [{results.words.join(", ")}]
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-2">Detection Results:</h3>
              <div className="text-xs space-y-1 bg-white p-3 rounded">
                <p>
                  <strong>isProfane():</strong>{" "}
                  <span
                    className={
                      results.isProfane
                        ? "text-red-600 font-bold"
                        : "text-green-600"
                    }
                  >
                    {results.isProfane ? "🚫 YES" : "✅ NO"}
                  </span>
                </p>
                <p>
                  <strong>Bad words loaded:</strong> {results.badWordsCount}
                </p>
                <p>
                  <strong>Exact matches:</strong> {results.matches.length}
                </p>
                <p>
                  <strong>Partial matches:</strong>{" "}
                  {results.partialMatches.length}
                </p>
              </div>
            </div>
          </div>

          {results.matches.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm mb-2 text-red-600">
                🚫 Exact Matches Found:
              </h3>
              <div className="text-xs bg-red-50 p-3 rounded space-y-1">
                {results.matches.map((match: string, i: number) => (
                  <p key={i}>• {match}</p>
                ))}
              </div>
            </div>
          )}

          {results.partialMatches.length > 0 && (
            <div>
              <h3 className="font-semibold text-sm mb-2 text-orange-600">
                ⚠️ Partial Matches (typing in progress):
              </h3>
              <div className="text-xs bg-orange-50 p-3 rounded space-y-1">
                {results.partialMatches.map((match: string, i: number) => (
                  <p key={i}>• {match}</p>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-semibold text-sm mb-2">
              Sample Bad Words (first 20 of {results.badWordsCount}):
            </h3>
            <div className="text-xs bg-white p-3 rounded">
              <p className="text-neutral-600">
                {results.sampleBadWords.join(", ")}
              </p>
            </div>
          </div>

          <div className="text-xs text-neutral-500 border-t pt-3">
            <p>
              <strong>How it works:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Exact match: Word exactly matches a bad word</li>
              <li>
                Partial match: At least 3 characters typed that start a bad word
              </li>
              <li>Contains: Word contains a bad word (catches obfuscation)</li>
            </ul>
          </div>
        </div>
      )}

      <div className="text-xs bg-blue-50 border border-blue-200 p-4 rounded space-y-2">
        <p className="font-semibold text-blue-900">💡 Testing Tips:</p>
        <ul className="list-disc list-inside space-y-1 text-blue-800">
          <li>
            Type slowly to see partial matching: "f" → "fu" → "fuc" → "fuck"
          </li>
          <li>Try variations: "f*ck", "fck", "fuk"</li>
          <li>Test with spaces: "this is shit text"</li>
          <li>Try your custom words: "idiot", "stupid", "hate"</li>
        </ul>
      </div>
    </div>
  );
};
