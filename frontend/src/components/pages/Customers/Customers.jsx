import React, { useEffect, useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import "./Customers.scss";
import Loader from "../../shared/loader/Loader";

const Customers = () => {
    const { url } = useRouteMatch();
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [params, setParams] = useState({
        name: "",
        age: "",
        gender: "",
        city: "",
        modifier: "",
    });

    useEffect(() => {
        setTimeout(() => {
            getResults("");
        }, 1000);
    }, []);

    const getResults = (query) => {
        fetch(`http://127.0.0.1:5000/api/customer${query}`)
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
        <div className="Customers">
            {isLoading && <Loader />}
            {!isLoading && (
                <div className="card">
                    <div className="card-header">
                        <h1>Clientes</h1>
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
                                    <div className="form-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Idade"
                                            onChange={(e) => {
                                                handleFieldChange(e, "age");
                                            }}
                                            value={params.age}
                                        />
                                    </div>
                                </div>
                                <div className="col col-2">
                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            onChange={(e) => {
                                                handleFieldChange(e, "gender");
                                            }}
                                            value={params.gender}
                                        >
                                            <option value="">Sexo</option>
                                            <option value="F">Feminino</option>
                                            <option value="M">Masculino</option>
                                        </select>
                                    </div>
                                </div>
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
                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            onChange={(e) => {
                                                handleFieldChange(
                                                    e,
                                                    "modifier"
                                                );
                                            }}
                                            value={params.modifier}
                                        >
                                            <option value="">
                                                Modificador
                                            </option>
                                            <option value="OR">OR (ou)</option>
                                            <option value="AND">
                                                AND (and)
                                            </option>
                                        </select>
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
                                        <th>Idade</th>
                                        <th>Gênero</th>
                                        <th>Cidade</th>
                                        <th>Ver</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.c.id}>
                                            <td>{item.c.id}</td>
                                            <td>{item.c.name}</td>
                                            <td>{item.c.age}</td>
                                            <td>{item.c.gender}</td>
                                            <td>{item.c.city}</td>
                                            <td>
                                                <Link to={`${url}/${item.c.id}`}>
                                                    Ver
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {!items.length > 0 && <p>Nenhum cliente encontrado.</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customers;
