import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing the offer endpoints:', () => {
  it('It should create a offer', (done) => {
    const offer = {
      course: 'Software Engineering',
      price: 120.00,
      availableSeats: 4
    };
    chai.request(app)
      .post('/api/v1/offers')
      .set('Accept', 'application/json')
      .send(offer)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 1,
          course: offer.course,
          price: offer.price,
          availableSeats: offer.availableSeats
        });
        done();
      });
  });

  it('It should not create a offer with incomplete parameters', (done) => {
    const offer = {
      price: '$9.99',
      availableSeats: 4
    };
    chai.request(app)
      .post('/api/v1/offers')
      .set('Accept', 'application/json')
      .send(offer)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('It should get all offers', (done) => {
    chai.request(app)
      .get('/api/v1/offers')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('course');
        res.body.data[0].should.have.property('price');
        res.body.data[0].should.have.property('availableSeats');
        done();
      });
  });

  it('It should get a particular offer', (done) => {
    const offerId = 1;
    chai.request(app)
      .get(`/api/v1/offers/${offerId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('course');
        res.body.data.should.have.property('price');
        res.body.data.should.have.property('availableSeats');
        done();
      });
  });

  it('It should not get a particular offer with invalid id', (done) => {
    const offerId = 8888;
    chai.request(app)
      .get(`/api/v1/offers/${offerId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Cannot find offer with the id ${offerId}`);
        done();
      });
  });

  it('It should not get a particular offer with non-numeric id', (done) => {
    const offerId = 'aaa';
    chai.request(app)
      .get(`/api/v1/offers/${offerId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
                            .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should update a offer', (done) => {
    const offerId = 1;
    const updatedOffer = {
      id: offerId,
      course: 'Data Science',
      price: 150.00,
      availableSeats: 2
    };
    chai.request(app)
      .put(`/api/v1/offers/${offerId}`)
      .set('Accept', 'application/json')
      .send(updatedOffer)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updatedOffer.id);
        expect(res.body.data.course).equal(updatedOffer.course);
        expect(res.body.data.price).equal(updatedOffer.price);
        expect(res.body.data.availableSeats).equal(updatedOffer.availableSeats);
        done();
      });
  });

  it('It should not update a offer with invalid id', (done) => {
    const offerId = '9999';
    const updatedOffer = {
      id: offerId,
      course: 'Computer Science',
      price: 300,
      availableSeats: 10
    };
    chai.request(app)
      .put(`/api/v1/offers/${offerId}`)
      .set('Accept', 'application/json')
      .send(updatedOffer)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Cannot find offer with the id: ${offerId}`);
        done();
      });
  });

  it('It should not update a offer with non-numeric id value', (done) => {
    const offerId = 'ggg';
    const updatedOffer = {
      id: offerId,
      course: 'Computer Science',
      price: 300,
      availableSeats: 10
    };
    chai.request(app)
      .put(`/api/v1/offers/${offerId}`)
      .set('Accept', 'application/json')
      .send(updatedOffer)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
                            .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should delete a offer', (done) => {
    const offerId = 1;
    chai.request(app)
      .delete(`/api/v1/offers/${offerId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
  });

  it('It should not delete a offer with invalid id', (done) => {
    const offerId = 777;
    chai.request(app)
      .delete(`/api/v1/offers/${offerId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Offer with the id ${offerId} cannot be found`);
        done();
      });
  });

  it('It should not delete a offer with non-numeric id', (done) => {
    const offerId = 'bbb';
    chai.request(app)
      .delete(`/api/v1/offers/${offerId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message').eql('Please provide a numeric value');
        done();
      });
  });
});
