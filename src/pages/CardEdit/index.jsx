import "../../styles/CardEdit/style.scss";

import logoGeti from "../../assets/createdByGeticompany.png";
import logoLattes from "../../assets/lattes.png";
import circleBlue from "../../assets/circleBlue.png";
import circleGreen from "../../assets/circleGreen.png";

import React, { useState, useRef, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

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

export function CardEdit() {
  const { card_id } = useParams();
  const fileInputRef = useRef(null);

  const maxLengthBio = 150;

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    foto: "",
    nome: "",
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
        setProfile({
          foto: response.data.foto_perfil,
          nome: response.data.nome,
          formacao: response.data.formacao,
          cargo_atual: response.data.cargo_atual,
          bio: response.data.biografia,
          whatsapp: response.data.whatsapp,
          instagram: response.data.instagram,
          linkedin: response.data.site,
          facebook: response.data.facebook,
          lattes: response.data.lattes,
          github: response.data.github,
          site: response.data.site,
          pix: response.data.chave_pix,
        });
      } catch (error) {
        console.error(error);
        console.error(error.response);
      }
    };

    fetchData();
  }, [card_id]);

  async function AttCard() {
    try {
      await axios.put(
        `https://plju4d3xqye5o52gpuwa7slvdy0vaijv.lambda-url.us-east-2.on.aws/?card_id=${card_id}`,
        {
          nome: profile.nome,
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
      toast.info("GetiCard editado com sucesso!", {
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
        navigate(`/card-user/${card_id}`);
      }, 1000);
    } catch (error) {
      alert("erro");
      console.error(error);
      console.error(error.response);
    }
  }

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

  function travelToBackPage() {
    navigate(-1);
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
                  {/* {profile.bioUser.length}/{maxLengthBio} */}
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
                  type="phone"
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
                  value={profile.instagram}
                  onChange={handleChange}
                  placeholder="instagram.com/seu-instagram"
                />
              </div>

              {/* Linkedin */}
              <div className="form-group">
                <AiOutlineLinkedin className="input-icon" />
                <label htmlFor="linkedin">linkedIn</label>
                <input
                  type="text"
                  name="linkedin"
                  id="linkedin"
                  value={profile.linkedin}
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
                  value={profile.facebook}
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
                  value={profile.lattes}
                  onChange={handleChange}
                  placeholder="lattes.cnpq.br/seu-lattes"
                />
              </div>

              {/* GitHub */}
              <div className="form-group">
                <AiOutlineGithub className="input-icon" />
                <label htmlFor="gitHub">GitHub</label>
                <input
                  type="text"
                  name="github"
                  id="gitHub"
                  value={profile.github}
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
                  value={profile.site}
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
                  value={profile.pix}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button className="button" type="button" onClick={AttCard}>
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
