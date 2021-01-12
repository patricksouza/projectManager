import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import swal from 'sweetalert';

import logo from '../../assets/fpf-logo.svg';
import './style.css';

import api from '../../services/api';

export default function Home() {

    const [projects, setProjects] = useState([]);


    useEffect(() => {
        api.get('/project').then((response) => {
            setProjects(response.data);
        });
    });

    async function handleDelete(id) {
        await api.delete(`/project/delete/${id}`);
    }

    return (
        <>
            <div>
                <nav className='navbar navbar-light bg-light shadow'>
                    <div className='row d-flex justify-content-between'>
                        <div className='col-10'>
                            <img
                                src={logo}
                                width='120'
                                className='d-inline-block align-top'
                                alt=''
                                loading='lazy'
                            />
                        </div>
                        <div className='col'>
                            <h6 className='text-uppercase text-secondary'>Gerenciador de projetos</h6>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="container py-4">
                <div className="row d-flex justify-content-start">
                    <div className="col-0">
                        <Link className="btn btn-sm btn-success" to="/new">Novo projeto</Link>
                    </div>
                </div>
            </div>
            <div className="container py-2">
                <div className="table-responsive">
                    <table className="table table-hover shadow">
                        <thead>
                            <tr>
                                <th scope="col">Projeto</th>
                                <th scope="col">Data do início</th>
                                <th scope="col">Data do término</th>
                                <th scope="col">Investimento</th>
                                <th scope="col">Participantes</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((item, key, array) => (
                                <tr key={key}>
                                    <td>{item.name}</td>
                                    <td>{item.start_date}</td>
                                    <td>{item.finish_date}</td>
                                    <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.budget)}</td>
                                    <td>{Array.from(array[key]['participants']).map((item, key, array) => (
                                        <span key={key}><p className="item-list">
                                            {item}</p></span>
                                    ))}</td>
                                    <td>

                                        <Link className="btn btn-outline-secondary mb-4 mx-2" to="/edit">
                                            <FaRegEdit />
                                        </Link>

                                        <button className="btn btn-outline-danger mb-4" onClick={() => {
                                            swal({
                                                title: "Deletar projeto?",
                                                text: "",
                                                icon: "warning",
                                                buttons: true,
                                                dangerMode: true,
                                            })
                                                .then((willDelete) => {
                                                    if (willDelete) {
                                                        swal("Projeto deletado", {
                                                            icon: "success",
                                                        });
                                                        handleDelete(item.id)
                                                    }
                                                    else {
                                                        swal("Projeto não deletado", {
                                                            icon: "warning",
                                                        });
                                                    }
                                                })
                                        }}><FaTrashAlt /></button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
