import axiosInstance from "../helpers/axiosInstance.js";



export async function getUserAppointments() {
    const request = await axiosInstance.get('appointments')
    return request
}
export async function getAppointmentsPerDate(date) {
    const request = await axiosInstance.get('appointment'+ '?date=' + date)
    return request
}

export async function getGoals() {
    const request = await axiosInstance.get('goal')
    return request
}
export async function getGoalType() {
    const request = await axiosInstance.get('goal')
    return request
}

export async function getUsersList() {
    const request = await axiosInstance.get('users')
    return request
}

export async function getProperties() {
    const request = await axiosInstance.get('property')
    return request
}

export async function getClientsList() {
    const request = await axiosInstance.get('clients')
    return request
}

export async function getClientsFilter(str) {
    const request = await axiosInstance.get('clients?filter='+str)
    return request
}

export async function addProperty(propertyInfo) {
    const request = await axiosInstance.post('property', propertyInfo)
    return request
}

export async function addUser(values) {
    const request = await axiosInstance.post('users', values)
    return request
}
export async function getUser(id) {
    const request = await axiosInstance.get('users/' + id)
    return request
}
export async function updateUser(id, values) {
    const request = await axiosInstance.put('users/' + id, values)
    return request
}
export async function addClient(values) {
    const request = await axiosInstance.post('clients', values)
    return request
}
export async function authUser() {
    const request = await axiosInstance.get('me')
    return request
}