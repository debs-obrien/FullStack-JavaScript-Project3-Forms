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
      console.log(input.value);
    })
  }
});

const design = document.getElementById('design');
const JQcolor = $('color');


design.addEventListener('change', (e) => {
  if(design.value === 'js puns'){
    if(JQcolor.children.option.val() === 'cornflowerblue'){
      JQcolor.children(option).hide();
    }


  }else{
    color.remove();
  }
});
