(function ($) {


    /*==================================================================
    [ Validate ]*/
    var name = $('.validate-input input[name="name"]');
    var id = $('.validate-input input[name="email"]');



    $('.validate-form').on('submit', function () {

        var check = true;


        if ($(name).val().trim() == '') {
            showValidate(name);
            check = false;
        }



        if ($(id).val().trim().match(/^\d*$/) == null) {
            showValidate(id);
            check = false;
        }
        if (check == true) {
            var today = new Date();
            showdata();

           
            // if (today.getHours() == 18 && today.getMinutes() == 34) {
            //     showdata();

                
            // }
            // else{
            //     c = `<div id="t2">
            //     <p > ! الرجاء الفحص قبل الامتحان بخمس دقائق    </p>`
            //         $('#t1').show();
            //         $('#t1').html(c);

            // }

        }
        return false;


    });


    $('.validate-form .input1').each(function () {
        $(this).focus(function () {

            hideValidate(this);

        });
    });

    function showValidate(input) {

        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function showdata(input) {
        var c = "";
        $('#t3').text("الرجاء الانتظار ")




        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbx5VBXjFQa0P4PnR9bM7lmiX4k0ckc9OTbddl7pwO_PdMQeYiT9NrWxXw/exec",
            type: 'GET',
            dataType: 'json', // added data type
            success: function (res) {
                $('#t1').html("");
                x = 0;

                for (var i = 0; i < res.user.length; i++) {
                    console.log(res.user[i]);
                    if (res.user[i]['id'] == $(id).val().trim()) {
                        c = `<div id="t2">
                        <p > الاسم :  ${res.user[i]['fname']} </p>
                        <p >  الاسم العائلة :  ${res.user[i]['lname']} </p>
						<p > الصف :  ${res.user[i]['class']} </p>
						<p > موضوع الامتحان : ${res.user[i]['Subject']} </p>
						<p > رقم هوية : ${res.user[i]['id']} </p>
                        <p > ${res.user[i]['class-Ex']} : غرفة الامتحان   </p>


                    </div>
                    `
                        $('#t1').show();
                        $('#t1').html(c);
                        x = 1;
                        break
                    }
                }

                if (x == 0) {
                    c = `<div id="t2">
                <p >  لا يوجد معلومات او رقم هوية غير موجود الرجاء التوجه الى المركز !   </p>`
                    $('#t1').show();
                    $('#t1').html(c);

                }

            }
        });
        $('#t3').text("عرض المعلومات ")

        //


    }


    function hideValidate(input) {

        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }



})(jQuery);