/**
 * @module
 * 装备额外属性收益
 * 289. **35.6cm三連装砲改(ダズル迷彩仕様)**
 */

module.exports = [

    // @ 比叡改二 / 霧島改二
    {
        equipment: 289,
        ship: {
            isID: [150, 152]
        },
        bonus: {
            fire: 1,
        }
    },

    {
        equipment: 289,
        ship: {
            isID: [
                149, // 金剛改二
                591, // 金剛改二丙
            ]
        },
        bonus: {
            fire: 2,
            aa: 1,
        }
    },

    // @ 榛名改二
    {
        equipment: 289,
        ship: {
            isID: [151]
        },
        bonus: {
            fire: 2,
            aa: 2,
            evasion: 2,
        }
    },

    // ------------------------------------------------------------------------

    // @ 金剛型 改二
    {
        list: [
            289,
            'SurfaceRadar',
        ],
        equipments: {
            hasID: [289],
            hasSurfaceRadar: true,
        },
        ship: {
            isID: [
                149, // 金剛改二
                591, // 金剛改二丙
                151, // 榛名改二
            ]
        },
        bonus: {
            fire: 2,
            evasion: 2,
        }
    },

]
