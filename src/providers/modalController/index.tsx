import { createContext, useMemo, useState } from "react";
import { boolean } from "yup";
import { ProviderProps } from "../types";

type PropsModalControllerContext = {
    isOpen: boolean;
    toggle: () => void;
}

const ModalControllerContext = createContext<PropsModalControllerContext>({} as PropsModalControllerContext);

const ModalControllerProvider = ({children}: ProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const valueContext = useMemo(() => ({isOpen, toggle}), [isOpen]);

    return(
        <ModalControllerContext.Provider value={valueContext}>
            {children}
        </ModalControllerContext.Provider>
    )
};
export {ModalControllerProvider};
export default ModalControllerContext;