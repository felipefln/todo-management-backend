const { sign, verify } = require('jsonwebtoken');

const createAccessToken = userId => {
    return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    });
};

const createRefreshToken = userId => {
    return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    });
};

const sendAccessToken = (res, req, accesstoken) => {
    res.send({
        accesstoken,
        email: req.body.email,
    });
};

const sendRefreshToken = (res, token) => {
    res.cookie('refreshtoken', token, {
        httpOnly: true,
        path: '/refresh_token',
    });
};

const isAuth = req => {
    const authorization = req.headers['authorization'];
    if (!authorization) throw new Error('You need to login.');
    // Based on 'Bearer ksfljrewori384328289398432'
    const token = authorization.split(' ')[1];
    const { userId } = verify(token, process.env.ACCESS_TOKEN_SECRET);
    return userId;
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken,
    isAuth
};