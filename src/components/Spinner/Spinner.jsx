import React from 'react';
import styles from './Spinner.module.css';

export default function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <p>Carregando...</p>
    </div>
  );
}
