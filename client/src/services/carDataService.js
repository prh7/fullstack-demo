import http from '../utils/httpCommon';

const getCars = () => {
    return http.get("/cars");
};

const addCar = (data) => {
    return http.post("/cars", data);
};

const updateCar = (carId, data) => {
    return http.put(`/cars/${carId}`, data);
};

const deleteCar = (carId) => {
    return http.delete(`/cars/${carId}`);
};

const carDataService = {
    getCars,
    addCar,
    updateCar,
    deleteCar
};
  
export default carDataService;
