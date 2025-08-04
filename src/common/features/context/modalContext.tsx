import useModal from "@features/hooks/useModal";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const ModalContext = React.createContext({
  modal: false,
  handleModal: (args: any) => {},
  modalContent: "",
});

const ModalProvider = ({ children }: Props) => {
  const { modal, handleModal, modalContent } = useModal();

  const contextValue = {
    modal,
    handleModal,
    modalContent,
  };
  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
