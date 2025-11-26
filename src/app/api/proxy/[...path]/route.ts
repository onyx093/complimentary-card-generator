import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, "GET");
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, "POST");
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, "PUT");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params.path, "DELETE");
}

async function handleRequest(
  request: NextRequest,
  path: string[],
  method: string
) {
  const endpoint = path.join("/");
  const isAuthEndpoint =
    endpoint === "" ||
    endpoint === "auth" ||
    endpoint.startsWith("auth/") ||
    endpoint.includes("callback");

  let session;
  if (!isAuthEndpoint) {
    session = await auth();

    if (!session?.accessToken) {
      return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
    }
  }

  const base = (process.env.INTERNAL_API_URL || "").replace(/\/$/, "");
  const url = `${base}/${endpoint}`;

  const body = method !== "GET" ? await request.text() : undefined;

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (session?.accessToken) {
      headers.Authorization = `Bearer ${session.accessToken}`;
    }

    const fetchOpts: RequestInit = {
      method,
      headers,
      // Only attach body for non-GET requests
      ...(method !== "GET" && body ? { body } : {}),
    };

    const response = await fetch(url, fetchOpts);

    const data = await response.json().catch(() => ({}));

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { detail: "Internal server error" },
      { status: 500 }
    );
  }
}
