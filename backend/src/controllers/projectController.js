const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const project = await connection('project')
            .select('*');
        return response.json(project);
    },
    async create(request, response) {
        const {
            name,
            start_date,
            finish_date,
            budget,
            project_risk,
            participants
        } = request.body;

        console.log(request.body);

        var participants_name = participants.map((item) => {
            return item;
        });

        try {
            const [project_id] = await connection('project').insert({ name, start_date, finish_date, budget, project_risk, participants }).returning('id');
            return response.status(204).send('INSERTED');
        } catch (err) {
            console.log(err);
            return response.json(err.name);
        }
    },

    async update(request, response) {
        const { id, data } = request.params;

        try {
            const project = await connection('project')
                .where('id', id)
                .update(data);
            return response.json('updated');
        } catch (err) {
            console.log(err);
            return response.json(err.name);
        }
    },

    async delete(request, response) {
        const { id } = request.params;
        const project = await connection('project')
            .join('project_participant', 'project.id', '=', 'project_participant.project_id')
            .where('project.id', id)
            .del();
        return response.status(204).send()

    }
}