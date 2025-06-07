import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaMoneyBillWave,
  FaChartBar,
  FaFileInvoiceDollar,
  FaClock,
  FaCheckCircle,
  FaCog,
  FaHeadset,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";

import styles from "./MenuDonos.module.css";

function MenuDonos({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Carrega o estado do menu do localStorage
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const stored = localStorage.getItem("menuCollapsed");
    return stored === "true"; // retorna true ou false
  });

  // Atualiza o localStorage sempre que o estado mudar
  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      localStorage.setItem("menuCollapsed", !prev);
      return !prev;
    });
  };

  const isActive = (...paths) => paths.includes(location.pathname);

  const menuItems = [
    { icon: <FaHome />, label: "Dashboard", path: "/dashboard" },
    { icon: <FaUser />, label: "Clientes", path: "/clientes" },
    { icon: <FaMoneyBillWave />, label: "Empréstimos", path: "/emprestimos" },
    { icon: <FaChartBar />, label: "Pagamentos Para Hoje", path: "/pagarhoje" },
    { icon: <FaFileInvoiceDollar />, label: "Pagamentos Para O Mês", path: "/pagarmes" },
    { icon: <FaClock />, label: "Pagamentos Atrasados", path: "/pagamentosatrasados" },
    { icon: <FaCheckCircle />, label: "Empréstimos Pagos", path: "/emprestimospagos" },
    { icon: <FaCog />, label: "Configurações", path: "/configuracoes" },
    { icon: <FaHeadset />, label: "Suporte", path: "/suporte" },
    { icon: <FaUserCircle />, label: "Perfil", path: "/perfil" },
  ];

  return (
    <>
      <header className={`${styles.headerTop} ${isCollapsed ? styles.headerCollapsed : ""}`}>
        <button className={styles.menuButton} onClick={toggleSidebar}>
          <FaBars />
        </button>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>MultiAlmeida</div>
          <h2 className={styles.subtitle}>Gestão De Empréstimos</h2>
        </div>
      </header>

      <div className={styles.menuContainer}>
        <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
          <nav className={styles.menu}>
            <ul className={styles.menuUl}>
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`${styles.menuLi} ${isActive(item.path) ? styles.active : ""}`}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  {!isCollapsed && <span className={styles.label}>{item.label}</span>}
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>

      <main className={`${styles.pageContent} ${isCollapsed ? styles.pageContentCollapsed : ""}`}>
        {children}
      </main>
    </>
  );
}

export default MenuDonos;
