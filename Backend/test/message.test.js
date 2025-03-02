require("dotenv").config();
const mongoose = require("mongoose");
const chai = require("chai");
const expect = chai.expect;
const Message = require("../models/Message");
const { Types } = require("mongoose");

describe("Message Model", () => {
    before(async () => {
        console.log("TEST_DB_URI:", process.env.TEST_DB_URI);

        if (!process.env.TEST_DB_URI) {
            throw new Error("Missing TEST_DB_URI in .env file");
        }

        await mongoose.connect(process.env.TEST_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    after(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Message.deleteMany({});
    });

    it("should create a message", async () => {
        const messageData = {
            message: { text: "Hello, this is a test message!" },
            users: [new Types.ObjectId(), new Types.ObjectId()],
            sender: new Types.ObjectId(),
        };

        const message = new Message(messageData);
        await message.save();

        expect(message.message.text).to.equal("Hello, this is a test message!");
        expect(message.users).to.be.an("array").that.has.lengthOf(2);
        expect(message.sender.toString()).to.be.a("string");  // 
    });
});
