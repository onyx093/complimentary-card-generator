import { Links } from "@/lib/enums/links";

/**
 * Public routes are routes that are accessible to all users, regardless of whether they are authenticated or not.
 * @type {string[]}
 */

export const publicRoutes: string[] = [`${Links.LOGIN}`];

export const protectedRoutes: string[] = [
  `${Links.HOME}`,
  `${Links.DASHBOARD}`,
  `${Links.PROFILE}`,
  `${Links.SETTINGS}`,
];

/**
 * The prefix for API routes.
 * @type {string}
 */
export const API_ROUTE_PREFIX = "/api";
