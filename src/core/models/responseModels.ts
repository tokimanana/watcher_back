export default interface responseModel<T>{
    code: number
    message: string
    success: boolean
    meta?: object
    data: T
}
