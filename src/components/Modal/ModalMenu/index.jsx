import "./style/index.scss";

import React, { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../../context/UserContext";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ModalMenu() {
  const { card_id } = useParams();
  const { logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimation, setIsAnimation] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    isOpen
      ? setTimeout(() => {
          setIsOpen(!isOpen);
        }, 298)
      : setIsOpen(!isOpen);
    setIsAnimation(!isAnimation);
  };

  const [isOpenModal, setIsOpenModal] = useState(false);
  function openModal() {
    setIsOpenModal(true);
  }

  function closeModal() {
    setIsOpenModal(false);
  }

  const handleModalClick = (event) => {
    // Verifica se o clique foi feito no elemento de fundo (background) do modal
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  async function excluirCard() {
    try {
      await axios.delete(
        `https://hhxovklls5llylla66iesyg23m0lbsht.lambda-url.us-east-2.on.aws/?card_id=${card_id}`
      );
      // {
      //   params: {
      //     card_id: card_id,
      //   },
      // }
      toast.error("Card excluido... :(", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status === 400) {
        toast.error("Não foi possível excluir seu card.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        alert(error);
      }
    }
  }

  function sair() {
    logout();
  }

  return (
    <div className="menuu">
      <div className="dropdown">
        <ToastContainer />
        <button
          className={`dropdown-toggle ${isAnimation ? "open" : "close"}`}
          onClick={toggleDropdown}
        >
          <AiOutlineMenu />
        </button>
        {isOpen && <div className="overlay" onClick={toggleDropdown} />}
        {isOpen && (
          <ul className={`dropdown-menu ${isAnimation ? "open" : "close"}`}>
            <li className="dropdown-item">
              <div className="itens-go">
                <a href={`/editar-card/${card_id}`}>
                  Atualizar Dados do Cartão
                </a>
              </div>
            </li>
            <li className="dropdown-item">
              <div className="itens-go">
                <a
                  href={`/card-view/${card_id}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  Visualizar Cartão
                </a>
              </div>
            </li>
            <li className="dropdown-item" onClick={openModal}>
              <div className="itens-go">Excluir Cartão</div>
            </li>
            <li className="dropdown-item" onClick={sair}>
              <div className="itens-go">Sair</div>
            </li>
          </ul>
        )}
        {isOpenModal && (
          <div className="modal" onClick={handleModalClick}>
            <div className="modal-content">
              <span>Deseja realmente excluir seu Geticard?</span>
              <div className="modal-options">
                <div className="option" onClick={closeModal}>
                  Não
                </div>
                <div className="option" onClick={excluirCard}>
                  Sim
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
