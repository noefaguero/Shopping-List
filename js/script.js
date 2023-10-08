///////////////////////// Declaration of variables by reference ////////////////////////////

const newfood = document.getElementById("newfood");
const list = document.getElementById("list");
const btnadd = document.getElementById("btnadd");
const btnbuy = document.getElementById("btnbuy");
const error = document.getElementById("error");
const total = document.getElementById("total");


/////////////////////////////////////// Functions //////////////////////////////////////////

//// Add new food to cart

const addFood = (name) => {
    let listitem = document.createElement("LI")
    listitem.setAttribute("class", "listitem")

    let food = document.createElement("SPAN")
    food.textContent = newfood.value
    food.setAttribute("class", "listitem__name")
    listitem.append(food)

    let price = document.createElement("SPAN")
    price.textContent = (Math.random()*10).toFixed(2) + " €"
    price.setAttribute("class", "listitem__price")
    listitem.append(price)

    let listadd = document.createElement("BUTTON")
    listadd.textContent = "+"
    listadd.setAttribute("class", "listbtn__add")
    listitem.append(listadd)

    let decrease = document.createElement("BUTTON")
    decrease.textContent = "-"
    decrease.setAttribute("class", "listbtn__decrease")
    listitem.append(decrease)

    let amount = document.createElement("SPAN")
    amount.textContent = 1
    amount.setAttribute("class", "listitem__amount")
    listitem.append(amount)

    let remove = document.createElement("BUTTON")
    remove.textContent = "X"
    remove.setAttribute("class", "listbtn__delete")
    listitem.append(remove)

    list.append(listitem)
}


const showError = () => {
    if (error.classList.contains("delete")) {
        //Show the error
        error.classList.remove("delete")
    }
}


const hideError = () => {
    if (!error.classList.contains("delete")) {
        //Hide the error
        error.classList.add("delete")
    }
}

const isRepeated = () => {
    if (list.children.length === 0) {
        return false // No items in the list, so nothing can be repeated
    }

    return Array.from(list.children).some(item => item.firstElementChild.textContent === newfood.value)
}

const handlerAddFood = () => {

    //Check that some food has been written
    if (newfood.value.length != 0) {
        
        //Check that error message is hidden
        hideError()
        
        //Check if the food written isn't on the list
        if(!isRepeated()){
            //Add new food to the list
            addFood(newfood.value)
            //Focus on the input element
            newfood.focus()
        }
           
    //if the input is empty
    } else {
        //Check that error message is shown
        showError()
    }
    
}

//// Controls functionality of each item

const handlerUnits = (event, operation) => {
    // set reference from units element
    let units = event.target.parentElement.children[4]
    // get current units
    let currentunits = parseInt(units.textContent)

    if (operation == "add") {
        // update units
        units.textContent = currentunits + 1
    
    } else if (operation == "decrease") {
        //avoid decrease when units is 0
        if (currentunits > 0) {
            // update units
            units.textContent = currentunits - 1
        }
    }
}

const handlerControls = (event) => {
    if (event.target.tagName === "BUTTON") {
        
        switch (event.target.className) {
            
            case "listbtn__add":
                handlerUnits(event, "add")
                break 

            case "listbtn__decrease":
                handlerUnits(event, "decrease")
                break

            case "listbtn__delete":
                event.target.parentElement.remove()
                break
        }
    }
}

//////////////////////////////////// Events delegation //////////////////////////////////

btnadd.addEventListener("click", handlerAddFood)

list.addEventListener("click", (event) => handlerControls(event))