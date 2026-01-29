import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { NextRequest } from "next/server";

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> },
) {
  const TASKS_PER_PAGE = 1000;
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://staging-api.cititasker.com/api/v1";
  const APP_URL =
    process.env.NEXT_PUBLIC_DOMAIN_URL || "https://cititasker.com";

  const { page: pageParam } = await params;
  const page = parseInt(pageParam) || 1;

  const url = `${BASE_URL}/tasks?per_page=${TASKS_PER_PAGE}&page=${page}&status=open`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`API failed with status 2 ${res.status}`);
    }

    const response: TaskResponse = await res.json();

    const tasks = response.data.data || [];

    const fields: ISitemapField[] = tasks.map((task: any) => ({
      loc: `${APP_URL}/browse-task/${task.id}`,
      lastmod: task.updated_at || new Date().toISOString(),
      changefreq: "daily",
      priority: 0.7,
    }));

    return getServerSideSitemap(fields);
  } catch (error) {
    console.error("Error generating task sitemap:", error);
    return getServerSideSitemap([]);
  }
}
