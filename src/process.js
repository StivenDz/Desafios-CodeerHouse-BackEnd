process.on("message",(num)=>{
    const result = [];
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

const getObject = (array) =>{
    let object = {};
    //array = array.sort((n1,n2) => n1 - n2)
    for (let i = 0; i < array.length; i++) {
        if(array.indexOf(array[i]) == i) object[`N_${array[i]}`] = 1;
        else {
            object[`N_${array[i]}`] = object[`N_${array[i]}`] + 1;
        }
    }

    return object;
}