'use strict';

/**
 * quick-deploy router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::quick-deploy.quick-deploy');
