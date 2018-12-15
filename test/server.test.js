const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect
const should = chai.should();
const app = require('../server.js');
const config = require('../knexfile')['test'];
const database = require('knex')(config);

chai.use(chaiHttp)

//SETUP TEST ENVIRONMENT and TEST DATABASE


describe('Client Routes', () => {
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

});