# Epicodus Unit 4.2: Object-Oriented JavaScript: Bank Accounts

#### Assignment Three of Object-Oriented JavaScript in unit 4.2, Start Date: 04/23/2019

#### By **Robert James "Jimmy" Gore**

## Description

The purpose of this project is to further demonstrate Object-Oriented Programming in an application in which the user is capable of creating and managing one or more bank accounts.  Each bank account will be an object with a handful of details, such as the type of account, money stored, bank name, account holder, and more if necessary.  Upon application startup, the program will ask for initial information regarding the account's owner, bank name, and initial deposit, as well as information regarding what type of account is being created.  When the account is created, a new display will be set to show display the info input as well as an interface to deposit and withdraw money from the account, or to make payments if the account is a type capable of doing so (such as a checking account or credit account).

With the account's creation, the program will request a minimum initial deposit greater than zero, and require information about the account's bank, account type, and holder.  After the creation of the account, the user interface will present an input on the left along with two buttons for depositing or withdrawing the amount of money that has been input.  A third button will be present in the event that the account is a checking account or credit account and will also apply a small "service fee" confirmation when clicked, assuming there is enough money in the account.  To the right of that will be the total money remaining in the account on display, and beneath both will be a toggleable option for reviewing transaction history.  Each account will be contained within its own jumbotron, and the transaction history will contain information up to a certain number of transactions.

## Setup/Installation Requirements

* Install Git Bash for Git repository cloning of the project
* Install Atom for review and edit of Code
* To access repository for project and review code, first clone repository at the appropriate link, then use Git Bash and/or Atom to open the project folder.
* GitHub (repository/pages) link is (Link here)

## Known Bugs

No known bugs are present in this project.

## Assignment Specs

* Upon application startup, the application will present a three-stage form for creating a bank account.  The user will be asked to fill out the following information in order.
1. First and last name.
2. Bank name (and optional bank address).
3. Select account type and state initial deposit.

* Once the account is "submitted", a new div appears below that allows the user to manipulate the account funds by depositing and withdrawing money.  In this div, there are three sections:
1. Top left: input for manipulating current account's money.
2. Top right: display for money left in account.
3. Bottom row: buttons to choose how to manipulate the money in the account (deposit or withdraw).

* Depositing money will add money to the account, withdrawing will remove.  Before a withdraw is made on button click, the program first checks to see if the withdraw amount is greater than the money left in the account.  If the money left is less than the attempted withdraw amount, the withdraw will fail and the user is alerted that withdrawing that much money will overdraft the account.

####  Inputs and outputs (examples):

* Form asks for name, bank info, and account details with initial deposit.  (name and bank info values are default, initial deposit and account type changed from default to demo)
  * Inputs: name (first and last): John Doe, bank name: Epicodus Credit Union, account type select: Checking, initial deposit: 150.00
  * Output: New div created beneath form with header "John Doe's Checking account with Epicodus Credit Union" and displays as described above in the second "specs" bullet point.

* Clicking the "deposit" button of a respective account div group's account will add the money in the account div's number input to the account and update the display.
  * Input: 25, account value at 150
  * Output: display adjustment to add $25 to the $150 in the account, the display presenting $175.00, return true.

* Clicking the "withdraw" button will attempt to remove money from the respective account's money value.  If the money value to withdraw is greater than the account's current money, it alerts the user about an overdraft and does not withdraw.  Otherwise, the withdraw goes through.
  * Input example A: input to withdraw: 15, money value in account is 150.
  * Output A: display adjusts to $135.00 in bank account's value, return true.

  * Input example A: input to withdraw: 35, money value in account is 25.
  * Output A: display does not adjust, alert given about overdraft, return false.

## Technologies Used

* Git Bash
* Atom
* HTML
* MD
* CSS
* Bootstrap
* JavaScript
* jQuery

### License

Copyright (c) 2019 **Robert James "Jimmy" Gore**
