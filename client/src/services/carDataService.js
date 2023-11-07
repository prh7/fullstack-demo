import http from '../utils/httpCommon';

const getCars = () => {
    return http.get("/cars");
};

const getCar = (carId) => {
    return http.get(`/cars/${carId}`);
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
    getCar,
    deleteCar
};
  
export default carDataService;
