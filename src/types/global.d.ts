import { tokenJwtPayload } from './common/modal.entity';

declare global {
  namespace Express {
    interface User extends tokenJwtPayload {}
  }
}
