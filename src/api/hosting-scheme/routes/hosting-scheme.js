'use strict';

/**
 * hosting-scheme router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::hosting-scheme.hosting-scheme');
