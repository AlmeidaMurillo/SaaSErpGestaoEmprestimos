import React, { useEffect, useState } from "react";
import MenuDonos from "../../../components/MenuDonos/MenuDonos";
import MenuUsers from "../../../components/MenuUsers/MenuUsers";
import styles from "./Configuracoes.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Configuracoes({ isCollapsed, toggleSidebar }) {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [configuracoes, setConfiguracoes] = useState([
    { id: 1, nome: "João Silva" },
    { id: 2, nome: "Ana Oliveira DA SILVA DIAS DE ALMEIDA " },
    { id: 3, nome: "Pedro Santos" },
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 4,
      nome: "Pedro Santos",
    })),
  ]);

  const [modalAberto, setModalAberto] = useState(false);

  const [novoFuncionario, setNovoFuncionario] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    cargo: "",
    permissao: "comum",
  });

  useEffect(() => {
    const tipo = localStorage.getItem("tipoUsuario");
    if (!tipo) {
      window.location.href = "/";
    } else {
      setTipoUsuario(tipo);
    }
  }, []);

  const filteredConfiguracoes = configuracoes.filter(
    (configuracao) =>
      configuracao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      configuracao.id.toString().includes(searchTerm)
  );

  const abrirModal = () => {
    setNovoFuncionario({
      nome: "",
      email: "",
      senha: "",
      telefone: "",
      cargo: "",
      permissao: "comum",
    });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoFuncionario((prev) => ({ ...prev, [name]: value }));
  };

  const salvarFuncionario = (e) => {
    e.preventDefault();
    if (!novoFuncionario.nome.trim()) {
      alert("Por favor, insira o nome.");
      return;
    }
    const novoId = configuracoes.length
      ? Math.max(...configuracoes.map((c) => c.id)) + 1
      : 1;

    setConfiguracoes((prev) => [
      ...prev,
      { id: novoId, nome: novoFuncionario.nome.trim() },
    ]);
    setModalAberto(false);
  };

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
        <button className={styles.botaoNovo} onClick={abrirModal}>
          + Novo Funcionário
        </button>
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
                <tr
                  className={styles.tabelaRow}
                  key={`${configuracao.id}-${configuracao.nome}`}
                >
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

      {modalAberto && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>Novo Funcionário</h2>
            <form onSubmit={salvarFuncionario} className={styles.formModal}>
              <label>
                Nome completo:
                <input
                  type="text"
                  name="nome"
                  placeholder="Ex: João da Silva"
                  value={novoFuncionario.nome}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  placeholder="Ex: exemplo@gmail.com"
                  value={novoFuncionario.email}
                  onChange={handleChange}
                />
              </label>
              <label className={styles.senhaLabel}>
                Senha:
                <div className={styles.inputSenhaWrapper}>
                  <input
                    type={mostrarSenha ? "text" : "password"}
                    name="senha"
                    placeholder="Digite a senha do funcionário"
                    value={novoFuncionario.senha}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className={styles.toggleSenha}
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                  >
                    {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </label>
              <label>
                Telefone:
                <input
                  type="tel"
                  name="telefone"
                  placeholder="Ex: (11) 91234-5678"
                  value={novoFuncionario.telefone}
                  onChange={handleChange}
                />
              </label>
              <label>
                Cargo:
                <input
                  type="text"
                  name="cargo"
                  placeholder="Ex: Gerente, Vendedor"
                  value={novoFuncionario.cargo}
                  onChange={handleChange}
                />
              </label>
              <label>
                Permissão:
                <select
                  name="permissao"
                  value={novoFuncionario.permissao}
                  onChange={handleChange}
                >
                  <option value="comum">Comum</option>
                  <option value="admin">Administrador</option>
                </select>
              </label>
              <div className={styles.botoesModal}>
                <button type="submit" className={styles.botaoSalvar}>
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={fecharModal}
                  className={styles.botaoCancelar}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
