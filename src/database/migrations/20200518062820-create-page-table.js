'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pages', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      publication_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      html_url: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      css_url: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('pages');
  },
};
