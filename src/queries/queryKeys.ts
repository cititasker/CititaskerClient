export const USERS = "auth/user-details";
export const OFFER_COMMENT = "tasks/reply-offer";
export const CATEGORY = "categories";
export const SUB_CATEGORY = (id: any) => ["utility/sub-categories", id];
export const TASK_ID = (id: any) => ["tasks/single", id];
export const USER_TASK_ID = (id: any) => ["tasks/single", id];
