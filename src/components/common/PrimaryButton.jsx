import React from "react";
import { Link } from "react-router-dom";
import "../../styles/common.css";

// Boton principal color verde que sirve para acciones claves
// to -> recibe un String que es en caso que se quiera hacer que rediriga
// onClick -> recibe una Function cuando se haga click
// text -> el Texto que tendra el boton
// width -> en caso que se le quiera dar uno en particular de otra forma sera 100%
// height -> altura que se le queira dar, de otra forma sera automatico siempre

const PrimaryButton = ({
  to,
  onClick,
  text,
  width = "100%",
  height = "auto",
}) => {
  const dynamicStyles = {
    width: width,
    height: height,
  };

  if (to) {
    return (
      <Link to={to} onClick={onClick} style={dynamicStyles} className="primaryButton">
        {text}
      </Link>
    );
  }
  return (
    <button onClick={onClick} type="button" style={dynamicStyles} className="primaryButton">
      {text}
    </button>
  );
};

export default PrimaryButton;
