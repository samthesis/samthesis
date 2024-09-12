'use strict';
import { DateDataType, Model } from "sequelize";
interface usersAttributes {

    // wallet_address: string
    user_name: string
    email: string
    password: string
    latitude: string
    longitude: string
    active: boolean

}

module.exports = (sequelize: any, DataTypes: any) => {
    class users extends Model<usersAttributes> implements usersAttributes {

        // wallet_address!: string
        user_name!: string
        email!: string 
        password!: string 
        latitude!: string
        longitude!: string
        active!: boolean

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
        // wallet_address: { type: DataTypes.STRING },
        user_name: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        latitude: { type: DataTypes.STRING },
        longitude: { type: DataTypes.STRING },
        active: { type: DataTypes.BOOLEAN }


    }, {
        sequelize,
        modelName: 'users',
    });
    return users;
}; 