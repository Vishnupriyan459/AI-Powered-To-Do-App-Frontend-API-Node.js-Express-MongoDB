import { useEffect } from "react";
export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white max-md:m-4 p-6 rounded-lg w-96 max-h-96 overflow-y-auto" onClick={(e) => e.stopPropagation()} >
        {/* Close button */}
       
        {children}
      </div>
    </div>
  );
}