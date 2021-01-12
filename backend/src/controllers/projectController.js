const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const data = await connection('project')
            .select('*');
        
        
        var project = data.map((item,key,array)=>{
            let s_date = new Date(item.start_date);
            var start_date = ((s_date.getDate() )) + "/" + ((s_date.getMonth() + 1)) + "/" + s_date.getFullYear();

            let f_date = new Date(item.finish_date);
            var finish_date = ((f_date.getDate() )) + "/" + ((f_date.getMonth() + 1)) + "/" + f_date.getFullYear();

            return {
                id:item.id,
                name:item.name,
                start_date: start_date,
                finish_date:finish_date,
                budget:item.budget,
                project_risk:item.project_risk,
                participants:item.participants
            }
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
            participants
        } = request.body;
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