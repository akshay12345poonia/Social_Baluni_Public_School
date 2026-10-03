const express = require('express');
const crud = require('./crud');
const { protect, authorize } = require('../middleware/authMiddleware');

const ADMIN = ['superadmin', 'admin'];

const makeRouter = (Model, { searchFields = ['title'], writeRoles = ['superadmin', 'admin', 'editor'] } = {}) => {
  const router = express.Router();
  const c = crud(Model, searchFields);

  router.get('/', c.getAll);                                              // public
  router.get('/:idOrSlug', c.getOne);                                     // public
  router.post('/', protect, authorize(...writeRoles), c.create);          // CMS
  router.put('/:id', protect, authorize(...writeRoles), c.update);        // CMS
  router.delete('/:id', protect, authorize(...ADMIN), c.remove);          // CMS

  return router;
};

module.exports = makeRouter;