import React from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


import Form from "../components/Form";

const ViewCar = () => {
    const { carId }= useParams();

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

    console.log(car)

    return (
        <div>
            <h2><b>Car Details</b></h2>
            <Form isDisabled={true} defaultValues={formattedCar} submitBtnLabel={"Save"} returnBtnLabel={'Back'} />
        </div>

    );
}

export default ViewCar;