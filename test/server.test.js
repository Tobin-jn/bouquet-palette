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

  describe('POST /api/v1/projects', () => {
    let newProject;

    it('should return a 422 if a project name is not included with a request', done => {
      newProject = { }

      chai
        .request(app)
        .post('/api/v1/projects')
        .send(newProject)
        .end((error, response) => {
          response.should.have.status(422)
          response.should.be.json;
          response.should.be.a('object')
          response.body.should.have.property('error')
          response.body.error.should.equal('Missing a Project Name')
          done();
      })
    })
    it('should return a 422 if a project name already exists in the database', done => {
      newProject = {
        name: "Winter"
      }

      chai
        .request(app)
        .post('/api/v1/projects')
        .send(newProject)
        .end((error, response) => {
          response.should.have.status(422)
          response.should.be.json;
          response.should.be.a('object')
          response.body.should.have.property('error')
          response.body.error.should.equal('Project Name Already Exists')
          done();
      })
    })
    it('should post a new projects', done => {
      newProject = {
        name: "Midnight Darkness"
      }

      chai
        .request(app)
        .post('/api/v1/projects')
        .send(newProject)
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.should.be.a('object')
          response.body.should.have.property('id')
          done();
      })
    })
  });

  describe('GET /api/v1/projects/:id', () => {
    it('should return a specific project name', done => {
      chai
        .request(app)
        .get('/api/v1/projects/1')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;  
          response.should.be.a('object')
          response.body.should.have.property('id')
          response.body.should.have.property('name')
          response.body.id.should.equal(1)
          response.body.name.should.equal('Winter')
          done();
      })
    })
  });

  describe('GET /api/v1/projects/:project_id/palettes', () => {
    it('should get all the palettes of a specific project', done => {
      chai
        .request(app)
        .get('/api/v1/projects/1/palettes')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;  
          response.should.be.a('object')
          response.body[0].should.have.property('id')
          response.body[0].should.have.property('name')
          response.body[0].should.have.property('hex1')
          response.body[0].should.have.property('project_id')
          response.body[0].id.should.equal(1)
          response.body[0].name.should.equal('Cold')
          response.body[0].hex1.should.equal('#57CD617')
          response.body[0].project_id.should.equal(1)
          done();
      })
    });
    it('should return a 422 if project doesnt exist', done => {
      chai
        .request(app)
        .get('/api/v1/projects/29/palettes')
        .end((error, response) => {
          response.should.have.status(422)
          response.should.be.json;  
          response.should.be.a('error')
          response.body[0].should.have.property('Project does not exist in database')
          done()
      })
    })
  });

  describe('POST /api/v1/projects/:project_id/palettes', () => {
    // it('should post a new palette', done => {
    //   const newPalette = {
    //     name: 'New Palette',
    //     hex1: '#FFFFFF',
    //     hex2: '#FFFFFF',
    //     hex3: '#FFFFFF',
    //     hex4: '#FFFFFF',
    //     hex5: '#FFFFFF',
    //     project_id: 1
    //   }
      
    //   chai
    //     .request(app)
    //     .post('/api/v1/projects/1/palettes')
    //     .send(newPalette)
    //     .end((error, response) => {
    //       response.should.have.status(201);
    //       response.should.be.json;
    //       response.should.be.a('object')
    //       // response.body.should.have.property('id')
    //       // response.body.id.should.equal(2)
    //       done();
    //     })
    // })
    it('should return a 422 if any palette parameters are missing', done => {
      const newPalette = {
        hex1: '#FFFFFF',
        hex2: '#FFFFFF',
        hex3: '#FFFFFF',
        hex4: '#FFFFFF',
        hex5: '#FFFFFF',
        project_id: 1
      }

      chai
        .request(app)
        .post('/api/v1/projects/1/palettes')
        .send(newPalette)
        .end((error, response) => {
          response.should.have.status(422)
          response.should.be.json;
          response.should.be.a('object')
          response.body.should.have.property('error')
          response.body.error.should.equal('Expected format: { name: <String>, hex1: <String>, hex2: <String>, hex3: <String>, hex4: <String>, hex5: <String>, project_id: <Number>} Youre missing a name property.')
          done();
        })
    })
    it('should return a 422 if project does not exist', done => {
      const newPalette = {
        name: 'PaletteWhite',
        hex1: '#FFFFFF',
        hex2: '#FFFFFF',
        hex3: '#FFFFFF',
        hex4: '#FFFFFF',
        hex5: '#FFFFFF',
        project_id: 1
      }

      chai
        .request(app)
        .post('/api/v1/projects/29/palettes')
        .send(newPalette)
        .end((error, response) => {
          response.should.have.status(422)
          response.should.be.json;
          response.should.be.a('object')
          response.body.should.have.property('error')
          response.body.error.should.equal('Project Id does not exist')
          done();
        })
    })
    it('should return a 422 if palette name already exists for that project', done => {
      const newPalette = {
        name: 'Cold',
        hex1: '#FFFFFF',
        hex2: '#FFFFFF',
        hex3: '#FFFFFF',
        hex4: '#FFFFFF',
        hex5: '#FFFFFF',
        project_id: 1
      }

      chai
        .request(app)
        .post('/api/v1/projects/1/palettes')
        .send(newPalette)
        .end((error, response) => {
          response.should.have.status(422)
          response.should.be.json;
          response.should.be.a('object')
          response.body.should.have.property('error')
          response.body.error.should.equal('Palette name already exists for this project')
          done();
        })
    })
  });


  describe('/api/v1/projects/:project_id/palettes/:palette_id', () => {
    it('should delete a palette', done => {
      chai
        .request(app)
        .post()
        .end((error, response) => {
          done();
        })
    })
    it('should return a 422 if palette does not exist', done => {
      chai
        .request(app)
        .post()
        .end((error, response) => {
          done();
        })
    })    
    it('should return a 422 if project does not exist', done => {
      chai
        .request(app)
        .post()
        .end((error, response) => {
          done();
        })
    })
  });
});

