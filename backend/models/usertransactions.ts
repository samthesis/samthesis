'use strict';
import { DateDataType, Model } from "sequelize";
interface usersAttributes {

    wallet_address: string
    user_name: string
    hash: string
    to_user_id: string
    from_user_id: string
    amount: string

}

module.exports = (sequelize: any, DataTypes: any) => {
    class users extends Model<usersAttributes> implements usersAttributes {

        wallet_address!: string
        user_name!: string
        hash!: string
        to_user_id!: string
        from_user_id!: string
        amount!: string


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
        wallet_address: { type: DataTypes.STRING },
        user_name: { type: DataTypes.STRING },
        hash: { type: DataTypes.STRING },
        to_user_id: { type: DataTypes.STRING },
        from_user_id: { type: DataTypes.STRING },
        amount: { type: DataTypes.STRING }


    }, {
        sequelize,
        modelName: 'usertransactions',
    });
    return users;
}; 