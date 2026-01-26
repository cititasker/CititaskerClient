import type { Metadata } from "next";

interface MetadataConfig {
  title: string;
  description?: string;
  noIndex?: boolean;
}

export function generateLayoutMetadata({
  title,
  description,
  noIndex = false,
}: MetadataConfig): Metadata {
  const metadata: Metadata = {
    title: {
      default: title,
      template: `%s | CitiTasker`,
    },
  };

  if (description) {
    metadata.description = description;
  }

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
      noimageindex: true,
    };
  }

  return metadata;
}
