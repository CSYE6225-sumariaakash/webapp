const Users = (sequelize, Sequelize) => {
    const User = sequelize.define("usertable", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
    return User;
};
export default Users;