/*

 */
function logOut() {
    $.ajax({
        url: "http://localhost:8080/logout",
        method: "POST",
        success: function (response) {
            alert("You have successfully logged out.");
            removeToken();
        },
        error: function (xhr, status, error) {
            alert("Logout failed: " + error);
        },
    });
}

function logIn() {
    window.location.href = "/oauth2/authorization/google";
}

function setItemWithExpiry(key, value, ttl) {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
}

function removeToken() {
    localStorage.removeItem('token');
}

function isTokenExpired() {
    let value = localStorage.getItem('token');
    if(!value) return;
    value = JSON.parse(value);
    const now = new Date();
    if(now.getTime() > value.expiry){
        removeToken();
    }
}

function isLoggedIn() {
    // isTokenExpired();
    return localStorage.getItem('token') !== null;
}

function setOrUpdateToken() {
    if(localStorage.getItem('token') === null)
        $.ajax({
            url: '/getToken',
            type: 'GET',
            success: function (data) {
                setItemWithExpiry('token', data, 20 * 60 * 1000);
                window.location.href = 'html/gateway.html';
            },
            error: function (xhr, status, error) {
                alert("Login is required!");
            }
        });
    else
        window.location.href = 'html/gateway.html';
}

function toggleDropdown() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    if (isLoggedIn()) {
        dropdownMenu.innerHTML = `
            <li><a class="dropdown-item" href="/html/profile.html">Profile</a></li>
            <li><a class="dropdown-item" href="#" onclick="logOut()">Log Out</a></li>
          `;
    } else {
        dropdownMenu.innerHTML = `
            <li><a class="dropdown-item" href="#" onclick="logIn()">Sign In</a></li>
          `;
    }
}


function handleClick() {
    const featuresLink = document.getElementById("featuresLink");
    //checkLoginStatus();
    if (isLoggedIn()) {
        featuresLink.href = "html/family_group.html";
    } else {
        featuresLink.href = "index.html";
        alert("Please log in to access features.");
    }
}