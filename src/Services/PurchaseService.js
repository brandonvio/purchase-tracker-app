import axios from "axios";

export class PurchaseService {
  async getPurchases() {
    let result = await axios.get("http://localhost:5000/api/Purchase");
    return result.data;
  }

  async getPurchase(purchaseId) {
    let result = await axios.get(`http://localhost:5000/api/Purchase/${purchaseId}`);
    result.data.purchaseDate = new Date(result.data.purchaseDate).toLocaleDateString();
    return result.data;
  }

  async savePurchase(data) {
    console.log("save purchase", data);
    let result = await axios.post("http://localhost:5000/api/Purchase", data);
    return result.data;
  }

  async updatePurchase(data) {
    console.log("update purchase", data);
    let result = await axios.put(`http://localhost:5000/api/Purchase/${data.purchaseId}`, data);
    return result.data;
  }

  async deletePurchase(purchaseId) {
    console.log("delete purchase", purchaseId);
    let result = await axios.delete(`http://localhost:5000/api/Purchase/${purchaseId}`);
    return result.data;
  }

  async getCategories() {
    let result = await axios.get("http://localhost:5000/api/Category");
    return result.data;
  }
}
