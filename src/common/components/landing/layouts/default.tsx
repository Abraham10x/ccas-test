import Footer from "../Footer";
import Header from "../Header";

interface IProps {
  children?: React.ReactNode;
}

export const Layout = ({ children }: IProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
