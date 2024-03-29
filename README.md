# Command Line Interface ATM Documentation

## Introduction
The Command Line Interface ATM is a TypeScript-based application designed to simulate basic ATM functionalities such as registration, login, balance inquiry, deposit, and withdrawal. It operates entirely through a command-line interface, providing users with a straightforward and interactive experience.

## Installation
To run the Command Line Interface ATM, ensure you have Node.js installed on your system. Additionally, you need to install the TypeScript compiler and the required dependencies using npm (Node Package Manager). Follow these steps:

1. Install TypeScript globally:
   ```
   npm install -g typescript
   ```

2. Install the necessary dependencies:
   ```
   npm install inquirer
   npm install --save-dev @types/inquirer
   ```

## Usage
To start the application, navigate to its directory in the terminal and execute the TypeScript file using the TypeScript compiler. Here's the command to run the application:

```
tsc filename.ts && node filename.js
```

Replace `filename.ts` with the name of your TypeScript file and `filename.js` with the corresponding JavaScript file generated by the TypeScript compiler.

## Functionality
The Command Line Interface ATM provides the following functionalities:

### 1. Registration
New users can register by providing a username, email, and PIN. Upon successful registration, users are prompted to make their initial deposit.

### 2. Login
Registered users can log in using their username and PIN. After successful authentication, users can perform various actions like deposit, withdrawal, changing PIN, or logging out.

### 3. Deposit
Users can deposit funds into their account by specifying the deposit amount. The deposited amount is added to their account balance.

### 4. Withdrawal
Users can withdraw funds from their account, provided they have a sufficient balance. The withdrawal amount is deducted from the account balance.

### 5. Change PIN
Registered users have the option to change their PIN for enhanced security.

## Code Structure
The code consists of several TypeScript functions and interfaces to handle different aspects of the application. Here's a brief overview of the main components:

### Interfaces
- **User**: Defines the structure of a user, including username, email, user ID, PIN, and balance.

### Functions
- **getUserNameInput()**: Retrieves the username input from the user.
- **getUserEmailInput()**: Retrieves the user's email input from the user.
- **getBalanceDepositInput()**: Retrieves the deposit amount input from the user.
- **getBalanceWithdrawInput()**: Retrieves the withdrawal amount input from the user.
- **getLoginInput()**: Retrieves the login option chosen by the user.
- **getPinInput()**: Retrieves the PIN input from the user.
- **getLoginOrRegisterInput()**: Retrieves the login or register option chosen by the user.
- **generateUniqueId()**: Generates a unique ID for new users based on the current timestamp.
- **isValidPin(pin: number)**: Validates the format of the PIN entered by the user.
- **isValidEmail(email: string)**: Validates the format of the email entered by the user.
- **checkUserName(userName: string)**: Checks if the username already exists in the system.
- **checkUserEmail(userEmail: string)**: Checks if the email already exists in the system.
- **loginOrRegister()**: Main function to initiate the login or registration process.
- **register(userName: string, userEmail: string, userPin: number)**: Registers a new user with the provided details.
- **login(userName: string, userPin: number)**: Authenticates a user and provides access to account functionalities.
- **balanceDeposit(userName: string, amount: number)**: Deposits funds into a user's account.
- **withDraw(userName: string, amount: number)**: Withdraws funds from a user's account.

## Conclusion
The Command Line Interface ATM offers a simple yet effective solution for managing banking operations through a command-line interface. With its user-friendly functionalities and straightforward implementation, it provides a convenient way for users to perform basic banking tasks.