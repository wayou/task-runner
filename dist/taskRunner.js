"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TaskRunner = /** @class */ (function () {
    function TaskRunner(limit, debug) {
        if (limit === void 0) { limit = 5; }
        if (debug === void 0) { debug = false; }
        this.limit = limit;
        this.debug = debug;
        this.queue = [];
        this.activeTaskNum = 0;
        if (limit < 1) {
            throw new Error("limit must be interger greater then 1");
        }
    }
    TaskRunner.prototype.addTask = function (task) {
        task.name ? task.name : task.fn.name || this.queue.length || "";
        this.queue.push(task);
        this.runTask();
    };
    TaskRunner.prototype.execute = function (task) {
        var _this = this;
        this.log("running " + task.name);
        return task
            .fn()
            .then(function (ressult) {
            _this.log("task " + task.name + " finished");
            return ressult;
        })
            .catch(function (error) {
            _this.log(task.name + " failed");
            throw error;
        })
            .finally(function () {
            _this.activeTaskNum--;
            _this.runTask();
        });
    };
    TaskRunner.prototype.runTask = function () {
        while (this.activeTaskNum < this.limit && this.queue.length > 0) {
            var task = this.queue.shift();
            this.activeTaskNum++;
            this.execute(task);
        }
    };
    TaskRunner.prototype.log = function (msg) {
        if (this.debug) {
            console.info("[TaskRunner] " + msg);
        }
    };
    return TaskRunner;
}());
exports.TaskRunner = TaskRunner;
