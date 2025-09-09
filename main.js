const bcrypt = require('bcrypt');
const saltRounds = 3;

// Functions

async function hashPassword(password) {
    const hash = await bcrypt.hash(password,saltRounds);
    return hash;  
}















// hasheo("13132").then(hash=>{console.log("La clave es:",hash)})  Forma de catchear clave en hash

// Code Flow

let salida=false;

while (salida=false) {
    console.log("")

    switch (userOption) {
        case value:
            
            break;
    
        default:
            break;
    }
}