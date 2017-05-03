const vars = require('../variables')
const {
    getSpeed,
    getRange
} = require('../helpers')
const ItemBase = require('./base.js')

module.exports = class Ship extends ItemBase {
    constructor(data) {
        super(data);
    }

    /**
     * @param {string} joint - OPTIONAL - 连接符，如果存在后缀名，则在舰名和后缀名之间插入该字符串
     * @param {bollean} joint - OPTIONAL - 如果为 true，则添加默认连接符；false，则不添加连接符
     * @param {null} joint - OPTIONAL - 不添加连接符
     * @param {string} language - OPTIONAL - 语言代码，默认为 KCTip.lang
     * @return {string} 舰名 + 连接符（如果有） + 后缀名（如果有）
     * 快捷方式 - ship._name (默认连接符，默认语言)
     */
    getName(theJoint = vars.joint, theLocale = vars.locale) {
        let suffix = this.getSuffix(theLocale)
        return this.getNameNoSuffix(theLocale) + (suffix
            ? (
                (theJoint === true ? vars.joint : theJoint)
                + suffix
            )
            : ''
        )
    }

    /*	获取舰名，不包括后缀
        变量
            language	[OPTIONAL]
                String		语言代码，默认为 KC.lang
        返回值
            String		舰名，不包括后缀
    */
    getNameNoSuffix(theLocale = vars.locale) {
        return this.name[theLocale] || this.name.ja_jp
    }

    /*	获取后缀名
        变量
            language	[OPTIONAL]
                String		语言代码，默认为 KC.lang
        返回值
            String		后缀名
    */
    getSuffix(theLocale = vars.locale) {
        return this.name.suffix
            ? (
                vars.db.ship_namesuffix[this.name.suffix][theLocale]
                || vars.db.ship_namesuffix[this.name.suffix].ja_jp
                || ''
            )
            : ''
    }

    /*	获取舰种
        变量
            language	[OPTIONAL]
                String		语言代码，默认为 KC.lang
        返回值
            String		舰种
        快捷方式
            ship._type	默认语言
    */
    getType() {
        return this.type
            ? vars.db.ship_types[this.type].full_zh
            : null
    }
    get _type() {
        return this.getType()
    }

    /*	获取系列数据
        返回值
            Object		系列
    */
    getSeriesData() {
        return this.series
            ? vars.db.ship_series[this.series].ships
            : [{
                'id': this.id
            }]
    }
    get _series() {
        return this.getSeriesData()
    }

    /**
     * 获取图鉴uri/path
     * 
     * @param {number} [picId = 0] - 图鉴Id，默认 0
     * @param {string} [ext]
     * @returns {string} uri/path
     * 
     * @memberOf Ship
     * 
     * 快捷方式
     *      ship._pics	获取全部图鉴，Array
     */
    getPic(picId = 0, ext = vars.extPic) {
        let series = this.getSeriesData()
        picId = parseInt(picId)

        const getUrl = (id, picId) => `${vars.pathPics.ships || ''}/${id}/${picId}${ext}`

        for (let i = 0; i < series.length; i++) {
            if (series[i].id == this.id) {
                switch (picId) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 12:
                    case 13:
                    case 14:
                        return getUrl(this.id, picId)
                    //break;
                    default:
                        if (series[i].illust_delete) {
                            return getUrl(series[i - 1].id, picId)
                        } else {
                            return getUrl(this.id, picId)
                        }
                    //break;
                }
                //break;
            }
        }
    }
    get _pics() {
        let arr = []
        for (let i = 0; i < 15; i++) {
            arr.push(this.getPic(i))
        }
        return arr
    }

    getSpeed() {
        return getSpeed(this.stat.speed)
    }
    get _speed() {
        return this.getSpeed()
    }

    getSpeedRule() {
        if (this.name.ja_jp === '天津風') return 'high-b'
        return this.class
            ? vars.db.ship_classes[this.class].speed_rule
            : 'low-2'
    }
    get _speedRule() {
        return this.getSpeedRule()
    }

    getRange() {
        return getRange(this.stat.range)
    }
    get _range() {
        return this.getRange()
    }

    getEquipmentTypes() {
        return vars.db.ship_types[this.type].equipable.concat((this.additional_item_types || [])).sort(function (a, b) {
            return a - b
        })
    }

    getAttribute(attr, lvl = 1) {
        if (lvl > vars.maxShipLv) lvl = vars.maxShipLv

        const getStatLvl = (lvl = 1, base, max) => {
            base = parseFloat(base)
            max = parseFloat(max) || base
            if (base < 0 || max < 0)
                return -1
            if (base == max)
                return max
            return Math.floor(base + (max - base) * lvl / 99)
        }

        let value

        switch (attr) {
            case 'hp':
                value = this.stat.hp
                if (lvl > 99) {
                    if (this.stat.hp >= 90) value = this.stat.hp + 9
                    else if (this.stat.hp >= 70) value = this.stat.hp + 8
                    else if (this.stat.hp >= 50) value = this.stat.hp + 7
                    else if (this.stat.hp >= 40) value = this.stat.hp + 6
                    else if (this.stat.hp >= 30) value = this.stat.hp + 5
                    else value = this.stat.hp + 4
                    if (value > this.stat.hp_max) value = this.stat.hp_max
                }
                return value
            //break;
            case 'speed':
                return getSpeed(this.stat.speed)
            //break;
            case 'range':
                return getRange(this.stat.range)
            //break;
            case 'luck':
                if (lvl > 99)
                    return (this.stat.luck + 3)
                return this.stat.luck
            //break;
            case 'fuel':
            case 'ammo':
                if (lvl > 99)
                    return Math.floor(this.consum[attr] * 0.85)
                return this.consum[attr]
            //break;
            case 'aa':
            case 'armor':
            case 'fire':
            case 'torpedo':
                return this.stat[attr + '_max'] || this.stat[attr]
            //break;
            default:
                return getStatLvl(lvl, this.stat[attr], this.stat[attr + '_max'])
            //break;
        }
    }

    /*	获取关系
        变量
            relation	[OPTIONAL]
                String		关系名
        返回值
            Object			如果没有给出 relation，返回关系对象
            String||Number	如果给出 relation，返回值，默认读取 rels 下的属性，如果不存在，读取上一个改造版本的对应关系
    */
    getRel(relation) {
        if (relation) {
            if (!this.rels[relation] && this.remodel && this.remodel.prev) {
                let prev = vars.db.ships[this.remodel.prev]
                while (prev) {
                    if (prev.rels && prev.rels[relation])
                        return prev.rels[relation]
                    if (!prev.remodel || !prev.remodel.prev)
                        prev = null
                    else
                        prev = vars.db.ships[prev.remodel.prev]
                }
            }
            return this.rels[relation]
        } else {
            return this.rels
        }
    }

    /*	获取声优
        变量
            language	[OPTIONAL]
                String		语言代码，默认为 KC.lang
        返回值
            String		声优名
        快捷方式
            ship._cv	默认语言
    */
    getCV(theLocale = vars.locale) {
        let entity = this.getRel('cv')
        if (entity)
            return vars.db.entities[entity].getName(theLocale)
        return
    }
    get _cv() {
        return this.getCV()
    }

    /*	获取画师
        变量
            language	[OPTIONAL]
                String		语言代码，默认为 KC.lang
        返回值
            String		画师名
        快捷方式
            ship._illustrator	默认语言
    */
    getIllustrator(theLocale = vars.locale) {
        let entity = this.getRel('illustrator')
        if (entity)
            return vars.db.entities[entity].getName(theLocale)
        return
    }
    get _illustrator() {
        return this.getIllustrator()
    }

    /* 获取该舰娘可能的最低等级
     */
    getMinLv() {
        const series = this._series
        let lv
        series.some((o, index) => {
            if (this.id == o.id) {
                if (index) {
                    lv = series[index - 1].next_lvl
                } else {
                    lv = 1
                }
            }
            return lv
        })
        return lv
    }
    get _minLv() {
        return this.getMinLv()
    }
}