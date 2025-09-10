// Call of librarys
 
 const bcrypt = require('bcrypt');
 const fs = require('fs');
 const readline = require('readline');
 const clear = require ('clear');
 const chalk = require('chalk');  // chalk@4
/////Functions

//Turn the password to a hashed password and return it
async function hashPassword(password) {
     const hash = await bcrypt.hash(password,10);
     return hash;  
 }

 //Inputs on console
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

//Funtion setOut
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

//Show main menu
function showMenu(){console.log("=======================");
    console.log(" Welcome to the system");
    console.log("=======================");
    console.log("1.Login");
    console.log("2.Register");
    console.log("3.Exit");
    console.log("-----------------------");}


// Flow of main menu
async function main(){

    let exit=false; // Set exit as a false, to enter in the loop

    while (exit==false) {
        showMenu(); // show menu
        const data = fs.readFileSync('accounts.json', 'utf8'); // Read the accounts.json
        const users = JSON.parse(data); // Locks data of the json in a variable
        const option = await ask("Type an option: "); // Get an input from the user
        switch (option) {
            case "1":
                clear(); 
                const emailAccess = await ask("Enter your email: ");
                const emailAccessValid = users.find(usuario => usuario.email === emailAccess); //Confirm that the email gave from the users exits
                if(!emailAccessValid){console.log(chalk.red("Email not found")); console.log("-----------------------");await sleep(1500);break;}
                const passwordAccess = await ask("Enter your password: ");
                const match = await bcrypt.compare(passwordAccess, emailAccessValid.password);
                if (match) {
                    console.log(chalk.green("Login succesfully."));
                    console.log("-----------------------");
                    await sleep(1500);
                  } else {
                    console.log(chalk.red(" Wrong password, try again."));
                    console.log("-----------------------");
                    await sleep(1500);
                    break;}
                await logged(emailAccessValid,users);
                break;
            case "2":
                clear();
                const emailRegister = await ask("Enter your email: ");
                const emailRegisterValid = users.some(usuario => usuario.email === emailRegister);
                if(emailRegisterValid){console.log(chalk.red("Email already exists")); console.log("-----------------------");await sleep(1500);break;}
                const passwordRegister = await ask("Enter your password: ");
                const passwordRegisterConfirm = await ask ("Confirm your password: ");
                clear();
                if (passwordRegister!=passwordRegisterConfirm){console.log(chalk.red("The passwords don't match")); console.log("-----------------------");await sleep(1500);break;}
                const passwordHashed = await hashPassword(passwordRegister);
                const newUser = {email:emailRegister,password:passwordHashed};
                users.push(newUser);
                fs.writeFileSync("accounts.json", JSON.stringify(users, null, 2), 'utf8');
                console.log(chalk.green("User has been created succesfully"));
                console.log("-----------------------");
                await sleep(1500);
                break;
            case "3":
                clear();
                console.log("Exit...");
                await sleep(2000);
                exit=true;
                break;
            default:
                clear();
                console.log(chalk.yellow("-----------------------"));
                console.log(chalk.yellow("Choose a correct option"));
                console.log(chalk.yellow("-----------------------"));
                await sleep(1000);
                break;
        }
        clear();
    }
}

// Opciones sesion iniciada

async function logged(emailAccessValid,users) {
    let closeSesion = false;
    while (closeSesion==false) {
        clear();
        loggedMenu();
        const optionLogged = await ask("Type an option: ");
        switch (optionLogged) {
            case "1":
                clear();
                const newPassword = await ask("Enter your new password: ");
                const newPasswordConfirm = await ask("Confirm your new password: ");
                if(newPassword!=newPasswordConfirm){console.log(chalk.red("Passwords don't match")); console.log("-----------------------");await sleep(1500);break;};
                const newPasswordHashed = await hashPassword(newPassword);
                emailAccessValid.password=newPasswordHashed;
                fs.writeFileSync("accounts.json", JSON.stringify(users, null, 2), 'utf8');
                console.log(chalk.green("Password changed succesfully"));
                console.log("-----------------------");
                await sleep(1500);
                break;
            case "2":
                clear();
                const newEmail = await ask("Enter your new email: ");
                const newEmailConfirm = await ask("Confirm your new email: ");
                if (newEmail!=newEmailConfirm){console.log(chalk.red("The emails don't match")); console.log("-----------------------");await sleep(1500);break;}
                emailAccessValid.email=newEmail;
                fs.writeFileSync("accounts.json", JSON.stringify(users, null, 2), 'utf8');
                console.log(chalk.green("Your email was changed"));
                console.log("-----------------------");
                await sleep(1500);
                break;
            case "3":
                closeSesion=true;
                console.log("Exit...");
                await sleep(1500);
                break;
            default:
                console.log(chalk.yellow("Type a correct option"));
                console.log("-----------------------");
                await sleep(1000);
                break;
        }
        clear();
    }
}

// Menu sesion iniciada

function loggedMenu(){
    console.log(" Choose an option");
    console.log("-----------------------")
    console.log("1.Change your password");
    console.log("2.Change your email");
    console.log("3.Exit")
    console.log("-----------------------");
}




// Code Flow

main()