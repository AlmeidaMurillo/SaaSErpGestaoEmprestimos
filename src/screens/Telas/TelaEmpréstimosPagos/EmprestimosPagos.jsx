import React, { useEffect, useState } from "react";
import MenuDonos from "../../../components/MenuDonos/MenuDonos";
import MenuUsers from "../../../components/MenuUsers/MenuUsers";
import styles from "./EmprestimosPagos.module.css";

function EmprestimosPagos({ isCollapsed, toggleSidebar }) {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [emprestimosPagos, setEmprestimosPagos] = useState([
    { id: 1, cliente: "João Silva" },
    { id: 2, cliente: "Maria Fernandes" },
    { id: 3, cliente: "Carlos Oliveira" },
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 4,
      cliente: "Cliente Pago",
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

  const filteredPagos = emprestimosPagos.filter((e) =>
    e.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.id.toString().includes(searchTerm)
  );

  const renderPagos = () => (
    <div className={styles.container}>
      <div className={styles.filtros}>
        <input
          type="text"
          placeholder="Pesquisar por cliente ou ID..."
          className={styles.inputBusca}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
            {filteredPagos.length > 0 ? (
              filteredPagos.map((e) => (
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
                  Nenhum empréstimo pago encontrado.
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
        {renderPagos()}
      </MenuDonos>
    ) : tipoUsuario === "user" ? (
      <MenuUsers isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
        {renderPagos()}
      </MenuUsers>
    ) : (
      <p>Carregando...</p>
    );

  return <>{renderMenu()}</>;
}

export default EmprestimosPagos;
