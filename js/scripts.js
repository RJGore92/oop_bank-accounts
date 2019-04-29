function BankAccountList() {
  this.allAccountsInfo = [],
  this.accountCount = 0
}

BankAccountList.prototype.addAccount = function (bankAccount) {
  bankAccount.accountID = this.assignBankAccID();
  this.allAccountsInfo.push(bankAccount);
};

BankAccountList.prototype.assignBankAccID = function () {
  this.accountCount += 1;
  return this.accountCount;
};

BankAccountList.prototype.readAccountInfo = function (accountId) {
  for (var i = 0; i < this.allAccountsInfo.length; i++) {
    if (this.allAccountsInfo[i]) {
      if (this.allAccountsInfo[i].accountID == accountId) {
        return this.allAccountsInfo[i];
      }
    }
  }
  return false;
}

BankAccountList.prototype.deleteAccount = function (accountId) {
  for (var i = 0; i < this.allAccountsInfo.length; i++) {
    if (this.allAccountsInfo[i]) {
      if (this.allAccountsInfo[i].accountID == accountId) {
        delete this.allAccountsInfo[i];
        return true;
      }
    }
  }
  return false;
}

var currentBankAccountList = new BankAccountList();

function evaluateValidAddress(addressIn) {
  var addressToSplit = addressIn;
  var addressSplit = addressToSplit.split("");
  for (var i = 0; i < addressSplit.length; i++) {
    if((addressSplit[i] != "") || (addressSplit[i] != " "))
    {
      return true;
    }
  }
  return false;
}

function BankAccount(accountHolder, bankDetails, accountFunds) {
  this.accountHolder = accountHolder,
  this.bankDetails = bankDetails,
  this.accountFunds = accountFunds
}

BankAccount.prototype.updateFunds = function (targetNumber) {
  var spanIDToTarget = this.accountID;
  $("span#account"+spanIDToTarget+"-funds").text(targetNumber);
};

BankAccount.prototype.determineOverdraft = function (removalVal) {
  var moneyBeingRemoved = parseFloat(removalVal).toFixed(2);
  var bankFunds = parseFloat(this.accountFunds).toFixed(2);
  if (removalVal > this.accountFunds) {
    return true;
  }
  else {
    return false;
  }
};

BankAccount.prototype.withdrawFunds = function (withdrawVal) {
  var initialFunds = parseFloat(this.accountFunds);
  var moneyToWithdraw = parseFloat(withdrawVal);
  if (!(this.determineOverdraft(moneyToWithdraw))) {
    var moneyDifference = initialFunds - moneyToWithdraw;
    this.accountFunds = moneyDifference;
    this.updateFunds(parseFloat(moneyDifference).toFixed(2));
    console.log(this.accountFunds);
    return true;
  }
  else {
    alert("You are attempting to withdraw too much money.  Be mindful of this in the future as to not suffer overdraft fees.")
    return false;
  }
};

BankAccount.prototype.depositFunds = function (depositVal) {
  var initialFunds = this.accountFunds;
  var moneyToDeposit = depositVal;
  var moneySum = parseFloat(initialFunds) + parseFloat(moneyToDeposit);
  console.log(typeof(moneySum));
  this.accountFunds = moneySum;
  this.updateFunds(parseFloat(moneySum).toFixed(2));
  console.log(this.accountFunds);
  return true;
};

BankAccount.prototype.transferFunds = function (targetAccID, transferVal) {
  var moneyToTransfer = parseFloat(transferVal).toFixed(2);
  var accountTransferTarget = currentBankAccountList.readAccountInfo(targetAccID);
  if (targetAccID == this.accountID) {
    alert("Please select a different bank account to transfer funds to instead of this account.")
    return false;
  }
  if ((accountTransferTarget != false) && (this.determineOverdraft(moneyToTransfer) != true)) {
    accountTransferTarget.accountFunds += moneyToTransfer;
    this.accountFunds -= moneyToTransfer;
    this.updateFunds();
    accountTransferTarget.updateFunds();
    return true;
  }
  else {
    return false;
  }
};

BankAccount.prototype.printDataToOutput = function (pendingID) {
  var pendingAccountNumber = pendingID + 1;
  var bankAccountRead = this.bankDetails.length - 1;
  $("div.account-output-div").append(
    "<div class='jumbotron account-main-background' id='bank-account" + pendingAccountNumber + "'>" +
      "<h3>" + this.accountHolder + "'s " + this.bankDetails[bankAccountRead] + " account with " + this.bankDetails[0] + "</h3>" +
      "<div class='row'>" +
        "<div class='col-6'>"+
          "<div class='jumbotron account-background-left'>"+
            "<h4>State an amount of money below and what you want to do with it.</h4><br>" +
            "<input type='number' id='account-manipulation"+ pendingAccountNumber +"' step='0.01' value='0.00' placeholder='0.00'>" +
          "</div>" +
        "</div>" +
        "<div class='col-6'>"+
          "<div class='jumbotron account-background-right'>"+
            "<h4>Below is how much money is in this account presently.</h4><br>" +
            "<div class='account-funds'>" +
              "<h5>$<span id='account" + pendingAccountNumber + "-funds'></span></h5>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>" +
      "<div class='jumbotron account-background-all'>" +
        "<div class='row'>" +
          "<div class='col-6'>" +
            "<button type='button' class='btn' value='" + pendingAccountNumber + "' onclick='depositToAccount(this.value)'>Deposit</button>" +
          "</div>" +
          "<div class='col-6'>" +
            "<button type='button' class='btn' value='" + pendingAccountNumber + "' onclick='withdrawFromAccount(this.value)'>Withdraw</button>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>"
  );
  this.updateFunds(parseFloat($("input#initial-deposit-input").val()).toFixed(2));
};

function depositToAccount(accountTarget) {
  var bankAccountToRead = currentBankAccountList.readAccountInfo(accountTarget);
  var moneyToDeposit = parseFloat($("input#account-manipulation" + accountTarget).val()).toFixed(2);
  bankAccountToRead.depositFunds(moneyToDeposit);
  bankAccountToRead.updateFunds();
}

function withdrawFromAccount(accountTarget) {
  var bankAccountToRead = currentBankAccountList.readAccountInfo(accountTarget);
  var moneyToWithdraw = parseFloat($("input#account-manipulation" + accountTarget).val()).toFixed(2);
  bankAccountToRead.withdrawFunds(moneyToWithdraw);
  bankAccountToRead.updateFunds();
}

function pruneInfoWhiteSpace(infoPoints) {
  var infoToTrim = infoPoints;
  var phaseOneTrim = infoToTrim.trim();
  var phaseTwoTrim = phaseOneTrim.split(" ");
  var phaseThreeTrim = phaseTwoTrim.filter(data => data.length > 0);
  var finalPhaseTrim = phaseThreeTrim.join(" ");
  console.log(finalPhaseTrim);
  return finalPhaseTrim;
}


function advanceFormOne() {
  $("span.first-name-temp").text($("input#first-name-input").val());
  $("span.last-name-temp").text($("input#last-name-input").val());
  $("div#form-stage-one").slideToggle();
  $("div#form-stage-two").slideToggle();
}

function advanceFormTwo() {
  $("span.bank-name-temp").text($("input#bank-name-input").val());
  var addressCheck = $("input#bank-address-input").val();
  if (evaluateValidAddress(addressCheck) == true) {
    $("span.bank-add-temp").show();
    $("span.bank-add-temp").text(addressCheck);
  }
  $("div#form-stage-two").slideToggle();
  $("div#form-stage-three").slideToggle();
}

function revertFormOne() {
  $("span.first-name-temp").text("");
  $("span.last-name-temp").text("");
  $("div#form-stage-two").slideToggle();
  $("div#form-stage-one").slideToggle();
}

function revertFormTwo() {
  $("span.bank-name-temp").text("");
  $("span.bank-add-temp").hide();
  $("span.bank-add-temp").text("");
  $("div#form-stage-two").slideToggle();
  $("div#form-stage-three").slideToggle();
}

function revertFull() {
  $("span.first-name-temp").text("");
  $("span.last-name-temp").text("");
  $("span.bank-name-temp").text("");
  $("span.bank-add-temp").hide();
  $("span.bank-add-temp").text("");
  $("div#form-stage-one").slideToggle();
  $("div#form-stage-three").slideToggle();
}

function newAccFullReset() {
  $("div#form-restart-buttons").slideToggle();
  $("div#form-stage-one").slideToggle();
  $("span.first-name-temp").text("");
  $("span.last-name-temp").text("");
  $("span.bank-name-temp").text("");
  $("span.bank-add-temp").hide();
  $("span.bank-add-temp").text("");
  $("input#first-name-input").val("John");
  $("input#last-name-input").val("Doe");
  $("input#bank-name-input").val("Epicodus Credit Union");
  $("input#bank-address-input").val("");
  $("select#account-type-input").selectedIndex = 0;
  $("input#initial-deposit-input").val(0.00);
}

function newAccRetainNameOnly() {
  $("div#form-restart-buttons").slideToggle();
  $("div#form-stage-two").slideToggle();
  $("span.bank-name-temp").text("");
  $("span.bank-add-temp").hide();
  $("span.bank-add-temp").text("");
  $("input#bank-name-input").val("Epicodus Credit Union");
  $("input#bank-address-input").val("");
  $("select#account-type-input").selectedIndex = 0;
  $("input#initial-deposit-input").val(0.00);
}

function newAccRetainNameAndBank() {
  $("div#form-restart-buttons").slideToggle();
  $("div#form-stage-three").slideToggle();
  $("select#account-type-input").selectedIndex = 0;
  $("input#initial-deposit-input").val(0.00);
}

function generateFullName(firstName, lastName) {
  return firstName + " " + lastName;
}

$(document).ready(function() {
  var pendingBankAccountNumber = 0;
  $("form#account-creator").submit(function(event) {
    event.preventDefault();
    var firstNameIn = $("input#first-name-input").val();
    console.log(firstNameIn);
    var firstNameRefined = pruneInfoWhiteSpace(firstNameIn);
    var lastNameIn = $("input#last-name-input").val();
    var lastNameRefined = pruneInfoWhiteSpace(lastNameIn);
    var fullName = generateFullName(firstNameRefined, lastNameRefined);
    console.log(fullName);
    var bankNameIn = $("input#bank-name-input").val();
    var bankNameRefined = pruneInfoWhiteSpace(bankNameIn);
    var bankDetailsIn = [];
    bankDetailsIn.push(bankNameRefined);
    var bankAddressIn = $("input#bank-address-input").val();
    if(evaluateValidAddress(bankAddressIn)) {
      var bankAddressRefined = pruneInfoWhiteSpace(bankAddressIn);
      bankDetailsIn.push(prunedAddressRefined);
    }
    var bankAccountTypeIn = $("select#account-type-input").val();
    if (bankAccountTypeIn == 0) {
      alert("Please select a bank account type that you wish to open.");
      return false;
    }
    bankDetailsIn.push(bankAccountTypeIn);
    var accountInitialFunds = parseFloat($("input#initial-deposit-input").val());
    console.log(typeof(accountInitialFunds));
    var pendingBankAccount = new BankAccount(fullName, bankDetailsIn, accountInitialFunds);
    currentBankAccountList.addAccount(pendingBankAccount);
    pendingBankAccount.printDataToOutput(pendingBankAccountNumber);
    pendingBankAccountNumber += 1;
    $("div#form-stage-three").slideToggle();
    $("div#form-restart-buttons").slideToggle();
  });
});
