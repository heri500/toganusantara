<?php

function view_tabel_reproduksi(){
	$path = drupal_get_path('theme', 'cti_flex');
 	$form_style = $path.'/css/custom-style.css';
 	drupal_add_css($form_style, 'theme', 'all', FALSE);
 	$variables['styles'] = drupal_get_css();
	if ($_POST["tgl1"] AND $_POST["tgl2"]){
		$tgl1 = $_POST["tgl1"];
		$tgl2 = $_POST["tgl2"];
	}else{
		$tgl1 = date("Y-m-").'01';
		$tgl2 = date("Y-m-d");	
	}
	if ($_POST["pilihantampil"] == 'NOTA'){
		$nota = 'selected="selected"';
		$tabeltampil = tabel_reproduksi($tgl1,$tgl2);
		$urutan = 2;
		$tampilData = 0;
	}elseif ($_POST["pilihantampil"] == 'PRODUK'){
		$produk = 'selected="selected"';
		$tabeltampil = reproduksi_produk();
		$urutan = 3;
        $tampilData = 1;
	}else{
		$tabeltampil = tabel_reproduksi($tgl1,$tgl2);
		$nota = 'selected="selected"';
		$urutan = 2;
        $tampilData = 0;
	}
    drupal_add_css('misc/media/datatables.1.10/jquery/jquery-ui.css');
    drupal_add_css('misc/media/datatables.1.10/media/css/dataTables.jqueryui.css');
    drupal_add_css('misc/media/datatables.1.10/extensions/Buttons/css/buttons.dataTables.css');
    drupal_add_css('misc/media/datatables.1.10/extensions/Buttons/css/buttons.jqueryui.css');
    drupal_add_js('misc/media/datatables.1.10/media/js/jquery.js');
    drupal_add_js('misc/media/jqueryValidate/js/jquery.validationEngine-en.js');
    drupal_add_js('misc/media/jqueryValidate/js/jquery.validationEngine.js');
    drupal_add_js('misc/media/datatables.1.10/jquery/jquery-ui.js');
    _addJeditablePlugins();
    _addAutotabPlugins();
    drupal_add_js('misc/media/datatables.1.10/media/js/jquery.dataTables.js');
    drupal_add_js('misc/media/datatables.1.10/media/js/dataTables.jqueryui.js');
    drupal_add_js('misc/media/datatables.1.10/extensions/Buttons/js/dataTables.buttons.js');
    drupal_add_js('misc/media/datatables.1.10/extensions/Buttons/js/buttons.flash.js');
    drupal_add_js('misc/media/datatables.1.10/extensions/Buttons/js/buttons.html5.js');
    drupal_add_js('misc/media/datatables.1.10/extensions/Buttons/js/buttons.print.js');
    drupal_add_js('misc/media/datatables.1.10/extensions/Buttons/js/buttons.colVis.min.js');
    drupal_add_js(
        array(
            'urutan' => $urutan,
            'tampilData' => $tampilData,
            'tglAwal' => $tgl1,
            'tglAkhir' => $tgl2,
        ),
        'setting');
    $js_path = drupal_get_path('module','reproduksi').'/js/tabelproduksi.js';
    drupal_add_js($js_path);
	$pilihantampil = '<select id="pilihantampil" name="pilihantampil">';
	$pilihantampil .= '<option '.$nota.'>NOTA</option>';
	$pilihantampil .= '<option '.$produk.'>PRODUK</option>';
	$pilihantampil .= '</select>';
	$pilihperiode = '<form action="'.base_path().'reproduksi/viewreproduksi" method="post"><div id="pilihanperiode"><label>PILIH PERIODE PRODUKSI </label>';
    $pilihperiode .= '<input readonly="readonly" type="text" id="tgl1" name="tgl1" value="'.$tgl1.'">';
	$pilihperiode .= '<input readonly="readonly" type="text" id="tgl2" name="tgl2" value="'.$tgl2.'">'.$pilihantampil.'<button>LIHAT PRODUKSI</button></div></form>';
	$viewreproduksi = $pilihperiode.'<div id="viewreproduksi">'.$tabeltampil.'</div>';
	$viewreproduksi .= '<div id="dialogdetail" title="DETAIL PRODUKSI"><div id="divdetailrepro"></div><div id="divdetailhasilrepro"></div></div>';
	return $viewreproduksi;
}

function tabel_reproduksi($tgl1,$tgl2){
	//nonota, tglreproduksi, idpemakai, idlangganan, total, 
	//totalmodal, carabayar, bayar, kembali
	$tgl2 = DateAdd(1,$tgl2,"Y-m-d");
	$tabelreproduksi ='<table cellpadding="0" cellspacing="0" border="0" class="display" id="tabel_reproduksi">';
	$tabelreproduksi .= '<thead>';
	$tabelreproduksi .= '<tr>';
	$tabelreproduksi .= '<th class="tablebutton"></th>';
	$tabelreproduksi .= '<th class="tablebutton"></th>';
	$tabelreproduksi .= '<th>NO. NOTA</th>';
	$tabelreproduksi .= '<th class="tanggal">TGL</th>';
	$tabelreproduksi .= '<th class="tanggal">JAM</th>';
	$tabelreproduksi .= '<th>TOTAL</th>';
	$tabelreproduksi .= '<th>MODAL</th>';
	$tabelreproduksi .= '<th>LABA</th>';
	$tabelreproduksi .= '<th title="Total nilai jual hasil packing">T. HASIL</th>';
	$tabelreproduksi .= '<th title="Total nilai modal hasil packing">M. HASIL</th>';
	$tabelreproduksi .= '<th title="Total nilai laba hasil packing">L. HASIL</th>';
	$tabelreproduksi .= '<th>KASIR</th>';
	$tabelreproduksi .= '<th>PEKERJA</th>';
	$tabelreproduksi .= '</tr>';
	$tabelreproduksi .= '</thead>';
	$tabelreproduksi .= '<tbody>';
	$tabelreproduksi .= '</tbody>';
	$tabelreproduksi .= '<tfoot>';
	$tabelreproduksi .= '<tr>';
	$tabelreproduksi .= '<th style="text-align:right" colspan="5">Total:&nbsp;&nbsp;</th>';
	$tabelreproduksi .= '<th style="text-align: right">Rp. 0&nbsp;&nbsp;</th>';
	$tabelreproduksi .= '<th style="text-align: right">Rp. 0&nbsp;&nbsp;</th>';
	$tabelreproduksi .= '<th style="text-align: right">Rp. 0&nbsp;&nbsp;</th>';
	$tabelreproduksi .= '<th style="text-align: right">Rp. 0&nbsp;&nbsp;</th>';
	$tabelreproduksi .= '<th style="text-align: right">Rp. 0&nbsp;&nbsp;</th>';
	$tabelreproduksi .= '<th style="text-align: right">Rp. 0&nbsp;&nbsp;</th>';
	$tabelreproduksi .= '<th>&nbsp;</th>';
	$tabelreproduksi .= '<th>&nbsp;</th>';
	$tabelreproduksi .= '</tr>';
	$tabelreproduksi .= '</tfoot>';
	$tabelreproduksi .= '</table>';
	return $tabelreproduksi;
}

function detail_reproduksi(){
	if ($_POST["idreproduksi"]){
		$tabelreproduksi = '<div class="titletable">BAHAN PACKING ULANG</div>';
		$tabelreproduksi .='<table cellpadding="0" cellspacing="0" border="0" class="display" id="tabel_detail_reproduksi">';
		$tabelreproduksi .= '<thead>';
		$tabelreproduksi .= '<tr>';
		$tabelreproduksi .= '<th>BARCODE</th>';
		$tabelreproduksi .= '<th>PRODUK</th>';
		$tabelreproduksi .= '<th class="qty">QTY</th>';
		$tabelreproduksi .= '<th>H.JUAL</th>';
		$tabelreproduksi .= '<th>H.MODAL</th>';
		$tabelreproduksi .= '<th>SUBTOTAL</th>';
		$tabelreproduksi .= '<th>MODAL</th>';
		$tabelreproduksi .= '<th>LABA</th>';
		$tabelreproduksi .= '</tr>';
		$tabelreproduksi .= '</thead>';
		$tabelreproduksi .= '<tbody>';
		$result = db_query("SELECT c.barcode, c.namaproduct, b.jumlah, b.hargajual,
		b.hargapokok, (b.hargajual-b.hargapokok)*b.jumlah AS laba,
		(b.hargajual*b.jumlah) AS subtotal, (b.hargapokok*b.jumlah) AS totalmodal FROM 
		detailreproduksi b LEFT JOIN product c ON b.idproduct=c.idproduct
		LEFT JOIN supplier a ON a.idsupplier=c.idsupplier WHERE
		b.idreproduksi='%d'",$_POST["idreproduksi"]);
		while($data = db_fetch_object($result)){
			$tabelreproduksi .= '<tr>';
			$tabelreproduksi .= '<td>'.$data->barcode.'</td>';
			$tabelreproduksi .= '<td>'.$data->namaproduct.'</td>';
			$tabelreproduksi .= '<td class="angka">'.$data->jumlah.'</td>';
			$tabelreproduksi .= '<td class="angka">'.$data->hargajual.'</td>';
			$tabelreproduksi .= '<td class="angka">'.$data->hargapokok.'</td>';
			$tabelreproduksi .= '<td class="angka">'.$data->subtotal.'</td>';
			$tabelreproduksi .= '<td class="angka">'.$data->totalmodal.'</td>';
			$tabelreproduksi .= '<td class="angka">'.$data->laba.'</td>';
			$tabelreproduksi .= '</tr>';
		}
		$tabelreproduksi .= '</tbody>';
		$tabelreproduksi .= '</table><br><br>';
		print $tabelreproduksi;
	}
	exit();	
}
function detail_hasilreproduksi(){
	if ($_POST["idreproduksi"]){
		$tabelreproduksi = '<div class="titletable">HASIL PACKING ULANG</div>';
		$tabelreproduksi .='<table cellpadding="0" cellspacing="0" border="0" class="display" id="tabel_detail_hasilreproduksi">';
		$tabelreproduksi .= '<thead>';
		$tabelreproduksi .= '<tr>';
		$tabelreproduksi .= '<th>BARCODE</th>';
		$tabelreproduksi .= '<th>PRODUK</th>';
		$tabelreproduksi .= '<th class="qty">QTY</th>';
		$tabelreproduksi .= '<th>H.JUAL</th>';
		$tabelreproduksi .= '<th>H.MODAL</th>';
		$tabelreproduksi .= '<th>SUBTOTAL</th>';
		$tabelreproduksi .= '<th>MODAL</th>';
		$tabelreproduksi .= '<th>LABA</th>';
		$tabelreproduksi .= '</tr>';
		$tabelreproduksi .= '</thead>';
		$tabelreproduksi .= '<tbody>';
		$result = db_query("SELECT c.barcode, c.namaproduct, b.jumlah, b.hargajual,
		b.hargapokok, (b.hargajual-b.hargapokok)*b.jumlah AS laba,
		(b.hargajual*b.jumlah) AS subtotal, (b.hargapokok*b.jumlah) AS totalmodal FROM 
		detailhasilreproduksi b LEFT JOIN product c ON b.idproduct=c.idproduct
		LEFT JOIN supplier a ON a.idsupplier=c.idsupplier WHERE
		b.idreproduksi='%d'",$_POST["idreproduksi"]);
		while($data = db_fetch_object($result)){
			$tabelreproduksi .= '<tr>';
			$tabelreproduksi .= '<td>'.$data->barcode.'</td>';
			$tabelreproduksi .= '<td>'.$data->namaproduct.'</td>';
			$tabelreproduksi .= '<td class="angka">'.$data->jumlah.'</td>';
			$tabelreproduksi .= '<td class="angka">'.$data->hargajual.'</td>';
			$tabelreproduksi .= '<td class="angka">'.$data->hargapokok.'</td>';
			$tabelreproduksi .= '<td class="angka">'.$data->subtotal.'</td>';
			$tabelreproduksi .= '<td class="angka">'.$data->totalmodal.'</td>';
			$tabelreproduksi .= '<td class="angka">'.$data->laba.'</td>';
			$tabelreproduksi .= '</tr>';
		}
		$tabelreproduksi .= '</tbody>';
		$tabelreproduksi .= '</table><br><br>';
		print $tabelreproduksi;
	}
	exit();	
}
function reproduksi_produk(){
    $tabelreproduksi ='<h4>BAHAN PRODUKSI</h4>';
	$tabelreproduksi .='<table cellpadding="0" cellspacing="0" border="0" class="display" id="tabel_reproduksi">';
	$tabelreproduksi .= '<thead>';
	$tabelreproduksi .= '<tr>';
	$tabelreproduksi .= '<th>BARCODE</th>';
	$tabelreproduksi .= '<th>PRODUK</th>';
	$tabelreproduksi .= '<th>SUPPLIER</th>';
	$tabelreproduksi .= '<th class="qty">QTY</th>';
	$tabelreproduksi .= '<th>H.JUAL</th>';
	$tabelreproduksi .= '<th>H.MODAL</th>';
	$tabelreproduksi .= '<th>SUBTOTAL</th>';
	$tabelreproduksi .= '<th>MODAL</th>';
	$tabelreproduksi .= '<th>LABA</th>';
	$tabelreproduksi .= '</tr>';
	$tabelreproduksi .= '</thead>';
	$tabelreproduksi .= '<tbody>';
	$tabelreproduksi .= '</tbody>';
	$tabelreproduksi .= '<tfoot>';
	$tabelreproduksi .= '<tr>';
	$tabelreproduksi .= '<th style="text-align:right" colspan="6">Total:&nbsp;&nbsp;</th>';
	$tabelreproduksi .= '<th style="text-align: right">Rp. 0&nbsp;&nbsp;</th>';
	$tabelreproduksi .= '<th style="text-align: right">Rp. 0&nbsp;&nbsp;</th>';
	$tabelreproduksi .= '<th style="text-align: right">Rp. 0&nbsp;&nbsp;</th>';
	$tabelreproduksi .= '</tr>';
	$tabelreproduksi .= '</tfoot>';
	$tabelreproduksi .= '</table>';
    $tabelreproduksi .='<h4>HASIL PRODUKSI</h4>';
    $tabelreproduksi .='<table cellpadding="0" cellspacing="0" border="0" class="display" id="tabel_hasil_produksi">';
    $tabelreproduksi .= '<thead>';
    $tabelreproduksi .= '<tr>';
    $tabelreproduksi .= '<th>BARCODE</th>';
    $tabelreproduksi .= '<th>PRODUK</th>';
    $tabelreproduksi .= '<th>SUPPLIER</th>';
    $tabelreproduksi .= '<th class="qty">QTY</th>';
    $tabelreproduksi .= '<th>H.JUAL</th>';
    $tabelreproduksi .= '<th>H.MODAL</th>';
    $tabelreproduksi .= '<th>SUBTOTAL</th>';
    $tabelreproduksi .= '<th>MODAL</th>';
    $tabelreproduksi .= '<th>LABA</th>';
    $tabelreproduksi .= '</tr>';
    $tabelreproduksi .= '</thead>';
    $tabelreproduksi .= '<tbody>';
    $tabelreproduksi .= '</tbody>';
    $tabelreproduksi .= '<tfoot>';
    $tabelreproduksi .= '<tr>';
    $tabelreproduksi .= '<th style="text-align:right" colspan="6">Total:&nbsp;&nbsp;</th>';
    $tabelreproduksi .= '<th style="text-align: right">Rp. 0&nbsp;&nbsp;</th>';
    $tabelreproduksi .= '<th style="text-align: right">Rp. 0&nbsp;&nbsp;</th>';
    $tabelreproduksi .= '<th style="text-align: right">Rp. 0&nbsp;&nbsp;</th>';
    $tabelreproduksi .= '</tr>';
    $tabelreproduksi .= '</tfoot>';
    $tabelreproduksi .= '</table>';
	return $tabelreproduksi;	
}

function DateAdd($v,$d=null , $f="m/d/Y"){ 
 /*
 To Use
 $TGLHITUNG = date("m/d/Y");
 $TGLAKHIRHITUNG = DateAdd(30,$TGLHITUNG);
 */	
 $d=($d?$d:date("Y-m-d")); 
 return date($f,strtotime($v." days",strtotime($d))); 
}

function hitung_total_hasil($idreproduksi, $sumber = null){
	if ($idreproduksi > 0){
		if ($sumber == 'total'){
			$result = db_query("SELECT total FROM hasilreproduksi WHERE idreproduksi='%d'",$idreproduksi);
			$data = db_fetch_object($result);
			$totalhitung = $data->total;
		}else{
			$result = db_query("SELECT totalmodal FROM hasilreproduksi WHERE idreproduksi='%d'",$idreproduksi);
			$data = db_fetch_object($result);
			$totalhitung = $data->totalmodal;
		}
	}else{
		$totalhitung = 0;	
	}	
	return $totalhitung;
}