import { createContext, useMemo, useState } from "react";
import { ProviderProps } from "../types";

type ImageControllerContextProps = {
    image: File | null | undefined;
    toggleImage: (value: File | null | undefined) => void;
};

const ImageControllerContext = createContext<ImageControllerContextProps>({} as ImageControllerContextProps);

const ImageControllerProvider = ({ children }: ProviderProps) => {
    const [image, setImage] = useState<File | null>();

    const toggleImage = (value: File | null | undefined) => {
        setImage(value);
        console.log(image);
        
    };

    const contextValue = useMemo(() => ({ image, toggleImage }), [image]);

    return (
        <ImageControllerContext.Provider value={contextValue}>
            {children}
        </ImageControllerContext.Provider>
    );
};

export { ImageControllerProvider, ImageControllerContext };
