/// data table

//$("#searchtbl").dataTable({
//    "scrollX": true,
//    scrollY: '80vh',
//    scrollCollapse: true
//});
////to close loader after loading jquery
//document.getElementById('pleaseWaitDialog').style.display = 'none';
//document.getElementById('pleaseWaitDialog_fade').style.display = 'none'

// date format 
function formatDate(date) {
    //debugger;
    if (date != "") {

        var newdate = new Date(date.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

        var monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct",
            "Nov", "Dec"
        ];

        var day = newdate.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        var monthIndex = newdate.getMonth();
        var year = newdate.getFullYear();
        if (year > 2010) {
            return day + '/' + monthNames[monthIndex] + '/' + year;
        }
        else {
            return "";
        }
    }
}


function formatDateMonth(date) {
    //debugger;
    if (date != "") {

        var newdate = new Date(date.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

        var monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct",
            "Nov", "Dec"
        ];

        var day = newdate.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        var monthIndex = newdate.getMonth();
        var year = newdate.getFullYear();
        if (year > 2010) {
            return monthNames[monthIndex] + '/' + year;
        }
        else {
            return "";
        }
    }
}



function formateJsonDate(date) {
    //debugger;
    var newdate = new Date(date.match(/\d+/)[0] * 1);     // Create a date object
    var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];

    var day = newdate.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    var monthIndex = newdate.getMonth();
    var year = newdate.getFullYear();
    if (year > 2010) {
        return day + '/' + monthNames[monthIndex] + '/' + year;
    }
    else {
        return "";
    }
}
//date picker
function OpenDatepicker() {
    $('.zebradatepicker').Zebra_DatePicker({
        format: 'Y/M/d',
        default_position: 'below'
    });
}
    function ShowWaitingSymbol() {
        //to open loader after loading jquery
        document.getElementById('pleaseWaitDialog').style.display = 'block';
    document.getElementById('pleaseWaitDialog_fade').style.display = 'block'
        $("html, body").animate({scrollTop: 0 }, "fast");
}

     function HideWaitingSymbol() {
        //to close loader after loading jquery
        document.getElementById('pleaseWaitDialog').style.display = 'none';
    document.getElementById('pleaseWaitDialog_fade').style.display = 'none'
}


$(document).on('keydown', '.numberinput', function (e) {
    //	$('.numberinput').keydown(function (e) {
    var key = e.which || e.keyCode;
    var curuntThis = this;
    var textboxName;
    var textboxValue;

    if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
        // numbers
        key >= 48 && key <= 57 ||
        // Numeric keypad
        key >= 96 && key <= 105 ||
        // comma, period and minus, . on keypad
        //key == 190 || key == 109 ||  key == 110 || key == 188 ||
        // Backspace and Tab and Enter
         key == 8 || key == 9 || key == 13 ||
        // Home and End
        key == 35 || key == 36 ||
        // left and right arrows
        key == 37 || key == 39 ||
        // Del and Ins
        key == 46 || key == 45) {
        return true;
    }
    else {
        return false;
    }
});

$(document).on('keydown', '.decimalinput', function (event) {
    debugger;
    if (((event.which != 190 || (event.which == 46 && $(this).val() == '')) ||
        $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
});

//$('.decimalinput').on('paste', function (event) {
//    event.preventDefault();
//})
function IsEmail($email) {
    var emailReg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ($email.value != '') {
        if (!emailReg.test($email.value)) {
            $('#' + $email.id).val('');
            debugger;
            alert("Please Enter Valid Email");
            //$('#' + $email.id).focus();
        }
    }
}

function IsPhoneNumber(pnoneNO) {
    var pnoneNOLength = $("#" + pnoneNO.id).val().length;
    debugger;
    if (pnoneNOLength > 10 || pnoneNOLength < 10 && pnoneNOLength !=0) {
        $('#' + pnoneNO.id).val('');
        alert("Please Enter 10 disit Valid Phone Number");
        //$('#' + pnoneNO.id).focus();
    }
}

function IsImage(image) {

    var val = image.value;
    debugger;
    switch (val.substring(val.lastIndexOf('.') + 1).toLowerCase()) {
        case 'gif': case 'jpg': case 'png':
            //alert("an image");
            break;
        default:
            $(this).val('');
            // error message here
            alert("not an image");
            $('#' + image.id).val("");
            break;
    }
} 