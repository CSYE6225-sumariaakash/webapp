import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

const { expect } = chai;

chai.use(chaiHttp);
chai.should();

describe('healthz', () =>{
    describe("get /healthz", () =>{
        it("Return status code 200 OK", (done) => {
            chai.request(app)
                .get("/healthz")
                .end((err, response) => {
                    if(err) done(err);
                    expect(response).to.have.status(200);
                    done();
                });
        });
    });
});