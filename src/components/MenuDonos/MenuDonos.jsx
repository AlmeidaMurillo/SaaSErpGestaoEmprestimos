import React, { useState, useEffect } from "react";
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

  const [isCollapsed, setIsCollapsed] = useState(() => {
    const stored = localStorage.getItem("menuCollapsed");
    return stored === "true";
  });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setIsCollapsed(true);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <header className={styles.headerTop}>
        <button className={styles.menuButton} onClick={toggleSidebar} aria-label="Toggle menu">
          <FaBars />
        </button>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>MultiAlmeida</div>
          <h2 className={styles.subtitle}>Gestão De Empréstimos</h2>
        </div>
      </header>

      <div className={`${styles.container} ${isCollapsed ? styles.collapsed : ""}`}>
        <aside className={styles.sidebar} onClick={() => window.innerWidth <= 768 && setIsCollapsed(true)}>
          <nav>
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

        <main className={styles.pageContent}>{children}</main>
      </div>
    </>
  );
}

export default MenuDonos;
