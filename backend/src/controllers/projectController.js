const connection = require('../database/connection');


module.exports ={
    async index(request, response) {
        const project = await connection('project')
            .select('*');
        return response.json(project);
    },
    async create(request,response){

    },
    async update(request,response){

    },
    async delete(request,response){

    }
}