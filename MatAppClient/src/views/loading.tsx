import { useContext, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { context } from "../App";
import LogoSVG from "../components/logo";

interface Props {
  children: React.ReactNode;
}

const Loader = (props: Props) => {
  const loading = useContext(context).loading;
  const waiting = useRef(null);
  return (
    <>
      <CSSTransition
        nodeRef={waiting}
        in={loading}
        timeout={800}
        classNames="waiting"
        unmountOnExit
      >
        <div ref={waiting} className="waiting">
          <LogoSVG class="" />
          <div className="fries"></div>
        </div>
      </CSSTransition>
      {props.children}
    </>
  );
};
export default Loader;
