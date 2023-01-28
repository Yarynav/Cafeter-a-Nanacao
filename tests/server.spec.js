const request = require('supertest');
const server = require('../index');

describe('Operaciones CRUD de cafes', () => {
  it('Obteniendo un 200', async () => {
    const response = await request(server).get('/cafes').send();
    const status = response.statusCode;
    expect(status).toBe(200);
  });

  it('Array de la ruta de cafes', async () => {
    const response = await request(server).get('/cafes').send();
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Eliminar un id que no existe', async () => {
    const jwt = 'token';
    const idDeProductoAEliminar = 5;
    const response = await request(server)
      .delete(`/cafes/${idDeProductoAEliminar}`)
      .set('Authorization', jwt)
      .send();
    expect(response.statusCode).toBe(404);
  });

  it('Crear cafe', async () => {
    const id = Math.floor(Math.random() * 999);
    const cafe = { id, nombre: 'Nuevo cafe' };
    const response = await request(server).post('/cafes').send(cafe);
    expect(response.body).toContainEqual(cafe);
    expect(response.statusCode).toBe(201);
  });

  it('Actualizar cafe', async () => {
    const cafe = { id: 3, nombre: 'Nuevo cafe' };
    const urlId = 5;
    const response = await request(server).put(`/cafes/${urlId}`).send(cafe);
    expect(response.statusCode).toBe(400);
  });
});
