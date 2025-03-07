import { ModalEntityRaw } from "@/types/common/modal.entity";

export class ModelUser extends ModalEntityRaw {
  id?: string;
  role_id?: string;
  user_name: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
}
