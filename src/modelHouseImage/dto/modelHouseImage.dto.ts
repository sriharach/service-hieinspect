import { ModalEntityRaw } from "@/types/common/modal.entity";

export class ModelHouseImage extends ModalEntityRaw {
  id: string;
  model_house_id: string;
  file_name: string;
  path_name: string;
}