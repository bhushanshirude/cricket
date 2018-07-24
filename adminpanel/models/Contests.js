var keystone = require('keystone');
var Types = keystone.Field.Types;
var Contest = new keystone.List('Contests', {
    map: {
        name: 'title'
    }
});

Contest.add({
    match_key: {
        type: Types.Relationship,
        ref: 'CricketMatches',
        index: true
    },
    title: {
        type: String,
        index: true
    },
    contests: {
        contestKey: {
            type: Number,
            index: true,
            label: 'Contest Key'
        },
        winningAmount: {
            type: Types.Number,
            initial: true,
            default: '00.00',
            label: 'Winning Amount'
        },
        contestSize: {
            type: Types.Number,
            initial: true,
            default: '00',
            label: 'Contest Size',
            'state': 'published',
            'mainPost': true
        },
        contestEntryFee: {
            type: Types.Number,
            readonly: 'readonly',
            watch: true,
            value: checkTotal,
            label: 'Contest Entry Fee'
        },
        referralCode: {
            type: String,
            index: true,
            label: 'Referal Code'
        },
        contestCreatedBy: {
            type: Types.Select,
            options: 'Admin',
            default: 'Admin',
            index: true,
            label: 'Created By'
        },
        allowMultipleTeam: {
            type: Boolean,
            label: 'Allow Multiple Team',
            index: true
        },
    },
});

Contest.defaultColumns = 'match_key, contests.contestKey|10%, contests.winningAmount|10%, contests.contestSize|10%, contests.contestEntryFee|10%, contests.allowMultipleTeam|10%';
Contest.register();

function checkTotal() {
    return (this.contests.winningAmount / this.contests.contestSize) * 0.15 / 100;
}

/*
            function: function() {
                var x, y, sum;
                x = parseFloat(document.getElementById('contestPrice').value);
                y = parseFloat(document.getElementById('contestSize').value);
                sum = x + y;
                document.getElementById('contestEntryFee').value = sum;
            }
*/