'use strict';

const crypto = require('../crypto');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      { usuario: 'moonie', senha: crypto.encrypt('007') },
      { usuario: 'kay', senha: crypto.encrypt('404') },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
