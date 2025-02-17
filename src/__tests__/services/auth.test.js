import User from "../../models/user.model.js";
import { registerUserService, userLoginService } from "../../services/auth.service.js";
import { CustomError } from "../../utils/customeError.js";
import { ERROR_MESSAGES } from "../../utils/messages.js";
import { generateToken } from "../../utils/token.js";



jest.mock("../../models/user.model.js")
jest.mock("../../utils/token.js");


// Mock user data to avoid repetition
const mockUserData = {
    username: 'babuone',
    password: '$2a$10$k9.AHBR33783NLLYanpYn.l.kODsjFw.pB7Cfcyz1FdqjvRZcjHwC', // Example hashed password
    email: 'babu1@gmail.com',
    role: 'guest',
    _id: '67b27419239cefb5a8ca32a1',
    __v: 0,
};


const mockUserInstance = {
    ...mockUserData,
    save: jest.fn().mockResolvedValueOnce(mockUserData)
}


describe('registerUserService', () => {

    it('should throw an error if the user already exists', async () => {
        // Mocking the behavior: the first time findOne is called, return true
        User.findOne = jest.fn().mockResolvedValueOnce(true);

        try {
            await registerUserService('johnDoe', 'password123', 'john@example.com', 'user');
        } catch (error) {
            expect(error).toBeInstanceOf(CustomError);
            expect(error.message).toBe(ERROR_MESSAGES.USER_EXISTS);
            expect(error.statuscode).toBe(400);
        }
    });

    it("should create a new user if the user does not exist", async () => {
        // Mock User.findOne to simulate no existing user
        User.findOne = jest.fn().mockResolvedValueOnce(null)

        User.mockImplementationOnce(() => mockUserInstance)

        // Call the registerUserService function
        const user = await registerUserService('babuone', 'password123', 'babu1@gmail.com', 'guest');

        // Check if save was called and the returned user matches expected values
        expect(mockUserInstance.save).toHaveBeenCalled();
        // Remove 'save' method before comparison to avoid mismatch
        const { save, ...userWithoutSave } = user;

        // Now compare the user data without the 'save' method
        expect(userWithoutSave).toEqual(mockUserData);
    })


});



describe('userLoginService', () => {

    it("should throw an error if email or password is missing", async () => {
        try {
            await userLoginService(null, "password123")

        } catch (error) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.message).toBe(ERROR_MESSAGES.MISSING_FIELDS)
            expect(error.statuscode).toBe(400)
        }
        try {

            await userLoginService("monish@gmail.com", null)

        } catch (error) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.message).toBe(ERROR_MESSAGES.MISSING_FIELDS)
            expect(error.statuscode).toBe(400)

        }
    })


    it("should throw an error if the user is not found", async () => {

        User.findOne = jest.fn().mockResolvedValueOnce(null)
        try {

            await userLoginService("monish@gmail.com", "123Password")
        } catch (error) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.message).toBe(ERROR_MESSAGES.USER_NOT_FOUND)
            expect(error.statuscode).toBe(404)

        }
    })


    it("should throw an error if the password does not match", async () => {
        const mockUser = {
            email: "user@example.com",
            matchPassword: jest.fn().mockResolvedValueOnce(false)
        }

        User.findOne = jest.fn().mockResolvedValueOnce(mockUser)

        try {
            await userLoginService("user@example.com", "wrongPassword")

        } catch (error) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.message).toBe(ERROR_MESSAGES.INVALID_CREDENTIALS)
            expect(error.statuscode).toBe(400)
        }

    })

    it("should return user and token if login is successful", async () => {
        const mockUser = {
            _id: "123",
            email: "user@example.com",
            role: "user",
            matchPassword: jest.fn().mockResolvedValueOnce(true)
        }

        // Mock User.findOne to return the mock user
        User.findOne = jest.fn().mockResolvedValueOnce(mockUser);


        // Mock generateToken
        const mockToken = "12qwdw3455wwf42"
        generateToken.mockReturnValueOnce(mockToken)


        const { user, token } = await userLoginService("user@example.com", "password123")

        // Check if correct user and token are returned
        expect(user).toBe(mockUser)
        expect(token).toBe(mockToken)
        expect(generateToken).toHaveBeenCalledWith({
            id: mockUser._id,
            role: mockUser.role,
            email: mockUser.email,
        })


    })


})


