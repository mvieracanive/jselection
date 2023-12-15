export class HttpException extends Error {
    statusCode: number
    type: string

    constructor(statusCode: number, message: string) {
        super(message)

        this.statusCode = statusCode
        switch(statusCode) {
            case 404: this.type = 'NotFound'
            default: this.type = 'InternalServerError'
        } 
    }
}
