//set focus to name field on load
document.getElementById('name').focus();

const title = document.getElementById('title');

//add text field when Job Role of option is selected
title.addEventListener('change', (e) => {
  if(title.value === 'other') {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'other-title';
    input.placeholder = 'Your Job Role';
    title.parentNode.insertBefore(input, title.nextSibling);
//just for testing purposes to see if we get the value of the input
    input.addEventListener('keyup', (e) => {
      //console.log(input.value);
    })
  }
});


//hide all other colors only show ones we want
const design = document.getElementById('design');
const color = document.getElementById('color');

color.innerHTML = ''; //set all color options to empty so can be refilled based on selection
const colorDiv = document.getElementById('colors-js-puns');
colorDiv.style.display = 'none';

design.addEventListener('change', () => {
  if(design.value.includes('Select Theme')){
    colorDiv.style.display = 'none';
  }else{
    colorDiv.style.display = 'block';
  }
  if(design.value.includes('js puns')){
    color.innerHTML = '<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>'
    color.innerHTML += '<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>'
    color.innerHTML += '<option value="gold">Gold (JS Puns shirt only)</option>';

  }else if(design.value.includes('heart js')){
    color.innerHTML = '<option value="tomato">Tomato (I &#9829; JS shirt only)</option>'
    color.innerHTML += '<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>'
    color.innerHTML += '<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>';
  }
});

//dont allow selection if same date/time
const checkBoxes = $('.activities :checkbox');
//console.log(checkBoxes);
checkBoxes.change(function(){
  if(checkBoxes.name === 'js-libs'){
    //console.log('checkBoxes');

  }
});



//prevent user from sending the form
//form.preventDefault()
$('#cc-num').after('<div class="cc_num-toosmall">CardNumber should have a min of 13 numbers</div>')
$('#cc-num').after('<div class="cc_num-toolong">credit cards should only have a max of 16 numbers</div>');
$('#cc-num').after('<div class="cc_num-number">Emm it should be numbers only</div>');
$('.cc_num-toosmall').hide();
$('.cc_num-toolong').hide();
$('.cc_num-number').hide();


function ccNumberEvent(){
  const ccValue = $('#cc-num').val().length;
  if(ccValue >=13 && ccValue <=16){
    $('.cc_num-toosmall').hide();
    $('.cc_num-toolong').hide();
    $('.cc_num-number').hide();
  }else if(ccValue < 13){
    $('.cc_num-toosmall').show();
  }else if(ccValue > 16){
    $('.cc_num-toolong').show();
    $('.cc_num-toosmall').hide();
    $('.cc_num-number').hide();
  }else if($(this).val().isInteger(false)){
    $('.cc_num-toolong').hide();
    $('.cc_num-toosmall').hide();
    $('.cc_num-number').show();
  }
}

$('#cc-num').focus(ccNumberEvent).keyup(ccNumberEvent);
