import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");

    if (recoveredUser) {
      setUser(recoveredUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "https://javbstvpofyg5dxpvk2v7fppqy0qoibr.lambda-url.us-east-2.on.aws/",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const loggedUser = response.config.data;
      // const token = response.data.token;

      // console.log("user:", loggedUser);
      // console.log("token: ", token);
      // console.log("user: ", response.config.data);

      localStorage.setItem("user", loggedUser);
      // localStorage.setItem("token", token);

      // response.defaults.headers.Authorization = `Bearer ${token}`;

      const card_id = response.data.card_id;
      setUser(loggedUser);
      toast.success("Bem-vindo ao GetiCard!", {
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
      }, 2000);
    } catch (error) {
      if (error.response.status === 401) {
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
  };

  const OtherPage = async (email, password) => {
    try {
      const response = await axios.post(
        "https://javbstvpofyg5dxpvk2v7fppqy0qoibr.lambda-url.us-east-2.on.aws/",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const loggedUser = response.config.data;

      // console.log("user:", loggedUser);

      localStorage.setItem("user", loggedUser);

      // const card_id = response.data.card_id;
      // console.log(card_id);
      setUser(loggedUser);
    } catch (error) {
      if (error.response.status === 401) {
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
  };

  const logout = () => {
    localStorage.removeItem("user");
    // localStorage.removeItem("token");
    axios.defaults.headers.Authorization = null;
    toast.warn("Deslogando...", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setUser(null);
    setTimeout(() => {
      navigate(`/`);
    }, 2000);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        login,
        OtherPage,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
