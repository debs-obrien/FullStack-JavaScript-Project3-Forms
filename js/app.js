//set focus to name field on load
document.getElementById('name').focus();

//add text field when Job Role of option is selected
const addTitle = () => {
  const title = document.getElementById('title');
  title.addEventListener('change', (e) => {
    if(title.value === 'other') {
      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'other-title';
      input.placeholder = 'Your Job Role';
      title.parentNode.insertBefore(input, title.nextSibling);
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


//call all functions
hideColors();
addTitle();
availableActivities();
paymentMethods();
