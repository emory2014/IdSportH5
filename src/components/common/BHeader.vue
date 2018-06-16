<template>
<header class="header">
            　<i class="nc-icon-prev" @click="goBack()"></i>
              <div>{{title}}</div>
        </header>
</template>
<script>
    export default {
        name: 'BHeader',
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

    .header {
    position: relative;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: #333333;
    background: #fff;
    margin-bottom: 8px;
    font-family: SourceHanSansCN-Medium;
    width: 100%;

}

.header div{
    width: 80%;
    margin: auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.nc-icon-prev{
    position: absolute;
    left: 15px;
    top: 13px;
    display: block;
    background: url(../../assets/images/prev.png);
    height: 25px;
    width: 20px;
    background-size: 20px 25px;
}
</style>