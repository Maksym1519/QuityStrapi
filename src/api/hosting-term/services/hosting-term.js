'use strict';

/**
 * hosting-term service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::hosting-term.hosting-term');
