const HS = require('../../services/HueService')
const chai = require('chai')
const should = chai.should()
const sinon = require('sinon')

describe("Hue Service", () => {
    describe("Get All Hubs", () => {
        it("should return something", () => {
            const mock = sinon.mock(HS)
            HS.getAllHubs.should.exist;
        })
    })
})