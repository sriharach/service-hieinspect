import { ModalEntityRaw } from "@/types/common/modal.entity";
import { IsUUID } from "class-validator";

export class ModelCategories extends ModalEntityRaw {
  id: string;
  name: string;
  is_active: boolean;
  cover_image: string
}

export class ModelCategoriesID {
  @IsUUID('4', { message: 'id ต้องเป็น UUID v4 เท่านั้น' })
  id: string;
}