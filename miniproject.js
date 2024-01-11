
let sortOrder = 1;
let users = [];
const myUrl = "https://jsonplaceholder.typicode.com/users";
let anotherClick = false

//complete the fetchData function
async function fetchData(url) {
    // write your code here
    return fetch(myUrl).then(response => response.json()).then(data => {
        return data
    }).catch(err => console.error(err))
}

//complete the sortUsers function
// users is the array of users and order can be 1 or -1, which means order ascending or descending respectively
function sortUsers(users, order) {
    // write your code here
    console.log('current order :: ', order)
    let userSorted = []
    if (![1, -1].includes(order)) {
        return userSorted
    }
    userSorted = users.sort((a, b) => {
        if (a.name > b.name) {
            return -1
        }
        if (a.name < b.name) {
            return 1
        }
        return 0
    })
    return order === -1 ? userSorted : userSorted.reverse()
}

//Implement a function that select users with the name input
function filterUsersByName(users, name) {
    // write your code here
    const filteredUsers = [...users]
    return filteredUsers.filter(user => user.name.toLowerCase()
        .startsWith(name.toLowerCase()))
}

function displayData(tbody, users) {
    tbody.innerHTML = users
        .map(
            (user) => `
    <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
    </tr>
  `
        )
        .join("");
}

async function initializeApp() {
    try {
        const tbody = document.getElementById("table-body");
        const sortBtn = document.getElementById("sort");
        const nameFilter = document.getElementById("nameFilter");

        users = await fetchData(myUrl);
        displayData(tbody, users);

        // when a visitor click the sortBtn element, the users should be ordered ascending in the first click, and descending in the second click
        sortBtn.addEventListener("click", (event) => {
            // write your code here
            const sortedUsers = sortUsers(users, sortOrder)
            anotherClick = !anotherClick
            sortOrder = anotherClick ? -1 : 1
            displayData(tbody, sortedUsers)
        });

        // when a visitor fill the name in the nameFilter element, the table should only show users asociated to this name
        nameFilter.addEventListener("input", (event) => {
            // write your code here
            const inputVal = event.target.value
            if (inputVal === "") {
                displayData(tbody, users)
                return
            }
            const filteredUsers = filterUsersByName(users, event.target.value)
            displayData(tbody, filteredUsers)
        });
    } catch (err) {
        console.error(err)
    }
}

initializeApp();
