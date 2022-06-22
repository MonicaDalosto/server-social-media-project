'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'stories',
      [
        {
          name: 'First Story',
          content:
            'First Story - Integer lacinia nunc quis nunc egestas, non facilisis nisi consectetur. Donec consectetur purus at magna fermentum molestie. Aenean in leo ultricies, gravida dui ut, euismod sapien. Quisque rutrum mattis accumsan. In a feugiat odio. Sed neque libero, malesuada luctus nisi vitae, dictum tincidunt sem. Pellentesque eget ornare tortor, ac commodo quam. Sed consequat odio ligula, non vehicula neque fringilla id. Maecenas vitae vehicula lacus. Suspendisse potenti. Duis sodales, risus vitae interdum sollicitudin, est sem porta ipsum, in sagittis sem massa quis tortor. Pellentesque iaculis fermentum magna sed semper. Aliquam sit amet pharetra lorem, quis mollis lorem. Mauris venenatis vestibulum mauris.',
          imageUrl:
            'https://images.unsplash.com/photo-1509233725247-49e657c54213?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80',
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 1
        },
        {
          name: 'Second Story',
          content:
            'Second Story - Integer lacinia nunc quis nunc egestas, non facilisis nisi consectetur. Donec consectetur purus at magna fermentum molestie. Aenean in leo ultricies, gravida dui ut, euismod sapien. Quisque rutrum mattis accumsan. In a feugiat odio. Sed neque libero, malesuada luctus nisi vitae, dictum tincidunt sem. Pellentesque eget ornare tortor, ac commodo quam. Sed consequat odio ligula, non vehicula neque fringilla id. Maecenas vitae vehicula lacus. Suspendisse potenti. Duis sodales, risus vitae interdum sollicitudin, est sem porta ipsum, in sagittis sem massa quis tortor. Pellentesque iaculis fermentum magna sed semper. Aliquam sit amet pharetra lorem, quis mollis lorem. Mauris venenatis vestibulum mauris.',
          imageUrl:
            'https://images.unsplash.com/photo-1481018085669-2bc6e4f00eed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 2
        },
        {
          name: 'Third Story',
          content:
            'Third Story - Integer lacinia nunc quis nunc egestas, non facilisis nisi consectetur. Donec consectetur purus at magna fermentum molestie. Aenean in leo ultricies, gravida dui ut, euismod sapien. Quisque rutrum mattis accumsan. In a feugiat odio. Sed neque libero, malesuada luctus nisi vitae, dictum tincidunt sem. Pellentesque eget ornare tortor, ac commodo quam. Sed consequat odio ligula, non vehicula neque fringilla id. Maecenas vitae vehicula lacus. Suspendisse potenti. Duis sodales, risus vitae interdum sollicitudin, est sem porta ipsum, in sagittis sem massa quis tortor. Pellentesque iaculis fermentum magna sed semper. Aliquam sit amet pharetra lorem, quis mollis lorem. Mauris venenatis vestibulum mauris.',
          imageUrl:
            'https://images.unsplash.com/photo-1521252517631-1a6549100bd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 1
        },
        {
          name: 'Fourth Story',
          content:
            'Fourth Story - Integer lacinia nunc quis nunc egestas, non facilisis nisi consectetur. Donec consectetur purus at magna fermentum molestie. Aenean in leo ultricies, gravida dui ut, euismod sapien. Quisque rutrum mattis accumsan. In a feugiat odio. Sed neque libero, malesuada luctus nisi vitae, dictum tincidunt sem. Pellentesque eget ornare tortor, ac commodo quam. Sed consequat odio ligula, non vehicula neque fringilla id. Maecenas vitae vehicula lacus. Suspendisse potenti. Duis sodales, risus vitae interdum sollicitudin, est sem porta ipsum, in sagittis sem massa quis tortor. Pellentesque iaculis fermentum magna sed semper. Aliquam sit amet pharetra lorem, quis mollis lorem. Mauris venenatis vestibulum mauris.',
          imageUrl:
            'https://images.unsplash.com/photo-1602769921397-e870d926e1e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80',
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 2
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('stories', null, {});
  }
};
