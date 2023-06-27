import "../../styles/CreateUser/style.scss";

import logoGeti from "../../assets/createdByGeticompany.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { AiOutlineArrowLeft } from "react-icons/ai";

import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/UserContext";

export function CreateUser() {
  const { OtherPage } = useContext(AuthContext);
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]+$/;

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [confirmPswd, setConfirmPswd] = useState("");
  const [error, setError] = useState("");
  // const [card_uuid, setCard_uuid] = useState("");

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { card_id } = useParams();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function travelToNextPage() {
    navigate(`/cadastrar-card/${card_id}`, { state: { formState } });
    //passando por state o objeto formState
  }

  function travelToBackPage() {
    navigate("/");
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilityConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passwordPattern.test(formState.password)) {
      setError("");
      if (formState.password === confirmPswd) {
        tryCadastro();
      } else {
        setError("As senhas não coincidem.");
        return;
      }
    } else {
      setError("A senha não atende os requisitos");
      return;
    }
  };

  async function tryCadastro() {
    try {
      await axios.post(
        "https://3ae6uztdubu6k3gpfng4we7bcq0lcuou.lambda-url.us-east-2.on.aws/",
        {
          name: formState.name,
          email: formState.email,
          password: formState.password,
          card_id: card_id,
        }
      );
      toast.info("Usuário criado com sucesso!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      OtherPage(formState.email, formState.password);
      setTimeout(() => {
        travelToNextPage();
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Já existe um usuário cadastrado com esse e-mail.", {
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
        setError("Email/senha incorretos");
        alert(error);
      }
    }
  }

  return (
    <div className="container">
      <ToastContainer />
      <div className="login-page">
        <div className="arrowToBack">
          <button className="buttonToBack" onClick={travelToBackPage}>
            <AiOutlineArrowLeft />
          </button>
        </div>
        <div className="login-form">
          <p className="login-text">Realize seu cadastro!</p>
          <form>
            
            {/* Nome */}
            <div className="form-group">
              <label htmlFor="name">Nome Completo</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formState.name}
                onChange={handleChange}
                required
              />
            </div>
            {/* E-MAIL */}
            <div className="form-group">
              <label htmlFor="email">Seu melhor e-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* SENHA */}
            <div className="form-group">
              <label htmlFor="password">Digite uma senha</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formState.password}
                onChange={handleChange}
                required
              />
              <div
                className="button-hidden"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </div>
            </div>

            {/* SENHA 2 */}
            <div className="form-group">
              <label htmlFor="password">Digite a senha novamente</label>

              <input
                type={showPasswordConfirm ? "text" : "password"}
                value={confirmPswd}
                onChange={(e) => setConfirmPswd(e.target.value)}
                required
              />
              <div
                className="button-hidden"
                type="button"
                onClick={togglePasswordVisibilityConfirm}
              >
                {showPasswordConfirm ? (
                  <VisibilityOffIcon />
                ) : (
                  <VisibilityIcon />
                )}
              </div>
            </div>
            <div className="info-text error">
              {error && <span>{error}</span>}
            </div>

            <div className="info-text">
              <span>
                A senha precisa conter: Letras maiúsulas, minúsculas, números e
                simbolos.
              </span>
            </div>
            <button className="button" type="button" onClick={handleSubmit}>
              Confirmar
            </button>
          </form>
          <div className="geticard-info">
            <span>Ja tem seu login?</span>
            <a href="/" onClick={travelToBackPage}>
              Clique aqui
            </a>
          </div>
        </div>
        <div className="footer">
          <img src={logoGeti} alt="Logo" className="logoGeti" />
        </div>
      </div>
    </div>
  );
}
