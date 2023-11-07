import React, { useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import toast from 'react-simple-toasts';
import * as dayjs from 'dayjs';

import { fetchCars, deleteCar } from "../slices/cars";

import '../App.css';

const CarsList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cars = useSelector(state => state.cars.data);
    const isLoading = useSelector(state => state.cars.isLoading);
    
    const initFetch = useCallback(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    useEffect(() => {
        initFetch();
    }, [initFetch]);

    const removeCar = (carId) => {
        dispatch(deleteCar({ carId }))
            .unwrap()
            .then(response => {
                toast(response.message, { theme: 'success', duration: 1000, position: 'top-center' });
            })
            .catch(e => {
                toast(e.message, { theme: 'failure', duration: 1000, position: 'top-center' });

                console.error(e);
        });
    };

    const getTableCellElement = (text) => {
        const style = { textAlign: 'center' };

        return (
            <div style={style}>{text}</div>
        );
    }

    const columns = useMemo(
        () => [
            {
                Header: getTableCellElement('Brand'),
                accessor: "brand",
                Cell: (props) => {
                    const brand = props.row.original.brand;

                    return getTableCellElement(brand);
                }
            },
            {
                Header: getTableCellElement("Model"),
                accessor: "model",
                Cell: (props) => {
                    const model = props.row.original.model;

                    return getTableCellElement(model);
                }
            },
            {
                Header: getTableCellElement("Year of Registration"),
                accessor: "year",
                Cell: (props) => {
                    const year = props.row.original.year;

                    return getTableCellElement(year);
                }
            },
            {
                Header: getTableCellElement("Propellant"),
                accessor: "propellant",
                Cell: (props) => {
                    const propellant = props.row.original.propellant;

                    return getTableCellElement(propellant);
                }
            },
            {
                Header: getTableCellElement("Price (in DKK)"),
                accessor: "price",
                Cell: (props) => {
                    const price = props.row.original.price;
                    const formattedPrice = new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(price);

                    return getTableCellElement(formattedPrice);
                }
            },
            {
                Header: getTableCellElement("Published on"),
                accessor: "createdAt",
                Cell: (props) => {
                    const publishedDate = props.row.original.createdAt;
                    const formattedPublishedDate = dayjs(publishedDate).format('DD-MM-YYYY HH:mm');

                    return getTableCellElement(formattedPublishedDate);
                }
            },  
            {
                Header: getTableCellElement("Actions"),
                accessor: "actions",
                Cell: (props) => {
                    const carId = props.row.original.carId;

                    return (
                        <div className="car-list-actions">
                            <span onClick={() => { navigate(`/cars/${carId}/view`) }}>
                                <i className="far fa-eye action mr-2" rel="tooltip" title="View" id="edit"></i>
                            </span>

                            <span onClick={() => { navigate(`/cars/${carId}`) }}>
                                <i className="far fa-edit action mr-2" rel="tooltip" title="Edit" id="edit"></i>
                            </span>

                            <span onClick={() => { removeCar(carId) }}>
                                <i className="fa fa-trash-can action mr-2" rel="tooltip" title="Delete" id="edit"></i>
                            </span>
                        </div>
                    );
                },
            },
        ],
        []
    );
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: cars,
    });

    if (isLoading) {
        return (
            <div><i>Loading...</i></div>
        );
    }
    
    if (cars.length === 0) {
        <div><i>There are no cars</i></div>
    }
                                
    return (
        <div className="list row">
            <div className="col-xs-12 col-md-6 col-sm-8 col-lg-6 center-block cars-list-top-panel">
                <h3 className="cars-text">Cars</h3>
                <button type="submit"className="btn btn-primary add-car-btn" onClick={() => { navigate(`/cars/add`); }}>
                    <span><i className="fa fa-plus mr-2"></i>&nbsp;Create</span>
                </button>
            </div>

            <div className="col-md-12 list">
                <table className="table table-striped table-bordered" {...getTableProps()}>
                    <thead>
                    { 
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                { 
                                    headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps()}>{ column.render("Header") }</th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {    
                            rows.map(row => {
                                prepareRow(row);

                                return (
                                    <tr {...row.getRowProps()}>
                                        {
                                            row.cells.map((cell) => {
                                                return (
                                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                                );
                                            })
                                        }
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CarsList;
