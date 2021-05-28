const paystack = (request) => {
    const MySecretKey = 'Bearer sk_test_db4117a39f856f2af087783c98f875a260e6954d';

    const initializePayment = (form, mycallback) => {
        const options = {
            url: 'https://api.paystack.co/transaction/initialize',
            headers: {
                authorization: MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            },
            form
        }

        const callback = (error, response, body) => {
            // console.log(response);
            return mycallback(error, body);
        }
        request.post(options, callback);
    }

    const verifyPayment = (ref, mycallback) => {
        const options = {
            url: 'https://api.paystack.co/transaction/verify/'+encodeURIComponent(ref),
            headers: {
                authorization: MySecretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            }
        }
        const callback = (error, response, body) =>{
            return mycallback(error, body);
        }
        request(options, callback);
    }

    return {initializePayment, verifyPayment};
}

module.exports = paystack;