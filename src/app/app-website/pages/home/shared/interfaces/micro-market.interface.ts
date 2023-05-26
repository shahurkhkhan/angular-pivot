export interface IMicroMarket {
  id: number,
  description: string,
  image: string,
  location_id: number,
  name: string,
  is_active: number,
  created_at: string,
  updated_at: number
}


export interface ILocation {
  id: number,
  name: string,
  is_active: number,
  created_at: string,
  updated_at: number
}
