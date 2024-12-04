window.onload = function (){
    const token = JSON.parse(localStorage.getItem('token')).value;
    console.log(token);
    $.ajax({
        url: "https://api.logmeal.com/v2/profile/getUserProfileInfo",
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function (data) {
            displayInfo('birth', data.birth);
            displayInfo('gender', data.sex);
            displayInfo('height', data.height);
            displayInfo('weight', data.weight);
        },
        error: function (err) {
            console.log(err);
        }
    });
};
function displayInfo(id, value){
    if(value === null) return;
    document.getElementById(id).placeholder = value;
}
function getInfo(id, isArray) {
    const element = document.getElementById(id);
    if(isArray){
        const values = Array.from(element.selectedOptions).map(option => option.value);
        if(values.length === 0)
            return null;
        return values;
    }
    return element.value;
}

const formElement = document.getElementById("info_form");
formElement.addEventListener('submit', function(event) {
   event.preventDefault();
    const form = document.getElementById('info_form');
    const formData = new FormData(form);
    let requestBody = {};
    for (const [name, value] of formData.entries()) {
        if(value === "") continue;
        if(name === "food_restrictions"){
            if(!(name in requestBody)){
                requestBody[name] = [];
            }
            requestBody[name].push(value);
        }else{
            requestBody[name] = value;
        }
    }
    console.log(requestBody);
    const token = JSON.parse(localStorage.getItem('token')).value;
    $.ajax({
        url: "https://api.logmeal.com/v2/profile/modifyUserProfileInfo",
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(requestBody),
        success: function (response){
            alert("Changes have been saved!");
        },
        error: function (response) {
            alert(response);
        }
    });
});