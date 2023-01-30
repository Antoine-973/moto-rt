import axios from 'axios'
import { ROOMS_URI } from '@/common/api-ressources/api.ressources.uri'

class RoomsService {
    getRooms() {
        return axios
            .get(ROOMS_URI)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }

    getRoom(id) {
        return axios
            .get(`${ROOMS_URI}/${id}`)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }

    createRoom(room) {
        return axios.post(ROOMS_URI, {
            name: room.name,
            description: room.description,
            limit: room.limit,
        })
    }

    updateRoom(room) {
        return axios.put(`${ROOMS_URI}/${room.id}`, {
            name: room.name,
            description: room.description,
        })
    }

    deleteRoom(id) {
        return axios.delete(`${ROOMS_URI}/${id}`)
    }
}

export default new RoomsService()