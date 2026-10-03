const makeRouter = require('../utils/makeRouter');
const News = require('../models/News');

module.exports = makeRouter(News, { searchFields: ['title', 'summary', 'tags'] });