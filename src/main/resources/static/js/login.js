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
            if (response === 'success') {
                let host = window.location.host;
                let url = host + '/api/home';

                document.cookie =
                    'Authorization' + '=' + xhr.getResponseHeader('Authorization') + ';path=/';
                window.location.href = 'http://' + url;
            } else {
                alert('로그인에 실패하셨습니다. 다시 로그인해 주세요.')
                window.location.reload();
            }
        }
    })
}