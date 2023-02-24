import React, { useState } from "react";
import Button from "./components/UI/Button/Button";
import "./compUpdate.css";

function CompUpdate() {
  const [showParagraph, setShowParagraph] = useState(false);

  const toggleParaHandler = () => {
    setShowParagraph((previousState) => !previousState);
  };

  console.log("compUpdate function/component executed...");

  return (
    <div className="cmpUdt">
      <h1>Hi There!!</h1>
      {showParagraph && (
        <p>
          <span>This</span> is new!!!!
        </p>
      )}
      <Button onClick={toggleParaHandler}>Toggle the Paragraph !</Button>
    </div>
  );
}

export default CompUpdate;
