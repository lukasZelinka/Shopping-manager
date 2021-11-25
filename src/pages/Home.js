import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <main>
        <div className="gradient-container">
          <div className="flex-container-center-home">
            <div>
              <div className="flex-container-col box-shadow-container">
                <h1>Shopping manager</h1>
                <p> Pripravte si, prosím Vás, bloky z obchodu a začnime. </p>
                <div className="icons-home">
                  <img src="./qr-code.png" alt="icon" className="icon-home" />
                  <img src="./qr-code.png" alt="icon" className="icon-home" />
                  <img src="./qr-code.png" alt="icon" className="icon-home" />
                </div>
                <Link to="/groceries">
                  <button className="button-71" role="button">
                    Začnime
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
