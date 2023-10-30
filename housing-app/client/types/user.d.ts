export interface Users {
    _id:        string;
    firstName:  string;
    lastName:   string;
    email:      string;
    userName:   string;
    applications?: Application[]; 
}