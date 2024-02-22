'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      messages: {
        type: Sequelize.JSON,
        allowNull: false,
        get() {
          return this.getDataValue('messages') ? JSON.parse(this.getDataValue('messages')) : [];
        },
        set(value) {
          this.setDataValue('messages', JSON.stringify(value));
        }
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('Chats');
  }
};