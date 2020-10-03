/*:
@target MZ
@plugindesc Skill replacement system v1.0.0
@author unagi ootoro
@url https://raw.githubusercontent.com/unagiootoro/RPGMZ/master/AbilitySystem.js

@help
It is a plug-in that introduces a system that allows you to change skills.

By introducing this plug-in, you can give each actor skills
You can introduce a system that allows you to select and equip some of them.
It is also possible to add cost to the skill.

【How to use】
・Give actors skills
You can give an actor a skill by executing the plug-in command "Add Ability Skill".

・Equip skills
By opening the skill equipment scene from the menu, you can equip the skill that the actor has.

・Set the maximum cost value for the actor
In the memo field of the actor
<MaxCost: Cost value>
You can set the maximum cost value for the actor by stating.
Set the cost value to an integer greater than or equal to 0.

・Set a cost value for the skill
In the skill memo field
<AbilityCost: Cost value>
You can set the cost value for the skill by writing.
Set the cost value to an integer greater than or equal to 0.

【License】
This plugin is available under the terms of the MIT license.


@param EnabledAbilitySystemSwitchId
@text Ability menu activation switch ID
@type switch
@default 0
@desc
Specify the switch ID that determines whether the menu ability management screen is valid or invalid.

@param MaxEquipAbilities
@text Maximum number of abilities that can be equipped
@type number
@default 4
@desc
Specifies the number of abilities that can be equipped.

@param EnableCost
@text Skill cost activation
@type boolean
@default true
@desc
Activate the cost of the skill.

@param EquipAbilitySe
@text Ability Equipment SE
@type struct <SE>
@desc
Specify the SE to play when the ability is equipped.

@param WindowSize
@text window size
@type struct <WindowSize>
@desc
Set the size of various windows.

@param Text
@text Display text
@type struct <Text>
@desc
Sets the text used in the game.


@command StartAbilityScene
@text Ability scene start
@desc
Start the ability scene.


@command AddAbilitySkill
@text Ability skill added
@desc
Add ability skills to actors.

@arg ActorId
@text Actor ID
@type actor
@desc
Specify the actor to which you want to add the ability skill.

@arg SkillId
@text Skill ID
@type skill
@desc
Specify the skill ID to add.


@command RemoveAbilitySkill
@text Ability skill removed
@desc
Removes the ability skills of the actor.

@arg ActorId
@text Actor ID
@type actor
@desc
Specifies the actor to remove the ability skill.

@arg SkillId
@text Skill ID
@type skill
@desc
Specify the skill ID to delete.


@command GetMaxCost
@text Get maximum cost
@desc
Gets the maximum cost of the specified actor and stores it in a variable.

@arg ActorId
@text Actor ID
@type actor
@desc
Specifies the actor to get the maximum cost.

@arg VariableId
@text variable ID
@type variable
@desc
Specify the variable ID that stores the maximum cost obtained.


@command SetMaxCost
@text Maximum cost setting
@desc
Sets the maximum cost for the specified actor.

@arg ActorId
@text Actor ID
@type actor
@desc
Specify the actor for which you want to set the maximum cost.

@arg VariableId
@text variable ID
@type variable
@desc
Specifies the variable ID that stores the value that sets the maximum cost.

@arg Value
@text Maximum cost value
@type number
@desc
Specifies the value that sets the maximum cost. If a variable ID is set, that will take precedence.
*/


/*~struct~SE:
@param FileName
@text SE filename
@type file
@dir audio / se
@ default Skill1
@desc
Specify the file name of the SE to play.

@param Volume
@text SE volume
@type number
@default 90
@desc
Specify the volume of SE to be played.

@param Pitch
@text SE pitch
@type number
@default 100
@desc
Specify the pitch of the SE to play.

@param Pan
@text SE phase
@type number
@default 0
@desc
Specify the pan of the SE to play.
*/


/*~struct~WindowSize:
@param StatusAbilityWindowWidth
@text Status window width
@type number
@default 300
@desc
Specifies the width of the status window.

@param StatusAbilityWindowHeight
@text Status window height
@type number
@default 200
@desc
Specifies the height of the status window.
*/


/*~struct~Text:
@param MenuAbilitySystemText
@text Menu display text
@type string
@default ability
@desc
Specify the name of the ability management screen to be added to the menu.

@param CostText
@text cost text
@type string
@default cost:
@desc
Specify the cost wording to be displayed on the ability management screen.

@param EmptySlotText
@text Ability release text
@type string
@default ------
@desc Specify a blank text.
*/


/*:ja
@target MZ
@plugindesc スキル付け替えシステム v1.0.0
@author うなぎおおとろ
@url https://raw.githubusercontent.com/unagiootoro/RPGMZ/master/AbilitySystem.js

@help
スキルを付け替えられるシステムを導入するプラグインです。

このプラグインを導入することで、アクターごとにスキルを持たせておいて、
その中からいくつか選んで装備するというようなシステムを導入することができます。
また、スキルにコストを持たせることも可能です。

【使用方法】
・アクターにスキルを持たせる
プラグインコマンド「アビリティスキル追加」を実行することで、アクターにスキルを持たせることができます。

・スキルを装備する
スキル装備シーンをメニューから開くことによって、アクターが持っているスキルを装備することができます。

・アクターに最大コスト値を設定する
アクターのメモ欄に
<MaxCost: コスト値>
と記載することで、アクターに最大コスト値を設定することができます。
コスト値には0以上の整数を設定してください。

・スキルにコスト値を設定する
スキルのメモ欄に
<AbilityCost: コスト値>
と記載することで、スキルにコスト値を設定することができます。
コスト値には0以上の整数を設定してください。

【ライセンス】
このプラグインは、MITライセンスの条件の下で利用可能です。


@param EnabledAbilitySystemSwitchId
@text アビリティメニュー有効化スイッチID
@type switch
@default 0
@desc
メニューのアビリティ管理画面の有効/無効を判定するスイッチIDを指定します。

@param MaxEquipAbilities
@text 最大装備可能アビリティ数
@type number
@default 4
@desc
装備可能なアビリティの数を指定します。

@param EnableCost
@text スキルコスト有効化
@type boolean
@default true
@desc
スキルのコストを有効化します。

@param EquipAbilitySe
@text アビリティ装備SE
@type struct<SE>
@desc
アビリティ装備時に再生するSEを指定します。

@param WindowSize
@text ウィンドウサイズ
@type struct<WindowSize>
@desc
各種ウィンドウのサイズを設定します。

@param Text
@text 表示テキスト
@type struct<Text>
@desc
ゲーム中で使用されるテキストを設定します。


@command StartAbilityScene
@text アビリティシーン開始
@desc
アビリティシーンを開始します。


@command AddAbilitySkill
@text アビリティスキル追加
@desc
アクターにアビリティスキルを追加します。

@arg ActorId
@text アクターID
@type actor
@desc
アビリティスキルを追加するアクターを指定します。

@arg SkillId
@text スキルID
@type skill
@desc
追加するスキルIDを指定します。


@command RemoveAbilitySkill
@text アビリティスキル削除
@desc
アクターが持つアビリティスキルを削除します。

@arg ActorId
@text アクターID
@type actor
@desc
アビリティスキルを削除するアクターを指定します。

@arg SkillId
@text スキルID
@type skill
@desc
削除するスキルIDを指定します。


@command GetMaxCost
@text 最大コスト取得
@desc
指定したアクターの最大コストを取得し、変数に格納します。

@arg ActorId
@text アクターID
@type actor
@desc
最大コストを取得するアクターを指定します。

@arg VariableId
@text 変数ID
@type variable
@desc
取得した最大コストを格納する変数IDを指定します。


@command SetMaxCost
@text 最大コスト設定
@desc
指定したアクターの最大コストを設定します。

@arg ActorId
@text アクターID
@type actor
@desc
最大コストを設定するアクターを指定します。

@arg VariableId
@text 変数ID
@type variable
@desc
最大コストを設定する値が格納された変数IDを指定します。

@arg Value
@text 最大コスト値
@type number
@desc
最大コストを設定する値を指定します。変数IDが設定されている場合はそちらが優先されます。
*/


/*~struct~SE:ja
@param FileName
@text SEファイル名
@type file
@dir audio/se
@default Skill1
@desc
再生するSEのファイル名を指定します。

@param Volume
@text SE音量
@type number
@default 90
@desc
再生するSEのvolumeを指定します。

@param Pitch
@text SEピッチ
@type number
@default 100
@desc
再生するSEのpitchを指定します。

@param Pan
@text SE位相
@type number
@default 0
@desc
再生するSEのpanを指定します。
*/


/*~struct~WindowSize:ja
@param StatusAbilityWindowWidth
@text ステータスウィンドウ横幅
@type number
@default 300
@desc
ステータスウィンドウの横幅を指定します。

@param StatusAbilityWindowHeight
@text ステータスウィンドウ縦幅
@type number
@default 200
@desc
ステータスウィンドウの縦幅を指定します。
*/


/*~struct~Text:ja
@param MenuAbilitySystemText
@text メニュー表示テキスト
@type string
@default アビリティ
@desc
メニューに追加するアビリティ管理画面の名称を指定します。

@param CostText
@text コストテキスト
@type string
@default コスト：
@desc
アビリティ管理画面で表示するコストの文言を指定します。

@param EmptySlotText
@text アビリティ解除テキスト
@type string
@default ------
@desc 空欄のテキストを指定します。
*/

const AbilitySystemPluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1];

const AbilitySystemClassAlias = (() => {
"use strict";

class PluginParamsParser {
    static parse(params, typeData, predictEnable = true) {
        return new PluginParamsParser(predictEnable).parse(params, typeData);
    }

    constructor(predictEnable = true) {
        this._predictEnable = predictEnable;
    }

    parse(params, typeData, loopCount = 0) {
        if (++loopCount > 255) throw new Error("endless loop error");
        const result = {};
        for (const name in typeData) {
            result[name] = this.convertParam(params[name], typeData[name], loopCount);
        }
        if (!this._predictEnable) return result;
        if (typeof params === "object" && !(params instanceof Array)) {
            for (const name in params) {
                if (result[name]) continue;
                const param = params[name];
                const type = this.predict(param);
                result[name] = this.convertParam(param, type, loopCount);
            }
        }
        return result;
    }

    convertParam(param, type, loopCount) {
        if (typeof type === "string") {
            return this.cast(param, type);
        } else if (typeof type === "object" && type instanceof Array) {
            const aryParam = JSON.parse(param);
            if (type[0] === "string") {
                return aryParam.map(strParam => this.cast(strParam, type[0]));
            } else {
                return aryParam.map(strParam => this.parse(JSON.parse(strParam), type[0]), loopCount);
            }
        } else if (typeof type === "object") {
            return this.parse(JSON.parse(param), type, loopCount);
        } else {
            throw new Error(`${type} is not string or object`);
        }
    }

    cast(param, type) {
        switch(type) {
        case "any":
            if (!this._predictEnable) throw new Error("Predict mode is disable");
            return this.cast(param, this.predict(param));
        case "string":
            return param;
        case "number":
            if (param.match(/\d+\.\d+/)) return parseFloat(param);
            return parseInt(param);
        case "boolean":
            return param === "true";
        default:
            throw new Error(`Unknow type: ${type}`);
        }
    }

    predict(param) {
        if (param.match(/^\d+$/) || param.match(/^\d+\.\d+$/)) {
            return "number";
        } else if (param === "true" || param === "false") {
            return "boolean";
        } else {
            return "string";
        }
    }
}

// Parse plugin parameters.
const typeDefine = {
    EquipAbilitySe: {},
    WindowSize: {},
    Text: {},
};

const params = PluginParamsParser.parse(PluginManager.parameters(AbilitySystemPluginName), typeDefine);

const EnabledAbilitySystemSwitchId = params.EnabledAbilitySystemSwitchId;
const MaxEquipAbilities = params.MaxEquipAbilities;
const EnableCost = params.EnableCost;
const EquipAbilitySe = params.EquipAbilitySe;
const WindowSize = params.WindowSize;
const Text = params.Text;

class SkillCostUtils {
    static getSkillCost(skillId) {
        const skill = $dataSkills[skillId];
        if (!skill) throw new Error(`Unknow skill id ${skillId}`);
        if (skill.meta.AbilityCost) {
            return parseInt(skill.meta.AbilityCost);
        }
        return 0;
    }

    static getMaxCost(actorId) {
        const actorData = $dataActors[actorId];
        if (!actorData) throw new Error(`Unknow actor id ${actorId}`);
        if (actorData.meta.MaxCost) {
            return parseInt(actorData.meta.MaxCost);
        }
        return 0;
    }

    static getAddCost(actorId) {
        return 0;
        // 最大コストが増加する武器/防具を外した時の状況が考慮できていないため、
        // この機能は無効化している。
        const actor = $gameActors.actor(actorId);
        if (!actor) throw new Error(`Unknow actor id ${actorId}`);
        const equipAddCosts = actor.equips().map(equip => {
            if (!equip) return 0;
            return equip.meta.AddCost ? parseInt(equip.meta.AddCost) : 0;
        });
        return equipAddCosts.reduce((total, cost) => total + cost, 0);
    }
}

class Scene_Ability extends Scene_MenuBase {
    create() {
        super.create();
        this.createHelpWindow();
        this.createEquipAbilitiesWindow();
        this.createHasAbilitiesWindow();
        this.createStatusAbilityWindow();
    }

    start() {
        super.start();
        this.updateActor();
        this.restart();
    }

    restart() {
        this._windowEquipAbilities.setActor(this.actor());
        this._windowHasAbilities.setActor(this.actor());
        this._windowStatusAbility.setActor(this.actor());
        this._windowEquipAbilities.refresh();
        this._windowHasAbilities.refresh();
        this._windowStatusAbility.refresh();
        this._windowEquipAbilities.show();
        this._windowHasAbilities.show();
        this._windowStatusAbility.show();
        this._windowEquipAbilities.activate();
        this._windowEquipAbilities.select(0);
        this._windowHasAbilities.deactivate();
        this._windowHasAbilities.deselect();
    }

    createEquipAbilitiesWindow() {
        const rect = this.equipAbilitiesWindowRect();
        this._windowEquipAbilities = new Window_EquipAbilities(rect);
        this._windowEquipAbilities.setHelpWindow(this._helpWindow);
        this._windowEquipAbilities.setHandler("ok", this.onEquipAbilitiesOk.bind(this));
        this._windowEquipAbilities.setHandler("cancel", this.onEquipAbilitiesCancel.bind(this));
        this._windowEquipAbilities.setHandler("select", this.onEquipAbilitiesSelect.bind(this));
        this._windowEquipAbilities.setHandler("pagedown", this.nextActor.bind(this));
        this._windowEquipAbilities.setHandler("pageup", this.previousActor.bind(this));
        this.addWindow(this._windowEquipAbilities);
    }

    createHasAbilitiesWindow() {
        const rect = this.hasAbilitiesWindowRect();
        this._windowHasAbilities = new Window_HasAbilities(rect);
        this._windowHasAbilities.setHelpWindow(this._helpWindow);
        this._windowHasAbilities.setHandler("ok", this.onHasAbilitiesOk.bind(this));
        this._windowHasAbilities.setHandler("cancel", this.onHasAbilitiesCancel.bind(this));
        this.addWindow(this._windowHasAbilities);
    }

    createStatusAbilityWindow() {
        const rect = this.statusAbilityWindowRect();
        this._windowStatusAbility = new Window_StatusAbility(rect);
        this.addWindow(this._windowStatusAbility);
    }

    statusAbilityWindowRect() {
        const x = 0;
        const y = this.mainAreaTop();
        const w = WindowSize.StatusAbilityWindowWidth;
        const h = WindowSize.StatusAbilityWindowHeight;
        return new Rectangle(x, y, w, h);
    }

    equipAbilitiesWindowRect() {
        const statusAbilityWindowRect = this.statusAbilityWindowRect();
        const x = statusAbilityWindowRect.width;
        const y = statusAbilityWindowRect.y;
        const w = Graphics.boxWidth - x;
        const h = statusAbilityWindowRect.height;
        return new Rectangle(x, y, w, h);
    }

    hasAbilitiesWindowRect() {
        const equipAbilitiesWindowRect = this.equipAbilitiesWindowRect();
        const x = 0;
        const y = equipAbilitiesWindowRect.y + equipAbilitiesWindowRect.height;
        const w = Graphics.boxWidth;
        const h = this.mainAreaBottom() - equipAbilitiesWindowRect.y - equipAbilitiesWindowRect.height;
        return new Rectangle(x, y, w, h);
    }

    needsPageButtons() {
        return true;
    }

    onActorChange() {
        super.onActorChange();
        this.restart();
    }

    // Define window handlers
    onEquipAbilitiesOk() {
        this._windowHasAbilities.select(0);
        this.change_EquipAbilitiesWindow_To_HasAbilitiesWindow();
    }

    onEquipAbilitiesCancel() {
        this.popScene();
    }

    onEquipAbilitiesSelect() {
        this._windowHasAbilities.setEquipSlot(this._windowEquipAbilities.index());
        this._windowHasAbilities.refresh();
    }

    onHasAbilitiesOk() {
        const targetSkill = this.actor().hasAbilitySkill(this._windowHasAbilities.index());
        const targetSkillId = (targetSkill ? targetSkill.id : null);
        const changed = this.actor().changeEquipAbilitySkill(this._windowEquipAbilities.index(), targetSkillId);
        if (changed) {
            this._windowHasAbilities.select(-1);
            this._windowStatusAbility.refresh();
            this.change_HasAbilitiesWindow_To_EquipAbilitiesWindow();
        } else {
            this._windowHasAbilities.activate();
        }
    }

    onHasAbilitiesCancel() {
        this.change_HasAbilitiesWindow_To_EquipAbilitiesWindow();
    }

    // Change window activate
    change_EquipAbilitiesWindow_To_HasAbilitiesWindow() {
        this._windowEquipAbilities.deactivate();
        this._windowHasAbilities.activate();
        this._windowEquipAbilities.refresh();
        this._windowHasAbilities.refresh();
    }

    change_HasAbilitiesWindow_To_EquipAbilitiesWindow() {
        this._windowHasAbilities.deactivate();
        this._windowHasAbilities.deselect();
        this._windowEquipAbilities.activate();
        this._windowEquipAbilities.refresh();
        this._windowHasAbilities.refresh();
    }
}

class Window_AbilitiesBase extends Window_Selectable {
    initialize(rect) {
        super.initialize(rect);
        this._actor = null;
        this.hide();
    }

    setActor(actor) {
        this._actor = actor;
    }

    select(index) {
        super.select(index);
        this.callHandler("select");
    }

    drawSkill(index) {
        const rect = this.itemLineRect(index);
        this.drawItemName(this.itemAt(index), rect.x, rect.y, rect.width);
        if (EnableCost) this.drawCost(index, SkillCostUtils.getSkillCost(this.itemAt(index).id));
    }

    drawCost(index, cost) {
        const rect = this.itemLineRect(index);
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(cost, rect.x, rect.y, rect.width, "right");
        this.resetTextColor();
    }

    drawNone(index) {
        const rect = this.itemLineRect(index);
        this.drawText(Text.EmptySlotText, rect.x, rect.y, rect.width);
    }

    updateHelp() {
        super.updateHelp();
        this.setHelpWindowItem(this.item());
    }

    item() {
        return this.itemAt(this.index());
    }

    itemAt(index) {
        throw new Error("itemAt must be implemented");
    }
}

class Window_EquipAbilities extends Window_AbilitiesBase {
    maxItems() {
        return MaxEquipAbilities;
    }

    itemAt(index) {
        return this._actor.equipAbilitySkill(index);
    }

    drawItem(index) {
        if (this.itemAt(index)) {
            this.drawSkill(index);
        } else {
            this.drawNone(index);
        }
    }
}

class Window_HasAbilities extends Window_AbilitiesBase {
    setEquipSlot(slotIndex) {
        this._slotIndex = slotIndex;
    }

    maxItems() {
        return this._actor.hasAbilitySkillIds().length + 1;
    }

    maxCols() {
        return 2;
    }

    itemAt(index) {
        return this._actor.hasAbilitySkill(index);
    }

    drawItem(index) {
        if (this.itemAt(index)) {
            this.changePaintOpacity(this.isItemEnabled(index));
            this.drawSkill(index);
            this.changePaintOpacity(true);
        } else {
            this.drawNone(index);
        }
    }

    isCurrentItemEnabled() {
        return this.isItemEnabled(this.index());
    }

    isItemEnabled(index) {
        if (this._slotIndex === -1) return true;
        const skill = this.itemAt(index);
        if (!skill) return true;
        return this._actor.canChangeEquipAbilitySkill(this._slotIndex, this.itemAt(index).id);
    }

    playOkSound() {
        this.playEquipAbilitySe();
    }

    playEquipAbilitySe() {
        if (EquipAbilitySe.FileName === "") return;
        const se = {
            name: EquipAbilitySe.FileName,
            pan: EquipAbilitySe.Pan,
            pitch: EquipAbilitySe.Pitch,
            volume: EquipAbilitySe.Volume,
        }
        AudioManager.playSe(se);
    }
}

class Window_StatusAbility extends Window_StatusBase {
    initialize(rect) {
        super.initialize(rect);
        this.hide();
        this._actor = null;
    }

    setActor(actor) {
        this._actor = actor;
    }

    drawAllItems() {
        this.drawActorFace();
        this.drawActorName();
        this.drawActorLevel();
        if (EnableCost) this.drawActorTotalCost();
    }

    drawActorFace() {
        const nameRect = this.itemLineRect(0);
        nameRect.width = this.width - ImageManager.faceWidth - this.padding * 2;
        this.drawActorName(this._actor, ImageManager.faceWidth, 0, nameRect.width);
        let faceHeight = 80;
        let faceY = nameRect.y;
        super.drawActorFace(this._actor, nameRect.x, faceY, ImageManager.faceWidth, faceHeight);
    }

    drawActorName() {
        const nameRect = this.itemLineRect(0);
        nameRect.width = this.width - ImageManager.faceWidth - this.padding * 2;
        super.drawActorName(this._actor, ImageManager.faceWidth + 8, 16, nameRect.width);
    }

    drawActorLevel() {
        const x = this.padding;
        const y = (EnableCost ? this.textHeight(-1) : this.textHeight(0));
        super.drawActorLevel(this._actor, x, y);
    }

    drawActorTotalCost() {
        const x = this.padding;
        const y = this.textHeight(0);
        const width = this.width - this.padding * 2;
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(Text.CostText, x, y, width);
        this.resetTextColor();
        const costText = `${this._actor.totalCost()}/${this._actor.maxCost()}`;
        this.drawText(costText, x, y, width, "center");
    }

    textHeight(line) {
        return this.height - this.padding + this.itemHeight() * (line - 1) - 10;
    }
}


// Add ability skill functuon.
const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
    _Game_Actor_initMembers.call(this);
    this._hasAbilitySkills = [];
    this._equipAbilitySkills = [];
    this._maxCost = null;
};

const _Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    _Game_Actor_setup.call(this, actorId);
    this._maxCost = SkillCostUtils.getMaxCost(actorId);
};

Game_Actor.prototype.equipAbilitySkillIds = function() {
    return this._equipAbilitySkills;
};

Game_Actor.prototype.equipAbilitySkill = function(index) {
    const skillId = this.equipAbilitySkillIds()[index];
    if (skillId >= 1) return $dataSkills[skillId];
    return null;
};

Game_Actor.prototype.hasAbilitySkillIds = function() {
    return this._hasAbilitySkills;
};

Game_Actor.prototype.hasAbilitySkill = function(index) {
    const skillId = this.hasAbilitySkillIds()[index];
    if (skillId >= 1) return $dataSkills[skillId];
    return null;
};

Game_Actor.prototype.addAbilitySkill = function(skillId) {
    if (this._hasAbilitySkills.includes(skillId)) return;
    this._hasAbilitySkills.push(skillId);
};

Game_Actor.prototype.removeAbilitySkill = function(skillId) {
    this.forgetSkill(skillId);
    this._equipAbilitySkills = this._equipAbilitySkills.map(id => id === skillId ? null : id);
    this._hasAbilitySkills = this._hasAbilitySkills.filter(id => id !== skillId);
};

Game_Actor.prototype.totalCost = function(equipAbilitySkills = this._equipAbilitySkills) {
    const costs = equipAbilitySkills.map(id => id ? SkillCostUtils.getSkillCost(id) : 0);
    return costs.reduce(((total, cost) => total + cost), 0);
};

Game_Actor.prototype.maxCost = function() {
    return this._maxCost + SkillCostUtils.getAddCost(this.actorId());
};

Game_Actor.prototype.setMaxCost = function(value) {
    this._maxCost = value;
}

Game_Actor.prototype.changeEquipAbilitySkill = function(index, targetSkillId) {
    if (this.canChangeEquipAbilitySkill(index, targetSkillId)) {
        this.doChangeEquipAbilitySkill(index, targetSkillId);
        return true;
    }
    return false;
};

Game_Actor.prototype.canChangeEquipAbilitySkill = function(index, targetSkillId) {
    if (!targetSkillId) return true;
    const equipAbilitySkills = this._equipAbilitySkills.concat();
    equipAbilitySkills[index] = targetSkillId;
    return this.totalCost(equipAbilitySkills) <= this.maxCost();
}

Game_Actor.prototype.doChangeEquipAbilitySkill = function(index, targetSkillId) {
    const currentSkillId = this._equipAbilitySkills[index];
    if (!currentSkillId && !targetSkillId) return;
    if (currentSkillId) this.forgetSkill(currentSkillId);
    if (targetSkillId) {
        const hasIndex = this._hasAbilitySkills.indexOf(targetSkillId);
        this._equipAbilitySkills[index] = targetSkillId;
        this.learnSkill(targetSkillId);
        if (currentSkillId) {
            this._hasAbilitySkills[hasIndex] = currentSkillId;
        } else {
            this._hasAbilitySkills[hasIndex] = null;
            this._hasAbilitySkills = this._hasAbilitySkills.filter(id => !!id);
        }
    } else {
        this._equipAbilitySkills[index] = null;
        this._hasAbilitySkills.push(currentSkillId);
    }
};


// Add equip abilities to menu command.
const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    _Window_MenuCommand_addOriginalCommands.call(this);
    if (Text.MenuAbilitySystemText !== "") this.addCommand(Text.MenuAbilitySystemText, "ability", this.isEnabledAbilityCommand());
};

Window_MenuCommand.prototype.isEnabledAbilityCommand = function() {
    if (EnabledAbilitySystemSwitchId === 0) return true;
    return $gameSwitches.value(EnabledAbilitySystemSwitchId);
};

const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("ability", this.commandPersonal.bind(this));
};

const _Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function() {
    _Scene_Menu_onPersonalOk.call(this);
    switch (this._commandWindow.currentSymbol()) {
    case "ability":
        SceneManager.push(Scene_Ability);
        break;
    }
};


// Register plugin command.
PluginManager.registerCommand(AbilitySystemPluginName, "StartAbilityScene", () => {
    SceneManager.push(Scene_Ability);
});

PluginManager.registerCommand(AbilitySystemPluginName, "AddAbilitySkill", args => {
    const params = PluginParamsParser.parse(args, { ActorId: "number", SkillId: "number" });
    const actor = $gameActors.actor(params.ActorId);
    actor.addAbilitySkill(params.SkillId);
});

PluginManager.registerCommand(AbilitySystemPluginName, "RemoveAbilitySkill", args => {
    const params = PluginParamsParser.parse(args, { ActorId: "number", SkillId: "number" });
    const actor = $gameActors.actor(params.ActorId);
    actor.removeAbilitySkill(params.SkillId);
});

PluginManager.registerCommand(AbilitySystemPluginName, "GetMaxCost", args => {
    const params = PluginParamsParser.parse(args, { ActorId: "number", VariableId: "number" });
    const actor = $gameActors.actor(params.ActorId);
    const value = actor.maxCost();
    $dataVariables.setValue(params.VariableId, value);
});

PluginManager.registerCommand(AbilitySystemPluginName, "SetMaxCost", args => {
    const params = PluginParamsParser.parse(args, { ActorId: "number", VariableId: "number", Value: "number" });
    const value = (VariableId > 0 ? $dataVariables.value(params.VariableId) : params.Value);
    const actor = $gameActors.actor(actorId);
    return actor.setMaxCost(value);
});


return {
    SkillCostUtils: SkillCostUtils,
    Scene_Ability: Scene_Ability,
    Window_AbilitiesBase: Window_AbilitiesBase,
    Window_EquipAbilities: Window_EquipAbilities,
    Window_HasAbilities: Window_HasAbilities,
    Window_StatusAbility: Window_StatusAbility,
};

})();