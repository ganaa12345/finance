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
        DOMpublic: function () {
            return DOMstrings;

        }
    }
})();
// sanhvvgiin model controller
var financeController = (function () {
})();
// tovch darah uildel model controller
var appController = (function (uiCntrl, fnCntrl) {
    var DOM = uiCntrl.DOMpublic();
    var ctrlAddItem = function () {
        console.log(uiController.getInput());
        // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.


        // 2. Олж авсан өгөгдлүүдийн санхүүгийн контроллерт дамжуулж тэнд хадгална.
        // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт гаргана. 
        // 4. Төсвийг тооцоолон
        // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
    }

    document.querySelector(DOM.inputButton).addEventListener('click', function () {
        ctrlAddItem();
    });
    document.querySelector('.add__value').addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }

    })

})(uiController, financeController);