import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return next(
      createHttpError.BadRequest(`ID:${req.params.id} has incorrect format`),
    );
  }
  next();
};
