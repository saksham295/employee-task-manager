import { DataTypes } from "sequelize";

function task(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    dueDate: { type: DataTypes.DATE },
    employeeId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Employees",
        key: "id",
        onDelete: "SET NULL",
      },
    },
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("Task", attributes, options);
}

export default task;
