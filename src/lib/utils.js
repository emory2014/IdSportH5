export default{
    parseMoney(str){
        str = str.toString()
        let i = str.length
        if(i <= 3){
            return str;
        }
        else if(i > 3 && i <= 6){
            return str.substring(0,i-3)+","+str.substring(i-3)
        }else if(i > 6 && i <= 9){
           return str.substring(0,i-6)+","+str.substring(i-6,i-3)+","+str.substring(i-3)
        }else{
            return str
        }
    }
}