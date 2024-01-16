'use strict';

/**
 * catalog-farm service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::catalog-farm.catalog-farm');
