﻿var oTable;
var pathutama = '';
var pathfile = '';
var barcodesama = false;

var fpArithmetic = function (op, x, y) {
    var n = {
            '*': x * y,
            '-': x - y,
            '+': x + y,
            '/': x / y
        }[op];        

    return Math.round(n * 100)/100;
};

function simpankategori(){
	if ($("#kodekategori").val() != "" && $("#kategori").val() != ""){
		var request = new Object();
		request.kodekategori = $("#kodekategori").val();
		request.kategori = $("#kategori").val();
		request.keterangan = $("#keterangan").val();
		request.asal = "Subkategori";
		alamat = pathutama + "dataproduk/simpankategori";
		$.ajax({
			type: "POST",
			url: alamat,
			data: request,
			cache: false,
			success: function(data){
				$("#idkategori").append("<option value=\""+ data.trim() +"\">"+ request.kodekategori +"-"+ request.kategori +"</option>");
				$("#kodekategori").val("");
				$("#kategori").val("");
				$("#keterangan").val("");
				$("#dialogtambahkategori").dialog("close");
				$("#idkategori").val(data.trim());
				filtersubkategori();
			}
		});
	}else{
		$("#tambahkategoriform").submit();
	}
}

function simpansubkategori(){
	if ($("#kodesubkategori").val() != "" && $("#subkategori").val() != ""){
		var request = new Object();
		request.idkategori = $("#idkategori2").val();
		request.kodesubkategori = $("#kodesubkategori").val();
		request.subkategori = $("#subkategori").val();
		request.keterangan = $("#keterangansub").val();
		request.asal = "Produk";
		alamat = pathutama + "dataproduk/simpansubkategori";
		$.ajax({
			type: "POST",
			url: alamat,
			data: request,
			cache: false,
			success: function(data){
				$("#idsubkategori").append("<option value=\""+ data.trim() +"\">"+ request.kodesubkategori +"-"+ request.subkategori +"</option>");
				$("#kodesubkategori").val("");
				$("#subkategori").val("");
				$("#keterangansub").val("");
				$("#dialogtambahsubkategori").dialog("close");
				$("#idsubkategori").val(data.trim());
				ubahkodebarang();
			}
		});
	}else{
		$("#tambahsubkategoriform").submit();
	}
}

function simpansupplier(){
	if ($("#kodesupplier").val() != "" && $("#supplier").val() != ""){
		var request = new Object();
		request.kodesupplier = $("#kodesupplier").val();
		request.namasupplier = $("#namasupplier").val();
		request.keterangan = $("#keterangan").val();
		request.asal = "supplier";
		alamat = pathutama + "datasupplier/simpansupplier";
		$.ajax({
			type: "POST",
			url: alamat,
			data: request,
			cache: false,
			success: function(data){
				$("#idsupplier").append("<option value=\""+ data.trim() +"\">"+ request.kodesupplier +"-"+ request.namasupplier +"</option>");
				$("#kodesupplier").val("");
				$("#supplier").val("");
				$("#keterangan").val("");
				$("#dialogtambahsupplier").dialog("close");
				$("#idsupplier").val(data.trim());
			}
		});
	}else{
		$("#tambahsupplierform").submit();
	}
}
function simpansatuan(){
	if ($("#namasatuan").val() != ""){
		var request = new Object();
		request.namasatuan = $("#namasatuan").val();
		alamat = pathutama + "dataproduk/simpansatuan";
		$.ajax({
			type: "POST",
			url: alamat,
			data: request,
			cache: false,
			success: function(data){
				if (data != "error"){
					$("#satuan").append("<option value=\""+ request.namasatuan +"\">"+ request.namasatuan +"</option>");
					$("#namasatuan").val("");
					$("#dialogtambahsatuan").dialog("close");
					$("#satuan").val(data.trim());
				}else{
					alert("Satuan ini sudah ada..!!");
				}
			}
		});
	}else{
		$("#tambahsatuanform").submit();
	}
}

function filtersubkategori(idsubkategori){
	var request = new Object();
	request.idkategori = 	$("#idkategori").val();
	var alamat = pathutama + "dataproduk/filterkategori";
	$.ajax({
		type: "POST",
		url: alamat,
		data: request,
		cache: false,
		success: function(data){
			$("#idsubkategori").empty();
			$("#idsubkategori").append(data);
			ubahkodebarang();
			if (idsubkategori > 0){
				$("#idsubkategori").val(idsubkategori);
				ubahkodebarang();
			}
		}
	});
}

function ubahkodebarang(){
	var kategori = "";
	$("#idkategori option:selected").each(function () {
		kategori = $(this).text();
	});
	var pecahkategori = kategori.split("-");
	var subkategori = "";
	$("#idsubkategori option:selected").each(function () {
		subkategori = $(this).text();
	});
	pecahsubkategori = subkategori.split("-");
	kodebarang = pecahkategori[0].trim() +"-"+ pecahsubkategori[0].trim();
	var request = new Object();
	request.kodealternatif = kodebarang;
	var alamat = pathutama + "dataproduk/cekkodealternatif";
	$.ajax({
		type: "POST",
		url: alamat,
		data: request,
		cache: false,
		success: function(data){
			$("#kodepoduk").val(kodebarang +"-"+ data.trim());
		}
	});
}
function hitungmargin(asal){
	if (asal == "hargapokok"){
		if ($("#margin").val() > 0 && $("#hargapokok").val() > 0){
			var hargajual = $("#hargapokok").val() * (100/(100-$("#margin").val()));
			$("#hargajual").val(Math.round(hargajual));
		}
	}else if (asal == "hargajual"){
		if ($("#hargapokok").val() > 0 && $("#hargajual").val() > 0){
			var margin = (($("#hargajual").val() - $("#hargapokok").val())/$("#hargajual").val())*100;
			$("#margin").val(Math.round(margin));
		}
	}else if (asal == "margin"){
		if ($("#hargapokok").val() > 0 && $("#margin").val() > 0){
			var hargajual = $("#hargapokok").val() * (100/(100-$("#margin").val()));
			$("#hargajual").val(Math.round(hargajual));
		}
	}
}
function cek_barcode(field, rules, i, options){
	if (field.val() != ""){
		$("#validating").html("<img src = \""+ pathutama +"misc/media/images/loading.gif\">");
		$("#validating").fadeIn("fast",function(){
			var request = new Object();
			request.barcode = field.val();
			request.idproduk = $("#idproduk").val();
			cekbarcode = pathutama +"dataproduk/cekbarcode2";
			$.ajax({
				type: "POST",
				url: cekbarcode,
				data: request,
				cache: false,
				success: function(data){
					if (data == "sama"){
						$("#validating").fadeOut("fast",function(){
							$("#barcode").validationEngine("showPrompt", "Barcode ini sudah digunakan..!!", "error", "topRight", true);
							$("#barcode").select();
							barcodesama = true;
						})
					}else{
						if (data == "taksama"){
							barcodesama = false;
						}
						$("#validating").fadeOut("fast");
					}
				}
			});
		})
	}
}
function simpanproduk(){
	if ($("#namaproduk").val() != "" && $("#hargapokok").val() > 0 && $("#hargajual").val() > 0){
		var request = new Object();
		request.idproduk = $("#idproduk").val();
		request.barcode = $("#barcode").val();
		request.alt_code = $("#kodepoduk").val();
		request.idkategori = $("#idkategori").val();
		request.idsubkategori = $("#idsubkategori").val();
		request.idsupplier = $("#idsupplier").val();
		request.namaproduk = $("#namaproduk").val();
		request.hargapokok = $("#hargapokok").val();
		request.hargajual = $("#hargajual").val();
		request.margin = $("#margin").val();
		request.minstok = $("#minstok").val();
		request.maxstok = $("#maxstok").val();
		request.stok = $("#stok").val();
		request.satuan = $("#satuan").val();
		request.keterangan = $("#keteranganproduk").val();
		request.type_product = $("#type_product").val();
		request.lead_time = $("#lead_time").val();
		request.jam_kerja = $("#ikut_jam_kerja").val();
	 	request.sebelum_zuhur = $("#sebelum_zuhur").val();
		alamatsimpan = pathutama +"dataproduk/simpanproduk";
		$.ajax({
			type: "POST",
			url: alamatsimpan,
			data: request,
			cache: false,
			success: function(){
				window.location = pathutama + "dataproduk/produk";
			}
		});
	}else{
		$("#formproduk").validationEngine("validate");
	}
}
function batal(){
	window.location = pathutama + "dataproduk/produk";
}
$(document).ready(function() {
	pathutama = Drupal.settings.basePath;
	pathfile = Drupal.settings.filePath;
	$("#dialogtambahkategori").dialog({
		modal: true,
		width: 350,
		resizable: false,
		autoOpen: false,
		position: ["auto","auto"],
		open: function(event, ui) {
			$("#kodekategori").focus();
		},
		close: function(){
			$("#tambahkategoriform").validationEngine("hide");
		}
	});
	$("#dialogtambahsubkategori").dialog({
		modal: true,
		width: 350,
		resizable: false,
		autoOpen: false,
		position: ["auto","auto"],
		open: function(event, ui) {
			$("#kodesubkategori").focus();
		},
		close: function(){
			$("#tambahsubkategoriform").validationEngine("hide");
		}
	});
	$("#dialogtambahsupplier").dialog({
		modal: true,
		width: 350,
		resizable: false,
		autoOpen: false,
		position: ["auto","auto"],
		open: function(event, ui) {
			$("#kodesupplier").focus();
		},
		close: function(){
			$("#tambahsupplierform").validationEngine("hide");
		}
	});
	$("#dialogtambahsatuan").dialog({
		modal: true,
		width: 350,
		resizable: false,
		autoOpen: false,
		position: ["auto","auto"],
		open: function(event, ui) {
			$("#namasatuan").select();
		},
		close: function(){
			$("#tambahsatuanform").validationEngine("hide");
		}
	});
	$("#formsubkategori").validationEngine();
	$("#tambahkategoriform").validationEngine();
	$("#tambahsubkategoriform").validationEngine();
	$("button").button();
	$("#addkategori").click(function(){
		$("#dialogtambahkategori").dialog("open");
		$(".ui-dialog-title").css("font-size","15px");
		$("#formproduk").validationEngine("hide");
		return false;
	});
	$("#addsubkategori").click(function(){
		$("#dialogtambahsubkategori").dialog("open");
		$("#idkategori2").val($("#idkategori").val());
		$(".ui-dialog-title").css("font-size","15px");
		$("#formproduk").validationEngine("hide");
		return false;
	});
	$("#addsupplier").click(function(){
		$("#dialogtambahsupplier").dialog("open");
		$(".ui-dialog-title").css("font-size","15px");
		$("#formproduk").validationEngine("hide");
		return false;
	});
	$("#addsatuan").click(function(){
		$("#dialogtambahsatuan").dialog("open");
		$(".ui-dialog-title").css("font-size","15px");
		$("#formproduk").validationEngine("hide");
		return false;
	});
	$("#kodekategori, #kodesubkategori, #kodesupplier, #namasatuan").autotab_filter({
		format: "alphanumeric",
		uppercase: true,
		nospace: true
	});
	$("#hargapokok,#hargajual,#margin,#minstok,#maxstok,#stok").autotab_filter({
		pattern: "[^0-9\.]",
		nospace: true
	});
	$("#main h2").css("width","100%");
	$("#main h2").css("float","left");
	$("#barcode").keypress(function(e) {
		if(e.keyCode == 13) {
			$("#formproduk").validationEngine("validateField", "#barcode");
			$("#idkategori").focus();
		}
	});
	$("#formproduk").validationEngine();
	filtersubkategori(Drupal.settings.idSubKategori);
	$("#barcode").select();
	$("#satuan").change(function(){
		var request = new Object();
		request.satuan1 = $(this).val();
	 	request.satuan2 = $("#satuan_lama").val();
		var alamat = pathutama +"dataproduk/getconversion";
		$.ajax({
			type: "POST",
			url: alamat,
			data: request,
			cache: false,
			success: function(data){
				var konversi = parseFloat(data.trim());
				if (konversi){
					$("#satuan_lama").val(request.satuan1);
					var stokkonversi = fpArithmetic('/',$('#stok').val(),konversi);
                                        $('#stok').val(stokkonversi);
					if ($('#hargajual').val() > 0){
						var hargajual = fpArithmetic('*',$('#hargajual').val(),konversi); 
						$('#hargajual').val(hargajual);
					}
					if ($('#hargapokok').val() > 0){
						var hargapokok = fpArithmetic('*',$('#hargapokok').val(),konversi); 
						$('#hargapokok').val(hargapokok);
					}
				}
			}
		});
	});
})