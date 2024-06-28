import { CreateIpAddress } from "./types/payloads/CreateIpAddress";
import { Login } from "./types/payloads/Login";
import { UpdateIpAddress } from "./types/payloads/UpdateIpAddress";
import { AuthenticationToken } from "./types/responses/AuthenticationToken";
import { IpAddress } from "./types/responses/IpAddress";

const API_BASE_URL = "http://localhost:8085/api";

interface ApiResponse<T> {
  data: T;
}

async function fetchWithAuth<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
}

function getAuthToken(): string | null {
  return localStorage.getItem("sanctum_token");
}

export async function authenticate(
  credentials: Login
): Promise<ApiResponse<AuthenticationToken>> {
  return fetchWithAuth("/authenticate", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function getIpAddresses(): Promise<ApiResponse<IpAddress[]>> {
  return fetchWithAuth("/ip-addresses", {
    method: "GET",
  });
}

export async function createIpAddress(
  data: CreateIpAddress
): Promise<ApiResponse<IpAddress>> {
  return fetchWithAuth("/ip-addresses", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateIpAddress(
  id: number,
  data: UpdateIpAddress
): Promise<ApiResponse<IpAddress>> {
  return fetchWithAuth(`/ip-addresses/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
