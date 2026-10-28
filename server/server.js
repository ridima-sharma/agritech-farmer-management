import http from "node:http";
import url from "node:url";

const PORT = process.env.PORT || 5000;

// ==================== SEED IN-MEMORY STORE ====================
let cropsStore = [
  {
    id: 1,
    name: "Wheat (Sharbati)",
    category: "Cereals",
    area: "3.5",
    season: "Rabi",
    plantingDate: "2026-11-10",
    expectedHarvest: "2027-03-25",
    status: "Growing",
    health: "Healthy",
    estimatedYield: "45 Quintals",
    notes: "First weeding completed; scheduled second light irrigation next week.",
  },
  {
    id: 2,
    name: "Soybean (JS 335)",
    category: "Oilseeds",
    area: "4.0",
    season: "Kharif",
    plantingDate: "2026-07-02",
    expectedHarvest: "2026-10-25",
    status: "Ready for Harvest",
    health: "Optimal",
    estimatedYield: "38 Quintals",
    notes: "Pod maturation reached 90%. Harvester booked for weekend.",
  },
  {
    id: 3,
    name: "Basmati Rice (Pusa 1121)",
    category: "Cereals",
    area: "2.5",
    season: "Kharif",
    plantingDate: "2026-06-20",
    expectedHarvest: "2026-11-15",
    status: "Growing",
    health: "Healthy",
    estimatedYield: "32 Quintals",
    notes: "Water level maintained at 3cm; organic bio-fertilizer sprayed.",
  },
  {
    id: 4,
    name: "Cotton (BT Hybrid)",
    category: "Commercial",
    area: "2.0",
    season: "Kharif",
    plantingDate: "2026-05-18",
    expectedHarvest: "2026-12-05",
    status: "Harvesting",
    health: "Needs Attention",
    estimatedYield: "22 Quintals",
    notes: "First picking underway; minor whitefly alert, neem oil spray applied.",
  },
  {
    id: 5,
    name: "Mustard (Pusa Bold)",
    category: "Oilseeds",
    area: "1.5",
    season: "Rabi",
    plantingDate: "2026-10-15",
    expectedHarvest: "2027-02-18",
    status: "Planted",
    health: "Healthy",
    estimatedYield: "18 Quintals",
    notes: "Germination rate 94%; soil moisture adequate after pre-sowing watering.",
  },
];

let ordersStore = [
  {
    id: 1,
    orderNumber: "ORD-2026-001",
    cropName: "Soybean (JS 335)",
    buyerName: "Kisan Samriddhi FPO",
    buyerPhone: "+91 98230 45678",
    quantity: "30 Quintals",
    ratePerUnit: 4800,
    totalAmount: 144000,
    orderDate: "2026-10-18",
    deliveryDate: "2026-10-29",
    status: "Confirmed",
    paymentStatus: "Partial",
    destination: "Indore Krishi Mandi, Yard #4",
  },
  {
    id: 2,
    orderNumber: "ORD-2026-002",
    cropName: "Basmati Rice (Pusa 1121)",
    buyerName: "AgroFresh Grain Millers",
    buyerPhone: "+91 94120 78912",
    quantity: "25 Quintals",
    ratePerUnit: 3600,
    totalAmount: 90000,
    orderDate: "2026-10-21",
    deliveryDate: "2026-11-18",
    status: "Pending",
    paymentStatus: "Pending",
    destination: "Karnal Rice Processing Unit",
  },
  {
    id: 3,
    orderNumber: "ORD-2026-003",
    cropName: "Cotton (BT Hybrid)",
    buyerName: "Vardhman Ginning & Pressing",
    buyerPhone: "+91 98765 11223",
    quantity: "15 Quintals",
    ratePerUnit: 7200,
    totalAmount: 108000,
    orderDate: "2026-10-12",
    deliveryDate: "2026-10-24",
    status: "Dispatched",
    paymentStatus: "Partial",
    destination: "Nagpur Textile Depot",
  },
  {
    id: 4,
    orderNumber: "ORD-2026-004",
    cropName: "Wheat (Sharbati)",
    buyerName: "Patanjali Agro procurement",
    buyerPhone: "+91 99881 22334",
    quantity: "40 Quintals",
    ratePerUnit: 2950,
    totalAmount: 118000,
    orderDate: "2026-09-15",
    deliveryDate: "2026-09-28",
    status: "Delivered",
    paymentStatus: "Paid",
    destination: "Haridwar Food Park",
  },
];

let farmerProfile = {
  name: "Rajesh Kumar Patel",
  role: "Farm Owner & Lead Producer",
  farmName: "Green Valley Agro Farm",
  location: "Plot 14-B, Kisan Nagar, Pune",
  totalAcreage: "12.5 Acres",
  soilType: "Black Cotton / Clayey Loam",
  irrigationSource: "Tube well with Solar Pump & Drip Line",
};

// ==================== HTTP SERVER ====================
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1e6) {
        req.connection.destroy();
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch {
        resolve({});
      }
    });
    req.on("error", (err) => reject(err));
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  res.end(JSON.stringify(payload));
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS Preflight
  if (method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    return res.end();
  }

  try {
    // 1. Health check
    if (pathname === "/api/health" && method === "GET") {
      return sendJson(res, 200, {
        status: "healthy",
        service: "AgriTech API Server",
        timestamp: new Date().toISOString(),
        database: "In-Memory Store (MongoDB Schema Ready)",
        totalCrops: cropsStore.length,
        totalOrders: ordersStore.length,
      });
    }

    // 2. Crops endpoints
    if (pathname === "/api/crops" && method === "GET") {
      return sendJson(res, 200, cropsStore);
    }

    if (pathname === "/api/crops" && method === "POST") {
      const body = await parseBody(req);
      const newCrop = {
        ...body,
        id: body.id || Date.now(),
        createdAt: new Date().toISOString(),
      };
      cropsStore.unshift(newCrop);
      return sendJson(res, 201, newCrop);
    }

    const cropMatch = pathname.match(/^\/api\/crops\/([^/]+)$/);
    if (cropMatch) {
      const cropId = cropMatch[1];
      const index = cropsStore.findIndex((c) => String(c.id) === String(cropId));

      if (method === "GET") {
        if (index === -1) return sendJson(res, 404, { error: "Crop not found" });
        return sendJson(res, 200, cropsStore[index]);
      }

      if (method === "PUT") {
        if (index === -1) return sendJson(res, 404, { error: "Crop not found" });
        const body = await parseBody(req);
        cropsStore[index] = { ...cropsStore[index], ...body, id: cropsStore[index].id };
        return sendJson(res, 200, cropsStore[index]);
      }

      if (method === "DELETE") {
        if (index === -1) return sendJson(res, 404, { error: "Crop not found" });
        const removed = cropsStore.splice(index, 1);
        return sendJson(res, 200, { message: "Crop deleted", crop: removed[0] });
      }
    }

    // 3. Orders endpoints
    if (pathname === "/api/orders" && method === "GET") {
      return sendJson(res, 200, ordersStore);
    }

    if (pathname === "/api/orders" && method === "POST") {
      const body = await parseBody(req);
      const newOrder = {
        ...body,
        id: body.id || Date.now(),
        orderNumber:
          body.orderNumber ||
          `ORD-2026-${String(ordersStore.length + 1).padStart(3, "0")}`,
        createdAt: new Date().toISOString(),
      };
      ordersStore.unshift(newOrder);
      return sendJson(res, 201, newOrder);
    }

    const orderMatch = pathname.match(/^\/api\/orders\/([^/]+)$/);
    if (orderMatch) {
      const orderId = orderMatch[1];
      const index = ordersStore.findIndex((o) => String(o.id) === String(orderId));

      if (method === "GET") {
        if (index === -1) return sendJson(res, 404, { error: "Order not found" });
        return sendJson(res, 200, ordersStore[index]);
      }

      if (method === "PUT") {
        if (index === -1) return sendJson(res, 404, { error: "Order not found" });
        const body = await parseBody(req);
        ordersStore[index] = { ...ordersStore[index], ...body, id: ordersStore[index].id };
        return sendJson(res, 200, ordersStore[index]);
      }

      if (method === "DELETE") {
        if (index === -1) return sendJson(res, 404, { error: "Order not found" });
        const removed = ordersStore.splice(index, 1);
        return sendJson(res, 200, { message: "Order deleted", order: removed[0] });
      }
    }

    // 4. Farmer profile endpoint
    if (pathname === "/api/farmer" && method === "GET") {
      return sendJson(res, 200, farmerProfile);
    }

    if (pathname === "/api/farmer" && method === "PUT") {
      const body = await parseBody(req);
      farmerProfile = { ...farmerProfile, ...body };
      return sendJson(res, 200, farmerProfile);
    }

    // 5. 404 Not Found
    return sendJson(res, 404, { error: "Endpoint not found" });
  } catch (error) {
    console.error("API Server Error:", error);
    return sendJson(res, 500, { error: "Internal Server Error", message: error.message });
  }
});

const HOST = process.env.HOST || "0.0.0.0";

server.listen(PORT, HOST, () => {
  console.log(`\n======================================================`);
  console.log(`🌱 AgriTech REST API Server running on http://localhost:${PORT}`);
  console.log(`   Health Check: http://localhost:${PORT}/api/health`);
  console.log(`   Crops API:    http://localhost:${PORT}/api/crops`);
  console.log(`   Orders API:   http://localhost:${PORT}/api/orders`);
  console.log(`======================================================\n`);
});

export default server;
