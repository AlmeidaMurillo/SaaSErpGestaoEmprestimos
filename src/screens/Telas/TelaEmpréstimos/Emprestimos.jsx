import React, { useEffect, useState } from "react";
import MenuDonos from "../../../components/MenuDonos/MenuDonos";
import MenuUsers from "../../../components/MenuUsers/MenuUsers";
import styles from "./Emprestimos.module.css";

function Emprestimos({ isCollapsed, toggleSidebar }) {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [emprestimos, setEmprestimos] = useState([
    { id: 1, cliente: "João Silva" },
    { id: 2, cliente: "Ana Oliveira DA SILVA DIAS DE ALMEIDA" },
    { id: 3, cliente: "Pedro Santos" },
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 4,
      cliente: "Pedro Santos",
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

  const filteredEmprestimos = emprestimos.filter((e) =>
    e.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.id.toString().includes(searchTerm)
  );

  const renderEmprestimos = () => (
    <div className={styles.container}>
      <div className={styles.filtros}>
        <input
          type="text"
          placeholder="Pesquisar por cliente ou ID..."
          className={styles.inputBusca}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.botaoNovo}>+ Novo Empréstimo</button>
      </div>

      <div className={styles.tabelaWrapper}>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmprestimos.length > 0 ? (
              filteredEmprestimos.map((e) => (
                <tr className={styles.tabelaRow} key={`${e.id}-${e.cliente}`}>
                  <td>{e.id}</td>
                  <td>{e.cliente}</td>
                  <td className={styles.acoes}>
                    <button className={styles.botaoEditar}>Editar</button>
                    <button className={styles.botaoExcluir}>Excluir</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className={styles.notFound}>
                  Nenhum empréstimo encontrado.
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
        {renderEmprestimos()}
      </MenuDonos>
    ) : tipoUsuario === "user" ? (
      <MenuUsers isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
        {renderEmprestimos()}
      </MenuUsers>
    ) : (
      <p>Carregando...</p>
    );

  return <>{renderMenu()}</>;
}

export default Emprestimos;
