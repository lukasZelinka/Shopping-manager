import React, { useEffect } from "react";
import QrScan from "react-qr-reader";
import { useGlobalContext } from "../context";

function QRscanner() {
  const { qrscan, fetchItems, handleScan, handleError } = useGlobalContext();

  useEffect(() => {
    fetchItems();
  }, [qrscan]);

  return (
    <>
      <QrScan
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ height: 240, width: 320 }}
      />
    </>
  );
}

export default QRscanner;
