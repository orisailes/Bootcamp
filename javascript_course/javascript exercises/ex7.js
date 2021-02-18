// Ex7 - Implement The Following JS Methods -
// Implement the following methods -
// - Filter
// - ForEach
// - Map
// Using only for(), array and objects (without other js methods)


//! the logging is comment for your comfortable.

let array = [11, 2, 4, 80, 8, 63, 10, 122, 5342, 0, 23]

array.forEach(element => {
    // console.log(`Hi! i am : ${element} and i just multiply by 2 :${element*2}`);
});

const highest = array.filter(function (number) {
    return number>99?`Ori filtered me, i am one of highest number here muhaha! i'm: ${number}`:``;
})
// console.log(highest)

const mistery = array.map(function (number) {
    return [String.fromCharCode(number),`<< my ascii code! (im ${number})`]
})

// console.log(mistery)