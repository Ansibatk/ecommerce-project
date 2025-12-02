import jwt from 'jsonwebtoken'
import { errorResponse} from '../constants/response.js';
import { STATUS } from '../constants/httpStatus.js';
import { MESSAGES } from '../constants/messages.js';

const authUser = async (req, res, next) => {

    const { token } = req.headers;

    if (!token) {
        return errorResponse(res, STATUS.UNAUTHORIZED, MESSAGES.NOT_AUTHORISED)
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
    }
    catch (error) {
        console.log(error);
        return errorResponse(res, STATUS.BAD_REQUEST, MESSAGES.TOKEN_INVALID)

    }
}
export default authUser;