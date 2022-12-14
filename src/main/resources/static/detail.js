
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
        }
    })
})
