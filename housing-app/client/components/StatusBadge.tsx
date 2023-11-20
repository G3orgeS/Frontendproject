import React from 'react';
import '../css/components/StatusBadge.css';

interface StatusBadgeProps {
    status: string;
}
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    let statusText = '';
    let badgeClass = '';

    switch (status) {
        case 'untreated':
            statusText = 'Obehandlad';
            badgeClass = 'badge-untreated';
            break;
        case 'Not approved':
            statusText = 'Ej godkänd';
            badgeClass = 'badge-not-approved';
            break;
        case 'approved':
            statusText = 'Godkänd';
            badgeClass = 'badge-approved';
            break;
        default:
            statusText = status;
    }

    return (
        <div className="status-badge-container">
            <div className={`status-badge-circle ${badgeClass}`}></div>
            <p>{statusText}</p>
        </div>
    );
};

export default StatusBadge;