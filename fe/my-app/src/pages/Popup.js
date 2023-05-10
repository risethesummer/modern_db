import React,{useState} from "react";
import './Popup.css'
const Popup = ({ children, isOpen, onClose }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="popup-overlay" onClick={handlePopupClose}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            {children}
            <button className="popup-close-btn" onClick={handlePopupClose}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
