const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require('../models/index');

let id;

test('GET /movies must to get all movies', async () => {
    const res = await request(app).get('/movies');    
    expect(res.status).toBe(200);   
    expect(res.body).toBeInstanceOf(Array); 
});

test('POST /movies must to create an movie', async () => {
    const movie = {
        name: "IronMan",
        image: "ironman.url",
        synopsis: "Iron Man the first MCU movie",
        releaseYear: 2008
    };
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(movie.name);
});

test('PUT /movies/:id must to update an movie', async () => {
    const movie = { name: "IronMan test" }
    const res = await request(app).put(`/movies/${id}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(movie.firstName);
});

test('POST /movies/:id/actors must to insert movies to a actor', async () => {
    const actor = await Actor.create({
        firstName: "Tom",
        lastName: "Holland",
        nationality: "UK",
        image: "tom.holland.url",
        birthday: "1995-10-10"
    });
    const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
 });

 test('POST /movies/:id/directors must to insert movies to a director', async () => {
    const director = await Director.create({
        firstName: "Martin",
        lastName: "Scorsese",
        nationality: "USA",
        image: "martin.url",
        birthday: "1955-10-10"
    });
    const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
 });

  test('POST /movies/:id/genres must to insert movies to a genre', async () => {
    const genre = await Genre.create({
        name: "Horror"
    });
    const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
 });

test('DELETE /movies/:id must to delete an movie', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});