const jwt = require('jsonwebtoken');
const { promisify } = require("util");
const api = require('./api');
const config = require('./config');
const redis = require('./redis');
const Users = require('./database/user');
const client = require('./redis');

exports.login = (req, res, next) => {
    const {token, login, password} = req.body;
    // login with previous token
    if(token && login) {
        jwt.verify(token, config.secret_key, (err) => {
            if(err) {
              // old token
              const error = new Error('Token is old or invalid');
              error.status = 403;
              next(error)
            } else {
                // token is ok
                const newToken = jwt.sign( { login }, config.secret_key, { expiresIn: '1h' }); 
                res.status(200).json({
                    login: login,
                    token: newToken,
                });
            }
        })
    // login with credentials
    } else if(login && password) {
        const user = Users.find((u) => u.login === login);
        // OK
        if(user && user.password === password) {
            const newToken = jwt.sign({ login }, config.secret_key, { expiresIn: '1h' }); 
            res.status(200).json({
                login: login,
                token: newToken,
            });
        // mismatch
        } else {
            const error = new Error(`Login or password mismatch`);
            error.status = 403;
            next(error);
        }
    } else {
        const error = new Error(`Token or credentials haven't been provided`);
        error.status = 403;
        next(error);
    }
}

exports.movie = async (req, res, next) => {
    const { params } = req.body;
    const redisKey = JSON.stringify(params);
    console.log(redisKey)
    try {
        client.get(redisKey, async (err, movies) => {
            if(err) {
                const data = await api.sendRequest(params);
                redis.set(redisKey, JSON.stringify(data));
                res.status(200).send(data);
            } 
            else if(movies) {
                res.status(200).send(JSON.parse(movies));
            } else {
                const data = await api.sendRequest(params);
                redis.set(redisKey, JSON.stringify(data));
                res.status(200).send(data);
            }
        })
    } catch(e) {
        res.send(e.message)
    }
}