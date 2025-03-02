require("dotenv").config();
const mongoose = require("mongoose");
const chai = require("chai");
const expect = chai.expect;
const User = require("../models/User");
const Post = require("../models/Post");  // Import the Post model
const { Types } = mongoose;

describe("User Model", () => {
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
        await User.deleteMany({});
    });

    it("should create a user with required fields", async () => {
        const userData = {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "1234567890",
            password: "password123",
        };

        const user = new User(userData);
        await user.save();

        // Check if user data is saved correctly
        expect(user.name).to.equal("John Doe");
        expect(user.email).to.equal("john.doe@example.com");
        expect(user.phone).to.equal("1234567890");
        expect(user.password).to.equal("password123");

        // Check default values
        expect(user.image).to.equal("https://static.thenounproject.com/png/12017-200.png");
        expect(user.role).to.equal("customer");
        expect(user.likedItems).to.be.an("array").that.is.empty; // Default is an empty array
        expect(user.date).to.be.a("date");

        // Check email uniqueness (using try/catch to catch promise rejection)
        try {
            const duplicateUser = new User(userData);
            await duplicateUser.save();
        } catch (error) {
            expect(error.message).to.include("duplicate key error collection");
        }
    });

    it("should create a user with likedItems array of post references", async () => {
        // Create a Post object
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
            ratings: [],
            totalRating: "4.5",
            location: {
                type: "Point",
                coordinates: [85.324, 27.7172], // Kathmandu coordinates
            },
            isAvailable: true,
        };

        const savedPost = await Post.create(postData); // Create the post
        const userData = {
            name: "Jane Doe",
            email: "jane.doe@example.com",
            phone: "0987654321",
            password: "password123",
            likedItems: [savedPost._id], // Add post ID to likedItems array
        };

        const user = new User(userData);
        await user.save();

        // Check if the likedItems array contains the post reference
        expect(user.likedItems).to.have.lengthOf(1);
        expect(user.likedItems[0].toString()).to.equal(savedPost._id.toString());
    });
});
