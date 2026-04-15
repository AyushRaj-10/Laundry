// src/components/StatusBadge.jsx
const statusConfig = {
  RECEIVED: { label: "Received", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/50" },
  PROCESSING: { label: "Processing", color: "bg-blue-500/20 text-blue-300 border-blue-500/50" },
  READY: { label: "Ready", color: "bg-green-500/20 text-green-300 border-green-500/50" },
  DELIVERED: { label: "Delivered", color: "bg-gray-500/20 text-gray-300 border-gray-500/50" },
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.RECEIVED;
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
      {config.label}
    </span>
  );
};
export default StatusBadge;