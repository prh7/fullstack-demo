import React from "react";

const Textarea = ({ label, register, name, errors, ...rest}) => {
    
    return (
        <div className="form-group">
            <label htmlFor={name}><b>{label}</b></label>
            <textarea {...register(name)} {...rest} />
        </div>
    );
};

export default Textarea;
