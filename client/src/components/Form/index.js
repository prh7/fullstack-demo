import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { carFormValidationSchema } from "../../validations";
import { carManufacturers } from '../../constants';

import "./styles.css";

export const Form = (props) => {
    const navigate = useNavigate();

    const redirectToHomepage = () => {
        navigate('/cars');
    }

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
        props.submitFunc(data);

        return;
    };

    useEffect(() => {
        const { defaultValues } = props;

        if (defaultValues) {
            reset({ 
                ...{
                    brand: defaultValues.brand,
                    model: defaultValues.model,
                    year: defaultValues.year,
                    price: defaultValues.price,
                    propellant: defaultValues.propellant,
                    additionalInfo: defaultValues.additionalInfo
                } 
            });
        }
    }, [props.defaultValues]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="form-group">
                        <label htmlFor="brand"><b>Brand</b></label>
                        <select 
                            name="brand"
                            type="text"
                            {...register('brand')}
                            className="form-select input-box"
                            disabled={props.isDisabled}
                        >
                            {carManufacturers.map((manufacturer, index) => {
                                return (
                                    <option key={index}>{manufacturer}</option>
                                );
                            })}
                        </select>
                        <div className="invalid-feedback">{errors.brand?.message}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="model"><b>Model</b></label>
                        <input
                            name="model"
                            type="text"
                            {...register('model')}
                            className={`form-control input-box ${errors.model ? 'is-invalid' : ''}`}
                            disabled={props.isDisabled}
                        />
                        <div className="invalid-feedback">{errors.model?.message}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="year"><b>Year of Registration</b></label>
                        <input
                            name="year"
                            type="number"
                            {...register('year')}
                            className={`form-control input-box ${errors.year ? 'is-invalid' : ''}`}
                            disabled={props.isDisabled}
                        />
                        <div className="invalid-feedback">{errors.year?.message}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price"><b>Price (in DKK)</b></label>
                        <input
                            name="price"
                            type="text"
                            {...register('price')}
                            className={`form-control input-box ${errors.price ? 'is-invalid' : ''}`}
                            disabled={props.isDisabled}
                        />
                        <div className="invalid-feedback">{errors.price?.message}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="propellant"><b>Propellant</b></label>
                        <select 
                            name="propellant"
                            type="text"
                            {...register('propellant')}
                            className="form-select input-box"
                            disabled={props.isDisabled}
                        >
                            <option>Petrol</option>
                            <option>Diesel</option>
                            <option>Electric</option>
                            <option>Hybrid</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="additionalInfo"><b>Additional Information</b></label>
                        <textarea 
                           name="additionalInfo"
                           type="text"
                           {...register('additionalInfo')}
                           className="form-control input-box"
                           disabled={props.isDisabled}
                        />
                    </div>

                    <div className="form-group form-btns">
                        { props.isDisabled ? null : <button type="submit" className="btn btn-primary" >
                            <i className="far fa-save action mr-2" />&nbsp;
                            {props.submitBtnLabel}
                        </button> }
                        
                        <button type="button" onClick={redirectToHomepage} className="btn btn-info btn-pad">
                            <i className="fa fa-chevron-left action mr-2" />&nbsp;
                            {props.returnBtnLabel}
                        </button>
                    </div> 
                </div>
            </form>
        </>
    );
};

export default Form;
