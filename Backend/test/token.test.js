require("dotenv").config();
const mongoose = require("mongoose");
const chai = require("chai");
const expect = chai.expect;
const Post = require("../models/Post");

describe("Post Model", () => {
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
        await Post.deleteMany({});
    });

    it("should create a post with date fields", async () => {
        const { Types } = mongoose; // Add this line to resolve the error

        const postData = {
            category: "Clothing",
            rentPrice: 50,
            gender: "Unisex",
            type: "Jacket",
            description: "A stylish winter jacket for rent.",
            size: "L",
            image: "https://example.com/jacket.jpg",
            name: "John Doe",
            phone: "1234567890",
            userId: new Types.ObjectId().toString(),
            profilePic: "https://example.com/profile.jpg",
            ratings: [
                { star: 5, postedBy: new Types.ObjectId() },
                { star: 4, postedBy: new Types.ObjectId() }
            ],
            totalRating: "4.5",
            location: {
                type: "Point",
                coordinates: [85.324, 27.7172] // Kathmandu coordinates
            },
            isAvailable: true
        };

        const post = new Post(postData);
        await post.save();

        expect(post.category).to.equal("Clothing");
        expect(post.rentPrice).to.equal(50);
        expect(post.gender).to.equal("Unisex");
        expect(post.type).to.equal("Jacket");
        expect(post.description).to.equal("A stylish winter jacket for rent.");
        expect(post.size).to.equal("L");
        expect(post.image).to.equal("https://example.com/jacket.jpg");
        expect(post.name).to.equal("John Doe");
        expect(post.phone).to.equal("1234567890");
        expect(post.userId).to.be.a("string");
        expect(post.profilePic).to.equal("https://example.com/profile.jpg");
        expect(post.ratings).to.be.an("array").that.has.lengthOf(2);
        expect(post.location.type).to.equal("Point");
        expect(post.location.coordinates).to.be.an("array").that.has.lengthOf(2);
        expect(post.isAvailable).to.be.true;

        // Check if date fields exist
        expect(post.createdAt).to.be.a('date');
        expect(post.updatedAt).to.be.a('date');
    });
});
