import { createApiClient } from "../utils/axios";
import { SERVICES, API_ENDPOINTS } from "../utils/constants";

const productApi = createApiClient(SERVICES.PRODUCT);

export const productService = {
  // Products
  getAllProducts: async (params) => {
    const response = await productApi.get(API_ENDPOINTS.PRODUCT.BASE, { params });
    return response.data;
  },

  getProductById: async (id) => {
    const response = await productApi.get(`${API_ENDPOINTS.PRODUCT.BASE}/${id}`);
    return response.data;
  },

  getProductsBySku: async (sku) => {
    const response = await productApi.get(`${API_ENDPOINTS.PRODUCT.BASE}/sku/${sku}`);
    return response.data;
  },

  getProductsByIds: async (ids) => {
    const response = await productApi.post(`${API_ENDPOINTS.PRODUCT.BASE}/batch`, { ids });
    return response.data;
  },

  searchProducts: async (query) => {
    const response = await productApi.get(`${API_ENDPOINTS.PRODUCT.BASE}/search`, {
      params: { q: query },
    });
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await productApi.post(API_ENDPOINTS.PRODUCT.BASE, productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await productApi.put(`${API_ENDPOINTS.PRODUCT.BASE}/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await productApi.delete(`${API_ENDPOINTS.PRODUCT.BASE}/${id}`);
    return response.data;
  },

  // Categories
  getAllCategories: async () => {
    const response = await productApi.get(API_ENDPOINTS.PRODUCT.CATEGORIES);
    return response.data;
  },

  getCategoryById: async (id) => {
    const response = await productApi.get(`${API_ENDPOINTS.PRODUCT.CATEGORIES}/${id}`);
    return response.data;
  },

  createCategory: async (categoryData) => {
    const response = await productApi.post(API_ENDPOINTS.PRODUCT.CATEGORIES, categoryData);
    return response.data;
  },

  updateCategory: async (id, categoryData) => {
    const response = await productApi.put(`${API_ENDPOINTS.PRODUCT.CATEGORIES}/${id}`, categoryData);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await productApi.delete(`${API_ENDPOINTS.PRODUCT.CATEGORIES}/${id}`);
    return response.data;
  },

  // Pricing
  calculatePrice: async (productId, quantity, customerId) => {
    const response = await productApi.post(`${API_ENDPOINTS.PRODUCT.PRICING}/calculate`, {
      product_id: productId,
      quantity,
      customer_id: customerId,
    });
    return response.data;
  },

  // Lifecycle
  getProductsByLifecycle: async (state) => {
    const response = await productApi.get(`${API_ENDPOINTS.PRODUCT.LIFECYCLE}/${state}`);
    return response.data;
  },

  getPendingApprovals: async () => {
    const response = await productApi.get(`${API_ENDPOINTS.PRODUCT.LIFECYCLE}/pending-approvals`);
    return response.data;
  },

  approveProduct: async (id) => {
    const response = await productApi.post(`${API_ENDPOINTS.PRODUCT.LIFECYCLE}/${id}/approve`);
    return response.data;
  },

  rejectProduct: async (id, reason) => {
    const response = await productApi.post(`${API_ENDPOINTS.PRODUCT.LIFECYCLE}/${id}/reject`, { reason });
    return response.data;
  },
};
