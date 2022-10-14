const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { secret } = require('../config/config.json');
const db = require('../config/database');

module.exports = {
    authenticate,
    create
};

async function authenticate({ Username, UserPassowrd }) {
    const user = await db.User.scope('withHash').findOne({ where: { Username } });

    if (!user || !(await bcrypt.compare(UserPassword, user.UserPassword)))
        throw 'O usuário ou senha incorreta.';

    // authentication successful
    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '2h' });
    return { ...omitHash(user.get()), token };
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