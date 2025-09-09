 const bcrypt = require('bcrypt');
 const fs = require('fs');
 const readline = require('readline');

 const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

// Functions


//Guardar devuelve contraseña hasheada
async function hashPassword(password) {
     const hash = await bcrypt.hash(password,10);
     return hash;  
 }

 //Recibe inputs del usuario
function ask(pregunta) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    return new Promise(resolve => {
      rl.question(pregunta, respuesta => {
        rl.close();
        resolve(respuesta);
      });
    });
  }

//Muestra menu principal
function showMenu(){console.log("=======================");
    console.log(" Welcome to the system");
    console.log("=======================");
    console.log("1.Login");
    console.log("2.Register");
    console.log("3.Salir")}


// Flujo del codigo
async function main(){

    let exit=false;

    while (exit==false) {
        showMenu();
        const data = fs.readFileSync('accounts.json', 'utf8'); // Lectura del json accounts
        const usuarios = JSON.parse(data); // Almacenar datos en una variable
        const option = await ask("Type an option: ");
        switch (option) {
            case "1":
                const emailAcces = await ask("Enter your email: ");
                const emailAccessValid = usuarios.find(usuario => usuario.email === emailAcces);
                if(!emailAccessValid){console.log("Email not found");break;}
                const passwordAcces = await ask("Enter your password: ");
                const match = await bcrypt.compare(passwordAcces, emailAccessValid.password);
                if (match) {
                    console.log("✅ Login succesfull.");
                  } else {
                    console.log("❌ Wrong password, try again.");
                  }
                await logged(emailAccessValid,usuarios);
                break;
            case "2":
                const emailRegister = await ask("Enter your email: ");
                const emailRegisterValid = usuarios.some(usuario => usuario.email === emailRegister);
                if(emailRegisterValid){console.log("Email already exists");break;}
                const passwordRegister = await ask("Enter your password: ");
                const passwordRegisterConfirm = await ask ("Confirm your password: ");
                if (passwordRegister!=passwordRegisterConfirm){console.log("The passwords doesn't match");break;}
                const passwordHashed = await hashPassword(passwordRegister);
                const newUser = {email:emailRegister,password:passwordHashed};
                usuarios.push(newUser);
                fs.writeFileSync("accounts.json", JSON.stringify(usuarios, null, 2), 'utf8');
                console.log("User has been created succesfuly");
                break;
            case "3":
                console.log("Saliendo");
                exit=true;
                break;
            default:
                console.log("Ingrese una opcion correcta")
                break;
        }
    }
}

// Opciones sesion iniciada

async function logged(emailAccessValid,usuarios) {
    let closeSesion = false;
    while (closeSesion==false) {
        loggedMenu();
        const optionLogged = await ask("Type an option: ");
        switch (optionLogged) {
            case "1":
                const newPassword = await ask("Enter your new password: ");
                const newPasswordConfirm = await ask("Confirm your new password: ");
                if(newPassword!=newPasswordConfirm){console.log("Passwords doesnt match");break;};
                const newPasswordHashed = await hashPassword(newPassword);
                emailAccessValid.password=newPasswordHashed;
                fs.writeFileSync("accounts.json", JSON.stringify(usuarios, null, 2), 'utf8');
                console.log("Password changed nicely");
                break;
            case "2":
                console.log("xd")
                break;
            case "3":
                console.log("nice");
                break;
            default:
                console.log("Type a correct option")
                break;
        }
    }
}

// Menu sesion iniciada

function loggedMenu(){
    console.log(" Seleccione una opcion");
    console.log("-----------------------")
    console.log("1.Cambiar contraseña");
    console.log("2.Eliminar cuenta");
    console.log("3.Salir")
}




// hasheo("13132").then(hash=>{console.log("La clave es:",hash)})  Forma de catchear clave en hash

// Code Flow

main()