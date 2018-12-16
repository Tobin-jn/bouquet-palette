const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');
const expect = chai.expect;
const should = chai.should();
const config = require('../knexfile')['test'];
const database = require('knex')(config);

chai.use(chaiHttp);


describe('Client Routes', () => {
  it('should return a 404 for a route that does not exist', done => {
    chai
      .request(app)
      .get('/badurl')
      .end((error, response) => {
        response.should.have.status(404);
        done();
    });
  });
  it('should return the homepage', done => {
    chai
      .request(app)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.html;
        done();
      });
  });
});

describe('API Routes', () => {
  beforeEach(() =>
    database.migrate
      .rollback()
      .then(() => database.migrate.latest())
      .then(() => database.seed.run())
  );

  describe('GET /api/v1/projects', () => {
    it('should return all the projects', done => {
      chai
        .request(app)
        .get('/api/v1/projects')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('Winter');
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1);
          done()
      })
    })
  });



  describe('/api/v1/projects/:id', () => {

  });

  describe('/api/v1/projects/:project_id/palettes', () => {

  });

  describe('/api/v1/projects/:project_id/palettes/:palette_id', () => {

  });
});


