import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-simple-toasts';

import { updateCar } from "../slices/cars";
import Form from "../components/Form";

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

    return (
        <div>
            <h2><b>Edit Car Details</b></h2>
            <Form isDisabled={false} submitFunc={updateCarData} defaultValues={getCar(carId)} submitBtnLabel={"Save"} returnBtnLabel={'Back'} />
        </div>
    );
};

export default EditCar;