import React from "react";

import "./styles.css";

function Select({ value, label, register, options, name, errors, ...rest }) {

    return (
        <div className="form-group">
            <label htmlFor={name}><b>{label}</b></label>
            <select {...register(name)} {...rest}>
                <option value="" disabled hidden>{`Select a ${name}`}</option>
                { options.length && options.map((value, index) => (
                    <option key={index} value={value}>{value}</option>
                )) }
            </select>
            { errors && <div className="invalid-feedback">{errors[name]?.message}</div> }
        </div>
        
    );
}

export default Select;