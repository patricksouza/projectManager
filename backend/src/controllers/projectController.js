const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const data = await connection("project").select("*");

    var project = data.map((item, key, array) => {
      const s_date = new Date(item.start_date);
      const start_date = s_date.toLocaleDateString("pt-br");
      const start_date_unformated = s_date.toISOString().split('T')[0];
      const f_date = new Date(item.finish_date);
      const finish_date = f_date.toLocaleDateString("pt-br");
      const finish_date_unformated = f_date.toISOString().split('T')[0];

      let project_risk = "";
      let project_risk_perc = null;

      switch (item.project_risk) {
        case 0:
          project_risk = "Baixo";
          project_risk_perc = 0.05;
          break;
        case 1:
          project_risk = "Médio";
          project_risk_perc = 0.1;
          break;
        case 2:
          project_risk = "Alto";
          project_risk_perc = 0.2;
          break;
      }
      return {
        id: item.id,
        name: item.name,
        start_date: start_date,
        start_date_unformated: start_date_unformated,
        finish_date: finish_date,
        finish_date_unformated: finish_date_unformated,
        budget: item.budget,
        project_risk: project_risk,
        project_risk_perc: project_risk_perc,
        participants: item.participants,
      };
    });
    return response.json(project);
  },
  async create(request, response) {
    const {
      name,
      start_date,
      finish_date,
      budget,
      project_risk,
      participants,
    } = request.body;

    try {
      await connection("project")
        .insert({
          name,
          start_date,
          finish_date,
          budget,
          project_risk,
          participants,
        })
        .returning("id");
      return response.status(204).send("INSERTED");
    } catch (err) {
      console.log(err);
      return response.json(err.name);
    }
  },

  async update(request, response) {
    const {
      id,
      name,
      start_date,
      finish_date,
      budget,
      projectRisk,
      participants,
    } = request.body;

    var project_risk = 0;

    if (projectRisk == "Médio") {
      project_risk = 1;
    } else if (projectRisk == "Alto") {
      project_risk = 2;
    }
    try {
      const res = await connection("project").where("id", id).update({
        name,
        start_date,
        finish_date,
        budget,
        project_risk,
        participants,
      });
      return response.json(res);
    } catch (err) {
      console.log(err);
      return response.json(err.name);
    }
  },

  async delete(request, response) {
    const { id } = request.params;
    await connection("project")
      .join(
        "project_participant",
        "project.id",
        "=",
        "project_participant.project_id"
      )
      .where("project.id", id)
      .del();
    return response.status(204).send();
  },
};
