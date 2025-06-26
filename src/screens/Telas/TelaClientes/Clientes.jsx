import React, { useEffect, useState } from "react";
import MenuDonos from "../../../components/MenuDonos/MenuDonos";
import MenuUsers from "../../../components/MenuUsers/MenuUsers";
import styles from "./Clientes.module.css";

function Clientes({ isCollapsed, toggleSidebar }) {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nome: "João Silva",
    },
    {
      id: 2,
      nome: "Ana Oliveira",
    },
    {
      id: 3,
      nome: "Pedro Santos",
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

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderClientes = () => (
    <div className={`${isCollapsed ? styles.collapsed : ""}`}>
      <div className={styles.topo}>
        <input
          type="text"
          placeholder="Pesquisar cliente pelo nome..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.addButton}>+ Novo Cliente</button>
      </div>
      <div className={styles.clientesBox}>
        {filteredClientes.map((cliente) => (
          <div key={cliente.id} className={styles.clienteCard}>
            <div className={styles.infoCliente}>
              <span className={styles.idCliente}>{cliente.id}</span>
              <span className={styles.traco}>-</span>
              <span className={styles.nomeCliente}>{cliente.nome}</span>
            </div>
            <div className={styles.acoes}>
              <button className={styles.botaoEditar}>
                <i className="fas fa-pen"></i>
              </button>
              <button className={styles.botaoExcluir}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
        {filteredClientes.length === 0 && (
          <p className={styles.notFound}>Nenhum cliente encontrado.</p>
        )}
      </div>
    </div>
  );

  const renderMenu = () => {
    if (tipoUsuario === "admin") {
      return (
        <MenuDonos isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
          {renderClientes()}
        </MenuDonos>
      );
    } else if (tipoUsuario === "user") {
      return (
        <MenuUsers isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
          {renderClientes()}
        </MenuUsers>
      );
    } else {
      return <p>Carregando...</p>;
    }
  };

  return <>{renderMenu()}</>;
}

export default Clientes;
