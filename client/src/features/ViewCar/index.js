import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';

import Form from "../../components/Form";
import Input from "../../components/Input";
import Select from "../../components/Select";
import TextArea from "../../components/Textarea";
import Button from "../../components/Button";
import { carManufacturers, propellants } from "../../constants";

import './styles.css';

const ViewCar = () => {
    const { carId }= useParams();

    const navigate = useNavigate();
    const cars = useSelector(state => state.cars.data);

    const getCar = carId => {
        const carFound = cars.find(car => car.carId === carId);

        return carFound;
    };

    const car = getCar(carId);
    const formattedCar = {
        ...car,
        price: new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(car.price)
    }

    const redirectToHomepage = () => {
        navigate('/cars');
    }
    
    return (
        <div className="view-car-container">
            <h2><b>Car Details</b></h2>
            <Form submitFunc={null} defaultValues={formattedCar}>
                <Select name="brand" label="Brand" disabled={true} type="text" className="form-select input-box" options={carManufacturers}/>
                <Input name="model" label="Model" disabled={true} type="text" className="form-control input-box" />
                <Input name="year" label="Year of Registration" disabled={true} type="number" className="form-control input-box" />
                <Input name="price" label="Price (in DKK)" disabled={true} type="text" className="form-control input-box" />
                <Select name="propellant" label="Propellant" options={propellants} disabled={true} type="text" className="form-select input-box" />
                <TextArea name="additionalInfo" label="Addition Information" disabled={true} type="text" className="form-control input-box"/ >

                <div className="form-group form-btns">
                    <Button btnClass="btn-info btn-pad" label="Back" iconClass="fa fa-chevron-left" type="button" clickFunc={redirectToHomepage} />
                </div> 
            </Form>
        </div>

    );
}

export default ViewCar;