import React from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
}

const Portal: React.FC<PortalProps> = ({
  children,
  className = "",
  isOpen,
  onClose,
}) => {
  const handleContentClick = (e: React.MouseEvent) => {
    // Stop the event from propagating to the parent div
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={` fixed top-0 w-screen h-full flex items-center justify-center bg-[#00000033] z-10 ${className}`}
      onClick={onClose}
    >
      <div onClick={handleContentClick}>{children}</div>
    </div>,
    document.getElementById("portal-root")!
  );
};

export default Portal;
