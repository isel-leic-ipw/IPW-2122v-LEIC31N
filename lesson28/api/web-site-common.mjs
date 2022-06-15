import handleError from './http-errors.mjs'

export default function handlerWrapper(handler) {
    return async function(req, rsp) {
        // This code is equivalent to the following code with async/await
        // handler(req,rsp).catch(e => { const error = handleError(e) 
        //     rsp.status(error.status).json(error.body)})

        try {
            await handler(req, rsp)
        } catch(e) {
           const error = handleError(e) 
           rsp.status(error.status).json(error.body)
        }    
    }
}
