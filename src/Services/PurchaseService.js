import axios from "axios";

export class PurchaseService {
  purchaseApi = "http://localhost:5000/api/Purchase";
  categoryApi = "http://localhost:5000/api/Category";

  async getPurchases() {
    let result = await axios.get(`${this.purchaseApi}`);
    return result.data;
  }

  async getPurchase(purchaseId) {
    let result = await axios.get(`${this.purchaseApi}/${purchaseId}`);
    result.data.purchaseDate = new Date(result.data.purchaseDate).toLocaleDateString();
    return result.data;
  }

  async savePurchase(data) {
    let result = await axios.post(`${this.purchaseApi}`, data);
    return result.data;
  }

  async updatePurchase(data) {
    let result = await axios.put(`${this.purchaseApi}/${data.purchaseId}`, data);
    return result.data;
  }

  async deletePurchase(purchaseId) {
    console.log("delete purchase", purchaseId);
    let result = await axios.delete(`${this.purchaseApi}/${purchaseId}`);
    return result.data;
  }

  async getCategories() {
    let result = await axios.get(`${this.categoryApi}`);
    return result.data;
  }
}
