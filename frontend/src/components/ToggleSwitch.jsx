import React from 'react';

const ToggleSwitch = ({ checked, onChange, className }) => {
    return (
        <label className={`switch ${className}`}>
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className="slider round"></span>
        </label>
    );
};

export default ToggleSwitch;
