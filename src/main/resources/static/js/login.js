function login() {

    let name = $('#name').val();
    let password = $('#password').val();

    if (name.trim() == '') {
        alert('ID를 입력해주세요');
        return;
    } else if (password.trim() == '') {
        alert('비밀번호를 입력해주세요');
        return;
    }

    $.ajax({
        type: "POST",
        url: `/api/author/login`,
        contentType: "application/json",
        data: JSON.stringify({name: name, password: password}),
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