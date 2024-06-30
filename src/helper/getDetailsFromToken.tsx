import type { NextRequest } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const getTokenDetails = async (request: NextRequest): Promise<JwtPayload> => {
    const tokenCookie = request.cookies.get('token');
    if (!tokenCookie) {
        throw new Error('Token not found');
    }

    const token = tokenCookie.value; // Extract the token value from the cookie
    let decodedToken: JwtPayload;
    try {
        decodedToken = jwt.verify(token, 'user-Authentication') as JwtPayload;
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            throw new Error('Token expired');
        } else if (err instanceof jwt.JsonWebTokenError) {
            throw new Error('Invalid token');
        } else {
            throw new Error('Failed to verify token');
        }
    }

    return decodedToken;
}
