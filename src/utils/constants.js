/**
 * API Configuration
 * 
 * Architecture:
 * - Development: Direct calls to microservices (http://localhost:300x/path)
 * - Production: Calls through gateway with prefix (/api/service/path)
 * 
 * Usage:
 *   import { API } from '../utils/constants';
 *   axios.get(API.product.health());
 *   axios.get(API.product.byId(123));
 *   axios.get(API.inventory.alerts());
 */

const isDevelopment = import.meta.env.MODE === 'development';

// Service base URLs for development (direct to microservices)
const DEV_SERVICES = {
  product: import.meta.env.VITE_PRODUCT_SERVICE_URL || 'http://localhost:3002',
  inventory: import.meta.env.VITE_INVENTORY_SERVICE_URL || 'http://localhost:3003',
  supplier: import.meta.env.VITE_SUPPLIER_SERVICE_URL || 'http://localhost:3004',
  order: import.meta.env.VITE_ORDER_SERVICE_URL || 'http://localhost:3005',
  identity: import.meta.env.VITE_IDENTITY_SERVICE_URL || 'http://localhost:3006',
};

// Gateway prefixes for production
const GATEWAY_PREFIXES = {
  product: '/api/product',
  inventory: '/api/inventory',
  supplier: '/api/supplier',
  order: '/api/order',
  identity: '/api/identity',
};

/**
 * Build URL based on environment
 * @param {string} service - Service name (product, inventory, etc.)
 * @param {string} path - Path without leading slash
 * @returns {string} Complete URL
 */
const buildUrl = (service, path = '') => {
  if (isDevelopment) {
    return `${DEV_SERVICES[service]}${path ? `/${path}` : ''}`;
  }
  return `${GATEWAY_PREFIXES[service]}${path ? `/${path}` : ''}`;
};

/**
 * API endpoints for all microservices
 * Each method returns the complete URL ready for axios
 */
export const API = {
  // ============================================
  // Product Catalog Service
  // ============================================
  product: {
    health: () => buildUrl('product', 'health'),
    metrics: () => buildUrl('product', 'metrics'),
    // Products
    base: () => buildUrl('product'),
    byId: (id) => buildUrl('product', id),
    bySku: (sku) => buildUrl('product', `sku/${sku}`),
    batch: () => buildUrl('product', 'batch'),
    search: () => buildUrl('product', 'search'),
    // Categories
    categories: () => buildUrl('product', 'categories'),
    categoryById: (id) => buildUrl('product', `categories/${id}`),
    // Pricing
    pricing: () => buildUrl('product', 'pricing'),
    calculatePrice: () => buildUrl('product', 'pricing/calculate'),
    calculateBundle: () => buildUrl('product', 'pricing/calculate-bundle'),
    // Lifecycle
    lifecycle: (state) => buildUrl('product', `lifecycle${state ? `/${state}` : ''}`),
    lifecycleStats: () => buildUrl('product', 'lifecycle-stats'),
    pendingApprovals: () => buildUrl('product', 'pending-approvals'),
    approve: (id) => buildUrl('product', `lifecycle/${id}/approve`),
    reject: (id) => buildUrl('product', `lifecycle/${id}/reject`),
    transition: (id, action) => buildUrl('product', `${id}/${action}`),
    lifecycleHistory: (id) => buildUrl('product', `${id}/lifecycle-history`),
    // Ratings
    myRatings: () => buildUrl('product', 'my-ratings'),
    rateProduct: (id) => buildUrl('product', `${id}/rate`),
  },

  // ============================================
  // Inventory Service
  // ============================================
  inventory: {
    health: () => buildUrl('inventory', 'health'),
    metrics: () => buildUrl('inventory', 'metrics'),
    // Inventory
    base: () => buildUrl('inventory'),
    byId: (id) => buildUrl('inventory', id),
    byProductId: (productId) => buildUrl('inventory', `product/${productId}`),
    bySku: (sku) => buildUrl('inventory', `sku/${sku}`),
    adjust: () => buildUrl('inventory', 'adjust'),
    movements: () => buildUrl('inventory', 'movements'),
    // Reservations
    reserve: () => buildUrl('inventory', 'reserve'),
    release: () => buildUrl('inventory', 'release'),
    // Alerts
    alerts: () => buildUrl('inventory', 'alerts'),
    alertById: (id) => buildUrl('inventory', `alerts/${id}`),
    alertStats: () => buildUrl('inventory', 'alerts/stats'),
    acknowledgeAlert: (id) => buildUrl('inventory', `alerts/${id}/acknowledge`),
    checkAlerts: () => buildUrl('inventory', 'alerts/check'),
    resolveAlert: (id) => buildUrl('inventory', `alerts/${id}/resolve`),
    reorderSuggestions: () => buildUrl('inventory', 'alerts/reorder-suggestions'),
    // Bulk & Analytics
    bulkCheck: () => buildUrl('inventory', 'bulk-check'),
    analytics: () => buildUrl('inventory', 'analytics'),
  },

  // ============================================
  // Supplier Service
  // ============================================
  supplier: {
    health: () => buildUrl('supplier', 'health'),
    metrics: () => buildUrl('supplier', 'metrics'),
    // Suppliers
    base: () => buildUrl('supplier'),
    byId: (id) => buildUrl('supplier', id),
    myProfile: () => buildUrl('supplier', 'profile/me'),
    // Purchase Orders
    purchaseOrders: () => buildUrl('supplier', 'purchase-orders'),
    purchaseOrderById: (id) => buildUrl('supplier', `purchase-orders/${id}`),
    purchaseOrderStatus: (id) => buildUrl('supplier', `purchase-orders/${id}/status`),
    purchaseOrderReceive: (id) => buildUrl('supplier', `purchase-orders/${id}/receive`),
    purchaseOrderRespond: (id) => buildUrl('supplier', `purchase-orders/${id}/respond`),
    purchaseOrderShip: (id) => buildUrl('supplier', `purchase-orders/${id}/ship`),
    supplierPending: (supplierId) => buildUrl('supplier', `purchase-orders/supplier/${supplierId}/pending`),
    supplierResponse: (id) => buildUrl('supplier', `purchase-orders/${id}/supplier-response`),
    // Ratings
    ratings: (supplierId) => buildUrl('supplier', `ratings/${supplierId}`),
  },

  // ============================================
  // Order Management Service
  // ============================================
  order: {
    health: () => buildUrl('order', 'health'),
    metrics: () => buildUrl('order', 'metrics'),
    // Orders
    base: () => buildUrl('order'),
    byId: (id) => buildUrl('order', id),
    status: (id) => buildUrl('order', `${id}/status`),
    cancel: (id) => buildUrl('order', `${id}/cancel`),
    items: (id) => buildUrl('order', `${id}/items`),
    stats: () => buildUrl('order', 'stats'),
  },

  // ============================================
  // Identity Service
  // ============================================
  identity: {
    health: () => buildUrl('identity', 'health'),
    metrics: () => buildUrl('identity', 'metrics'),
    // Users
    suppliers: () => buildUrl('identity', 'suppliers'),
    staff: () => buildUrl('identity', 'staff'),
    users: () => buildUrl('identity', 'users'),
    userById: (id) => buildUrl('identity', `users/${id}`),
    groups: () => buildUrl('identity', 'groups'),
  },

  // ============================================
  // Gateway (only meaningful in production)
  // ============================================
  gateway: {
    health: () => isDevelopment ? null : '/health',
  },
};
