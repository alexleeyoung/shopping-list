const itemForm = document.getElementById('item-form'); 
const itemInput = document.getElementById('item-input'); 
const itemList = document.getElementById('item-list'); 
console.log(localStorage.getItem('items'))


const addItem = itemForm.querySelector('button[type=submit]'); 
const clearAll = document.getElementById('clear'); 
const itemFilter = document.querySelector('#filter')
let isEditMode = false ; 


//// functions 
function onSubmmitFunction(e){
    e.preventDefault(); 
    
    const itemInputVlaue = itemInput.value ; 
   

    /// validation 

    if(itemInputVlaue == ''){
        alert('plz 3amar your input');
        return; 
    }

    //// edit mode 
    if(isEditMode){

        const liValue = itemList.querySelector('.edit-mode')
        const itemsArray = JSON.parse(localStorage.getItem('items')); 
        const arrayFilter = itemsArray.filter(i => {
           return i !== liValue.textContent; 
        })

        if(checkName(itemInput.value) != true) {
            ///// delete item 
             liValue.remove()
               //// inject the new array to storage 

        
        localStorage.setItem('items',JSON.stringify(arrayFilter)); 
        addToLocalStorage(itemInput.value)
        
        
         addToDom(itemInput.value);
      

  
        }else {
          alert('this name already exist')
        }

     


   
        
    }else{
    
        if(checkName(itemInput.value) != true) {
            //// add the edit to the dom 
         addToDom(itemInput.value);
         /// add to local storag
       addToLocalStorage(itemInput.value); 
  
        }else {
          alert('this name already exist')
        }
    }
    


   
    
    
   
    checkUi()
}



//// add to DOM function 
function addToDom(itemInputVlaue){
  
   
  
   

             //// create li 
     const li = document.createElement('li'); 
     const liText = document.createTextNode(itemInputVlaue); 
     li.appendChild(liText); 
     li.appendChild(createButton('remove-item btn-link text-red'))
     
 
     //// append to father 
     itemList.appendChild(li)

   

}

/// add to local storag function 

function addToLocalStorage(item){

        let fromLocalStorage ; 
    
    
    
    if(localStorage.getItem('items') === null){
        fromLocalStorage = []; 
    }else {
        fromLocalStorage = JSON.parse(localStorage.getItem('items'))
    }

    //// push new item to the array; 
   fromLocalStorage.push(item.trim()); 
   ///// push new item to the localstorage; 
   localStorage.setItem('items',JSON.stringify(fromLocalStorage)) 
  

    
 
}


/// desplay from the localstorage 
function desplayFromLS(){

    let fromLocalStorage ; 
    
    
    
    if(localStorage.getItem('items') === null){
        fromLocalStorage = []; 
    }else {
        fromLocalStorage = JSON.parse(localStorage.getItem('items'))
    }
    
    
    
    fromLocalStorage.forEach(itemArray => {
        addToDom(itemArray)
    })
}


/// delete  function 
function deleteFunction(e){
    if(e.target.parentElement.classList.contains('remove-item') ){
           if(confirm('are you sure you wanna delete ?')){
          
            
            const parentLi = e.target.parentElement.parentElement.textContent; 
        
            

            const localItems = localStorage.getItem('items'); 
            const itemsArray = JSON.parse(localItems); 
            const arrayFilter = itemsArray.filter(i => {
                return i !== parentLi; 
            })

            //// inject the new array to storage 
            localStorage.setItem('items',JSON.stringify(arrayFilter)); 
            ///// delete item 
            e.target.parentElement.parentElement.remove(); 
            console.log(localStorage.getItem('items'))
            
           }


        }

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







// clearfunction 

function clearFunction(){
   while(itemList.firstElementChild){
    itemList.firstElementChild.remove(); 

   }

   //// remove it from the local storag 

   localStorage.removeItem('items')

   checkUi()

}


/// check function 
function checkUi(){
    itemInput.value = ''
    const itemsList =itemList.querySelectorAll('li'); 
   if(itemsList.length == 0){
    clearAll.style.display = 'none'; 
    itemFilter.style.display = 'none'; 
   }else {
    clearAll.style.display = 'block'; 
    itemFilter.style.display = 'block'
   }

   addItem.innerHTML = `<i class="fa-solid fa-plus"></i> add Item` ; 
   addItem.style.backgroundColor = '#333'
   
   isEditMode = false; 

}

//// filter function 

function filterFunction(e){
   
   const itemsList =itemList.querySelectorAll('li'); 
   const filterChr = e.target.value ; 
    itemsList.forEach((li) => {
        
       const liChar = li.firstChild.textContent.trim().toLocaleLowerCase(); 

       if(liChar.indexOf(filterChr) !== -1){
            li.style.display = 'flex'; 
       }else {
            li.style.display = 'none'
       }
    })

    


}



///// update function 

function onLiClicked(e){
    isEditMode = true ; 
    const thisLi = e.target; 
    if(thisLi.tagName == 'LI'){
        const lis = itemList.querySelectorAll('li'); 
        lis.forEach(li => {
            li.style.color = '#000'; 
        })
        thisLi.classList.add('edit-mode')
        thisLi.style.color = '#bbb'
        const liText = thisLi.textContent ; 
        itemInput.value = liText; 
        addItem.innerHTML = `<i class="fa-solid fa-pen"></i> update Item` ; 
        addItem.style.backgroundColor = '#228B22'
        

        
    }
}


///// function check if the name is exist or not 
function checkName(name){
    let fromLocalStorage ; 
    
    
    
    if(localStorage.getItem('items') === null){
        fromLocalStorage = []; 
    }else {
        fromLocalStorage = JSON.parse(localStorage.getItem('items'))
    }
    
    
    return fromLocalStorage.includes(name); 
    
    
}



/// init function s

function init(){

    /// EventLIstener 
const update = document.querySelector('.update'); 
itemForm.addEventListener('submit',onSubmmitFunction); 
itemList.addEventListener('click',deleteFunction); 
clearAll.addEventListener('click',clearFunction); 


desplayFromLS()
checkUi()

itemFilter.addEventListener('input',filterFunction); 
itemList.addEventListener('click',onLiClicked); 



}

init(); 





