// src/components/CreateOrderModal.jsx
import { useState, useContext } from "react";
import OrderContext from "../context/OrderContext";
import { motion, AnimatePresence } from "framer-motion";

const CreateOrderModal = ({ isOpen, onClose }) => {
  const { createOrder } = useContext(OrderContext);
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    garments: [{ type: "", quantity: 1, price: 0 }],
  });
  const [error, setError] = useState("");

  const addGarment = () => {
    setFormData({
      ...formData,
      garments: [...formData.garments, { type: "", quantity: 1, price: 0 }],
    });
  };

  const removeGarment = (index) => {
    const newGarments = formData.garments.filter((_, i) => i !== index);
    setFormData({ ...formData, garments: newGarments });
  };

  const updateGarment = (index, field, value) => {
    const updated = [...formData.garments];
    updated[index][field] = field === "quantity" || field === "price" ? parseFloat(value) : value;
    setFormData({ ...formData, garments: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || formData.garments.length === 0) {
      setError("Customer name, phone, and at least one garment are required");
      return;
    }
    try {
      await createOrder(formData);
      onClose();
      setFormData({
        customerName: "",
        phone: "",
        garments: [{ type: "", quantity: 1, price: 0 }],
      });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create order");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gray-900/90 backdrop-blur-md rounded-xl p-6 w-full max-w-2xl border border-white/20 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white mb-4">New Order</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300">Customer Name</label>
                <input
                  type="text"
                  className="w-full mt-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300">Phone</label>
                <input
                  type="tel"
                  className="w-full mt-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Garments</label>
                {formData.garments.map((garment, idx) => (
                  <div key={idx} className="flex gap-2 mb-2 items-end">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Type (e.g., Shirt)"
                        className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm"
                        value={garment.type}
                        onChange={(e) => updateGarment(idx, "type", e.target.value)}
                      />
                    </div>
                    <div className="w-24">
                      <input
                        type="number"
                        placeholder="Qty"
                        className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm"
                        value={garment.quantity}
                        onChange={(e) => updateGarment(idx, "quantity", e.target.value)}
                      />
                    </div>
                    <div className="w-28">
                      <input
                        type="number"
                        placeholder="Price"
                        className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm"
                        value={garment.price}
                        onChange={(e) => updateGarment(idx, "price", e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeGarment(idx)}
                      className="text-red-400 hover:text-red-300 px-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addGarment}
                  className="text-blue-400 text-sm mt-1 hover:underline"
                >
                  + Add another garment
                </button>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Create Order
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateOrderModal;