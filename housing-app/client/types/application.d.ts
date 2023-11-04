export interface HouseSelection {
    id: string;
    zipcode: string;
    title: string;
    address: string;
    img: string;
    landlord: string;
    size: string;
    room: string;
    cost: number; 
    city: string;
    status: string;
  }
  
  export interface Application {
    _id: string;
    user: string;
    houseselection: HouseSelection[];
  }