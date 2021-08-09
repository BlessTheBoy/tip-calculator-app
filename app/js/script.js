const billWrapper = document.querySelector("#bill-wrapper");
const bill = document.querySelector("#bill");

const peopleWrapper = document.querySelector("#people-wrapper");
const people = document.querySelector("#people");

const percentWrapper = document.querySelector("#percent-wrapper");
const radioButtons = document.getElementsByName("percentage");

const customRadio = document.querySelector("#custom");
const customInput = document.querySelector("#customValue");

const tipDisplay = document.querySelector("#tip");
const totalDisplay = document.querySelector("#total");

const reset = document.querySelector("#reset");
reset.onclick = resetView;

// Get all input and add event listener
const inputs = document.querySelectorAll("input");

for (let index = 0; index < inputs.length; index++) {
  inputs[index].onchange = calculateTip;
}

// Auto focus for custom input
customRadio.addEventListener("change", function () {
  if (this.checked) {
    customInput.focus();
  }
});

// Get bill value
function getBillValue() {
  return bill.value;
}

// Get percentage of tip
function getTipPercentage() {
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      return radioButtons[i].value;
    }
  }
  return null;
}

// Get number of people splliting the bill
function getNumberOfPeople() {
  return people.value;
}

// Show error message on an input-group
function showError(element, errorMessage) {
  element.classList.add("error");
  element.querySelector(".label-wrap .error-message").textContent =
    errorMessage;
}

// remove error message from an input group
function removeError() {
  for (let index = 0; index < arguments.length; index++) {
    arguments[index].classList.remove("error");
  }
}

// Check if value is valid then, convert to number
function checkAndConvert(value, inputWrapper) {
  if (value == "" || value == " ") {
    showError(inputWrapper, "enter number");
  } else if (isNaN(Number(value))) {
    showError(inputWrapper, "enter valid number");
  } else if (Number(value) == 0) {
    showError(inputWrapper, "Can't be zero");
  } else {
    return Number(value);
  }
  return null;
}

function resetView(e) {
  e.preventDefault();

  // Clearing inputs
  bill.value = "";
  for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].checked = false;
  }
  people.value = "";

  // Removing errors
  removeError(billWrapper, percentWrapper, peopleWrapper);

  // clearing outputs
  tipDisplay.innerHTML = "$0.00";
  totalDisplay.innerHTML = "$0.00";

  // disabling reset
  reset.disabled = true;
}

// Calculate tip
function calculateTip() {
  // Enable reset button
  reset.disabled = false;

  // Get bill, percentage to tip and number of people splitting the bill
  let billValue = getBillValue();
  let tipPercentage = getTipPercentage();
  let numOfPeople = getNumberOfPeople();

  // Removing all previous error messages if all values are valid
  removeError(billWrapper, percentWrapper, peopleWrapper);

  // Conversion and Error check for bill value
  billValue = checkAndConvert(billValue, billWrapper);
  if (!billValue) return;

  // Error check for tip percentage
  if (tipPercentage == null) {
    showError(percentWrapper, "select tip percentage");
    return;
  } else if (tipPercentage == "custom") {
    tipPercentage = checkAndConvert(customInput.value, percentWrapper);
    console.log(`tipPercentage`, tipPercentage);
    if (!tipPercentage) return;
  } else {
    tipPercentage = Number(tipPercentage);
  }

  // Error check for number of people splitting bill
  numOfPeople = checkAndConvert(numOfPeople, peopleWrapper);
  if (!numOfPeople) return;

  // Calculating tip
  console.log(tipPercentage / 100.0);
  let tip = billValue * (tipPercentage / 100.0);
  console.log(`tip`, tip);
  let totalPerPerson = (billValue + tip) / numOfPeople;
  let tipPerPerson = tip / numOfPeople;

  // Approximating results to 2d.p
  totalPerPerson = Math.round((totalPerPerson + Number.EPSILON) * 100) / 100;
  tipPerPerson = Math.round((tipPerPerson + Number.EPSILON) * 100) / 100;

  // Displaying results
  tipDisplay.innerHTML = "$" + tipPerPerson;
  totalDisplay.innerHTML = "$" + totalPerPerson;
}
