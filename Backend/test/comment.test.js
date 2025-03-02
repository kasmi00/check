require("dotenv").config();


require("dotenv").config({ path: "./config/config.env" });

const mongoose = require("mongoose");
const chai = require("chai");
const expect = chai.expect;
const Comment = require("../models/Comment");
const { Types } = require("mongoose");

describe("Comment Model", () => {
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
        await Comment.deleteMany({});
    });

    it("should create a comment", async () => {
        const commentData = {
            name: "John Doe",
            postId: new Types.ObjectId().toString(),
            date: new Date(),
            comments: "This is a test comment.",
        };

        const comment = new Comment(commentData);
        await comment.save();

        expect(comment.name).to.equal("John Doe");
        expect(comment.postId).to.be.a("string");
        expect(comment.date).to.be.a("date");
        expect(comment.comments).to.equal("This is a test comment.");
    });
});
