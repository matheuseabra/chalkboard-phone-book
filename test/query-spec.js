import request from 'supertest';
import {assert} from 'chai';

const url = 'http://localhost:4000';
const mockToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDgxMjk1OTh9.11lLSo716wZcAM1Yzk9AIGxONBw7AcIUCpS4fhXnmvg';

describe('Integration - Querys: ', () => {
  it('should return array on body with lenght 1 and _id 5ebdc69e3e1eca39684383fc', (done) => {
    request(url)
      .post('/')
      .set('Content-type', 'application/json')
      .set('Authorization', mockToken)
      .send({query: '{ contacts(first: 1) { id } }' })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.exists(res.body.data.contacts);
        assert.isArray(res.body.data.contacts);
        assert.equal(res.body.data.contacts[0].id,'5ebdc69e3e1eca39684383fc');
        done();
      });
  });
  it('should return array on body with name Graphql', (done) => {
    request(url)
      .post('/')
      .set('Content-type', 'application/json')
      .set('Authorization', mockToken)
      .send({query: '{ contacts(first: 1) { id, name } }' })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.body.data.contacts[0].name,'Graphql');
        done();
      });
  });
  it('should return array on body with phone 32343234', (done) => {
    request(url)
      .post('/')
      .set('Content-type', 'application/json')
      .set('Authorization', mockToken)
      .send({query: '{ contacts(first: 1) { phone } }' })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.body.data.contacts[0].phone,'32343234');
        done();
      });
  });
  it('should return array on body with mobilephone 999999888', (done) => {
    request(url)
      .post('/')
      .set('Content-type', 'application/json')
      .set('Authorization', mockToken)
      .send({query: '{ contacts(first: 1) { mobilephone } }' })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.body.data.contacts[0].mobilephone,'999999888');
        done();
      });
  });
  it('should return array on body with complete contact', (done) => {
    request(url)
      .post('/')
      .set('Content-type', 'application/json')
      .set('Authorization', mockToken)
      .send({query: '{ contacts(first: 1) {id, name, phone, mobilephone } }' })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.body.data.contacts[0].name,'Graphql');
        assert.equal(res.body.data.contacts[0].phone,'32343234');
        assert.equal(res.body.data.contacts[0].mobilephone,'999999888');
        done();
      });
  });
});