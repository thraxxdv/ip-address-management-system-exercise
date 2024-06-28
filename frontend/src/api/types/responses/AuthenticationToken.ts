export interface AuthenticationToken {
  token: string;
  name: string;
  expires_at: string | null;
}
