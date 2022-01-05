//user-interface model controller
var uiController = (function () {
})();
// sanhvvgiin model controller
var financeController = (function () {
})();
// tovch darah uildel model controller
var appController = (function (uiCntrl, fnCntrl) {

    var ctrlAddItem = function () {
        console.log('Энтэр товч дарагдлаа.');
        // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
        // 2. Олж авсан өгөгдлүүдийн санхүүгийн контроллерт дамжуулж тэнд хадгална.
        // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт гаргана. 
        // 4. Төсвийг тооцоолон
        // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
    }

    document.querySelector('.add__btn').addEventListener('click', function () {
        ctrlAddItem();
    });
    document.querySelector('.add__value').addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    })

})(uiController, financeController);