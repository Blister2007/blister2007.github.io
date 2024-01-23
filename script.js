function getUserData() {
    const username = document.getElementById('username').value.trim();

    if (username) {
        showLoading();
        fetchData(`https://api.github.com/users/${username}`)
            .then(data => {
                hideLoading();
                displayUserInfo(data);
            })
            .catch(error => {
                hideLoading();
                displayError('Error fetching user data. Please try again.');
            });
    } else {
        displayError('Please enter a GitHub username.');
    }
}

function getRepositories() {
    const username = document.getElementById('username').value.trim();

    if (username) {
        showLoading('repo-button');
        fetchData(`https://api.github.com/users/${username}/repos`)
            .then(repositories => {
                hideLoading('repo-button');
                displayRepositories(repositories);
            })
            .catch(error => {
                hideLoading('repo-button');
                displayError('Error fetching repositories. Please try again.');
            });
    } else {
        displayError('Please enter a GitHub username.');
    }
}

function getFollowers() {
    const username = document.getElementById('username').value.trim();

    if (username) {
        showLoading('followers-button');
        fetchData(`https://api.github.com/users/${username}/followers`)
            .then(followers => {
                hideLoading('followers-button');
                displayFollowers(followers);
            })
            .catch(error => {
                hideLoading('followers-button');
                displayError('Error fetching followers. Please try again.');
            });
    } else {
        displayError('Please enter a GitHub username.');
    }
}

function getFollowing() {
    const username = document.getElementById('username').value.trim();

    if (username) {
        showLoading('following-button');
        fetchData(`https://api.github.com/users/${username}/following`)
            .then(following => {
                hideLoading('following-button');
                displayFollowing(following);
            })
            .catch(error => {
                hideLoading('following-button');
                displayError('Error fetching following users. Please try again.');
            });
    } else {
        displayError('Please enter a GitHub username.');
    }
}

function fetchData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

function displayUserInfo(user) {
    const userInfoDiv = document.getElementById('user-info');
    userInfoDiv.innerHTML = `
        <h2>${user.login}</h2>
        <img src="${user.avatar_url}" alt="${user.login}" width="100">
        <p>Followers: ${user.followers}</p>
        <p>Following: ${user.following}</p>
    `;
}

function displayRepositories(repositories) {
    const repositoriesDiv = document.getElementById('repositories');
    repositoriesDiv.innerHTML = '<h2>Repositories:</h2>';
    
    if (repositories.length === 0) {
        repositoriesDiv.innerHTML += '<p>No repositories found.</p>';
    } else {
        repositories.forEach(repo => {
            repositoriesDiv.innerHTML += `<p>${repo.name}</p>`;
        });
    }
}

function displayFollowers(followers) {
    const followersDiv = document.getElementById('followers');
    followersDiv.innerHTML = '<h2>Followers:</h2>';
    
    if (followers.length === 0) {
        followersDiv.innerHTML += '<p>No followers found.</p>';
    } else {
        followers.forEach(follower => {
            followersDiv.innerHTML += `<p>${follower.login}</p>`;
        });
    }
}

function displayFollowing(following) {
    const followingDiv = document.getElementById('following');
    followingDiv.innerHTML = '<h2>Following:</h2>';
    
    if (following.length === 0) {
        followingDiv.innerHTML += '<p>Not following anyone.</p>';
    } else {
        following.forEach(user => {
            followingDiv.innerHTML += `<p>${user
