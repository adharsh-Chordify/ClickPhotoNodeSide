'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User,{foreignKey:'uuid'})
    }
  }
  Post.init({
    id: {
      type: DataTypes.INTEGER, // Assuming it's an integer type
      autoIncrement: true,
    },
    userName:{
      type:DataTypes.STRING,
      allowNull:false
    },
    userImg:{
      type:DataTypes.STRING,
      
    },

    email: {
      type:DataTypes.STRING,
      allowNull:false
    },
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    image: {
      type:DataTypes.STRING,
      allowNull:false
    },
    caption: {
      type:DataTypes.STRING,
      
    }
  }, {
    sequelize,
    tableName:'posts',
    modelName: 'Post',
  });
  return Post;
};