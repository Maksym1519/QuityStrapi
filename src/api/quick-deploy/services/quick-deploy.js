'use strict';

/**
 * quick-deploy service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::quick-deploy.quick-deploy');
