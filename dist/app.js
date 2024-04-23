"use strict";

var _express = _interopRequireWildcard(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var app = (0, _express["default"])();

/**
 * TODO
 * create todo
 * update todo by id
 * delete todo by id
 * get todo by id
 */

/**
 * id
 * status = complete, in progress , canceled
 * name
 */
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
var todoList = [];

//create data by POST METHOD
app.post('/todos', function (req, res) {
  console.log('body data', req.body);
  todoList.push(req.body);
  res.send(req.body);
});

//read all data by GET METHOD
app.get('/todos', function (req, res) {
  res.send(todoList);
});

//delete all data by DELETE METHOD
app["delete"]('/todos/:id', function (req, res) {
  var todoIndex = todoList.findIndex(function (todo) {
    return todo.id === req.params.id;
  });
  if (todoIndex === -1) {
    res.status(404).send("Todo not found");
    return;
  }
  todoList.splice(todoIndex, 1);
  res.send(req.params.id);
});

//update data by id by PATCH METHOD
app.patch('/todos/:id', function (req, res) {
  var todoIndex = todoList.findIndex(function (todo) {
    return todo.id === req.params.id;
  });
  if (todoIndex === -1) {
    res.status(404).send("Todo not found");
    return;
  }
  //การเขียนแบบ destructuring => x = {...x , ...y}
  todoList[todoIndex] = _objectSpread(_objectSpread({}, todoList[todoIndex]), req.body); //การ merge object 2 object เข้าด้วยกัน โดยการเอา todoList และ req.body มาผสมกัน
  res.send(todoList[todoIndex]);
});

//overwrite data by PUT METHOD
app.put('/todos/:id', function (req, res) {
  var todoIndex = todoList.findIndex(function (todo) {
    return todo.id === req.params.id;
  });
  if (todoIndex === -1) {
    res.status(404).send("Todo not found");
    return;
  }
  todoList[todoIndex] = req.body; //เอาข้อมูลจาก req.body ใส่ทับข้อมูลเดิมทั้งก้อน
  res.send(todoList[todoIndex]);
});

//read data by id by GET METHOD
app.get('/todos/:id', function (req, res) {
  var todo = todoList.find(function (todo) {
    return todo.id === req.params.id;
  });
  if (todo) {
    res.send(todo);
  }
  res.status(404).send("not Found");
});

//create many data by POST METHOD
app.post('/todos/bulk', function (req, res) {
  var _todoList;
  (_todoList = todoList).push.apply(_todoList, _toConsumableArray(req.body));
  res.send(req.body);
});

//delete many data by id by DELETE METHOD
app["delete"]('/todos', function (req, res) {
  var todoIds = req.query["in"].split(",");
  todoList = todoList.filter(function (todo) {
    return !todoIds.includes(todo.id);
  });
  res.send(todoIds);
});
app.listen(3000, function () {
  console.log('http://localhost:3000');
});