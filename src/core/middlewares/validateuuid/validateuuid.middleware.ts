import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { isUUID } from '@nestjs/common/utils/is-uuid';

@Injectable()
export class ValidateUUIDMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: () => void) {
    if (req.params && req.params.id) {
      if (!isUUID(req.params.id))
        throw new HttpException('Bad ID param', HttpStatus.BAD_REQUEST);
    }
    next();
  }
}
