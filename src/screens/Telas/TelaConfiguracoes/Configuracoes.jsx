import React, { useEffect, useState } from "react";
import MenuDonos from "../../../components/MenuDonos/MenuDonos";
import MenuUsers from "../../../components/MenuUsers/MenuUsers";
import styles from "./Configuracoes.module.css";

function Configuracoes({ isCollapsed, toggleSidebar }) {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [configuracoes, setConfiguracoes] = useState([
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

  const filteredConfiguracoes = configuracoes.filter((configuracao) =>
    configuracao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    configuracao.id.toString().includes(searchTerm)
  );

  const renderConfiguracoes = () => (
    <div className={styles.container}>
      <div className={styles.filtros}>
        <input
          type="text"
          placeholder="Pesquisar por nome ou ID..."
          className={styles.inputBusca}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.botaoNovo}>+ Novo Funcionário</button>
      </div>

      <div className={styles.tabelaWrapper}>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Funcionario</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredConfiguracoes.length > 0 ? (
              filteredConfiguracoes.map((configuracao) => (
                <tr className={styles.tabelaRow} key={`${configuracao.id}-${configuracao.nome}`}>
                  <td>{configuracao.id}</td>
                  <td>{configuracao.nome}</td>
                  <td className={styles.acoes}>
                    <button className={styles.botaoEditar}>Editar</button>
                    <button className={styles.botaoExcluir}>Excluir</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className={styles.notFound}>
                  Nenhuma configuração encontrada.
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
        {renderConfiguracoes()}
      </MenuDonos>
    ) : tipoUsuario === "user" ? (
      <MenuUsers isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
        {renderConfiguracoes()}
      </MenuUsers>
    ) : (
      <p>Carregando...</p>
    );

  return <>{renderMenu()}</>;
}

export default Configuracoes;
