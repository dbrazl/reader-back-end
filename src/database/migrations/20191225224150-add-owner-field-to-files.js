module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('files', 'owner', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('files', 'owner');
  },
};
