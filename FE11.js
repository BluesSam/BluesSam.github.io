class characterClass {//キャラクター用のクラス
    constructor() {//コンストラクター
        this.name  = null;
        this.level = 0;
        this.exp   = 0;
        this.lfmax = 0;
        this.life  = 0;
        this.stren = 0;
        this.defen = 0;
        this.move  = 0;
        this.atkrng= 0;
        this.lf_g  = 0;
        this.srn_g = 0;
        this.dfn_g = 0;
        this.typ   = 0;
        this.posY  = 0;
        this.posX  = 0;
        this.dmg   = 0;
        this.efct  = 0;
        this.etime = 0;
        this.Y     = 0;
        this.X     = 0;
        this.axisY = 0;
        this.axisX = 0;
        this.moveRange = 0;
        this.turn  = 0;
        this.movetime = 0
        this.staY  = 0;
        this.staX  = 0;
        this.ITEM  = 0;
        this.item  = 0;
        this.skill = 0;
        this.skill_count = 0;
        this.react = 0;
    }

    join(n) {//味方ユニットの初期値の代入
        n = (n-1)*11;
        this.name  = CHR_DATA[n];
        this.level = CHR_DATA[n+1];
        this.exp   = 0;
        this.lfmax = CHR_DATA[n+2];
        this.life  = this.lfmax;
        this.stren = CHR_DATA[n+3];
        this.defen = CHR_DATA[n+4];
        this.move  = CHR_DATA[n+5];
        this.atkrng= CHR_DATA[n+6];//射程
        this.lfmx_g= CHR_DATA[n+7];//HP成長率
        this.srn_g = CHR_DATA[n+8];
        this.dfn_g = CHR_DATA[n+9];
        this.SKILL_COUNT_MAX = CHR_DATA[n+10];//奥義カウント最大値 奥義が未開放の場合は最大値が99（奥義開放フラグとして使う）
        this.posY  = 0;//┬攻撃モーション用
        this.posX  = 0;//┘
        this.dmg   = 0;
        this.efct  = 0;
        this.etime = 0;
        this.Y     = 0;//┬ユニットのマス目上の位置
        this.X     = 0;//┘
        this.axisY = 0;//┬ユニットの移動範囲の軸の座標
        this.axisX = 0;//┘
        this.moveRange = new Array(9);//┬移動範囲計算用の2次元配列
        for(var y=0; y<9; y++) {      //┘
            this.moveRange[y] = new Array(12).fill(-2);
        }
        this.turn  = 0;//行動可能なら1
        this.movetime = 0;//歩行音を鳴らすためのプロパティ
        this.staY  = 0;
        this.staX  = 0;
        this.ITEM  = new Array(ITEM_MAX*3);//アイテムの名前、説明、効果値
        this.item  = new Array(ITEM_MAX);//アイテムの個数
        this.skill = 0;//スキルが発動したら1
        this.skill_count = this.SKILL_COUNT_MAX;//奥義カウント
        this.react = 0;//１のとき、再行動フラグがたつ
    }

    levelup() {//レベルアップ
        this.level += 1;
        if(rnd(100) < this.lfmx_g) { this.lfmax += 1; console.log("lfmx+1"); }
        if(rnd(100) < this.srn_g)  { this.stren += 1; console.log("srn+1"); }
        if(rnd(100) < this.dfn_g)  { this.defen += 1; console.log("dfn+1"); }
    }

    setEnemy(n) {
        n = (n-4)*9;
        if(flg[FLG_STAGE+0] == 0 ) {  //断章
            this.name    = EMY[n];
            this.level   = EMY[n+1];
            this.lfmax   = EMY[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY[n+3]; 
            this.defen   = EMY[n+4];
            this.move    = EMY[n+5];
            this.atkrng  = EMY[n+6];//射程
            this.typ     = EMY[n+7];//兵種。敵ユニットの行動順を決めるために使う。
            this.SKILL_COUNT_MAX     = EMY[n+8];
        }
        else if(flg[FLG_EVENT+80] == 1) {//修練場ノーマル
            this.name    = EMY_norT[n];
            this.level   = EMY_norT[n+1];
            this.lfmax   = EMY_norT[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_norT[n+3]; 
            this.defen   = EMY_norT[n+4];
            this.move    = EMY_norT[n+5];
            this.atkrng  = EMY_norT[n+6];
            this.typ     = EMY_norT[n+7];
            this.SKILL_COUNT_MAX     = EMY_norT[n+8];
        }
        else if(flg[FLG_EVENT+81] == 1) {//修練場ハード
            this.name    = EMY_harT[n];
            this.level   = EMY_harT[n+1];
            this.lfmax   = EMY_harT[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_harT[n+3]; 
            this.defen   = EMY_harT[n+4];
            this.move    = EMY_harT[n+5];
            this.atkrng  = EMY_harT[n+6];
            this.typ     = EMY_harT[n+7];
            this.SKILL_COUNT_MAX     = EMY_harT[n+8];
        }
        else if(flg[FLG_EVENT+82] == 1) {//修練場ルナティック
            this.name    = EMY_runT[n];
            this.level   = EMY_runT[n+1];
            this.lfmax   = EMY_runT[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_runT[n+3]; 
            this.defen   = EMY_runT[n+4];
            this.move    = EMY_runT[n+5];
            this.atkrng  = EMY_runT[n+6];
            this.typ     = EMY_runT[n+7];
            this.SKILL_COUNT_MAX     = EMY_runT[n+8];
        }
        else if(flg[FLG_EVENT+83] == 1) {//修練場インファナル
            this.name    = EMY_infT[n];
            this.level   = EMY_infT[n+1];
            this.lfmax   = EMY_infT[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_infT[n+3]; 
            this.defen   = EMY_infT[n+4];
            this.move    = EMY_infT[n+5];
            this.atkrng  = EMY_infT[n+6];
            this.typ     = EMY_infT[n+7];
            this.SKILL_COUNT_MAX     = EMY_infT[n+8];
        }
        else if(flg[FLG_STAGE+1] == 0) {//1章
            this.name    = EMY_1[n];
            this.level   = EMY_1[n+1];
            this.lfmax   = EMY_1[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_1[n+3]; 
            this.defen   = EMY_1[n+4];
            this.move    = EMY_1[n+5];
            this.atkrng  = EMY_1[n+6]; 
            this.typ     = EMY_1[n+7];
            this.SKILL_COUNT_MAX     = EMY_1[n+8];
        }
        else if(flg[FLG_STAGE+2] == 0) {
            this.name    = EMY_2[n];
            this.level   = EMY_2[n+1];
            this.lfmax   = EMY_2[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_2[n+3]; 
            this.defen   = EMY_2[n+4];
            this.move    = EMY_2[n+5];
            this.atkrng  = EMY_2[n+6]; 
            this.typ     = EMY_2[n+7];
            this.SKILL_COUNT_MAX     = EMY_2[n+8];
        }
        else if(flg[FLG_STAGE+3] == 0) {
            this.name    = EMY_3[n];
            this.level   = EMY_3[n+1];
            this.lfmax   = EMY_3[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_3[n+3]; 
            this.defen   = EMY_3[n+4];
            this.move    = EMY_3[n+5];
            this.atkrng  = EMY_3[n+6]; 
            this.typ     = EMY_3[n+7];
            this.SKILL_COUNT_MAX     = EMY_3[n+8];
        }
        else if(flg[FLG_STAGE+4] == 0) {
            this.name    = EMY_4[n];
            this.level   = EMY_4[n+1];
            this.lfmax   = EMY_4[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_4[n+3]; 
            this.defen   = EMY_4[n+4];
            this.move    = EMY_4[n+5];
            this.atkrng  = EMY_4[n+6]; 
            this.typ     = EMY_4[n+7];
            this.SKILL_COUNT_MAX     = EMY_4[n+8];
        }
        else if(flg[FLG_STAGE+5] == 0) {
            this.name    = EMY_5[n];
            this.level   = EMY_5[n+1];
            this.lfmax   = EMY_5[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_5[n+3]; 
            this.defen   = EMY_5[n+4];
            this.move    = EMY_5[n+5];
            this.atkrng  = EMY_5[n+6]; 
            this.typ     = EMY_5[n+7];
            this.SKILL_COUNT_MAX     = EMY_5[n+8];
        }
        else if(flg[FLG_STAGE+6] == 0) {
            this.name    = EMY_6[n];
            this.level   = EMY_6[n+1];
            this.lfmax   = EMY_6[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_6[n+3]; 
            this.defen   = EMY_6[n+4];
            this.move    = EMY_6[n+5];
            this.atkrng  = EMY_6[n+6]; 
            this.typ     = EMY_6[n+7];
            this.SKILL_COUNT_MAX     = EMY_6[n+8];
        }
        else if(flg[FLG_STAGE+7] == 0) {
            this.name    = EMY_7[n];
            this.level   = EMY_7[n+1];
            this.lfmax   = EMY_7[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_7[n+3]; 
            this.defen   = EMY_7[n+4];
            this.move    = EMY_7[n+5];
            this.atkrng  = EMY_7[n+6]; 
            this.typ     = EMY_7[n+7];
            this.SKILL_COUNT_MAX     = EMY_7[n+8];
        }
        else if(flg[FLG_STAGE+8] == 0) {
            this.name    = EMY_8[n];
            this.level   = EMY_8[n+1];
            this.lfmax   = EMY_8[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_8[n+3]; 
            this.defen   = EMY_8[n+4];
            this.move    = EMY_8[n+5];
            this.atkrng  = EMY_8[n+6]; 
            this.typ     = EMY_8[n+7];
            this.SKILL_COUNT_MAX     = EMY_8[n+8];
        }
        else if(flg[FLG_STAGE+9] == 0) {
            this.name    = EMY_9[n];
            this.level   = EMY_9[n+1];
            this.lfmax   = EMY_9[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_9[n+3]; 
            this.defen   = EMY_9[n+4];
            this.move    = EMY_9[n+5];
            this.atkrng  = EMY_9[n+6]; 
            this.typ     = EMY_9[n+7];
            this.SKILL_COUNT_MAX     = EMY_9[n+8];
        }
        
        this.Y       = y;//┬敵ユニットのマス目上の位置
        this.X       = x;//┘
        this.posY    = 0;
        this.posX    = 0;
        this.dmg     = 0;
        this.efct    = 0;
        this.etime   = 0;
        this.moveRange = new Array(9).fill([]).map(() => new Array(12).fill(-2));//┬移動範囲表示専用の2次元配列（あくまでビジュアル要素。移動計算はAIプログラムやbfs()が行う。)
        this.turn    = 0;
        this.movetime = 0;
        this.staY    = 0;
        this.staX    = 0;
        this.skill = 0;
        this.skill_count = this.SKILL_COUNT_MAX;
    }

    setEnemyHard(n) {
        n = (n-4)*9;
        if(flg[FLG_STAGE+0] == 0) { 
            this.name    = EMY_H[n];
            this.level   = EMY_H[n+1];
            this.lfmax   = EMY_H[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_H[n+3]; 
            this.defen   = EMY_H[n+4];
            this.move    = EMY_H[n+5];
            this.atkrng  = EMY_H[n+6]; 
            this.typ     = EMY_H[n+7];//兵種。敵ユニットの行動順を決めるために使う。
            this.SKILL_COUNT_MAX     = EMY_H[n+8];
        }
        else if(flg[FLG_EVENT+80] == 1) {//修練場ノーマル
            this.name    = EMY_norT[n];
            this.level   = EMY_norT[n+1];
            this.lfmax   = EMY_norT[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_norT[n+3]; 
            this.defen   = EMY_norT[n+4];
            this.move    = EMY_norT[n+5];
            this.atkrng  = EMY_norT[n+6];
            this.typ     = EMY_norT[n+7];
            this.SKILL_COUNT_MAX     = EMY_norT[n+8];
        }
        else if(flg[FLG_EVENT+81] == 1) {//修練場ハード
            this.name    = EMY_harT[n];
            this.level   = EMY_harT[n+1];
            this.lfmax   = EMY_harT[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_harT[n+3]; 
            this.defen   = EMY_harT[n+4];
            this.move    = EMY_harT[n+5];
            this.atkrng  = EMY_harT[n+6];
            this.typ     = EMY_harT[n+7];
            this.SKILL_COUNT_MAX     = EMY_harT[n+8];
        }
        else if(flg[FLG_EVENT+82] == 1) {//修練場ルナティック
            this.name    = EMY_runT[n];
            this.level   = EMY_runT[n+1];
            this.lfmax   = EMY_runT[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_runT[n+3]; 
            this.defen   = EMY_runT[n+4];
            this.move    = EMY_runT[n+5];
            this.atkrng  = EMY_runT[n+6];
            this.typ     = EMY_runT[n+7];
            this.SKILL_COUNT_MAX     = EMY_runT[n+8];
        }
        else if(flg[FLG_EVENT+83] == 1) {//修練場インファナル
            this.name    = EMY_infT[n];
            this.level   = EMY_infT[n+1];
            this.lfmax   = EMY_infT[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_infT[n+3]; 
            this.defen   = EMY_infT[n+4];
            this.move    = EMY_infT[n+5];
            this.atkrng  = EMY_infT[n+6];
            this.typ     = EMY_infT[n+7];
            this.SKILL_COUNT_MAX     = EMY_infT[n+8];
        }
        else if(flg[FLG_STAGE+1] == 0){
            this.name    = EMY_H1[n];
            this.level   = EMY_H1[n+1];
            this.lfmax   = EMY_H1[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_H1[n+3]; 
            this.defen   = EMY_H1[n+4];
            this.move    = EMY_H1[n+5];
            this.atkrng  = EMY_H1[n+6]; 
            this.typ     = EMY_H1[n+7];
            this.SKILL_COUNT_MAX     = EMY_H1[n+8];
        }
        else if(flg[FLG_STAGE+2] == 0){
            this.name    = EMY_H2[n];
            this.level   = EMY_H2[n+1];
            this.lfmax   = EMY_H2[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_H2[n+3]; 
            this.defen   = EMY_H2[n+4];
            this.move    = EMY_H2[n+5];
            this.atkrng  = EMY_H2[n+6]; 
            this.typ     = EMY_H2[n+7];
            this.SKILL_COUNT_MAX     = EMY_H2[n+8];
        }
        else if(flg[FLG_STAGE+3] == 0){
            this.name    = EMY_H3[n];
            this.level   = EMY_H3[n+1];
            this.lfmax   = EMY_H3[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_H3[n+3]; 
            this.defen   = EMY_H3[n+4];
            this.move    = EMY_H3[n+5];
            this.atkrng  = EMY_H3[n+6]; 
            this.typ     = EMY_H3[n+7];
            this.SKILL_COUNT_MAX     = EMY_H3[n+8];
        }
        else if(flg[FLG_STAGE+4] == 0){
            this.name    = EMY_H4[n];
            this.level   = EMY_H4[n+1];
            this.lfmax   = EMY_H4[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_H4[n+3]; 
            this.defen   = EMY_H4[n+4];
            this.move    = EMY_H4[n+5];
            this.atkrng  = EMY_H4[n+6]; 
            this.typ     = EMY_H4[n+7];
            this.SKILL_COUNT_MAX     = EMY_H4[n+8];
        }
        else if(flg[FLG_STAGE+5] == 0){
            this.name    = EMY_H5[n];
            this.level   = EMY_H5[n+1];
            this.lfmax   = EMY_H5[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_H5[n+3]; 
            this.defen   = EMY_H5[n+4];
            this.move    = EMY_H5[n+5];
            this.atkrng  = EMY_H5[n+6]; 
            this.typ     = EMY_H5[n+7];
            this.SKILL_COUNT_MAX     = EMY_H5[n+8];
        }
        else if(flg[FLG_STAGE+6] == 0){
            this.name    = EMY_H6[n];
            this.level   = EMY_H6[n+1];
            this.lfmax   = EMY_H6[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_H6[n+3]; 
            this.defen   = EMY_H6[n+4];
            this.move    = EMY_H6[n+5];
            this.atkrng  = EMY_H6[n+6]; 
            this.typ     = EMY_H6[n+7];
            this.SKILL_COUNT_MAX     = EMY_H6[n+8];
        }
        else if(flg[FLG_STAGE+7] == 0){
            this.name    = EMY_H7[n];
            this.level   = EMY_H7[n+1];
            this.lfmax   = EMY_H7[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_H7[n+3]; 
            this.defen   = EMY_H7[n+4];
            this.move    = EMY_H7[n+5];
            this.atkrng  = EMY_H7[n+6]; 
            this.typ     = EMY_H7[n+7];
            this.SKILL_COUNT_MAX     = EMY_H7[n+8];
        }
        else if(flg[FLG_STAGE+8] == 0) {
            this.name    = EMY_H8[n];
            this.level   = EMY_H8[n+1];
            this.lfmax   = EMY_H8[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_H8[n+3]; 
            this.defen   = EMY_H8[n+4];
            this.move    = EMY_H8[n+5];
            this.atkrng  = EMY_H8[n+6]; 
            this.typ     = EMY_H8[n+7];
            this.SKILL_COUNT_MAX     = EMY_H8[n+8];
        }
        else if(flg[FLG_STAGE+9] == 0) {
            this.name    = EMY_H9[n];
            this.level   = EMY_H9[n+1];
            this.lfmax   = EMY_H9[n+2];
            this.life    = this.lfmax;
            this.stren   = EMY_H9[n+3]; 
            this.defen   = EMY_H9[n+4];
            this.move    = EMY_H9[n+5];
            this.atkrng  = EMY_H9[n+6]; 
            this.typ     = EMY_H9[n+7];
            this.SKILL_COUNT_MAX     = EMY_H9[n+8];
        }
        this.Y       = y;//┬敵ユニットのマス目上の位置
        this.X       = x;//┘
        this.posY    = 0;
        this.posX    = 0;
        this.dmg     = 0;
        this.efct    = 0;
        this.etime   = 0;
        this.moveRange = new Array(9).fill([]).map(() => new Array(12).fill(-2));//┬移動範囲表示専用の2次元配列（あくまでビジュアル要素。移動計算はAIプログラムやbfs()が行う。)
        this.turn    = 0;
        this.movetime = 0;
        this.staY    = 0;
        this.staX    = 0;
        this.skill = 0;
        this.skill_count = this.SKILL_COUNT_MAX;

    }
}

function setup() {
    canvasSize(800, 1000);
    //             0       1      2          3          4            5           6             7              8            9           10       11      12      13     14           15             16            17             18               19            20          21        22          23               24              25             26             27        28     29      30     31           32           33            34            35           36           37            38              39          40      41        42            43            44            45         46          47        48        49          50            51                52             53         54         55            56                  57                58        59       60       61        62       63          64              65             66           67              68         69       70         71        72            73          74          75        76         77          78         79         80                   81                82           83          84            85             86          87        88          89                 90            91
    var IMG = ["title", "home", "elion" , "roselyn", "Griffin", "member_mini", "Mercenary", "horseKnight", "axFighter", "enemy_mini", "map1", "map2", "map3", "map4", "shop", "player_phase", "enemy_phase", "condition", "condition_arr", "stage_clear", "game_over", "chapter", "status", "btl_result", "btl_result_back", "re_result", "re_result_back", "levelup", "btn1", "btn2", "btn3", "boss", "window_dif", "window_spk", "window_tec", "window_lvup", "lvup+1", "map_keikoku", "eliminator", "dragon_knight", "move", "fly", "map_hayasi", "map_haikyo", "window_item", "isabella", "norbtn1", "norbtn2", "norbtn3", "brock", "map_nohara", "skillefct_arr", "kiryusen_icon", "btlbtn1", "btlbtn2", "btlbtn3", "grif_shield_icon", "moonlight_icon", "window_monado", "atk", "buster", "spd", "breaker", "live", "monado_shield", "monado_name", "item_name", "grif_shield", "moonlight", "resire", "erufire", "toron", "greatKnight", "assassin", "harbtn1", "harbtn2", "runbtn1", "runbtn2", "infbtn1", "infbtn2", "monado_icon", "blood_blessing_icon", "map_green", "map_koukoku", "niole", "map_teikokumati", "cyclone", "btl_soul", "ema", "dark_monado_icon", "no_weak_icon", "boss_icon"];
    for(var i=0; i<IMG.length; i++) loadImg(i, "imageFE/" + IMG[i] + ".png");

    //            0       1         2           3              4          5        6         7          8        9      10      11          12           13             14             15         16            17           18         19       20     21       22        23        24        25      26        27
    var SND = ["attack", "run", "run_horse", "sel_member", "sel_enemy", "cirBtn", "heal", "levelUp", "level+", "pin", "exp", "sortie", "skill_act", "skill_hit", "bigsword_slash", "home_bgm", "btl1_bgm", "title_bgm", "condition", "phase", "clear", "spd", "baster", "shield", "breaker", "fire", "toron", "resire"];
    for(var i=0; i<SND.length; i++) loadSound(i, "sound/" + SND[i] + ".mp3");
    
}

function mainloop() {
    var i, x, y, w, h, col, btn;//汎用的に使う変数
    counter++;
    if(scene == 0 || scene == 1 || 3 <= scene && scene <= 5 || scene == 7) {//ホーム画面、戦利品シーンの背景、修練場
        drawImgTS(1, 0, 0, 800, 1000, 0, 0, 800, 1000);
    }
    if(scene == 6) drawImgTS(14, 0, 0, 800, 1000, 0, 0, 800, 1000);//ショップの背景
    if(scene == 2 || 30 <= scene ) {//戦場の背景  
        if(flg[FLG_EVENT+2] == 1) {//断章を開始していれば
            if(flg[FLG_STAGE+0] == 0) {//断章をクリアしていなければ
                setAlp(100);
                drawImgTS(10, 0, 0, 800, 1000, 0, 0, 800, 1000);//断章の背景
                setAlp(100);      
            }
            else if (flg[FLG_EVENT+80] == 1 || flg[FLG_EVENT+81] == 1 || flg[FLG_EVENT+82] == 1 || flg[FLG_EVENT+83] == 1) {//修練場を開始したなら
                drawImgTS(50, 0, 0, 800, 1000, 0, 0, 800, 1000);//修練場の背景 
            }       
            else if(flg[FLG_STAGE+1] == 0 && flg[FLG_EVENT+5] == 1) {//1章をクリアしていないかつ、1章を開始したなら
                drawImgTS(11, 0, 0, 800, 1000, 0, 0, 800, 1000);//1章の背景 
            }
            else if(flg[FLG_STAGE+2] == 0 && flg[FLG_EVENT+7] == 1) {//2章をクリアしていないかつ、2章を開始したなら
                drawImgTS(12, 0, 0, 800, 1000, 0, 0, 800, 1000);//2章の背景 
            }
            else if(flg[FLG_STAGE+3] == 0 && flg[FLG_EVENT+10] == 1) {//3章をクリアしていないかつ、3章を開始したなら
                drawImgTS(13, 0, 0, 800, 1000, 0, 0, 800, 1000);//3章の背景 
            }
            else if(flg[FLG_STAGE+4] == 0 && flg[FLG_EVENT+12] == 1) {//4章をクリアしていないかつ、4章を開始したなら
                drawImgTS(37, 0, 0, 800, 1000, 0, 0, 800, 1000);//4章の背景 
            }
            else if(flg[FLG_STAGE+5] == 0 && flg[FLG_EVENT+14] == 1) {//5章をクリアしていないかつ、5章を開始したなら
                drawImgTS(42, 0, 0, 800, 1000, 0, 0, 800, 1000);//5章の背景 
            }
            else if(flg[FLG_STAGE+6] == 0 && flg[FLG_EVENT+16] == 1) {//6章をクリアしていないかつ、6章を開始したなら
                drawImgTS(43, 0, 0, 800, 1000, 0, 0, 800, 1000);//6章の背景 
            }
            else if(flg[FLG_STAGE+7] == 0 && flg[FLG_EVENT+19] == 1) {//7章をクリアしていないかつ、7章を開始したなら
                drawImgTS(82, 0, 0, 800, 1000, 0, 0, 800, 1000);//7章の背景 
            }
            else if(flg[FLG_STAGE+8] == 0 && flg[FLG_EVENT+20] == 1) {//8章をクリアしていないかつ、8章を開始したなら
                drawImgTS(50, 0, 0, 800, 1000, 0, 0, 800, 1000);//8章の背景 
            }
            else if(flg[FLG_STAGE+9] == 0 && flg[FLG_EVENT+21] == 1) {//9章をクリアしていないかつ、9章を開始したなら
                drawImgTS(85, 0, 0, 800, 1000, 0, 0, 800, 1000);//9章の背景 
            }
        }   
        
    }
    if(scene == 1) {
        fText(digit0(int(gtime/30/60/60),2)+":"+digit0(int(gtime/30/60),2)+":"+digit0(int(gtime/30)%60,2), 700, 30, 30, "white");
    }
    //fText("cut : "+cut, 110, 750, 30, "black");//確認用
    //fText("counter : "+counter, 110, 800, 30, "black");//確認用
    //fText("scene : "+scene, 110, 900, 30, "black");//確認用
    //fText("event : "+event, 110, 950, 30, "black");//確認用
    //fText("enemy_turn : "+enemy_turn, 120, 830, 30, "white");//確認用
    
    if(scene > 0) {
        //btn = menuBtn();//メニューボタン
        gtime++;
    }

    switch(scene) {
        case 0://タイトル画面
        drawImgTS(0, 800*int(counter/2%12), 0, 800, 1000, 0, 0, 800, 1000);//タイトルロゴ     
        //console.log("flg[FLG_EVENT+1]" + flg[FLG_EVENT+1]);
        if(hexaBtn(400, 920, 360, 40, 10, "DATA RESET", "#000", "#222", 60)) {
            if(confirm("セーブデータを消去しますか？") == true) clrAllLS();
        }
        if(cut == 0) {
            
            if(tapC == 1) {
                tapC = 0;
                playSE(11);
                playBgm(17);
                initVar();
                autoLoad();
                if(flg[FLG_EVENT+1] == 0) { cut = 1; }//ゲームを初めてプレイするなら難易度選択
                else { cut = 3; }        
            } 
        }   
        if(cut == 1){
            drawImg(32, 0, 0);
            fText("難易度を選択してください", 400, 400, 30, "white");
            //fText("盗賊討伐戦", 400, 415, 47, "white"); 
            fText("初心者、中級者の方に", 540, 530, 25, "white");
            fText("上級者の方に", 540, 650, 25, "white"); 
                if(hexaBtn(260, 530, 200, 50, 20,  "NORMAL", "#900", "#F00", 100)) {
                    cut = 2;
                    dif = 0;
                    playSE(11);
                    break;    
                }
                if(hexaBtn(260, 650, 200, 50, 20,  "HARD", "#009", "#00F", 100)) {
                    cut = 2;
                    dif = 1;
                    playSE(11);
                    break;
                }  
        }
        if(cut == 2) {
            drawFrame(10, 200, 780, 600, "black", "white", 60);
            fText("どの章から開始しますか？", 400, 300, 30, "white");
            //fText("盗賊討伐戦", 400, 415, 47, "white"); 
                if(hexaBtn(380, 450, 200, 50, 20,  "断章", "#000", "#555", 100)) {
                    cut = 3;
                    playSE(11);
                    break;    
                }
                if(hexaBtn(380, 570, 200, 50, 20,  "4章", "#000", "#555", 100)) {
                    cut = 3;
                    playSE(11);
                    flg[FLG_EVENT+1] = 1;//ゲームを初めからプレイ
                    flg[FLG_EVENT+2] = 1;//断章　戦闘前会話
                    flg[FLG_EVENT+3] = 1;//断章　回復チュートリアル
                    flg[FLG_EVENT+4] = 1;//ホーム画面チュートリアル
                    flg[FLG_EVENT+5] = 1;//1章　開始
                    flg[FLG_EVENT+6] = 1;//1章　戦闘前会話
                    flg[FLG_EVENT+7] = 1;//2章　開始
                    flg[FLG_EVENT+8] = 1;//2章　戦闘前会話
                    flg[FLG_EVENT+9] = 1;//2章　グリフィンが駆けつける
                    flg[FLG_EVENT+10] = 1;//3章　開始
                    flg[FLG_EVENT+11] = 1;//3章　戦闘前会話

                    flg[FLG_STAGE+0] = 1;//断章　クリアしたら１
                    flg[FLG_STAGE+1] = 1;//1章
                    flg[FLG_STAGE+2] = 1;//2章
                    flg[FLG_STAGE+3] = 1;//3章

                    MEMBER_MAX = 3;
                    gold = 5000;

                    chara[1].level = 8;//3章終了時点
                    chara[1].lfmax = 26;
                    chara[1].life  = chara[1].lfmax;
                    chara[1].stren = 19;
                    chara[1].defen = 12;
                    chara[1].move  = 2;

                    chara[2].level = 7;
                    chara[2].lfmax = 24;
                    chara[2].life  = chara[2].lfmax;
                    chara[2].stren = 15;
                    chara[2].defen = 11;
                    chara[2].move  = 2;

                    break;
                }  
                if(hexaBtn(380, 690, 200, 50, 20,  "9章", "#000", "#555", 100)) {
                    cut = 3;
                    playSE(11);
                    flg[FLG_EVENT+1] = 1;//ゲームを初めからプレイ
                    flg[FLG_EVENT+2] = 1;//断章　戦闘前会話
                    flg[FLG_EVENT+3] = 1;//断章　回復チュートリアル
                    flg[FLG_EVENT+4] = 1;//ホーム画面チュートリアル
                    flg[FLG_EVENT+5] = 1;//1章　開始
                    flg[FLG_EVENT+6] = 1;//1章　戦闘前会話
                    flg[FLG_EVENT+7] = 1;//2章　開始
                    flg[FLG_EVENT+8] = 1;//2章　戦闘前会話
                    flg[FLG_EVENT+9] = 1;//2章　グリフィンが駆けつける
                    flg[FLG_EVENT+10] = 1;//3章　開始
                    flg[FLG_EVENT+11] = 1;//3章　戦闘前会話
                    flg[FLG_EVENT+12] = 1;//4章　開始
                    flg[FLG_EVENT+13] = 1;//4章　戦闘前会話
                    flg[FLG_EVENT+14] = 1;//5章　開始
                    flg[FLG_EVENT+15] = 1;//5章　戦闘前会話
                    flg[FLG_EVENT+16] = 1;//6章　開始
                    flg[FLG_EVENT+17] = 1;//6章　戦闘前会話
                    flg[FLG_EVENT+18] = 1;//6章　ターン４の会話
                    flg[FLG_EVENT+19] = 1;//7章　開始
                    flg[FLG_EVENT+20] = 1;//8章　開始

                    flg[FLG_EVENT+60] = 1;//エリオンのスキル「輝竜穿」開放。
                    flg[FLG_EVENT+61] = 1;//ローズのスキル「血の祝福」開放。
                    flg[FLG_EVENT+62] = 1;//グリフィンのスキル「大盾」開放。
                    flg[FLG_EVENT+63] = 1;//イザベラのスキル「月光」開放。

                    flg[FLG_STAGE+0] = 1;//断章　クリアしたら１
                    flg[FLG_STAGE+1] = 1;//1章
                    flg[FLG_STAGE+2] = 1;//2章
                    flg[FLG_STAGE+3] = 1;//3章
                    flg[FLG_STAGE+4] = 1;//4章
                    flg[FLG_STAGE+5] = 1;//5章
                    flg[FLG_STAGE+6] = 1;//6章
                    flg[FLG_STAGE+7] = 1;//7章
                    flg[FLG_STAGE+8] = 1;//8章

                    gold = 10000;
                    MEMBER_MAX = 4;

                    chara[1].level = 23;//8章終了時点
                    chara[1].lfmax = 41;
                    chara[1].life  = chara[1].lfmax;
                    chara[1].stren = 31;
                    chara[1].defen = 25;
                    chara[1].move  = 2;

                    chara[2].level = 18;
                    chara[2].lfmax = 34;
                    chara[2].life  = chara[2].lfmax;
                    chara[2].stren = 24;
                    chara[2].defen = 17;
                    chara[2].move  = 2;

                    chara[3].level = 18;
                    chara[3].lfmax = 31;
                    chara[3].life  = chara[3].lfmax;
                    chara[3].stren = 29;
                    chara[3].defen = 16;
                    chara[3].move  = 3;

                    chara[4].level = 15;
                    chara[4].lfmax = 27;
                    chara[4].life  = chara[4].lfmax;
                    chara[4].stren = 29;
                    chara[4].defen = 11;
                    chara[4].move  = 2;

                    //動作確認用スキル操作
                    if(flg[FLG_EVENT+60] == 1) {
                        chara[1].stren += 7;//エリオンのスキル習得後
                        chara[1].SKILL_COUNT_MAX = 2;
                    }
                    if(flg[FLG_EVENT+61] == 1) {
                        chara[2].SKILL_COUNT_MAX = 2;
                    }
                    if(flg[FLG_EVENT+62] == 1) {
                        chara[3].SKILL_COUNT_MAX = 2;
                    }
                    if(flg[FLG_EVENT+63] == 1) {
                        chara[4].SKILL_COUNT_MAX = 2;
                    }

                    //動作確認用アイテム操作
                    if(flg[FLG_EVENT+61] == 1) {
                        chara[2].ITEM[9] = "エマーティノス";
                        chara[2].ITEM[10] = "スキルカウント0のとき使用可。血の祝福を発動。";
                        chara[2].ITEM[11] = chara[2].stren*3;
                        chara[2].item[3] = "∞"; 
                    }
                    if(flg[FLG_EVENT+62] == 1) {
                        chara[3].ITEM[3] = "騎士の弓";
                        chara[3].ITEM[4] = "飛行特攻。1マス離れた敵に弓を放つ。(威力7)";
                        chara[3].ITEM[5] = chara[3].stren+7;
                        chara[3].item[1] = 10;
                    }
                    break;
                } 
        }


        if(cut == 3) {       
            tapC = 0;         
            test = 0;//動作確認をするなら１
            if(test == 1) {
                //動作確認用フラグ操作
                flg[FLG_EVENT+1] = 1;//ゲームを初めからプレイ
                flg[FLG_EVENT+2] = 1;//断章　戦闘前会話
                flg[FLG_EVENT+3] = 1;//断章　回復チュートリアル
                flg[FLG_EVENT+4] = 1;//ホーム画面チュートリアル
                flg[FLG_EVENT+5] = 1;//1章　開始
                flg[FLG_EVENT+6] = 1;//1章　戦闘前会話
                flg[FLG_EVENT+7] = 1;//2章　開始
                flg[FLG_EVENT+8] = 1;//2章　戦闘前会話
                flg[FLG_EVENT+9] = 1;//2章　グリフィンが駆けつける
                flg[FLG_EVENT+10] = 1;//3章　開始
                flg[FLG_EVENT+11] = 1;//3章　戦闘前会話
                flg[FLG_EVENT+12] = 1;//4章　開始
                flg[FLG_EVENT+13] = 1;//4章　戦闘前会話
                flg[FLG_EVENT+14] = 1;//5章　開始
                flg[FLG_EVENT+15] = 1;//5章　戦闘前会話
                // flg[FLG_EVENT+16] = 1;//6章　開始
                // flg[FLG_EVENT+17] = 1;//6章　戦闘前会話
                // flg[FLG_EVENT+18] = 1;//6章　ターン４の会話
                // flg[FLG_EVENT+19] = 1;//7章　開始
                // flg[FLG_EVENT+20] = 1;//8章　開始
                // flg[FLG_EVENT+21] = 1;//9章　開始
                

                flg[FLG_EVENT+60] = 1;//エリオンのスキル「輝竜穿」開放。
                flg[FLG_EVENT+61] = 1;//ローズのスキル「血の祝福」開放。
                flg[FLG_EVENT+62] = 1;//グリフィンのスキル「大盾」開放。
                flg[FLG_EVENT+63] = 1;//イザベラのスキル「月光」開放。

                
                

                // flg[FLG_EVENT+80] = 0;//修練場ノーマル開始
                // flg[FLG_EVENT+81] = 0;//修練場ハード開始
                // flg[FLG_EVENT+82] = 0;//修練場ルナティック開始
                // flg[FLG_EVENT+83] = 0;//修練場インファナル開始


                flg[FLG_STAGE+0] = 1;//断章　クリアしたら１
                flg[FLG_STAGE+1] = 1;//1章
                flg[FLG_STAGE+2] = 1;//2章
                flg[FLG_STAGE+3] = 1;//3章
                flg[FLG_STAGE+4] = 1;//4章
                flg[FLG_STAGE+5] = 1;//5章
                // flg[FLG_STAGE+6] = 1;//6章
                // flg[FLG_STAGE+7] = 1;//7章
                // flg[FLG_STAGE+8] = 1;//8章
                // flg[FLG_STAGE+9] = 1;//9章

                //動作確認用変数操作
                gold = 100000;
                MEMBER_MAX = 4;
                dif = 1;

                //動作確認用ステータス操作

                // chara[1].level = 2;//断章終了時点
                // chara[1].lfmax = 21;
                // chara[1].life  = chara[1].lfmax;
                // chara[1].stren = 13;
                // chara[1].defen = 8;
                // chara[1].move  = 2;

                // chara[2].level = 1;
                // chara[2].lfmax = 19;
                // chara[2].life  = chara[2].lfmax;
                // chara[2].stren = 10;
                // chara[2].defen = 6;
                // chara[2].move  = 2;

                // chara[1].level = 3;//1章終了時点
                // chara[1].lfmax = 22;
                // chara[1].life  = chara[1].lfmax;
                // chara[1].stren = 14;
                // chara[1].defen = 8;
                // chara[1].move  = 2;

                // chara[2].level = 3;
                // chara[2].lfmax = 21;
                // chara[2].life  = chara[2].lfmax;
                // chara[2].stren = 12;
                // chara[2].defen = 8;
                // chara[2].move  = 2;


                // chara[1].level = 6;//2章終了時点
                // chara[1].lfmax = 24;
                // chara[1].life  = chara[1].lfmax;
                // chara[1].stren = 17;
                // chara[1].defen = 11;
                // chara[1].move  = 2;

                // chara[2].level = 5;
                // chara[2].lfmax = 23;
                // chara[2].life  = chara[2].lfmax;
                // chara[2].stren = 13;
                // chara[2].defen = 9;
                // chara[2].move  = 2;

                // chara[1].level = 8;//3章終了時点
                // chara[1].lfmax = 26;
                // chara[1].life  = chara[1].lfmax;
                // chara[1].stren = 19;
                // chara[1].defen = 12;
                // chara[1].move  = 2;

                // chara[2].level = 7;
                // chara[2].lfmax = 24;
                // chara[2].life  = chara[2].lfmax;
                // chara[2].stren = 15;
                // chara[2].defen = 11;
                // chara[2].move  = 2;

                // chara[1].level = 9;//4章終了時点
                // chara[1].lfmax = 27;
                // chara[1].life  = chara[1].lfmax;
                // chara[1].stren = 20;
                // chara[1].defen = 12;
                // chara[1].move  = 2;

                // chara[2].level = 8;
                // chara[2].lfmax = 25;
                // chara[2].life  = chara[2].lfmax;
                // chara[2].stren = 16;
                // chara[2].defen = 12;
                // chara[2].move  = 2;

                // chara[4].level = 11;
                // chara[4].lfmax = 24;
                // chara[4].life  = chara[2].lfmax;
                // chara[4].stren = 25;
                // chara[4].defen = 7;
                // chara[4].move  = 2;

                chara[1].level = 12;//5章終了時点
                chara[1].lfmax = 30;
                chara[1].life  = chara[1].lfmax;
                chara[1].stren = 23;
                chara[1].defen = 15;
                chara[1].move  = 2;

                chara[2].level = 10;
                chara[2].lfmax = 26;
                chara[2].life  = chara[2].lfmax;
                chara[2].stren = 17;
                chara[2].defen = 12;
                chara[2].move  = 2;

                chara[4].level = 12;
                chara[4].lfmax = 25;
                chara[4].life  = chara[4].lfmax;
                chara[4].stren = 26;
                chara[4].defen = 8;
                chara[4].move  = 2;

                // chara[1].level = 14;//6章終了時点
                // chara[1].lfmax = 32;
                // chara[1].life  = chara[1].lfmax;
                // chara[1].stren = 24;
                // chara[1].defen = 16;
                // chara[1].move  = 2;

                // chara[2].level = 11;
                // chara[2].lfmax = 27;
                // chara[2].life  = chara[2].lfmax;
                // chara[2].stren = 18;
                // chara[2].defen = 13;
                // chara[2].move  = 2;

                // chara[3].level = 16;
                // chara[3].lfmax = 29;
                // chara[3].life  = chara[3].lfmax;
                // chara[3].stren = 28;
                // chara[3].defen = 14;
                // chara[3].move  = 3;

                // chara[4].level = 13;
                // chara[4].lfmax = 26;
                // chara[4].life  = chara[4].lfmax;
                // chara[4].stren = 27;
                // chara[4].defen = 9;
                // chara[4].move  = 2;

                // chara[1].level = 20;//7章終了時点
                // chara[1].lfmax = 38;
                // chara[1].life  = chara[1].lfmax;
                // chara[1].stren = 29;
                // chara[1].defen = 22;
                // chara[1].move  = 2;

                // chara[2].level = 17;
                // chara[2].lfmax = 33;
                // chara[2].life  = chara[2].lfmax;
                // chara[2].stren = 23;
                // chara[2].defen = 17;
                // chara[2].move  = 2;

                // chara[3].level = 16;
                // chara[3].lfmax = 29;
                // chara[3].life  = chara[3].lfmax;
                // chara[3].stren = 28;
                // chara[3].defen = 14;
                // chara[3].move  = 3;

                // chara[4].level = 13;
                // chara[4].lfmax = 26;
                // chara[4].life  = chara[4].lfmax;
                // chara[4].stren = 27;
                // chara[4].defen = 9;
                // chara[4].move  = 2;

                // chara[1].level = 23;//8章終了時点
                // chara[1].lfmax = 41;
                // chara[1].life  = chara[1].lfmax;
                // chara[1].stren = 31;
                // chara[1].defen = 25;
                // chara[1].move  = 2;

                // chara[2].level = 18;
                // chara[2].lfmax = 34;
                // chara[2].life  = chara[2].lfmax;
                // chara[2].stren = 24;
                // chara[2].defen = 17;
                // chara[2].move  = 2;

                // chara[3].level = 18;
                // chara[3].lfmax = 31;
                // chara[3].life  = chara[3].lfmax;
                // chara[3].stren = 29;
                // chara[3].defen = 16;
                // chara[3].move  = 3;

                // chara[4].level = 15;
                // chara[4].lfmax = 27;
                // chara[4].life  = chara[4].lfmax;
                // chara[4].stren = 29;
                // chara[4].defen = 11;
                // chara[4].move  = 2;

                // chara[1].level = 25;//9章終了時点
                // chara[1].lfmax = 43;
                // chara[1].life  = chara[1].lfmax;
                // chara[1].stren = 39;
                // chara[1].defen = 26;
                // chara[1].move  = 2;

                // chara[2].level = 20;
                // chara[2].lfmax = 36;
                // chara[2].life  = chara[2].lfmax;
                // chara[2].stren = 26;
                // chara[2].defen = 18;
                // chara[2].move  = 2;

                // chara[3].level = 19;
                // chara[3].lfmax = 31;
                // chara[3].life  = chara[3].lfmax;
                // chara[3].stren = 29;
                // chara[3].defen = 17;
                // chara[3].move  = 3;

                // chara[4].level = 16;
                // chara[4].lfmax = 28;
                // chara[4].life  = chara[4].lfmax;
                // chara[4].stren = 30;
                // chara[4].defen = 12;
                // chara[4].move  = 2;

                // chara[1].level = 99;//限界突破状態
                // chara[1].lfmax = 500;
                // chara[1].life  = 500;
                // chara[1].stren = 800;
                // chara[1].defen = 800;
                // chara[1].move  = 10;

                // chara[2].level = 99;//限界突破状態
                // chara[2].lfmax = 500;
                // chara[2].life  = 500;
                // chara[2].stren = 800;
                // chara[2].defen = 800;
                // chara[2].move  = 10;

                // chara[1].level = 18;
                // chara[1].lfmax = 36;
                // chara[1].life  = 36;
                // chara[1].stren = 25;
                // chara[1].defen = 19;
                // chara[1].move  = 2;

                // chara[2].level = 14;
                // chara[2].lfmax = 27;
                // chara[2].life  = 27;
                // chara[2].stren = 19;
                // chara[2].defen = 12;
                // chara[2].move  = 2;

                //動作確認用スキル操作
                if(flg[FLG_EVENT+60] == 1) {
                    chara[1].stren += 7;//エリオンのスキル習得後
                    chara[1].SKILL_COUNT_MAX = 2;
                }
                if(flg[FLG_EVENT+61] == 1) {
                    chara[2].SKILL_COUNT_MAX = 2;
                }
                if(flg[FLG_EVENT+62] == 1) {
                    chara[3].SKILL_COUNT_MAX = 2;
                }
                if(flg[FLG_EVENT+63] == 1) {
                    chara[4].SKILL_COUNT_MAX = 2;
                }

                //動作確認用アイテム操作

                if(flg[FLG_EVENT+61] == 1) {
                    chara[2].ITEM[9] = "エマーティノス";
                    chara[2].ITEM[10] = "スキルカウント0のとき使用可。血の祝福を発動。";
                    chara[2].ITEM[11] = chara[2].stren*3;
                    chara[2].item[3] = "∞"; 
                }
                if(flg[FLG_EVENT+62] == 1) {
                    chara[3].ITEM[3] = "騎士の弓";
                    chara[3].ITEM[4] = "飛行特攻。1マス離れた敵に弓を放つ。(威力7)";
                    chara[3].ITEM[5] = chara[3].stren+7;
                    chara[3].item[1] = 10;
                }
                     
            }

            //flg[FLG_EVENT+1] = 1;//途中から始めるバーションのとき
            stopBgm(17);
            if(flg[FLG_EVENT+1] == 0) {
                scene = 2;
                counter = 0;
                event = FLG_EVENT+1;//オープニング
                flg[FLG_EVENT+1] = 1;//ゲームを初めからプレイしたフラグ
                break;
            } else {
                toHome();
            }   
        }
        break;

        case 1://ホーム画面
        if(flg[FLG_EVENT+4] == 0) {//ホーム画面のチュートリアル
            event = FLG_EVENT+4;
            scene = 2;
            counter = 0;
            cut = 0;
            flg[FLG_EVENT+4] = 1;  
        }
        drawImgTS(2, 0, 0, 160, 160, 350, 300, SIZE*4.2, SIZE*4.2);
        drawImg(34, 10, 220);
        fText("何をしようか。", 410, 700, 30, "white");  
        if(counter == 1) {
            autoSave();
            playBgm(15);
            
         }
         if(ellipseBtn(30, 110, "戦場へ")) {
            cut = 1;
            playSE(5);
        }
        if(cut == 1) {
            drawFrame(10, 220, 780, 550, "black", "white", 100);
            var x = 400;
            var y = 515;
            if(flg[FLG_STAGE+1] == 0) {
                fText("1 章", 400, 320, 30, "white");
                fText("盗賊討伐戦", 400, 415, 47, "white"); 
                fText("山間の村が盗賊に襲われている報告を受けたエリオン達。", x, y, 25, "white");
                fText("民間人の救助と盗賊の討伐のため、村へと向かった。", x, y+40, 25, "white"); 
                    if(hexaBtn(250, 680, 200, 50, 20,  "出撃", "#900", "#F00", 100)) {
                        clrMsg();
                        stopBgm(15);
                        event = FLG_EVENT + 5;
                        scene = 2;
                        counter = 0;
                        cut = 0;
                        playSE(11);
                        break;    
                    }  
            }
            else if(flg[FLG_STAGE+2] == 0){
                fText("2 章", 400, 320, 30, "white");
                fText("緑髪の騎士", 400, 415, 47, "white"); 
                fText("野営中に帝国軍の奇襲を受けたエリオン達。", x, y, 25, "white");
                fText("敵の大群を前に苦戦を強いられる。", x, y+40, 25, "white"); 
                    if(hexaBtn(250, 680, 200, 50, 20,  "出撃", "#900", "#F00", 100)) {
                        clrMsg();
                        stopBgm(15);
                        event = FLG_EVENT+7;
                        scene = 2;
                        counter = 0;
                        cut = 0;
                        playSE(11);
                        break;    
                    }
            }
            else if(flg[FLG_STAGE+3] == 0){
                fText("3 章", 400, 320, 30, "white");
                fText("砂漠の謎", 400, 415, 47, "white"); 
                fText("王国騎士団の任務で、砂漠の偵察に来たエリオン達。", x, y, 25, "white");
                fText("そこには、帝国軍の姿があった。", x, y+40, 25, "white"); 
                    if(hexaBtn(250, 680, 200, 50, 20,  "出撃", "#900", "#F00", 100)) {
                        clrMsg();
                        stopBgm(15);
                        event = FLG_EVENT+10;
                        scene = 2;
                        counter = 0;
                        cut = 0;
                        playSE(11);
                        break;    
                    }
            }
            else if(flg[FLG_STAGE+4] == 0){
                fText("4 章", 400, 320, 30, "white");
                fText("闇の渓谷", 400, 415, 47, "white"); 
                fText("砂漠を調査したところ、妙な渓谷を発見した。", x, y, 25, "white");
                fText("そこには、様子がおかしい帝国兵たちがいた。", x, y+40, 25, "white"); 
                    if(hexaBtn(250, 680, 200, 50, 20,  "出撃", "#900", "#F00", 100)) {
                        clrMsg();
                        stopBgm(15);
                        event = FLG_EVENT+12;
                        scene = 2;
                        counter = 0;
                        cut = 0;
                        playSE(11);
                        break;    
                    }
            }   
            else if(flg[FLG_STAGE+5] == 0){
                fText("5 章", 400, 320, 30, "white");
                fText("エリミネーター", 400, 415, 47, "white"); 
                fText("なんとかエリミネーターを倒したが、それもつかの間、", x, y, 25, "white");
                fText("さらなる困難が待ち受けていた。", x, y+40, 25, "white"); 
                    if(hexaBtn(250, 680, 200, 50, 20,  "出撃", "#900", "#F00", 100)) {
                        clrMsg();
                        stopBgm(15);
                        event = FLG_EVENT+14;
                        scene = 2;
                        counter = 0;
                        cut = 0;
                        playSE(11);
                        break;    
                    }
            }   
            else if(flg[FLG_STAGE+6] == 0){
                fText("6 章", 400, 320, 30, "white");
                fText("激戦", 400, 415, 47, "white"); 
                fText("エリミネーターたちの包囲網を抜けたエリオンたち。", x, y, 25, "white");
                fText("ついに謎の人物を追い詰めることに成功する。", x, y+40, 25, "white"); 
                    if(hexaBtn(250, 680, 200, 50, 20,  "出撃", "#900", "#F00", 100)) {
                        clrMsg();
                        stopBgm(15);
                        event = FLG_EVENT+16;
                        scene = 2;
                        counter = 0;
                        cut = 0;
                        playSE(11);
                        break;    
                    }
            }    
            else if(flg[FLG_STAGE+7] == 0){
                fText("7 章", 400, 320, 30, "white");
                fText("迫る強敵", 400, 415, 47, "white"); 
                fText("森林偵察をしていたエリオン達。そこで、とてつもなく", x, y, 25, "white");
                fText("強い敵兵と遭遇し、防戦一方となる。", x, y+40, 25, "white"); 
                    if(hexaBtn(250, 680, 200, 50, 20,  "出撃", "#900", "#F00", 100)) {
                        clrMsg();
                        stopBgm(15);
                        event = FLG_EVENT+19;
                        scene = 2;
                        counter = 0;
                        cut = 0;
                        playSE(11);
                        break;    
                    }
            }  
            else if(flg[FLG_STAGE+8] == 0){
                fText("8 章", 400, 320, 30, "white");
                fText("公国防衛戦", 400, 415, 47, "white"); 
                fText("公国を攻めてきた帝国兵。エリオン達は公国に向かい、", x, y, 25, "white");
                fText("帝国兵と戦うことになる。", x, y+40, 25, "white"); 
                    if(hexaBtn(250, 680, 200, 50, 20,  "出撃", "#900", "#F00", 100)) {
                        clrMsg();
                        stopBgm(15);
                        event = FLG_EVENT+20;
                        scene = 2;
                        counter = 0;
                        cut = 0;
                        playSE(11);
                        break;    
                    }
            } 
            else if(flg[FLG_STAGE+9] == 0){
                fText("9 章", 400, 320, 30, "white");
                fText("帝国侵攻", 400, 415, 47, "white"); 
                fText("戦争を終わらせるため、帝国へ侵攻する王国軍。", x, y, 25, "white");
                fText("エリオンは皇子と遭遇し、その顔に驚きを隠せなかった。", x, y+40, 25, "white"); 
                    if(hexaBtn(250, 680, 200, 50, 20,  "出撃", "#900", "#F00", 100)) {
                        clrMsg();
                        stopBgm(15);
                        event = FLG_EVENT+21;
                        scene = 2;
                        counter = 0;
                        cut = 0;
                        playSE(11);
                        break;    
                    }
            }  
            else if(flg[FLG_STAGE+10] == 0){
                fText("", 400, 320, 30, "white");
                fText("準備中", 400, 415, 47, "white"); 
                fText("", x, y, 25, "white");
                fText("", x, y+40, 25, "white"); 
                    //if(hexaBtn(250, 680, 200, 50, 20,  "出撃", "#900", "#F00", 100)) {
                        //clrMsg();
                        //stopBgm(15);
                        //event = FLG_EVENT+16;
                        //scene = 2;
                        //counter = 0;
                        //cut = 0;
                        //playSE(11);
                        //break;    
                    //}
            }    
            if(hexaBtn(550, 680, 200, 50, 20,  "キャンセル", "#009", "#00F", 100)) {
                cut = 0;
                playSE(5);
                break;
            }
        }


        if(cirBtn(300, 900, 100, "パーティ")) {
            scene = 4;
            counter = 0;
            sel_member = 1;
        }
        if(cirBtn(500, 900, 100, "アイテム")) {
            scene = 5;
            counter = 0;
            cut = 0;
            sel_member = 1;
            sel_item = 0;
        }
        if(cirBtn(700, 900, 100, "ショップ")) {
            scene = 6;
            counter = 0;
            cut = 0;
            sel_member = 1;
            sel_item = 0;
        }
        if(cirBtn(100, 900, 100, "修練場")) {
            scene = 7;
            counter = 0;
        }

        
        break;

        case 2://イベント画面
        if(event == FLG_EVENT+1) {//断章の初め
            if(counter <= 20) {
                fill("black");
            }
            if(21 <= counter && counter <= 100) {
                setAlp(counter-21);
                drawImgTS(21, 800*0, 0, 800, 1000, 0, 0, 800, 1000);
                setAlp(100);
            }
            if(121 <= counter && counter <= 180) {          
                drawImgTS(21, 800*0, 0, 800, 1000, 0, 0, 800, 1000);   
                setAlp((counter-121)*3);
                fill("white");
                setAlp(100);
            }       
            if(180 == counter) {
                makeStage();
            } 
            break;
        }
        if(event == FLG_EVENT+2) {//断章の会話
            drawBG();
            if(counter == 1)  cut = 0;    
            if(cut == 0) {
                putUnit(2);
                putMsg(400, 900);
                putName("ローズ");
                setMsg("行きましょう、エリオン。");
                setMsg("敵を倒すんです。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                }
            }
            if(cut == 1) {
                drawImg(34, 0, -5);
                fText("ユニットをクリックして選択しましょう。", 400, 450, 20, "white");
                fText("クリックした場所に移動し、「待機」を押しましょう。",400, 500, 20, "white");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    scene = 30;
                    counter = 6;//イベントの重複を防ぐ
                    cut = 0;
                }
            }
            if(cut == 2) {
                putUnit(2);
                putMsg(400, 900);
                putName("ローズ");
                setMsg("さあ、行きますよ。");
                setMsg("敵を攻撃してください。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                }
            }
            if(cut == 3) {
                drawImg(34, 0, -5);
                fText("敵ユニットの近くまで動き、「攻撃」を押しましょう。", 400, 450, 20, "white");
                fText("隣接する敵をクリックすると攻撃を開始します。",400, 500, 20, "white");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    scene = 41;
                    counter = 0;
                    cut = 0;
                }
            }
            if(cut == 4) {
                putUnit(2);
                putMsg(400, 900);
                putName("ローズ");
                setMsg("傷を負いましたか。");
                setMsg("私の杖で回復してあげます。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                }
            }
            if(cut == 5) {
                drawImg(34, 0, -5);
                fText("ローズは味方を回復できます。ローズの", 400, 450, 20, "white");
                fText("アイテムから「バーパ」を選びましょう。",400, 500, 20, "white");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                }
            }
            if(cut == 6) {
                drawImg(34, 0, -5);
                fText("「バーパ」は隣接する味方を回復する杖です。", 400, 450, 20, "white");
                fText("また、「傷薬」は自分のHPを回復できます。",400, 500, 20, "white");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    scene = 41;
                    counter = 0;
                    cut = 0;
                }
            }
            break;     
        }
        if(event == FLG_STAGE+0) {//断章クリア後のイベント
            drawBG();
            if(cut == 0 && counter <= 40) {         
                setAlp(counter*5);
                fill("black");
                setAlp(100);
            }
            if(cut == 0 && counter == 41) cut = 1;
            if(cut == 1) {
                putUnit(2);
                putMsg(400, 900);
                putName("ローズ");
                setMsg("無事にここは守ることができました。");
                setMsg("他の部隊も大丈夫でしょう。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                }
            }
            if(cut == 2) {
                putUnit(2);
                putMsg(400, 900);
                putName("ローズ");
                setMsg("エリオン、撤退しましょう。");
                setMsg("");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 3 && counter <= 40) {
                setAlp(counter*5);
                fill("black");
                setAlp(100);
            }
            if(cut == 3 && counter == 40) {
                scene = 3;
                counter = 0;
                cut = 0;
                flg[FLG_STAGE + 0] = 1;//断章クリアのフラグ
                break;
            }
        }
        if(event == FLG_EVENT+4) {//ホーム画面のチュートリアル
            drawImgTS(1, 0, 0, 800, 1000, 0, 0, 800, 1000);//居住ドーム
            drawImg(34, 0, -5);
            fText("ここはホームです。戦いの準備をしたり", 400, 450, 20, "white");
            fText("ユニットのステータスを見ることができます。",400, 500, 20, "white");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    toHome();
                }
        }

        if(event == FLG_EVENT+80) {//修練場ノーマル開始
            if(counter <= 20) {
                fill("black");
            }
            if(20 == counter) {
                flg[FLG_EVENT+80] = 1;//背景を表示
                makeStage();
                break;
            } 
            break;
        }
        if(event == FLG_EVENT+81) {//修練場ハード開始
            if(counter <= 20) {
                fill("black");
            }
            if(20 == counter) {
                flg[FLG_EVENT+81] = 1;//背景を表示
                makeStage();
                break;
            } 
            break;
        }
        if(event == FLG_EVENT+82) {//修練場ルナ開始
            if(counter <= 20) {
                fill("black");
            }
            if(20 == counter) {
                flg[FLG_EVENT+82] = 1;//背景を表示
                makeStage();
                break;
            } 
            break;
        }
        if(event == FLG_EVENT+83) {//修練場インファナル開始
            if(counter <= 20) {
                fill("black");
            }
            if(20 == counter) {
                flg[FLG_EVENT+83] = 1;//背景を表示
                makeStage();
                break;
            } 
            break;
        }

        if(event == FLG_EVENT+5) {//1章開始 
            if(counter <= 20) {
                fill("black");
            }
            if(21 <= counter && counter <= 100) {
                setAlp(counter-21);
                drawImgTS(21, 800*1, 0, 800, 1000, 0, 0, 800, 1000);
                setAlp(100);
            }
            if(121 <= counter && counter <= 180) {          
                drawImgTS(21, 800*1, 0, 800, 1000, 0, 0, 800, 1000);   
                setAlp((counter-121)*3);
                fill("white");
                setAlp(100);
            }       
            if(180 == counter) {
                makeStage();
                flg[FLG_EVENT+5] = 1;//背景を表示
                break;
            } 
            break;   
        }    
        if(event == FLG_EVENT+6) {//1章戦闘前会話
            drawBG();
            if(cut == 0){
                setAlp(counter);
                putUnit(2);
                putMsg(400, 900);
                putName("ローズ");
                setMsg("今回の任務は盗賊退治です。");
                setMsg("この村を襲っている者たちを倒します。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 1){
                setAlp(counter);
                putUnit(1);
                putMsg(400, 900);
                putName("エリオン");
                setMsg("分かった。気をつけていこう。");
                setMsg("");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    scene = 30;
                    cut = 0;
                    counter = 6;
                    break;
                }
            }
            if(cut == 2){
                setAlp(counter);
                putUnit(2);
                putMsg(400, 900);
                putName("ローズ");
                setMsg("エリオン、私はマギを持っています。");
                setMsg("これで、遠くの敵を攻撃できますよ。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 3){
                setAlp(counter);
                drawImg(34, 0, -5);
                fText("マギは1マス離れた敵を攻撃できます。", 400, 450, 20, "white");
                fText("通常攻撃よりも威力が高いので強力です。",400, 500, 20, "white");
                setMsg();
                setMsg();
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    scene = 41;
                    cut = 0;
                    counter = 0;
                    break;
                }
            }
        }
        
            
        if(event == FLG_STAGE+1) {//1章クリア後
            drawBG();
            if(cut == 0 && counter <= 40) {         
                setAlp(counter*5);
                fill("black");
                setAlp(100);
            }
            if(cut == 0 && counter == 41) cut = 1;
            if(cut == 1) {
                putUnit(2);
                putMsg(400, 900);
                putName("ローズ");
                setMsg("盗賊を全滅させました。");
                setMsg("民間人の保護も完了しています。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                }
            }
            if(cut == 2) {
                putUnit(2);
                putMsg(400, 900);
                putName("ローズ");
                setMsg("任務終了です。帰還しましょう。");
                setMsg("");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 3) {
                putUnit(1);
                putMsg(400, 900);
                putName("エリオン");
                setMsg("うん。そうしよう。");
                setMsg("");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 4 && counter <= 40) {
                setAlp(counter*5);
                fill("black");
                setAlp(100);
            }
            if(cut == 4 && counter == 40) {
                scene = 3;
                counter = 0;
                cut = 0;
                flg[FLG_STAGE + 1] = 1;//1章クリアのフラグ
                break;
            }
        }
        

        if(event == FLG_EVENT+7) {//2章開始 
            if(counter <= 20) {
                fill("black");
            }
            if(21 <= counter && counter <= 100) {
                setAlp(counter-21);
                drawImgTS(21, 800*2, 0, 800, 1000, 0, 0, 800, 1000);
                setAlp(100);
            }
            if(121 <= counter && counter <= 180) {          
                drawImgTS(21, 800*2, 0, 800, 1000, 0, 0, 800, 1000);   
                setAlp((counter-121)*3);
                fill("white");
                setAlp(100);
            }       
            if(180 == counter) {
                makeStage();
                flg[FLG_EVENT+7] = 1;//背景を表示
                break;
            } 
            break;
            
        }    
        if(event == FLG_EVENT+8) {//2章戦闘前会話
            drawBG();
            if(cut == 0){
                setAlp(counter);
                putUnit(2);
                putMsg(400, 900);
                putName("ローズ");
                setMsg("エリオン、敵の奇襲を受けました。");
                setMsg("敵の数は膨大です。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 1){
                setAlp(counter);
                putUnit(1);
                putMsg(400, 900);
                putName("エリオン");
                setMsg("敵は馬に乗ってるね。");
                setMsg("移動に注意して戦おう。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    scene = 30;
                    cut = 0;
                    counter = 6;
                    break;
                }
            }
        }
        if(event == FLG_EVENT+9) {//グリフィンが救援で駆けつける
            drawBG();
            if(counter == 20 && cut == 0) {
                MEMBER_MAX++;
                member_map[1][1] = 3;
                chara[3].turn = 1;
                cut++;
                counter = 0;
            }
        
                if(cut == 1 && 60 <= counter){
                    setAlp(counter);
                    putUnit(3);
                    putMsg(400, 900);
                    putName("グリフィン");
                    setMsg("ふう。帝国兵を追ってみたら");
                    setMsg("こんなに大勢いるとはな。");
                    if(tapC == 1) {
                        tapC = 0;
                        clrMsg();
                        cut++;
                        counter = 0;
                    }
                }
                if(cut == 2){
                    setAlp(counter);
                    putUnit(3);
                    putMsg(400, 900);
                    putName("グリフィン");
                    setMsg("ん？あれは王国兵か？");
                    setMsg("早く助けに行かないと。");
                    if(tapC == 1) {
                        tapC = 0;
                        clrMsg();
                        scene = 40;
                        cut = 0;
                        counter = 0;
                        break;
                    }
                }
            
            }
        if(event == FLG_STAGE+2) {//2章クリア後
            drawBG();
            if(cut == 0 && counter <= 40) {         
                setAlp(counter*5);
                fill("black");
                setAlp(100);
            }
            if(cut == 0 && counter == 41) cut = 1;
            if(cut == 1) {
                putUnit(1);
                putMsg(400, 900);
                putName("エリオン");
                setMsg("緑髪の騎士、助けてくれてありがとう。");
                setMsg("王国兵なのか？");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                }
            }
            if(cut == 2) {
                putUnit(3);
                putMsg(400, 900);
                putName("グリフィン");
                setMsg("そうだ。俺はグリフィン。ここを偵察していたら");
                setMsg("たまたま帝国兵を見かけてな。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 3) {
                putUnit(3);
                putMsg(400, 900);
                putName("グリフィン");
                setMsg("追ってみたらあんたたちがいたわけだ。");
                setMsg("");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 4) {
                putUnit(2);
                putMsg(400, 900);
                putName("ローズ");
                setMsg("なんにせよ、助かりました。");
                setMsg("私はローズ、こちらはエリオンです。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 5) {
                putUnit(3);
                putMsg(400, 900);
                putName("グリフィン");
                setMsg("ああ、よろしく頼むよ。");
                setMsg("");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 6) {
                putUnit(3);
                putMsg(400, 900);
                putName("グリフィン");
                setMsg("しばらくは偵察も兼ねてあんたたちと");
                setMsg("行動を共にしよう。よろしくな。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 7) {
                drawImg(34, 0, -5);
                fText("グリフィンが加入しました！", 400, 475, 20, "white");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 8 && counter <= 40) {
                setAlp(counter*5);
                fill("black");
                setAlp(100);
            }
            if(cut == 8 && counter == 40) {
                scene = 3;
                counter = 0;
                cut = 0;
                flg[FLG_STAGE + 2] = 1;//2章クリアのフラグ
                break;
            }
        }
        if(event == FLG_EVENT+10) {//3章開始 
            if(counter <= 20) {
                fill("black");
            }
            if(21 <= counter && counter <= 100) {
                setAlp(counter-21);
                drawImgTS(21, 800*3, 0, 800, 1000, 0, 0, 800, 1000);
                setAlp(100);
            }
            if(121 <= counter && counter <= 180) {          
                drawImgTS(21, 800*3, 0, 800, 1000, 0, 0, 800, 1000);   
                setAlp((counter-121)*3);
                fill("white");
                setAlp(100);
            }       
            if(180 == counter) {
                makeStage();
                flg[FLG_EVENT+10] = 1;//背景を表示
                break;
            } 
            break;
            
        }    
        if(event == FLG_EVENT+11) {//3章戦闘前会話
            drawBG();
            if(cut == 0){
                setAlp(counter);
                putUnit(2);
                putMsg(400, 900);
                putName("ローズ");
                setMsg("敵の奇襲を受けました。後ろから飛竜が");
                setMsg("迫ってきます。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 1){
                setAlp(counter);
                putUnit(3);
                putMsg(400, 900);
                putName("グリフィン");
                setMsg("挟み撃ちか。砂漠をもう少しで抜けられる");
                setMsg("というのに...。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 2){
                setAlp(counter);
                putUnit(1);
                putMsg(400, 900);
                putName("エリオン");
                setMsg("アルカナの力を使えば切り抜けられるか...？");
                setMsg("");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    scene = 30;
                    cut = 0;
                    counter = 6;
                    break;
                }
            }
        }    
        if(event == FLG_STAGE+3) {//3章クリア後
            drawBG();
            if(cut == 0 && counter <= 40) {         
                setAlp(counter*5);
                fill("black");
                setAlp(100);
            }
            if(cut == 0 && counter == 41) cut = 1;
            if(cut == 1) {
                putUnit(2);
                putMsg(400, 900);
                putName("ローズ");
                setMsg("敵全滅を確認しました。あそこに見えるのは");
                setMsg("渓谷でしょうか。なにかありそうですね。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                }
            }
            if(cut == 2) {
                putUnit(1);
                putMsg(400, 900);
                putName("エリオン");
                setMsg("帝国軍がここにいた理由があるのかも");
                setMsg("しれない。調べてみよう。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 3 && counter <= 40) {
                setAlp(counter*5);
                fill("black");
                setAlp(100);
            }
            if(cut == 3 && counter == 40) {
                scene = 3;
                counter = 0;
                cut = 0;
                flg[FLG_STAGE + 3] = 1;//3章クリアのフラグ
                break;
            }
        }
        if(event == FLG_EVENT+12) {//4章開始 
            if(counter <= 20) {
                fill("black");
            }
            if(21 <= counter && counter <= 100) {
                setAlp(counter-21);
                drawImgTS(21, 800*4, 0, 800, 1000, 0, 0, 800, 1000);
                setAlp(100);
            }
            if(121 <= counter && counter <= 180) {          
                drawImgTS(21, 800*4, 0, 800, 1000, 0, 0, 800, 1000);   
                setAlp((counter-121)*3);
                fill("white");
                setAlp(100);
            }       
            if(180 == counter) {
                makeStage();
                flg[FLG_EVENT+12] = 1;//背景を表示
                break;
            } 
            break;   
        }    
        if(event == FLG_EVENT+13) {//4章戦闘前会話
            drawBG();
            if(cut == 0){
                setAlp(counter);
                putUnit(1);
                putMsg(400, 900);
                putName("エリオン");
                setMsg("なんだ、あの帝国兵は？様子がおかしいぞ。");
                setMsg("");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 1){
                setAlp(counter);
                putUnit(37);
                putMsg(400, 900);
                putName("???");
                setMsg("......。");
                setMsg("");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 2){
                setAlp(counter);
                putUnit(30);
                putMsg(400, 900);
                putName("???");
                setMsg("実験の邪魔をするな。誰か知らんが。");
                setMsg("");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 3){
                setAlp(counter);
                putUnit(30);
                putMsg(400, 900);
                putName("???");
                setMsg("まあいい、お前らには「エリミネーター」の");
                setMsg("実験に協力してもらおう。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 4){
                setAlp(counter);
                putUnit(3);
                putMsg(400, 900);
                putName("グリフィン");
                setMsg("来るぞ！");
                setMsg("");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 5){
                setAlp(counter);
                putUnit(44);
                putMsg(400, 900);
                putName("???");
                setMsg("あれは王国の兵たちかしら？");
                setMsg("加勢しないと。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    flg[FLG_EVENT+63] = 1;//月光開放
                    scene = 30;
                    cut = 0;
                    counter = 6;
                    break;
                }
            }

        }
        
            
        if(event == FLG_STAGE+4) {//4章クリア後
            drawBG();
            if(cut == 0 && counter <= 40) {         
                setAlp(counter*5);
                fill("black");
                setAlp(100);
            }
            if(cut == 0 && counter == 41) cut = 1;
            if(cut == 1) {
                putUnit(1);
                putMsg(400, 900);
                putName("エリオン");
                setMsg("なんとか倒せたが、一体何だ？");
                setMsg("あの人間は！");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                }
            }
            if(cut == 2) {
                putUnit(30);
                putMsg(400, 900);
                putName("???");
                setMsg("ほう、少しはやるようだな。おかげで");
                setMsg("良いデータがとれそうだ。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 3) {
                putUnit(2);
                putMsg(400, 900);
                putName("ローズ");
                setMsg("逃げていきますね。追いましょう。");
                setMsg("");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 4) {
                putUnit(44);
                putMsg(400, 900);
                putName("イザベラ");
                setMsg("私もいくわ。私の魔法とダークペガサスが");
                setMsg("力になれると思うわよ。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 5) {
                putUnit(1);
                putMsg(400, 900);
                putName("エリオン");
                setMsg("さっきは助かったよ、イザベラ。");
                setMsg("ぜひ協力してくれ。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 6 && counter <= 40) {
                setAlp(counter*5);
                fill("black");
                setAlp(100);
            }
            if(cut == 6 && counter == 40) {
                scene = 3;
                counter = 0;
                cut = 0;
                flg[FLG_STAGE + 4] = 1;//4章クリアのフラグ
                break;
            }
        }
        if(event == FLG_EVENT+14) {//5章開始 
            if(counter <= 20) {
                fill("black");
            }
            if(21 <= counter && counter <= 100) {
                setAlp(counter-21);
                drawImgTS(21, 800*5, 0, 800, 1000, 0, 0, 800, 1000);
                setAlp(100);
            }
            if(121 <= counter && counter <= 180) {          
                drawImgTS(21, 800*5, 0, 800, 1000, 0, 0, 800, 1000);   
                setAlp((counter-121)*3);
                fill("white");
                setAlp(100);
            }       
            if(180 == counter) {
                makeStage();
                flg[FLG_EVENT+14] = 1;//背景を表示
                break;
            } 
            break;   
        }    
        if(event == FLG_EVENT+15) {//5章戦闘前会話
            drawBG();
            if(cut == 0){
                setAlp(counter);
                putUnit(37);
                putMsg(400, 900);
                putName("エリミネーター");
                setMsg("ヴオアアアアアアア");
                setMsg("");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 1){
                setAlp(counter);
                putUnit(1);
                putMsg(400, 900);
                putName("エリオン");
                setMsg("くっ...囲まれた。エリミネーターも");
                setMsg("まだいたのか。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 2){
                setAlp(counter);
                putUnit(1);
                putMsg(400, 900);
                putName("エリオン");
                setMsg("なんとかしてみんなと合流しよう。");
                setMsg("");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    scene = 30;
                    cut = 0;
                    counter = 6;
                    break;
                }
            }
        }
        
            
        if(event == FLG_STAGE+5) {//5章クリア後
            drawBG();
            if(cut == 0 && counter <= 40) {         
                setAlp(counter*5);
                fill("black");
                setAlp(100);
            }
            if(cut == 0 && counter == 41) cut = 1;
            if(cut == 1) {
                putUnit(2);
                putMsg(400, 900);
                putName("ローズ");
                setMsg("エリオン、よく無事でしたね。");
                setMsg("この先にあいつがいます。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                }
            }
            if(cut == 2) {
                putUnit(1);
                putMsg(400, 900);
                putName("エリオン");
                setMsg("よし、急ごう。");
                setMsg("");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 3 && counter <= 40) {
                setAlp(counter*5);
                fill("black");
                setAlp(100);
            }
            if(cut == 3 && counter == 40) {
                scene = 3;
                counter = 0;
                cut = 0;
                flg[FLG_STAGE + 5] = 1;//5章クリアのフラグ
                break;
            }
        }
        if(event == FLG_EVENT+16) {//6章開始 
            if(counter <= 20) {
                fill("black");
            }
            if(21 <= counter && counter <= 100) {
                setAlp(counter-21);
                drawImgTS(21, 800*6, 0, 800, 1000, 0, 0, 800, 1000);
                setAlp(100);
            }
            if(121 <= counter && counter <= 180) {          
                drawImgTS(21, 800*6, 0, 800, 1000, 0, 0, 800, 1000);   
                setAlp((counter-121)*3);
                fill("white");
                setAlp(100);
            }       
            if(180 == counter) {
                makeStage();
                flg[FLG_EVENT+16] = 1;//背景を表示
                break;
            } 
            break;   
        }    
        if(event == FLG_EVENT+17) {//6章戦闘前会話
            drawBG();
            if(cut == 0){
                setAlp(counter);
                putUnit(1);
                putMsg(400, 900);
                putName("エリオン");
                setMsg("ついに追い詰めたぞ。お前は何者だ。");
                setMsg("ここで何をしている。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 1){
                setAlp(counter);
                putUnit(30);
                putMsg(400, 900);
                putName("???");
                setMsg("教えてやる。どうせここで死ぬからな。");
                setMsg("俺は、帝国生物兵器の科学者だ。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 2){
                setAlp(counter);
                putUnit(30);
                putMsg(400, 900);
                putName("???");
                setMsg("エリミネーターを使って、帝国と王国の戦争を");
                setMsg("終わらせる。これが俺の目的だ。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 3){
                setAlp(counter);
                putUnit(30);
                putMsg(400, 900);
                putName("???");
                setMsg("このエリミネーターは他とは違うぞ。");
                setMsg("貴様らも終わりだ。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 4){
                setAlp(counter);
                putUnit(1);
                putMsg(400, 900);
                putName("エリオン");
                setMsg("みんな、ここで決着をつけよう");
                setMsg("");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    scene = 30;
                    cut = 0;
                    counter = 6;
                    break;
                }
            }

        }
        if(event == FLG_EVENT+18) {//6章ターン４の会話
            drawBG();
            if(cut == 0){
                setAlp(counter);
                putUnit(1);
                putMsg(400, 900);
                putName("エリオン");
                setMsg("あのエリミネーターは強いな...。");
                setMsg("だが、必ず突破口があるはずだ。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    scene = 40;
                    cut = 0;
                    counter = 0;
                    break;
                }
            }
        }
        
            
        if(event == FLG_STAGE+6) {//6章クリア後
            drawBG();
            if(cut == 0 && counter <= 40) {         
                setAlp(counter*5);
                fill("black");
                setAlp(100);
            }
            if(cut == 0 && counter == 41) cut = 1;
            if(cut == 1) {
                putUnit(30);
                putMsg(400, 900);
                putName("???");
                setMsg("グオオォォ....。");
                setMsg("ここまでか...。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                }
            }
            if(cut == 2) {
                putUnit(1);
                putMsg(400, 900);
                putName("エリオン");
                setMsg("強敵だった。まさかこんな兵器が");
                setMsg("作られているなんて。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 3) {
                putUnit(2);
                putMsg(400, 900);
                putName("ローズ");
                setMsg("ここまでずいぶん長い旅でした。");
                setMsg("皆さん、いったん本部へ帰投しましょう。");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 4) {
                putUnit(3);
                putMsg(400, 900);
                putName("グリフィン");
                setMsg("そうだな。俺の偵察任務もこれぐらいでいい。");
                setMsg("");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            if(cut == 5) {
                putUnit(1);
                putMsg(400, 900);
                putName("エリオン");
                setMsg("そうしよう。");
                setMsg("");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut++;
                    counter = 0;
                }
            }
            
            if(cut == 6 && counter <= 40) {
                setAlp(counter*5);
                fill("black");
                setAlp(100);
            }
            if(cut == 6 && counter == 40) {
                scene = 3;
                counter = 0;
                cut = 0;
                flg[FLG_STAGE + 6] = 1;//6章クリアのフラグ
                break;
            }
        }
        if(event == FLG_EVENT+19) {//7章開始 
            if(counter <= 20) {
                fill("black");
            }
            if(21 <= counter && counter <= 100) {
                setAlp(counter-21);
                drawImgTS(21, 800*7, 0, 800, 1000, 0, 0, 800, 1000);
                setAlp(100);
            }
            if(121 <= counter && counter <= 180) {          
                drawImgTS(21, 800*7, 0, 800, 1000, 0, 0, 800, 1000);   
                setAlp((counter-121)*3);
                fill("white");
                setAlp(100);
            }       
            if(180 == counter) {
                makeStage();
                flg[FLG_EVENT+19] = 1;//背景を表示
                break;
            } 
            break;   
        }
        if(event == FLG_EVENT+20) {//8章開始 
            if(counter <= 20) {
                fill("black");
            }
            if(21 <= counter && counter <= 100) {
                setAlp(counter-21);
                drawImgTS(21, 800*8, 0, 800, 1000, 0, 0, 800, 1000);
                setAlp(100);
            }
            if(121 <= counter && counter <= 180) {          
                drawImgTS(21, 800*8, 0, 800, 1000, 0, 0, 800, 1000);   
                setAlp((counter-121)*3);
                fill("white");
                setAlp(100);
            }       
            if(180 == counter) {
                makeStage();
                flg[FLG_EVENT+20] = 1;//背景を表示
                break;
            } 
            break;   
        } 
        if(event == FLG_EVENT+21) {//9章開始 
            if(counter <= 20) {
                fill("black");
            }
            if(21 <= counter && counter <= 100) {
                setAlp(counter-21);
                drawImgTS(21, 800*9, 0, 800, 1000, 0, 0, 800, 1000);
                setAlp(100);
            }
            if(121 <= counter && counter <= 180) {          
                drawImgTS(21, 800*9, 0, 800, 1000, 0, 0, 800, 1000);   
                setAlp((counter-121)*3);
                fill("white");
                setAlp(100);
            }       
            if(180 == counter) {
                makeStage();
                flg[FLG_EVENT+21] = 1;//背景を表示
                break;
            } 
            break;   
        }

        break;

        case 3://戦利品
        if(event == FLG_STAGE+0) { //断章の戦利品
            if(cut == 0) {
                setAlp(counter*5);
                drawFrame(10, 80, 780, 700, "black", "white", 60);
                fText("戦利品", 400, 120, 30, "white");
                fText("700 G" , 200, 200, 30, "white");//配列に入っていないものはundefinedではなく、何も表示されない
                fText("傷薬", 200, 260, 30, "white");//配列に入っていないものはundefinedではなく、何も表示されない
                fText(("各x" + "1"), 600, 260, 30, "white");
                setAlp(100);
                if(40 <= counter && tapC == 1) {
                    tapC = 0;
                    cut  = 1;
                    counter = 0;
                    chara[1].item[0]++;
                    chara[2].item[0]++;
                    gold += 700;
                }        
            }
            
            
        }
        if(event == FLG_EVENT+80) { //修練場ノーマルの戦利品
            if(cut == 0) {
                setAlp(counter*5);
                drawFrame(10, 80, 780, 700, "black", "white", 60);
                fText("戦利品", 400, 120, 30, "white");
                fText("3000 G" , 200, 200, 30, "white");//配列に入っていないものはundefinedではなく、何も表示されない
                setAlp(100);
                if(40 <= counter && tapC == 1) {
                    tapC = 0;
                    cut  = 1;
                    counter = 0;
                    gold += 3000;
                    flg[FLG_EVENT+80] = 0;//修練場ノーマルを周回できるようにする
                }        
            }  
        }
        if(event == FLG_EVENT+81) { //修練場ハードの戦利品
            if(cut == 0) {
                setAlp(counter*5);
                drawFrame(10, 80, 780, 700, "black", "white", 60);
                fText("戦利品", 400, 120, 30, "white");
                fText("7000 G" , 200, 200, 30, "white");//配列に入っていないものはundefinedではなく、何も表示されない
                setAlp(100);
                if(40 <= counter && tapC == 1) {
                    tapC = 0;
                    cut  = 1;
                    counter = 0;
                    gold += 7000;
                    flg[FLG_EVENT+81] = 0;//修練場ハードを周回できるようにする
                }        
            }  
        }
        if(event == FLG_EVENT+82) { //修練場ルナティックの戦利品
            if(cut == 0) {
                setAlp(counter*5);
                drawFrame(10, 80, 780, 700, "black", "white", 60);
                fText("戦利品", 400, 120, 30, "white");
                fText("15000 G" , 200, 200, 30, "white");//配列に入っていないものはundefinedではなく、何も表示されない
                setAlp(100);
                if(40 <= counter && tapC == 1) {
                    tapC = 0;
                    cut  = 1;
                    counter = 0;
                    gold += 15000;
                    flg[FLG_EVENT+82] = 0;//修練場ルナティックを周回できるようにする
                }        
            }  
        }
        if(event == FLG_EVENT+83) { //修練場インファナルの戦利品
            if(cut == 0) {
                setAlp(counter*5);
                drawFrame(10, 80, 780, 700, "black", "white", 60);
                fText("戦利品", 400, 120, 30, "white");
                fText("100000 G" , 200, 200, 30, "white");//配列に入っていないものはundefinedではなく、何も表示されない
                setAlp(100);
                if(40 <= counter && tapC == 1) {
                    tapC = 0;
                    cut  = 1;
                    counter = 0;
                    gold += 100000;
                    flg[FLG_EVENT+83] = 0;//修練場インファナルを周回できるようにする
                }        
            }  
        }
        if(event == FLG_STAGE+1) { //1章の戦利品
            if(cut == 0) {
                setAlp(counter*5);//ｙ　60ずつ
                drawFrame(10, 80, 780, 700, "black", "white", 60);
                fText("戦利品", 400, 120, 30, "white");
                fText("1500 G" , 200, 200, 30, "white");
                fText("傷薬", 200, 260, 30, "white");
                fText(("各x" + "1"), 600, 260, 30, "white");
                fText("バーパ", 200, 320, 30, "white");
                fText(("x" + "1"), 600, 320, 30, "white");
                setAlp(100);
                if(40 <= counter && tapC == 1) {
                    tapC = 0;
                    cut  = 1;
                    counter = 0;
                    chara[1].item[0]++;
                    chara[2].item[0]++;
                    chara[2].item[1]++;
                    gold += 1500;
                }        
            }    
        }
        if(event == FLG_STAGE+2) { //2章の戦利品
            if(cut == 0) {
                setAlp(counter*5);//ｙ　60ずつ
                drawFrame(10, 80, 780, 700, "black", "white", 60);
                fText("戦利品", 400, 120, 30, "white");
                fText("2100 G" , 200, 200, 30, "white");
                fText("傷薬", 200, 260, 30, "white");
                fText("各x" + "2", 600, 260, 30, "white");
                fText("バーパ", 200, 320, 30, "white");
                fText(("x" + "2"), 600, 320, 30, "white");
                fText("マギ", 200, 380, 30, "white");
                fText(("x" + "1"), 600, 380, 30, "white");
                setAlp(100);
                if(40 <= counter && tapC == 1) {
                    tapC = 0;
                    cut  = 1;
                    counter = 0;
                    chara[1].item[0] += 2;
                    chara[2].item[0] += 2;
                    chara[2].item[1] += 2;
                    chara[2].item[2] += 1;
                    chara[3].item[0] += 2;
                    gold += 2100;
                }        
            }    
        }
        if(event == FLG_STAGE+3) { //3章の戦利品
            if(cut == 0) {
                setAlp(counter*5);//ｙ　60ずつ
                drawFrame(10, 80, 780, 700, "black", "white", 60);
                fText("戦利品", 400, 120, 30, "white");
                fText("2800 G" , 200, 200, 30, "white");
                fText("傷薬", 200, 260, 30, "white");
                fText("各x" + "2", 600, 260, 30, "white");
                fText("バーパ", 200, 320, 30, "white");
                fText(("x" + "2"), 600, 320, 30, "white");
                fText("マギ", 200, 380, 30, "white");
                fText(("x" + "1"), 600, 380, 30, "white");
                setAlp(100);
                if(40 <= counter && tapC == 1) {
                    tapC = 0;
                    cut  = 1;
                    counter = 0;
                    chara[1].item[0] += 2;
                    chara[2].item[0] += 2;
                    chara[2].item[1] += 2;
                    chara[2].item[2] += 1;
                    chara[3].item[0] += 2;
                    gold += 2800;
                }        
            }    
        }
        if(event == FLG_STAGE+4) { //4章の戦利品
            if(cut == 0) {
                setAlp(counter*5);//ｙ　60ずつ
                drawFrame(10, 80, 780, 700, "black", "white", 60);
                fText("戦利品", 400, 120, 30, "white");
                fText("4000 G" , 200, 200, 30, "white");
                fText("騎士の弓", 200, 260, 30, "white");
                fText(("x" + "10"), 600, 260, 30, "white");
                fText("エリオンはスキル【輝竜穿】を覚えた！", 400, 420, 35, "#0FF");
                fText("ローズはスキル【血の祝福】を覚えた！", 400, 500, 35, "#0FF");
                fText("グリフィンはスキル【大盾】を覚えた！", 400, 580, 35, "#0FF");
                flg[FLG_EVENT+60] = 1;//エリオンのスキル習得フラグ
                flg[FLG_EVENT+61] = 1;//ローズのスキル習得フラグ
                flg[FLG_EVENT+62] = 1;//グリフィンのスキル習得フラグ
                setAlp(100);
                if(40 <= counter && tapC == 1) {
                    tapC = 0;
                    cut  = 1;
                    counter = 0;
                    gold += 4000;
                    chara[1].stren += 7;//エリオンのスキル習得分
                    chara[1].SKILL_COUNT_MAX = 2;//99のとき未開放扱いになるので2にする
                    chara[2].ITEM[9] = "エマーティノス";
                    chara[2].ITEM[10] = "スキルカウント０のとき使用可能。血の祝福を発動する。";
                    chara[2].ITEM[11] = chara[2].stren*3;
                    chara[2].item[3] = "∞";
                    chara[2].SKILL_COUNT_MAX = 2;        
                    chara[3].ITEM[3] = "騎士の弓";
                    chara[3].ITEM[4] = "飛行特攻。1マス離れた敵に弓を放つ。(威力7)";
                    chara[3].ITEM[5] = chara[3].stren+7;
                    chara[3].item[1] = 10;
                    chara[3].SKILL_COUNT_MAX = 2;
                }        
            }    
        }
        if(event == FLG_STAGE+5) { //5章の戦利品
            if(cut == 0) {
                setAlp(counter*5);//ｙ　60ずつ
                drawFrame(10, 80, 780, 700, "black", "white", 60);
                fText("戦利品", 400, 120, 30, "white");
                fText("6000 G" , 200, 200, 30, "white");     
                setAlp(100);
                if(40 <= counter && tapC == 1) {
                    tapC = 0;
                    cut  = 1;
                    counter = 0;
                    gold += 6000;
                }        
            }    
        }
        if(event == FLG_STAGE+6) { //6章の戦利品
            if(cut == 0) {
                setAlp(counter*5);//ｙ　60ずつ
                drawFrame(10, 80, 780, 700, "black", "white", 60);
                fText("戦利品", 400, 120, 30, "white");
                fText("7000 G" , 200, 200, 30, "white");
                setAlp(100);
                if(40 <= counter && tapC == 1) {
                    tapC = 0;
                    cut  = 1;
                    counter = 0;
                    gold += 7000;
                }        
            }    
        }
        if(event == FLG_STAGE+7) { //7章の戦利品
            if(cut == 0) {
                setAlp(counter*5);//ｙ　60ずつ
                drawFrame(10, 80, 780, 700, "black", "white", 60);
                fText("戦利品", 400, 120, 30, "white");
                fText("10000 G" , 200, 200, 30, "white");
                setAlp(100);
                if(40 <= counter && tapC == 1) {
                    tapC = 0;
                    cut  = 1;
                    counter = 0;
                    gold += 10000;      
                }        
            }    
        }
        if(event == FLG_STAGE+8) { //8章の戦利品
            if(cut == 0) {
                setAlp(counter*5);//ｙ　60ずつ
                drawFrame(10, 80, 780, 700, "black", "white", 60);
                fText("戦利品", 400, 120, 30, "white");
                fText("12000 G" , 200, 200, 30, "white");
                setAlp(100);
                if(40 <= counter && tapC == 1) {
                    tapC = 0;
                    cut  = 1;
                    counter = 0;
                    gold += 12000;   
                }        
            }    
        }
        if(event == FLG_STAGE+9) { //9章の戦利品
            if(cut == 0) {
                setAlp(counter*5);//ｙ　60ずつ
                drawFrame(10, 80, 780, 700, "black", "white", 60);
                fText("戦利品", 400, 120, 30, "white");
                fText("15000 G" , 200, 200, 30, "white");
                setAlp(100);
                if(40 <= counter && tapC == 1) {
                    tapC = 0;
                    cut  = 1;
                    counter = 0;
                    gold += 15000;    
                }        
            }    
        }
        if(cut == 1) {
            setAlp(counter*5);
            fill("black");
            setAlp(100);
            if(40 <= counter) {
                toHome();
            }
        }
        break;

        case 4://パーティ画面
        if(cirBtn(700, 900, 100, "HOME")) {
            toHome();
        }
        if(cirBtn(500, 900, 100, "切り替え")) {
                tapC = 0;
                playSE(5);
                sel_member++;
                sel_member = sel_member%(MEMBER_MAX+1);
                if(sel_member == 0) sel_member = 1;
        }
        col = "black";
        if(i == sel_member) col = "navy";
        drawFrame(20, 100, 760, 690, "black", "white", 60);
        n = 1+sel_member;
        if(sel_member == 4) n = 45;//イザベラの画像を表示させる
        w = img[n].width;
        h = img[n].height;   
        x = 600;
        y = 240;
        setAlp(100);
        drawImgTS(n, 0, 0, w, h, 130, 230, SIZE*7, SIZE*7);
        setAlp(100);
        drawFrame(60, 120, 250, 50, "black", "white", 100);//名前
        fText(chara[sel_member].name, 185, 145, 30, "white");//名前
        fText("Lv.", x, y, 30, "white");
        fText("EXP", x, y+60, 30, "white");
        fText("HP", x, y+240, 30, "white");
        fText("攻撃", x, y+300, 30, "white");
        fText("守備", x, y+360, 30, "white");
        x = 700;
        fText(chara[sel_member].level, x, y, 30, "white");
        fText(chara[sel_member].exp,   x, y+60, 30, "white");
        fText(chara[sel_member].life + "/" + chara[sel_member].lfmax, x, y+240, 30, "white");
        fText(chara[sel_member].stren, x, y+300, 30, "white");
        fText(chara[sel_member].defen, x, y+360, 30, "white");
        break;

        case 5://アイテム画面トップ
        if (cut == 0) {
            if(cirBtn(700, 900, 100, "HOME")) {
                toHome();
            }
            if(cirBtn(500, 900, 100, "切り替え")) {
                tapC = 0;
                playSE(5);
                sel_member++;
                sel_member = sel_member%(MEMBER_MAX+1);
                if(sel_member == 0) sel_member = 1;
                sel_item = 0;
            }
            console.log(chara[2].ITEM[9]);
            setAlp(100);
            if(sel_member == 4) drawImgTS(45, 0, 0, 160, 160, 100, 100, SIZE*8, SIZE*8);//イザベラの画像
            else drawImgTS(sel_member+1, 0, 0, 160, 160, 100, 100, SIZE*8, SIZE*8);
            setAlp(100);
            drawImg(44, 0, 0);
            //drawFrame(10, 80, 780, 700, "black", "white", 60);
            fText("アイテム", 400, 120, 30, "white");    
                for(i=0; i<ITEM_MAX; i++) {
                    y = 200+60*i;
                        if(tapC==1 && 100<tapX && tapX<700 && y-30<tapY && tapY<y+30 && 
                            chara[sel_member].ITEM[i*3] != undefined && chara[sel_member].item[i] != undefined) {
                            tapC = 0;
                            playSE(5);
                            sel_item = i;
                        }
                    col = "white";
                    if(i == sel_item) col = "cyan";
                    drawImg(66, 50, y-32);
                    fText(chara[sel_member].ITEM[i*3] || "", 250, y, 30, col);//配列に入っていないものはundefinedではなく、何も表示されない
                    fText((chara[sel_member].item[i] !== undefined ? "x" + chara[sel_member].item[i] : ""), 600, y, 30, col); 
                    if(chara[sel_member].ITEM[sel_item*3] == "スキル説明書") {
                        if(cirBtn(300, 900, 100, "使用")) {
                            cut = 1;
                            skill_tuto = 0;
                        }
                    }
                }
            //drawFrame(30, 700, 740, 60, "black", "white", 60);
            fText(chara[sel_member].ITEM[sel_item*3+1] || "", 400, 730, 30, "white");
            
        
        
        }
        if(cut == 1) {
            if(cirBtn(700, 900, 100, "キャンセル")) {
                cut = 0;
                skill_tuto = 0;
            }
            if(cirBtn(500, 900, 100, "切り替え")) {
                skill_tuto++;
                if (skill_tuto >= SKILL_MAX-1) skill_tuto = 0;
            }
            drawFrame(10, 80, 780, 700, "black", "white", 60);
            fText(SKILL_TUTO[skill_tuto*5], 400, 120, 30, "white"); 
            drawImg(SKILL_TUTO[skill_tuto*5+1], 50, 95);//スキルアイコン　
            fText(SKILL_TUTO[skill_tuto*5+2], 405, 220, 30, "white"); 
            fText(SKILL_TUTO[skill_tuto*5+3], 400, 270, 30, "white");
            fText(SKILL_TUTO[skill_tuto*5+4], 330, 320, 30, "white"); 
        }
        
        break;

        case 6://ショップ
        if(cut == 0) {
            if(cirBtn(700, 900, 100, "HOME")) {
                toHome();
                sel_member = 1;
                sel_item = 0;
            }
            drawFrame(10, 80, 780, 700, "black", "white", 60);
            fText("品物", 400, 120, 30, "white");  
            drawFrame(540, 20, 250, 50, "black", "white", 100);//G
            fText(gold, 660, 45, 30, "white");//G  
            fText("G", 770, 45, 30, "white");//G
            if(flg[FLG_STAGE+4] == 1) SHOP_MAX = 6;//4章クリアで、入荷
                for(i=0; i<SHOP_MAX; i++) {
                    y = 200+60*i;
                        if(tapC==1 && 100<tapX && tapX<700 && y-30<tapY && tapY<y+30 && 
                            shop[i*3] != undefined ) {
                            tapC = 0;
                            playSE(5);
                            sel_item = i;
                        }
                        if(shop[i*3+2] > gold) {
                            col = "red";
                        } else {
                            col = "white";
                        }
                        if(i == sel_item) {
                            col = "cyan";
                            if(shop[i*3+2] <= gold) {
                                if(cirBtn(500, 900, 100, "購入")) {
                                    gold -= shop[sel_item*3+2];
                                    if(shop[sel_item*3] == "傷薬")  {
                                        cut = 1; 
                                        break; 
                                    }
                                    else if(shop[sel_item*3] == "バーパ"){
                                        if(flg[FLG_STAGE+4] == 0) {//4章をクリアしていなければ即買い
                                            cut = 5
                                            chara[2].item[1]++;
                                            break;
                                        } else {
                                            cut = 2;
                                            break;
                                        } 
                                    }        
                                    else if(shop[sel_item*3] == "マギ") {
                                        cut = 5;      
                                        chara[2].item[2]++;
                                        break;     
                                    }
                                    else if(shop[sel_item*3] == "ダイナフラーモ") {
                                        cut = 5;      
                                        chara[4].item[2]++;
                                        break;     
                                    }
                                    else if(shop[sel_item*3] == "グローム") {
                                        cut = 5;      
                                        chara[4].item[3]++;
                                        break;     
                                    }
                                    else if(shop[sel_item*3] == "騎士の弓") {
                                        cut = 5;      
                                        chara[3].item[1]++;
                                        break;     
                                    }
                                    
                                }
                            }
                        }
                    fText(shop[i*3] || "", 200, y, 30, col);//配列に入っていないものはundefinedではなく、何も表示されない
                    fText((shop[i*3+2] !== undefined ?  shop[i*3+2] + " G" : ""), 600, y, 30, col);
                }
            drawFrame(30, 700, 740, 60, "black", "white", 60);
            fText(shop[sel_item*3+1] || "", 400, 730, 30, "white"); 
        }
       //傷薬を誰に持たせるか
        if(cut == 1) {
            drawFrame(540, 20, 250, 50, "black", "white", 100);//G
            fText(gold, 660, 45, 30, "white");//G  
            fText("G", 770, 45, 30, "white");//G
            setAlp(50);
            if(sel_member == 4) drawImgTS(45, 0, 0, 160, 160, 100, 140, SIZE*8, SIZE*8);
            else drawImgTS(sel_member+1, 0, 0, 160, 160, 100, 140, SIZE*8, SIZE*8);
            setAlp(100);
            drawFrame(10, 80, 780, 700, "black", "white", 60);
            fText("誰に持たせる？", 400, 120, 30, "white");    
            for(i=1; i<=MEMBER_MAX; i++) {
                y = 200+60*i;
                    if(tapC==1 && 100<tapX && tapX<700 && y-30<tapY && tapY<y+30) {
                        tapC = 0;
                        playSE(5);
                        sel_member = i;
                    }
                col = "white";
                    if(i == sel_member) {
                        col = "cyan";
                            if(cirBtn(500, 900, 100, "決定")) {
                                chara[sel_member].item[0]++;
                                cut = 5;
                                sel_member = 1;
                                break;
                            }
                    }
                
                fText(chara[i].name, 400, y, 30, col);
                
            }
        }
        //バーパをもたせるとき
        if(cut == 2) {
            drawFrame(540, 20, 250, 50, "black", "white", 100);//G
            fText(gold, 660, 45, 30, "white");//G  
            fText("G", 770, 45, 30, "white");//G
            setAlp(50);
            if(sel_member == 4) drawImgTS(45, 0, 0, 160, 160, 100, 140, SIZE*8, SIZE*8);
            else drawImgTS(sel_member+1, 0, 0, 160, 160, 100, 140, SIZE*8, SIZE*8);
            setAlp(100);
            drawFrame(10, 80, 780, 700, "black", "white", 60);
            fText("誰に持たせる？", 400, 120, 30, "white");    
            for(i=1; i<=MEMBER_MAX; i++) {
                y = 200+60*i;
                    if(tapC==1 && 100<tapX && tapX<700 && y-30<tapY && tapY<y+30) {
                        tapC = 0;
                        playSE(5);
                        sel_member = i;
                    }
                col = "white";
                    if(i == sel_member) {
                        col = "cyan";
                         if(i == 2 || i == 4) {//ライブを持てるユニットなら
                            if(cirBtn(500, 900, 100, "決定")) {
                                chara[sel_member].item[1]++;
                                cut = 5;
                                sel_member = 1;
                                break;
                            }
                         }
                            
                    }
                
                fText(chara[i].name, 400, y, 30, col);
                
            }
        }
        if(cut == 5) {
            drawFrame(540, 20, 250, 50, "black", "white", 100);//G
            fText(gold, 660, 45, 30, "white");//G  
            fText("G", 770, 45, 30, "white");//G
            drawImg(34, 0, 0);
            fText(shop[sel_item*3] + "を手に入れた！", 405, 480, 30, "white");
                if(tapC == 1) {
                    tapC = 0;
                    clrMsg();
                    cut = 0;
                    break;
                }
        }
        break;
        
        case 7://修練場
        if(cirBtn(700, 900, 100, "HOME")) {
            toHome();
        }
        if(ellipseBtn(30, 600, "ノーマル")) {
            stopBgm(15);
            event = FLG_EVENT+80;
            scene = 2;
            counter = 0;
        }
        if(ellipseBtn(30, 500, "ハード")) {
            stopBgm(15);
            event = FLG_EVENT+81;
            scene = 2;
            counter = 0;
        }
        if(ellipseBtn(30, 400, "ルナティック")) {
            stopBgm(15);
            event = FLG_EVENT+82;
            scene = 2;
            counter = 0;
        }
        if(ellipseBtn(30, 300, "インファナル")) {
            stopBgm(15);
            event = FLG_EVENT+83;
            scene = 2;
            counter = 0;
        }
        break;

        case 30://戦場の準備
        drawBG();
            if(counter == 1) initBtl();
            if(counter == 5 && flg[FLG_EVENT+80] != 1 && flg[FLG_EVENT+81] != 1 && flg[FLG_EVENT+82] != 1 && flg[FLG_EVENT+83] != 1) {
                if(flg[FLG_EVENT+2] == 0) {//断章　戦闘前会話
                    flg[FLG_EVENT+2] = 1;
                    event = FLG_EVENT+2;
                    scene = 2;
                    counter = 0;                   
                }
                else if(flg[FLG_EVENT+6] == 0) {//1章　戦闘前会話
                    event = FLG_EVENT+6;
                    scene = 2;
                    cut = 0;
                    counter = 0;                 
                }  
                else if(flg[FLG_EVENT+8] == 0) {//2章　戦闘前会話
                    flg[FLG_EVENT+8] = 1;
                    event = FLG_EVENT+8;
                    scene = 2;
                    cut = 0;
                    counter = 0;
                }
                else if(flg[FLG_EVENT+11] == 0) {//3章　戦闘前会話
                    flg[FLG_EVENT+11] = 1;
                    event = FLG_EVENT+11;
                    scene = 2;
                    cut = 0;
                    counter = 0;
                }
                else if(flg[FLG_EVENT+13] == 0) {//4章　戦闘前会話
                    flg[FLG_EVENT+13] = 1;
                    event = FLG_EVENT+13;
                    scene = 2;
                    cut = 0;
                    counter = 0;
                }
                else if(flg[FLG_EVENT+15] == 0) {//5章　戦闘前会話
                    flg[FLG_EVENT+15] = 1;
                    event = FLG_EVENT+15;
                    scene = 2;
                    cut = 0;
                    counter = 0;
                }
                else if(flg[FLG_EVENT+17] == 0) {//6章　戦闘前会話
                    flg[FLG_EVENT+17] = 1;
                    event = FLG_EVENT+17;
                    scene = 2;
                    cut = 0;
                    counter = 0;
                }
            }
            if(counter == 19) playSE(18);   
            if(20 <= counter) {
                //setAlp(30);
                //fRect(0, 0, 800, 1000, "#000");
                //setAlp(100);
                
                drawImg(17, 0, 0);
                drawImgTS(18, 800*int((counter-20)), 0, 800, 1000, 0, 0, 800, 1000);
                setAlp((counter-20)*8);
                fText("勝利条件", 400, 300, 50, "#0FF");
                if(event == FLG_EVENT+20) fTextN("8ターンエリオンが生存するか\n敵全滅", 400, 410, 70, 50, "#FFF");
                else fText("敵全滅", 400, 400, 50, "#FFF");
                fText("敗北条件", 400, 550, 50, "#F00");
                fText("エリオンが撃破される", 400, 650, 50, "#FFF");
                    if(tapC == 1) {
                        tapC = 0;
                        scene = 40;
                        counter = 18;
                        break;
                    }
                
            }
        break;

        case 40://自軍ターン開始
        drawBG();
        drawEffect();
        player_phase = 1;
        sel_member = 1;
        monado_shield = 0;//モナドシールドを解除
        if(monado_spd == 1){//モナドスピードのバフがかかっていたら
            monado_spd = 0; //モナドスピードのターンを減らす
            for(i=1; i<=MEMBER_MAX; i++) {//モナドスピードバフの除去
                chara[i].move -= monado_spd_move;//モナドスピードのバフを消す
            } 
        }
         
        for(i=1; i<=MEMBER_MAX; i++) {
            if(chara[i].life > 0) {
                chara[i].axisY = chara[i].Y;//┬ユニットの移動範囲の軸座標を設定
                chara[i].axisX = chara[i].X;//┘
                chara[i].turn  = 1;//味方ユニットを行動可能にする
                    for(y=0; y<9; y++) {
                        for(x=0; x<12; x++) {
                            chara[i].moveRange[y][x] = -2;//移動範囲を更新するためにフォーマットする
                        }
                    }
            }
        }
        //for(i=EMY_TOP; i<EMY_TOP+EMY_MAX; i++) {//移動範囲を更新するためにフォーマットする
          //  chara[i].moveRange = new Array(9).fill([]).map(() => new Array(12).fill(-2));
        //}
        for(i=EMY_TOP; i<=EMY_MAX; i++) {
            for(y=0; y<9; y++) {
                for(x=0; x<12; x++) {
                    chara[i].moveRange[y][x] = -2;//移動範囲を更新するためにフォーマットする
                }
            }
        }
        if(counter == 19) playSE(19);
        if(20 <= counter  && counter <= 44) {
            setAlp(30);
            fRect(0, 0, 800, 1000, "#000");
            setAlp(100);
            drawImgTS(15, 800*int((counter-20)/2.5), 0, 800, 1000, 0, 0, 800, 1000);
            //setAlp(30);
            //fRect(0, 0, 800, 1000, "#000");
            //setAlp(100);
            //setAlp((counter-20)*8);
            //fText("Player Phase", 400, 500, 80, "#0FF");
            //sCir(200, 500, (counter-10)*30, "#0FF");
        }
        
        if(counter == 50) {//イベントの判定
            phase_count++;
            playBgm(16);
            setITEM_RE();//能力値依存の効果値をもつアイテムを更新する。
            if(flg[FLG_EVENT+80] != 1 && flg[FLG_EVENT+81] != 1 && flg[FLG_EVENT+82] != 1 && flg[FLG_EVENT+83] != 1) {
                if(flg[FLG_STAGE+0] == 0 && phase_count == 2) {//断章のターン２のとき
                    scene = 2;
                    counter = 2;//cutの初期化を防ぐ
                    cut = 2;
                    break;
                }
                if(flg[FLG_STAGE+0] == 0 && flg[FLG_EVENT+3] == 0 && 3 <= phase_count && chara[1].life != chara[1].lfmax) {//断章のターン３以降かつエリオンがダメージを受けたとき
                    scene = 2;
                    counter = 2;
                    cut = 4;
                    flg[FLG_EVENT+3] = 1;
                    break;
                }
                if(flg[FLG_STAGE+0] == 1 && flg[FLG_EVENT+6] == 0) {//1章の1ターン目開始時
                    scene = 2;
                    counter = 0;
                    cut = 2;
                    flg[FLG_EVENT+6] = 1;
                    break;
                }
                if(flg[FLG_STAGE+1] == 1 && flg[FLG_STAGE+2] == 0 && phase_count == 2) {//2章のターン２のとき、グリフィンが救援に駆けつける
                    event = FLG_EVENT+9;
                    flg[FLG_EVENT+9] = 1;
                    scene = 2;
                    counter = 0;
                    cut = 0;
                    break;
                }
                if(flg[FLG_STAGE+5] == 1 && flg[FLG_STAGE+6] == 0 && phase_count == 4) {//6章のターン4のとき、イベント
                    event = FLG_EVENT+18;
                    flg[FLG_EVENT+18] = 1;
                    scene = 2;
                    counter = 0;
                    cut = 0;
                    break;
                }
                if(flg[FLG_STAGE+7] == 1 && flg[FLG_STAGE+8] == 0 && phase_count == 9) {//8章のターン9のとき、勝利
                    scene = 54;
                    counter = 0;
                    cut = 0;
                    break;
                }
            }
           
            scene = 41;
            counter = 0;
        }
        break;

        case 41://移動範囲の決定、ユニットの選択と移動 
        if(counter == 20) {//全ての味方ユニットの行動が終了していれば敵フェイズに移行する
            var n = 0;   
            for(i=1; i<=MEMBER_MAX; i++) {
                n += chara[i].turn;   
            }
            if(n == 0) {
                scene = 51;
                counter = 0;
                player_phase = 0;
            } 
        }
        //putMsg(400, 250);
        //drawFrame(10, 820, 180, 50, "black", "white", 100); 
        //fText("ターン数 " + phase_count, 100, 845, 30, "white");
        selMember();
        for(i=EMY_TOP; i<EMY_TOP+EMY_MAX; i++) {
            for(y=0; y<9; y++) {
                for(x=0; x<12; x++) {
                    //console.log("i: "+  i );
                    chara[i].moveRange[y][x] = -2;//移動範囲を更新するためにフォーマットする
                }
            }
        }
        for(i=0; i<EMY_MAX; i++) {
            if(sel_enemy[i] > 0 && chara[sel_enemy[i]].X != null && chara[sel_enemy[i]].Y != null) {
                calMoveRange(sel_enemy[i], chara[sel_enemy[i]].Y, chara[sel_enemy[i]].X, chara[sel_enemy[i]].move+2);//敵ユニットの移動範囲表示専用。移動の計算には使用しない。
            }
        }
        selEnemy();  
        drawBG();
        drawEffect();
        drawStatus();
        //log("int(-2.5): " + int(-2.5));//確認用
        //fText("chara[1].turn  "+ chara[1].turn, 100, 160, 20, "white");//確認用 
        //fText("chara[2].turn  "+ chara[2].turn, 100, 180, 20, "white");//確認用 
        //fText("chara[3].turn  "+ chara[3].turn, 100, 200, 20, "white");//確認用 
        //fText("動作キャラ  "+ chara[sel_member].name, 100, 240, 20, "white");//確認用
       //fText("counter  "+ counter, 100, 220, 20, "white");//確認用        
        if(chara[sel_member].turn == 1) { 
            calMoveRange(sel_member, chara[sel_member].axisY, chara[sel_member].axisX, chara[sel_member].move+2);
            
            //log("Y" + chara[sel_enemy].Y);
            //log("X" + chara[sel_enemy].X);
            //log("m" + chara[sel_enemy].move);
            moveUnit(sel_member);
            if(cirBtn(700, 900, 100, "アイテム")){
                scene = 44;
                counter = 0;
                cut = 0;
                sel_item = 0;
            }
            if(cirBtn(500, 900, 100, "待機")) {
                //if(confirm("このユニットの行動を終了しますか？") == true) {
                    chara[sel_member].turn = 0;
                    if (chara[sel_member].react == 1) {
                        chara[sel_member].turn = 1;
                        chara[sel_member].react = 0;
                    }
                    counter = 0;
                //}
            }
            if(chara[sel_member].life > 0) {
                if(enemy_map[chara[sel_member].Y-1][chara[sel_member].X] > 3 || enemy_map[chara[sel_member].Y+1][chara[sel_member].X] > 3 || enemy_map[chara[sel_member].Y][chara[sel_member].X+1] > 3 || enemy_map[chara[sel_member].Y][chara[sel_member].X-1] > 3) {
                    if(cirBtn(300, 900, 100, "攻撃")) {
                    scene = 42;
                    counter = 0;
                    } 
                }     
            }
            if(sel_member == 1) {
                if(cirBtn(100, 900, 100, "アルカナ")){
                    scene = 49;
                    counter = 0;
                    cut = 0;
                    sel_monado = 0;
                }
            }
            
        }
        //味方の選択カーソル
        lineW(3);
        setAlp(80);
        sRect(chara[sel_member].X*SIZE-SIZE-9+(counter/5%5), chara[sel_member].Y*SIZE+150-10+(counter/5%5), SIZE+20-(counter/2%12.5), SIZE+20-(counter/2%12.5), "#0FF");//カーソルの枠を表示
        sRect(chara[sel_member].X*SIZE-SIZE-7+(counter/5%5), chara[sel_member].Y*SIZE+150-8+(counter/5%5), SIZE+16-(counter/2%12.5), SIZE+16-(counter/2%12.5), "#0FF");//カーソルの内側枠を表示
        fTri( chara[sel_member].X*SIZE-SIZE*0.75, chara[sel_member].Y*SIZE+SIZE*1.4+(counter/2%12.5) ,  chara[sel_member].X*SIZE-SIZE*0.5, chara[sel_member].Y*SIZE+SIZE*1.7+(counter/2%12.5),  chara[sel_member].X*SIZE-SIZE*0.25, chara[sel_member].Y*SIZE+SIZE*1.4+(counter/2%12.5), "#EEE");
        fTri( chara[sel_member].X*SIZE-SIZE*0.7, chara[sel_member].Y*SIZE+SIZE*1.4+2+(counter/2%12.5) ,  chara[sel_member].X*SIZE-SIZE*0.5, chara[sel_member].Y*SIZE+SIZE*1.6+2+(counter/2%12.5),  chara[sel_member].X*SIZE-SIZE*0.3, chara[sel_member].Y*SIZE+SIZE*1.4+2+(counter/2%12.5), "#FFF");
        lineW(2);
        setAlp(100);

        //クリックした地点に移動するときに効果音を鳴らす
        // for(i=1; i<=MEMBER_MAX; i++) {
        //     if(i == 3 && chara[i].movetime > 0) {      
        //         chara[i].movetime--;//moveunit()内で、クリックしたときにmovetimeを15にセットする
        //         if(chara[i].movetime == 0) stopBgm(2);
        //     }         
        //     if(i != 3 && chara[i].movetime > 0) {
        //         chara[i].movetime--;
        //         if(chara[i].movetime == 0) stopBgm(1);
        //     }
        // }

        break;

        case 42://攻撃する敵ユニットを選択       
        //if(counter == 10) setMsg("攻撃する敵をクリックしてください");
        drawBG();
        drawEffect();   
        drawImg(34, 0, -350);
        fText("対象を選択してください", 400, 125, 25, "white");
        var x = int(tapX/SIZE)+1;
        var y = int(tapY/SIZE)-2;
        if(cirBtn(700, 900, 100, "キャンセル")) {
            scene = 41;
            counter = 0;
            use_item = 0;//┬射程２・３アイテムの判定を消す
            c_atk   = 0; //|
            atkrng3 = 0; //」
            use_monado = 0;
            cut = 0;
        }
        if(0<=x && x<12 && 0<=y && y<9) {
            var n = enemy_map[y][x];
            //fText("選択キャラ: "+n, 600, 100, 20, "white");//確認用
            //fText("ターゲット: "+sel_enemy, 600, 350, 20, "white");//確認用
            //fText("tapX: "+tapX, 600, 150, 20, "white");//確認用
            //fText("tapY: "+tapY, 600, 200, 20, "white");//確認用
            //fText("x: "+x, 600, 250, 20, "white");//確認用
            //fText("y: "+y, 600, 300, 20, "white");//確認用 
            //fText("staX: "+x*SIZE-SIZE-20, 600, 350, 20, "white");//確認用
            //fText("staY: "+y*SIZE+150-20, 600, 400, 20, "white");//確認用 

            
            //fText("chara[3].turn  "+ chara[3].turn, 100, 200, 20, "white");//確認用
        }
        for(i=0; i<EMY_MAX; i++) {//攻撃する敵を識別するために、倒していない全ての敵を調べる
            if(chara[EMY_TOP+i].X == int(tapX/SIZE)+1 && chara[EMY_TOP+i].Y == int(tapY/SIZE)-2 && chara[EMY_TOP+i].life > 0 && cut == 0) {
                
                //モナドブレイカーなどの射程INFの場合
                if(c_atk == 1 && sel_monado == 3 && use_monado == 1) {
                    drawBtlResult(sel_member, EMY_TOP+i);//戦闘をシミュレーションした結果を表示
                    lineW(3);
                    setAlp(50);
                    fRect(x*SIZE-SIZE, y*SIZE+150, SIZE, SIZE, "#F00");//マウスポインタのマスに正方形を表示
                    setAlp(100);
                    lineW(2);
                    if(tapC == 1) {
                        tapC = 0;
                        cut = 1;
                        btl_char = sel_member;
                        def_char = EMY_TOP+i;           
                    }
                }

                //見切り反撃の場合（トロンなどの射程３アイテム）
                else if(c_atk == 1 && atkrng3 == 1) {
                    if( chara[sel_member].X == chara[EMY_TOP+i].X   && chara[sel_member].Y == chara[EMY_TOP+i].Y+3 ||//3マス上に敵がいるか
                        chara[sel_member].X == chara[EMY_TOP+i].X-1 && chara[sel_member].Y == chara[EMY_TOP+i].Y+2 ||//2マス上１マス右
                        chara[sel_member].X == chara[EMY_TOP+i].X-2 && chara[sel_member].Y == chara[EMY_TOP+i].Y+1  ||//1マス上２マス右
                        chara[sel_member].X == chara[EMY_TOP+i].X-3 && chara[sel_member].Y == chara[EMY_TOP+i].Y ||//3マス右
                        chara[sel_member].X == chara[EMY_TOP+i].X-2 && chara[sel_member].Y == chara[EMY_TOP+i].Y-1 ||//1マス下２マス右
                        chara[sel_member].X == chara[EMY_TOP+i].X-1 && chara[sel_member].Y == chara[EMY_TOP+i].Y-2 ||//2マス下１マス右
                        chara[sel_member].X == chara[EMY_TOP+i].X   && chara[sel_member].Y == chara[EMY_TOP+i].Y-3   ||//３マス下
                        chara[sel_member].X == chara[EMY_TOP+i].X+1 && chara[sel_member].Y == chara[EMY_TOP+i].Y-2 ||//2マス下１マス左 
                        chara[sel_member].X == chara[EMY_TOP+i].X+2 && chara[sel_member].Y == chara[EMY_TOP+i].Y-1 ||//1マス下２マス左
                        chara[sel_member].X == chara[EMY_TOP+i].X+3 && chara[sel_member].Y == chara[EMY_TOP+i].Y   ||//3マス左
                        chara[sel_member].X == chara[EMY_TOP+i].X+2 && chara[sel_member].Y == chara[EMY_TOP+i].Y+1 ||//1マス上２マス左
                        chara[sel_member].X == chara[EMY_TOP+i].X+1 && chara[sel_member].Y == chara[EMY_TOP+i].Y+2 ) {//２マス上１マス左 
                            drawBtlResult(sel_member, EMY_TOP+i);//戦闘をシミュレーションした結果を表示
                            lineW(3);
                            setAlp(50);
                            fRect(x*SIZE-SIZE, y*SIZE+150, SIZE, SIZE, "#F00");//マウスポインタのマスに正方形を表示
                            setAlp(100);
                            lineW(2);
                            //fText("マウスポインタ上の攻撃対象chara" + (EMY_TOP+i), 120, 260, 20, "white");//確認用
                            if(tapC == 1) {
                                tapC = 0;
                                cut = 1;
                                btl_char = sel_member;
                                def_char = EMY_TOP+i;      
                            }
                    }
                }

                //見切り反撃の場合（リザイア、エルファイアー、モナドバスターなどの射程２）
                else if(c_atk == 1 && atkrng3 == 0) {
                    if( chara[sel_member].X == chara[EMY_TOP+i].X   && chara[sel_member].Y == chara[EMY_TOP+i].Y+2 ||//2マス上に敵がいるか
                        chara[sel_member].X == chara[EMY_TOP+i].X-1 && chara[sel_member].Y == chara[EMY_TOP+i].Y+1 ||//右上
                        chara[sel_member].X == chara[EMY_TOP+i].X-2 && chara[sel_member].Y == chara[EMY_TOP+i].Y   ||//左
                        chara[sel_member].X == chara[EMY_TOP+i].X-1 && chara[sel_member].Y == chara[EMY_TOP+i].Y-1 ||//右下
                        chara[sel_member].X == chara[EMY_TOP+i].X   && chara[sel_member].Y == chara[EMY_TOP+i].Y-2 ||//下
                        chara[sel_member].X == chara[EMY_TOP+i].X+1 && chara[sel_member].Y == chara[EMY_TOP+i].Y-1 ||//左下
                        chara[sel_member].X == chara[EMY_TOP+i].X+2 && chara[sel_member].Y == chara[EMY_TOP+i].Y   ||//左
                        chara[sel_member].X == chara[EMY_TOP+i].X+1 && chara[sel_member].Y == chara[EMY_TOP+i].Y+1 ) { //左上 
                        drawBtlResult(sel_member, EMY_TOP+i);//戦闘をシミュレーションした結果を表示
                        lineW(3);
                        setAlp(50);
                        fRect(x*SIZE-SIZE, y*SIZE+150, SIZE, SIZE, "#F00");//マウスポインタのマスに正方形を表示
                        setAlp(100);
                        lineW(2);
                        //fText("マウスポインタ上の攻撃対象chara" + (EMY_TOP+i), 120, 260, 20, "white");//確認用
                        if(tapC == 1) {
                            tapC = 0;
                            cut = 1;
                            btl_char = sel_member;
                            def_char = EMY_TOP+i;         
                        }      
                    }
                }
                
                //見切り反撃ではない場合
                else if( chara[sel_member].X == chara[EMY_TOP+i].X   && chara[sel_member].Y == chara[EMY_TOP+i].Y+1 || //上に敵がいるか
                        chara[sel_member].X == chara[EMY_TOP+i].X-1 && chara[sel_member].Y == chara[EMY_TOP+i].Y   || //右
                        chara[sel_member].X == chara[EMY_TOP+i].X   && chara[sel_member].Y == chara[EMY_TOP+i].Y-1 || //下
                        chara[sel_member].X == chara[EMY_TOP+i].X+1 && chara[sel_member].Y == chara[EMY_TOP+i].Y  ) { //左
                        drawBtlResult(sel_member, EMY_TOP+i);//戦闘をシミュレーションした結果を表示
                        lineW(3);
                        setAlp(50);
                        fRect(x*SIZE-SIZE, y*SIZE+150, SIZE, SIZE, "#F00");//マウスポインタのマスに正方形を表示
                        setAlp(100);
                        lineW(2);
                        //fText("マウスポインタ上の攻撃対象chara" + (EMY_TOP+i), 120, 260, 20, "white");//確認用
                        if(tapC == 1) {
                            tapC = 0;
                            cut = 1;
                            btl_char = sel_member;
                            def_char = EMY_TOP+i;
                            
                        }
                }
            }
            if(cut == 1) {//スマホ操作で戦闘結果を見るための処理。今はOFF。
                //lineW(3);
                //setAlp(80);
                //sRect(chara[def_char].X*SIZE-SIZE-9+(counter/5%5), chara[def_char].Y*SIZE+150-10+(counter/5%5), SIZE+20-(counter/2%12.5), SIZE+20-(counter/2%12.5), "#F09");//カーソルの枠を表示
                //sRect(chara[def_char].X*SIZE-SIZE-7+(counter/5%5), chara[def_char].Y*SIZE+150-8+(counter/5%5), SIZE+16-(counter/2%12.5), SIZE+16-(counter/2%12.5), "#F09");//カーソルの内側枠を表示
                //fTri( chara[def_char].X*SIZE-SIZE*0.75, chara[def_char].Y*SIZE+SIZE*1.4+(counter/2%12.5) ,  chara[def_char].X*SIZE-SIZE*0.5, chara[def_char].Y*SIZE+SIZE*1.7+(counter/2%12.5),  chara[def_char].X*SIZE-SIZE*0.25, chara[def_char].Y*SIZE+SIZE*1.4+(counter/2%12.5), "#EEE");
                //fTri( chara[def_char].X*SIZE-SIZE*0.7, chara[def_char].Y*SIZE+SIZE*1.4+2+(counter/2%12.5) ,  chara[def_char].X*SIZE-SIZE*0.5, chara[def_char].Y*SIZE+SIZE*1.6+2+(counter/2%12.5),  chara[def_char].X*SIZE-SIZE*0.3, chara[def_char].Y*SIZE+SIZE*1.4+2+(counter/2%12.5), "#FFF");
                //lineW(2);
                //setAlp(100);
                //drawBtlResult(btl_char, def_char);
                //if(cirBtn(500, 900, 100, "実行")){ 
                    scene = 43;
                    counter = 0;
                    if(c_atk == 1) {  chara[sel_member].turn = 0; }      //chara[sel_member].item[sel_item]--;          
                    cut = 0;
                //}
            }
        }
        break;    

        case 43://ダメージ計算
        case 60://範囲攻撃の計算
        case 47://経験値の表示
        case 48://レベルアップ判定     
            putMsg(400, 900);
            putName("ナビ");
            drawImg()
            drawBG();
            drawEffect();
            //fText("counter: " + counter, 200, 750, 30, "white");//確認用
            if(scene == 43) {
                //fText("敵の守備 "+ chara[def_char].defen, 100, 100, 20, "white");//確認用
                //fText("味方の攻撃力 "+ chara[btl_char].stren, 100, 120, 20, "white");//確認用
                //fText("ダメージ "+ chara[def_char].dmg, 100, 140, 20, "white");//確認用
                //fText("def_char "+ def_char, 100, 160, 20, "white");//確認用
                //fText("敵のHP  "+ chara[def_char].life, 100, 180, 20, "white");//確認用
                //fText("chara[3].turn  "+ chara[3].turn, 100, 200, 20, "white");//確認用
                if(counter == 10) setMsg(chara[btl_char].name + "の攻撃");
                if(counter == 20) {//攻撃モーション
                    if(chara[btl_char].X == chara[def_char].X   && chara[btl_char].Y == chara[def_char].Y+1) chara[btl_char].posY =-50; 
                    if(chara[btl_char].X == chara[def_char].X-1 && chara[btl_char].Y == chara[def_char].Y  ) chara[btl_char].posX = 50; 
                    if(chara[btl_char].X == chara[def_char].X   && chara[btl_char].Y == chara[def_char].Y-1) chara[btl_char].posY = 50;
                    if(chara[btl_char].X == chara[def_char].X+1 && chara[btl_char].Y == chara[def_char].Y  ) chara[btl_char].posX =-50;

                    for(i=1; i<=MEMBER_MAX; i++) chara[i].skill = 0;//スキル発動フラグの初期化
                    for(i=EMY_TOP; i<EMY_TOP+EMY_MAX; i++) chara[i].skill = 0;//スキル発動フラグの初期化

                    if(btl_char == 1 && chara[1].skill_count == 0 && use_monado == 0){//エリオンのスキル発動判定
                        chara[1].skill = 1;
                        chara[1].skill_count = chara[1].SKILL_COUNT_MAX        
                    }
                    if(def_char == 3 && chara[3].skill_count == 0  ){//グリフィンのスキル発動判定
                        chara[3].skill = 1;
                        chara[3].skill_count = chara[3].SKILL_COUNT_MAX        
                    }  
                     
                    if(btl_char == 4 && chara[4].skill_count == 0  ){//イザベラのスキル発動判定
                        chara[4].skill = 1;
                        chara[4].skill_count = chara[4].SKILL_COUNT_MAX        
                    } 
                    if(chara[btl_char].typ == 11 && chara[btl_char].skill_count == 0  ){//グレートナイトのスキル発動判定
                        chara[btl_char].skill = 1;
                        chara[btl_char].skill_count = chara[btl_char].SKILL_COUNT_MAX        
                    }
                    if(chara[btl_char].typ == 12 && chara[btl_char].skill_count == 0  ){//アサシンのスキル発動判定
                        chara[btl_char].skill = 1;
                        chara[btl_char].skill_count = chara[btl_char].SKILL_COUNT_MAX        
                    }
                    //console.log("スキル:" + chara[1].skill);
                    
                    for(i=1; i<=MEMBER_MAX; i++) {//攻撃したとき、またはされたとき、奥義カウントを１減らす
                        if( (btl_char == i || def_char == i ) && chara[i].skill == 0 && use_monado == 0) chara[i].skill_count--;
                        if( (btl_char == i || def_char == i ) && chara[i].skill == 0 && chara[i].skill_count < 0 ) chara[i].skill_count = 0;
                        //console.log("スキルカウント:" + chara[1].skill_count);
                    }
                    for(i=EMY_TOP; i<EMY_TOP+EMY_MAX; i++) {//攻撃したとき、またはされたとき、奥義カウントを１減らす
                        if( (btl_char == i || def_char == i ) && chara[i].skill == 0 ) chara[i].skill_count--;
                        if( (btl_char == i || def_char == i ) && chara[i].skill == 0 && chara[i].skill_count < 0 ) chara[i].skill_count = 0;
                    }

                    

                    if( (btl_char == 1 || def_char == 1 ) && use_monado == 0) monado_count--;//攻撃したとき、またはされたとき、エリオンのモナドゲージを増やす
                    if( (btl_char == 1 || def_char == 1 ) && use_monado == 0 && monado_count < MND_COT_MAX ) monado_count = MND_COT_MAX;

                    if(btl_char == 1 && flg[FLG_EVENT+60] == 1 && chara[1].skill == 1) {//エリオンのスキルエフェクト
                        setEffect(chara[def_char].X, chara[def_char].Y, 10, 51); 
                        playSE(12);  
                    }   
                    else if(btl_char == 1 && use_monado == 1 && sel_monado == 0) {//モナドエフェクト
                        setEffect(chara[def_char].X, chara[def_char].Y, 15, 60);
                        playSE(22);
                    }
                    else if(btl_char == 1 && use_monado == 1 && sel_monado == 3) {
                        setEffect(chara[def_char].X, chara[def_char].Y, 15, 62);
                        playSE(24);
                    }                            
                    else if(btl_char == 2 && use_item == 1 && chara[2].ITEM[sel_item*3] == "マギ") {
                        setEffect(chara[def_char].X, chara[def_char].Y, 20, 69); 
                        playSE(27);
                        chara[2].item[2]--;                          
                    }
                    else if(def_char == 3 && flg[FLG_EVENT+62] == 1 && chara[3].skill == 1) {
                        setEffect(chara[def_char].X, chara[def_char].Y, 10, 67);
                        playSE(12);
                    }
                    else if(btl_char == 3 && flg[FLG_EVENT+62] == 1 &&　use_item == 1 && chara[3].ITEM[sel_item*3] == "騎士の弓") {
                        setEffect(chara[def_char].X, chara[def_char].Y, 8, 59);
                        playSE(0);
                        chara[3].item[1]--;                          
                    }
                    else if(btl_char == 4 ) {
                        if(flg[FLG_EVENT+63] == 1 && chara[4].skill == 1) {
                            setEffect(chara[def_char].X, chara[def_char].Y, 10, 68);
                            playSE(12);
                        }
                        if(use_item == 1){
                            if(chara[4].ITEM[sel_item*3] == "ダイナフラーモ") {
                                setEffect(chara[def_char].X, chara[def_char].Y, 20, 70); 
                                playSE(25);
                                chara[4].item[2]--;
                            }
                            if(chara[4].ITEM[sel_item*3] == "グローム") {
                                setEffect(chara[def_char].X, chara[def_char].Y, 15, 71); 
                                playSE(26);
                                chara[4].item[3]--;
                            }
                        }
                        if (chara[4].skill == 0 && use_item == 0){
                            setEffect(chara[def_char].X, chara[def_char].Y, 8, 59);
                            playSE(0);
                        }         
                    }
                    else if((chara[btl_char].typ == 11 || chara[btl_char].typ == 12) && chara[btl_char].skill == 1) {//グレートナイト、アサシンの月光
                        setEffect(chara[def_char].X, chara[def_char].Y, 10, 68);
                        playSE(12);
                    }
                    else  {
                        setEffect(chara[def_char].X, chara[def_char].Y, 8, 59);
                        playSE(0);
                    }
                    
                    //console.log("c_atk" + c_atk);//確認用
                    c_atk--;
                    console.log("use_item: " + use_item);//確認用
                    console.log("btl_char: " + btl_char);//確認用
                    console.log("def_char: " + def_char);//確認用
                    //ダメージ値の計算
                    if(btl_char == 1 && use_monado == 1) { 
                        if (sel_monado == 0) {//モナドバスター
                            chara[def_char].dmg = chara[btl_char].stren*3 - chara[def_char].defen;
                            monado_count += monado[2];
                        } 
                        if (sel_monado == 3) {//モナドブレイカー
                            chara[def_char].dmg = 10;
                            if(chara[def_char].atkrng != 2) {
                                chara[def_char].stren -= 10;
                                chara[def_char].defen -= 10;
                                if(chara[def_char].stren < 0) chara[def_char].stren = 0;
                                if(chara[def_char].defen < 0) chara[def_char].defen = 0;
                                if(chara[def_char].skill_count < 99) chara[def_char].skill_count += 3;
                            }
                            monado_count += monado[11];         
                        }   
                    }
                    else if(btl_char == 2 && use_item == 1) { 
                        if(chara[2].ITEM[sel_item*3] == "マギ") {
                            chara[def_char].dmg = chara[btl_char].ITEM[sel_item*3+2] - chara[def_char].defen;
                            if(chara[def_char].life < chara[def_char].dmg) {//オーバーダメージのとき
                                chara[btl_char].life += int(chara[def_char].life);
                            }
                            else {//オーバーダメージではないとき
                                chara[btl_char].life += int(chara[def_char].dmg);
                            }
                            if(chara[btl_char].life > chara[btl_char].lfmax) chara[btl_char].life = chara[btl_char].lfmax;
                        }
                    }
                    else if(btl_char == 3 && flg[FLG_EVENT+62] == 1 &&　use_item == 1 && chara[3].ITEM[sel_item*3] == "騎士の弓"　&& chara[def_char].typ == 9) {//弓特攻
                        chara[def_char].dmg = chara[btl_char].ITEM[sel_item*3+2] + 14 - chara[def_char].defen;               
                    }
                    else if(btl_char == 4 && flg[FLG_EVENT+63] == 1 && chara[4].skill == 1) {//イザベラのスキル判定　敵の守備を無視して攻撃
                        if(use_item == 1) {
                            chara[def_char].dmg = chara[btl_char].ITEM[sel_item*3+2];
                        } else {
                            chara[def_char].dmg = chara[btl_char].stren;
                        }
                    }
                    else if((chara[btl_char].typ == 11 || chara[btl_char].typ == 12) && chara[btl_char].skill == 1)  {//グレートナイト、アサシンの月光
                        chara[def_char].dmg = chara[btl_char].stren;
                    }
                    else {
                        if(use_item == 1) {
                            chara[def_char].dmg = chara[btl_char].ITEM[sel_item*3+2] - chara[def_char].defen;
                        } else  {
                            chara[def_char].dmg = chara[btl_char].stren - chara[def_char].defen;
                        }
                    } 
                    use_item = 0; //射程２・３アイテムで攻撃した判定を消す。バグ防止。
                    atkrng3  = 0;//
                    use_monado = 0;//モナド使用判定を消す。
                    if(chara[def_char].dmg < 0) chara[def_char].dmg = 0;
                    console.log("chara[" + def_char + "].dmg: " + chara[def_char].dmg);//確認用
                    
                }
                if(counter == 25) {
                    if(btl_char == 1 && flg[FLG_EVENT+60] == 1 && chara[1].skill == 1) {//エリオンのスキル判定　攻撃、HP回復
                        chara[def_char].dmg += int(chara[btl_char].stren / 2);//攻撃の半分をダメージに加算
                        if(chara[def_char].life < chara[def_char].dmg) {//オーバーダメージのとき
                            chara[1].life += int(chara[def_char].life / 2);
                            if(chara[1].life > chara[1].lfmax) chara[1].life = chara[1].lfmax;
                        }
                        else {//オーバーダメージではないとき
                            chara[1].life += int(chara[def_char].dmg / 2);
                            if(chara[1].life > chara[1].lfmax) chara[1].life = chara[1].lfmax;
                        }
                    }
                    if(def_char == 3 && flg[FLG_EVENT+62] == 1 && chara[3].skill == 1) {//グリフィンのスキル判定　被ダメージ半減
                        chara[def_char].dmg = int(chara[def_char].dmg / 2);
                    }
                    if(def_char <= MEMBER_MAX && monado_shield == 1) {//モナドシールドの判定　被ダメージ半減
                        chara[def_char].dmg = int(chara[def_char].dmg / 2);
                        setEffect(chara[def_char].X, chara[def_char].Y, 10, 67);
                        playSE(12);
                    }
                    chara[def_char].life -= chara[def_char].dmg;
                    if(chara[def_char].life <= 0) chara[def_char].life = 0;
                    setMsg(chara[def_char].name + "は" + chara[def_char].dmg + "のダメージを受けた");
                    chara[btl_char].posY = 0;
                    chara[btl_char].posX = 0;
                }
                if(counter == 30) {
                    if(chara[def_char].life == 0) {//攻撃対象が倒れた場合
                        if(def_char <= MEMBER_MAX) {
                            setMsg(chara[def_char].name + "は倒れた");
                            console.log(chara[def_char].name + "は倒れた");
                            member_map[chara[def_char].Y][chara[def_char].X] = 0;//┬ 倒れたユニットが移動の邪魔、攻撃対象にならないようにする
                            chara[def_char].X = null;                            //┤
                            chara[def_char].Y = null;                            //┘
                            if(chara[1].life == 0) {//主人公が倒れたら敗北
                                scene = 55;
                                counter = 0;
                                break;
                            }
                            if(player_phase == 1) {//プレイヤーのターンだった場合、ユニット選択sceneに戻る
                                scene = 41;
                                counter = 0;
                                chara[def_char].turn = 0;
                                
                                
                            } else {//敵のターンだった場合、次の敵の行動に移る。
                                scene = 52;
                               
                            }
                        }
                        else {
                            setMsg(chara[def_char].name + "を倒した");
                            //console.log(chara[def_char].name + "を倒した");//確認用
                            //log("倒した直後chara[" + def_char + "].dmg: " + chara[def_char].dmg);//確認用
                            //log("倒した直後chara[" + def_char + "].life: " + chara[def_char].life);//確認用
                            enemy_map[chara[def_char].Y][chara[def_char].X] = 0;
                            chara[def_char].X = null;                            
                            chara[def_char].Y = null;
                            if((chara[btl_char].level-chara[def_char].level) <= 0) {//撃破経験値
                                gexp = 30+3*abs(chara[btl_char].level-chara[def_char].level);
                                if(gexp > 100) gexp = 100;
                                console.log("chara[btl_char].level-chara[def_char].level" + (chara[btl_char].level-chara[def_char].level));
                            } else {
                                gexp = 30-5*(chara[btl_char].level-chara[def_char].level);
                                if(gexp < 1) gexp = 1;
                            }
                            
                            //setMsg(gexp + "の経験値を獲得！");
                            //console.log(gexp + "の経験値を獲得！");//確認用
                            lvup = btl_char;
                            scene = 47;//経験値の描画、レベルアップの確認へ
                            counter = 0;
                            break;
                        }           
                    }
                    else {//攻撃対象が倒れなかった場合、反撃判定
                    //console.log("マイナス直前c_atk: " + c_atk);               
                    //console.log("c_atk: " + c_atk);
                        if(c_atk == 0) {//反撃が終了したか、見切り反撃の攻撃が終了したか    
                            if(btl_char > MEMBER_MAX) {//敵の反撃で終了したとき、def_charを敵にして計算を合わせる
                                n = btl_char;
                                btl_char = def_char;
                                def_char = n;
                            }
                            if((chara[btl_char].level-chara[def_char].level) <= 0) {//ダメージ経験値
                                gexp = int((30+3*abs(chara[btl_char].level-chara[def_char].level))/3);
                                if(gexp > 100) gexp = 100;
                                console.log("chara[btl_char].level-chara[def_char].level" + (chara[btl_char].level-chara[def_char].level));
                            } else {
                                gexp = int((30-5*(chara[btl_char].level-chara[def_char].level))/3);
                                if(gexp < 1) gexp = 1;
                            }                           
                            //setMsg(gexp + "の経験値を獲得！");
                            //console.log(gexp + "の経験値を獲得！");//確認用
                            lvup = btl_char;
                            scene = 47;//経験値の描画、レベルアップの確認へ
                            counter = 0;
                            break;               
                        }
                    }
                }    
                if(counter == 35) {//c_atk != 0の場合（反撃できる）
                    if(chara[def_char].life > 0) {//ユニットの体力が残っていたら反撃される
                        scene = 43;
                        counter = 0;
                        n = btl_char;//攻守入れ替え
                        btl_char = def_char;
                        def_char = n;
                        c_atk = 1;//反撃開始時に１にすることで、次のscene43で反撃終了時にc_atk--により０となり行動が終了する      
                    }
                }
            }
            else if(scene == 60) {//範囲攻撃
                if(chara[btl_char].typ == 13 ) {//ニオルのモナドサイクロン
                    if(counter == 10) setMsg("ニオルのアルカナサイクロン！");
                    if(counter == 25) {
                        if(monado_count != 0) monado_count--; 
                    }
                    if(counter == 30) playSE(21); 
                    
                    if(counter > 30) {
                        for(i=1; i<=MEMBER_MAX; i++) {
                            if(chara[i].life > 0) {
                                setEffect(chara[i].X, chara[i].Y, 20, 86);
                                chara[i].dmg = chara[btl_char].stren - chara[i].defen;
                                if(i == 3 && chara[i].skill_count == 0) {//大盾の判定
                                    chara[i].dmg = int(chara[i].dmg / 2);
                                    setEffect(chara[i].X, chara[i].Y, 10, 67);
                                    playSE(12);
                                    chara[i].skill_count = chara[i].SKILL_COUNT_MAX + 1;
                                }
                                if(monado_shield == 1) {//モナドシールドの判定　被ダメージ半減
                                    chara[i].dmg = int(chara[i].dmg / 2);
                                    setEffect(chara[i].X, chara[i].Y, 10, 67);
                                    playSE(12);
                                }
                                if(chara[i].dmg < 0) chara[i].dmg = 0;
                                chara[i].life -= chara[i].dmg;
                                if(chara[i].skill_count != 0) chara[i].skill_count--; //スキルカウントを減らす  
                                 
                                if(chara[i].life < 0) chara[i].life = 0;
                                if(chara[i].life == 0) {//攻撃対象が倒れた場合
                                    setMsg(chara[i].name + "は倒れた");
                                    member_map[chara[i].Y][chara[i].X] = 0;//┬ 倒れたユニットが移動の邪魔、攻撃対象にならないようにする
                                    chara[i].X = null;                            //┤
                                    chara[i].Y = null;                            //┘     
                                }
                            }
                        }
                        if(chara[1].life == 0) {//主人公が倒れたら敗北
                            scene = 55;
                            counter = 0;
                            break;
                        }
                        scene = 52;//次の敵の行動に移る。
                        chara[btl_char].skill_count = chara[btl_char].SKILL_COUNT_MAX;
                    }
                }
            }
            else if(scene == 47) {//経験値の描画
                drawFrame(180, 483, 430, 50, "#003", "white", 60);
                fText("EXP", 280, 507, 30, "white"); 
                drawBar(330, 500, 200, 20, chara[lvup].exp, 100, "#00F", "#008");
                fText(chara[lvup].exp, 570, 507, 30, "white");
                drawImgTS(5, 64*abs(int(counter/4%7)), 64*(lvup)-64, 64, 64, 170, 450, SIZE+10, SIZE+10);               
                //console.log("lvup: " + lvup);//確認用
                if(counter == 5) {
                    n = 0;
                    m = 0;
                    p =-1;
                    j = 0;
                    console.log("counter == 5");//確認用
                    n = chara[lvup].exp + gexp;
                    if(n >= 100) { 
                        m = n - (n%100); //m = 100
                        p = n%100;//p = 100を超えた分の経験値
                    }
                    else {
                        m = n; 
                    }
                } 
                if(counter >= 10 && j == 0) {
                        //console.log("m: " + m);//確認用
                        //console.log("j: " + j);//確認用
                    if(chara[lvup].exp != m) {//（現在の経験値+取得経験値）に到達するまでゲージを上げる
                        //console.log("経験値バー上昇中");//確認用
                        //console.log("m: " + m);//確認用        
                        chara[lvup].exp++;
                        playSE(10);
                        //console.log("chara[lvup].exp" + chara[lvup].exp);//確認用
                    } else if(m == 100) {//（現在の経験値+取得経験値）に到達し、m = 100だった場合
                        //console.log("100に達し、pの処理に移行");//確認用
                        chara[lvup].exp = 0;
                        m = 0;
                        j = 1;
                        //console.log("移行直前 j: " + j);//確認用
                    } else if(p < 0) {
                        scene = 48;
                        counter = 0;//レベルアップしない
                    }
                }

                if(counter >= 10 && j == 1) {
                    drawBar(330, 500, 200, 20, chara[lvup].exp, 100, "#FF0", "#880");//100を超えたら色を変える
                    fText(chara[lvup].exp, 570, 507, 30, "#FF0");
                    if(chara[lvup].exp != p) {
                        //console.log("p: " + p);//確認用
                        chara[lvup].exp++;
                        playSE(10);
                        //console.log("chara[lvup].exp: " + chara[lvup].exp);//確認用
                    } else {
                        scene = 48; // レベルアップする
                        counter = 11;//
                        for(i=0; i<3; i++) pin[i] = 0;//ピン判定の保存配列の初期化
                    }
                }
                
                
                
    
            }
            else if(scene == 48) {//レベルアップ判定
                if(0 <= counter && counter <= 9) {//レベルが上がらなかったとき、9フレーム静止
                    drawFrame(180, 483, 430, 50, "#003", "white", 60);
                    fText("EXP", 280, 507, 30, "white"); 
                    drawBar(330, 500, 200, 20, chara[lvup].exp, 100, "#00F", "#008");
                    fText(chara[lvup].exp, 570, 507, 30, "white"); 
                    drawImgTS(5, 64*abs(int(counter/4%7)), 64*(lvup)-64, 64, 64, 170, 450, SIZE+10, SIZE+10); 
                }

                if(counter == 10) {//レベルアップ判定をスキップ
                    //勝利判定
                    var n = 0;
                    for(i=0; i<EMY_MAX; i++)  n += chara[EMY_TOP+i].life;                     
                    if(n == 0) {//敵ユニットのHP合計が０なら
                        scene = 54;
                        counter = 0;
                        break;
                    }
                    else if(player_phase == 1) {
                        scene = 41;
                        counter = 0;
                        chara[btl_char].turn = 0;//先制したプレイヤーユニットの行動終了
                        if (chara[btl_char].react == 1) {
                            chara[btl_char].turn = 1;
                            chara[btl_char].react = 0;
                        }
                        break;
                    } else {
                        scene = 52;//敵のターンで敵が自滅したとき、次の敵の行動に移る
                        break;
                    }
                }

                if(12 <= counter && counter <= 21) {//レベルが上がったときも、9フレーム静止
                    drawFrame(180, 483, 430, 50, "#003", "white", 60);
                    fText("EXP", 280, 507, 30, "white"); 
                    drawBar(330, 500, 200, 20, chara[lvup].exp, 100, "#FF0", "#880");
                    fText(chara[lvup].exp, 570, 507, 30, "#FF0"); 
                    drawImgTS(5, 64*abs(int(counter/4%7)), 64*(lvup)-64, 64, 64, 170, 450, SIZE+10, SIZE+10); 
                }

                if(counter == 22) playSE(7);//レベルアップの短いBGM
    
                if(23 <= counter && counter <= 70) {
                    drawImgTS(27, 800*int((counter-23)/1.5), 0, 800, 1000, 0, 0, 800, 1000);
                }
                
                if(80 <= counter) {
                    if(lvup == 4) drawImgTS(45, 0, 0, 160, 160, 50, 260, SIZE*4, SIZE*4);//イザベラの画像を表示
                    else drawImgTS(1+lvup, 0, 0, 160, 160, 50, 260, SIZE*4, SIZE*4);  
                    drawImg(35, 0, 0);
                    //drawFrame(400, 140, 300, 560, "black", "white", 60);//大きい方
                    //drawFrame(60, 580, 310, 80, "black", "white", 60);
                    fText(chara[lvup].name, 210, 600, 30, "white");
                    fText("Lv.", 560, 350, 30, "white");
                    fText(chara[lvup].level, 630, 350, 30, "white");
                    fText("HP", 510, 435, 30, "white");
                    fText(chara[lvup].lfmax, 640, 435, 30, "white");
                    fText("攻撃", 510, 492, 30, "white");
                    fText(chara[lvup].stren, 640, 492, 30, "white");
                    fText("守備", 510, 550, 30, "white");
                    fText(chara[lvup].defen, 640, 550, 30, "white");
                    
                }

                if(pin[0] == 1) drawImg(36, 680, 405); //lfmaxがピンしたか
                if(pin[1] == 1) drawImg(36, 680, 462); //strenがピンしたか
                if(pin[2] == 1) drawImg(36, 680, 518); //defenがピンしたか

                if(counter == 100) {
                    chara[lvup].level++;
                    playSE(8);
                }
                
                if(counter == 120){//1ピン目
                    if(rnd(100) < chara[lvup].lfmx_g) {
                        chara[lvup].lfmax++;
                        pin[0] = 1;
                        playSE(9);
                        
                    } 
                    else if(rnd(100) < chara[lvup].srn_g) {
                            chara[lvup].stren++;
                            pin[1] = 1;
                            playSE(9);
                    }
                    else if(rnd(100) < chara[lvup].dfn_g) {
                            chara[lvup].defen++;
                            pin[2] = 1;
                            playSE(9);
                            counter = 150;//終了
                    } else {
                            counter = 150;//終了
                    }
                }
       
                if(counter == 130){
                    if(pin[1] == 1) {//2ピン目(strenが１ピン目で上がったとき)
                        if(rnd(100) < chara[lvup].dfn_g) {
                            chara[lvup].defen++;
                            pin[2] = 1;
                            playSE(9);
                            counter = 150;//終了
                        } else {
                            counter = 150;//終了
                        }
                    }
                    else {//2ピン目(lfmaxが１ピン目で上がったとき)
                        if(rnd(100) < chara[lvup].srn_g) {
                            chara[lvup].stren++;
                            pin[1] = 1; 
                            playSE(9);
                        }
                        else if(rnd(100) < chara[lvup].dfn_g) {
                            chara[lvup].defen++;
                            pin[2] = 1;
                            playSE(9);
                            counter = 150;//終了
                        }
                        else {
                            counter = 150;//終了
                        }
                    }
                }
               
                if(counter == 140){//3ピン目(strenが2ピン目で上がったとき)
                    if(rnd(100) < chara[lvup].dfn_g) {
                        chara[lvup].defen++;
                        pin[2] = 1;
                        playSE(9);
                        counter = 150;//終了
                    }
                    else {
                        counter = 150;//終了
                    }
                }

                if(160 <= counter) {
                    if(tapC == 1) {
                        tapC == 0;
                        //setMsg("レベルアップ判定終了");
                        for(i=0; i<3; i++) pin[i] = 0;//ピン判定の保存配列の初期化
                        //console.log("エリオン攻撃力" + chara[1].stren +"イザベラ" + chara[4].stren)
                        setITEM_RE();//能力値依存の効果値をもつアイテムを更新する。レベルアップ終了時。
                        //勝利判定
                        var n = 0;
                        for(i=0; i<EMY_MAX; i++)  n += chara[EMY_TOP+i].life;                     
                        if(n == 0) {//敵ユニットのHP合計が０なら
                            scene = 54;
                            counter = 0;
                            break;
                        }
                        else if(player_phase == 1) {
                            scene = 41;
                            counter = 0;
                            chara[btl_char].turn = 0;//先制したプレイヤーユニットの行動終了
                            if (chara[btl_char].react == 1) {
                                chara[btl_char].turn = 1;
                                chara[btl_char].react = 0;
                            }
                            break;
                        } else {
                            scene = 52;//敵のターンで敵が自滅したとき、次の敵の行動に移る
                        }
                    } 
                }
            }        
        break; 

        case 44://アイテムを選択
        case 45://回復するユニットを選択
        case 46://回復フェイズ
        case 49://モナドアーツを選択
        //selMember();
        drawBG();
        drawEffect();
        if(scene == 44) {
            if(cut == 0) {
                setAlp(100);
                if(sel_member == 4) drawImgTS(45, 0, 0, 160, 160, 100, 100, SIZE*8, SIZE*8);
                else drawImgTS(sel_member+1, 0, 0, 160, 160, 100, 100, SIZE*8, SIZE*8);
                setAlp(100);
                drawImg(44, 0, 0);
                //drawFrame(10, 80, 780, 700, "black", "white", 60);
                fText("アイテム", 400, 120, 30, "white");    
                for(i=0; i<ITEM_MAX; i++) {
                    y = 200+60*i;
                    if(tapC==1 && 100<tapX && tapX<700 && y-30<tapY && tapY<y+30 && 
                        chara[sel_member].ITEM[i*3] != undefined && chara[sel_member].item[i] != undefined) {
                        tapC = 0;
                        playSE(5);
                        sel_item = i;
                    }
                    col = "white";
                    if(i == sel_item) col = "cyan";
                    drawImg(66, 50, y-32);
                    fText(chara[sel_member].ITEM[i*3] || "", 250, y, 30, col);//配列に入っていないものはundefinedではなく、何も表示されない
                    fText((chara[sel_member].item[i] !== undefined ? "x" + chara[sel_member].item[i] : ""), 600, y, 30, col);
                }
                //drawFrame(30, 700, 740, 60, "black", "white", 60);
                fText(chara[sel_member].ITEM[sel_item*3+1] || "", 400, 730, 30, "white"); 
                if(cirBtn(700, 900, 100, "キャンセル")) {
                    scene = 41;
                    counter = 0;
                    sel_item = 0;
                    cut = 0;
                }
                if(chara[sel_member].ITEM[sel_item*3] == "傷薬" && chara[sel_member].life < chara[sel_member].lfmax && chara[sel_member].item[sel_item] > 0) {
                    if(cirBtn(500, 900, 100, "使用")) {
                        chara[sel_member].item[sel_item]--;
                        chara[sel_member].life += chara[sel_member].ITEM[sel_item*3+2];
                        if(chara[sel_member].life > chara[sel_member].lfmax) chara[sel_member].life = chara[sel_member].lfmax;
                        chara[sel_member].efct = 1;
                        chara[sel_member].etime = 15;
                        scene = 46;
                        counter = 0;
                        setEffect(chara[sel_member].X, chara[sel_member].Y, 15, 63);
                        playSE(6);
                    }
                }
                if(chara[sel_member].ITEM[sel_item*3] == "バトルソウル" && chara[sel_member].life > (int(chara[sel_member].lfmax / 2)) && monado_count != 0){  
                    if(cirBtn(500, 900, 100, "使用")) { 
                        chara[sel_member].turn = 0;
                        chara[sel_member].life -= int(chara[sel_member].lfmax / 2);
                        monado_count--;
                        scene = 41;
                        counter = 0;
                        setEffect(chara[sel_member].X, chara[sel_member].Y, 15, 87);
                        playSE(6);         
                    }
                }
                if(chara[sel_member].ITEM[sel_item*3] == "バーパ" && chara[sel_member].item[sel_item] > 0) {  
                    if(cirBtn(500, 900, 100, "使用")) {
                        scene = 45;
                        counter = 0;         
                    }
                }
                if(chara[sel_member].ITEM[sel_item*3] == "マギ" || chara[sel_member].ITEM[sel_item*3] == "ダイナフラーモ" || chara[sel_member].ITEM[sel_item*3] == "騎士の弓") {//射程２の攻撃アイテム
                    if(chara[sel_member].item[sel_item] > 0) {
                        if(cirBtn(500, 900, 100, "使用")) {
                            scene = 42;
                            counter = 0;
                            c_atk = 1;//見切り反撃
                            use_item = 1;
        
                        }
                    }
                    
                }
                if(chara[sel_member].ITEM[sel_item*3] == "グローム" ) {//射程3の攻撃アイテム
                    if(chara[sel_member].item[sel_item] > 0) {
                        if(cirBtn(500, 900, 100, "使用")) {
                            scene = 42;
                            counter = 0;
                            c_atk = 1;//見切り反撃
                            use_item = 1;
                            atkrng3 = 1;//射程３の攻撃アイテム使用で１
        
                        }
                    }
                    
                }
                if(chara[sel_member].ITEM[sel_item*3] == "スキル説明書") {  
                    if(cirBtn(500, 900, 100, "使用")) {
                        cut = 1;         
                    }
                }
                if(chara[sel_member].ITEM[sel_item*3] == "エマーティノス" && chara[sel_member].skill_count == 0){
                    if(cirBtn(500, 900, 100, "使用")) {
                        for(i=1; i<=MEMBER_MAX; i++) {
                            if(chara[i].life > 0) {
                                chara[i].axisY = chara[i].Y;//┬ユニットの移動範囲の軸座標を設定
                                chara[i].axisX = chara[i].X;//┘
                                chara[i].turn  = 1;//味方ユニットを行動可能にする
                                chara[i].life += chara[sel_member].ITEM[sel_item*3+2];
                                if(chara[i].life > chara[i].lfmax) chara[i].life = chara[i].lfmax;
                                for(y=0; y<9; y++) {
                                    for(x=0; x<12; x++) {
                                        chara[i].moveRange[y][x] = -2;//移動範囲を更新するためにフォーマットする
                                    }
                                }
                                setEffect(chara[i].X, chara[i].Y, 20, 88);
                            }  
                        }
                        scene = 46;
                        counter = 0;
                        chara[sel_member].skill_count = chara[sel_member].SKILL_COUNT_MAX;         
                    }
                }
            }
            if(cut == 1) {
                if(cirBtn(700, 900, 100, "キャンセル")) {
                    cut = 0;
                    skill_tuto = 0;
                }
                if(cirBtn(500, 900, 100, "切り替え")) {
                    skill_tuto++;
                    if (skill_tuto >= SKILL_MAX-1) skill_tuto = 0;
                }
                drawFrame(10, 80, 780, 700, "black", "white", 60);
                fText(SKILL_TUTO[skill_tuto*5], 400, 120, 30, "white"); 
                drawImg(SKILL_TUTO[skill_tuto*5+1], 50, 95);//スキルアイコン　
                fText(SKILL_TUTO[skill_tuto*5+2], 405, 220, 30, "white"); 
                fText(SKILL_TUTO[skill_tuto*5+3], 400, 270, 30, "white");
                fText(SKILL_TUTO[skill_tuto*5+4], 330, 320, 30, "white"); 
            } 
            }
                
        else if(scene == 45) {
            drawImg(34, 0, -350);
            fText("対象を選択してください", 400, 125, 25, "white");
            var x = int(tapX/SIZE)+1;
            var y = int(tapY/SIZE)-2;
            if(cirBtn(700, 900, 100, "キャンセル")) {
                if(use_monado == 1) {
                    scene = 49;
                }
                else {
                    scene = 44;
                } 
                counter = 0;
                use_monado = 0;
            }
            if(0<=x && x<12 && 0<=y && y<9) {
                    for(i=1; i<=MEMBER_MAX; i++) {
                        if(member_map[y][x] == i && chara[i].life < chara[i].lfmax) {
                            if( chara[sel_member].X == chara[i].X   && chara[sel_member].Y == chara[i].Y+1 || //上に味方がいるか
                                chara[sel_member].X == chara[i].X-1 && chara[sel_member].Y == chara[i].Y   || //右
                                chara[sel_member].X == chara[i].X   && chara[sel_member].Y == chara[i].Y-1 || //下
                                chara[sel_member].X == chara[i].X+1 && chara[sel_member].Y == chara[i].Y  ) { //左
                                    lineW(3);
                                    setAlp(50);
                                    fRect(x*SIZE-SIZE, y*SIZE+150, SIZE, SIZE, "#0F0");//マウスポインタのマスに正方形を表示
                                    setAlp(100);
                                    lineW(2);
                                    heal_member = i;
                                    drawBtlResult(sel_member, heal_member);   
                                    if(tapC == 1){
                                        tapC = 0;
                                        cut = 1;
                                        if(chara[sel_member].skill_count < 99) chara[sel_member].skill_count --;
                                        if(chara[sel_member].skill_count < 0)chara[sel_member].skill_count = 0;
                                    }  
                            }                                                       
                        }
                    }
            }
            if(cut == 1) {//回復
                lineW(3);
                setAlp(80);
                sRect(chara[heal_member].X*SIZE-SIZE-9+(counter/5%5), chara[heal_member].Y*SIZE+150-10+(counter/5%5), SIZE+20-(counter/2%12.5), SIZE+20-(counter/2%12.5), "#0F0");//カーソルの枠を表示
                sRect(chara[heal_member].X*SIZE-SIZE-7+(counter/5%5), chara[heal_member].Y*SIZE+150-8+(counter/5%5), SIZE+16-(counter/2%12.5), SIZE+16-(counter/2%12.5), "#0F0");//カーソルの内側枠を表示
                fTri( chara[heal_member].X*SIZE-SIZE*0.75, chara[heal_member].Y*SIZE+SIZE*1.4+(counter/2%12.5) ,  chara[heal_member].X*SIZE-SIZE*0.5, chara[heal_member].Y*SIZE+SIZE*1.7+(counter/2%12.5),  chara[heal_member].X*SIZE-SIZE*0.25, chara[heal_member].Y*SIZE+SIZE*1.4+(counter/2%12.5), "#EEE");
                fTri( chara[heal_member].X*SIZE-SIZE*0.7, chara[heal_member].Y*SIZE+SIZE*1.4+2+(counter/2%12.5) ,  chara[heal_member].X*SIZE-SIZE*0.5, chara[heal_member].Y*SIZE+SIZE*1.6+2+(counter/2%12.5),  chara[heal_member].X*SIZE-SIZE*0.3, chara[heal_member].Y*SIZE+SIZE*1.4+2+(counter/2%12.5), "#FFF");
                lineW(2);
                setAlp(100);
                drawBtlResult(sel_member, heal_member);
                //if(cirBtn(500, 900, 100, "実行")){ 
                    chara[sel_member].turn = 0;           
                    chara[sel_member].item[sel_item]--;
                    chara[heal_member].life += chara[sel_member].ITEM[sel_item*3+2];
                    //console.log("sel_item: " + sel_item);//確認用
                    //console.log("chara[sel_member].ITEM[sel_item*3]: " + chara[sel_member].ITEM[sel_item*3]);//確認用
                    //console.log("chara[sel_member].ITEM[sel_item*3+2]: " + chara[sel_member].ITEM[sel_item*3+2]);//確認用
                    if(chara[heal_member].life > chara[heal_member].lfmax) chara[heal_member].life = chara[heal_member].lfmax;
                    setEffect(chara[heal_member].X, chara[heal_member].Y, 15, 63);
                    playSE(6);
                    scene = 46;
                    counter = 0;                
                    cut = 0;
                //}
            }                
        }
        else if(scene == 46) {
            if(counter == 20) {
                if(chara[sel_member].ITEM[sel_item*3] == "傷薬" && use_monado == 0) {
                    scene = 41;
                    counter = 0;
                    chara[sel_member].turn = 0;
                } 
                else if(chara[sel_member].ITEM[sel_item*3] == "バーパ" || use_monado == 1) { 
                    gexp = 30;
                    //setMsg(gexp + "の経験値を獲得！");
                    console.log(gexp + "の経験値を獲得！");//確認用
                    lvup = sel_member;
                    btl_char = sel_member;                
                    scene = 47;//経験値の描画、レベルアップの確認へ
                    counter = 0;
                    use_monado = 0;
                }
                else if(chara[sel_member].ITEM[sel_item*3] == "エマーティノス" ) { 
                    gexp = 100;
                    //setMsg(gexp + "の経験値を獲得！");
                    console.log(gexp + "の経験値を獲得！");//確認用
                    lvup = sel_member;
                    btl_char = sel_member;                
                    scene = 47;//経験値の描画、レベルアップの確認へ
                    counter = 0;
                    use_monado = 0;
                }
            }
            
        }
        else if(scene == 49) {//モナドアーツを選択
            drawImg(58, 0, 0);
            //drawFrame(10, 80, 780, 700, "black", "white", 60);
            fText("アルカナ", 400, 120, 30, "white");    
            for(i=0; i<MONADO_MAX; i++) {
                y = 200+60*i;
                if(tapC==1 && 100<tapX && tapX<700 && y-30<tapY && tapY<y+30 && 
                    monado[i*3] != undefined ) {
                    tapC = 0;
                    playSE(5);
                    sel_monado = i;
                }
                col = "white";
                if(i == sel_monado) col = "cyan";
                drawImg(65, 50, y-32);//ネーム枠
                fText(monado[i*3] || "", 250, y, 30, col);//配列に入っていないものはundefinedではなく、何も表示されない
                fText("増加:", 600, y, 30, col); 
                fText(monado[i*3+2] || "", 660, y, 30, col);//増加カウント数
            }
            //drawFrame(30, 700, 740, 60, "black", "white", 60);
            fTextN(monado[sel_monado*3+1] || "", 400, 685, 40, 30, "white");//説明文
            if(cirBtn(700, 900, 100, "キャンセル")) {
                scene = 41;
                counter = 0;
                sel_monado = 0;
                use_monado = 0;
                c_atk = 0;
                cut = 0;
            } 
            if(monado_count == MND_COT_MAX) {
                if(monado[sel_monado*3] == "バスター" || monado[sel_monado*3] == "ブレイカー") {
                    if(cirBtn(500, 900, 100, "使用")) {
                        scene = 42;
                        counter = 0;
                        c_atk = 1;//見切り反撃
                        use_monado = 1;
    
                    }           
                }
                if(monado[sel_monado*3] == "シールド ") {//右に半角スペースがあるので注意。
                    if(cirBtn(500, 900, 100, "使用")) {//モナドシールドのバフ効果付与 
                        chara[sel_member].turn = 0;
                        monado_shield = 1;           
                        for(i=1; i<=MEMBER_MAX; i++) {
                            if(chara[i].life > 0) setEffect(chara[i].X, chara[i].Y,20, 64);     
                        }
                        
                        monado_count += monado[5];
                        //console.log("モナドシールドがかかった " );//確認用
                        scene = 46;
                        counter = 0;                
                        cut = 0;     
                        use_monado = 1;
                    }       
                }
                if(monado[sel_monado*3] == "スピード ") {//右に半角スペースがあるので注意。
                    if(cirBtn(500, 900, 100, "使用")) {//モナドスピードのバフ効果付与
                        for(i=1; i<= MEMBER_MAX; i++) {
                            chara[i].move += monado_spd_move;
                            if(chara[i].life > 0) setEffect(chara[i].X, chara[i].Y, 20, 61);
                        } 
                        playSE(23);
                        monado_spd = 1;                      
                        monado_count += monado[8];
                        //console.log("モナドスピードがかかった " );//確認用
                        chara[sel_member].react = 1;
                        chara[sel_member].axisY = chara[sel_member].Y;//┬ユニットの移動範囲の軸座標を設定
                        chara[sel_member].axisX = chara[sel_member].X;//┘
                        for(y=0; y<9; y++) {
                            for(x=0; x<12; x++) {
                                chara[i].moveRange[y][x] = -2;//移動範囲を更新するためにフォーマットする
                            }
                        }
                        scene = 46;
                        counter = 0;                
                        cut = 0;
                        use_monado = 1;
                    }       
                }
            }              
        } 
        // if(chara[sel_member].etime > 0) { //回復エフェクト
        //     btlEffect(chara[sel_member].efct, chara[sel_member].X*SIZE-40, chara[sel_member].Y*SIZE+150+40, 0.5, chara[sel_member].etime);
        //     chara[sel_member].etime -= 3; 
        // }
        // if(chara[heal_member].etime > 0) { //回復対象の回復エフェクト
        //     btlEffect(chara[heal_member].efct, chara[heal_member].X*SIZE-40, chara[heal_member].Y*SIZE+150+40, 0.5, chara[heal_member].etime);
        //     chara[heal_member].etime -= 3; 
        // }    
        break;

        case 51://敵フェイズ開始　行動順を決める
        case 52://順に行動していく
        case 53://移動する
        //fText("counter  "+ counter, 100, 220, 20, "white");//確認用 
        drawBG();
        drawEffect();
        if(scene == 51) {
            if(counter == 9) playSE(27);
            if(10 <= counter  && counter <= 35) {
                setAlp(30);
                fRect(0, 0, 800, 1000, "#000");
                setAlp(100);
                drawImgTS(16, 800*int((counter-10)/2.5), 0, 800, 1000, 0, 0, 800, 1000);
                
                //setAlp((counter-10)*8);
                //lineW(5);
                //fText("Enemy Phase", 400, 500, 80, "#F00");
                //sCir(600, 500, (counter)*30, "#F00");
                //lineW(2);
            }
            
            if(counter == 50) {
                enemyOrder();
                c_atk = 0;  //射程２、３攻撃アイテム
                atkrng3 = 0;//によるバグを防止
                scene = 52;
            }     
        }
        else if(scene == 52) {
            enemy_turn++;
            if(enemy_turn == EMY_MAX) {//敵全員の行動が終了したら
                scene = 40;
                counter = 0;
            }
            else {
                if(order[enemy_turn] > 0) {
                    btl_char = order[enemy_turn]%100 + EMY_TOP;
                    
//↓↓↓【敵のAIプログラム】↓↓↓ 開始
//全体像
    //ターゲットユニットを決める
    //初期位置で上下左右にターゲットがいれば攻撃する
    //上下左右に敵がいなければ、ターゲットまでの最短距離を幅優先探索（bfs)で計算する。
        //ターゲットまでの距離が不明のとき（ターゲットの周囲１マスが空いていないなど）は、distance = -1 の分岐処理をし、ターゲットの外周２マスをゴールとして移動する。
        //ターゲットまでの距離が計算でき、ターゲットが「その敵の攻撃が届く移動範囲内」だった場合、攻撃できるマスまで移動し、攻撃する。
        //ターゲットまでの距離が計算でき、ターゲットが「その敵の攻撃が届く移動範囲外」だった場合、移動範囲内のターゲットまでの最短距離のマスに移動する。

                if(chara[btl_char].life > 0 ) {

                    //敵ターン開始時のスキル発動
                    if(chara[btl_char].typ == 13 && chara[btl_char].skill_count == 0) {
                        scene = 60;//モナドサイクロン
                        counter = 0;
                        console.log("ニオルのスキルカウントが０");
                        break;
                    }
                    if(chara[btl_char].typ == 13 && chara[btl_char].skill_count != 0) chara[btl_char].skill_count--;//ニオルのスキルカウントを-1
                    

                    //ターゲットユニットを決める
                    for(def_char=1; def_char<=MEMBER_MAX; def_char++) {//このdef_charはターゲットではない。bfs()を使うために便宜上、このfor文のみdef_charを使う。
                        if(chara[def_char].life > 0) {
                            distanceArr = new Array(9).fill([]).map(() => new Array(12).fill(-1));//初期化
                            start = [chara[btl_char].Y, chara[btl_char].X];
                            goal  = [chara[def_char].Y, chara[def_char].X];
                            table = stage;
                            table_2 = distanceArr;
                            distance = bfs(start, goal, table, table_2);
                                if(distance == -1) {
                                    distance = 90;
                                }
                            search[def_char-1] = distance;
                            search_sort[def_char-1] = distance;
                        } else {
                            search[def_char-1] = 99;
                            search_sort[def_char-1] = 99;
                        }
                    }
                    //console.log("ソート前search[0]: " + search[0]);//確認用
                    //console.log("search[1]: " + search[1]);//確認用
                    //console.log("search[2]: " + search[2]);//確認用                  
                    for(i=0; i<MEMBER_MAX-1; i++) {//search_sort[]を小さい順に並べ替える
                        for(j=0; j<MEMBER_MAX-i; j++) {
                            if(search_sort[j]>search_sort[j+1]) {//小さな値を左に移動
                                n = search_sort[j];
                                search_sort[j] = search_sort[j+1];
                                search_sort[j+1] = n;
                                //console.log("search＿save[]を昇順に並べ替えた");//確認用
                            }
                        }
                    }
                    for(i=1; i<=MEMBER_MAX; i++) {//攻撃範囲内のメンバーユニットへ与えられるダメージを保存
                        if(chara[i].life > 0 && search[i-1] <= chara[btl_char].move) {
                            chara[i].dmg = chara[btl_char].stren - chara[i].defen;
                            if(chara[i].dmg < 0) chara[i].dmg = 0;
                            search_dmg[i-1] = chara[i].dmg;
                            search_dmg_sort[i-1] = chara[i].dmg;
                        }            
                    }
                    for(i=0; i<MEMBER_MAX-1; i++) {//search_dmg_sort[]を大きい順に並べ替える
                        for(j=0; j<MEMBER_MAX-1-i; j++) {
                            if(search_dmg_sort[j]<search_dmg_sort[j+1]) {//大きな値を左に移動
                                n = search_dmg_sort[j];
                                search_dmg_sort[j] = search_dmg_sort[j+1];
                                search_dmg_sort[j+1] = n;
                                //console.log("search_dmg_sort[]を降順に並べ替えた");//確認用
                            }
                        }
                    }
                    for(i=1; i<=MEMBER_MAX; i++) {//最短距離のメンバーユニットをターゲットにする
                        if(search[i-1] == search_sort[0]) {
                            def_char = i;
                        }
                    }
                    for(i=1; i<=MEMBER_MAX; i++) {//攻撃範囲内の最もダメージが与えられるメンバーユニットをターゲットにする
                        if(search[i-1] <= chara[btl_char].move && search_dmg[i-1] == search_dmg_sort[0] ) {
                            def_char = i;
                        }
                    }
                    for(i=1; i<=MEMBER_MAX; i++) {//攻撃範囲内かつその中のメンバーユニットのlifeが7以下でダメージが１以上の場合、そのユニットをターゲットにする
                        if(search[i-1] <= chara[btl_char].move && chara[i].life <= 7 && chara[btl_char].stren - chara[i].defen > 0) {
                            def_char = i;
                        }
                    }
                    //console.log("サーチ後のdef_char" + def_char);//確認用

                    //console.log("search[0]: " + search[0]);//確認用
                    //console.log("search[1]: " + search[1]);//確認用
                    //console.log("search[2]: " + search[2]);//確認用
                    //console.log("search_sort[0]: " + search_sort[0]);//確認用
                    //console.log("search_sort[1]: " + search_sort[1]);//確認用
                    //console.log("search_sort[2]: " + search_sort[2]);//確認用
                    //console.log("search_dmg[0]: " + search_dmg[0]);//確認用
                    //console.log("search_dmg[1]: " + search_dmg[1]);//確認用
                    //console.log("search_dmg[2]: " + search_dmg[2]);//確認用  
                    //console.log("search_dmg_sort[0]: " + search_dmg_sort[0]);//確認用
                    //console.log("search_dmg_sort[1]: " + search_dmg_sort[1]);//確認用
                    //console.log("search_dmg_sort[2]: " + search_dmg_sort[2]);//確認用    
                    //console.log("def_char: " + def_char);//確認用


                    //上下左右の１マスを調べる。
                        if( chara[btl_char].X == chara[def_char].X   && chara[btl_char].Y == chara[def_char].Y+1 || //上にターゲットがいるか。
                            chara[btl_char].X == chara[def_char].X-1 && chara[btl_char].Y == chara[def_char].Y   || //右
                            chara[btl_char].X == chara[def_char].X   && chara[btl_char].Y == chara[def_char].Y-1 || //下
                            chara[btl_char].X == chara[def_char].X+1 && chara[btl_char].Y == chara[def_char].Y  ) { //左

                                scene = 43;
                                console.log("scene43に入った");//確認用
                                counter = 0;

                        } //上下左右にターゲットがいなければ
                        else  { 
                            start = [chara[btl_char].Y, chara[btl_char].X];//敵ユニットの初期座標
                            goal  = [chara[def_char].Y, chara[def_char].X];//ターゲットの座標
                            table = stage;
                            distanceArr = new Array(9).fill([]).map(() => new Array(12).fill(-1));//初期座標からの距離をマスごとに記録しておく配列
                            var distanceArr_2 = new Array(9).fill([]).map(() => new Array(12).fill(99));//distanceArr_2の初期化
                            var distanceArr_save = new Array(9).fill([]).map(() => new Array(12).fill(-1));
                            table_2 = distanceArr;
                            distance = bfs(start, goal, table, table_2);//初期座標からターゲットまでの最短距離を幅優先探索(bfs)で計算する。distance = -1のとき、未到達。
                            table_2 = distanceArr_save; //kesu
                            bfs(start, goal, table, table_2); //kesu
                            table_2 = distanceArr;//kesu            
                            console.log("最初のdistance: " + distance);//確認用
                            chara[btl_char].staY = chara[btl_char].Y*SIZE+150-20;
                            chara[btl_char].staX = chara[btl_char].X*SIZE-SIZE-20;

                            //ゴールが無い時（ターゲットユニットの周囲１マスに空きがない）
                            if(distance == -1)  {
                                start = [chara[btl_char].Y, chara[btl_char].X];//敵ユニットの初期座標
                                goal  = [chara[def_char].Y, chara[def_char].X];//ターゲットの座標
                                table = stage;
                                distanceArr = deepCopy(new Array(stage[0].length).fill(new Array(stage.length).fill(-1)));//初期座標からの距離をマスごとに記録しておく配列
                                table_2 = distanceArr;
                                distance = bfsZero(start, goal, table, table_2);//初期座標からターゲットまでの最短距離を幅優先探索(bfs)で計算する。distance = -1のとき、未到達。
                                console.log("(bfsZero)distance: " + distance);//確認用

                                //敵ユニットの移動範囲以内にターゲットユニットの外周２マスがある時
                                if(-1 < distance && distance <= chara[btl_char].move) {
                                    console.log("(bfsZero)distanceが-1より大きく" + chara[btl_char].move + "以下です");//確認用
                                        if(-1 < distanceArr[chara[def_char].Y-2][chara[def_char].X] &&//ターゲットの上のマスが移動範囲内かつ敵がいないとき
                                            distanceArr[chara[def_char].Y-2][chara[def_char].X] <= distance && 
                                            enemy_map[chara[def_char].Y-2][chara[def_char].X] == 0) {
                                                console.log("(bfsZero)def_charのdistanceArr上: " + distanceArr[chara[def_char].Y-2][chara[def_char].X]);//確認用
                                                console.log(distanceArr[chara[def_char].Y-2][chara[def_char].X] <= distance);//確認用
                                                enemy_map[chara[btl_char].Y][chara[btl_char].X] = 0;
                                                targetY = (chara[def_char].Y-2)*SIZE+150-20;
                                                targetX = chara[def_char].X*SIZE-SIZE-20;
                                        }
                                        else if (-1 < distanceArr[chara[def_char].Y-1][chara[def_char].X+1] &&//ターゲットの右上のマスが移動範囲内かつ敵がいないとき
                                        distanceArr[chara[def_char].Y-1][chara[def_char].X+1] <= distance &&
                                        enemy_map[chara[def_char].Y-1][chara[def_char].X+1] == 0) {
                                            console.log("(bfsZero)def_charのdistanceArr右上: " + distanceArr[chara[def_char].Y-1][chara[def_char].X+1] <= distance);//確認用
                                            enemy_map[chara[btl_char].Y][chara[btl_char].X] = 0;
                                            targetY = (chara[def_char].Y-1)*SIZE+150-20;
                                            targetX = (chara[def_char].X+1)*SIZE-SIZE-20;
                                        }
                                        else if (-1 < distanceArr[chara[def_char].Y][chara[def_char].X+2] &&//ターゲットの右のマスが移動範囲内かつ敵がいないとき
                                                distanceArr[chara[def_char].Y][chara[def_char].X+2] <= distance &&
                                                enemy_map[chara[def_char].Y][chara[def_char].X+2] == 0) {
                                                    console.log("(bfsZero)def_charのdistanceArr右: " + distanceArr[chara[def_char].Y][chara[def_char].X+2] <= distance);//確認用
                                                    enemy_map[chara[btl_char].Y][chara[btl_char].X] = 0;
                                                    targetY = chara[def_char].Y*SIZE+150-20;
                                                    targetX = (chara[def_char].X+2)*SIZE-SIZE-20;                                        
                                        }
                                        else if (-1 < distanceArr[chara[def_char].Y+1][chara[def_char].X+1] &&//ターゲットの右下のマスが移動範囲内かつ敵がいないとき
                                                distanceArr[chara[def_char].Y+1][chara[def_char].X+1] <= distance &&
                                                enemy_map[chara[def_char].Y+1][chara[def_char].X+1] == 0) {
                                                    console.log("(bfsZero)def_charのdistanceArr右: " + distanceArr[chara[def_char].Y+1][chara[def_char].X+1] <= distance);//確認用
                                                    enemy_map[chara[btl_char].Y][chara[btl_char].X] = 0;
                                                    targetY = (chara[def_char].Y+1)*SIZE+150-20;
                                                    targetX = (chara[def_char].X+1)*SIZE-SIZE-20;
                                        }  
                                        else if (-1 < distanceArr[chara[def_char].Y+2][chara[def_char].X] &&//ターゲットの下のマスが移動範囲内かつ敵がいないとき
                                                distanceArr[chara[def_char].Y+2][chara[def_char].X] <= distance &&
                                                enemy_map[chara[def_char].Y+2][chara[def_char].X] == 0) {
                                                    console.log("(bfsZero)def_charのdistanceArr下: " + distanceArr[chara[def_char].Y+2][chara[def_char].X] <= distance);//確認用
                                                    enemy_map[chara[btl_char].Y][chara[btl_char].X] = 0;
                                                    targetY = (chara[def_char].Y+2)*SIZE+150-20;
                                                    targetX = (chara[def_char].X)*SIZE-SIZE-20;
                                        }
                                        else if (-1 < distanceArr[chara[def_char].Y+1][chara[def_char].X-1] &&//ターゲットの左下のマスが移動範囲内かつ敵がいないとき
                                                distanceArr[chara[def_char].Y+1][chara[def_char].X-1] <= distance &&
                                                enemy_map[chara[def_char].Y+1][chara[def_char].X-1] == 0) {
                                                    console.log("(bfsZero)def_charのdistanceArr下: " + distanceArr[chara[def_char].Y+1][chara[def_char].X-1] <= distance);//確認用
                                                    enemy_map[chara[btl_char].Y][chara[btl_char].X] = 0;
                                                    targetY = (chara[def_char].Y+1)*SIZE+150-20;
                                                    targetX = (chara[def_char].X-1)*SIZE-SIZE-20;
                                        }
                                        else if (-1 < distanceArr[chara[def_char].Y][chara[def_char].X-2] &&//ターゲットの左のマスが移動範囲内かつ敵がいないとき
                                                distanceArr[chara[def_char].Y][chara[def_char].X-2] <= distance &&
                                                enemy_map[chara[def_char].Y][chara[def_char].X-2] == 0) {
                                                    console.log("(bfsZero)def_charのdistanceArr左: " + distanceArr[chara[def_char].Y][chara[def_char].X-2] <= distance);//確認用
                                                    enemy_map[chara[btl_char].Y][chara[btl_char].X] = 0;
                                                    targetY = chara[def_char].Y*SIZE+150-20;
                                                    targetX = (chara[def_char].X-2)*SIZE-SIZE-20;
                                        }
                                        else if (-1 < distanceArr[chara[def_char].Y-1][chara[def_char].X-1] &&//ターゲットの左上のマスが移動範囲内かつ敵がいないとき
                                                distanceArr[chara[def_char].Y-1][chara[def_char].X-1] <= distance &&
                                                enemy_map[chara[def_char].Y-1][chara[def_char].X-1] == 0) {
                                                    console.log("(bfsZero)def_charのdistanceArr右: " + distanceArr[chara[def_char].Y-1][chara[def_char].X-1] <= distance);//確認用
                                                    enemy_map[chara[btl_char].Y][chara[btl_char].X] = 0;
                                                    targetY = (chara[def_char].Y-1)*SIZE+150-20;
                                                    targetX = (chara[def_char].X-1)*SIZE-SIZE-20;
                                        } 
                                            scene = 53;
                                            counter = 0;
                                            console.log("ターゲットユニットの外周2マスを目指しscene53に入った");//確認用
                                            break;
                                        }
                                
                                 //naosu       //var distanceArr_save = distanceArr;//bfs()で作ったdistanceArrを保存しておく。
                                        console.log("(bfsZero)distanceArr: " + distanceArr[chara[def_char].Y][chara[def_char].X+1]);//確認用
                                        i = 0;                       
                                        distance_2  = new Array(12).fill(99);
                                        var distanceArr_2 = new Array(9).fill([]).map(() => new Array(12).fill(99));//distanceArr_2の初期化
                                        for(y=0; y<9; y++) {
                                            for(x=0; x<12; x++) {
                                                if(distanceArr_save[y][x] == chara[btl_char].move) {//敵ユニットの移動力の値のマスなら
                                                    console.log(distanceArr_save[0][7]  == chara[btl_char].move);
                                                    console.log("(bfsZero)distanceArr_save[y][x]と移動力の値が同じ");//確認用
                                                    start = [y, x];//敵ユニットの移動力の値のマスを初期値とする
                                                    console.log("(bfsZero)移動力分だけ移動したマス y:" + y + " x:" + x);//確認用
                                                    goal = [chara[def_char].Y, chara[def_char].X];
                                                    distanceArr = new Array(9).fill([]).map(() => new Array(12).fill(-1));//distanceArrを初期化
                                                    table_2 = distanceArr;                      
                                                    distanceArr_2[y][x] = bfsZero(start, goal, table, table_2);//初期値（敵ユニットの移動力の値のマス）からターゲットまでの最短距離を計算する。計算結果を敵ユニットの移動力の値のマス全てに保存する
                                                    console.log("(bfsZero)distanceArr_2[" + y + "]" + "[" + x + "]: " + distanceArr_2[y][x]);//確認用
                                                    console.log("(bfsZero)distanceArr_2[0][7]: " + distanceArr_2[0][7]);//確認用
                                                    distanceArr = new Array(9).fill([]).map(() => new Array(12).fill(-1));//distanceArrを初期化
                                                    table_2 = distanceArr;
                                                    distance_2[i] = bfsZero(start, goal, table, table_2);//全ての「敵ユニットの移動力の値のマス」に保存した「ターゲットまでの最短距離」を昇順に並べるために保存。最小のマスに敵ユニットを移動させる。
                                                    if(distance_2[i] < 0) distance_2[i] = 99;
                                                    log("distance_2["+ i + "]: " + distance_2[i]);
                                                    i++;
                                                    
                                                }
                                            }
                                        }
                                        for(i=0; i<11; i++) {//distance_2を小さい順に並べ替える
                                            for(j=0; j<12-i; j++) {
                                                if(distance_2[j]>distance_2[j+1]) {//小さな値を左に移動
                                                    n = distance_2[j];
                                                    distance_2[j] = distance_2[j+1];
                                                    distance_2[j+1] = n;
                                                    console.log("(bfsZero)distance_2[]を昇順に並べ替えた");//確認用
                                                }
                                            }
                                        }  
                                        //ターゲットの外周２マスにたどり着けないとき（おそらく道が塞がれている）
                                            if(distance_2[0] != 99) {//ゴールがあるとき
                                                log("ターゲットの外周２マスにたどり着ける");
                                                for(y=0; y<9; y++) {
                                                    for(x=0; x<12; x++) {
                                                        if(distanceArr_2[y][x] == distance_2[0]) {
                                                            console.log("(bfsZero)distance_2[0]: " + distance_2[0]);//確認用
                                                            console.log("(bfsZero)distanceArr_2[y][x]: " + distanceArr_2[y][x]);//確認用
                                                            console.log("(bfsZero)y:" + y + " x:" + x);//確認用
                                                            enemy_map[chara[btl_char].Y][chara[btl_char].X] = 0;
                                                            targetY = y*SIZE+150-20;
                                                            targetX = x*SIZE-SIZE-20;
                                                        }
                                                    }
                                                 }
                                            }
                                             else {//ゴールがないときchara[1]のいる方向に１マス移動
                                                log("道が塞がれているか、ターゲットの外周２マスに空きがない");
                                                if(chara[1].Y < chara[btl_char].Y &&
                                                    stage[chara[btl_char].Y-1][chara[btl_char].X] == 0 &&
                                                    member_map[chara[btl_char].Y-1][chara[btl_char].X] == 0 &&
                                                    enemy_map[chara[btl_char].Y-1][chara[btl_char].X] == 0) {
                                                    enemy_map[chara[btl_char].Y][chara[btl_char].X] = 0;
                                                    targetY = (chara[btl_char].Y-1)*SIZE+150-20;
                                                    targetX = chara[btl_char].X*SIZE-SIZE-20;
                                                    log("道が塞がれているので上に１マス移動");                                     
                                                } 
                                                else if (chara[1].Y > chara[btl_char].Y &&
                                                        stage[chara[btl_char].Y+1][chara[btl_char].X] == 0 &&
                                                        member_map[chara[btl_char].Y+1][chara[btl_char].X] == 0 &&
                                                        enemy_map[chara[btl_char].Y+1][chara[btl_char].X] == 0) {
                                                        enemy_map[chara[btl_char].Y][chara[btl_char].X] = 0;
                                                        targetY = (chara[btl_char].Y+1)*SIZE+150-20;
                                                        targetX = chara[btl_char].X*SIZE-SIZE-20; 
                                               } 
                                                else if (chara[1].X > chara[btl_char].X &&
                                                        stage[chara[btl_char].Y][chara[btl_char].X+1] == 0 &&
                                                        member_map[chara[btl_char].Y][chara[btl_char].X+1] == 0 &&
                                                        enemy_map[chara[btl_char].Y][chara[btl_char].X+1] == 0) {
                                                        enemy_map[chara[btl_char].Y][chara[btl_char].X] = 0;
                                                        targetY = chara[btl_char].Y*SIZE+150-20;
                                                        targetX = (chara[btl_char].X+1)*SIZE-SIZE-20; 
                                                } 
                                                else if (chara[1].X < chara[btl_char].X &&
                                                stage[chara[btl_char].Y][chara[btl_char].X-1] == 0 &&
                                                member_map[chara[btl_char].Y][chara[btl_char].X-1] == 0 &&
                                                enemy_map[chara[btl_char].Y][chara[btl_char].X-1] == 0) {
                                                enemy_map[chara[btl_char].Y][chara[btl_char].X] = 0;
                                                targetY = chara[btl_char].Y*SIZE+150-20;
                                                targetX = (chara[btl_char].X-1)*SIZE-SIZE-20; 
                                                
                                                }
                                                else {
                                                    enemy_map[chara[btl_char].Y][chara[btl_char].X] = chara[btl_char].typ-1;
                                                    targetY = chara[btl_char].Y*SIZE+150-20;
                                                    targetX = chara[btl_char].X*SIZE-SIZE-20;
                                                    log("(bfsZero)chara["+ btl_char + "]は動けなかった"); 
                                                }
                                            }
                                        scene = 53;
                                        console.log("ターゲットの外周2マスをゴールに設定できないため、エリオンのいる方向を目指しscene53に入った");//確認用
                                        counter = 0;
                                        break;
                                }
                                //敵ユニットの移動範囲以内にターゲットがいる時
                                else if(-1 < distance && distance <= chara[btl_char].move) {
                                    console.log("distanceが-1より大きく" + chara[btl_char].move + "以下です");//確認用
                                    chara[btl_char].staY = chara[btl_char].Y*SIZE+150-20;
                                    chara[btl_char].staX = chara[btl_char].X*SIZE-SIZE-20;
                                        if(-1 < distanceArr[chara[def_char].Y-1][chara[def_char].X] &&//ターゲットの上のマスが移動範囲内かつ敵がいないとき
                                            distanceArr[chara[def_char].Y-1][chara[def_char].X] <= distance && 
                                            enemy_map[chara[def_char].Y-1][chara[def_char].X] == 0) {
                                                console.log("def_charのdistanceArr上: " + distanceArr[chara[def_char].Y-1][chara[def_char].X]);//確認用
                                                console.log(distanceArr[chara[def_char].Y-1][chara[def_char].X] <= distance);//確認用
                                                enemy_map[chara[btl_char].Y][chara[btl_char].X] = 0;
                                                targetY = (chara[def_char].Y-1)*SIZE+150-20;
                                                targetX = chara[def_char].X*SIZE-SIZE-20;
                                               
                                        }
                                        else if (-1 < distanceArr[chara[def_char].Y+1][chara[def_char].X] &&//ターゲットの下のマスが移動範囲内かつ敵がいないとき
                                                distanceArr[chara[def_char].Y+1][chara[def_char].X] <= distance &&
                                                enemy_map[chara[def_char].Y+1][chara[def_char].X] == 0) {
                                                    console.log("def_charのdistanceArr下: " + distanceArr[chara[def_char].Y+1][chara[def_char].X] <= distance);//確認用
                                                    enemy_map[chara[btl_char].Y][chara[btl_char].X] = 0;
                                                    targetY = (chara[def_char].Y+1)*SIZE+150-20;
                                                    targetX = chara[def_char].X*SIZE-SIZE-20;
                                        }
                                        else if (-1 < distanceArr[chara[def_char].Y][chara[def_char].X-1] &&//ターゲットの左のマスが移動範囲内かつ敵がいないとき
                                                distanceArr[chara[def_char].Y][chara[def_char].X-1] <= distance &&
                                                enemy_map[chara[def_char].Y][chara[def_char].X-1] == 0) {
                                                    console.log("def_charのdistanceArr左: " + distanceArr[chara[def_char].Y][chara[def_char].X-1] <= distance);//確認用
                                                    enemy_map[chara[btl_char].Y][chara[btl_char].X] = 0;
                                                    targetY = chara[def_char].Y*SIZE+150-20;
                                                    targetX = (chara[def_char].X-1)*SIZE-SIZE-20;
                                        }
                                        else if (-1 < distanceArr[chara[def_char].Y][chara[def_char].X+1] &&//ターゲットの右のマスが移動範囲内かつ敵がいないとき
                                                distanceArr[chara[def_char].Y][chara[def_char].X+1] <= distance &&
                                                enemy_map[chara[def_char].Y][chara[def_char].X+1] == 0) {
                                                    console.log("def_charのdistanceArr右: " + distanceArr[chara[def_char].Y][chara[def_char].X+1] <= distance);//確認用
                                                    enemy_map[chara[btl_char].Y][chara[btl_char].X] = 0;
                                                    targetY = chara[def_char].Y*SIZE+150-20;
                                                    targetX = (chara[def_char].X+1)*SIZE-SIZE-20;
                                        }
                                        scene = 53;
                                        counter = 0;  
                                        break;
                                }

                            //敵ユニットの移動範囲外にターゲットがいるとき
                                //上下左右の１マスにメンバーユニットがいるか調べる
                                for(i=1; i<=MEMBER_MAX; i++) {
                                    if( chara[btl_char].X == chara[i].X   && chara[btl_char].Y == chara[i].Y+1 || //上
                                        chara[btl_char].X == chara[i].X-1 && chara[btl_char].Y == chara[i].Y   || //右
                                        chara[btl_char].X == chara[i].X   && chara[btl_char].Y == chara[i].Y-1 || //下
                                        chara[btl_char].X == chara[i].X+1 && chara[btl_char].Y == chara[i].Y  ) { //左
                                            scene = 43;
                                            console.log("scene43に入った");//確認用
                                            counter = 0;
                                            def_char = i;
                                            break;
                                    }
                                }
                                //上下左右にメンバーユニットがいなければ
                                console.log("distanceArr"+ chara[def_char].name + "の右: " + distanceArr[chara[def_char].Y][chara[def_char].X+1]);//確認用
                                console.log("distanceArr_save"+ chara[def_char].name + "の右: " + distanceArr_save[chara[def_char].Y][chara[def_char].X+1]);//確認用
                                i = 0;                       
                                distance_2  = new Array(12).fill(99);
                                var distanceArr_2 = new Array(9).fill([]).map(() => new Array(12).fill(99));//distanceArr_2の初期化
                                for(y=0; y<9; y++) {
                                    for(x=0; x<12; x++) {
                                        if(distanceArr_save[y][x] == chara[btl_char].move && enemy_map[y][x] == 0) {//敵ユニットの移動力の値のマスかつ、そこに敵ユニットがいないなら
                                            //console.log(distanceArr_save[0][7]  == chara[btl_char].move);
                                            console.log("distanceArr_save[y][x]と移動力の値が同じ");//確認用
                                            start = [y, x];//敵ユニットの移動力の値のマスを初期値とする
                                            console.log("移動力分だけ移動したマス y:" + y + " x:" + x);//確認用
                                            goal = [chara[def_char].Y, chara[def_char].X];
                                            distanceArr = new Array(9).fill([]).map(() => new Array(12).fill(-1));//distanceArrを初期化
                                            table_2 = distanceArr;                      
                                            distanceArr_2[y][x] = bfs(start, goal, table, table_2);//初期値（敵ユニットの移動力の値のマス）からターゲットまでの最短距離を計算する。計算結果を敵ユニットの移動力の値のマス全てに保存する
                                            console.log("distanceArr_2[" + y + "]" + "[" + x + "]: " + distanceArr_2[y][x]);//確認用
                                            //console.log("distanceArr_2[0][7]: " + distanceArr_2[0][7]);//確認用
                                            distanceArr = new Array(9).fill([]).map(() => new Array(12).fill(-1));//distanceArrを初期化
                                            table_2 = distanceArr;
                                            distance_2[i] = bfs(start, goal, table, table_2);//全ての「敵ユニットの移動力の値のマス」に保存した「ターゲットまでの最短距離」を昇順に並べるために保存。最小のマスに敵ユニットを移動させる。
                                            if(distance_2[i] < 0) distance_2[i] = 99;
                                            console.log("distance_2["+ i +"]" + distance_2[i]);  
                                            i++;                                                                         
                                        }
                                        else if(distanceArr_save[y][x] == chara[btl_char].move-1 && enemy_map[y][x] == 0) {//敵ユニットの移動力の値-1のマスかつ、そこに敵ユニットがいないなら(渋滞で移動力分のマスにいけないとき、移動力を-1する)
                                            //console.log(distanceArr_save[0][7]  == chara[btl_char].move);
                                            console.log("distanceArr_save[y][x]と移動力の値が同じ");//確認用
                                            start = [y, x];//敵ユニットの移動力の値のマスを初期値とする
                                            console.log("移動力分だけ移動したマス y:" + y + " x:" + x);//確認用
                                            goal = [chara[def_char].Y, chara[def_char].X];
                                            distanceArr = new Array(9).fill([]).map(() => new Array(12).fill(-1));//distanceArrを初期化
                                            table_2 = distanceArr;                      
                                            distanceArr_2[y][x] = bfs(start, goal, table, table_2);//初期値（敵ユニットの移動力の値のマス）からターゲットまでの最短距離を計算する。計算結果を敵ユニットの移動力の値のマス全てに保存する
                                            console.log("distanceArr_2[" + y + "]" + "[" + x + "]: " + distanceArr_2[y][x]);//確認用
                                            //console.log("distanceArr_2[0][7]: " + distanceArr_2[0][7]);//確認用
                                            distanceArr = new Array(9).fill([]).map(() => new Array(12).fill(-1));//distanceArrを初期化
                                            table_2 = distanceArr;
                                            distance_2[i] = bfs(start, goal, table, table_2);//全ての「敵ユニットの移動力の値のマス」に保存した「ターゲットまでの最短距離」を昇順に並べるために保存。最小のマスに敵ユニットを移動させる。
                                            if(distance_2[i] < 0) distance_2[i] = 99;
                                            console.log("distance_2["+ i +"]" + distance_2[i]);  
                                            i++;                                                       
                                        }
                                        else if(distanceArr_save[y][x] == chara[btl_char].move-2 && chara[btl_char].move > 1 && enemy_map[y][x] == 0) {//敵ユニットの移動力の値-2のマスかつ、そこに敵ユニットがいないなら(渋滞で移動力分のマスにいけないとき、移動力を-2する)
                                            //console.log(distanceArr_save[0][7]  == chara[btl_char].move);
                                            console.log("distanceArr_save[y][x]と移動力の値が同じ");//確認用
                                            start = [y, x];//敵ユニットの移動力の値のマスを初期値とする
                                            console.log("移動力分だけ移動したマス y:" + y + " x:" + x);//確認用
                                            goal = [chara[def_char].Y, chara[def_char].X];
                                            distanceArr = new Array(9).fill([]).map(() => new Array(12).fill(-1));//distanceArrを初期化
                                            table_2 = distanceArr;                      
                                            distanceArr_2[y][x] = bfs(start, goal, table, table_2);//初期値（敵ユニットの移動力の値のマス）からターゲットまでの最短距離を計算する。計算結果を敵ユニットの移動力の値のマス全てに保存する
                                            console.log("distanceArr_2[" + y + "]" + "[" + x + "]: " + distanceArr_2[y][x]);//確認用
                                            //console.log("distanceArr_2[0][7]: " + distanceArr_2[0][7]);//確認用
                                            distanceArr = new Array(9).fill([]).map(() => new Array(12).fill(-1));//distanceArrを初期化
                                            table_2 = distanceArr;
                                            distance_2[i] = bfs(start, goal, table, table_2);//全ての「敵ユニットの移動力の値のマス」に保存した「ターゲットまでの最短距離」を昇順に並べるために保存。最小のマスに敵ユニットを移動させる。
                                            if(distance_2[i] < 0) distance_2[i] = 99;
                                            console.log("distance_2["+ i +"]" + distance_2[i]);  
                                            i++;                                                  
                                        }
                                        else if(distanceArr_save[y][x] == chara[btl_char].move-3 && chara[btl_char].move > 2 && enemy_map[y][x] == 0) {//敵ユニットの移動力の値-3のマスかつ、そこに敵ユニットがいないなら
                                            //console.log(distanceArr_save[0][7]  == chara[btl_char].move);
                                            console.log("distanceArr_save[y][x]と移動力の値が同じ");//確認用
                                            start = [y, x];//敵ユニットの移動力の値のマスを初期値とする
                                            console.log("移動力分だけ移動したマス y:" + y + " x:" + x);//確認用
                                            goal = [chara[def_char].Y, chara[def_char].X];
                                            distanceArr = new Array(9).fill([]).map(() => new Array(12).fill(-1));//distanceArrを初期化
                                            table_2 = distanceArr;                      
                                            distanceArr_2[y][x] = bfs(start, goal, table, table_2);//初期値（敵ユニットの移動力の値のマス）からターゲットまでの最短距離を計算する。計算結果を敵ユニットの移動力の値のマス全てに保存する
                                            console.log("distanceArr_2[" + y + "]" + "[" + x + "]: " + distanceArr_2[y][x]);//確認用
                                            //console.log("distanceArr_2[0][7]: " + distanceArr_2[0][7]);//確認用
                                            distanceArr = new Array(9).fill([]).map(() => new Array(12).fill(-1));//distanceArrを初期化
                                            table_2 = distanceArr;
                                            distance_2[i] = bfs(start, goal, table, table_2);//全ての「敵ユニットの移動力の値のマス」に保存した「ターゲットまでの最短距離」を昇順に並べるために保存。最小のマスに敵ユニットを移動させる。
                                            if(distance_2[i] < 0) distance_2[i] = 99;
                                            console.log("distance_2["+ i +"]" + distance_2[i]);  
                                            i++;                                                   
                                        }
                                    }
                                }
                                for(i=0; i<11; i++) {//distance_2を小さい順に並べ替える
                                    for(j=0; j<12-i; j++) {
                                        if(distance_2[j]>distance_2[j+1]) {//小さな値を左に移動
                                            n = distance_2[j];
                                            distance_2[j] = distance_2[j+1];
                                            distance_2[j+1] = n;
                                            console.log("distance_2[]を昇順に並べ替えた");//確認用
                                            console.log("distance_2[0]" + distance_2[0]);
                                        }
                                    }
                                }
                                for(y=0; y<9; y++) {
                                    for(x=0; x<12; x++) {
                                        if(distanceArr_2[y][x] == distance_2[0]) {
                                            //console.log("distance_2[0]: " + distance_2[0]);//確認用
                                            //console.log("distanceArr_2[y][x]: " + distanceArr_2[y][x]);//確認用
                                            //console.log("y:" + y + " x:" + x);//確認用
                                            enemy_map[chara[btl_char].Y][chara[btl_char].X] = 0;
                                            targetX = x*SIZE-SIZE-20;
                                            targetY = y*SIZE+150-20;
                                            chara[btl_char].staX = chara[btl_char].X*SIZE-SIZE-20;
                                            chara[btl_char].staY = chara[btl_char].Y*SIZE+150-20;
                                            //log("targetX: " + targetX);//確認用
                                            //log("targetY: " + targetY);//確認用
                                            //log("chara[btl_char].staX: " + chara[btl_char].staX);//確認用
                                            //log("chara[btl_char].staY: " + chara[btl_char].staY);//確認用
                                                
                                        }
                                    }
                                }
                            }    
                    }
                    if( chara[btl_char].X == chara[def_char].X   && chara[btl_char].Y == chara[def_char].Y+1 || //上にターゲットがいるか
                        chara[btl_char].X == chara[def_char].X-1 && chara[btl_char].Y == chara[def_char].Y   || //右
                        chara[btl_char].X == chara[def_char].X   && chara[btl_char].Y == chara[def_char].Y-1 || //下
                        chara[btl_char].X == chara[def_char].X+1 && chara[btl_char].Y == chara[def_char].Y  ) { //左
                            
                                scene = 43;
                                console.log("scene43に入った");//確認用
                                counter = 0;
                            
                        } else {
                            scene = 53;
                            counter = 0;
                            log("scene53に入った");//確認用
                        }   
                    }
                }
                
            }
            else if(scene == 53) {//敵ユニットの移動
                //log("scene53の処理開始");//確認用
                //log("chara[btl_char].X: " + chara[btl_char].X);//確認用
                //log("chara[btl_char].staX: " + (chara[btl_char].staX));//確認用
                //log("chara[btl_char].staY: " + chara[btl_char].staY);//確認用
                chara[btl_char].staX += int((targetX-chara[btl_char].staX)/6);
                chara[btl_char].staY += int((targetY-chara[btl_char].staY)/6);
                //log("少し動いた");//確認用
                //log("chara[btl_char].staX: " + chara[btl_char].staX);//確認用
                //log("chara[btl_char].staY: " + chara[btl_char].staY);//確認用
                //log("int((targetX-chara[btl_char].staX)/6): " + int((targetX-chara[btl_char].staX)/6));//確認用
                if(int((targetX-chara[btl_char].staX)/6) == 0) {
                    chara[btl_char].staX = targetX;
                }
                if(int((targetY-chara[btl_char].staY)/6) == 0) {
                    chara[btl_char].staY = targetY;
                }
                //space = abs(getDis(targetX, targetY, chara[btl_char].X, chara[btl_char].Y));
                //log("space: " + space);//確認用
                //drawImgTS(EMY_MAX+3, 64*int(counter/4%7), (chara[btl_char].typ - EMY_TOP) * 64 - 64, 64, 64, chara[btl_char].staX, chara[btl_char].staY, SIZE+40, SIZE+40);
                //log(targetX != chara[btl_char].staX || targetY != chara[btl_char].staY);//確認用

                if( targetX == chara[btl_char].staX && targetY == chara[btl_char].staY) {
                    chara[btl_char].Y = (targetY-150+20)/SIZE;
                    chara[btl_char].X = (targetX+SIZE+20)/SIZE;
                    enemy_map[chara[btl_char].Y][chara[btl_char].X] = chara[btl_char].typ-1;
                    //console.log("chara["+ btl_char + "]がY" + chara[btl_char].Y +"," +"X" +  chara[btl_char].X + "へ動いた");//確認用
                        if( chara[btl_char].X == chara[def_char].X   && chara[btl_char].Y == chara[def_char].Y+1 || //上にターゲットがいるか。
                            chara[btl_char].X == chara[def_char].X-1 && chara[btl_char].Y == chara[def_char].Y   || //右
                            chara[btl_char].X == chara[def_char].X   && chara[btl_char].Y == chara[def_char].Y-1 || //下
                            chara[btl_char].X == chara[def_char].X+1 && chara[btl_char].Y == chara[def_char].Y  ) { //左
                            
                            scene = 43;
                            counter = 0;
                            //console.log("scene43に入った");//確認用                 
                        } else {
                            
                            scene = 52;
                            counter = 0;
                            //console.log("scene52に入った");//確認用
                            
                        }
                }    
            }
        break;

   
        



//↑↑↑【敵のAIプログラム】　終了　↑↑↑

        case 54://勝利
        case 55://敗北
        drawBG();
        drawEffect();
        if(scene == 54) {
            if(counter == 1) {
                stopBgm(16);
                playSE(20);
                monado_shield = 0;//モナドシールドの解除
                if(monado_spd == 1){//モナドスピードのバフがかかっていたら
                    monado_spd = 0; //モナドスピードのターンを減らす
                    for(i=1; i<=MEMBER_MAX; i++) {//モナドスピードバフの除去
                        chara[i].move -= monado_spd_move;//モナドスピードのバフを消す
                    } 
                }
            }  
            if(10 <= counter && counter <= 24) {
                drawImgTS(19, 800*int((counter-10)), 0, 800, 1000, 0, 0, 800, 1000);
            }
            if(25 <= counter) {
                drawImgTS(19, 800*14, 0, 800, 1000, 0, 0, 800, 1000);
                if(tapC == 1) {
                    tapC = 0;
                    if(flg[FLG_EVENT+80] == 1 || flg[FLG_EVENT+81] == 1 || flg[FLG_EVENT+82] == 1 || flg[FLG_EVENT+83] == 1) {//修練場をクリア
                        scene = 3;
                        counter = 0;
                        cut = 0;
                        break;
                    }
                    else {
                        for (let i = 0; i <= STAGE_MAX; i++) {//ストーリーのステージをクリア
                            if (flg[FLG_STAGE + i] == 0) {            
                                event = FLG_STAGE + i;//ステージクリア後のイベント
                                scene = 2;
                                counter = 0;
                                cut = 0;
                                if(event == FLG_STAGE + 7) {
                                    scene = 3;
                                    counter = 0;
                                    cut = 0;
                                    flg[FLG_STAGE + 7] = 1;//7章クリアのフラグ
                                    MEMBER_MAX = 4;
                                    break;
                                }
                                if(event == FLG_STAGE + 8) {
                                    scene = 3;
                                    counter = 0;
                                    cut = 0;
                                    flg[FLG_STAGE + 8] = 1;//8章クリアのフラグ
                                    break;
                                }
                                if(event == FLG_STAGE + 9) {
                                    scene = 3;
                                    counter = 0;
                                    cut = 0;
                                    flg[FLG_STAGE + 9] = 1;//9章クリアのフラグ
                                    break;
                                }
                                break;
                            }
                        }
                    }
                    
                }
            }
        }
        if(scene == 55) {
            if(counter == 1) {
                stopBgm(16);
            }
            if(10 <= counter && 25 <= counter) {
                setAlp((counter-10)*8);
                fRect(0, 0, 800, 1000, "#000");      
            }
            if(26 <= counter ) {
                fRect(0, 0, 800, 1000, "#000");
                setAlp((counter-26)*3);
                drawImg(20, 0, 0);
                if(tapC == 1) {
                    tapC = 0;
                    scene = 0;
                    counter = 0;
                    cut = 0;
                }  
            }
        }
    }   
}
//各種の変数
var scene      = 0;
var counter    = 0;
var cut        = 0;//sceneの中で使う
var event      = 0;
var cx         = 0;
var cy         = 0;
var n          = 0;
var m          = 0;
var j          = 0;
var p          =-1;


//戦闘用の変数、配列
var btl_char     = 0;//攻撃キャラ
var def_char     = 0;//攻撃されるキャラ
var c_atk        = 0;//反撃用
var atkrng3      = 0;//射程３の攻撃アイテムを使ったら1
var player_phase = 1;//１のときプレイヤーのターン
var enemy_turn   = 0;//敵フェイズで敵の行動を管理する
var order        = new Array(EMY_MAX).fill(0);//敵ユニットの行動順を決めるための配列
var start        = [0, 0];
var goal         = [0, 0];
var distance     = 0;//敵ユニットとターゲットユニットの最短距離
var search       = new Array(MEMBER_MAX).fill(99);//敵ユニットとターゲットユニットの最短距離を代入
var search_sort  = new Array(MEMBER_MAX).fill(99);//敵ユニットとターゲットユニットの最短距離を昇順で並べ替える配列
var search_dmg       = new Array(MEMBER_MAX).fill(-1);//敵ユニットがターゲットユニットに与えるダメージを代入
var search_dmg_sort  = new Array(MEMBER_MAX).fill(-1);//敵ユニットがターゲットユニットに与えるダメージを降順で並べ替える配列
var distance_2   = new Array(12).fill(99);// (distanceArr[y][x] == 敵ユニットの移動力）のマスとターゲットユニットの最短距離を代入
var targetX      = 0;
var targetY      = 0;
var phase_count  = 0;//ターン数
//var efct_counter = 0;//スキルエフェクト用

//フラグを管理する定数、配列
var FLG_MAX      = 500;
var FLG_EVENT    =   0;
var FLG_STAGE    = 100;
var flg = new Array(FLG_MAX);
var test = 0;//動作確認用



//保存が必要な変数
var gtime = 0;
var dif   = 0;//難易度　０NORMAL　１HARD

var MENU = [//メニューボタン
"HOME", "パーティ", "アイテム", null,
"HOME", null, null, null,
"HOME", null, null, null,
"HOME", null, null, null
];

//キャラクターの管理
var MEMBER_MAX = 4;//パーティメンバーの人数
var CHARACTER_MAX = 19;//キャラクターの総数（戦闘に参加する味方＋敵の数）
var EMY_TOP = 5;//敵の添え字の開始番号
var sel_member = 1;
var sel_enemy  = new Array(EMY_MAX).fill(0);
var unit_st = 1;
var heal_member = 1;//回復対象
var lvup = 1;//レベルアップの確認対象
var gexp = 0;//取得経験値
var pin  = new Array(3);//ピン判定の保存  
var chara = new Array(CHARACTER_MAX);
for(var i=1; i<=CHARACTER_MAX; i++) chara[i] = new characterClass();
var CHR_DATA = [//   Lv  lf srn dfn mov rng  lfmx_g srn_g  dfn_g  sklmx
       "エリオン",    1, 20, 12,  7,  2,  1,  90,    90,    85,     99,
       "ローズ",      1, 19, 10,  6,  2,  1,  80,    80,    70,     99, 
       "グリフィン",  15, 28, 27, 14,  3, 1,  60,    60,    70,     99,
       "イザベラ",    10, 23, 24,  6, 2,  1,  80,    90,    80,     2
];
var lv_ave = 0;//自軍ユニットの能力平均値。修練場の敵の能力に参照される。
var lf_ave = 0;
var srn_ave = 0;
var dfn_ave = 0;

//敵兵の定義
var EMY_MAX = 6;
var EMY = [//   　　  Lv  HP atk def mov rng typ skl
"疾風のフィル",        11, 37, 26,  8,  2,  2,  5, 99,
"ソシアルナイト",      2, 30, 22, 10,  3,  1,  6, 99,
"アクスファイター",    5, 26, 15,  1,  2,  1,  7, 99
];
var EMY_norT //修練場ノーマル
var EMY_harT //修練場ハード
var EMY_runT //修練場ルナティック
var EMY_infT //修練場インファナル
var EMY_1 = [//   　     Lv  HP atk def mov rng typ skl
"マーシナリー",           6, 23, 15,  2,  2,  1,  5, 99,
"強奪のゲルズ",          13, 41, 28, 9,  3,  2,  6, 99,
"アクスファイター",       6, 26, 17,  1,  2,  1,  7, 99,
"強化エリミネーター", 　　25, 50, 55, 0,  2,  1,  8, 99,
"ドラゴンナイト",        11, 27, 20, 3,  2,  1,  9, 99,
"???",                  20, 62, 30, 8,  2,  1, 10, 99,
"グレートナイト",        15,40, 30, 12,  3,  1,  11, 2,
"アサシン",              15,32, 26,  6,  2,  1,  12, 0
];
var EMY_2 = [//   　  Lv  HP atk def mov rng typ skl
"マーシナリー",        7, 27, 20, 4,  2,  1,  5,  99,
"ソシアルナイト",      7, 23, 15, 2,  3,  1,  6,  99,
"一撃のベイン",   　　 15, 51, 38, 4,  2,  2,  7,  99
];
var EMY_3 = [//   　  Lv  HP atk def mov rng typ skl
"マーシナリー",        8, 25, 17, 3,  2,  1,  5,  99,
"ソシアルナイト",      8, 23, 15, 2,  3,  1,  6,  99,
"アクスファイター",    8, 28, 20, 2,  2,  1,  7,  99,
"エリミネーター",      20, 40, 50, 0,  1,  1,  8, 99,
"急襲のズール",      　17, 56,34, 14,  2,  2,  9,  99
];
var EMY_4 = [//   　  Lv  HP atk def mov rng typ skl
"マーシナリー",        8, 25, 17, 3,  2,  1,  5,  99,
"ソシアルナイト",      8, 23, 15, 2,  3,  1,  6,  99,
"アクスファイター",    8, 28, 20, 2,  2,  1,  7,  99,
"エリミネーター",      20, 40, 50, 0,  1,  1,  8, 99,
"ドラゴンナイト",      9, 26, 19, 6,  2,  1,  9,  99
];
var EMY_5 = [//   　  Lv  HP atk def mov rng typ skl
"マーシナリー",        10, 27, 19, 4,  2,  1,  5, 99,
"ソシアルナイト",      10, 24, 17, 2,  3,  1,  6, 99,
"強靭のレオ",     　　21, 64, 43,　9, 2,  2,  　7, 99,
"エリミネーター",      25, 40, 50, 0,  1,  1,  8, 99,
"ドラゴンナイト",      10, 27, 20, 6,  2,  1,  9, 99
];
var EMY_6 = [//   　  　Lv  HP atk def mov rng typ skl
"マーシナリー",          11, 27, 19, 4,  2,  1,  5, 99,
"ソシアルナイト",        11, 24, 17, 2,  3,  1,  6, 99,
"アクスファイター",      11, 28, 20, 2,  2,  1,  7, 99,
"決戦エリミネーター", 　　30, 74, 55, 0,  2,  2,  8, 99,
"ドラゴンナイト",        11, 27, 20, 6,  2,  1,  9, 99,
"???",                  20, 62, 30, 8,  2,  1, 10, 99
];
var EMY_7 = [//   　  　Lv  HP atk def mov rng typ skl
"マーシナリー",          14, 29, 21, 5,  2,  1,  5, 99,
"ソシアルナイト",        14, 26, 19, 3,  3,  1,  6, 99,
"アクスファイター",      14, 31, 22, 3,  2,  1,  7, 99,
"強化エリミネーター", 　　25, 50, 55, 0,  2,  1,  8, 99,
"ドラゴンナイト",        14, 29, 22, 7,  2,  1,  9, 99,
"???",                  20, 62, 30, 8,  2,  1, 10, 99,
"鉄犬のダグラス",        40, 63, 60, 44,  3,  1,  11, 2,
"瞬殺のエリック",        40, 52, 64, 36,  2,  1,  12, 0
];
var EMY_8 = [//   　  　Lv  HP atk def mov rng typ skl
"マーシナリー",          16, 31, 22, 6,  2,  1,  5, 99,
"ソシアルナイト",        16, 28, 21, 5,  3,  1,  6, 99,
"アクスファイター",      16, 33, 25, 4,  2,  1,  7, 99,
"強化エリミネーター", 　　25, 50, 55, 0,  2,  1,  8, 99,
"ドラゴンナイト",        16, 32, 25, 8,  2,  1,  9, 99,
"???",                  20, 62, 30, 8,  2,  1, 10, 99,
"鎧騎将セルバード",      30, 70, 48, 18,  3,  2,  11, 2,
"アサシン",              30,37, 32, 12,  2,  1,  12, 0
];
var EMY_9 = [//   　  　    Lv  HP atk def mov rng typ skl
    "マーシナリー",          18, 32, 23, 6,  2,  1,  5, 99,
    "ソシアルナイト",        18, 29, 22, 5,  3,  1,  6, 99,
    "アクスファイター",      18, 34, 26, 4,  2,  1,  7, 99,
    "強化エリミネーター",    25, 50, 55, 0,  2,  1,  8, 99,
    "ドラゴンナイト",        18, 33, 26, 8,  2,  1,  9, 99,
    "???",                  20, 62, 30, 8,  2,  1, 10, 99,
    "グレートナイト",        30, 50, 40, 25,  3,  1,  11, 2,
    "アサシン",              30,37, 32, 12,  2,  1,  12, 0,
    "ニオル",               30, 75, 42, 18,  2,  2,  13, 1
    ];

var EMY_H = [//   　　Lv  HP atk def mov rng typ skl
"疾風のフィル",        11, 45, 29, 11,  2,  2,  5, 99,
"ソシアルナイト",      2, 30, 22, 10,  3,  1,  6, 99,
"アクスファイター",    5, 30, 19,  1,  2,  1,  7, 99
];
var EMY_H1 = [//   　Lv  HP atk def mov rng typ skl
"マーシナリー",        6, 27, 20, 4,  2,  1,  5, 99,
"強奪のゲルズ",       13, 49, 30, 12,  3,  2,  6, 99,
"アクスファイター",    6, 31, 24,  2,  2,  1,  7, 99
];
var EMY_H2 = [//   　Lv  HP atk def mov rng typ skl
"マーシナリー",        7, 27, 20, 4,  2,  1,  5, 99,
"ソシアルナイト",      7, 27, 18, 2,  3,  1,  6, 99,
"一撃のベイン",   　　 15, 58, 42, 7, 2,  2,  7, 99
];
var EMY_H3 = [//   　Lv  HP atk def mov rng typ skl
"マーシナリー",        8, 29, 22, 5,  2,  1,  5, 99,
"ソシアルナイト",      8, 27, 18, 2,  3,  1,  6, 99,
"アクスファイター",    8, 33, 26, 2,  2,  1,  7, 99,
"エリミネーター",      25, 40, 50, 0,  1,  1,  8, 99,
"急襲のズール",      　17, 65,38, 17,  2,  2,  9,  99
];
var EMY_H4 = [//   　  Lv  HP atk def mov rng typ skl
"マーシナリー",         9,  31, 22, 5,  2,  1,  5, 99,
"ソシアルナイト",       9,  29, 19, 3,  3,  1,  6, 99,
"アクスファイター",     8,  28, 20, 2,  2,  1,  7, 99,
"エリミネーター",       20,  45, 50, 0,  1,  1,  8,99,
"ドラゴンナイト",       9,  29, 24, 9,  2,  1,  9, 99
];
var EMY_H5 = [//   　  Lv  HP atk def mov rng typ skl
"マーシナリー",         10,  32, 25, 5,  2,  1,  5, 99,
"ソシアルナイト",       10,  30, 21, 3,  3,  1,  6, 99,
"強靭のレオ",     　　  21, 69, 47,　12, 2,  2,  7, 99,
"エリミネーター",       25,  45, 50, 0,  1,  1,  8, 99,
"ドラゴンナイト",       10,  30, 25, 9,  2,  1,  9, 99
];
var EMY_H6 = [//   　  　Lv  HP atk def mov rng typ skl
"マーシナリー",          11,  32, 25, 6,  2,  1,  5, 99,
"ソシアルナイト",        11,  30, 21, 4,  3,  1,  6, 99,
"アクスファイター",      11,  37, 29, 3,  2,  1,  7, 99,
"決戦エリミネーター", 　　25,  80, 60, 0,  2,  2,  8, 99,
"ドラゴンナイト",        11,  33, 25,　9,  2,  1,  9, 99,
"???",                  20,  72, 33, 9,  2,  1,  10, 99
];
var EMY_H7 = [//   　  　Lv  HP atk def mov rng typ skl
"マーシナリー",          14, 33, 26, 8,  2,  1,  5, 99,
"ソシアルナイト",        14, 31, 23, 5,  3,  1,  6, 99,
"アクスファイター",      14, 39, 31, 4,  2,  1,  7, 99,
"強化エリミネーター", 　　25, 58, 60, 0,  2,  1,  8, 99,
"ドラゴンナイト",        14, 35, 27,11,  2,  1,  9, 99,
"???",                  20, 62, 30, 8,  2,  1, 10, 99,
"鉄犬のダグラス",        40, 74, 64, 54,  3,  1,  11, 2,
"瞬殺のエリック",        40,　61, 73, 46,  2,  1,  12, 0
];
var EMY_H8 = [//   　  　    Lv  HP atk def mov rng typ skl
    "マーシナリー",          16, 33, 26, 8,  2,  1,  5, 99,
    "ソシアルナイト",        16, 31, 23, 5,  3,  1,  6, 99,
    "アクスファイター",      16, 39, 31, 4,  2,  1,  7, 99,
    "強化エリミネーター", 　　25, 58, 60, 0,  2,  1,  8, 99,
    "ドラゴンナイト",        16, 35, 28, 11,  2,  1,  9, 99,
    "???",                  20, 62, 30, 8,  2,  1, 10, 99,
    "鎧騎将セルバード",      30, 84, 53, 22,  3,  2,  11, 2,
    "アサシン",              30,43, 37, 15,  2,  1,  12, 0
    ];
var EMY_H9 = [//   　  　    Lv  HP atk def mov rng typ skl
    "マーシナリー",          18, 35, 27, 9,  2,  1,  5, 99,
    "ソシアルナイト",        18, 33, 24, 6,  3,  1,  6, 99,
    "アクスファイター",      18, 34, 26, 4,  2,  1,  7, 99,
    "強化エリミネーター", 　　25, 50, 55, 0,  2,  1,  8, 99,
    "ドラゴンナイト",        18, 38, 30, 12,  2,  1,  9, 99,
    "???",                  20, 62, 30, 8,  2,  1, 10, 99,
    "グレートナイト",        30, 58, 46, 29,  3,  1,  11, 2,
    "アサシン",              30,43, 38, 15,  2,  1,  12, 0,
    "ニオル",               30, 87, 48, 26,  2,  2,  13, 1
    ];

//アイテムの管理
var ITEM_MAX = 4;
var sel_item = 0;
var use_item = 0;//攻撃アイテムの使用判定。ダメージ計算に使う。
var gold     = 0;//お金
var item = new Array(ITEM_MAX);
var shop = [//ショップの商品、数字は売価
"傷薬", "HPを10回復", 100, 
"バーパ", "周囲1マスの味方ユニットのHPを回復する杖", 100,
"マギ", "1マス離れた敵のHPを吸収する闇魔法(威力7)", 600,
"ダイナフラーモ", "1マス離れた敵を攻撃する炎魔法(威力11)", 900,
"グローム", "2マス離れた敵を攻撃する雷魔法(威力7)", 800,
"騎士の弓", "飛行特攻。1マス離れた敵に弓を放つ。(威力7)", 600
];
var SHOP_MAX = 3;//４章クリア前のショップの品物の数
var SKILL_MAX = 7;
var skill_tuto = 0;
var SKILL_TUTO = [
    "【弱体無効】",
    90,
    "ステータス低下、スキルカウント変動を無効化　　　　",
    "",
    "",
    "【輝竜穿】",
    52,
    "常に攻撃+7。戦闘時、自分の攻撃✕2%の確率で発動。",
    "相手の攻撃の50%を与ダメージに加算し、与ダメージ ",
    "の50%、HPを回復する。                        ",
    "【血の祝福】",
    81,
    "自分と味方のHPを全回復し、自分以外を再行動させる。",
    "",
    "",
    "【大盾】",
    56,
    "発動時、受けるダメージを50％軽減する。　　　　　　",
    "",
    "",
    "【月光】",
    57,
    "発動時、相手の守備を無視して攻撃する。　　　　　　",
    "",
    "",
    "【闇のアルカナ】",
    89,
    "ターン開始時、スキルカウント-1。ターン開始時のスキ ",
    "ルカウントが０の場合、アルカナサイクロンを発動。　",
    "敵全体に通常攻撃と同じダメージを与える。"
]

//モナドの管理
var MONADO_MAX = 4;//レピテルアーツの数
var sel_monado = 0;//選択しているレピテルアーツ
var monado_count = 0;
var MND_COT_MAX = 0;//0のときレピテル発動可能。
var use_monado = 0;//レピテルを使用したら１
var monado_spd = 0;//レピテルスピードの効果が持続するターン数。0のときモナドの効果が消える。
var monado_spd_move = 8;//レピテルスピードで加算する移動力
var monado = [     //0-4,5-9,10-14 右の数字はモナドゲージ消費数
                "バスター",  "1マス離れた敵に、自分の攻撃を3倍にして攻撃。", 3,
                "シールド ",  "1ターンの間、自分と味方が受けるダメージを\n50%軽減する。                                        ", 2,
                "スピード ",  "1ターンの間、自分と味方の移動+8。\n自分を再行動させる。                     ", 2,
                "ブレイカー","選択した敵のHP-10、攻撃-10、守備-10、\nスキルカウント+3                                 ", 1
            ];

//エフェクトの管理
var EFCT_MAX = 10;//同時に描画される同エフェクトの数
var IMG_MAX = 150;//画像番号の最大数
var efctX = new Array(EFCT_MAX);
for(y=0; y<EFCT_MAX; y++) {
    efctX[y] = new Array(IMG_MAX);
}
var efctY = new Array(EFCT_MAX);
for(y=0; y<EFCT_MAX; y++) {
    efctY[y] = new Array(IMG_MAX);
}
var efctN = new Array(EFCT_MAX);
for(y=0; y<EFCT_MAX; y++) {
    efctN[y] = new Array(IMG_MAX);
}
var efctNum = new Array(IMG_MAX);
function initEffect() {
    for(y=0; y<EFCT_MAX; y++) {
        for(x=0; x<IMG_MAX; x++) {
            efctN[y][x] = 0;
        }
    } 
    for(var i=0; i<IMG_MAX; i++) efctNum[i] = 0;
}
function setEffect(x, y, n, m) {
    efctX[efctNum[m]][m] = x;
    efctY[efctNum[m]][m] = y;
    efctN[efctNum[m]][m] = n;
    efctNum[m] = (efctNum[m]+1)%EFCT_MAX;
}
function drawEffect() {
    for(y=0; y<EFCT_MAX; y++) {
        for(x=0; x<IMG_MAX; x++) {
            if(efctN[y][x] > 0) {
                if(x == 59) {//通常攻撃
                    drawImgTS(x, (8-efctN[y][x])*192%576, int((8-efctN[y][x])/4)*192, 192, 192, efctX[y][x]*SIZE-SIZE-85, efctY[y][x]*SIZE+SIZE-20, 250, 250);
                    efctN[y][x]--;
                }
                if(x == 51) {//エリオンスキル　輝竜穿
                    drawImgTS(x, (10-efctN[y][x])*800, int((10-efctN[y][x])/10)*1000, 800, 1000, efctX[y][x]*SIZE-460, efctY[y][x]*SIZE-340, 800, 1000);
                    if(efctN[y][x] == 9) playSE(13);
                    if(efctN[y][x] == 4) playSE(14);
                    efctN[y][x]--;   
                    // console.log("efctN[y][x]" + efctN[y][x]);
                    // console.log("efctX[y][x]" + efctX[y][x]);
                    // console.log("efctY[y][x]" + efctY[y][x]);
                }
                if(x == 60) {//モナドバスター
                    drawImgTS(x, (15-efctN[y][x])*192%768, int((15-efctN[y][x])/5)*192, 192, 192, efctX[y][x]*SIZE-SIZE-350, efctY[y][x]*SIZE+SIZE-500, 1000, 1000);
                    efctN[y][x]--;
                }
                if(x == 61) {//モナドスピード
                    drawImgTS(x, (20-efctN[y][x])*192%768, int((20-efctN[y][x])/5)*192, 192, 192, efctX[y][x]*SIZE-SIZE-185, efctY[y][x]*SIZE+SIZE-115, 450, 450);
                    if(efctN[y][x] == 18) playSE(21);
                    efctN[y][x]--;
                }
                if(x == 62) {//モナドブレイカー
                    drawImgTS(x, (15-efctN[y][x])*192%768, int((15-efctN[y][x])/5)*192, 192, 192, efctX[y][x]*SIZE-SIZE-380, efctY[y][x]*SIZE+SIZE-310, 800, 800);
                    efctN[y][x]--;
                }
                if(x == 63) {//回復
                    drawImgTS(x, (15-efctN[y][x])*192%768, int((15-efctN[y][x])/5)*192, 192, 192, efctX[y][x]*SIZE-SIZE-165, efctY[y][x]*SIZE+SIZE-90, 400, 400);
                    efctN[y][x]--;
                }
                if(x == 64) {//モナドシールド
                    drawImgTS(x, (20-efctN[y][x])*192%768, int((20-efctN[y][x])/5)*192, 192, 192, efctX[y][x]*SIZE-SIZE-180, efctY[y][x]*SIZE+SIZE-115, 450, 450);
                    if(efctN[y][x] == 18) playSE(23);
                    efctN[y][x]--;
                }
                if(x == 67) {//グリフィンスキル大盾
                    drawImgTS(x, (10-efctN[y][x])*192%768, int((10-efctN[y][x])/5)*192, 192, 192, efctX[y][x]*SIZE-SIZE-180, efctY[y][x]*SIZE+SIZE-115, 450, 450);
                    efctN[y][x]--;
                    console.log("グリフィンスキル発動！");
                }
                if(x == 68) {//イザベラのスキル月光
                    drawImgTS(x, (10-efctN[y][x])*192%768, int((10-efctN[y][x])/5)*192, 192, 192, efctX[y][x]*SIZE-SIZE-180, efctY[y][x]*SIZE+SIZE-115, 450, 450);
                    efctN[y][x]--;
                }
                if(x == 69) {//リザイア
                    drawImgTS(x, (20-efctN[y][x])*192%768, int((20-efctN[y][x])/5)*192, 192, 192, efctX[y][x]*SIZE-SIZE-260, efctY[y][x]*SIZE+SIZE-185, 600, 600);
                    efctN[y][x]--;
                }
                if(x == 70) {//エルファイアー
                    drawImgTS(x, (20-efctN[y][x])*192%768, int((20-efctN[y][x])/5)*192, 192, 192, efctX[y][x]*SIZE-SIZE-320, efctY[y][x]*SIZE+SIZE-370, 700, 700);
                    efctN[y][x]--;
                }
                if(x == 71) {//トロン
                    drawImgTS(x, (15-efctN[y][x])*192%768, int((15-efctN[y][x])/5)*192, 192, 192, efctX[y][x]*SIZE-SIZE-380, efctY[y][x]*SIZE+SIZE-500, 1200, 1200);
                    efctN[y][x]--;
                }
                if(x == 86) {//モナドサイクロン
                    drawImgTS(x, (20-efctN[y][x])*192%768, int((20-efctN[y][x])/5)*192, 192, 192, efctX[y][x]*SIZE-SIZE-185, efctY[y][x]*SIZE+SIZE-115, 450, 450);
                    efctN[y][x]--;
                }
                if(x == 87) {//バトルソウル
                    drawImgTS(x, (15-efctN[y][x])*192%768, int((15-efctN[y][x])/5)*192, 192, 192, efctX[y][x]*SIZE-SIZE-165, efctY[y][x]*SIZE+SIZE-90, 400, 400);
                    if(efctN[y][x] == 13) playSE(6);
                    efctN[y][x]--;
                }
                if(x == 88) {//エマーティノス
                drawImgTS(x, (20-efctN[y][x])*192%768, int((20-efctN[y][x])/5)*192, 192, 192, efctX[y][x]*SIZE-SIZE-215, efctY[y][x]*SIZE+SIZE-230, 500, 500);
                    if(efctN[y][x] == 18) playSE(21);
                    efctN[y][x]--;
                }
                
            } 
        }
    }



    // if (efctNum == 59) {//通常攻撃
    //     drawImgTS(efctNum, int(efct_counter/1)*192%576, int(efct_counter/4)*192, 192, 192, efctX*SIZE-SIZE-85, efctY*SIZE+SIZE-20, 250, 250);
    // }
    // if(efctNum == 51) {//輝竜穿
    //     drawImgTS(51, 800*int(efct_counter%10), int(efct_counter/10)*1000, 800, 1000, efctX*SIZE-460, efctY*SIZE-340, 800, 1000);
    //     if(efct_counter == 1) playSE(13);
    //     if(efct_counter == 4) playSE(14);
    // }
   
    // if (efctNum == 61) {//モナドスピード
    //     drawImgTS(efctNum, int(efct_counter/1)*192%768, int(efct_counter/5)*192, 192, 192, efctX*SIZE-SIZE-185, efctY*SIZE+SIZE-115, 450, 450);
    // }
    // if (efctNum == 62) {//モナドブレイカー
    //     drawImgTS(efctNum, int(efct_counter/1)*192%768, int(efct_counter/5)*192, 192, 192, efctX*SIZE-SIZE-200, efctY*SIZE+SIZE-120, 450, 450);
    // }
    // if (efctNum == 63) {//回復
    //     drawImgTS(efctNum, int(efct_counter/1)*192%768, int(efct_counter/5)*192, 192, 192, efctX*SIZE-SIZE-85, efctY*SIZE+SIZE-30, 250, 250);
    // }
    // if (efctNum == 64) {//モナドシールド
    //     drawImgTS(efctNum, int(efct_counter/1)*192%768, int(efct_counter/5)*192, 192, 192, efctX*SIZE-SIZE-180, efctY*SIZE+SIZE-115, 450, 450);
    // }
    // if (efctNum == 67) {//グリフィンのスキル大盾
    //     drawImgTS(efctNum, int(efct_counter/1)*192%768, int(efct_counter/5)*192, 192, 192, efctX*SIZE-SIZE-180, efctY*SIZE+SIZE-115, 450, 450);
    // }
    // if (efctNum == 68) {//イザベラのスキル月光
    //     drawImgTS(efctNum, int(efct_counter/1)*192%768, int(efct_counter/5)*192, 192, 192, efctX*SIZE-SIZE-180, efctY*SIZE+SIZE-115, 450, 450);
    // }
    
}

//マップの管理
var SIZE = 80;
var STAGE_MAX = 9;//ステージクリアフラグを立てるために使う
var stage = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,-1],
    [-1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];

var member_map = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var enemy_map = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var stage_1 = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,-1],
    [-1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];

var member_map_1 = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var enemy_map_1 = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


var stage_2 = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0,-1],
    [-1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];

var member_map_2 = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var enemy_map_2 = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0],
    [ 0, 0, 6, 0, 0, 0, 0, 0, 0, 4, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var stage_3 = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];

var member_map_3 = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var enemy_map_3 = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0],
    [ 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var stage_4 = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];

var member_map_4 = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var enemy_map_4 = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 8, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0],
    [ 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var stage_5 = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,-1],
    [-1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];

var member_map_5 = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 3, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var enemy_map_5 = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 8, 8, 0, 0, 0],
    [ 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 8, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var stage_6 = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,-1],
    [-1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,-1],
    [-1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,-1],
    [-1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,-1],
    [-1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];

var member_map_6 = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 4, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var enemy_map_6 = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 6, 7, 4, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 5, 0, 0, 0, 0, 0, 0, 4, 0, 0],
    [ 0, 0, 0, 8, 0, 7, 7, 0, 0, 0, 8, 0],
    [ 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 5, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var stage_7 = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0,-1],
    [-1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0,-1],
    [-1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];

var member_map_7 = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 2, 1, 3, 4, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var enemy_map_7 = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 8, 0, 0, 9, 7, 7, 0, 0, 0, 0],
    [ 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0],
    [ 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var stage_8 = [//7章
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0,-1],
    [-1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1,-1],
    [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,-1],
    [-1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];

var member_map_8 = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var enemy_map_8 = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 5, 0,11, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 8, 0, 0, 4, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0,10, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var stage_9 = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];

var member_map_9 = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var enemy_map_9 = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0,11, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0,11, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 0],
    [ 0, 0, 0, 0,10, 0, 0, 0, 6, 6, 6, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var stage_10 = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0,-1],
    [-1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];

var member_map_10 = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var enemy_map_10 = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0,12, 0, 8, 0, 0, 0, 0, 0, 5,10, 0],
    [ 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0],
    [ 0,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];




var distanceArr   = new Array(9).fill(new Array(12).fill(-1));
var distanceArr_2 = new Array(9).fill(new Array(12).fill(99));//（distanceArr[y][x] == 敵ユニットの移動力）のマスとターゲットユニットの最短距離を代入
var distanceArr_save = new Array(9).fill([]).map(() => new Array(12).fill(-1));//distanceArrの値を一時的に保存しておく


var bfs = (start, goal, table, table_2) => {//startの座標からgoalの座標までの、tableにおける最短距離（マス）を返す
    var dx           = [0, 0, 1,-1];
    var dy           = [1,-1, 0, 0];
    var distance = -1;

    //スタート地点からの距離を保存する配列
    table_2[start[0]][start[1]] = 0;//スタート地点の距離は０とする

     // 探索済みマスを管理する配列
    var visitedArr = deepCopy(new Array(table[0].length).fill(new Array(table.length).fill(false)));
    visitedArr[start[0]][start[1]] = true;

    var queue = [start];//探索対象
    while (queue.length > 0) {
        var q = dequeue(queue);//探索対象を取り出す。これが探索の基準点になる。
        var y = q[0];//┬探索の基準点
        var x = q[1];//┘

        //ゴールに到達
        if(enemy_map[y][x] == 0 || table_2[y][x] == 0) {//ゴールに敵ユニットがいないとき、または、ターゲットが隣接しているなら（自分も敵ユニットとしてみなされるためこの隣接処理をしないとそこはゴールにならない。）
            if (y == goal[0]-1 && x == goal[1]     ||
                y == goal[0]+1 && x == goal[1]     ||
                y == goal[0]   && x == goal[1]+1  ||
                y == goal[0]   && x == goal[1]-1   ) {//ここを変える。敵の周囲1マスが実質的なゴール//distance = distanceArr[x][y];//ゴール地点が基準点になったら探索終了 
                    console.log(chara[btl_char].name + " ch[" + btl_char + "]がゴールに到達しました");//確認用  
                    distance = table_2[y][x];//ゴール地点が基準点になったら探索終了  
                    console.log(chara[def_char].name + "の右: " + table_2[chara[def_char].Y][chara[def_char].X+1]);//┬　-1が出た場合はそのマスを探索せずに最短距離を出したということ。
                    console.log(chara[def_char].name + "の上: " + table_2[chara[def_char].Y-1][chara[def_char].X]);//┘
                    console.log("goalY: " + y);
                    console.log("goalX: " + x);
                    break;
            }
            
        }
       

    //上下左右を探索
    for(i=0; i<4; i++) {
        var ny = y + dy[i];
        var nx = x + dx[i];
        

        //テーブルの範囲内かつ道かつ未探索の場合
        if(chara[btl_char].typ == 9) {//飛行兵種の場合
            if((0 <= ny && ny < table.length) &&
            (0 <= nx && nx < table[0].length) &&
            //table[ny][nx] == "0" &&
            table[ny][nx] != "-1" &&
            member_map[ny][nx] == "0" &&
            //enemy_map[ny][nx] == " 0" &&
            !visitedArr[ny][nx]) {
                queue.push([ny, nx]);
                visitedArr[ny][nx] = true;
                table_2[ny][nx] = table_2[y][x] + 1//これが移動力と等しくなったら処理を終了するか？
            }
        }
        else if((0 <= ny && ny < table.length) &&//飛行兵種ではない場合
        (0 <= nx && nx < table[0].length) &&
        table[ny][nx] == "0" &&
        //table[ny][nx] != "-1" &&
        member_map[ny][nx] == "0" &&
        //enemy_map[ny][nx] == " 0" &&
        !visitedArr[ny][nx]) {
            queue.push([ny, nx]);
            visitedArr[ny][nx] = true;
            table_2[ny][nx] = table_2[y][x] + 1//これが移動力と等しくなったら処理を終了するか？
        }
    }
    }
    return distance;//最短距離を返す。ゴールに到達していなければ-1を返す。
 
}

var bfsZero = (start, goal, table, table_2) => {//distance=-1のときの、startの座標からgoalの座標（ターゲットユニットの外周２マス）までの、tableにおける最短距離（マス）を返す
    var dx           = [0, 0, 1,-1];
    var dy           = [1,-1, 0, 0];
    var distance = -1;

    //スタート地点からの距離を保存する配列
    table_2[start[0]][start[1]] = 0;//スタート地点の距離は０とする

     // 探索済みマスを管理する配列
    var visitedArr = deepCopy(new Array(table[0].length).fill(new Array(table.length).fill(false)));
    visitedArr[start[0]][start[1]] = true;

    var queue = [start];//探索対象
    while (queue.length > 0) {
        var q = dequeue(queue);//探索対象を取り出す。これが探索の基準点になる。
        var y = q[0];//┬探索の基準点
        var x = q[1];//┘

        //ゴールに到達
        if (y == goal[0]-2  && x == goal[1]   && enemy_map[y][x] == 0 ||
            y == goal[0]-1  && x == goal[1]+1 && enemy_map[y][x] == 0 ||
            y == goal[0]    && x == goal[1]+2 && enemy_map[y][x] == 0 ||
            y == goal[0]-1  && x == goal[1]+1 && enemy_map[y][x] == 0 ||
            y == goal[0]+2  && x == goal[1]   && enemy_map[y][x] == 0 ||  
            y == goal[0]+1  && x == goal[1]-1 && enemy_map[y][x] == 0 ||
            y == goal[0]    && x == goal[1]-2 && enemy_map[y][x] == 0 ||
            y == goal[0]-1  && x == goal[1]-1 && enemy_map[y][x] == 0   ) {//ここを変える。敵の周囲1マスが実質的なゴール//distance = distanceArr[x][y];//ゴール地点が基準点になったら探索終了 
                console.log(chara[btl_char].name + " ch[" + btl_char + "]がゴールに到達しました");//確認用  
                distance = table_2[y][x];//ゴール地点が基準点になったら探索終了  
                console.log(chara[def_char].name + "の2マス右distanceArr: " + table_2[chara[def_char].Y][chara[def_char].X+2]);//┬　-1が出た場合はそのマスを探索せずに最短距離を出したということ。
                console.log(chara[def_char].name + "の2マス上: " + table_2[chara[def_char].Y-2][chara[def_char].X]);
                console.log(chara[def_char].name + "の左上: " + table_2[chara[def_char].Y-1][chara[def_char].X-1]);
                console.log(chara[def_char].name + "の右下: " + table_2[chara[def_char].Y+1][chara[def_char].X+1]);//┘
                console.log("goalY: " + y);
                console.log("goalX: " + x);
            break;
        }

    //上下左右を探索
    for(i=0; i<4; i++) {
        var ny = y + dy[i];
        var nx = x + dx[i];
        

        //テーブルの範囲内かつ道かつ未探索の場合
        if(chara[btl_char].typ == 9) {//飛行兵種の場合
            if((0 <= ny && ny < table.length) &&
            (0 <= nx && nx < table[0].length) &&
            //table[ny][nx] == "0" &&
            table[ny][nx] != "-1" &&
            member_map[ny][nx] == "0" &&
            //enemy_map[ny][nx] == " 0" &&
            !visitedArr[ny][nx]) {
                queue.push([ny, nx]);
                visitedArr[ny][nx] = true;
                table_2[ny][nx] = table_2[y][x] + 1//これが移動力と等しくなったら処理を終了するか？
            }
        }
        else if((0 <= ny && ny < table.length) &&//飛行兵種ではない場合
            (0 <= nx && nx < table[0].length) &&
            table[ny][nx] == "0" &&
            //table[ny][nx] != "-1" &&
            member_map[ny][nx] == "0" &&
            //enemy_map[ny][nx] == " 0" &&
            !visitedArr[ny][nx]) {
                queue.push([ny, nx]);
                visitedArr[ny][nx] = true;
                table_2[ny][nx] = table_2[y][x] + 1//これが移動力と等しくなったら処理を終了するか？
            }
    }
    }
    return distance;//最短距離を返す。ゴールに到達していなければ-1を返す。
 
}


var dequeue = (queue) => {
    return queue.shift();
};

var deepCopy = (object) => {
    return JSON.parse(JSON.stringify(object));
};

function initVar() {//ゲーム用の変数に初期値を代入
    var i;
    for(i=0; i<ITEM_MAX; i++) item[i] = 1;
    for(i=0; i<FLG_MAX; i++) flg[i] = 0;
    clrMsg();
    chara[1].join(1);//┬パーティメンバーのパラメーターを代入
    chara[2].join(2);//│
    chara[3].join(3);//|
    chara[4].join(4);//」
    setITEM();
}

function cirBtn(x, y, r, txt) {//青い六角形のボタン
    var ret = false;//クリックされたかを返す
    var col = "navy";
    if(x-r<tapX && tapX<x+r && y-r<tapY && tapY<y+r) {
        drawImgTS(29, 0, 0, 300, 293, x-178, y-180, 355, 348);
        fText(txt, x, y-2, 30, "white");
        if(tapC > 0) {
            tapC = 0;
            drawImgTS(30, 0, 0, 300, 293, x-178, y-180, 355, 348);
            fText(txt, x, y-2, 30, "white");
            ret = true;
        }

    } else {
        drawImgTS(28, 0, 0, 300, 293, x-178, y-180, 355, 348);
        fText(txt, x, y-2, 30, "white");
    }  
    if(ret == true) {
        playSE(5);
    }
    return ret;
}

function ellipseBtn(x, y, txt) {//修練場の楕円のボタン
    var ret = false;//クリックされたかを返す
    var col = "navy";
    if(x+5<tapX && tapX<x+705 && y+5<tapY && tapY<y+95) {
        if(txt == "ノーマル") {
            drawImgTS(47, 0, 0, 750, 293, x, y, 750, 293);
            //fText(txt, x, y-2, 30, "white");
            if(tapC > 0) {
                tapC = 0;
                drawImgTS(48, 0, 0, 750, 293, x, y, 750, 293);
                //fText(txt, x, y-2, 30, "white");
                ret = true;
            }
        }
        if(txt == "ハード") {
            drawImgTS(75, 0, 0, 750, 293, x, y, 750, 293);
            //fText(txt, x, y-2, 30, "white");
            if(tapC > 0) {
                tapC = 0;
                drawImgTS(48, 0, 0, 750, 293, x, y, 750, 293);
                //fText(txt, x, y-2, 30, "white");
                ret = true;
            }
        }
        if(txt == "ルナティック") {
            drawImgTS(77, 0, 0, 750, 293, x, y, 750, 293);
            //fText(txt, x, y-2, 30, "white");
            if(tapC > 0) {
                tapC = 0;
                drawImgTS(48, 0, 0, 750, 293, x, y, 750, 293);
                //fText(txt, x, y-2, 30, "white");
                ret = true;
            }
        }
        if(txt == "インファナル") {
            drawImgTS(79, 0, 0, 750, 293, x, y, 750, 293);
            //fText(txt, x, y-2, 30, "white");
            if(tapC > 0) {
                tapC = 0;
                drawImgTS(48, 0, 0, 750, 293, x, y, 750, 293);
                //fText(txt, x, y-2, 30, "white");
                ret = true;
            }
        }
        if(txt == "戦場へ") {
            drawImgTS(54, 0, 0, 750, 293, x, y, 750, 293);
            //fText(txt, x, y-2, 30, "white");
            if(tapC > 0) {
                tapC = 0;
                drawImgTS(55, 0, 0, 750, 293, x, y, 750, 293);
                //fText(txt, x, y-2, 30, "white");
                ret = true;
            }
        }
        

    } else {
        if(txt == "ノーマル") {
            drawImgTS(46, 0, 0, 750, 293, x+26, y+28, 750, 293);
            //fText(txt, x, y-2, 30, "white");
        }
        if(txt == "ハード") {
            drawImgTS(74, 0, 0, 750, 293, x+26, y+28, 750, 293);
            //fText(txt, x, y-2, 30, "white");
        }
        if(txt == "ルナティック") {
            drawImgTS(76, 0, 0, 750, 293, x+26, y+28, 750, 293);
            //fText(txt, x, y-2, 30, "white");
        }
        if(txt == "インファナル") {
            drawImgTS(78, 0, 0, 750, 293, x+26, y+28, 750, 293);
            //fText(txt, x, y-2, 30, "white");
        }
        if(txt == "戦場へ") {
            drawImgTS(53, 0, 0, 750, 293, x+26, y+28, 750, 293);
            //fText(txt, x, y-2, 30, "white");
        }
    }  
    if(ret == true) {
        playSE(5);
    }
    return ret;
}

function hexaBtn(x, y, w, h, t, txt, col, col_tap, alp) {//六角形のボタン
    var ret = false;//クリックされたかを返す
    var xy = [//六角形の頂点を配列で定義
     x,     y-h/2-t,
     x+w/2, y-h/2,
     x+w/2, y+h/2,
     x,     y+h/2+t,
     x-w/2, y+h/2,
     x-w/2, y-h/2
    ];
    if(x-w/2<tapX && tapX<x+w/2 && y-h/2-t/2<tapY && tapY<y+h/2+t/2) {
        col = col_tap;
        if(tapC > 0) {
            tapC = 0;
            col = "white";
            ret = true;
        }
    }
    lineW(2);
    setAlp(alp);
    fPol(xy, col);
    setAlp(100);
    sPol(xy, "white");
    fTextN(txt, x, y, h/2, 30, "white");
    return ret;
}


function menuBtn() {//メニューボタン
    var btn = 0;
    var m = int(scene/10);
    for(var i=0; i<4; i++) {
        var x = 100+200*i;
        var y = 900;
        var r = 100;
        if(MENU[i+m*4] != null) {
            if(cirBtn(x, y, r, MENU[i+m*4])) btn = i+1;
        }
    }
    return btn;
}

function toHome() {//ホーム画面に戻る
    for(i=1; i<=MEMBER_MAX; i++) {
        chara[i].life = chara[i].lfmax;
    }
    scene = 1;
    counter = 0;
    cut = 0;
    
}

//メッセージ関連の処理
var MSG_MAX = 2;
var msg = new Array(MSG_MAX);

function clrMsg() {
    for(var i=0; i<MSG_MAX; i++) msg[i] = "";
}

function setMsg(ms) {
    for(var i=0; i<MSG_MAX; i++) {
        if(msg[i] == "") {//メッセージに空きがあるか判定する。無ければ、下のforの処理に移行する。
            msg[i] = ms;
            return;//msg[i]が空いていた場合、ここで処理を終了するという意味でのreturn（elseと同義）。下のforの処理は、メッセージが空いていた場合行わない。
        }
    }
    for(var i=0; i<MSG_MAX-1; i++) msg[i] = msg[i+1];
    msg[MSG_MAX-1] = ms;
}

function putMsg(x, y) {
    //drawFrame(x-370, y-100, 740, 120, "black", "white", 100);
    drawImg(33, 0, 0);//会話のウインドウ
    for(var i=0; i<MSG_MAX; i++) fText(msg[i], x, y-10+i*40, 28, "white");
}

function putUnit(i) {
    setAlp(100);
    drawImgTS(1+i, 0, 0, 160, 160, 410, 465, SIZE*4.2, SIZE*4.2);
    setAlp(100);
}

function putName(i) {
    //drawFrame(510, 760, 250, 50, "black", "white", 100);
    fText(i, 290, 830, 22, "white");
}

function drawFrame(x, y, w, h, col_1 ,col_2, alp) {//枠を描く
    lineW(2);
    setAlp(alp);
    fRect(x, y, w, h, col_1);
    setAlp(100);
    sRect(x, y, w, h, col_2);
}

function makeStage() {
    clrMsg();
    scene = 30;
    counter = 0;
    if(flg[FLG_STAGE+0] == 0) {//断章
        EMY_MAX = 2;
        MEMBER_MAX = 2;
        for (let i = 0; i < stage.length; i++) {
            for (let j = 0; j < stage[i].length; j++) {
                stage[i][j] = stage_1[i][j];
                member_map[i][j] = member_map_1[i][j];
                enemy_map[i][j] = enemy_map_1[i][j];
            }
        }
    }
    else if(flg[FLG_EVENT+80] == 1 || flg[FLG_EVENT+81] == 1 || flg[FLG_EVENT+82] == 1 || flg[FLG_EVENT+83] == 1) {//修練場

        for(y=0; y<9; y++) {//ステージデータ、メンバーデータ、エネミーデータのクリア
            for(x=0; x<12; x++) {
                stage[y][x] = 0;
                member_map[y][x] = 0;
                enemy_map[y][x] = 0;
            }
        }

        if(flg[FLG_STAGE+4] == 1) {//自軍ユニット数の決定
            MEMBER_MAX = 4;
            member_map[7][4] = 1;
            member_map[7][5] = 2;
            member_map[7][6] = 3;
            member_map[7][7] = 4;
        }
        else if (flg[FLG_STAGE+3] == 1) {
            MEMBER_MAX = 3;
            member_map[7][4] = 1;
            member_map[7][5] = 2;
            member_map[7][6] = 3;
        }
        else {
            MEMBER_MAX = 2;
            member_map[7][4] = 1;
            member_map[7][5] = 2;
        }

        lv_ave = 0;//自軍ユニットの平均能力値の初期化
        lf_ave = 0;
        srn_ave = 0;
        dfn_ave = 0;

        for(i=1; i<=MEMBER_MAX; i++) {//自軍ユニットの各能力値の合計
            lv_ave += chara[i].level;
            lf_ave += chara[i].lfmax;
            srn_ave += chara[i].stren;
            dfn_ave += chara[i].defen;
        } 
        
        lv_ave = int(lv_ave / MEMBER_MAX);//自軍ユニットの各能力値の平均
        lf_ave = int(lf_ave / MEMBER_MAX);
        srn_ave = int(srn_ave / MEMBER_MAX);
        dfn_ave = int(dfn_ave / MEMBER_MAX);

        EMY_norT = [//        Lv             HP                atk              def             mov rng typ　skl //修練場ノーマル。自軍ユニットの最新能力値を反映させるため、ここに敵データを書いた。
        "マーシナリー",      lv_ave+10, lf_ave+1+rnd(5) , srn_ave+1+rnd(4), dfn_ave-7+rnd(2) ,   2,  1,  5,   99,
        "ソシアルナイト",    lv_ave+10, lf_ave-2+rnd(5) , srn_ave-1+rnd(4), dfn_ave-9+rnd(2) ,   3,  1,  6,   99,
        "アクスファイター",  lv_ave+10, lf_ave+5+rnd(5) , srn_ave+4+rnd(4), dfn_ave-10+rnd(2) ,   2,  1,  7,   99,
        "エリミネーター",    lv_ave+10, lf_ave+13+rnd(5) ,srn_ave+18+rnd(4),dfn_ave-12+rnd(2) ,  1,  1,  8,   99,
        "ドラゴンナイト",    lv_ave+10, lf_ave+2+rnd(5) , srn_ave+2+rnd(4), dfn_ave-6+rnd(2) ,   2,  1,  9,   99 
        ];

        EMY_harT = [//       Lv             HP                atk              def              mov rng typ skl//修練場ハード。自軍ユニットの最新能力値を反映させるため、ここに敵データを書いた。
        "マーシナリー",      lv_ave+15, lf_ave+11+rnd(5) , srn_ave+6+rnd(4), dfn_ave-3+rnd(2) ,   2,  1,  5, 99,
        "ソシアルナイト",    lv_ave+15, lf_ave+5+rnd(5) , srn_ave+2+rnd(4), dfn_ave-6+rnd(2) ,    3,  1,  6, 99,
        "アクスファイター",  lv_ave+15, lf_ave+18+rnd(5) , srn_ave+12+rnd(4), dfn_ave-8+rnd(2) ,   2,  1,  7, 99,
        "エリミネーター",    lv_ave+15, lf_ave+29+rnd(5) ,srn_ave+33+rnd(4),dfn_ave-10+rnd(2) ,     1,  1,  8, 99,
        "ドラゴンナイト",    lv_ave+15, lf_ave+11+rnd(5) , srn_ave+10+rnd(4), dfn_ave-2+rnd(2) ,   2,  1,  9, 99,
        "???"          ,    lv_ave+20, lf_ave+30+rnd(5) , srn_ave+17+rnd(4), dfn_ave+0+rnd(2) ,   2,  1, 10, 99,
        "グレートナイト",    lv_ave+20, lf_ave+35+rnd(5) , srn_ave+17+rnd(4), dfn_ave+6+rnd(2) ,   3,  1, 11,  2,
        "アサシン",         lv_ave+20, lf_ave+17+rnd(5) , srn_ave+12+rnd(4), dfn_ave-3+rnd(2) ,   2,  1,  12,  0
        ];

        EMY_runT = [//           Lv             HP                atk              def              mov rng typ skl//修練場ハード。自軍ユニットの最新能力値を反映させるため、ここに敵データを書いた。
            "マーシナリー",      lv_ave+20, lf_ave+16+rnd(5) , srn_ave+11+rnd(4), dfn_ave-1+rnd(2) ,   2,  1,  5, 99,
            "ソシアルナイト",    lv_ave+20, lf_ave+7+rnd(5) , srn_ave+4+rnd(4), dfn_ave-4+rnd(2) ,    3,  1,  6, 99,
            "アクスファイター",  lv_ave+20, lf_ave+20+rnd(5) , srn_ave+14+rnd(4), dfn_ave-6+rnd(2) ,   2,  1,  7, 99,
            "決戦エリミネーター", lv_ave+20, lf_ave+32+rnd(5) ,srn_ave+35+rnd(4),dfn_ave-8+rnd(2) ,     2,  1,  8, 99,
            "ドラゴンナイト",    lv_ave+20, lf_ave+13+rnd(5) , srn_ave+12+rnd(4), dfn_ave+0+rnd(2) ,   2,  1,  9, 99,
            "???"          ,    lv_ave+20, lf_ave+37+rnd(5) , srn_ave+19+rnd(4), dfn_ave+2+rnd(2) ,   2,  1, 10, 99,
            "グレートナイト",    lv_ave+20, lf_ave+45+rnd(5) , srn_ave+19+rnd(4), dfn_ave+8+rnd(2) ,   3,  1, 11,  2,
            "アサシン",         lv_ave+20, lf_ave+20+rnd(5) , srn_ave+14+rnd(4), dfn_ave-1+rnd(2) ,   2,  1,  12,  0
            ];
        
        EMY_infT = [//          Lv  HP  atk  def  mov rng typ skl//修練場ハード。自軍ユニットの最新能力値を反映させるため、ここに敵データを書いた。
            "マーシナリー",      70, 70 , 41, 27 , 2,  1,  5, 99,
            "ソシアルナイト",    70, 64 , 38, 23 , 3,  1,  6, 99,
            "アクスファイター",  70, 82 , 53, 16 , 2,  1,  7, 99,
            "決戦エリミネーター", 80, 90 , 80, 11 , 2,  1,  8, 99,
            "ドラゴンナイト",    70, 78 , 49, 30 ,  2,  1,  9, 99,
            "???"          ,    80, 90 , 57, 34 ,  2,  1, 10, 99,
            "グレートナイト",    80, 99 , 57, 42,   3,  1, 11,  2,
            "アサシン",         80, 73 , 41, 27,   2,  1,  12,  0
            ];    

        //EMY_MAX = 2;
        //enemy_map[5][5] = 4;
        //enemy_map[5][6] = 4;

        for(y=0; y<9; y++) {//ステージの端を見えない壁で埋める
            stage[y][0]  = -1;
            stage[y][11] = -1;
        }   
        for(x=0; x<12; x++) {//ステージの端を見えない壁で埋める
            stage[0][x] = -1;
            stage[8][x] = -1;
        }

        x = 1;
        y = 4;
        n = 1;
        m = 0;
        EMY_MAX = 5+rnd(4);
        
        do {//ランダムに敵を配置
            for(i=0; i<n; i++) {
                if(member_map[y][x] == 0  && enemy_map[y][x] == 0 && m != EMY_MAX ) {
                    if(flg[FLG_EVENT+80] == 1) enemy_map[y][x] = 4+rnd(5);
                    else  enemy_map[y][x] = 4+rnd(8);
                    m++;     
                }
                x++;
            }
            y = 1+rnd(7);
            //n = rnd(3);
        }
        while(x < 11);
        console.log("EMY_MAX" + EMY_MAX);

        
        

        x = 1;
        y = 6;
        n = 1;
        do {//ランダムに壁を配置
            for(i=0; i<n; i++) {
                if(member_map[y][x] == 0  && enemy_map[y][x] == 0) {
                    stage[y][x] = 1;       
                }
                x++;
            }
            y = 1+rnd(7);
            //n = rnd(3);
        }
        while(x < 11);
    }
    else if(flg[FLG_STAGE+1] == 0) {//1章
        EMY_MAX = 5;
        MEMBER_MAX = 2;
        for (let i = 0; i < stage.length; i++) {
            for (let j = 0; j < stage[i].length; j++) {
                stage[i][j] = stage_2[i][j];
                member_map[i][j] = member_map_2[i][j];
                enemy_map[i][j] = enemy_map_2[i][j];
            }
        }
    }
    else if(flg[FLG_STAGE+2] == 0) {//2章
        EMY_MAX = 9;
        MEMBER_MAX = 2;
        for (let i = 0; i < stage.length; i++) {
            for (let j = 0; j < stage[i].length; j++) {
                stage[i][j] = stage_3[i][j];
                member_map[i][j] = member_map_3[i][j];
                enemy_map[i][j] = enemy_map_3[i][j];
            }
        }
    }
    else if(flg[FLG_STAGE+3] == 0) {//3章
        EMY_MAX = 9;
        MEMBER_MAX = 3;
        for (let i = 0; i < stage.length; i++) {
            for (let j = 0; j < stage[i].length; j++) {
                stage[i][j] = stage_4[i][j];
                member_map[i][j] = member_map_4[i][j];
                enemy_map[i][j] = enemy_map_4[i][j];
            }
        }
    }
    else if(flg[FLG_STAGE+4] == 0) {//4章
        EMY_MAX = 7;
        MEMBER_MAX = 4;
        for (let i = 0; i < stage.length; i++) {
            for (let j = 0; j < stage[i].length; j++) {
                stage[i][j] = stage_5[i][j];
                member_map[i][j] = member_map_5[i][j];
                enemy_map[i][j] = enemy_map_5[i][j];
            }
        }
    }
    else if(flg[FLG_STAGE+5] == 0) {//5章
        EMY_MAX = 12;
        MEMBER_MAX = 4;
        for (let i = 0; i < stage.length; i++) {
            for (let j = 0; j < stage[i].length; j++) {
                stage[i][j] = stage_6[i][j];
                member_map[i][j] = member_map_6[i][j];
                enemy_map[i][j] = enemy_map_6[i][j];
            }
        }
    }
    else if(flg[FLG_STAGE+6] == 0) {//6章
        EMY_MAX = 7;
        MEMBER_MAX = 4;
        for (let i = 0; i < stage.length; i++) {
            for (let j = 0; j < stage[i].length; j++) {
                stage[i][j] = stage_7[i][j];
                member_map[i][j] = member_map_7[i][j];
                enemy_map[i][j] = enemy_map_7[i][j];
            }
        }
    }
    else if(flg[FLG_STAGE+7] == 0) {//7章
        EMY_MAX = 6;
        MEMBER_MAX = 2;
        for (let i = 0; i < stage.length; i++) {
            for (let j = 0; j < stage[i].length; j++) {
                stage[i][j] = stage_8[i][j];
                member_map[i][j] = member_map_8[i][j];
                enemy_map[i][j] = enemy_map_8[i][j];
            }
        }
    }
    else if(flg[FLG_STAGE+8] == 0) {//8章
        EMY_MAX = 14;
        MEMBER_MAX = 4;
        for (let i = 0; i < stage.length; i++) {
            for (let j = 0; j < stage[i].length; j++) {
                stage[i][j] = stage_9[i][j];
                member_map[i][j] = member_map_9[i][j];
                enemy_map[i][j] = enemy_map_9[i][j];
            }
        }
    }
    else if(flg[FLG_STAGE+9] == 0) {//9章
        EMY_MAX = 10;
        MEMBER_MAX = 4;
        for (let i = 0; i < stage.length; i++) {
            for (let j = 0; j < stage[i].length; j++) {
                stage[i][j] = stage_10[i][j];
                member_map[i][j] = member_map_10[i][j];
                enemy_map[i][j] = enemy_map_10[i][j];
            }
        }
    }
}

function drawBG() {
    lineW(0.1);
    //fText("EMY_TOP+i " + (EMY_TOP+i), 100, 950, 30, "white");//確認用 
    for(y=1; y<8; y++) {
        for(x=0; x<12; x++) {
            var cx = x*SIZE-SIZE;
            var cy = y*SIZE+150;
            sRect(cx, cy, SIZE-2, SIZE-2, "black");//罫線の表示
            //fText(stage[y][x], x*SIZE-SIZE/2-30, y*SIZE+150+50 ,30, "white");//確認用
            
            //if(stage[y][x] > 4) {
                //chara[EMY_TOP+i].Y = y;
                //chara[EMY_TOP+i].X = x;
                //drawImgTS(stage[y][x], 0, 0, 100, 100, chara[EMY_TOP+i].X*SIZE-SIZE + chara[EMY_TOP+i].posX, chara[EMY_TOP+i].Y*SIZE+150 + chara[EMY_TOP+i].posY, SIZE, SIZE);
                //drawBar(cx+5, cy+70, 70, 10, chara[EMY_TOP+i].life, chara[EMY_TOP+i].lfmax);
                //stage[chara[EMY_TOP+i].Y][chara[EMY_TOP+i].X] = EMY_TOP + i;
                //fText(EMY_TOP+i, cx, cy, 20, "white");//確認用
                //fText("x:" + chara[EMY_TOP+i].X, cx+40, cy-20  , 20, "white");//確認用
                //fText("y:" + chara[EMY_TOP+i].Y, cx+40, cy+20, 20, "white");//確認用
                //i = i + 1; 
            }
        }
    
    
    //敵の座標とマスの値の更新
    var j = 0;
    for (i = 0; i < EMY_MAX; i++) {
        for (y = 0; y < 9; y++) {
            for (x = 0; x < 12; x++) {
                if (enemy_map[y][x] == EMY_TOP + i) {
                    if(chara[EMY_TOP+j] < EMY_MAX+4 && chara[EMY_TOP+j].life > 0) {
                        //console.log("j: " + j);//確認用       
                        chara[EMY_TOP + j].X = x;
                        chara[EMY_TOP + j].Y = y;
                       
                        enemy_map[chara[EMY_TOP + j].Y][chara[EMY_TOP + j].X] = EMY_TOP + j;
                        j++;
                        
                    }
                }
                //fText(enemy_map[y][x], x*SIZE-SIZE/2-30, y*SIZE+150+20 ,30, "cyan");//確認用
                //log("i: " + i);//確認用
                //log("j: " + j);//確認用
                //log("chara[" + (EMY_TOP + i) + "]のマップ上の位置: "  + enemy_map[chara[EMY_TOP + j].Y][chara[EMY_TOP + j].X]);//確認用
                //console.log("chara[EMY_TOP+j].Y: " + chara[EMY_TOP+j].Y);//確認用
                //console.log("chara[EMY_TOP+j].X: " + chara[EMY_TOP+j].X);//確認用
            }
        }
    }
    

    //修練場の壁の画像を配置
    if(flg[FLG_EVENT+80] == 1 || flg[FLG_EVENT+81] == 1 ||flg[FLG_EVENT+82] == 1 ||flg[FLG_EVENT+83] == 1 || (flg[FLG_STAGE+8] == 0 && flg[FLG_STAGE+7] == 1)) {
        for(y=0; y<9; y++) {
            for(x=0; x<12; x++) {
                if(stage[y][x] == 1) drawImgS(49, x*SIZE-90, y*SIZE+135, 100, 100);
            }
        }
    }

    // 敵の描画
    for (let k = EMY_TOP; k < EMY_TOP + EMY_MAX; k++) {
        if(chara[k].life > 0) {
            if(scene != 53) {
                chara[k].staX = chara[k].X*SIZE-SIZE-20;
                chara[k].staY = chara[k].Y*SIZE+150-20;
            }
            drawImgTS(9, 64*abs(int(counter/4%7)), (chara[k].typ - 4) * 64 - 64, 64, 64, chara[k].staX + chara[k].posX, chara[k].staY + chara[k].posY, SIZE+40, SIZE+40);   
            if(chara[k].atkrng == 2) drawImg(91, chara[k].staX + chara[k].posX - 5, chara[k].staY + chara[k].posY + 30);  
            drawBar(chara[k].staX+25, chara[k].staY+SIZE+10, 70, 10, chara[k].life, chara[k].lfmax, "#F00", "#800");
            if(chara[k].SKILL_COUNT_MAX != 99) {//奥義が開放されているユニットの奥義カウントの表示
                fText(chara[k].skill_count, chara[k].staX + chara[k].posX+30, chara[k].staY + chara[k].posY+32, 35, "#F6F");
            }
            //fText("ch:" + k, chara[k].X * SIZE - SIZE+10, chara[k].Y * SIZE + 150, 20, "white");//確認用
            //fText("x:" + chara[k].X, chara[k].X * SIZE - SIZE - 20, chara[k].Y * SIZE + 150 + 20, 20, "white");//確認用
            //fText("y:" + chara[k].Y, chara[k].X * SIZE - SIZE - 20, chara[k].Y * SIZE + 150 + 40, 20, "white");//確認用
        }
    }
    
    //味方の表示
    for(i=1; i<=MEMBER_MAX; i++) {
        for(y=0; y<9; y++) {
            for(x=0; x<12; x++) {
                if(member_map[y][x] == i && chara[i].life > 0) {
                    chara[i].X = x;
                    chara[i].Y = y; 
                    if(chara[i].turn == 1) {
                        drawImgTS(5, 64*abs(int(counter/4%7)), 64*i-64, 64, 64, chara[i].X*SIZE-SIZE-20 + chara[i].posX, chara[i].Y*SIZE+150-20 + chara[i].posY, SIZE+40, SIZE+40);
                    } else if(player_phase == 1) {//行動終了時にユニットを薄くする
                        setAlp(50);
                        //fRect(chara[i].X*SIZE-SIZE, chara[i].Y*SIZE+150, SIZE, SIZE, "#000");
                        drawImgTS(5, 0, 64*i-64, 64, 64, chara[i].X*SIZE-SIZE-20 + chara[i].posX, chara[i].Y*SIZE+150-20 + chara[i].posY, SIZE+40, SIZE+40);
                        setAlp(100);
                    } else {//敵フェイズで色を元に戻す
                        drawImgTS(5, 64*abs(int(counter/4%7)), 64*i-64, 64, 64, chara[i].X*SIZE-SIZE-20 + chara[i].posX, chara[i].Y*SIZE+150-20 + chara[i].posY, SIZE+40, SIZE+40);
                    }
                    drawBar(chara[i].X*SIZE-SIZE+5, chara[i].Y*SIZE+220, 70, 10, chara[i].life, chara[i].lfmax, "#0F0", "#080");
                    if(chara[i].SKILL_COUNT_MAX != 99) {//奥義が開放されているユニットの奥義カウントの表示
                        fText(chara[i].skill_count, chara[i].X*SIZE-70 + chara[i].posX, chara[i].Y*SIZE+160 + chara[i].posY, 35, "#F6F");
                    }
                    fText(monado_count, chara[1].X*SIZE-70 + chara[1].posX, chara[1].Y*SIZE+200 + chara[1].posY, 35, "#F80");
                    
                    member_map[chara[i].Y][chara[i].X] = i;//初期位置のマスを記録
                    //fText("ch:" + (i), chara[i].X*SIZE-SIZE-20,  chara[i].Y*SIZE+150, 20, "white");//確認用
                    //fText("x:" + chara[i].X, chara[i].X*SIZE-SIZE-20, chara[i].Y*SIZE+150+20, 20, "white");//確認用
                    //fText("y:" + chara[i].Y, chara[i].X*SIZE-SIZE-20, chara[i].Y*SIZE+150+40, 20, "white");//確認用
                   
                }
                //fText(member_map[y][x], x*SIZE-SIZE/2-30, y*SIZE+150+50 ,30, "white");//確認用
            }
        }
    }
    if(flg[FLG_STAGE+7] == 1 && flg[FLG_STAGE+8] == 0 ) fText("TURN "+phase_count, 80, 250, 30, "white");
    
    
}
    
function selMember() {
    var x = int(tapX/SIZE)+1;
    var y = int(tapY/SIZE)-2;
    if(0<=x && x<12 && 0<=y && y<9) {
        var n = member_map[y][x];
        //fText("選択キャラ: "+n, 600, 100, 30, "white");//確認用
        //fText("動作キャラ: "+sel_member, 600, 350, 30, "white");//確認用
        //fText("tapX: "+tapX, 600, 150, 30, "white");//確認用
        //fText("tapY: "+tapY, 600, 200, 30, "white");//確認用
        //fText("x: "+x, 600, 250, 30, "white");//確認用
        //fText("y: "+y, 600, 300, 30, "white");//確認用
        //fText("staX: "+ (x*SIZE-SIZE-20), 600, 350, 20, "white");//確認用
        //fText("staY: "+ (y*SIZE+150-20), 600, 400, 20, "white");//確認用 
        for(i=1; i<=MEMBER_MAX; i++) {
            if(tapC == 1 && member_map[y][x] == i && chara[i].turn == 1 && chara[i].life > 0) {
                tapC =0;
                playSE(3);
                for(i=1; i<=MEMBER_MAX; i++) {
                    if(chara[i].turn == 1) {//他のメンバーユニットが選択されたときに、行動終了していなければ初期位置に戻す
                        member_map[chara[i].Y][chara[i].X] = 0;
                        chara[i].X = chara[i].axisX;
                        chara[i].Y = chara[i].axisY;
                        member_map[chara[i].axisY][chara[i].axisX] = i;
                        
                    }
                }
                sel_member = n;               
            }
        }
           
    }
    for(y=0; y<9; y++) {//味方ユニットの移動範囲、選択カーソルを表示
        for(x=0; x<12; x++) {
            if(chara[sel_member].life > 0 && chara[sel_member].turn == 1)  {
                setAlp(40);
                if(sel_member == 4) {//自軍飛行ユニットの場合（ローズ）移動範囲　青
                    if(chara[sel_member].moveRange[y][x] > 1 && member_map[y][x] == 0)  {
                        fRect(x*SIZE-SIZE, y*SIZE+150, SIZE, SIZE, "blue");//移動範囲を表示  
                    }
                } 
                else if(chara[sel_member].moveRange[y][x] > 1 && stage[y][x] == 0 && member_map[y][x] == 0)  {
                    fRect(x*SIZE-SIZE, y*SIZE+150, SIZE, SIZE, "blue");//移動範囲を表示
                    
                }
                if(sel_member == 4) {//自軍飛行ユニットの場合（ローズ）移動範囲　赤
                    if(chara[sel_member].moveRange[y][x] == 1 && member_map[y][x] == 0)  {
                        fRect(x*SIZE-SIZE, y*SIZE+150, SIZE, SIZE, "red");//移動範囲を表示
                        //fText(stage[y][x], x*SIZE-SIZE/2, y*SIZE+150+50 ,30, "white");//確認用 
                    }
                }
                else if(chara[sel_member].moveRange[y][x] == 1 && stage[y][x] == 0 && member_map[y][x] == 0)  {
                    fRect(x*SIZE-SIZE, y*SIZE+150, SIZE, SIZE, "red");//移動範囲を表示
                    //fText(stage[y][x], x*SIZE-SIZE/2, y*SIZE+150+50 ,30, "white");//確認用 
                }      
                setAlp(100);
            }
            
            //fText(chara[sel_member].moveRange[y][x], x*SIZE-SIZE/2, y*SIZE+150+50 ,30, "white");//確認用 
        }
    } 
}

function selEnemy() {
    var x = int(tapX/SIZE)+1;
    var y = int(tapY/SIZE)-2;
    if(0<=x && x<12 && 0<=y && y<9) {
        //var n = enemy_map[y][x];
        var n = 0;
        for(i=EMY_TOP; i<EMY_MAX+EMY_TOP; i++) {
            if(chara[i].X == x && chara[i].Y == y && chara[i].life > 0) {
                n = i;               
                if(tapC == 1 && sel_enemy[n-EMY_TOP] == n) {
                    tapC = 0;
                    playSE(4);
                    sel_enemy[n-EMY_TOP] = 0;               
                } else if (tapC == 1) {
                    tapC = 0;
                    playSE(4);
                    sel_enemy[n-EMY_TOP] = n;
                }
            }
        }
        //fText("選択キャラ: "+n, 600, 100, 30, "white");//確認用
        //fText("動作キャラ: "+sel_member, 600, 350, 30, "white");//確認用
        //fText("tapX: "+tapX, 600, 150, 30, "white");//確認用
        //fText("tapY: "+tapY, 600, 200, 30, "white");//確認用
        //fText("x: "+x, 600, 250, 30, "white");//確認用
        //fText("y: "+y, 600, 300, 30, "white");//確認用
        //for(i=EMY_TOP; i<EMY_MAX+EMY_TOP; i++) {
          //  if(tapC == 1 && enemy_map[y][x] == i && chara[i].life > 0) {
            //    tapC =0;
              //  sel_enemy = n;               
           // }
        //}     
    }
    for(i=0; i<EMY_MAX; i++){
        for(y=0; y<9; y++) {//敵ユニットの攻撃範囲、選択カーソルを表示
            for(x=0; x<12; x++) {
                if(sel_enemy[i] > 0){
                    if(chara[sel_enemy[i]].life > 0 )  {
                        //log("selEnemy: " + sel_enemy);
                        setAlp(20);
                        if(chara[sel_enemy[i]].moveRange[y][x] >-2 && stage[y][x] == 0 && enemy_map[y][x] == 0)  {
                            fRect(x*SIZE-SIZE, y*SIZE+150, SIZE, SIZE, "#F09");//攻撃範囲を表示
                            setAlp(100);
                            lineW(5);
                            sRect(x*SIZE-SIZE, y*SIZE+150, SIZE, SIZE, "#F00");//攻撃範囲を表示
                            lineW(2);
                            //fText(stage[y][x], x*SIZE-SIZE/2, y*SIZE+150+50 ,30, "white");//確認用                  
                        } 
                        setAlp(100);     
                        setAlp(10);
                        fRect(chara[sel_enemy[i]].X*SIZE-SIZE, chara[sel_enemy[i]].Y*SIZE+150, SIZE, SIZE, "#FA0");//移動範囲を表示している敵ユニットを薄い赤で塗る
                        setAlp(100);
                        //fText(chara[sel_enemy[i]].moveRange[y][x], x*SIZE-SIZE/2-20, y*SIZE+150+50 ,30, "white");//確認用  
                    }
                }
                //lineW(3);
                //setAlp(80);
                //sRect(chara[sel_member].X*SIZE-SIZE-9+(counter/5%5), chara[sel_member].Y*SIZE+150-10+(counter/5%5), SIZE+20-(counter/2%12.5), SIZE+20-(counter/2%12.5), "#0FF");//カーソルの枠を表示
                //sRect(chara[sel_member].X*SIZE-SIZE-7+(counter/5%5), chara[sel_member].Y*SIZE+150-8+(counter/5%5), SIZE+16-(counter/2%12.5), SIZE+16-(counter/2%12.5), "#099");//カーソルの内側枠を表示
                //fTri( chara[sel_member].X*SIZE-SIZE*0.75, chara[sel_member].Y*SIZE+SIZE*1.4+(counter/2%12.5) ,  chara[sel_member].X*SIZE-SIZE*0.5, chara[sel_member].Y*SIZE+SIZE*1.7+(counter/2%12.5),  chara[sel_member].X*SIZE-SIZE*0.25, chara[sel_member].Y*SIZE+SIZE*1.4+(counter/2%12.5), "#EEE");
                //fTri( chara[sel_member].X*SIZE-SIZE*0.7, chara[sel_member].Y*SIZE+SIZE*1.4+2+(counter/2%12.5) ,  chara[sel_member].X*SIZE-SIZE*0.5, chara[sel_member].Y*SIZE+SIZE*1.6+2+(counter/2%12.5),  chara[sel_member].X*SIZE-SIZE*0.3, chara[sel_member].Y*SIZE+SIZE*1.4+2+(counter/2%12.5), "#FFF");
                //lineW(2);
                //setAlp(100); 
            }
        }
    } 
}



function drawStatus () {
    var x = int(tapX/SIZE)+1;
    var y = int(tapY/SIZE)-2;
    if(0<=x && x<12 && 1<=y && y<8) {
        lineW(3);
        sRect(x*SIZE-SIZE, y*SIZE+150, SIZE, SIZE, "cyan");//マウスポインタのマスに正方形の細いカーソルを表示
        lineW(2);
        for(i=1; i<=CHARACTER_MAX; i++) {
            if(chara[i].X == x && chara[i].Y == y && chara[i].life > 0) {
                unit_st = i;               
            }
        }
    }
    if(unit_st > 0 && unit_st <=CHARACTER_MAX && chara[unit_st].life > 0) {
        if(unit_st <= MEMBER_MAX) {//メンバーユニットの画像を表示
            drawImgTS(22, 800*0, 0, 800, 1000, 0, 0, 800, 1000);
            if(unit_st == 1 && flg[FLG_EVENT+60] == 1) {//エリオンのスキルアイコン
                drawImg(80, 615, 80);
                fText(monado_count, 685, 104, 30, "#F80");
                drawImg(52, 615, 135);
                fText(chara[1].skill_count, 685, 156, 30, "#F6F");
            }
            if(unit_st == 2 && flg[FLG_EVENT+61] == 1){//ローズのスキルアイコン
                drawImg(81, 615, 80);
                fText(chara[2].skill_count, 685, 104, 30, "#F6F");
            }
            if(unit_st == 3 && flg[FLG_EVENT+62] == 1) {//グリフィンのスキルアイコン      
                    drawImg(56, 615, 80);
                    fText(chara[3].skill_count, 685, 104, 30, "#F6F");
            }
            if(unit_st == 4) {//イザベラ
                drawImgTS(45, 0, 0, 160, 160, 10, 20, SIZE*3-30, SIZE*3-30);
                drawImg(41, 620, 75);//飛行兵種の飛行マーク
                fText("飛行", 690, 105, 25, "white");//飛行
                if(flg[FLG_EVENT+63] == 1) {
                    drawImg(57, 615, 130);
                    fText(chara[4].skill_count, 685, 154, 30, "#F6F");
                }
            } else {
                drawImgTS(1+unit_st, 0, 0, 160, 160, 0, 0, SIZE*3-10, SIZE*3-10);
            }
            //ユニットのステータス
            if((unit_st != 3 || unit_st != 4) && flg[FLG_STAGE+6] != 1 && flg[FLG_STAGE+7] != 0  && flg[FLG_EVENT+80] != 1 && flg[FLG_EVENT+81] != 1 && flg[FLG_EVENT+82] != 1 && flg[FLG_EVENT+83] != 1)
            fText(chara[unit_st].name, 414, 50 , 25, "white");
            fText("Lv.", 580, 30 , 25, "white");
            fText(chara[unit_st].level, 583, 55 , 30, "white");
            fText("HP", 300, 109, 30, "white");
            fText(chara[unit_st].life, 400, 108, 45, "white");
            fText("/ "+ chara[unit_st].lfmax, 485, 108, 30, "white");
            fText("攻撃", 300, 170, 30, "white");
            fText(chara[unit_st].stren, 380, 170, 30, "white");
            fText("守備", 460, 170, 30, "white");
            fText(chara[unit_st].defen, 540, 170, 30, "white");
            drawImg(40, 620, 35);//移動力画像
            fText(chara[unit_st].move, 685, 55, 30, "white");//移動力
            if(chara[unit_st].typ == 9 ) { 
                drawImg(41, 620, 75);//飛行兵種の飛行マーク
                fText("飛行", 690, 105, 25, "white");//飛行
            }
            
            
        }
        if(unit_st >= EMY_TOP) {//敵ユニットの画像
            drawImgTS(22, 800*1, 0, 800, 1000, 0, 0, 800, 1000);
            if(chara[unit_st].typ == 8) {
                drawImgTS(38, 0, 0, 160, 160, 0, 0, SIZE*3-10, SIZE*3-10);
            } else if (chara[unit_st].typ == 9) {
                drawImgTS(39, 0, 0, 160, 160, 0, 0, SIZE*3-10, SIZE*3-10);
            } else if (chara[unit_st].typ == 10) {
                drawImgTS(31, 0, 0, 160, 160, 0, 0, SIZE*3-10, SIZE*3-10);
            } else if (chara[unit_st].typ == 11) {
                drawImgTS(72, 0, 0, 160, 160, 0, 0, SIZE*3-10, SIZE*3-10);
                drawImg(57, 615, 80);
                fText(chara[unit_st].skill_count, 685, 104, 30, "#F6F");
            } else if (chara[unit_st].typ == 12) {
                drawImgTS(73, 0, 0, 160, 160, 0, 0, SIZE*3-10, SIZE*3-10);
                drawImg(57, 615, 80);
                fText(chara[unit_st].skill_count, 685, 104, 30, "#F6F");
            } else if (chara[unit_st].typ == 13) {
                drawImgTS(84, 0, 0, 160, 160, 0, 0, SIZE*3-10, SIZE*3-10);
                drawImg(89, 615, 80);//ダークモナド
                fText(chara[unit_st].skill_count, 685, 104, 30, "#F6F");
            }else {
                drawImgTS(chara[unit_st].typ+1, 0, 0, 160, 160, 0, 0, SIZE*3-10, SIZE*3-10);
            }
            if(chara[unit_st].atkrng == 2) {
                if(chara[unit_st].SKILL_COUNT_MAX != 99 || chara[unit_st].typ == 9) {
                    drawImg(90, 615, 135);//弱体無効
                }
                else drawImg(90, 615, 80);//弱体無効
            } 
        }
        //ユニットのステータス
        fText(chara[unit_st].name, 414, 50 , 25, "white");
        fText("Lv.", 580, 30 , 25, "white");
        fText(chara[unit_st].level, 583, 55 , 30, "white");
        fText("HP", 300, 109, 30, "white");
        fText(chara[unit_st].life, 400, 108, 45, "white");
        fText("/ "+ chara[unit_st].lfmax, 485, 108, 30, "white");
        fText("攻撃", 300, 170, 30, "white");
        fText(chara[unit_st].stren, 380, 170, 30, "white");
        fText("守備", 460, 170, 30, "white");
        fText(chara[unit_st].defen, 540, 170, 30, "white");
        drawImg(40, 620, 35);//移動力画像
        fText(chara[unit_st].move, 685, 55, 30, "white");//移動力
        if(chara[unit_st].typ == 9 ) { 
            drawImg(41, 620, 75);//飛行兵種の飛行マーク
            fText("飛行", 690, 105, 25, "white");//飛行
        }
        
    }
}

function drawBtlResult (i, n) {
    //setAlp(80);
    //fRect(0, 0, 800, 230, "#026");
    //setAlp(100); 

    //回復計算
    if(i <= MEMBER_MAX && n <= MEMBER_MAX) {
        var m = chara[n].life + chara[i].ITEM[sel_item*3+2]
        if(m > chara[n].lfmax) m = chara[n].lfmax;
        //画像表示
        drawImg(26, 0, 0);
        if(i == 4 ) drawImgTS(45, 0, 0, 160, 160, 10, 20, SIZE*3-30, SIZE*3-30);//イザベラの画像を表示
        else drawImgTS(1+i, 0, 0, 160, 160, 0, 0, SIZE*3-10, SIZE*3-10); 
        if(n == 4) drawImgTS(45,0, 0, 160, 160, SIZE*7+10, 20, SIZE*3-30, SIZE*3-30);//イザベラの画像を表示
        else drawImgTS(1+n, 0, 0, 160, 160, SIZE*7, 0, SIZE*3-10, SIZE*3-10);
        drawImg(25, 0, 0);
        fText("HP", 400, 100, 30, "white");
        //杖ユニットの結果 
            fText(chara[i].name, 250, 30 , 30, "white"); 
            fText(chara[i].life , 210, 98, 45, "white");
            fText("→" , 270, 98, 30, "white");
            fText(chara[i].life , 330, 98, 45, "white"); 
            fText(chara[i].ITEM[sel_item*3], 400, 160, 30, "white");
        //被回復ユニットの結果
            fText(chara[n].name, 550, 30 , 30, "white");
            fText(chara[n].life , 470, 98, 45, "white");
            fText("→" , 530, 98, 30, "white");
            fText(m, 590, 98, 45, "white"); 

    } else { 
        //ダメージ計算
        if(i == 1 && flg[FLG_EVENT+60] == 1 && chara[i].skill_count == 0 && use_monado == 0) chara[n].dmg = (chara[i].stren + int(chara[i].stren / 2))  - chara[n].defen;//エリオンのスキル
        else if(i == 4 && chara[i].skill_count == 0 && use_item == 0) chara[n].dmg = chara[i].stren;//アイテム未使用かつ、イザベラのスキル発動
        else if(i == 4 && chara[i].skill_count == 0 && use_item == 1) {//アイテムを使ったかつ、イザベラのスキル発動
            chara[n].dmg = chara[i].ITEM[sel_item*3+2];
        } else if(use_item == 1) {//攻撃アイテムをメンバーユニットが使った場合
            chara[n].dmg = chara[i].ITEM[sel_item*3+2] - chara[n].defen;
            console.log(chara[i].ITEM[sel_item*3+2]);
            if(i == 3 && flg[FLG_EVENT+62] == 1 &&　 chara[3].ITEM[sel_item*3] == "騎士の弓"　&& chara[n].typ == 9) {//弓特攻
                chara[n].dmg = chara[i].ITEM[sel_item*3+2] + 14 - chara[n].defen;               
            }
        } else if(use_monado == 1 && sel_monado == 0) {//モナドバスター
            chara[n].dmg = chara[i].stren*3 - chara[n].defen;//敵が受けるダメージ
        } else if(use_monado == 1 && sel_monado == 3) {//モナドブレイカー
            chara[n].dmg = 10;//敵が受けるダメージ
        } else {
            chara[n].dmg = chara[i].stren - chara[n].defen;//敵が受けるダメージ
        }
        
        chara[i].dmg = chara[n].stren - chara[i].defen;//味方が受けるダメージ
        if((chara[n].typ == 11 || chara[n].typ == 12) && chara[n].skill_count <= 1 )  {//グレートナイト、アサシンの月光
            chara[i].dmg = chara[n].stren;
        }
        if(i == 3 && flg[FLG_EVENT+62] == 1 && chara[i].skill_count != 2) chara[i].dmg = int(chara[i].dmg / 2);//グリフィンの大盾
        if(monado_shield == 1) chara[i].dmg = int(chara[i].dmg / 2);//モナドシールド
        
        
        
        if(c_atk == 1) chara[i].dmg = "-";//見切り反撃の場合
        if(chara[n].dmg < 0) chara[n].dmg = 0;
        if(chara[i].dmg < 0) chara[i].dmg = 0;
        var m = chara[i].life - chara[i].dmg;

        if(i == 1 && flg[FLG_EVENT+60] == 1 && chara[i].skill_count == 0) {//エリオンのスキルを考慮する場合の、エリオンの戦闘終了後のHP。
            if(chara[i].lfmax > chara[i].dmg) {//エリオンが反撃で倒されない時
               m = chara[i].life;
                if(chara[n].life < chara[n].dmg) {//エリオンの攻撃がオーバーダメージのとき
                   m += int(chara[n].life / 2);
                    if(m > chara[i].lfmax) m = chara[i].lfmax;
                    m -= chara[i].dmg;
                }
                else {//オーバーダメージではないとき
                   m += int(chara[n].dmg / 2);
                    if(m > chara[i].lfmax) m = chara[i].lfmax;
                    m -= chara[i].dmg;
                }
            }    
        }
        

        if(m < 0) m = 0;
        if(c_atk == 1) m = chara[i].life;//見切り反撃の場合

        if(i == 2 && chara[i].ITEM[sel_item*3] == "マギ") {
            m = chara[i].life;
            if(chara[n].life < chara[n].dmg) {//攻撃がオーバーダメージのとき
                m += int(chara[n].life);
            }
            else {//オーバーダメージではないとき
               m += int(chara[n].dmg);
            }
            if(m > chara[i].lfmax) m = chara[i].lfmax;
        }

        var j = chara[n].life - chara[n].dmg;
        if(j < 0) j = 0;
        //画像表示
        drawImg(24, 0, 0);
        if(i == 4 ) drawImgTS(45, 0, 0, 160, 160, 10, 20, SIZE*3-30, SIZE*3-30);//イザベラの画像を表示
        else drawImgTS(1+i, 0, 0, 160, 160, 0, 0, SIZE*3-10, SIZE*3-10);
        if (chara[n].typ == 8) {//エリミネーターの場合（エリミネーターは画像が連番ではない）
            drawImgTS(38, 0, 0, 160, 160, SIZE*7, 0, SIZE*3-10, SIZE*3-10);
        } else if (chara[n].typ == 9) {//ドラゴンナイト
            drawImgTS(39, 0, 0, 160, 160, SIZE*7, 0, SIZE*3-10, SIZE*3-10);
        } else if (chara[n].typ == 10) {//ボス（フード）
            drawImgTS(31, 0, 0, 160, 160, SIZE*7, 0, SIZE*3-10, SIZE*3-10);
        } else if (chara[n].typ == 11) {
            drawImgTS(72, 0, 0, 160, 160, SIZE*7, 0, SIZE*3-10, SIZE*3-10);
        } else if (chara[n].typ == 12) {
            drawImgTS(73, 0, 0, 160, 160, SIZE*7, 0, SIZE*3-10, SIZE*3-10);
        }else if (chara[n].typ == 13) {
            drawImgTS(84, 0, 0, 160, 160, SIZE*7, 0, SIZE*3-10, SIZE*3-10);
        }
        else {
            drawImgTS(chara[n].typ+1, 0, 0, 160, 160, SIZE*7, 0, SIZE*3-10, SIZE*3-10);
        }
        drawImg(23, 0, 0);
        fText("HP", 397, 98, 30, "white");
        fText("攻撃", 400, 158, 30, "white");
        //メンバーユニットの結果 
            fText(chara[i].name, 250, 30 , 30, "white"); 
            fText(chara[i].life , 210, 98, 45, "white");
            fText("→" , 270, 98, 30, "white");
            if(m == 0) { fText(m , 330, 98, 45, "red"); } else { fText(m , 330, 98, 45, "white"); }
            fText(chara[n].dmg, 270, 158, 30, "white");
        //敵ユニットの結果
            fText(chara[n].name, 550, 30 , 30, "white");
            fText(chara[n].life , 470, 98, 45, "white");
            fText("→" , 530, 98, 30, "white");
            if(j == 0) { fText(j, 590, 98, 45, "red");} else { fText(j, 590, 98, 45, "white"); } 
            fText(chara[i].dmg, 530, 158, 30, "white");
    }
    
    
}


function calMoveRange(i, y, x, m) {
    // log("i" + i);
    // log("y" + y);
    // log("x" + x);
    // log("m" + m);
    // log("ch4Y: " + chara[i].Y);
    // log("ch4X: " + chara[i].X);
    if (m == 0) return;

    if (i <= MEMBER_MAX) {//味方の移動範囲を計算
        if(i == 4) {//自軍飛行ユニットの移動計算
            if (chara[i].moveRange[y - 1][x] < m && stage[y - 1][x] != -1 && enemy_map[y - 1][x] == 0) calMoveRange(i, y - 1, x, m - 1);
            if (chara[i].moveRange[y][x + 1] < m && stage[y][x + 1] != -1 && enemy_map[y][x + 1] == 0) calMoveRange(i, y, x + 1, m - 1);
            if (chara[i].moveRange[y][x - 1] < m && stage[y][x - 1] != -1 && enemy_map[y][x - 1] == 0) calMoveRange(i, y, x - 1, m - 1);
            if (chara[i].moveRange[y + 1][x] < m && stage[y + 1][x] != -1 && enemy_map[y + 1][x] == 0) calMoveRange(i, y + 1, x, m - 1);
        } else  {
            if (chara[i].moveRange[y - 1][x] < m && stage[y - 1][x] == 0 && enemy_map[y - 1][x] == 0) calMoveRange(i, y - 1, x, m - 1);
            if (chara[i].moveRange[y][x + 1] < m && stage[y][x + 1] == 0 && enemy_map[y][x + 1] == 0) calMoveRange(i, y, x + 1, m - 1);
            if (chara[i].moveRange[y][x - 1] < m && stage[y][x - 1] == 0 && enemy_map[y][x - 1] == 0) calMoveRange(i, y, x - 1, m - 1);
            if (chara[i].moveRange[y + 1][x] < m && stage[y + 1][x] == 0 && enemy_map[y + 1][x] == 0) calMoveRange(i, y + 1, x, m - 1);
        } 
        
    } else {//敵の移動範囲を表示するための計算   
        if (member_map[y][x] > 0) {// メンバーユニットの座標に到達した場合、進めないようにする(メンバーユニットに危険範囲が掛かるようにする。メンバーユニットを危険範囲が貫通しないようにする。)    
            calMoveRange(i, y - 1, x, 0); // メンバーユニットの座標に到達したら移動ポイントを0にして再帰呼び出しを行わない
        }  else {
            if (chara[i].moveRange[y - 1][x] < m && stage[y - 1][x] == 0 ) calMoveRange(i, y - 1, x, m - 1);
            if (chara[i].moveRange[y][x + 1] < m && stage[y][x + 1] == 0 ) calMoveRange(i, y, x + 1, m - 1);
            if (chara[i].moveRange[y][x - 1] < m && stage[y][x - 1] == 0 ) calMoveRange(i, y, x - 1, m - 1);
            if (chara[i].moveRange[y + 1][x] < m && stage[y + 1][x] == 0 ) calMoveRange(i, y + 1, x, m - 1);
            //
             //
             //
             //
        }
    }

    chara[i].moveRange[y][x] = m; 
}
   


function moveUnit(i) {//マウスポインタの位置に移動先をユニットの画像で表示し、クリックすると移動する
    var x = int(tapX/SIZE)+1;
    var y = int(tapY/SIZE)-2;
    if(0<=x && x<12 && 0<=y && y<9) {
        if(i == 4) {//自軍飛行ユニットの場合
            if(stage[y][x] != -1 &&
                member_map[y][x] == 0  &&
                enemy_map[y][x] == 0 &&
                chara[i].moveRange[y][x] > 1) {
                setAlp(50);
                fRect(x*SIZE-SIZE, y*SIZE+150, SIZE, SIZE, "#000");
                drawImgTS(5, 64*abs(int(counter/4%7)), 64*i-64, 64, 64, x*SIZE-SIZE-20, y*SIZE+150-20, SIZE+40, SIZE+40);
                setAlp(100);
                    if(tapC == 1) {
                        tapC = 0;
                        chara[i].movetime = 15;//2点間の距離の絶対値にすると、移動距離に応じて足音の時間が変わる
                        member_map[chara[i].Y][chara[i].X] = 0;
                        
                        chara[i].X = x;
                        chara[i].Y = y;
                        member_map[chara[i].Y][chara[i].X] = i;
                    }
            } 
        }
        else {//自軍飛行ユニットではない場合
            if(stage[y][x] == 0 &&
                member_map[y][x] == 0  &&
                enemy_map[y][x] == 0 &&
                chara[i].moveRange[y][x] > 1) {
                setAlp(50);
                fRect(x*SIZE-SIZE, y*SIZE+150, SIZE, SIZE, "#000");
                drawImgTS(5, 64*abs(int(counter/4%7)), 64*i-64, 64, 64, x*SIZE-SIZE-20, y*SIZE+150-20, SIZE+40, SIZE+40);
                setAlp(100);
                    if(tapC == 1) {
                        tapC = 0;
                        chara[i].movetime = 15;//2点間の距離の絶対値にすると、移動距離に応じて足音の時間が変わる
                        member_map[chara[i].Y][chara[i].X] = 0;
                        
                        chara[i].X = x;
                        chara[i].Y = y;
                        member_map[chara[i].Y][chara[i].X] = i;
                    }
            }
        }
    }
} 

function initBtl() {//戦場の準備
    var j = 0;
    for(y=0; y<9; y++) {
        for(x=0; x<12; x++) {
            if(enemy_map[y][x] > 0) {
                //console.log("enemy_map[y][x]: " + enemy_map[y][x]);
                if(dif == 0 || flg[FLG_EVENT+80] == 1) { chara[EMY_TOP+j].setEnemy(enemy_map[y][x]); }//敵ユニットのステータスを代入
                else { chara[EMY_TOP+j].setEnemyHard(enemy_map[y][x]); }
                j++;
            }
        }
    }  
    c_atk = 0;//これが１の状態でステージをクリアすると、次回の初回攻撃でc_atkが0になり反撃見切りになるので、０で初期化。
    atkrng3 = 0;//射程３アイテムによるバグ防止
    unit_st = 1;//開始時点のステータス表示
    phase_count = 0;
    cut = 0;
    for(i=0; i<EMY_MAX; i++) sel_enemy[i] = 0;//敵の攻撃範囲表示をクリア
    for(i=1; i<=MEMBER_MAX; i++) chara[i].turn = 1;//勝利条件、敗北条件表示のときに味方をアニメーションさせる
    for(i=1; i<=MEMBER_MAX; i++) chara[i].skill_count = chara[i].SKILL_COUNT_MAX;//奥義カウントの初期化
    monado_count = MND_COT_MAX;
    monado_shield = 0;//モナドシールドの解除
    if(monado_spd == 1){//モナドスピードのバフがかかっていたら
        monado_spd = 0; //モナドスピードのターンを減らす
        for(i=1; i<=MEMBER_MAX; i++) {//モナドスピードバフの除去
            chara[i].move -= monado_spd_move;//モナドスピードのバフを消す
        } 
    }
    initEffect();
    
}

function drawBar(x, y, w, h, val, vmax, col_1, col_2) {//バーを描く
    var bw = int(w*val/vmax);
    if(val>0 && bw==0) bw = 1;
    fRect(x, y, w, h, "black");
    fRect(x, y, bw, h, col_1);
    fRect(x, y+h/2, bw, h/2, col_2);
    sRect(x-1, y-1, w+1, h+1, "white");
}

function enemyOrder() {//敵の行動順を決める
    var i, j, n;
    for(i=0; i<EMY_MAX; i++) {
        order[i] = 0;
        if(chara[EMY_TOP+i].life > 0) order[i] = chara[EMY_TOP+i].typ*100+i;
    }
    for(i=0; i<EMY_MAX-1; i++) {//敵のtyp（兵種）順に並べ替える。同じtypだった場合は、出現した順に並べ替える。
        for(j=0; j<EMY_MAX-i; j++) {
            if(order[j]>order[j+1]) {//小さな値を左に移動。typが小さいほど早く行動し、typが同じ場合は先に出現した敵が早く行動する
                n = order[j];
                order[j] = order[j+1];
                order[j+1] = n;
            }
        }
    }
    for(i=0; i<EMY_MAX; i++) {
        console.log("order["+ i +"] : " + order[i]);//確認用
    }
    enemy_turn = -1;
}

function btlEffect(typ, x, y, siz, tim) {
    var i, r, w;
    if(typ == 0) {//攻撃エフェクト
        r = int((1+(15-tim)*12)*siz);
        w = int(30*siz);
        setAlp(tim*6);
        lineW(w);     sCir(x, y, r, "red");
        lineW(w*0.8); sCir(x, y, r, "gold");
        lineW(w*0.6); sCir(x, y, r, "white");
    }
    if(typ == 1) {
        r = int(100*siz);
        setAlp(tim*4);
        for(i=0; i<5; i++) fCir(x, y, r-r*i/10, "#0F0");
    }
    setAlp(100);
    lineW(2);
}

function setITEM() {
    chara[1].ITEM = [
        "傷薬", "HPを10回復", 10,
        "バトルソウル", "最大HPの50%を消費してアルカナカウント-1", 1,
        "スキル説明書", "スキルの効果を見ることができる。", 0
    ];
    chara[1].item = [3, "∞", 1];
    chara[2].ITEM[0] = "傷薬";
    chara[2].ITEM[1] = "HPを10回復";
    chara[2].ITEM[2] = 10;
    chara[2].ITEM[3] = "バーパ";
    chara[2].ITEM[4] = "周囲1マスの味方ユニットのHPを回復する杖";
    chara[2].ITEM[5] = int(chara[2].stren*2);
    chara[2].ITEM[6] =  "マギ";
    chara[2].ITEM[7] =  "1マス離れた敵のHPを吸収する闇魔法(威力7)";
    chara[2].ITEM[8] =  int(chara[2].stren+7);
    // chara[2].ITEM = [
    //     "傷薬",     "HPを10回復", 10,
    //     "バーパ",   "周囲1マスの味方ユニットのHPを回復する杖", int(chara[2].stren*2),
    //     "マギ", "1マス離れた敵のHPを吸収する闇魔法(威力7)", int(chara[2].stren+7)
    // ];
    chara[2].item[0] = 3;
    chara[2].item[1] = 10;
    chara[2].item[2] = 10;
    chara[3].ITEM[0] = "傷薬";
    chara[3].ITEM[1] = "HPを10回復";
    chara[3].ITEM[2] = 10;
    // chara[3].ITEM = [
    //     "傷薬", "HPを10回復", 10
    // ];
    chara[3].item[0] = 3
    chara[4].ITEM = [
        "傷薬",      "HPを10回復", 10,
        "バーパ",    "周囲1マスの味方ユニットのHPを回復する杖", int(chara[4].stren*2),
        "ダイナフラーモ",  "1マス離れた敵を攻撃する炎魔法(威力11)",   int(chara[4].stren+11),
        "グローム",  "2マス離れた敵を攻撃する雷魔法(威力7)",        int(chara[4].stren+7)
    ];
    chara[4].item = [3, 10, 10, 10];
    flg[FLG_EVENT+61] = loadLS(600+61);
    flg[FLG_EVENT+62] = loadLS(600+62);
    if(flg[FLG_EVENT+61] == 1) {
        chara[2].ITEM[9] = "エマーティノス";
        chara[2].ITEM[10] = "スキルカウント0のとき使用可。血の祝福を発動。";
        chara[2].ITEM[11] = chara[2].stren*3;
        chara[2].item[3] = "∞"; 
    }
    if(flg[FLG_EVENT+62] == 1) {
        chara[3].ITEM[3] = "騎士の弓";
        chara[3].ITEM[4] = "飛行特攻。1マス離れた敵に弓を放つ。(威力7)";
        chara[3].ITEM[5] = chara[3].stren+7;
        chara[3].item[1] = 10;
    }
}

function setITEM_RE() {//能力依存の効果値をもつアイテムの更新
    chara[2].ITEM[5] = int(chara[2].stren*2);//ローズのライブ
    chara[2].ITEM[8] = int(chara[2].stren+7);//リザイア
    if(flg[FLG_EVENT+61] == 1) {
        chara[2].ITEM[11] = chara[2].stren*3;//エマーティノス
    }
    if(flg[FLG_EVENT+62] == 1) {
        chara[3].ITEM[5] = chara[3].stren+7;//騎士の弓
    }
    chara[4].ITEM[5] = int(chara[4].stren*2);//イザベラのライブ
    chara[4].ITEM[8] = int(chara[4].stren+11);//エルファイアー
    chara[4].ITEM[11] = int(chara[4].stren+7);//トロン
}

function autoSave() {
    var i, p, k;
    saveLS(0, gtime);
    saveLS(1, gold);
    saveLS(2, MEMBER_MAX);
    saveLS(3, dif);
    for(i=0; i<FLG_MAX; i++) saveLS(600+i, flg[i]);
    for(i=1; i<=MEMBER_MAX; i++) {//エリオン　番号50~　ローズ　番号90~  グリフィン　番号130~
        p = 10+40*i;
        saveLS(p+0, chara[i].name);
        saveLS(p+1, chara[i].level);
        saveLS(p+2, chara[i].exp);
        saveLS(p+3, chara[i].lfmax);
        saveLS(p+4, chara[i].life);
        saveLS(p+5, chara[i].stren);
        saveLS(p+6, chara[i].defen);
        saveLS(p+7, chara[i].SKILL_COUNT_MAX);
        for(k=0; k<ITEM_MAX; k++) if(chara[i].item[k] != undefined) saveLS(200+k+p, chara[i].item[k]);//エリオンのアイテム　番号250~　ローズ　番号290~  グリフィン　番号330~
        for(k=0; k<ITEM_MAX*3; k++) {
            if(chara[i].ITEM[k] != undefined) {
                saveLS(400+k+p, chara[i].ITEM[k]);  
                console.log(chara[i].ITEM[k]);
            }//エリオンのアイテム　番号450~　ローズ　番号490~  グリフィン　番号530~
        }
    }
    
}

function autoLoad() {
    var i, p, k;
    if(loadLS(0) == null) return;//セーブデータがない
    gtime = loadLS(0);
    gold = loadLS(1);
    MEMBER_MAX = loadLS(2);
    dif = loadLS(3);
    for(i=0; i<FLG_MAX; i++) flg[i] = loadLS(600+i);//続きからやるとき、最初から持っていないアイテムをセットするため、initvarより先にフラグをロードする
    for(i=1; i<=MEMBER_MAX; i++) {
        p = 10+40*i;
        chara[i].name = loadLS(p+0);
        chara[i].level = loadLS(p+1);
        chara[i].exp = loadLS(p+2);
        chara[i].lfmax = loadLS(p+3);
        chara[i].life = loadLS(p+4);
        chara[i].stren = loadLS(p+5);
        chara[i].defen = loadLS(p+6);
        chara[i].SKILL_COUNT_MAX = loadLS(p+7);
        for(k=0; k<ITEM_MAX; k++) if(chara[i].item[k] != undefined) chara[i].item[k] = loadLS(200+k+p);
        for(k=0; k<ITEM_MAX*3; k++) {
            if(chara[i].ITEM[k] != undefined) {
                chara[i].ITEM[k] = loadLS(400+k+p);
                 console.log(chara[i].ITEM[k]);
            }
        }
    }  
    
}
