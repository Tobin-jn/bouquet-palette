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
  // it('should return the homepage', done => {
  //   chai
  //     .request(app)
  //     .get('/')
  //     .end((error, response) => {
  //       response.should.have.status(200);
  //       response.should.be.html;
  //       done();
  //     });
  // });
    it('should be true', (done) => {
      //done is necessary for async testing to shut down the spun up server
      expect(2).to.equal(2)
      done()
    })
    //dummy test can be done to see if everything is hooked up and then deleted
});



// describe('API Routes', () => {

// });