# 🌱 AgriTech - Smart Farmer Management System

An intelligent, full-stack agricultural management web application designed to empower farmers and farm managers with digital crop tracking, agro-meteorological advisories, educational resources, and harvest sales management.

Built for academic submission as a demonstrable MERN-stack AgriTech prototype.

---

## 📌 1. Project Title & Overview

* **Project Name**: AgriTech Farmer Management System
* **Domain**: Agricultural Technology (AgriTech) / Smart Agriculture / Farm ERP
* **Target Audience**: Small-to-medium scale farmers, agricultural cooperatives (FPOs), farm supervisors, and agronomy researchers.
* **Architecture**: React 19 Frontend + Vite Build Engine + Node.js/Express REST Backend + Mongoose/MongoDB Data Modeling with intelligent browser LocalStorage persistence fallback.

---

## 🎯 2. Problem Statement & Objectives

### Problem Statement
In traditional farming environments, crop lifecycle records, weather observations, fertilizer schedules, and produce sales are maintained manually in paper registers or disconnected messaging threads. This results in:
1. Lack of historical visibility on crop yield, acreage, and input schedules.
2. Inability to prepare for weather adversities (unseasonal rainfall, high humidity fungal risks, high winds during pesticide spraying).
3. Fragmented access to agricultural schemes (PM-KISAN, PMFBY) and scientific pest management guidance.
4. Distress selling of harvested crops due to unorganized tracking of buyers, mandis, and pending sales orders.

### Objectives
* **Digitize Crop Records**: Provide full CRUD (Create, Read, Update, Delete) capability for recording crop varieties, acreage, sowing schedules, growth stages, and field health.
* **Decision-Support Agro-Weather**: Present micro-climate farm telemetry (soil moisture, humidity, wind velocity, precipitation probability) paired with actionable agronomic advisories (spraying windows, irrigation pauses).
* **Farming Knowledge Hub**: Curate comprehensive agricultural practices covering balanced NPK nutrition, drip fertigation, Integrated Pest Management (IPM), and central government subsidies.
* **Harvest Sales Tracking**: Enable farmers to record and manage wholesale contracts, APMC Mandi bookings, buyer contacts, and fulfillment statuses.
* **Resilient Offline Architecture**: Guarantee uninterrupted operation during presentations or unstable network connectivity through intelligent hybrid storage (API sync with automatic LocalStorage fallback).

---

## ✨ 3. Features & Modules

### 1. ▦ Farm Dashboard
* **KPI Metrics**: Real-time summary cards for Total Crops, Cultivated Area (Acres), Actively Growing Crops, Harvest Ready Crops, and Total Produce Sales Value (₹).
* **Agro-Weather Alert Snapshot**: Quick preview of today's ambient temperature, condition, root-zone soil moisture, and priority field operation recommendation.
* **Quick Actions**: One-click shortcuts to register a new crop, check weather advisories, create an order, or browse farming guides.
* **Recent Activity Tables**: At-a-glance previews of active cultivations and recent produce sales orders.

### 2. 🌾 My Crops (Full CRUD & Search)
* **Register New Crops**: Modal form with comprehensive validation (Crop Name, Category, Cultivated Acreage, Season, Sowing Date, Expected Harvest Date, Status, Health Index, Estimated Yield, and Field Notes).
* **Crop Search & Filtering**: Multi-parameter search by crop name or category, combined with dynamic status filters (*Planted*, *Growing*, *Ready for Harvest*, *Harvesting*, *Completed*) and season filters (*Kharif*, *Rabi*, *Zaid*).
* **Interactive Operations**:
  * 👁️ **View Details**: Modal displaying complete crop profile, yield expectations, and field management notes.
  * ✏️ **Edit Record**: Pre-filled update modal for adjusting acreage, status, or health.
  * 🗑️ **Delete Record**: Safe confirmation dialog to prevent accidental data loss.
* **Persistence**: Automatically synced with the backend API or persistent browser LocalStorage.

### 3. ☀️ Agro-Meteorological Weather Station
* **Honest Demo Mode Architecture**: Transparently indicates simulated demo data for presentation purposes while providing full support for live OpenWeatherMap or IMD Agromet API integration.
* **Interactive District Stations**: Switch between distinct agricultural regions (Pune - Western Ghats, Karnal - Trans-Gangetic, Indore - Malwa Plateau, Ludhiana - Punjab Plains, Coimbatore - Southern Semi-Arid).
* **Detailed Micro-Climate Indicators**:
  * Relative Humidity & Fungal Disease Risk.
  * Wind Velocity & Direction (spraying safety window).
  * Precipitation Probability (24-hour forecast).
  * Root Zone Soil Moisture (0-30 cm depth).
  * Midday UV Radiation Index.
  * Reference Evapotranspiration ($ET_0$ in mm/day).
* **5-Day Farming Forecast**: High/low temperature trends and rainfall chances.
* **Actionable Advisories**: Specific recommendations for spraying windows, irrigation postponement, and disease vigilance.
* **Live Telemetry Refresh**: Interactive button to simulate fresh atmospheric readings.

### 4. 🧰 Agricultural Resources & Advisory Library
* **Curated Guides**: Detailed articles on NPK balanced fertilization, micro-irrigation subsidies, organic pest control sprays (Neem oil, NSKE), PM-KISAN, PMFBY crop insurance, post-harvest drying, and Zero Budget Natural Farming (ZBNF).
* **Topic Filters & Search**: Filter by *Soil & Fertilizers*, *Modern Irrigation*, *Crop Protection*, *Government Schemes*, *Post-Harvest*, or *Sustainable Farming*.
* **Interactive Guide Modal**: Expand any topic for step-by-step practical implementation guidelines and official government portal links.
* **Emergency Kisan Helplines**: Toll-free contact information for Kisan Call Center (1800-180-1551), Crop Insurance Helpdesk (14447), and ICAR KVK agronomists.

### 5. 📦 Harvest Sales & Orders Management
* **Order Overview KPIs**: Total Sales Revenue (₹), Fulfilled Deliveries, and In-Transit Bookings.
* **Order Lifecycle Tracking**: Statuses include *Pending Confirmation*, *Confirmed*, *Dispatched / In-Transit*, *Delivered*, and *Cancelled*.
* **Payment Tracking**: Real-time tracking of *Pending*, *Partial (50%)*, and *Paid* statuses.
* **Order Creation Modal**: Automatically pulls registered farm crops into a dropdown, computes total price from quantity and rate per unit, and records buyer phone numbers and delivery mandis.
* **Quick Status Transition**: Inline status dropdown allows instantaneous updates to order fulfillment states.
* **Search & Filter**: Search orders by order ID, buyer name, or crop.

### 6. 🔔 System Feedback & Accessibility
* **Toast Notification System**: Instant feedback for all create, update, delete, and reset operations.
* **Responsive Design**: Custom responsive sidebar drawer with backdrop and hamburger menu toggle for mobile and tablet screens.
* **Reset Demo Data**: Easily restore original sample records at any point during live academic demonstrations.

---

## 🛠️ 4. Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React 19 (`react`, `react-dom`) |
| **Build Tooling & Server** | Vite 8 + ES Modules + HMR |
| **Styling & Design System** | Pure CSS3 (Responsive Grid, Flexbox, Custom Green Agricultural Theme) |
| **State & Persistence** | React Hooks (`useState`, `useEffect`, `useMemo`) + Browser `localStorage` |
| **Backend Runtime** | Node.js (v20+ / v24) |
| **Backend Framework** | Node.js HTTP / Express REST API architecture |
| **Database Modeling** | Mongoose / MongoDB schemas (`Crop`, `Order`, `Farmer`) |
| **Linting & Code Quality** | Oxlint (`oxlint`) |

---

## 📁 5. Project Folder Structure

```text
agritech-farmer-management/
├── public/
│   ├── favicon.svg             # Agricultural seedling tab icon
│   └── icons.svg
├── server/
│   ├── models/
│   │   ├── Crop.js             # Mongoose Crop schema & model
│   │   ├── Order.js            # Mongoose Order schema & model
│   │   └── Farmer.js           # Mongoose Farmer profile schema
│   ├── .env.example            # Safe backend environment template
│   ├── package.json            # Server package definition
│   └── server.js               # Node.js REST API server with in-memory fallback
├── src/
│   ├── assets/                 # Brand assets and graphics
│   ├── components/
│   │   ├── CropModal.jsx       # Add/Edit/View/Delete crop modal dialogs
│   │   ├── CropsTab.jsx        # My Crops management view
│   │   ├── DashboardTab.jsx    # Primary farm overview view
│   │   ├── OrderModal.jsx      # Create/Edit order modal dialogs
│   │   ├── OrdersTab.jsx       # Harvest sales & Mandi orders view
│   │   ├── ResourcesTab.jsx    # Farming guides & helpline view
│   │   ├── Sidebar.jsx         # Green navigation drawer
│   │   ├── Toast.jsx           # Floating notification toast
│   │   ├── Topbar.jsx          # Header with backend status & mobile toggle
│   │   └── WeatherTab.jsx      # Agro-meteorological weather view
│   ├── data/
│   │   ├── initialCrops.js     # Seed crop records
│   │   ├── initialOrders.js    # Seed harvest sales records
│   │   ├── resourcesData.js    # Agricultural knowledge articles & helplines
│   │   └── weatherData.js      # Multi-district weather & advisory dataset
│   ├── services/
│   │   ├── api.js              # Hybrid REST API client with offline fallback
│   │   └── storage.js          # LocalStorage persistence manager
│   ├── App.css                 # Comprehensive green agricultural stylesheets
│   ├── App.jsx                 # Root application component & state orchestrator
│   ├── index.css               # Clean foundational CSS reset
│   └── main.jsx                # React DOM entry point
├── .gitignore                  # Git exclusion rules
├── index.html                  # HTML entry point with metadata
├── package.json                # Project dependencies and run scripts
├── README.md                   # Complete academic documentation
└── vite.config.js              # Vite bundler & API proxy configuration
```

---

## 🚀 6. Installation & Run Instructions

### Prerequisites
* **Node.js**: Version 18.0.0 or higher (Tested on Node v24)
* **npm**: Version 9.0.0 or higher
* Modern web browser (Chrome, Edge, Firefox, Brave)

### Step 1: Clone or Navigate to the Project Folder
Open PowerShell, Command Prompt, or Terminal:
```bash
cd c:\Users\ridim\OneDrive\Documents\GitHub\agritech-farmer-management
```

### Step 2: Install Dependencies
Frontend packages are already installed. If running on a fresh clone:
```bash
npm install
```

### Step 3: Run the Application (Frontend Only - Recommended for Instant Demo)
To start the Vite development server:
```bash
npm run dev
```
Open your browser at:
👉 **`http://localhost:5173`**

The application will run immediately in **Local Storage Demo Mode**, with all features (adding, editing, searching, deleting crops and orders, weather advisories, resources) fully functioning and persisting across page refreshes!

---

### Step 4: Run the Full MERN Stack Backend (Optional)
To run the Node.js REST API server alongside the frontend:

1. **Start the API Server** (in a new terminal window):
   ```bash
   npm run server
   ```
   * The server starts on `http://localhost:5000`.
   * Displays endpoints for `/api/health`, `/api/crops`, `/api/orders`, and `/api/farmer`.

2. **Start the Frontend** (in the first terminal window):
   ```bash
   npm run dev
   ```
   * Vite proxies `/api` calls directly to `http://localhost:5000`.
   * The status pill in the top bar will display: **🟢 MERN Backend Live**.

---

## ⚙️ 7. Environment Variables Setup

A safe environment template is provided in `server/.env.example`:

```env
# Server Port
PORT=5000
NODE_ENV=development

# MongoDB Connection String (Optional for persistent database storage)
MONGODB_URI=mongodb://127.0.0.1:27017/agritech_db

# Frontend Client URL
CLIENT_ORIGIN=http://localhost:5173
```

To configure MongoDB:
1. Copy `server/.env.example` to `server/.env`.
2. Enter your local MongoDB URI (`mongodb://127.0.0.1:27017/agritech_db`) or MongoDB Atlas connection string.
3. If no MongoDB server is detected, the server automatically defaults to its in-memory data store without crashing.

---

## 📡 8. REST API Documentation

| HTTP Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check, service status, and record count |
| `GET` | `/api/crops` | Retrieve all registered crops |
| `POST` | `/api/crops` | Register a new crop record |
| `GET` | `/api/crops/:id` | Retrieve single crop details by ID |
| `PUT` | `/api/crops/:id` | Update an existing crop record |
| `DELETE` | `/api/crops/:id` | Remove a crop record |
| `GET` | `/api/orders` | Retrieve all harvest sales orders |
| `POST` | `/api/orders` | Create a new produce sales order |
| `PUT` | `/api/orders/:id` | Update an order or fulfillment status |
| `DELETE` | `/api/orders/:id` | Remove an order record |
| `GET` | `/api/farmer` | Get farmer profile and landholding details |
| `PUT` | `/api/farmer` | Update farmer profile details |

---

## 🔮 9. Limitations & Future Scope

### Current Prototype Limitations
1. **Weather Data Simulation**: Weather telemetry currently uses a structured agro-meteorological simulation model across 5 representative Indian agricultural zones rather than a live paid OpenWeatherMap/IMD API key.
2. **Authentication**: Operates as a single-farmer management dashboard without multi-user password login.
3. **Payment Processing**: Tracks order payment statuses (*Paid*, *Partial*, *Pending*) as an ERP ledger without integrating live Razorpay/UPI payment gateways.

### Future Scope & Enhancements
* **Satellite & IoT Telemetry**: Direct integration with LoRaWAN soil moisture probes and Sentinel-2 NDVI satellite vegetative imagery.
* **AI Plant Disease Diagnosis**: Upload crop leaf photographs for real-time computer vision identification of blast fungus, blight, or aphid infestation using TensorFlow.js / Gemini API.
* **Multilingual Voice Assistance**: Speech-to-text in vernacular languages (Hindi, Marathi, Punjabi, Telugu, Tamil) to make the interface accessible to non-literate farmers.
* **Mandi Price Prediction**: Time-series machine learning models predicting APMC Mandi price fluctuations for the next 15 days to advise farmers on the most profitable selling window.

---

## 📸 10. Instructions for Taking & Adding Screenshots for Submission

To prepare your project report or PowerPoint presentation:

1. **Start the application**: Run `npm run dev` and open `http://localhost:5173`.
2. **Capture Key Screens** (using Windows `Win + Shift + S` or Snipping Tool):
   * `01_dashboard.png`: Full dashboard showing KPI stats cards, weather snapshot, and recent crops table.
   * `02_my_crops_list.png`: My Crops tab showing the list of crops, category badges, and search/filter bar.
   * `03_add_crop_modal.png`: Click **+ Add New Crop** to capture the input form modal with field validation.
   * `04_weather_advisory.png`: Weather tab showing current temperature, soil moisture metrics, 5-day forecast, and advisory bulletins.
   * `05_resources_library.png`: Resources tab showing farming guide cards, topic filters, and Kisan helpline numbers.
   * `06_orders_management.png`: Orders tab showing sales statistics, order records, status badges, and the create order modal.
   * `07_mobile_responsive.png`: Press `F12` in Chrome, toggle device toolbar (iPhone/Pixel mode), and capture the mobile layout with the green drawer menu.
3. **Save Screenshots**: Place the images in an `assets/screenshots/` folder inside your repository or paste directly into your project report document.

---

## 👨‍💻 Academic Project Submission Details

* **Project**: AgriTech Farmer Management System
* **Submission Type**: Final Semester Capstone / Minor Project
* **Theme**: Sustainable Agricultural Technology & Rural Empowerment
* **Repository**: `agritech-farmer-management`
