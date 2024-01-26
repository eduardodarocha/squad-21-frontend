import { Alert } from "@mui/material";
import { AlertComponentProps } from "./types";

const AlertComponent = ({severity, title}: AlertComponentProps) => {
    return(
        <Alert variant="filled" severity={severity} style={{width: "320px"}}>
           {title}
        </Alert>
    );
}
export default AlertComponent;