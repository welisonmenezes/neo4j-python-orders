import React, { useEffect, useState } from "react";
import "./Products.scss";
import Loader from "../../shared/loader/Loader";

const Products = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [params, setParams] = useState({ name: "" });

    useEffect(() => {
        setTimeout(() => {
            getResults("");
        }, 1000);
    }, []);

    const getResults = (query) => {
        fetch(`http://127.0.0.1:5000/api/product${query}`)
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
        let query = "?";
        for (var [key, value] of Object.entries(params)) {
            if (value) {
                query += `${key}=${value}&`;
            }
        }
        if (query) {
            query = query.slice(0, -1);
        }
        getResults(query);
    };

    const handleFieldChange = (e, field) => {
        const newParams = { ...params };
        newParams[field] = e.target.value;
        setParams(newParams);
    };

    return (
        <div className="Products">
            {isLoading && <Loader />}
            {!isLoading && (
                <div className="card">
                    <div className="card-header">
                        <h1>Produtos</h1>
                    </div>
                    <div className="card-body">
                        <div className="form-filter">
                            <div className="row">
                                <div className="col col-2">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nome"
                                            onChange={(e) => {
                                                handleFieldChange(e, "name");
                                            }}
                                            value={params.name}
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
                                        <th>ID</th>
                                        <th>Nome</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.c.id}>
                                            <td>{item.c.id}</td>
                                            <td>{item.c.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {!items.length > 0 && <p>Nenhum produto encontrado.</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
