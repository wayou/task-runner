"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var taskRunner_1 = require("./taskRunner");
var runner = new taskRunner_1.TaskRunner(3, true);
function taskGenerator(taskName, time) {
    return {
        name: taskName,
        fn: function () {
            return new Promise(function (resolve, _reject) {
                setTimeout(function () {
                    resolve("result for task " + taskName);
                }, time);
            });
        }
    };
}
var errorTask = {
    name: "errroTask",
    fn: function () {
        return new Promise(function (_resolve, reject) {
            setTimeout(function () {
                reject("errorTask failed");
            }, 3000);
        });
    }
};
[errorTask]
    .concat(__spread(new Array(5).keys()).map(function (_value, index) {
    return taskGenerator(String(index), Math.random() * 10000 + 1000);
}))
    .forEach(function (task) { return runner.addTask(task); });
