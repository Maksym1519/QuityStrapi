'use strict';

/**
 * hosting-scheme service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::hosting-scheme.hosting-scheme');
