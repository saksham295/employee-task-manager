import { DataTypes } from "sequelize";

function employee(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    hireDate: { type: DataTypes.STRING },
    position: { type: DataTypes.STRING },
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("Employee", attributes, options);
}

export default employee;
