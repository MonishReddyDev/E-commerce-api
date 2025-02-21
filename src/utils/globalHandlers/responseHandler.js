

const sendSuccessResponse = (res, statusCode = 200, message = "success", data = {}) => {
    return res.json({
        status: 'success',
        statusCode,
        message,
        ...data
    })
}

export default sendSuccessResponse
