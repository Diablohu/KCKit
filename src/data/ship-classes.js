// ============================================================================
//
// BB
//
// ============================================================================const BB_Ise = 2;
const BB_Ise = 2;
const BBV_Ise = 6;
const BBVR_Ise = 113;
const group_BB_Ise = [BB_Ise, BBV_Ise, BBVR_Ise];
const BB_Fusou = 4;
const BBV_Fusou = 11;
const group_BB_Fusou = [BB_Fusou, BBV_Fusou];
const BB_Colorado = 122;
const BB_Iowa = 82;
const BB_QueenElizabeth = 85;
const BB_Nelson = 115;
const group_BB_Navy_USN = [BB_Colorado, BB_Iowa];
const group_BB_Navy_RN = [BB_QueenElizabeth, BB_Nelson];

// ============================================================================
//
// CV
//
// ============================================================================
const CVB_Lexington = 105;
const CV_Lexington = 87;
const CV_Essex = 110;
const CV_ArkRoyal = 101;
const CV_GrafZeppelin = 80;
const CV_Aquila = 91;
const CV_Casablanca = 106;
const group_CV_Navy_KM = [CV_GrafZeppelin];
const group_CV_Navy_RM = [CV_Aquila];
const group_CV_Navy_USN = [
    CVB_Lexington,
    CV_Lexington,
    CV_Essex,
    CV_Casablanca,
];
const group_CV_Navy_RN = [CV_ArkRoyal];

// ============================================================================
//
// CA
//
// ============================================================================
const CAV_Mogami = 45;
const CAV_MogamiRevised = 90;
const CAV_Tone = 46;
const group_CAV_Navy_IJN = [CAV_Mogami, CAV_MogamiRevised, CAV_Tone];
const CA_Furutaka = 39;
const CA_Aoba = 40;
const CA_Myoukou = 41;
const CA_Takao = 42;
const CA_Houston = 124;
const CA_Mogami = 43;
const CA_Tone = 44;
const group_CA_Navy_IJN = [
    CA_Furutaka,
    CA_Aoba,
    CA_Mogami,
    CA_Myoukou,
    CA_Takao,
    CA_Tone,
];
const group_CA_Navy_USN = [CA_Houston];

// ============================================================================
//
// CL
//
// ============================================================================
// 重雷装巡洋艦
const CLT_Kuma = 54;
// 軽航空巡洋艦
const CLV_Gotland = 116;
// 兵装実験軽巡洋艦
const CL_Yuubari2 = 129;
// 防空巡洋艦
const CL_Atlanta = 128;
// 軽巡洋艦
const CL_Tenryuu = 47;
const CL_Kuma = 48;
const CL_Nagara = 49;
const CL_Sendai = 50;
const CL_Yuubari = 51;
const CL_Agano = 52;
const CL_Ooyodo = 53;
const CL_Gotland = 114;
const CL_Abruzzi = 120;
const CL_DeRuyter = 127;
const CL_Perth = 125;
// 練習巡洋艦
const CT_Katori = 55;
// GROUPS
const group_CL_Navy_IJN = [
    CL_Tenryuu,
    CL_Kuma,
    CL_Nagara,
    CL_Sendai,
    CL_Yuubari,
    CL_Agano,
    CL_Ooyodo,
];
const group_CL_Navy_RM = [CL_Abruzzi];
const group_CL_Navy_RNLN = [CL_DeRuyter];
const group_CL_Navy_RAN = [CL_Perth];
const group_CL_Navy_USN = [CL_Atlanta];
const group_CL_S_Navy_IJN = [
    CLT_Kuma,
    CL_Yuubari2,
    ...group_CL_Navy_IJN,
    CT_Katori,
];

// ============================================================================
//
// DD
//
// ============================================================================
const DD_Kamikaze = 84;
const DD_Mutsuki = 12;
const DD_Fubuki = 15;
const DD_Ayanami = 16;
const DD_Akatsuki = 17;
const DD_Hatsuharu = 18;
const DD_Shiratsuyu = 19;
const DD_Asashio = 20;
const DD_Kagerou = 21;
const DD_Yuugumo = 22;
const DD_Shimakaze = 24;
const DD_Akizuki = 23;
const DD_JohnCButler = 112;
const DD_Fletcher = 117;
const DD_J = 107;
// GROUPS
const group_DD_Navy_IJN = [
    DD_Kamikaze,
    DD_Mutsuki,
    DD_Fubuki,
    DD_Ayanami,
    DD_Akatsuki,
    DD_Hatsuharu,
    DD_Shiratsuyu,
    DD_Asashio,
    DD_Kagerou,
    DD_Yuugumo,
    DD_Akizuki,
    DD_Shimakaze,
];
const group_DD_Navy_USN = [DD_JohnCButler, DD_Fletcher];

module.exports = {
    // ========================================================================
    BB_Ise,
    BBV_Ise,
    BBVR_Ise,
    group_BB_Ise,
    BB_Fusou,
    BBV_Fusou,
    group_BB_Fusou,
    BB_Nagato: 10,
    BB_Yamato: 83,
    BB_Kongou: 9,
    BB_Kongou2: 119,
    BB_Colorado,
    BB_Iowa,
    BB_QueenElizabeth,
    BB_Nelson,
    group_BB_Navy_USN,
    group_BB_Navy_RN,

    // ========================================================================
    CV_Lexington,
    CVB_Lexington,
    CV_Essex,
    CV_ArkRoyal,
    CV_GrafZeppelin,
    CV_Aquila,
    group_CV_Navy_KM,
    group_CV_Navy_RM,
    group_CV_Navy_USN,
    group_CV_Navy_RN,

    CV_Houshou: 33,
    CV_Kagasumaru: 95,
    CV_Taiyou_SP: 96,
    CV_Taiyou: 97,
    CV_Casablanca,

    // ========================================================================
    CAV_Mogami,
    CAV_MogamiRevised,
    CAV_Tone,
    group_CAV_Navy_IJN,
    CA_Furutaka,
    CA_Aoba,
    CA_Myoukou,
    CA_Takao,
    CA_Mogami,
    CA_Tone,
    CA_Houston,
    group_CA_Navy_IJN,
    group_CA_Navy_USN,

    // ========================================================================
    // 重雷装巡洋艦
    CLT_Kuma,
    // 軽航空巡洋艦
    CLV_Gotland,
    // 兵装実験軽巡洋艦
    CL_Yuubari2,
    // 防空巡洋艦
    CL_Atlanta,
    // 軽巡洋艦
    CL_Tenryuu,
    CL_Kuma,
    CL_Nagara,
    CL_Sendai,
    CL_Yuubari,
    CL_Agano,
    CL_Ooyodo,
    CL_Gotland,
    CL_Abruzzi,
    CL_DeRuyter,
    CL_Perth,
    // 練習巡洋艦
    CT_Katori,
    // GROUPS
    group_CL_Navy_IJN,
    group_CL_Navy_RNLN,
    group_CL_Navy_RAN,
    group_CL_Navy_USN,
    group_CL_S_Navy_IJN,

    // ========================================================================
    DD_Kamikaze,
    DD_Mutsuki,
    DD_Special: [DD_Fubuki, DD_Ayanami, DD_Akatsuki],
    DD_Tokugata: [DD_Fubuki, DD_Ayanami, DD_Akatsuki],
    DD_Fubuki,
    DD_Ayanami,
    DD_Akatsuki,
    DD_Hatsuharu,
    DD_Shiratsuyu,
    DD_Asashio,
    DD_Kagerou,
    DD_Yuugumo,
    DD_Akizuki,
    DD_Shimakaze,
    DD_J,
    DD_JohnCButler,
    DD_Fletcher,
    group_DD_Tokugata: [DD_Fubuki, DD_Ayanami, DD_Akatsuki],
    group_DD_Navy_IJN,
    group_DD_Navy_USN,

    AV_Nisshin: 118,

    group_Navy_USN: [
        ...group_BB_Navy_USN,
        ...group_CV_Navy_USN,
        ...group_CA_Navy_USN,
        ...group_CL_Navy_USN,
        ...group_DD_Navy_USN,
    ],
    group_Navy_KM: [...group_CV_Navy_KM],
    group_Navy_RN: [...group_BB_Navy_RN, ...group_CV_Navy_RN, DD_J],
    group_Navy_RM: [...group_CV_Navy_RM, ...group_CL_Navy_RM],
    group_Navy_RNLN: [...group_CL_Navy_RNLN],
    group_Navy_RAN: [...group_CL_Navy_RAN],
};
