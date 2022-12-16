function login() {

    let username = $('#username').val();
    let password = $('#password').val();

    if (username.trim() == '') {
        alert('ID를 입력해주세요');
        return;
    } else if (password.trim() == '') {
        alert('비밀번호를 입력해주세요');
        return;
    }

    $.ajax({
        type: "POST",
        url: `/api/user/login`,
        contentType: "application/json",
        data: JSON.stringify({username: username, password: password}),
        success: function (response, status, xhr) {
            alert(response);
            let host = window.location.host;
            let url = host + '/api/home';
            document.cookie =
                'Authorization' + '=' + xhr.getResponseHeader('Authorization') + ';path=/';
            window.location.href = 'http://' + url;
        },
        error: function (response) {
            alert("[Error:" + response.status + "] " + response.responseText);
            window.location.reload();
        }
    })
}