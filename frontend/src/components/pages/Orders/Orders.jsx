import React, { useEffect, useState } from "react";
import "./Orders.scss";
import Loader from "../../shared/loader/Loader";

const Orders = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [params, setParams] = useState({ city: "" });

    useEffect(() => {
        setTimeout(() => {
            getResults("http://127.0.0.1:5000/api/order");
        }, 1000);
    }, []);

    const getResults = (url) => {
        fetch(url)
            .then((res) => res.json())
            .then(
                (result) => {
                    setItems(result);
                    setIsLoading(false);
                },
                (error) => {
                    alert(error);
                    setIsLoading(false);
                }
            );
    };

    const filterResults = () => {
        setIsLoading(true);
        let url = "http://127.0.0.1:5000/api/order";
        if (params.city) {
            url = `http://127.0.0.1:5000/api/order/${params.city}`;
        }
        getResults(url);
    };

    const handleFieldChange = (e, field) => {
        const newParams = { ...params };
        newParams[field] = e.target.value;
        setParams(newParams);
    };

    const getRandoKey = () => {
        return Math.random().toString(36).substring(7);
    }

    return (
        <div className="Orders">
            {isLoading && <Loader />}
            {!isLoading && (
                <div className="card">
                    <div className="card-header">
                        <h1>Compras</h1>
                    </div>
                    <div className="card-body">
                        <div className="form-filter">
                            <div className="row">
                                <div className="col col-2">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Cidade"
                                            onChange={(e) => {
                                                handleFieldChange(e, "city");
                                            }}
                                            value={params.city}
                                        />
                                    </div>
                                </div>
                                <div className="col col-2">
                                    <button
                                        className="btn btn-primary"
                                        onClick={filterResults}
                                    >
                                        Filtrar
                                    </button>
                                </div>
                            </div>
                        </div>
                        {items.length > 0 && (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Cliente</th>
                                        <th>Cidade do Cliente</th>
                                        <th>Produto</th>
                                        <th>Data da Compra</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={getRandoKey()}>
                                            <td>{item.c.name}</td>
                                            <td>{item.c.city}</td>
                                            <td>{item.p.name}</td>
                                            <td>{item.r.data}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {!items.length > 0 && <p>Nenhuma compra encontrada.</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
