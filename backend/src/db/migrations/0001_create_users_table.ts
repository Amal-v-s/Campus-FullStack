import { DataTypes, type QueryInterface } from "sequelize";

export async function up({ context: queryInterface }: { context: QueryInterface }): Promise<void> {
  await queryInterface.createTable("users", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "faculty", "student"),
      allowNull: false,
      defaultValue: "student",
    },
    must_change_password: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    token_version: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  await queryInterface.addIndex("users", ["email"], {
    unique: true,
    name: "users_email_unique",
  });
}

export async function down({ context: queryInterface }: { context: QueryInterface }): Promise<void> {
  await queryInterface.dropTable("users");
}
