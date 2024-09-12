'use strict';
import { DateDataType, Model } from "sequelize";
interface usersAttributes {

    fromUserId: number
    toUserId: number
    amount: number
    paymentType: string
    longitude: string
    latitude: string
    duration: string
    date: string
    serviceId: string
    status: number
    rating: number

}

module.exports = (sequelize: any, DataTypes: any) => {
    class users extends Model<usersAttributes> implements usersAttributes {

        fromUserId!: number
        toUserId!: number
        amount!: number
        paymentType!: string
        longitude!: string
        latitude!: string
        duration!: string
        date!: string
        serviceId!: string
        status!: number
        rating!: number

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

        fromUserId: { type: DataTypes.INTEGER },
        toUserId: { type: DataTypes.INTEGER },
        amount: { type: DataTypes.FLOAT },
        paymentType: { type: DataTypes.STRING },
        longitude: { type: DataTypes.STRING },
        latitude: { type: DataTypes.STRING },
        duration: { type: DataTypes.STRING },
        date: { type: DataTypes.STRING },
        serviceId: { type: DataTypes.STRING },
        status: { type: DataTypes.INTEGER },
        rating: { type: DataTypes.INTEGER }



    }, {
        sequelize,
        modelName: 'requestservices',
    });
    return users;
}; 