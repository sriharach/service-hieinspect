import { ModelHouseImage } from "@/modelHouseImage/dto/modelHouseImage.dto";
import { ModalEntityRaw } from "@/types/common/modal.entity";
import { IsUUID } from 'class-validator';

export class ModelHouse extends ModalEntityRaw {
  id: string;
  name: string;
  is_active: boolean;
  category_house_id?: string
  service_category_house_id?: string
  realitys_id?: string
  house_images_upload: Pick<ModelHouseImage, 'path_name' | 'file_name'>[]
  code_house?: string
  main_img_house?: string

  include_filename?: string[]
  exclude_filename?: string[]
}

export class ModelHouseID {
  @IsUUID('4', { message: 'id ต้องเป็น UUID v4 เท่านั้น' })
  id: string;
}