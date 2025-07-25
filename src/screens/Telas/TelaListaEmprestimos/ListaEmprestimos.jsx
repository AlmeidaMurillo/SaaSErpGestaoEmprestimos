import React, { useEffect, useState } from "react";
import MenuDonos from "../../../components/MenuDonos/MenuDonos";
import MenuUsers from "../../../components/MenuUsers/MenuUsers";
import styles from "./ListaEmprestimos.module.css";

function ListaEmprestimos({ isCollapsed, toggleSidebar }) {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [emprestimos, setEmprestimos] = useState([]);

  useEffect(() => {
    const tipo = localStorage.getItem("tipoUsuario");
    if (!tipo) {
      window.location.href = "/";
    } else {
      setTipoUsuario(tipo);
    }

    // Dados de teste
    const fakeData = [];
    for (let i = 1; i <= 50; i++) {
      fakeData.push({
        id: i,
        cliente: "Murillo Almeida",
        valor: `R$ ${(Math.random() * 1000 + 1000).toFixed(2)}`,
        parcelas: Math.floor(Math.random() * 12) + 1,
        data: `2025-07-${((i % 30) + 1).toString().padStart(2, "0")}`,
        status: i % 2 === 0 ? "Pago" : "Pendente",
      });
    }
    setEmprestimos(fakeData);
  }, []);

  const filteredEmprestimos = emprestimos.filter(
    (e) =>
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
        {filteredEmprestimos.length === 0 ? (
          <p className={styles.notFound}>Nenhum empréstimo encontrado.</p>
        ) : (
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Valor</th>
                <th>Parcelas</th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmprestimos.map((emprestimo) => (
                <tr
                  key={emprestimo.id}
                  className={styles.tabelaRow}
                  onClick={() => alert(`Visualizar empréstimo ID ${emprestimo.id}`)}
                >
                  <td>{emprestimo.id}</td>
                  <td>{emprestimo.cliente}</td>
                  <td>{emprestimo.valor}</td>
                  <td>{emprestimo.parcelas}</td>
                  <td>{emprestimo.data}</td>
                  <td
                    style={{
                      color: emprestimo.status === "Pago" ? "#22c55e" : "#ef4444",
                      fontWeight: "bold",
                    }}
                  >
                    {emprestimo.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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

export default ListaEmprestimos;
