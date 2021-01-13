import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaEdit, FaTrashAlt, FaCheck, FaUndoAlt, FaDollarSign, FaPlus } from "react-icons/fa";
import swal from "sweetalert";

import logo from "../../assets/fpf-logo.svg";
import "./style.css";

import api from "../../services/api";

import axios from "axios";

export default function Home() {
    const URL_API_GETDATA = "http://localhost:3333/project";
    const URL_API_UPDATEDATA = "http://localhost:3333/project/update";

    const [projects, setProjects] = useState([]);
    const [newName, setNewName] = useState("");
    const [newStartDate, setNewStartDate] = useState("");
    const [newFinishDate, setNewFinishDate] = useState("");
    const [newBudget, setNewBudget] = useState("");
    const [newProjectRisk, setNewProjectRisk] = useState("");
    const [newParticipants, setNewParticipants] = useState([]);

    const [editMode, setEditMode] = useState({
        status: false,
        rowKey: null,
    });

    const onEdit = ({ id, currentName }) => {
        setEditMode({
            status: true,
            rowKey: id,
        });
    };

    const onCancelEdit = () => {
        setEditMode({
            status: false,
            rowKey: null,
        });
    };

    const updateProject = ({ id, name, start_date, finish_date, budget, project_risk, participants }) => {
        axios
            .put(URL_API_UPDATEDATA, {
                id,
                name,
                start_date,
                finish_date,
                budget,
                project_risk,
                participants
            })
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onSaveEdit = ({ id, name, start_date, finish_date, budget, project_risk, participants }) => {
        updateProject({ id, name, start_date, finish_date, budget, project_risk, participants });
    };

    const fetchApiData = () => {
        axios
            .get(URL_API_GETDATA)
            .then((response) => {
                setProjects(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchApiData();
    });

    async function handleDelete(id) {
        await api.delete(`/project/delete/${id}`);
    }

    return (
        <>
            <div>
                <nav className="navbar shadow">
                    <div className="row d-flex justify-content-between">
                        <div className="col-10">
                            <img
                                src={logo}
                                width="120"
                                className="d-inline-block align-top"
                                alt=""
                                loading="lazy"
                            />
                        </div>
                        <div className="col">
                            <h6 className="text-uppercase text-secondary">
                                Gerenciador de projetos
              </h6>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="container py-4">
                <div className="row d-flex justify-content-start">
                    <div className="col-2">
                        <Link className="btn btn-sm btn-success " to="/new"><FaPlus /> Projeto</Link>
                    </div>
                </div>
            </div>
            <div className="container py-2">
                <div className="table-responsive-lg">
                    <table className="table shadow text-center">
                        <thead>
                            <tr>
                                <th scope="col">Projeto</th>
                                <th scope="col">Data do início</th>
                                <th scope="col">Data do término</th>
                                <th scope="col">Investimento</th>
                                <th scope="col">Risco</th>
                                <th scope="col">Participantes</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((item, key, array) => (
                                <tr key={key}>
                                    <td>
                                        {editMode.status && editMode.rowKey === item.id ? (
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={newName}
                                                onChange={(e) => setNewName(e.target.value)}
                                                required={true}
                                            />
                                        ) : (
                                                item.name
                                            )}
                                    </td>
                                    <td>

                                        {editMode.status && editMode.rowKey === item.id ? (
                                            <input
                                                className="form-control"
                                                type="date"
                                                value={newStartDate}
                                                onChange={(e) => setNewStartDate(e.target.value === null ? item.start_date : newStartDate)}
                                                required={true}
                                            />
                                        ) : (
                                                item.start_date
                                            )}
                                    </td>
                                    <td>
                                        {editMode.status && editMode.rowKey === item.id ? (
                                            <input
                                                className="form-control"
                                                type="date"
                                                value={newFinishDate}
                                                onChange={(e) => setNewFinishDate(e.target.value)}
                                                required={true}
                                            />
                                        ) : (
                                                item.finish_date
                                            )}
                                    </td>
                                    <td>
                                        {editMode.status && editMode.rowKey === item.id ? (
                                            <input
                                                className="form-control"
                                                type="number"
                                                min={0}
                                                value={newBudget === '' ? item.budget : newBudget}
                                                onChange={(e) => setNewBudget(e.target.value)}
                                                required={true}
                                            />
                                        ) : Intl.NumberFormat("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        }).format(item.budget)}
                                    </td>

                                    <td>
                                        {editMode.status && editMode.rowKey === item.id ? (
                                            <select
                                                className='form-control'
                                                type='text'
                                                value={newProjectRisk}
                                                onChange={(e) => setNewProjectRisk(e.target.value)}
                                                required={true}>
                                                <option defaultValue='DEFAULT'></option>
                                                <option value='0'>Baixo</option>
                                                <option value='1'>Médio</option>
                                                <option value='2'>Alto</option>
                                            </select>
                                        ) : (
                                                item.project_risk
                                            )}
                                    </td>
                                    <td>
                                        {editMode.status && editMode.rowKey === item.id ? (
                                            <input
                                                className="form-control"
                                                type="text"
                                                onDoubleClick={(e) => setNewParticipants(newParticipants.concat(...item.participants, e.target.value))}
                                                required={true}
                                            />
                                        ) : ''
                                        }
                                        <div className="py-2">
                                            {Array.from(array[key]["participants"]).map(
                                                (item, key, array) => (
                                                    <span key={key}>
                                                        <p className="btn btn-sm btn-outline-secondary disabled mx-1">{item}</p>
                                                    </span>
                                                )
                                            )}
                                        </div>

                                    </td>
                                    <td>
                                        <div className="">
                                            <div className="mb-2">
                                                {editMode.status && editMode.rowKey === item.id ? (
                                                    <React.Fragment>
                                                        <div className="row d-flex justify-content-between">
                                                            <div className="col-1 mx-0 px-0">
                                                                <button
                                                                    className="btn btn-sm btn-success"
                                                                    onClick={() =>
                                                                        onSaveEdit({
                                                                            id: item.id,
                                                                            name: newName,
                                                                            start_date: newStartDate,
                                                                            finish_date: newFinishDate,
                                                                            budget: newBudget,
                                                                            project_risk: newProjectRisk,
                                                                            participants: newParticipants
                                                                        })
                                                                    }
                                                                >
                                                                    <FaCheck />
                                                                </button>
                                                            </div>
                                                            <div className="col-9 mx-0 px-0">
                                                                <button
                                                                    className="btn btn-sm btn-secondary"
                                                                    style={{ marginLeft: 8 }}
                                                                    onClick={() => onCancelEdit()}
                                                                >
                                                                    <FaUndoAlt />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                ) : (
                                                        <button
                                                            className="btn btn-sm btn-secondary"
                                                            onClick={() =>
                                                                onEdit({
                                                                    id: item.id
                                                                })
                                                            }
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                    )}
                                            </div>
                                            <div className="mb-2">
                                                <button className="btn btn-sm btn-success"><FaDollarSign /></button>
                                            </div>
                                            <div className="">
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => {
                                                        swal({
                                                            title: "Deletar projeto?",
                                                            text: "",
                                                            icon: "warning",
                                                            buttons: ['Cancelar', 'Confirmar'],
                                                            dangerMode: true,
                                                        }).then((willDelete) => {
                                                            if (willDelete) {
                                                                swal("Projeto deletado", {
                                                                    icon: "success",
                                                                });
                                                                handleDelete(item.id);
                                                            } else {
                                                                swal("Projeto não deletado", {
                                                                    icon: "warning",

                                                                });
                                                            }
                                                        });
                                                    }}
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </div>
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