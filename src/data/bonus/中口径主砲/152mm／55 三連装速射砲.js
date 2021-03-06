/**
 * @module
 * 装备额外属性收益
 * 340. **152mm/55 三連装速射砲**
 * 341. **152mm/55 三連装速射砲改**
 */

const { CL_Abruzzi, CL_Gotland, CLV_Gotland } = require('../../ship-classes');

module.exports = [
    // ========================================================================
    // 152mm/55 三連装速射砲
    // https://wikiwiki.jp/kancolle/152mm%EF%BC%8F55%20%E4%B8%89%E9%80%A3%E8%A3%85%E9%80%9F%E5%B0%84%E7%A0%B2
    // ========================================================================
    {
        equipment: 340,
        ship: {
            isClass: [CL_Abruzzi],
        },
        bonus: {
            fire: 1,
            aa: 1,
            evasion: 1,
        },
    },

    // ========================================================================
    // 152mm/55 三連装速射砲改
    // https://wikiwiki.jp/kancolle/152mm%EF%BC%8F55%20%E4%B8%89%E9%80%A3%E8%A3%85%E9%80%9F%E5%B0%84%E7%A0%B2%E6%94%B9
    // ========================================================================
    {
        equipment: 341,
        ship: {
            isClass: [CL_Gotland, CLV_Gotland],
        },
        bonus: {
            fire: 1,
            aa: 1,
            evasion: 1,
        },
    },
    {
        equipment: 341,
        ship: {
            isClass: [CL_Abruzzi],
        },
        bonus: {
            fire: 2,
            aa: 1,
            evasion: 1,
        },
    },
];
