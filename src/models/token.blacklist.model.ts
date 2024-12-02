import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class TokenBlacklist extends Model {
    public id!: number;
    public token!: string;
    public expiredAt!: Date;
}

TokenBlacklist.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        expiredAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "TokenBlacklist",
        tableName: "token_blacklist",
        timestamps: false,
    }
);

export default TokenBlacklist;
