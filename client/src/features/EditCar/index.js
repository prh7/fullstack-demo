import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-simple-toasts';

import Form from "../../components/Form";
import Input from "../../components/Input";
import Select from "../../components/Select";
import TextArea from "../../components/Textarea";
import Button from "../../components/Button";
import { updateCar } from "../../slices/cars";
import { propellants, carManufacturers } from "../../constants";

import './styles.css';

const EditCar = () => {
    const { carId }= useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const cars = useSelector(state => state.cars.data);

    const getCar = carId => {
        const carFound = cars.find(car => car.carId === carId);

        return carFound;
    };

    const updateCarData = (car) => {
        const data = {
            brand: car.brand,
            model: car.model,
            year: car.year,
            price: car.price,
            propellant: car.propellant,
            additionalInfo: car.additionalInfo
        };

        dispatch(updateCar({ carId, data }))
            .unwrap()
            .then(response => {
                toast(response.message, { theme: 'success', duration: 1000, position: 'top-center' });

                navigate('/cars');
            })
            .catch(e => {
                toast(e.message, { theme: 'failure', duration: 1000, position: 'top-center' });

                console.error(e);
        });
    };

    const redirectToHomepage = () => {
        navigate('/cars');
    }
    
    return (
        <div className="edit-car-container">
            <h2><b>Edit Car Details</b></h2>
            <Form submitFunc={updateCarData} defaultValues={getCar(carId)}>
                <Select name="brand" label="Brand" options={carManufacturers} disabled={false} type="text" className="form-select input-box" />
                <Input name="model" label="Model" disabled={false} type="text" className="form-control input-box" />
                <Input name="year" label="Year of Registration" disabled={false} type="number" className="form-control input-box" />
                <Input name="price" label="Price (in DKK)" disabled={false} type="number" className="form-control input-box" />
                <Select name="propellant" label="Propellant" options={propellants} disabled={false} type="text" className="form-select input-box" />
                <TextArea name="additionalInfo" label="Addition Information" disabled={false} type="text" className="form-control input-box"/ >

                <div className="form-group form-btns">
                    <Button btnClass="btn-primary" label="Save" iconClass="far fa-save" type="submit" clickFunc={null}/>
                    <Button btnClass="btn-info btn-pad" label="Back" iconClass="fa fa-chevron-left" type="button" clickFunc={redirectToHomepage} />
                </div> 
            </Form>
        </div>
    );
};

export default EditCar;