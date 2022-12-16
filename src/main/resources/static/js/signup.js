function onclickAdmin() {
    // Get the checkbox
    var checkBox = document.getElementById("admin-check");
    // Get the output text
    var box = document.getElementById("admin-token");

    // If the checkbox is checked, display the output text
    if (checkBox.checked == true) {
        box.style.display = "block";
    } else {
        box.style.display = "none";
    }
}

function signup() {
    let username = $('#username').val();
    let password = $('#password').val();
    let admin = $('#admin-check').is(':checked');
    let adminToken = $('#admin-token').val();

    $.ajax({
        type: "POST",
        url: `/api/user/signup`,
        contentType: "application/json",
        data: JSON.stringify({username: username, password: password, admin: admin, adminToken: adminToken}),
        success: function (response) {
            let host = window.location.host;
            let url = host + '/api/user/login';
            alert(response);
            window.location.href = 'http://' + url;
        },
        error: function (response) {
            alert("[Error:" + response.status + "] " + response.responseText);
            window.location.reload();
        }
    })
}