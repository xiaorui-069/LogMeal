function getRecommendedDailyIntake() {
    const token = JSON.parse(localStorage.getItem('token')).value;
    $.ajax({
        url: "https://api.logmeal.com/v2/nutrition/getRecommendedDailyIntake",
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        success: function (response) {
            console.log(response['daily_recommendation']);
            const data = data_processing(response['daily_recommendation']);
            let subHtml = "<dl>";
            for(let key in data){
                subHtml += `<dt>Intake:</dt>
                            <dd>${data[key]['label']}</dd>
                            <dt>Average:</dt>
                            <dd>${data[key]['average_value']}</dd>`;
            }
            subHtml += "</dl>"
            document.getElementById('data-display').innerHTML = `<section class="section">${subHtml}</section>`;
        },
        error: function (response) {
            alert(response);
        }
    });
}

function data_processing(data) {
    const obj = {};
    Object.entries(data).forEach(([key, value]) => {
        obj[key] = {};
        Object.entries(value).forEach(([subKey, subValue]) => {
            if (subKey === 'average_value') {
                obj[key][subKey] = `${subValue}${value['unit']}`;
            } else if (subKey === 'label') {
                obj[key][subKey] = subValue;
            }
        });
    });
    console.log(obj);
    return obj;
}