import mongoose from 'mongoose';

import { supportedModels } from '../constants';

const { Schema, model } = mongoose;

const carSchema = new Schema(
    {
        carId: { type: String, required: true },
        brand: { type: String, required: true },
        model: { type: String, required: true },
        year: { type: Number, required: true },
        price: { type: Number, required: true },
        currency: { type: String, default: 'dkk' },
        propellant: { type: String, required: true },
        additionalInfo: { type: String, default: null }
    },
    {
        versionKey: false,
        timestamps: true 
    }
);

const carModel = model(supportedModels.car, carSchema);

export default carModel;
