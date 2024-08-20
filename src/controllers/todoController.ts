import { Request, Response } from 'express';
import models from '../models';

export const createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const todo = await models.Todo.create(req.body);
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create todo' });
    }
};

export const getTodos = async (_req: Request, res: Response): Promise<void> => {
    try {
        const todos = await models.Todo.findAll();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Unable to retrieve todos' });
    }
};

export const getTodoById = async (req: Request, res: Response): Promise<void> => {
    try {
        const todo = await models.Todo.findByPk(req.params.id);
        if (todo) {
            res.status(200).json(todo);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to retrieve todo' });
    }
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const [updated] = await models.Todo.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedTodo = await models.Todo.findByPk(req.params.id);
            res.status(200).json(updatedTodo);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to update todo' });
    }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const deleted = await models.Todo.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete todo' });
    }
};
