const assert = require('assert');
const core = require('./es6');

describe('es6', () => {
    describe('#fioToName', () => {
        it('ФИО в Имя Фамилия корректно', () => {
            assert.strictEqual(core.fioToName('Иванов Иван Иванович'), 'Иван Иванов');
        });

        it('ФИ в Имя Фамилия', () => {
            assert.strictEqual(core.fioToName('Петров Петр'), 'Петр Петров');
        });
    });

    describe('#filterUnique', () => {
        it('массив с уникальными равен сам себе', () => {
            assert.deepStrictEqual(core.filterUnique([1, 2, 3]), [1, 2, 3]);
        });

        it('массив с неуникальными отфильтрован', () => {
            assert.deepStrictEqual(core.filterUnique([1, 1, 1, 1]), [1]);
        });

        it('пустой массив', () => {
            assert.deepStrictEqual(core.filterUnique([]), []);
        });
    });

    describe('#calculateSalaryDifference', () => {
        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([1, 2, 3]), 3);
        });

        it('на пустой массив возвращается falsy значение', () => {
            assert.strictEqual(!!core.calculateSalaryDifference([]), false);
        });
    });

    describe('#Dictionary', () => {
        it('экземпляр класса создается', () => {
            const dic = new core.Dictionary();

            assert.strictEqual(!!dic, true);
        });

        it('добавление слова', () => {
            const dic = new core.Dictionary();

            dic.addWord("word","meaning");

            assert.strictEqual(dic.getMeaning("word"), "meaning");
        });

        it('слово не найдено', () => {
            const dic = new core.Dictionary();

            const exercise = () => dic.getMeaning("word");

            assert.throws(exercise, /^Error: Word not found$/);
        });

        it('удаление слова', () => {
            const dic = new core.Dictionary();

            dic.addWord("word","meaning");

            assert.strictEqual(dic.getMeaning("word"), "meaning");

            dic.deleteWord("word");

            const exercise = () => dic.getMeaning("word");

            assert.throws(exercise, /^Error: Word not found$/);
        });

        it('изменение значения', () => {
            const dic = new core.Dictionary();

            dic.addWord("word","meaning");

            assert.strictEqual(dic.getMeaning("word"), "meaning");

            dic.changeMeaning("word", "meaning2");

            assert.strictEqual(dic.getMeaning("word"), "meaning2");
        });

        it('размер', () => {
            const dic = new core.Dictionary();

            assert.strictEqual(dic.getSize(), 0);

            dic.addWord("word","meaning");

            assert.strictEqual(dic.getSize(), 1);
        });

        it('проверка существование слова', () => {
            const dic = new core.Dictionary();

            dic.addWord("word","meaning");

            assert.strictEqual(dic.hasWord("word"), true);
        });
    });
});