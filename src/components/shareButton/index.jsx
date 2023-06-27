import "./style/style.scss";
import React from "react";
import copy from "copy-to-clipboard";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShareButton = () => {
  const shareLink = async () => {
    try {
      const modifiedURL = window.location.href.replace(
        "card-user",
        "card-view"
      );
      //alterando o 'card-user' da url para 'card-view'

      await navigator.share({
        title: "Acesse o meu GetiCard!",
        text: "Olá! Para acessar o meu GetiCard, é só entrar no link abaixo.",
        url: modifiedURL,
      });
      console.log("URL compartilhada com sucesso!");
    } catch (error) {
      alert(
        "A funcionalidade de compartilhamento não é suportada neste navegador."
      );
    }
  };

  const copyUrl = () => {
    try {
      const modifiedURL = window.location.href.replace(
        "card-user",
        "card-view"
      );
      //alterando o 'card-user' da url para 'card-view'

      copy(modifiedURL);
      toast.info(
        `Link do seu Geticard copiado para sua área de transferência.`,
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } catch (error) {
      alert(
        "A funcionalidade de cópia para a área de transferência não é suportada neste navegador."
      );
    }
  };

  return (
    <div className="share">
      <div className="share-position">
        <ToastContainer />
        {navigator.share ? (
          <div className="button-share" onClick={shareLink}>
            <AiOutlineShareAlt />
          </div>
        ) : (
          <div className="button-share" onClick={copyUrl}>
            <BiCopy />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareButton;
