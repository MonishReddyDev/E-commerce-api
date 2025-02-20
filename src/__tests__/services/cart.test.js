import { error } from "winston";
import Cart from "../../models/cart.model.js";
import Product from "../../models/product.model.js";
import { addToCartService, removeFromCartService } from "../../services/cart.service.js";
import { CustomError } from "../../utils/customeError.js";
import { ERROR_MESSAGES } from "../../utils/messages.js";

jest.mock("../../models/product.model.js")
jest.mock("../../models/cart.model.js")

describe("Add to Cart Service", () => {

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

    const mockCart = {
        "user": "67a8082433e421cc59f16c09",
        "items": [
            {
                "product": "67ac07ef2c554ac93403c8d0",
                "quantity": 3,
                "price": 39.99
            }
        ],
        "_id": "67b3ce8c2075806146deaa82",
        "createdAt": "2025-02-18T00:04:28.250Z",
        "updatedAt": "2025-02-18T00:04:28.250Z",
        "__v": 0
    }

    const mockproduct = {
        "name": "Electric bruch",
        "description": "Rechargeable electric toothbrush with multiple cleaning modes and long-lasting battery life.",
        "price": 39.99,
        "countInStock": 300,
        "image": "https://example.com/images/toothbrush.jpg",
        "category": "Health & Personal Care",
        "_id": "67b3cefc9deb1a6cf479c6a0",
        "createdAt": "2025-02-18T00:06:20.039Z",
        "updatedAt": "2025-02-18T00:06:20.039Z",
        "__v": 0
    }

    it("should update the  qunatity and price when adding an existing item", async () => {
        const productId = "67ac07ef2c554ac93403c8d0"
        const userId = "67a8082433e421cc59f16c09"
        const quantity = 2

        Product.findById.mockResolvedValueOnce(mockproduct)

        Cart.findOne.mockResolvedValueOnce({
            ...mockCart,
            save: jest.fn().mockResolvedValueOnce(mockCart)
        })

        const cart = await addToCartService(productId, userId, quantity)

        const product = cart.items.find(item => item.product === productId)

        expect(product).toBeDefined()
        expect(product.quantity).toBe(5);
        expect(product.price).toBe(5 * 39.99);


    })

})


describe('cart service', () => {

    const mockCart = {
        "user": "67a8082433e421cc59f16c09",
        "items": [
        ],
        "_id": "67b3ce8c2075806146deaa82",
        "createdAt": "2025-02-18T00:04:28.250Z",
        "updatedAt": "2025-02-18T00:04:28.250Z",
        "__v": 0
    }
    const mockaCart = {
        "user": "67a8082433e421cc59f16c09",
        "items": [
            {
                "product": "67ac07ef2c554ac93403c8d0",
                "quantity": 3,
                "price": 39.99
            }
        ],
        "_id": "67b3ce8c2075806146deaa82",
        "createdAt": "2025-02-18T00:04:28.250Z",
        "updatedAt": "2025-02-18T00:04:28.250Z",
        "__v": 0
    }

    const mockproduct = {
        "name": "Electric bruch",
        "description": "Rechargeable electric toothbrush with multiple cleaning modes and long-lasting battery life.",
        "price": 39.99,
        "countInStock": 300,
        "image": "https://example.com/images/toothbrush.jpg",
        "category": "Health & Personal Care",
        "_id": "67b3cefc9deb1a6cf479c6a0",
        "createdAt": "2025-02-18T00:06:20.039Z",
        "updatedAt": "2025-02-18T00:06:20.039Z",
        "__v": 0
    }
    it('thorw error cart not found', async () => {
        const productId = "67ac07ef2c554ac93403c8d0"
        const userId = "67a8082433e421cc59f16c09"

        Cart.findOne = jest.fn().mockResolvedValueOnce(false)

        try {
            await removeFromCartService(productId, userId)
        } catch (error) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.message).toBe(ERROR_MESSAGES.CART_NOT_FOUND)
            expect(error.statuscode).toBe(404)

        }
    })

    it("error if product not in Cart", async () => {
        const productId = "67ac07ef2c554ac93403c8d0"
        const userId = "67a8082433e421cc59f16c09"

        Cart.findOne = jest.fn().mockResolvedValueOnce(mockCart)

        try {

            await removeFromCartService(productId, userId)
        } catch (error) {

            expect(error).toBeInstanceOf(CustomError)
            expect(error.message).toBe(ERROR_MESSAGES.PRODUCT_NOT_IN_CART)
            expect(error.statuscode).toBe(404)
        }

    })


    //TODO

})

