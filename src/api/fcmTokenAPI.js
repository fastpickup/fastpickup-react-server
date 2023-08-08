import axios from "axios"

// 주문 시 유저의 정보를 보냄
export const postToken = async(params) => {

    const res = await axios.post(`http://localhost:8080/api/fcm/token`,params)

    return res.data

}

// 주문 시 사용자에게 FCM으로 알람을 보냄
export const createFcmOrderAndToken = async(params) => {

    const res = await axios.post(`http://localhost:8080/api/v1/notification`,params)

    return res.data

}
