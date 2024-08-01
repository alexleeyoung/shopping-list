const itemForm = document.getElementById('item-form'); 
const itemInput = document.getElementById('item-input'); 
const itemList = document.getElementById('item-list'); 




const addItem = itemForm.querySelector('button[type=submit]'); 
const clearAll = document.getElementById('clear'); 
const itemFilter = document.querySelector('.filter')


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
    

    //// append to father 
    itemList.appendChild(li)
    checkUi()
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


/// delete  function 
function deleteFunction(e){
    if(e.target.parentElement.classList.contains('remove-item') ){
           if(confirm('are you sure you wanna delete ?')){
            e.target.parentElement.parentElement.remove()
           }
           

        }

     checkUi()



    
}





// clearfunction 

function clearFunction(){
   while(itemList.firstElementChild){
    itemList.firstElementChild.remove(); 

   }

   checkUi()

}


/// check function 
function checkUi(){
    const itemsList =itemList.querySelectorAll('li'); 
   if(itemsList.length == 0){
    clearAll.style.display = 'none'; 
    itemFilter.style.display = 'none'; 
   }else {
    clearAll.style.display = 'block'; 
    itemFilter.style.display = 'block'
   }

}

/// EventLIstener 



itemForm.addEventListener('submit',formFunction); 
itemList.addEventListener('click',deleteFunction); 
clearAll.addEventListener('click',clearFunction); 
checkUi()






