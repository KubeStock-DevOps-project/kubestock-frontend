import { createApiClient } from "../utils/axios";
import { SERVICES, API_ENDPOINTS } from "../utils/constants";

const supplierApi = createApiClient(SERVICES.SUPPLIER);

export const supplierService = {
  // Suppliers
  getAllSuppliers: async (params) => {
    const response = await supplierApi.get(API_ENDPOINTS.SUPPLIER.BASE, { params });
    return response.data;
  },

  getSupplierById: async (id) => {
    const response = await supplierApi.get(`${API_ENDPOINTS.SUPPLIER.BASE}/${id}`);
    return response.data;
  },

  createSupplier: async (supplierData) => {
    const response = await supplierApi.post(API_ENDPOINTS.SUPPLIER.BASE, supplierData);
    return response.data;
  },

  updateSupplier: async (id, supplierData) => {
    const response = await supplierApi.put(`${API_ENDPOINTS.SUPPLIER.BASE}/${id}`, supplierData);
    return response.data;
  },

  deleteSupplier: async (id) => {
    const response = await supplierApi.delete(`${API_ENDPOINTS.SUPPLIER.BASE}/${id}`);
    return response.data;
  },

  // My Profile (for supplier users)
  getMyProfile: async () => {
    const response = await supplierApi.get(`${API_ENDPOINTS.SUPPLIER.BASE}/profile/me`);
    return response.data;
  },

  updateMyProfile: async (profileData) => {
    const response = await supplierApi.put(`${API_ENDPOINTS.SUPPLIER.BASE}/profile/me`, profileData);
    return response.data;
  },

  // Purchase Orders
  getAllPurchaseOrders: async (params) => {
    const response = await supplierApi.get(API_ENDPOINTS.SUPPLIER.PURCHASE_ORDERS, { params });
    return response.data;
  },

  getPurchaseOrderById: async (id) => {
    const response = await supplierApi.get(`${API_ENDPOINTS.SUPPLIER.PURCHASE_ORDERS}/${id}`);
    return response.data;
  },

  createPurchaseOrder: async (orderData) => {
    const response = await supplierApi.post(API_ENDPOINTS.SUPPLIER.PURCHASE_ORDERS, orderData);
    return response.data;
  },

  updatePurchaseOrder: async (id, orderData) => {
    const response = await supplierApi.put(`${API_ENDPOINTS.SUPPLIER.PURCHASE_ORDERS}/${id}`, orderData);
    return response.data;
  },

  deletePurchaseOrder: async (id) => {
    const response = await supplierApi.delete(`${API_ENDPOINTS.SUPPLIER.PURCHASE_ORDERS}/${id}`);
    return response.data;
  },

  updatePOStatus: async (id, status, notes) => {
    const response = await supplierApi.patch(`${API_ENDPOINTS.SUPPLIER.PURCHASE_ORDERS}/${id}/status`, {
      status,
      notes,
    });
    return response.data;
  },

  receivePurchaseOrder: async (id, data) => {
    const response = await supplierApi.patch(`${API_ENDPOINTS.SUPPLIER.PURCHASE_ORDERS}/${id}/receive`, data);
    return response.data;
  },

  // For suppliers to respond to requests
  getPendingRequests: async (supplierId) => {
    const response = await supplierApi.get(
      `${API_ENDPOINTS.SUPPLIER.PURCHASE_ORDERS}/supplier/${supplierId}/pending`
    );
    return response.data;
  },

  respondToRequest: async (id, response_status, notes) => {
    const response = await supplierApi.post(
      `${API_ENDPOINTS.SUPPLIER.PURCHASE_ORDERS}/${id}/supplier-response`,
      { response_status, notes }
    );
    return response.data;
  },

  // Supplier Ratings
  getSupplierRatings: async (supplierId) => {
    const response = await supplierApi.get(`${API_ENDPOINTS.SUPPLIER.RATINGS}/${supplierId}`);
    return response.data;
  },

  rateSupplier: async (supplierId, ratingData) => {
    const response = await supplierApi.post(
      `${API_ENDPOINTS.SUPPLIER.RATINGS}/${supplierId}`,
      ratingData
    );
    return response.data;
  },
};
