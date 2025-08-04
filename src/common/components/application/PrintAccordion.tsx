import { FC } from "react";
interface IProps {
  children: React.ReactNode;
}

const Accordion: FC<IProps> = ({ children }: IProps) => {
  return (
    <div className="hs-accordion-group">
      <div className="hs-accordio" id="hs-basic-no-arrow-heading-two">
        <button
          className="hs-accordion-toggle hs-accordion-active:text-[#F9F9F9] group inline-flex items-center w-full font-semibold text-left text-[#F9F9F9] transition hover:text-[#F9F9F9] cursor-default"
          aria-controls="hs-basic-no-arrow-collapse-two"
        >
          Accordion #1
        </button>
        <div
          id="hs-basic-no-arrow-collapse-two"
          className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
          aria-labelledby="hs-basic-no-arrow-heading-two"
        >
          <p>{children}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
