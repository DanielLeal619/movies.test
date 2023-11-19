const request = require("supertest");
const app = require("../app");

let id;

test('GET /directors must to get all directors', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors must to create an director', async () => {
    const director = {
        firstName: "Martin",
        lastName: "Scorsese",
        nationality: "USA",
        image: "martin.url",
        birthday: "1955-10-10"
    };
    const res = await request(app).post('/directors').send(director);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(director.name);
});

test('PUT /directors/:id must to update an director', async () => {
    const director = {firstName: "Martin test"}
    const res = await request(app).put(`/directors/${id}`).send(director);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(director.firstName);
});

test('DELETE /directors/:id must to delete an director', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});