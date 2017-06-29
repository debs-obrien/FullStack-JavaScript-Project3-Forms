/*
created by Debbie O'Brien 28 June 2017
Form validation project for Javasscript Full Stack Project 3
 */
//select elements
const form = document.querySelector('form');
const submit = document.querySelector('button');
const nameField = document.getElementById('name');
const emailField = document.getElementById('mail');
const jobTitle = document.getElementById('title');
const otherTitle = document.getElementById('other-title');
const ccNumField = document.getElementById('cc-num');
const zipField = document.getElementById('zip');
const cvvField = document.getElementById('cvv');
const mainConference = document.getElementsByName('all')[0];
const jsFrameworks = document.getElementsByName('js-frameworks')[0];
const jsLibs = document.getElementsByName('js-libs')[0];
const buildTools = document.getElementsByName('build-tools')[0];
const express = document.getElementsByName('express')[0];
const node = document.getElementsByName('node')[0];
const npm = document.getElementsByName('npm')[0];
const price = document.createElement('div');
const design = document.getElementById('design');
const color = document.getElementById('color');
const colorDiv = document.getElementById('colors-js-puns');
const paymentMethod = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const bitcoinMethod = document.getElementById('bitcoin');
const paypalMethod = document.getElementById('paypal');
//create divs for error messages
const nameError = document.createElement('div')
const emailError = document.createElement('div');
const jobError = document.createElement('div');
const activityError = document.createElement('div');
const ccNumError = document.createElement('div');
const zipError = document.createElement('div');
const cvvError = document.createElement('div');
//insert divs with error messages
const basicInfoSection = nameField.parentElement;
const ccParent = document.getElementById('credit-card');
basicInfoSection.insertBefore(nameError, nameField);
basicInfoSection.insertBefore(emailError, emailField);
otherTitle.after(jobError);
ccParent.insertBefore(ccNumError, ccNumField.parentElement);
ccParent.insertBefore(zipError, ccNumField.parentElement);
ccParent.insertBefore(cvvError, ccNumField.parentElement);
//set values
const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
let numOfActivities = 0;
let totalPrice = 0;
let mainConfPrice = 200;
let workshopPrice = 100;
let empty = true;
let nameValid = false;
let emailValid = false;
let jobValid = true;
let activityValid = false;
let ccNumValid = false;
let zipValid = false;
let cvvValid = false;

//set focus to name field on load
nameField.focus();

//display text field only when Job Role of option is selected
const addTitle = () => {
  otherTitle.style.display = "none";

  title.addEventListener('change', (e) => {
    if (jobTitle.value === 'other') {
      otherTitle.style.display = "block";
    } else {
      otherTitle.style.display = "none";
      jobValid = true;
    }
  });
}


//hide all other colors only show ones we want
const hideColors = () => {
  color.innerHTML = ''; //set all color options to empty so can be refilled based on selection
  colorDiv.style.display = 'none';

  design.addEventListener('change', () => {
    if (design.value.includes('Select Theme')) {
      colorDiv.style.display = 'none';
    } else {
      colorDiv.style.display = 'block';
      if (design.value.includes('js puns')) {
        color.innerHTML = '<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>'
        color.innerHTML += '<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>'
        color.innerHTML += '<option value="gold">Gold (JS Puns shirt only)</option>';

      } else if (design.value.includes('heart js')) {
        color.innerHTML = '<option value="tomato">Tomato (I &#9829; JS shirt only)</option>'
        color.innerHTML += '<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>'
        color.innerHTML += '<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>';
      }
    }

  });
}
//check if there are activities selected
const checkActivities = (checkedOption, activity) => {
  if (checkedOption.checked) {
    numOfActivities += 1;
    activityError.remove();
  } else {
    numOfActivities -= 1
    activitiesError();
  }
}

//create error message if no activities selected
const activitiesError = () => {
  if (!numOfActivities) {
    npm.parentElement.after(activityError);
    activityError.textContent = 'You need to select an activity';
    activityError.className = 'error-message';
  } else {
    activityValid = true;
  }
}

//dont allow selection if same date/time
const availableActivities = () => {
  //create div to hold price
  const activitiesPrice = () => {
    price.id = 'price';
    npm.parentElement.after(price);
  }
  //print the price
  const printPrice = (totalPrice) => {
    if (totalPrice) {
      price.innerHTML = 'Total Price: $' + totalPrice;
    } else {
      price.innerHTML = '';
    }
  }
  //calculate the price
  const calculatePrice = (option, price) => {
    if (option.checked) {
      totalPrice += price;
      printPrice(totalPrice)
      activityValid = true;
    } else {
      totalPrice -= price;
      printPrice(totalPrice)
    }
  }
  //function to disable checkbox
  function disable(option) {
    option.disabled = true;
  }
  //function to enable checkbox
  function enable(option) {
    option.disabled = false;
  }
  //function to check if checked and calcualte price
  const checkIfChecked = (checkedOption, price) => {
    checkedOption.addEventListener('change', () => {
      checkedOption.setAttribute("checked", "checked");
      checkActivities(checkedOption);
      calculatePrice(checkedOption, price);
    });
  }
  //function to check if checked, disable options of same time and call calcualte price
  const disableIfChecked = (checkedOption, disabledOption) => {
    checkedOption.addEventListener('change', () => {
      checkedOption.setAttribute("checked", "checked");
      checkedOption.checked ? disable(disabledOption) : enable(disabledOption);
      checkActivities(checkedOption);
      calculatePrice(checkedOption, workshopPrice);
    });
  }
  //call the activitiesPrice function to append price div
  activitiesPrice();

  //listen for changes to click and calcualte price
  checkIfChecked(mainConference, mainConfPrice);
  checkIfChecked(buildTools, workshopPrice);
  checkIfChecked(npm, workshopPrice);
  //listen for changes to click, disable checkboxes and calcualte price
  disableIfChecked(jsFrameworks, express);
  disableIfChecked(jsLibs, node);
  disableIfChecked(express, jsFrameworks);
  disableIfChecked(node, jsLibs);
};

//hide or show payment methods depending on selection
const paymentMethods = () => {
  bitcoinMethod.style.display = 'none';
  paypalMethod.style.display = 'none';

  paymentMethod.addEventListener('change', () => {
    //if other payment method chosen set credit card Validation to true
    if (paymentMethod.value === 'bitcoin' || paymentMethod.value === 'paypal') {
      creditCard.style.display = 'none';
      ccNumValid = true;
      zipValid = true;
      cvvValid = true;
    }
    if (paymentMethod.value === 'select_method' || paymentMethod.value === 'credit card') {
      creditCard.style.display = 'block';
      bitcoinMethod.style.display = 'none';
      paypalMethod.style.display = 'none';
      //hide others
    } else if (paymentMethod.value === 'paypal') {
      paypalMethod.style.display = 'block';
      bitcoinMethod.style.display = 'none';
    } else if (paymentMethod.value === 'bitcoin') {
      bitcoinMethod.style.display = 'block';
      paypalMethod.style.display = 'none';
    }

  });
}

//empty field validation
function ifEmpty(input, errorDiv, errorMessage) {
  if (!input.value) {
    errorMessages(input, errorDiv, errorMessage);
  } else {
    clearErrorMessage(input, errorDiv)
  }
}

//function for error Messages
function errorMessages(input, errorDiv, errorMessage) {
  errorDiv.textContent = errorMessage;
  errorDiv.className = 'error-message';
  input.className = 'error';
}
//function to clear error Messages
function clearErrorMessage(input, errorDiv) {
  errorDiv.textContent = '';
  errorDiv.className = '';
  input.className = '';
}
//validate Name
const validateName = () => {
  ifEmpty(nameField, nameError, 'You must fill in in your name');
  if (nameField.value) {
    nameValid = true;
  }
}
//validate email
const validateEmail = () => {

  if (!regex.test(emailField.value)) {
    errorMessages(emailField, emailError, 'Plese type a valid address eg email@email.com');
  } else {
    clearErrorMessage(emailField, emailError);
    emailValid = true;
  }
}
//validate job Role
const validateJob = () => {
  if (jobTitle.value === 'other') {
    if (!otherTitle.value) {
      errorMessages(otherTitle, jobError, 'You must fill in your Job Role');
    } else {
      clearErrorMessage(otherTitle, jobError);
      jobValid = true;
    }
  }
}

//validate cc Number
const validateCCNum = () => {
  if (isNaN(ccNumField.value)) {
    errorMessages(ccNumField, ccNumError, 'Credit Card numbers need to be a number');
  } else if (ccNumField.value.length < 13 || ccNumField.value.length > 16) {
    errorMessages(ccNumField, ccNumError, 'Your credit car number needs to be min 13 digits and max 16 digits');
  } else {
    clearErrorMessage(ccNumField, ccNumError);
    ccNumValid = true;
  }
}
//validate zip
const validateZip = () => {
  if (isNaN(zipField.value)) {
    errorMessages(zipField, zipError, 'zips need to be a number');
  } else if (zipField.value.length < 5 || zipField.value.length > 5) {
    errorMessages(zipField, zipError, 'Your zip code needs to be min 5 digits and max 5 digits');
  } else {
    clearErrorMessage(zipField, zipError);
    zipValid = true;
  }
}
//validate cvv
const validateCvv = () => {
  if (isNaN(cvvField.value)) {
    errorMessages(cvvField, cvvError, 'cvv needs to be a number');
  } else if (cvvField.value.length < 3 || cvvField.value.length > 3) {
    errorMessages(cvvField, cvvError, 'Your cvv number needs to be 3 digits');
  } else {
    clearErrorMessage(cvvField, cvvError);
    cvvValid = true;
  }
}
nameField.addEventListener('blur', () => {
  validateName();
})
emailField.addEventListener('keyup', () => {
  validateEmail();
})
jobTitle.addEventListener('change', () => {
  if(jobTitle.value === 'other'){
    jobValid = false;
  }
})
otherTitle.addEventListener('keyup', () => {
  validateJob();
})
ccNumField.addEventListener('keyup', () => {
  validateCCNum();
})
zipField.addEventListener('keyup', () => {
  validateZip();
})
cvvField.addEventListener('keyup', () => {
  validateCvv();
})
//validate form
const validateFrom = () => {
  activitiesError();
  ifEmpty(nameField, nameError, 'You must fill in in your name');
  ifEmpty(emailField, emailError, 'You must fill in in your email');
  ifEmpty(ccNumField, ccNumError, 'you must add your credit card number or choose another payment type');
  ifEmpty(zipField, zipError, 'you must add your zip number');
  ifEmpty(cvvField, cvvError, 'you must add your cvv number');
  //if fields are not empty validate further
  if (emailField.value) {
    validateEmail();
  }
  if (ccNumField.value) {
    validateCCNum();
  }
  if (zipField.value) {
    validateZip();
  }
  if (cvvField.value) {
    validateCvv();
  }
  if (jobTitle.value === 'other'){
    jobValid = false;
    validateJob();
  }
}

//call all functions
hideColors();
addTitle();
availableActivities();
paymentMethods();

//submit form on click if everything validates
submit.addEventListener('click', (e) => {
  //let allFields = fields requred to be validated
  let allValid = nameValid && emailValid && jobValid && activityValid && zipValid && ccNumValid && cvvValid;
  if (!allValid) { //if not true prevent submit and call validate
    e.preventDefault();
    validateFrom();
  }
})
