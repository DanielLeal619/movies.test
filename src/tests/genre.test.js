const request = require("supertest");
const app = require("../app");

let id;

test('GET /genres must to get all genres', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /genres must to create an genre', async () => {
    const genre = {
        name: "Horror"
    };
    const res = await request(app).post('/genres').send(genre);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(genre.name);
});

test('PUT /genres/:id must to update an genre', async () => {
    const genre = { name: "Horror test" }
    const res = await request(app).put(`/genres/${id}`).send(genre);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(genre.firstName);
});

test('DELETE /genres/:id must to delete an genre', async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});