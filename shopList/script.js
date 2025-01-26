const myForm = document.getElementById("item-form");
const itemList = document.getElementById("item-list");
const filterContainer = document.getElementsByClassName("filter")[0];
const btnClear = document.getElementById("clear");
const filter = document.getElementById("filter");
const buttons = document.getElementsByClassName("btn-link");

const updateUI = () => {
    const items = Array.from(document.querySelectorAll("li")).map(li => li.innerText);
    localStorage.setItem("items", JSON.stringify(items));
    if(items.length === 0){
        btnClear.style.display = "none"
        filterContainer.style.display = "none"
    }else{
        btnClear.style.display = "block"
        filterContainer.style.display = "flex"
    }
}

const createButton = () => {
    const button = document.createElement("button");
    button.classList.add("btn-link");
    button.innerHTML = `<svg fill="red" viewBox="0 0 448 512" height="15px" width="15px" style="rotate: 45deg;"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path></svg>`
    return button;
}

const addItem = (event) => {
    event.preventDefault();
    const item = myForm.itemInput.value.trim();
    let alert = document.getElementsByClassName("error")[0];
    if(item.length === 0){
        alert.innerHTML = "Please enter an item";
        alert.style.display = "block";
        return;
    }
    if(alert.innerHTML != ""){
        alert.style.display = "none";
        alert.innerHTML = "";
    }
    createItem({innerText: item})
    myForm.itemInput.value = "";
    updateUI();
}

const removeItem = (item) => {
    if(confirm("Are you sure?")){
        console.log(item);
        item.remove();
        updateUI();
    }
}

const createItem = (item) => {
    const li = document.createElement("li");
    const button = createButton();
    button.addEventListener("click", () => removeItem(li));
    const par = document.createElement("p");
    par.innerHTML = item.innerText;
    li.append(par);
    li.append(button);
    li.style = item.style;
    itemList.append(li);
}

const loadItems = () => {
    const items = JSON.parse(localStorage.getItem("items"));
    if(items){
        for(let i = 0; i < items.length; i++){
            createItem({innerText: items[i]});
        }
        updateUI();
    }
    else{
        const items = [
            {
                innerText: "Milk"
            },
            {
                innerText: "Eggs"
            },
            {
                innerText: "Bread"
            },
            {
                innerText: "Juice"
            }
        ]
        items.forEach((item) => {
            createItem(item);
        })
        updateUI();
    }
}

loadItems();

const filtr = () => {
    const text = filter.value.trim().toLowerCase()
    const items = document.querySelectorAll("li");
    items.forEach((item) =>{
        if(item.innerText.toLowerCase().search(text) < 0 && text.length != 0){
            item.style.display = "none";
        }
        else{
            item.style.display = "flex";
        }
    })
}

myForm.addEventListener("submit", addItem);

btnClear.addEventListener("click", () => {
    const items = document.querySelectorAll("li");
    items.forEach((item) => {
        item.remove();
    })
    updateUI();
})

filter.addEventListener("input", filtr);

filter.addEventListener("focus", () => {
    document.getElementsByClassName("filterInputDiv")[0].classList.add("animation");
});
filter.addEventListener("blur", () => {
    document.getElementsByClassName("filterInputDiv")[0].classList.remove("animation");
});
document.querySelector('footer').textContent = 'Copyright © ' + new Date().getFullYear().toString() + ' | Borys Gajewski | All Rights Reserved';