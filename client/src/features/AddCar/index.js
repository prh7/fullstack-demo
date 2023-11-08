import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from 'react-simple-toasts';

import Form from "../../components/Form";
import Input from "../../components/Input";
import Select from "../../components/Select";
import TextArea from "../../components/Textarea";
import Button from "../../components/Button";
import { addCar } from "../../slices/cars";
import { propellants, carManufacturers } from "../../constants";

import './styles.css';

const AddCar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const saveCar = (data) => {
        dispatch(addCar({ data }))
            .unwrap()
            .then(response => {
                toast(response.message, { theme: 'success', duration: 1000, position: 'top-center' });

                navigate('/cars');
            })
            .catch(e => {
                console.error(e);

                toast(e.message, { theme: 'failure', duration: 1000, position: 'top-center' });
            });

        return;
    };

    const redirectToHomepage = () => {
        navigate('/cars');
    }

    const defaultValues = {
        brand: '',
        model: '',
        year: null,
        price: null,
        propellant: '',
        additionalInfo: ''
    };

    return (
        <div className="add-car-container">
            <h2>Create Car</h2>
            <Form submitFunc={saveCar} defaultValues={defaultValues}>
                <Select name="brand" label="Brand" options={carManufacturers} disabled={false} type="text" className="form-select textbox" />
                <Input name="model" label="Model" disabled={false} type="text" className="form-control textbox" />
                <Input name="year" label="Year of Registration" disabled={false} type="number" className="form-control textbox" />
                <Input name="price" label="Price (in DKK)" disabled={false} type="number" className="form-control textbox" />
                <Select name="propellant" label="Propellant" options={propellants} disabled={false} type="text" className="form-select textbox" />
                <TextArea name="additionalInfo" label="Addition Information" disabled={false} type="text" className="form-control textbox"/ >

                <div className="form-group form-btns">
                    <Button btnClass="btn-primary" label="Save" iconClass="far fa-save" type="submit" clickFunc={null}/>
                    <Button btnClass="btn-info btn-pad" label="Back" iconClass="fa fa-chevron-left" type="button" clickFunc={redirectToHomepage} />
                </div> 
            </Form>
        </div>
    );
};

export default AddCar;