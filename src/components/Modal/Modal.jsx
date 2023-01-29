import { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  render() {
    const { children } = this.props;
    return createPortal(
      <div className={styles.Overlay}>
        <div className={styles.Modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
