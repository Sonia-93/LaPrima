import React from 'react';
import { IoClose } from 'react-icons/io5';

function DashboardModal({ open, onClose, title, children }) {
    if (!open) return null;

    return (
        <div className="dashboard-modal-backdrop" onClick={onClose} role="presentation">
            <div
                className="dashboard-modal"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="dashboard-modal-title"
            >
                <div className="dashboard-modal-header">
                    <h2 id="dashboard-modal-title" className="dashboard-modal-title">{title}</h2>
                    <button type="button" className="dashboard-modal-close" onClick={onClose} aria-label="Close">
                        <IoClose />
                    </button>
                </div>
                <div className="dashboard-modal-body">{children}</div>
            </div>
        </div>
    );
}

export default DashboardModal;
