import { DataTypes } from "sequelize";
import sequelize from "../index.js";
import Usuario from "./Usuario.js";

const Boleto = sequelize.define(
  "Boleto",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Usuario,
        key: "id",
      },
    },
    fornecedor_nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    valor: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        min: 0.01,
      },
    },
    data_vencimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    data_pagamento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pendente", "pago", "vencido", "cancelado"),
      allowNull: false,
      defaultValue: "pendente",
    },
  },
  {
    tableName: "boleto",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    validate: {
      pagamentoConsistente() {
        if (this.status === "pago" && !this.data_pagamento) {
          throw new Error("Boleto pago precisa ter uma data de pagamento.");
        }
      },
    },
  },
);

Usuario.hasMany(Boleto, { foreignKey: "usuario_id" });
Boleto.belongsTo(Usuario, { foreignKey: "usuario_id" });

export default Boleto;
