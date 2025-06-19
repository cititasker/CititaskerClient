export const USERS = "auth/user-details";
export const OFFER_COMMENT = "tasks/reply-offer";
export const CATEGORY = "categories";
export const SUB_CATEGORY = (id: any) => ["utility/sub-categories", id];
export const USER_TASKS = (status: any): [string, string] => [
  "tasks/user",
  status,
];
