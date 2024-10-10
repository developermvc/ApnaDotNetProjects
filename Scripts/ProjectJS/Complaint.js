function GetProspectData(ProspectTypeId, CityId, checkUrl) {

    $.ajax({
        url: checkUrl,
        type: "GET",
        dataType: "JSON",
        data: { ProspectTypeId: ProspectTypeId, CityId: CityId },//, str: str
        success: function (result) {
            debugger;
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
            }
            else   {
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
                    $('#PROSPECT_ID').chosen();
                    $('#PROSPECT_ID').trigger("chosen:updated");
                }
            }
        },
        error: function (result) {
            console.log(result);
        }
    });

}

function FillComplaintReason(ComplaintTypeId, checkUrl) {
    debugger;
    $.ajax({
        url: checkUrl,
        type: "GET",
        dataType: "JSON",
        data: { ComplaintTypeId: ComplaintTypeId },//, str: str
        success: function (result) {
            ShowWaitingSymbol();
            $("select#CASETYPEID").empty();
            var v = "<option value=''>--Select--</option>";
            $.each(result, function (i, data) {
                v += "<option value=" + data.CASETYPEID + ">" + data.CaseTypeWithApprovalDays + "</option>";
            });
            $("select#CASETYPEID").append(v);
            $("select#CASETYPEID").trigger("chosen:updated");
            HideWaitingSymbol();
        },
        error: function (result) {
            console.log(result);
        }
    });
}

function FillpartByInvoiceId(InvoiceIds, DealerId, CTYPEID, checkUrl, obj) {
   
    debugger;
   // alert(obj);
    var ids = InvoiceIds;
    $.ajax({
        url: checkUrl,
        type: "GET",
        dataType: "JSON",
        data: { InvoiceIds: ids, DealerId: DealerId, CTYPEID: CTYPEID },//, str: str
        success: function (result) {
            ShowWaitingSymbol();
            $(obj).empty().trigger("chosen:updated");
            $("#HiddenPartId").empty();
            var v = "<option value=''>--Select--</option>";
            var hdn = "<option value=''>--Select--</option>";
            $.each(result, function (i, data) {
                v += "<option value=" + data.PART_ID + ">" + data.PARTFULLNAME + "</option>";
                hdn += '<option value="' + data.PART_ID + '">' + data.PARTFULLNAME + '</option>';
            });

            $(obj).append(v);
            $('#HiddenPartId').append(hdn);
            HideWaitingSymbol();

            //$("#PART_ID").append(v);
            $(obj).trigger("chosen:updated");
        },
        error: function (result) {
            console.log(result);
        }
    });
}

function GetFollowUpWithWEmpDetail(empid, followupid, checkUrl, id) {
    $.ajax({
        url: checkUrl,
        type: "GET",
        dataType: "JSON",
        data: { EmployeeId: empid, FollowUpId: followupid },
        async: false,
        success: function (result) {
            $('#EmployeePhone_' + id[1]).val(result.EmpDetail.MOBILENUMBER);
            if (result.ManagerDetail != null) {
                //$('#FollowUpName_' + id[1]).val(result.ManagerDetail.FIRSTNAME + result.ManagerDetail.MIDDLENAME + result.ManagerDetail.LASTNAME);
                $('#FollowUpPhone_' + id[1]).val(result.ManagerDetail.MOBILENUMBER);
            }
        },
        error: function () {

        }
    });
}

function FillEmployeeDetail(DeptId, checkUrl, id) {
    $.ajax({
        url: checkUrl,
        type: "GET",
        dataType: "JSON",
        data: { DepartmentId: DeptId },
        async: false,
        success: function (result) {
            $("#EmpId_" + id[1]).empty();
            //$("#FollowUpName_" + id[1]).empty();
            var v = "<option value=0>--Select--</option>";
            $.each(result, function (i, empdetail) {
                if (empdetail.MIDDLENAME == null) {
                    empdetail.MIDDLENAME = " ";
                }
                v += "<option value=" + empdetail.EMP_ID + ">" + empdetail.DISPLAYEMPNAME + "</option>";
                //v += "<option value=" + empdetail.EMP_ID + ">" + empdetail.FIRSTNAME + empdetail.MIDDLENAME + empdetail.LASTNAME + "</option>";

            });
            $("#EmpId_" + id[1]).append(v);
            $("#FollowUpName_" + id[1]).append(v);
            $("#EmpId_" + id[1]).trigger("chosen:updated");
            //$("#FollowUpName_" + id[1]).trigger("chosen:updated");
        },
        error: function () {

        }
    });
}

//function FillDealerList(CityId, checkUrl) {
//    $.ajax({
//        url: checkUrl,
//        type: "GET",
//        dataType: "JSON",
//        data: { CityId: CityId },
//        async: false,
//        success: function (result) {
//            $.each(result, function (i, data) {
//                $("#DEALER_ID").append("<option value=" + data.DEALER_ID + ">" + data.DEALERFULLNAME + "</option>");
//            });

//            //$("#PART_ID").append(v);
//            $("#DEALER_ID").trigger("chosen:updated");
//        },
//        error: function () {

//        }
//    });
//}

function GetAllComplaintType(complaintUrl) {
    var PType = $('#PROSPECTTYPE_ID').val();
    $.ajax({
        url: complaintUrl,
        type: "GET",
        data: { ProspectTypeId: PType },
        dataType: "JSON",
        async: false,
        success: function (result) {
            $("#CTYPEID").empty();
            var v = "<option value=0>--Select--</option>";
            $.each(result, function (i, data) {
              v +=  "<option value=" + data.CTYPEID + ">" + data.CTYPENAME + "</option>";
            });

            $("#CTYPEID").append(v);
        },
        error: function () {

        }
    });
}



function RemoveRowFromTable() {
    debugger;
    valid = true;

    var mtable = document.getElementById("complainttbl");
    var mrowCount = document.getElementById("ComplaintDTLCount").value;
    var currentpartvalue = "";

    for (var i = 2; i <= mrowCount; i++) {

        $('#Complaint_' + i).remove();

    }
    $("#invQty_1").val('');
    $("#invRate_1").val('');
    $("#claimQty_1").val('');
    $("#claimValue_1").val('');
}

function ValidateFileType(obj,action) {
    var valid = true;
    var file = $(obj).val();
    debugger;
    var filenameAttr = $(obj).attr('name');
    var trId = $(obj).closest('tr').attr("id");
    var fileSize = 0;
    //var file1 = $(obj)[0].files[0];
    var fileType = "";
    var validImageTypes = ["image/gif", "image/jpeg", "image/png"];

    $($(obj)[0].files).each(function () {
        fileType = $(this)[0].type;
        if ($.inArray(fileType, validImageTypes) < 0) {
            alert("Please upload image type file only");
            $(obj).val("");
            valid = false;
            return valid;
        }
    });
    if (valid) {
        var fileLength = parseInt($(obj).get(0).files.length);
        var existingfileLength = $("#" + trId + " .deleteBtnClass").length
        fileLength = fileLength + existingfileLength;
        if (fileLength > 2) {
            alert("You can only upload a maximum of 2 files");
            $(obj).val("");
            valid = false;
            return valid;
        }
        else {
            $($(obj)[0].files).each(function () {
                fileSize += $(this)[0].size;
            });
            if (fileSize / 1024 / 1024 > 2) {
                alert("Please upload file upto 2 mb only");
                $(obj).val("");
                valid = false;
                return valid;
            }
            else {
                return valid;
            }
            
        }
    }
    return valid;
}

function checkAllchekBoxs(obj) {
    var status = obj.checked;
    debugger;
    $('input[type="checkbox"]').each(function () {
        this.checked = status;
    });
}

function removeCheckedrow() {
    if ($('#complainttbl tbody tr').length > 1) {
        $('#complainttbl tbody').find('tr').each(function () {
            if ($(this).find('td:first').find('input[type="checkbox"]').is(':checked')) {
                $(this).remove();
            }
        });
        $('#ComplaintDTLCount').prop('value', $('#complainttbl tbody tr').length);
    }
    else {
        alert("Atleast one row is required");
    }
}



function CheckDuplicatePart(obj) {
    var currentpartvalue = $(obj).val();
    
    var row = $(obj).attr("id").split('_');
    var cnt = 0;
    
    //$('#complainttbl').find('tbody tr').each(function (i, tr) {
    $('#complainttbl tbody tr').each(function (i, tr) {
        var val1 = ($(tr).find("td:nth-child(2) option:selected")).val();
        if (parseInt(val1) == parseInt(currentpartvalue)) {
            cnt += 1;
        }
        if (cnt>1) {
            alert('Part already selected');
            $("#invQty_" + row[1]).val('');
            $("#invRate_" + row[1]).val('');
            $("#claimValue_" + row[1]).val('');
            $(obj).val('').trigger("chosen:updated");
            $(obj).focus();
        }
        else {
            
            if ($("#INVOICEID_" + row[1]).val() != "" && $(obj).val()!="") {
                
                
                var cmpUrl = "/Complaint/GetQtyByInvoiceId";
                var invoiceId = $("#INVOICEID_" + row[1]).val();
                $.ajax({
                    url: cmpUrl,
                    type: "GET",
                    data: { InvoiceId: invoiceId, PartId: currentpartvalue },
                    dataType: "JSON",
                    async: false,
                    success: function (result) {
                         
                        debugger;
                        $("#invQty_" + row[1]).val(result.TOTALQUANTITY);
                        var basicvalue = result.BASICVALUE;
                        var discount = result.DISCOUNT;
                        var rate = ((result.BASICVALUE + result.DISCOUNT) / result.TOTALQUANTITY);
                        $("#invRate_" + row[1]).val(rate.toFixed(2));

                        var clmqty = $("#claimQty_" + row[1]).val();
                        if (clmqty != "") {
                            var clmval = parseInt(clmqty) * parseFloat(rate);
                            $("#claimValue_" + row[1]).val(parseFloat(clmval).toFixed(2));
                        }
                    },
                    error: function () {

                    }
                });
            }
        }
    });

    
}

function calculation(input) {
    var row = $(input).attr("id").split('_');
    var vl = $(input).val() == "" ? 0 : parseInt($(input).val());
    var rt = $("#invRate_" + row[1]).val() == "" ? 0 : parseFloat($("#invRate_" + row[1]).val()); 
    var Qty = $("#invQty_" + row[1]).val() == "" ? 0 : parseInt($("#invQty_" + row[1]).val());     
    var tvl = vl * rt
    if (vl <= Qty) {
        $("#claimValue_" + row[1]).val(parseFloat(tvl).toFixed(2));
    }
    else {
        alert("Claim quantity can't be gratter than invoice quantity..");
        $("#claimValue_" + row[1]).val(parseFloat(0));
        $(input).val(0);
    }
   
    
}