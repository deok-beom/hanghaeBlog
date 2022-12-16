$(document).ready(function () {
    var id = location.search.substring(location.search.indexOf("?") + 1).split("=")[1];

    $.ajax({
        type: 'GET',
        url: `/api/posts/${id}`,
        data: {},
        success: function (response) {
            let author = response['author'];
            let title = response['title'];
            let contents = response['contents'];
            let createdAt = new Date(response['createdAt']);
            let modifiedAt = new Date(response['modifiedAt']);

            $('#title').text(title);
            $('#author').text(author);
            $('#contents').text(contents);
            $('#createdAt').text(`최초 작성일 : ${createdAt.getFullYear()}년 ${createdAt.getMonth()}월 ${createdAt.getDate()}일`);
            $('#modifiedAt').text(`마지막 수정일 : ${modifiedAt.getFullYear()}년 ${modifiedAt.getMonth()}월 ${modifiedAt.getDate()}일`);

            let temp_html = `<img id="edit" class="icon-start-edit" src="/images/edit.png" alt="" onclick="editPost()">
                            <img id="delete" class="icon-delete" src="/images/delete.png" alt="" onclick="deleteOne('${id}')">
                            <img id="submit" class="icon-end-edit" src="/images/done.png" alt="" onclick="submitEdit('${id}')">`

            $('#footer').append(temp_html)
        }
    })
})

function editPost() {
    showEdits();
    let contents = $(`#contents`).text().trim();
    $(`#contents-area`).val(contents);
    let title = $(`#title`).text().trim();
    $(`#title-area`).val(title);
}

function showEdits() {
    $(`#edit-title`).show();
    $(`#edit-contents`).show();
    $(`#submit`).show();
    $(`#delete`).show();

    $(`#title`).hide();
    $(`#contents`).hide();
    $(`#edit`).hide();
}

// 메모를 수정합니다.
function submitEdit(id) {
    const auth = getToken();

    let title = $(`#title-area`).val().trim();
    let contents = $(`#contents-area`).val().trim();

    if (title.trim() == '') {
        alert('제목을 입력해주세요')
        return;
    } else if (contents.trim() == '') {
        alert('내용을 입력해주세요')
        return;
    }

    let data = {'title': title, 'contents': contents};

    $.ajax({
        type: 'PUT',
        url: `/api/posts/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", auth);
        },
        success: function (response) {
            alert('게시글이 성공적으로 변경되었습니다.');
            window.location.reload();
        },
        error: function (response) {
            alert('권한이 없습니다?');
            window.location.reload();
        }
    });
}

function deleteOne(id) {
    const auth = getToken();

    $.ajax({
        type: 'DELETE',
        url: `/api/posts/${id}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", auth);
        },
        success: function (response) {
            alert("삭제되었습니다.")

            let host = window.location.host;
            let url = host + '/api/home';
            window.location.href = 'http://' + url;
        },
        error: function (response) {
            alert('권한이 없습니다.');
        }
    })
}

function getToken() {
    let cName = 'Authorization' + '=';
    let cookieData = document.cookie;
    let cookie = cookieData.indexOf('Authorization');
    let auth = '';
    if (cookie !== -1) {
        cookie += cName.length;
        let end = cookieData.indexOf(';', cookie);
        if (end === -1) end = cookieData.length;
        auth = cookieData.substring(cookie, end);
    }
    return auth;
}
