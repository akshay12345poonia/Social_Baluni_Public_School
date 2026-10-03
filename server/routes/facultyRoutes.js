module.exports = require('../utils/makeRouter')(require('../models/Faculty'), { searchFields: ['name', 'designation'] });
