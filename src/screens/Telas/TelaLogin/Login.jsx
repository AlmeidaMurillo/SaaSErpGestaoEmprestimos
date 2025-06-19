import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const navigate = useNavigate();

  const toggleSenha = () => setMostrarSenha(!mostrarSenha);

  const handleLogin = (e) => {
    e.preventDefault();

    if (usuario === "admin" && senha === "Wmp@230607") {
      localStorage.setItem("tipoUsuario", "admin");
      navigate("/dashboard");
    } else if (usuario === "usuario" && senha === "usuario123") {
      localStorage.setItem("tipoUsuario", "user");
      navigate("/dashboard");
    } else {
      setErro("Usuário ou senha incorretos.");
      setTimeout(() => setErro(""), 3000);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const isKeyboardOpen = window.innerHeight < 500;
      setInputFocused(isKeyboardOpen);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`${styles.loginContainer} ${inputFocused ? styles.keyboardOpen : ""}`}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>MultiAlmeida</h1>
        <h2 className={styles.soubtitle}>Gestão Empréstimos</h2>
        <p className={styles.subtitle}>
          Entre com seus dados para acessar o sistema
        </p>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputWrapper}>
            <FaUser className={styles.inputIcon} />
            <input
              type="text"
              placeholder="Usuário"
              className={styles.input}
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              required
            />
          </div>

          <div className={styles.inputWrapper}>
            <FaLock className={styles.inputIcon} />
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Senha"
              className={styles.input}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              required
            />
            <span
              onClick={toggleSenha}
              className={`${styles.iconeOlho} ${styles.iconeOlhoHover}`}
            >
              {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>

        {erro && <p className={styles.errorMsg}>{erro}</p>}
      </div>

      <footer className={styles.footer}>
        <p className={styles.rights}>
          © {new Date().getFullYear()} <strong>MultiAlmeida</strong>. Todos os
          direitos reservados.
        </p>
      </footer>
    </div>
  );
}
