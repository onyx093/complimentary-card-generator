import { Links } from "@/lib/enums/links";

/**
 * Public routes are routes that are accessible to all users, regardless of whether they are authenticated or not.
 * @type {string[]}
 */

export const publicRoutes: string[] = [
  `${Links.HOME}`,
  `${Links.LOGIN}`,
  `${Links.LOGOUT}`,
];

export const protectedRoutes: string[] = [
  `${Links.DASHBOARD}`,
  `${Links.PROFILE}`,
  `${Links.SETTINGS}`,
];

/**
 * The prefix for API routes.
 * @type {string}
 */
export const API_ROUTE_PREFIX = "/api";
