'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      userName:{
        type:Sequelize.STRING,
        allowNull:false
      },
      userImg:{
        type:Sequelize.STRING,
        
      },
      
      email: {
        type:Sequelize.STRING,
        allowNull: false
      },
      uuid: {
        type:Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      image: {
        type:Sequelize.STRING,
        allowNull: false
      },
      caption: {
        type:Sequelize.STRING,
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
    await queryInterface.dropTable('posts');
  }
};