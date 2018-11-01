module.exports = function(sequelize, Sequelize) {
 
    var Student = sequelize.define('student', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        username: {
            type: Sequelize.STRING
        },
 
        email: {
            type: Sequelize.STRING,
            //validate: {
            //    isEmail: true
            //}
        },
 
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
 
        last_login: {
            type: Sequelize.DATE
        },
 
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
 
 
    });
 
    return Student;
 
}