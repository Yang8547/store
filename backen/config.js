const dotenv = require('dotenv');

dotenv.config();

const config =  {
    MONGODB_URL:process.env.MONGODB_URL || 'mongodb://localhost/store'
}

module.exports = config