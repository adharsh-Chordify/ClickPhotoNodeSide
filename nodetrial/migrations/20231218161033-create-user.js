'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      email: {
        type:Sequelize.STRING,
        allowNull:false
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue:Sequelize.UUIDV4,
        allowNull: false
      },
      fistName: {
        type:Sequelize.STRING,
        allowNull:false
      },
      lastName: {
        type:Sequelize.STRING,
        allowNull:false
      },
      password: {
        type:Sequelize.STRING,
        allowNull:false
      },
      profilepic: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};