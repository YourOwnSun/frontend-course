"use strict";
// в данных задачах нужно использовать возможности es6
// ко всем заданиям можно (а местами и нужно) дописать свои тесты в файле es6.spec.js
// Можно менять параметры функций (например сделать им значения по умолчанию)

// Напишите функцию, которая принимает ФИО пользователя и возвращает
// строку формата Имя Фамилия
function fioToName(fio) {
    const sepFio = fio.split(' ');

    if(sepFio.length >= 2) return sepFio[1] + " " + sepFio[0];

    return "ERROR";
}

// преобразуйте массив чисел так, чтобы в нем остались только
// уникальные элементы
// присмотритесь к коллекции "Set"
function filterUnique(array) {
    return Array.from(new Set(array));
}

// Задача: разница зарплат
// в функцию приходит массив из n зарплат сотрудников фирмы
// ваша задача определить, во сколько раз зарплата самого высокооплачиваемого
// сотрудника превышает зарплату самого низкооплачиваемого
function calculateSalaryDifference(array) {
    if(array.length === 0) return false;

    return Math.max(...array)/Math.min(...array);
}

// Реализуйте класс "словарь слов" (как толковый словарь)
// класс должен быть безопасным и работать только со словами
// присмотритесь к коллекции "Map"
// Словарь - (string, string), и все это не null и не undefined
// * покройте класс тестами
class Dictionary {
    constructor () {
        this.wordbook = new Map();
    }

    addWord(word, meaning) {
        this._validateInput(word);
        this._validateInput(meaning);

        if (this.wordbook.has(word)) throw new Error('Word already exists');

        this.wordbook.set(word,meaning);
    }

    getMeaning(word){
        this._validateInput(word);

        if (this.wordbook.has(word)) return this.wordbook.get(word);

        throw new Error("Word not found");
    }

    deleteWord(word) {
        this._validateInput(word);

        if (this.wordbook.has(word)) return this.wordbook.delete(word);

        throw new Error("Word not found");
    }

    changeMeaning(word, meaning){
        this.deleteWord(word);
        this.addWord(word, meaning);
    }

    hasWord(word){
        return this.wordbook.has(word);
    }

    getSize(){
        return this.wordbook.size;
    }

    _validateInput(input) {
        if ((typeof input) === 'string'
            && (input !== "" && input !== null && input !== undefined))
            return;

        throw new Error('Incorrect input');
    }
}

module.exports = {
    fioToName,
    filterUnique,
    Dictionary,
    calculateSalaryDifference
};
