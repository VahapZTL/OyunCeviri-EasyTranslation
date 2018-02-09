
function showProfileBox () {
    $("#profileBoxId").removeClass('hidden');
    $("#editBoxId").addClass('hidden');
}

function hideProfileBox () {
    $("#profileBoxId").addClass('hidden');
    $("#editBoxId").removeClass('hidden');
}

var options = {
    url:'/profile',
    type:'POST',
    clearForm: true,
    success: function () {
        $('#alertSuccess').removeClass('hidden');
    }
};

$('#formInfo').ajaxForm(options);