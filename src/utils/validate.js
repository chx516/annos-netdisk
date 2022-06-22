//验证用户名是否为数字
export function checkNumber(theObj) {
    var reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(theObj)) {
      return true;
    }
    return false;
  }
//校验邮箱
export function validateMail(mail){
    if(mail!=""){
      var strRegex = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
      if(!strRegex.test(mail)){
        return false;
      }
    }
    return true;
  }

//验证密码规则
export function checkPasswd(passwd){
  if(passwd!=""){
    let reg = /^(?![^a-zA-Z]+$)(?!\D+$)/;
    if(passwd.length<6){
      return '密码不能少于6位数'
    }
    else if(!reg.test(passwd)){
      return "密码至少一位数字和一位字母"
    }
    return true
  }
}
  