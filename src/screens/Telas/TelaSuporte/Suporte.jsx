import React, { useEffect, useState } from "react";
import MenuDonos from "../../../components/MenuDonos/MenuDonos";
import MenuUsers from "../../../components/MenuUsers/MenuUsers";
import styles from "./Suporte.module.css";

const ConteudoSuporte = ({
  assunto,
  setAssunto,
  mensagem,
  setMensagem,
  enviando,
  feedback,
  enviarSolicitacao,
  chamados,
  styles,
}) => (
  <main
    className={styles.container}
    role="main"
    aria-labelledby="titulo-suporte"
  >
    <h1 id="titulo-suporte" className={styles.title}>
      Central de Suporte
    </h1>

    <section
      className={styles.supportSection}
      aria-label="Formulário de contato"
    >
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          enviarSolicitacao();
        }}
        noValidate
      >
        <div className={styles.fieldGroup}>
          <label htmlFor="assunto" className={styles.label}>
            Assunto
          </label>
          <input
            id="assunto"
            type="text"
            className={styles.input}
            placeholder="Informe o assunto da sua dúvida"
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            disabled={enviando}
            required
            aria-required="true"
            aria-describedby="assuntoHelp"
          />
          <small id="assuntoHelp" className={styles.helpText}>
            Seja breve e claro.
          </small>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="mensagem" className={styles.label}>
            Mensagem
          </label>
          <textarea
            id="mensagem"
            className={styles.textarea}
            placeholder="Descreva seu problema ou dúvida detalhadamente"
            rows={6}
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            disabled={enviando}
            required
            aria-required="true"
            aria-describedby="mensagemHelp"
          />
          <small id="mensagemHelp" className={styles.helpText}>
            Quanto mais detalhes, melhor.
          </small>
        </div>

        {feedback && (
          <div
            className={
              feedback.tipo === "erro"
                ? styles.feedbackError
                : styles.feedbackSuccess
            }
            role="alert"
            aria-live="polite"
          >
            {feedback.texto}
          </div>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={enviando}
          aria-busy={enviando}
        >
          {enviando ? "Enviando..." : "Enviar Solicitação"}
        </button>
      </form>
    </section>

    <section
      className={styles.historySection}
      aria-label="Histórico de chamados"
    >
      <h2 className={styles.subtitle}>Histórico de Chamados</h2>
      <ul className={styles.ticketList}>
        {chamados.map(({ id, status, mensagem }) => (
          <li key={id} className={styles.ticketCard}>
            <header className={styles.ticketHeader}>
              <span className={styles.ticketId}># {id}</span>
              <span
                className={
                  status === "Resolvido"
                    ? styles.statusResolved
                    : status === "Em análise"
                    ? styles.statusInReview
                    : styles.statusPending
                }
                aria-label={`Status do chamado: ${status}`}
              >
                {status}
              </span>
            </header>
            <p className={styles.ticketMessage}>“{mensagem}”</p>
          </li>
        ))}
      </ul>
    </section>
  </main>
);

function Suporte({ isCollapsed, toggleSidebar }) {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const tipo = localStorage.getItem("tipoUsuario");
    if (!tipo) {
      window.location.href = "/";
    } else {
      setTipoUsuario(tipo);
    }
  }, []);

  const chamados = [
    {
      id: 1023,
      status: "Em análise",
      mensagem: "Não consigo acessar a área de clientes.",
    },
    { id: 1018, status: "Resolvido", mensagem: "Como alterar a senha?" },
    {
      id: 1015,
      status: "Pendente",
      mensagem: "O valor do boleto está incorreto.",
    },
    {
      id: 1013,
      status: "Resolvido",
      mensagem: "Erro ao tentar salvar um novo empréstimo.",
    },
    {
      id: 1012,
      status: "Em análise",
      mensagem: "A data de vencimento está errada no contrato.",
    },
    {
      id: 1011,
      status: "Pendente",
      mensagem: "Como faço para editar os dados de um cliente?",
    },
    {
      id: 1010,
      status: "Resolvido",
      mensagem: "O botão de salvar não está funcionando no Chrome.",
    },
    {
      id: 1009,
      status: "Em análise",
      mensagem: "Gostaria de saber se posso renegociar as parcelas.",
    },
    {
      id: 1008,
      status: "Resolvido",
      mensagem: "Meu painel aparece em branco após login.",
    },
    {
      id: 1007,
      status: "Pendente",
      mensagem: "Recebi cobrança duplicada neste mês.",
    },
    {
      id: 1006,
      status: "Resolvido",
      mensagem: "Não recebo notificações de vencimento.",
    },
  ];

  const enviarSolicitacao = () => {
    if (!assunto.trim() || !mensagem.trim()) {
      setFeedback({
        tipo: "erro",
        texto: "Por favor, preencha todos os campos.",
      });
      setTimeout(() => {
        setFeedback(null);
      }, 2000);
      return;
    }
    setEnviando(true);
    setFeedback(null);

    setTimeout(() => {
      setEnviando(false);
      setAssunto("");
      setMensagem("");
      setFeedback({
        tipo: "sucesso",
        texto: "Sua solicitação foi enviada com sucesso!",
      });

      setTimeout(() => {
        setFeedback(null);
      }, 2000);
    }, 1500);
  };

  const renderMenu = () => {
    if (tipoUsuario === "admin") {
      return (
        <MenuDonos isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
          <ConteudoSuporte
            assunto={assunto}
            setAssunto={setAssunto}
            mensagem={mensagem}
            setMensagem={setMensagem}
            enviando={enviando}
            feedback={feedback}
            enviarSolicitacao={enviarSolicitacao}
            chamados={chamados}
            styles={styles}
          />
        </MenuDonos>
      );
    } else if (tipoUsuario === "user") {
      return (
        <MenuUsers isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
          <ConteudoSuporte
            assunto={assunto}
            setAssunto={setAssunto}
            mensagem={mensagem}
            setMensagem={setMensagem}
            enviando={enviando}
            feedback={feedback}
            enviarSolicitacao={enviarSolicitacao}
            chamados={chamados}
            styles={styles}
          />
        </MenuUsers>
      );
    } else {
      return <p>Carregando...</p>;
    }
  };

  return <>{renderMenu()}</>;
}

export default Suporte;
