import { ModalEntityRaw } from '@/types/common/modal.entity';
import { IsUUID } from 'class-validator';

export class ModelRealtys extends ModalEntityRaw {
  id: string;
  name: string;
  is_active: boolean;
}

export class ModelRealtysID {
  @IsUUID('4', { message: 'id ต้องเป็น UUID v4 เท่านั้น' })
  id: string;
}
