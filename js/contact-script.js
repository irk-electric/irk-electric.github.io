'use strict';
$(function() {
    $('#contactform #submit').on('click', function() {
        $('#contactform #submit').attr('disabled');

        var name = $('input#form_name').val(),
            email = $('input#form_email').val(),
            subject = $('input#form_subject').val(),
            phone = $('input#form_phone').val(),
            message = $('textarea#form_message').val();

        $.ajax({
            type: 'post',
            url: 'sendmail.php',
            data: 'name=' + name + '&email=' + email + '&phone=' + phone + '&subject=' + subject + '&message=' + message,

            success: function(results) {
                $('#contactform #submit').removeAttr('disabled');
                $('#formstatus').html(results);
                //clear fields

                var checksuccess = results.substring(0,44);
                if(checksuccess == "<div data-alert class='alert alert-success'>")
                    $('#contactform input[type="text"], #contactform input[type="email"], #contactform textarea').val('');
            }

        }); // end ajax
    });
});