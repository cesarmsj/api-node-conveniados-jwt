const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');

const { secret } = require('../config/config.json');
const db = require('../config/database');



module.exports = {
    authenticate,
    create
};

class InvalidCredentialsException extends Error {

    constructor (message) {
        super(message)
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name
        this.status = 401
    }

    statusCode() {
        return this.status
    }
}

async function authenticate({ Username, UserPassword }) {
    const user = await db.Usuarios.scope('withHash').findOne({ where: { Username } });

    if (!user || !(await bcrypt.compare(UserPassword, user.UserPassword)))
        return { status: 401 };

    // authentication successful
    const Accesstoken = jwt.sign({ sub: user.id }, secret, { expiresIn: '2h' });
    return { ...omitHash(user.get()), Accesstoken };
}

async function create(params) {
    // validate
    console.log(params.Username);
    if (await db.Usuarios.findOne({ where: { Username: params.Username } })) {
        throw 'Username "' + params.Username + '" is already taken';
    }

    // hash password
    if (params.UserPassword) {
        params.UserPassword = await bcrypt.hash(params.UserPassword, 10);
    }

    // save user
    await db.Usuarios.create(params);
}

function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}