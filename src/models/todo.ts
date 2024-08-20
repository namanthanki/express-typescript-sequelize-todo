import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface TodoAttributes {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

interface TodoCreationAttributes extends Optional<TodoAttributes, 'id' | 'description' | 'completed'> { }

class Todo extends Model<TodoAttributes, TodoCreationAttributes> implements TodoAttributes {
    public id!: number;
    public title!: string;
    public description!: string;
    public completed!: boolean;
}

Todo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        description: {
            type: new DataTypes.STRING(256),
            allowNull: true,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: 'todos',
        timestamps: true,
    }
);

export default Todo;
