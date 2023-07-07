import "../../styles/Card/card.scss";

//{Bibliotecas}
import React, { useState, useEffect } from "react";
import axios from "axios";
import copy from "copy-to-clipboard";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//{Assets}
import logoGeti from "../../assets/createdByGeticompany.png";
import circleBlue from "../../assets/circleBlue.png";
import circleGreen from "../../assets/circleGreen.png";
import logoLattes from "../../assets/lattes.png";

//{Icons}
import {
  AiOutlineMail,
  AiOutlineWhatsApp,
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineGithub,
  AiOutlineLinkedin,
} from "react-icons/ai";
import { MdPix } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";

//{Components}
import { ModalMenu } from "../../components/Modal/ModalMenu";
import ShareButton from "../../components/shareButton";
// import SaveContactButton from "../../components/saveContact";

export function CardUser() {
  const location = useLocation();
  const { dadosUsuario } = location.state;

  const { card_id } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState({
    fotoUser: "",
    nomeUser: "",
    formacaoUser: "",
    cargoAtualUser: "",
    bioUser: "",
    emailUser: "",
    whatsAppUser: "",
    instagramUser: "",
    linkedInUser: "",
    facebookUser: "",
    lattesUser: "",
    githubUser: "",
    siteUser: "",
    pixUser: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://fa4uvgt6dzfkaf4khpwslybcgy0niuvd.lambda-url.us-east-2.on.aws",
          {
            params: {
              card_id: card_id,
            },
          }
        );
        setUser({
          fotoUser: response.data.foto_perfil,
          nomeUser: response.data.nome,
          formacaoUser: response.data.formacao,
          cargoAtualUser: response.data.cargo_atual,
          emailUser: response.data.email,
          bioUser: response.data.biografia,
          whatsAppUser: response.data.whatsapp,
          instagramUser: response.data.instagram,
          linkedInUser: response.data.linkedin,
          facebookUser: response.data.facebook,
          lattesUser: response.data.lattes,
          githubUser: response.data.github,
          siteUser: response.data.site,
          pixUser: response.data.chave_pix,
        });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.success(
            "Bem-vindo de volta ao GetiCard! Refaça seu cadastro.",
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
          navigate(`/recadastrar-card/${card_id}`, {
            state: { dadosUsuario },
          });
        }
      }
    };

    fetchData();
  }, [card_id, navigate, dadosUsuario]);

  const abrirTelaDiscagem = () => {
    window.open(`tel:${user.whatsAppUser}`, "_blank");
  };

  const copyPix = () => {
    try {
      const chavePix = user.pixUser;

      copy(chavePix);
      toast.info(`Chave pix copiada para sua área de transferência.`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      alert(
        "A funcionalidade de cópia para a área de transferência não é suportada neste navegador."
      );
    }
  };
  const handleEmailClick = () => {
    const email = user.emailUser;
    const subject = "Contatar";
    const body = "Olá! Eu vim pelo seu GetiCard.";

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className="main">
      <ToastContainer />
      <img src={circleGreen} alt="círculo verde" className="circleGreen" />
      <img src={circleBlue} alt="círculo azul" className="circleeBlue" />
      <ModalMenu />
      <ShareButton />
      <div className="login-page">
        <div className="card-page">
          <div className="card-info">
            <div className="image-card">
              <img
                className="foto-usuario"
                src={user.fotoUser}
                alt="Avatar do usuário"
              />
            </div>
            <span className="name-user">{user.nomeUser}</span>
            <div className="grid-container">
              {(user.formacaoUser !== "") & (user.cargoAtualUser === "") ? (
                <span className="center">{user.formacaoUser}</span>
              ) : (
                ""
              )}
              {(user.formacaoUser === "") & (user.cargoAtualUser !== "") ? (
                <span className="center">{user.cargoAtualUser}</span>
              ) : (
                ""
              )}
              {(user.formacaoUser !== "") & (user.cargoAtualUser !== "") ? (
                <>
                  <span className="right">{user.formacaoUser}</span>
                  <span className="center">|</span>
                  <span className="left">{user.cargoAtualUser}</span>
                </>
              ) : (
                ""
              )}
              {(user.formacaoUser === "") & (user.cargoAtualUser === "")
                ? ""
                : ""}
            </div>
          </div>
          {user.bioUser !== "" ? (
            <span className="bio-user">{user.bioUser}</span>
          ) : (
            ""
          )}
          <div className="links-user">
            {user.emailUser !== "" ? (
              <Link>
                <div className="link" onClick={handleEmailClick}>
                  <AiOutlineMail className="icon" />
                  Email
                </div>
              </Link>
            ) : (
              ""
            )}
            {user.whatsAppUser !== "" ? (
              <Link
                to={`https://api.whatsapp.com/send?phone=+55${user.whatsAppUser}&text=Olá! Vim pelo seu GetiCard.`}
                target="_blank"
              >
                <div className="link">
                  <AiOutlineWhatsApp className="icon" />
                  WhatsApp
                </div>
              </Link>
            ) : (
              ""
            )}

            {user.instagramUser !== "" ? (
              <Link to={`https://${user.instagramUser}`} target="_blank">
                <div className="link">
                  <AiOutlineInstagram className="icon" />
                  Instagram
                </div>
              </Link>
            ) : (
              ""
            )}
            {user.linkedInUser !== "" ? (
              <Link to={`https://${user.linkedInUser}`} target="_blank">
                <div className="link">
                  <AiOutlineLinkedin className="icon" />
                  LinkedIn
                </div>
              </Link>
            ) : (
              ""
            )}

            {user.facebookUser !== "" ? (
              <Link to={`https://${user.facebookUser}`} target="_blank">
                <div className="link">
                  <AiOutlineFacebook className="icon" />
                  Facebook
                </div>
              </Link>
            ) : (
              ""
            )}
            {user.lattesUser !== "" ? (
              <Link to={`https://${user.lattesUser}`} target="_blank">
                <div className="link">
                  <img
                    src={logoLattes}
                    alt="Logo Lattes"
                    className="inputLogoLattes"
                  />
                  Lattes
                </div>
              </Link>
            ) : (
              ""
            )}

            {user.githubUser !== "" ? (
              <Link to={`https://${user.githubUser}`} target="_blank">
                <div className="link">
                  <AiOutlineGithub className="icon" />
                  Github
                </div>
              </Link>
            ) : (
              ""
            )}

            {user.siteUser !== "" ? (
              <Link to={`https://${user.siteUser}`} target="_blank">
                <div className="link">
                  <CgWebsite className="icon" />
                  Site
                </div>
              </Link>
            ) : (
              ""
            )}

            {user.pixUser !== "" ? (
              <Link>
                <div className="link" onClick={copyPix}>
                  <MdPix className="icon" />
                  Chave Pix
                </div>
              </Link>
            ) : (
              ""
            )}
          </div>
          <button className="button" onClick={abrirTelaDiscagem}>
            Salvar contato
          </button>
          <div className="footer">
            <img src={logoGeti} alt="Logo" className="logoGeti" />
          </div>
        </div>
      </div>
    </div>
  );
}
