var myDB = {
  name: "factory",
  version: 1,
  db: null,
};

export const createIndexDb = (name, key) => {
  return new Promise((resolve, reject) => {
    // factory相当于数据库的名字
    var request = window.indexedDB.open(myDB.name, myDB.version);

    request.onerror = function (e) {
      console.log("open indexdb error");
    };
    request.onsuccess = function (e) {
      myDB.db = e.target.result;
      resolve("开启成功");
    };
    request.onupgradeneeded = function (e) {
      var db = e.target.result;
      var store;
      // 在数据库中创建该对象空间，name是相当于表的名字
      if (!db.objectStoreNames.contains(name)) {
        // keyPath是表的主键
        store = db.createObjectStore(name, { keyPath: key });
        console.log("成功建立对象存储空间：workers");
      }
    };
  });
};

// 向表中添加数据
export function addData(id, obj, name) {
  var db = myDB?.db;
  console.log(db, "db");
  // 事务
  var store = db.transaction([name], "readwrite").objectStore(name);
  //   var request;
  const req = store.add({ id, obj });
  req.onerror = function () {
    console.error("factory数据库中已存在该数据");
  };
  req.onsuccess = function () {
    console.log("将数据已存入factory数据库");
  };
}

export function searchData(key, name) {
  return new Promise((resolve, reject) => {
    var db = myDB?.db;
    // 事务
    var store = db.transaction([name], "readwrite").objectStore(name);
    var request = store.get(key);
    request.onerror = function () {
      console.error("找不到数据");
    };
    request.onsuccess = function (e) {
      console.log(e);
      var data = e.target.result;
      console.log("找到该数据", data);
      resolve(data);
    };
  });
}
