'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'spaces',
      [
        {
          title: 'Summer Stories',
          description: 'Funny stories from summer vacations',
          backgroundColor: '#FF5733',
          color: '#F5EBE9',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1
        },
        {
          title: 'Horror Stories',
          description: 'Stories about haunted houses',
          backgroundColor: '#020924',
          color: '#FF0000',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('spaces', null, {});
  }
};
