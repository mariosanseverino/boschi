import { Request, Response, NextFunction } from 'express';
import { ServiceCodes } from '../interfaces/ServiceResponse';

export default class ProductsValidation {
  static verifyCreate(req: Request, res: Response, next: NextFunction): Response | void {
    const { name, price, description, variants } = req.body;

    if (!name || !price || !description || !variants) {
      return res.status(ServiceCodes.INVALID_DATA).json({ message: 'All fields must be filled' });
    }

    if (typeof name !== 'string'
    || typeof price !== 'number'
    || typeof description !== 'string'
    || !Array.isArray(variants)) {
      return res.status(ServiceCodes.INVALID_DATA).json({ message: 'Invalid data types, please try again' });
    }

    const allowedSizes = ['S', 'M', 'L', 'XL'];

    for (let variant of variants) {
      if (typeof variant.color !== 'string'
      || typeof variant.quantity !== 'number') {
        return res.status(ServiceCodes.INVALID_DATA).json({ message: 'Invalid data types, please try again' });
      }

      if (!allowedSizes.includes(variant.size)) {
        return res.status(ServiceCodes.INVALID_DATA).json({ message: 'Invalid size in variants. Allowed sizes are S, M, L, XL.' });
      }
    }

    next();
  }
}