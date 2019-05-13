<template>
<div>
  <div class="process-container">
    <BHeader :title="setTitle()" />
    <!-- <div class="" v-html="tab">
        <div class="item active">ATM</div><div class="item">ONLINE</div><div class="item">MBANKING</div>
   </div> -->
    <div :class="[method == 1 ? 'show':'hide']">
      <div class="cont-panel">
        <div class="top">
          <p class="title">{{amount}}</p>
          <p class="subtitle">Jumlah</p>
          <p class="code">{{data}}</p>
          <p class="subtitle">Kode Pembayaran</p>
        </div>
<i class="fixDash"></i>
        <div class="text-cont  fix" >
          <ol>
            <li>Catat Kode Pembayaran di atas dan datang ke gerai Alfamart, Alfa Midi, Alfa Express, dan Lawson </li>
            <li> Beritahukan ke kasir bahwa anda ingin melakukan pembayaran Nama Merchant ”BMY” </li>
            <li> Jika kasir tidak mengetahui mengenai pembayaran Nama Merchant, informasikan ke kasir untuk membuka terminal e-transaction, pilih "no. 2 menu Pembayaran atau cari pada menu search" c </li>
            <li> Minta kasir untuk menekan “Shift” dan “?” lalu ketik Nama Merchant “BMY”, setelah itu klik OK </li>
            <li>Minta kasir untuk pilih "no.1 Nama Merchan - Pembayaran Nama Merchant" </li>
            <li>Kasir akan menanyakan Kode Pembayaran. Berikan Kode Pembayaran anda <span class="yellow">{{data}}</span>. Kasir akan melakukan konfirmasi data konsumen berupa Nama Merchant “BMY”, Nama Konsumen, dan Nominal. Lakukan pembayaran ke
              kasir sejumlah nominal yang disebutkan </li>
            <li>Terima struk sebagai bukti pembayaran sudah sukses dilakukan. Notifikasi pembayaran akan langsung diterima oleh Merchant</li>
            <li>Selesai.</li>
          </ol>
        </div>
      </div>
    </div>

    <div :class="method == 2 ? 'show': 'hide'">
      <div class="tab-cont">
        <div class="item" :class="[active == 1 ?'active':'']" @click="addClass(1)">ATM</div>
        <div class="item" :class="[active == 2 ?'active':'']" @click="addClass(2)">ONLINE</div>
        <div class="item" :class="[active == 3 ?'active':'']" @click="addClass(3)">MBANKING</div>
      </div>
      <div class="cont-panel" :class="[active == 1 ?'show':'hide']">
        <div class="top">
          <p class="title">{{amount}}</p>
          <p class="subtitle">Jumlah</p>
          <p class="code">{{data}}</p>
          <p class="subtitle">Kode Pembayaran</p>
        </div>
        <i class="dash"></i>
        <div class="text-cont">
          <ol>
            <li>Pilih “Transfer” pada menu </li>
            <li>Pilih “Ke Bank Lain” pada menu </li>
            <li>Masukan kode bank “<span class="yellow">013</span>” dan pilih “Benar” </li>
            <li>Masukan Kode Pembayaran <span class="yellow">({{data}})</span> pada tujuan transfer</li>
            <!-- <li>Masukan nominal (<span class="yellow">{{amount}}</span>) dan pilih “Benar” .</li> -->
            <li>Masukan nominal yang harus dibayarkan dan pilih “Benar”</li>
            <li>Ikuti langkah selanjutnya sampai transaksi berhasil</li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 2 ?'show':'hide']">
        <div class="top">
          <p class="title">{{amount}}</p>
          <p class="subtitle">Jumlah</p>
          <p class="code">{{data}}</p>
          <p class="subtitle">Kode Pembayaran</p>
        </div>
<i class="dash"></i>
        <div class="text-cont">
          <p>Daftarkan VA anda untuk pertama kali</p>
          <ol>
            <li>Masuk ke Internet Banking atau Mobile Banking anda, kemudian pilih Daftar Rekening Tujuan. </li>
            <li>Pilih Rekening Bank Lain, kemudian klik "KIRIM" .</li>
            <li>Pilih Bank Tujuan "BANK PERMATA" </li>
            <li>Pilih Kota "JAKARTA".</li>
            <li>Pilih Kategori Penerima "Perusahaan".</li>
            <li>Pilih "YA" untuk Penduduk.</li>
            <li>Pilih "YA" untuk WNI</li>
            <li>Masukkan Nama Penerima “BLUEPAY”</li>
            <li>Masukkan No. Rekening Tujuan dengan Kode Pembayaran <span class="yellow">({{data}})</span> </li>
            <li>Masukkan 8 Angka yang tertera kedalam Key BCA Anda</li>
            <li>Masukkan Angka yang tertera setelah respon didapat dari Key BCA </li>
            <li>Lalu Klik Kirim</li>
          </ol>
          <p>Pembayaran VA yang sudah di daftarkan</p>
          <ol>
            <li>Masuk Ke Menu Transfer ke Rek Bank Lain Dalam Negri . </li>
            <li>Masukkan nomer rekening tujuan dengan nomor yang tadi didaftarkan .</li>
            <!-- <li>Masukkan nominal (<span class="yellow">{{amount}}</span>) </li> -->
            <li>Masukkan nominal yang ingin dibayarkan</li>
            <li>Masukkan berita sesuai dengan keinginan (optional).</li>
            <li>Untuk Layanan Transfer pilih LLG.</li>
            <li>Masukkan 8 Angka yang tertera ke dalam Key BCA Anda .</li>
            <li> Masukkan Respon yang terdapat dalam Key BCA anda kedalamnya</li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 3 ?'show':'hide']">
        <div class="top">
          <p class="title">{{amount}}</p>
          <p class="subtitle">Jumlah</p>
          <p class="code">{{data}}</p>
          <p class="subtitle">Kode Pembayaran</p>
        </div>
<i class="dash"></i>
        <div class="text-cont">
          <p>Daftarkan VA anda untuk pertama kali</p>
          <ol>
            <li>Masuk ke m-BCA. </li>
            <li>Masukkan kode akses.</li>
            <li>Pilih “m-Transfer”</li>
            <li>Pada kolom Daftar Transfer, pilih “Antar Bank”.</li>
            <li>Pilih bank “PERMATA”, lalu masukkan Kode Pembayaran <span class="yellow">({{data}})</span>.</li>
            <li>Klik “Send”.</li>
          </ol>
          <p>Pembayaran VA yang sudah di daftarkan.</p>
          <ol>
            <li>Masuk ke m-BCA. </li>
            <li>Masukkan kode akses.</li>
            <li>Pilih “m-Transfer”</li>
            <li>Pada kolom Transfer, pilih “Antar Bank”.</li>
            <li>Pilih bank “013-BANK PERMATA”.</li>
            <li>Pilih rekening tujuan yang sudah didaftarkan .</li>
            <!-- <li>Masukkan jumlah uang (<span class="yellow">{{amount}}</span>)</li> -->
            <li>Masukkan jumlah uang</li>
            <li>Lalu klik “Send”</li>
          </ol>
        </div>
      </div>
    </div>


    <!-- <div :class="method == 3 ? 'show': 'hide'">
      <div class="tab-cont">
        <div class="item" :class="[active == 1 ?'active':'']" @click="addClass(1)">ATM</div>
        <div class="item" :class="[active == 2 ?'active':'']" @click="addClass(2)">ONLINE</div>
        <div class="item" :class="[active == 3 ?'active':'']" @click="addClass(3)">MBANKING</div>
      </div>
      <div class="cont-panel" :class="[active == 1 ?'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Pilih menu “Bayar/Beli”. </li>
            <li>Pilih “Lainnya > Lainnya > Multipayment”.</li>
            <li>Isi kode perusahaan “70002” dan pilih “Benar”. </li>
            <li>Isi kode merchant “078” dan pilih “Benar”.</li>
            <li>Masukkan 8 digit terakhir Kode Pembayaran <span class="yellow">({{data}})</span> dan pilih “Benar”.</li>
            <li>Ikuti langkah selanjutnya sampai transaksi berhasil dengan nominal (<span class="yellow">{{amount}}</span>).</li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 2 ?'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Masuk ke situs <a href="https://ib.bankmandiri.co.id">https://ib.bankmandiri.co.id</a>. </li>
            <li>Lakukan log in dengan akun Mandiri Internet Banking Agan.</li>
            <li>Klik menu Bayar </li>
            <li>Pilih Multi Payment .</li>
            <li>Pilih lainnya > penyedia layanan > pilih DOKU.</li>
            <li>Isi kode merchant “078”.</li>
            <li> Masukkan Kode Pembayaran <span class="yellow">({{data}})</span> dengan 8 digit kode terakhir dan pilih “lanjut” </li>
            <li>Ikuti langkah selanjutnya hingga pembayaran selesai dengan nominal (<span class="yellow">{{amount}}</span>)</li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 3 ?'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Buka Aplikasi Mandiri Mobile Banking. </li>
            <li>Lakukan log in dengan akun Mandiri Mobile Banking.</li>
            <li>Pilih menu Bayar.</li>
            <li>Pilih Lainnya.</li>
            <li>Pilih Multi Payment.</li>
            <li>Pilih lainnya > penyedia layanan > pilih DOKU .</li>
            <li>Isi kode merchant “078” </li>
            <li>Masukkan Kode Pembayaran <span class="yellow">({{data}})</span> dengan 8 digit kode terakhir dan pilih “lanjut”</li>
            <li>Ikuti langkah selanjutnya hingga pembayaran selesai (<span class="yellow">{{amount}}</span>).</li>
          </ol>
        </div>
      </div>
    </div> -->


    <div :class="[method == 4 ? 'show':'hide']">
      <div class="tab-cont">
        <div class="item" :class="[active ==1 ? 'active':'']" @click="addClass(1)">ATM</div>
        <div class="item" :class="[active == 2 ? 'active':'']" @click="addClass(2)">ONLINE</div>
        <div class="item" :class="[active == 3 ? 'active':'']" @click="addClass(3)">MBANKING</div>
      </div>
      <div class="cont-panel" :class="[active ==1 ? 'show':'hide']">
        <div class="top">
          <p class="title">{{amount}}</p>
          <p class="subtitle">Jumlah</p>
          <p class="code">{{data}}</p>
          <p class="subtitle">Kode Pembayaran</p>
        </div>
<i class="dash"></i>  
        <div class="text-cont">
          <ol>
            <li>Masukkan kartu dan pin atm.</li>
            <li>Pilih menu “Transfer”.</li>
            <li>Pilih menu “Ke Rek Bank Lain”.</li>
            <li>Masukkan sandi Bank “013” dan pilih “Benar”. </li>
            <li>Masukkan nomor rekening (Kode Pembayaran) yang dituju dengan <span class="yellow">({{data}})</span>dan pilih “Benar”. </li>
            <!-- <li>Masukkan nominal isi ulang (<span class="yellow">{{amount}}</span>) dan pilih “Benar”.</li> -->
            <li>Masukkan nominal isi ulang dan pilih “Benar”</li>
            <li>Pilih “Benar” pada halaman konfirmasi</li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active ==2 ? 'show':'hide']">
        <div class="top">
          <p class="title">{{amount}}</p>
          <p class="subtitle">Jumlah</p>
          <p class="code">{{data}}</p>
          <p class="subtitle">Kode Pembayaran</p>
        </div>
<i class="dash"></i> 
        <div class="text-cont">
          <ol>
            <li>Login di <a href="javascript:void(0)" @click="openBrowser()"> https://ib.bri.co.id/ib-bri/</a> ,masukkan username dan password</li>
            <li>Pilih menu “Transfer” </li>
            <li>Pilih menu “Bank Lain”</li>
            <li>Pilih kode Bank “Bank PERMATA (013)”</li>
            <li>Masukkan nomor rekening (Kode Pembayaran) yang dituju dengan <span class="yellow">({{data}})</span></li>
            <!-- <li>Masukkan jumlah transfer (<span class="yellow">{{amount}}</span>)</li> -->
            <li>Masukkan jumlah transfer (nominal isi ulang)</li>
            <li>Pilih OK</li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 3 ? 'show':'hide']">
        <div class="top">
          <p class="title">{{amount}}</p>
          <p class="subtitle">Jumlah</p>
          <p class="code">{{data}}</p>
          <p class="subtitle">Kode Pembayaran</p>
        </div>
<i class="dash"></i> 
        <div class="text-cont">
          <ol>
            <li>Masuk ke aplikias BRI Mobile.</li>
            <li>Pilih menu “Transfer”. </li>
            <li>Pilih menu “Bank Lain”.</li>
            <li>Pilih kode Bank “Bank PERMATA” (013).</li>
            <li>Masukkan nomor rekening (Kode Pembayaran) yang dituju dengan <span class="yellow">({{data}})</span> . </li>
            <!-- <li>Masukkan jumlah transfer (<span class="yellow">{{amount}}</span>). </li> -->
            <li>Masukkan jumlah transfer (nominal isi ulang)</li>
            <li>Pilih OK </li>
          </ol>
        </div>
      </div>

    </div>
    <!-- 2019-03-29 -->
    <!-- <div :class="[method == 3 ? 'show':'hide']">
      <div class="tab-cont">
        <div class="item" :class="[active == 1 ? 'active':'']" @click="addClass(1)">ATM</div>
        <div class="item" :class="[active == 2 ? 'active':'']" @click="addClass(2)">ONLINE</div>
        <div class="item" :class="[active == 3 ? 'active':'']" @click="addClass(3)">MBANKING</div>
      </div>
      <div class="cont-panel" :class="[active == 1 ? 'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Pilih menu “Bayar/Beli”. </li>
            <li>Pilih “Lainnya > Lainnya > Multipayment”.</li>
            <li>Isi kode perusahaan “70002” dan pilih “Benar”.</li>
            <li>Isi kode merchant “078” dan pilih “Benar”</li>
            <li>Masukkan 8 digit terakhir Kode Pembayaran <span class="yellow">({{data}})</span> dan pilih “Benar”. </li>
            <li>Ikuti langkah selanjutnya sampai transaksi berhasil</li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 2 ? 'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Masuk ke situs <a href="https://ib.bankmandiri.co.id">https://ib.bankmandiri.co.id</a></li>
            <li>Lakukan log in dengan akun Mandiri Internet Banking Agan. </li>
            <li>Klik menu Bayar. </li>
            <li>Pilih Multi Payment</li>
            <li>Pilih lainnya > penyedia layanan > pilih DOKU. </li>
            <li>Isi kode merchant “078”</li>
            <li>Pilih “TRANSFER ANTAR REKENING BNI”, kemudian pilih rekening tujuan </li>
            <li>Masukkan Kode Pembayaran (<span class="yellow">{{amount}}</span>) dengan 8 digit kode terakhir dan pilih “lanjut”</li>
            <li> Ikuti langkah selanjutnya hingga pembayaran selesai.</li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 3 ? 'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Buka Aplikasi Mandiri Mobile Banking.</li>
            <li>Lakukan log in dengan akun Mandiri Mobile Banking.</li>
            <li>Pilih menu Bayar.</li>
            <li>Pilih Lainnya.</li>
            <li>Pilih Multi Payment. </li>
            <li>Pilih lainnya > penyedia layanan > pilih DOKU </li>
            <li>Isi kode merchant “078”</li>
            <li>Masukkan Kode Pembayaran (<span class="yellow">{{amount}}</span>) dengan 8 digit kode terakhir dan pilih “lanjut”</li>
            <li>Ikuti langkah selanjutnya hingga pembayaran selesai.</li>
          </ol>
        </div>
      </div>
    </div> -->
    <!-- 2019-03-30 -->
    <!-- <div :class="[method == 5  ? 'show':'hide']">
      <div class="tab-cont">
        <div class="item" :class="[active == 1 ? 'active':'']" @click="addClass(1)">ATM</div>
        <div class="item" :class="[active == 2 ? 'active':'']" @click="addClass(2)">ONLINE</div>
        <div class="item" :class="[active == 3 ? 'active':'']" @click="addClass(3)">MBANKING</div>
      </div>
      <div class="cont-panel" :class="[active == 1 ? 'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Masukkan kartu, pilih bahasa kemudian masukkan PIN Anda. </li>
            <li>Pilih "Menu Lainnya" lalu pilih "Transfer".</li>
            <li>Pilih "Tabungan" lalu "Rekening BNI Virtual Account".</li>
            <li>Masukkan nomor Virtual Account Kode Pembayaran <span class="yellow">({{data}})</span> dan nominal yang ingin Anda bayar. </li>
            <li>Periksa kembali data transaksi kemudian tekan "Ya"</li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 2 ? 'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Login di <a href="https://ibank.bni.co.id">https://ibank.bni.co.id</a>, masukkan User ID dan Password .</li>
            <li>Pilih “TRANSFER” lalu pilih “Tambah Rekening Favorit”. </li>
            <li>Jika Anda menggunakan desktop untuk menambah rekening, pilih “Transaksi” lalu pilih “Atur Rekening Tujuan” kemudian “Tambah Rekening Tujuan” </li>
            <li>Masukkan Nama dan nomor Virtual Account Kode Pembayaran <span class="yellow">({{data}})</span> Anda, lalu masukkan Kode Otentikasi Token .</li>
            <li>Jika Nomor rekening tujuan berhasil ditambahkan, kembali ke menu “TRANSFER”. </li>
            <li>Ikuti langkah selanjutnya sampai transaksi berhasil.</li>
            <li>Pilih “TRANSFER ANTAR REKENING BNI”, kemudian pilih rekening tujuan </li>
            <li>Pilih Rekening Debit dan ketik nominal, lalu masukkan kode otentikasi token</li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 3 ? 'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Login ke BNI Mobile Banking, masukkan User ID dan MPIN.</li>
            <li>Pilih menu "Transfer", lalu pilih "Antar Rekening BNI". </li>
            <li>Pilih "Input Rekening Baru"</li>
            <li>Masukkan "Rekening Debet", "Rekening Tujuan" Kode Pembayaran <span class="yellow">({{data}})</span> dan "Nominal"

              kemudian klik "Lanjut".</li>
            <li>Periksa kembali data transaksi Anda, masukkan “Password Transaksi” kemudian klik “Lanjut”. </li>
          </ol>
        </div>
      </div>

    </div> -->

    <div :class="[method == 10  ? 'show':'hide']">
      <div class="tab-cont">
        <div class="item" :class="[active == 1 ? 'active':'']" @click="addClass(1)">ATM</div>
        <div class="item" :class="[active == 2 ? 'active':'']" @click="addClass(2)">ONLINE</div>
        <div class="item" :class="[active == 3 ? 'active':'']" @click="addClass(3)">MBANKING</div>
      </div>
      <div class="cont-panel" :class="[active == 1 ? 'show':'hide']">
        <div class="top">
          <p class="title">{{amount}}</p>
          <p class="subtitle">Jumlah</p>
          <p class="code">{{data}}</p>
          <p class="subtitle">Kode Pembayaran</p>
        </div>
<i class="dash"></i>
        <div class="text-cont">
          <ol>
            <li>Masukkan Kartu ATM Permata dan PIN. </li>
            <li>Pilih “Transaksi Lainya” > Pilih “Transfer” > Pilih “Rekening NSB di Permata"</li>
            <li>Masukkan Kode Pembayaran <span class="yellow">({{data}})</span></li>
            <li>Masukkan nominal </li>
            <li>Ikuti Instruksi untuk menyelesaikan transaksi</li>
          </ol>
        </div>
      </div>
      <div class="cont-panel" :class="[active == 2 ? 'show':'hide']">
        <div class="top">
          <p class="title">{{amount}}</p>
          <p class="subtitle">Jumlah</p>
          <p class="code">{{data}}</p>
          <p class="subtitle">Kode Pembayaran</p>
        </div>
<i class="dash"></i>
        <div class="text-cont">
          <ol>
            <li>Kunjungi Internet Banking Permata</li>
            <li>Masukkan User Name dan Password </li>
            <li>Pilih Pembayaran > Tagihan Pembayaran > Virtual Account</li>
            <li>Masukan “Billing Number” dengan mengetikan “Kode Pembayaran” yang ada</li>
            <li>Masukan nominal yang harus di bayar dan pilih “Lanjut” </li>
            <li>Ikuti langkah selanjutnya sampai transaksi di nyatakan berhasil.</li>

          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 3 ? 'show':'hide']">
       <div class="top">
          <p class="title">{{amount}}</p>
          <p class="subtitle">Jumlah</p>
          <p class="code">{{data}}</p>
          <p class="subtitle">Kode Pembayaran</p>
        </div>
<i class="dash"></i>
        <div class="text-cont">
          <ol>
            <li>Buka Aplikasi Mobile Banking Permata di HP</li>
            <li>Masukkan User Name dan Password </li>
            <li>Pilih Pembayaran > Virtual Account > Pilih Rekening untuk Pembayaran > Pilih Tagihan Baru > Masukkan Kode Pembayaran <span class="yellow">({{data}})</span></li>
            <li>Masukkan Nominal</li>
            <li>Ikuti langkah selanjutnya sampai transaksi di nyatakan berhasil. </li>
          </ol>
        </div>
      </div>

    </div>
    <div :class="[method == 6 || method == 3||method == 5 ? 'show':'hide']">
      <div class="tab-cont">
        <div class="item" :class="[active == 1 ? 'active':'']" @click="addClass(1)">ATM</div>
        <div class="item" :class="[active == 2 ? 'active':'']" @click="addClass(2)">ONLINE</div>
        <div class="item" :class="[active == 3 ? 'active':'']" @click="addClass(3)">MBANKING</div>
      </div>
      <div class="cont-panel" :class="[active == 1 ? 'show':'hide']">
        <div class="top">
          <p class="title">{{amount}}</p>
          <p class="subtitle">Jumlah</p>
          <p class="code">{{data}}</p>
          <p class="subtitle">Kode Pembayaran</p>
        </div>
<i class="dash"></i>
        <div class="text-cont">
          <ol>
            <li>Pilih “Transfer” pada menu </li>
            <li>Pilih “Ke Bank Lain” pada menu </li>
            <li>Masukan kode bank “013” dan pilih “Benar”</li>
            <li>Masukan Kode Pembayaran <span class="yellow">({{data}})</span> pada tujuan transfer </li>
            <li>Masukan nominal yang harus dibayarkan dan pilih “Benar” </li>
            <li>Ikuti langkah selanjutnya sampai transaksi berhasil</li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 2 ? 'show':'hide']">
        <div class="top">
          <p class="title">{{amount}}</p>
          <p class="subtitle">Jumlah</p>
          <p class="code">{{data}}</p>
          <p class="subtitle">Kode Pembayaran</p>
        </div>
<i class="dash"></i>
        <div class="text-cont">
          <ol>
            <li>Pilih “Transfer” pada menu </li>
            <li>Pilih “Ke Bank Lain” pada menu </li>
            <li>Masukan kode bank “Bank Permata <span class="yellow">(013)</span> ”</li>
            <li>Masukan Kode Pembayaran <span class="yellow">({{data}})</span> pada tujuan transfer</li>
            <li>Masukan nominal yang harus dibayarkan dan pilih “OK” </li>
            <li>Ikuti langkah selanjutnya sampai transaksi berhasil.</li>

          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 3 ? 'show':'hide']">
        <div class="top">
          <p class="title">{{amount}}</p>
          <p class="subtitle">Jumlah</p>
          <p class="code">{{data}}</p>
          <p class="subtitle">Kode Pembayaran</p>
        </div>
<i class="dash"></i>
        <div class="text-cont">
          <ol>
            <li>Pilih “Transfer” pada menu</li>
            <li>Pilih “Ke Bank Lain” pada menu </li>
            <li>Masukan kode bank “Bank Permata <span class="yellow">(013)</span>”</li>
            <li>Masukan Kode Pembayaran <span class="yellow">({{data}})</span> pada tujuan transfer</li>
            <li>Masukan nominal yang harus dibayarkan dan pilih “OK” </li>
            <li> Ikuti langkah selanjutnya sampai transaksi berhasil</li>
          </ol>
        </div>
      </div>

    </div>
    <!-- <div :class="(method != 1 && method != 2 && method != 3 && method != 4 && method != 5) ? 'show':'hide'">
      <div class="tab-cont">
        <div class="item" :class="[active == 1 ?'active':'']" @click="addClass(1)">ATM</div>
        <div class="item" :class="[active == 2 ?'active':'']" @click="addClass(2)">ONLINE</div>
        <div class="item" :class="[active == 3 ?'active':'']" @click="addClass(3)">MBANKING</div>
      </div>
      <div class="cont-panel" :class="[active == 1 ? 'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Pilih “Transfer” pada menu.</li>
            <li>Pilih “Ke Bank Lain” pada menu.</li>
            <li>Masukkan kode bank “<span class="yellow">009</span>” dan pilih “Benar”. </li>
            <li>Masukan Kode Pembayaran（<span class="yellow">{{data}}</span>) pada tujuan transfer.</li>
            <li>Masukan nominal (<span class="yellow">{{amount}}</span>) dan pilih “Benar” </li>
            <li>Ikuti langkah selanjutnya sampai transaksi berhasil. </li>
          </ol>
        </div>
      </div>

      <div class="cont-panel" :class="[active == 2 ? 'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Pilih “Transfer” pada menu. </li>
            <li>Pilih “Ke Bank Lain” pada menu. </li>
            <li>Masukkan kode bank "Bank BNI(<span class="yellow">009</span>)"</li>
            <li>Masukkan "Kode Pembayaran"<span class="yellow">({{data}})</span> pada tujuan transfer</li>
            <li>Masukan nominal (<span class="yellow">{{amount}}</span>)dan pilih "OK".</li>
            <li>Ikuti langkah selanjutnya sampai transaksi berhasil.</li>
          </ol>
        </div>
      </div>


      <div class="cont-panel" :class="[active == 3 ? 'show':'hide']">
        <p class="title">{{amount}}</p>
        <p class="subtitle">Jumlah</p>
        <p class="code">{{data}}</p>
        <p class="subtitle">Kode Pembayaran</p>
        <div class="text-cont">
          <ol>
            <li>Pilih “Transfer” pada menu. </li>
            <li>Pilih “Ke Bank Lain” pada menu.</li>
            <li>Masukkan kode bank "Bank BNI(<span class="yellow">009</span>)"</li>
            <li>Masukkan "Kode Pembayaran"<span class="yellow">({{data}})</span> pada tujuan transfer</li>
            <li>Masukan nominal (<span class="yellow">{{amount}}</span>) dan pilih “OK”</li>
            <li>Ikuti langkah selanjutnya sampai transaksi berhasil.</li>
          </ol>
        </div>
      </div>
    </div> -->

  </div>

</div>
</template>
<script>
import BHeader from "../common/BHeader"
let Base64 = require('js-base64').Base64;


export default {
  name: 'Process',
  components: {
    BHeader
  },
  data() {
    return {
      data: null,
      tab: '',
      html: '',
      method: parseInt(this.$route.query.method),
      active: 1,
      amount: this.$route.query.m
    }
  },
  methods: {
    openBrowser(){
      window.AndroidWebView.goBrowser('https://ib.bri.co.id/ib-bri/')
    },
    setTitle() {
      let method = this.method;
      if (method == 1) {
        return "Bayar di Alfamart"
      } else if (method == 2) {
        return "BCA"
      } else if (method == 3) {
        return "Mandiri"
      } else if (method == 4) {
        return "BRI"
      } else if (method == 5) {
        return "BNI"
      } else if (method == 6) {
        return "Bank Lain"
      } else if (method == 7) {
        return "MEGA"
      } else if (method == 8) {
        return "PANIN"
      } else if (method == 9) {
        return "DANAMON"
      } else if (method == 10) {
        return "PERMATA"
      } else if (method == 11) {
        return "BII"
      }

    },
    setTab() {
      let method = this.getQueryString("method");
      if (method == 2) {
        this.tab = '<div class="tab-cont"><div class="item active">ATM</div><div class="item">ONLINE</div><div class="item">MBANKING</div></div>'
      } else if (method == 3) {
        this.tab = '<div class="mandiri tab-cont"><div class="item active">ATM</div><div class="item">ONLINE</div></div>'
      }
    },
    addClass(index) {
      this.active = index
    },
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },

    getData() {

      let token = this.getAppToken()
      this.$http({
        url: '/api/recharge/code/generate?t=' + (new Date()).getTime(),
        method: 'post',
        data: {
          token: token,
          amount: this.$route.query.m,
          method: this.$route.query.method
        }
      }).then((res) => {
        if (res.data.status.code == 200) {
          this.data = res.data.data

        } else {

        }

      }).catch((res) => {
        console.log('error: ', res);
      });

    },

  },
  mounted() {
    this.getData()
    this.setTab()
    console.log(this.method)
  }
}
</script>
<style >
 @import "../../assets/css/recharge.css";
</style>

