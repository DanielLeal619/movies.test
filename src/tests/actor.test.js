const request = require("supertest");
const app = require("../app");

let id;

test('GET /actors must to get all actors', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors must to create an actor', async () => {
    const actor = {
        firstName: "Tom",
        lastName: "Holland",
        nationality: "UK",
        image: "tom.holland.url",
        birthday: "1995-10-10"
    };
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(actor.name);
});

test('PUT /actors/:id must to update an actor', async () => {
    const actor = {firstName: "Tom test"}
    const res = await request(app).put(`/actors/${id}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actor.firstName);
});

test('DELETE /actors/:id must to delete an actor', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});