$(document).ready(function () {
    $(".datepicker").datepicker({ format: 'dd/M/yyyy', orientation: "bottom auto", autoclose: true, });
    $('#plandate').val(formatDate($('#plandate').val()));
   // $("#atimein_1").val(gettimefromdate($("#atimein_1").val()));
   // $("#atimeout_1").val(gettimefromdate($("#atimeout_1").val()));
    $(".select-chosen").chosen();
    ShowHideCustomer($("#SelectedcustomerType_id_1").val());
    var whdsrtype = parseInt($('#SelectedDaytype_id').val());
    if (whdsrtype != undefined && whdsrtype != null) {
        dsrblockinfo(whdsrtype);
    }
});

function dsrblockinfo(selectedval) {
    var checkUrl = '/dsr/getCityDisplayByDayType';
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: checkUrl,
        data: JSON.stringify({ DayTypeId: selectedval }),
        dataType: "json",
        async: "false",
        success: function (returndata) {
            if (returndata.ISCITYDISPLAY == 'N') {
                $("#dsrlsttbl").css("display", 'none');
                $("#Isholiday").val('Y');
                IsCityEnable = false;
            }
            else {
                $("#dsrlsttbl").css("display", 'block');
                $("#Isholiday").val('N');
                IsCityEnable = true;
            }
        },

    });
}


function ShowHideCustomer(selectedProspectTypeId) {
    debugger;
     
    $('#DealerList').hide();
    $('#RetailerList').hide();
    
    if (selectedProspectTypeId == 1) {
        $('#DealerList').show();
    }
    else if (selectedProspectTypeId == 2 || selectedProspectTypeId == 3) {
        $('#PROSPECT_ID').chosen();
        $('#PROSPECT_ID').trigger("chosen:updated");
        $('#RetailerList').show();

    }
}

function GetProspectData(ProspectTypeId, CityId, checkUrl) {
     
    ShowWaitingSymbol();
    $.ajax({
        url: checkUrl,
        type: "GET",
        dataType: "JSON",
        data: { ProspectTypeId: ProspectTypeId, CityId: CityId },//, str: str
        success: function (result) {
            debugger;
            ShowWaitingSymbol();
            if (ProspectTypeId == 1) {
                $("#DEALER_ID").empty();
                var v = "<option value=''>--Select--</option>";
                $('#DealerList').show();
                $('#RetailerList').hide();
                $('#DEALER_ID').chosen();
                $.each(result, function (i, data) {
                    v += "<option value=" + data.DEALER_ID + ">" + data.DEALERFULLNAME + "</option>";
                });
                $("#DEALER_ID").append(v);
                $("#DEALER_ID").trigger("chosen:updated");
                $("#btn_creteprospect").hide();
            }
            else {
                $("#PROSPECT_ID").empty();
                var v = "<option value=''>--Select--</option>";
                $('#DealerList').hide();
                $('#RetailerList').show();

                if (result != null && result != undefined && result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        v += '<option value="' + result[i].PROSPECT_ID + '">' + result[i].PROSPECTFULLNAME + '</option>';

                    }
                    $('#PROSPECT_ID').append(v);
                    debugger;
                    $("#btn_creteprospect").hide();
                } else {
                    $("#btn_creteprospect").show();
                }
                $('#PROSPECT_ID').chosen();
                $('#PROSPECT_ID').trigger("chosen:updated");
            }
            HideWaitingSymbol();
        },
        error: function (result) {
            HideWaitingSymbol();
        }
    });

}

function gettimefromdate(getdate) {
    debugger;
    if (getdate != "") {
        var getres = getdate.split(" ");
        var fintime = getres = getres[1].split(":");
        var resulttime = fintime[0] + ":" + fintime[1];
        return resulttime;
    }
}
function CheckValidation() {

    var valid = true;
    if (IsCityEnable) {
        if ($("#actualremarks_1").val().length == 0 || $("#actualremarks_1").val().length == 0) {
            alert("Please Enter Actual Remarks");
            $("#actualremarks_1").focus();
            valid = false;
        }
        else if ($("#atimein_1").val().length == 0) {
            alert("Please Enter Valid Time i.e HH:MM");
            $("#atimein_1").focus();
            valid = false;
        }
        else if ($("#atimeout_1").val().length == 0) {
            alert("Please Enter Valid Time i.e HH:MM");
            $("#atimeout_1").focus();
            valid = false;
        }
        else if (!validateHhMm($("#atimein_1").val()) || !validateHhMm($("#atimeout_1").val())) {
            alert("Please Enter Valid Time  i.e HH:MM");
            $("#atimein_1").focus();
            valid = false;
        }
        else if (compareTime($("#atimein_1").val(), $("#atimeout_1").val()) == 1) {
            alert("InTime Can't Greater Than OutTime ");
            $("#atimein_1").focus();
            valid = false;
        }
        else if ($("#Selectedcity_id_1").val() == "") {
            alert("Please select a city");
            $("#Selectedcity_id_1").trigger('chosen:activate');
            valid = false;
        }
    }
    return valid;
}

function validateHhMm(inputField) {

    var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(inputField);

    if (isValid) {

        return true;
    } else {

        return false;
    }

    return isValid;
}
function checktimeformat(frtval) {
    var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(frtval.value);
    if (isValid == false) {
        $("#" + frtval.id).css('border-color', 'red');
        $("#" + frtval.id).focus();
        return false;
    } else {
        $("#" + frtval.id).css('border-color', '');
        // $("#" + frtval.id).focus();
        return true;
    }

}

function timevalidate(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode > 43 && charCode > 45 && charCode != 58) {
        return false;
    }
    return true;
}

function compareTime(str1, str2) {
    if (str1 === str2) {
        return 0;
    }
    var time1 = str1.split(':');
    var time2 = str2.split(':');
    if (eval(time1[0]) > eval(time2[0])) {
        return 1;
    } else if (eval(time1[0]) == eval(time2[0]) && eval(time1[1]) > eval(time2[1])) {
        return 1;
    } else {
        return -1;
    }
}

function CreateProspect() {
    var url = "/Admin/CreateProspect?#admin";
    window.open(url, '_blank');
}
