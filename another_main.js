/**
 * Класс инвентаря
 * Управляет предметами
 * @class
 */
class Inventory {
    constructor(){
    this.items = [];
    }
/**
 * Добавляет предмет
 * @param {Item} item
 */
    addItem(item) {
        return this.items.push(item);
    }


    removeItem(name) {
        this.items = this.items.filter(item => item.name !== name);
    }
/**
 * Выводит все предметы
 */
    printAll() {
    this.items.forEach(item => {
        console.log(item.getInfo());
    });
    }
}
/**
 * Класс, представляющий предмет инвентаря
 * @class
 */
class Item {
    /**
     * Создает предмет инвентаря
     * @param {string} name - название
     * @param {number} weight - вес
     * @param {string} rarity - редкость 
     */
    constructor(name, weight, rarity){

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
 * @returns {string}  
 */

    getInfo() {
        return `${this.name} \nWeight: ${this.weight} \nRarity: ${this.rarity}`
    }

/**
 * Меняет вес предмета
 * @returns {number}  
 */

    setWeight(new_weight) {
        this.weight = new_weight;
    }
}

/**
 * Класс, представляющий предмет инвентаря типа оружие
 * @class
 */

class Weapon extends Item {

    /**
     * Создает предмет инвентаря типа оружие
     * @param {string} name - имя
     * @param {number} weight - вес
     * @param {string} rarity - редкость
     * @param {number} damage - урон
     * @param {number} durability - прочность 
     */

    constructor(name, weight, rarity, damage, durability){
        super(name, weight, rarity);
        this.damage = damage;
        this.durability = durability;
    }
    
/**
 * Уменьшает прочность
 * @returns {number}  
 */

    use() {
        if (this.durability > 0){
            this.durability -= 10;
            if (this.durability < 0)
                this.durability = 0;
        }
    }
    
/**
 * Возвращает максимальную прочность оружия
 * @returns {number}  
 */

    repair() {
        this.durability = 100;
    }
}

const inventory = new Inventory();

const sword = new Item("Steel Sword", 6.5, "rare");
inventory.addItem(sword)

console.log(sword?.getInfo?.());
sword.setWeight(8.0);
console.log(sword?.getInfo?.());

const bow = new Weapon("Longbow", 3.0, "legendary", 15, 100);
inventory.addItem(bow);
console.log(bow?.getInfo?.());

inventory.printAll();

inventory.removeItem("Steel Sword");

console.log('\n')
inventory.printAll();