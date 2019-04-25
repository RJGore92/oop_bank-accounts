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

BankAccount.prototype.updateFunds = function () {
  var fundsDataToUpdate = this.accountFunds;
  var spanIDToTarget = this.accountID;
};

BankAccount.prototype.determineOverdraft = function (removalVal) {
  if (removalVal > this.accountFunds) {
    return true;
  }
  else {
    return false;
  }
};

BankAccount.prototype.withdrawFunds = function (withdrawVal) {
  var moneyToWithdraw = parseFloat(withdrawVal).toFixed(2)
  if (!(determineOverdraft(moneyToWithdraw))) {
    this.accountFunds -= moneyToWithdraw;
    this.updateFunds();
    return true;
  }
  else {
    alert("You are attempting to withdraw too much money.  Be mindful of this in the future as to not suffer overdraft fees.")
    return false;
  }
};

BankAccount.prototype.depositFunds = function (depositVal) {
  var moneyToDeposit = parseFloat(depositVal).toFixed(2);
  this.accountFunds += moneyToDeposit;
  this.updateFunds();
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

BankAccount.prototype.printDataToOutput = function () {
  
};

function pruneInfoWhiteSpace(infoPoints) {
  var infoToTrim = infoPoints;
  var phaseOneTrim = infoToTrim.trim();
  var phaseTwoTrim = phaseOneTrim.split(" ");
  var phaseThreeTrim = phaseTwoTrim.filter(data => data.length > 0);
  finalPhaseTrim = phaseThreeTrim.join(" ");
  console.log(finalPhaseTrim);
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

function generateFullName(firstName, lastName) {
  return firstName + " " + lastName;
}

$(document).ready(function() {
  $("form#account-creator").submit(function(event) {
    event.preventDefault();
    var firstNameIn = $("input#first-name-input").val();
    var firstnameRefined = pruneInfoWhiteSpace(firstNameIn);
    var lastNameIn = $("input#first-name-input").val();
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
    var accountInitialFunds = parseFloat($("input#initial-deposit-input").val()).toFixed(2);
    var pendingBankAccount = new BankAccount(fullName, bankDetailsIn, accountInitialFunds);
    pendingBankAccount.printDataToOutput();
  });
});
