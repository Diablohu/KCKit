'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (root, name, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root[name] = factory();
    }
})(undefined, 'KC', function () {

    var KCKit = {
        lang: 'zh_cn',
        joint: '・',
        db: {},
        path: {
            db: '/kcdb/',
            pics: {
                ships: '/kcpic/ships/'
            }
        },
        statSpeed: {
            5: '低速',
            10: '高速'
        },
        getStatSpeed: function getStatSpeed(speed) {
            return this.statSpeed[parseInt(speed)];
        },
        statRange: {
            1: '短',
            2: '中',
            3: '长',
            4: '超长'
        },
        getStatRange: function getStatRange(range) {
            return this.statRange[parseInt(range)];
        },
        textRank: {
            1: '|',
            2: '||',
            3: '|||',
            4: '\\',
            5: '\\\\',
            6: '\\\\\\',
            7: '》'
        }
    };

    /**
     * KC Classes
     */
    // Base class

    var ItemBase = function () {
        function ItemBase() {
            _classCallCheck(this, ItemBase);
        }

        _createClass(ItemBase, [{
            key: 'getName',
            value: function getName(language) {
                language = language || KCKit.lang;
                return this['name'] ? this['name'][language] || this['name'] : null;
            }
        }, {
            key: '_name',
            get: function get() {
                return this.getName();
            }
        }]);

        return ItemBase;
    }();
    // Class for Entity (Person/Group, such as CVs, illustrators)


    var Entity = function (_ItemBase) {
        _inherits(Entity, _ItemBase);

        function Entity(data) {
            _classCallCheck(this, Entity);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Entity).call(this));

            $.extend(!0, _this, data);
            return _this;
        }

        return Entity;
    }(ItemBase);

    KCKit.Entity = Entity;

    var Equipment = function (_ItemBase2) {
        _inherits(Equipment, _ItemBase2);

        function Equipment(data) {
            _classCallCheck(this, Equipment);

            var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Equipment).call(this));

            $.extend(!0, _this2, data);
            return _this2;
        }

        _createClass(Equipment, [{
            key: 'getName',
            value: function getName(small_brackets, language) {
                language = language || KCKit.lang;
                var result = ItemBase.prototype.getName.call(this, language)
                //,result = super.getName(language)
                ,
                    small_brackets_tag = small_brackets && !small_brackets === !0 ? small_brackets : 'small';
                return small_brackets ? result.replace(/（([^（^）]+)）/g, '<' + small_brackets_tag + '>($1)</' + small_brackets_tag + '>') : result;
            }
        }, {
            key: 'getType',
            value: function getType(language) {
                language = language || KCKit.lang;
                return this['type'] ? _g['data']['item_types'][this['type']]['name'][language] : null;
            }
        }, {
            key: 'getIconId',
            value: function getIconId() {
                return KCKit.db.item_types[this['type']]['icon'];
            }
        }, {
            key: 'getCaliber',
            value: function getCaliber() {
                var name = this.getName(!1, 'ja_jp'),
                    caliber = parseFloat(name);

                return caliber;
            }
        }, {
            key: 'getPower',
            value: function getPower() {
                return this.stat[KCKit.db['item_types'][this['type']]['main_attribute'] || 'fire'];
                /*
                switch( this['type'] ){
                    // Guns
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                }
                */
            }
        }, {
            key: '_icon',
            get: function get() {
                return 'assets/images/itemicon/' + this.getIconId() + '.png';
            }
        }]);

        return Equipment;
    }(ItemBase);

    KCKit.Equipment = Equipment;

    var Ship = function (_ItemBase3) {
        _inherits(Ship, _ItemBase3);

        function Ship(data) {
            _classCallCheck(this, Ship);

            var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Ship).call(this));

            $.extend(!0, _this3, data);
            return _this3;
        }
        /**
         * @param {string} joint - OPTIONAL - 连接符，如果存在后缀名，则在舰名和后缀名之间插入该字符串
         * @param {bollean} joint - OPTIONAL - 如果为 true，则添加默认连接符；false，则不添加连接符
         * @param {null} joint - OPTIONAL - 不添加连接符
         * @param {string} language - OPTIONAL - 语言代码，默认为 KCTip.lang
         * @return {string} 舰名 + 连接符（如果有） + 后缀名（如果有）
         * 快捷方式 - ship._name (默认连接符，默认语言)
         */


        _createClass(Ship, [{
            key: 'getName',
            value: function getName(joint, language) {
                joint = joint || '';
                language = language || KCKit.lang;
                var suffix = this.getSuffix(language);
                return (this['name'][language] || this['name']['ja_jp']) + (suffix ? (joint === !0 ? KCKit.joint : joint) + suffix : '');
            }
            /*	获取舰名，不包括后缀
                变量
                    language	[OPTIONAL]
                        String		语言代码，默认为 KCKit.lang
                返回值
                    String		舰名，不包括后缀
            */

        }, {
            key: 'getNameNoSuffix',
            value: function getNameNoSuffix(language) {
                language = language || KCKit.lang;
                return this['name'][language] || this['name']['ja_jp'];
            }
            /*	获取后缀名
                变量
                    language	[OPTIONAL]
                        String		语言代码，默认为 KCKit.lang
                返回值
                    String		后缀名
            */

        }, {
            key: 'getSuffix',
            value: function getSuffix(language) {
                language = language || KCKit.lang;
                return this['name'].suffix ? KCKit.db['ship_namesuffix'][this['name'].suffix][language] || KCKit.db['ship_namesuffix'][this['name'].suffix]['ja_jp'] || '' : '';
            }
            /*	获取舰种
                变量
                    language	[OPTIONAL]
                        String		语言代码，默认为 KCKit.lang
                返回值
                    String		舰种
                快捷方式
                    ship._type	默认语言
            */

        }, {
            key: 'getType',
            value: function getType(language) {
                language = language || KCKit.lang;
                return this['type'] ? _g['data']['ship_types'][this['type']]['full_zh'] : null;
            }
        }, {
            key: 'getSeriesData',

            /*	获取系列数据
                返回值
                    Object		系列
            */
            value: function getSeriesData() {
                return this['series'] ? _g['data']['ship_series'][this['series']]['ships'] : [{
                    'id': this.id
                }];
            }
            /*	获取图鉴uri/path
                变量
                    picId	[OPTIONAL]
                        Number		图鉴Id，默认 0
                返回值
                    String		uri/path
                快捷方式
                    ship._pics	获取全部图鉴，Array
            */

        }, {
            key: 'getPic',
            value: function getPic(picId) {
                var series = this.getSeriesData();
                picId = parseInt(picId || 0);

                var getURI = function getURI(i, p) {
                    if (typeof node != 'undefined' && node && node.path && KCKit.path.pics.ships) return node.path.join(KCKit.path.pics.ships, i + '/' + p + '.webp');
                    if (KCKit.path.pics.ships) return KCKit.path.pics.ships + i + '/' + p + '.png';
                    return '/' + i + '/' + p + '.png';
                };

                for (var i = 0; i < series.length; i++) {
                    if (series[i].id == this.id) {
                        switch (picId) {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 12:
                            case 13:
                            case 14:
                                return getURI(this.id, picId);
                                break;
                            default:
                                if (series[i].illust_delete) {
                                    return getURI(series[i - 1].id, picId);
                                } else {
                                    return getURI(this.id, picId);
                                }
                                break;
                        }
                        break;
                    }
                }
            }
        }, {
            key: 'getSpeed',
            value: function getSpeed(language) {
                language = language || KCKit.lang;
                return KCKit.statSpeed[parseInt(this.stat.speed)];
            }
        }, {
            key: 'getRange',
            value: function getRange(language) {
                language = language || KCKit.lang;
                return KCKit.statRange[parseInt(this.stat.range)];
            }
        }, {
            key: 'getEquipmentTypes',
            value: function getEquipmentTypes() {
                return KCKit.db.ship_types[this['type']].equipable.concat(this.additional_item_types || []).sort(function (a, b) {
                    return a - b;
                });
            }
        }, {
            key: 'getAttribute',
            value: function getAttribute(attr, lvl) {
                lvl = lvl || 1;
                if (lvl > Ship.lvlMax) lvl = Ship.lvlMax;

                var getStatOfLvl = function getStatOfLvl(lvl, base, max) {
                    lvl = lvl || 1;
                    base = parseFloat(base);
                    max = parseFloat(max) || base;
                    if (base < 0 || max < 0) return -1;
                    if (base == max) return max;
                    return Math.floor(base + (max - base) * lvl / 99);
                };

                var value = void 0;

                switch (attr) {
                    case 'hp':
                        value = this['stat']['hp'];
                        if (lvl > 99) {
                            if (this['stat']['hp'] >= 90) value = this['stat']['hp'] + 9;else if (this['stat']['hp'] >= 70) value = this['stat']['hp'] + 8;else if (this['stat']['hp'] >= 50) value = this['stat']['hp'] + 7;else if (this['stat']['hp'] >= 40) value = this['stat']['hp'] + 6;else if (this['stat']['hp'] >= 30) value = this['stat']['hp'] + 5;else value = this['stat']['hp'] + 4;
                            if (value > this['stat']['hp_max']) value = this['stat']['hp_max'];
                        }
                        return value;
                        break;
                    case 'speed':
                        return KCKit.getStatSpeed(this['stat']['speed']);
                        break;
                    case 'range':
                        return KCKit.getStatRange(this['stat']['range']);
                        break;
                    case 'luck':
                        if (lvl > 99) return this['stat']['luck'] + 3;
                        return this['stat']['luck'];
                        break;
                    case 'fuel':
                    case 'ammo':
                        if (lvl > 99) return Math.floor(this['consum'][attr] * 0.85);
                        return this['consum'][attr];
                        break;
                    case 'aa':
                    case 'armor':
                    case 'fire':
                    case 'torpedo':
                        return this['stat'][attr + '_max'] || this['stat'][attr];
                        break;
                    default:
                        return getStatOfLvl(lvl, this['stat'][attr], this['stat'][attr + '_max']);
                        break;
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

        }, {
            key: 'getRel',
            value: function getRel(relation) {
                if (relation) {
                    if (!this.rels[relation] && this.remodel && this.remodel.prev) {
                        var prev = KCKit.db.ships[this.remodel.prev];
                        while (prev) {
                            if (prev.rels && prev.rels[relation]) return prev.rels[relation];
                            if (!prev.remodel || !prev.remodel.prev) prev = null;else prev = KCKit.db.ships[prev.remodel.prev];
                        }
                    }
                    return this.rels[relation];
                } else {
                    return this.rels;
                }
            }
            /*	获取声优
                变量
                    language	[OPTIONAL]
                        String		语言代码，默认为 KCKit.lang
                返回值
                    String		声优名
                快捷方式
                    ship._cv	默认语言
            */

        }, {
            key: 'getCV',
            value: function getCV(language) {
                var entity = this.getRel('cv');
                if (entity) return KCKit.db.entities[entity].getName(language || KCKit.lang);
                return;
            }
        }, {
            key: 'getIllustrator',

            /*	获取画师
                变量
                    language	[OPTIONAL]
                        String		语言代码，默认为 KCKit.lang
                返回值
                    String		画师名
                快捷方式
                    ship._illustrator	默认语言
            */
            value: function getIllustrator(language) {
                var entity = this.getRel('illustrator');
                if (entity) return KCKit.db.entities[entity].getName(language || KCKit.lang);
                return;
            }
        }, {
            key: '_type',
            get: function get() {
                return this.getType();
            }
        }, {
            key: '_pics',
            get: function get() {
                var arr = [];
                for (var i = 0; i < 15; i++) {
                    arr.push(this.getPic(i));
                }
                return arr;
            }
        }, {
            key: '_speed',
            get: function get() {
                return this.getSpeed();
            }
        }, {
            key: '_range',
            get: function get() {
                return this.getRange();
            }
        }, {
            key: '_cv',
            get: function get() {
                return this.getCV();
            }
        }, {
            key: '_illustrator',
            get: function get() {
                return this.getIllustrator();
            }
        }]);

        return Ship;
    }(ItemBase);

    Ship.lvlMax = 155;
    KCKit.Ship = Ship;

    /**
     * KC Database
     */
    KCKit.dbLoad = function (type, callback_beforeProcess, callback_success, callback_complete) {
        return $.ajax({
            'url': KCKit.path.db + '/' + type + '.json',
            'dataType': 'text',
            'success': function success(data) {
                var arr = [];
                if (callback_beforeProcess) arr = callback_beforeProcess(data);
                if (typeof KCKit.db[type] == 'undefined') KCKit.db[type] = {};
                arr.forEach(function (str) {
                    if (str) {
                        var doc = JSON.parse(str);
                        switch (type) {
                            case 'ships':
                                KCKit.db[type][doc['id']] = new Ship(doc);
                                break;
                            case 'items':
                                KCKit.db[type][doc['id']] = new Equipment(doc);
                                break;
                            case 'entities':
                                KCKit.db[type][doc['id']] = new Entity(doc);
                                break;
                            default:
                                KCKit.db[type][doc['id']] = doc;
                                break;
                        }
                    }
                });
                if (callback_success) callback_success(data);
            },
            'complete': function complete(jqXHR, textStatus) {
                if (callback_complete) callback_complete(jqXHR, textStatus);
            }
        });
    };

    /**
     * KC Formulas
     */
    var formula = {
        // 装备类型
        equipmentType: {
            SmallCaliber: 1, // 小口径主炮
            SmallCaliberHigh: 2, // 小口径主炮（高角）
            SmallCaliberAA: 3, // 小口径主炮（高射）
            MediumCaliber: 4, // 中口径主炮
            LargeCaliber: 5, // 大口径主炮
            SuperCaliber: 6, // 超大口径主炮
            SecondaryGun: 7, // 副炮
            SecondaryGunHigh: 8, // 副炮（高角）
            SecondaryGunAA: 9, // 副炮（高射）
            APShell: 11, // 穿甲弹
            Torpedo: 12, // 鱼雷
            SubmarineTorpedo: 13, // 潜艇鱼雷
            MidgetSubmarine: 14, // 微型潜艇
            ReconSeaplane: 15, // 水上侦察机
            ReconSeaplaneNight: 16, // 夜侦
            SeaplaneBomber: 17, // 水上轰炸机
            CarrierFighter: 18, // 舰战 / 舰载战斗机
            TorpedoBomber: 19, // 舰攻 / 舰载鱼雷轰炸机
            DiveBomber: 20, // 舰爆 / 舰载俯冲轰炸机
            CarrierRecon: 21, // 舰侦 / 舰载侦察机
            Autogyro: 22, // 旋翼机
            AntiSubPatrol: 23, // 对潜哨戒机
            SmallRadar: 24, // 小型雷达
            LargeRadar: 25, // 大型雷达
            DepthCharge: 26, // 爆雷
            Sonar: 27, // 声纳
            LargeSonar: 28, // 大型声纳
            AAGun: 29, // 对空机枪
            AAGunConcentrated: 30, // 对空机枪（集中配备）
            Searchlight: 39, // 探照灯
            LargeFlyingBoat: 45, // 大型水上飞艇
            SearchlightLarge: 46, // 大型探照灯
            SuparRadar: 47, // 超大型雷达
            CarrierRecon2: 50, // 舰侦II / 舰载侦察机II
            SeaplaneFighter: 51, // 水战 / 水上战斗机
            LandBasedAttacker: 53, // 陆攻 / 陆上攻击机
            Interceptor: 54 // 局战 / 局地战斗机
        },
        // 舰种
        shipType: {
            // 航母系列
            Carriers: [9, // 轻型航母
            10, // 正规航母
            11 // 装甲航母
            ],
            // 轻巡系列
            LightCruisers: [2, // 轻巡洋舰
            3, // 重雷装巡洋舰
            21, // 练习巡洋舰
            28 // 防空轻巡洋舰
            ],
            // 潜艇系列
            Submarines: [13, // 潜艇
            14 // 航母潜艇
            ]
        },
        calcByShip: {},
        calc: {}
    };
    formula.calculate = function (type, ship, equipments_by_slot, star_by_slot, rank_by_slot, options) {
        /**
         * 计算
         * @param {string} type - 计算类型
         * @param {number || Ship} ship - 舰娘
         * @param {array} equipments_by_slot - 每格装备ID/装备object
         * @param {array} star_by_slot - 每格装备改修星级
         * @param {array} rank_by_slot - 每格装备熟练度
         * @param {object} options - 选项
         */
        if (!type || !ship) return 0;

        if (!_instanceof(ship, Ship)) ship = KCKit.db.ships[ship];

        var result = 0,
            count = {
            'main': 0,
            'secondary': 0,
            'torpedo': 0,
            'seaplane': 0,
            'apshell': 0,
            'radar': 0
        },
            powerTorpedo = function powerTorpedo(options) {
            options = options || {};
            var result = 0;
            if ($.inArray(ship.type, formula.shipType.Carriers) > -1 && !options.isNight) {
                return options.returnZero ? 0 : -1;
            } else {
                result = ship.stat.torpedo_max || 0;
                ship.slot.map(function (carry, index) {
                    if (equipments_by_slot[index]) {
                        result += equipments_by_slot[index].type == formula.equipmentType.TorpedoBomber && !options.isNight ? 0 : equipments_by_slot[index].stat.torpedo || 0;

                        // 改修加成
                        if (star_by_slot[index]) {
                            var multipler = 0;
                            // 鱼雷
                            if ($.inArray(equipments_by_slot[index].type, formula.equipmentType.Torpedos) > -1) multipler = options.isNight ? 1 : 1.2;
                            // 机枪
                            if ($.inArray(equipments_by_slot[index].type, formula.equipmentType.AAGuns) > -1) multipler = options.isNight ? 1 : 1.2;
                            result += Math.sqrt(star_by_slot[index]) * multipler;
                        }
                    }
                });
                return result;
            }
            return ship.stat.torpedo_max || 0;
        },
            value = 0;

        equipments_by_slot = equipments_by_slot.map(function (equipment) {
            if (!equipment) return null;
            if (_instanceof(equipment, Equipment)) return equipment;
            return KCKit.db.equipments ? KCKit.db.equipments[equipment] : KCKit.db.items[equipment];
        }) || [];
        star_by_slot = star_by_slot || [];
        rank_by_slot = rank_by_slot || [];
        options = options || {};

        equipments_by_slot.forEach(function (equipment) {
            if (!equipment) return;
            if ($.inArray(equipment.type, formula.equipmentType.MainGuns) > -1) count.main += 1;else if ($.inArray(equipment.type, formula.equipmentType.SecondaryGuns) > -1) count.secondary += 1;else if ($.inArray(equipment.type, formula.equipmentType.Torpedos) > -1) count.torpedo += 1;else if ($.inArray(equipment.type, formula.equipmentType.Seaplanes) > -1) count.seaplane += 1;else if (equipment.type == formula.equipmentType.APShell) count.apshell += 1;else if ($.inArray(equipment.type, formula.equipmentType.Radars) > -1) count.radar += 1;
        });

        switch (type) {
            // 制空战力，装备须为战斗机类型 formula.equipmentType.Fighters
            // 计算公式参考 http://bbs.ngacn.cc/read.php?tid=8680767
            case 'fighterPower':
                value = 0;
                ship.slot.map(function (carry, index) {
                    if (equipments_by_slot[index] && $.inArray(equipments_by_slot[index].type, formula.equipmentType.Fighters) > -1 && carry) {
                        value = Math.sqrt(carry) * (equipments_by_slot[index].stat.aa || 0);
                        if (equipments_by_slot[index].type == formula.equipmentType.CarrierFighter) {
                            switch (rank_by_slot[index]) {
                                case 1:case '1':
                                    value += 1;break;
                                case 2:case '2':
                                    value += 4;break;
                                case 3:case '3':
                                    value += 6;break;
                                case 4:case '4':
                                    value += 11;break;
                                case 5:case '5':
                                    value += 16;break;
                                case 6:case '6':
                                    value += 17;break;
                                case 7:case '7':
                                    value += 25;break;
                            }
                        } else if ($.inArray(equipments_by_slot[index].type, formula.equipmentType.Recons) == -1) {
                            var max_per_slot = equipments_by_slot[index].type == formula.equipmentType.SeaplaneBomber ? 9 : 3;
                            value += rank_by_slot[index] == 1 ? 1 : max_per_slot / 6 * (rank_by_slot[index] - 1);
                        }
                        result += Math.floor(value);
                    }
                });
                return result;
                //return Math.floor(result)
                break;

            // 同时返回制空战力的上下限
            // 返回值为Array
            case 'fighterPower_v2':
                return formula.calcByShip.fighterPower_v2(ship, equipments_by_slot, star_by_slot, rank_by_slot);
                break;

            // 炮击威力，除潜艇外
            case 'shelling':
            case 'shellingDamage':
                if ($.inArray(ship.type, formula.shipType.Submarines) > -1) {
                    return '-';
                } else {
                    result = formula.calcByShip.shellingPower(ship, equipments_by_slot, star_by_slot, rank_by_slot);
                    if (result && result > -1) return Math.floor(result); // + 5
                    return '-';
                }
                break;

            // 雷击威力，航母除外
            case 'torpedo':
            case 'torpedoDamage':
                result = powerTorpedo();
                if (result && result > -1) return Math.floor(result); // + 5
                return '-';
                break;

            // 夜战模式 & 伤害力
            case 'nightBattle':
                if (!ship.additional_night_shelling && $.inArray(ship.type, formula.shipType.Carriers) > -1) {
                    // 航母没有夜战
                    return '-';
                } else {
                    //console.log(count)
                    result = formula.calcByShip.shellingPower(ship, equipments_by_slot, star_by_slot, rank_by_slot, {
                        isNight: !0
                    }) + powerTorpedo({ isNight: !0, returnZero: !0 });
                    if (count.torpedo >= 2) {
                        return '雷击CI ' + Math.floor(result * 1.5) + ' x 2';
                    } else if (count.main >= 3) {
                        return '炮击CI ' + Math.floor(result * 2) + '';
                    } else if (count.main == 2 && count.secondary >= 1) {
                        return '炮击CI ' + Math.floor(result * 1.75) + '';
                    } else if (count.main >= 1 && count.torpedo == 1) {
                        return '炮雷CI ' + Math.floor(result * 1.3) + ' x 2';
                    } else if (count.main == 2 && count.secondary <= 0 && count.torpedo <= 0 || count.main == 1 && count.secondary >= 1 && count.torpedo <= 0 || count.main == 0 && count.secondary >= 2 && count.torpedo >= 0) {
                        return '连击 ' + Math.floor(result * 1.2) + ' x 2';
                    } else {
                        return '通常 ' + Math.floor(result) + '';
                    }
                }
                break;

            // 命中总和
            case 'addHit':
                ship.slot.map(function (carry, index) {
                    if (equipments_by_slot[index]) result += equipments_by_slot[index].stat.hit || 0;
                });
                return result >= 0 ? '+' + result : result;
                break;

            // 装甲总和
            case 'addArmor':
                ship.slot.map(function (carry, index) {
                    if (equipments_by_slot[index]) result += equipments_by_slot[index].stat.armor || 0;
                });
                return result;
                break;

            // 回避总和
            case 'addEvasion':
                ship.slot.map(function (carry, index) {
                    if (equipments_by_slot[index]) result += equipments_by_slot[index].stat.evasion || 0;
                });
                return result;
                break;

            // 索敌能力
            case 'losPower':
                return formula.calcByShip.losPower(ship, equipments_by_slot, star_by_slot, rank_by_slot, options);
                break;
            default:
                return formula.calcByShip[type](ship, equipments_by_slot, star_by_slot, rank_by_slot, options);
                break;
        }

        return '-';
    };
    // 装备类型集合
    formula.equipmentType.MainGuns = [formula.equipmentType.SmallCaliber, formula.equipmentType.SmallCaliberHigh, formula.equipmentType.SmallCaliberAA, formula.equipmentType.MediumCaliber, formula.equipmentType.LargeCaliber, formula.equipmentType.SuperCaliber];

    formula.equipmentType.LargeCalibers = [formula.equipmentType.LargeCaliber, formula.equipmentType.SuperCaliber];

    formula.equipmentType.SecondaryGuns = [formula.equipmentType.SecondaryGun, formula.equipmentType.SecondaryGunHigh, formula.equipmentType.SecondaryGunAA];

    formula.equipmentType.Torpedos = [formula.equipmentType.Torpedo, formula.equipmentType.SubmarineTorpedo];

    formula.equipmentType.Seaplanes = [formula.equipmentType.ReconSeaplane, formula.equipmentType.ReconSeaplaneNight, formula.equipmentType.SeaplaneBomber, formula.equipmentType.SeaplaneFighter];

    formula.equipmentType.Fighters = [formula.equipmentType.SeaplaneBomber, formula.equipmentType.CarrierFighter, formula.equipmentType.TorpedoBomber, formula.equipmentType.DiveBomber, formula.equipmentType.SeaplaneFighter, formula.equipmentType.LandBasedAttacker, formula.equipmentType.Interceptor /*,
                                                                                                                                                                                                                                                                                                           formula.equipmentType.CarrierRecon*/
    ];

    formula.equipmentType.Recons = [formula.equipmentType.ReconSeaplane, formula.equipmentType.ReconSeaplaneNight, formula.equipmentType.CarrierRecon, formula.equipmentType.CarrierRecon2, formula.equipmentType.LargeFlyingBoat];

    formula.equipmentType.SeaplaneRecons = [formula.equipmentType.ReconSeaplane, formula.equipmentType.ReconSeaplaneNight, formula.equipmentType.LargeFlyingBoat];

    formula.equipmentType.SeaplaneBombers = [formula.equipmentType.SeaplaneBomber, formula.equipmentType.SeaplaneFighter];

    formula.equipmentType.CarrierRecons = [formula.equipmentType.CarrierRecon, formula.equipmentType.CarrierRecon2];

    formula.equipmentType.CarrierBased = [formula.equipmentType.CarrierFighter, formula.equipmentType.TorpedoBomber, formula.equipmentType.DiveBomber, formula.equipmentType.CarrierRecon, formula.equipmentType.CarrierRecon2];

    formula.equipmentType.LandBased = [formula.equipmentType.LandBasedAttacker, formula.equipmentType.Interceptor];

    formula.equipmentType.TorpedoBombers = [formula.equipmentType.TorpedoBomber];

    formula.equipmentType.DiveBombers = [formula.equipmentType.DiveBomber];

    formula.equipmentType.Autogyros = [formula.equipmentType.Autogyro];

    formula.equipmentType.AntiSubPatrols = [formula.equipmentType.AntiSubPatrol];

    formula.equipmentType.Aircrafts = [];
    [].concat(formula.equipmentType.Seaplanes).concat(formula.equipmentType.Recons).concat(formula.equipmentType.CarrierBased).concat(formula.equipmentType.Autogyros).concat(formula.equipmentType.AntiSubPatrols).concat(formula.equipmentType.LandBased).forEach(function (v) {
        if (formula.equipmentType.Aircrafts.indexOf(v) < 0) formula.equipmentType.Aircrafts.push(v);
    });

    formula.equipmentType.Radars = [formula.equipmentType.SmallRadar, formula.equipmentType.LargeRadar, formula.equipmentType.SuparRadar];

    formula.equipmentType.SmallRadars = [formula.equipmentType.SmallRadar];

    formula.equipmentType.LargeRadars = [formula.equipmentType.LargeRadar, formula.equipmentType.SuparRadar];

    formula.equipmentType.AntiSubmarines = [formula.equipmentType.DepthCharge, formula.equipmentType.Sonar, formula.equipmentType.LargeSonar];

    formula.equipmentType.AAGuns = [formula.equipmentType.AAGun, formula.equipmentType.AAGunConcentrated];

    formula.equipmentType.Searchlights = [formula.equipmentType.Searchlight, formula.equipmentType.SearchlightLarge];
    // 计算快捷方式
    formula.shellingDamage = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {
        return this.calculate('shellingDamage', ship, equipments_by_slot, star_by_slot, rank_by_slot);
    };
    formula.torpedoDamage = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {
        return this.calculate('torpedoDamage', ship, equipments_by_slot, star_by_slot, rank_by_slot);
    };
    formula.fighterPower = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {
        return this.calculate('fighterPower', ship, equipments_by_slot, star_by_slot, rank_by_slot);
    };
    formula.fighterPower_v2 = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {
        return this.calculate('fighterPower_v2', ship, equipments_by_slot, star_by_slot, rank_by_slot);
    };
    formula.nightBattle = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {
        return this.calculate('nightBattle', ship, equipments_by_slot, star_by_slot, rank_by_slot);
    };
    formula.addHit = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {
        return this.calculate('addHit', ship, equipments_by_slot, star_by_slot, rank_by_slot);
    };
    formula.addArmor = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {
        return this.calculate('addArmor', ship, equipments_by_slot, star_by_slot, rank_by_slot);
    };
    formula.addEvasion = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {
        return this.calculate('addEvasion', ship, equipments_by_slot, star_by_slot, rank_by_slot);
    };
    formula.losPower = function (ship, equipments_by_slot, star_by_slot, rank_by_slot, options) {
        return this.calculate('losPower', ship, equipments_by_slot, star_by_slot, rank_by_slot, options);
    };
    // Formulas
    formula.calc.losPower = function (data) {
        // http://biikame.hatenablog.com/entry/2014/11/14/224925

        var calc = function calc(x) {
            x = $.extend({ '(Intercept)': 1 }, x);
            x['hqLv'] = Math.ceil(x['hqLv'] / 5) * 5;
            var x_estimate = {};
            var y_estimate = 0;
            $.each(keys, function () {
                var estimate = x[this] * estimate_coefficients[this];
                x_estimate[this] = estimate;
                y_estimate += estimate;
            });
            var x_std_error = {};
            $.each(keys, function () {
                x_std_error[this] = x[this] * std_error_coefficients[this];
            });
            var y_std_error = 0;
            $.each(keys, function () {
                var key1 = this;
                $.each(keys, function () {
                    var key2 = this;
                    y_std_error += x_std_error[key1] * x_std_error[key2] * correlation[key1][key2];
                });
            });
            return {
                x_estimate: x_estimate,
                y_estimate: y_estimate,
                x_std_error: x_std_error,
                y_std_error: y_std_error
            };
        };
        var keys = ['(Intercept)', 'DiveBombers', 'TorpedoBombers', 'CarrierRecons', 'SeaplaneRecons', 'SeaplaneBombers', 'SmallRadars', 'LargeRadars', 'Searchlights', 'statLos', 'hqLv'];
        var estimate_coefficients = {
            '(Intercept)': 0,
            'DiveBombers': 1.03745043134563,
            'TorpedoBombers': 1.3679056374142,
            'CarrierRecons': 1.65940512636315,
            'SeaplaneRecons': 2,
            'SeaplaneBombers': 1.77886368594467,
            'SmallRadars': 1.0045778494921,
            'LargeRadars': 0.990738063979571,
            'Searchlights': 0.906965144360512,
            'statLos': 1.6841895400986,
            'hqLv': -0.614246711531445
        };
        var std_error_coefficients = {
            '(Intercept)': 4.66445565766347,
            'DiveBombers': 0.0965028505325845,
            'TorpedoBombers': 0.108636184978525,
            'CarrierRecons': 0.0976055279516298,
            'SeaplaneRecons': 0.0866229392463539,
            'SeaplaneBombers': 0.0917722496848294,
            'SmallRadars': 0.0492773648320346,
            'LargeRadars': 0.0491221486053861,
            'Searchlights': 0.0658283797225724,
            'statLos': 0.0781594211213618,
            'hqLv': 0.0369222352426548
        };
        var correlation = {
            '(Intercept)': {
                '(Intercept)': 1,
                'DiveBombers': -0.147020064768061,
                'TorpedoBombers': -0.379236131621529,
                'CarrierRecons': -0.572858669501918,
                'SeaplaneRecons': -0.733913857017495,
                'SeaplaneBombers': -0.642621825152428,
                'SmallRadars': -0.674829588068364,
                'LargeRadars': -0.707418111752863,
                'Searchlights': -0.502304601556193,
                'statLos': -0.737374218573832,
                'hqLv': -0.05071933950163
            },
            'DiveBombers': {
                '(Intercept)': -0.147020064768061,
                'DiveBombers': 1,
                'TorpedoBombers': 0.288506347076736,
                'CarrierRecons': 0.365820372770994,
                'SeaplaneRecons': 0.425744409856409,
                'SeaplaneBombers': 0.417783698791503,
                'SmallRadars': 0.409046013184429,
                'LargeRadars': 0.413855653833994,
                'Searchlights': 0.308730607324667,
                'statLos': 0.317984916914851,
                'hqLv': -0.386740224500626
            },
            'TorpedoBombers': {
                '(Intercept)': -0.379236131621529,
                'DiveBombers': 0.288506347076736,
                'TorpedoBombers': 1,
                'CarrierRecons': 0.482215071254241,
                'SeaplaneRecons': 0.584455876852325,
                'SeaplaneBombers': 0.558515133495825,
                'SmallRadars': 0.547260012897553,
                'LargeRadars': 0.560437619378443,
                'Searchlights': 0.437934879351188,
                'statLos': 0.533934507932748,
                'hqLv': -0.405349979885748
            },
            'CarrierRecons': {
                '(Intercept)': -0.572858669501918,
                'DiveBombers': 0.365820372770994,
                'TorpedoBombers': 0.482215071254241,
                'CarrierRecons': 1,
                'SeaplaneRecons': 0.804494553748065,
                'SeaplaneBombers': 0.75671307047535,
                'SmallRadars': 0.748420581669228,
                'LargeRadars': 0.767980338133817,
                'Searchlights': 0.589651513349878,
                'statLos': 0.743851348255527,
                'hqLv': -0.503544281376776
            },
            'SeaplaneRecons': {
                '(Intercept)': -0.733913857017495,
                'DiveBombers': 0.425744409856409,
                'TorpedoBombers': 0.584455876852325,
                'CarrierRecons': 0.804494553748065,
                'SeaplaneRecons': 1,
                'SeaplaneBombers': 0.932444440578382,
                'SmallRadars': 0.923988080549326,
                'LargeRadars': 0.94904944359066,
                'Searchlights': 0.727912987329348,
                'statLos': 0.944434077970518,
                'hqLv': -0.614921413821462
            },
            'SeaplaneBombers': {
                '(Intercept)': -0.642621825152428,
                'DiveBombers': 0.417783698791503,
                'TorpedoBombers': 0.558515133495825,
                'CarrierRecons': 0.75671307047535,
                'SeaplaneRecons': 0.932444440578382,
                'SeaplaneBombers': 1,
                'SmallRadars': 0.864289865445084,
                'LargeRadars': 0.886872388674911,
                'Searchlights': 0.68310647756898,
                'statLos': 0.88122333327317,
                'hqLv': -0.624797255805045
            },
            'SmallRadars': {
                '(Intercept)': -0.674829588068364,
                'DiveBombers': 0.409046013184429,
                'TorpedoBombers': 0.547260012897553,
                'CarrierRecons': 0.748420581669228,
                'SeaplaneRecons': 0.923988080549326,
                'SeaplaneBombers': 0.864289865445084,
                'SmallRadars': 1,
                'LargeRadars': 0.872011318623459,
                'Searchlights': 0.671926570242336,
                'statLos': 0.857213501657084,
                'hqLv': -0.560018086758868
            },
            'LargeRadars': {
                '(Intercept)': -0.707418111752863,
                'DiveBombers': 0.413855653833994,
                'TorpedoBombers': 0.560437619378443,
                'CarrierRecons': 0.767980338133817,
                'SeaplaneRecons': 0.94904944359066,
                'SeaplaneBombers': 0.886872388674911,
                'SmallRadars': 0.872011318623459,
                'LargeRadars': 1,
                'Searchlights': 0.690102027588321,
                'statLos': 0.883771367337743,
                'hqLv': -0.561336967269448
            },
            'Searchlights': {
                '(Intercept)': -0.502304601556193,
                'DiveBombers': 0.308730607324667,
                'TorpedoBombers': 0.437934879351188,
                'CarrierRecons': 0.589651513349878,
                'SeaplaneRecons': 0.727912987329348,
                'SeaplaneBombers': 0.68310647756898,
                'SmallRadars': 0.671926570242336,
                'LargeRadars': 0.690102027588321,
                'Searchlights': 1,
                'statLos': 0.723228553177704,
                'hqLv': -0.518427865593732
            },
            'statLos': {
                '(Intercept)': -0.737374218573832,
                'DiveBombers': 0.317984916914851,
                'TorpedoBombers': 0.533934507932748,
                'CarrierRecons': 0.743851348255527,
                'SeaplaneRecons': 0.944434077970518,
                'SeaplaneBombers': 0.88122333327317,
                'SmallRadars': 0.857213501657084,
                'LargeRadars': 0.883771367337743,
                'Searchlights': 0.723228553177704,
                'statLos': 1,
                'hqLv': -0.620804120587684
            },
            'hqLv': {
                '(Intercept)': -0.05071933950163,
                'DiveBombers': -0.386740224500626,
                'TorpedoBombers': -0.405349979885748,
                'CarrierRecons': -0.503544281376776,
                'SeaplaneRecons': -0.614921413821462,
                'SeaplaneBombers': -0.624797255805045,
                'SmallRadars': -0.560018086758868,
                'LargeRadars': -0.561336967269448,
                'Searchlights': -0.518427865593732,
                'statLos': -0.620804120587684,
                'hqLv': 1
            }
        };

        var x = {
            'DiveBombers': 0,
            'TorpedoBombers': 0,
            'CarrierRecons': 0,
            'SeaplaneRecons': 0,
            'SeaplaneBombers': 0,
            'SmallRadars': 0,
            'LargeRadars': 0,
            'Searchlights': 0,
            'statLos': 1,
            'hqLv': 1
        };

        for (var i in data) {
            x[i] = data[i];
        }

        return calc(x);
        //var result = calc(x);
        //var score = result.y_estimate.toFixed(1) + ' ± ' + result.y_std_error.toFixed(1);
    };
    formula.calc.TP = function (data) {
        /* data
        * {
        * 		ship: {
        * 			dd
        * 			cl
        * 			cav
        * 			bbv
        * 			ssv
        * 			av
        * 			lha
        * 			ao
        * 			ct
        * 		},
        * 		equipment: {
        * 			68	// landing craft
        * 			75  // canister
        * 		}
        * }
        */
        data = data || {};
        var result = 0,
            ship = data.ship || {},
            equipment = data.equipment || {};

        for (var i in ship) {
            var count = parseInt(ship[i]) || 0,
                multiper = 0;
            switch (i) {
                case 1:
                case '1':
                case 19:
                case '19':
                case 'dd':
                    multiper = 5;break;
                case 2:
                case '2':
                case 'cl':
                    multiper = 2;break;
                case 5:
                case '5':
                case 'cav':
                    multiper = 4;break;
                case 12:
                case '12':
                case 24:
                case '24':
                case 'av':
                    multiper = 9.5;break;
                case 15:
                case '15':
                case 'lha':
                    multiper = 12.25;break;
                case 29:
                case '29':
                case 'ao':
                    multiper = 14.75;break;
                case 8:
                case '8':
                case 'bbv':
                case 14:
                case '14':
                case 'ssv':
                    multiper = 7;break;
                case 21:
                case '21':
                case 'ct':
                    multiper = 6;break;
            }
            result += multiper * count;
        }

        for (var i in equipment) {
            var count = parseInt(equipment[i]) || 0,
                multiper = 0;
            switch (i) {
                // landing craft
                case 68:
                case '68':
                    multiper = 8;break;
                // canister
                case 75:
                case '75':
                    multiper = 5;break;
            }
            result += multiper * count;
        }

        return result;
    };
    formula.calc.fighterPower = function (equipment, carry, rank) {
        if (!equipment) return [0, 0];

        equipment = _instanceof(equipment, Equipment) ? equipment : KCKit.db.equipments ? KCKit.db.equipments[equipment] : KCKit.db.items[equipment];
        carry = carry || 0;
        rank = rank || 0;

        // http://bbs.ngacn.cc/read.php?tid=8680767
        // http://ja.kancolle.wikia.com/wiki/%E8%89%A6%E8%BC%89%E6%A9%9F%E7%86%9F%E7%B7%B4%E5%BA%A6

        var rankInternal = [],
            typeValue = {},
            results = [0, 0];

        rankInternal[0] = [0, 9];
        rankInternal[1] = [10, 24];
        rankInternal[2] = [25, 39];
        rankInternal[3] = [40, 54];
        rankInternal[4] = [55, 69];
        rankInternal[5] = [70, 84];
        rankInternal[6] = [85, 99];
        rankInternal[7] = [100, 120];

        typeValue.CarrierFighter = [0, 0, 2, 5, 9, 14, 14, 22];

        typeValue.SeaplaneBomber = [0, 0, 1, 1, 1, 3, 3, 6];

        if ($.inArray(equipment.type, formula.equipmentType.Fighters) > -1 && carry) {
            // Math.floor(Math.sqrt(carry) * (equipment.stat.aa || 0) + Math.sqrt( rankInternal / 10 ) + typeValue)
            var statAA = (equipment.stat.aa || 0) + (equipment.type == formula.equipmentType.Interceptor ? equipment.stat.evasion * 1.5 : 0),
                base = Math.sqrt(carry) * statAA,
                _rankInternal = rankInternal[rank],
                _typeValue = 0;

            if (equipment.type == formula.equipmentType.CarrierFighter) _typeValue = typeValue.CarrierFighter[rank];else if (equipment.type == formula.equipmentType.Interceptor) _typeValue = typeValue.CarrierFighter[rank];else if (equipment.type == formula.equipmentType.SeaplaneFighter) _typeValue = typeValue.CarrierFighter[rank];else if (equipment.type == formula.equipmentType.SeaplaneBomber) _typeValue = typeValue.SeaplaneBomber[rank];

            results[0] += Math.floor(base + Math.sqrt(_rankInternal[0] / 10) + _typeValue);
            results[1] += Math.floor(base + Math.sqrt(_rankInternal[1] / 10) + _typeValue);
        }

        return results;
    };
    // Calculate by Ship
    formula.calcByShip.shellingPower = function (ship, equipments_by_slot, star_by_slot, rank_by_slot, options) {
        options = options || {};

        var result = 0,
            isCV = !1;

        // 检查是否为航母攻击模式
        if ($.inArray(ship.type, formula.shipType.Carriers) > -1) {
            isCV = !0;
        } else {
            //equipments_by_slot.forEach(function(equipment){
            //	if( equipment && !isCV && $.inArray(equipment.type, formula.equipmentType.CarrierBased) > -1 )
            //		isCV = true
            //})
            equipments_by_slot.some(function (equipment) {
                if (equipment && !isCV && $.inArray(equipment.type, formula.equipmentType.CarrierBased) > -1) {
                    isCV = !0;
                    return !0;
                }
            });
        }

        if (isCV && !options.isNight) {
            // 航母攻击模式
            var torpedoDamage = 0,
                bombDamage = 0;
            ship.slot.map(function (carry, index) {
                if (equipments_by_slot[index]) {
                    result += equipments_by_slot[index].stat.fire * 1.5 || 0;

                    if (equipments_by_slot[index].type == formula.equipmentType.TorpedoBomber) torpedoDamage += equipments_by_slot[index].stat.torpedo || 0;

                    //if( equipments_by_slot[index].type == formula.equipmentType.DiveBomber )
                    bombDamage += equipments_by_slot[index].stat.bomb || 0;

                    if ($.inArray(equipments_by_slot[index].type, formula.equipmentType.SecondaryGuns) > -1) result += Math.sqrt((star_by_slot[index] || 0) * 1.5);
                }
            });
            if (!torpedoDamage && !bombDamage) return -1;else result += Math.floor((Math.floor(bombDamage * 1.3) + torpedoDamage + ship.stat.fire_max) * 1.5) + 50;
            return result;
        } else {
            result = ship.stat.fire_max || 0;
            // 其他舰种
            var CLGunNavalNumber = 0,
                CLGunTwinNumber = 0;
            ship.slot.map(function (carry, index) {
                if (equipments_by_slot[index]) {
                    result += equipments_by_slot[index].stat.fire || 0;

                    // 轻巡系主炮加成
                    if ($.inArray(ship.type, formula.shipType.LightCruisers) > -1) {
                        // 4	14cm单装炮
                        // 65	15.2cm连装炮
                        // 119	14cm连装炮
                        // 139	15.2cm连装炮改
                        if (equipments_by_slot[index].id == 4) CLGunNavalNumber += 1;
                        if (equipments_by_slot[index].id == 119 || equipments_by_slot[index].id == 65 || equipments_by_slot[index].id == 139) CLGunTwinNumber += 1;
                    }

                    // 改修加成
                    if (star_by_slot[index]) {
                        // 忽略装备类型: 鱼雷、雷达
                        if ($.inArray(equipments_by_slot[index].type, formula.equipmentType.Torpedos.concat(formula.equipmentType.Radars)) < 0) {
                            var multipler = 1;
                            // 对潜装备
                            if ($.inArray(equipments_by_slot[index].type, formula.equipmentType.AntiSubmarines) > -1) multipler = options.isNight ? 0 : 0.75;
                            // 大口径主炮
                            if ($.inArray(equipments_by_slot[index].type, formula.equipmentType.LargeCalibers) > -1) multipler = options.isNight ? 1 : 1.5;
                            result += Math.sqrt(star_by_slot[index]) * multipler;
                        }
                    }
                }
            });
            return result + 2 * Math.sqrt(CLGunTwinNumber) + Math.sqrt(CLGunNavalNumber);
        }
        return ship.stat.fire_max || 0;
    };
    formula.calcByShip.fighterPower_v2 = function (ship, equipments_by_slot, star_by_slot, rank_by_slot) {
        var results = [0, 0];

        ship.slot.map(function (carry, index) {
            var r = formula.calc.fighterPower(equipments_by_slot[index], carry, rank_by_slot[index] || 0);
            results[0] += r[0];
            results[1] += r[1];
        });
        return results;
    };
    formula.calcByShip.losPower = function (ship, equipments_by_slot, star_by_slot, rank_by_slot, options) {
        // http://biikame.hatenablog.com/entry/2014/11/14/224925

        options = options || {};
        options.shipLv = options.shipLv || 1;
        options.hqLv = options.hqLv || 1;

        if (options.shipLv < 0) options.shipLv = 1;
        if (options.hqLv < 0) options.hqLv = 1;

        var x = {
            'DiveBombers': 0,
            'TorpedoBombers': 0,
            'CarrierRecons': 0,
            'SeaplaneRecons': 0,
            'SeaplaneBombers': 0,
            'SmallRadars': 0,
            'LargeRadars': 0,
            'Searchlights': 0,
            'statLos': Math.sqrt(ship.getAttribute('los', options.shipLv)),
            'hqLv': options.hqLv
        };

        equipments_by_slot.forEach(function (equipment) {
            if (equipment) {
                for (var i in x) {
                    if (formula.equipmentType[i] && formula.equipmentType[i].push && formula.equipmentType[i].indexOf(equipment.type) > -1) x[i] += equipment.stat.los;
                }
            }
        });

        return formula.calc.losPower(x);
    };
    formula.calcByShip.TP = function (ship, equipments_by_slot, star_by_slot, rank_by_slot, options) {
        var data = {
            ship: {},
            equipment: {}
        };
        data.ship[ship.type] = 1;
        equipments_by_slot.forEach(function (equipment) {
            if (equipment) {
                if (!data.equipment[equipment.id]) data.equipment[equipment.id] = 0;
                data.equipment[equipment.id]++;
            }
        });
        console.log(data);
        return formula.calc.TP(data);
    };
    KCKit.formula = formula;

    return KCKit;
});