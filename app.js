//user-interface model controller
var uiController = (function () {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn'
    }
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDOMpublic: function () {
            return DOMstrings;
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

    var data = {
        allitems: {
            inc: [],
            exp: [],
        },
        totals: {
            inc: 0,
            exp: 0
        }
    }
    return {
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
        financeController.addItem(input.type, input.description, input.value);
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
            setupEventListeners();
        }
    }
})(uiController, financeController);
appController.init();
