"use client";
import { useEffect, useState } from "react";
import { createIpAddress, getIpAddresses, updateIpAddress } from "../../api";
import { IpAddress } from "../../api/types/responses/IpAddress";

export default function DashboardPage() {
  const [ipAddresses, setIpAddresses] = useState<IpAddress[]>([]);
  const [newIpAddress, setNewIpAddress] = useState<string>("");
  const [newLabel, setNewLabel] = useState<string>("");
  const [editingIpId, setEditingIpId] = useState<number | null>(null);
  const [editingLabel, setEditingLabel] = useState<string>("");

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

  const handleAddIpAddress = async () => {
    try {
      const response = await createIpAddress({
        ip_address: newIpAddress,
        label: newLabel,
      });

      setIpAddresses([...ipAddresses, response.data]);
      setNewIpAddress("");
      setNewLabel("");
    } catch (error) {
      console.error("Error adding IP address:", error);
    }
  };

  const handleEditSaved = async (id: number, newLabel: string) => {
    try {
      const response = await updateIpAddress(id, { label: newLabel });
      const updatedIpAddresses = ipAddresses.map((ip) =>
        ip.id === id ? response.data : ip
      );
      setIpAddresses(updatedIpAddresses);
      setEditingIpId(null);
    } catch (error) {
      console.error("Error editing IP address label:", error);
    }
  };

  const handleEditButtonClick = (id: number) => {
    setEditingIpId(id);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>

          {/* Add New IP Address Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Add New IP Address
            </h2>
            <div className="flex mt-2">
              <input
                type="text"
                className="border border-gray-300 px-3 py-2 mr-2 rounded-md w-48"
                placeholder="Enter IP Address"
                value={newIpAddress}
                onChange={(e) => setNewIpAddress(e.target.value)}
              />
              <input
                type="text"
                className="border border-gray-300 px-3 py-2 mr-2 rounded-md w-48"
                placeholder="Enter Label"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={handleAddIpAddress}>
                Add IP Address
              </button>
            </div>
          </div>

          {/* IP Addresses List */}
          {ipAddresses.map((ip) => (
            <div key={ip.id} className="mt-6">
              <div className="bg-white shadow-sm rounded-lg p-4">
                <p className="text-lg font-semibold">{ip.ip_address}</p>
                {editingIpId === ip.id ? (
                  <div className="flex mt-2">
                    <input
                      type="text"
                      className="border border-gray-300 px-3 py-2 mr-2 rounded-md w-48"
                      value={editingLabel || ip.label}
                      onChange={(e) => setEditingLabel(e.target.value)}
                    />
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                      onClick={() => handleEditSaved(ip.id, editingLabel)}>
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-600">{ip.label}</p>
                    <button
                      className="text-sm text-blue-500 mt-2 inline-block"
                      onClick={() => handleEditButtonClick(ip.id)}>
                      Edit Label
                    </button>
                  </>
                )}
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
