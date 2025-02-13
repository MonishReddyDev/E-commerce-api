import { RateLimiterMemory } from "rate-limiter-flexible";


//congigure rate limitter

const rateLimiter = new RateLimiterMemory({
    points: 2,//Max number of request
    duration: 1  // Per second
})

//Middleware

const rateLimittingMiddleware = (req, res, next) => {
    rateLimiter.consume(req.ip).then(() => {
        next()//allow the request if its within the limit
    }).catch(() => {
        res.status(429).json({ message: 'Too many requests, please try again later.' })

    })

}


export default rateLimittingMiddleware