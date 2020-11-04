var load_vars = {};
var product = "dental-familia";
var producto = "dental-familia";
var customer = 1;
var horarioEspecialInicio = new Date("December 5, 2019 21:00:00");
var horarioEspecialFin = new Date("December 12, 2019 09:00:00");
DFI_client = {}

/* var script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://t.womtp.com/slider/c/segurcaixaadeslas/satellite/mainSatellite.js";
var head = document.getElementsByTagName("head")[0];
head.appendChild(script);
(window.onpopstate = function () {
    var match, pl = /\+/g, search = /([^&=]+)=?([^&]*)/g, decode = function (s) {
        return decodeURIComponent(s.replace(pl, " "));
    }, query = window.location.search.substring(1).replace("%m", "");
    while (match = search.exec(query))
        if (decode(match[1]) === "gclid")
            setCookie(decode(match[1]), decode(match[2]));
        else
            sessionStorage.setItem(decode(match[1]).toLowerCase(), decode(match[2]));
}
)(); */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results === null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}
function setCookie(name, value, exdays) {
    var d, expires;
    exdays = exdays || 1;
    d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Llamada a función creada para sustituir al $(document).ready() de jQuery, que no funciona con cookiebot
documentReady();

function documentReady() {

    $('#hubspotForm').submit(function (event) {
        event.preventDefault();
        $(this).submit();
    });
    var alturaHeader = $(".header").outerHeight();
    $("a.link-producto").click(function (event) {
        event.preventDefault();
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - (alturaHeader + 20)
        }, 1000);
    });
    $("a.txt-bolo").click(function (event) {
        event.preventDefault();
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - (alturaHeader + 20)
        }, 1000);
    });
    var now = new Date();
    var horarioTarificadorInicio = new Date("April 18, 2019 18:00:00");
    var horarioTarificadorFin = new Date("April 20, 2019 09:40:00");
    if (sessionStorage.getItem('landing') === 'test') {
        $('.test-a').wrapAll('<div>').parent().html('');
        $('.test-b').css('display', 'block');
    } else if (sessionStorage.getItem('landing') === 'leadonly') {
        $('.test-b').wrapAll('<div>').parent().html('');
        $('.test-leadonly').css('display', 'none');
    } else {
        $('.test-b').wrapAll('<div>').parent().html('');
    }
    if (product === "" || (product !== "plenaplus" && product !== "plena" && product !== "plenavital" && product !== "basico" && product !== "seniors")) {
        product = sessionStorage.getItem("product");
        if (product === null || (product !== "plenaplus" && product !== "plena" && product !== "plenavital" && product !== "basico" && product !== "seniors")) {
            product = "plenaplus";
        }
    }
    var idData = sessionStorage.getItem("idData");
    if (idData !== null && idData !== "" && idData !== "undefined") {
        if (typeof idData !== 'undefined') {
            fn_cargaPasoDos(idData);
        }
    }
    var precioMensual = sessionStorage.getItem("precioMensual");
    var precioDental = sessionStorage.getItem("precioDental");
    if (precioMensual !== null && precioMensual !== "" && precioMensual !== "undefined") {
        $("p[name='precioMensual']").html(precioMensual + " €");
    }
    if (precioDental !== null && precioDental !== "" && precioDental !== "undefined") {
        $("p[name='precioDental']").html(precioDental + " €");
    }
    $(".btn-call").on("click", function () {
        var cookieAnalytics = "";
        try {
            cookieAnalytics = ga.getAll()[0].get('clientId');
        } catch (err) {
            console.log(err);
        }
    });
    $("#formTop, #form-inhour, #form-inhour-modal, #form-outhour").validationEngine({
        autoHidePrompt: true,
        autoHideDelay: 3000
    });
    $(".btn-caracteristica").click(function () {
        var alturaVentana = $(this).offset().top;
        var alturaHeader = $("#header").height();
        var alturaTotal = alturaVentana - alturaHeader;
        $("body, html").animate({
            scrollTop: alturaTotal
        }, 1000);
    });
    hideConditionsDiv();
    hideColumna2();
    hideAllPropertyPoints();
    $($(".col-md-8.caracteristica")[0]).removeAttr("hidden");
    showPropertyPoints($('.item-caracteristica:first'));
    if (now > horarioTarificadorInicio && now < horarioTarificadorFin && producto !== "dental-familia") {
        $(".container-button-presupuesto").toggle()
    }
    if (now.getHours() < horario_inicio || now.getHours() >= horario_fin) {
        $(".outhour").show();
        $(".inhour").hide();
        if (window.matchMedia("(min-width: 768px)").matches) {
            $(".menu").css("margin-top", "144px");
            $(".fifth-container").css("margin-top", "180px");
        } else if (window.matchMedia("(min-width: 576px)").matches) {
            $(".menu").css("margin-top", "120px");
            $(".fifth-container").css("margin-top", "150px");
        } else {
            $(".menu").css("margin-top", "100px");
            $(".fifth-container").css("margin-top", "130px");
        }
    } else {
        //$(".outhour").hide();
        //$(".inhour").show();
    }

    var i;
    for (i = 0; i < dia.length; i++) {
        if (now.getDate() === dia[i] && now.getMonth() === (mes[i] - 1)) {
            $(".outhour").show();
            $(".inhour").hide();
        };
    }

    if (now > horarioEspecialInicio && now < horarioEspecialFin) {
        $(".inhour").hide();
        $(".menu").css("margin-top", "144px");
    }


    /* dia.forEach(function(item, index) {
      if (now.getDate() === item && now.getMonth() === (mes[index] - 1)) {
        $(".outhour").show();
        $(".inhour").hide();
      }
    });*/
    /*document.querySelectorAll("[id*='telADESLAS']").forEach(function(item) {
      tel = item.getAttribute("href").replace(/ /g, "");
      item.setAttribute("href", tel);
    });*/
    
    //datalayer_load_vars();
    if (window.location.href.indexOf("productos") >= 0) {
        if (productoSinFormatear !== "inicio") {
            document.getElementById("productoTop").value = productoSinFormatear;
        }
        $("#productoTop option[value='inicio']").hide();
    }
    // Añadir clase active a los enlaces de decesos y accidentes que están en el dropdown
    if ((producto_url.indexOf("decesos") != -1) || (producto_url.indexOf("accidentes") != -1)) {
        $("#navbarNav a[href*=" + producto + "]").addClass("active");
    }

    // Color azul al dropdown cuando tiene algún producto activo
    var dropdown_element = $('.nav-link.active').parents('.dropdown');
    dropdown_element.css('background', '#3eb5e6');
    dropdown_element.children('.btn').css('color', '#ffffff');

    //LAZYLOAD
    lazyload();

    // Recaptcha
    //if (!document.getElementById('g-recaptcha').hasChildNodes()) {
    //    onloadCallback()
    //}
}

if (producto === "basico" || producto === "decesos" || producto === "accidentes") {
    $("#fourth-container").addClass("sin-bolo");
}
if (producto === "dental") {
    $(".spec-item").eq(1).hide();
    $(".spec-item").eq(2).hide();
}
function addCustomer(obj) {
    customer += 1;
    if (customer <= 6) {
        var element = $('<div class="customer-extra-' + customer + '"><div class="form-group"></div><div class="form-group"></div><div class="form-group"></div><div class="form-group"><p>' + titleFechaTarificador + ' ' + customer + '</p><input type="text" class="form-control validate[required, custom[date]] fechaNacimiento" placeholder="*dd/mm/aaaa" data-mask="00/00/0000" data-prompt-position="bottomLeft:0" name="fechaNacimiento-' + customer + '" id="fechaNacimiento-' + customer + '"></div></div>');
        $(element).insertBefore($(obj));
        if (customer === 6) {
            $(".add").hide();
        } else {
            $(".remove").css("display", "flex");
        }
    } else {
        customer = 6;
    }
    $("#fechaNacimiento-" + customer).mask("00/00/0000");
}
function removeCustomer() {
    if (customer >= 2) {
        $(".customer-extra-" + customer).remove();
        customer -= 1;
        if (customer < 6) {
            $(".add").show();
        }
        if (customer === 1) {
            $(".remove").hide();
        }
    } else {
        customer = 2;
    }
}

// Renderizado reCAPTCHAv2
function onloadCallback() {
    grecaptcha.render(
        container = 'g-recaptcha',
        parameters = {
            // Local
            // sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
            // Producción
            sitekey: '6LcGEMIUAAAAAJr-1E_xiFx2Lr21hINs9sEnmo0i',
            theme: 'light'
        }
    )
}

function SaveAndSend(formName) {
    var arr_dates = [];
    var arr_dates_hbs = Array(6).fill(null);

    // Validación para Séniors
    if ($('#productoTop :selected').val() == 'seniors') {

        // Calcular fecha hace 55 años
        var errorSeniors = false;
        var todayDate = new Date();
        var yearsAgo55 = todayDate.getFullYear() - 55;
        var seniorDate = new Date(todayDate.setFullYear(yearsAgo55));

        // Recoger fecha asegurados
        for (var index = 0; index < $('.fechaNacimiento').length; index++) {

            var birthDate = $('.fechaNacimiento')[index].value;
            birthDate = birthDate.split('/');
            var birthDatePerson = new Date(birthDate[2], birthDate[1] - 1, birthDate[0]);

            // Comparamos edad para saber si es sénior
            if (birthDatePerson > seniorDate) {
                $('.fechaNacimiento').eq(index).prev().html('Debes tener al menos 55 años');
                $('.fechaNacimiento').eq(index).prev().addClass('error');
                errorSeniors = true;
            } else {
                if (index == 0) {
                    $('.fechaNacimiento').eq(index).prev().html('Fecha de nacimiento Asegurado');
                } else {
                    $('.fechaNacimiento').eq(index).prev().html('Fecha de nacimiento Asegurado ' + (index + 1));
                }
                $('.fechaNacimiento').eq(index).prev().removeClass('error');
            }
        }
    }

    // Validación reCAPTCHAv2
    var errorCaptcha = false;
    var respuesta = grecaptcha.getResponse();

    if (respuesta.length == 0) {
        $('iframe').addClass('error_iframe');
        errorCaptcha = true;
    } else {
        $('iframe').removeClass('error_iframe');
    }

    if ($(formName).validationEngine('validate')) {

        if (errorSeniors || errorCaptcha) {
            return false;
        }

        var dataDate = "";
        for (var i = 0; i < $('.fechaNacimiento').length; i++) {
            if ($('.fechaNacimiento')[i].value !== "") {
                arr_dates.push($('.fechaNacimiento')[i].value);
                var fechaSplit = $('.fechaNacimiento')[i].value.split("/")
                arr_dates_hbs[i] = fechaSplit[2] + "-" + fechaSplit[1] + "-" + fechaSplit[0];
            }
        }
        $.each(arr_dates, function (index, value) {
            if (index === 0) {
                dataDate = value;
            } else {
                dataDate = dataDate + '-' + value;
            }
        });
        $("input[name='fechas']").val(dataDate);
        $("input[name='userAgent']").val(navigator.userAgent);
        $.post({
            url: window.location.href + "/",
            data: $(formName).serialize(),
            success: function (data) {
                if ($.trim(data) !== "") {
                    if ($.trim(data[2]) !== "") {
                        dataLayer.push({
                            'event': data[2]
                        });
                    }
                    sessionStorage.setItem("idData", data[4]);
                    sessionStorage.setItem("precioMensual", data[4].split("#")[3]);
                    sessionStorage.setItem("precioDental", CalcDental(arr_dates.length));
                    sessionStorage.setItem("NAsegurados", arr_dates.length);

                    var urlSplit = window.location.pathname.split("-");
                    var idiomaSeleccionado = urlSplit[urlSplit.length - 1];

                    var entrar = true;
                    if (entrar === true) {
                        if (idiomaSeleccionado === "es") {
                            $("#languageSF").val("Castellano");
                        }
                        else {
                            $("#languageSF").val("Catalan");
                        }
                        $("#leadNameSF").val($('#nameTop').val());
                        $("#emailSF").val($('#emailTop').val());
                        $("#dateOfBirthSF").val(arr_dates_hbs[0]);
                        $("#dateOfBirthSecondSF").val(arr_dates_hbs[1]);
                        $("#dateOfBirthThirdSF").val(arr_dates_hbs[2]);
                        $("#dateOfBirthFourthSF").val(arr_dates_hbs[3]);
                        $("#dateOfBirthFifthSF").val(arr_dates_hbs[4]);
                        $("#dateOfBirthSixthSF").val(arr_dates_hbs[5]);
                        $("#advertisingSendingMarkSF").val($("#chkPrivacidad").is(':checked'));
                        $("#idPricingSF").val(data[4]);
                        $("#monthlyPriceSF").val(data[4].split("#")[3].replace(",", "."));
                        $("#monthlyDentalPriceSF").val(CalcDental(arr_dates.length).replace(",", "."));
                        $("#uuidSF").val(UUID.uuid4());

                        $.post({
                            url: window.location.href + "/",
                            data: $("#salesForceForm").serialize(),
                            success: function (data) {
                                console.log(data);
                            },
                            error: function (data) {
                                console.log(data);
                            }
                        });
                    }

                    var url = $('option:selected', $("#productoTop")).attr('data-url');
                    window.location.href = "http://" + window.location.host + "/presupuestos/" + url + window.location.search;
                }
            },
            error: function (returnval) { }
        });
        return false;
    } else { }
    return false;
}

function SaveAndSendPhone(formName, tipo) {
    if ($(formName).validationEngine('validate')) {
        $(".btn-form").removeAttr("onclick").css({
            "cursor": "default"
        });
        $(".btn-form:hover").css({
            "background-color": colorPrincipalHover
        });
        $.post({
            url: window.location.href + "/",
            data: $(formName).serialize(),
            success: function (data) {
                if ($.trim(data) !== "") {
                    dataLayer.push({
                        'event': data[2]
                    });
                    $("div[name='divFormMensajeResultado'] p:first-child").html(data[1]);
                    $("div[name='divFormMensajeResultado']").show();
                    $("div[name='divForm']").hide();
                }
                $("div[name='divFormMensajeResultado'] p:first-child").html(data[1]);
                $("div[name='divFormMensajeResultado']").show();
                $("div[name='divForm']").hide();
            },
            error: function (returnval) {
                $("div[name='divFormMensajeResultado'] p:first-child").html(data[1]);
                $("div[name='divFormMensajeResultado']").show();
                $("div[name='divForm']").hide();
            }
        });
    }
}
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)), sURLVariables = sPageURL.split('&'), sParameterName, i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}
function CalcDental(contador) {
    if (contador === 1) {
        return "8,92";
    } else if (contador === 2) {
        return "12,75";
    } else if (contador === 3 || contador === 4) {
        return "17,85";
    } else {
        return "17,85";
    }
}
function CambioProducto(producto) {
    window.location = window.location.origin + '/productos/' + producto + window.location.search;
}
function CambioIdiomaProductos(idioma) {
    window.location = window.location.origin + '/productos/' + idioma + window.location.search;
}
function CambioIdiomaPresupuestos(idioma) {
    window.location = window.location.origin + '/presupuestos/' + idioma + window.location.search;
}
function datalayer_load_vars() {
    load_vars.event = 'load_vars';
    $("input[name='event']").val("load_vars");
    var urlSplit = window.location.pathname.split("-");
    load_vars.Idioma = '';
    load_vars.TipoProducto = '';
    load_vars.Origen = '';
    load_vars.Device = '';
    load_vars.Paso = '';
    load_vars.NAsegurados = '';
    load_vars.Precio = '';
    load_vars.PrecioDental = '';
    load_vars.TipoProducto = '';
    load_vars.gclid = '';
    load_vars.MsclkId = '';
    load_vars.Keyword = '';
    load_vars.MatchType = '';
    load_vars.CampaingId = '';
    load_vars.AdgroupId = '';
    load_vars.Formato = '';
    load_vars.Creative = '';
    load_vars.fbclid = '';
    load_vars.Agencia = 't2omedia';
    if (urlSplit.length > 0) {
        if (urlSplit[urlSplit.length - 1] === "es") {
            load_vars.Idioma = 'es';
        } else {
            load_vars.Idioma = 'ca';
        }
    } else {
        load_vars.Idioma = 'es';
    }
    if (producto !== "" && producto !== null) {
        load_vars.TipoProducto = producto;
        $("input[name='TipoProducto']").val(producto);
    }
    var origen = sessionStorage.getItem("origen");
    if (origen !== "" && origen !== null) {
        load_vars.Origen = origen;
        $("input[name='Origen']").val(origen);
    }
    var device = sessionStorage.getItem("device");
    if (device !== "" && device !== null) {
        load_vars.Device = device;
        $("input[name='Device']").val(device);
    } else {
        if (check_mobile()) {
            load_vars.Device = "m";
            $("input[name='Device']").val("m");
        } else {
            load_vars.Device = "c";
            $("input[name='Device']").val("c");
        }
    }
    var idData = sessionStorage.getItem("idData");
    if (idData === null || idData === "" || idData === "undefined") {
        if (sessionStorage.getItem('landing') === 'test')
            load_vars.Paso = 'home-test';
        else if (sessionStorage.getItem('landing') === 'leadonly')
            load_vars.Paso = 'home-leadonly';
        else
            load_vars.Paso = 'home';
        if (load_vars.TipoProducto === undefined)
            load_vars.TipoProducto = $('.menu-item.active').attr('data-product');
    } else {
        if (sessionStorage.getItem('landing') === 'test')
            load_vars.Paso = 'presupuestos-test';
        else
            load_vars.Paso = 'presupuestos';
    }
    load_vars.NAsegurados = sessionStorage.getItem('NAsegurados');
    load_vars.Precio = sessionStorage.getItem('precioMensual');
    if (producto !== "dental-familia") {
        load_vars.PrecioDental = sessionStorage.getItem('precioDental');
    }
    else {
        load_vars.PrecioDental = "0";
    }
    var gclid = getCookie("gclid");
    if (gclid !== "" && gclid !== null) {
        load_vars.gclid = gclid;
        $("input[name='gclid']").val(gclid);
    }
    var dcm_id = getCookie("DC_ID");
    if (dcm_id !== "" && dcm_id !== null) {
        load_vars.dcmid = dcm_id;
        $("input[name='dcmid']").val(dcm_id);
    }
    var keyword = sessionStorage.getItem("keyword");
    if (keyword !== "" && keyword !== null) {
        load_vars.Keyword = keyword;
        $("input[name='Keyword']").val(keyword);
    }
    var matchtype = sessionStorage.getItem("matchtype");
    if (matchtype !== "" && matchtype !== null) {
        load_vars.MatchType = matchtype;
        $("input[name='MatchType']").val(matchtype);
    }
    var campaignid = sessionStorage.getItem("campaignid");
    if (campaignid !== "" && campaignid !== null) {
        load_vars.CampaingId = campaignid;
        $("input[name='CampaingId']").val(campaignid);
    }
    var adgroupid = sessionStorage.getItem("adgroupid");
    if (adgroupid !== "" && adgroupid !== null) {
        load_vars.AdgroupId = adgroupid;
        $("input[name='AdgroupId']").val(adgroupid);
    }
    var creative = sessionStorage.getItem("creative");
    if (creative !== "" && creative !== null) {
        load_vars.Creative = creative;
        $("input[name='Creative']").val(creative);
    }
    var utm_campaign = sessionStorage.getItem("utm_campaign");
    if (utm_campaign !== "" && utm_campaign !== null) {
        load_vars.Promocion = utm_campaign;
        $("input[name='Promocion']").val(utm_campaign);
    }
    var utm_content = sessionStorage.getItem("utm_content");
    if (utm_content !== "" && utm_content !== null) {
        load_vars.Formato = utm_content;
        $("input[name='Formato']").val(utm_content);
    }
    var utm_term = sessionStorage.getItem("utm_term");
    if (utm_term !== "" && utm_term !== null) {
        load_vars.Creatividad = utm_term;
        $("input[name='Creatividad']").val(utm_term);
    }
    var msclkId = sessionStorage.getItem("msclkid");
    if (msclkId !== "" && msclkId !== null) {
        load_vars.MsclkId = msclkId;
        $("input[name='MSCLKID']").val(msclkId);
    }
    var fbclid = sessionStorage.getItem("fbclid");
    if (fbclid !== "" && fbclid !== null) {
        load_vars.fbclid = fbclid;
        //$("input[name='fbclid']").val(fbclid);
    }
    dataLayer.push(load_vars);
}
function fn_cargaPasoDos(data) {
    var arrayDatos = data.split("#");
    console.log(arrayDatos[2]);
    switch (arrayDatos[2]) {
        case "Adeslas Básico Familia":
            dataLayer.push({
                'event': 'tarificador',
                'id_t2o': '' + arrayDatos[1],
                "Seccion": "resultado tarificación",
                "Idioma": "es",
                "TipoProducto": "basico",
                "TipoCliente": "prospecto",
                "Localizacion": "",
                "Pagina": "landing"
            });
            product = "basico";
            prod = "Básico Familia";
            break;
        case "Adeslas Plena Vital":
            dataLayer.push({
                'event': 'tarificador',
                'id_t2o': '' + arrayDatos[1],
                "Seccion": "resultado tarificación",
                "Idioma": "es",
                "TipoProducto": "plenavital",
                "TipoCliente": "prospecto",
                "Localizacion": "",
                "Pagina": "landing"
            });
            product = "plenavital";
            prod = "Plena Vital";
            break;
        case "Adeslas Plena":
            dataLayer.push({
                'event': 'tarificador',
                'id_t2o': '' + arrayDatos[1],
                "Seccion": "resultado tarificación",
                "Idioma": "es",
                "TipoProducto": "plena",
                "TipoCliente": "prospecto",
                "Localizacion": "",
                "Pagina": "landing"
            });
            product = "plena";
            prod = "Plena";
            break;
        case "Adeslas Plena Plus":
            dataLayer.push({
                'event': 'tarificador',
                'id_t2o': '' + arrayDatos[1],
                "Seccion": "resultado tarificación",
                "Idioma": "es",
                "TipoProducto": "plenaplus",
                "TipoCliente": "prospecto",
                "Localizacion": "",
                "Pagina": "landing"
            });
            product = "plenaplus";
            prod = "Plena Plus";
            break;
        case "Adeslas Seniors":
            dataLayer.push({
                'event': 'tarificador',
                'id_t2o': '' + arrayDatos[1],
                "Seccion": "resultado tarificación",
                "Idioma": "es",
                "TipoProducto": "seniors",
                "TipoCliente": "prospecto",
                "Localizacion": "",
                "Pagina": "landing"
            });
            product = "seniors";
            prod = "Seniors";
            break;
        case "dental":
            dataLayer.push({
                'event': 'tarificador',
                'id_t2o': '' + arrayDatos[1],
                "Seccion": "resultado tarificación",
                "Idioma": "es",
                "TipoProducto": "dental",
                "TipoCliente": "prospecto",
                "Localizacion": "",
                "Pagina": "landing"
            });
            product = "dental";
            prod = "Dental";
            break;
        default:
            dataLayer.push({
                'event': 'tarificador',
                'id_t2o': '' + arrayDatos[1],
                "Seccion": "resultado tarificación",
                "Idioma": "es",
                "TipoProducto": "plenaplus",
                "TipoCliente": "prospecto",
                "Localizacion": "",
                "Pagina": "landing"
            });
            product = "plenaplus";
            prod = "Plena Plus";
            break;
    }
    $("#referencia").html("Ref: " + arrayDatos[1]);
    var r = "";
    if (arrayDatos[2] === "Adeslas Básico") {
        $("#coberturasBasicas").show();
        $("#coberturasPlena").hide();
        r = "Adeslas Básico Familia";
    } else {
        $("#coberturasBasicas").hide();
        $("#coberturasPlena").show();
        r = arrayDatos[2];
    }
}
function hideColumna2() {
    $(".col-md-8.caracteristica ul.columna2").each(function () {
        if ($(this).children().length === 0) {
            $(this).attr("style", "display:none!important");
        }
    });
}
function hideAllPropertyPoints() {
    $(".col-md-8.caracteristica").each(function () {
        $(this).attr("hidden", "true");
    });
}
function showPropertyPoints(elem) {
    hideAllPropertyPoints();

    var name = elem.attr("name");
    $(".col-md-8.caracteristica." + name).removeAttr("hidden");
    $(".item-caracteristica").removeClass("active");
    elem.addClass("active");
}
function check_mobile() {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true
    }
    )(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}
function goToPromo() {
    $("html, body").animate({
        scrollTop: $(".txt-puntos").offset().top
    }, 1500);
}
function hideConditionsDiv() {
    if ($("#punto").children().length === 0) {
        $("#punto").attr("style", "display:none");
    }
}
function goToOfertas() {
    $("html, body").animate({
        scrollTop: $(".bolos-abajo3").offset().top
    }, 1500, function () {
        $("#btn-up-js").removeClass('active');
    });
}
$(window).on('scroll', function () {
    $("#btn-up-js").addClass("active");
});
DFI_client.customThankU = function () {
    dataLayer.push({
        'event': 'tellamamosgracias'
    });
    var now = new Date();
    $("div[name='divFormMensajeResultado'] p:first-child").html('Gracias por solicitar información, pronto nos pondremos en contacto contigo.');
    if (now > horarioEspecialInicio && now < horarioEspecialFin) {
        $("div[name='divFormMensajeResultado'] p:first-child").html("Gracias por solicitar información. Nuestras oficinas permanecen cerradas debido a las festividades del puente de la Constitución. Nos pondremos en contacto con usted a partir del 10 de diciembre");
    }
    $("div[name='divFormMensajeResultado']").show();
    $("div[name='divForm']").hide();
}
    ;

// Desactivar banda de cookies e inyectar cookie t2o
function addCookieT2O() {
    var cookie = 'cookie_t2o=true;';
    var date = new Date();
    var date_seconds = date.getTime();
    var date_next_month = date_seconds + 60 * 60 * 24 * 31 * 1000;
    var date_expire = new Date(date_next_month);

    document.cookie = cookie + 'expires=' + date_expire;
}

$('.btn-close-cookies').click(function () {
    $(this).parents('#cookies').fadeOut(1000);
    addCookieT2O();
});

if (document.cookie.includes('cookie_t2o=true')) {
    $('#cookies').hide();
} else {
    $('#cookies').show();
}

var els = document.getElementsByClassName("nav-link");
Array.prototype.forEach.call(els, function (el) {
    el.href = el.href.concat(location.search);
});

var UUID = {
    // Return a randomly generated v4 UUID, per RFC 4122
    uuid4: function () {
        return this._uuid(
            this.randomInt(), this.randomInt(),
            this.randomInt(), this.randomInt(), 4);
    },

    // Create a versioned UUID from w1..w4, 32-bit non-negative ints
    _uuid: function (w1, w2, w3, w4, version) {
        var uuid = new Array(36);
        var data = [
            (w1 & 0xFFFFFFFF),
            (w2 & 0xFFFF0FFF) | ((version || 4) << 12), // version (1-5)
            (w3 & 0x3FFFFFFF) | 0x80000000,    // rfc 4122 variant
            (w4 & 0xFFFFFFFF)
        ];
        for (var i = 0, k = 0; i < 4; i++) {
            var rnd = data[i];
            for (var j = 0; j < 8; j++) {
                if (k == 8 || k == 13 || k == 18 || k == 23) {
                    uuid[k++] = '-';
                }
                var r = (rnd >>> 28) & 0xf; // Take the high-order nybble
                rnd = (rnd & 0x0FFFFFFF) << 4;
                uuid[k++] = this.hex.charAt(r);
            }
        }
        return uuid.join('');
    },

    hex: '0123456789abcdef',

    // Return a random integer in [0, 2^32).
    randomInt: function () {
        return Math.floor(0x100000000 * Math.random());
    }
};

// Mensaje politica cookies retirar consentimiento cookies cookie bot

$('#cb_withdraw').click(function () {
    $('#msg_cb').show();
    setTimeout(function () {
        $('#msg_cb').hide();
    }, 2000);
});

//LAZYLOAD FUNCTIONS

function lazyload() {

    var imagesLazy = [].slice.call(document.querySelectorAll(".lazy"));


    if (imagesLazy.length) {
        if ('IntersectionObserver' in window) {
            lazyObserver(imagesLazy);
        } else if (imagesLazy[0].getBoundingClientRect().top !== undefined && imagesLazy[0].getBoundingClientRect().bottom !== undefined) {
            lazyBounding(imagesLazy);
        } else {
            noLazyLoad(imagesLazy);
        }
    }
}

function noLazyLoad(imagesLazy) {

    for (var i = 0; i < imagesLazy.length; i++) {

        if (imagesLazy[i].getAttribute("data-src")) {
            imagesLazy[i].src = imagesLazy[i].getAttribute("data-src");
            imagesLazy[i].removeAttribute("data-src");
        } else {
            imagesLazy[i].classList.add("lazy-bg");
        }
    }
}

function lazyBounding(imagesLazy) {

    var active = false;

    function imgLazyLoad() {
        if (active === false) {
            active = true;

            setTimeout(function () {
                imagesLazy.forEach(function (image) {
                    if ((image.getBoundingClientRect().top <= window.innerHeight && image.getBoundingClientRect().bottom >= 0) && getComputedStyle(image).display !== "none") {

                        if (image.dataset.src) {
                            image.src = image.dataset.src;
                            image.removeAttribute("data-src");

                        } else {
                            image.classList.add("lazy-bg");
                        }
                        image.classList.remove("lazy");

                        imagesLazy = imagesLazy.filter(function (imageLoad) {
                            return imageLoad !== image;
                        });

                        if (imagesLazy.length === 0) {
                            document.removeEventListener("scroll", imgLazyLoad);
                            window.removeEventListener("resize", imgLazyLoad);
                            window.removeEventListener("orientationchange", imgLazyLoad);
                        }
                    }
                });

                active = false;

            }, 200);
        }
    }

    imgLazyLoad();
    document.addEventListener("scroll", imgLazyLoad);
    window.addEventListener("resize", imgLazyLoad);
    window.addEventListener("orientationchange", imgLazyLoad);
}

function lazyObserver(imagesLazy) {

    function imgLazyLoad(entries) {
        entries.forEach(function (entry) {

            if (entry.isIntersecting && entry.intersectionRatio > 0) {
                if (entry.target.dataset.src) {
                    entry.target.src = entry.target.dataset.src;
                    entry.target.removeAttribute("data-src");
                } else {
                    entry.target.classList.add("lazy-bg");
                }
                entry.target.classList.remove("lazy");
                observer.unobserve(entry.target);
            }
        })
    }

    var options = {
        root: null,
        rootMargin: '3px',
        threshold: 0
    }

    var observer = new IntersectionObserver(imgLazyLoad, options);

    imagesLazy.forEach(function (image) {
        observer.observe(image);
    });

}