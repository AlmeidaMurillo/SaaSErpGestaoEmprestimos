import React, { useEffect, useState } from "react";
import MenuDonos from "../../../components/MenuDonos/MenuDonos";
import MenuUsers from "../../../components/MenuUsers/MenuUsers";
import styles from "./Configuracoes.module.css";

function Configuracoes({ isCollapsed, toggleSidebar }) {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [funcionarios, setFuncionarios] = useState([
    {
      id: 1,
      nome: "João Silva",
      email: "joao.silva@email.com",
      telefone: "11999999999",
      cargo: "Gerente",
      endereco: "Rua A, 123 - Centro",
    },
    {
      id: 2,
      nome: "Ana Oliveira",
      email: "ana.oliveira@email.com",
      telefone: "11988888888",
      cargo: "Assistente",
      endereco: "Av. B, 456 - Bairro Novo",
    },
    {
      id: 3,
      nome: "Pedro Santos",
      email: "pedro.santos@email.com",
      telefone: "11977777777",
      cargo: "Analista",
      endereco: "Rua C, 789 - Jardim das Flores",
    },
  ]);

  useEffect(() => {
    const tipo = localStorage.getItem("tipoUsuario");
    if (!tipo) {
      window.location.href = "/";
    } else {
      setTipoUsuario(tipo);
    }
  }, []);

  const filteredFuncionarios = funcionarios.filter((func) =>
    func.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderFuncionarios = () => (
    <div className={`${isCollapsed ? styles.collapsed : ""}`}>
      <div className={styles.headerBox}>
        <button className={styles.addButton}>+ Novo Funcionário</button>
        <span className={styles.countInfo}>
          Total: {filteredFuncionarios.length} funcionário
          {filteredFuncionarios.length !== 1 ? "s" : ""}
        </span>
      </div>
      <input
        type="text"
        placeholder="Pesquisar Funcionário pelo nome..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.funcionariosBox}>
        {filteredFuncionarios.map((funcionario) => (
          <div key={funcionario.id} className={styles.funcionarioCard}>
            <h3>{funcionario.nome}</h3>
            <p>
              <strong>Código do Funcionário:</strong> {funcionario.id}
            </p>
            <p>
              <strong>E-mail:</strong> {funcionario.email}
            </p>
            <p>
              <strong>Cargo:</strong> {funcionario.cargo}
            </p>
            <p>
              <strong>Telefone de Contato:</strong> {funcionario.telefone}
            </p>
            <p>
              <strong>Endereço Residencial:</strong> {funcionario.endereco}
            </p>
          </div>
        ))}
        {filteredFuncionarios.length === 0 && (
          <p className={styles.notFound}>Nenhum funcionário encontrado.</p>
        )}
      </div>
    </div>
  );

  const renderMenu = () => {
    if (tipoUsuario === "admin") {
      return (
        <MenuDonos isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
          {renderFuncionarios()}
        </MenuDonos>
      );
    } else if (tipoUsuario === "user") {
      return (
        <MenuUsers isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
          {renderFuncionarios()}
        </MenuUsers>
      );
    } else {
      return <p>Carregando...</p>;
    }
  };

  return <>{renderMenu()}</>;
}

export default Configuracoes;
