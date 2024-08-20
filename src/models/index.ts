import sequelize from '../config/database';
import Todo from './todo';

const models = {
    Todo,
};

export { sequelize };
export default models;
