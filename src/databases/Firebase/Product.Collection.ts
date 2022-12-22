import { Firebase } from "../../connections/Firebase.Client";
import { firebaseConfig } from "../../configs/Firebase.config";
import { Product } from "@types";

export class ProductCollection{
    public static async DB(){
        return (await new Firebase(firebaseConfig).connect())?.firestore().collection("products");
    }

    public static async CREATE(product:Product){
       return (await this.DB())?.doc().create(product);
    }
}