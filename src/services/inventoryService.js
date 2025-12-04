import { createApiClient } from "../utils/axios";
import { SERVICES, API_ENDPOINTS } from "../utils/constants";

const inventoryApi = createApiClient(SERVICES.INVENTORY);

export const inventoryService = {
  // Inventory
  getAllInventory: async (params) => {
    const response = await inventoryApi.get(API_ENDPOINTS.INVENTORY.BASE, { params });
    return response.data;
  },

  getInventoryByProductId: async (productId) => {
    const response = await inventoryApi.get(`${API_ENDPOINTS.INVENTORY.BASE}/product/${productId}`);
    return response.data;
  },

  getInventoryBySku: async (sku) => {
    const response = await inventoryApi.get(`${API_ENDPOINTS.INVENTORY.BASE}/sku/${sku}`);
    return response.data;
  },

  updateInventory: async (id, inventoryData) => {
    const response = await inventoryApi.put(`${API_ENDPOINTS.INVENTORY.BASE}/${id}`, inventoryData);
    return response.data;
  },

  // Stock Adjustments
  adjustStock: async (adjustmentData) => {
    const response = await inventoryApi.post(`${API_ENDPOINTS.INVENTORY.BASE}/adjust`, adjustmentData);
    return response.data;
  },

  // Stock Movements
  getStockMovements: async (params) => {
    const response = await inventoryApi.get(`${API_ENDPOINTS.INVENTORY.BASE}/movements`, { params });
    return response.data;
  },

  // Reservations
  reserveStock: async (reservationData) => {
    const response = await inventoryApi.post(API_ENDPOINTS.INVENTORY.RESERVE, reservationData);
    return response.data;
  },

  releaseReservation: async (releaseData) => {
    const response = await inventoryApi.post(API_ENDPOINTS.INVENTORY.RELEASE, releaseData);
    return response.data;
  },

  // Alerts
  getLowStockAlerts: async () => {
    const response = await inventoryApi.get(API_ENDPOINTS.INVENTORY.ALERTS);
    return response.data;
  },

  acknowledgeAlert: async (id) => {
    const response = await inventoryApi.post(`${API_ENDPOINTS.INVENTORY.ALERTS}/${id}/acknowledge`);
    return response.data;
  },

  getReorderSuggestions: async () => {
    const response = await inventoryApi.get(`${API_ENDPOINTS.INVENTORY.ALERTS}/reorder-suggestions`);
    return response.data;
  },

  // Bulk operations
  bulkCheckAvailability: async (items) => {
    const response = await inventoryApi.post(API_ENDPOINTS.INVENTORY.BULK_CHECK, { items });
    return response.data;
  },

  // Analytics
  getAnalytics: async () => {
    const response = await inventoryApi.get(API_ENDPOINTS.INVENTORY.ANALYTICS);
    return response.data;
  },
};
