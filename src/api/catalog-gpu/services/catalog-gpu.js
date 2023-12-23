'use strict';

/**
 * catalog-gpu service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::catalog-gpu.catalog-gpu');
