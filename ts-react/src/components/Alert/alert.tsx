import React from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";

interface baseAlertProps {
  closeable?: boolean;
  closeText?: string;
  type?: "success" | "danger" | "info";
  children: React.ReactNode;
  onClose?: () => void;
}

const Alert: React.FC<baseAlertProps> = (props) => {
  const {
    closeable,
    closeText,
    type,
    children,
    onClose,
    ...restProps
  } = props;
  return ReactDOM.createPortal(
    <div className={classnames("alert", `alert-${type}`)} onClick={onClose} {...restProps}>{children}</div>,
    document.body
  )
}


export default Alert;
