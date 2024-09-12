'use strict';
import { DateDataType, Model } from "sequelize";
interface usersAttributes {

    services: string
    image: string
 

}

module.exports = (sequelize: any, DataTypes: any) => {
    class users extends Model<usersAttributes> implements usersAttributes {

        services!: string
        image!: string

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
        services: { type: DataTypes.STRING },
        image: { type: DataTypes.STRING}


    }, {
        sequelize,
        modelName: 'services',
    });
    return users;
}; 