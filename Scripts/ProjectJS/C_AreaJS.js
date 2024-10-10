
var config = {
    '.areachosen-select': { default_multiple_text: 'ALL' },
    '.areachosen-select-deselect': { allow_single_deselect: true },
    '.areachosen-select-no-single': { disable_search_threshold: 10 },
    '.areachosen-select-no-results': { no_results_text: 'Oops, nothing found!' },
    '.areachosen-select-width': { width: "100%" }
}
for (var selector in config) {
    $(selector).chosen(config[selector]);
}

$('.areachosen-select').on("chosen:ready", function () {
    debugger;
    OnChangeAreaType();
});


$(document).ready(function () {
    OnChangeAreaType();
   // $(".chosen-container-multi").prepend("<option> ALL </option>");
    //$('.chosen-container-multi').find('input[type="text"]').attr('value', 'ALL');

    $('.areachosen-select').on('change', function () {
        debugger;
        var id = "";
        if (id == "") {
            id = $(this).val();
        }
        else {
            id = id + "," + $(this).val();
        }
        if (id.length <= 4) {
            $('#hdnSelectedUserArea').val(id);
            $("#C_SelectedIds").val("");
        }
        else {
            alert("You can select Only 4 Values")
        }
    });

});


function OnChangeAreaType() {

    var selectedareaid = $('#C_SelectedAreaType').val();
    $('.dvarea_choosen').hide();
    $('#dv_lbArea_' + selectedareaid).show();
    $('#dv_lbArea_' + selectedareaid).trigger("chosen:updated");
}

//zone management
function GetAllAreaById(url,rowid) {
    var checkUrl = url;
    $.ajax({
        url: checkUrl,
        type: "GET",
        dataType: "JSON",
        data: { rownumber: rowid},
        success:  GetAllAreaSuccess,
        error:  GetAllAreaFail
    });

}


function GetAllAreaSuccess(result) {
    debugger;
    FillAllArea(result.OBJLIST, result.ROWNUMBER);
}
function GetAllAreaFail(result) {
    console.log(result);
}

function FillAllArea(arealist, rownumber) {

    var v = "";
    $.each(arealist, function (i, obj) {

        v += "<option value=" + obj.AREAID + ">" + obj.AREANAME + "</option>";

    });

    $("#lbArea_" + rownumber).html(v);
    $('#lbArea_' + rownumber).trigger("chosen:updated");
}

