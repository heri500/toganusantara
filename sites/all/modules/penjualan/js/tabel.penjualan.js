var oTable;
var pathutama = '';
var tglAwal = '';
var tglAkhir = '';
var urutan = 0;
var tampilData = 0;
var idpelanggan = 0;
var idsupplier = 0;
var selectedPenjualan = 0;
var selectedNota = '';
var selectedPelanggan = 0;
var alamatupdatepenjualan = '';
function addCommas(nStr){
	nStr += "";
	x = nStr.split(",");
	x1 = x[0];
	x2 = x.length > 1 ? "," + x[1] : "";
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, "$1" + "." + "$2");
	}
	return x1 + x2;
}
function tampiltabeljual(){
	if (tampilData == 0){
		oTable = $('#tabel_penjualan').dataTable( {
			'bJQueryUI': true,
			'bAutoWidth': false,
			'sPaginationType': 'full_numbers',
			'bInfo': true,
			'aLengthMenu': [[100, 200, 300, -1], [100, 200, 300, 'All']],
			'iDisplayLength': 100,
			'aaSorting': [[urutan, 'desc']],
			'processing': true,
			'serverSide': true,
			'ajax': Drupal.settings.basePath + 'sites/all/modules/datapelanggan/server_processing.php?request_data=penjualan&tglawal='+ tglAwal +'&tglakhir='+ tglAkhir +'&idpelanggan='+ Drupal.settings.filterId,
			buttons: [
				{
					extend: 'colvis',
					columns: [1,2,3,4,5,6,7,8,9,10,11]
				}, 'copy', 'excel', 'print'
			],
			'sDom': '<"button-div"B><"H"lfr>t<"F"ip>',
			'createdRow': function ( row, data, index ) {
				row.id = data[(data.length - 1)];
				$('td', row).eq(1).addClass('center');
				$('td', row).eq(2).addClass('center');
				$('td', row).eq(3).addClass('center');
				$('td', row).eq(4).addClass('angka');
				$('td', row).eq(5).addClass('angka');
				$('td', row).eq(6).addClass('angka');
				$('td', row).eq(7).addClass('center');
				$('td', row).eq(8).addClass('angka');
				$('td', row).eq(9).addClass('angka');
				$('td', row).eq(10).addClass('center');
				$('td', row).eq(11).addClass('center');
				$('td', row).eq(12).addClass('center');
			},
            'aoColumnDefs': [
                { 'bSortable': false, 'aTargets': [ 0,3,12 ] }
            ],
			'footerCallback': function ( row, data, start, end, display ) {
				var api = this.api(), data;
				// Remove the formatting to get integer data for summation
				var intVal = function ( i ) {
					return typeof i === 'string' ?
					i.replace(/[\$.]/g, '')*1 :
						typeof i === 'number' ?
							i : 0;
				};
				// Total over all pages
				total = api
					.column( 4 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
				// Update footer
				$( api.column( 4 ).footer() ).html(
					'Rp. '+ addCommas(total)
				).addClass('angka');
				total = api
					.column( 5 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
				// Update footer
				$( api.column( 5 ).footer() ).html(
					'Rp. '+ addCommas(total)
				).addClass('angka');
				total = api
					.column( 6 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
				// Update footer
				$( api.column( 6 ).footer() ).html(
					'Rp. '+ addCommas(total)
				).addClass('angka');
				total = api
					.column( 8 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
				// Update footer
				$( api.column( 8 ).footer() ).html(
					'Rp. '+ addCommas(total)
				).addClass('angka');
				total = api
					.column( 9 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
				// Update footer
				$( api.column( 9 ).footer() ).html(
					'Rp. '+ addCommas(total)
				).addClass('angka');
			},
		});
	}else if (tampilData == 1){
		oTable = $('#tabel_penjualan').dataTable( {
			'bJQueryUI': true,
			'bAutoWidth': false,
			'sPaginationType': 'full_numbers',
			'bInfo': true,
			'aLengthMenu': [[100, 200, 300, -1], [100, 200, 300, 'All']],
			'iDisplayLength': 100,
			'aaSorting': [[urutan, 'desc']],
			'processing': true,
			'serverSide': true,
			'ajax': Drupal.settings.basePath + 'sites/all/modules/datapelanggan/server_processing.php?request_data=penjualan2&tglawal='+ tglAwal +'&tglakhir='+ tglAkhir +'&idsupplier='+ Drupal.settings.filterId,
			buttons: [
				{
					extend: 'colvis'
				}, 'copy', 'excel', 'print'
			],
			'sDom': '<"button-div"B><"H"lfr>t<"F"ip>',
			'createdRow': function ( row, data, index ) {
				row.id = data[(data.length - 1)];
				$('td', row).eq(0).addClass('center');
				$('td', row).eq(3).addClass('angka');
				$('td', row).eq(4).addClass('angka');
				$('td', row).eq(5).addClass('angka');
				$('td', row).eq(6).addClass('angka');
				$('td', row).eq(7).addClass('angka');
				$('td', row).eq(8).addClass('angka');
				$('td', row).eq(9).addClass('angka');
				$('td', row).eq(10).addClass('angka');
			},
			'footerCallback': function ( row, data, start, end, display ) {
				var api = this.api(), data;
				// Remove the formatting to get integer data for summation
				var intVal = function ( i ) {
					return typeof i === 'string' ?
					i.replace(/[\$.]/g, '')*1 :
						typeof i === 'number' ?
							i : 0;
				};
				// Total over all pages
				total = api
					.column( 8 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
				// Update footer
				$( api.column( 8 ).footer() ).html(
					'Rp. '+ addCommas(total)
				).addClass('angka');
				total = api
					.column( 9 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
				// Update footer
				$( api.column( 9 ).footer() ).html(
					'Rp. '+ addCommas(total)
				).addClass('angka');
				total = api
					.column( 10 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
				// Update footer
				$( api.column( 10 ).footer() ).html(
					'Rp. '+ addCommas(total)
				).addClass('angka');
			},
		});
	}
}
function tampiltabeljualdetail(){
	oTable2 = $("#tabel_detail_penjualan").dataTable( {
		'bJQueryUI': true,
		'bAutoWidth': false,
		'bPaginate': false,
		'bLengthChange': false,
		'scrollY': '330px',
		'scrollCollapse': true,
		'bInfo': false,
		'aaSorting': [[1, 'asc']],
		'sDom': '<"H"<"toolbar">fr>t<"F"ip>',
		'aoColumnDefs': [
			{ 'bSortable': false, 'aTargets': [ 0 ] }
		],
		'processing': true,
		'serverSide': true,
		'ajax': Drupal.settings.basePath + 'sites/all/modules/datapelanggan/server_processing.php?asal=penjualan&request_data=detailpenjualan&idpenjualan=' + selectedPenjualan,
		'createdRow': function ( row, data, index ) {
			row.id = data[(data.length - 1)];
			$('td', row).eq(1).addClass('center');
			$('td', row).eq(3).addClass('angka').attr('id','qty-'+ data[(data.length - 1)]).editable(alamatupdatepenjualan,{
				name : 'qty',
				width : 60,
				height : 18,
				select: true,
				style   : 'margin: 0',
				tooltip   : 'Klik untuk mengubah jumlah barang',
				indicator : 'Saving...',
				callback : function(value, settings) {
					oTable2.fnDraw();
				}
			});
			$('td', row).eq(4).addClass('angka');
			$('td', row).eq(5).addClass('angka');
			$('td', row).eq(6).addClass('angka');
			$('td', row).eq(7).addClass('angka');
			$('td', row).eq(8).addClass('angka');
		},
		'footerCallback': function ( row, data, start, end, display ) {
			var api = this.api(), data;
			// Remove the formatting to get integer data for summation
			var intVal = function ( i ) {
				return typeof i === 'string' ?
				i.replace(/[\$.]/g, '')*1 :
					typeof i === 'number' ?
						i : 0;
			};
			// Total over all pages
			total = api
				.column( 6 )
				.data()
				.reduce( function (a, b) {
					return intVal(a) + intVal(b);
				}, 0 );
			// Update footer
			$( api.column( 6 ).footer() ).html(
				'Rp. '+ addCommas(total)
			).addClass('angka');
			total = api
				.column( 7 )
				.data()
				.reduce( function (a, b) {
					return intVal(a) + intVal(b);
				}, 0 );
			// Update footer
			$( api.column( 7 ).footer() ).html(
				'Rp. '+ addCommas(total)
			).addClass('angka');
			total = api
				.column( 8 )
				.data()
				.reduce( function (a, b) {
					return intVal(a) + intVal(b);
				}, 0 );
			// Update footer
			$( api.column( 8 ).footer() ).html(
				'Rp. '+ addCommas(total)
			).addClass('angka');
		},
	});
}
function view_detail(idpenjualan,nonota,idpelanggan){
	selectedPenjualan = idpenjualan;
	selectedNota = nonota;
	selectedPelanggan = idpelanggan;
	var request = new Object();
	request.idpenjualan = idpenjualan;
	alamat = pathutama + 'penjualan/detailpenjualan';
	$.ajax({
		type: 'POST',
		url: alamat,
		data: request,
		cache: false,
		success: function(data){
			$('#table-detail-wrapper').html(data);
			tampiltabeljualdetail();
			$('div.toolbar').html('No. Nota : '+ nonota);
			$('#dialogdetail').dialog('open');
		}
	});
}
function hapus_detail(id, namaproduct){
	var confirmation = confirm('Yakin ingin menghapus penjualan '+ namaproduct +'...??!');
	if (confirmation){
		var request = new Object();
		request.iddetail = id;
		request.idpenjualan = selectedPenjualan;
		alamat = pathutama + 'penjualan/deletedetailpenjualan';
		$.ajax({
			type: 'POST',
			url: alamat,
			data: request,
			cache: false,
			success: function (data) {
				var returnData = eval(data);
				alert(returnData[0].message);
				oTable2.fnDraw();
			}
		});
	}
}
function print_penjualan(idpenjualan,nonota){
	var konfirmasi = confirm('Yakin ingin mencetak nota penjualan dengan no nota : '+ nonota +' ini...??!!');
	if (konfirmasi){
		window.open(pathutama + 'print/6?idpenjualan='+ idpenjualan);
	}
}
function print_faktur(idpenjualan,nonota){
	var konfirmasi = confirm('Yakin ingin export faktur ke xls untuk penjualan dengan no nota : '+ nonota +' ini...??!!');
	if (konfirmasi){
		alamat = pathutama + 'penjualan/exportfaktur/'+ idpenjualan;
		$.ajax({
			type: 'POST',
			url: alamat,
			cache: false,
			success: function(data){
				var xlsFilename = data.trim();
				window.location = Drupal.settings.basePath +"sites/default/files/"+ xlsFilename;
			}
		});
	}
}
$(document).ready(function(){
    pathutama = Drupal.settings.basePath;
	alamatupdatepenjualan = pathutama + 'penjualan/updatedetailpenjualan';
	urutan = Drupal.settings.urutan;
	tampilData = Drupal.settings.tampilData;
    tglAwal = Drupal.settings.tglAwal;
    tglAkhir = Drupal.settings.tglAkhir;
	$('#dialogdetail').dialog({
		modal: true,
		width: 900,
		resizable: false,
		autoOpen: false,
		position: ['auto','auto'],
		open: function(){
			$('.ui-dialog.ui-widget').css('overflow','inherit');
		},
		close: function(){
			oTable.fnDraw();
		}
	});
	$('button').button();
	/*TableToolsInit.sSwfPath = pathutama +'misc/media/datatables/swf/ZeroClipboard.swf';*/
	tampiltabeljual();
	$('#tgl1').datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: 'yy-mm-dd'
	});
	$('#tgl2').datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: 'yy-mm-dd'
	});
	$("#new-product").autocomplete({
		source: pathutama + 'sites/all/modules/datapelanggan/server_processing.php?request_data=getproduct&idpelanggan='+ selectedPelanggan,
		select: function (event, ui) {
			if (ui.item.barcode){
				$('#new-product').val(ui.item.barcode);
			}else if(!ui.item.barcode && ui.item.alt_code){
				$('#new-product').val(ui.item.alt_code);
			}else if(!ui.item.barcode && !ui.item.alt_code){
				$('#new-product').val(ui.item.value);
			}
			$('#idproduct').val(ui.item.id);
			var hargajual = ui.item.hargajual;
			var diskonview = '';
			if (ui.item.diskon > 0){
				hargajual = hargajual - (hargajual * ui.item.diskon/100);
				diskonview = '('+ ui.item.diskon +'%)';
			}
			$('#diskon').val(ui.item.diskon);
			$('#harga-view').val('Rp. '+ addCommas(hargajual) +' '+ diskonview);
			$('#hargajual').val(hargajual);
			$('#hargapokok').val(ui.item.hargapokok);
			$('#subtotal-view').val('Rp. '+ addCommas(hargajual));
			$('#qty-new').val('1');
			$('#qty-new').select();
		}
	});
	$('#qty-new').on('keyup',function(){
		var subTotal = $(this).val() * $('#hargajual').val();
		$('#subtotal-view').val('Rp. '+ addCommas(subTotal));
	});
	$('#qty-new').on('keypress',function(e){
		if (e.keyCode == 13) {
			$('#add-new-button').click();
		}
	});
	$('#new-product').on('keypress', function(e){
		if (e.keyCode == 13){
			if ($("#new-product").val() != ''){
				var request = new Object();
				request.request_data = 'getproductbarcode';
				request.idpelanggan = selectedPelanggan;
				request.term = $("#new-product").val();
				alamat = pathutama + 'sites/all/modules/datapelanggan/server_processing.php';
				$.ajax({
					type: 'GET',
					url: alamat,
					data: request,
					cache: false,
					success: function(data){
						var returnData = eval(data);
						$('#new-product').val(returnData[0].value);
						$('#idproduct').val(returnData[0].id);
						var hargajual = returnData[0].hargajual;
						var diskonview = '';
						if (returnData[0].diskon > 0){
							hargajual = hargajual - (hargajual * returnData[0].diskon/100);
							diskonview = '('+ returnData[0].diskon +'%)';
						}
						$('#diskon').val(returnData[0].diskon);
						$('#hargajual').val(hargajual);
						$('#hargapokok').val(returnData[0].hargapokok);
						$('#harga-view').val('Rp. '+ addCommas(hargajual) +' '+ diskonview);
						$('#subtotal-view').val('Rp. '+ addCommas(hargajual));
						$('#qty-new').val('1');
						$('#qty-new').select();
					}
				});
			}
		}
	});
	$('#add-new-button').on('click', function(){
		var request = new Object();
		request.idpenjualan = selectedPenjualan;
		request.idproduk = $('#idproduct').val();
		request.hargajual = $('#hargajual').val();
		request.hargapokok = $('#hargapokok').val();
		request.diskon = $('#diskon').val();
		request.qty = $('#qty-new').val();
		alamat = pathutama + 'penjualan/simpandetailpenjualan';
		$.ajax({
			type: 'POST',
			url: alamat,
			data: request,
			cache: false,
			success: function (data) {
				oTable2.fnDraw();
				$('#new-product').val('');
				$('#idproduct').val('');
				$('#diskon').val('');
				$('#hargajual').val('');
				$('#hargapokok').val('');
				$('#harga-view').val('');
				$('#subtotal-view').val('');
				$('#qty-new').val('');
				$('#new-product').focus();
			}
		});
	});
	$('#print-slip').on('click', function(){
		print_penjualan(selectedPenjualan,selectedNota);
	});
})