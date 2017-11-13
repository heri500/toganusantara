CREATE TABLE `returnpelanggan` (
  `idreturn` int(11) NOT NULL,
  `nonota` varchar(20) NOT NULL,
  `tglreturn` datetime DEFAULT NULL,
  `idpemakai` int(11) DEFAULT NULL,
  `idpelanggan` int(11) DEFAULT NULL,
  `total` double NOT NULL,
  `bayar` double DEFAULT NULL,
  `kembali` double DEFAULT NULL,
  `keterangan` text,
  `insert_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `carareturn` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `returnpelanggan`
--
ALTER TABLE `returnpelanggan`
  ADD PRIMARY KEY (`idreturn`),
  ADD KEY `nonota` (`nonota`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `returnpelanggan`
--
ALTER TABLE `returnpelanggan`
  MODIFY `idreturn` int(11) NOT NULL AUTO_INCREMENT;


CREATE TABLE `detailreturnpelanggan` (
  `iddetail` int(11) NOT NULL,
  `idreturn` int(11) NOT NULL,
  `idproduct` int(11) NOT NULL,
  `jumlah` double NOT NULL,
  `hargapokok` double NOT NULL,
  `hargajual` double NOT NULL,
  `diskon` double NOT NULL DEFAULT '0',
  `ppn` double NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detailreturnpelanggan`
--
ALTER TABLE `detailreturnpelanggan`
  ADD PRIMARY KEY (`iddetail`),
  ADD KEY `idpenjualan` (`idreturn`,`idproduct`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detailreturnpelanggan`
--
ALTER TABLE `detailreturnpelanggan`
  MODIFY `iddetail` int(11) NOT NULL AUTO_INCREMENT;