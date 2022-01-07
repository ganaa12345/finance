//user-interface model controller
var uiController = (function () {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        inputInc: '.income__list',
        inputExp: '.expenses__list',
        inputBudget: '.budget__value',
        inputIncome: '.budget__income--value',
        inputExpenses: '.budget__expenses--value',
        inputPercent: '.budget__expenses--percentage',

    }
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseInt(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        getDOMpublic: function () {
            return DOMstrings;
        },
        clearFields: function () {
            var fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
            var fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function (el) {
                el.value = "";
            });
            fieldsArr[0].focus();
        },

        tusuviigUzuuleh: function (tusuv) {
            document.querySelector(DOMstrings.inputBudget).textContent = tusuv.tusuv;
            document.querySelector(DOMstrings.inputIncome).textContent = tusuv.totlaInc;
            document.querySelector(DOMstrings.inputExpenses).textContent = tusuv.totalExp;
            if (tusuv.huvi !== 0) {
                document.querySelector(DOMstrings.inputPercent).textContent = tusuv.huvi + '%';
            }
            else {
                document.querySelector(DOMstrings.inputPercent).textContent = tusuv.huvi;
            }

        },
        addListItem: function (item, type) {
            var html, list;
            if (type === 'inc') {
                list = DOMstrings.inputInc;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">$description$</div><div class="right clearfix"><div class="item__value">%salary%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div ></div > ';
            }
            else {
                list = DOMstrings.inputExp;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">$description$</div><div class="right clearfix"><div class="item__value">%salary%</div><div class="item__percentage">%per%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            html = html.replace('%id%', item.id);
            html = html.replace('$description$', item.description);
            html = html.replace('%salary%', item.value);
            document.querySelector(list).insertAdjacentHTML('beforeend', html);
        }
    }
})();
// sanhvvgiin model controller
var financeController = (function () {

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var calculateTotal = function (type) {
        var sum = 0;
        data.allitems[type].forEach(function (el) {
            sum = sum + el.value;
        });
        data.totals[type] = sum;
    }
    var data = {
        allitems: {
            inc: [],
            exp: [],
        },
        totals: {
            inc: 0,
            exp: 0
        },
        tusuv: 0,
        huvi: 0
    }
    return {
        tusuvTootsoloh: function () {
            calculateTotal('inc');
            calculateTotal('exp');
            data.tusuv = data.totals.inc - data.totals.exp;
            data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
        },
        tusviigAvah: function () {
            return {
                tusuv: data.tusuv,
                huvi: data.huvi,
                totlaInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },

        addItem: function (type, desc, val) {
            var item, id;
            if (data.allitems[type].length === 0) {
                id = 1;
            }
            else {
                id = data.allitems[type][data.allitems[type].length - 1].id + 1;
            }
            if (type === 'inc') {
                item = new Income(id, desc, val);
            } else {
                item = new Expense(id, desc, val);
            }
            data.allitems[type].push(item);

            return item;
        },
        seeData: function () {
            return data;
        }
    };
})();
// tovch darah uildel model controller
var appController = (function (uiController, financeController) {
    var ctrlAddItem = function () {
        var input = uiController.getInput();
        var item = financeController.addItem(input.type, input.description, input.value);
        uiController.addListItem(item, input.type);
        uiController.clearFields();
        // 4. төсөв тооцоолох
        financeController.tusuvTootsoloh();
        // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
        var tusuv = financeController.tusviigAvah();
        //6. Эцсийн төсөвийн тооцоог дэлгцэнд гаргана.
        uiController.tusuviigUzuuleh(tusuv);

    };
    var setupEventListeners = function () {
        var DOM = uiController.getDOMpublic();
        document.querySelector(DOM.inputButton).addEventListener('click', function () {
            ctrlAddItem();
        });
        document.querySelector('.add__value').addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }
    return {
        init: function () {
            console.log('Application started : ');
            uiController.tusuviigUzuuleh({
                tusuv: 'Утга хоосон байна.',
                huvi: 0,
                totlaInc: 0,
                totalExp: 0
            });
            setupEventListeners();
        }
    }
})(uiController, financeController);
appController.init();