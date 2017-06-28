//set focus to name field on load
document.getElementById('name').focus();

//select elements
const form = document.querySelector('form');
const submit = document.querySelector('button');
const npm = document.getElementsByName('npm')[0];
const name = document.getElementById('name');
const email = document.getElementById('mail');
const ccNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
//create divs for error messages
const nameError = document.createElement('div')
const emailError = document.createElement('div');
const activityError = document.createElement('div');
const ccNumError = document.createElement('div');
const zipError = document.createElement('div');
const cvvError = document.createElement('div');
//insert divs with error messages
const basicInfo = name.parentElement;
const ccParent = document.getElementById('credit-card');
basicInfo.insertBefore(nameError, name);
basicInfo.insertBefore(emailError, email);
ccParent.insertBefore(ccNumError, ccNum.parentElement);
ccParent.insertBefore(zipError, ccNum.parentElement);
ccParent.insertBefore(cvvError, ccNum.parentElement);
//set values
let numOfActivities = 0;
let empty = true;
let nameValid = false;
let emailValid = false;
let activityValid = false;
let ccNumValid= false;
let zipValid = false;
let cvvValid = false;

//display text field only when Job Role of option is selected
const addTitle = () => {
  const title = document.getElementById('title');
  const otherTitle = document.getElementById('other-title');
  otherTitle.style.display = "none";

  title.addEventListener('change', (e) => {
    if(title.value === 'other') {
      otherTitle.style.display = "block";
    }else{
      otherTitle.style.display = "none";
    }
  });
}

//hide all other colors only show ones we want
const hideColors = () => {
  const design = document.getElementById('design');
  const color = document.getElementById('color');
  const colorDiv = document.getElementById('colors-js-puns');

  color.innerHTML = ''; //set all color options to empty so can be refilled based on selection
  colorDiv.style.display = 'none';

  design.addEventListener('change', () => {
    if(design.value.includes('Select Theme')){
      colorDiv.style.display = 'none';
    }else{
      colorDiv.style.display = 'block';
      if(design.value.includes('js puns')){
        color.innerHTML = '<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>'
        color.innerHTML += '<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>'
        color.innerHTML += '<option value="gold">Gold (JS Puns shirt only)</option>';

      }else if(design.value.includes('heart js')){
        color.innerHTML = '<option value="tomato">Tomato (I &#9829; JS shirt only)</option>'
        color.innerHTML += '<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>'
        color.innerHTML += '<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>';
      }
    }

  });
}
//check if there are activities selected
const checkActivities = (checkedOption, activity) => {
  if(checkedOption.checked){
    numOfActivities +=1;
    activityError.remove();
  }else{
    numOfActivities -=1
    activitiesError();
  }
}

//create error message if no activities selected
const activitiesError = () => {
  if(numOfActivities === 0){
    npm.parentElement.after(activityError);
    activityError.textContent = 'You need to select an activity';
    activityError.className = 'error-message';
  }else{
    activityValid = true;
  }
}

//dont allow selection if same date/time
const availableActivities = () => {
  const mainConference = document.getElementsByName('all')[0];
  const jsFrameworks = document.getElementsByName('js-frameworks')[0];
  const jsLibs = document.getElementsByName('js-libs')[0];
  const buildTools = document.getElementsByName('build-tools')[0];
  const express = document.getElementsByName('express')[0];
  const node = document.getElementsByName('node')[0];
  const npm = document.getElementsByName('npm')[0];
  const price = document.createElement('div');
  let totalPrice = 0;
  let mainConfPrice = 200;
  let workshopPrice = 100;
  //create div to hold price
  const activitiesPrice = () => {
    price.id = 'price';
    npm.parentElement.after(price);
  }
  //print the price
  const printPrice = (totalPrice) => {
    if(totalPrice !==0){
      price.innerHTML = 'Total Price: $' + totalPrice;
    }
    else{
      price.innerHTML = '';
    }
  }
  //calculate the price
  const calculatePrice = (option, price) => {
    if(option.checked){
      totalPrice += price;
      printPrice(totalPrice)
    }else{
      totalPrice -= price;
      printPrice(totalPrice)
    }
  }
  //function to disable checkbox
  function disable(option){
    option.disabled = true;
  }
  //function to enable checkbox
  function enable(option){
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
  const paymentMethod = document.getElementById('payment');
  const creditCard = document.getElementById('credit-card');
  const bitcoin = document.getElementById('bitcoin');
  const paypal = document.getElementById('paypal');
  bitcoin.style.display = 'none';
  paypal.style.display = 'none';

  paymentMethod.addEventListener('change', () => {
    bitcoin.style.display = 'none';
    paypal.style.display = 'none';
    if(paymentMethod.value === 'select_method' || paymentMethod.value === 'credit card') {
      creditCard.style.display = 'block';
      //hide others
    }else if(paymentMethod.value === 'paypal'){
      paypal.style.display = 'block';
      creditCard.style.display = 'none';
    }else if(paymentMethod.value === 'bitcoin'){
      bitcoin.style.display = 'block';
      creditCard.style.display = 'none';
    }
    //if other payment method chosen set credit card Validation to true
    if(paymentMethod.value === 'bitcoin' || paymentMethod.value === 'paypal'){
      ccNumValid= true;
      zipValid = true;
      cvvValid = true;
    }
  });
}

//empty field validation
function ifEmpty(input, errorDiv, errorMessage){
  if(input.value === ''){
    errorMessages(input, errorDiv, errorMessage);
  }else{
    clearErrorMessage(input, errorDiv)
  }
}

//function for error Messages
function errorMessages(input, errorDiv, errorMessage){
  errorDiv.textContent = errorMessage;
  errorDiv.className = 'error-message';
  input.className = 'error';
}
//function to clear error Messages
function clearErrorMessage(input, errorDiv){
  errorDiv.textContent = '';
  errorDiv.className = '';
  input.className = '';
}
//validate Name
const validateName = () => {
    ifEmpty(name, nameError, 'You must fill in in your name');
    nameValid = true;
}
//validate email
const validateEmail = () => {
  const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if(!regex.test(email.value)){
        errorMessages(email, emailError, 'Plese type a valid address eg email@email.com');
      }else{
        clearErrorMessage(email, emailError);
        emailValid = true;
      }
}
//validate cc Number
const validateCCNum = () => {
      if(ccNum.value.length < 13){
        errorMessages(ccNum, ccNumError, 'Your credit car number is not long enough');
      }else if(ccNum.value.length > 16){
        errorMessages(ccNum, ccNumError, 'your credit card number is too long');
      }else{
        clearErrorMessage(ccNum, ccNumError);
        ccNumValid= true;
      }
}
//validate zip
const validateZip = () => {
      if(zip.value.length < 5){
        errorMessages(zip, zipError, 'Your zip code is not long enough');
      }else if(zip.value.length > 5){
        errorMessages(zip, zipError, 'your zip code is too long');
      }else{
        clearErrorMessage(zip, zipError);
        zipValid = true;
      }
}
//validate cvv
const validateCvv = () => {
    if(cvv.value.length < 3){
      errorMessages(cvv, cvvError, 'Your cvv number is not long enough');
    }else if(cvv.value.length > 3){
      errorMessages(cvv, cvvError, 'your cvv number is too long');
    }else{
      clearErrorMessage(cvv, cvvError);
      cvvValid = true;
    }
}
name.addEventListener('blur', () => {
  validateName();
})
email.addEventListener('keyup', () => {
  validateEmail();
})
ccNum.addEventListener('keyup', () => {
  validateCCNum();
})
zip.addEventListener('keyup', () => {
  validateZip();
})
cvv.addEventListener('keyup', () => {
  validateCvv();
})
//validate form
const validateFrom = () => {
  activitiesError();
  ifEmpty(name, nameError, 'You must fill in in your name');
  ifEmpty(email, emailError, 'You must fill in in your email');
  ifEmpty(ccNum, ccNumError, 'you must add your credit card number or choose another payment type');
  ifEmpty(zip, zipError, 'you must add your zip number');
  ifEmpty(cvv, cvvError, 'you must add your cvv number');
  //if fields are not empty validate further
  if(email.value !== ''){
    validateEmail();
  }
  if(ccNum.value !== ''){
    validateCCNum();
  }
  if(zip.value !== ''){
    validateZip();
  }
  if(cvv.value !== ''){
    validateCvv();
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
  let allValid = nameValid  && emailValid && activityValid && zipValid && ccNumValid  && cvvValid;
  if(!allValid){ //if not true prevent submit and call validate
    validateFrom();
    e.preventDefault();
  }
})
