require('dotenv').config();

function envFor(name, defaultValue = null) {
    if (process.env[`SC_${name}`] != undefined) {
        return process.env[`SC_${name}`]
    }
    return defaultValue
}
class AppConfig {
    constructor() {
        this.name = 'CricketAPI Spider';
        this.port = envFor("PORT", 3000);
        this.enable_memcache = envFor("ENABLE_MEMCACHE", false);
        if (this.enable_memcache == 'true') {
            this.enable_memcache = true;
        } else {
            this.enable_memcache = false;
        }
        this.path = {
            static: '/static'
        };

        this.img = {
            static: 'https://s3-ap-southeast-1.amazonaws.com/litzscore/'
        }

        this.backend = {
            host: 'https://rest.cricketapi.com',
            spiderHost: 'https://rest.cricketapi.com', //'http://localhost:5000',
            path: '/',
        };

        this.auth = {
                app_id: 152846625356665, // get it from .env
                access_key: "e5508521e2006e82680129419e5450a2",
                secret_key: "e40b2dde9a5cb2dbb813eda292686d46",
                device_id: "192.168.0.18"
            }
            // Or Else directly use can put your creditentials here
            // this.auth = {
            //     app_id: "APP_ID",
            //     access_key: "ACCESS_KEY",
            //     secret_key: "SECRET_KEY",
            //     device_id: "DEVICE_ID"
            // }
    }
}

module.exports = new AppConfig();