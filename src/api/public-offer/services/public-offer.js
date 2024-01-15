'use strict';

/**
 * public-offer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::public-offer.public-offer');
