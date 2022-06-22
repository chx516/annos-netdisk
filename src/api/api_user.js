import request from '@/utils/request'
const headers={'Content-Type': 'application/json;charset=UTF-8'}

export function login(data) {
    return request({
      url: '/login/login',
      method: 'post',
      data
    })
  }

export function register(data) {
    return request({
      url: '/register/register',
      method: 'post',
      data
    })
  }
export function getUserExist(data){
    return request({
            url:"/login/exist",
            method:"post",
            headers: headers,
            // withcredentials:true,
            data
        })
       
}

export function getUserEmail(data){
    return request({
        url:"/register/getEmail",
        method:"post",
        headers:headers,
        // withcredentials:true,
        data
    })
}

export function sendEmailcode(data){
    return request({
        url:"/register/sendEmailcode",
        method:"post",
        headers:headers,
        // withcredentials:true,
        data
    })
}

export function checkEmailcode(data){
    return request({
        url:"/register/checkEmailcode",
        method:"post",
        headers:headers,
        // withcredentials:true,
        data
    })
}

export function repassR(data){
  return request({
    url:"/repass/send",
    method:"post",
    headers:headers,
    data
})
}
