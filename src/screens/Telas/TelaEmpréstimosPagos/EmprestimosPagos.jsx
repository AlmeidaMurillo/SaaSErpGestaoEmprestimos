import React, { useEffect, useState } from "react";
import MenuDonos from "../../../components/MenuDonos/MenuDonos";
import MenuUsers from "../../../components/MenuUsers/MenuUsers";
import styles from "./EmprestimosPagos.module.css";

function EmprestimosPagos({ isCollapsed, toggleSidebar }) {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [emprestimosPagos, setEmprestimosPagos] = useState([]);

  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSearchTerm, setModalSearchTerm] = useState("");
  const [modalSearchData, setModalSearchData] = useState("");

  useEffect(() => {
    const tipo = localStorage.getItem("tipoUsuario");
    if (!tipo) {
      window.location.href = "/";
    } else {
      setTipoUsuario(tipo);
    }

    const fakeData = [];
    for (let i = 1; i <= 50; i++) {
      fakeData.push({
        id: i,
        cliente: "Murillo Almeida",
        data: `2025-07-${((i % 30) + 1).toString().padStart(2, "0")}`,
      });
    }
    setEmprestimosPagos(fakeData);
  }, []);

  const filteredPagos = emprestimosPagos.filter(
    (e) =>
      e.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.id.toString().includes(searchTerm)
  );

  const openModal = (client) => {
    setSelectedClient(client);
    setModalSearchTerm("");
    setModalSearchData("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  const limpar = () => {
    setSearchTerm("");
    setModalSearchTerm("");
    setModalSearchData("");
  };

  const clientLoans = selectedClient
    ? emprestimosPagos.filter((e) => e.cliente === selectedClient.cliente)
    : [];

  const filteredClientLoans = clientLoans.filter(
    (e) =>
      e.id.toString().includes(modalSearchTerm) &&
      e.data.includes(modalSearchData)
  );

  const renderModal = () => {
    if (!isModalOpen || !selectedClient) return null;

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalCard}>
          <h2 className={styles.modalTitle}>Empréstimos Pagos</h2>

          <div className={styles.modalInfo}>
            <p>
              <strong>ID Cliente:</strong>{" "}
              <span className={styles.clientId}>{selectedClient.id}</span>
            </p>
            <p>
              <strong>Nome:</strong>{" "}
              <span className={styles.clientName}>
                {selectedClient.cliente}
              </span>
            </p>
            <p>
              <strong className={styles.modalTitleTotalemprestimosPagos}>Total de Empréstimos Pagos:</strong>{" "}
              <span className={styles.loanCount}>
                50
              </span>
            </p>
          </div>

          <div className={styles.modalSearchWrapperDouble}>
            <input
              type="text"
              placeholder="Buscar por ID..."
              value={modalSearchTerm}
              onChange={(e) => setModalSearchTerm(e.target.value)}
              className={styles.modalSearchInputId}
            />
            <input
              type="date"
              value={modalSearchData}
              onChange={(e) => setModalSearchData(e.target.value)}
              className={styles.modalSearchInputDate}
            />
          </div>

          <div className={styles.scrollTable}>
            <table className={styles.modalTabela}>
              <thead>
                <tr>
                  <th>ID Empréstimo</th>
                  <th>Data Empréstimo</th>
                </tr>
              </thead>
              <tbody>
                {filteredClientLoans.length > 0 ? (
                  filteredClientLoans.map((e) => (
                    <tr key={`${e.id}-${e.data}`}>
                      <td>{e.id}</td>
                      <td>{e.data}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className={styles.notFound}>
                      Nenhum empréstimo encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className={styles.modalActions}>
            <button className={styles.btnLimpar} onClick={limpar}>
              Limpar
            </button>
            <button className={styles.btnFechar} onClick={closeModal}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPagos = () => (
    <div className={styles.container}>
      <div className={styles.filtros}>
        <input
          type="text"
          placeholder="Pesquisar por nome ou ID..."
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
            </tr>
          </thead>
          <tbody>
            {filteredPagos.length > 0 ? (
              filteredPagos.map((e) => (
                <tr
                  className={styles.tabelaRow}
                  key={`${e.id}-${e.cliente}`}
                  onClick={() => openModal(e)}
                >
                  <td>{e.id}</td>
                  <td>{e.cliente}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className={styles.notFound}>
                  Nenhum cliente encontrado com este nome ou id.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {renderModal()}
    </div>
  );

  const renderMenu =
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

  return <>{renderMenu}</>;
}

export default EmprestimosPagos;
