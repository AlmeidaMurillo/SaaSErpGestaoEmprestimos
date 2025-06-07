import React, { useEffect, useState } from "react";
import MenuDonos from "../../../components/MenuDonos/MenuDonos";
import MenuUsers from "../../../components/MenuUsers/MenuUsers";
import styles from "./Clientes.module.css";

function Clientes({ isCollapsed, toggleSidebar }) {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nome: "BRUNETE",
      telefone: "11977526247",
      indicadoPor: "WELINGTON",
      endereco: "RUA RENDEIRA, 279",
      totalEmprestimos: 2,
      pendentes: 2,
      totalEmprestado: 9900,
      lucroTotal: 0,
      maiorValorEmprestado: 7000,
      ultimoEmprestimo: null,
      emprestimosPagos: 0,
    },
    {
      id: 2,
      nome: "JOÃO SILVA",
      telefone: "11988887777",
      indicadoPor: "ANA",
      endereco: "AVENIDA BRASIL, 123",
      totalEmprestimos: 4,
      pendentes: 1,
      totalEmprestado: 12000,
      lucroTotal: 1500,
      maiorValorEmprestado: 5000,
      ultimoEmprestimo: { valor: 4000, data: "10/05/2025" },
      emprestimosPagos: 3,
    },
    {
      id: 3,
      nome: "MARIA FERNANDA",
      telefone: "11999993333",
      indicadoPor: "CARLOS",
      endereco: "RUA DAS FLORES, 456",
      totalEmprestimos: 3,
      pendentes: 2,
      totalEmprestado: 8000,
      lucroTotal: 950,
      maiorValorEmprestado: 3500,
      ultimoEmprestimo: { valor: 3500, data: "20/04/2025" },
      emprestimosPagos: 1,
    },
    {
      id: 4,
      nome: "PAULO OLIVEIRA",
      telefone: "11888884444",
      indicadoPor: "MARCOS",
      endereco: "RUA DAS LARANJEIRAS, 789",
      totalEmprestimos: 5,
      pendentes: 0,
      totalEmprestado: 15000,
      lucroTotal: 2200,
      maiorValorEmprestado: 6000,
      ultimoEmprestimo: { valor: 6000, data: "15/03/2025" },
      emprestimosPagos: 5,
    },
    {
      id: 5,
      nome: "ANA CAROLINA",
      telefone: "11912344321",
      indicadoPor: "JOÃO",
      endereco: "TRAVESSA PAZ, 333",
      totalEmprestimos: 1,
      pendentes: 1,
      totalEmprestado: 2000,
      lucroTotal: 300,
      maiorValorEmprestado: 2000,
      ultimoEmprestimo: { valor: 2000, data: "01/05/2025" },
      emprestimosPagos: 0,
    },
    {
      id: 6,
      nome: "RICARDO ALVES",
      telefone: "11777776666",
      indicadoPor: "BRUNETE",
      endereco: "ALAMEDA VITÓRIA, 909",
      totalEmprestimos: 2,
      pendentes: 1,
      totalEmprestado: 7200,
      lucroTotal: 800,
      maiorValorEmprestado: 5000,
      ultimoEmprestimo: { valor: 5000, data: "25/05/2025" },
      emprestimosPagos: 1,
    },
    {
      id: 7,
      nome: "JULIANA MEIRELES",
      telefone: "11945678900",
      indicadoPor: "MARIA",
      endereco: "RUA DOS IPÊS, 654",
      totalEmprestimos: 3,
      pendentes: 2,
      totalEmprestado: 8900,
      lucroTotal: 1050,
      maiorValorEmprestado: 4000,
      ultimoEmprestimo: { valor: 4000, data: "08/05/2025" },
      emprestimosPagos: 1,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

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
    <div
      className={`${styles.container} ${
        isCollapsed ? styles.collapsed : ""
      }`}
    >
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
            <p>
              <strong>Código do Cliente:</strong> {cliente.id}
            </p>
            <p>
              <strong>Telefone de Contato:</strong> {cliente.telefone}
            </p>
            <p>
              <strong>Indicado Por:</strong> {cliente.indicadoPor}
            </p>
            <p>
              <strong>Endereço Residencial:</strong> {cliente.endereco}
            </p>
            <p>
              <strong>Qtd. de Empréstimos:</strong> {cliente.totalEmprestimos}
            </p>
            <p>
              <strong>Empréstimos Pendentes:</strong> {cliente.pendentes}
            </p>
            <p>
              <strong>Valor Total Emprestado:</strong> R${" "}
              {cliente.totalEmprestado.toLocaleString()}
            </p>
            <p>
              <strong>Lucro Gerado:</strong> R${" "}
              {cliente.lucroTotal.toLocaleString()}
            </p>
            <p>
              <strong>Maior Empréstimo Concedido:</strong> R${" "}
              {cliente.maiorValorEmprestado.toLocaleString()}
            </p>
            <p>
              <strong>Último Empréstimo: </strong>
              {cliente.ultimoEmprestimo
                ? `R$ ${cliente.ultimoEmprestimo.valor.toLocaleString()} em ${
                    cliente.ultimoEmprestimo.data
                  }`
                : "R$ N/A em N/A"}
            </p>
            <p>
              <strong>Qtd. de Empréstimos Pagos:</strong>{" "}
              {cliente.emprestimosPagos}
            </p>
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
