"use server";

import { auth } from "@/auth";

const config = (token: string) => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export async function getUserSingleTask(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/user/single/${id}`
  );
  if (!response.ok) throw new Error("Failed to fetch post");
  return response.json();
}

export async function getUserTasks({ status }: any) {
  const session = await auth();
  const token = session?.user.authToken;
  const urlParams = new URLSearchParams();
  if (status) urlParams.set("status", status);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/user?${urlParams}`,
    { method: "GET", ...config(token) }
  );

  if (!response.ok) throw new Error("Failed to fetch post");
  return await response.json();
}
