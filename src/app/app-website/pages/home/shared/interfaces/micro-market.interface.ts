export interface IMicroMarket {
  id: number,
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
