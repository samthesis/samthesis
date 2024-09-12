'use strict';
import {
  Model
}  from 'sequelize';
interface userSettingAttributes{


 userId:number;
 pushNotifications:Boolean;

 
}
module.exports = (sequelize:any, DataTypes:any) => {
  class  userSetting extends Model<userSettingAttributes>
  implements userSettingAttributes {

    userId!:number;
    pushNotifications!:Boolean;

    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  };
  userSetting.init({
   
   
    userId: {type:DataTypes.INTEGER},
    pushNotifications: {type:DataTypes.BOOLEAN},

 
  }, {
    sequelize,
    modelName: 'usersettings',
  });
  return  userSetting;
};
