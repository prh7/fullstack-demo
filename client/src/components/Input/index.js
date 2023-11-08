import React from "react";

import './styles.css';

function Input({ label, register, name, errors, ...rest }) {
    
    return (
        <div className="form-group">
            <label htmlFor={name}><b>{label}</b></label>
            <input {...register(name)} {...rest} />
            <div className="invalid-feedback">{errors[name]?.message}</div>
        </div>
    );
}

export default Input;