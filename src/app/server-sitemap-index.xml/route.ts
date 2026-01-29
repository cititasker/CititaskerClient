// server-sitemap-index.xml
import { getServerSideSitemapIndex } from "next-sitemap";

interface ITask {
  id: number;
  created_at: string;
}

interface TaskResponse {
  data: {
    data: ITask[];
    meta: { last_page: number };
  };
}

export async function GET(request: Request) {
  const TASKS_PER_PAGE = 1000;
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://staging-api.cititasker.com/api/v1";
  const APP_URL =
    process.env.NEXT_PUBLIC_DOMAIN_URL || "https://cititasker.com";

  const url = `${BASE_URL}/tasks?per_page=${TASKS_PER_PAGE}&page=1&status=open`;

  try {
    // Call API to get total count
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`API failed with status ${res.status}`);
    }

    const response: TaskResponse = await res.json();

    const totalPages = response?.data?.meta.last_page || 1;

    // Generate sitemap URLs for each page
    const sitemaps = Array.from(
      { length: totalPages },
      (_, i) => `${APP_URL}/task-sitemap/${i + 1}.xml`,
    );

    return getServerSideSitemapIndex(sitemaps);
  } catch (error) {
    console.error("Error generating sitemap index:", error, url);
    return getServerSideSitemapIndex([`${APP_URL}/task-sitemap-1.xml`]);
  }
}
