import React, { useEffect, useState } from "react";
import MenuDonos from "../../../components/MenuDonos/MenuDonos";
import MenuUsers from "../../../components/MenuUsers/MenuUsers";
import styles from "./Parcelas.module.css";

function ParcelasEmprestimo({ isCollapsed, toggleSidebar }) {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [parcelas, setParcelas] = useState([
    {
      numeroParcela: 1,
      idEmprestimo: 1,
      cliente: "BRUNETE",
      dataVencimento: "22/02/2025",
      valor: 2000.0,
      status: "Pago",
    },
    {
      numeroParcela: 2,
      idEmprestimo: 1,
      cliente: "BRUNETE",
      dataVencimento: "22/03/2025",
      valor: 2000.0,
      status: "Pendente",
    },
    {
      numeroParcela: 3,
      idEmprestimo: 2,
      cliente: "CARLOS EDUARDO",
      dataVencimento: "10/03/2025",
      valor: 1500.0,
      status: "Pago",
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

  const alternarStatus = (index) => {
    const novasParcelas = [...parcelas];
    novasParcelas[index].status =
      novasParcelas[index].status === "Pago" ? "Pendente" : "Pago";
    setParcelas(novasParcelas);
  };

  const renderParcelas = () => (
    <div className={styles.container}>
      {parcelas.map((p, index) => (
        <div key={index} className={styles.caixaParcela}>
          <div className={styles.topoParcela}>
            <div className={styles.infoParcela}>
              <p>
                <strong>Número da Parcela:</strong> {p.numeroParcela}
              </p>
              <p>
                <strong>ID do Empréstimo:</strong> {p.idEmprestimo}
              </p>
              <p>
                <strong>Cliente:</strong> {p.cliente}
              </p>
              <p>
                <strong>Data de Vencimento:</strong> {p.dataVencimento}
              </p>
              <p>
                <strong>Valor:</strong> R$ {p.valor.toFixed(2)}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    p.status.toLowerCase() === "pago"
                      ? styles.statusPago
                      : styles.statusPendente
                  }
                >
                  {p.status}
                </span>
              </p>
            </div>
            <button
              className={styles.botaoStatus}
              onClick={() => alternarStatus(index)}
            >
              {p.status === "Pago"
                ? "Marcar como Pendente"
                : "Marcar como Pago"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMenu = () => {
    if (tipoUsuario === "admin") {
      return (
        <MenuDonos isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
          {renderParcelas()}
        </MenuDonos>
      );
    } else if (tipoUsuario === "user") {
      return (
        <MenuUsers isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
          {renderParcelas()}
        </MenuUsers>
      );
    } else {
      return <p>Carregando...</p>;
    }
  };

  return <>{renderMenu()}</>;
}

export default ParcelasEmprestimo;
