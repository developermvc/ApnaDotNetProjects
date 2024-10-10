function showdiv() {
    
    debugger;
    ShowWaitingSymbol();
    if ($("#travelExpHDRMaster_fromDate").val() != "" && $("#travelExpHDRMaster_toDate").val() != "" && $("#travelExpHDRMaster_UserCode").val() != "") {

        $("#dvtravelexp").load('/Travel/_TravelExpenseDetail?userCode=' + $("#travelExpHDRMaster_UserCode").val() + '&fromDate=' + $("#travelExpHDRMaster_fromDate").val() + '&toDate=' + $("#travelExpHDRMaster_toDate").val(), function (responseTxt, statusTxt, jqXHR) {
            if (statusTxt == "success") {
                HideWaitingSymbol();
            }
            if (statusTxt == "error") {
                alert("Error: " + jqXHR.status + " " + jqXHR.statusText);
                HideWaitingSymbol();
            }
        });
        

    }
    else {
        alert('Please enter all mandetory fields');
        HideWaitingSymbol();
    }
}
function tab5open(input) {

    $("#" + $(input).attr("aria-controls")).show();
    $("#steps-uid-0-p-0").hide();
    $("#steps-uid-0-p-1").hide();
    $("#steps-uid-0-p-2").hide();
    $("#steps-uid-0-p-3").hide();
    $("#steps-uid-0-p-4").hide();

    $("#btnsubmit").hide();
    $("#mainul li").removeClass("current");
    $(input).parent().addClass("current");
}
function tab1open(input) {
    $("#" + $(input).attr("aria-controls")).show();
    $("#steps-uid-0-p-0").hide();
    $("#steps-uid-0-p-2").hide();
    $("#steps-uid-0-p-3").hide();
    $("#steps-uid-0-p-4").hide();
    $("#steps-uid-0-p-5").hide();
    $("#btnsubmit").hide();
    $("#mainul li").removeClass("current");
    $(input).parent().addClass("current");
}
function tab2open(input) {
    $("#" + $(input).attr("aria-controls")).show();
    $("#steps-uid-0-p-0").hide();
    $("#steps-uid-0-p-1").hide();
    $("#steps-uid-0-p-3").hide();
    $("#steps-uid-0-p-4").hide();
    $("#steps-uid-0-p-5").hide();
    $("#btnsubmit").hide();
    $("#mainul li").removeClass("current");
    $(input).parent().addClass("current");
}
function tab3open(input) {
    $("#" + $(input).attr("aria-controls")).show();
    $("#steps-uid-0-p-0").hide();
    $("#steps-uid-0-p-1").hide();
    $("#steps-uid-0-p-2").hide();
    $("#steps-uid-0-p-4").hide();
    $("#steps-uid-0-p-5").hide();
    $("#btnsubmit").hide();
    $("#mainul li").removeClass("current");
    $(input).parent().addClass("current");
}
function tab0open(input) {
    $("#" + $(input).attr("aria-controls")).show();
    $("#steps-uid-0-p-1").hide();
    $("#steps-uid-0-p-2").hide();
    $("#steps-uid-0-p-3").hide();
    $("#steps-uid-0-p-4").hide();
    $("#steps-uid-0-p-5").hide();
    $("#btnsubmit").hide();
    $("#mainul li").removeClass("current");
    $(input).parent().addClass("current");
}
function tab4open(input) {
   
    getSummary();
    var tfnamt = gettiffintotal();
    $("#total_tiffenxp").text(tfnamt.toFixed(2));
    var ldngamt = getlodgingtotal(ldngamt);
    $("#total_lodgingexp").text(ldngamt.toFixed(2));
    var othramt = getothertotal();
    $("#total_otherexp").text(othramt.toFixed(2))
    var trvlamt = gettravelTotal();
    $("#total_travelexp").text(trvlamt.toFixed(2));
    var fareamt = getfaretotal();
    $("#total_fareexp").text(fareamt.toFixed(2));
    var ttotalamt = tfnamt + ldngamt + othramt + trvlamt + fareamt;
    $("#total_totalexp").text(ttotalamt.toFixed(2));


    //$("#" + $(input).attr("aria-controls")).show();
    //$("#steps-uid-0-p-0").hide();
    //$("#steps-uid-0-p-1").hide();
    //$("#steps-uid-0-p-2").hide();
    //$("#steps-uid-0-p-3").hide();
    //$("#steps-uid-0-p-5").hide();
    $("#btnsubmit").show();

    //$("#mainul li").removeClass("current");
    //$(input).parent().addClass("current");
}
//**************Total expense start

//Get Summary
function getSummary() {
 
    var sdt = new Date(formatDate($("#travelExpHDRMaster_fromDate").val()));
    var enddt = new Date(formatDate($("#travelExpHDRMaster_toDate").val()));
 
    
    $("#finalexp tbody").empty();
    while (sdt <= enddt) {
        var fare_amt = 0.00;
        var trvl_amt = 0.00;
        var tiffn_amt = 0.00;
        var lodging_amt = 0.00;
        var ather_amt = 0.00;
        var total_amt = 0.00;
        var date = sdt;

        $('#fareexp tbody tr').each(function (i, tr) {
            var frdt =formatDate($(tr).find("td:nth-child(3) input[type=text]").val());
            if (frdt != '' && frdt == formatDate(date.toString())) {
            if ($(tr).find("td:nth-child(10) input[type=text]").val() != '') {
                fare_amt = parseFloat(fare_amt) + parseFloat($(tr).find("td:nth-child(10) input[type=text]").val());
                }
            }
        });
         
        for (var j = 1; j <= parseInt($("#Noofcount").val()); j++) {

            $('#trvltbl' + j + ' tbody tr').each(function (i, tr) {
                var trvldate = formatDate($(tr).find("td:nth-child(2) input[type=text]").val());
                 
                if (trvldate != '' && trvldate == formatDate(date.toString())) {
                  
                    if ($(tr).find("td:nth-child(7) input[type=text]").val() != "") {
                        trvl_amt = parseFloat(trvl_amt) + parseFloat($(tr).find("td:nth-child(7) input[type=text]").val());
                    }
                    
                }
            });

        }

        $('#tiffinexp tbody tr').each(function (i, tr) {
            var tfndate = formatDate($(tr).find("td:nth-child(2) input[type=text]").val());
            if (tfndate != '' && tfndate == formatDate(date.toString())) {
                if ($(tr).find("td:nth-child(4) input[type=text]").val() != "") {
                    tiffn_amt = parseFloat(tiffn_amt) + parseFloat($(tr).find("td:nth-child(4) input[type=text]").val());
                }
            }
        });

        $('#lodegingexp tbody tr').each(function (i, tr) {
             
            var lodgdate = formatDate($(tr).find("td:nth-child(4) input[type=text]").val());
            if (lodgdate != '' && lodgdate == formatDate(date.toString())) {
                if ($(tr).find("td:nth-child(13) input[type=text]").val() != '') {
                    lodging_amt = parseFloat(lodging_amt) + parseFloat($(tr).find("td:nth-child(13) input[type=text]").val());
                }
            }
        });

        $('#otherexp tbody tr').each(function (i, tr) {
            var othrdate = formatDate($(tr).find("td:nth-child(2) input[type=text]").val());
            if (othrdate != "" && othrdate == formatDate(date.toString())) {
            if ($(tr).find("td:nth-child(4) input[type=text]").val() != '') {
                ather_amt = parseFloat(ather_amt) + parseFloat($(tr).find("td:nth-child(4) input[type=text]").val());
                }
            }
        });

        total_amt = parseFloat(fare_amt) + parseFloat(trvl_amt) + parseFloat(tiffn_amt) + parseFloat(lodging_amt) + parseFloat (ather_amt);
        
        if (fare_amt != 0.00 || trvl_amt != 0.00 || tiffn_amt != 0.00 || lodging_amt != 0.00 || ather_amt != 0.00) {
            var rowno = $("#finalexp tbody tr").length + 1;
            $("#finalexp tbody").append('<tr><td>' + rowno + '</td>' +
                '<td>' + formatDate(date.toString()) + '</td>' +
                '<td style="text-align: right">' + fare_amt.toFixed(2) + '</td>' +
                '<td style="text-align: right">' + trvl_amt.toFixed(2) + '</td>' +                
                '<td style="text-align: right">' + lodging_amt.toFixed(2) + '</td>' +
                '<td style="text-align: right">' + tiffn_amt.toFixed(2) + '</td>' +
                '<td style="text-align: right">' + ather_amt.toFixed(2)+ '</td>' +
                '<td style="text-align: right">' + total_amt.toFixed(2) + '</td>' +
                '</tr>');
        }
         
        sdt.setDate(sdt.getDate() + 1);
         
    }

}
//end summary
function gettiffintotal() {
    var tfntotal = 0.00;   
    $('#tiffinexp tbody tr').each(function (i, tr) {
        if ($(tr).find("td:nth-child(2) input[type=text]").val() != '') {
            if ($(tr).find("td:nth-child(4) input[type=text]").val() != '') {
                tfntotal = parseFloat(tfntotal) + parseFloat($(tr).find("td:nth-child(4) input[type=text]").val());
            }
        }
    });
    return tfntotal;
}
function getlodgingtotal() {
    var ldngtotal = 0.00;
    $('#lodegingexp tbody tr').each(function (i, tr) {
        if ($(tr).find("td:nth-child(4) input[type=text]").val() != '') {
            if ($(tr).find("td:nth-child(13) input[type=text]").val() != '') {
                ldngtotal = parseFloat(ldngtotal) + parseFloat($(tr).find("td:nth-child(13) input[type=text]").val());
            }
        }
    });
    return ldngtotal;
}
function getothertotal() {
    var othertotal = 0.00;
    $('#otherexp tbody tr').each(function (i, tr) {
        if ($(tr).find("td:nth-child(2) input[type=text]").val() != '') {
            if ($(tr).find("td:nth-child(4) input[type=text]").val() != '') {
                othertotal = parseFloat(othertotal) + parseFloat($(tr).find("td:nth-child(4) input[type=text]").val());
            }
        }
    });
    return othertotal;
}
function gettravelTotal() {

    var trvlsum = 0.00;
    for (var j = 1; j <= parseInt($("#Noofcount").val()); j++) {
        $('#trvltbl' + j + ' tbody tr').each(function (i, tr) {
            if ($(tr).find("td:nth-child(7) input[type=text]").val() != '') {
                trvlsum = parseFloat(trvlsum) + parseFloat($(tr).find("td:nth-child(7) input[type=text]").val());
            }
        });

    }
    return trvlsum;
}
function getfaretotal() {
    var faretotal = 0.00;
    $('#fareexp tbody tr').each(function (i, tr) {
        if ($(tr).find("td:nth-child(3) input[type=text]").val() != '') {
            if ($(tr).find("td:nth-child(10) input[type=text]").val() != '') {
                faretotal = parseFloat(faretotal) + parseFloat($(tr).find("td:nth-child(10) input[type=text]").val());
            }
        }
    });
    return faretotal;
}
function suminline(input) {
    //alert($(input).attr("data-id"));
    var id = $(input).attr("data-id");
    var amt = $("#lodgingamt_" + id).val() == "" ? 0 : $("#lodgingamt_" + id).val();
    var daamt = $("#daAmt_" + id).val() == "" ? 0 : $("#daAmt_" + id).val();
   // alert(daamt);
    if (amt > 0) {
        $("#daAmt_" + id).prop("readonly", true);
    }
    if (amt == 0) {
        $("#daAmt_" + id).prop("readonly", false);
    }
     if (daamt > 0) {
        $("#lodgingamt_" + id).prop("readonly", true);
    }
   if (daamt == 0) {
        $("#lodgingamt_" + id).prop("readonly", false);
    }
    var sum = parseFloat(amt) + parseFloat(daamt)
    $("#totalamt_" + id).val(sum.toFixed(2));
}
//**********************END
function deleteRow(input) {
     
    try {
        var rowid = $(input).attr("data-name");//"otherrw" + Id;
        var tblname = $(input).attr("data-tbl");
        
        $("#" + rowid).remove();
        var table = document.getElementById(tblname).getElementsByTagName('tbody')[0];
        var rowCount = table.rows.length;

        var newserialnumber = 1;
        for (var i = 1; i < rowCount; i++) {
            newserialnumber = newserialnumber + 1;
            var row = table.rows[i];
            var serialtd = row.cells[0];
            serialtd.innerHTML = newserialnumber;
        }
        serialnumber = newserialnumber;
    }
    catch (e) {
        alert(e);
    }
}
//***********Travel Expense Start******************
function addrowdata(input) {
     
    var i = $(input).attr("id");
    var dt = $(input).attr("data-plandate");
  
    var nm = "trvltbl" + i;
    var dtlid = $("#" + nm).attr("data-dsrdtlid");
    
    var j = $("#trvltbl" + i + " > tbody > tr").length + 1;

    var str = "";
    if (j > 1) {
        str = '<a data-tbl="' + nm + '" data-name="' + nm + j + '" class="btn btn-sm btn-secondary  pt-top " onclick="return deleteRow(this);"><i class="fa fa-trash bg_red"></i></a>';
    }
    $("#subrow" + i).show();
    $("#trvltbl" + i + " tbody").append(
        '<tr id="' + nm + j + '">' + '<td align="center">' + j + '</td>' +
        '<td align="center"><input type="text" id="localconvdate_' + j + '" name="localconvdate_' + j + '" class="form-control" value="' + dt + '" onchange="TravelDateValidatin(this)" readonly="readonly"/></td>' +
        '<td align="center"><input type="text" id="fromSource_' + j + '" name="fromSource_' + j + '" style="border-color:red !important;"  class="form-control"/></td>' +
        '<td align="center"><input type="text" id="toDestination_' + j + '" name="toDestination_' + j + '" style="border-color:red !important;"  class="form-control"/></td>' +
        '<td align="center"><input type="text" id="totalDistance_' + j + '" name="totalDistance_' + j + '" style="border-color:red !important;"  class="form-control decimalinput"/></td>' +
        '<td align="center"><select id="travelMode_' + j + '" name="travelMode_' + j + '" class="form-control" style="border-color:red !important;" >' + $("#HiddenTravelModeId").html() + '</select ></td > ' +
        '<td align="center"><input type="text" id="travleCharge_' + j + '" name="travleCharge_' + j + '" style="border-color:red !important; text-align: right"  class="form-control decimalinput" style="text-align: right"/></td>' +
        '<td align="center"><input type="text" id="travleRemark_' + j + '" name="travleRemark_' + j + '" class="form-control"/></td>' +
        '<td align="center"><input type="file" id="localconvenseAttachment_' + dtlid + j + '" name="localconvenseAttachment_' + dtlid + j + '" data-fileid="localconvenseAttachmentfile_' + dtlid + j + '" onchange="saveattachment(this)" class="form-control" style="width:60%; float:left;"/><input type="text" style="display:none;" id="localconvenseAttachmentfile_' + dtlid + j + '" name="localconvenseAttachmentfile_' + dtlid + j +'" class="form-control" /></td>' +
        '<td align="center">' + str + '</td></tr>'
    )
    //dsrdtlAttachment_@trvlexpitem.DSRDTLID@p

    $('.DatePicker').datepicker({
        format: 'dd/M/yyyy',
        endDate: new Date()

    });
}
//***********Travel Expense End********************
//***********Tiffin Expense Start******************
function AddTiffinRow() {


    var j = $("#tiffinexp > tbody > tr").length + 1;


    $("#tiffinexp tbody").append(
        '<tr id="tiffinrw_' + j + '">' + '<td align="center">' + j + '</td>' +
        '<td align="center"><input type="text" id="tiffindate_' + j + '" name="tiffindate_' + j + '" class="form-control DatePicker" readonly="readonly" onchange="TiffinDateValidation(this)"/></td>' +
        '<td align="center"><select id="tiffinCity_' + j + '"  name="tiffinCity_' + j + '" class="form-control tiffincity" onchange = "IstiffinAllowed(this)">' + $("#HiddentiffenCityId").html() + '</select ></td>' +
        '<td align="center"><input type="text" id="tiffinamount_' + j + '" name="tiffinamount_' + j + '" class="form-control decimalinput" style="text-align: right" /></td>' +
        '<td align="center"><input type="text" id="tiffinremark_' + j + '" name="tiffinremark_' + j + '" class="form-control" /></td>' +
        '<td align="center"><input type="file" id="tiffinattachment_' + j + '" name="tiffinattachment_' + j + '" data-fileid="tiffinattachmentfile_' + j + '" class="form-control" onchange="saveattachment(this)" /><input type="text" style="display:none;" id="tiffinattachmentfile_' + j + '" name="tiffinattachmentfile_' + j + '" class="form-control" /></td>' +
        '<td align="center"><a data-tbl="tiffinexp" data-name="tiffinrw_' + j + '" class="btn btn-sm btn-secondary  pt-top " onclick="return deleteRow(this);"><i class="fa fa-trash bg_red"></i></a></td></tr>'
    )

    $('.DatePicker').datepicker({
        format: 'dd/M/yyyy',
        endDate: new Date()
    });
    $(".tiffincity").chosen();
}
//*********End Tiffin Expense*********************
//********Other Expense Start************************
function AddotherRow() {
    var j = $("#otherexp > tbody > tr").length + 1;
    $("#otherexp tbody").append(
        '<tr id="otherrw_' + j + '">' + '<td align="center">' + j + '</td>' +
        '<td align="center"><input type="text" id="otherdate_' + j + '" name="tiffindate_' + j + '" class="form-control DatePicker" onchange="OtherDateValidation(this)" readonly="readonly"/></td>' +
        '<td align="center"><select id="othercomponent_' + j + '"  name="othercomponent_' + j + '"  class="form-control othercomponent">' + $("#HiddendtlcmpId").html() + '</select ></td>' +
        '<td align="center"><span style="display:inline-block;"><input type="text" id="otheramount_' + j + '" name="tiffinamount_' + j + '" class="form-control decimalinput" style="text-align: right" /></span>'+
        //'<span style="display:inline;"><a href="#" data-date="otherdate_' + j + '" data-id="otheramount_' + j + '" data-dtl="othrdtl_' + j + '" onclick="showdtl(this);">Add</a> <a href="#" id="othrdtl_' + j + '" style="display:none;"  data-id="otheramount_' + j + '" data-toggle="modal" data-target="#myModal"></a></span>'+
        '</td > ' +
        '<td align="center"><input type="text" id="otherremark_' + j + '" name="tiffinremark_' + j + '" class="form-control" /></td>' +
        '<td align="center"><input type="file" id="otherattachment_' + j + '" name="otherattachment_' + j + '" data-fileid="otherattachmentfile_' + j + '" class="form-control" onchange="saveattachment(this)" /><input type="text" style="display:none;" id="otherattachmentfile_' + j + '" name="otherattachmentfile_' + j + '" class="form-control" /></td>' +
        '<td align="center"><a data-tbl="otherexp" data-name="otherrw_' + j + '" class="btn btn-sm btn-secondary  pt-top " onclick="return deleteRow(this);"><i class="fa fa-trash bg_red"></i></a></td></tr>'
    )

    $('.DatePicker').datepicker({
        format: 'dd/M/yyyy',
        endDate: new Date()
    });
}


//******End Other Expense****************************
//******Lodging Expense Start***********************
function addLodgingrow() {

    var lcont = 0;
    var rowcnt = $("#lodegingexp > tbody > tr").length;
    var j = $("#lodegingexp > tbody > tr").length + 1;
    $('#lodegingexp tbody tr').each(function (i, tr) {
        var city = ($(tr).find("td:nth-child(2) option:selected")).val();
        var local = ($(tr).find("td:nth-child(3) input[type=text]")).val();
        var from = ($(tr).find("td:nth-child(4) input[type=text]")).val();
        var to = ($(tr).find("td:nth-child(6) input[type=text]")).val();
        var amt = ($(tr).find("td:nth-child(10) input[type=text]")).val();
        var amt1 = ($(tr).find("td:nth-child(11) input[type=text]")).val();
         
        if (city != '' && local != '' && from != '' && to != '' && (amt!='' || amt1!='')) {
            lcont = lcont + 1;
        }
    });
    if (lcont == rowcnt) {


        $("#lodegingexp tbody").append(
            '<tr id="lodgingrw_' + j + '">' + '<td align="center">' + j + '</td>' +
            '<td align="center"><select id="lodgingCity_' + j + '"  name="lodgingCity_' + j + '"  class="form-control lodgingcity">' + $("#HiddenlodgingCityId").html() + '</select ></td>' +
            '<td align="center"><input type="text" style="border-color:red !important;" id="locality_' + j + '" name="locality_' + j + '" value="" class="form-control" autocomplete="off" /></td>' +
            '<td align="center"><input type="text" style="border-color:red !important;" id="lodgingfromdate_' + j + '" name="lodgingfromdate_' + j + '" data-todate="lodgingtodate_' + j + '" class="form-control DatePicker" onchange="LodgingFromDateValidatin(this)" readonly="readonly"/></td>' +
            '<td align="center"> <input id="itime_' + j + '" name="intime_' + j + '" type="time" value="00:00" class="form-control text-center" /></td>'+
            '<td align="center"><input type="text" style="border-color:red !important;" id="lodgingtodate_' + j + '" name="lodgingtodate_' + j + '" data-fromdate="lodgingfromdate_' + j + '" class="form-control DatePicker" onchange="LodgingToDateValidatin(this)" readonly="readonly"/></td>' +
            '<td align="center"> <input id="outime_' + j + '" name="outime_' + j + '" type="time" value="00:00" class="form-control text-center" placeholder="Time(24hr)" /></td>' +
            '<td align="center"><input type="text" id="nightspent_' + j + '" name="nightspent_' + j + '" class="form-control numberinput" readonly="readonly"/></td>' +
            '<td align="center"><input type="text" id="lodgingbill_' + j + '" name="lodgingbill_' + j + '" value="" class="form-control" autocomplete="off" /></td>' +
            '<td align="center"><input type="text" id="lodgingamt_' + j + '" name="lodgingamt_' + j + '" data-id="' + j + '" onblur="suminline(this)" class="form-control decimalinput" style="text-align: right"/></td>' +
            '<td align="center"><input type="text" id="daAmt_' + j + '" name="daAmt_' + j + '" data-id="' + j + '" onblur="suminline(this)" class="form-control decimalinput" style="text-align: right"/></td>' +
            '<td align="center"><input type="text" id="lodgingremark_' + j + '" name="lodgingremark_' + j + '" class="form-control"/></td>' +
            '<td align="center" style="display:none"><input type="text" id="totalamt_' + j + '" name="totalamt_' + j + '" class="form-control numberinput" readonly="readonly" style="text-align: right"/></td>' +
            '<td align="center"><span><input type="file" id="lodgingattachment_' + j + '" name="lodgingattachment_' + j + '" data-fileid="lodgingattachmentfile_' + j + '" class="form-control" style="width:60%; float:left;" onchange="saveattachment(this)" /></span><input type="text" style="display:none;" id="lodgingattachmentfile_' + j + '" name="lodgingattachmentfile_' + j + '" class="form-control" /></td>' +
            '<td align="center"><a data-tbl="lodegingexp" data-name="lodgingrw_' + j + '" class="btn btn-sm btn-secondary  pt-top " onclick="return deleteRow(this);"><i class="fa fa-trash bg_red"></i></a></td></tr>'
        )

        $('.DatePicker').datepicker({
            format: 'dd/M/yyyy',
            endDate: new Date()

        });
        $(".lodgingcity").chosen();
    }
    else {
        alert("Please fill all required fields ");
    }
}
//*****End Lodging Expense
//*****Final Expense Start*****************
//***********FARE EXP STARTtrvlmode_
function addFarerow() {

    
    var q = $("#fareexp > tbody > tr").length + 1;

    $("#fareexp tbody").append(
        '<tr id="fareexprw_' + q + '">' + '<td align="center">' + q + '</td>' +
        '<td align="center"><select id="fromstation_' + q + '" data-todate="arrivaldate_' + q + '" name="fromstation_' + q + '" class="form-control fromstation">' + $("#HiddenCityId").html() + '</select ></td>' +
        '<td align="center"><input type="text" id="depdate_' + q + '" data-todate="arrivaldate_' + q + '" name="depdate_' + q + '" class="form-control DatePicker" onchange="FromDateValidatin(this)" readonly="readonly"/></td>' +
        '<td align="center"><input id="deptime_' + q + '" name="deptime_' + q + '" type="time" class="form-control text-center" value="00:00" /></td>' +
        '<td align="center"><select id="tostation_' + q + '" name="tostation_' + q + '" class="form-control tostation">' + $("#HiddenCityId").html() + '</select ></td>' +
        '<td align="center"><input type="text" id="arrivaldate_' + q + '" data-fromdate="depdate_' + q + '" name="arrivaldate_' + q + '" class="form-control DatePicker" onchange="ToDateValidatin(this)" readonly="readonly"/></td>' +
        '<td align="center"><input id="arvtime_' + q + '" name="arvtime_' + q + '" type="time" class="form-control text-center" value="00:00" /></td>' +
        '<td align="center"><select id="trvlmode_' + q + '" name="trvlmode_' + q + '" class="form-control">' + $("#HiddenTrvlModeId").html() + '</select ></td>' +
        '<td align="center"><input type="text" id="ticketno_' + q + '" name="ticketno_' + q + '" class="form-control"/></td>' +
        '<td align="center"><input type="text" id="fareamt_' + q + '" name="fareamt_' + q + '" class="form-control decimalinput" style="text-align: right"/></td>' +
        '<td align="center"><input type="text" id="fareexpremark_' + q + '" name="fareexpremark_' + q + '" class="form-control"/></td>' +
        '<td align="center"><input type="file" id="fareattachment_' + q + '" name="fareattachment_' + q + '" data-fileid="fareattachmentfile_' + q + '" class="form-control" style="width:60%; float:left;" onchange="saveattachment(this)"/> <input type="text" style="display:none;" id="fareattachmentfile_' + q + '" name="fareattachmentfile_' + q + '" class="form-control" /></td>' +
        '<td align="center"><a data-tbl="fareexp" data-name="fareexprw_' + q + '" class="btn btn-sm btn-secondary  pt-top " onclick="return deleteRow(this);"><i class="fa fa-trash bg_red"></i></a></td></tr>'
    )

    $('.DatePicker').datepicker({
        format: 'dd/M/yyyy',
        endDate: new Date()

    });
    $(".fromstation").chosen();
    $(".tostation").chosen();
}
//***********END FARE EXP
//**********Date Validation start
function TiffinDateValidation(input) {
    var scnt = 0
    var onarrange = 0;
    //**********************
    
    //**********************
    var sdt = new Date(formatDate($("#travelExpHDRMaster_fromDate").val()));
    var enddt = new Date(formatDate($("#travelExpHDRMaster_toDate").val()));
    var cdate = new Date(formatDate($(input).val()));
    if (Date.parse(cdate) <= Date.parse(enddt) && Date.parse(cdate) >= Date.parse(sdt)) {

        for (var j = 1; j <= parseInt($("#Noofcount").val()); j++) {

            var dsrdate = new Date(formatDate($("#plandate_" + j).text()));
            
            var selecteddate = new Date(formatDate($(input).val()));
           
            if (Date.parse(dsrdate) == Date.parse(selecteddate)) {
                scnt = scnt + 1;
            }
        }
        if (scnt > 0) {

              $('#lodegingexp tbody tr').each(function (i, tr) {
                  var onarrangeDate = new Date(formatDate(($(tr).find("td:nth-child(4) input[type=text]")).val()));
                  if (Date.parse(cdate) == Date.parse(onarrangeDate)) {
                      onarrange = onarrange + 1;
                  }
              })
            if (onarrange == 0) {
                var count = 0;
                $('#tiffinexp tbody tr').each(function (i, tr) {
                    if ($(tr).find("td:nth-child(2) input[type=text]").val() != '') {
                        var d1 = formatDate($(input).val());
                        var d2 = formatDate($(tr).find("td:nth-child(2) input[type=text]").val());

                        if (d1 == d2) {

                            count = count + 1;

                        }
                    }
                });
                if (count > 1) {
                    alert('This date already selected');
                    $(input).val('');
                }
            }
            else {
                alert('On this date you have already arangement');
                $(input).val('');
            }
        }
        else {
            alert('Please select DSR date only for tiffin');
            $(input).val('');
        }
    }
    else {
        alert('Please select date between from and to date')
        $(input).val('');
    }

}
function OtherDateValidation(input) {
    var sdt = new Date(formatDate($("#travelExpHDRMaster_fromDate").val()));
    var enddt = new Date(formatDate($("#travelExpHDRMaster_toDate").val()));
    var cdate = new Date(formatDate($(input).val()));
    if (Date.parse(cdate) <= Date.parse(enddt) && Date.parse(cdate) >= Date.parse(sdt)) {
        var count = 0;
        $('#otherexp tbody tr').each(function (i, tr) {
            if ($(tr).find("td:nth-child(2) input[type=text]").val() != '') {
                var d1 = formatDate($(input).val()) ;
                var d2 = formatDate($(tr).find("td:nth-child(2) input[type=text]").val());
                if (d1 == d2) {
                    count = count + 1;
                }
            }
        });
        //if (count > 1) {
        //    alert('This date already selected');
        //    $(input).val('');
        //}

        //else {
        //    var id = $(input).attr("data-amtid")

        //    $("#" + id).val('');
        //    //$.getJSON("/Travel/OtherDTL/", { dtlxml: "", othrdate: $(input).val(), usercode: $("#travelExpHDRMaster_UserCode").val() }, function (data) {
        //    //    if (data == "SUCCESS") {
        //    //        $("#btnclosed").click();
        //    //    }
        //    //    else {
        //    //        alert("Internal server error ocurred");
        //    //        $("#btnclosed").click();
        //    //    }

        //    //});
        //}
    }
    else {
        alert('Please select date between from and to date')
         $(input).val('');
    }
}
function TravelDateValidatin(input) {
    //var sdt = new Date(formatDate($("#travelExpHDRMaster_fromDate").val()));
    //var enddt = new Date(formatDate($("#travelExpHDRMaster_toDate").val()));
    var sdt = new Date(formatDate($("#sPlandate").val()));
    var enddt = new Date(formatDate($("#endPlandate").val()));
    var cdate = new Date(formatDate($(input).val()));
    if (Date.parse(cdate) <= Date.parse(enddt) && Date.parse(cdate) >= Date.parse(sdt)) {
    }
    else {
        alert('Please select date between from and to date')
        $(input).val('');
    }

}
function LodgingFromDateValidatin(input) {
   
    var sdt = new Date(formatDate($("#travelExpHDRMaster_fromDate").val()));
    var enddt = new Date(formatDate($("#travelExpHDRMaster_toDate").val()));
    var cdate = new Date(formatDate($(input).val()));
     
    if (Date.parse(cdate) <= Date.parse(enddt) && Date.parse(cdate) >= Date.parse(sdt)) {

        $("#" + $(input).attr('data-todate')).val('');
    }
    else {
        alert('Please select date between from and to date')
        $(input).val('');
        $("#" + $(input).attr('data-todate')).val('');
    }

}
function LodgingToDateValidatin(input) {
    var sdt = new Date(formatDate($("#travelExpHDRMaster_fromDate").val()));
    var enddt = new Date(formatDate($("#travelExpHDRMaster_toDate").val()));
    var cdate = new Date(formatDate($(input).val()));
    var data = $(input).attr("id");
    var id = data.split('_');
     

    if ($("#" + $(input).attr('data-fromdate')).val() != "") {
        if (Date.parse(cdate) <= Date.parse(enddt) && Date.parse(cdate) >= Date.parse(sdt)) {
            var fdate = new Date(formatDate($("#" + $(input).attr('data-fromdate')).val()));
            var ndate = new Date(formatDate($(input).val()));
            if (Date.parse(ndate) < Date.parse(fdate)) {
                alert("To date Always grater than in date");
                $(input).val('');
                $("#nightspent_" + id[1]).val('')
            }
            else {
                var from = moment(fdate, 'YYYY-MM-DD'); // format in which you have the date
                var to = moment(ndate, 'YYYY-MM-DD');     // format in which you have the date

                /* using diff */
                var duration = to.diff(from, 'days')
                $("#nightspent_" + id[1]).val(duration)
                 
            }

        }
        else {
            alert('Please select date between from and to date')
            $(input).val('');
            $("#nightspent_" + id[1]).val('')
            $("#" + $(input).attr('data-todate')).val('');
        }
    }
    else {
        alert('Please select from date')
        $(input).val('');
        $("#nightspent_" + id[1]).val('')
    }

}
//**********Date Validation End
///*********Save Travel Expense
function savetraveldetails(input) {    
    //********Travle fare expense
     
    var trvlarr = new Array();
    var k = 0;
    var cnt = 0;
     
    debugger;
    for (var j = 1; j <= parseInt($("#Noofcount").val()); j++) {
        // trvltbl
        var dtlid = $('#trvltbl' + j).attr("data-dsrdtlid");
        $('#trvltbl' + j + ' tbody tr').each(function (i, tr) {
            //alert(($(tr).find("td:nth-child(9) input[type=text]")).val());
            trvlarr[k] = {
                traveldate: ($(tr).find("td:nth-child(2) input[type=text]")).val(),
                source: ($(tr).find("td:nth-child(3) input[type=text]")).val(),
                destination: ($(tr).find("td:nth-child(4) input[type=text]")).val(),
                distance: ($(tr).find("td:nth-child(5) input[type=text]")).val(),
                travelMode: ($(tr).find("td:nth-child(6) option:selected")).val(),
                plandtlid: parseInt(dtlid),
                charges: ($(tr).find("td:nth-child(7) input[type=text]")).val(),
                remarks: ($(tr).find("td:nth-child(8) input[type=text]")).val(),
                localconattachment: ($(tr).find("td:nth-child(9) input[type=text]")).val(),

            }


            if ($(tr).find("td:nth-child(2) input[type=text]").val() != "" && $(tr).find("td:nth-child(3) input[type=text]").val() != "" && $(tr).find("td:nth-child(4) input[type=text]").val() != "" && $(tr).find("td:nth-child(5) input[type=text]").val() != "" && $(tr).find("td:nth-child(6) option:selected").val() != "" && $(tr).find("td:nth-child(7) input[type=text]").val() != "") {
                cnt++;
            }
            k++;

        });

    }
    //***********END
    $('#XmltravelDetails').val(JSON.stringify(trvlarr));
     
    //*******save tiffin detail 
    var tiffinarr = new Array();
    $('#tiffinexp tbody tr').each(function (i, tr) {
         
        tiffinarr[i] = {
            tiffindate: ($(tr).find("td:nth-child(2) input[type=text]")).val(),
            tiffincity: ($(tr).find("td:nth-child(3) option:selected")).val(),
            tiffinamount: ($(tr).find("td:nth-child(4) input[type=text]")).val(),
            tiffinremark: ($(tr).find("td:nth-child(5) input[type=text]")).val(),
            tiffinattachment: ($(tr).find("td:nth-child(6) input[type=text]")).val(),
        }

    });
    $('#XmltiffinDetails').val(JSON.stringify(tiffinarr));    
    //*******save tiffin detail end
    //*******save lodegingexp detail
    var lodegingarr = new Array();
    $('#lodegingexp tbody tr').each(function (i, tr) {
         
        lodegingarr[i] = {
             
            visitedcity: ($(tr).find("td:nth-child(2) option:selected")).val(),
            locality: ($(tr).find("td:nth-child(3) input[type=text]")).val(),
            lodgingfromdate: ($(tr).find("td:nth-child(4) input[type=text]")).val(),
            intime: ($(tr).find("td:nth-child(5) input[type=time]")).val(),
            lodgingtodate: ($(tr).find("td:nth-child(6) input[type=text]")).val(),
            outtime: ($(tr).find("td:nth-child(7) input[type=time]")).val(),
            nightspent: ($(tr).find("td:nth-child(8) input[type=text]")).val(),
            billNo: ($(tr).find("td:nth-child(9) input[type=text]")).val(),
            lodgingamt: ($(tr).find("td:nth-child(10) input[type=text]")).val(),
            daAmt: ($(tr).find("td:nth-child(11) input[type=text]")).val(),
            lodgingremark: ($(tr).find("td:nth-child(12) input[type=text]")).val(),
            totalamt: ($(tr).find("td:nth-child(13) input[type=text]")).val(),
            lodgingattachment: ($(tr).find("td:nth-child(14) input[type=text]")).val(),
        }

    });
    $('#XmllodgingDetails').val(JSON.stringify(lodegingarr));
     
    //*******save lodegingexp detail end

    //*******save otherexp detail
    var otherarr = new Array();
    $('#otherexp tbody tr').each(function (i, tr) {

        otherarr[i] = {
            otherdate: ($(tr).find("td:nth-child(2) input[type=text]")).val(),
            othercomponent: ($(tr).find("td:nth-child(3) option:selected")).val(),
            otheramount: ($(tr).find("td:nth-child(4) input[type=text]")).val(),
            otherremark: ($(tr).find("td:nth-child(5) input[type=text]")).val(),
            otherattachment: ($(tr).find("td:nth-child(6) input[type=text]")).val(),

        }

    });
    $('#XmlotherDetails').val(JSON.stringify(otherarr));
     
    //*******save otherexp detail end

    //*******save FAREexp detail
    var fareexparr = new Array();
    $('#fareexp tbody tr').each(function (i, tr) {
        
        fareexparr[i] = {
            fromstation: ($(tr).find("td:nth-child(2) option:selected")).val(),
            depdate: ($(tr).find("td:nth-child(3) input[type=text]")).val(),
            deptime: ($(tr).find("td:nth-child(4) input[type=time]")).val(),
            tostation: ($(tr).find("td:nth-child(5) option:selected")).val(),
            arrivaldate: ($(tr).find("td:nth-child(6) input[type=text]")).val(),
            arvtime: ($(tr).find("td:nth-child(7) input[type=time]")).val(),
            trvlmode: ($(tr).find("td:nth-child(8) option:selected")).val(),
            ticketno: ($(tr).find("td:nth-child(9) input[type=text]")).val(),
            fare: ($(tr).find("td:nth-child(10) input[type=text]")).val(),
            remark: ($(tr).find("td:nth-child(11) input[type=text]")).val(),
            fareattachment: ($(tr).find("td:nth-child(12) input[type=text]")).val(),
        }

    });
    $('#XmlFareDetails').val(JSON.stringify(fareexparr));
     
    //*******save FAREexp detail end

    //*******Get Total all type expense
    //var finalarr = new Array();
    //$('#finalexp tbody tr').each(function (i, tr) {

    //    finalarr[i] = {
    //        totaltravelexp: ($(tr).find("td:nth-child(2) label")).text(),
    //        totaltiffenxp: ($(tr).find("td:nth-child(3) label")).text(),
    //        totallodgingexp: ($(tr).find("td:nth-child(4) label")).text(),
    //        totalotherexp: ($(tr).find("td:nth-child(5) label")).text(),
    //        totalexp: ($(tr).find("td:nth-child(6) label")).text(),

    //    }

    //});
    //$('#XmlfinalDetails').val(JSON.stringify(finalarr));

    //var fareval = $("#AllowtravelExpNormedVal_FareVal").val() == "" ? 0.00 : parseFloat($("#AllowtravelExpNormedVal_FareVal").val());
    //var lodging = $("#AllowtravelExpNormedVal_Lodging").val() == "" ? 0.00 : parseFloat($("#AllowtravelExpNormedVal_Lodging").val());
    //var convence = $("#AllowtravelExpNormedVal_Convence").val() == "" ? 0.00 : parseFloat($("#AllowtravelExpNormedVal_Convence").val());
    //var tiffin = $("#AllowtravelExpNormedVal_Tiffin").val() == "" ? 0.00 : parseFloat($("#AllowtravelExpNormedVal_Tiffin").val());
    //var other = $("#AllowtravelExpNormedVal_Other").val() == "" ? 0.00 : parseFloat($("#AllowtravelExpNormedVal_Other").val());

    //alert(fareval);
    //alert(lodging);
    //alert(convence);
    //alert(tiffin);
    //alert(other)

    //$("#NormModel_FareVal").val(fareval);
    //$("#NormModel_Lodging").val(lodging);
    //$("#NormModel_Convence").val(convence);
    //$("#NormModel_Tiffin").val(tiffin);
    //$("#NormModel_Other").val(other);
    //*******save otherexp detail end
    $("#travelExpHDRMaster_total_Amount").val($("#total_totalexp").text());
   

    if (k == cnt) {
        
        $("#travelExpHDRMaster_status").val($(input).attr("data-val"));
        $("#travelExpHDRMaster_mode").val($(input).attr("data-mode"));
        var action = $(input).attr("data-mode");
        if (action == "APPROVED" || action == "REJECT") {
            
            if ($("#Approve1_REMARKS").val() != "") {
                $("#btnsaveupdate").click();
            }
            else {
                alert("Please enter Approval remarks" );
            }

        }
        else {
            $("#btnsaveupdate").click();
        }
       
    }
    else {
        alert("Please fill travel expense completely");
        $("#steps-uid-0-t-0").click();
    }
}
///***********END *****************

//Start Attachment Save
function saveattachment(input) {
    
    var id = $(input).attr("id");
    var fileid = $(input).attr("data-fileid");
    if (window.FormData !== undefined) {

        var fileUpload = $("#" + id).get(0);
        var files = fileUpload.files;

        // Create FormData object  
        var fileData = new FormData();

        // Looping over all files and add it to FormData object  
        for (var i = 0; i < files.length; i++) {
            fileData.append(files[i].name, files[i]);
        }

        // Adding one more key to FormData object  
        fileData.append('username', $("#travelExpHDRMaster_UserCode").val());
        fileData.append('todate'  ,   $("#travelExpHDRMaster_toDate").val());
        fileData.append('fromdate', $("#travelExpHDRMaster_fromDate").val());
        fileData.append('fileid', id);


        $.ajax({
            url: '/Travel/UploadFiles',
            type: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: fileData,
            success: function (result) {
                
                $("#" + fileid).val(result);
            },
            error: function (err) {
                alert(err.statusText);
            }
        });
    } else {
        alert("FormData is not supported.");
    }  
}
//
function DownloadDocumentFile(filename) {

}

function IstiffinAllowed(input) {
    
    var cityid = $(input).val();
    var usrcode = $("#travelExpHDRMaster_UserCode").val();  
    $.ajax({
        url: "/Travel/IstiffinAllowed",
        type: "GET",
        dataType: "JSON",
        data: { usercode: usrcode, cityId: cityid },
        success: function (result) {
            if (result != '') {
                alert(result);
                $(input).val('');
               
                $(input).val('').trigger("chosen:updated");
            }
           
        },
        error: function (result) {
            console.log(result);
        }

    })
}


function FromDateValidatin(input) {

    var sdt = new Date(formatDate($("#travelExpHDRMaster_fromDate").val()));
    var enddt = new Date(formatDate($("#travelExpHDRMaster_toDate").val()));
    var cdate = new Date(formatDate($(input).val()));

    if (Date.parse(cdate) <= Date.parse(enddt) && Date.parse(cdate) >= Date.parse(sdt)) {

        $("#" + $(input).attr('data-todate')).val('');
    }
    else {
        alert('Please select date between from and to date')
        $(input).val('');
        $("#" + $(input).attr('data-todate')).val('');
    }

}
function ToDateValidatin(input) {
    var sdt = new Date(formatDate($("#travelExpHDRMaster_fromDate").val()));
    var enddt = new Date(formatDate($("#travelExpHDRMaster_toDate").val()));
    var cdate = new Date(formatDate($(input).val()));
     

    if ($("#" + $(input).attr('data-fromdate')).val() != "") {
        if (Date.parse(cdate) <= Date.parse(enddt) && Date.parse(cdate) >= Date.parse(sdt)) {
            var fdate = new Date(formatDate($("#" + $(input).attr('data-fromdate')).val()));
            var ndate = new Date(formatDate($(input).val()));
            if (Date.parse(ndate) < Date.parse(fdate)) {
                alert("To date Always grater than from date");
                $(input).val('');

            }
             

        }
        else {
            alert('Please select date between from and to date')
            $(input).val('');
            $("#" + $(input).attr('data-todate')).val('');
        }
    }
    else {
        alert('Please select from date')
        $(input).val('');
    }

}