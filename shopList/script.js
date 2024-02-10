const myForm = document.getElementById("item-form")
const itemList = document.getElementById("item-list")
const filter = document.getElementById("filter")
const btnClear = document.getElementById("clear")


const addItem = (event) =>{
    event.preventDefault();
    const item = myForm.itemInput.value.trim();
    if(item.length === 0){
        let alert = document.getElementsByClassName("error")[0];
        alert.innerHTML = "Please enter an item";
        return;
    }
    const li = document.createElement("li");
    li.innerText = item
    const button = createButton()
    li.append(button)
    itemList.append(li)
    myForm.itemInput.value = ""
    updateUI()
}

const createButton = () =>{
    const button = document.createElement("button")
    button.className = "remove-item btn-link text-red"
    const icon = document.createElement("i")
    icon.className = "fa-solid fa-xmark"
    button.append(icon)
    return button;
}

const removeItem = (event) =>{
    if(event.target.parentElement.classList.contains("remove-item")){
        if(confirm("Are you sure?")){
            event.target.parentElement.parentElement.remove()
            updateUI()
        }
    }
}

const updateUI = () =>{
    const items = document.querySelectorAll("li")
    if(items.length === 0){
        btnClear.style.display = "none"
        filter.style.display = "none"
    }else{
        btnClear.style.display = "block"
        filter.style.display = "block"
    }
}

const filtr = () =>{
    const text = filter.value.trim().toLowerCase()
    const items = document.querySelectorAll("li")
    items.forEach((item) =>{
        if(item.innerText.toLowerCase().search(text) < -1 && text.length != 0){
            item.style.display = "none"
        }
    })
}

myForm.addEventListener("submit", addItem)
itemList.addEventListener("click", removeItem)
btnClear.addEventListener("click", () => {
    const items = document.querySelectorAll("li")
    items.forEach((item) => {
        item.remove()
    })
    updateUI()
})
document.addEventListener("keydown", filtr)