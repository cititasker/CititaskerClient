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

export async function getUserTasks() {
  const session = await auth();
  const token = session?.user.authToken;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/user`,
    { method: "GET", ...config(token) }
  );
  console.log(33, await response.json());

  if (!response.ok) throw new Error("Failed to fetch post");
  return await response.json();
}
