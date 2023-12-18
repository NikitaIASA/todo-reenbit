import { useState, useEffect } from 'react';

export const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => setIsModalOpen(false);

    // Prevent page scrolling while the modal is open.
    useEffect(() => {
        isModalOpen && document.body.classList.add("modal-open");
        !isModalOpen && document.body.classList.remove("modal-open");
    }, [isModalOpen]);

    return { isModalOpen, openModal, closeModal };
}
