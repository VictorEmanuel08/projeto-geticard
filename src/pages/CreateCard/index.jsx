import "../../styles/CreateCard/style.scss";

import logoGeti from "../../assets/createdByGeticompany.png";
import logoLattes from "../../assets/lattes.png";
import circleBlue from "../../assets/circleBlue.png";
import circleGreen from "../../assets/circleGreen.png";

import React, { useState, useRef } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  AiOutlineArrowLeft,
  AiOutlineWhatsApp,
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineGithub,
  AiOutlineLinkedin,
} from "react-icons/ai";
import { MdPix, MdWork } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { IoMdAdd, IoMdSchool } from "react-icons/io";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function CreateCard() {
  const location = useLocation();
  const { formState } = location.state;
  //puxando o fomrState da página anterior
  const { card_id } = useParams();
  const fileInputRef = useRef(null);

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          foto: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const maxLengthBio = 150;

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    foto: "",
    bio: "",
    formacao: "",
    cargo_atual: "",
    whatsapp: "",
    instagram: "",
    linkedin: "",
    facebook: "",
    lattes: "",
    github: "",
    site: "",
    pix: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    let updatedValue = value;

    if (name === "whatsapp") {
      updatedValue = updatedValue.replace(/\D/g, ""); // Remove caracteres não numéricos
      updatedValue = updatedValue.slice(0, 11); // Limita o número a 11 dígitos
    }

    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: updatedValue,
    }));
  };

  function travelToNextPage() {
    navigate(`/card-user/${card_id}`, { state: { formState } });
  }

  function travelToBackPage() {
    navigate("/cadastrar-usuario");
  }

  async function tryCadastro() {
    try {
      await axios.post(
        "https://cj64fmy2a7dzd6cipabs4v5hae0jlwgl.lambda-url.us-east-2.on.aws/",
        {
          nome: formState.name,
          email: formState.email,
          senha: formState.password,
          card_id: card_id,
          foto_perfil: profile.foto,
          whatsapp: profile.whatsapp,
          formacao: profile.formacao,
          cargo_atual: profile.cargo_atual,
          biografia: profile.bio,
          chave_pix: profile.pix,
          lattes: profile.lattes,
          instagram: profile.instagram,
          twitter: "testuser",
          facebook: profile.facebook,
          github: profile.github,
          site: profile.site,
        }
      );
      toast.info("GetiCard criado com sucesso. Bem-vindo!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        travelToNextPage();
      }, 1000);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        toast.error(
          "Já existe um usuário cadastrado com algum desses campos.",
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
      } else {
        alert(error);
      }
    }
  }

  return (
    <div className="main">
      <ToastContainer />
      <img src={circleGreen} alt="círculo verde" className="circleGreen" />
      <img src={circleBlue} alt="círculo azul" className="circleeBlue" />
      <div className="login-page">
        <div className="arrowToBack">
          <button className="buttonToBack" onClick={travelToBackPage}>
            <AiOutlineArrowLeft />
          </button>
        </div>

        <div className="login-form">
        <div>
            <div className="profile-picture" onClick={handleChooseFile}>
              {profile.foto ? (
                profile.foto && <img src={profile.foto} alt="Profile" />
              ) : (
                <div className="add-div">
                  <IoMdAdd />
                </div>
              )}
            </div>
            <input
              type="file"
              name="foto"
              id="foto"
              accept="image/*"
              onChange={handlePictureChange}
              ref={fileInputRef}
              style={{ display: "none" }}
              capture="user"
            />
          </div>

          <p className="login-text">Complete seu Cartão!</p>
          <p>Faça um pequeno texto que chame a atenção</p>
          <form>
            <div className="inputs-container">
              {/* Bio */}
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  type="text"
                  className="bio-input"
                  name="bio"
                  id="bio"
                  defaultValue={profile.bio}
                  onChange={handleChange}
                  maxLength={maxLengthBio}
                />
                <p className="bio-count">
                  {profile.bio.length}/{maxLengthBio}
                </p>
              </div>

              {/* FORMAÇÃO */}
              <div className="form-group">
                <IoMdSchool className="input-icon" />
                <label htmlFor="formacao">Formação</label>
                <input
                  type="text"
                  name="formacao"
                  id="formacao"
                  defaultValue={profile.formacao}
                  onChange={handleChange}
                />
              </div>

              {/* CARGO ATUAL */}
              <div className="form-group">
                <MdWork className="input-icon" />
                <label htmlFor="cargo_atual">Cargo atual</label>
                <input
                  type="text"
                  name="cargo_atual"
                  id="cargo_atual"
                  defaultValue={profile.cargo_atual}
                  onChange={handleChange}
                />
              </div>

              {/* Whatsapp */}
              <div className="form-group">
                <AiOutlineWhatsApp className="input-icon" />
                <label htmlFor="whatsapp">Whatsapp</label>
                <input
                  type="text"
                  name="whatsapp"
                  id="whatsapp"
                  value={profile.whatsapp}
                  onChange={handleChange}
                  placeholder="00 900000000"
                />
              </div>

              {/* Instagram */}
              <div className="form-group">
                <AiOutlineInstagram className="input-icon" />
                <label htmlFor="instagram">Instagram</label>
                <input
                  type="text"
                  name="instagram"
                  id="instagram"
                  defaultValue={profile.instagram}
                  onChange={handleChange}
                  placeholder="instagram.com/seu-instagram"
                />
              </div>

              {/* Linkedin */}
              <div className="form-group">
                <AiOutlineLinkedin className="input-icon" />
                <label htmlFor="linkedin">Linkedin</label>
                <input
                  type="text"
                  name="linkedin"
                  id="linkedin"
                  defaultValue={profile.linkedin}
                  onChange={handleChange}
                  placeholder="linkedin.com/in/seu-linkedin/"
                />
              </div>

              {/* Facebook */}
              <div className="form-group">
                <AiOutlineFacebook className="input-icon" />
                <label htmlFor="facebook">Facebook</label>
                <input
                  type="text"
                  name="facebook"
                  id="facebook"
                  defaultValue={profile.facebook}
                  onChange={handleChange}
                  placeholder="facebook.com/seu-facebook"
                />
              </div>

              {/* Lattes */}
              <div className="form-group">
                <img
                  src={logoLattes}
                  alt="lattes"
                  className="inputLogoLattes"
                />
                <label htmlFor="lattes">Lattes</label>
                <input
                  type="text"
                  name="lattes"
                  id="lattes"
                  defaultValue={profile.lattes}
                  onChange={handleChange}
                  placeholder="lattes.cnpq.br/seu-lattes"
                />
              </div>

              {/* GitHub */}
              <div className="form-group">
                <AiOutlineGithub className="input-icon" />
                <label htmlFor="github">GitHub</label>
                <input
                  type="text"
                  name="github"
                  id="github"
                  defaultValue={profile.github}
                  onChange={handleChange}
                  placeholder="github.com/seu-github"
                />
              </div>

              {/* Site */}
              <div className="form-group">
                <CgWebsite className="input-icon" />
                <label htmlFor="site">Site</label>
                <input
                  type="text"
                  name="site"
                  id="site"
                  defaultValue={profile.site}
                  onChange={handleChange}
                />
              </div>

              {/* Chave Pix */}
              <div className="form-group">
                <MdPix className="input-icon" />
                <label htmlFor="pix">Chave Pix</label>
                <input
                  type="text"
                  name="pix"
                  id="pix"
                  defaultValue={profile.pix}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button className="button" type="button" onClick={tryCadastro}>
              Salvar Informações
            </button>
          </form>
        </div>
        <div className="footer">
          <img src={logoGeti} alt="Logo" className="logoGeti" />
        </div>
      </div>
    </div>
  );
}
