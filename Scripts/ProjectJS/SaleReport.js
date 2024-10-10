
$(document).ready(function () {
    debugger;
    FormatDateRange(formatDate($('#FROMDATE').val()), formatDate($('#TODATE').val()), 'reportrange');
    $('#tableCustomer').DataTable();
    HideWaitingSymbol();
})

$('.myButton').click(function () {
    var daterange = $('#reportrange')[0].innerText;
    var dt1 = $.trim(daterange.split('-')[0]);
    var dt2 = $.trim(daterange.split('-')[1]);
    document.getElementById("FROMDATE").value = dt1;
    document.getElementById("TODATE").value = dt2;
});

function loadAllTables(url) {
    debugger;

    var fromdate = $('#FROMDATE').val();
    var todate = $('#TODATE').val();

    

    $.ajax({
        url: url,
        type: "GET",
        data: { fromDate: fromdate, todate: todate, areaTypeID: 1, areaId: 1, dataFor: '' },
        dataType: "",
        success: loadAllTablesSuccess,
        error: function () { }
    });
};
function loadAllTablesSuccess(result) {
    debugger;
    var saleRptBodys;
    $.each(result.saleSummary, function (i, data) {
        saleRptBodys += '<tr><td>' + data.SUMMARY + '</td><td>' + data.VALUE + '</td></tr>';
    });
    $("#tbodySummary").html(saleRptBodys);

    saleRptBodys = "";
    $.each(result.segmentSale, function (i, data) {
        saleRptBodys += '<tr><td>' + data.SEGMENT + '</td><td>' + data.BUDGET + '</td><td>' + data.SALE + '</td></tr>';
    });
    $("#tbodySaleSegment").html(saleRptBodys);

    saleRptBodys = "";
    $.each(result.categorySale, function (i, data) {
        saleRptBodys += '<tr><td>' + data.CATEGORY + '</td><td>' + data.BUDGET + '</td><td>' + data.NETSALE + '</td></tr>';
    });
    $("#tbodyCategorySale").html(saleRptBodys);

    saleRptBodys = "";
    $.each(result.sebSegmentSale, function (i, data) {
        saleRptBodys += '<tr><td>' + data.SEGMENTNAME + '</td><td>' + data.NETSALE + '</td></tr>';
    });
    $("#tbodySaleSubSegment").html(saleRptBodys);

    saleRptBodys = "";
    $.each(result.dealerSale, function (i, data) {
        saleRptBodys += '<tr><td>' + data.STATUS + '</td><td>' + data.SALE + '</td><td>' + data.CONT + '</td></tr>';
    });
    $("#tbodySaleDealer").html(saleRptBodys);

    saleRptBodys = "";
    $.each(result.nPDSale, function (i, data) {
        saleRptBodys += '<tr><td>' + data.NPD + '</td><td>' + data.VALUE + '</td></tr>';
    });
    $("#tbodyNPDSale").html(saleRptBodys);
}

