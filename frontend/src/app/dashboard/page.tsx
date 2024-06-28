"use client";
import { useEffect, useState } from "react";
import { getIpAddresses } from "../../api";
import { IpAddress } from "../../api/types/responses/IpAddress";

export default function DashboardPage() {
  const [ipAddresses, setIpAddresses] = useState<IpAddress[]>([]);

  const fetchIpAddresses = async () => {
    try {
      const response = await getIpAddresses();
      setIpAddresses(response.data);
    } catch (error) {
      console.error("Error fetching IP addresses:", error);
    }
  };

  useEffect(() => {
    fetchIpAddresses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
          {ipAddresses.map((ip) => (
            <div key={ip.id} className="mt-6">
              <div className="bg-white shadow-sm rounded-lg p-4">
                <p className="text-lg font-semibold">{ip.ip_address}</p>
                <p className="text-sm text-gray-600">{ip.label}</p>
                <h2 className="text-m font-semibold text-gray-900 mt-4">
                  Audit Log
                </h2>
                {ip?.audit_logs?.map((log, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-sm rounded-lg p-4 pl-0">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Actioned By:</span>{" "}
                      {log.actioned_by}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Label:</span> {log.label}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Changed At:</span>{" "}
                      {new Date(log.actioned_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
