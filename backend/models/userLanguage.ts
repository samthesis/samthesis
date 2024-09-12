'use strict';
import { DateDataType, Model } from "sequelize";
interface usersAttributes {

    user_Language: string
    userId: number;


}

module.exports = (sequelize: any, DataTypes: any) => {
    class users extends Model<usersAttributes> implements usersAttributes {

        user_Language!: string
        userId!: number;

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
        user_Language: { type: DataTypes.STRING },
        userId: { type: DataTypes.INTEGER },



    }, {
        sequelize,
        modelName: 'userLanguages',
    });
    return users;
}; 