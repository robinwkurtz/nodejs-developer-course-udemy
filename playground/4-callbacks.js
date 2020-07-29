// setTimeout(() => {
//     console.log('Two seconds are up');
// }, 2000);

// const names = ['Robin', 'Jen', 'Jess'];
// const shortNames = names.filter((name) => {
//     return name.length <= 4;
// });
// // console.log(shortNames, names);

// const geocode = (address, callback) => {
//     setTimeout(() => {
//         const data = {
//             latitude: 0,
//             longitude: 0
//         };

//         callback(data);
//     }, 2000);
// };

// geocode('Montreal', (data) => {
//     console.log(data);
// });

// const sum = (a, b) => a + b;

const add = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b);
    }, 2000);
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
});


