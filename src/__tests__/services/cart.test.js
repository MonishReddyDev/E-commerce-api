import Cart from "../../models/cart.model.js";
import Product from "../../models/product.model.js";
import { addToCartService } from "../../services/cart.service.js";
import { CustomError } from "../../utils/customeError.js";
import { ERROR_MESSAGES } from "../../utils/messages.js";

jest.mock("../../models/product.model.js")
jest.mock("../../models/cart.model.js")

describe("Cart Service", () => {

    const mockProduct = {
        _id: 'product123',
        price: 100,
        countInStock: 10
    };

    const mockUserId = 'user123';

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    it("should throw an error if quantity is negative", async () => {
        const productId = "someProductId"; // mock productId
        const userId = "someUserId";       // mock userId
        const quantity = -1;

        Product.findById = jest.fn().mockResolvedValueOnce({ countInStock: 5 });
        try {
            await addToCartService(productId, userId, quantity);
        } catch (error) {
            // Verify that a CustomError is thrown
            expect(error).toBeInstanceOf(CustomError);
            expect(error.message).toBe(ERROR_MESSAGES.QUANTITY_NEGATIVE)
            expect(error.statuscode).toBe(400)

        }
    })

    it("should return if product not found", async () => {
        const productId = "someProductId"; // mock productId
        const userId = "someUserId";       // mock userId
        const quantity = 3;

        Product.findById = jest.fn().mockResolvedValueOnce(false)
        try {
            await addToCartService(productId, userId, quantity);

        } catch (error) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.message).toBe(ERROR_MESSAGES.PRODUCT_NOT_FOUND)
            expect(error.statuscode).toBe(404)

        }
    })

    it("should return if product out of stock", async () => {
        const productId = "someProductId";
        const userId = "someUserId";       // mock userId
        const quantity = 10;


        // Mock Product.findById to return a product with limited stock
        Product.findById = jest.fn().mockResolvedValueOnce({ countInStock: 5 });

        try {
            await addToCartService(productId, userId, quantity);

        } catch (error) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.message).toBe(ERROR_MESSAGES.PRODUCT_OUT_OF_STOCK)
            expect(error.statuscode).toBe(400)

        }
    })

    it("should create a new cart if one does not exist", async () => {
        // Mock Product.findById to return the mock product
        Product.findById.mockResolvedValueOnce(mockProduct)

        // Mock Cart.findOne to return null (no existing cart)
        Cart.findOne.mockResolvedValueOnce(null)

        const mockSave = jest.fn()
        const mockCartInstance = {
            items: [],
            save: mockSave
        }

        Cart.mockImplementationOnce(() => mockCartInstance)

        const quantity = 2;

        // Execute the service
        const result = await addToCartService(mockProduct._id, mockUserId, quantity);
        // Verify that the product was fetched
        expect(Cart.findOne).toHaveBeenCalledWith({ user: mockUserId })

        // Verify that the item was added to the cart
        expect(result.items).toEqual([{
            product: mockProduct._id,
            quantity,
            price: mockProduct.price

        }])

        expect(mockSave).toHaveBeenCalled()

    })

    it("should add an item to an existing cart", async () => {

        //Mock the product
        Product.findById.mockResolvedValueOnce(mockProduct)

        const mockSave = jest.fn()

        const existingCart = {
            user: mockUserId,
            items: [],
            save: mockSave
        }

        Cart.findOne.mockResolvedValueOnce(existingCart)
        let quantity = 1

        await addToCartService(mockProduct._id, mockUserId, quantity)


        expect(existingCart.items).toEqual([{
            product: mockProduct._id,
            quantity: 1,
            price: mockProduct.price

        }])
        expect(mockSave).toHaveBeenCalled()

    })


})
