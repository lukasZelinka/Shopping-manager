import React from "react";
import { useGlobalContext } from "../context";

const DisplayItems = () => {
  const { qrscan, receiptInfo, saveData, btnText } = useGlobalContext();

  return (
    <>
      <div
        className={`${
          qrscan === "No result" ? "display-none" : "displayItems"
        }`}
      >
        <p className="display-items-title">
          Dňa&nbsp;
          <span className="date_span">
            {receiptInfo.info && receiptInfo.info.date.slice(0, 10)}
          </span>
          &nbsp;v
          <span className="organization_span">
            &nbsp;{receiptInfo.info && receiptInfo.info.organization}&nbsp;.
          </span>{" "}
        </p>
        <p className="display-items-subtitle">Položky:</p>
        {receiptInfo.items &&
          receiptInfo.items.map((item, index) => {
            let { quantity, itemPrice } = item;
            if (quantity < 1) {
              quantity = quantity + " kg";
            }
            itemPrice = parseFloat(itemPrice.toFixed(2));
            return (
              <p key={index} className="item">
                <span> {item.itemName}:</span>
                <span className="quantity_span">{quantity}&nbsp;x&nbsp;</span>
                <span className="itemPrice_span">
                  {itemPrice}€ &nbsp;=&nbsp;{" "}
                </span>
                <span className="totalPrice_span">{item.totalPrice}€</span>
              </p>
            );
          })}
        <div className="flex-container-end total-info">
          <span className="sum">Spolu:</span>
          <span className="receiptTotal">
            {receiptInfo.info && receiptInfo.info.receiptTotal}€
          </span>
        </div>
      </div>
      <div className="flex-container-end">
        <button
          onClick={saveData}
          className={`${
            qrscan === "No result" ? "display-none" : "button-71"
          } button-second`}
        >
          {btnText}
        </button>
      </div>
    </>
  );
};

export default DisplayItems;
