export interface HouseSelection {
    id: string;
    title: string;
    address: string;
    img: string;
    landlord: string;
    size: string;
    room: string;
  }
  
  export interface Application {
    _id: string;
    user: string;
    houseselection: HouseSelection[];
  }