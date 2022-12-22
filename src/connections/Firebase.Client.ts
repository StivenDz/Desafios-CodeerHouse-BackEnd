import firebase from "firebase-admin";

export class Firebase{
    public config:object;
    constructor(config:object){
        this.config = config
    }
    public async connect(){
        try{
            return firebase.initializeApp({
                credential: firebase.credential.cert(this.config)
                // databaseURL:"https://ecommerce-5021a.firebaseio.com"
            })
        }catch(err){
            return null;
        }
    }
}