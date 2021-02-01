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



        if ($(id).val().trim().match(/^\d*$/) == null || $(id).val().trim().length != 9) {
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
                        <p > שם :  ${res.user[i]['fname']}  ${res.user[i]['lname']} </p>
                        <p > תעודת זהות  :   ${res.user[i]['id']}  </p>
                        <p > חדר  :   ${res.user[i]['Room']}  </p>`
                        if (res.user[i]['special'] != "") {
                            c += `<p > התאמה :  ${res.user[i]['special']}  -   ${res.user[i]['specialData']} </p>`

                        } else {
                            c += `<p > התאמה : אין </p>`

                        }

                        c += `<p > כיתת אם: ${res.user[i]['Class']} </p>
                        <p > בחינה  : ${res.user[i]['subject']}(${res.user[i]['IDsubject']}) </p>
                        <p > תאריך בחינה  : ${res.user[i]['Date']} (${res.user[i]['Stime']}) - (${res.user[i]['Etime']}) </p>
                        <p> בהצלחה  </p> 
                    </div>`
                        var exsam = new Date();
                        var Eng_t = new Date();
                       
                        time = " " + res.user[i]['Stime'];
                        timeE = " " + res.user[i]['Etime'];
                        Eng_t.setHours(timeE.substring(1, 3));
                        Eng_t.setMinutes(timeE.substring(4, 7));
                        exsam.setHours(time.substring(1, 3));
                        exsam.setMinutes(time.substring(4, 7) - 30);
                        const start = exsam.getHours() * 60 + exsam.getMinutes();
                        const end =Eng_t.getHours()*60+Eng_t.getMinutes();
                        const date = new Date(); 
                        const now = date.getHours() * 60 + date.getMinutes();
                     

                        if (start <= now && now <= end && date.getDate()==res.user[i]['Date'].substring(0, 2) ) {

                        }
                        else if(now >= end &&date.getDate()==res.user[i]['Date'].substring(0, 2)){
                            c = `<div id="t2">
                            <p>انتهى الامتحان :)  </p>
                            <p> בהצלחה  </p> 

                            `
                                        $('#t1').show();
                                        $('#t1').html(c);
                        }
                        else {
                            c = `<div id="t2">
                <p > ! الرجاء الفحص قبل الامتحان ب 30 دقائق    </p>`
                            $('#t1').show();
                            $('#t1').html(c);

                        }

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