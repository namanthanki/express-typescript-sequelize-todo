import request from 'supertest';
import app from '../app';
import sequelize from '../config/database';

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Todo API', () => {
    it('should create a new todo', async () => {
        const response = await request(app)
            .post('/api/todos')
            .send({
                title: 'Test Todo',
                completed: false,
            });
        expect(response.status).toBe(201);
        expect(response.body.title).toBe('Test Todo');
        expect(response.body.completed).toBe(false);
    });

    it('should fetch all todos', async () => {
        const response = await request(app).get('/api/todos');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should fetch a single todo by ID', async () => {
        const todo = await request(app)
            .post('/api/todos')
            .send({ title: 'Another Todo', completed: true });

        const response = await request(app).get(`/api/todos/${todo.body.id}`);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Another Todo');
        expect(response.body.completed).toBe(true);
    });

    it('should update a todo', async () => {
        const todo = await request(app)
            .post('/api/todos')
            .send({ title: 'Update Todo', completed: false });

        const response = await request(app)
            .put(`/api/todos/${todo.body.id}`)
            .send({ title: 'Updated Todo', completed: true });

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Updated Todo');
        expect(response.body.completed).toBe(true);
    });

    it('should delete a todo', async () => {
        const todo = await request(app)
            .post('/api/todos')
            .send({ title: 'Delete Todo', completed: false });

        const response = await request(app).delete(`/api/todos/${todo.body.id}`);
        expect(response.status).toBe(204);
    });
});
