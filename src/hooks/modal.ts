import { useState } from 'react';

const useModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleModal = () => setIsOpen((prevValue) => !prevValue);
	const closeModal = () => setIsOpen(false);

	return { isOpen, toggleModal, closeModal };
};

export default useModal;
