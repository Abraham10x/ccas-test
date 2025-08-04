import { motion, AnimatePresence } from "framer-motion";
import { GrClose } from "react-icons/gr";

interface IProps {
  label: string;
  showModal?: boolean;
  onClose?: any;
  children: React.ReactNode;
  id?: any;
}

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalAni = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "100px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const Modal = ({ onClose, showModal, label, children, id }: IProps) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {(showModal ?? false) && (
        <motion.div
          className="backdrop-blur-sm bg-[#95A597]/70 fixed top-0 left-0 w-full h-full z-10 overflow-y-auto"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="w-[90%] md:w-[600px] xl:w-[900px] mx-auto bg-white rounded-lg py-5 px-5"
            variants={modalAni}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">{label}</h2>
              <GrClose className="font-bold cursor-pointer" onClick={onClose} />
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
