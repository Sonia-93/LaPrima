import React from 'react';

function PlaceholderPage({ title, description }) {
    return (
        <div className="placeholder-page">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}

export default PlaceholderPage;
