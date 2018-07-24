var keystone = require('keystone');

var coupons = new keystone.List('coupons');

coupons.add({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    chips: {
        type: String
    },
    coupon_code: {
        type: String,
        default: 'cjhbcajxhbasxkasbxkjb'
    },
    redeem: {
        type: Boolean,
        default: false
    },
    refer_id: {
        type: String
    },
    update_at: {
        type: Date,
        default: Date.now()
    }
});
coupons.defaultColumns = 'firstname, email|20%, chips, coupon_code, update_at|20%, redeem|20%';

coupons.register();