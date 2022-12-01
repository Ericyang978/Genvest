import { Double } from "react-native/Libraries/Types/CodegenTypes";

export interface UserAttributes {
    userId: string;
    name: string;
    email: string; 
    age: number;   
    phoneNumber: string;
    connectedAccounts: [string]; 
    connectedAccountEmails: [string]; 

}
