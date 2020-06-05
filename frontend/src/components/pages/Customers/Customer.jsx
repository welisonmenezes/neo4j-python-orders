import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosUndo } from "react-icons/io";
import "./Customers.scss";
import Loader from "../../shared/loader/Loader";

const Customer = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            getResults(props.match.params.id);
        }, 1000);
    }, [props]);

    const getResults = (id) => {
        fetch(`http://127.0.0.1:5000/api/customer/${id}`)
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

    const getRandoKey = () => {
        return Math.random().toString(36).substring(7);
    };

    return (
        <div className="Customers">
            {isLoading && <Loader />}
            {!isLoading && (
                <>
                    <div className="link-back">
                        <Link to="/dashboard/clientes">
                            <IoIosUndo />
                            Voltar
                        </Link>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            {items.length > 0 && (
                                <div className="row">
                                    <div className="col col-4">
                                        <h2>Informações do Cliente</h2>
                                        <ul className="list-group">
                                            <li className="list-group-item">
                                                <b>Nome: </b>
                                                {items[0].c.name}
                                            </li>
                                            <li className="list-group-item">
                                                <b>Idade: </b>
                                                {items[0].c.age}
                                            </li>
                                            <li className="list-group-item">
                                                <b>Cidade: </b>
                                                {items[0].c.city}
                                            </li>
                                            <li className="list-group-item">
                                                <b>Gênero: </b>
                                                {items[0].c.gender}
                                            </li>
                                            <li className="list-group-item">
                                                <b>ID: </b>
                                                {items[0].c.id}
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col col-7 offset-1">
                                        <h2>Compras</h2>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Produto</th>
                                                    <th>Data da Compra</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.map((item) => (
                                                    <tr key={getRandoKey()}>
                                                        <td>{item.p.name}</td>
                                                        <td>{item.r.data}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                            {!items.length > 0 && (
                                <p>Nenhum cliente encontrado.</p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Customer;
