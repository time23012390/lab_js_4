/**
 * Класс инвентаря
 * Управляет предметами
 * @class
 */
function Inventory() {
    this.items = [];
}

/**
 * Добавляет предмет
 * @param {Item} item
 */
Inventory.prototype.addItem = function(item) {
    this.items.push(item);
};

Inventory.prototype.removeItem = function(name) {
    this.items = this.items.filter(item => item.name !== name);
};

/**
 * Выводит все предметы
 */
Inventory.prototype.printAll = function() {
    this.items.forEach(item => {
        console.log(item.getInfo());
    });
};
/**
 * Создает предмет инвентаря
 * @constructor
 * @param {string} name - название предмета
 * @param {number} weight - вес предмета
 * @param {string} rarity - редкость предмета (common, uncommon, rare, legendary)
 */

function Item(name, weight, rarity) {

    if(typeof name !== "string"){
        throw new Error("Invalid name")
    }
    if(weight < 0){
        throw new Error("Weight must be positive")
    }

    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
}

/**
 * Возвращает информацию о предмете
 * @returns {string} строка с описанием предмета
 */

Item.prototype.getInfo = function() {
        return `${this.name} \nWeight: ${this.weight} \nRarity: ${this.rarity}`
};

/**
 * Изменяет вес предмета
 * @param {number} newWeight - новый вес предмета
 */

Item.prototype.setWeight = function(newWeight){
    return this.weight = newWeight;    
}; 

/**
 * Создает оружие
 * @constructor
 * @param {string} name
 * @param {number} weight
 * @param {string} rarity
 * @param {number} damage - урон
 * @param {number} durability - прочность (0-100)
 */

function Weapon(name, weight, rarity, damage, durability){
    Item.call(this, name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
}

/**
 * Наследует методы базового класса
 */

Weapon.prototype = Object.create(Item.prototype);
Weapon.prototype.constructor = Weapon;

/**
 * Использует оружие, уменьшая прочность
 */

Weapon.prototype.use = function() {
    if (this.durability > 10){
        this.durability -= 10;
        if (this.durability < 0)
            this.durability = 0;
    }
};

/**
 * Полностью восстанавливает прочность оружия
 */
    
Weapon.prototype.repair = function() {
    this.durability = 100;
};

/**
 * Создаю объект
 * Добавляю в инвентарь
 * Вывожу информацию 
 * Меняю вес
 * Вывожу измененую информацию
 */
const inventory = new Inventory();

const sword = new Item("Steel Sword", 3.5, "rare");
inventory.addItem(sword)

console.log(sword?.getInfo?.());
sword.setWeight(4.0);
console.log(sword?.getInfo?.());

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
inventory.addItem(bow);
console.log(bow?.getInfo?.());

/**
 * Использую предмет
 * Вывожу прочность
 * Восстанавливаю прочность
 * Вывожу прочность
 */

bow.use();
console.log(bow?.durability); // должно уменьшиться
bow.repair();
console.log(bow?.durability); // должно уменьшиться

inventory.printAll();

inventory.removeItem("Steel Sword");

console.log('\n')
inventory.printAll();