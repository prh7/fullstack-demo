import React, { useEffect, createElement } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { carFormValidationSchema } from "../../validations";

import "./styles.css";

export const Form = ({ children, submitFunc, defaultValues }) => {
    const { 
        register, 
        reset,
        handleSubmit, 
        formState: { errors } 
    } = useForm({ 
            mode: 'onChange',
            resolver: yupResolver(carFormValidationSchema) 
        });
    
    const onSubmit = data => {
        if (submitFunc) {
            submitFunc(data);
        }

        return;
    };

    useEffect(() => {
        if (defaultValues) {
            reset({ 
                ...defaultValues 
            });
        }
    }, [defaultValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            {Array.isArray(children)
                ? children.map((child) => {
                    return child.props.name
                    ? createElement(child.type, {
                        ...{
                            ...child.props,
                            register,
                            errors,
                            key: child.props.name
                        }
                    })
                    : child;
                })
                : children}
        </form>
    );
};

export default Form;
