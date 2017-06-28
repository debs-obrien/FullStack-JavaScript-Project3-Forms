//set focus to name field on load
document.getElementById('name').focus();


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
  //function to check if checked, disable options of same time and call calcualte price
  const checkIfChecked = (checkedOption, price) => {
    checkedOption.addEventListener('change', () => {
      calculatePrice(checkedOption, price);
    });
  }
  const disableIfChecked = (checkedOption, disabledOption) => {
    checkedOption.addEventListener('change', () => {
      checkedOption.checked ? disable(disabledOption) : enable(disabledOption);
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


const paymentMethods = () => {
  const paymentMethod = document.getElementById('payment');
  const creditCard = document.getElementById('credit-card');
  const bitcoin = document.getElementById('bitcoin');
  const paypal = document.getElementById('paypal');
  bitcoin.style.display = 'none';
  paypal.style.display = 'none';

  paymentMethod.addEventListener('change', () => {
    if(paymentMethod.value === 'select_method' || paymentMethod.value === 'credit card') {
      creditCard.style.display = 'block';
      bitcoin.style.display = 'none';
      paypal.style.display = 'none';
      //hide others
    }else if(paymentMethod.value === 'paypal'){
      paypal.style.display = 'block';
      creditCard.style.display = 'none';
      bitcoin.style.display = 'none';
    }else if(paymentMethod.value === 'bitcoin'){
      bitcoin.style.display = 'block';
      paypal.style.display = 'none';
      creditCard.style.display = 'none';
    }
  });
}
//prevent user from submitting form
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
})




// if(totalPrice === 0){
//   console.log('you must select a checkbox')
// }

const validateFrom = () => {
  const name = document.getElementById('name');
  const basicInfo = name.parentElement;
  const nameError = document.createElement('div')
  nameError.textContent = '';
  basicInfo.insertBefore(nameError, name);
  name.addEventListener('blur', (e) => {
    if(name.value === ''){
      nameError.textContent = 'You must fill in in your name';
      nameError.className = 'error-message';
      name.className = 'error';
    }else{
      nameError.textContent = '';
      nameError.className = '';
      name.className = '';
    }
  })
  const email = document.getElementById('mail');
  const emailError = document.createElement('div')
  emailError.textContent = '';
  basicInfo.insertBefore(emailError, email);
  const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  email.addEventListener('blur', () => {
    if(email.value === ''){
      emailError.textContent = 'You must fill in in your email';
      emailError.className = 'error-message';
      email.className = 'error';
    }
  })
  email.addEventListener('keyup', () => {
    if(!regex.test(email.value)){
      emailError.textContent = 'Plese type a valid address eg email@email.com';
      emailError.className = 'error-message';
      email.className = 'error';
    }else{
      emailError.textContent = '';
      emailError.className = '';
      email.className = '';
    }
  })

  const ccNum = document.getElementById('cc-num');
  const ccNumError = document.createElement('div')
  ccNumError.textContent = '';
  const ccParent = document.getElementById('credit-card');
  ccParent.insertBefore(ccNumError, ccNum.parentElement);
  ccNum.addEventListener('blur', () => {
    if(ccNum.value === ''){
      ccNumError.textContent = 'you must add your credit card number or choose another payment type';
      ccNum.className = 'error';
      ccNumError.className = 'error-message';
    }
  })
  ccNum.addEventListener('keyup', () => {
    if(ccNum.value.length < 13){
      ccNumError.textContent = 'Your credit car number is not long enough';
      ccNum.className = 'error';
      ccNumError.className = 'error-message';
    }else if(ccNum.value.length > 16){
      ccNumError.textContent = 'your credit card number is too long';
      ccNum.className = 'error';
      ccNumError.className = 'error-message';
    }else{
      ccNumError.textContent = '';
      ccNum.className = '';
      ccNumError.className = '';
    }
  })

  const zip = document.getElementById('zip');
  const zipError = document.createElement('div')
  zipError.textContent = '';
  ccParent.insertBefore(zipError, ccNum.parentElement);
  zip.addEventListener('blur', () => {
    if(zip.value === ''){
      zipError.textContent = 'you must add your zip number';
      zip.className = 'error';
      zipError.className = 'error-message';
    }
  })
  zip.addEventListener('keyup', () => {
    if(zip.value.length < 5){
      zipError.textContent = 'Your zip code is not long enough';
      zip.className = 'error';
      zipError.className = 'error-message';
    }else if(zip.value.length > 5){
      zipError.textContent = 'your zip code is too long';
      zip.className = 'error';
      zipError.className = 'error-message';
    }else{
      zipError.textContent = '';
      zip.className = '';
      zipError.className = '';
    }

  })
  const cvv = document.getElementById('cvv');
  const cvvError = document.createElement('div')
  cvvError.textContent = '';
  ccParent.insertBefore(cvvError, ccNum.parentElement);
  cvv.addEventListener('blur', () => {
    if(cvv.value === ''){
      cvvError.textContent = 'you must add your cvv number';
      cvv.className = 'error';
      cvvError.className = 'error-message';
    }
  })
  cvv.addEventListener('keyup', () => {
    if(cvv.value.length < 3){
      cvvError.textContent = 'Your cvv number is not long enough';
      cvv.className = 'error';
      cvvError.className = 'error-message';
    }else if(cvv.value.length > 3){
      cvvError.textContent = 'your cvv number is too long';
      cvv.className = 'error';
      cvvError.className = 'error-message';
    }else{
      cvvError.textContent = '';
      cvv.className = '';
      cvvError.className = '';
    }
  })
}

//call all functions
hideColors();
addTitle();
availableActivities();
paymentMethods();
validateFrom();
