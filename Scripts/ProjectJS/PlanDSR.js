function gerDSRCity(url,plandsrId) {

    var checkUrl = url;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: checkUrl,
        data: JSON.stringify({ DSRId: plandsrId }),
        dataType: "json",
        success: gerDSRCitySucceeded,
        error: gerDSRCityFailed
    });


}

function gerDSRCitySucceeded(result) {

    FillCityListIntoMomentLeft(result.sourceCityList);
    FillCityListIntoMomentRight(result.destinationCityList);
}
function gerDSRCityFailed() {

}


function FillCityListIntoMomentLeft(citylist) {
    var v = "";
    $.each(citylist, function (i, city) {
        v += "<li class=\"list-group-item\"><input type=\"hidden\" value=\"" + city.CITY_ID + "\" name=\"menu_" + city.CITY_ID + "\">" + city.CITYNAME + "</li>"
    });

    $("#momentlistLeft").html(v);
}

function FillCityListIntoMomentRight(citylist) {
    var v = "";
    $.each(citylist, function (i, city) {
        v += "<li class=\"list-group-item\"><input type=\"hidden\" value=\"" + city.CITY_ID + "\" name=\"menu_" + city.CITY_ID + "\">" + city.CITYNAME + "</li>"
    });

    $("#momentlistRight").html(v);
}


$(function () {

    $('body').on('click', '.list-group .list-group-item', function () {
        $(this).toggleClass('active');
    });
    $('.list-arrows button').click(function () {
        debugger;
        var $button = $(this), actives = '';
        if ($button.hasClass('move-left')) {
            actives = $('.list-right ul li.active');
            actives.clone().appendTo('.list-left ul');
            actives.remove();
        } else if ($button.hasClass('move-right')) {
            actives = $('.list-left ul li.active');
            actives.clone().appendTo('.list-right ul');
            actives.remove();
            $('#secondsearch').trigger('keyup');
        }
    });
    $('.dual-list .selector').click(function () {
        debugger;
        var $checkBox = $(this);
        if (!$checkBox.hasClass('selected')) {
            $checkBox.addClass('selected').closest('.well').find('ul li:not(.active)').addClass('active');
            $checkBox.children('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
        } else {
            $checkBox.removeClass('selected').closest('.well').find('ul li.active').removeClass('active');
            $checkBox.children('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
        }
    });
    $('[name="SearchDualList"]').keyup(function (e) {
        debugger;
        var code = e.keyCode || e.which;
        if (code == '9') return;
        if (code == '27') $(this).val(null);
        var $rows = $(this).closest('.dual-list').find('.list-group li');
        var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
        $rows.show().filter(function () {
            var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
            return ! ~text.indexOf(val);
        }).hide();
    });

});



function FillDestCityIds() {
    debugger;
    document.getElementById("selectedcityids").value = "";
    var arr = new Array();
    var result = $('#momentlistRight').find("input");
    var i = 0; var l = result.length;
    for (i == 0; i < l; i++) {
        var stateid = result[i].value;
        arr.push(stateid);

    }
    document.getElementById("selectedcityids").value = arr;
    if (i > 0) {
        return true;
    }
    else {
        return false;
    }
}