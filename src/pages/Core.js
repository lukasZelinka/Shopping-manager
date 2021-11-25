import React from "react";
import QRscanner from "../components/QRscanner";
import DisplayItems from "../components/DisplayItems";
import Alert from "../components/Alert";
import { useGlobalContext } from "../context";

function Core() {
  const { qrscan, alert, showAlert } = useGlobalContext();

  return (
    <section className="gradient-container">
      <div className="container">
        <div className="flex-container-center-core">
          <div className=" box-shadow-container-second">
            <h2 className="core-title">
              {qrscan === "No result"
                ? "Naskenujte, prosím Vás, QR kód z bloku a zobrazia sa Vám položky nákupu."
                : "Uložte si, prosím Vás, informácie  a možete si naskenovať ďalší blok z potravín."}
            </h2>
            {alert.show && <Alert {...alert} removeAlert={showAlert} />}
            {alert.show || <p className="hidden-par">hidden-par</p>}
            <div className="flex-container-core">
              <QRscanner />
              <div className="grocery-items-list">
                <DisplayItems />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Core;
