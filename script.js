const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser("Bhavna");

async function getUser(username) {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();

    createUserCard(respData);

    getRepos(username);
}
//OCCURING ON SAME TYM
async function getRepos(username) {
    const resp = await fetch(APIURL + username + "/repos");
    const respData = await resp.json();

    addReposToCard(respData);
}

// The code starts by getting the user's username from the form input.
// Then, it sends a request to GitHub for that user's public repositories.
//The response is parsed and added to the card with createUserCard() function.

//  The code will fetch the user Bhavna's information from GitHub and add it to a card.
//  The code below is an example of how to create a new card with the data fetched from GitHub.





function createUserCard(user) {
    const cardHTML = `
        <div class="card">
            <div>                                                        
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>
                <div id="repos"></div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML;
}


// The code starts by creating a variable called user.
//  This is the object that will be used to create the card HTML.
//  Next, it creates an empty div with class "card".
//  Then it adds an img tag inside of this div and sets its src attribute to the avatar_url property of user.avatar_url which is set in user's constructor function.
//  Next, it creates another div with class "user-info" and adds a h2 tag inside of this div followed by a p tag containing the name of user as well as their bio text.
//  It then adds two ul tags: one for followers and one for following followed by li tags for public repos on each list item (li).
//  The code is the function that creates a user card.
//  The first line of code sets up the function to create a new user card.
//  The second line of code creates an empty div with class="card" and class="user-info".
//  The third line of code adds in an image for the user, their avatar url, and their name.
//  The fourth line of code adds in a div with class="user-info" which will contain all relevant information about the user.
//  Lastly, it adds in a div with id "repos" which will be used to display any public repositories for this particular person.

function addReposToCard(repos) {
    const reposEl = document.getElementById("repos");

    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count) // TOOL FOR ANALYZING GITHUB STAR
        .slice(0, 10)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");

            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
}

// The code starts by declaring a variable called repos.
//  This is the variable that will hold all of the repositories that are added to the card.
//  Next, it creates an element with id "repos" and assigns it to document.getElementById("repos").
//  Then, it uses .sort() to sort the list of repositories in ascending order by stargazers_count - 1 (the first repository has no followers).
//  It then slices off 10 items from this list and iterates through them using forEach().
//  Inside each iteration, a new element is created with class repo and its innerText property set to name.
//  The new elements are appended onto the existing ones on reposEl so they appear as if they were part of one big string.
//  The code is meant to add the 10 most recent repositories from GitHub to a card in a list.





form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

        search.value = "";
    }
});

// The code is trying to submit the form when the user enters a search term.
// The code first checks if there is a value in the input field, and then it calls getUser() if there is one.
// The code is meant to submit the form with a value of "".