const generateUniqueId = require('../utils/generateUniqueId')
const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        const todos = await connection('todos').select('*')

        return response.json(todos)
    },

    async create(request, response) {
        const { name, description, datestart, dateend } = request.body;

        const id = generateUniqueId();

        await connection('todos').insert({
            id,
            name,
            description,
            datestart,
            dateend
        })


        return response.json({ id, name, description, datestart, dateend })
    },

    async delete(request, response) {
        const { id } = request.params;

        await connection('todos')
            .where('id', id)
            .delete()

        return response.status(204).send()
    }
}