$(function(){
    console.log("Document Ready");

    $('.edit-btn').on('click', function(){
        $('#profileBoxId').addClass('hidden');
        $('#editBoxId').removeClass('hidden');
    });

    $('.cancel-btn').on('click', function(){
        $('#editBoxId').addClass('hidden');
        $('#profileBoxId').removeClass('hidden');
    });

    $('.upload-btn').on('click', function (){

        var profileFormData = new FormData();
        
        profileFormData.append('user_id', $('#user_id').val());
        profileFormData.append('name', $('#inputName').val());
        profileFormData.append('surname', $('#inputSurname').val());
        profileFormData.append('email', $('#inputEmail').val());
        profileFormData.append('password', $('#inputPass1').val());
        profileFormData.append('_password', $('#inputPass2').val());

        var imageFiles = $('#upload-input').get(0).files;

        if (imageFiles.length > 0){
            for (var i = 0; i < imageFiles.length; i++) {
                var imageFile = imageFiles[i];
          
                // add the files to formData object for the data payload
                profileFormData.append('image', imageFile, imageFile.name);
            }
            $.ajax({
                url: '/profile',
                type: 'POST',
                data: profileFormData,
                processData: false,
                contentType: false,
                success: function(data){
                    $('#alertSuccess').removeClass('hidden');
                },
                xhr: function() {
                // create an XMLHttpRequest
                var xhr = new XMLHttpRequest();
    
                // listen to the 'progress' event
                xhr.upload.addEventListener('progress', function(evt) {
    
                    if (evt.lengthComputable) {
                    // calculate the percentage of upload completed
                    var percentComplete = evt.loaded / evt.total;
                    percentComplete = parseInt(percentComplete * 100);
    
                    }
    
                }, false);
    
                return xhr;
                }
            });
        }
    });

    $('.upload-trans').on('click', function (){

        var translateForm = new FormData();

        translateForm.append('gameName', $('#InputGameName').val());

        var translateFiles = $('#inputMainText').get(0).files;
        console.log(translateFiles);
        console.log(translateForm.values());
        if(translateFiles.length > 0){
            for (var i = 0; i < translateFiles.length; i++) {
                var translateFile = translateFiles[i];
          
                // add the files to formData object for the data payload
                translateForm.append('mainText', translateFile, translateFile.name);
            }
            console.log(translateForm.values());
            $.ajax({
                url: '/addText',
                type: 'POST',
                data: translateForm,
                processData: false,
                contentType: false,
                success: function(data){
                    $('#alertSuccess').removeClass('hidden');
                },
                xhr: function() {
                // create an XMLHttpRequest
                var xhr = new XMLHttpRequest();
    
                // listen to the 'progress' event
                xhr.upload.addEventListener('progress', function(evt) {
    
                    if (evt.lengthComputable) {
                    // calculate the percentage of upload completed
                    var percentComplete = evt.loaded / evt.total;
                    percentComplete = parseInt(percentComplete * 100);
    
                    }
    
                }, false);
    
                return xhr;
                }
            });
        }
    });
    
    $('#signup-btn').on('click', function(){
        var signupForm = new FormData();
        
        signupForm.append('name', $('#inputSigName').val());
        signupForm.append('surname', $('#inputSigSurname').val());
        signupForm.append('email', $('#inputSigEmail').val());
        signupForm.append('password', $('#inputSigPass1').val());
        signupForm.append('userRole', $('#inputSigRole').val());
        
        console.log(signupForm);

        $.ajax({
            url: '/signup',
            type: 'POST',
            data: signupForm,
            processData: false,
            contentType: false,
            success: function(data){
                $('#alertSuccess').removeClass('hidden');
            }
        });
    });
});