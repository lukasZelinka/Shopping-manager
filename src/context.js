import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const url = "https://ekasa.financnasprava.sk/mdu/api/v1/opd/receipt/find";
  const [qrscan, setQrscan] = useState("No result");
  const [receiptInfo, setReceiptInfo] = useState({});
  const oneString = JSON.stringify(receiptInfo);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const [btnText, setBtnText] = useState("Uložiť");
  // QRscanner
  const handleScan = (data) => {
    if (data) {
      setQrscan(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  // get data
  const fetchItems = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ receiptId: qrscan }),
      });
      const obj = await response.json();
      // console.log(obj);
      if (obj.receipt === null) {
        console.log("Nieje nascanovaná žiadna položka.");
      } else if (obj.returnValue === -1) {
        console.log("Finančná správa zablokovala prístup.");
      } else {
        let groceriesNames = obj.receipt.items;
        if (groceriesNames) {
          console.log("Položka nascanovaná");
          const newItems = groceriesNames.map((item, index) => {
            const { name, quantity, price } = item;
            const itemPrice = price / quantity;
            return {
              itemID: index,
              itemName: name,
              quantity,
              itemPrice,
              totalPrice: price,
            };
          });
          setReceiptInfo({
            ...receiptInfo,
            items: newItems,
            info: otherInfo(),
          });
        } else {
          setReceiptInfo({});
        }
        function otherInfo() {
          let receiptID = obj.receipt.receiptId;
          let date = obj.receipt.createDate;
          let receiptTotal = obj.receipt.totalPrice;
          receiptTotal = receiptTotal.toFixed(
            Math.max(((receiptTotal + "").split(".")[1] || "").length, 2)
          );
          let organization = obj.receipt.organization.name;
          return { receiptID, date, receiptTotal, organization };
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // save data
  const saveData = () => {
    setBtnText("Moment...");
    fetch("https://api.apispreadsheets.com/data/20164/", {
      method: "POST",
      body: JSON.stringify({ data: { groceries: oneString } }),
    }).then((res) => {
      if (res.status === 201) {
        setQrscan("No result");
        showAlert(true, "success", "Dáta uložené.");
        setBtnText("Uložiť");
      } else {
        showAlert(true, "danger", "Dáta neuložené.");
        setBtnText("Uložiť");
      }
    });
  };
  // alert
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  return (
    <AppContext.Provider
      value={{
        qrscan,
        setQrscan,
        fetchItems,
        handleScan,
        handleError,
        alert,
        receiptInfo,
        setAlert,
        showAlert,
        saveData,
        btnText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
