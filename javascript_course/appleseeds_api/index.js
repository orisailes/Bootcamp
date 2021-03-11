async function fetchData(url) {
    console.time(`check`)
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
const state = {
    bigData: [],
    myData: [],
    newData: [],
    whatSearchValue: null,
    valueSearchFor: null,
}
const genderOption = document.querySelector(`.gender-select`)

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
    debugger
    console.log(`triggerd`)
    state.whatSearchValue = whatSearch.value
    if (state.whatSearchValue === `gender`) {
        genderOption.classList.remove(`hidden`)
    }else{
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