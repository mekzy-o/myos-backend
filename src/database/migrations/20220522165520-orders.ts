"use strict";
module.exports = {
  //@ts-ignore
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
    );
    return queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id",
        },
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
      totalAmount: {
        allowNull: false,
        type: Sequelize.DECIMAL(20, 2).UNSIGNED,
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
    await queryInterface.dropTable("orders");
  },
};
