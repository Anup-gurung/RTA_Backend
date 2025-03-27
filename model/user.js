import { DataTypes, Sequelize } from "sequelize";
import bcrypt from "bcrypt";

const Account = Sequelize.define(
    "Account",
    {
        accountId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        roles:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: ["user"],
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
        },
        twoFactorEnabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        deviceManagement:{
            type: DataTypes.JSONB,
            allowNull:true,
            defaultValue: {},
        },     
    },
    {
        hooks: {
            beforeCreate: async (account) => {
                const salt = await bcrypt.genSalt(10);
                account.password = await bcrypt.hash(account.password, salt);
            },
            beforeUpdate: async (account) => {
                if (account.changed("password")) {
                    const salt = await bcrypt.genSalt(10);
                    account.password = await bcrypt.hash(account.password, salt);
                }
            },
        },
    }

)

export default Account;