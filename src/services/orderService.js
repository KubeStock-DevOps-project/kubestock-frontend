import { createApiClient } from "../utils/axios";
import { SERVICES, API_ENDPOINTS } from "../utils/constants";

const orderApi = createApiClient(SERVICES.ORDER);

export const orderService = {
  // Orders
  getAllOrders: async (params) => {
    const response = await orderApi.get(API_ENDPOINTS.ORDER.BASE, { params });
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await orderApi.get(`${API_ENDPOINTS.ORDER.BASE}/${id}`);
    return response.data;
  },

  createOrder: async (orderData) => {
    const response = await orderApi.post(API_ENDPOINTS.ORDER.BASE, orderData);
    return response.data;
  },

  updateOrderStatus: async (id, status) => {
    const response = await orderApi.put(`${API_ENDPOINTS.ORDER.BASE}/${id}/status`, { status });
    return response.data;
  },

  cancelOrder: async (id, reason) => {
    const response = await orderApi.post(`${API_ENDPOINTS.ORDER.BASE}/${id}/cancel`, { reason });
    return response.data;
  },

  // Order Items
  getOrderItems: async (orderId) => {
    const response = await orderApi.get(`${API_ENDPOINTS.ORDER.BASE}/${orderId}/items`);
    return response.data;
  },

  // Order Statistics
  getOrderStats: async () => {
    const response = await orderApi.get(`${API_ENDPOINTS.ORDER.BASE}/stats`);
    return response.data;
  },
};
