import React, { useEffect } from 'react';
import { BoxModal, Container } from './styled';
import PropTypes from 'prop-types';

export const Modal = ({ children }) => {
  useEffect(() => {
    const modalContainer = document.querySelector('.modal-container');

    const handleCloseClick = () => {
      modalContainer.style.top = '-100%';
      modalContainer.style.transform = 'rotate(180deg)';
    };

    const closeModal = document.querySelector('.close-modal');

    closeModal.addEventListener('click', handleCloseClick);

    const handleOpenClick = () => {
      modalContainer.style.top = 0;
      modalContainer.style.transform = 'rotate(360deg)';
    };

    const openModal = document.querySelector('.open-modal');

    openModal.addEventListener('click', handleOpenClick);
  });

  return (
    <Container className="modal-container">
      <BoxModal>
        <p className="close-modal">&times;</p>

        {children}
      </BoxModal>
    </Container>
  );
};

Modal.defaultProps = {
  children: <></>,
};

Modal.propTypes = {
  children: PropTypes.array,
};
