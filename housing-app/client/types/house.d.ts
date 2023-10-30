export interface House {
  monthlyCost:    ReactNode;
  _id:            string;
  adress:         string; 
  size:           string;
  numberOfRooms:  string;
  img:            string[]; 
  cost:           string;
  description:    string;
  period:         string;
  type:           string;
  city:           string;
  zipcode:        string;
  titel:          string; 
  firstDate:      Date;
  floor:          number;
  recommendation: number;
  extras:         string[];
  landlord:       string[];
}
