export interface MessageModalProps{
    title: string;
    action?: string;
    icon: JSX.Element;
    hasAction?: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
}
