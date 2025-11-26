// ...existing code...
import { auth } from "@/auth";

interface RequestOptions extends RequestInit {
  data?: any;
}

async function parseJsonSafe(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

export async function apiRequest(
  endpoint: string,
  options: RequestOptions = {}
) {
  const session = await auth();

  if (!session?.accessToken) {
    throw new Error("Not authenticated");
  }

  const { data, ...fetchOptions } = options;

  const baseUrl = process.env.INTERNAL_API_URL;
  if (!baseUrl) {
    throw new Error("INTERNAL_API_URL is not configured");
  }

  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${path}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.accessToken}`,
    ...(fetchOptions.headers ?? {}),
  };

  const config: RequestInit = {
    ...fetchOptions,
    headers,
  };

  if (data !== undefined) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorBody = await parseJsonSafe(response).catch(() => null);
    const message =
      (errorBody && (errorBody.detail || errorBody.message)) ||
      `API Error: ${response.status}`;
    throw new Error(message);
  }

  return parseJsonSafe(response);
}

// Client-side API request through Next.js proxy
export async function clientApiRequest(
  endpoint: string,
  options: RequestOptions = {}
) {
  const { data, ...fetchOptions } = options;

  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `/api/proxy${path}`;

  const headers = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers ?? {}),
  };

  const config: RequestInit = {
    ...fetchOptions,
    headers,
  };

  if (data !== undefined) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorBody = await parseJsonSafe(response).catch(() => null);
    const message =
      (errorBody && (errorBody.detail || errorBody.message)) ||
      `API Error: ${response.status}`;
    throw new Error(message);
  }

  return parseJsonSafe(response);
}
