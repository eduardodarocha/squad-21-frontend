export interface ModalComponentProps {
    open: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
    children?: JSX.Element;
    width: string;
    height?: string;
    hasCloseButton?: boolean;
    hasBorderRadius?: boolean;
    bottom?: number;
}