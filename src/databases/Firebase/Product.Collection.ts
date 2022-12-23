import {
    getFirestore,
    doc, 
    collection,
    // getDoc,
    getDocs,
    query,
    where,
    limit,
    // setDoc,
    addDoc,
    updateDoc,
    // deleteField
} from 'firebase/firestore';
import { Product } from "@types";
import { FirebaseConnection } from "../..";

export class ProductCollection {

    public static async DB() {
        const db = await FirebaseConnection;
        if (db) return getFirestore(db);
        else throw new Error("Error Connecting to firebase")
    }

    public static async SELECT() {
        let result;
        const db = await this.DB();
        const products = collection(db, 'products');

        await getDocs(products)
            .then((res )=> {
                res.docs.map((doc)=> (
                    result = ({id:doc.id, ...doc.data()})
                ))
            })
            .catch(_err => console.log("Error in FirebaseService - SELECT"))

        return result;
    }

    public static async SELECT_ID(productId:string){
        let result;

        const db = await this.DB();
        const queryResult = query(
            collection(db, 'products'),
            where("productId","==",productId),
            limit(1)
        );

        await getDocs(queryResult)
            .then((res )=> {
                res.size === 0 ? 
                    console.log("this product doesn't exist") 
                    :
                    res.docs.map((doc)=> (
                        result = ({id:doc.id, ...doc.data()})
                    ))
            })
            .catch(_err => console.log("Error in FirebaseService - SELECT_ID"))

        return result;
    }

    public static async INSERT(product:Product){
        let result = null
        const db = await this.DB();
        await this.SELECT_ID(product.productId)
            .then(res => result = res)
            .catch(_err => console.log("err executing getSpecificUserByEmail"))
    
        !result &&
            await addDoc(collection(db, "products"), product)
                .then(res => localStorage.setItem("uid",res.id))
                .catch(_err => console.log("err inserting new user!"))
    }
    
    public static async UPDATE(product:Product){
        let result:any;
        const db = await this.DB();
        await this.SELECT_ID(product.productId)
            .then(res => result = res)
            .catch(_err => console.log("err executing getSpecificUserByEmail"))

        result && await updateDoc(doc(db, "products", result.id),{...product});
    }
}