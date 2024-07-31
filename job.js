const itemForm = document.getElementById('item-form'); 
const itemInput = document.getElementById('item-input'); 
const itemList = document.getElementById('item-list'); 

const addItem = itemForm.querySelector('button[type=submit]')

//// functions 
function formFunction(e){
    e.preventDefault(); 
    
    const itemInputVlaue = itemInput.value ; 
   

    /// validation 

    if(itemInputVlaue == ''){
        alert('plz 3amar your input');
        return; 
    }
    
    //// create li 
    const li = document.createElement('li'); 
    const liText = document.createTextNode(itemInputVlaue); 
    li.appendChild(liText); 
    li.appendChild(createButton('remove-item btn-link text-red'))
    console.log(li); 

    //// append to father 
    itemList.appendChild(li)
}


function createButton(classes){
    const buttonCreate = document.createElement('button'); 
    buttonCreate.className = classes; 
    buttonCreate.appendChild(createIcon('fa-solid fa-xmark'))
    return buttonCreate; 

}


function createIcon (classes) {
    const iconCreate = document.createElement('i'); 
    iconCreate.className = classes; 
    return iconCreate; 
}


/// EventLIstener 



itemForm.addEventListener('submit',formFunction)





