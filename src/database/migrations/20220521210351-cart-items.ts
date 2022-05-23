"use strict";
module.exports = {
  //@ts-ignore
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    return queryInterface.createTable("cartItems", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      cartId: {
        allowNull: false,
        type: Sequelize.UUID,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "carts",
          key: "id",
        },
      },
      productId: {
        allowNull: false,
        type: Sequelize.UUID,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "products",
          key: "id",
        },
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  //@ts-ignore
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("cartItems");
  },
};
