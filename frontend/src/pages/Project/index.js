import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import swal from "sweetalert";
import "./style.css";

//import logo from "../../assets/fpf-logo.svg";

import api from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";

export default function Project() {
  const [name, setName] = useState("");
  const [start_date, setstart_date] = useState("");
  const [finish_date, setfinish_date] = useState("");
  const [budget, setBudget] = useState("");
  const [project_risk, setproject_risk] = useState("");
  const [participants, setParticipants] = useState([]);

  const history = useHistory();

  function handleDelete(e) {
    e.preventDefault();
    if (participants.length) {
      setParticipants(participants.filter((item, index) => {
        if (index !== e.target.tabIndex) {
          return item;
        }
      }))
    }
  }

  async function handleNewProject(e) {
    e.preventDefault();

    const dataInputs = {
      name,
      start_date,
      finish_date,
      budget,
      project_risk,
      participants,
    };
    try {
      await api.post("/project/new", dataInputs);
      swal({
        title: "Projeto cadastrado",
        text: "Estamos voltando para a tela inicial.",
        icon: "success",
      }).then(() => {
        history.push("/");
      });
    } catch (err) {
      swal({
        title: "Erro ao cadastrar o projeto",
        text: "Por favor, tente novamente!",
        icon: "warning",
      });
      return err;
    }
  }

  return (
    <>
      <div>
        <nav className="navbar navbar-light bg-light shadow-sm">
          <div className="row d-flex justify-content-between">
            <div className="col-10">
              {/** <img
                src={logo}
                width="120"
                className="d-inline-block align-top"
                alt=""
                loading="lazy"
              /> */}
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
        <Link className="btn btn-sm btn-secondary" to="/">
          <FaArrowLeft /> Voltar
        </Link>
      </div>
      <div className="container">
        <form className="">
          <div className="form-row">
            <div className="col mb-3">
              <div className="form-group">
                <label htmlFor="">Nome do projeto</label>
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={true}
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <label htmlFor="">Data de início</label>
                <input
                  className="form-control"
                  type="date"
                  value={start_date}
                  onChange={(e) => setstart_date(e.target.value)}
                  required={true}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="">Data final</label>
              <input
                className="form-control"
                type="date"
                value={finish_date}
                onChange={(e) => setfinish_date(e.target.value)}
                required={true}
              />
            </div>
          </div>
          <hr />
          <div className="form-row">
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label htmlFor="">Valor do investimento</label>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required={true}
                />
              </div>
            </div>
            <div className="col-md-8 mb-3">
              <div className="form-group">
                <label htmlFor="">Risco do projeto</label>
                <select
                  className="form-control"
                  type="text"
                  value={project_risk}
                  onChange={(e) => setproject_risk(e.target.value)}
                  required={true}
                >
                  <option defaultValue="DEFAULT">Selecione um nível</option>
                  <option value="0">Baixo</option>
                  <option value="1">Médio</option>
                  <option value="2">Alto</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col mb-3">
              <div className="form-group">
                <label htmlFor="">Participantes</label>
                <input
                  className="form-control"
                  type="text"
                  onDoubleClick={(e) => {
                    if (e.target.value !== "" && participants.includes(e.target.value) === false) {
                      setParticipants([...participants, e.target.value]);
                    }}
                  }
                  required={true}
                />
                <small className="form-text text-muted">
                  Dê dois cliques para adicionar um participante.
                </small>
              </div>
            </div>
            {participants.length <= 0 ? (
              ""
            ) : (
              <div className="col mb-3">
                <small className="form-text text-muted">
                  Dê dois cliques para remover um participante.
                </small>
                <ul className="list-group">
                  {participants.map((item, key) => (
                    <span key={key}>
                      <li className="list-group-item" onDoubleClick={handleDelete} tabIndex={key}>
                        {item}
                      </li>
                    </span>
                  ))}
                </ul>
              </div>
            )}
            <button
              className="btn btn-block btn-success"
              type="submit"
              onClick={handleNewProject}
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
