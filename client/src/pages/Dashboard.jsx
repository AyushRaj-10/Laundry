import { useState, useEffect, useContext } from "react";
import OrderContext from "../context/OrderContext";
import CreateOrderModal from "../components/CreateOrderModal";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { dashboardStats } = useContext(OrderContext);
  const [stats, setStats] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

useEffect(() => {
  const loadStats = async () => {
    const data = await dashboardStats();
    if (data) {
      // Find counts per status
      const received = data.statusStats?.find(s => s._id === "RECEIVED")?.count || 0;
      const processing = data.statusStats?.find(s => s._id === "PROCESSING")?.count || 0;
      const ready = data.statusStats?.find(s => s._id === "READY")?.count || 0;
      const delivered = data.statusStats?.find(s => s._id === "DELIVERED")?.count || 0;
      
      setStats({
        totalOrders: data.totalOrders,
        totalRevenue: data.totalRevenue,
        received,
        processing,
        ready,
        delivered,
      });
    }
  };
  loadStats();
}, []);

// Then in cards:
const statCards = stats ? [
  { title: "Total Orders", value: stats.totalOrders, color: "bg-blue-500/20" },
  { title: "Revenue", value: `$${stats.totalRevenue?.toFixed(2) || 0}`, color: "bg-green-500/20" },
  { title: "Received", value: stats.received, color: "bg-yellow-500/20" },
  { title: "Processing", value: stats.processing, color: "bg-purple-500/20" },
] : [];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
        >
          + New Order
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className={`${card.color} backdrop-blur-md border border-white/20 rounded-xl p-6`}
          >
            <h3 className="text-gray-300 text-sm">{card.title}</h3>
            <p className="text-3xl font-bold text-white mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      <CreateOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
};

export default Dashboard;