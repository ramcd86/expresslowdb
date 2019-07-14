export const UtilitySerice = {
    httpGet(url, package) {
        const headers = {
            name: '',
            value: ''
        }
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.timeout = 2000;
            request.onreadystatechange = function (e) {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        console.log(request.response);
                        resolve(request.response);
                    } else {
                        console.log(request.status);
                        reject(request.status);
                    }
                }
            };
            request.ontimeout = function () {
                reject("The operation timed out.");
            };
            request.open('get', url, true);
            request.setRequestHeader(authPackage.tokenName, authPackage.token);
            request.send();
        });
    },
    httpPost(url, package) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.timeout = 2000;
            request.open('POST', url, true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(loginPackage));
            request.onreadystatechange = (e) => {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        responseObject = JSON.parse(request.response);
                        authPackage.token = responseObject.token
                        console.log(authPackage);
                        resolve(request.response);
                    } else {
                        console.log(request.response);
                        reject(request.status);
                    }
                }
            };
            request.timeout = () => {
                reject("The operation timed out.");
            };
        });
    }
}

export const config = {
    API: 'http://localhost:4200'
}