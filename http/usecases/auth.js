const Models = require('../../schema/main/models');
const config = require('../../config/app')()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register = async (data) => {
    let client = await Models.client.findOne({ where: { id: data.id} });
    if (client) {
        await client.update(data);
    } else {
        client = await Models.client.create(data);
    }

   const token = jwt.sign(
        {
            clientId: client.id
        },
        config.jwtSecretClient,
        { expiresIn: '365d' }
    );

    return {token: token};
}


exports.login = async (data) => {

    const user = await Models.user.findOne({ where: { username: data.username } });
    if (!user) {
        throw new Error('User not found');
    }
    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
        throw new Error('Incorrect password');
    }

    const token = jwt.sign(
        {

            userId: user.id
        },
        config.jwtSecretUser,
        { expiresIn: '365d' }
    );

    return {token};
}