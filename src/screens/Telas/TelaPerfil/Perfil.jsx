import React, { useEffect, useState } from "react";
import MenuDonos from "../../../components/MenuDonos/MenuDonos";
import MenuUsers from "../../../components/MenuUsers/MenuUsers";
import styles from "./Perfil.module.css";

function Perfil({ isCollapsed, toggleSidebar }) {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [mostrarModalSenha, setMostrarModalSenha] = useState(false);
  const [mostrarModalPlano, setMostrarModalPlano] = useState(false);
  const [dadosUsuario, setDadosUsuario] = useState({
    nome: "Murillo Almeida",
    email: "almeidamurillo196@gmail.com",
    empresa: "Almeida Finanças LTDA",
    plano: "Mensal - R$99,90",
    vencimento: "16/08/2025",
    telefone: "(11) 91234-5678",
    endereco: "Rua Exemplo, 123, São Paulo - SP",
    status: "Ativo",
    fotoPerfil: "https://via.placeholder.com/150"
  });

  useEffect(() => {
    const tipo = localStorage.getItem("tipoUsuario");
    if (!tipo) {
      window.location.href = "/";
    } else {
      setTipoUsuario(tipo);
    }
  }, []);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDadosUsuario({ ...dadosUsuario, fotoPerfil: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderModais = () => (
    <>
      {mostrarModalSenha && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Alterar Senha</h2>
            <input type="password" placeholder="Nova senha" className={styles.modalInput} />
            <input type="password" placeholder="Confirmar senha" className={styles.modalInput} />
            <div className={styles.modalButtons}>
              <button className={styles.btn}>Salvar</button>
              <button className={styles.btnCancel} onClick={() => setMostrarModalSenha(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {mostrarModalPlano && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Alterar Plano</h2>
            <select className={styles.modalInput}>
              <option value="mensal">Mensal - R$99,90</option>
              <option value="trimestral">Trimestral - R$269,90</option>
              <option value="anual">Anual - R$999,90</option>
            </select>
            <div className={styles.modalButtons}>
              <button className={styles.btn}>Salvar</button>
              <button className={styles.btnCancel} onClick={() => setMostrarModalPlano(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const conteudo = (
    <div className={styles.perfilContainer}>
      <div className={styles.leftPanel}>
        <img src={dadosUsuario.fotoPerfil} alt="Foto de Perfil" className={styles.fotoPerfil} />
        <label className={styles.uploadLabel}>
          <input type="file" accept="image/*" onChange={handleFotoChange} />
          Alterar Foto de Perfil
        </label>
        <div className={styles.btnGroup}>
          <button className={styles.btn} onClick={() => setMostrarModalSenha(true)}>Alterar Senha</button>
          <button className={styles.btn} onClick={() => setMostrarModalPlano(true)}>Alterar Plano</button>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <section className={styles.infoQuadrante}>
          <h3>Dados Pessoais</h3>
          <div className={styles.infoCard}><strong>Nome:</strong> {dadosUsuario.nome}</div>
          <div className={styles.infoCard}><strong>Email:</strong> {dadosUsuario.email}</div>
          <div className={styles.infoCard}><strong>Telefone:</strong> {dadosUsuario.telefone}</div>
        </section>

        <section className={styles.infoQuadrante}>
          <h3>Empresa</h3>
          <div className={styles.infoCard}><strong>Empresa:</strong> {dadosUsuario.empresa}</div>
          <div className={styles.infoCard}><strong>Endereço:</strong> {dadosUsuario.endereco}</div>
        </section>

        <section className={styles.infoQuadrante}>
          <h3>Plano</h3>
          <div className={styles.infoCard}><strong>Plano:</strong> {dadosUsuario.plano}</div>
          <div className={styles.infoCard}><strong>Vencimento:</strong> {dadosUsuario.vencimento}</div>
        </section>

        <section className={styles.infoQuadrante}>
          <h3>Status</h3>
          <div className={`${styles.infoCard} ${dadosUsuario.status === "Ativo" ? styles.statusAtivo : styles.statusInativo}`}>
            <strong>Status:</strong> {dadosUsuario.status}
          </div>
        </section>
      </div>

      {renderModais()}
    </div>
  );

  if (tipoUsuario === "admin") {
    return <MenuDonos isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>{conteudo}</MenuDonos>;
  } else if (tipoUsuario === "user") {
    return <MenuUsers isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>{conteudo}</MenuUsers>;
  } else {
    return <p>Carregando...</p>;
  }
}

export default Perfil;
