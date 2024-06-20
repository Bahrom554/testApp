require('dotenv').config();


module.exports = () => {
    return {
        dbName: process.env.DATABASE_NAME,
        dbHost: process.env.DATABASE_HOST,
        dbPort: process.env.DATABASE_PORT,
        dbUserName: process.env.DATABASE_USERNAME, /* Required If You Want To Build Your Own DB URL */
        dbPassword: process.env.DATABASE_PASSWORD, /* Required If You Want To Build Your Own DB URL */
        isAuthEnabled: process.env.DATABASE_AUTH_ENABLED,
    };
};
