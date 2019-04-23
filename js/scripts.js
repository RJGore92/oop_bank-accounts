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
  $("span.bank-add-temp").text("");
  $("div#form-stage-two").slideToggle();
  $("div#form-stage-three").slideToggle();
}

function revertFull() {
  $("span.first-name-temp").text("");
  $("span.last-name-temp").text("");
  $("span.bank-name-temp").text("");
  $("span.bank-add-temp").text("");
  $("div#form-stage-one").slideToggle();
  $("div#form-stage-three").slideToggle();
}
