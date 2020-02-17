import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../index';

chai.use(chatHttp);
const { expect } = chai;

describe('Testing the order endpoints:', () => {
  it('It should create a order', (done) => {
    const order = {
      offerId: 1,
      userId: 1,
      status: 'initiated'
    };
    chai.request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(order)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 1,
          offerId: order.offerId,
          userId: order.userId,
          status: order.status
        });
        done();
      });
  });

  it('It should not create a order with incomplete parameters', (done) => {
    const order = {
      userId: 1,
      status: 'initiated'
    };
    chai.request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(order)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('It should get all orders', (done) => {
    chai.request(app)
      .get('/api/v1/orders')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('offerId');
        res.body.data[0].should.have.property('userId');
        res.body.data[0].should.have.property('status');
        done();
      });
  });

  it('It should get a particular order', (done) => {
    const orderId = 1;
    chai.request(app)
      .get(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('offerId');
        res.body.data.should.have.property('userId');
        res.body.data.should.have.property('status');
        done();
      });
  });

  it('It should not get a particular order with invalid id', (done) => {
    const orderId = 8888;
    chai.request(app)
      .get(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Cannot find order with the id ${orderId}`);
        done();
      });
  });

  it('It should not get a particular order with non-numeric id', (done) => {
    const orderId = 'aaa';
    chai.request(app)
      .get(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
                            .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should update a order', (done) => {
    const orderId = 1;
    const updatedOrder = {
      id: orderId,
      offerId: 1,
      userId: 1,
      status: 'paid'
    };
    chai.request(app)
      .put(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .send(updatedOrder)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).equal(updatedOrder.id);
        expect(res.body.data.offerId).equal(updatedOrder.offerId);
        expect(res.body.data.userId).equal(updatedOrder.userId);
        expect(res.body.data.status).equal(updatedOrder.status);
        done();
      });
  });

  it('It should not update a order with invalid id', (done) => {
    const orderId = '9999';
    const updatedOrder = {
      id: orderId,
      offerId: 1,
      userId: 1,
      status: 'waiting'
    };
    chai.request(app)
      .put(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .send(updatedOrder)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Cannot find order with the id: ${orderId}`);
        done();
      });
  });

  it('It should not update a order with non-numeric id value', (done) => {
    const orderId = 'ggg';
    const updatedOrder = {
      id: orderId,
      offerId: 1,
      userId: 1,
      status: 'disabled'
    };
    chai.request(app)
      .put(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .send(updatedOrder)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message')
                            .eql('Please input a valid numeric value');
        done();
      });
  });

  it('It should delete a order', (done) => {
    const orderId = 1;
    chai.request(app)
      .delete(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.include({});
        done();
      });
  });

  it('It should not delete a order with invalid id', (done) => {
    const orderId = 777;
    chai.request(app)
      .delete(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        res.body.should.have.property('message')
                            .eql(`Order with the id ${orderId} cannot be found`);
        done();
      });
  });

  it('It should not delete a order with non-numeric id', (done) => {
    const orderId = 'bbb';
    chai.request(app)
      .delete(`/api/v1/orders/${orderId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        res.body.should.have.property('message').eql('Please provide a numeric value');
        done();
      });
  });
});
