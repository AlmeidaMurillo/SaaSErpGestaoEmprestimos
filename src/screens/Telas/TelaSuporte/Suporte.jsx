import React, { useEffect, useState } from "react";
import MenuDonos from "../../../components/MenuDonos/MenuDonos";
import MenuUsers from "../../../components/MenuUsers/MenuUsers";
import styles from "./Suporte.module.css";

function Suporte({ isCollapsed, toggleSidebar }) {
  const [tipoUsuario, setTipoUsuario] = useState("");

  useEffect(() => {
    const tipo = localStorage.getItem("tipoUsuario");
    if (!tipo) {
      window.location.href = "/";
    } else {
      setTipoUsuario(tipo);
    }
  }, []);

  const chamados = [
    { id: 1023, status: "Em análise", mensagem: "Não consigo acessar a área de clientes." },
    { id: 1018, status: "Resolvido", mensagem: "Como alterar a senha?" },
    { id: 1015, status: "Pendente", mensagem: "O valor do boleto está incorreto." },
    { id: 1013, status: "Resolvido", mensagem: "Erro ao tentar salvar um novo empréstimo." },
    { id: 1012, status: "Em análise", mensagem: "A data de vencimento está errada no contrato." },
    { id: 1011, status: "Pendente", mensagem: "Como faço para editar os dados de um cliente?" },
    { id: 1010, status: "Resolvido", mensagem: "O botão de salvar não está funcionando no Chrome." },
    { id: 1009, status: "Em análise", mensagem: "Gostaria de saber se posso renegociar as parcelas." },
    { id: 1008, status: "Resolvido", mensagem: "Meu painel aparece em branco após login." },
    { id: 1007, status: "Pendente", mensagem: "Recebi cobrança duplicada neste mês." },
    { id: 1006, status: "Resolvido", mensagem: "Não recebo notificações de vencimento." },
  ];

  const ConteudoSuporte = () => (
    <div className={styles.suporteContainer}>
      <h2 className={styles.titulo}>Central de Suporte</h2>

      <div className={styles.formulario}>
        <label>Assunto:</label>
        <input type="text" placeholder="Digite o assunto da sua dúvida" />

        <label>Mensagem:</label>
        <input type="text" placeholder="Descreva seu problema ou dúvida aqui" />
        <button className={styles.botaoEnviar}>Enviar Solicitação</button>
      </div>

      <div className={styles.historico}>
        <h3>Histórico de Chamados</h3>
        <ul>
          {chamados.map((chamado) => (
            <li key={chamado.id}>
              <strong>#{chamado.id}</strong> - {chamado.status} <br />
              <span>“{chamado.mensagem}”</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderMenu = () => {
    if (tipoUsuario === "admin") {
      return (
        <MenuDonos isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
          <ConteudoSuporte />
        </MenuDonos>
      );
    } else if (tipoUsuario === "user") {
      return (
        <MenuUsers isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
          <ConteudoSuporte />
        </MenuUsers>
      );
    } else {
      return <p>Carregando...</p>;
    }
  };

  return <>{renderMenu()}</>;
}

export default Suporte;
