
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
    $(`#text-area`).val(contents);
}

function showEdits() {
    $(`#edit-area`).show();
    $(`#submit`).show();
    $(`#delete`).show();

    $(`#contents`).hide();
    $(`#edit`).hide();
}

// 메모를 수정합니다.
function submitEdit(id) {
    let author = $(`#author`).text().trim();
    let contents = $(`#text-area`).val().trim();

    let data = {'author': author, 'contents': contents};

    $.ajax({
        type: 'PUT',
        url: `/api/posts/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('게시글 변경에 성공하였습니다.');
            window.location.reload();
        }
    });
}

function deleteOne(id) {
    $.ajax({
        type: 'DELETE',
        url: `/api/posts/${id}`,
        success: function (response) {
            alert("삭제되었습니다.")

            let host = window.location.host;
            let url = host + '/api/home';
            window.location.href = 'http://' + url;
        }
    })
}
