export class ModalEntityRaw {
  created_date?: Date;
  created_by?: string;
  updated_date?: Date;
  updated_by?: string;
}

export class tokenJwtPayload {
  id: string
  username: string
  first_name: string | null
  last_name: string | null
  is_active: true
  role_name: string
  iat: number
  exp: number
}