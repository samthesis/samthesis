'use strict';
import { DateDataType, Model } from "sequelize";
interface usersAttributes {

    userId: number
    serviceId: number


}

module.exports = (sequelize: any, DataTypes: any) => {
    class users extends Model<usersAttributes> implements usersAttributes {

        userId!: number
        serviceId!: number



        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate() {
            // define association here
        }
    };
    users.init({

        userId: { type: DataTypes.INTEGER },
        serviceId: { type: DataTypes.INTEGER },

    }, {
        sequelize,
        modelName: 'userservices',
    });
    return users;
}; 