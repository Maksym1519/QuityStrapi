'use strict';

/**
 * catalog-hard service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::catalog-hard.catalog-hard');
