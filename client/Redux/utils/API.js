import axios from "axios";

export default {
  getStocks: () => {
    return axios.get("/api/stocks")
  },
  addStock: (stockData) => {
    return axios.post("/api/stocks", stockData);
  },
  updateStock: (stock) => {
    return axios.put("/api/stocks/" + stock.id, stock)
  },
  deleteStock: (stockId) => {
    return axios.delete("/api/stocks/" + stockId);
  }

}