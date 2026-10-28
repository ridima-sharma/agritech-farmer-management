import { INITIAL_CROPS } from "../data/initialCrops";
import { INITIAL_ORDERS } from "../data/initialOrders";

const STORAGE_KEYS = {
  CROPS: "agritech_crops_v1",
  ORDERS: "agritech_orders_v1",
  FARMER: "agritech_farmer_v1",
  LOCATION: "agritech_weather_location_v1",
};

const DEFAULT_FARMER = {
  name: "Rajesh Kumar Patel",
  role: "Farm Owner & Lead Producer",
  farmName: "Green Valley Agro Farm",
  location: "Plot 14-B, Kisan Nagar, Pune",
  totalAcreage: "12.5 Acres",
  soilType: "Black Cotton / Clayey Loam",
  irrigationSource: "Tube well with Solar Pump & Drip Line",
};

export const storage = {
  getCrops() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CROPS);
      if (!data) {
        this.saveCrops(INITIAL_CROPS);
        return INITIAL_CROPS;
      }
      return JSON.parse(data);
    } catch (err) {
      console.warn("Error reading crops from localStorage, using initial crops:", err);
      return INITIAL_CROPS;
    }
  },

  saveCrops(crops) {
    try {
      localStorage.setItem(STORAGE_KEYS.CROPS, JSON.stringify(crops));
    } catch (err) {
      console.error("Error saving crops to localStorage:", err);
    }
  },

  getOrders() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (!data) {
        this.saveOrders(INITIAL_ORDERS);
        return INITIAL_ORDERS;
      }
      return JSON.parse(data);
    } catch (err) {
      console.warn("Error reading orders from localStorage, using initial orders:", err);
      return INITIAL_ORDERS;
    }
  },

  saveOrders(orders) {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (err) {
      console.error("Error saving orders to localStorage:", err);
    }
  },

  getFarmerProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FARMER);
      if (!data) {
        this.saveFarmerProfile(DEFAULT_FARMER);
        return DEFAULT_FARMER;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_FARMER;
    }
  },

  saveFarmerProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEYS.FARMER, JSON.stringify(profile));
    } catch (err) {
      console.error("Error saving farmer profile to localStorage:", err);
    }
  },

  getSavedLocation() {
    try {
      return localStorage.getItem(STORAGE_KEYS.LOCATION) || "pune";
    } catch {
      return "pune";
    }
  },

  saveLocation(locKey) {
    try {
      localStorage.setItem(STORAGE_KEYS.LOCATION, locKey);
    } catch (err) {
      console.error("Error saving location:", err);
    }
  },

  resetAllData() {
    try {
      localStorage.setItem(STORAGE_KEYS.CROPS, JSON.stringify(INITIAL_CROPS));
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
      localStorage.setItem(STORAGE_KEYS.FARMER, JSON.stringify(DEFAULT_FARMER));
      localStorage.setItem(STORAGE_KEYS.LOCATION, "pune");
      return {
        crops: INITIAL_CROPS,
        orders: INITIAL_ORDERS,
        farmer: DEFAULT_FARMER,
        location: "pune",
      };
    } catch (err) {
      console.error("Error resetting data:", err);
      return null;
    }
  },
};
