<template>
<div class="news-detail-container">
    <div class="news-cont">
        <p class="news-title">
            Ekonom Sesalkan Pandangan JK Soal  Rupiah Loyo Dorong Ekspor
        </p>
        <p class="date-sec">
            <span >2018-05-09 19:08</span>
            <span class="text-right">Sumber: Viva</span>
        </p>
        <div class="text-sec">
            <img src="../../assets/images/news.jpg" />
            <p>
                VIVA – Kepala Pusat Studi Ekonomi dan Kebijakan Publik Universitas Gajah Mada, 
                Tony Prastiantono, menepis pandangan Wakil Presiden Jusuf Kalla yang mengatakan pelemahan 
                nilai tukar rupiah terhadap dolar AS bisa menggenjot ekspor maupun meningkatkan keuntungan 
                para eksportir.
            </p>
            <p>
                Dia mengutarakan, jika dirujuk pada tren pelemahan rupiah yang terjadi pada masa kini, 
                di mana hanya melemah dari kisaran Rp13 ribu menuju Rp14 ribu tidaklah bisa dikatakan 
                mampu mendorong ekspor secara signifikan, sebab rentang pelemahan tersebut menurutnya 
                tidak elastisitas sebagaimana yang terjadi ketika tahun 1998, yang melemah dari Rp2.300
                 ke Rp17 ribu.
            </p>
            <p>
                "Waktu itu memang dengan lemahnya rupiah sooner or later Indonesia mendapatkan manfaat, 
                yaitu ekspor kita naik. Bahkan mabel di Jogja waktu itu orang bongkar rumah dijual ke luar negeri saking murahnya. 
                Jadi memang waktu itu harus diakui pelemahan rupiah jadi faktor pelan pelan Indonesia recover. 
                Tapi sekarang situasinya beda," ujarnya di Jakarta, Rabu 9 Mei 2018.
            </p>
        </div>
        <div class="like-sec">
            <i class="icon-zan"></i>
            <i class="icon-cai"></i>
            <p class="like-num-sec">
                <span>8</span>
                <span>0</span>
            </p>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        name: 'NewsDetail',
        data(){
            return {

            }
        },
        props: {
            title: String
        },
        methods: {
            goBack(){
                window.history.go(-1)
        },
        }
    }
</script>
<style>
body{
    margin: 0;
}
.news-detail-container {

}
.news-title {
    font-size: 18px;
    color: #333333;
    font-weight: bold;
    text-align: left;
    width: 92%;
    margin: 15px auto;
}
.date-sec {
    font-size: 14px;
    color: #999999;
    width: 92%;
    margin: 15px auto;
}

.text-right {
    float: right;
}
.news-cont {
    border-bottom: 10px solid #f5f5f5;
}

.text-sec {
    text-align: center
}

.text-sec img {
    width: 92%;
}

.text-sec p {
    color: #333333;
    font-size: 16px;
    margin-bottom: 20px;
    width: 92%;
    margin: 15px auto;
    line-height: 1.5;
    text-align: left;
}

.like-sec {
    text-align: center;
}
.icon-zan, .icon-cai {
    display: inline-block;
    width: 50px;
    height: 50px;
    
}

.icon-zan {
    background: url(../../assets/images/icon-zan.png) no-repeat center;
    background-size: 50px 50px;
    margin: 15px 35px 0 35px;
}

.icon-cai {
    background: url(../../assets/images/icon-cai.png) no-repeat center;
    background-size: 50px 50px;
    margin: 15px 35px 0 35px;
}

.like-num-sec {
    color: #333333;
    font-size: 17px;
    margin: 0 0 12px 0;
    line-height: 1.5;
}

.like-num-sec span {
    display: inline-block;
    margin: 0 35px;
    width: 50px;
}
</style>