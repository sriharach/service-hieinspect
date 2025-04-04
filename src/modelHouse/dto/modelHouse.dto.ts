import { ModelHouseImage } from "@/modelHouseImage/dto/modelHouseImage.dto";
import { ModalEntityRaw } from "@/types/common/modal.entity";

export class ModelHouse extends ModalEntityRaw {
  id: string;
  name: string;
  is_active: boolean;
  category_house_id?: string
  service_category_house_id?: string
  realitys_id?: string
  house_images_upload: Pick<ModelHouseImage, 'path_name' | 'file_name'>[]
  code_house?: string

  include_filename?: string[]
  exclude_filename?: string[]
}