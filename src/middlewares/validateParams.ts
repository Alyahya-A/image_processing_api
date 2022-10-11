import { Request, Response } from 'express';
import { StatusCode } from '../consts/statusCodes';

/**
 *
 * @returns BadRequest(400) if the validation failed, otherwise continue
 */
const validateImageParams = (req: Request, res: Response, next: Function) => {
  console.log('Validating Image Params');

  const paramNames: string[] = [];

  if (!req.query.imageName || !req.query.imageName.toString().trim())
    paramNames.push('imageName');

  if (!req.query.width || Number(req.query.width) <= 0)
    paramNames.push('width');

  if (!req.query.height || Number(req.query.height) <= 0)
    paramNames.push('height');

  if (paramNames.length > 0) {
    if (paramNames.length == 1)
      return res
        .status(StatusCode.badRequest)
        .send(
          `<h3>The following param is missing:</h3><br> - ${paramNames[0]}`
        );
    else
      return res
        .status(StatusCode.badRequest)
        .send(
          `<h3>The following params are missing:</h3> - ${paramNames.join(
            '<br> - '
          )}`
        );
  }

  next();
};

export default validateImageParams;
