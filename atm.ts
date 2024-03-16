import inquirer from "inquirer";
import chalk from "chalk";


/*
* User interface is to insure the types of user details
*/
interface User {
    userName: string,
    userEmail: string,
    userId: number,
    userPin: number,
    userBalance: number
}

/*
* @note getUserNameInput get username input from user and return the value. it is used to take UserName when a user login or register
*/
async function getUserNameInput() {
    const UserNameInput = await inquirer.prompt({
        name: "username",
        type: "input",
        message: "Enter your username"
    });
    return UserNameInput.username.toLowerCase();
}

/*
* @note getUserEmailInput get user email input from user and return the value. it is used to take user email when a user login or register
*/
async function getUserEmailInput() {
    const UserEmailInput = await inquirer.prompt({
        name: "email",
        type: "input",
        message: "Enter your email"
    });
    const userEmail: string =  UserEmailInput.email;
    return userEmail.toLowerCase()
}

/*
* @note getBalanceDepositInput get number input from user and return the value. it is used to take amount when a user deposit balance
*/
async function getBalanceDepositInput() {
    const BalanceDepositAndWithdrawInput = await inquirer.prompt({ 
        name: "balance", 
        type: "number", 
        message: "Enter your depositing amount" 
    });
    return BalanceDepositAndWithdrawInput.balance;
}

/*
* @note getBalanceDepositInput get number input from user and return the value. it is used to take amount when a user withdraw balance
*/
async function getBalanceWithdrawInput() {
    const BalanceWithdrawInput = await inquirer.prompt({
        name: "withdraw", 
        type: "number", 
        message: "Enter your withdraw amount"
    });
    return BalanceWithdrawInput.withdraw;
}

/*
* @note getLoginInput get one element input from user and return the value. it is used to chose one choice when you are login
*/
async function getLoginInput() {
    const LoginInput = await inquirer.prompt({
        name: "chose",
        type: "list",
        choices: ["deposit", "withdraw", "change pin", "logout"]
    });
    return LoginInput.chose;
}

/*
* @note getPinInput get number input from user and return the value. it is used to take pin when a user login or register or changing pin
*/
async function getPinInput() {
    const PinInput = await inquirer.prompt({
        name: "pin",
        type: "number",
        message: "Enter new pin"
    });
    return PinInput.pin;
}

/*
* @note getLoginOrRegisterInput get element input from user and return the value. it is used to chose one choice when you are start the program
*/
async function getLoginOrRegisterInput() {
    const LoginOrRegisterInput = await inquirer.prompt({
        name: "loginOrRegister",
        type: "list",
        choices: ["login", "register", "exit"],
        message: "Do you want to login or Register"
    });
    return LoginOrRegisterInput.loginOrRegister;
}

// it store the users detail
const users: User[] = []

/*
* @note generateUniqueId: This function generate some number using current time and random number and combine then. 
* then we return it to use the generated number in other functions
*/

function generateUniqueId(): number {
    const timestamp: number = Date.now();
    const random: number = Math.floor(Math.random() * 100);
    const uniqueId: number = timestamp * 100 + random
    return uniqueId
}

/*
* @param pin takes user input pin to to check that its only 4 digit and only number
* @note isValidPin take one param and return two things ( number and undefined ) if the pin is valid function return the pin and 
*   if the pin in not valid it return undefined
*/

async function isValidPin(pin: number): Promise<number | undefined> {
    const pinString: string = pin.toString();
    const isValid: boolean = pinString.length === 4 && /^\d+$/.test(pinString);
    if (isValid) {
        return pin;
    } else {
        return undefined;
    }
}

/*
* @param email takes user input email
* @note isValidEmail take one param and return two things ( number and undefined ). It check the user input email to ensure its valid or not. 
*   if the email is valid it return the email and if the email is not valid it return undefined
*/

async function isValidEmail(email: string): Promise<string | undefined> {
    // Regular expression for basic email validation
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailTest: boolean =  emailRegex.test(email);
    if(emailTest) {
        return email;
    } else {
        return undefined;
    }
}

/*
* @param userName get the username 
* @note checkUserName take one param and return a number. It get the username and find the index number of that username in users array to
*   check that user exist in users array or not. if username already exist in users array it return 0 otherwise it return -1. 
*/

async function checkUserName(userName: string): Promise<number> {
    const userIndex: number = users.findIndex(user => user.userName === userName);
    return userIndex;
}

/*
* @param userName get the username 
* @note checkUserName take one param and return a number. It get the username and find the index number of that username in users array to
*   check that user exist in users array or not. if username already exist in users array it return 0 otherwise it return -1. 
*/

async function checkUserEmail(userEmail: string): Promise<number> {
    const userEmailIndex = users.findIndex(user => user.userEmail === userEmail);
    return userEmailIndex;
}


/*
 * @note The loginOrRegister function runs when the program starts. It first asks the user what they want to do: "register", "login",
 *       or "exit", using the getLoginOrRegisterInput function. If the user chooses to login, this function prompts for "username" and "userPin"
 *       and then leads the user to the login function. If the user wants to register, it asks for "username", "userPin", and "userEmail"
 *       and leads the user to the register function. If the user chooses to exit, it bids them farewell.
*/

async function loginOrRegister() {
    const choices = await getLoginOrRegisterInput();
    if (choices === "login") {
        console.log(`Please enter your username and pin`);
        const userName: string = await getUserNameInput();
        const pin: number = await getPinInput();
        login(userName, pin);

    } else if (choices === "register") {
        const userName: string = await getUserNameInput();
        const pin: number = await getPinInput();
        const email = await getUserEmailInput();
        register(userName, email, pin);

    } else if (choices === "exit") {
        console.log(`Good bye, have a good day`);
    }
}
// it will call the loginOrRegister function
loginOrRegister()

/*
 * @param userName: name of the user
 * @param userEmail: email address of the user
 * @param userPin: PIN for accessing the account
 * @note This function is used to register a new user. It takes three parameters: userName, userEmail, and userPin.
 *       First, it checks if the provided username and email are not already registered.
 *       Then it validates the PIN and email format. If everything is valid and unique,
 *       it generates a unique ID for the user, adds their details to the user list,
 *       and prompts them to make their first deposit. If the user is already registered,
 *       they are directed to either login or register again.
*/

async function register(userName: string, userEmail: string, userPin: number) {
    const userIndex = await checkUserName(userName);
    const userEmailIndex = await checkUserEmail(userEmail);
    const pin = await isValidPin(userPin);
    const email = await isValidEmail(userEmail);
    if (userIndex === -1 && pin !== undefined && email !== undefined && userEmailIndex === -1 ) {
        const userId: number = generateUniqueId();
        const newUser: User = {userName, userEmail: userEmail || '', userId, userPin, userBalance: 0}
        users.push(newUser);
        console.log(chalk.green(`\nWelcome ${userName}, Thanks for registration`));
        console.log(chalk.blue(`Make your first deposit\n`));
        const amount = await getBalanceDepositInput();
        await balanceDeposit(userName, amount);
        login(userName, userPin);
    } else if (userIndex === 0) {
        console.log(chalk.red(`Username already registered`));
        loginOrRegister();
    } else if (userEmailIndex === 0) {
        console.log(chalk.red(`Email is already registered`));
        loginOrRegister();
    } else {
        console.log(chalk.red(`Invalid credentials`));
        loginOrRegister();
    }
}

/*
 * @param userName: The name of the user trying to log in
 * @param userPin: The PIN associated with the user's account
 * @note The login function is used to authenticate users. It takes in the userName and userPin as parameters.
 *       It first checks if the provided username exists and if there is a user with the matching PIN.
 *       If both conditions are met, the user is considered logged in. They are then presented with options such as "deposit",
 *       "withdraw", "change pin", and "logout". Depending on their choice, the appropriate actions are taken.
 *       If the credentials are invalid, the user is prompted to try again or register.
*/

async function login(userName: string, userPin: number): Promise<void> {
    let loggedIn: boolean = false;

    const userIndex = await checkUserName(userName);
    const user = users.find(user => user.userPin === userPin);
    if (userIndex !== -1 && user && user.userPin === userPin) {
        while (!loggedIn) {
            console.log(`Welcome back, ${userName}`);
            const choices = await getLoginInput();
            if (choices === "deposit") {
                const amount: number = await getBalanceDepositInput();
                await balanceDeposit(userName,amount);
            } else if (choices === "withdraw") {
                const amount: number = await getBalanceWithdrawInput();
                await withDraw(userName, amount);
            } else if (choices === "change pin") {
                const pin: number = await getPinInput();
                const newPin = await isValidPin(pin);
                if (newPin !== undefined) {
                    users[userIndex].userPin = newPin;
                    loggedIn = true;
                    loginOrRegister()
                } else {
                    console.log(`invalid pin please try again`);
                    loggedIn = true;
                    loginOrRegister()
                }

            } else if (choices === "logout") {
                loggedIn = true;
                loginOrRegister()
            }
        }
    } else if (userIndex === -1) {
        console.log(`User not found`);
        loginOrRegister();
        
    } else {
        console.log(chalk.red(`Invalid credential please try again`));
        loginOrRegister();
    }
}

/*
 * @param userName: The name of the user making the deposit
 * @param amount: The amount to be deposited
 * @note The balanceDeposit function handles depositing funds into a user's account.
 *       It takes the userName and amount as parameters. First, it checks if the user exists.
 *       If the user is found, the amount is added to their existing balance and a success message is displayed.
 *       If the user is not found, an error message is displayed indicating that the user was not found.
*/

async function balanceDeposit(userName: string, amount: number): Promise<void> {
    const userIndex = await checkUserName(userName);
    if (userIndex !== -1) {
        users[userIndex].userBalance += amount;
        console.log(chalk.green(`\n${amount} Amount deposit successfully`));
        console.log(`Total amount ${users[userIndex].userBalance}\n`);
    } else {
        console.log(chalk.red(`User not found`));
    }
}

/*
 * @param userName: The name of the user making the withdrawal
 * @param amount: The amount to be withdrawn
 * @note The withDraw function handles withdrawing funds from a user's account.
 *       It takes the userName and amount as parameters. First, it checks if the user exists.
 *       If the user is found and has a balance greater than the withdrawal amount, the withdrawal is processed,
 *       and the new balance is displayed along with a success message.
 *       If the user is not found or if the balance is insufficient, appropriate error messages are displayed.
*/

async function withDraw(userName: string, amount: number): Promise<void> {
    const userIndex = await checkUserName(userName);
    let balance: number  = users[userIndex].userBalance;
    if (userIndex !== -1) {
        if (balance !== 0 && balance > amount) {
            balance -= amount;
            console.log(chalk.green(`\n${amount} Amount withdraw successfully`));
            console.log(`Total amount ${balance}\n`);
        } else {
            console.log(chalk.red(`Balance is not enough`));
        }
    } else {
        console.log(chalk.red(`User not found`));
    }
}
