import inquirer from "inquirer";
import chalk from "chalk";
async function getUserNameInput() {
    const UserNameInput = await inquirer.prompt({
        name: "username",
        type: "input",
        message: "Enter your username"
    });
    return UserNameInput.username.toLowerCase();
}
async function getUserEmailInput() {
    const UserEmailInput = await inquirer.prompt({
        name: "email",
        type: "input",
        message: "Enter your email"
    });
    const userEmail = UserEmailInput.email;
    return userEmail.toLowerCase();
}
async function getBalanceDepositInput() {
    const BalanceDepositAndWithdrawInput = await inquirer.prompt({
        name: "balance",
        type: "number",
        message: "Enter your depositing amount"
    });
    return BalanceDepositAndWithdrawInput.balance;
}
async function getBalanceWithdrawInput() {
    const BalanceWithdrawInput = await inquirer.prompt({
        name: "withdraw",
        type: "number",
        message: "Enter your withdraw amount"
    });
    return BalanceWithdrawInput.withdraw;
}
async function getLoginInput() {
    const LoginInput = await inquirer.prompt({
        name: "chose",
        type: "list",
        choices: ["deposit", "withdraw", "change pin", "logout"]
    });
    return LoginInput.chose;
}
async function getPinInput() {
    const PinInput = await inquirer.prompt({
        name: "pin",
        type: "number",
        message: "Enter your new pin"
    });
    return PinInput.pin;
}
async function getLoginOrRegisterInput() {
    const LoginOrRegisterInput = await inquirer.prompt({
        name: "loginOrRegister",
        type: "list",
        choices: ["login", "register", "exit"],
        message: "Do you want to login or Register"
    });
    return LoginOrRegisterInput.loginOrRegister;
}
const users = [];
/*
* @note generateUniqueId: This function generate some number using current time and random number and combine then.
* then we return it to use the generated number in other functions
*/
function generateUniqueId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 100);
    const uniqueId = timestamp * 100 + random;
    return uniqueId;
}
// console.log(`generated ID ${generateUniqueId()}`);
async function isValidPin(pin) {
    const pinString = pin.toString();
    const isValid = pinString.length === 4 && /^\d+$/.test(pinString);
    if (isValid) {
        return pin;
    }
    else {
        return undefined;
    }
}
async function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailTest = emailRegex.test(email);
    if (emailTest) {
        return email;
    }
    else {
        return undefined;
    }
}
async function loginOrRegister() {
    const choices = await getLoginOrRegisterInput();
    if (choices === "login") {
        console.log(`Please enter your username and pin`);
        const userName = await getUserNameInput();
        const pin = await getPinInput();
        login(userName, pin);
    }
    else if (choices === "register") {
        const userName = await getUserNameInput();
        const pin = await getPinInput();
        const email = await getUserEmailInput();
        register(userName, email, pin);
    }
    else if (choices === "exit") {
        console.log(`Good bye, have a good day`);
    }
}
loginOrRegister();
/*
* @param userName: name of user
* @param userId: unique id of user
* @param userPin: user pin to access the account
* @note
*/
async function register(userName, userEmail, userPin) {
    const userIndex = await checkUserName(userName);
    const userEmailIndex = await checkUserEmail(userEmail);
    const pin = await isValidPin(userPin);
    const email = await isValidEmail(userEmail);
    if (userIndex === -1 && pin !== undefined && email !== undefined && userEmailIndex === -1) {
        const userId = generateUniqueId();
        const newUser = { userName, userEmail: userEmail || '', userId, userPin, userBalance: 0 };
        users.push(newUser);
        console.log(chalk.green(`Welcome ${userName}, Thanks for registration`));
        console.log(chalk.blue(`Make your first deposit`));
        const amount = await getBalanceDepositInput();
        await balanceDeposit(userName, amount);
        login(userName, userPin);
    }
    else if (userIndex === 0) {
        console.log(chalk.red(`Username already registered`));
        loginOrRegister();
    }
    else if (userEmailIndex === 0) {
        console.log(chalk.red(`Email is already registered`));
    }
    else {
        console.log(chalk.red(`Invalid credentials`));
        loginOrRegister();
    }
}
async function balanceDeposit(userName, amount) {
    const userIndex = await checkUserName(userName);
    if (userIndex !== -1) {
        users[userIndex].userBalance += amount;
        console.log(`${amount} Amount deposit successfully`);
        console.log(`Total amount ${users[userIndex].userBalance}`);
    }
    else {
        console.log(`User not found`);
    }
}
async function withDraw(userName, amount) {
    const userIndex = await checkUserName(userName);
    let balance = users[userIndex].userBalance;
    if (userIndex !== -1) {
        if (balance !== 0 && balance > amount) {
            balance -= amount;
            console.log(`${amount} Amount withdraw successfully`);
            console.log(`Total amount ${balance}`);
        }
        else {
            console.log(`Balance is not enough`);
        }
    }
    else {
        console.log(`User not found`);
    }
}
async function login(userName, userPin) {
    let loggedIn = false;
    const userIndex = await checkUserName(userName);
    const user = users.find(user => user.userPin === userPin);
    if (userIndex !== -1 && user && user.userPin === userPin) {
        while (!loggedIn) {
            console.log(`Welcome back, ${userName}`);
            const choices = await getLoginInput();
            if (choices === "deposit") {
                const amount = await getBalanceDepositInput();
                balanceDeposit(userName, amount);
            }
            else if (choices === "withdraw") {
                const amount = await getBalanceWithdrawInput();
                withDraw(userName, amount);
            }
            else if (choices === "change pin") {
                const pin = await getPinInput();
                const newPin = await isValidPin(pin);
                if (newPin !== undefined) {
                    users[userIndex].userPin = newPin;
                    loggedIn = true;
                    await loginOrRegister();
                }
            }
            else if (choices === "logout") {
                loggedIn = true;
                loginOrRegister();
            }
        }
    }
    else {
        console.log(`Invalid credential please try again`);
        loginOrRegister();
    }
}
async function checkUserName(userName) {
    const userIndex = users.findIndex(user => user.userName === userName);
    return userIndex;
}
async function checkUserEmail(userEmail) {
    const userEmailIndex = users.findIndex(user => user.userEmail === userEmail);
    return userEmailIndex;
}
