import "../../styles/Login/style.scss";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LoadDiv } from "../../components/LoadDiv";

import logoGeti from "../../assets/createdByGeticompany.png";
import circleBlue from "../../assets/circleBlue.png";
import circleGreen from "../../assets/circleGreen.png";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { AiOutlineWhatsApp, AiOutlineMail } from "react-icons/ai";

import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

export function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("usuario_padrao");
  const [password, setPassword] = useState("senha_padrao");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function tryLogin() {
    try {
      setIsLoading(true);
      setError("");
      login(email, password);
      // await axios.post(
      //   "https://javbstvpofyg5dxpvk2v7fppqy0qoibr.lambda-url.us-east-2.on.aws/",
      //   {
      //     email: email,
      //     password: password,
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      console.log("sucess");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("E-mail ou senha inválidos!", {
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
        toast.error("Erro desconhecido: " + error.message);
      }
    }
    setIsLoading(false);
  }

  const handleEmailClick = () => {
    const email = "victorem3181@gmail.com";
    const subject = "Comprar um Geticard";
    const body = "Olá! Eu quero um GetiCard.";

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className="main">
      <ToastContainer />
      <img src={circleGreen} alt="círculo verde" className="circleGreen" />
      <div className="login-page">
        <div className="login-form">
          <p className="loginText">Entre com seu login</p>
          <div className="info-text error">{error && <span>{error}</span>}</div>
          <div>
            {/* E-MAIL */}
            <div className="form-group-email">
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* SENHA */}
            <div className="form-group-senha">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
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
            <div className="forgot-password">
              <a href="/">Esqueci minha senha</a>
            </div>

            {isLoading ? (
              <LoadDiv />
            ) : (
              <button className="button" type="button" onClick={tryLogin}>
                Entrar
              </button>
            )}
          </div>
          <div className="geticardInfo">
            <span>Adquiriu seu GetiCard agora?</span>
            <div className="geticard-contact">
              <Link
                to={`https://api.whatsapp.com/send?phone=+5598992303667&text=Olá! Eu quero um GetiCard.`}
                target="_blank"
              >
                <AiOutlineWhatsApp className="icon" />
              </Link>

              <AiOutlineMail className="icon" onClick={handleEmailClick} />
            </div>
            {/* <a href="/cadastrar-usuario">Clique aqui</a> */}
          </div>
        </div>
        <div className="footer">
          <img src={logoGeti} alt="Logo" className="logoGeti" />
        </div>
      </div>
      <img src={circleBlue} alt="círculo azul" className="circleBlue" />
    </div>
  );
}
