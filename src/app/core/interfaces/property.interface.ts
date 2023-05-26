

export interface IProperty {
  id: number;
  name: string;
  user_id: number;
  buyorlease: number;
  type: number;
  availability: any[],
  location: any[],
  micromarket: number,
  description: string;
  sqft: number;
  rate: number;
  discount: number;
  price: number;
  address: string;
  address1: string;
  city: string;
  state: string;
  pincode: string;
  lat: string;
  lan: string;
  is_premium: number;
  types: any[],
  micro_market: any[],
  details: any[]
}
