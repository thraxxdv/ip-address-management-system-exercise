import { IpAddressAuditLog } from "./IpAddressAuditLog";

export interface IpAddress {
  id: number;
  ip_address: string;
  label: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  audit_logs?: IpAddressAuditLog[];
}
