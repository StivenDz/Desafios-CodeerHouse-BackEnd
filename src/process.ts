process.on("message",(num:number)=>{
    const result:Array<any> = [];
    for (let i = 0; i <= num; i++) {
        const randomNumber = Math.floor(Math.random() * 1000);
        console.log(randomNumber);
        
        result[i] = randomNumber;
    };
    let object = getObject(result);
    if(process.send){
        process.send(object);
        process.exit();
    };
});

const getObject = (array:Array<number>):any =>{
    let object:any = {};
    //array = array.sort((n1,n2) => n1 - n2)
    for (let i = 0; i < array.length; i++) {
        if(array.indexOf(array[i]) == i) object[`N_${array[i]}`] = 1;
        else {
            object[`N_${array[i]}`] = object[`N_${array[i]}`] + 1;
        }
    }

    return object;
}