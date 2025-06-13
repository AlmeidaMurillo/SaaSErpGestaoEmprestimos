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
      telefone: "11999999999",
      indicadoPor: "Maria Souza",
      endereco: "Rua A, 123 - Centro",
      totalEmprestimos: 5,
      pendentes: 2,
      totalEmprestado: 10000,
      lucroTotal: 1500,
      maiorValorEmprestado: 3000,
      ultimoEmprestimo: {
        valor: 2000,
        data: "10/04/2024",
      },
      emprestimosPagos: 3,
    },
    {
      id: 2,
      nome: "Ana Oliveira",
      telefone: "11988888888",
      indicadoPor: "Carlos Lima",
      endereco: "Av. B, 456 - Bairro Novo",
      totalEmprestimos: 3,
      pendentes: 1,
      totalEmprestado: 6000,
      lucroTotal: 900,
      maiorValorEmprestado: 2500,
      ultimoEmprestimo: {
        valor: 2500,
        data: "05/03/2024",
      },
      emprestimosPagos: 2,
    },
    {
      id: 3,
      nome: "Pedro Santos",
      telefone: "11977777777",
      indicadoPor: "Joana Lima",
      endereco: "Rua C, 789 - Jardim das Flores",
      totalEmprestimos: 4,
      pendentes: 1,
      totalEmprestado: 8000,
      lucroTotal: 1200,
      maiorValorEmprestado: 2800,
      ultimoEmprestimo: {
        valor: 1800,
        data: "15/02/2024",
      },
      emprestimosPagos: 3,
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
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.container} ${isCollapsed ? styles.collapsed : ""}`}>
        <input
          type="text"
          placeholder="Pesquisar cliente pelo nome..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className={styles.clientesBox}>
          {filteredClientes.map((cliente) => (
            <div key={cliente.id} className={styles.clienteCard}>
              <h3>{cliente.nome}</h3>
              <p><strong>Código do Cliente:</strong> {cliente.id}</p>
              <p><strong>Telefone de Contato:</strong> {cliente.telefone}</p>
              <p><strong>Indicado Por:</strong> {cliente.indicadoPor}</p>
              <p><strong>Endereço Residencial:</strong> {cliente.endereco}</p>
              <p><strong>Qtd. de Empréstimos:</strong> {cliente.totalEmprestimos}</p>
              <p><strong>Empréstimos Pendentes:</strong> {cliente.pendentes}</p>
              <p><strong>Valor Total Emprestado:</strong> R$ {cliente.totalEmprestado.toLocaleString()}</p>
              <p><strong>Lucro Gerado:</strong> R$ {cliente.lucroTotal.toLocaleString()}</p>
              <p><strong>Maior Empréstimo Concedido:</strong> R$ {cliente.maiorValorEmprestado.toLocaleString()}</p>
              <p><strong>Último Empréstimo:</strong> {cliente.ultimoEmprestimo ? `R$ ${cliente.ultimoEmprestimo.valor.toLocaleString()} em ${cliente.ultimoEmprestimo.data}` : "R$ N/A em N/A"}</p>
              <p><strong>Qtd. de Empréstimos Pagos:</strong> {cliente.emprestimosPagos}</p>
            </div>
          ))}
          {filteredClientes.length === 0 && (
            <p className={styles.notFound}>Nenhum cliente encontrado.</p>
          )}
        </div>
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
