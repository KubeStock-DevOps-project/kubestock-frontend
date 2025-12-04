// API Endpoints with consistent service prefixes
// Each service has a common prefix for simplified gateway routing:
// - Product Service: /api/product/*
// - Inventory Service: /api/inventory/*
// - Supplier Service: /api/supplier/*
// - Order Service: /api/order/*
// - Identity Service: /api/identity/*
//
// Gateway strips the /api/{service} prefix before forwarding to backends
// So frontend calls /api/product/health → gateway forwards /health to ms-product

export const API_ENDPOINTS = {
  // Product Catalog Service - /api/product/*
  PRODUCT: {
    BASE: "/api/product",
    CATEGORIES: "/api/product/categories",
    PRICING: "/api/product/pricing",
    LIFECYCLE: "/api/product/lifecycle",
    HEALTH: "/api/product/health",
  },

  // Inventory Service - /api/inventory/*
  INVENTORY: {
    BASE: "/api/inventory",
    ALERTS: "/api/inventory/alerts",
    RESERVE: "/api/inventory/reserve",
    RELEASE: "/api/inventory/release",
    BULK_CHECK: "/api/inventory/bulk-check",
    ANALYTICS: "/api/inventory/analytics",
    HEALTH: "/api/inventory/health",
  },

  // Supplier Service - /api/supplier/*
  SUPPLIER: {
    BASE: "/api/supplier",
    RATINGS: "/api/supplier/ratings",
    PURCHASE_ORDERS: "/api/supplier/purchase-orders",
    HEALTH: "/api/supplier/health",
  },

  // Order Service - /api/order/*
  ORDER: {
    BASE: "/api/order",
    HEALTH: "/api/order/health",
  },

  // Identity Service - /api/identity/*
  IDENTITY: {
    BASE: "/api/identity",
    SUPPLIERS: "/api/identity/suppliers",
    STAFF: "/api/identity/staff",
    USERS: "/api/identity/users",
    GROUPS: "/api/identity/groups",
    HEALTH: "/api/identity/health",
  },

  // Gateway health check
  GATEWAY: {
    HEALTH: "/health",
  },
};

// Environment detection
const isDevelopment = import.meta.env.MODE === 'development';

// API Gateway URL for staging/production environments
const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL || '';

// In development: call each microservice directly
// In staging/production: call through API gateway (services are at /api/*)
export const SERVICES = isDevelopment ? {
  PRODUCT: import.meta.env.VITE_PRODUCT_SERVICE_URL || "http://localhost:3002",
  INVENTORY: import.meta.env.VITE_INVENTORY_SERVICE_URL || "http://localhost:3003",
  SUPPLIER: import.meta.env.VITE_SUPPLIER_SERVICE_URL || "http://localhost:3004",
  ORDER: import.meta.env.VITE_ORDER_SERVICE_URL || "http://localhost:3005",
  IDENTITY: import.meta.env.VITE_IDENTITY_SERVICE_URL || "http://localhost:3006",
} : {
  // In production, all API calls go through the same gateway/proxy
  // The frontend nginx proxies /api/* to the API gateway
  PRODUCT: API_GATEWAY_URL,
  INVENTORY: API_GATEWAY_URL,
  SUPPLIER: API_GATEWAY_URL,
  ORDER: API_GATEWAY_URL,
  IDENTITY: API_GATEWAY_URL,
};
