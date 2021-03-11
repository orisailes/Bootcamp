const loader = document.querySelector(`.loader`)

async function fetchData(url) {
    console.time(`check`)
    loader.classList.remove(`hidden`)
    const respone = await fetch(url)
    const appleData = await respone.json()
    state.bigData.push(appleData)
    for (let i = 0; i < state.bigData[0].length; i++) {
        responseUser = await fetch(url + i)
        userData = await responseUser.json()
        state.myData.push({
            userData: userData,
            firstName: state.bigData[0][i].firstName,
            lastName: state.bigData[0][i].lastName,
            capsule: state.bigData[0][i].capsule,
            id: state.bigData[0][i].id,
        })
    }
    firstRender()
    loader.classList.add(`hidden`)
    console.timeEnd(`check`)
}

function firstRender() {
    table.innerHTML = `
    <tr>
    <th>ID</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Capsule</th>
    <th>Age</th>
    <th>City</th>
    <th>Gender</th>
    <th>Hobby</th>
    </tr>
    `
    for (let i = 0; i < state.myData.length; i++) {
        table.innerHTML += `
         <td>${state.myData[i].id}</td>
         <td>${state.myData[i].firstName}</td> 
         <td>${state.myData[i].lastName}</td>
         <td>${state.myData[i].capsule}</td>
         <td>${state.myData[i].userData.age}</td>
         <td>${state.myData[i].userData.city}</td>
         <td>${state.myData[i].userData.gender}</td>
         <td>${state.myData[i].userData.hobby}</td>
         <td><button class="btn edit-btn">Edit</button></td>
         <td><button class="btn remove-btn">Remove</button></td>
         <td><button class="btn confirm-btn hidden">Confirm</button></td>
         <td><button class="btn cancel-btn hidden">Cancel</button></td>
        `
    }
    reArrangeButtonsEvents()
}

function render(array) {

    for (let i = 0; i < state.newData.length; i++) {
        table.innerHTML += `
         <td>${state.newData[i].id}</td>
         <td>${state.newData[i].firstName}</td> 
         <td>${state.newData[i].lastName}</td>
         <td>${state.newData[i].capsule}</td>
         <td>${state.newData[i].userData.age}</td>
         <td>${state.newData[i].userData.city}</td>
         <td>${state.newData[i].userData.gender}</td>
         <td>${state.newData[i].userData.hobby}</td>
         <td><button class="btn edit-btn">Edit</button></td>
         <td><button class="btn remove-btn">Remove</button></td>
         <td><button class="btn confirm-btn hidden">Confirm</button></td>
         <td><button class="btn cancel-btn hidden">Cancel</button></td>
    `
    }
}

function reArrangeButtonsEvents(){
    //! get all btns

     editBtn = document.querySelectorAll(`.edit-btn`)
     removeBtn = document.querySelectorAll(`.remove-btn`)
     confirmBtn = document.querySelectorAll(`.confirm-btn`)
     cancelBtn = document.querySelectorAll(`.cancel-btn`)

     //! remove previous event

     editBtn.forEach((e)=>{e.removeEventListener(`click`,edit)})
     removeBtn.forEach((e)=>{e.removeEventListener(`click`,remove)})
     confirmBtn.forEach((e)=>{e.removeEventListener(`click`,confirm)})
     cancelBtn.forEach((e)=>{e.removeEventListener(`click`,cancel)})

     //! add event listener properly

     editBtn.forEach((e)=>{e.addEventListener(`click`,edit)})
     removeBtn.forEach((e)=>{e.addEventListener(`click`,remove)})
     confirmBtn.forEach((e)=>{e.addEventListener(`click`,confirm)})
     cancelBtn.forEach((e)=>{e.addEventListener(`click`,cancel)})

}
const endpoint = `https://apple-seeds.herokuapp.com/api/users/`;
fetchData(endpoint)
let responseUser;
let userData;
const table = document.querySelector(`.appleseeds-table`);
const searchBox = document.querySelector(`.search-box`);
searchBox.addEventListener(`keyup`, search);
const whatSearch = document.querySelector(`.what-search`);
whatSearch.addEventListener(`click`, displayGenderSelect)
const toolBar = document.querySelector(`.tool-bar`)
const genderOption = document.querySelector(`.gender-select`)
let editBtn;
let removeBtn;
let confirmBtn;
let cancelBtn;



const state = {
    bigData: [],
    myData: [],
    newData: [],
    whatSearchValue: null,
    valueSearchFor: null,
    personBeforeEdit: null,
}

function search(e) {
    table.innerHTML = ``
    state.whatSearchValue = searchBox.value.toLowerCase(); // input value
    state.valueSearchFor = whatSearch.value; //dropdown value
    //!search for fname, lname,capsule,
    if (state.valueSearchFor === `firstName` ||
        state.valueSearchFor === `lastName` ||
        state.valueSearchFor === `capsule`) {
        for (let person of state.myData) {
            if (person[state.valueSearchFor].toString().toLowerCase().includes(state.whatSearchValue)) {
                state.newData = [];
                console.log(person)
                state.newData.push(person)
                render(state.newData)
            }
        }
    }
    //!search for hobbies,city,age (inside user details)
    if (state.valueSearchFor === `age` ||
        state.valueSearchFor === `city` ||
        state.valueSearchFor === `hobby`) {
        for (let person of state.myData) {
            if (person.userData[state.valueSearchFor].toString().toLowerCase().includes(state.whatSearchValue)) {
                state.newData = [];
                console.log(person)
                state.newData.push(person)
                render(state.newData)
            }
        }
    }


}

function displayGenderSelect() {
    //! case gender
    console.log(`triggerd`)
    state.whatSearchValue = whatSearch.value
    if (state.whatSearchValue === `gender`) {
        genderOption.classList.remove(`hidden`)
    } else {
        genderOption.classList.add(`hidden`)
    }
    toolBar.children[2].addEventListener(`change`, (e) => {
        state.whatSearchValue = e.target.value;
        state.newData = [];
        table.innerHTML = ``;
        for (let person of state.myData) {
            if (person.userData.gender === state.whatSearchValue) {
                console.log(person)
                state.newData.push(person)
            }
        }
        render(state.newData);
    })
}

function edit(e) {

    state.personBeforeEdit = state.myData[Number(e.path[2].children[0].textContent)];
    const personAfterEdit = e.path[2];
    //! display the hidden buttons
    personAfterEdit.children[8].classList.add(`hidden`);
    personAfterEdit.children[9].classList.add(`hidden`);
    personAfterEdit.children[10].children[0].classList.remove(`hidden`);
    personAfterEdit.children[11].children[0].classList.remove(`hidden`);
    //! make text boxes with the person value in it as default 
    for (let i = 1; i < 8; i++) {
        personAfterEdit.children[i].innerHTML = `<input type="text" value="${personAfterEdit.children[i].textContent}">`
    }
    //! rest of the function is confirm function
    reArrangeButtonsEvents()
}

function remove(e) {
    const idToRemove = Number(e.path[2].children[0].textContent);
    const personToRemove = state.myData.find((e) => {
        return e.id === idToRemove
    })
    const indexOfPersonToRemove = state.myData.indexOf(personToRemove);
    state.myData.splice(indexOfPersonToRemove, 1)
    firstRender()
    reArrangeButtonsEvents()
}

function confirm(e) {
    //! take the element with the text boxes
    const personAfterEdit = e.path[2]
    //! initiallize the new person in the state and in database
    state.personBeforeEdit.firstName = personAfterEdit.children[1].children[0].value;
    state.personBeforeEdit.lastName = personAfterEdit.children[2].children[0].value;
    state.personBeforeEdit.capsule = personAfterEdit.children[3].children[0].value;
    state.personBeforeEdit.userData.age = personAfterEdit.children[4].children[0].value;
    state.personBeforeEdit.userData.city = personAfterEdit.children[5].children[0].value;
    state.personBeforeEdit.userData.gender = personAfterEdit.children[6].children[0].value;
    state.personBeforeEdit.userData.hobby = personAfterEdit.children[7].children[0].value;
    //! update my data
    state.myData[Number(personAfterEdit.children[0])] = state.personBeforeEdit;
    //! render the new person in the table 
    renderSingleTr(state.personBeforeEdit.id,e.path[2].rowIndex)
    reArrangeButtonsEvents()
}

function renderSingleTr(id,tr) {
    //! i can user my firstRender(), but it render the whole table.
    //! i prefere to make new fun that can render single line for performence issue :))
    table.children[tr].innerHTML = `
         <td>${state.myData[id].id}</td>
         <td>${state.myData[id].firstName}</td> 
         <td>${state.myData[id].lastName}</td>
         <td>${state.myData[id].capsule}</td>
         <td>${state.myData[id].userData.age}</td>
         <td>${state.myData[id].userData.city}</td>
         <td>${state.myData[id].userData.gender}</td>
         <td>${state.myData[id].userData.hobby}</td>
         <td><button class="btn edit-btn">Edit</button></td>
         <td><button class="btn remove-btn">Remove</button></td>
         <td><button class="btn confirm-btn hidden">Confirm</button></td>
         <td><button class="btn cancel-btn hidden">Cancel</button></td>
    `
    reArrangeButtonsEvents()
   
}

function cancel(e) {
    renderSingleTr(state.personBeforeEdit.id,e.path[2].rowIndex)
    reArrangeButtonsEvents()
}