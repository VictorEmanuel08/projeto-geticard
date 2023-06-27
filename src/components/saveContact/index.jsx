import "./style.scss";
import React from "react";

function SaveContactButton({ contact }) {
  const handleSaveContact = () => {
    const { name, phoneNumber } = contact;
    const contactURL = `tel:${phoneNumber}?name=${encodeURIComponent(name)}`;

    window.location.href = contactURL;
    console.log(phoneNumber, name)
  };

  return <button onClick={handleSaveContact}>Salvar Contato</button>;
}

export default SaveContactButton;
