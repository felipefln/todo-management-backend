const { localDB } = require('../database/localDB.js')
const { hash, compare } = require('bcryptjs');
const { createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken } = require('../utils/managerToken')

module.exports = {
    async create(request, response) {
        const { email, password } = request.body;

        try {
            const user = localDB.find(user => user.email === email);
            const hashedPassword = await hash(password, 10);

            if (user) throw new Error('User exist');

            localDB.push({
                id: localDB.length,
                email,
                password: hashedPassword
            })

            response.send({
                message: 'User created'
            })
            console.log(localDB)
        } catch (err) {
            response.send({
                error: `${err.message}`,
            });
        }
    },

    async login(request, response) {
        const { email, password } = request.body;

        try {
            const user = localDB.find(user => user.email === email);
            if (!user) throw new Error('User does not exist');

            const valid = await compare(password, user.password);
            if (!valid) throw new Error('Password not correct');

            const accesstoken = createAccessToken(user.id);
            const refreshtoken = createRefreshToken(user.id);

            user.refreshtoken = refreshtoken;

            sendRefreshToken(response, refreshtoken);
            sendAccessToken(response, request, accesstoken);
        } catch (err) {
            response.send({
                error: `${err.message}`,
            });
        }
    },

    async logout(request, response) {
        response.clearCookie('refreshtoken', { path: '/refresh_token' });

        return response.send({ message: 'Logged out' });
    },

    async refresh(request, response) {
        let payload = null;
        const token = request.cookies.refreshtoken;

        if (!token) return response.send({ accesstoken: '' });

        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
        } catch (err) {
            return response.send({ accesstoken: '' });
        }

        const user = localDB.find(user => user.id === payload.userId);
        if (!user) return response.send({ accesstoken: '' });
        if (user.refreshtoken !== token) return response.send({ accesstoken: '' });

        const accesstoken = createAccessToken(user.id);
        const refreshtoken = createRefreshToken(user.id);

        user.refreshtoken = refreshtoken;
        sendRefreshToken(response, refreshtoken);
        return response.send({ accesstoken });
    }
}