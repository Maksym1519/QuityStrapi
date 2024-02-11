'use strict';

/**
 * quick-deploy controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::quick-deploy.quick-deploy');
