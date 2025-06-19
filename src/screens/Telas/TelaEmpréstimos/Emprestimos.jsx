import React, { useEffect, useState } from "react";
import MenuDonos from "../../../components/MenuDonos/MenuDonos";
import MenuUsers from "../../../components/MenuUsers/MenuUsers";
import styles from "./Emprestimos.module.css";
import { useNavigate } from "react-router-dom";

function Emprestimos({ isCollapsed, toggleSidebar }) {
  const navigate = useNavigate();
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [emprestimos, setEmprestimos] = useState([
    {
      idCliente: 1,
      idEmprestimo: 1,
      cliente: "BRUNETE",
      valorEmprestado: 7000,
      valorPagar: 10000,
      juros: 3000,
      parcelas: 5,
      parcelasPagas: 4,
      parcelasPendentes: 1,
      valorParcela: 2000,
      valorPago: 8000,
      valorPendente: 2000,
      dataEmprestimo: "22/01/2025",
      proximoPagamento: "22/06/2025",
      status: "PENDENTE",
    },
    {
      idCliente: 2,
      idEmprestimo: 2,
      cliente: "CARLOS EDUARDO",
      valorEmprestado: 5000,
      valorPagar: 7500,
      juros: 2500,
      parcelas: 5,
      parcelasPagas: 2,
      parcelasPendentes: 3,
      valorParcela: 1500,
      valorPago: 3000,
      valorPendente: 4500,
      dataEmprestimo: "10/02/2025",
      proximoPagamento: "10/06/2025",
      status: "PENDENTE",
    },
    {
      idCliente: 3,
      idEmprestimo: 3,
      cliente: "MARCELA LIMA",
      valorEmprestado: 10000,
      valorPagar: 13000,
      juros: 3000,
      parcelas: 10,
      parcelasPagas: 10,
      parcelasPendentes: 0,
      valorParcela: 1300,
      valorPago: 13000,
      valorPendente: 0,
      dataEmprestimo: "05/01/2025",
      proximoPagamento: "-",
      status: "PAGO",
    },
    {
      idCliente: 4,
      idEmprestimo: 4,
      cliente: "JOÃO PEDRO",
      valorEmprestado: 3000,
      valorPagar: 3900,
      juros: 900,
      parcelas: 3,
      parcelasPagas: 1,
      parcelasPendentes: 2,
      valorParcela: 1300,
      valorPago: 1300,
      valorPendente: 2600,
      dataEmprestimo: "18/03/2025",
      proximoPagamento: "18/06/2025",
      status: "PENDENTE",
    },
    {
      idCliente: 5,
      idEmprestimo: 5,
      cliente: "FERNANDA SOUZA",
      valorEmprestado: 12000,
      valorPagar: 15600,
      juros: 3600,
      parcelas: 6,
      parcelasPagas: 0,
      parcelasPendentes: 6,
      valorParcela: 2600,
      valorPago: 0,
      valorPendente: 15600,
      dataEmprestimo: "01/05/2025",
      proximoPagamento: "01/06/2025",
      status: "PENDENTE",
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

  const filteredEmprestimos = emprestimos.filter((e) =>
    e.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderEmprestimos = () => (
    <div className={`${isCollapsed ? styles.collapsed : ""}`}>
      <button className={styles.addButton}>
        + Novo Empréstimo
      </button>
      <input
        type="text"
        placeholder="Pesquisar empréstimo pelo nome do cliente..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.emprestimosBox}>
        {filteredEmprestimos.map((e) => (
          <div key={e.idEmprestimo} className={styles.emprestimoCard} onClick={() => navigate("/parcelas")}>
            <h3>{e.cliente}</h3>
            <p><strong>Código do Cliente:</strong> {e.idCliente}</p>
            <p><strong>Código do Empréstimo:</strong> {e.idEmprestimo}</p>
            <p><strong>Valor Emprestado:</strong> R$ {e.valorEmprestado.toLocaleString()}</p>
            <p><strong>Valor à Pagar:</strong> R$ {e.valorPagar.toLocaleString()}</p>
            <p><strong>Juros:</strong> R$ {e.juros.toLocaleString()}</p>
            <p><strong>Número de Parcelas:</strong> {e.parcelas}</p>
            <p><strong>Parcelas Quitadas:</strong> {e.parcelasPagas}</p>
            <p><strong>Parcelas em Aberto:</strong> {e.parcelasPendentes}</p>
            <p><strong>Valor das Parcelas:</strong> R$ {e.valorParcela.toFixed(2)}</p>
            <p><strong>Total Pago:</strong> R$ {e.valorPago.toLocaleString()}</p>
            <p><strong>Total Devedor:</strong> R$ {e.valorPendente.toLocaleString()}</p>
            <p><strong>Data do Empréstimo:</strong> {e.dataEmprestimo}</p>
            <p><strong>Data do Próximo Vencimento:</strong> {e.proximoPagamento}</p>
            <p><strong>Situação do Empréstimo:</strong> {e.status}</p>
          </div>
        ))}
        {filteredEmprestimos.length === 0 && (
          <p className={styles.notFound}>Nenhum empréstimo encontrado.</p>
        )}
      </div>
    </div>
  );

  const renderMenu = () => {
    if (tipoUsuario === "admin") {
      return (
        <MenuDonos isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
          {renderEmprestimos()}
        </MenuDonos>
      );
    } else if (tipoUsuario === "user") {
      return (
        <MenuUsers isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
          {renderEmprestimos()}
        </MenuUsers>
      );
    } else {
      return <p>Carregando...</p>;
    }
  };

  return <>{renderMenu()}</>;
}

export default Emprestimos;
