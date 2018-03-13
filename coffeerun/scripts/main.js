(function(window) {
  "use strict";
  var FORM_SELECTOR = "[data-coffee-order='form']";
  var CHECKLIST_SELECTOR = "[data-coffee-order='checklist']";
  var SERVER_URL = "http://localhost:2403/coffeeorders";
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var myTruck = new Truck("ncc-1701", remoteDS);
  window.myTruck = myTruck;
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  //checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  checkList.addClickHandler(remoteDS.remove.bind(remoteDS));
  var formHandler = new FormHandler(FORM_SELECTOR);

  formHandler.addSubmitHandler(function(data) {
    myTruck.createOrder(data);
    checkList.addRow(data);
  });
  /**/
  remoteDS.getAll(function(data) {
    //myTruck.createOrder.call(myTruck, data);
    for (var i = 0; i < data.length; i++) {
      checkList.addRow.call(checkList, data[i]);
    }
  });
  /**/
  formHandler.addInputHandler(Validation.isCompanyEmail);

  console.log(formHandler);
})(window);
