import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import toast from 'react-simple-toasts';

import { addCar } from "../slices/cars";
import Form from "../components/Form";

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

    return (
        <div className="submit-form">
            <h2>Create Car</h2>
            <Form isDisabled={false} submitFunc={saveCar} defaultValues={null} submitBtnLabel={"Save"} returnBtnLabel={'Back'} />
            
        </div>
    );
};

export default AddCar;