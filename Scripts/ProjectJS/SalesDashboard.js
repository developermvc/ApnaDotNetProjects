google.charts.load("current", { packages: ["corechart"] });



function drawAreawiseBudget(chatid) {
    debugger;
    var data = google.visualization.arrayToDataTable([
        ['Area', 'PARGET', 'NETORDER', 'NETSALE', 'PENDING ORDER'],
        ['HHH', 388, 233, 201, 31],
        ['WEST', 1170, 460, 250, 43],
        ['NORTH', 660, 1120, 300, 55],
        ['SOUTH', 1030, 540, 350, 66]
    ]);
    var options = {
        chart: {
            title: '',
            colors: ['rgb(66, 133, 244)', 'rgb(15, 157, 88)', 'rgb(244, 180, 0)', 'rgb(219, 68, 55)'],
            is3D: true
        }
    };
    var chart = new google.charts.Bar(document.getElementById(chatid));
    chart.draw(data, google.charts.Bar.convertOptions(options));
}

function drawCategorywiseTable(chartid) {
    
    var segid = $("#SelectedSegment").val() == "" ? null : $("#SelectedSegment").val();
    var fromdt = $("#FromDate").val();
    var todt = $("#ToDate").val();
    var areatyp = $("#C_SelectedAreaType").val();
    var UserArea = $("#hdnSelectedUserArea").val();
    var totaltarget = 0.00;
    var totalordpen = 0.00;
    var totalordcurrent = 0.00;
    var totaldincurrent = 0.00;
    var totalnetord = 0.00;
    var totalsaleinvc = 0.00;
    var totalnetsale = 0.00;
    var totaldisptch = 0.00;
    $.ajax({
        url: "/Home/GetPoBudget",
        type: "GET",
        dataType: "JSON",
        data: { segmentid: segid, formDate: fromdt, toDate: todt, areaType: areatyp, UserArea: UserArea, screenNo: 1 },
        success: function (result) {
            debugger;
            $("#categorywisedatatable tbody").empty();
            $.each(result, function (i, item) {
                totaltarget =    parseFloat(totaltarget) + parseFloat(item.TARGET);
                totalordpen =    parseFloat(totalordpen) + parseFloat(item.ORDERPENDING);
                totalordcurrent= parseFloat(totalordcurrent) + parseFloat(item.ORDERCURRENT);
                totalnetord =    parseFloat(totalnetord) + parseFloat(item.NETORDER);
                totaldincurrent= parseFloat(totaldincurrent) + parseFloat(item.DINCURRENT);
                totalsaleinvc =  parseFloat(totalsaleinvc) + parseFloat(item.SALEINVOICE);
                totalnetsale =   parseFloat(totalnetsale) + parseFloat(item.NETSALE);
                totaldisptch = parseFloat(totaldisptch) + parseFloat(item.DISPATCH);
               if (parseInt(item.TARGET) != 0 || parseInt(item.ORDERPENDING) != 0 || parseInt(item.ORDERCURRENT) != 0 || parseInt(item.NETORDER) != 0 || parseInt(item.DINCURRENT) != 0 || parseInt(item.SALEINVOICE) != 0 || parseInt(item.NETSALE) != 0 || parseInt(item.DISPATCH) != 0) {
                    
                    $("#categorywisedatatable tbody").append(
                        '<tr>' +
                        '<td class="col-xs-2" style="text-align:left;">' + item.PRODUCT + '</td>' +
                        '<td class="col-xs-2">' + item.TARGET + '</td>' +
                        '<td class="col-xs-2">' + item.ORDERPENDING + '</td>' +
                        '<td class="col-xs-1">' + item.ORDERCURRENT + '</td>' +
                        '<td class="col-xs-1">' + item.NETORDER + '</td>' +
                        '<td class="col-xs-1">' + item.DINCURRENT + '</td>' +
                        '<td class="col-xs-1">' + item.SALEINVOICE + '</td>' +
                        '<td class="col-xs-1">' + item.NETSALE + '</td>' +
                        '<td class="col-xs-1">' + item.DISPATCH + '</td>' +
                        '</tr>'
                    );

                }
            });
            $("#ttarget").text(totaltarget.toFixed(2));
            $("#tordpen").text(totalordpen.toFixed(2));
            $("#tordcurnt").text(parseFloat(totalordcurrent).toFixed(2));
            $("#tnetord").text(totalnetord.toFixed(2));
            $("#tdincurrent").text(totaldincurrent.toFixed(2));
            $("#tinvc").text(totalsaleinvc.toFixed(2));
            $("#tnetsale").text(totalnetsale.toFixed(2));
            $("#tdispatch").text(totaldisptch.toFixed(2));

            if (parseInt(totaltarget) == 0 && parseInt(totalordpen) == 0 && parseInt(totalordcurrent) == 0 && parseInt(totalnetord) == 0 && parseInt(totaldincurrent) == 0 && parseInt(totalsaleinvc) == 0 && parseInt(totalnetsale) == 0 && parseInt(totaldisptch) == 0) {
                $("#dashboardcatlist").hide();
            }
            else {
                $("#dashboardcatlist").show();
            }
        },
        error: function (result) {
            console.log(result);
        }
    });
    //var data = new google.visualization.DataTable();
    //data.addColumn('string', 'PRODUCT');
    //data.addColumn('number', 'TARGET');
    //data.addColumn('number', 'ORDER-PENDING');
    //data.addColumn('number', 'ORDER-CURRENT');
    //data.addColumn('number', 'DIN-CURRENT');
    //data.addColumn('number', 'SALE-INVOICE');
    //data.addColumn('number', 'ORD vz INV EXE(%)');

    
    //data.addRows([
    //    ['LIGHT', { f: '$10,000' }, { v: 500 }, { v: 500 }, {v: 2000 }, { v: 2000 }, { v: 2000 }],
    //    ['MIRROR', {  f: '$8,000' },  { v: 2000 }, { v: 2000 }, { v: 2000 }, { v: 2000 }, { v: 2000 }],
    //    ['FILTER', {  f: '$12,500' },  { v: 2000 }, { v: 2000 }, { v: 2000 }, { v: 2000 }, { v: 2000 }],
    //    ['HORN', {  f: '$7,000' },  { v: 2000 }, { v: 2000 }, { v: 2000 }, { v: 2000 }, { v: 2000 }],
    //    ['ELECTRICAL', { f: '$7,000' },  { v: 2000 }, { v: 2000 }, { v: 2000 }, { v: 2000 }, { v: 2000 }],
    //    ['CABLE', { f: '$7,000' },  { v: 2000 }, { v: 2000 }, { v: 2000 }, { v: 2000 }, { v: 2000 }],
    //    ['BULB', {  f: '$7,000' },  { v: 2000 }, { v: 2000 }, { v: 2000 }, { v: 2000 }, { v: 2000 }],
    //    ['OTHER', { f: '$7,000' },  { v: 2000 }, { v: 2000 }, { v: 2000 }, { v: 2000 }, { v: 2000 }],
    //    ['TOTAL', { f: '$7,000' }, { v: 2000 }, { v: 2000 }, { v: 2000 }, { v: 2000 }, { v: 2000 }]
    //]);

    //var table = new google.visualization.Table(document.getElementById(chartid));

    //table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
}

function drawSegmentwiseBudget(chartid) {
    var segid = $("#SelectedSegment").val() == "" ? null : $("#SelectedSegment").val();
    var fromdt = $("#FromDate").val();
    var todt = $("#ToDate").val();
    var areatyp = $("#C_SelectedAreaType").val();
    var UserArea = $("#hdnSelectedUserArea").val();
    $.ajax({
        url: "/Home/GetPoBudget",
        type: "GET",
        dataType: "JSON",
        data: { segmentid: segid, formDate: fromdt, toDate: todt, areaType: areatyp, UserArea: UserArea, screenNo: 2 },
        success: function (result) {
            $("#lblbudget1").text(result.TOTALBUDGET);
            $("#lblsale").text(result.TOTALSALE)
            var per = result.ACHIEVEMENT;
            var data = google.visualization.arrayToDataTable([
                ['Label', 'Value'],
                ['Achievement', per],

            ]);

            var options = {
                height: 160,
                redFrom: 0, redTo: 20,
                yellowFrom: 20, yellowTo: 60, greenFrom: 60, greenTo: 100,
                minorTicks: 5
            };

            var chart = new google.visualization.Gauge(document.getElementById(chartid));

            chart.draw(data, options);
        },
        error: function (result) {
            console.log(result);
        }
    })

    

}
function drawSegmentwisePayment(chartid) {
    var segid = $("#SelectedSegment").val() == "" ? null : $("#SelectedSegment").val();
    var fromdt = $("#FromDate").val();
    var todt = $("#ToDate").val();
    var areatyp = $("#C_SelectedAreaType").val();
    var UserArea = $("#hdnSelectedUserArea").val();
    $.ajax({
        url: "/Home/GetPoBudget",
        type: "GET",
        dataType: "JSON",
        data: { segmentid: segid, formDate: fromdt, toDate: todt, areaType: areatyp, UserArea: UserArea, screenNo: 3 },
        success: function (result) {
            $("#lblbudget2").text(result.TOTALBUDGET);
            $("#lblcollection").text(result.TOTALCOLLECTION)
            var per = result.ACHIEVEMENT;
            var data = google.visualization.arrayToDataTable([
                ['Label', 'Value'],
                ['Achievement', per],

            ]);

            var options = {
                height: 160,
                redFrom: 0, redTo: 20,
                yellowFrom: 20, yellowTo: 60, greenFrom: 60, greenTo: 100,
                minorTicks: 5
            };

            var chart = new google.visualization.Gauge(document.getElementById(chartid));

            chart.draw(data, options);
        },
        error: function (result) {
            console.log(result);
        }
    })
   

}

function Draw4WOrderSale(chartid) {
     
    var segid = $("#SelectedSegment").val() == "" ? null : $("#SelectedSegment").val();
    var fromdt = $("#FromDate").val();
    var todt = $("#ToDate").val();
    var areatyp = $("#C_SelectedAreaType").val();
    var UserArea = $("#hdnSelectedUserArea").val();

    $.ajax({
        url: "/Home/GetSaleOrderData",
        type: "GET",
        dataType: "JSON",
        data: { segmentid: segid, formDate: fromdt, toDate: todt, areaType: areatyp, UserArea: UserArea, screenNo: 2},
        success: function (result) {
             
            var data = google.visualization.arrayToDataTable([
                ["Element", "Rs", { role: "style" }],
                ["Budget", result.BUDGET, "rgb(66, 133, 244)"],
                ["Order", result.NETORDER, "rgb(15, 157, 88)"],
                ["Net Sale + DA", result.NETSALE, "rgb(244, 180, 0)"],
                ["Pending After DA", result.PENDINGORDER, "rgb(219, 68, 55)"],
                ["Dispatch", result.STOCK, "rgb(171, 71, 188)"]
            ]);

            var view = new google.visualization.DataView(data);
            view.setColumns([0, 1,
                {
                    calc: "stringify",
                    sourceColumn: 1,
                    type: "string",
                    role: "annotation"
                },
                2]);

            var options = {
                title: "",
                height: 200,
                bar: { groupWidth: "50%" },
                legend: { position: "none" },
            };
            var chart = new google.visualization.ColumnChart(document.getElementById(chartid));
            chart.draw(view, options);
        },
        error: function (result) {
            console.log(result);
        }

    })
     

}
function Draw2WOrderSale(chartid) {
    var segid = $("#SelectedSegment").val() == "" ? null : $("#SelectedSegment").val();
    var fromdt = $("#FromDate").val();
    var todt = $("#ToDate").val();
    var areatyp = $("#C_SelectedAreaType").val();
    var UserArea = $("#hdnSelectedUserArea").val();
     
    $.ajax({
        url: "/Home/GetSaleOrderData",
        type: "GET",
        dataType: "JSON",
        data: { segmentid: segid, formDate: fromdt, toDate: todt, areaType: areatyp, UserArea: UserArea, screenNo: 1},
        success: function (result) {
            var data = google.visualization.arrayToDataTable([
                ["Element", "Rs", { role: "style" }],
                ["Budget", result.BUDGET, "rgb(66, 133, 244)"],
                ["Order", result.NETORDER, "rgb(15, 157, 88)"],
                ["Net Sale + DA", result.NETSALE, "rgb(244, 180, 0)"],
                ["Pending After DA", result.PENDINGORDER, "rgb(219, 68, 55)"],
                ["Dispatch", result.STOCK, "rgb(171, 71, 188)"]
            ]);

            var view = new google.visualization.DataView(data);
            view.setColumns([0, 1,
                {
                    calc: "stringify",
                    sourceColumn: 1,
                    type: "string",
                    role: "annotation"
                },
                2]);

            var options = {
                title: "",
                height: 200,
                bar: { groupWidth: "50%" },
                legend: { position: "none" },
            };
            var chart = new google.visualization.ColumnChart(document.getElementById(chartid));
            chart.draw(view, options);
        },
        error: function (result) {
            console.log(result);
        }

    })
    



}
function DrawOrderSale(chartid) {

    var segid = $("#SelectedSegment").val() == "" ? null : $("#SelectedSegment").val();
    var fromdt = $("#FromDate").val();
    var todt = $("#ToDate").val();
     
    var areatyp = $("#C_SelectedAreaType").val();
    var UserArea = $("#hdnSelectedUserArea").val();

    $.ajax({
        url: "/Home/GetSaleOrderData",
        type: "GET",
        dataType: "JSON",
        data: { segmentid: segid, formDate: fromdt, toDate: todt, areaType: areatyp, UserArea: UserArea,screenNo:3 },
        success: function (result) {
            var data = google.visualization.arrayToDataTable([
                ["Element", "Rs", { role: "style" }],
                ["Budget", result.BUDGET, "rgb(66, 133, 244)"],
                ["Order", result.NETORDER, "rgb(15, 157, 88)"],
                ["Net Sale + DA", result.NETSALE, "rgb(244, 180, 0)"],
                ["Pending After DA", result.PENDINGORDER, "rgb(219, 68, 55)"],
                ["Dispatch", result.STOCK, "rgb(171, 71, 188)"]
            ]);

            var view = new google.visualization.DataView(data);
            view.setColumns([0, 1,
                {
                    calc: "stringify",
                    sourceColumn: 1,
                    type: "string",
                    role: "annotation"
                },
                2]);

            var options = {
                title: "",
                height: 200,
                bar: { groupWidth: "50%" },
                legend: { position: "none" },
            };
            var chart = new google.visualization.ColumnChart(document.getElementById(chartid));
            chart.draw(view, options);
        },
        error: function (result) {
            console.log(result);
        }

    })



}