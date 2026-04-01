<div align="center">
<h2>Министерство образования и исследований</h2>
<h2>Молдавский Государственный Университет</h2>
<h3>Факультет Математики и Информатики</h3>
<h3>Департамент Информатики</h3>

<br>

<p><strong>Отчёт</strong></p>
<p>по дисциплине «JavaScript»</p>
<p><strong>Лабораторная работа №4</strong></p>
<p>Продвинутые объекты в JavaScript</p>

<br><br>

<p><strong>Выполнила:</strong><br>
Чебанова София, гр. IA2503</p>

<p><strong>Проверил:</strong><br>
N. Calin, asistent universitar</p>

<br><br>

<p>Кишинёв, 2026</p>

</div>

---


# Цель работы

Целью данной работы является познакомиться с классами и объектами в JavaScript, научиться создавать классы, использовать конструкторы и методы, а также реализовать наследование.

# Ход работы

В ходе лабораторной работы необходимо разработать консольное приложение, моделирующее систему инвентаря. Программа должна позволять создавать предметы, изменять их свойства и управлять ими.

Требуется реализовать:
* класс Item с основными характеристиками предмета;
* класс Weapon, наследующий Item;
* методы для работы с объектами;
* тестирование созданных объектов;
* реализацию через функции-конструкторы;
* использование опциональной цепочки.

# Описание реализации

## Класс Item

Был разработан класс Item, представляющий предмет инвентаря. Класс содержит следующие поля:
* name — название предмета;
* weight — вес;
* rarity — редкость.

Реализованы методы:
* getInfo() — возвращает строку с информацией о предмете;
* setWeight(newWeight) — позволяет изменить вес предмета.

```js
class Item {
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

    getInfo() {
        return `${this.name} \nWeight: ${this.weight} \nRarity: ${this.rarity}`
    }

    setWeight(new_weight) {
        this.weight = new_weight;
    }
}
```

## Класс Weapon

Был разработан класс Weapon, который наследуется от класса Item. Дополнительно введены поля:
* damage — урон;
* durability — прочность.

Реализованы методы:
* use() — уменьшает прочность на 10 единиц при использовании;
* repair() — восстанавливает прочность до 100.

```js
class Weapon extends Item {

    constructor(name, weight, rarity, damage, durability){
        super(name, weight, rarity);
        this.damage = damage;
        this.durability = durability;
    }
    

    use() {
        if (this.durability > 0){
            this.durability -= 10;
            if (this.durability < 0)
                this.durability = 0;
        }
    }
    

    repair() {
        this.durability = 100;
    }
}
```

## Наследование

Наследование реализовано с использованием ключевого слова extends, что позволяет классу Weapon использовать свойства и методы класса Item.

# Функции-конструкторы

Классы были переписаны с использованием функций-конструкторов. Для реализации наследования использовались методы Object.create() и вызов конструктора родительского объекта через call().

```js
function Inventory() {
    this.items = [];
}

Inventory.prototype.addItem = function(item) {
    this.items.push(item);
};

Inventory.prototype.removeItem = function(name) {
    this.items = this.items.filter(item => item.name !== name);
};

Inventory.prototype.printAll = function() {
    this.items.forEach(item => {
        console.log(item.getInfo());
    });
};

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

Item.prototype.getInfo = function() {
        return `${this.name} \nWeight: ${this.weight} \nRarity: ${this.rarity}`
};

Item.prototype.setWeight = function(newWeight){
    return this.weight = newWeight;    
}; 

function Weapon(name, weight, rarity, damage, durability){
    Item.call(this, name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
}

Weapon.prototype = Object.create(Item.prototype);
Weapon.prototype.constructor = Weapon;

Weapon.prototype.use = function() {
    if (this.durability > 10){
        this.durability -= 10;
        if (this.durability < 0)
            this.durability = 0;
    }
};

Weapon.prototype.repair = function() {
    this.durability = 100;
};
```

## Опциональная цепочка

В программе была использована опциональная цепочка (?.), позволяющая безопасно обращаться к свойствам объектов без возникновения ошибок в случае их отсутствия.

```js
console.log(sword?.getInfo?.());
sword.setWeight(4.0);
console.log(sword?.getInfo?.());
```

# Тестирование

В ходе тестирования были созданы объекты классов Item и Weapon. Были вызваны методы getInfo(), setWeight(), use() и repair().

Результаты показали корректную работу программы:
* информация о предметах выводится правильно;
* вес успешно изменяется;
* прочность оружия уменьшается при использовании;
* восстановление прочности работает корректно.

```js
const inventory = new Inventory();

const sword = new Item("Steel Sword", 3.5, "rare");
inventory.addItem(sword)

console.log(sword?.getInfo?.());
sword.setWeight(4.0);
console.log(sword?.getInfo?.());

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
inventory.addItem(bow);
console.log(bow?.getInfo?.());

bow.use();
console.log(bow?.durability); // должно уменьшиться
bow.repair();
console.log(bow?.durability); // должно уменьшиться

inventory.printAll();

inventory.removeItem("Steel Sword");

console.log('\n')
inventory.printAll();
```

## Результат

с использованием классов:

<img width="558" height="466" alt="image" src="https://github.com/user-attachments/assets/d5910d88-7d8b-472f-b404-f4915380d95d" />

с использованием функций конструкторов: 

<img width="480" height="509" alt="image" src="https://github.com/user-attachments/assets/f01682d2-d2b2-479a-b2d2-40e9cb57c7fc" />

# Контрольные вопросы

### Какое значение имеет this в методах класса?

В методах класса this ссылается на текущий экземпляр объекта, у которого был вызван метод. Это позволяет обращаться к его свойствам и другим методам. Например, внутри метода this.name означает имя конкретного объекта, а не класса в целом. Значение this определяется контекстом вызова: если метод вызывается через объект (obj.method()), то this будет указывать на obj.

### Как работает модификатор доступа # в JavaScript?

Символ # используется для объявления приватных полей и методов класса. Такие свойства доступны только внутри самого класса и не могут быть прочитаны или изменены извне. Например, #secret нельзя вызвать через object.#secret — это вызовет ошибку. Это обеспечивает инкапсуляцию и защиту данных, так как доступ к ним возможен только через публичные методы класса.

### В чем разница между классами и функциями-конструкторами?

Классы — это более современный и удобный синтаксис для создания объектов и реализации ООП в JavaScript, введённый в ES6, тогда как функции-конструкторы — более старый способ, основанный на прототипах. По сути, классы являются «синтаксическим сахаром» над функциями-конструкторами, так как внутри они работают аналогично (через прототипы), но позволяют писать код более читаемо и структурированно, а также поддерживают такие возможности, как extends, super и приватные поля.

# Вывод

В ходе выполнения лабораторной работы были изучены основы объектно-ориентированного программирования в JavaScript. Были реализованы классы, методы и наследование. Также была освоена работа с функциями-конструкторами и опциональной цепочкой.
Полученные знания позволяют создавать более сложные структуры данных и моделировать реальные системы.
