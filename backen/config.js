const dotenv = require('dotenv');

dotenv.config();

const config =  {
    MONGODB_URL:process.env.MONGODB_URL || 'localhost://5000/yang_store',
    JWT_SECRET:process.env.JWT_SECRET
}

module.exports = config