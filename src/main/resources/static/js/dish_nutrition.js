let selectedFile;

function previewImage(event) {
    const input = event.target;
    const imagePreview = document.getElementById('imagePreview');
    const uploadButton = document.getElementById('uploadButton');

    if (input.files && input.files[0]) {
        selectedFile = input.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        }

        reader.readAsDataURL(selectedFile);
        uploadButton.style.display = 'inline';
    }
}

function uploadImage() {
    const token = JSON.parse(localStorage.getItem('token')).value;
    const formData = new FormData();
    formData.append('image', selectedFile);
    const apiUrl = 'https://api.logmeal.com/v2';
    $.ajax({
        url: apiUrl + '/image/segmentation/complete',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response);
            const imageId = response.imageId;

            // Nutritional Information
            $.ajax({
                url: apiUrl + '/nutrition/recipe/nutritionalInfo',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({ imageId: imageId }),
                success: function (nutritionResponse) {
                    display(nutritionResponse);
                },
                error: function (error) {
                    alert(error);
                }
            });
        },
        error: function (error) {
            alert(error);
        }
    });
}

function display(foodData){
    document.getElementById('food-container').hidden = false;
    document.getElementById('upload-container').remove();
    const foodName = document.createElement('li');
    foodName.textContent = foodData['foodName'];
    document.getElementById('food-name').appendChild(foodName);
    const highlightsList = document.getElementById('highlights-list');
    Object.entries(foodData['nutritional_info']['dailyIntakeReference']).forEach(([key, value]) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${value['label']}: ${value['level']}`;
        highlightsList.appendChild(listItem);
    });

    const nutrientsList = document.getElementById('nutrients-list');
    Object.entries(foodData['nutritional_info']['totalNutrients']).forEach(([key, nutrient]) => {
        const row = document.createElement('option');
        row.textContent = `${nutrient.label}`;
        nutrientsList.appendChild(row);
    });
}