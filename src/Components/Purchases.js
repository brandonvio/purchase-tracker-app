import React, { useEffect, useState } from "react";
import { Purchase } from "./Purchase";
import { PurchaseService } from "../Services/PurchaseService";
import { PurchaseSummary } from "./PurchaseSummary";
import { PurchaseForm } from "./PurchaseForm";

export const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [categories, setCategories] = useState([]);
  const [summary, setSummary] = useState({});
  const [purchaseEditable, setPurchaseEditable] = useState({});

  const purchaseService = new PurchaseService();

  const getPurchases = async () => {
    let purchaseData = await purchaseService.getPurchases();
    console.log(purchaseData);
    setPurchases(purchaseData.purchases);
    setSummary(purchaseData.purchaseSummary);

    let categories = await purchaseService.getCategories();
    setCategories(categories);
    console.log(categories);
  };

  const savePurchase = async data => {
    if (data.purchaseId === undefined) {
      // console.log("savePurchase", data);
      await purchaseService.savePurchase(data);
    } else {
      // console.log("updatePurchase", data);
      await purchaseService.updatePurchase(data);
    }
    getPurchases();
  };

  const deletePurchase = async purchaseId => {
    // console.log("deletePurchase", purchaseId);
    await purchaseService.deletePurchase(purchaseId);
    getPurchases();
  };

  const editPurchase = async purchaseId => {
    // console.log("editPurchase", purchaseId);
    const purchase = await purchaseService.getPurchase(purchaseId);
    setPurchaseEditable(purchase);
  };

  useEffect(() => {
    getPurchases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>Purchases</h2>
      <PurchaseForm
        savePurchase={savePurchase}
        purchase={purchaseEditable}
        categories={categories}
      />
      <br />
      {purchases.map(item => (
        <Purchase
          key={item.purchaseId}
          item={item}
          deletePurchase={deletePurchase}
          editPurchase={editPurchase}
        />
      ))}
      <br />
      <PurchaseSummary summary={summary} />
      <br />
    </div>
  );
};
