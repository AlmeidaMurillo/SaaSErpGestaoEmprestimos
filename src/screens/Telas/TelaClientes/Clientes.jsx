import React, { useEffect, useState } from "react";
import MenuDonos from "../../../components/MenuDonos/MenuDonos";
import MenuUsers from "../../../components/MenuUsers/MenuUsers";
import styles from "./Clientes.module.css";

function Clientes({ isCollapsed, toggleSidebar }) {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [clientes, setClientes] = useState([
    { id: 1, nome: "João Silva" },
    { id: 2, nome: "Ana Oliveira DA SILVA DIAS DE ALMEIDA " },
    { id: 3, nome: "Pedro Santos" },
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 4,
      nome: "Pedro Santos",
    })),
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
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.id.toString().includes(searchTerm)
  );

  const renderClientes = () => (
    <div className={styles.container}>
      <div className={styles.filtros}>
        <input
          type="text"
          placeholder="Pesquisar por nome ou ID..."
          className={styles.inputBusca}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.botaoNovo}>+ Novo</button>
      </div>

      <div className={styles.tabelaWrapper}>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.length > 0 ? (
              filteredClientes.map((cliente) => (
                <tr key={`${cliente.id}-${cliente.nome}`}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nome}</td>
                  <td className={styles.acoes}>
                    <button className={styles.botaoEditar}>Editar</button>
                    <button className={styles.botaoExcluir}>Excluir</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className={styles.notFound}>
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMenu = () =>
    tipoUsuario === "admin" ? (
      <MenuDonos isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
        {renderClientes()}
      </MenuDonos>
    ) : tipoUsuario === "user" ? (
      <MenuUsers isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
        {renderClientes()}
      </MenuUsers>
    ) : (
      <p>Carregando...</p>
    );

  return <>{renderMenu()}</>;
}

export default Clientes;
