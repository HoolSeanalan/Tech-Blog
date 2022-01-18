import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';
import bcrypt from 'bcrypt';

class User extends Model {
    hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    checkPassword(pass) {
        return bcrypt.compareSync(pass, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        hooks: {
            async beforeCreate(userData) {
                userData.password = User.hashPassword(userData.password);
            },

            async beforeUpdate(userData) {
                if (userData.changed('password')) {
                    userData.password = User.hashPassword(userData.password);
                }
                return userData;
            },
        },
        sequelize,
        modelName: 'user',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    }
);

export default User;