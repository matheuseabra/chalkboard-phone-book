import request from 'supertest';
import {assert} from 'chai';

const mockURL = 'http://localhost:4000';
const mockToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDgxMjk1OTh9.11lLSo716wZcAM1Yzk9AIGxONBw7AcIUCpS4fhXnmvg';

describe('Integration - Mutations: ', () => {

  it('should create a contact with a valid ID, name Test-Mutation and phone 98986565', done => {
    request(mockURL)
      .post('/')
      .set('Content-type', 'application/json')
      .set('Authorization', mockToken)
      .send({query: 'mutation{ createContact(name: "Test-Mutation", phone: "98986565") { id name email phone  }}'})
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.exists(res.body.data.createContact.id);
        assert.equal(res.body.data.createContact.phone,'98986565');
        assert.equal(res.body.data.createContact.name, 'Test-Mutation');
        assert.isUndefined(res.body.data.createContact.mobilephone);
        done();
      });
  });

  it('should update a contact', done => {
    let contactId;
    request(mockURL)
      .post('/')
      .set('Content-type', 'application/json')
      .set('Authorization', mockToken)
      .send({query: 'mutation{ createContact(name: "Test-Mutation", phone: "98986565") { id }}'})
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.exists(res.body.data.createContact.id);
        contactId = res.body.data.createContact.id;
      });

    request(mockURL)
      .post('/')
      .set('Content-type', 'application/json')
      .set('Authorization', mockToken)
      .send({query: `mutation{ updateContact(id: "${contactId}", name: "EDITED", email: "EDITED@email.com", phone: "999") { id name email phone }}`})
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        done();
      });
  });

  it('should delete a contact', done => {
    let contactId;
    request(mockURL)
      .post('/')
      .set('Content-type', 'application/json')
      .set('Authorization', mockToken)
      .send({query: 'mutation{ createContact(name: "Test-Mutation", phone: "98986565") { id }}'})
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.exists(res.body.data.createContact.id);
        contactId = res.body.data.createContact.id;
      });

    request(mockURL)
      .post('/')
      .set('Content-type', 'application/json')
      .set('Authorization', mockToken)
      .send({query: `mutation{ deleteContact(id: "${contactId}") { id }}`})
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(res.body.data.deleteContact, null);
        done();
      });
  });
});