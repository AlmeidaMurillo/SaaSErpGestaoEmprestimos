import React, { useEffect, useState } from "react";
import MenuDonos from "../../../components/MenuDonos/MenuDonos";
import MenuUsers from "../../../components/MenuUsers/MenuUsers";
import styles from "./Configuracoes.module.css";

function Configuracoes({ isCollapsed, toggleSidebar }) {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [busca, setBusca] = useState("");
  const [cargoFiltro, setCargoFiltro] = useState("Todos");
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    const tipo = localStorage.getItem("tipoUsuario");
    if (!tipo) {
      window.location.href = "/";
    } else {
      setTipoUsuario(tipo);
    }

    // Exemplo de dados fixos (substitua por dados do backend futuramente)
    setFuncionarios([
      { id: 1, nome: "João da Silva", cargo: "Gerente", email: "joao@empresa.com", telefone: "(11) 99999-9999" },
      { id: 2, nome: "Maria Oliveira", cargo: "Atendente", email: "maria@empresa.com", telefone: "(11) 98888-8888" },
      { id: 3, nome: "Carlos Santos", cargo: "Financeiro", email: "carlos@empresa.com", telefone: "(11) 97777-7777" },
    ]);
  }, []);

  const renderMenu = () => {
    const filtrados = funcionarios.filter(f =>
      (cargoFiltro === "Todos" || f.cargo === cargoFiltro) &&
      (f.nome.toLowerCase().includes(busca.toLowerCase()) || String(f.id).includes(busca))
    );

    const conteudo = (
      <div className={styles.container}>
        <h1 className={styles.title}>Funcionários</h1>

        <div className={styles.filtros}>
          <input
            type="text"
            placeholder="Pesquisar por nome ou ID..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className={styles.inputBusca}
          />

          <select
            value={cargoFiltro}
            onChange={(e) => setCargoFiltro(e.target.value)}
            className={styles.selectFiltro}
          >
            <option>Todos</option>
            <option>Gerente</option>
            <option>Atendente</option>
            <option>Financeiro</option>
            <option>TI</option>
          </select>

          <button className={styles.botaoNovo}>+ Novo</button>
        </div>

        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((f) => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.nome}</td>
                <td>{f.cargo}</td>
                <td>{f.email}</td>
                <td>{f.telefone}</td>
                <td>
                  <button className={styles.editar}>Editar</button>
                  <button className={styles.excluir}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    if (tipoUsuario === "admin") {
      return <MenuDonos isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>{conteudo}</MenuDonos>;
    } else if (tipoUsuario === "user") {
      return <MenuUsers isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>{conteudo}</MenuUsers>;
    } else {
      return <p>Carregando...</p>;
    }
  };

  return <>{renderMenu()}</>;
}

export default Configuracoes;