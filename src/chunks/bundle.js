System.register([], function(_export, _context) { return { execute: function () {
System.register("chunks:///_virtual/archive.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
          writable: false
        });
        return Constructor;
      }

      var _cjsExports;

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);

      loader.define(__cjsMetaURL, function (exports$1, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        var Map = /*#__PURE__*/function () {
          function Map(config, fishInfo, eventManager) {
            this.eventManager = eventManager;
            this._config = Object.assign(Object.create(null), config);
            var gridSizeX = config.gridSizeX,
                gridSizeY = config.gridSizeY,
                gridWidth = config.gridWidth,
                gridHeight = config.gridHeight,
                spawners = config.spawners,
                obstacles = config.obstacles,
                stopPoints = config.stopPoints;
            this.gridSizeX = gridSizeX;
            this.gridSizeY = gridSizeY;
            this.gridWidth = gridWidth;
            this.gridHeight = gridHeight;
            this._config.startX = this.startX = (gridSizeY - gridSizeX) / 2 * (gridWidth / 2);
            this._config.startY = this.startY = (gridSizeX + gridSizeY) / 2 * (gridHeight / 2);
            this._config.spawners = spawners || {};
            this._config.obstacles = obstacles || {};
            this._config.stopPoints = stopPoints || [];
            this._path = []; // [{X,Y},...]

            this._currentPath = "";
            this._findingCount = 0;
            this._badPaths = {};
            this._boundingRects = {};
            this._currentBound = null;
            this._fishes = [];
            this._fishCount = 0;
            this.fishInfo = fishInfo;
            this._fishSize = 1;
            window.map = this;
            this.groupTypes = [[0, 1, 2, 3, 4, 5, 6, 7, 8]];
            this._currentPoint = null;
            this._min = 8;
            this._max = 15;
            this._stopPoints = {};
            this._directions = Object.freeze({
              N: -this.gridSizeX,
              S: this.gridSizeX,
              W: -1,
              E: 1
            });
            this._currentMap = {};
            this._paths = {};
          }

          var _proto = Map.prototype;

          _proto.positionToGrid = function positionToGrid(x, y) {
            var X = Math.floor((x - this.startX) / this.gridWidth + (this.startY - y) / this.gridHeight);
            var Y = Math.floor((this.startY - y) / this.gridHeight - (x - this.startX) / this.gridWidth);
            return {
              X: X,
              Y: Y
            };
          };

          _proto.gridToPosition = function gridToPosition(X, Y) {
            var x = this.startX + (X - Y) * this.gridWidth / 2;
            var y = this.startY - (X + Y) * this.gridHeight / 2;
            return {
              x: x,
              y: y
            };
          };

          _proto.gridCenterToPosition = function gridCenterToPosition(grid, Y) {
            var X = grid;

            if (Y === undefined) {
              X = grid.X;
              Y = grid.Y;
            }

            var x = this.startX + (X - Y) * this.gridWidth / 2;
            var y = this.startY - (X + Y + 1) * this.gridHeight / 2;
            return {
              x: x,
              y: y
            };
          };

          _proto.idToGrid = function idToGrid(gridId) {
            var X = gridId % this.gridSizeX;
            var Y = Math.floor(gridId / this.gridSizeX);
            return {
              X: X,
              Y: Y
            };
          };

          _proto.gridToId = function gridToId(grid, Y) {
            if (grid === undefined) {
              debugger;
            }

            var X = grid;

            if (Y === undefined) {
              X = grid.X;
              Y = grid.Y;
            }

            return Y * this.gridSizeX + X;
          };

          _proto.addObstacle = function addObstacle(gridId) {
            if (this.isOutScreen(gridId)) return;

            if (!this._config.obstacles[gridId]) {
              this._config.obstacles[gridId] = 1;
            } else {
              delete this._config.obstacles[gridId];
            }
          };

          _proto.addSpawner = function addSpawner(gridId) {
            if (this._config.spawners[gridId] === void 0) {
              this._config.spawners[gridId] = 0;
            } else {
              delete this._config.spawners[gridId];
            }
          };

          _proto.addStopPoint = function addStopPoint(gridId) {
            if (this.isOutScreen(gridId)) return;

            this._config.stopPoints.push(gridId);
          };

          _proto.isObstacle = function isObstacle(point) {
            var gridId = typeof point === "number" ? point : this.gridToId(point);
            return this._config.obstacles[gridId];
          };

          _proto.isOutScreen = function isOutScreen(point, Y) {
            var grid, X;

            if (Y === undefined) {
              grid = typeof point === "number" ? this.idToGrid(point) : point;
              X = grid.X;
              Y = grid.Y;
            } else {
              X = point;
            }

            if (X + Y < this.gridSizeX / 2 - 1) return true;
            if (X + Y > this.gridSizeX * 3 / 2) return true;
            if (Y - X > this.gridSizeX / 2 + 1) return true;
            if (X - Y > this.gridSizeX / 2 + 1) return true;
            return false;
          };

          _proto._getArea = function _getArea(X, Y) {
            if (X + Y < this.gridSizeX / 2) return "top";
            if (X + Y > this.gridSizeX * 3 / 2) return "bot";
            if (Y - X > this.gridSizeX / 2) return "left";
            if (X - Y > this.gridSizeX / 2) return "right";
          };

          _proto.refresh = function refresh() {
            this._scanFishes();
          };

          _proto._scanFishes = function _scanFishes() {
            for (var index = this._fishes.length - 1; index >= 0; index--) {
              var fish = this._fishes[index];

              if (fish.isDie) {
                this._fishes.splice(index, 1);
              } else {
                var path = fish.path,
                    buildTick = fish.buildTick;
                var grid = fish.getCurrentGrid();

                var area = this._getArea(grid);
              }
            }
          };

          _proto.resumeFishes = function resumeFishes() {
            var currentFishes = this._fishes.map(function (fishData) {
              return Object.assign(Object.create(null), fishData);
            });

            currentFishes.forEach(function (fishData) {
              return fishData.isResume = true;
            });
            return currentFishes;
          };

          _proto.createFishes = function createFishes() {
            var _this = this;

            var fishList = [];

            for (var index = 0; index < 1; index++) {
              var fishInfo = this.randomElement(Object.values(this.fishInfo));
              var timeStep = fishInfo.timeStep;

              var fishData = this._createNewFish(fishInfo);

              var path = this._genPath(fishInfo.size);

              fishData.timeScale = this.randIntRange(5, 10);
              fishData.Position = path.map(function (grid) {
                return _this.gridToId(grid);
              });
              fishData.timeToExpire = this._getDistance(path) * timeStep;
              fishInfo.buildTick = Date.now();
              fishList.push(fishData);
            }

            return fishList;
          };

          _proto.createFishGroup = function createFishGroup() {
            var _this2 = this;

            var fishList = []; // const startId = this._getSpawner();

            var path = this._genPath(3);

            this.groupType = this.randomElement(this.groupTypes);

            var paths = this._interpolatePath(path);

            var fishInfo = this.randomElement(Object.values(this.fishInfo).slice(0, 6));
            var timeStep = fishInfo.timeStep;
            var timeScale = this.randIntRange(5, 10); // const timeScale = .1 + Math.random() * .5;

            paths.forEach(function (path) {
              var fishData = _this2._createNewFish(fishInfo);

              fishData.timeScale = timeScale;
              fishData.Position = path.map(function (grid) {
                return _this2.gridToId(grid);
              });
              fishData.timeToExpire = _this2._getDistance(path) * timeStep / timeScale;
              fishInfo.buildTick = Date.now();
              fishList.push(fishData);
            });
            return fishList;
          };

          _proto._decoPathData = function _decoPathData() {};

          _proto._interpolatePath = function _interpolatePath(path) {
            var _this3 = this;

            var paths = [];

            var _loop = function _loop(offsetX) {
              var _loop2 = function _loop2(offsetY) {
                if (!_this3.groupType.includes(3 * (offsetY + 1) + (offsetX + 1))) return "continue";
                var newPath = [];
                path.forEach(function (_ref) {
                  var X = _ref.X,
                      Y = _ref.Y;
                  newPath.push({
                    X: X + offsetX,
                    Y: Y + offsetY
                  });
                });
                paths.push(newPath);
              };

              for (var offsetY = -1; offsetY <= 1; offsetY++) {
                var _ret = _loop2(offsetY);

                if (_ret === "continue") continue;
              }
            };

            for (var offsetX = -1; offsetX <= 1; offsetX++) {
              _loop(offsetX);
            }

            return paths;
          };

          _proto._createNewFish = function _createNewFish(fishInfo) {
            var fishData = {};
            var FishKind = fishInfo.FishKind;
            fishData.FishKind = FishKind;
            fishData.FishID = ++this._fishCount;
            fishData.dx = this.randIntRange(-this.gridWidth / 2.5, this.gridWidth / 2.5);
            fishData.dy = this.randIntRange(-this.gridHeight / 2.5, this.gridHeight / 2.5);
            return fishData;
          };

          _proto._getDistance = function _getDistance(path) {
            var len = path.length;
            var distance = 0;

            for (var index = 1; index < len; index++) {
              var p1 = path[index - 1];
              var p2 = path[index];
              distance += Math.abs(p2.X - p1.X + p2.Y - p1.Y);
            }

            return distance;
          };

          _proto.shuffleArr = function shuffleArr(arr) {
            return arr.slice().sort(function () {
              return Math.random() - 0.5;
            });
          };

          _proto._genPath = function _genPath(size) {
            var _this4 = this;

            if (size === void 0) {
              size = 1;
            }

            var spawners = this._config.spawners;
            var sortSpawners = this.shuffleArr(Object.keys(spawners)).sort(function (a, b) {
              return spawners[a] - spawners[b];
            });
            var startId = sortSpawners[0];
            var endId = sortSpawners[1];
            spawners[startId]++;
            spawners[endId]++;
            this._path = [];
            this._fishSize = size;
            var stopIds = this.pickOutRandomElements(this._config.stopPoints, 1);
            stopIds.unshift(startId);
            stopIds.push(endId);
            var stopPoints = stopIds.map(function (gridId) {
              return _this4._interpolate(_this4.idToGrid(gridId));
            });
            this.eventManager.emit("RENDER_BLOCK", stopPoints[1].X, stopPoints[1].Y);
            this.eventManager.emit("RENDER_BLOCK", stopPoints[2].X, stopPoints[2].Y);
            var start = stopPoints[0];

            this._path.push(start);

            for (var index = 1; index < stopPoints.length; index++) {
              var prev = stopPoints[index - 1];
              var cur = stopPoints[index];

              this._findPath(prev, cur);
            }

            return this._path;
          };

          _proto._interpolate = function _interpolate(_ref2) {
            var X = _ref2.X,
                Y = _ref2.Y;
            if (this._fishSize === 3) return {
              X: X,
              Y: Y
            };
            return {
              X: this.randIntRange(X - 1, X + 1),
              Y: this.randIntRange(Y - 1, Y + 1)
            };
          };

          _proto._findPath = function _findPath(p1, p4) {
            var _this5 = this;

            this._currentBound = this._getBounding(p1, p4);

            if (p1.X === p4.X || p1.Y === p4.Y && this._validateLine(p1, p4)) {
              this._path.push(p4);
            } else {
              var points = this._findMiddlePoint(p1, p4);

              if (!points) {
                debugger;
              }

              points.forEach(function (point) {
                _this5._path.push(point);
              });
            }

            var len = this._path.length;
            var cur = this._path[len - 1];
            var prev = this._path[len - 2];
            this._currentDirection = this._getDirection(prev, cur);
            console.error(this._currentDirection);
          };

          _proto._getDirection = function _getDirection(p1, p2) {
            if (p1.Y > p2.Y) return -this.gridSizeX;
            if (p1.Y < p2.Y) return this.gridSizeX;
            if (p1.X > p2.X) return -1;
            if (p1.X < p2.X) return 1;
          };

          _proto._findMiddlePoint = function _findMiddlePoint(p1, p4) {
            var p2 = {
              X: p1.X,
              Y: p4.Y
            };

            if (this._canMove(p2) && this._validateLine(p1, p2) && this._validateLine(p1, p2)) {
              var direction = this._getDirection(p1, p2);

              if (this._currentDirection + direction !== 0) return [p2, p4];
            }

            p2 = {
              X: p4.X,
              Y: p1.Y
            };

            if (this._canMove(p2) && this._validateLine(p1, p2) && this._validateLine(p1, p2)) {
              var _direction = this._getDirection(p1, p2);

              if (this._currentDirection + _direction !== 0) return [p2, p4];
            }

            return this._getMiddlePoints();
          };

          _proto._getBounding = function _getBounding(p1, p4) {
            var path = this.gridToId(p1) + ";" + this.gridToId(p4);
            if (this._boundingRects[path]) return this._boundingRects;
            var halfSize = this.gridSizeX / 2;
            var X, Y, minX, maxX, minY, maxY;
            X = Math.abs(p1.X - halfSize) > Math.abs(p4.X - halfSize) ? p1.X : p4.X;

            if (X > halfSize) {
              minY = X - halfSize;
              maxY = 3 * halfSize - X;
            } else {
              minY = halfSize - X;
              maxY = halfSize + X;
            }

            Y = Math.abs(p1.Y - halfSize / 2) > Math.abs(p4.Y - halfSize / 2) ? p1.Y : p4.Y;

            if (Y > halfSize) {
              minX = Y - halfSize;
              maxX = 3 * halfSize - Y;
            } else {
              minX = halfSize - Y;
              maxX = halfSize + Y;
            }

            return {
              minX: minX,
              maxX: maxX,
              minY: minY,
              maxY: maxY,
              p1: p1,
              p4: p4,
              count: 0
            };
          };

          _proto._getMiddlePoints = function _getMiddlePoints() {
            try {
              var _this$_currentBound = this._currentBound,
                  minX = _this$_currentBound.minX,
                  maxX = _this$_currentBound.maxX,
                  minY = _this$_currentBound.minY,
                  maxY = _this$_currentBound.maxY,
                  p1 = _this$_currentBound.p1,
                  p4 = _this$_currentBound.p4;
              var p2, p3;
              this._currentBound.count++;
              var rand = Math.random();

              if (rand > 0.5) {
                var X = this.randIntRange(minX, maxX);
                p2 = {
                  X: X,
                  Y: p1.Y
                };
                p3 = {
                  X: X,
                  Y: p4.Y
                };
              } else {
                var Y = this.randIntRange(minY, maxY);
                p2 = {
                  X: p1.X,
                  Y: Y
                };
                p3 = {
                  X: p4.X,
                  Y: Y
                };
              }

              var direction = this._getDirection(p1, p2);

              console.error(direction, this._currentDirection);
              if (this.isOutScreen(p2) || this.isOutScreen(p3)) return this._getMiddlePoints();
              if (!this._validateLine(p1, p2)) return this._getMiddlePoints();
              if (!this._validateLine(p2, p3)) return this._getMiddlePoints();
              if (!this._validateLine(p3, p4)) return this._getMiddlePoints();
              if (this._currentDirection + direction === 0) return this._getMiddlePoints();
              return [p2, p3, p4];
            } catch (error) {
              console.error(this._boundingRects);
            }
          };

          _proto._randomExcept = function _randomExcept(min, max) {
            var value = this.randIntRange(min, max);

            for (var _len = arguments.length, exceptions = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
              exceptions[_key - 2] = arguments[_key];
            }

            return exceptions.includes(value) ? this._randomExcept.apply(this, [min, max].concat(exceptions)) : value;
          };

          _proto._validateLine = function _validateLine(p1, p2) {
            if (p1.X !== p2.X && p1.Y !== p2.Y) {
              debugger;
              return false;
            }

            var offset = (this._fishSize - 1) / 2;

            for (var X = Math.min(p1.X, p2.X) - offset; X <= Math.max(p1.X, p2.X) + offset; X++) {
              for (var Y = Math.min(p1.Y, p2.Y) - offset; Y <= Math.max(p1.Y, p2.Y) + offset; Y++) {
                var gridId = Y * this.gridSizeX + X;
                if (this.isObstacle(gridId)) return false;
              }
            }

            return true;
          };

          _proto._canMove = function _canMove(point, Y) {
            var X = point;

            if (typeof Y === "number") {
              point = {
                X: X,
                Y: Y
              };
            } else {
              X = point.X;
            }

            var offset = (this._fishSize - 1) / 2;

            for (var x = X - offset; x <= X + offset; x++) {
              for (var y = Y - offset; y <= Y + offset; y++) {
                var id = this.gridToId(x, y);
                if (this.isObstacle(id)) return false;
                if (this.isOutScreen(id)) return false;
              }
            }

            return true;
          };

          _proto._getNextGrid = function _getNextGrid(direction) {
            return this._currentId + this._moveStep[direction];
          };

          _proto.randomElement = function randomElement(arr) {
            if (!arr) debugger;
            return arr[Math.floor(Math.random() * arr.length)];
          };

          _proto.randIntRange = function randIntRange(min, max) {
            return min + Math.round(Math.random() * (max - min));
          };

          _proto.pickOutRandomElements = function pickOutRandomElements(arr, total) {
            if (arr.length < total) return console.error("invalid arr", arr, total);
            var shuffleArr = arr.slice().sort(function () {
              return Math.random() - 0.5;
            });
            return shuffleArr.slice(0, total);
          };

          _proto.getConfig = function getConfig() {
            return this._config;
          };

          _proto.clear = function clear() {
            this._config.spawners = {};
            this._config.obstacles = {};
            this._config.stopPoints = [];
          };

          _proto._findShortedPath = function _findShortedPath(p1, p4) {
            if (p1.X === p4.X) {
              if (this._validateLine(p1, p4)) {
                this.eventManager.emit("DRAW_LINE", p1, p4);
              } else {
                this._currentBound = this._getBounding(p1, p4);
                console.error(this._currentBound);
              }
            }

            if (p1.Y === p4.Y) {
              if (this._validateLine(p1, p4)) {
                this.eventManager.emit("DRAW_LINE", p1, p4);
              } else {
                this._currentBound = this._getBounding(p1, p4);
                console.error(this._currentBound);
              }
            }

            var p2 = {
              X: p1.X,
              Y: p4.Y
            };

            if (this._canMove(p2) && this._validateLine(p1, p2) && this._validateLine(p1, p2)) {
              this.eventManager.emit("DRAW_LINE", p1, p2);
              this.eventManager.emit("DRAW_LINE", p2, p4);
            }

            p2 = {
              X: p4.X,
              Y: p1.Y
            };

            if (this._canMove(p2) && this._validateLine(p1, p2) && this._validateLine(p1, p2)) {
              this.eventManager.emit("DRAW_LINE", p1, p2);
              this.eventManager.emit("DRAW_LINE", p2, p4);
            }
          };

          _proto.drawAllPaths = function drawAllPaths() {
            var _this6 = this;

            var spawners = this.spawnerList;
            spawners.forEach(function (startId) {
              spawners.forEach(function (endId) {
                var p1 = _this6.idToGrid(startId);

                var p4 = _this6.idToGrid(endId);

                if (startId !== endId) _this6._findShortedPath(p1, p4);
              });
            });
          };

          _proto._runTest = function _runTest(p1, p2) {
            var _this7 = this;

            var id1 = this.gridToId(p1);
            var id2 = this.gridToId(p2);
            this._currentDirection = null;
            this._paths = [];

            var result = this._findAllPaths(id1, id2);

            result.forEach(function (path) {
              for (var index = 1; index < path.length; index++) {
                var _p = _this7.idToGrid(path[index - 1]);

                var _p2 = _this7.idToGrid(path[index]);

                _this7.eventManager.emit("DRAW_LINE", _p, _p2);
              }
            });
            return this._testGenPaths(result);
          };

          _proto._testGenPaths = function _testGenPaths(paths) {
            var _this8 = this;

            var fishList = [];
            var fishInfo = this.randomElement(Object.values(this.fishInfo).slice(0, 6));
            var timeStep = fishInfo.timeStep;
            var timeScale = this.randIntRange(3, 5);
            paths.forEach(function (path) {
              var fishData = _this8._createNewFish(fishInfo);

              fishData.timeScale = timeScale;
              fishData.Position = path.slice();
              fishData.timeToExpire = _this8._getDistance(path) * timeStep / timeScale;
              fishInfo.buildTick = Date.now();
              fishList.push(fishData);
            });
            return fishList;
          };

          _proto._findAllPaths = function _findAllPaths(id1, id2, path) {
            var _this9 = this;

            if (path === void 0) {
              path = [];
            }

            if (!path.includes(id1)) {
              path.push(id1);
            }

            var directions = Object.keys(this._directions);
            directions.forEach(function (direction) {
              var nextId = id1 + 3 * _this9._directions[direction];
              if (path.includes(nextId)) return;
              if (!_this9._isCanMove(nextId)) return;
              var clone = path.slice();

              if (nextId === id2) {
                clone.push(nextId);

                _this9._paths.push(clone);
              } else {
                _this9._findAllPaths(nextId, id2, clone);
              }
            });
            return this._paths;
          };

          _proto.genPath = function genPath() {
            this._action = ActionType.GEN_PATH;
            this._p1 = null;
            this._p2 = null;
          };

          _proto._genPath = function _genPath(point) {
            if (point.X % 3 !== 1 || point.Y % 3 !== 1) return;

            if (this._p1 === null) {
              this._p1 = point;
              this.renderBlock(point.X, point.Y);
              return;
            } else {
              this._p2 = point;
              this.renderBlock(point.X, point.Y);

              var path = this._map.getRandomPath(this._p1, this._p2);

              if (path) {
                this.clearPath();
                this.drawPath(path);
              }

              this._p1 = null;
              this._p2 = null;
            }
          };

          _createClass(Map, [{
            key: "spawnerList",
            get: function get() {
              if (!this._config || !this._config.spawners) return [];
              return Object.keys(this._config.spawners);
            }
          }]);

          return Map;
        }();

        module.exports = Map;
        module.exports.Map = Map; // #endregion ORIGINAL CODE

        _cjsExports = exports('default', module.exports);
        module.exports.Map;
      }, {});
    }
  };
});

System.register("chunks:///_virtual/archive.mjs_cjs=&original=.js", ['./archive.js', './cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var __cjsMetaURL, loader;

  return {
    setters: [function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }, function (module) {
      loader = module.default;
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './archive.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./archive.js', module.meta.url);
      }

      loader.require(__cjsMetaURL);
    }
  };
});

System.register("chunks:///_virtual/cjs-loader.mjs", [], function (exports) {
  'use strict';

  return {
    execute: function () {
      var CjsLoader = /*#__PURE__*/function () {
        function CjsLoader() {
          this._registry = {};
          this._moduleCache = {};
        }
        /**
         * Defines a CommonJS module.
         * @param id Module ID.
         * @param factory The factory.
         * @param resolveMap An object or a function returning object which records the module specifier resolve result.
         * The later is called as "deferred resolve map" and would be invocated right before CommonJS code execution.
         */


        var _proto = CjsLoader.prototype;

        _proto.define = function define(id, factory, resolveMap) {
          this._registry[id] = {
            factory: factory,
            resolveMap: resolveMap
          };
        }
        /**
         * Requires a CommonJS module.
         * @param id Module ID.
         * @returns The module's `module.exports`.
         */
        ;

        _proto.require = function require(id) {
          return this._require(id);
        };

        _proto.throwInvalidWrapper = function throwInvalidWrapper(requestTarget, from) {
          throw new Error("Module '" + requestTarget + "' imported from '" + from + "' is expected be an ESM-wrapped CommonJS module but it doesn't.");
        };

        _proto._require = function _require(id, parent) {
          var cachedModule = this._moduleCache[id];

          if (cachedModule) {
            return cachedModule.exports;
          }

          var module = {
            id: id,
            exports: {}
          };
          this._moduleCache[id] = module;

          this._tryModuleLoad(module, id);

          return module.exports;
        };

        _proto._resolve = function _resolve(specifier, parent) {
          return this._resolveFromInfos(specifier, parent) || this._throwUnresolved(specifier, parent);
        };

        _proto._resolveFromInfos = function _resolveFromInfos(specifier, parent) {
          var _cjsInfos$parent$reso, _cjsInfos$parent;

          if (specifier in cjsInfos) {
            return specifier;
          }

          if (!parent) {
            return;
          }

          return (_cjsInfos$parent$reso = (_cjsInfos$parent = cjsInfos[parent]) == null ? void 0 : _cjsInfos$parent.resolveCache[specifier]) != null ? _cjsInfos$parent$reso : undefined;
        };

        _proto._tryModuleLoad = function _tryModuleLoad(module, id) {
          var threw = true;

          try {
            this._load(module, id);

            threw = false;
          } finally {
            if (threw) {
              delete this._moduleCache[id];
            }
          }
        };

        _proto._load = function _load(module, id) {
          var _this$_loadWrapper = this._loadWrapper(id),
              factory = _this$_loadWrapper.factory,
              resolveMap = _this$_loadWrapper.resolveMap;

          var vendorRequire = this._createRequire(module);

          var require = resolveMap ? this._createRequireWithResolveMap(typeof resolveMap === 'function' ? resolveMap() : resolveMap, vendorRequire) : vendorRequire;

          factory(module.exports, require, module);
        };

        _proto._loadWrapper = function _loadWrapper(id) {
          if (id in this._registry) {
            return this._registry[id];
          } else {
            return this._loadHostProvidedModules(id);
          }
        };

        _proto._loadHostProvidedModules = function _loadHostProvidedModules(id) {
          return {
            factory: function factory(_exports, _require, module) {
              if (typeof require === 'undefined') {
                throw new Error("Current environment does not provide a require() for requiring '" + id + "'.");
              }

              try {
                module.exports = require(id);
              } catch (err) {
                throw new Error("Exception thrown when calling host defined require('" + id + "').", {
                  cause: err
                });
              }
            }
          };
        };

        _proto._createRequire = function _createRequire(module) {
          var _this = this;

          return function (specifier) {
            return _this._require(specifier, module);
          };
        };

        _proto._createRequireWithResolveMap = function _createRequireWithResolveMap(requireMap, originalRequire) {
          return function (specifier) {
            var resolved = requireMap[specifier];

            if (resolved) {
              return originalRequire(resolved);
            } else {
              throw new Error('Unresolved specifier ' + specifier);
            }
          };
        };

        _proto._throwUnresolved = function _throwUnresolved(specifier, parentUrl) {
          throw new Error("Unable to resolve " + specifier + " from " + parent + ".");
        };

        return CjsLoader;
      }();

      var loader = exports('default', new CjsLoader());
    }
  };
});

System.register("chunks:///_virtual/events.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);

      loader.define(__cjsMetaURL, function (exports$1, require, module, __filename, __dirname) {
        var R = typeof Reflect === 'object' ? Reflect : null;
        var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
          return Function.prototype.apply.call(target, receiver, args);
        };
        var ReflectOwnKeys;

        if (R && typeof R.ownKeys === 'function') {
          ReflectOwnKeys = R.ownKeys;
        } else if (Object.getOwnPropertySymbols) {
          ReflectOwnKeys = function ReflectOwnKeys(target) {
            return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
          };
        } else {
          ReflectOwnKeys = function ReflectOwnKeys(target) {
            return Object.getOwnPropertyNames(target);
          };
        }

        function ProcessEmitWarning(warning) {
          if (console && console.warn) console.warn(warning);
        }

        var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
          return value !== value;
        };

        function EventEmitter() {
          EventEmitter.init.call(this);
        }

        if ("object" == typeof exports$1 && "undefined" != typeof module) {
          module.exports = EventEmitter;
          module.exports.once = once;
        } else if ("function" == typeof define && define.amd) define([], EventEmitter);else {
          var r;
          r = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, r.EventEmitter = EventEmitter;
        } // Backwards-compat with node 0.10.x


        EventEmitter.EventEmitter = EventEmitter;
        EventEmitter.prototype._events = undefined;
        EventEmitter.prototype._eventsCount = 0;
        EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
        // added to it. This is a useful default which helps finding memory leaks.

        var defaultMaxListeners = 10;

        function checkListener(listener) {
          if (typeof listener !== 'function') {
            throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
          }
        }

        Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
          enumerable: true,
          get: function get() {
            return defaultMaxListeners;
          },
          set: function set(arg) {
            if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
              throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
            }

            defaultMaxListeners = arg;
          }
        });

        EventEmitter.init = function () {
          if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
            this._events = Object.create(null);
            this._eventsCount = 0;
          }

          this._maxListeners = this._maxListeners || undefined;
        }; // Obviously not all Emitters should be limited to 10. This function allows
        // that to be increased. Set to zero for unlimited.


        EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
          if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
            throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
          }

          this._maxListeners = n;
          return this;
        };

        function _getMaxListeners(that) {
          if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
          return that._maxListeners;
        }

        EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
          return _getMaxListeners(this);
        };

        EventEmitter.prototype.emit = function emit(type) {
          var args = [];

          for (var i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
          }

          var doError = type === 'error';
          var events = this._events;
          if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false; // If there is no 'error' event listener then throw.

          if (doError) {
            var er;
            if (args.length > 0) er = args[0];

            if (er instanceof Error) {
              // Note: The comments on the `throw` lines are intentional, they show
              // up in Node's output if this results in an unhandled exception.
              throw er; // Unhandled 'error' event
            } // At least give some kind of context to the user


            var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
            err.context = er;
            throw err; // Unhandled 'error' event
          }

          var handler = events[type];
          if (handler === undefined) return false;

          if (typeof handler === 'function') {
            ReflectApply(handler, this, args);
          } else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);

            for (var i = 0; i < len; ++i) {
              ReflectApply(listeners[i], this, args);
            }
          }

          return true;
        };

        function _addListener(target, type, listener, prepend) {
          var m;
          var events;
          var existing;
          checkListener(listener);
          events = target._events;

          if (events === undefined) {
            events = target._events = Object.create(null);
            target._eventsCount = 0;
          } else {
            // To avoid recursion in the case that type === "newListener"! Before
            // adding it to the listeners, first emit "newListener".
            if (events.newListener !== undefined) {
              target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
              // this._events to be assigned to a new object

              events = target._events;
            }

            existing = events[type];
          }

          if (existing === undefined) {
            // Optimize the case of one listener. Don't need the extra array object.
            existing = events[type] = listener;
            ++target._eventsCount;
          } else {
            if (typeof existing === 'function') {
              // Adding the second element, need to change to array.
              existing = events[type] = prepend ? [listener, existing] : [existing, listener]; // If we've already got an array, just append.
            } else if (prepend) {
              existing.unshift(listener);
            } else {
              existing.push(listener);
            } // Check for listener leak


            m = _getMaxListeners(target);

            if (m > 0 && existing.length > m && !existing.warned) {
              existing.warned = true; // No error code for this since it is a Warning
              // eslint-disable-next-line no-restricted-syntax

              var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
              w.name = 'MaxListenersExceededWarning';
              w.emitter = target;
              w.type = type;
              w.count = existing.length;
              ProcessEmitWarning(w);
            }
          }

          return target;
        }

        EventEmitter.prototype.addListener = function addListener(type, listener) {
          return _addListener(this, type, listener, false);
        };

        EventEmitter.prototype.on = EventEmitter.prototype.addListener;

        EventEmitter.prototype.prependListener = function prependListener(type, listener) {
          return _addListener(this, type, listener, true);
        };

        function onceWrapper() {
          if (!this.fired) {
            this.target.removeListener(this.type, this.wrapFn);
            this.fired = true;
            if (arguments.length === 0) return this.listener.call(this.target);
            return this.listener.apply(this.target, arguments);
          }
        }

        function _onceWrap(target, type, listener) {
          var state = {
            fired: false,
            wrapFn: undefined,
            target: target,
            type: type,
            listener: listener
          };
          var wrapped = onceWrapper.bind(state);
          wrapped.listener = listener;
          state.wrapFn = wrapped;
          return wrapped;
        }

        EventEmitter.prototype.once = function once(type, listener) {
          checkListener(listener);
          this.on(type, _onceWrap(this, type, listener));
          return this;
        };

        EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
          checkListener(listener);
          this.prependListener(type, _onceWrap(this, type, listener));
          return this;
        }; // Emits a 'removeListener' event if and only if the listener was removed.


        EventEmitter.prototype.removeListener = function removeListener(type, listener) {
          var list, events, position, i, originalListener;
          checkListener(listener);
          events = this._events;
          if (events === undefined) return this;
          list = events[type];
          if (list === undefined) return this;

          if (list === listener || list.listener === listener) {
            if (--this._eventsCount === 0) this._events = Object.create(null);else {
              delete events[type];
              if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
            }
          } else if (typeof list !== 'function') {
            position = -1;

            for (i = list.length - 1; i >= 0; i--) {
              if (list[i] === listener || list[i].listener === listener) {
                originalListener = list[i].listener;
                position = i;
                break;
              }
            }

            if (position < 0) return this;
            if (position === 0) list.shift();else {
              spliceOne(list, position);
            }
            if (list.length === 1) events[type] = list[0];
            if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
          }

          return this;
        };

        EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

        EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
          var listeners, events, i;
          events = this._events;
          if (events === undefined) return this; // not listening for removeListener, no need to emit

          if (events.removeListener === undefined) {
            if (arguments.length === 0) {
              this._events = Object.create(null);
              this._eventsCount = 0;
            } else if (events[type] !== undefined) {
              if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
            }

            return this;
          } // emit removeListener for all listeners on all events


          if (arguments.length === 0) {
            var keys = Object.keys(events);
            var key;

            for (i = 0; i < keys.length; ++i) {
              key = keys[i];
              if (key === 'removeListener') continue;
              this.removeAllListeners(key);
            }

            this.removeAllListeners('removeListener');
            this._events = Object.create(null);
            this._eventsCount = 0;
            return this;
          }

          listeners = events[type];

          if (typeof listeners === 'function') {
            this.removeListener(type, listeners);
          } else if (listeners !== undefined) {
            // LIFO order
            for (i = listeners.length - 1; i >= 0; i--) {
              this.removeListener(type, listeners[i]);
            }
          }

          return this;
        };

        function _listeners(target, type, unwrap) {
          var events = target._events;
          if (events === undefined) return [];
          var evlistener = events[type];
          if (evlistener === undefined) return [];
          if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
          return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
        }

        EventEmitter.prototype.listeners = function listeners(type) {
          return _listeners(this, type, true);
        };

        EventEmitter.prototype.rawListeners = function rawListeners(type) {
          return _listeners(this, type, false);
        };

        EventEmitter.listenerCount = function (emitter, type) {
          if (typeof emitter.listenerCount === 'function') {
            return emitter.listenerCount(type);
          } else {
            return listenerCount.call(emitter, type);
          }
        };

        EventEmitter.prototype.listenerCount = listenerCount;

        function listenerCount(type) {
          var events = this._events;

          if (events !== undefined) {
            var evlistener = events[type];

            if (typeof evlistener === 'function') {
              return 1;
            } else if (evlistener !== undefined) {
              return evlistener.length;
            }
          }

          return 0;
        }

        EventEmitter.prototype.eventNames = function eventNames() {
          return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
        };

        function arrayClone(arr, n) {
          var copy = new Array(n);

          for (var i = 0; i < n; ++i) {
            copy[i] = arr[i];
          }

          return copy;
        }

        function spliceOne(list, index) {
          for (; index + 1 < list.length; index++) {
            list[index] = list[index + 1];
          }

          list.pop();
        }

        function unwrapListeners(arr) {
          var ret = new Array(arr.length);

          for (var i = 0; i < ret.length; ++i) {
            ret[i] = arr[i].listener || arr[i];
          }

          return ret;
        }

        function once(emitter, name) {
          return new Promise(function (resolve, reject) {
            function eventListener() {
              if (errorListener !== undefined) {
                emitter.removeListener('error', errorListener);
              }

              resolve([].slice.call(arguments));
            }

            var errorListener; // Adding an error listener is not optional because
            // if an error is thrown on an event emitter we cannot
            // guarantee that the actual event we are waiting will
            // be fired. The result could be a silent way to create
            // memory or file descriptor leaks, which is something
            // we should avoid.

            if (name !== 'error') {
              errorListener = function errorListener(err) {
                emitter.removeListener(name, eventListener);
                reject(err);
              };

              emitter.once('error', errorListener);
            }

            emitter.once(name, eventListener);
          });
        } // #endregion ORIGINAL CODE


        _cjsExports = exports('default', module.exports);
        module.exports.once;
      }, {});
    }
  };
});

System.register("chunks:///_virtual/events.mjs_cjs=&original=.js", ['./events.js', './cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var __cjsMetaURL, loader;

  return {
    setters: [function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }, function (module) {
      loader = module.default;
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './events.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./events.js', module.meta.url);
      }

      loader.require(__cjsMetaURL);
    }
  };
});

System.register("chunks:///_virtual/Fish.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);

      loader.define(__cjsMetaURL, function (exports$1, require, module, __filename, __dirname) {
        _cjsExports = exports('default', module.exports);
      }, {});
    }
  };
});

System.register("chunks:///_virtual/Fish.mjs_cjs=&original=.js", ['./Fish.js', './cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var __cjsMetaURL, loader;

  return {
    setters: [function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }, function (module) {
      loader = module.default;
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './Fish.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./Fish.js', module.meta.url);
      }

      loader.require(__cjsMetaURL);
    }
  };
});

System.register("chunks:///_virtual/FishConfig.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);

      loader.define(__cjsMetaURL, function (exports$1, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        module.exports = {
          FishInfo: {
            1: {
              kind: 1,
              size: 1,
              timeStep: 1,
              payout: 5
            },
            2: {
              kind: 1,
              size: 1,
              timeStep: 1,
              payout: 5
            },
            3: {
              kind: 1,
              size: 1,
              timeStep: 1,
              payout: 5
            },
            4: {
              kind: 1,
              size: 1,
              payout: 5
            },
            5: {
              kind: 1,
              size: 1,
              timeStep: 1,
              payout: 5
            },
            6: {
              kind: 1,
              size: 1,
              timeStep: 1,
              payout: 5
            },
            7: {
              kind: 1,
              size: 1,
              payout: 5,
              timeStep: 1
            },
            8: {
              kind: 1,
              size: 1,
              payout: 5,
              timeStep: 1
            },
            9: {
              kind: 9,
              size: 1,
              payout: 5,
              timeStep: 1
            },
            10: {
              kind: 9,
              size: 1,
              payout: 5,
              timeStep: 1
            }
          }
        }; // #endregion ORIGINAL CODE

        _cjsExports = exports('default', module.exports);
      }, {});
    }
  };
});

System.register("chunks:///_virtual/FishConfig.mjs_cjs=&original=.js", ['./FishConfig.js', './cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var __cjsMetaURL, loader;

  return {
    setters: [function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }, function (module) {
      loader = module.default;
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './FishConfig.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./FishConfig.js', module.meta.url);
      }

      loader.require(__cjsMetaURL);
    }
  };
});

System.register("chunks:///_virtual/game-network.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);

      loader.define(__cjsMetaURL, function (exports$1, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        function a1_0x1adc(_0x1f9f73, _0x45e474) {
          var _0x4180d4 = a1_0x4180();

          return a1_0x1adc = function a1_0x1adc(_0x1adc85, _0xaeee2f) {
            _0x1adc85 = _0x1adc85 - 0x109;
            var _0x4258ce = _0x4180d4[_0x1adc85];
            return _0x4258ce;
          }, a1_0x1adc(_0x1f9f73, _0x45e474);
        }

        function a1_0x4180() {
          var _0x21027a = ['wallet-updated', 'generateId', 'user-logged-out:\x20%j', 'currentLatencyIdx', 'maybeReconnectOnOpen', 'onCannotSendMessage', 'rememberUpgrade', 'receiveBuffer', '\x22%s\x22\x20works\x20-\x20aborting\x20\x22%s\x22', 'COMMAND_FAILED_RETRY', '_serverSocketVersion', 'encodePayloadAsArrayBuffer', '#3300CC', 'MessageManager\x20-\x20_initSocket.', 'forEach', 'finishedReconstruction', 'second', 'walletVersion', 'waitForEvent', '_keyAB', 'managers', 'charAt', 'withCredentials', 'engine.io-client:socket', 'state-pushed', '#CC0000', 'delete', 'millisecond', 'constructor', 'hasPromotionWalletType', 'floor', '_duplicateEventId', '_startIntervalExtendToken', 'pingTimeoutTimer', '_subscribe', 'timestampParam', 'SocketManager\x20-\x20send\x20message:\x20counter=%s,\x20messageId=%s', '_events', 'pAmount', '#66CC33', '__importDefault', 'color:\x20', 'poor-connection', 'encodePayload', 'iterator', '&env=', 'removeWaiting', 'packetCreate', 'will\x20wait\x20%dms\x20before\x20reconnect\x20attempt', '#3333FF', 'ontimeout', 'STATUS_KILLED', 'getWalletTypes', 'option', 'transports', 'attempts', 'CommandManager', 'isNaN', 'updateSocketIds', 'fromCharCode', 'subEvents', 'requestsCount', 'reconnectionAttempts', 'EIO', 'pVer', '#6633FF', 'isView', 'engine', 'createTransport', 'forceNew', 'pause', 'year', 'reconstructor', '_commandIdFieldName', 'EVENT', 'buffers', 'setJitter', 'isFull', 'CommandManager\x20%s\x20-\x20clean\x20up', 'onDrain', 'threshold', 'Deferred', 'invalid\x20payload', 'DISCONNECT', 'parser\x20error:\x20', 'Accept', 'onopen', '\x20listeners\x20added.\x20Use\x20emitter.setMaxListeners()\x20to\x20increase\x20limit', '_buildPacket', 'SOCKET_REQUEST_EVENT_V4', 'sid', 'setRequestHeader', 'byteLength', 'charCodeAt', 'form', 'isArray', 'readyState', '3032792qPoQLa', 'upgrades', '#CC3366', 'uri', 'compress', '_validateDublicateCommandType', 'removeBlobs', 'val\x20is\x20not\x20a\x20non-empty\x20string\x20or\x20a\x20valid\x20number.\x20val=', 'num', 'arraybuffer', 'array', 'addEventListener', 'supports', 'createElement', 'application/octet-stream', 'unSubscribe', '#CC3333', 'pre-pause\x20writing\x20complete', 'xscheme', 'MessageManager\x20-\x20_handleSocketStatus\x20with\x20null\x20_socketManager', 'io\x20server\x20disconnect', '#99CC00', 'ondecoded', 'ping', 'load', 'availableAmount', 'beforeunload', 'socket\x20closed', 'reset', 'pagehide', 'colors', 'pong', 'autoConnect', 'keys', 'multi', 'CommandManager\x20%s\x20-\x20resendMessage:\x20messageId=%s,\x20resendMessageId=%s,\x20numberResend=%s,\x20resendCount=%s', 'cert', 'wrapFn', '#CC3300', '_close', 'polling\x20got\x20data\x20%s', '&sv=', '_getPacketType', 'MessageManager\x20-\x20sendMessage:\x20%s\x20-\x20%j', 'closing', 'drain', 'success', 'PONG_EVENT', 'reconnect_attempt', '_encrypt', 'TextEncoder', 'polling', 'flush', 'rawListeners', 'setMin', 'doClose', 'SocketManager\x20-\x20Add\x20message\x20to\x20queue:\x20%j', '_reconnect_attempt', '_countPingOverTime', 'Illegal\x20attachments', 'pop', 'getInstance', 'onHeartbeat', 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', 'reconnect\x20attempt\x20error', 'iteratePacket', 'getMaxListeners', '#33CC33', 'eventNames', 'has', 'abort', 'error-pushed', 'hrs', 'probe', 'payload', 'maxConcurrentCommand', 'xhr\x20poll', 'setDisableHeaderCheck', 'parse', 'decodePayload', 'readAsDataURL', 'script', 'pingIntervalTimer', 'getBlob', 'doWrite', 'password', 'force-disconnect', 'Object', 'emit', 'ondisconnect', 'documentElement', 'SocketManager\x20-\x20emit\x20event\x20can-not-connect!', 'listLastLatency', 'defineProperty', '_commandHandlerMap', 'can-not-send-message', 'priorWebsocketSuccess', 'bind', 'reconnect_error', 'chat-event', 'ondata', 'shouldWaitForACK', 'removeEventListener', 'complete', 'probing\x20transport\x20\x22%s\x22', 'onreadystatechange', 'getPromise', 'now', 'blob', 'SocketManager\x20-\x20Clear\x20interval\x20sending\x20message!', '0000', '#CC00FF', 'packet', 'listeners', 'toUpperCase', 'off', 'prependOnceListener', 'timestampRequests', 'toLowerCase', 'socket-info', 'reactnative', 'ceil', '_handleReponseMessage', 'performing\x20disconnect\x20(%s)', 'paused', 'userId', 'onClose', 'backoff', 'shift', 'Invalid\x20continuation\x20byte', 'text/plain;charset=UTF-8', 'SOCKET_RESPONSE_EVENT_V5_2', 'usingBrowserWebSocket', '#FF6633', '#CC9900', 'startsWith', 'console', 'xhr', 'indexOf', 'eventId', 'changing\x20transport\x20and\x20sending\x20upgrade\x20packet', 'top', '_reconnectionAttempts', 'CommandManager\x20%s\x20-\x20COMMAND_FAILED_DUPLICATE.\x20Executing\x20type:\x20%j', 'XMLHttpServiceRest', 'passphrase', 'jitter', '#CC0099', '#FF3366', 'probe\x20error:\x20', 'ping-event', '#FF0099', 'once', 'write', 'Socket', 'body', 'upgrading', 'onlyBinaryUpgrades', 'serviceId', 'popup-disconnected-event', 'secure', 'concat', 'filterUpgrades', '_timeout', '#0066FF', 'decoded', 'onerror', 'CAN_NOT_CONNECT_EVENT', 'jsonp\x20poll\x20error', 'buffer', 'EventManager\x20-\x20connected.', 'maxRetry', '#CC0066', 'randomizationFactor', 'error', 'deconstructPacket', 'urlVerifyToken', 'encoded\x20%j\x20as\x20%s', 'https://', 'PlayerInfoStateManager', 'maxSize', 'SocketManager\x20status\x20KILLED,\x20not\x20init\x20new\x20connection!', 'prev', '#FF3333', '#FFCC33', '_ackPacket', 'socket\x20open', 'doPoll', 'enqueue', 'SocketManager\x20-\x20send-message-success:\x20%s', '#33CC99', 'sendPacket', 'event', '_unSubscribe', 'counter', 'onmessage', 'EventEmitter', 'isSuccess', 'writable', 'substring', 'socketio', 'emitting\x20event\x20%j', 'env', 'unregisterGame', 'version', 'join', 'base64', 'setAttribute', 'Lone\x20surrogate\x20U+', '957720ayhVYQ', 'packet\x20received\x20with\x20socket\x20readyState\x20\x22%s\x22', 'socketUrl', 'disconnected', 'encodeQueryData', 'eio_iframe_', 'apiUrl', 'wss', '#FF33FF', 'post', 'host', '#6633CC', 'getPrototypeOf', 'eid', 'JSONP\x20disabled', 'connect_timeout', 'isReactNative', 'enable', 'creating\x20transport\x20\x22%s\x22', 'onAck', '%c\x20', 'default', 'buildSocketUrlQueryParam', 'displayName', 'Decoder', '__initialize', 'packetBuffer', 'parentNode', '_stopIntervalExtendToken', 'io\x20client\x20disconnect', 'CONNECTED_EVENT', 'websocket\x20error', 'log', 'push', 'onNetworkStatus', 'wallet-service-id', '_messageIdInfosMap', '#CC3399', 'socket\x20error\x20%j', 'The\x20value\x20of\x20\x22defaultMaxListeners\x22\x20is\x20out\x20of\x20range.\x20It\x20must\x20be\x20a\x20non-negative\x20number.\x20Received\x20', 'Request', 'skipReconnect', 'diff', 'window', 'insertBefore', 'test', 'alive', 'NEW_MESSAGE_EVENT', 'avatar', 'SEND_MESSAGE_SUCCESS_EVENT', '#0033CC', 'setWalletType', 'maxLastLatency', '#33CCCC', 'minute', 'application/octet-stream;\x20charset=UTF-8', 'EventManager\x20-\x20newEvent:\x20%j', 'SockerManager\x20-\x20emit\x20event\x20can-not-connect!', 'length', '_socket', '#3366CC', 'getOwnPropertySymbols', 'setWalletBalance', 'walletTypes', 'exports', 'enablesXDR', 'sendMessage', '_latency', 'SocketManager\x20-\x20Init\x20new\x20connection!!!', 'MISMATCH_COMMAND_ID', 'decoder', 'Invalid\x20byte\x20index', 'connect_error', 'textarea', 'pollComplete', 'isDebugging', 'customEventMapping', 'pollXhr', '#3399CC', 'reconPack', 'MessageManager\x20-\x20Authen\x20token:\x20%s', 'all', 'undefined', 'onack', 'file', '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_', 'destroy', 'removeListener', 'BINARY_EVENT', 'types', 'newListener', 'table', '_initNewConnection', '_subscribeChannelList', 'Content-Type', 'sendChatMessage:\x20_socketManager\x20was\x20not\x20setup.', 'socket.io-client:manager', 'socket\x20closing\x20-\x20telling\x20transport\x20to\x20close', 'javascript:0', 'logFn', 'skips', '#3399FF', '8iYUZAa', 'agent', 'cleanup', '#CC00CC', 'milliseconds', 'transportOptions', '_eventsCount', 'ssid', 'main', 'pathNames', 'Content-type', 'pingInterval', 'setting\x20transport\x20%s', '/engine.io', 'setPing', 'fired', 'onpacket', 'Microsoft.XMLHTTP', 'messageId', 'apply', 'server\x20error', 'encodeBase64Packet', 'create', 'COMMAND_SEND_SUCCESSFULLY', 'POST', '#FF3300', 'BINARY_ACK', 'connect', 'hasPacket', 'reject', 'CommandManager\x20%s\x20-\x20COMMAND_FAILED_CONC_OVER_LIMIT.\x20current\x20:\x20%s,\x20maximum:\x20%s', 'socket', 'protocol-less\x20url\x20%s', 'iframeId', 'probe\x20transport\x20\x22%s\x22\x20failed\x20because\x20of\x20error:\x20%s', 'xhr\x20poll\x20error', 'getAvatar', 'response', 'setTransport', 'Encoder', 'init', 'decodePacket', 'SocketManager\x20-\x20force-disconnect\x20>>>\x20close\x20connect!', '#FF0033', 'isBuffer', 'ServiceRest', 'Login\x20fail.\x20Clean\x20up.', 'exists', 'amount', 'ciphers', 'slice', 'clearRemainingCommand', 'context', 'onError', '728658zABOpr', 'fromCodePoint', 'my\x20wallet\x20update:\x20%j', 'duration', 'flags', 'reconstructPacket', 'MessageManager', 'socket.io-client:socket', 'binary', 'query', 'uid', 'set', '[object\x20BlobConstructor]', '#FF0000', 'decodePayloadAsBinary', 'prevBufferLen', 'EventManager', 'sec', 'save', 'SocketManager\x20-\x20CAN_NOT_SEND_MESSAGE_EVENT\x20:\x20%s.', 'map', 'byteOffset', 'transport\x20error', 'socket.io-client:url', 'local', 'clearAll', '#66CC00', 'ACK', 'commandPayload', 'socket\x20receive:\x20type\x20\x22%s\x22,\x20data\x20\x22%s\x22', 'closed', '#0033FF', 'source', 'initSocket', 'product', 'onOpen', '#33CC66', 'isFullfill', 'EventManager\x20-\x20waitForEvent\x20was\x20timeout.\x20%s', 'poll', 'authority', 'split', '[object\x20FileConstructor]', '16566EOLsPS', 'getUserId', 'href', 'exec', 'strict', 'Connect\x20without\x20login\x20due\x20to\x20missing\x20serviceRest', 'hasOwnProperty', 'src', 'xhr\x20open\x20%s:\x20%s', 'isEmpty', 'url', 'executeCommand', 'add', 'target', '_reconnectionDelay', 'connecting', 'toJSON', 'Invalid\x20UTF-8\x20detected', 'isPromiseFullfill', 'SocketManager', 'pausing', 'forced\x20close', 'pong\x20-\x20latency:\x20%s,\x20avarage\x20latency:\x20%s', 'policyPort', 'pow', 'copy', 'CONNECTED', 'POOR_CONNECTION', 'starting\x20upgrade\x20probes', 'index', 'Duplicate', 'removeAllListeners', '#CC0033', 'https', 'UPDATE_TOKEN', 'close', 'substr', 'protocols', 'secs', 'type', 'STATUS_INIT', 'Queue', 'closeAndCleanUp', 'removeItem', 'nsp', 'path', 'can-not-connect', 'onevent', '_randomizationFactor', 'opts', 'toString', 'WebSocket', 'then', 'requestTimeout', 'reduce', 'message', 'names', 'absolute', 'connected', 'cleanUp', 'ackPacket', 'upgradeError', 'status', 'msec', 'count', 'reconnect', '_duplicateMessageId', 'Unhandled\x20error.', 'emitBuffered', 'unload', 'probe\x20error', 'pAmt', 'Queue\x20is\x20empty', 'message-pushed', 'supportsBinary', 'EXPECTED_EVENT_TIMEOUT', 'commandId', '#FF00CC', 'listener', 'bad\x20ack\x20%s', 'get', 'calling\x20ack\x20%s\x20with\x20%j', 'MISMATCH_DATA_VERSION', 'factor', 'socket\x20close\x20with\x20reason:\x20\x22%s\x22', 'update-token', 'entries', 'upgrade', 'registerOnce', 'onData', 'updateCounter', 'new\x20io\x20instance\x20for\x20%s', '_hmuid_', 'error-pushed\x20%j', 'server\x20disconnect\x20(%s)', '3837231SrLfdk', '*/*', '#0099CC', 'amd', 'async', '_reject', 'name', 'getElementsByTagName', 'DISCONNECTED_CONNECTION', 'defaultOption', '5ZDPtwx', 'localhost', 'connect\x20attempt\x20will\x20timeout\x20after\x20%d', 'SOCKET_REQUEST_EVENT_V5_2', '#CCCC00', 'Transport\x20not\x20open', 'prependListener', 'probe\x20transport\x20\x22%s\x22\x20failed', 'Authen\x20token\x20success:\x20%j', 'perMessageDeflate', 'callback', 'removeEvent', 'call', '_handleSocketStatus', 'TransportError', 'color', 'CAN_NOT_CONNECT', 'description', 'lib', '#0099FF', '_isSkipMapNewEvent', 'timeout', 'getDisplayName', 'getSSID', '\x20%c', 'isAbleSendingData', 'reconnection', 'hostname', '#CC6600', 'disconnected-connection', 'my\x20wallet\x20CANNOT\x20update\x20promotion\x20wallet.\x20current\x20version\x20[%s],\x20new\x20version\x20[%s],\x20wallet:\x20%j', 'EventManager\x20-\x20newEvent:\x20duplicate\x20eventId\x20%s', 'MaxListenersExceededWarning', 'includes', '#3300FF', 'games', 'dequeue', '_pendingSubscribeChannelList', 'transport\x20is\x20open\x20-\x20connecting', 'port', 'pre-pause\x20polling\x20complete', '_maxListeners', 'averageLatency', 'code', 'color:\x20inherit', '_resolve', 'onunload', 'ping\x20timeout', 'useColors', 'SockerManager\x20-\x20reconnect_error\x20in\x20', 'SOCKET_REQUEST_EVENT_V3', 'append', 'send-message-success', 'RoutingEvent', 'Connection\x20error', 'requests', 'close\x20(%s)', 'presence', 'sId', 'function', 'sendBuffer', 'pVersion', 'transport', 'forceJSONP', 'ownKeys', 'SockerManager\x20-\x20health-check\x20CONNECTED!', 'jsonp', 'device', 'wud-pAmt', 'setDisplayName', '_intervalExtendToken', 'POPUP_DISCONNECTED_EVENT', 'ipv6uri', 'hasMainWalletType', 'result', 'mismatch-command', 'process', '_eventManager', 'updateAllCounter', 'https:', 'transport\x20open\x20-\x20closing', 'logFnWarn', 'heartbeat', 'localStorage', 'round', 'websocket', 'registerEvent', 'reconnectionDelayMax', 'my\x20wallet\x20CANNOT\x20update\x20main\x20wallet.\x20current\x20version\x20[%s],\x20new\x20version\x20[%s],\x20wallet:\x20%j', 'CommandManager\x20%s\x20-\x20cannotSendMessage:\x20messageId=%s', 'forceBase64', 'xhr\x20post\x20error', '_routingEventHandler', 'removeWaitingQueue', 'removeAllEventListeners', 'encodePacket', 'instance', 'codePointAt', 'pingTimeout', 'decodeBase64Packet', 'wallet', 'storage', 'hashMap', 'SocketManager\x20-\x20chat-event:\x20%j', 'prototype', 'boolean', '_sendPacket', '_messageIdServiceIdMap', 'listenerCount', 'decoded\x20%s\x20as\x20%j', '_handleSocketEvent', 'object', '#9933FF', 'Queue\x20underflow', 'localAddress', 'reconnect_failed', 'CAN_NOT_SEND_MESSAGE_EVENT', 'opening\x20%s', 'q52', 'reconnect\x20failed', 'setToken', '/socket.io', 'transport\x20closed', 'date', '_callbacks', 'replace', '_encrypt_5_1', 'jsonp\x20polling\x20iframe\x20removal\x20error', '#FF3399', 'protocol', 'nsps', 'warn', '_encrypt_5_2', 'STATUS_ALIVE', 'http', 'network', 'accept-charset', 'mins', 'doLogin', 'ignoring\x20socket\x20cache\x20for\x20%s', 'state-updated', 'ERROR', 'forceNode', 'data', 'resendCount', '[UnexpectedJSONParseError]:\x20', 'match', '-1000px', 'addEventListeners', '_opt', '___eio', 'resolve', '_status', 'check', 'chat-emit', 'debug', '#33CC00', 'logFnError', 'pfx', '_placeholder', 'exTkn', 'setUserId', 'xdomain', 'socket.io-client', 'CommandManager\x20%s\x20-\x20sendMessage\x20messageId=%s,\x20commandId=%s', 'ids', 'renderer', 'parse\x20%s', 'token', 'decode', 'userAgent', 'MozWebSocket', '__esModule', 'onping', 'socket.io-parser', 'onHandshake', 'DEBUG', '#00CCFF', 'EventManager\x20-\x20clean\x20up.', 'reconnecting', '#00CC99', 'EventManager\x20-\x20newEvent:\x20data\x20is\x20null.', 'abcd', 'Transport', 'COMMAND_FAILED_CONC_OVER_LIMIT', 'xhr\x20data\x20%s', 'takeBinaryData', 'we\x20are\x20currently\x20polling\x20-\x20waiting\x20to\x20pause', '#FF33CC', 'writeBuffer', 'encoding', '_eventHandlerMap', 'encode', '3602430AbDPIw', 'parser\x20error', 'formatArgs', 'onShowPopupDisconnected', 'hour', '916755SPABKC', '_packetManager', '_registerSystemState', 'responseType', '_emitter', 'sendXhr', '_config', '#6600FF', 'svt', 'CommandManager\x20%s\x20-\x20COMMAND_FAILED_RETRY:\x20messageId=%s,\x20numberResend=%s', 'doOpen', 'attachments', 'min', '_initSocket', 'opening', 'uuid', '_executingCommandType', 'WebkitAppearance', 'onEvent', 'warned', 'onclose', 'b64', 'disconnect', 'binaryType', '_data', 'onreconnect', 'string', 'probe\x20transport\x20\x22%s\x22\x20pong', 'subs', 'packets', 'extraHeaders', 'hasXDR', 'onCannotConnect', 'Updated\x20token\x20must\x20not\x20empty.', 'Logger', 'formatters', 'removeChild', 'encoder', 'stringify', 'onLoad', 'getToken', 'promotion', '_ids', '#FFCC00', '_reconnect', '\x20ms', 'reconnect\x20success', 'emitAll', 'encodePayloadAsBlob', 'unshift', 'area', 'clear', 'updateToken', 'rejectUnauthorized', 'queueContents', 'token=', 'coerce', 'subscribe', 'onload', 'playerStateInfo', 'numberRetrySendingMessage', 'defaultMaxListeners', 'probe\x20transport\x20\x22%s\x22\x20opened', 'ack', '#FF00FF', 'COMMAND_FAILED_DUPLICATE', 'processPacketQueue', 'key', 'yrs', 'responseText', '[object\x20Array]', 'The\x20value\x20of\x20\x22n\x22\x20is\x20out\x20of\x20range.\x20It\x20must\x20be\x20a\x20non-negative\x20number.\x20Received\x20', 'GET', '38wAXIlX', '#0000FF', 'SocketManager\x20-\x20Pause\x20interval\x20sending\x20message!', 'encoding\x20packet\x20%j', 'acks', 'left', '#CCCC33', 'iframe', '#00CCCC', 'exception', 'onpagehide', 'parser', 'No\x20transports\x20available', 'removeSendingMessage', '_sId', 'years', 'readAsArrayBuffer', 'SocketManager\x20-\x20DISCONNECTED.', '#00CC33', 'CommandManager\x20%s\x20-\x20ack:\x20messageId=%s', '&ssid=', 'canBeDuplicated', 'onSuccess', '_cachedMessage', 'style', 'isBinary', '#FF9900', 'method', 'getWalletBalance', 'insert', 'SOCKET_REQUEST_EVENT_V5_1', 'unregisterEvent', 'open', 'TextDecoder', 'instances', '2.1.2', 'onPacket', 'sendChatMessage', 'onConnected', 'onNetworkWarning', 'from', 'appendChild', 'onpong', 'CONNECT', 'size', 'pWallet', 'player-can-not-connect', '_socketManager', '#FF0066', '#9900CC', 'max', 'registerGame', 'options', 'we\x20are\x20currently\x20writing\x20-\x20waiting\x20to\x20pause', 'reconnectionDelay', 'application/x-www-form-urlencoded', 'queue', 'attachEvent', 'getTime', 'hash', 'serviceRest', '.*?', 'msecs', 'getOwnPropertyNames', '://', 'Haven\x27t\x20init\x20socket\x20connection.\x20Please\x20update\x20config.', 'Ignore\x20due\x20to\x20config\x20is\x20exist.', 'days', 'onPong', '_reconnection', 'onCannotAuthen', 'json', 'got\x20binary\x20data\x20when\x20not\x20reconstructing\x20a\x20packet', 'GameNetwork', 'random', 'engine.io-client:polling', '_waitForEventTimeOutId', 'splice', '\x22encode\x20error\x22', 'number', 'lastPing', 'engine.io-client:websocket', 'addListener', '#0000CC', 'send', 'curr', 'Queue\x20overflow', 'setMax', 'websocket\x20closed\x20before\x20onclose\x20event', 'namespace', 'PacketManager', 'relative', '#CC6633', 'enabled', '#0066CC'];

          a1_0x4180 = function a1_0x4180() {
            return _0x21027a;
          };

          return a1_0x4180();
        }

        (function (_0x3c7c12, _0x215342) {
          var _0x62f52 = a1_0x1adc,
              _0x37522c = _0x3c7c12();

          while (!![]) {
            try {
              var _0x48a517 = parseInt(_0x62f52(0x30e)) / 0x1 * (parseInt(_0x62f52(0x196)) / 0x2) + parseInt(_0x62f52(0x2c5)) / 0x3 + parseInt(_0x62f52(0x49f)) / 0x4 + parseInt(_0x62f52(0x1ff)) / 0x5 * (-parseInt(_0x62f52(0x16b)) / 0x6) + -parseInt(_0x62f52(0x3ce)) / 0x7 + -parseInt(_0x62f52(0x135)) / 0x8 * (parseInt(_0x62f52(0x1f5)) / 0x9) + parseInt(_0x62f52(0x2c0)) / 0xa;

              if (_0x48a517 === _0x215342) break;else _0x37522c['push'](_0x37522c['shift']());
            } catch (_0x18a200) {
              _0x37522c['push'](_0x37522c['shift']());
            }
          }
        })(a1_0x4180, 0x3a56a), !function (_0x6e8636, _0x92d62c) {
          var _0x20e42a = a1_0x1adc;
          _0x20e42a(0x26e) == typeof exports$1 && _0x20e42a(0x26e) == typeof module ? module['exports'] = _0x92d62c() : _0x20e42a(0x23a) == typeof define && define[_0x20e42a(0x1f8)] ? define(_0x20e42a(0x357), [], _0x92d62c) : 'object' == typeof exports$1 ? exports$1['GameNetwork'] = _0x92d62c() : _0x6e8636[_0x20e42a(0x357)] = _0x92d62c();
        }(self, function () {
          return _0x46691d = {
            0x1542: function _(_0x373e87, _0x59c8c7, _0xbca1f2) {
              var _0x22a681 = a1_0x1adc;

              var _0x6e3e07 = this && this['__importDefault'] || function (_0x20d1ac) {
                var _0xdfea1b = a1_0x1adc;
                return _0x20d1ac && _0x20d1ac[_0xdfea1b(0x2ab)] ? _0x20d1ac : {
                  'default': _0x20d1ac
                };
              };

              Object['defineProperty'](_0x59c8c7, _0x22a681(0x2ab), {
                'value': !0x0
              }), _0x59c8c7['Duplicate'] = void 0x0;

              var _0x20808b = _0xbca1f2(0x13dc),
                  _0x2f55c7 = _0x6e3e07(_0xbca1f2(0x28a)),
                  _0x25f47f = function () {
                var _0xf4504 = _0x22a681;

                function _0x4ca02d(_0x2d486e) {
                  var _0x1e6d6e = a1_0x1adc;
                  void 0x0 === _0x2d486e && (_0x2d486e = 0x3e8), this[_0x1e6d6e(0x482)] = 0x3e8, this[_0x1e6d6e(0x482)] = _0x2d486e, this[_0x1e6d6e(0x346)] = new _0x20808b['Queue'](_0x2d486e), this[_0x1e6d6e(0x265)] = new _0x2f55c7['default']();
                }

                return _0x4ca02d['prototype'][_0xf4504(0x32b)] = function (_0x23ac70) {
                  var _0x40f4e9 = _0xf4504;
                  this[_0x40f4e9(0x346)][_0x40f4e9(0x33a)]() >= this[_0x40f4e9(0x482)] && this[_0x40f4e9(0x265)][_0x40f4e9(0x387)](this[_0x40f4e9(0x346)][_0x40f4e9(0x223)]()), this['queue'][_0x40f4e9(0x48a)](_0x23ac70), this[_0x40f4e9(0x265)][_0x40f4e9(0x176)](_0x23ac70, !0x0);
                }, _0x4ca02d[_0xf4504(0x267)][_0xf4504(0x164)] = function (_0x1a85a2) {
                  var _0x326f1b = _0xf4504;
                  return this[_0x326f1b(0x265)][_0x326f1b(0x413)](_0x1a85a2);
                }, _0x4ca02d['prototype'][_0xf4504(0x184)] = function () {
                  var _0x5401c3 = _0xf4504;
                  this[_0x5401c3(0x346)][_0x5401c3(0x2f8)](), this[_0x5401c3(0x265)][_0x5401c3(0x2f8)]();
                }, _0x4ca02d;
              }();

              _0x59c8c7[_0x22a681(0x1b4)] = _0x25f47f;
            },
            0x13dc: function _(_0xb822a5, _0x3fa4cc) {
              var _0x8eb0e9 = a1_0x1adc;
              Object[_0x8eb0e9(0x42b)](_0x3fa4cc, '__esModule', {
                'value': !0x0
              }), _0x3fa4cc['Queue'] = void 0x0;

              var _0x26faf9 = function () {
                var _0x3d5084 = _0x8eb0e9;

                function _0x5287fe(_0x5c1710) {
                  var _0x3fb2a8 = a1_0x1adc;
                  this['maxSize'] = _0x5c1710 > 0x0 ? _0x5c1710 : 0xa, this[_0x3fb2a8(0x109)] = 0x0, this[_0x3fb2a8(0x346)] = new Array(this['maxSize']);
                }

                return _0x5287fe[_0x3d5084(0x267)][_0x3d5084(0x19f)] = function () {
                  var _0x564ee7 = _0x3d5084;
                  return 0x0 === this[_0x564ee7(0x109)];
                }, _0x5287fe[_0x3d5084(0x267)][_0x3d5084(0x3ba)] = function () {
                  var _0x404205 = _0x3d5084;
                  return this[_0x404205(0x109)] === this[_0x404205(0x482)];
                }, _0x5287fe[_0x3d5084(0x267)][_0x3d5084(0x48a)] = function (_0x3f358b) {
                  var _0x505d0c = _0x3d5084;
                  if (this[_0x505d0c(0x3ba)]()) throw new Error(_0x505d0c(0x364));
                  this[_0x505d0c(0x346)][this[_0x505d0c(0x109)]++] = _0x3f358b;
                }, _0x5287fe[_0x3d5084(0x267)]['dequeue'] = function () {
                  var _0x2bdb91 = _0x3d5084;
                  if (this[_0x2bdb91(0x19f)]()) throw new Error(_0x2bdb91(0x270));

                  for (var _0x1bad9c = this[_0x2bdb91(0x346)][0x0], _0x38d269 = 0x0; _0x38d269 < this[_0x2bdb91(0x109)]; _0x38d269++) {
                    this[_0x2bdb91(0x346)][_0x38d269] = this[_0x2bdb91(0x346)][_0x38d269 + 0x1];
                  }

                  return this[_0x2bdb91(0x109)]--, _0x1bad9c;
                }, _0x5287fe['prototype']['peek'] = function () {
                  var _0x2d03ec = _0x3d5084;
                  if (this[_0x2d03ec(0x19f)]()) throw new Error(_0x2d03ec(0x1de));
                  return this[_0x2d03ec(0x346)][0x0];
                }, _0x5287fe[_0x3d5084(0x267)][_0x3d5084(0x2f8)] = function () {
                  var _0x25c963 = _0x3d5084;
                  this[_0x25c963(0x109)] = 0x0, this[_0x25c963(0x346)] = new Array(this[_0x25c963(0x482)]);
                }, _0x5287fe[_0x3d5084(0x267)][_0x3d5084(0x33a)] = function () {
                  var _0x4dbcd7 = _0x3d5084;
                  return this[_0x4dbcd7(0x109)];
                }, _0x5287fe[_0x3d5084(0x267)][_0x3d5084(0x2fb)] = function () {
                  for (var _0x35b824 = 0x0; _0x35b824 < this['length']; ++_0x35b824) {}
                }, _0x5287fe;
              }();

              _0x3fa4cc[_0x8eb0e9(0x1bf)] = _0x26faf9;
            },
            0xb46: function _(_0x4b8573, _0x2f1059) {
              var _0x42560c = a1_0x1adc;
              Object[_0x42560c(0x42b)](_0x2f1059, '__esModule', {
                'value': !0x0
              }), _0x2f1059[_0x42560c(0x3be)] = void 0x0;

              var _0x3b9c7c = function () {
                var _0x2dea59 = _0x42560c;

                function _0x3135f5() {
                  var _0x2e1d2a = a1_0x1adc,
                      _0x19d0cd = this;

                  this[_0x2e1d2a(0x22c)] = function () {}, this['_reject'] = function () {}, this['isFullfill'] = !0x1, this['promise'] = new Promise(function (_0xcb3955, _0x2d88ac) {
                    var _0x51cd30 = _0x2e1d2a;
                    _0x19d0cd[_0x51cd30(0x22c)] = _0xcb3955, _0x19d0cd[_0x51cd30(0x1fa)] = _0x2d88ac;
                  });
                }

                return _0x3135f5[_0x2dea59(0x267)]['resolve'] = function (_0x5eb88d) {
                  var _0x364758 = _0x2dea59;
                  this[_0x364758(0x22c)](_0x5eb88d), this[_0x364758(0x190)] = !0x0;
                }, _0x3135f5[_0x2dea59(0x267)][_0x2dea59(0x152)] = function (_0x3386bc, _0x1f8ff1) {
                  var _0x1b8297 = _0x2dea59;
                  this[_0x1b8297(0x1fa)](_0x3386bc, _0x1f8ff1), this[_0x1b8297(0x190)] = !0x0;
                }, _0x3135f5[_0x2dea59(0x267)]['getPromise'] = function () {
                  return this['promise'];
                }, _0x3135f5['prototype'][_0x2dea59(0x1a8)] = function () {
                  var _0xbcc54b = _0x2dea59;
                  return this[_0xbcc54b(0x190)];
                }, _0x3135f5;
              }();

              _0x2f1059[_0x42560c(0x3be)] = _0x3b9c7c;
            },
            0x370: function _(_0x139a95, _0x1ea224, _0x4e622d) {
              var _0xca185e = a1_0x1adc;

              var _0x1f3b25 = this && this[_0xca185e(0x395)] || function (_0x47d77b) {
                return _0x47d77b && _0x47d77b['__esModule'] ? _0x47d77b : {
                  'default': _0x47d77b
                };
              };

              Object[_0xca185e(0x42b)](_0x1ea224, _0xca185e(0x2ab), {
                'value': !0x0
              }), _0x1ea224['ServiceRest'] = _0x1ea224['SocketManager'] = _0x1ea224[_0xca185e(0x17b)] = _0x1ea224[_0xca185e(0x3a5)] = _0x1ea224['MessageManager'] = _0x1ea224[_0xca185e(0x481)] = _0x1ea224[_0xca185e(0x3be)] = _0x1ea224['network'] = _0x1ea224[_0xca185e(0x211)] = void 0x0;

              var _0x23505f = _0x1f3b25(_0x4e622d(0x28a)),
                  _0x2a698a = _0x4e622d(0x1a99),
                  _0x2bfed1 = _0x4e622d(0x758),
                  _0x8b1157 = _0x1f3b25(_0x4e622d(0x7e9)),
                  _0xf8c102 = _0x4e622d(0xb46);

              Object[_0xca185e(0x42b)](_0x1ea224, 'Deferred', {
                'enumerable': !0x0,
                'get': function get() {
                  return _0xf8c102['Deferred'];
                }
              });

              var _0xcee7b7 = _0x4e622d(0x1531);

              Object[_0xca185e(0x42b)](_0x1ea224, _0xca185e(0x481), {
                'enumerable': !0x0,
                'get': function get() {
                  var _0x4a14e8 = _0xca185e;
                  return _0xcee7b7[_0x4a14e8(0x481)];
                }
              });

              var _0x188b26 = _0x4e622d(0x19be);

              Object[_0xca185e(0x42b)](_0x1ea224, _0xca185e(0x171), {
                'enumerable': !0x0,
                'get': function get() {
                  return _0x188b26['MessageManager'];
                }
              });

              var _0x1a319d = _0x4e622d(0x4f0);

              Object[_0xca185e(0x42b)](_0x1ea224, _0xca185e(0x3a5), {
                'enumerable': !0x0,
                'get': function get() {
                  var _0xdad524 = _0xca185e;
                  return _0x1a319d[_0xdad524(0x3a5)];
                }
              });

              var _0x196fcb = _0x4e622d(0x6);

              Object['defineProperty'](_0x1ea224, _0xca185e(0x17b), {
                'enumerable': !0x0,
                'get': function get() {
                  var _0x24b726 = _0xca185e;
                  return _0x196fcb[_0x24b726(0x17b)];
                }
              });

              var _0x1b0325 = _0x4e622d(0x1d8f);

              Object[_0xca185e(0x42b)](_0x1ea224, 'SocketManager', {
                'enumerable': !0x0,
                'get': function get() {
                  var _0x227ac7 = _0xca185e;
                  return _0x1b0325[_0x227ac7(0x1a9)];
                }
              });

              var _0x1799e9 = _0x4e622d(0x1518);

              Object[_0xca185e(0x42b)](_0x1ea224, _0xca185e(0x162), {
                'enumerable': !0x0,
                'get': function get() {
                  var _0x410369 = _0xca185e;
                  return _0x1799e9[_0x410369(0x162)];
                }
              }), _0x1ea224['lib'] = {
                'hashmap': _0x23505f['default'],
                'io': _0x2a698a,
                'logger': _0x8b1157[_0xca185e(0x4b4)],
                'uuid': _0x2bfed1['uuid']
              }, _0x1ea224[_0xca185e(0x286)] = {
                'Deferred': _0xf8c102['Deferred'],
                'PlayerInfoStateManager': _0xcee7b7[_0xca185e(0x481)],
                'MessageManager': _0x188b26[_0xca185e(0x171)],
                'CommandManager': _0x1a319d['CommandManager'],
                'EventManager': _0x196fcb[_0xca185e(0x17b)],
                'SocketManager': _0x1b0325[_0xca185e(0x1a9)],
                'ServiceRest': _0x1799e9[_0xca185e(0x162)]
              };
            },
            0x4f0: function _(_0x7f939b, _0x265cb6, _0x2c93b9) {
              var _0x7b6023 = a1_0x1adc;

              var _0x5ae64a = this && this[_0x7b6023(0x395)] || function (_0x25b1ad) {
                var _0x593e7a = _0x7b6023;
                return _0x25b1ad && _0x25b1ad[_0x593e7a(0x2ab)] ? _0x25b1ad : {
                  'default': _0x25b1ad
                };
              };

              Object['defineProperty'](_0x265cb6, _0x7b6023(0x2ab), {
                'value': !0x0
              }), _0x265cb6[_0x7b6023(0x3a5)] = void 0x0;

              var _0x4a2f15 = _0x2c93b9(0x19be),
                  _0x2cb40b = _0x2c93b9(0x758),
                  _0x366b12 = _0x5ae64a(_0x2c93b9(0x7e9)),
                  _0x2600ab = _0x5ae64a(_0x2c93b9(0x1c13)),
                  _0x1c45ba = _0x5ae64a(_0x2c93b9(0x28a)),
                  _0x59ff11 = function () {
                var _0x4feae2 = _0x7b6023;

                function _0x59fd99(_0x3840cd, _0x223d0e, _0x39d9ae) {
                  var _0x21778c = a1_0x1adc;
                  void 0x0 === _0x39d9ae && (_0x39d9ae = _0x21778c(0x1e2)), this['serviceId'] = _0x3840cd, this[_0x21778c(0x419)] = _0x223d0e || 0x1, this[_0x21778c(0x3b6)] = _0x39d9ae, this[_0x21778c(0x2c9)] = new _0x2600ab['default'](), this[_0x21778c(0x2d5)] = new _0x1c45ba[_0x21778c(0x4b4)](), this[_0x21778c(0x4c3)] = new _0x1c45ba['default']();
                }

                return _0x59fd99[_0x4feae2(0x267)][_0x4feae2(0x255)] = function (_0x376ec4, _0x2765bd) {
                  this['_emitter']['on'](_0x376ec4, _0x2765bd);
                }, _0x59fd99[_0x4feae2(0x267)]['registerOnce'] = function (_0x3d51ce, _0x4bd123) {
                  var _0x450d77 = _0x4feae2;

                  this[_0x450d77(0x2c9)][_0x450d77(0x466)](_0x3d51ce, _0x4bd123);
                }, _0x59fd99['prototype'][_0x4feae2(0x2fe)] = function (_0x510bad) {
                  var _0x581a22 = _0x4feae2;

                  _0x4a2f15[_0x581a22(0x171)][_0x581a22(0x40b)]()[_0x581a22(0x2fe)](_0x510bad);
                }, _0x59fd99['prototype'][_0x4feae2(0x3dd)] = function (_0x76e9f) {
                  var _0x530fab = _0x4feae2;

                  _0x4a2f15[_0x530fab(0x171)]['getInstance']()[_0x530fab(0x3dd)](_0x76e9f);
                }, _0x59fd99[_0x4feae2(0x267)][_0x4feae2(0x1a1)] = function (_0x282ce9, _0x1f7d9b) {
                  var _0x18c65f = _0x4feae2;

                  _0x366b12[_0x18c65f(0x4b4)]['debug']('CommandManager\x20%s\x20-\x20executeCommand:\x20%j', this[_0x18c65f(0x46c)], [_0x282ce9, _0x1f7d9b]);

                  var _0x37839e = this['_executingCommandType'][_0x18c65f(0x1d6)]();

                  if (!this[_0x18c65f(0x3d3)](_0x282ce9, _0x1f7d9b)) return _0x366b12[_0x18c65f(0x4b4)][_0x18c65f(0x47c)](_0x18c65f(0x45d), this[_0x18c65f(0x46c)], this[_0x18c65f(0x2d5)][_0x18c65f(0x3ef)]()), _0x59fd99[_0x18c65f(0x306)];
                  if (_0x37839e >= this[_0x18c65f(0x419)] && !this['_executingCommandType']['has'](_0x282ce9[_0x18c65f(0x48e)])) return _0x366b12['default'][_0x18c65f(0x47c)](_0x18c65f(0x153), this[_0x18c65f(0x46c)], _0x37839e, this[_0x18c65f(0x419)]), _0x59fd99[_0x18c65f(0x2b7)];

                  var _0x581be5 = (0, _0x2cb40b[_0x18c65f(0x2d4)])();

                  _0x282ce9['data'][this[_0x18c65f(0x3b6)]] = _0x581be5;

                  var _0xaf907d = _0x4a2f15[_0x18c65f(0x171)][_0x18c65f(0x40b)]()[_0x18c65f(0x111)](this[_0x18c65f(0x46c)], _0x282ce9);

                  return _0x1f7d9b[_0x18c65f(0x433)] && (this[_0x18c65f(0x2d5)][_0x18c65f(0x176)](_0x282ce9[_0x18c65f(0x48e)], !0x0), this['_messageIdInfosMap'][_0x18c65f(0x176)](_0xaf907d, {
                    'commandId': _0x581be5,
                    'resendCount': _0x1f7d9b[_0x18c65f(0x28f)],
                    'commandPayload': _0x282ce9,
                    'numberResend': 0x0
                  })), _0x366b12[_0x18c65f(0x4b4)][_0x18c65f(0x29a)](_0x18c65f(0x2a3), this[_0x18c65f(0x46c)], _0xaf907d, _0x581be5), _0x581be5;
                }, _0x59fd99[_0x4feae2(0x267)][_0x4feae2(0x168)] = function () {
                  var _0x4a664c = _0x4feae2;
                  this[_0x4a664c(0x2d5)]['clear'](), _0x4a2f15[_0x4a664c(0x171)]['getInstance']()[_0x4a664c(0x31b)](this[_0x4a664c(0x4c3)]['keys']()), this[_0x4a664c(0x4c3)][_0x4a664c(0x2f8)]();
                }, _0x59fd99[_0x4feae2(0x267)]['removeAllEventListeners'] = function () {
                  var _0x19458a = _0x4feae2;

                  this[_0x19458a(0x2c9)][_0x19458a(0x1b5)]();
                }, _0x59fd99[_0x4feae2(0x267)]['cleanUp'] = function () {
                  var _0x24f7f8 = _0x4feae2;
                  _0x366b12[_0x24f7f8(0x4b4)]['debug'](_0x24f7f8(0x3bb), this[_0x24f7f8(0x46c)]), this['_emitter'][_0x24f7f8(0x1b5)](), this[_0x24f7f8(0x168)]();
                }, _0x59fd99[_0x4feae2(0x267)][_0x4feae2(0x4b2)] = function (_0x5c7193) {
                  var _0x40409f = _0x4feae2;

                  if (_0x366b12['default'][_0x40409f(0x29a)](_0x40409f(0x321), this['serviceId'], _0x5c7193), this[_0x40409f(0x4c3)]['has'](_0x5c7193)) {
                    var _0x11ec42 = this[_0x40409f(0x4c3)][_0x40409f(0x1e6)](_0x5c7193)[_0x40409f(0x187)];

                    this[_0x40409f(0x4c3)][_0x40409f(0x387)](_0x5c7193), this[_0x40409f(0x2d5)][_0x40409f(0x387)](_0x11ec42[_0x40409f(0x48e)]), this[_0x40409f(0x2c9)][_0x40409f(0x426)](_0x59fd99[_0x40409f(0x14c)], _0x11ec42);
                  }
                }, _0x59fd99[_0x4feae2(0x267)][_0x4feae2(0x372)] = function (_0x4c6c04) {
                  var _0x3d6373 = _0x4feae2;

                  if (_0x366b12[_0x3d6373(0x4b4)][_0x3d6373(0x29a)](_0x3d6373(0x258), this[_0x3d6373(0x46c)], _0x4c6c04), this[_0x3d6373(0x4c3)]['has'](_0x4c6c04)) {
                    var _0x299487 = this[_0x3d6373(0x4c3)][_0x3d6373(0x1e6)](_0x4c6c04),
                        _0x367615 = _0x299487[_0x3d6373(0x28f)],
                        _0x4454e5 = _0x299487[_0x3d6373(0x1e2)],
                        _0x329104 = _0x299487[_0x3d6373(0x187)],
                        _0x41b590 = _0x299487['numberResend'];

                    if (this[_0x3d6373(0x4c3)][_0x3d6373(0x387)](_0x4c6c04), this['_executingCommandType']['delete'](_0x329104[_0x3d6373(0x48e)]), _0x41b590 < _0x367615) {
                      _0x366b12[_0x3d6373(0x4b4)][_0x3d6373(0x29a)]('CommandManager\x20%s\x20-\x20resendMessage:\x20%s', this['serviceId'], _0x4c6c04);

                      var _0x3823ed = _0x4a2f15[_0x3d6373(0x171)][_0x3d6373(0x40b)]()[_0x3d6373(0x111)](this['serviceId'], _0x329104, _0x4c6c04);

                      _0x41b590++, this[_0x3d6373(0x4c3)][_0x3d6373(0x176)](_0x3823ed, {
                        'resendCount': _0x367615,
                        'commandId': _0x4454e5,
                        'commandPayload': _0x329104,
                        'numberResend': _0x41b590
                      }), _0x366b12['default'][_0x3d6373(0x29a)](_0x3d6373(0x3f1), this['serviceId'], _0x4c6c04, _0x3823ed, _0x41b590, _0x367615);
                    } else _0x366b12['default'][_0x3d6373(0x29a)](_0x3d6373(0x2ce), this[_0x3d6373(0x46c)], _0x4c6c04, _0x41b590), this[_0x3d6373(0x2c9)][_0x3d6373(0x426)](_0x59fd99[_0x3d6373(0x376)], _0x4454e5);
                  }
                }, _0x59fd99[_0x4feae2(0x267)][_0x4feae2(0x3d3)] = function (_0x1eda59, _0x419c03) {
                  var _0x573a60 = _0x4feae2,
                      _0x5b11b2 = _0x1eda59[_0x573a60(0x48e)];

                  return !!_0x419c03[_0x573a60(0x323)] || !0x1 === this[_0x573a60(0x2d5)][_0x573a60(0x413)](_0x5b11b2);
                }, _0x59fd99[_0x4feae2(0x2b7)] = 'COMMAND_FAILED_CONC_OVER_LIMIT', _0x59fd99[_0x4feae2(0x306)] = _0x4feae2(0x306), _0x59fd99[_0x4feae2(0x376)] = _0x4feae2(0x376), _0x59fd99[_0x4feae2(0x14c)] = 'COMMAND_SEND_SUCCESSFULLY', _0x59fd99;
              }();

              _0x265cb6['CommandManager'] = _0x59ff11;
            },
            0x6: function _(_0x1400aa, _0x310248, _0x437f30) {
              var _0x1a6592 = a1_0x1adc;

              var _0x4d172b = this && this[_0x1a6592(0x395)] || function (_0x1db56e) {
                var _0x19e205 = _0x1a6592;
                return _0x1db56e && _0x1db56e[_0x19e205(0x2ab)] ? _0x1db56e : {
                  'default': _0x1db56e
                };
              };

              Object['defineProperty'](_0x310248, _0x1a6592(0x2ab), {
                'value': !0x0
              }), _0x310248[_0x1a6592(0x17b)] = void 0x0;

              var _0x4542ff = _0x4d172b(_0x437f30(0x1c13)),
                  _0x18c735 = _0x4d172b(_0x437f30(0x28a)),
                  _0x3efae1 = _0x437f30(0x1542),
                  _0x2bf525 = _0x4d172b(_0x437f30(0x7e9)),
                  _0xf39437 = {
                'jgr': 'client-join-game-result',
                'sud': _0x1a6592(0x28b),
                'spu': 'state-pushed',
                'erp': _0x1a6592(0x415),
                'mep': _0x1a6592(0x1df)
              },
                  _0x2fd50f = function () {
                var _0x5bf1dd = _0x1a6592;

                function _0x39466b(_0xea2994, _0x13c556) {
                  var _0x42fea7 = a1_0x1adc;
                  void 0x0 === _0xea2994 && (_0xea2994 = !0x1), this[_0x42fea7(0x2c9)] = new _0x4542ff[_0x42fea7(0x4b4)](), this[_0x42fea7(0x38c)] = new _0x3efae1[_0x42fea7(0x1b4)](0x3e8), this[_0x42fea7(0x35a)] = new _0x18c735[_0x42fea7(0x4b4)](), this['_isSkipMapNewEvent'] = _0xea2994, this['customEventMapping'] = _0x13c556 || _0xf39437;
                }

                return _0x39466b[_0x5bf1dd(0x267)]['registerEvent'] = function (_0x1db569, _0x4c5d87) {
                  this['_emitter']['on'](_0x1db569, _0x4c5d87);
                }, _0x39466b[_0x5bf1dd(0x267)][_0x5bf1dd(0x32d)] = function (_0x24f621, _0x5177a8) {
                  var _0x29d1f0 = _0x5bf1dd;

                  this[_0x29d1f0(0x2c9)][_0x29d1f0(0x126)](_0x24f621, _0x5177a8);
                }, _0x39466b['prototype'][_0x5bf1dd(0x1ee)] = function (_0x28aa58, _0x1e3c16) {
                  var _0x2f8733 = _0x5bf1dd;

                  this[_0x2f8733(0x2c9)][_0x2f8733(0x466)](_0x28aa58, _0x1e3c16);
                }, _0x39466b[_0x5bf1dd(0x267)][_0x5bf1dd(0x25d)] = function () {
                  var _0x4844ad = _0x5bf1dd;

                  this[_0x4844ad(0x2c9)][_0x4844ad(0x1b5)]();
                }, _0x39466b[_0x5bf1dd(0x267)][_0x5bf1dd(0x37f)] = function (_0x453470, _0x490484, _0xaf17e5) {
                  var _0x475b65 = _0x5bf1dd,
                      _0x1fcaa9 = setTimeout(function () {
                    var _0x1c4486 = a1_0x1adc;
                    _0x2bf525['default']['debug'](_0x1c4486(0x191), _0x490484), _0xaf17e5();
                  }, _0x453470);

                  return this['_waitForEventTimeOutId'][_0x475b65(0x176)](_0x1fcaa9, _0x490484), _0x1fcaa9;
                }, _0x39466b[_0x5bf1dd(0x267)][_0x5bf1dd(0x25c)] = function () {
                  var _0x45fd9e = _0x5bf1dd;
                  this['_waitForEventTimeOutId'][_0x45fd9e(0x3ef)]()[_0x45fd9e(0x37b)](function (_0x8f6ae9) {
                    clearTimeout(_0x8f6ae9);
                  }), this[_0x45fd9e(0x35a)][_0x45fd9e(0x2f8)]();
                }, _0x39466b[_0x5bf1dd(0x267)][_0x5bf1dd(0x39b)] = function (_0x58899f) {
                  var _0x2b952e = _0x5bf1dd;
                  clearTimeout(_0x58899f), this[_0x2b952e(0x35a)][_0x2b952e(0x387)](_0x58899f);
                }, _0x39466b[_0x5bf1dd(0x267)][_0x5bf1dd(0x1d1)] = function () {
                  var _0x28fb8c = _0x5bf1dd;
                  _0x2bf525[_0x28fb8c(0x4b4)][_0x28fb8c(0x29a)](_0x28fb8c(0x2b1)), this[_0x28fb8c(0x2c9)][_0x28fb8c(0x1b5)](), this[_0x28fb8c(0x38c)]['clearAll'](), this[_0x28fb8c(0x25c)]();
                }, _0x39466b['prototype'][_0x5bf1dd(0x334)] = function () {
                  var _0x544a66 = _0x5bf1dd;
                  _0x2bf525[_0x544a66(0x4b4)]['debug'](_0x544a66(0x478)), this[_0x544a66(0x2c9)][_0x544a66(0x426)](_0x39466b['CONNECTED']);
                }, _0x39466b[_0x5bf1dd(0x267)][_0x5bf1dd(0x352)] = function (_0x3966a5) {
                  var _0x186824 = _0x5bf1dd;

                  this[_0x186824(0x2c9)][_0x186824(0x426)](_0x39466b['PONG'], _0x3966a5);
                }, _0x39466b[_0x5bf1dd(0x267)][_0x5bf1dd(0x2e5)] = function () {
                  var _0x2c3c61 = _0x5bf1dd;
                  _0x2bf525[_0x2c3c61(0x4b4)][_0x2c3c61(0x29a)]('EventManager\x20-\x20cannotConnect.'), this[_0x2c3c61(0x2c9)][_0x2c3c61(0x426)](_0x39466b[_0x2c3c61(0x20f)]);
                }, _0x39466b['prototype'][_0x5bf1dd(0x2d7)] = function (_0x2ffe23) {
                  var _0x3778da = _0x5bf1dd,
                      _0x362219 = this;

                  _0x2bf525[_0x3778da(0x4b4)][_0x3778da(0x29a)](_0x3778da(0x4d7), _0x2ffe23), _0x2ffe23 && _0x2ffe23[_0x3778da(0x48e)] && (_0x2ffe23[_0x3778da(0x48e)] = !this[_0x3778da(0x213)] && this['customEventMapping'][_0x2ffe23[_0x3778da(0x48e)]] ? this[_0x3778da(0x11b)][_0x2ffe23['event']] : _0x2ffe23[_0x3778da(0x48e)]);

                  var _0x2e5858 = _0x2ffe23[_0x3778da(0x48e)],
                      _0x12c7ee = _0x2ffe23[_0x3778da(0x28e)],
                      _0x34fafc = _0x2ffe23[_0x3778da(0x459)];

                  _0x12c7ee ? this[_0x3778da(0x38c)][_0x3778da(0x164)](_0x34fafc) ? _0x2bf525[_0x3778da(0x4b4)][_0x3778da(0x47c)](_0x3778da(0x21e), _0x34fafc) : (this[_0x3778da(0x38c)][_0x3778da(0x32b)](_0x34fafc), this['_waitForEventTimeOutId'][_0x3778da(0x3ef)]()[_0x3778da(0x37b)](function (_0x7253f) {
                    var _0x479d3d = _0x3778da;
                    _0x362219[_0x479d3d(0x35a)][_0x479d3d(0x1e6)](_0x7253f)(_0x2ffe23) && (clearTimeout(_0x7253f), _0x362219[_0x479d3d(0x35a)][_0x479d3d(0x387)](_0x7253f));
                  }), _0x3778da(0x415) === _0x2e5858 && _0x2bf525[_0x3778da(0x4b4)][_0x3778da(0x282)](_0x3778da(0x1f3), _0x2ffe23), this[_0x3778da(0x2c9)]['emit'](_0x2e5858, _0x2ffe23)) : _0x2bf525['default'][_0x3778da(0x47c)](_0x3778da(0x2b4));
                }, _0x39466b[_0x5bf1dd(0x1b0)] = _0x5bf1dd(0x1d0), _0x39466b['PONG'] = _0x5bf1dd(0x3ed), _0x39466b[_0x5bf1dd(0x20f)] = _0x5bf1dd(0x1c4), _0x39466b[_0x5bf1dd(0x1e1)] = 'expected-event-timeout', _0x39466b[_0x5bf1dd(0x114)] = _0x5bf1dd(0x24a), _0x39466b[_0x5bf1dd(0x1e8)] = 'mismatch-version', _0x39466b;
              }();

              _0x310248[_0x1a6592(0x17b)] = _0x2fd50f;
            },
            0x1531: function _(_0xb93c8e, _0x2ed418, _0x23a03d) {
              var _0x39ab22 = a1_0x1adc;

              var _0x143abc = this && this['__spreadArray'] || function (_0x5dc89a, _0x2bef09, _0xc7963e) {
                var _0x1d4729 = a1_0x1adc;

                if (_0xc7963e || 0x2 === arguments[_0x1d4729(0x109)]) {
                  for (var _0x57639f, _0x44ad9a = 0x0, _0x5ea752 = _0x2bef09[_0x1d4729(0x109)]; _0x44ad9a < _0x5ea752; _0x44ad9a++) {
                    !_0x57639f && _0x44ad9a in _0x2bef09 || (_0x57639f || (_0x57639f = Array['prototype'][_0x1d4729(0x167)][_0x1d4729(0x20b)](_0x2bef09, 0x0, _0x44ad9a)), _0x57639f[_0x44ad9a] = _0x2bef09[_0x44ad9a]);
                  }
                }

                return _0x5dc89a[_0x1d4729(0x46f)](_0x57639f || Array[_0x1d4729(0x267)]['slice']['call'](_0x2bef09));
              },
                  _0x3ab28f = this && this[_0x39ab22(0x395)] || function (_0x4bf5d3) {
                var _0x503d33 = _0x39ab22;
                return _0x4bf5d3 && _0x4bf5d3[_0x503d33(0x2ab)] ? _0x4bf5d3 : {
                  'default': _0x4bf5d3
                };
              };

              Object['defineProperty'](_0x2ed418, _0x39ab22(0x2ab), {
                'value': !0x0
              }), _0x2ed418['PlayerInfoStateManager'] = void 0x0;

              var _0x53d7cc = _0x3ab28f(_0x23a03d(0x1c13)),
                  _0x482549 = _0x23a03d(0x6),
                  _0xccf66e = _0x3ab28f(_0x23a03d(0x7e9)),
                  _0x51ed83 = _0x23a03d(0x758),
                  _0x5372ca = _0x39ab22(0x13d),
                  _0x1bf73e = function () {
                var _0x3ab179 = _0x39ab22;

                function _0x1d03f1() {
                  var _0x3ebbdf = a1_0x1adc,
                      _0xae917f = this;

                  this[_0x3ebbdf(0x263)] = {
                    'amount': 0x0,
                    'availableAmount': 0x0,
                    'version': 0x0,
                    'pAmount': 0x0,
                    'pAvailableAmount': 0x0,
                    'pVersion': 0x0
                  }, this[_0x3ebbdf(0x2a7)] = null, this[_0x3ebbdf(0x44b)] = null, this[_0x3ebbdf(0x4b6)] = null, this[_0x3ebbdf(0x4cf)] = '', this[_0x3ebbdf(0x24c)] = new _0x482549[_0x3ebbdf(0x17b)](), this['_emitter'] = new _0x53d7cc[_0x3ebbdf(0x4b4)](), this[_0x3ebbdf(0x24c)]['registerEvent']('wallet-updated', function (_0x43d4ff) {
                    _0xae917f['setWalletBalance'](_0x43d4ff);
                  }), this[_0x3ebbdf(0x24c)][_0x3ebbdf(0x255)](_0x3ebbdf(0x243), function (_0x53d69f) {
                    var _0x4f2815 = _0x3ebbdf;

                    _0xae917f[_0x4f2815(0x10d)](_0x53d69f);
                  }), this[_0x3ebbdf(0x24c)][_0x3ebbdf(0x255)]('user-logged-out', function (_0x3d3628) {
                    var _0x29ffd0 = _0x3ebbdf;
                    _0xccf66e['default'][_0x29ffd0(0x29a)](_0x29ffd0(0x36f), _0x3d3628), _0xae917f[_0x29ffd0(0x2c9)][_0x29ffd0(0x426)](_0x3d3628[_0x29ffd0(0x48e)], _0x3d3628[_0x29ffd0(0x28e)]);
                  }), this[_0x3ebbdf(0x24c)][_0x3ebbdf(0x255)](_0x3ebbdf(0x385), function (_0x5c02e3) {
                    var _0x3bd99a = _0x3ebbdf;
                    _0x3bd99a(0x4c2) === _0x5c02e3[_0x3bd99a(0x46c)] && _0xae917f[_0x3bd99a(0x10d)](_0x5c02e3);
                  }), this[_0x3ebbdf(0x13c)] = (0, _0x51ed83[_0x3ebbdf(0x2d4)])(), this['walletTypes'] = [];
                }

                return _0x1d03f1['getInstance'] = function () {
                  var _0x29ed96 = a1_0x1adc;
                  return _0x1d03f1[_0x29ed96(0x25f)] || (_0x1d03f1[_0x29ed96(0x25f)] = new _0x1d03f1()), _0x1d03f1[_0x29ed96(0x25f)];
                }, _0x1d03f1[_0x3ab179(0x267)][_0x3ab179(0x2c7)] = function (_0x3eb234) {
                  var _0x49b5ad = _0x3ab179,
                      _0x2ee4bd = this;

                  _0x3eb234['registerGame'](_0x49b5ad(0x4c2), {
                    'onAck': function onAck() {},
                    'onCannotSendMessage': function onCannotSendMessage() {}
                  }, {
                    'onConnected': function onConnected() {
                      var _0x5fe4b8 = _0x49b5ad;
                      _0x2ee4bd[_0x5fe4b8(0x197)]() && _0x3eb234[_0x5fe4b8(0x111)](_0x5fe4b8(0x4c2), {
                        'event': 'client-state-request',
                        'data': {
                          'serviceId': _0x5fe4b8(0x4c2),
                          'objectId': _0x2ee4bd['getUserId'](),
                          'stateType': 'wallet-type',
                          'token': _0x2ee4bd[_0x5fe4b8(0x2ed)](),
                          'commandId': Date[_0x5fe4b8(0x439)]() + ''
                        }
                      });
                    },
                    'onCannotConnect': function onCannotConnect() {
                      var _0x3adaee = _0x49b5ad;
                      _0x2ee4bd[_0x3adaee(0x263)] = {
                        'amount': 0x0,
                        'version': 0x0
                      }, _0x2ee4bd['token'] = null, _0x2ee4bd[_0x3adaee(0x44b)] = null, _0x2ee4bd[_0x3adaee(0x4b6)] = null;
                    },
                    'onCannotAuthen': function onCannotAuthen() {},
                    'onEvent': this[_0x49b5ad(0x24c)][_0x49b5ad(0x2d7)][_0x49b5ad(0x42f)](this[_0x49b5ad(0x24c)])
                  }), _0x3eb234[_0x49b5ad(0x341)](_0x49b5ad(0x43c), {}, {
                    'onConnected': function onConnected() {},
                    'onCannotConnect': function onCannotConnect() {
                      var _0x20be26 = _0x49b5ad;

                      _0x2ee4bd[_0x20be26(0x2c9)]['emit'](_0x20be26(0x33c));
                    },
                    'onCannotAuthen': function onCannotAuthen() {
                      var _0x508f8f = _0x49b5ad;

                      _0x2ee4bd[_0x508f8f(0x2c9)][_0x508f8f(0x426)]('player-can-not-authen');
                    },
                    'onEvent': this[_0x49b5ad(0x24c)][_0x49b5ad(0x2d7)]['bind'](this[_0x49b5ad(0x24c)])
                  });
                }, _0x1d03f1[_0x3ab179(0x267)]['registerEventOnce'] = function (_0x5c355c, _0x371abd) {
                  var _0x2d78da = _0x3ab179;

                  this[_0x2d78da(0x2c9)][_0x2d78da(0x466)](_0x5c355c, _0x371abd);
                }, _0x1d03f1[_0x3ab179(0x267)][_0x3ab179(0x255)] = function (_0x8d2ef9, _0x2b38d5) {
                  var _0x133031 = _0x3ab179;

                  this[_0x133031(0x2c9)]['on'](_0x8d2ef9, _0x2b38d5);
                }, _0x1d03f1[_0x3ab179(0x267)][_0x3ab179(0x20a)] = function (_0x8d500c, _0x5619f9) {
                  var _0xb1e023 = _0x3ab179;

                  this[_0xb1e023(0x2c9)][_0xb1e023(0x126)](_0x8d500c, _0x5619f9);
                }, _0x1d03f1[_0x3ab179(0x267)]['setWalletBalance'] = function (_0x3a1cab) {
                  var _0x2901cf = _0x3ab179,
                      _0x29d434 = _0x3a1cab[_0x2901cf(0x28e)],
                      _0xfee8a9 = !0x1;

                  isNaN(_0x29d434[_0x2901cf(0x49a)]) || isNaN(_0x29d434[_0x2901cf(0x165)]) || (!this[_0x2901cf(0x263)][_0x2901cf(0x49a)] || this[_0x2901cf(0x263)]['version'] <= _0x29d434['version'] ? (this['wallet'][_0x2901cf(0x165)] = _0x29d434[_0x2901cf(0x165)] || 0x0, this['wallet'][_0x2901cf(0x3e7)] = _0x29d434[_0x2901cf(0x3e7)] || 0x0, this[_0x2901cf(0x263)][_0x2901cf(0x49a)] = _0x29d434['version'], _0xfee8a9 = !0x0) : _0xccf66e[_0x2901cf(0x4b4)][_0x2901cf(0x29a)](_0x2901cf(0x257), this[_0x2901cf(0x263)][_0x2901cf(0x49a)], _0x29d434[_0x2901cf(0x49a)], this['wallet'])), isNaN(_0x29d434[_0x2901cf(0x3ad)]) || isNaN(_0x29d434[_0x2901cf(0x1dd)]) || (!this[_0x2901cf(0x263)][_0x2901cf(0x23c)] || this['wallet']['pVersion'] <= _0x29d434[_0x2901cf(0x3ad)] ? (this[_0x2901cf(0x263)][_0x2901cf(0x393)] = _0x29d434[_0x2901cf(0x1dd)] || 0x0, this['wallet']['pAvailableAmount'] = _0x29d434['pAvaiAmt'] || 0x0, this[_0x2901cf(0x263)][_0x2901cf(0x23c)] = _0x29d434[_0x2901cf(0x3ad)], _0xfee8a9 = !0x0) : _0xccf66e['default'][_0x2901cf(0x29a)](_0x2901cf(0x21d), this[_0x2901cf(0x263)][_0x2901cf(0x23c)], _0x29d434[_0x2901cf(0x3ad)], this[_0x2901cf(0x263)])), _0xfee8a9 && (_0xccf66e[_0x2901cf(0x4b4)]['debug'](_0x2901cf(0x16d), this['wallet']), this[_0x2901cf(0x2c9)][_0x2901cf(0x426)](_0x2901cf(0x36d)));
                }, _0x1d03f1['prototype'][_0x3ab179(0x32a)] = function () {
                  var _0x40fd69 = _0x3ab179;
                  return Math[_0x40fd69(0x38b)](this['wallet'][_0x40fd69(0x165)]);
                }, _0x1d03f1[_0x3ab179(0x267)]['getWallets'] = function () {
                  var _0x867916 = _0x3ab179;
                  return {
                    'amount': Math[_0x867916(0x38b)](this[_0x867916(0x263)][_0x867916(0x165)] || 0x0),
                    'pAmount': Math['floor'](this[_0x867916(0x263)][_0x867916(0x393)] || 0x0)
                  };
                }, _0x1d03f1[_0x3ab179(0x267)][_0x3ab179(0x4d2)] = function (_0x42bb1d) {
                  var _0x5a7ae1 = _0x3ab179;
                  _0x42bb1d && 0x0 !== _0x42bb1d[_0x5a7ae1(0x109)] ? this['walletTypes'] = _0x42bb1d : this[_0x5a7ae1(0x10e)] = [_0x5372ca];
                }, _0x1d03f1[_0x3ab179(0x267)][_0x3ab179(0x248)] = function () {
                  var _0x124767 = _0x3ab179;
                  return this[_0x124767(0x10e)][_0x124767(0x220)](_0x5372ca);
                }, _0x1d03f1[_0x3ab179(0x267)][_0x3ab179(0x38a)] = function () {
                  var _0x56c6c8 = _0x3ab179;
                  return this[_0x56c6c8(0x10e)][_0x56c6c8(0x220)](_0x56c6c8(0x2ee));
                }, _0x1d03f1[_0x3ab179(0x267)][_0x3ab179(0x3a1)] = function () {
                  var _0x10c0a2 = _0x3ab179;
                  return _0x143abc([], this[_0x10c0a2(0x10e)], !0x0);
                }, _0x1d03f1[_0x3ab179(0x267)][_0x3ab179(0x2a0)] = function (_0xa7cd01) {
                  var _0x3a61bb = _0x3ab179;
                  this[_0x3a61bb(0x44b)] = _0xa7cd01;
                }, _0x1d03f1[_0x3ab179(0x267)][_0x3ab179(0x197)] = function () {
                  var _0x335cf6 = _0x3ab179;
                  return this[_0x335cf6(0x44b)] || '';
                }, _0x1d03f1[_0x3ab179(0x267)]['setToken'] = function (_0x234509) {
                  this['token'] = _0x234509;
                }, _0x1d03f1[_0x3ab179(0x267)][_0x3ab179(0x2ed)] = function () {
                  var _0x26ab5 = _0x3ab179;
                  return this[_0x26ab5(0x2a7)] || '';
                }, _0x1d03f1[_0x3ab179(0x267)][_0x3ab179(0x244)] = function (_0x488d5f) {
                  this['displayName'] = _0x488d5f;
                }, _0x1d03f1[_0x3ab179(0x267)][_0x3ab179(0x215)] = function () {
                  var _0x1df28f = _0x3ab179;
                  return this[_0x1df28f(0x4b6)] || '';
                }, _0x1d03f1['prototype']['setAvatar'] = function (_0x3ef177) {
                  this['avatar'] = _0x3ef177;
                }, _0x1d03f1['prototype'][_0x3ab179(0x159)] = function () {
                  return this['avatar'];
                }, _0x1d03f1[_0x3ab179(0x267)][_0x3ab179(0x216)] = function () {
                  return this['ssid'];
                }, _0x1d03f1[_0x3ab179(0x267)][_0x3ab179(0x1d1)] = function () {
                  var _0x5860f2 = _0x3ab179;

                  this[_0x5860f2(0x2c9)]['removeAllListeners']();
                }, _0x1d03f1;
              }();

              _0x2ed418[_0x39ab22(0x481)] = _0x1bf73e;
            },
            0x19be: function _(_0x3219b0, _0x97a51f, _0x101145) {
              var _0x301c57 = a1_0x1adc;

              var _0xaf6ad = this && this['__importDefault'] || function (_0x29f1d2) {
                return _0x29f1d2 && _0x29f1d2['__esModule'] ? _0x29f1d2 : {
                  'default': _0x29f1d2
                };
              };

              Object[_0x301c57(0x42b)](_0x97a51f, _0x301c57(0x2ab), {
                'value': !0x0
              }), _0x97a51f[_0x301c57(0x171)] = void 0x0;

              var _0x990800 = _0xaf6ad(_0x101145(0x28a)),
                  _0x1947b8 = _0x101145(0x1542),
                  _0x310ceb = _0x101145(0x758),
                  _0x5da4c4 = _0x101145(0x233a),
                  _0x211612 = _0x101145(0x1d8f),
                  _0x3c2c09 = _0x101145(0x1531),
                  _0x519247 = _0x101145(0xb46),
                  _0xd7b32b = _0xaf6ad(_0x101145(0x7e9)),
                  _0x46bd87 = function () {
                var _0x2b4f64 = _0x301c57;

                function _0xc90d20() {
                  var _0x418f3d = a1_0x1adc;
                  this['_config'] = {}, this[_0x418f3d(0x325)] = [], this[_0x418f3d(0x33d)] = null, this[_0x418f3d(0x25b)] = new _0x5da4c4[_0x418f3d(0x234)](), this[_0x418f3d(0x1d8)] = new _0x1947b8['Duplicate'](0x3e8), this[_0x418f3d(0x26a)] = new _0x990800[_0x418f3d(0x4b4)](), this['playerStateInfo'] = _0x3c2c09[_0x418f3d(0x481)][_0x418f3d(0x40b)](), this[_0x418f3d(0x245)] = null;
                }

                return _0xc90d20[_0x2b4f64(0x40b)] = function () {
                  var _0x3df3b5 = _0x2b4f64;
                  return _0xc90d20[_0x3df3b5(0x25f)] || (_0xc90d20['instance'] = new _0xc90d20()), _0xc90d20[_0x3df3b5(0x25f)];
                }, _0xc90d20[_0x2b4f64(0x267)][_0x2b4f64(0x18c)] = function (_0x332ea5) {
                  var _0x3438ff = _0x2b4f64,
                      _0x3c530d = this,
                      _0xae4fef = _0x332ea5[_0x3438ff(0x4a1)],
                      _0x235a54 = _0x332ea5['token'],
                      _0x21bb42 = _0x332ea5['env'],
                      _0x156ae0 = _0x332ea5[_0x3438ff(0x222)],
                      _0x5793a1 = _0x332ea5[_0x3438ff(0x34a)],
                      _0x59cb09 = _0x332ea5[_0x3438ff(0x242)],
                      _0x2155b7 = void 0x0 === _0x59cb09 ? {} : _0x59cb09;

                  if (!_0xae4fef) return Promise[_0x3438ff(0x152)]({
                    'isSuccess': !0x1,
                    'message': 'Updated\x20url\x20must\x20not\x20empty.'
                  });
                  if (!_0x235a54) return Promise['reject']({
                    'isSuccess': !0x1,
                    'message': _0x3438ff(0x2e6)
                  });

                  if (this[_0x3438ff(0x2cb)][_0x3438ff(0x2a7)] === _0x235a54) {
                    if (Array[_0x3438ff(0x3cc)](_0xae4fef)) {
                      if (_0xae4fef[_0x3438ff(0x220)](this['_config'][_0x3438ff(0x1a0)])) return Promise[_0x3438ff(0x296)]({
                        'isSuccess': !0x0,
                        'message': _0x3438ff(0x350)
                      });
                    } else {
                      if (_0xae4fef === this[_0x3438ff(0x2cb)][_0x3438ff(0x1a0)]) return Promise[_0x3438ff(0x296)]({
                        'isSuccess': !0x0,
                        'message': _0x3438ff(0x350)
                      });
                    }
                  }

                  _0xd7b32b['default'][_0x3438ff(0x29a)]('MessageManager\x20-\x20Update\x20new\x20config:\x20%j', {
                    'socketUrl': _0xae4fef,
                    'token': _0x235a54
                  }), this[_0x3438ff(0x1c0)]();

                  var _0x3af4ca;

                  if (_0x3af4ca = Array['isArray'](_0xae4fef) ? _0xae4fef[parseInt(0x2710 * Math['random']()) % _0xae4fef['length']] : _0xae4fef, this['_config'][_0x3438ff(0x1a0)] = _0x3af4ca, this[_0x3438ff(0x2cb)][_0x3438ff(0x2a7)] = _0x235a54, this[_0x3438ff(0x2cb)]['env'] = _0x21bb42, this[_0x3438ff(0x2cb)][_0x3438ff(0x222)] = _0x156ae0, this[_0x3438ff(0x2cb)][_0x3438ff(0x3a2)] = _0x332ea5, this[_0x3438ff(0x300)][_0x3438ff(0x2c7)](this), this[_0x3438ff(0x300)][_0x3438ff(0x277)](_0x235a54), _0x5793a1) {
                    _0xd7b32b[_0x3438ff(0x4b4)][_0x3438ff(0x29a)](_0x3438ff(0x11f), _0x235a54), _0x2155b7 && (_0x2155b7[_0x3438ff(0x13c)] = this[_0x3438ff(0x300)][_0x3438ff(0x216)]());

                    var _0x4bbaba = this['doLogin'](_0x332ea5);

                    return _0x4bbaba[_0x3438ff(0x1ca)](function (_0x3a121d) {
                      var _0x326b7e = _0x3438ff;
                      _0x3a121d[_0x326b7e(0x493)] ? _0x3c530d['_initSocket']() : (_0x3c530d[_0x326b7e(0x25b)]['onCannotAuthen'](), _0x3c530d[_0x326b7e(0x1c0)]());
                    }), _0x4bbaba;
                  }

                  return this[_0x3438ff(0x2d2)](), Promise[_0x3438ff(0x296)]({
                    'isSuccess': !0x0,
                    'message': _0x3438ff(0x19b)
                  });
                }, _0xc90d20[_0x2b4f64(0x267)][_0x2b4f64(0x2fe)] = function (_0x46aff2) {
                  var _0x48f141 = _0x2b4f64;
                  if (!this[_0x48f141(0x33d)]) throw new Error(_0x48f141(0x34f));

                  this[_0x48f141(0x33d)]['subscribe'](_0x46aff2);
                }, _0xc90d20[_0x2b4f64(0x267)][_0x2b4f64(0x3dd)] = function (_0x48347d) {
                  var _0x279fb2 = _0x2b4f64;
                  this['_socketManager'] && this[_0x279fb2(0x33d)][_0x279fb2(0x3dd)](_0x48347d);
                }, _0xc90d20['prototype']['sendMessage'] = function (_0x2843b1, _0x56aa06, _0x16b37f) {
                  var _0x124549 = _0x2b4f64;
                  return void 0x0 === _0x2843b1 && (_0x2843b1 = ''), void 0x0 === _0x56aa06 && (_0x56aa06 = {}), void 0x0 === _0x16b37f && (_0x16b37f = ''), _0x16b37f = _0x16b37f || (0, _0x310ceb[_0x124549(0x2d4)])(), this['_messageIdServiceIdMap'][_0x124549(0x176)](_0x16b37f, _0x2843b1), this['_socketManager'] ? this[_0x124549(0x33d)][_0x124549(0x218)]() ? (_0xd7b32b['default'][_0x124549(0x29a)](_0x124549(0x3f9), _0x2843b1, _0x56aa06), this[_0x124549(0x33d)][_0x124549(0x111)]({
                    'messageId': _0x16b37f,
                    'data': _0x56aa06
                  })) : (this[_0x124549(0x325)]['push']({
                    'serviceId': _0x2843b1,
                    'payload': _0x56aa06,
                    'messageId': _0x16b37f
                  }), this[_0x124549(0x2d2)]()) : this[_0x124549(0x325)][_0x124549(0x4c0)]({
                    'serviceId': _0x2843b1,
                    'payload': _0x56aa06,
                    'messageId': _0x16b37f
                  }), _0x16b37f;
                }, _0xc90d20[_0x2b4f64(0x267)][_0x2b4f64(0x333)] = function (_0x114ce5) {
                  var _0xfcc709 = _0x2b4f64;

                  if (void 0x0 === _0x114ce5 && (_0x114ce5 = {}), this[_0xfcc709(0x33d)]) {
                    var _0x3b358f = {
                      'messageId': (0, _0x310ceb[_0xfcc709(0x2d4)])(),
                      'data': _0x114ce5
                    };
                    _0xd7b32b[_0xfcc709(0x4b4)][_0xfcc709(0x29a)]('MessageManager\x20-\x20sendChatMessage:\x20%j', _0x3b358f), this['_socketManager'][_0xfcc709(0x333)](_0x3b358f);
                  } else _0xd7b32b[_0xfcc709(0x4b4)][_0xfcc709(0x47c)](_0xfcc709(0x12e));
                }, _0xc90d20[_0x2b4f64(0x267)]['removeSendingMessage'] = function (_0x134b96) {
                  var _0x1ed874 = _0x2b4f64;
                  this[_0x1ed874(0x33d)] && this[_0x1ed874(0x33d)][_0x1ed874(0x31b)](_0x134b96);
                }, _0xc90d20[_0x2b4f64(0x267)]['registerGame'] = function (_0xe34a6c, _0x54d359, _0x17b712) {
                  var _0x11bbca = _0x2b4f64;
                  void 0x0 === _0xe34a6c && (_0xe34a6c = ''), this['_routingEventHandler'][_0x11bbca(0x341)](_0xe34a6c, _0x54d359, _0x17b712);
                }, _0xc90d20[_0x2b4f64(0x267)][_0x2b4f64(0x499)] = function (_0x5364b8) {
                  var _0x1531db = _0x2b4f64;
                  void 0x0 === _0x5364b8 && (_0x5364b8 = ''), this['_routingEventHandler'][_0x1531db(0x499)](_0x5364b8);
                }, _0xc90d20[_0x2b4f64(0x267)][_0x2b4f64(0x1c0)] = function () {
                  var _0x55b79a = _0x2b4f64;
                  _0xd7b32b['default'][_0x55b79a(0x29a)]('MessageManager\x20-\x20closeAndCleanUp.'), this[_0x55b79a(0x25b)][_0x55b79a(0x2e5)](), this[_0x55b79a(0x25b)][_0x55b79a(0x1d1)](), this[_0x55b79a(0x2cb)] = {}, this['_duplicateMessageId'][_0x55b79a(0x184)](), this[_0x55b79a(0x26a)][_0x55b79a(0x2f8)](), this[_0x55b79a(0x325)] = [], this['_socketManager'] && (this[_0x55b79a(0x33d)][_0x55b79a(0x1b9)](), this[_0x55b79a(0x33d)] = null), this['playerStateInfo'][_0x55b79a(0x1d1)](), this['_stopIntervalExtendToken']();
                }, _0xc90d20['prototype'][_0x2b4f64(0x289)] = function (_0x3db9e4) {
                  var _0x26e593 = _0x2b4f64,
                      _0x2b8f1f = this,
                      _0x1e9462 = _0x3db9e4[_0x26e593(0x4a5)],
                      _0x5abe6b = _0x3db9e4[_0x26e593(0x47e)],
                      _0x5452ea = _0x3db9e4['token'],
                      _0x489292 = _0x3db9e4[_0x26e593(0x34a)],
                      _0x511818 = _0x3db9e4['device'],
                      _0x1927c8 = void 0x0 === _0x511818 ? {} : _0x511818,
                      _0x1a6551 = new _0x519247[_0x26e593(0x3be)]();

                  return _0x489292[_0x26e593(0x4a8)]({
                    'apiUrl': _0x1e9462,
                    'url': _0x5abe6b,
                    'params': {},
                    'data': {
                      'token': _0x5452ea,
                      'device': JSON[_0x26e593(0x2eb)](_0x1927c8)
                    },
                    'callback': function callback(_0x523653) {
                      var _0x4dde7f = _0x26e593,
                          _0x19c787 = _0x523653['data'];
                      _0x19c787[_0x4dde7f(0x28e)] && _0x19c787['data']['userId'] ? (_0xd7b32b[_0x4dde7f(0x4b4)][_0x4dde7f(0x29a)](_0x4dde7f(0x207), _0x19c787), _0x19c787 = _0x19c787[_0x4dde7f(0x28e)], _0x2b8f1f[_0x4dde7f(0x300)][_0x4dde7f(0x2a0)](_0x19c787[_0x4dde7f(0x44b)]), _0x2b8f1f['playerStateInfo'][_0x4dde7f(0x277)](_0x19c787[_0x4dde7f(0x2a7)]), _0x2b8f1f['playerStateInfo'][_0x4dde7f(0x244)](_0x19c787[_0x4dde7f(0x4b6)]), _0x2b8f1f[_0x4dde7f(0x300)]['setWalletBalance']({
                        'data': {
                          'amount': parseInt(_0x19c787[_0x4dde7f(0x263)]),
                          'availableAmount': parseInt(_0x19c787['wallet']),
                          'version': parseInt(_0x19c787[_0x4dde7f(0x37e)]),
                          'pAmt': parseInt(_0x19c787[_0x4dde7f(0x33b)]),
                          'pAvaiAmt': parseInt(_0x19c787[_0x4dde7f(0x33b)]),
                          'pVer': parseInt(_0x19c787[_0x4dde7f(0x37e)])
                        }
                      }), _0x2b8f1f['playerStateInfo']['setWalletType'](_0x19c787['walletType']), _0x1a6551['resolve']({
                        'isSuccess': !0x0,
                        'message': 'Login\x20success.\x20Connecting'
                      })) : (_0xd7b32b[_0x4dde7f(0x4b4)][_0x4dde7f(0x29a)]('Authen\x20token\x20fail:\x20%j', _0x19c787), _0x1a6551['resolve']({
                        'isSuccess': !0x1,
                        'message': _0x4dde7f(0x163)
                      }));
                    },
                    'callbackErr': function callbackErr() {
                      var _0x2c1725 = _0x26e593;
                      _0xd7b32b[_0x2c1725(0x4b4)]['debug']('Authen\x20token\x20error'), _0x1a6551[_0x2c1725(0x296)]({
                        'isSuccess': !0x1,
                        'message': 'Login\x20error.\x20Clean\x20up.'
                      });
                    }
                  }), _0x1a6551[_0x26e593(0x438)]();
                }, _0xc90d20['prototype'][_0x2b4f64(0x38d)] = function () {
                  var _0xf9961e = _0x2b4f64,
                      _0x22f832 = this;

                  this['_stopIntervalExtendToken'](), this[_0xf9961e(0x245)] = setInterval(function () {
                    var _0x34262a = _0xf9961e;

                    _0x22f832[_0x34262a(0x111)](_0x34262a(0x43c), {
                      'event': _0x34262a(0x29f),
                      'data': {
                        'tkn': _0x22f832['playerStateInfo'][_0x34262a(0x2ed)](),
                        'cId': (0, _0x310ceb['uuid'])(),
                        'sId': _0x34262a(0x43c)
                      }
                    });
                  }, 0x493e0);
                }, _0xc90d20[_0x2b4f64(0x267)][_0x2b4f64(0x4bb)] = function () {
                  var _0xeb11af = _0x2b4f64;
                  clearInterval(this[_0xeb11af(0x245)]), this[_0xeb11af(0x245)] = null;
                }, _0xc90d20['prototype'][_0x2b4f64(0x2d2)] = function () {
                  var _0x426908 = _0x2b4f64,
                      _0x1b5023 = this;

                  _0xd7b32b[_0x426908(0x4b4)][_0x426908(0x29a)](_0x426908(0x37a)), this[_0x426908(0x33d)] && this[_0x426908(0x33d)][_0x426908(0x218)]() ? _0xd7b32b[_0x426908(0x4b4)][_0x426908(0x29a)]('MessageManager\x20-\x20_initSocket\x20-\x20exist\x20socket.') : (_0xd7b32b[_0x426908(0x4b4)][_0x426908(0x29a)]('MessageManager\x20-\x20_initSocket\x20-\x20new\x20socket.'), this[_0x426908(0x33d)] = new _0x211612[_0x426908(0x1a9)]({
                    'url': this['_config'][_0x426908(0x1a0)],
                    'token': this[_0x426908(0x2cb)][_0x426908(0x2a7)],
                    'env': this[_0x426908(0x2cb)][_0x426908(0x498)],
                    'games': this[_0x426908(0x2cb)][_0x426908(0x222)],
                    'reconnectionAttempts': 0xf423f,
                    'reconnectionDelay': 0x1f4,
                    'nextTickIn': 0x96,
                    'numberRetrySendingMessage': 0xa,
                    'ssid': this[_0x426908(0x300)][_0x426908(0x216)]()
                  }), this[_0x426908(0x26d)](), this[_0x426908(0x20c)](), this[_0x426908(0x325)][_0x426908(0x37b)](function (_0x4db369) {
                    var _0xc98d9b = _0x426908,
                        _0x6d5b4c = _0x4db369[_0xc98d9b(0x46c)],
                        _0x5a322f = void 0x0 === _0x6d5b4c ? '' : _0x6d5b4c,
                        _0x8ebf70 = _0x4db369[_0xc98d9b(0x418)],
                        _0x40a5c0 = void 0x0 === _0x8ebf70 ? {} : _0x8ebf70,
                        _0x2ac0b7 = _0x4db369[_0xc98d9b(0x147)],
                        _0x2564d0 = void 0x0 === _0x2ac0b7 ? '' : _0x2ac0b7;

                    _0x1b5023['sendMessage'](_0x5a322f, _0x40a5c0, _0x2564d0);
                  }), this[_0x426908(0x325)] = []);
                }, _0xc90d20[_0x2b4f64(0x267)][_0x2b4f64(0x26d)] = function () {
                  var _0x744bea = _0x2b4f64,
                      _0x33bf90 = this;

                  _0xd7b32b[_0x744bea(0x4b4)][_0x744bea(0x29a)]('MessageManager\x20-\x20_handleSocketEvent.'), this['_socketManager'] ? (this[_0x744bea(0x33d)][_0x744bea(0x255)](_0x211612[_0x744bea(0x1a9)]['NEW_MESSAGE_EVENT'], function (_0x1ede19) {
                    var _0x5ddd1e = _0x744bea;
                    _0x33bf90[_0x5ddd1e(0x1d8)][_0x5ddd1e(0x164)](_0x1ede19[_0x5ddd1e(0x147)]) || (_0x33bf90[_0x5ddd1e(0x1d8)][_0x5ddd1e(0x32b)](_0x1ede19[_0x5ddd1e(0x147)]), _0x33bf90[_0x5ddd1e(0x25b)]['onEvent'](_0x1ede19[_0x5ddd1e(0x28e)]));
                  }), this[_0x744bea(0x33d)][_0x744bea(0x255)](_0x211612[_0x744bea(0x1a9)][_0x744bea(0x4d0)], function (_0x45a7b7) {
                    var _0x2e2c87 = _0x744bea,
                        _0x3560a4 = _0x33bf90[_0x2e2c87(0x26a)][_0x2e2c87(0x1e6)](_0x45a7b7);

                    _0x3560a4 && (_0x33bf90[_0x2e2c87(0x25b)]['onAck'](_0x3560a4, _0x45a7b7), _0x33bf90[_0x2e2c87(0x26a)][_0x2e2c87(0x387)](_0x45a7b7));
                  }), this[_0x744bea(0x33d)]['registerEvent'](_0x211612[_0x744bea(0x1a9)][_0x744bea(0x273)], function (_0x35d0bb) {
                    var _0x2dd162 = _0x744bea,
                        _0x5722d = _0x33bf90[_0x2dd162(0x26a)]['get'](_0x35d0bb);

                    _0x5722d && (_0x33bf90[_0x2dd162(0x26a)]['delete'](_0x35d0bb), _0x33bf90['_routingEventHandler'][_0x2dd162(0x372)](_0x5722d, _0x35d0bb));
                  }), this[_0x744bea(0x33d)][_0x744bea(0x255)](_0x211612[_0x744bea(0x1a9)][_0x744bea(0x1b8)], function (_0x49feb5) {
                    var _0x660202 = _0x744bea,
                        _0x1dd5c9 = _0x49feb5['token'];

                    _0x33bf90[_0x660202(0x300)][_0x660202(0x277)](_0x1dd5c9);
                  })) : _0xd7b32b[_0x744bea(0x4b4)][_0x744bea(0x47c)]('MessageManager\x20-\x20_handleSocketEvent\x20with\x20null\x20_socketManager');
                }, _0xc90d20[_0x2b4f64(0x267)][_0x2b4f64(0x20c)] = function () {
                  var _0x2d528d = _0x2b4f64,
                      _0x2dbf1a = this;

                  _0xd7b32b[_0x2d528d(0x4b4)][_0x2d528d(0x29a)]('MessageManager\x20-\x20_handleSocketStatus.'), this['_socketManager'] ? (this['_socketManager'][_0x2d528d(0x255)](_0x211612[_0x2d528d(0x1a9)][_0x2d528d(0x475)], function () {
                    var _0x1fa0cb = _0x2d528d;
                    _0x2dbf1a[_0x1fa0cb(0x25b)][_0x1fa0cb(0x2e5)](), _0x2dbf1a[_0x1fa0cb(0x1c0)]();
                  }), this['_socketManager']['registerEvent'](_0x211612['SocketManager'][_0x2d528d(0x4bd)], function () {
                    var _0x5cd169 = _0x2d528d;

                    _0x2dbf1a[_0x5cd169(0x25b)][_0x5cd169(0x334)]();
                  }), this[_0x2d528d(0x33d)][_0x2d528d(0x255)](_0x211612[_0x2d528d(0x1a9)][_0x2d528d(0x1b1)], function () {
                    var _0x4f7205 = _0x2d528d;

                    _0x2dbf1a[_0x4f7205(0x25b)]['onNetworkStatus'](_0x211612[_0x4f7205(0x1a9)][_0x4f7205(0x1b1)]);
                  }), this[_0x2d528d(0x33d)]['registerEvent'](_0x211612['SocketManager'][_0x2d528d(0x1fd)], function () {
                    var _0x32c5f2 = _0x2d528d;

                    _0x2dbf1a['_routingEventHandler'][_0x32c5f2(0x335)](_0x211612[_0x32c5f2(0x1a9)]['DISCONNECTED_CONNECTION']);
                  }), this[_0x2d528d(0x33d)][_0x2d528d(0x255)](_0x211612['SocketManager']['POPUP_DISCONNECTED_EVENT'], function () {
                    var _0x34db5f = _0x2d528d;

                    _0x2dbf1a[_0x34db5f(0x25b)][_0x34db5f(0x2c3)](_0x211612[_0x34db5f(0x1a9)][_0x34db5f(0x246)]);
                  }), this[_0x2d528d(0x33d)]['registerEvent'](_0x211612[_0x2d528d(0x1a9)][_0x2d528d(0x3fd)], function (_0x17ccb8) {
                    var _0x2c5e7b = _0x2d528d;

                    _0x2dbf1a[_0x2c5e7b(0x25b)][_0x2c5e7b(0x352)](_0x17ccb8);
                  })) : _0xd7b32b[_0x2d528d(0x4b4)][_0x2d528d(0x47c)](_0x2d528d(0x3e1));
                }, _0xc90d20;
              }();

              _0x97a51f['MessageManager'] = _0x46bd87;
            },
            0x233a: function _(_0x4e8559, _0x1d22b9, _0x167a5e) {
              var _0x42be07 = a1_0x1adc;

              var _0x172b33 = this && this[_0x42be07(0x395)] || function (_0x58d4cf) {
                var _0x44e9b8 = _0x42be07;
                return _0x58d4cf && _0x58d4cf[_0x44e9b8(0x2ab)] ? _0x58d4cf : {
                  'default': _0x58d4cf
                };
              };

              Object[_0x42be07(0x42b)](_0x1d22b9, '__esModule', {
                'value': !0x0
              }), _0x1d22b9[_0x42be07(0x234)] = void 0x0;

              var _0x2dbc6c = _0x172b33(_0x167a5e(0x28a)),
                  _0x4e1cdd = function () {
                var _0x2a538c = _0x42be07;

                function _0x2c1c4e() {
                  var _0x2b50a4 = a1_0x1adc;
                  this['_commandHandlerMap'] = new _0x2dbc6c[_0x2b50a4(0x4b4)](), this[_0x2b50a4(0x2be)] = new _0x2dbc6c['default']();
                }

                return _0x2c1c4e['prototype'][_0x2a538c(0x341)] = function (_0x3c4745, _0x237260, _0x2a7a5c) {
                  var _0x4b3394 = _0x2a538c;
                  void 0x0 === _0x3c4745 && (_0x3c4745 = ''), this[_0x4b3394(0x42c)][_0x4b3394(0x176)](_0x3c4745, _0x237260), this['_eventHandlerMap'][_0x4b3394(0x176)](_0x3c4745, _0x2a7a5c);
                }, _0x2c1c4e[_0x2a538c(0x267)][_0x2a538c(0x499)] = function (_0x21207e) {
                  var _0x5e430e = _0x2a538c;
                  void 0x0 === _0x21207e && (_0x21207e = ''), this[_0x5e430e(0x42c)][_0x5e430e(0x387)](_0x21207e), this[_0x5e430e(0x2be)]['delete'](_0x21207e);
                }, _0x2c1c4e[_0x2a538c(0x267)][_0x2a538c(0x4b2)] = function (_0x54e38c, _0x4b4008) {
                  var _0x5a85a7 = _0x2a538c;
                  void 0x0 === _0x54e38c && (_0x54e38c = ''), void 0x0 === _0x4b4008 && (_0x4b4008 = '');

                  var _0x640c5b = this[_0x5a85a7(0x42c)]['get'](_0x54e38c);

                  _0x640c5b && _0x640c5b['onAck'](_0x4b4008);
                }, _0x2c1c4e[_0x2a538c(0x267)][_0x2a538c(0x372)] = function (_0x4a81b8, _0x478afd) {
                  var _0x52674a = _0x2a538c;
                  void 0x0 === _0x4a81b8 && (_0x4a81b8 = ''), void 0x0 === _0x478afd && (_0x478afd = '');

                  var _0x2e981d = this['_commandHandlerMap'][_0x52674a(0x1e6)](_0x4a81b8);

                  _0x2e981d && _0x2e981d[_0x52674a(0x372)](_0x478afd);
                }, _0x2c1c4e['prototype'][_0x2a538c(0x2e5)] = function () {
                  var _0x13de34 = _0x2a538c,
                      _0x5be502 = this;

                  this[_0x13de34(0x2be)]['keys']()['forEach'](function (_0x1f831a) {
                    var _0x53f047 = _0x13de34;
                    void 0x0 === _0x1f831a && (_0x1f831a = '');

                    var _0x49679b = _0x5be502['_eventHandlerMap']['get'](_0x1f831a);

                    _0x49679b && _0x49679b[_0x53f047(0x2e5)]();
                  });
                }, _0x2c1c4e[_0x2a538c(0x267)][_0x2a538c(0x4c1)] = function (_0x3f43e5) {
                  var _0x181fda = _0x2a538c,
                      _0x40bf10 = this;

                  this[_0x181fda(0x2be)][_0x181fda(0x3ef)]()[_0x181fda(0x37b)](function (_0x1bc0c0) {
                    var _0x1babcf = _0x181fda;
                    void 0x0 === _0x1bc0c0 && (_0x1bc0c0 = '');

                    var _0x5924b7 = _0x40bf10[_0x1babcf(0x2be)][_0x1babcf(0x1e6)](_0x1bc0c0);

                    _0x5924b7 && _0x5924b7['onNetworkStatus'] && _0x5924b7[_0x1babcf(0x4c1)](_0x3f43e5);
                  });
                }, _0x2c1c4e[_0x2a538c(0x267)]['onNetworkWarning'] = function (_0x360f07) {
                  var _0x4c4e43 = _0x2a538c,
                      _0x116163 = this;

                  this[_0x4c4e43(0x2be)][_0x4c4e43(0x3ef)]()[_0x4c4e43(0x37b)](function (_0x331518) {
                    var _0x439500 = _0x4c4e43;
                    void 0x0 === _0x331518 && (_0x331518 = '');

                    var _0x30f309 = _0x116163[_0x439500(0x2be)][_0x439500(0x1e6)](_0x331518);

                    _0x30f309 && _0x30f309[_0x439500(0x335)] && _0x30f309[_0x439500(0x335)](_0x360f07);
                  });
                }, _0x2c1c4e[_0x2a538c(0x267)][_0x2a538c(0x2c3)] = function (_0x3abe07) {
                  var _0x309cb8 = _0x2a538c,
                      _0xe972ad = this;

                  this['_eventHandlerMap'][_0x309cb8(0x3ef)]()['forEach'](function (_0x1ff07d) {
                    var _0x48c576 = _0x309cb8;
                    void 0x0 === _0x1ff07d && (_0x1ff07d = '');

                    var _0x20012e = _0xe972ad['_eventHandlerMap'][_0x48c576(0x1e6)](_0x1ff07d);

                    _0x20012e && _0x20012e[_0x48c576(0x2c3)] && _0x20012e[_0x48c576(0x2c3)]();
                  });
                }, _0x2c1c4e[_0x2a538c(0x267)]['onCannotAuthen'] = function () {
                  var _0x33519d = _0x2a538c,
                      _0x1a54a1 = this;

                  this[_0x33519d(0x2be)][_0x33519d(0x3ef)]()[_0x33519d(0x37b)](function (_0x36bca4) {
                    var _0x2431b2 = _0x33519d;
                    void 0x0 === _0x36bca4 && (_0x36bca4 = '');

                    var _0x2be7af = _0x1a54a1[_0x2431b2(0x2be)][_0x2431b2(0x1e6)](_0x36bca4);

                    _0x2be7af && _0x2be7af[_0x2431b2(0x354)]();
                  });
                }, _0x2c1c4e[_0x2a538c(0x267)]['onConnected'] = function () {
                  var _0x5629e1 = _0x2a538c,
                      _0x5d1378 = this;

                  this[_0x5629e1(0x2be)][_0x5629e1(0x3ef)]()[_0x5629e1(0x37b)](function (_0x13c5ee) {
                    var _0x130ed7 = _0x5629e1;
                    void 0x0 === _0x13c5ee && (_0x13c5ee = '');

                    var _0x5b667e = _0x5d1378[_0x130ed7(0x2be)]['get'](_0x13c5ee);

                    _0x5b667e && _0x5b667e[_0x130ed7(0x334)]();
                  });
                }, _0x2c1c4e[_0x2a538c(0x267)][_0x2a538c(0x352)] = function (_0x1d7549) {
                  var _0x4bee79 = _0x2a538c,
                      _0x3f70c7 = this;

                  this[_0x4bee79(0x2be)][_0x4bee79(0x3ef)]()[_0x4bee79(0x37b)](function (_0x3da610) {
                    var _0x39b977 = _0x4bee79;
                    void 0x0 === _0x3da610 && (_0x3da610 = '');

                    var _0x360373 = _0x3f70c7['_eventHandlerMap']['get'](_0x3da610);

                    _0x360373 && _0x360373[_0x39b977(0x352)] && _0x360373[_0x39b977(0x352)](_0x1d7549);
                  });
                }, _0x2c1c4e['prototype'][_0x2a538c(0x2d7)] = function (_0x3af7ef) {
                  var _0x3722f3 = _0x2a538c,
                      _0x1bd866 = this[_0x3722f3(0x2be)][_0x3722f3(0x1e6)](_0x3af7ef[_0x3722f3(0x46c)]);

                  _0x1bd866 && _0x1bd866[_0x3722f3(0x2d7)](_0x3af7ef);
                }, _0x2c1c4e[_0x2a538c(0x267)][_0x2a538c(0x1d1)] = function () {
                  var _0x5d7b4b = _0x2a538c;
                  this[_0x5d7b4b(0x42c)][_0x5d7b4b(0x2f8)](), this[_0x5d7b4b(0x2be)][_0x5d7b4b(0x2f8)]();
                }, _0x2c1c4e;
              }();

              _0x1d22b9[_0x42be07(0x234)] = _0x4e1cdd;
            },
            0xa79: function _(_0x2ae12c, _0x3d86d2) {
              var _0x4fe376 = a1_0x1adc;
              Object['defineProperty'](_0x3d86d2, _0x4fe376(0x2ab), {
                'value': !0x0
              }), _0x3d86d2[_0x4fe376(0x368)] = void 0x0;

              var _0x166b3a = function () {
                var _0x297aa4 = _0x4fe376;

                function _0x15deee(_0x499c7a) {
                  var _0x6c5390 = a1_0x1adc;
                  void 0x0 === _0x499c7a && (_0x499c7a = 0x3), this['_ackPacket'] = {}, this['_ids'] = 0x0, this[_0x6c5390(0x479)] = _0x499c7a;
                }

                return _0x15deee[_0x297aa4(0x267)][_0x297aa4(0x151)] = function () {
                  var _0x6796c3 = _0x297aa4;
                  return Object['keys'](this[_0x6796c3(0x487)])[_0x6796c3(0x109)] > 0x0;
                }, _0x15deee[_0x297aa4(0x267)]['addNew'] = function (_0x6ed2fa) {
                  var _0x2c0fd8 = _0x297aa4,
                      _0x54049a = this[_0x2c0fd8(0x2ef)]++;

                  return this['_ackPacket'][_0x54049a] = {
                    'counter': 0x0,
                    'message': _0x6ed2fa
                  }, _0x54049a;
                }, _0x15deee[_0x297aa4(0x267)][_0x297aa4(0x31b)] = function (_0x2a3c2e) {
                  var _0x2ce0cc = _0x297aa4,
                      _0x49df32 = this;

                  Object['keys'](this[_0x2ce0cc(0x487)])[_0x2ce0cc(0x37b)](function (_0x499c8f) {
                    var _0x11d4d0 = _0x2ce0cc,
                        _0x2cf4a8 = _0x49df32[_0x11d4d0(0x487)][_0x499c8f][_0x11d4d0(0x1cd)];

                    _0x2a3c2e(_0x2cf4a8) && delete _0x49df32[_0x11d4d0(0x487)][_0x499c8f];
                  });
                }, _0x15deee[_0x297aa4(0x267)][_0x297aa4(0x40f)] = function (_0x197676, _0xdf8ebc) {
                  var _0x58c5e9 = _0x297aa4,
                      _0x1368f3,
                      _0x2ec1b5 = this;

                  Object['keys'](this[_0x58c5e9(0x487)])[_0x58c5e9(0x37b)](function (_0x157bae) {
                    var _0x5de569 = _0x58c5e9;
                    0x0 === (_0x1368f3 = _0x2ec1b5['_ackPacket'][_0x157bae])[_0x5de569(0x490)] ? _0x1368f3[_0x5de569(0x490)]++ : _0x1368f3[_0x5de569(0x490)] < _0x2ec1b5['maxRetry'] ? (_0x197676(_0x157bae, _0x1368f3[_0x5de569(0x1cd)], _0x1368f3['counter']), _0x1368f3[_0x5de569(0x490)]++) : (delete _0x2ec1b5[_0x5de569(0x487)][_0x157bae], _0xdf8ebc(_0x1368f3[_0x5de569(0x1cd)]));
                  });
                }, _0x15deee['prototype'][_0x297aa4(0x1d2)] = function (_0x321d57) {
                  var _0x21397b = _0x297aa4,
                      _0x2717a7 = this['_ackPacket'][_0x321d57];
                  return delete this[_0x21397b(0x487)][_0x321d57], _0x2717a7 ? _0x2717a7[_0x21397b(0x1cd)] : null;
                }, _0x15deee['prototype'][_0x297aa4(0x24d)] = function (_0x5d07e3) {
                  var _0x526744 = _0x297aa4,
                      _0x23102e = this;

                  Object[_0x526744(0x3ef)](this[_0x526744(0x487)])[_0x526744(0x37b)](function (_0x4c7e1e) {
                    var _0x27cba1 = _0x526744;
                    _0x23102e[_0x27cba1(0x487)][_0x4c7e1e]['counter'] = _0x5d07e3;
                  });
                }, _0x15deee[_0x297aa4(0x267)][_0x297aa4(0x1f0)] = function (_0x179caf, _0x581335) {
                  var _0x208941 = _0x297aa4;
                  this[_0x208941(0x487)][_0x179caf][_0x208941(0x490)] = _0x581335;
                }, _0x15deee['prototype'][_0x297aa4(0x184)] = function () {
                  var _0x27ee6e = _0x297aa4;
                  this[_0x27ee6e(0x487)] = {};
                }, _0x15deee;
              }();

              _0x3d86d2[_0x4fe376(0x368)] = _0x166b3a;
            },
            0x1d8f: function _(_0x1a5ea6, _0x3e8a6e, _0x3c90f7) {
              var _0x4e66e9 = a1_0x1adc;

              var _0x312773 = this && this[_0x4e66e9(0x395)] || function (_0x5407fc) {
                var _0x1270ef = _0x4e66e9;
                return _0x5407fc && _0x5407fc[_0x1270ef(0x2ab)] ? _0x5407fc : {
                  'default': _0x5407fc
                };
              };

              Object[_0x4e66e9(0x42b)](_0x3e8a6e, _0x4e66e9(0x2ab), {
                'value': !0x0
              }), _0x3e8a6e[_0x4e66e9(0x1a9)] = void 0x0;

              var _0x3ef7a1 = _0x3c90f7(0xa79),
                  _0x43d17f = _0x312773(_0x3c90f7(0x7e9)),
                  _0x26e4cf = _0x312773(_0x3c90f7(0x1c13)),
                  _0x23c0fd = _0x3c90f7(0x1a99),
                  _0xaa19d2 = _0x312773(_0x3c90f7(0x2501)),
                  _0x2bbbc9 = _0x3c90f7(0x11f2),
                  _0x557a7c = 'v5',
                  _0x5942ce = 'v4',
                  _0x10b9f4 = 'v5',
                  _0x2d1576 = function () {
                var _0x3a6c24 = _0x4e66e9;

                function _0x54df50(_0xa251a0) {
                  var _0x3ae0f8 = a1_0x1adc;
                  this[_0x3ae0f8(0x12c)] = [], this[_0x3ae0f8(0x224)] = [], this[_0x3ae0f8(0x408)] = 0x0, this[_0x3ae0f8(0x377)] = _0x557a7c, this['_latency'] = {
                    'listLastLatency': [],
                    'maxLastLatency': 0x5,
                    'currentLatencyIdx': -0x1,
                    'averageLatency': 0x96
                  }, this[_0x3ae0f8(0x407)] = 0x0, this['_socket'] = null, this[_0x3ae0f8(0x31c)] = '', this[_0x3ae0f8(0x380)] = null, this['_opt'] = this[_0x3ae0f8(0x1fe)](_0xa251a0), this[_0x3ae0f8(0x2c9)] = new _0x26e4cf[_0x3ae0f8(0x4b4)](), this['_packetManager'] = new _0x3ef7a1[_0x3ae0f8(0x368)](this[_0x3ae0f8(0x294)][_0x3ae0f8(0x301)]), this[_0x3ae0f8(0x297)] = _0x54df50[_0x3ae0f8(0x1be)], this['_initNewConnection']();
                }

                return _0x54df50[_0x3a6c24(0x267)][_0x3a6c24(0x4b5)] = function () {
                  var _0x53b230 = _0x3a6c24;
                  return _0x53b230(0x2fc)[_0x53b230(0x46f)](this['_opt'][_0x53b230(0x2a7)], _0x53b230(0x3f7))[_0x53b230(0x46f)](_0x557a7c, _0x53b230(0x39a))[_0x53b230(0x46f)](this[_0x53b230(0x294)]['env'], '&games=')[_0x53b230(0x46f)](this[_0x53b230(0x294)][_0x53b230(0x222)], _0x53b230(0x322))[_0x53b230(0x46f)](this[_0x53b230(0x294)][_0x53b230(0x13c)]);
                }, _0x54df50[_0x3a6c24(0x267)][_0x3a6c24(0x12b)] = function () {
                  var _0x3ff5dc = _0x3a6c24,
                      _0x27a77b = this;

                  Object[_0x3ff5dc(0x3ef)](_0x23c0fd[_0x3ff5dc(0x381)])[_0x3ff5dc(0x37b)](function (_0x401b54) {
                    var _0x43808f = _0x3ff5dc;
                    delete _0x23c0fd[_0x43808f(0x381)][_0x401b54];
                  }), this[_0x3ff5dc(0x297)] !== _0x54df50['STATUS_KILLED'] ? (this['_socket'] = _0x23c0fd(''[_0x3ff5dc(0x46f)](this['_opt'][_0x3ff5dc(0x1a0)], '/?')['concat'](this[_0x3ff5dc(0x4b5)]()), {
                    'transports': this[_0x3ff5dc(0x294)][_0x3ff5dc(0x3a3)],
                    'reconnection': !0x0,
                    'forceNew': this['_opt'][_0x3ff5dc(0x3b2)],
                    'reconnectionAttempts': this['_opt'][_0x3ff5dc(0x3ab)] || 0xa,
                    'reconnectionDelay': this['_opt'][_0x3ff5dc(0x344)] || 0x1f4,
                    'randomizationFactor': 0x0,
                    'rememberUpgrade': !0x0,
                    'timestampRequests': !0x0,
                    'parser': _0xaa19d2[_0x3ff5dc(0x4b4)]
                  }), this[_0x3ff5dc(0x407)] = 0x0, this[_0x3ff5dc(0x448)](this[_0x3ff5dc(0x10a)]), this['_handleConnectionStatus'](this[_0x3ff5dc(0x10a)]), this[_0x3ff5dc(0x12c)][_0x3ff5dc(0x37b)](function (_0x20ecd0) {
                    var _0x36206c = _0x3ff5dc;

                    _0x27a77b[_0x36206c(0x38f)](_0x20ecd0);
                  }), _0x43d17f['default'][_0x3ff5dc(0x29a)](_0x3ff5dc(0x113))) : _0x43d17f[_0x3ff5dc(0x4b4)]['debug'](_0x3ff5dc(0x483));
                }, _0x54df50[_0x3a6c24(0x267)][_0x3a6c24(0x1fe)] = function (_0x164772) {
                  var _0x16d27e = _0x3a6c24;
                  return {
                    'url': _0x164772[_0x16d27e(0x1a0)] || '',
                    'token': _0x164772[_0x16d27e(0x2a7)] || '',
                    'numberRetrySendingMessage': _0x164772[_0x16d27e(0x301)] || 0x2,
                    'forceNew': _0x164772['forceNew'] || !0x1,
                    'transports': _0x164772[_0x16d27e(0x3a3)] || [_0x16d27e(0x254)],
                    'reconnectionDelay': _0x164772[_0x16d27e(0x344)] || 0x3e8,
                    'reconnectionDelayMax': _0x164772[_0x16d27e(0x256)] || 0xbb8,
                    'reconnectionAttempts': _0x164772[_0x16d27e(0x3ab)] || 0x3,
                    'nextTickIn': _0x164772['nextTickIn'] || 0xc8,
                    'pingTimeoutWarning': 0x258,
                    'env': _0x164772[_0x16d27e(0x498)] || 'portal',
                    'games': _0x164772[_0x16d27e(0x222)] || _0x16d27e(0x120),
                    'ssid': _0x164772[_0x16d27e(0x13c)] || _0x164772['token'] || ''
                  };
                }, _0x54df50[_0x3a6c24(0x267)]['_handleReponseMessage'] = function (_0x58ad20) {
                  var _0x266303 = _0x3a6c24,
                      _0x111cb0 = this;

                  _0x58ad20['on'](_0x54df50['SOCKET_RESPONSE_EVENT'], function (_0x3296ec, _0x40cd56) {
                    var _0x4079b9 = a1_0x1adc;
                    _0x40cd56 && _0x40cd56(), _0x3296ec && (_0x3296ec['v'] === _0x5942ce && (_0x3296ec = {
                      'messageId': _0x3296ec['id'],
                      'data': {
                        'event': _0x3296ec['da']['ev'],
                        'svt': _0x3296ec['da']['svt'],
                        'serviceId': _0x3296ec['da'][_0x4079b9(0x3c7)],
                        'eventId': _0x3296ec['da'][_0x4079b9(0x4ac)],
                        'data': _0x3296ec['da']['da'],
                        'channelType': _0x3296ec['da']['ch']
                      },
                      'version': _0x3296ec['v']
                    }), _0x111cb0[_0x4079b9(0x2c9)]['emit'](_0x54df50[_0x4079b9(0x4ce)], _0x3296ec));
                  }), _0x58ad20['on'](_0x54df50['SOCKET_RESPONSE_EVENT_V5_1'], function (_0xcdaaf3, _0x2e54c8) {
                    var _0x2d03f7 = a1_0x1adc;

                    if (_0x2e54c8 && _0x2e54c8(), _0xcdaaf3) {
                      for (var _0x4b3d0e = new Uint8Array(_0xcdaaf3), _0x13a00a = 0x0; _0x13a00a < _0x4b3d0e[_0x2d03f7(0x109)]; _0x13a00a++) {
                        _0x4b3d0e[_0x13a00a]--;
                      }

                      _0xcdaaf3 = _0x2bbbc9[_0x2d03f7(0x32f)]['decode'](_0x4b3d0e), _0x43d17f[_0x2d03f7(0x4b4)]['debug']('SocketManagerNewMessage:\x20%s', _0xcdaaf3), _0xcdaaf3 = {
                        'messageId': (_0xcdaaf3 = JSON[_0x2d03f7(0x41c)](_0xcdaaf3))['id'],
                        'data': {
                          'event': _0xcdaaf3['da']['ev'],
                          'svt': _0xcdaaf3['da'][_0x2d03f7(0x2cd)],
                          'serviceId': _0xcdaaf3['da'][_0x2d03f7(0x3c7)],
                          'eventId': _0xcdaaf3['da'][_0x2d03f7(0x4ac)],
                          'data': _0xcdaaf3['da']['da'],
                          'channelType': _0xcdaaf3['da']['ch']
                        },
                        'version': _0xcdaaf3['v']
                      }, _0x111cb0[_0x2d03f7(0x2c9)][_0x2d03f7(0x426)](_0x54df50[_0x2d03f7(0x4ce)], _0xcdaaf3);
                    }
                  }), _0x58ad20['on'](_0x54df50['SOCKET_RESPONSE_EVENT_V5_2'], function (_0x5db25b, _0x9f36dc) {
                    var _0x697ccf = a1_0x1adc;

                    if (_0x9f36dc && _0x9f36dc(), _0x5db25b && _0x111cb0[_0x697ccf(0x380)]) {
                      for (var _0x4c34b5 = new Uint8Array(_0x5db25b), _0x3db2cc = 0x0; _0x3db2cc < _0x4c34b5[_0x697ccf(0x109)]; _0x3db2cc++) {
                        _0x4c34b5[_0x3db2cc] = _0x4c34b5[_0x3db2cc] ^ _0x111cb0[_0x697ccf(0x380)][_0x3db2cc % _0x111cb0[_0x697ccf(0x380)][_0x697ccf(0x109)]];
                      }

                      _0x5db25b = _0x2bbbc9[_0x697ccf(0x32f)][_0x697ccf(0x2a8)](_0x4c34b5), _0x43d17f[_0x697ccf(0x4b4)]['debug']('SocketManagerNewMessage:\x20%s', _0x5db25b), _0x5db25b = {
                        'messageId': (_0x5db25b = JSON[_0x697ccf(0x41c)](_0x5db25b))['id'],
                        'data': {
                          'event': _0x5db25b['da']['ev'],
                          'svt': _0x5db25b['da']['svt'],
                          'serviceId': _0x5db25b['da'][_0x697ccf(0x3c7)],
                          'eventId': _0x5db25b['da'][_0x697ccf(0x4ac)],
                          'data': _0x5db25b['da']['da'],
                          'channelType': _0x5db25b['da']['ch']
                        },
                        'version': _0x5db25b['v']
                      }, _0x111cb0[_0x697ccf(0x2c9)][_0x697ccf(0x426)](_0x54df50['NEW_MESSAGE_EVENT'], _0x5db25b);
                    } else _0x43d17f[_0x697ccf(0x4b4)][_0x697ccf(0x282)]('SocketManagerNewMessage:\x20CANNOT\x20parse\x20message:\x20%s,\x20keyAB:\x20%j', _0x5db25b, _0x111cb0[_0x697ccf(0x380)]);
                  }), _0x58ad20['on'](_0x266303(0x431), function (_0x1b7963) {
                    var _0x94ba06 = _0x266303;
                    _0x1b7963 && (_0x43d17f[_0x94ba06(0x4b4)][_0x94ba06(0x29a)](_0x94ba06(0x266), _0x1b7963), _0x111cb0[_0x94ba06(0x2c9)]['emit'](_0x54df50[_0x94ba06(0x4ce)], {
                      'messageId': _0x1b7963[_0x94ba06(0x147)],
                      'data': {
                        'event': 'chat-event',
                        'eventId': _0x1b7963['messageId'],
                        'serviceId': _0x1b7963[_0x94ba06(0x28e)][_0x94ba06(0x46c)],
                        'channelType': _0x94ba06(0x238),
                        'data': _0x1b7963['data']
                      }
                    }));
                  }), _0x58ad20['on'](_0x266303(0x445), function (_0x36c129) {
                    var _0x1a7b82 = _0x266303;
                    _0x36c129['server'];

                    var _0x38d1a2 = _0x36c129[_0x1a7b82(0x239)];

                    _0x111cb0[_0x1a7b82(0x377)] = _0x557a7c, _0x111cb0['_sId'] = _0x38d1a2, _0x111cb0['updateKeyAB'](_0x38d1a2), _0x111cb0[_0x1a7b82(0x2c9)][_0x1a7b82(0x426)](_0x54df50[_0x1a7b82(0x4bd)]);
                  }), _0x58ad20['on'](_0x266303(0x1eb), function (_0x51a730) {
                    var _0x3e00dc = _0x266303,
                        _0x2e5183 = _0x51a730[_0x3e00dc(0x2a7)];

                    _0x111cb0['_emitter'][_0x3e00dc(0x426)](_0x54df50[_0x3e00dc(0x1b8)], {
                      'token': _0x2e5183
                    }), _0x111cb0[_0x3e00dc(0x2f9)](_0x2e5183);
                  });
                }, _0x54df50['prototype']['_handleConnectionStatus'] = function (_0x5eecbe) {
                  var _0x2f168f = _0x3a6c24,
                      _0x1add10,
                      _0x152103,
                      _0x7cc87a,
                      _0x485e6e = this,
                      _0x29358a = function _0x29358a() {
                    var _0x1b2ca1 = a1_0x1adc,
                        _0x1dc3ab = !0x1,
                        _0x1faabe = [];

                    if (_0x485e6e[_0x1b2ca1(0x2c6)][_0x1b2ca1(0x40f)](function (_0x55cd56, _0x18825d, _0x31dde2) {
                      var _0x48d4d9 = _0x1b2ca1;

                      _0x485e6e[_0x48d4d9(0x2c6)]['updateCounter'](_0x55cd56, _0x31dde2 + 0x1);
                    }, function (_0x52ef3a) {
                      var _0x2f6c0a = _0x1b2ca1;
                      _0x1faabe['push'](_0x52ef3a[_0x2f6c0a(0x147)]), _0x1dc3ab = !0x0;
                    }), _0x1dc3ab && _0x1faabe[_0x1b2ca1(0x37b)](function (_0x213d67) {
                      var _0x1dad0b = _0x1b2ca1;
                      _0x43d17f[_0x1dad0b(0x4b4)]['debug'](_0x1dad0b(0x17e), _0x213d67), _0x485e6e['_emitter'][_0x1dad0b(0x426)](_0x54df50['CAN_NOT_SEND_MESSAGE_EVENT'], _0x213d67);
                    }), _0x485e6e[_0x1b2ca1(0x2c6)][_0x1b2ca1(0x151)]()) {
                      var _0x23901b = _0x485e6e[_0x1b2ca1(0x112)][_0x1b2ca1(0x229)];

                      _0x1add10 = setTimeout(function () {
                        _0x29358a();
                      }, _0x23901b);
                    } else _0x1add10 = setTimeout(function () {
                      _0x29358a();
                    }, 0x96);
                  },
                      _0x483c5f = function _0x483c5f() {
                    var _0x180e77 = a1_0x1adc;
                    _0x43d17f[_0x180e77(0x4b4)][_0x180e77(0x29a)](_0x180e77(0x43b)), clearTimeout(_0x1add10), clearTimeout(_0x152103), clearTimeout(_0x7cc87a), _0x485e6e[_0x180e77(0x2c6)][_0x180e77(0x184)]();
                  };

                  _0x5eecbe['on'](_0x2f168f(0x150), function () {
                    var _0x131e84 = _0x2f168f;
                    _0x485e6e[_0x131e84(0x297)] = _0x54df50[_0x131e84(0x284)], _0x485e6e['_countPingOverTime'] = 0x0, _0x485e6e[_0x131e84(0x224)][_0x131e84(0x109)] > 0x0 && _0x485e6e['_pendingSubscribeChannelList'][_0x131e84(0x37b)](function (_0x3aa3bf) {
                      var _0x43c0a3 = _0x131e84;

                      _0x485e6e[_0x43c0a3(0x2fe)](_0x3aa3bf);
                    }), _0x485e6e[_0x131e84(0x224)] = [], _0x29358a(), clearTimeout(_0x152103), clearTimeout(_0x7cc87a), _0x43d17f['default'][_0x131e84(0x29a)](_0x131e84(0x240));
                  }), _0x5eecbe['on'](_0x2f168f(0x2db), function () {
                    var _0x1c6a41 = _0x2f168f;
                    _0x43d17f[_0x1c6a41(0x4b4)][_0x1c6a41(0x29a)](_0x1c6a41(0x31f)), _0x43d17f[_0x1c6a41(0x4b4)][_0x1c6a41(0x29a)](_0x1c6a41(0x310)), clearTimeout(_0x1add10), _0x152103 = setTimeout(function () {
                      var _0x3e417f = _0x1c6a41;

                      _0x485e6e[_0x3e417f(0x2c9)][_0x3e417f(0x426)](_0x54df50['DISCONNECTED_CONNECTION']);
                    }, 0x2710), _0x7cc87a = setTimeout(function () {
                      var _0x534eea = _0x1c6a41;

                      _0x485e6e[_0x534eea(0x2c9)]['emit'](_0x54df50[_0x534eea(0x246)]);
                    }, 0x3a98);
                  }), _0x5eecbe['on']('reconnecting', function (_0x468142) {
                    var _0x4e4d15 = _0x2f168f;
                    _0x485e6e[_0x4e4d15(0x407)] = _0x468142;
                  }), _0x5eecbe['on'](_0x2f168f(0x430), function (_0x4b7952) {
                    var _0x40f559 = _0x2f168f;
                    _0x43d17f['default'][_0x40f559(0x29a)](_0x40f559(0x230)[_0x40f559(0x46f)](_0x485e6e[_0x40f559(0x407)], '\x20times.\x20')['concat'](_0x485e6e['_opt'][_0x40f559(0x3ab)])), _0x485e6e['_reconnect_attempt'] >= _0x485e6e[_0x40f559(0x294)][_0x40f559(0x3ab)] ? (_0x485e6e[_0x40f559(0x3f5)](), _0x485e6e[_0x40f559(0x297)] = _0x54df50[_0x40f559(0x3a0)], _0x483c5f(), _0x43d17f['default'][_0x40f559(0x29a)](_0x40f559(0x4d8)), _0x485e6e[_0x40f559(0x2c9)][_0x40f559(0x426)](_0x54df50[_0x40f559(0x475)])) : _0x485e6e[_0x40f559(0x2c9)][_0x40f559(0x426)](_0x54df50[_0x40f559(0x1b1)]);
                  }), _0x5eecbe['on'](_0x2f168f(0x424), function (_0x3d0a01) {
                    var _0x2743e3 = _0x2f168f;
                    _0x43d17f[_0x2743e3(0x4b4)][_0x2743e3(0x29a)](_0x2743e3(0x15f)), _0x485e6e[_0x2743e3(0x3f5)](), _0x485e6e[_0x2743e3(0x297)] = _0x54df50[_0x2743e3(0x3a0)], _0x483c5f(), _0x43d17f[_0x2743e3(0x4b4)][_0x2743e3(0x29a)](_0x2743e3(0x429)), _0x485e6e[_0x2743e3(0x2c9)][_0x2743e3(0x426)](_0x54df50['CAN_NOT_CONNECT_EVENT']);
                  }), _0x5eecbe['on'](_0x2f168f(0x3e5), function () {
                    var _0x5edbb8 = _0x2f168f;

                    _0x43d17f[_0x5edbb8(0x4b4)][_0x5edbb8(0x29a)]('ping');
                  }), _0x5eecbe['on'](_0x2f168f(0x3ed), function (_0x39c515) {
                    var _0x4e450f = _0x2f168f;
                    _0x39c515 > _0x485e6e['_opt']['pingTimeoutWarning'] ? _0x485e6e['_countPingOverTime']++ : _0x485e6e[_0x4e450f(0x408)] = 0x0, _0x485e6e[_0x4e450f(0x408)] >= 0x5 && (_0x485e6e[_0x4e450f(0x2c9)]['emit'](_0x54df50['POOR_CONNECTION']), _0x485e6e[_0x4e450f(0x408)] = 0x0), _0x485e6e[_0x4e450f(0x112)]['currentLatencyIdx'] = ++_0x485e6e['_latency']['currentLatencyIdx'] % _0x485e6e[_0x4e450f(0x112)][_0x4e450f(0x4d3)], _0x485e6e[_0x4e450f(0x112)][_0x4e450f(0x42a)][_0x485e6e[_0x4e450f(0x112)][_0x4e450f(0x370)]] = _0x39c515, _0x485e6e[_0x4e450f(0x112)][_0x4e450f(0x229)] = _0x485e6e['_latency'][_0x4e450f(0x42a)]['reduce'](function (_0x3a508d, _0x2dff68) {
                      return _0x3a508d + _0x2dff68;
                    }, 0x0) / _0x485e6e['_latency'][_0x4e450f(0x42a)][_0x4e450f(0x109)], _0x485e6e[_0x4e450f(0x112)][_0x4e450f(0x229)] < 0x96 && (_0x485e6e[_0x4e450f(0x112)][_0x4e450f(0x229)] = 0x96), _0x43d17f['default'][_0x4e450f(0x29a)](_0x4e450f(0x1ac), _0x39c515, _0x485e6e['_latency'][_0x4e450f(0x229)]), _0x485e6e[_0x4e450f(0x2c9)][_0x4e450f(0x426)](_0x54df50[_0x4e450f(0x3fd)], {
                      'latency': _0x39c515,
                      'averageLatency': _0x485e6e[_0x4e450f(0x112)][_0x4e450f(0x229)]
                    });
                  });
                }, _0x54df50['prototype'][_0x3a6c24(0x269)] = function (_0x4db9b8, _0x4867a3, _0x579c0d) {
                  var _0xe5851f = _0x3a6c24,
                      _0x58127c = this;

                  if (this[_0xe5851f(0x10a)] && this[_0xe5851f(0x10a)]['connected']) {
                    var _0x31e55f = _0x4867a3;
                    this[_0xe5851f(0x377)] !== _0x5942ce && this['_serverSocketVersion'] !== _0x10b9f4 || (_0x31e55f = {
                      'id': _0x4867a3[_0xe5851f(0x147)],
                      'da': {
                        'ev': _0x4867a3[_0xe5851f(0x28e)]['event'],
                        'da': _0x4867a3[_0xe5851f(0x28e)][_0xe5851f(0x28e)],
                        'v': _0x4867a3['data'][_0xe5851f(0x49a)] ? _0x4867a3['data'][_0xe5851f(0x49a)] : 0x1
                      }
                    });

                    var _0x2e9687 = this[_0xe5851f(0x3c5)](_0x4db9b8, _0x31e55f);

                    this[_0xe5851f(0x10a)][_0xe5851f(0x312)][_0x4db9b8] = function () {
                      var _0x209be2 = _0xe5851f,
                          _0x27ac4b = _0x58127c[_0x209be2(0x2c6)]['ackPacket'](_0x4db9b8);

                      _0x27ac4b && (_0x43d17f[_0x209be2(0x4b4)][_0x209be2(0x29a)](_0x209be2(0x48b), _0x27ac4b[_0x209be2(0x147)]), _0x58127c[_0x209be2(0x2c9)][_0x209be2(0x426)](_0x54df50[_0x209be2(0x4d0)], _0x27ac4b[_0x209be2(0x147)]));
                    }, _0x43d17f[_0xe5851f(0x4b4)][_0xe5851f(0x29a)](_0xe5851f(0x391), _0x579c0d, _0x4867a3[_0xe5851f(0x147)]), this[_0xe5851f(0x10a)][_0xe5851f(0x43e)](_0x2e9687);
                  } else this[_0xe5851f(0x2c6)][_0xe5851f(0x1f0)](_0x4db9b8, _0x579c0d + 0x1);
                }, _0x54df50[_0x3a6c24(0x267)][_0x3a6c24(0x3c5)] = function (_0x4f305f, _0x59cd31) {
                  var _0x2b7f14 = _0x3a6c24;
                  return {
                    'type': this[_0x2b7f14(0x3f8)](),
                    'options': {
                      'compress': !0x0
                    },
                    'id': _0x4f305f,
                    'data': this['_encrypt'](_0x59cd31)
                  };
                }, _0x54df50[_0x3a6c24(0x267)]['_getPacketType'] = function () {
                  var _0x560b27 = _0x3a6c24;
                  return this[_0x560b27(0x377)] === _0x10b9f4 ? 0x5 : 0x2;
                }, _0x54df50[_0x3a6c24(0x267)][_0x3a6c24(0x3ff)] = function (_0x1e23be) {
                  var _0x287593 = _0x3a6c24,
                      _0x990c98 = _0x54df50[_0x287593(0x231)];

                  return this[_0x287593(0x377)] === _0x5942ce ? _0x990c98 = _0x54df50['SOCKET_REQUEST_EVENT_V4'] : this[_0x287593(0x377)] === _0x10b9f4 && (_0x1e23be = JSON[_0x287593(0x2eb)](_0x1e23be), _0x990c98 = _0x54df50['SOCKET_REQUEST_EVENT_V5_2'], _0x1e23be = this['_encrypt_5_2'](_0x1e23be)), [_0x990c98, _0x1e23be];
                }, _0x54df50[_0x3a6c24(0x267)][_0x3a6c24(0x27d)] = function (_0x4ddd6) {
                  var _0xca017d = _0x3a6c24;

                  for (var _0x3afe25 = _0x2bbbc9[_0xca017d(0x400)][_0xca017d(0x2bf)](_0x4ddd6), _0x1f91e9 = 0x0; _0x1f91e9 < _0x3afe25['length']; _0x1f91e9++) {
                    _0x3afe25[_0x1f91e9]++;
                  }

                  return _0x3afe25['buffer'];
                }, _0x54df50[_0x3a6c24(0x267)][_0x3a6c24(0x283)] = function (_0x56651a) {
                  var _0x5060a8 = _0x3a6c24;

                  if (this[_0x5060a8(0x380)]) {
                    for (var _0x59dc7f = _0x2bbbc9['TextEncoder'][_0x5060a8(0x2bf)](_0x56651a), _0x4696a5 = 0x0; _0x4696a5 < _0x59dc7f[_0x5060a8(0x109)]; _0x4696a5++) {
                      _0x59dc7f[_0x4696a5] = _0x59dc7f[_0x4696a5] ^ this['_keyAB'][_0x4696a5 % this[_0x5060a8(0x380)]['length']];
                    }

                    return _0x59dc7f[_0x5060a8(0x477)];
                  }

                  return _0x43d17f['default']['error']('_encrypt_5_2\x20CANNOT\x20encrypt:\x20%s', _0x56651a), null;
                }, _0x54df50[_0x3a6c24(0x267)][_0x3a6c24(0x2f9)] = function (_0x115bc0) {
                  var _0x4986f7 = _0x3a6c24;
                  this[_0x4986f7(0x10a)] && (this[_0x4986f7(0x294)]['token'] = _0x115bc0, this[_0x4986f7(0x10a)]['io'][_0x4986f7(0x1c7)][_0x4986f7(0x174)] = this[_0x4986f7(0x4b5)](), this[_0x4986f7(0x10a)]['io'][_0x4986f7(0x3d1)] = ''[_0x4986f7(0x46f)](this[_0x4986f7(0x294)]['url'], '/?')[_0x4986f7(0x46f)](this[_0x4986f7(0x4b5)]())), this[_0x4986f7(0x294)]['token'] = _0x115bc0;
                }, _0x54df50[_0x3a6c24(0x267)][_0x3a6c24(0x111)] = function (_0x342eb1) {
                  var _0x321985 = _0x3a6c24;

                  _0x43d17f['default'][_0x321985(0x29a)](_0x321985(0x406), _0x342eb1);

                  var _0x42a9d1 = this[_0x321985(0x2c6)]['addNew'](_0x342eb1);

                  this[_0x321985(0x269)](_0x42a9d1, _0x342eb1, 0x0);
                }, _0x54df50[_0x3a6c24(0x267)][_0x3a6c24(0x31b)] = function (_0x33bb3d) {
                  var _0x1a5b13 = _0x3a6c24;
                  _0x33bb3d = _0x33bb3d || [], this[_0x1a5b13(0x2c6)][_0x1a5b13(0x31b)](function (_0x9d166f) {
                    var _0xfc8bcc = _0x1a5b13;
                    return _0x33bb3d['includes'](_0x9d166f[_0xfc8bcc(0x147)]);
                  });
                }, _0x54df50['prototype'][_0x3a6c24(0x333)] = function (_0x1ab446) {
                  var _0x186123 = _0x3a6c24;
                  _0x43d17f['default']['debug']('SocketManager\x20-\x20sendChatMessage:\x20%j', _0x1ab446), this['_socket'][_0x186123(0x426)](_0x186123(0x299), _0x1ab446);
                }, _0x54df50[_0x3a6c24(0x267)]['registerEvent'] = function (_0x1c2ff9, _0x2d0936) {
                  this['_emitter']['on'](_0x1c2ff9, _0x2d0936);
                }, _0x54df50['prototype'][_0x3a6c24(0x20a)] = function (_0x5a5f79, _0x22b07e) {
                  var _0x36301b = _0x3a6c24;

                  this[_0x36301b(0x2c9)][_0x36301b(0x126)](_0x5a5f79, _0x22b07e);
                }, _0x54df50[_0x3a6c24(0x267)][_0x3a6c24(0x2fe)] = function (_0x2f2114) {
                  var _0x85c744 = _0x3a6c24;
                  _0x2f2114 && (_0x2f2114 = _0x2f2114[_0x85c744(0x27c)](_0x85c744(0x238), 'p'), this[_0x85c744(0x12c)][_0x85c744(0x220)](_0x2f2114) || (this[_0x85c744(0x10a)][_0x85c744(0x1d0)] ? (this['_subscribeChannelList'][_0x85c744(0x4c0)](_0x2f2114), this[_0x85c744(0x38f)](_0x2f2114)) : this['_pendingSubscribeChannelList'][_0x85c744(0x4c0)](_0x2f2114)));
                }, _0x54df50[_0x3a6c24(0x267)]['_subscribe'] = function (_0x23808c) {
                  var _0x4736b7 = _0x3a6c24,
                      _0x1302c0 = _0x23c0fd(''[_0x4736b7(0x46f)](this['_opt'][_0x4736b7(0x1a0)], '/')['concat'](_0x23808c, '?token=')['concat'](this[_0x4736b7(0x294)][_0x4736b7(0x2a7)], '&sv=')[_0x4736b7(0x46f)](_0x557a7c));

                  this['_handleReponseMessage'](_0x1302c0);
                }, _0x54df50[_0x3a6c24(0x267)][_0x3a6c24(0x3dd)] = function (_0x5a8f37) {
                  var _0x532b94 = _0x3a6c24;
                  _0x5a8f37 && (_0x5a8f37 = _0x5a8f37[_0x532b94(0x27c)](_0x532b94(0x238), 'p'), this[_0x532b94(0x12c)]['includes'](_0x5a8f37) && (this[_0x532b94(0x12c)]['splice'](this[_0x532b94(0x12c)]['indexOf'](_0x5a8f37), 0x1), this['_unSubscribe'](_0x5a8f37)), this[_0x532b94(0x224)]['includes'](_0x5a8f37) && this[_0x532b94(0x224)][_0x532b94(0x35b)](this[_0x532b94(0x224)][_0x532b94(0x458)](_0x5a8f37), 0x1));
                }, _0x54df50[_0x3a6c24(0x267)][_0x3a6c24(0x48f)] = function (_0x48895) {
                  var _0x3411b3 = _0x3a6c24,
                      _0x3650de = this['_socket']['io'][_0x3411b3(0x281)]['/'[_0x3411b3(0x46f)](_0x48895)];

                  _0x3650de && (_0x3650de['close'](), _0x3650de[_0x3411b3(0x1b5)](), delete this[_0x3411b3(0x10a)]['io'][_0x3411b3(0x281)]['/'['concat'](_0x48895)]);
                }, _0x54df50[_0x3a6c24(0x267)][_0x3a6c24(0x3f5)] = function () {
                  var _0x3da21d = _0x3a6c24,
                      _0x920c68 = this;

                  Object[_0x3da21d(0x3ef)](this['_socket']['io'][_0x3da21d(0x281)])[_0x3da21d(0x37b)](function (_0x2191cb) {
                    var _0x37b71b = _0x3da21d,
                        _0x3c72b3 = _0x920c68[_0x37b71b(0x10a)]['io'][_0x37b71b(0x281)][_0x2191cb];

                    _0x3c72b3 && (_0x3c72b3[_0x37b71b(0x1b9)](), _0x3c72b3[_0x37b71b(0x1b5)](), delete _0x920c68[_0x37b71b(0x10a)]['io'][_0x37b71b(0x281)][_0x2191cb]);
                  });
                }, _0x54df50['prototype'][_0x3a6c24(0x1b9)] = function () {
                  var _0x2c8369 = _0x3a6c24;
                  this[_0x2c8369(0x3f5)](), this[_0x2c8369(0x297)] = _0x54df50[_0x2c8369(0x3a0)], this['_emitter'][_0x2c8369(0x1b5)](), this[_0x2c8369(0x2c6)][_0x2c8369(0x184)]();
                }, _0x54df50[_0x3a6c24(0x267)][_0x3a6c24(0x2f1)] = function () {
                  var _0x38b8a2 = _0x3a6c24;
                  this[_0x38b8a2(0x3f5)](), this[_0x38b8a2(0x12b)]();
                }, _0x54df50[_0x3a6c24(0x267)]['isAbleSendingData'] = function () {
                  var _0x477790 = _0x3a6c24;
                  return this[_0x477790(0x297)] !== _0x54df50[_0x477790(0x3a0)];
                }, _0x54df50[_0x3a6c24(0x267)]['updateKeyAB'] = function (_0x2ad79f) {
                  var _0x3ec857 = _0x3a6c24,
                      _0x14cedf = _0x3ec857(0x2b5);

                  _0x2ad79f && (_0x14cedf = _0x2ad79f[_0x3ec857(0x495)](0x9, 0xd));

                  for (var _0x540f9d = new ArrayBuffer(0x4), _0x1bc188 = new Uint8Array(_0x540f9d), _0x13fb39 = 0x0; _0x13fb39 < _0x14cedf[_0x3ec857(0x109)]; _0x13fb39++) {
                    _0x1bc188[_0x13fb39] = _0x14cedf[_0x3ec857(0x3ca)](_0x13fb39) % 0x80;
                  }

                  this['_keyAB'] = _0x1bc188;
                }, _0x54df50['SOCKET_REQUEST_EVENT'] = 'q', _0x54df50['SOCKET_RESPONSE_EVENT'] = 'p', _0x54df50['SOCKET_RESPONSE_EVENT_V5_1'] = '1', _0x54df50[_0x3a6c24(0x451)] = '2', _0x54df50[_0x3a6c24(0x231)] = 'q', _0x54df50[_0x3a6c24(0x3c6)] = 'q4', _0x54df50[_0x3a6c24(0x32c)] = 'q51', _0x54df50[_0x3a6c24(0x202)] = _0x3a6c24(0x275), _0x54df50[_0x3a6c24(0x4bd)] = _0x3a6c24(0x1d0), _0x54df50[_0x3a6c24(0x475)] = _0x3a6c24(0x1c4), _0x54df50[_0x3a6c24(0x273)] = _0x3a6c24(0x42d), _0x54df50[_0x3a6c24(0x4d0)] = _0x3a6c24(0x233), _0x54df50['NEW_MESSAGE_EVENT'] = 'new-message', _0x54df50['CHAT_MESSAGE_EVENT'] = 'chat-message', _0x54df50[_0x3a6c24(0x3fd)] = _0x3a6c24(0x464), _0x54df50['UPDATE_TOKEN'] = _0x3a6c24(0x1eb), _0x54df50[_0x3a6c24(0x1b1)] = _0x3a6c24(0x397), _0x54df50[_0x3a6c24(0x246)] = _0x3a6c24(0x46d), _0x54df50[_0x3a6c24(0x1fd)] = _0x3a6c24(0x21c), _0x54df50[_0x3a6c24(0x1be)] = 'init', _0x54df50['STATUS_ALIVE'] = _0x3a6c24(0x4cd), _0x54df50[_0x3a6c24(0x3a0)] = 'killed', _0x54df50;
              }();

              _0x3e8a6e['SocketManager'] = _0x2d1576;
            },
            0x35: function _(_0x4e6b0c, _0xffe363, _0x30932e) {
              var _0x1e6325 = a1_0x1adc;

              var _0x4b21c1 = _0x30932e(0x16c2),
                  _0x3fd241 = _0x30932e(0x141a),
                  _0x53ee68 = Object[_0x1e6325(0x267)][_0x1e6325(0x1c8)],
                  _0x4f53d7 = _0x1e6325(0x23a) == typeof Blob || _0x1e6325(0x121) != typeof Blob && _0x1e6325(0x177) === _0x53ee68[_0x1e6325(0x20b)](Blob),
                  _0x3280c0 = _0x1e6325(0x23a) == typeof File || _0x1e6325(0x121) != typeof File && '[object\x20FileConstructor]' === _0x53ee68[_0x1e6325(0x20b)](File);

              function _0x2b2df9(_0x48e1da, _0x3912b9) {
                var _0x3cde35 = _0x1e6325;
                if (!_0x48e1da) return _0x48e1da;

                if (_0x3fd241(_0x48e1da)) {
                  var _0x4306b2 = {
                    'p': 0x1,
                    'n': _0x3912b9['length']
                  };
                  return _0x3912b9['push'](_0x48e1da), _0x4306b2;
                }

                if (_0x4b21c1(_0x48e1da)) {
                  for (var _0x1f3fd1 = new Array(_0x48e1da[_0x3cde35(0x109)]), _0x530779 = 0x0; _0x530779 < _0x48e1da[_0x3cde35(0x109)]; _0x530779++) {
                    _0x1f3fd1[_0x530779] = _0x2b2df9(_0x48e1da[_0x530779], _0x3912b9);
                  }

                  return _0x1f3fd1;
                }

                if (_0x3cde35(0x26e) == typeof _0x48e1da && !(_0x48e1da instanceof Date)) {
                  for (var _0x2732d1 in _0x1f3fd1 = {}, _0x48e1da) {
                    _0x1f3fd1[_0x2732d1] = _0x2b2df9(_0x48e1da[_0x2732d1], _0x3912b9);
                  }

                  return _0x1f3fd1;
                }

                return _0x48e1da;
              }

              function _0x12af50(_0x569cf8, _0x289f25) {
                var _0xc269c9 = _0x1e6325;
                if (!_0x569cf8) return _0x569cf8;
                if (_0x569cf8 && _0x569cf8[_0xc269c9(0x29e)]) return _0x289f25[_0x569cf8[_0xc269c9(0x3d6)]];
                if (_0x569cf8 && _0xc269c9(0x2df) == typeof _0x569cf8 && _0x569cf8[_0xc269c9(0x455)]('b')) return _0x289f25[parseInt(_0x569cf8[_0xc269c9(0x495)](0x1))];

                if (_0x4b21c1(_0x569cf8)) {
                  for (var _0x495a84 = 0x0; _0x495a84 < _0x569cf8[_0xc269c9(0x109)]; _0x495a84++) {
                    _0x569cf8[_0x495a84] = _0x12af50(_0x569cf8[_0x495a84], _0x289f25);
                  }
                } else {
                  if ('object' == typeof _0x569cf8) {
                    for (var _0x436616 in _0x569cf8) {
                      _0x569cf8[_0x436616] = _0x12af50(_0x569cf8[_0x436616], _0x289f25);
                    }
                  }
                }

                return _0x569cf8;
              }

              _0xffe363['deconstructPacket'] = function (_0x51eea6) {
                var _0x20f00a = _0x1e6325,
                    _0x3b27e3 = [],
                    _0x5a68d6 = _0x51eea6['data'],
                    _0x5ae12c = _0x51eea6;
                return _0x5ae12c[_0x20f00a(0x28e)] = _0x2b2df9(_0x5a68d6, _0x3b27e3), _0x5ae12c[_0x20f00a(0x2d0)] = _0x3b27e3[_0x20f00a(0x109)], {
                  'packet': _0x5ae12c,
                  'buffers': _0x3b27e3
                };
              }, _0xffe363[_0x1e6325(0x170)] = function (_0x30982d, _0x3901bb) {
                var _0x581c92 = _0x1e6325;
                return _0x30982d[_0x581c92(0x28e)] = _0x12af50(_0x30982d[_0x581c92(0x28e)], _0x3901bb), _0x30982d[_0x581c92(0x2d0)] = void 0x0, _0x30982d;
              }, _0xffe363[_0x1e6325(0x3d4)] = function (_0x5bd307, _0x8fde3b) {
                var _0x430bd1 = 0x0,
                    _0x32a35d = _0x5bd307;
                !function _0x38591a(_0x710c34, _0x1c983f, _0x119400) {
                  var _0x1ef9ee = a1_0x1adc;
                  if (!_0x710c34) return _0x710c34;

                  if (_0x4f53d7 && _0x710c34 instanceof Blob || _0x3280c0 && _0x710c34 instanceof File) {
                    _0x430bd1++;

                    var _0x5ed519 = new FileReader();

                    _0x5ed519['onload'] = function () {
                      var _0x32782a = a1_0x1adc;
                      _0x119400 ? _0x119400[_0x1c983f] = this[_0x32782a(0x249)] : _0x32a35d = this['result'], --_0x430bd1 || _0x8fde3b(_0x32a35d);
                    }, _0x5ed519[_0x1ef9ee(0x31e)](_0x710c34);
                  } else {
                    if (_0x4b21c1(_0x710c34)) {
                      for (var _0x495668 = 0x0; _0x495668 < _0x710c34[_0x1ef9ee(0x109)]; _0x495668++) {
                        _0x38591a(_0x710c34[_0x495668], _0x495668, _0x710c34);
                      }
                    } else {
                      if (_0x1ef9ee(0x26e) == typeof _0x710c34 && !_0x3fd241(_0x710c34)) {
                        for (var _0x38c2de in _0x710c34) {
                          _0x38591a(_0x710c34[_0x38c2de], _0x38c2de, _0x710c34);
                        }
                      }
                    }
                  }
                }(_0x32a35d), _0x430bd1 || _0x8fde3b(_0x32a35d);
              };
            },
            0x2501: function _(_0x1d7fce, _0x4a92e5, _0x5e6b8b) {
              var _0x28870e = a1_0x1adc;

              var _0x33046f = _0x5e6b8b(0x4cb)(_0x28870e(0x2ad)),
                  _0x1154c1 = _0x5e6b8b(0x223f),
                  _0x147cff = _0x5e6b8b(0x35),
                  _0x27c60d = _0x5e6b8b(0x16c2),
                  _0x2e7e4a = _0x5e6b8b(0x141a);

              function _0x12fcb7() {}

              _0x4a92e5[_0x28870e(0x280)] = 0x4, _0x4a92e5['types'] = [_0x28870e(0x339), 'DISCONNECT', 'EVENT', 'ACK', _0x28870e(0x28c), _0x28870e(0x127), 'BINARY_ACK'], _0x4a92e5[_0x28870e(0x339)] = 0x0, _0x4a92e5[_0x28870e(0x3c0)] = 0x1, _0x4a92e5[_0x28870e(0x3b7)] = 0x2, _0x4a92e5[_0x28870e(0x186)] = 0x3, _0x4a92e5[_0x28870e(0x28c)] = 0x4, _0x4a92e5[_0x28870e(0x127)] = 0x5, _0x4a92e5['BINARY_ACK'] = 0x6, _0x4a92e5[_0x28870e(0x15c)] = _0x12fcb7, _0x4a92e5[_0x28870e(0x4b7)] = _0x4b643d;

              var _0x470c30 = _0x4a92e5['ERROR'] + _0x28870e(0x35c);

              function _0x214876(_0x2149db) {
                var _0x3b6879 = _0x28870e,
                    _0x165b10 = '' + _0x2149db[_0x3b6879(0x1bd)];

                if (_0x4a92e5[_0x3b6879(0x127)] !== _0x2149db['type'] && _0x4a92e5[_0x3b6879(0x14f)] !== _0x2149db[_0x3b6879(0x1bd)] || (_0x165b10 += _0x2149db[_0x3b6879(0x2d0)] + '-'), _0x2149db['nsp'] && '/' !== _0x2149db[_0x3b6879(0x1c2)] && (_0x165b10 += _0x2149db['nsp'] + ','), null != _0x2149db['id'] && (_0x165b10 += _0x2149db['id']), null != _0x2149db['data']) {
                  var _0x2707e1 = function (_0x418020) {
                    var _0x500bd9 = _0x3b6879;

                    try {
                      return JSON[_0x500bd9(0x2eb)](_0x418020);
                    } catch (_0x436e1a) {
                      return !0x1;
                    }
                  }(_0x2149db[_0x3b6879(0x28e)]);

                  if (!0x1 === _0x2707e1) return _0x470c30;
                  _0x165b10 += _0x2707e1;
                }

                return _0x33046f(_0x3b6879(0x47f), _0x2149db, _0x165b10), _0x165b10;
              }

              function _0x4b643d() {
                this['reconstructor'] = null;
              }

              function _0x419895(_0x129604) {
                var _0x10d964 = _0x28870e;
                this[_0x10d964(0x11e)] = _0x129604, this['buffers'] = [];
              }

              function _0x159992(_0x162eab) {
                var _0x1c4809 = _0x28870e;
                return {
                  'type': _0x4a92e5[_0x1c4809(0x28c)],
                  'data': 'parser\x20error:\x20' + _0x162eab
                };
              }

              _0x12fcb7[_0x28870e(0x267)][_0x28870e(0x2bf)] = function (_0x57183b, _0xa993e6) {
                var _0x47c3d6 = _0x28870e;
                _0x33046f('encoding\x20packet\x20%j', _0x57183b), _0x4a92e5[_0x47c3d6(0x127)] === _0x57183b[_0x47c3d6(0x1bd)] || _0x4a92e5[_0x47c3d6(0x14f)] === _0x57183b[_0x47c3d6(0x1bd)] ? function (_0x2dce42, _0x3efdc7) {
                  var _0x1c1f24 = _0x47c3d6;

                  _0x147cff[_0x1c1f24(0x3d4)](_0x2dce42, function (_0x355668) {
                    var _0x51d8f9 = _0x1c1f24,
                        _0x45ccf9 = _0x147cff['deconstructPacket'](_0x355668),
                        _0xba8c50 = _0x214876(_0x45ccf9[_0x51d8f9(0x43e)]),
                        _0x127e07 = _0x45ccf9[_0x51d8f9(0x3b8)];

                    _0x127e07['unshift'](_0xba8c50), _0x3efdc7(_0x127e07);
                  });
                }(_0x57183b, _0xa993e6) : _0xa993e6([_0x214876(_0x57183b)]);
              }, _0x1154c1(_0x4b643d[_0x28870e(0x267)]), _0x4b643d[_0x28870e(0x267)][_0x28870e(0x1a2)] = function (_0x5090a3) {
                var _0x2c2682 = _0x28870e,
                    _0x2318b6;

                if (_0x2c2682(0x2df) == typeof _0x5090a3) _0x2318b6 = function (_0x17ac4b) {
                  var _0x3b770b = _0x2c2682,
                      _0x4eb0d2 = 0x0,
                      _0x11b9ad = {
                    'type': Number(_0x17ac4b['charAt'](0x0))
                  };
                  if (null == _0x4a92e5[_0x3b770b(0x128)][_0x11b9ad[_0x3b770b(0x1bd)]]) return _0x159992('unknown\x20packet\x20type\x20' + _0x11b9ad[_0x3b770b(0x1bd)]);

                  if (_0x4a92e5[_0x3b770b(0x127)] === _0x11b9ad[_0x3b770b(0x1bd)] || _0x4a92e5['BINARY_ACK'] === _0x11b9ad[_0x3b770b(0x1bd)]) {
                    for (var _0xb9e221 = _0x4eb0d2 + 0x1; '-' !== _0x17ac4b[_0x3b770b(0x382)](++_0x4eb0d2) && _0x4eb0d2 != _0x17ac4b[_0x3b770b(0x109)];) {}

                    var _0x1606af = _0x17ac4b[_0x3b770b(0x495)](_0xb9e221, _0x4eb0d2);

                    if (_0x1606af != Number(_0x1606af) || '-' !== _0x17ac4b[_0x3b770b(0x382)](_0x4eb0d2)) throw new Error(_0x3b770b(0x409));
                    _0x11b9ad[_0x3b770b(0x2d0)] = Number(_0x1606af);
                  }

                  if ('/' === _0x17ac4b[_0x3b770b(0x382)](_0x4eb0d2 + 0x1)) {
                    for (_0xb9e221 = _0x4eb0d2 + 0x1; ++_0x4eb0d2 && ',' !== (_0x3b4da2 = _0x17ac4b[_0x3b770b(0x382)](_0x4eb0d2)) && _0x4eb0d2 !== _0x17ac4b['length'];) {}

                    _0x11b9ad[_0x3b770b(0x1c2)] = _0x17ac4b[_0x3b770b(0x495)](_0xb9e221, _0x4eb0d2);
                  } else _0x11b9ad[_0x3b770b(0x1c2)] = '/';

                  var _0x3c26de = _0x17ac4b[_0x3b770b(0x382)](_0x4eb0d2 + 0x1);

                  if ('' !== _0x3c26de && Number(_0x3c26de) == _0x3c26de) {
                    for (_0xb9e221 = _0x4eb0d2 + 0x1; ++_0x4eb0d2;) {
                      var _0x3b4da2;

                      if (null == (_0x3b4da2 = _0x17ac4b[_0x3b770b(0x382)](_0x4eb0d2)) || Number(_0x3b4da2) != _0x3b4da2) {
                        --_0x4eb0d2;
                        break;
                      }

                      if (_0x4eb0d2 === _0x17ac4b[_0x3b770b(0x109)]) break;
                    }

                    _0x11b9ad['id'] = Number(_0x17ac4b[_0x3b770b(0x495)](_0xb9e221, _0x4eb0d2 + 0x1));
                  }

                  if (_0x17ac4b[_0x3b770b(0x382)](++_0x4eb0d2)) {
                    var _0x523ec6 = function (_0x1413e9) {
                      var _0x57c0a0 = _0x3b770b;

                      try {
                        return JSON[_0x57c0a0(0x41c)](_0x1413e9);
                      } catch (_0x36984c) {
                        return !0x1;
                      }
                    }(_0x17ac4b[_0x3b770b(0x1ba)](_0x4eb0d2));

                    if (!0x1 === _0x523ec6 || _0x11b9ad[_0x3b770b(0x1bd)] !== _0x4a92e5[_0x3b770b(0x28c)] && !_0x27c60d(_0x523ec6)) return _0x159992(_0x3b770b(0x3bf));
                    _0x11b9ad['data'] = _0x523ec6;
                  }

                  return _0x33046f('decoded\x20%s\x20as\x20%j', _0x17ac4b, _0x11b9ad), _0x11b9ad;
                }(_0x5090a3), _0x4a92e5[_0x2c2682(0x127)] === _0x2318b6['type'] || _0x4a92e5[_0x2c2682(0x14f)] === _0x2318b6[_0x2c2682(0x1bd)] ? (this[_0x2c2682(0x3b5)] = new _0x419895(_0x2318b6), 0x0 === this[_0x2c2682(0x3b5)][_0x2c2682(0x11e)][_0x2c2682(0x2d0)] && this[_0x2c2682(0x426)](_0x2c2682(0x473), _0x2318b6)) : this[_0x2c2682(0x426)](_0x2c2682(0x473), _0x2318b6);else {
                  if (!_0x2e7e4a(_0x5090a3) && !_0x5090a3[_0x2c2682(0x49c)]) throw new Error('Unknown\x20type:\x20' + _0x5090a3);
                  if (!this[_0x2c2682(0x3b5)]) throw new Error(_0x2c2682(0x356));
                  (_0x2318b6 = this[_0x2c2682(0x3b5)][_0x2c2682(0x2b9)](_0x5090a3)) && (this[_0x2c2682(0x3b5)] = null, this[_0x2c2682(0x426)]('decoded', _0x2318b6));
                }
              }, _0x4b643d['prototype']['destroy'] = function () {
                var _0x57300f = _0x28870e;
                this[_0x57300f(0x3b5)] && this[_0x57300f(0x3b5)][_0x57300f(0x37c)]();
              }, _0x419895[_0x28870e(0x267)]['takeBinaryData'] = function (_0xd53535) {
                var _0x15d55c = _0x28870e;

                if (this['buffers'][_0x15d55c(0x4c0)](_0xd53535), this[_0x15d55c(0x3b8)]['length'] === this[_0x15d55c(0x11e)][_0x15d55c(0x2d0)]) {
                  var _0x3a8ffd = _0x147cff[_0x15d55c(0x170)](this['reconPack'], this[_0x15d55c(0x3b8)]);

                  return this[_0x15d55c(0x37c)](), _0x3a8ffd;
                }

                return null;
              }, _0x419895[_0x28870e(0x267)]['finishedReconstruction'] = function () {
                var _0x542c36 = _0x28870e;
                this[_0x542c36(0x11e)] = null, this[_0x542c36(0x3b8)] = [];
              };
            },
            0x141a: function _(_0xc19fd5) {
              var _0x211046 = a1_0x1adc;

              _0xc19fd5[_0x211046(0x10f)] = function (_0x5a7389) {
                var _0xe27180 = _0x211046;
                return _0x2a7fe1 && Buffer[_0xe27180(0x161)](_0x5a7389) || _0x536679 && (_0x5a7389 instanceof ArrayBuffer || function (_0x10d511) {
                  var _0x51cd4e = _0xe27180;
                  return _0x51cd4e(0x23a) == typeof ArrayBuffer[_0x51cd4e(0x3af)] ? ArrayBuffer[_0x51cd4e(0x3af)](_0x10d511) : _0x10d511[_0x51cd4e(0x477)] instanceof ArrayBuffer;
                }(_0x5a7389));
              };

              var _0x2a7fe1 = 'function' == typeof Buffer && _0x211046(0x23a) == typeof Buffer[_0x211046(0x161)],
                  _0x536679 = _0x211046(0x23a) == typeof ArrayBuffer;
            },
            0x7e9: function _(_0xbbc76, _0x44d3fb) {
              var _0x42690a = a1_0x1adc;
              Object[_0x42690a(0x42b)](_0x44d3fb, '__esModule', {
                'value': !0x0
              }), _0x44d3fb[_0x42690a(0x2e7)] = void 0x0;

              var _0x306aa4 = console['log'],
                  _0x27b51f = console['warn'],
                  _0x29afca = function () {
                var _0x59aaef = _0x42690a;

                function _0x342afd(_0x479a94, _0x4b212a, _0xf52950) {
                  var _0x197a10 = a1_0x1adc;
                  this[_0x197a10(0x11a)] = !!_0x479a94, this[_0x197a10(0x132)] = _0x479a94, this['logFnError'] = _0x4b212a, this[_0x197a10(0x250)] = _0xf52950;
                }

                return _0x342afd[_0x59aaef(0x267)][_0x59aaef(0x29a)] = function (_0x31b886) {
                  var _0x566a53 = _0x59aaef;

                  for (var _0x4b4b88 = [], _0x4170c5 = 0x1; _0x4170c5 < arguments[_0x566a53(0x109)]; _0x4170c5++) {
                    _0x4b4b88[_0x4170c5 - 0x1] = arguments[_0x4170c5];
                  }

                  var _0x2e63b0 = _0x31b886;
                  this[_0x566a53(0x11a)] && (_0x2e63b0 += JSON[_0x566a53(0x2eb)](_0x4b4b88)), this[_0x566a53(0x11a)] && this[_0x566a53(0x132)](_0x2e63b0);
                }, _0x342afd[_0x59aaef(0x267)][_0x59aaef(0x282)] = function (_0x543beb) {
                  var _0x1b0db5 = _0x59aaef;

                  for (var _0x3db7ce = [], _0x7c0519 = 0x1; _0x7c0519 < arguments[_0x1b0db5(0x109)]; _0x7c0519++) {
                    _0x3db7ce[_0x7c0519 - 0x1] = arguments[_0x7c0519];
                  }

                  var _0x20364c = _0x543beb;
                  this['isDebugging'] && (_0x20364c += JSON['stringify'](_0x3db7ce)), this['isDebugging'] && this[_0x1b0db5(0x250)](_0x20364c);
                }, _0x342afd[_0x59aaef(0x267)][_0x59aaef(0x47c)] = function (_0x77a6b7) {
                  var _0x138f23 = _0x59aaef;

                  for (var _0x215696 = [], _0x1278e7 = 0x1; _0x1278e7 < arguments[_0x138f23(0x109)]; _0x1278e7++) {
                    _0x215696[_0x1278e7 - 0x1] = arguments[_0x1278e7];
                  }

                  var _0x57af9c = _0x77a6b7;
                  this[_0x138f23(0x11a)] && (_0x57af9c += JSON[_0x138f23(0x2eb)](_0x215696)), this[_0x138f23(0x11a)] && this[_0x138f23(0x29c)](_0x57af9c);
                }, _0x342afd[_0x59aaef(0x267)]['updateLogger'] = function (_0x3b18a1, _0x368d22, _0x4031f3) {
                  var _0x1865f2 = _0x59aaef;
                  this[_0x1865f2(0x132)] = _0x3b18a1, this[_0x1865f2(0x29c)] = _0x368d22, this[_0x1865f2(0x250)] = _0x4031f3;
                }, _0x342afd;
              }();

              _0x44d3fb[_0x42690a(0x2e7)] = _0x29afca, _0x44d3fb[_0x42690a(0x4b4)] = new _0x29afca(_0x306aa4, _0x27b51f, _0x27b51f);
            },
            0x1518: function _(_0x38bd8a, _0xdeb08f) {
              var _0x18fc8f = a1_0x1adc;
              Object['defineProperty'](_0xdeb08f, _0x18fc8f(0x2ab), {
                'value': !0x0
              }), _0xdeb08f[_0x18fc8f(0x45e)] = _0xdeb08f[_0x18fc8f(0x162)] = void 0x0;

              var _0x557d09 = function () {
                function _0x453cfc() {}

                return _0x453cfc['getInstance'] = function (_0x5d710f) {
                  return new _0x6006df();
                }, _0x453cfc;
              }();

              _0xdeb08f[_0x18fc8f(0x162)] = _0x557d09;

              var _0x6006df = function () {
                var _0x367e95 = _0x18fc8f;

                function _0x3c1592() {}

                return _0x3c1592[_0x367e95(0x267)][_0x367e95(0x4a3)] = function (_0x14ab38) {
                  var _0x3c5fe1 = _0x367e95;
                  return Object[_0x3c5fe1(0x3ef)](_0x14ab38)[_0x3c5fe1(0x17f)](function (_0x58fcf1) {
                    var _0x3549cc = _0x3c5fe1;
                    return [_0x58fcf1, _0x14ab38[_0x58fcf1]]['map'](encodeURIComponent)[_0x3549cc(0x49b)]('=');
                  })['join']('&');
                }, _0x3c1592[_0x367e95(0x267)][_0x367e95(0x4a8)] = function (_0xf32689) {
                  var _0x222b88 = _0x367e95,
                      _0xc05f0a = _0xf32689[_0x222b88(0x1a0)],
                      _0x86871 = _0xf32689[_0x222b88(0x28e)],
                      _0x5ab69f = _0xf32689[_0x222b88(0x4a5)],
                      _0x57e46d = _0xf32689[_0x222b88(0x209)],
                      _0x5e7076 = _0xf32689['callbackErr'],
                      _0x19eb16 = this[_0x222b88(0x4a3)](_0x86871),
                      _0x12f6d2 = _0x5ab69f + _0xc05f0a,
                      _0x2f2cef = new XMLHttpRequest();

                  _0x2f2cef[_0x222b88(0x32e)]('POST', _0x12f6d2, !0x0), _0x2f2cef[_0x222b88(0x214)] = 0x3a98, _0x2f2cef['setRequestHeader'](_0x222b88(0x13f), _0x222b88(0x345)), _0x2f2cef[_0x222b88(0x437)] = function () {
                    var _0x5b14e0 = _0x222b88;
                    0x4 == _0x2f2cef[_0x5b14e0(0x3cd)] ? _0x2f2cef[_0x5b14e0(0x30a)] ? _0x57e46d({
                      'status': _0x2f2cef[_0x5b14e0(0x1d4)],
                      'data': JSON[_0x5b14e0(0x41c)](_0x2f2cef[_0x5b14e0(0x30a)])
                    }) : _0x5e7076() : 0x0 === _0x2f2cef['readyState'] && _0x5e7076(), 0xc8 !== _0x2f2cef[_0x5b14e0(0x1d4)] && _0x5e7076();
                  }, _0x2f2cef[_0x222b88(0x39f)] = function (_0x3bc568) {
                    _0x5e7076();
                  }, _0x2f2cef[_0x222b88(0x474)] = function (_0x4309f2) {
                    _0x5e7076();
                  }, _0x2f2cef[_0x222b88(0x362)](_0x19eb16);
                }, _0x3c1592;
              }();

              _0xdeb08f[_0x18fc8f(0x45e)] = _0x6006df;
            },
            0x11f2: function _(_0x2702d8, _0x4e84c7) {
              var _0x4a2ff1 = a1_0x1adc;
              Object[_0x4a2ff1(0x42b)](_0x4e84c7, _0x4a2ff1(0x2ab), {
                'value': !0x0
              }), _0x4e84c7[_0x4a2ff1(0x32f)] = _0x4e84c7[_0x4a2ff1(0x400)] = void 0x0;

              var _0x4ff95a = function () {
                var _0x903206 = _0x4a2ff1;

                function _0x551126() {}

                return _0x551126[_0x903206(0x2bf)] = function (_0x4587a8) {
                  var _0x25a0eb = _0x903206;

                  for (var _0x47a043 = [], _0x3c1949 = _0x4587a8[_0x25a0eb(0x109)], _0x426ebc = 0x0; _0x426ebc < _0x3c1949;) {
                    var _0x4b5b73 = _0x4587a8[_0x25a0eb(0x260)](_0x426ebc),
                        _0x4ef725 = 0x0,
                        _0x3849f3 = 0x0;

                    for (_0x4b5b73 <= 0x7f ? (_0x4ef725 = 0x0, _0x3849f3 = 0x0) : _0x4b5b73 <= 0x7ff ? (_0x4ef725 = 0x6, _0x3849f3 = 0xc0) : _0x4b5b73 <= 0xffff ? (_0x4ef725 = 0xc, _0x3849f3 = 0xe0) : _0x4b5b73 <= 0x1fffff && (_0x4ef725 = 0x12, _0x3849f3 = 0xf0), _0x47a043['push'](_0x3849f3 | _0x4b5b73 >> _0x4ef725), _0x4ef725 -= 0x6; _0x4ef725 >= 0x0;) {
                      _0x47a043[_0x25a0eb(0x4c0)](0x80 | _0x4b5b73 >> _0x4ef725 & 0x3f), _0x4ef725 -= 0x6;
                    }

                    _0x426ebc += _0x4b5b73 >= 0x10000 ? 0x2 : 0x1;
                  }

                  return new Uint8Array(_0x47a043);
                }, _0x551126;
              }();

              _0x4e84c7['TextEncoder'] = _0x4ff95a;

              var _0x3e632c = function () {
                var _0x29a26a = _0x4a2ff1;

                function _0x1353de() {}

                return _0x1353de[_0x29a26a(0x2a8)] = function (_0x3e4ede) {
                  var _0x4d991c = _0x29a26a;

                  for (var _0x4effec = Array[_0x4d991c(0x336)](_0x3e4ede), _0x4f3383 = '', _0x199f38 = 0x0; _0x199f38 < _0x4effec['length'];) {
                    var _0x378a2c = _0x4effec[_0x199f38],
                        _0x5898e1 = 0x0,
                        _0x23c951 = 0x0;

                    if (_0x378a2c <= 0x7f ? (_0x5898e1 = 0x0, _0x23c951 = 0xff & _0x378a2c) : _0x378a2c <= 0xdf ? (_0x5898e1 = 0x1, _0x23c951 = 0x1f & _0x378a2c) : _0x378a2c <= 0xef ? (_0x5898e1 = 0x2, _0x23c951 = 0xf & _0x378a2c) : _0x378a2c <= 0xf4 && (_0x5898e1 = 0x3, _0x23c951 = 0x7 & _0x378a2c), _0x4effec[_0x4d991c(0x109)] - _0x199f38 - _0x5898e1 > 0x0) {
                      for (var _0x3c8f3c = 0x0; _0x3c8f3c < _0x5898e1;) {
                        _0x23c951 = _0x23c951 << 0x6 | 0x3f & (_0x378a2c = _0x4effec[_0x199f38 + _0x3c8f3c + 0x1]), _0x3c8f3c += 0x1;
                      }
                    } else _0x23c951 = 0xfffd, _0x5898e1 = _0x4effec['length'] - _0x199f38;

                    _0x4f3383 += String[_0x4d991c(0x16c)](_0x23c951), _0x199f38 += _0x5898e1 + 0x1;
                  }

                  return _0x4f3383;
                }, _0x1353de;
              }();

              _0x4e84c7[_0x4a2ff1(0x32f)] = _0x3e632c;
            },
            0x758: function _(_0x11201e, _0x41dd32) {
              var _0x3e2c8f = a1_0x1adc;
              Object[_0x3e2c8f(0x42b)](_0x41dd32, _0x3e2c8f(0x2ab), {
                'value': !0x0
              }), _0x41dd32[_0x3e2c8f(0x2d4)] = void 0x0, _0x41dd32[_0x3e2c8f(0x2d4)] = function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'['replace'](/[xy]/g, function (_0x17f760) {
                  var _0x48e367 = a1_0x1adc,
                      _0x17a217 = 0x10 * Math[_0x48e367(0x358)]() | 0x0;

                  return ('x' === _0x17f760 ? _0x17a217 : 0x3 & _0x17a217 | 0x8)[_0x48e367(0x1c8)](0x10);
                })['replace'](/-/gi, '');
              };
            },
            0x1afa: function _(_0x542602) {
              var _0x2cdc98 = a1_0x1adc;

              function _0x118459() {}

              _0x542602[_0x2cdc98(0x10f)] = function (_0x22e655, _0x4dc586, _0x33d642) {
                var _0x46bcf2 = _0x2cdc98,
                    _0x4fcc2a = !0x1;

                return _0x33d642 = _0x33d642 || _0x118459, _0x281acf[_0x46bcf2(0x1d6)] = _0x22e655, 0x0 === _0x22e655 ? _0x4dc586() : _0x281acf;

                function _0x281acf(_0x92766c, _0x4dc2f1) {
                  var _0x2ce160 = _0x46bcf2;
                  if (_0x281acf[_0x2ce160(0x1d6)] <= 0x0) throw new Error('after\x20called\x20too\x20many\x20times');
                  --_0x281acf[_0x2ce160(0x1d6)], _0x92766c ? (_0x4fcc2a = !0x0, _0x4dc586(_0x92766c), _0x4dc586 = _0x33d642) : 0x0 !== _0x281acf['count'] || _0x4fcc2a || _0x4dc586(null, _0x4dc2f1);
                }
              };
            },
            0x25f6: function _(_0x1abaa1) {
              var _0x17c857 = a1_0x1adc;

              _0x1abaa1[_0x17c857(0x10f)] = function (_0x5b8ab1, _0x45cb1d, _0xb7a9dd) {
                var _0x1b30b3 = _0x17c857,
                    _0x530a90 = _0x5b8ab1[_0x1b30b3(0x3c9)];

                if (_0x45cb1d = _0x45cb1d || 0x0, _0xb7a9dd = _0xb7a9dd || _0x530a90, _0x5b8ab1['slice']) return _0x5b8ab1[_0x1b30b3(0x167)](_0x45cb1d, _0xb7a9dd);
                if (_0x45cb1d < 0x0 && (_0x45cb1d += _0x530a90), _0xb7a9dd < 0x0 && (_0xb7a9dd += _0x530a90), _0xb7a9dd > _0x530a90 && (_0xb7a9dd = _0x530a90), _0x45cb1d >= _0x530a90 || _0x45cb1d >= _0xb7a9dd || 0x0 === _0x530a90) return new ArrayBuffer(0x0);

                for (var _0x51cdd0 = new Uint8Array(_0x5b8ab1), _0x10e795 = new Uint8Array(_0xb7a9dd - _0x45cb1d), _0x5c9b9b = _0x45cb1d, _0x56ea99 = 0x0; _0x5c9b9b < _0xb7a9dd; _0x5c9b9b++, _0x56ea99++) {
                  _0x10e795[_0x56ea99] = _0x51cdd0[_0x5c9b9b];
                }

                return _0x10e795['buffer'];
              };
            },
            0xbc2: function _(_0x5e9f2a) {
              var _0x189150 = a1_0x1adc;

              function _0x47975d(_0x31c222) {
                var _0x3a9a56 = a1_0x1adc;
                _0x31c222 = _0x31c222 || {}, this['ms'] = _0x31c222[_0x3a9a56(0x2d1)] || 0x64, this[_0x3a9a56(0x340)] = _0x31c222[_0x3a9a56(0x340)] || 0x2710, this['factor'] = _0x31c222[_0x3a9a56(0x1e9)] || 0x2, this[_0x3a9a56(0x460)] = _0x31c222[_0x3a9a56(0x460)] > 0x0 && _0x31c222['jitter'] <= 0x1 ? _0x31c222[_0x3a9a56(0x460)] : 0x0, this[_0x3a9a56(0x3a4)] = 0x0;
              }

              _0x5e9f2a[_0x189150(0x10f)] = _0x47975d, _0x47975d[_0x189150(0x267)][_0x189150(0x16e)] = function () {
                var _0x42a21a = _0x189150,
                    _0x4d84d4 = this['ms'] * Math[_0x42a21a(0x1ae)](this[_0x42a21a(0x1e9)], this[_0x42a21a(0x3a4)]++);

                if (this['jitter']) {
                  var _0x40423c = Math[_0x42a21a(0x358)](),
                      _0x1951c8 = Math[_0x42a21a(0x38b)](_0x40423c * this['jitter'] * _0x4d84d4);

                  _0x4d84d4 = 0x0 == (0x1 & Math[_0x42a21a(0x38b)](0xa * _0x40423c)) ? _0x4d84d4 - _0x1951c8 : _0x4d84d4 + _0x1951c8;
                }

                return 0x0 | Math['min'](_0x4d84d4, this['max']);
              }, _0x47975d[_0x189150(0x267)][_0x189150(0x3ea)] = function () {
                var _0x461f76 = _0x189150;
                this[_0x461f76(0x3a4)] = 0x0;
              }, _0x47975d['prototype'][_0x189150(0x404)] = function (_0x38838c) {
                this['ms'] = _0x38838c;
              }, _0x47975d[_0x189150(0x267)][_0x189150(0x365)] = function (_0x3c86bd) {
                var _0x238fa8 = _0x189150;
                this[_0x238fa8(0x340)] = _0x3c86bd;
              }, _0x47975d[_0x189150(0x267)][_0x189150(0x3b9)] = function (_0x2ea66b) {
                this['jitter'] = _0x2ea66b;
              };
            },
            0xe78: function _(_0x549752, _0x7a66b) {
              var _0x266264 = a1_0x1adc;
              !function (_0x27791d) {
                _0x7a66b['encode'] = function (_0x5c51dc) {
                  var _0x31cc7e = a1_0x1adc,
                      _0x43e240,
                      _0x34c446 = new Uint8Array(_0x5c51dc),
                      _0xadb5ca = _0x34c446['length'],
                      _0x4abf3d = '';

                  for (_0x43e240 = 0x0; _0x43e240 < _0xadb5ca; _0x43e240 += 0x3) {
                    _0x4abf3d += _0x27791d[_0x34c446[_0x43e240] >> 0x2], _0x4abf3d += _0x27791d[(0x3 & _0x34c446[_0x43e240]) << 0x4 | _0x34c446[_0x43e240 + 0x1] >> 0x4], _0x4abf3d += _0x27791d[(0xf & _0x34c446[_0x43e240 + 0x1]) << 0x2 | _0x34c446[_0x43e240 + 0x2] >> 0x6], _0x4abf3d += _0x27791d[0x3f & _0x34c446[_0x43e240 + 0x2]];
                  }

                  return _0xadb5ca % 0x3 == 0x2 ? _0x4abf3d = _0x4abf3d[_0x31cc7e(0x495)](0x0, _0x4abf3d[_0x31cc7e(0x109)] - 0x1) + '=' : _0xadb5ca % 0x3 == 0x1 && (_0x4abf3d = _0x4abf3d['substring'](0x0, _0x4abf3d[_0x31cc7e(0x109)] - 0x2) + '=='), _0x4abf3d;
                }, _0x7a66b['decode'] = function (_0xe04782) {
                  var _0x215f1c = a1_0x1adc,
                      _0x2f2e4d,
                      _0x1a26d2,
                      _0x2de6ab,
                      _0x45ff41,
                      _0x3148bc,
                      _0x4a61e1 = 0.75 * _0xe04782['length'],
                      _0x504a0c = _0xe04782[_0x215f1c(0x109)],
                      _0xa177e = 0x0;

                  '=' === _0xe04782[_0xe04782[_0x215f1c(0x109)] - 0x1] && (_0x4a61e1--, '=' === _0xe04782[_0xe04782[_0x215f1c(0x109)] - 0x2] && _0x4a61e1--);

                  var _0xaccf98 = new ArrayBuffer(_0x4a61e1),
                      _0x35e0a7 = new Uint8Array(_0xaccf98);

                  for (_0x2f2e4d = 0x0; _0x2f2e4d < _0x504a0c; _0x2f2e4d += 0x4) {
                    _0x1a26d2 = _0x27791d[_0x215f1c(0x458)](_0xe04782[_0x2f2e4d]), _0x2de6ab = _0x27791d[_0x215f1c(0x458)](_0xe04782[_0x2f2e4d + 0x1]), _0x45ff41 = _0x27791d['indexOf'](_0xe04782[_0x2f2e4d + 0x2]), _0x3148bc = _0x27791d[_0x215f1c(0x458)](_0xe04782[_0x2f2e4d + 0x3]), _0x35e0a7[_0xa177e++] = _0x1a26d2 << 0x2 | _0x2de6ab >> 0x4, _0x35e0a7[_0xa177e++] = (0xf & _0x2de6ab) << 0x4 | _0x45ff41 >> 0x2, _0x35e0a7[_0xa177e++] = (0x3 & _0x45ff41) << 0x6 | 0x3f & _0x3148bc;
                  }

                  return _0xaccf98;
                };
              }(_0x266264(0x40d));
            },
            0x15ac: function _(_0x9cf18) {
              var _0x333c12 = a1_0x1adc,
                  _0x16744c = void 0x0 !== _0x16744c ? _0x16744c : _0x333c12(0x121) != typeof WebKitBlobBuilder ? WebKitBlobBuilder : _0x333c12(0x121) != typeof MSBlobBuilder ? MSBlobBuilder : _0x333c12(0x121) != typeof MozBlobBuilder && MozBlobBuilder,
                  _0x26bfd8 = function () {
                var _0x4b7e24 = _0x333c12;

                try {
                  return 0x2 === new Blob(['hi'])[_0x4b7e24(0x33a)];
                } catch (_0x4ee616) {
                  return !0x1;
                }
              }(),
                  _0x214f90 = _0x26bfd8 && function () {
                var _0xda0317 = _0x333c12;

                try {
                  return 0x2 === new Blob([new Uint8Array([0x1, 0x2])])[_0xda0317(0x33a)];
                } catch (_0x2ebb0f) {
                  return !0x1;
                }
              }(),
                  _0x490a59 = _0x16744c && _0x16744c[_0x333c12(0x267)][_0x333c12(0x232)] && _0x16744c['prototype'][_0x333c12(0x421)];

              function _0x577867(_0x164cb3) {
                var _0x336108 = _0x333c12;
                return _0x164cb3[_0x336108(0x17f)](function (_0x32a809) {
                  var _0x5c8fdb = _0x336108;

                  if (_0x32a809[_0x5c8fdb(0x477)] instanceof ArrayBuffer) {
                    var _0x30064c = _0x32a809[_0x5c8fdb(0x477)];

                    if (_0x32a809['byteLength'] !== _0x30064c[_0x5c8fdb(0x3c9)]) {
                      var _0xb5c5d7 = new Uint8Array(_0x32a809[_0x5c8fdb(0x3c9)]);

                      _0xb5c5d7['set'](new Uint8Array(_0x30064c, _0x32a809[_0x5c8fdb(0x180)], _0x32a809[_0x5c8fdb(0x3c9)])), _0x30064c = _0xb5c5d7['buffer'];
                    }

                    return _0x30064c;
                  }

                  return _0x32a809;
                });
              }

              function _0xd4768d(_0x56c318, _0x1dabc5) {
                var _0x12e732 = _0x333c12;
                _0x1dabc5 = _0x1dabc5 || {};

                var _0x48b89e = new _0x16744c();

                return _0x577867(_0x56c318)[_0x12e732(0x37b)](function (_0x2cfbc7) {
                  var _0x5a768e = _0x12e732;

                  _0x48b89e[_0x5a768e(0x232)](_0x2cfbc7);
                }), _0x1dabc5[_0x12e732(0x1bd)] ? _0x48b89e[_0x12e732(0x421)](_0x1dabc5[_0x12e732(0x1bd)]) : _0x48b89e['getBlob']();
              }

              function _0x170f11(_0x363475, _0x2a43e0) {
                return new Blob(_0x577867(_0x363475), _0x2a43e0 || {});
              }

              _0x333c12(0x121) != typeof Blob && (_0xd4768d['prototype'] = Blob[_0x333c12(0x267)], _0x170f11[_0x333c12(0x267)] = Blob[_0x333c12(0x267)]), _0x9cf18[_0x333c12(0x10f)] = _0x26bfd8 ? _0x214f90 ? Blob : _0x170f11 : _0x490a59 ? _0xd4768d : void 0x0;
            },
            0x17bd: function _(_0x3ebcac) {
              var _0xdac19d = a1_0x1adc,
                  _0x433cda = [][_0xdac19d(0x167)];

              _0x3ebcac['exports'] = function (_0x1a6844, _0x4185a5) {
                var _0xbd1019 = _0xdac19d;
                if (_0xbd1019(0x2df) == typeof _0x4185a5 && (_0x4185a5 = _0x1a6844[_0x4185a5]), _0xbd1019(0x23a) != typeof _0x4185a5) throw new Error('bind()\x20requires\x20a\x20function');

                var _0x1b78b5 = _0x433cda[_0xbd1019(0x20b)](arguments, 0x2);

                return function () {
                  var _0x22b440 = _0xbd1019;
                  return _0x4185a5['apply'](_0x1a6844, _0x1b78b5[_0x22b440(0x46f)](_0x433cda[_0x22b440(0x20b)](arguments)));
                };
              };
            },
            0x223f: function _(_0x2262d5) {
              var _0x5c2495 = a1_0x1adc;

              function _0x331ed7(_0x433191) {
                if (_0x433191) return function (_0x3b8113) {
                  var _0x250a54 = a1_0x1adc;

                  for (var _0x12288d in _0x331ed7['prototype']) {
                    _0x3b8113[_0x12288d] = _0x331ed7[_0x250a54(0x267)][_0x12288d];
                  }

                  return _0x3b8113;
                }(_0x433191);
              }

              _0x2262d5[_0x5c2495(0x10f)] = _0x331ed7, _0x331ed7[_0x5c2495(0x267)]['on'] = _0x331ed7[_0x5c2495(0x267)][_0x5c2495(0x3d9)] = function (_0x261957, _0x170dff) {
                var _0x455632 = _0x5c2495;
                return this[_0x455632(0x27b)] = this[_0x455632(0x27b)] || {}, (this[_0x455632(0x27b)]['$' + _0x261957] = this[_0x455632(0x27b)]['$' + _0x261957] || [])[_0x455632(0x4c0)](_0x170dff), this;
              }, _0x331ed7[_0x5c2495(0x267)]['once'] = function (_0x5c5126, _0x359614) {
                function _0x52960f() {
                  var _0x22143a = a1_0x1adc;
                  this[_0x22143a(0x441)](_0x5c5126, _0x52960f), _0x359614[_0x22143a(0x148)](this, arguments);
                }

                return _0x52960f['fn'] = _0x359614, this['on'](_0x5c5126, _0x52960f), this;
              }, _0x331ed7['prototype']['off'] = _0x331ed7['prototype'][_0x5c2495(0x126)] = _0x331ed7[_0x5c2495(0x267)]['removeAllListeners'] = _0x331ed7[_0x5c2495(0x267)][_0x5c2495(0x434)] = function (_0x32465e, _0x4d0ae8) {
                var _0x252370 = _0x5c2495;
                if (this[_0x252370(0x27b)] = this['_callbacks'] || {}, 0x0 == arguments[_0x252370(0x109)]) return this[_0x252370(0x27b)] = {}, this;

                var _0x3ad526,
                    _0x39baf0 = this[_0x252370(0x27b)]['$' + _0x32465e];

                if (!_0x39baf0) return this;
                if (0x1 == arguments[_0x252370(0x109)]) return delete this[_0x252370(0x27b)]['$' + _0x32465e], this;

                for (var _0x34ccac = 0x0; _0x34ccac < _0x39baf0[_0x252370(0x109)]; _0x34ccac++) {
                  if ((_0x3ad526 = _0x39baf0[_0x34ccac]) === _0x4d0ae8 || _0x3ad526['fn'] === _0x4d0ae8) {
                    _0x39baf0[_0x252370(0x35b)](_0x34ccac, 0x1);

                    break;
                  }
                }

                return 0x0 === _0x39baf0['length'] && delete this[_0x252370(0x27b)]['$' + _0x32465e], this;
              }, _0x331ed7['prototype'][_0x5c2495(0x426)] = function (_0x59dbb1) {
                var _0x49b8e1 = _0x5c2495;
                this[_0x49b8e1(0x27b)] = this[_0x49b8e1(0x27b)] || {};

                for (var _0x4774dc = new Array(arguments[_0x49b8e1(0x109)] - 0x1), _0x4ede32 = this[_0x49b8e1(0x27b)]['$' + _0x59dbb1], _0x1087f8 = 0x1; _0x1087f8 < arguments[_0x49b8e1(0x109)]; _0x1087f8++) {
                  _0x4774dc[_0x1087f8 - 0x1] = arguments[_0x1087f8];
                }

                if (_0x4ede32) {
                  _0x1087f8 = 0x0;

                  for (var _0x257719 = (_0x4ede32 = _0x4ede32[_0x49b8e1(0x167)](0x0))[_0x49b8e1(0x109)]; _0x1087f8 < _0x257719; ++_0x1087f8) {
                    _0x4ede32[_0x1087f8][_0x49b8e1(0x148)](this, _0x4774dc);
                  }
                }

                return this;
              }, _0x331ed7['prototype'][_0x5c2495(0x43f)] = function (_0x477b34) {
                var _0x372d3d = _0x5c2495;
                return this[_0x372d3d(0x27b)] = this[_0x372d3d(0x27b)] || {}, this[_0x372d3d(0x27b)]['$' + _0x477b34] || [];
              }, _0x331ed7[_0x5c2495(0x267)]['hasListeners'] = function (_0xbe5a0b) {
                var _0x4cf63c = _0x5c2495;
                return !!this[_0x4cf63c(0x43f)](_0xbe5a0b)['length'];
              };
            },
            0xf15: function _(_0x16bd13) {
              var _0x2d7bf6 = a1_0x1adc;

              _0x16bd13[_0x2d7bf6(0x10f)] = function (_0x13414c, _0x3d151f) {
                var _0x1ed124 = _0x2d7bf6,
                    _0x4aaeb2 = function _0x4aaeb2() {};

                _0x4aaeb2[_0x1ed124(0x267)] = _0x3d151f[_0x1ed124(0x267)], _0x13414c[_0x1ed124(0x267)] = new _0x4aaeb2(), _0x13414c[_0x1ed124(0x267)][_0x1ed124(0x389)] = _0x13414c;
              };
            },
            0x4cb: function _(_0x4bf5a3, _0x314fd5, _0x57d9a6) {
              var _0x1828ef = a1_0x1adc;

              function _0x47269b() {
                var _0x92e189 = a1_0x1adc,
                    _0x14af22;

                try {
                  _0x14af22 = _0x314fd5['storage'][_0x92e189(0x29a)];
                } catch (_0x229db7) {}

                return !_0x14af22 && 'undefined' != typeof process && _0x92e189(0x498) in process && (_0x14af22 = process['env'][_0x92e189(0x2af)]), _0x14af22;
              }

              (_0x314fd5 = _0x4bf5a3['exports'] = _0x57d9a6(0x67a))[_0x1828ef(0x4bf)] = function () {
                var _0x2f283c = _0x1828ef;
                return _0x2f283c(0x26e) == typeof console && console[_0x2f283c(0x4bf)] && Function['prototype'][_0x2f283c(0x148)][_0x2f283c(0x20b)](console[_0x2f283c(0x4bf)], console, arguments);
              }, _0x314fd5[_0x1828ef(0x2c2)] = function (_0x2444e5) {
                var _0x1dbfa3 = _0x1828ef,
                    _0x4a7c59 = this['useColors'];

                if (_0x2444e5[0x0] = (_0x4a7c59 ? '%c' : '') + this[_0x1dbfa3(0x367)] + (_0x4a7c59 ? _0x1dbfa3(0x217) : '\x20') + _0x2444e5[0x0] + (_0x4a7c59 ? _0x1dbfa3(0x4b3) : '\x20') + '+' + _0x314fd5['humanize'](this[_0x1dbfa3(0x4c9)]), _0x4a7c59) {
                  var _0x1aaa86 = _0x1dbfa3(0x396) + this[_0x1dbfa3(0x20e)];

                  _0x2444e5[_0x1dbfa3(0x35b)](0x1, 0x0, _0x1aaa86, _0x1dbfa3(0x22b));

                  var _0x19e90d = 0x0,
                      _0x176d53 = 0x0;
                  _0x2444e5[0x0][_0x1dbfa3(0x27c)](/%[a-zA-Z%]/g, function (_0x3ae4ff) {
                    '%%' !== _0x3ae4ff && (_0x19e90d++, '%c' === _0x3ae4ff && (_0x176d53 = _0x19e90d));
                  }), _0x2444e5[_0x1dbfa3(0x35b)](_0x176d53, 0x0, _0x1aaa86);
                }
              }, _0x314fd5[_0x1828ef(0x17d)] = function (_0x18e7bf) {
                var _0x413394 = _0x1828ef;

                try {
                  null == _0x18e7bf ? _0x314fd5[_0x413394(0x264)][_0x413394(0x1c1)](_0x413394(0x29a)) : _0x314fd5[_0x413394(0x264)]['debug'] = _0x18e7bf;
                } catch (_0x2d6321) {}
              }, _0x314fd5[_0x1828ef(0x3e6)] = _0x47269b, _0x314fd5[_0x1828ef(0x22f)] = function () {
                var _0x174c94 = _0x1828ef;
                return !(_0x174c94(0x121) == typeof window || !window['process'] || _0x174c94(0x2a5) !== window[_0x174c94(0x24b)][_0x174c94(0x1bd)]) || (_0x174c94(0x121) == typeof navigator || !navigator[_0x174c94(0x2a9)] || !navigator[_0x174c94(0x2a9)][_0x174c94(0x444)]()[_0x174c94(0x291)](/(edge|trident)\/(\d+)/)) && (_0x174c94(0x121) != typeof document && document[_0x174c94(0x428)] && document[_0x174c94(0x428)][_0x174c94(0x326)] && document[_0x174c94(0x428)]['style'][_0x174c94(0x2d6)] || _0x174c94(0x121) != typeof window && window['console'] && (window['console']['firebug'] || window[_0x174c94(0x456)][_0x174c94(0x317)] && window[_0x174c94(0x456)][_0x174c94(0x12a)]) || _0x174c94(0x121) != typeof navigator && navigator[_0x174c94(0x2a9)] && navigator[_0x174c94(0x2a9)][_0x174c94(0x444)]()[_0x174c94(0x291)](/firefox\/(\d+)/) && parseInt(RegExp['$1'], 0xa) >= 0x1f || _0x174c94(0x121) != typeof navigator && navigator[_0x174c94(0x2a9)] && navigator[_0x174c94(0x2a9)][_0x174c94(0x444)]()['match'](/applewebkit\/(\d+)/));
              }, _0x314fd5[_0x1828ef(0x264)] = _0x1828ef(0x121) != typeof chrome && void 0x0 !== chrome['storage'] ? chrome[_0x1828ef(0x264)][_0x1828ef(0x183)] : function () {
                var _0x17ea77 = _0x1828ef;

                try {
                  return window[_0x17ea77(0x252)];
                } catch (_0x382277) {}
              }(), _0x314fd5[_0x1828ef(0x3ec)] = [_0x1828ef(0x361), _0x1828ef(0x30f), _0x1828ef(0x4d1), _0x1828ef(0x18a), _0x1828ef(0x36c), _0x1828ef(0x472), _0x1828ef(0x1f7), _0x1828ef(0x212), '#00CC00', _0x1828ef(0x320), '#00CC66', _0x1828ef(0x2b3), _0x1828ef(0x316), _0x1828ef(0x2b0), _0x1828ef(0x379), _0x1828ef(0x221), '#3333CC', _0x1828ef(0x39e), _0x1828ef(0x10b), '#3366FF', _0x1828ef(0x11d), _0x1828ef(0x134), _0x1828ef(0x29b), _0x1828ef(0x411), _0x1828ef(0x18f), _0x1828ef(0x48c), _0x1828ef(0x4d4), '#33CCFF', '#6600CC', _0x1828ef(0x2cc), _0x1828ef(0x4aa), _0x1828ef(0x3ae), _0x1828ef(0x185), _0x1828ef(0x394), _0x1828ef(0x33f), '#9900FF', '#9933CC', _0x1828ef(0x26f), _0x1828ef(0x3e3), '#99CC33', _0x1828ef(0x386), _0x1828ef(0x1b6), _0x1828ef(0x47a), _0x1828ef(0x461), _0x1828ef(0x138), _0x1828ef(0x43d), _0x1828ef(0x3f4), _0x1828ef(0x3de), _0x1828ef(0x3d0), _0x1828ef(0x4c4), '#CC33CC', '#CC33FF', _0x1828ef(0x21b), _0x1828ef(0x36a), _0x1828ef(0x454), '#CC9933', _0x1828ef(0x203), _0x1828ef(0x314), _0x1828ef(0x178), _0x1828ef(0x160), _0x1828ef(0x33e), _0x1828ef(0x465), _0x1828ef(0x1e3), _0x1828ef(0x305), _0x1828ef(0x14e), _0x1828ef(0x485), _0x1828ef(0x462), _0x1828ef(0x27f), _0x1828ef(0x2bb), _0x1828ef(0x4a7), '#FF6600', _0x1828ef(0x453), _0x1828ef(0x328), '#FF9933', _0x1828ef(0x2f0), _0x1828ef(0x486)], _0x314fd5[_0x1828ef(0x2e8)]['j'] = function (_0x12069d) {
                var _0x370a0d = _0x1828ef;

                try {
                  return JSON[_0x370a0d(0x2eb)](_0x12069d);
                } catch (_0xe1a01d) {
                  return _0x370a0d(0x290) + _0xe1a01d[_0x370a0d(0x1cd)];
                }
              }, _0x314fd5[_0x1828ef(0x4b0)](_0x47269b());
            },
            0x67a: function _(_0xf78344, _0x57d5bb, _0x2d9bd3) {
              var _0x61e61b = a1_0x1adc;

              function _0x4e7b5c(_0x22272d) {
                var _0x10b483 = a1_0x1adc,
                    _0x468c62;

                function _0x1ce536() {
                  var _0x33f01a = a1_0x1adc;

                  if (_0x1ce536[_0x33f01a(0x36b)]) {
                    var _0x1c4ed6 = _0x1ce536,
                        _0x571c6b = +new Date(),
                        _0x12fa93 = _0x571c6b - (_0x468c62 || _0x571c6b);

                    _0x1c4ed6[_0x33f01a(0x4c9)] = _0x12fa93, _0x1c4ed6[_0x33f01a(0x484)] = _0x468c62, _0x1c4ed6[_0x33f01a(0x363)] = _0x571c6b, _0x468c62 = _0x571c6b;

                    for (var _0x8035bf = new Array(arguments[_0x33f01a(0x109)]), _0x55c14f = 0x0; _0x55c14f < _0x8035bf['length']; _0x55c14f++) {
                      _0x8035bf[_0x55c14f] = arguments[_0x55c14f];
                    }

                    _0x8035bf[0x0] = _0x57d5bb[_0x33f01a(0x2fd)](_0x8035bf[0x0]), _0x33f01a(0x2df) != typeof _0x8035bf[0x0] && _0x8035bf[_0x33f01a(0x2f6)]('%O');
                    var _0x2d57ea = 0x0;
                    _0x8035bf[0x0] = _0x8035bf[0x0][_0x33f01a(0x27c)](/%([a-zA-Z%])/g, function (_0x33b81b, _0x1e4a2e) {
                      var _0x2db353 = _0x33f01a;
                      if ('%%' === _0x33b81b) return _0x33b81b;
                      _0x2d57ea++;

                      var _0x4843e0 = _0x57d5bb[_0x2db353(0x2e8)][_0x1e4a2e];

                      if (_0x2db353(0x23a) == typeof _0x4843e0) {
                        var _0x37e0c1 = _0x8035bf[_0x2d57ea];
                        _0x33b81b = _0x4843e0[_0x2db353(0x20b)](_0x1c4ed6, _0x37e0c1), _0x8035bf[_0x2db353(0x35b)](_0x2d57ea, 0x1), _0x2d57ea--;
                      }

                      return _0x33b81b;
                    }), _0x57d5bb[_0x33f01a(0x2c2)]['call'](_0x1c4ed6, _0x8035bf);

                    var _0x3b76eb = _0x1ce536[_0x33f01a(0x4bf)] || _0x57d5bb[_0x33f01a(0x4bf)] || console['log'][_0x33f01a(0x42f)](console);

                    _0x3b76eb[_0x33f01a(0x148)](_0x1c4ed6, _0x8035bf);
                  }
                }

                return _0x1ce536[_0x10b483(0x367)] = _0x22272d, _0x1ce536[_0x10b483(0x36b)] = _0x57d5bb[_0x10b483(0x36b)](_0x22272d), _0x1ce536[_0x10b483(0x22f)] = _0x57d5bb['useColors'](), _0x1ce536[_0x10b483(0x20e)] = function (_0x5640ae) {
                  var _0x51f0d = _0x10b483,
                      _0xb2a45a,
                      _0x46cf68 = 0x0;

                  for (_0xb2a45a in _0x5640ae) {
                    _0x46cf68 = (_0x46cf68 << 0x5) - _0x46cf68 + _0x5640ae[_0x51f0d(0x3ca)](_0xb2a45a), _0x46cf68 |= 0x0;
                  }

                  return _0x57d5bb[_0x51f0d(0x3ec)][Math['abs'](_0x46cf68) % _0x57d5bb[_0x51f0d(0x3ec)]['length']];
                }(_0x22272d), _0x1ce536[_0x10b483(0x125)] = _0xece40c, _0x10b483(0x23a) == typeof _0x57d5bb[_0x10b483(0x15d)] && _0x57d5bb[_0x10b483(0x15d)](_0x1ce536), _0x57d5bb[_0x10b483(0x330)]['push'](_0x1ce536), _0x1ce536;
              }

              function _0xece40c() {
                var _0x4c687a = a1_0x1adc,
                    _0x364b04 = _0x57d5bb[_0x4c687a(0x330)][_0x4c687a(0x458)](this);

                return -0x1 !== _0x364b04 && (_0x57d5bb['instances']['splice'](_0x364b04, 0x1), !0x0);
              }

              (_0x57d5bb = _0xf78344[_0x61e61b(0x10f)] = _0x4e7b5c[_0x61e61b(0x29a)] = _0x4e7b5c[_0x61e61b(0x4b4)] = _0x4e7b5c)['coerce'] = function (_0x7448ed) {
                var _0x33d78c = _0x61e61b;
                return _0x7448ed instanceof Error ? _0x7448ed['stack'] || _0x7448ed[_0x33d78c(0x1cd)] : _0x7448ed;
              }, _0x57d5bb['disable'] = function () {
                _0x57d5bb['enable']('');
              }, _0x57d5bb[_0x61e61b(0x4b0)] = function (_0x3ecc1a) {
                var _0x36c624 = _0x61e61b,
                    _0x554f24;

                _0x57d5bb['save'](_0x3ecc1a), _0x57d5bb[_0x36c624(0x1ce)] = [], _0x57d5bb[_0x36c624(0x133)] = [];

                var _0x3658ae = ('string' == typeof _0x3ecc1a ? _0x3ecc1a : '')[_0x36c624(0x194)](/[\s,]+/),
                    _0x32d96a = _0x3658ae[_0x36c624(0x109)];

                for (_0x554f24 = 0x0; _0x554f24 < _0x32d96a; _0x554f24++) {
                  _0x3658ae[_0x554f24] && ('-' === (_0x3ecc1a = _0x3658ae[_0x554f24][_0x36c624(0x27c)](/\*/g, _0x36c624(0x34b)))[0x0] ? _0x57d5bb[_0x36c624(0x133)]['push'](new RegExp('^' + _0x3ecc1a[_0x36c624(0x1ba)](0x1) + '$')) : _0x57d5bb[_0x36c624(0x1ce)][_0x36c624(0x4c0)](new RegExp('^' + _0x3ecc1a + '$')));
                }

                for (_0x554f24 = 0x0; _0x554f24 < _0x57d5bb[_0x36c624(0x330)][_0x36c624(0x109)]; _0x554f24++) {
                  var _0x29bad1 = _0x57d5bb[_0x36c624(0x330)][_0x554f24];

                  _0x29bad1[_0x36c624(0x36b)] = _0x57d5bb['enabled'](_0x29bad1['namespace']);
                }
              }, _0x57d5bb[_0x61e61b(0x36b)] = function (_0x6bf99d) {
                var _0x1c9e12 = _0x61e61b;
                if ('*' === _0x6bf99d[_0x6bf99d['length'] - 0x1]) return !0x0;

                var _0x2d1116, _0x59febd;

                for (_0x2d1116 = 0x0, _0x59febd = _0x57d5bb[_0x1c9e12(0x133)][_0x1c9e12(0x109)]; _0x2d1116 < _0x59febd; _0x2d1116++) {
                  if (_0x57d5bb[_0x1c9e12(0x133)][_0x2d1116][_0x1c9e12(0x4cc)](_0x6bf99d)) return !0x1;
                }

                for (_0x2d1116 = 0x0, _0x59febd = _0x57d5bb[_0x1c9e12(0x1ce)][_0x1c9e12(0x109)]; _0x2d1116 < _0x59febd; _0x2d1116++) {
                  if (_0x57d5bb[_0x1c9e12(0x1ce)][_0x2d1116]['test'](_0x6bf99d)) return !0x0;
                }

                return !0x1;
              }, _0x57d5bb['humanize'] = _0x2d9bd3(0x1e90), _0x57d5bb['instances'] = [], _0x57d5bb[_0x61e61b(0x1ce)] = [], _0x57d5bb[_0x61e61b(0x133)] = [], _0x57d5bb['formatters'] = {};
            },
            0xddd: function _(_0x1000c2) {
              var _0x15220b = a1_0x1adc;
              _0x1000c2[_0x15220b(0x10f)] = 'undefined' != typeof self ? self : 'undefined' != typeof window ? window : Function('return\x20this')();
            },
            0x175f: function _(_0x3c624b, _0x227424, _0x23f03b) {
              var _0x594de4 = a1_0x1adc;
              _0x3c624b[_0x594de4(0x10f)] = _0x23f03b(0x890), _0x3c624b['exports'][_0x594de4(0x319)] = _0x23f03b(0x1167);
            },
            0x890: function _(_0x5cf5a0, _0x5d0f6b, _0x3ee0fa) {
              var _0x2e6b19 = a1_0x1adc,
                  _0x643d0d = _0x3ee0fa(0xd18),
                  _0x41defd = _0x3ee0fa(0x223f),
                  _0x3272cd = _0x3ee0fa(0x4cb)(_0x2e6b19(0x384)),
                  _0x3dee9e = _0x3ee0fa(0x1cbb),
                  _0x5a19eb = _0x3ee0fa(0x1167),
                  _0x2eef57 = _0x3ee0fa(0x105b),
                  _0x12fba4 = _0x3ee0fa(0x726);

              function _0x483093(_0x5cd049, _0x583037) {
                var _0x3e5990 = _0x2e6b19;
                if (!(this instanceof _0x483093)) return new _0x483093(_0x5cd049, _0x583037);
                _0x583037 = _0x583037 || {}, _0x5cd049 && _0x3e5990(0x26e) == typeof _0x5cd049 && (_0x583037 = _0x5cd049, _0x5cd049 = null), _0x5cd049 ? (_0x5cd049 = _0x2eef57(_0x5cd049), _0x583037['hostname'] = _0x5cd049['host'], _0x583037['secure'] = _0x3e5990(0x1b7) === _0x5cd049[_0x3e5990(0x280)] || _0x3e5990(0x4a6) === _0x5cd049['protocol'], _0x583037[_0x3e5990(0x226)] = _0x5cd049['port'], _0x5cd049[_0x3e5990(0x174)] && (_0x583037[_0x3e5990(0x174)] = _0x5cd049[_0x3e5990(0x174)])) : _0x583037[_0x3e5990(0x4a9)] && (_0x583037[_0x3e5990(0x21a)] = _0x2eef57(_0x583037[_0x3e5990(0x4a9)])[_0x3e5990(0x4a9)]), this[_0x3e5990(0x46e)] = null != _0x583037[_0x3e5990(0x46e)] ? _0x583037[_0x3e5990(0x46e)] : _0x3e5990(0x121) != typeof location && _0x3e5990(0x24e) === location['protocol'], _0x583037[_0x3e5990(0x21a)] && !_0x583037['port'] && (_0x583037[_0x3e5990(0x226)] = this[_0x3e5990(0x46e)] ? '443' : '80'), this[_0x3e5990(0x136)] = _0x583037[_0x3e5990(0x136)] || !0x1, this[_0x3e5990(0x21a)] = _0x583037[_0x3e5990(0x21a)] || (_0x3e5990(0x121) != typeof location ? location[_0x3e5990(0x21a)] : _0x3e5990(0x200)), this['port'] = _0x583037[_0x3e5990(0x226)] || (_0x3e5990(0x121) != typeof location && location[_0x3e5990(0x226)] ? location[_0x3e5990(0x226)] : this[_0x3e5990(0x46e)] ? 0x1bb : 0x50), this['query'] = _0x583037[_0x3e5990(0x174)] || {}, 'string' == typeof this[_0x3e5990(0x174)] && (this[_0x3e5990(0x174)] = _0x12fba4[_0x3e5990(0x2a8)](this[_0x3e5990(0x174)])), this[_0x3e5990(0x1ed)] = !0x1 !== _0x583037['upgrade'], this[_0x3e5990(0x1c3)] = (_0x583037['path'] || _0x3e5990(0x142))[_0x3e5990(0x27c)](/\/$/, '') + '/', this[_0x3e5990(0x23e)] = !!_0x583037[_0x3e5990(0x23e)], this[_0x3e5990(0x241)] = !0x1 !== _0x583037['jsonp'], this['forceBase64'] = !!_0x583037[_0x3e5990(0x259)], this[_0x3e5990(0x110)] = !!_0x583037[_0x3e5990(0x110)], this[_0x3e5990(0x383)] = !0x1 !== _0x583037[_0x3e5990(0x383)], this['timestampParam'] = _0x583037[_0x3e5990(0x390)] || 't', this[_0x3e5990(0x443)] = _0x583037[_0x3e5990(0x443)], this[_0x3e5990(0x3a3)] = _0x583037['transports'] || ['polling', _0x3e5990(0x254)], this[_0x3e5990(0x13a)] = _0x583037[_0x3e5990(0x13a)] || {}, this[_0x3e5990(0x3cd)] = '', this['writeBuffer'] = [], this['prevBufferLen'] = 0x0, this[_0x3e5990(0x1ad)] = _0x583037[_0x3e5990(0x1ad)] || 0x34b, this['rememberUpgrade'] = _0x583037[_0x3e5990(0x373)] || !0x1, this[_0x3e5990(0x2dc)] = null, this[_0x3e5990(0x46b)] = _0x583037[_0x3e5990(0x46b)], this[_0x3e5990(0x208)] = !0x1 !== _0x583037[_0x3e5990(0x208)] && (_0x583037[_0x3e5990(0x208)] || {}), !0x0 === this['perMessageDeflate'] && (this[_0x3e5990(0x208)] = {}), this[_0x3e5990(0x208)] && null == this['perMessageDeflate'][_0x3e5990(0x3bd)] && (this[_0x3e5990(0x208)]['threshold'] = 0x400), this[_0x3e5990(0x29d)] = _0x583037[_0x3e5990(0x29d)] || void 0x0, this[_0x3e5990(0x308)] = _0x583037['key'] || void 0x0, this[_0x3e5990(0x45f)] = _0x583037[_0x3e5990(0x45f)] || void 0x0, this[_0x3e5990(0x3f2)] = _0x583037[_0x3e5990(0x3f2)] || void 0x0, this['ca'] = _0x583037['ca'] || void 0x0, this['ciphers'] = _0x583037[_0x3e5990(0x166)] || void 0x0, this[_0x3e5990(0x2fa)] = void 0x0 === _0x583037['rejectUnauthorized'] || _0x583037[_0x3e5990(0x2fa)], this['forceNode'] = !!_0x583037[_0x3e5990(0x28d)], this[_0x3e5990(0x4af)] = _0x3e5990(0x121) != typeof navigator && _0x3e5990(0x2df) == typeof navigator['product'] && _0x3e5990(0x446) === navigator[_0x3e5990(0x18d)][_0x3e5990(0x444)](), ('undefined' == typeof self || this[_0x3e5990(0x4af)]) && (_0x583037[_0x3e5990(0x2e3)] && Object['keys'](_0x583037['extraHeaders'])['length'] > 0x0 && (this[_0x3e5990(0x2e3)] = _0x583037[_0x3e5990(0x2e3)]), _0x583037[_0x3e5990(0x271)] && (this[_0x3e5990(0x271)] = _0x583037['localAddress'])), this['id'] = null, this[_0x3e5990(0x3cf)] = null, this['pingInterval'] = null, this[_0x3e5990(0x261)] = null, this[_0x3e5990(0x420)] = null, this['pingTimeoutTimer'] = null, this[_0x3e5990(0x32e)]();
              }

              _0x5cf5a0[_0x2e6b19(0x10f)] = _0x483093, _0x483093['priorWebsocketSuccess'] = !0x1, _0x41defd(_0x483093[_0x2e6b19(0x267)]), _0x483093[_0x2e6b19(0x280)] = _0x5a19eb['protocol'], _0x483093[_0x2e6b19(0x468)] = _0x483093, _0x483093[_0x2e6b19(0x2b6)] = _0x3ee0fa(0x1960), _0x483093[_0x2e6b19(0x3a3)] = _0x3ee0fa(0xd18), _0x483093[_0x2e6b19(0x319)] = _0x3ee0fa(0x1167), _0x483093['prototype'][_0x2e6b19(0x3b1)] = function (_0x3d7b37) {
                var _0x440364 = _0x2e6b19;

                _0x3272cd(_0x440364(0x4b1), _0x3d7b37);

                var _0xf87c4b = function (_0x476e6a) {
                  var _0x4e7a3d = _0x440364,
                      _0x4bdf09 = {};

                  for (var _0x4a8921 in _0x476e6a) {
                    _0x476e6a[_0x4e7a3d(0x19c)](_0x4a8921) && (_0x4bdf09[_0x4a8921] = _0x476e6a[_0x4a8921]);
                  }

                  return _0x4bdf09;
                }(this[_0x440364(0x174)]);

                _0xf87c4b[_0x440364(0x3ac)] = _0x5a19eb[_0x440364(0x280)], _0xf87c4b[_0x440364(0x23d)] = _0x3d7b37;

                var _0x3dc0af = this[_0x440364(0x13a)][_0x3d7b37] || {};

                return this['id'] && (_0xf87c4b[_0x440364(0x3c7)] = this['id']), new _0x643d0d[_0x3d7b37]({
                  'query': _0xf87c4b,
                  'socket': this,
                  'agent': _0x3dc0af['agent'] || this[_0x440364(0x136)],
                  'hostname': _0x3dc0af['hostname'] || this['hostname'],
                  'port': _0x3dc0af[_0x440364(0x226)] || this[_0x440364(0x226)],
                  'secure': _0x3dc0af[_0x440364(0x46e)] || this['secure'],
                  'path': _0x3dc0af[_0x440364(0x1c3)] || this['path'],
                  'forceJSONP': _0x3dc0af[_0x440364(0x23e)] || this[_0x440364(0x23e)],
                  'jsonp': _0x3dc0af['jsonp'] || this[_0x440364(0x241)],
                  'forceBase64': _0x3dc0af['forceBase64'] || this[_0x440364(0x259)],
                  'enablesXDR': _0x3dc0af[_0x440364(0x110)] || this[_0x440364(0x110)],
                  'withCredentials': _0x3dc0af['withCredentials'] || this[_0x440364(0x383)],
                  'timestampRequests': _0x3dc0af[_0x440364(0x443)] || this[_0x440364(0x443)],
                  'timestampParam': _0x3dc0af[_0x440364(0x390)] || this[_0x440364(0x390)],
                  'policyPort': _0x3dc0af['policyPort'] || this['policyPort'],
                  'pfx': _0x3dc0af[_0x440364(0x29d)] || this['pfx'],
                  'key': _0x3dc0af[_0x440364(0x308)] || this[_0x440364(0x308)],
                  'passphrase': _0x3dc0af[_0x440364(0x45f)] || this['passphrase'],
                  'cert': _0x3dc0af['cert'] || this[_0x440364(0x3f2)],
                  'ca': _0x3dc0af['ca'] || this['ca'],
                  'ciphers': _0x3dc0af['ciphers'] || this[_0x440364(0x166)],
                  'rejectUnauthorized': _0x3dc0af[_0x440364(0x2fa)] || this['rejectUnauthorized'],
                  'perMessageDeflate': _0x3dc0af[_0x440364(0x208)] || this[_0x440364(0x208)],
                  'extraHeaders': _0x3dc0af[_0x440364(0x2e3)] || this[_0x440364(0x2e3)],
                  'forceNode': _0x3dc0af[_0x440364(0x28d)] || this[_0x440364(0x28d)],
                  'localAddress': _0x3dc0af[_0x440364(0x271)] || this['localAddress'],
                  'requestTimeout': _0x3dc0af[_0x440364(0x1cb)] || this[_0x440364(0x1cb)],
                  'protocols': _0x3dc0af[_0x440364(0x1bb)] || void 0x0,
                  'isReactNative': this['isReactNative']
                });
              }, _0x483093[_0x2e6b19(0x267)][_0x2e6b19(0x32e)] = function () {
                var _0x5048f7 = _0x2e6b19,
                    _0x239553;

                if (this[_0x5048f7(0x373)] && _0x483093[_0x5048f7(0x42e)] && -0x1 !== this[_0x5048f7(0x3a3)][_0x5048f7(0x458)]('websocket')) _0x239553 = 'websocket';else {
                  if (0x0 === this[_0x5048f7(0x3a3)][_0x5048f7(0x109)]) {
                    var _0x25a5cb = this;

                    return void setTimeout(function () {
                      var _0x554e74 = _0x5048f7;

                      _0x25a5cb['emit'](_0x554e74(0x47c), _0x554e74(0x31a));
                    }, 0x0);
                  }

                  _0x239553 = this[_0x5048f7(0x3a3)][0x0];
                }
                this['readyState'] = _0x5048f7(0x2d3);

                try {
                  _0x239553 = this[_0x5048f7(0x3b1)](_0x239553);
                } catch (_0x2c2cd9) {
                  return this['transports']['shift'](), void this[_0x5048f7(0x32e)]();
                }

                _0x239553[_0x5048f7(0x32e)](), this[_0x5048f7(0x15b)](_0x239553);
              }, _0x483093['prototype'][_0x2e6b19(0x15b)] = function (_0x100a02) {
                var _0xf769be = _0x2e6b19;

                _0x3272cd(_0xf769be(0x141), _0x100a02['name']);

                var _0x36c47f = this;

                this[_0xf769be(0x23d)] && (_0x3272cd('clearing\x20existing\x20transport\x20%s', this[_0xf769be(0x23d)]['name']), this[_0xf769be(0x23d)]['removeAllListeners']()), this[_0xf769be(0x23d)] = _0x100a02, _0x100a02['on'](_0xf769be(0x3fb), function () {
                  var _0x50c128 = _0xf769be;

                  _0x36c47f[_0x50c128(0x3bc)]();
                })['on'](_0xf769be(0x43e), function (_0x49be4c) {
                  var _0x31705f = _0xf769be;

                  _0x36c47f[_0x31705f(0x332)](_0x49be4c);
                })['on'](_0xf769be(0x47c), function (_0x4e0a81) {
                  var _0x243629 = _0xf769be;

                  _0x36c47f[_0x243629(0x16a)](_0x4e0a81);
                })['on'](_0xf769be(0x1b9), function () {
                  var _0xb697e1 = _0xf769be;

                  _0x36c47f[_0xb697e1(0x44c)]('transport\x20close');
                });
              }, _0x483093[_0x2e6b19(0x267)][_0x2e6b19(0x417)] = function (_0x509944) {
                var _0x209bd5 = _0x2e6b19;

                _0x3272cd(_0x209bd5(0x436), _0x509944);

                var _0x8cdb84 = this[_0x209bd5(0x3b1)](_0x509944, {
                  'probe': 0x1
                }),
                    _0x468efb = !0x1,
                    _0x150c3f = this;

                function _0x345a88() {
                  var _0x3971f1 = _0x209bd5;

                  if (_0x150c3f['onlyBinaryUpgrades']) {
                    var _0x4ed15f = !this[_0x3971f1(0x1e0)] && _0x150c3f[_0x3971f1(0x23d)]['supportsBinary'];

                    _0x468efb = _0x468efb || _0x4ed15f;
                  }

                  _0x468efb || (_0x3272cd(_0x3971f1(0x303), _0x509944), _0x8cdb84[_0x3971f1(0x362)]([{
                    'type': _0x3971f1(0x3e5),
                    'data': 'probe'
                  }]), _0x8cdb84['once'](_0x3971f1(0x43e), function (_0xffadde) {
                    var _0x5172c1 = _0x3971f1;

                    if (!_0x468efb) {
                      if ('pong' === _0xffadde[_0x5172c1(0x1bd)] && _0x5172c1(0x417) === _0xffadde[_0x5172c1(0x28e)]) {
                        if (_0x3272cd(_0x5172c1(0x2e0), _0x509944), _0x150c3f['upgrading'] = !0x0, _0x150c3f['emit'](_0x5172c1(0x46a), _0x8cdb84), !_0x8cdb84) return;
                        _0x483093[_0x5172c1(0x42e)] = _0x5172c1(0x254) === _0x8cdb84['name'], _0x3272cd('pausing\x20current\x20transport\x20\x22%s\x22', _0x150c3f[_0x5172c1(0x23d)][_0x5172c1(0x1fb)]), _0x150c3f[_0x5172c1(0x23d)][_0x5172c1(0x3b3)](function () {
                          var _0x4ac695 = _0x5172c1;
                          _0x468efb || _0x4ac695(0x189) !== _0x150c3f[_0x4ac695(0x3cd)] && (_0x3272cd(_0x4ac695(0x45a)), _0x1b0b5f(), _0x150c3f[_0x4ac695(0x15b)](_0x8cdb84), _0x8cdb84['send']([{
                            'type': _0x4ac695(0x1ed)
                          }]), _0x150c3f[_0x4ac695(0x426)]('upgrade', _0x8cdb84), _0x8cdb84 = null, _0x150c3f[_0x4ac695(0x46a)] = !0x1, _0x150c3f[_0x4ac695(0x402)]());
                        });
                      } else {
                        _0x3272cd(_0x5172c1(0x206), _0x509944);

                        var _0xed0cbd = new Error(_0x5172c1(0x1dc));

                        _0xed0cbd[_0x5172c1(0x23d)] = _0x8cdb84[_0x5172c1(0x1fb)], _0x150c3f[_0x5172c1(0x426)](_0x5172c1(0x1d3), _0xed0cbd);
                      }
                    }
                  }));
                }

                function _0xe4021f() {
                  var _0x351cba = _0x209bd5;
                  _0x468efb || (_0x468efb = !0x0, _0x1b0b5f(), _0x8cdb84[_0x351cba(0x1b9)](), _0x8cdb84 = null);
                }

                function _0x2000eb(_0x2d0dc3) {
                  var _0x5a42d0 = _0x209bd5,
                      _0x2f329e = new Error(_0x5a42d0(0x463) + _0x2d0dc3);

                  _0x2f329e[_0x5a42d0(0x23d)] = _0x8cdb84[_0x5a42d0(0x1fb)], _0xe4021f(), _0x3272cd(_0x5a42d0(0x157), _0x509944, _0x2d0dc3), _0x150c3f[_0x5a42d0(0x426)](_0x5a42d0(0x1d3), _0x2f329e);
                }

                function _0x5c5c47() {
                  var _0x100c26 = _0x209bd5;

                  _0x2000eb(_0x100c26(0x279));
                }

                function _0x1b8f58() {
                  var _0x10f9b6 = _0x209bd5;

                  _0x2000eb(_0x10f9b6(0x3e9));
                }

                function _0x47b5f3(_0x5f7b94) {
                  var _0x36faff = _0x209bd5;
                  _0x8cdb84 && _0x5f7b94['name'] !== _0x8cdb84[_0x36faff(0x1fb)] && (_0x3272cd(_0x36faff(0x375), _0x5f7b94['name'], _0x8cdb84['name']), _0xe4021f());
                }

                function _0x1b0b5f() {
                  var _0xc32dce = _0x209bd5;
                  _0x8cdb84[_0xc32dce(0x126)]('open', _0x345a88), _0x8cdb84['removeListener'](_0xc32dce(0x47c), _0x2000eb), _0x8cdb84[_0xc32dce(0x126)](_0xc32dce(0x1b9), _0x5c5c47), _0x150c3f[_0xc32dce(0x126)](_0xc32dce(0x1b9), _0x1b8f58), _0x150c3f[_0xc32dce(0x126)](_0xc32dce(0x46a), _0x47b5f3);
                }

                _0x483093[_0x209bd5(0x42e)] = !0x1, _0x8cdb84['once']('open', _0x345a88), _0x8cdb84['once'](_0x209bd5(0x47c), _0x2000eb), _0x8cdb84[_0x209bd5(0x466)](_0x209bd5(0x1b9), _0x5c5c47), this[_0x209bd5(0x466)](_0x209bd5(0x1b9), _0x1b8f58), this[_0x209bd5(0x466)](_0x209bd5(0x46a), _0x47b5f3), _0x8cdb84[_0x209bd5(0x32e)]();
              }, _0x483093[_0x2e6b19(0x267)]['onOpen'] = function () {
                var _0x4c9199 = _0x2e6b19;

                if (_0x3272cd(_0x4c9199(0x488)), this[_0x4c9199(0x3cd)] = _0x4c9199(0x32e), _0x483093[_0x4c9199(0x42e)] = 'websocket' === this[_0x4c9199(0x23d)]['name'], this['emit'](_0x4c9199(0x32e)), this[_0x4c9199(0x402)](), _0x4c9199(0x32e) === this['readyState'] && this[_0x4c9199(0x1ed)] && this[_0x4c9199(0x23d)][_0x4c9199(0x3b3)]) {
                  _0x3272cd(_0x4c9199(0x1b2));

                  for (var _0x1e9cf6 = 0x0, _0xecf32f = this[_0x4c9199(0x3cf)][_0x4c9199(0x109)]; _0x1e9cf6 < _0xecf32f; _0x1e9cf6++) {
                    this[_0x4c9199(0x417)](this[_0x4c9199(0x3cf)][_0x1e9cf6]);
                  }
                }
              }, _0x483093[_0x2e6b19(0x267)][_0x2e6b19(0x332)] = function (_0x1f618b) {
                var _0x28b59b = _0x2e6b19;
                if (_0x28b59b(0x2d3) === this[_0x28b59b(0x3cd)] || 'open' === this[_0x28b59b(0x3cd)] || _0x28b59b(0x3fa) === this[_0x28b59b(0x3cd)]) switch (_0x3272cd(_0x28b59b(0x188), _0x1f618b['type'], _0x1f618b[_0x28b59b(0x28e)]), this[_0x28b59b(0x426)](_0x28b59b(0x43e), _0x1f618b), this[_0x28b59b(0x426)](_0x28b59b(0x251)), _0x1f618b[_0x28b59b(0x1bd)]) {
                  case _0x28b59b(0x32e):
                    this[_0x28b59b(0x2ae)](JSON['parse'](_0x1f618b[_0x28b59b(0x28e)]));

                    break;

                  case 'pong':
                    this[_0x28b59b(0x143)](), this['emit'](_0x28b59b(0x3ed));
                    break;

                  case _0x28b59b(0x47c):
                    var _0xa4739 = new Error(_0x28b59b(0x149));

                    _0xa4739[_0x28b59b(0x22a)] = _0x1f618b[_0x28b59b(0x28e)], this['onError'](_0xa4739);
                    break;

                  case _0x28b59b(0x1cd):
                    this[_0x28b59b(0x426)](_0x28b59b(0x28e), _0x1f618b['data']), this[_0x28b59b(0x426)]('message', _0x1f618b['data']);
                } else _0x3272cd(_0x28b59b(0x4a0), this[_0x28b59b(0x3cd)]);
              }, _0x483093[_0x2e6b19(0x267)][_0x2e6b19(0x2ae)] = function (_0x2f5b1f) {
                var _0x45561f = _0x2e6b19;
                this[_0x45561f(0x426)]('handshake', _0x2f5b1f), this['id'] = _0x2f5b1f[_0x45561f(0x3c7)], this['transport'][_0x45561f(0x174)][_0x45561f(0x3c7)] = _0x2f5b1f['sid'], this['upgrades'] = this[_0x45561f(0x470)](_0x2f5b1f[_0x45561f(0x3cf)]), this['pingInterval'] = _0x2f5b1f[_0x45561f(0x140)], this['pingTimeout'] = _0x2f5b1f[_0x45561f(0x261)], this[_0x45561f(0x18e)](), 'closed' !== this[_0x45561f(0x3cd)] && (this[_0x45561f(0x143)](), this['removeListener'](_0x45561f(0x251), this[_0x45561f(0x40c)]), this['on'](_0x45561f(0x251), this[_0x45561f(0x40c)]));
              }, _0x483093['prototype']['onHeartbeat'] = function (_0x59200f) {
                var _0x4eef65 = _0x2e6b19;
                clearTimeout(this[_0x4eef65(0x38e)]);

                var _0x226ae6 = this;

                _0x226ae6[_0x4eef65(0x38e)] = setTimeout(function () {
                  var _0x1636de = _0x4eef65;
                  _0x1636de(0x189) !== _0x226ae6[_0x1636de(0x3cd)] && _0x226ae6[_0x1636de(0x44c)](_0x1636de(0x22e));
                }, _0x59200f || _0x226ae6['pingInterval'] + _0x226ae6[_0x4eef65(0x261)]);
              }, _0x483093[_0x2e6b19(0x267)]['setPing'] = function () {
                var _0x1a5cac = this;

                clearTimeout(_0x1a5cac['pingIntervalTimer']), _0x1a5cac['pingIntervalTimer'] = setTimeout(function () {
                  var _0x314504 = a1_0x1adc;
                  _0x3272cd('writing\x20ping\x20packet\x20-\x20expecting\x20pong\x20within\x20%sms', _0x1a5cac[_0x314504(0x261)]), _0x1a5cac[_0x314504(0x3e5)](), _0x1a5cac[_0x314504(0x40c)](_0x1a5cac['pingTimeout']);
                }, _0x1a5cac['pingInterval']);
              }, _0x483093[_0x2e6b19(0x267)][_0x2e6b19(0x3e5)] = function () {
                var _0x147c85 = _0x2e6b19,
                    _0x4ca7bf = this;

                this['sendPacket'](_0x147c85(0x3e5), function () {
                  var _0xf55e09 = _0x147c85;

                  _0x4ca7bf[_0xf55e09(0x426)](_0xf55e09(0x3e5));
                });
              }, _0x483093[_0x2e6b19(0x267)][_0x2e6b19(0x3bc)] = function () {
                var _0x505778 = _0x2e6b19;
                this[_0x505778(0x2bc)][_0x505778(0x35b)](0x0, this[_0x505778(0x17a)]), this['prevBufferLen'] = 0x0, 0x0 === this[_0x505778(0x2bc)][_0x505778(0x109)] ? this[_0x505778(0x426)](_0x505778(0x3fb)) : this[_0x505778(0x402)]();
              }, _0x483093['prototype'][_0x2e6b19(0x402)] = function () {
                var _0x46abc8 = _0x2e6b19;
                _0x46abc8(0x189) !== this[_0x46abc8(0x3cd)] && this[_0x46abc8(0x23d)][_0x46abc8(0x494)] && !this['upgrading'] && this[_0x46abc8(0x2bc)][_0x46abc8(0x109)] && (_0x3272cd('flushing\x20%d\x20packets\x20in\x20socket', this[_0x46abc8(0x2bc)][_0x46abc8(0x109)]), this[_0x46abc8(0x23d)]['send'](this[_0x46abc8(0x2bc)]), this[_0x46abc8(0x17a)] = this['writeBuffer']['length'], this[_0x46abc8(0x426)]('flush'));
              }, _0x483093[_0x2e6b19(0x267)][_0x2e6b19(0x467)] = _0x483093[_0x2e6b19(0x267)][_0x2e6b19(0x362)] = function (_0x12b795, _0x137300, _0x82f52a) {
                var _0x15a592 = _0x2e6b19;
                return this[_0x15a592(0x48d)](_0x15a592(0x1cd), _0x12b795, _0x137300, _0x82f52a), this;
              }, _0x483093[_0x2e6b19(0x267)][_0x2e6b19(0x48d)] = function (_0x150904, _0x5b34aa, _0x3f250f, _0x3a5894) {
                var _0x5c91dd = _0x2e6b19;

                if ('function' == typeof _0x5b34aa && (_0x3a5894 = _0x5b34aa, _0x5b34aa = void 0x0), _0x5c91dd(0x23a) == typeof _0x3f250f && (_0x3a5894 = _0x3f250f, _0x3f250f = null), _0x5c91dd(0x3fa) !== this[_0x5c91dd(0x3cd)] && _0x5c91dd(0x189) !== this[_0x5c91dd(0x3cd)]) {
                  (_0x3f250f = _0x3f250f || {})['compress'] = !0x1 !== _0x3f250f[_0x5c91dd(0x3d2)];
                  var _0x3709a1 = {
                    'type': _0x150904,
                    'data': _0x5b34aa,
                    'options': _0x3f250f
                  };
                  this['emit'](_0x5c91dd(0x39c), _0x3709a1), this[_0x5c91dd(0x2bc)][_0x5c91dd(0x4c0)](_0x3709a1), _0x3a5894 && this[_0x5c91dd(0x466)](_0x5c91dd(0x402), _0x3a5894), this['flush']();
                }
              }, _0x483093[_0x2e6b19(0x267)][_0x2e6b19(0x1b9)] = function () {
                var _0x5f0dea = _0x2e6b19;

                if (_0x5f0dea(0x2d3) === this[_0x5f0dea(0x3cd)] || _0x5f0dea(0x32e) === this['readyState']) {
                  this[_0x5f0dea(0x3cd)] = _0x5f0dea(0x3fa);

                  var _0x305b3b = this;

                  this['writeBuffer']['length'] ? this[_0x5f0dea(0x466)](_0x5f0dea(0x3fb), function () {
                    var _0xbc3138 = _0x5f0dea;
                    this[_0xbc3138(0x46a)] ? _0x4547db() : _0x55a892();
                  }) : this['upgrading'] ? _0x4547db() : _0x55a892();
                }

                function _0x55a892() {
                  var _0x20a491 = _0x5f0dea;
                  _0x305b3b[_0x20a491(0x44c)](_0x20a491(0x1ab)), _0x3272cd(_0x20a491(0x130)), _0x305b3b[_0x20a491(0x23d)]['close']();
                }

                function _0x42d5e1() {
                  var _0x195caa = _0x5f0dea;
                  _0x305b3b[_0x195caa(0x126)](_0x195caa(0x1ed), _0x42d5e1), _0x305b3b[_0x195caa(0x126)](_0x195caa(0x1d3), _0x42d5e1), _0x55a892();
                }

                function _0x4547db() {
                  var _0x443cf7 = _0x5f0dea;
                  _0x305b3b[_0x443cf7(0x466)](_0x443cf7(0x1ed), _0x42d5e1), _0x305b3b[_0x443cf7(0x466)](_0x443cf7(0x1d3), _0x42d5e1);
                }

                return this;
              }, _0x483093['prototype']['onError'] = function (_0x25249b) {
                var _0x651450 = _0x2e6b19;
                _0x3272cd(_0x651450(0x4c5), _0x25249b), _0x483093['priorWebsocketSuccess'] = !0x1, this[_0x651450(0x426)](_0x651450(0x47c), _0x25249b), this[_0x651450(0x44c)](_0x651450(0x181), _0x25249b);
              }, _0x483093[_0x2e6b19(0x267)][_0x2e6b19(0x44c)] = function (_0x45a7fd, _0x53188f) {
                var _0x464a1e = _0x2e6b19;
                _0x464a1e(0x2d3) !== this[_0x464a1e(0x3cd)] && 'open' !== this['readyState'] && _0x464a1e(0x3fa) !== this['readyState'] || (_0x3272cd(_0x464a1e(0x1ea), _0x45a7fd), clearTimeout(this[_0x464a1e(0x420)]), clearTimeout(this[_0x464a1e(0x38e)]), this[_0x464a1e(0x23d)][_0x464a1e(0x1b5)]('close'), this[_0x464a1e(0x23d)][_0x464a1e(0x1b9)](), this['transport'][_0x464a1e(0x1b5)](), this[_0x464a1e(0x3cd)] = 'closed', this['id'] = null, this[_0x464a1e(0x426)]('close', _0x45a7fd, _0x53188f), this['writeBuffer'] = [], this[_0x464a1e(0x17a)] = 0x0);
              }, _0x483093['prototype']['filterUpgrades'] = function (_0x19617b) {
                var _0x2e76dc = _0x2e6b19;

                for (var _0x2cd35c = [], _0x187e92 = 0x0, _0x509c4e = _0x19617b['length']; _0x187e92 < _0x509c4e; _0x187e92++) {
                  ~_0x3dee9e(this[_0x2e76dc(0x3a3)], _0x19617b[_0x187e92]) && _0x2cd35c[_0x2e76dc(0x4c0)](_0x19617b[_0x187e92]);
                }

                return _0x2cd35c;
              };
            },
            0x1960: function _(_0x40f7dc, _0x3fb620, _0x3cd48a) {
              var _0x2fec74 = a1_0x1adc,
                  _0x498deb = _0x3cd48a(0x1167),
                  _0x475314 = _0x3cd48a(0x223f);

              function _0x4dd469(_0x3122ac) {
                var _0x22aae7 = a1_0x1adc;
                this['path'] = _0x3122ac['path'], this[_0x22aae7(0x21a)] = _0x3122ac[_0x22aae7(0x21a)], this[_0x22aae7(0x226)] = _0x3122ac[_0x22aae7(0x226)], this[_0x22aae7(0x46e)] = _0x3122ac['secure'], this[_0x22aae7(0x174)] = _0x3122ac[_0x22aae7(0x174)], this['timestampParam'] = _0x3122ac['timestampParam'], this[_0x22aae7(0x443)] = _0x3122ac[_0x22aae7(0x443)], this[_0x22aae7(0x3cd)] = '', this[_0x22aae7(0x136)] = _0x3122ac[_0x22aae7(0x136)] || !0x1, this[_0x22aae7(0x154)] = _0x3122ac['socket'], this[_0x22aae7(0x110)] = _0x3122ac[_0x22aae7(0x110)], this[_0x22aae7(0x383)] = _0x3122ac['withCredentials'], this[_0x22aae7(0x29d)] = _0x3122ac[_0x22aae7(0x29d)], this[_0x22aae7(0x308)] = _0x3122ac['key'], this['passphrase'] = _0x3122ac['passphrase'], this[_0x22aae7(0x3f2)] = _0x3122ac[_0x22aae7(0x3f2)], this['ca'] = _0x3122ac['ca'], this['ciphers'] = _0x3122ac[_0x22aae7(0x166)], this[_0x22aae7(0x2fa)] = _0x3122ac[_0x22aae7(0x2fa)], this['forceNode'] = _0x3122ac[_0x22aae7(0x28d)], this[_0x22aae7(0x4af)] = _0x3122ac[_0x22aae7(0x4af)], this['extraHeaders'] = _0x3122ac[_0x22aae7(0x2e3)], this[_0x22aae7(0x271)] = _0x3122ac[_0x22aae7(0x271)];
              }

              _0x40f7dc[_0x2fec74(0x10f)] = _0x4dd469, _0x475314(_0x4dd469[_0x2fec74(0x267)]), _0x4dd469[_0x2fec74(0x267)]['onError'] = function (_0x20a571, _0x14a471) {
                var _0xd83d97 = _0x2fec74,
                    _0xd1a7d2 = new Error(_0x20a571);

                return _0xd1a7d2['type'] = _0xd83d97(0x20d), _0xd1a7d2[_0xd83d97(0x210)] = _0x14a471, this[_0xd83d97(0x426)](_0xd83d97(0x47c), _0xd1a7d2), this;
              }, _0x4dd469[_0x2fec74(0x267)][_0x2fec74(0x32e)] = function () {
                var _0x549bfc = _0x2fec74;
                return _0x549bfc(0x189) !== this[_0x549bfc(0x3cd)] && '' !== this[_0x549bfc(0x3cd)] || (this['readyState'] = _0x549bfc(0x2d3), this['doOpen']()), this;
              }, _0x4dd469[_0x2fec74(0x267)][_0x2fec74(0x1b9)] = function () {
                var _0x103939 = _0x2fec74;
                return 'opening' !== this[_0x103939(0x3cd)] && _0x103939(0x32e) !== this[_0x103939(0x3cd)] || (this[_0x103939(0x405)](), this[_0x103939(0x44c)]()), this;
              }, _0x4dd469[_0x2fec74(0x267)][_0x2fec74(0x362)] = function (_0x238d39) {
                var _0x59d9fc = _0x2fec74;
                if (_0x59d9fc(0x32e) !== this['readyState']) throw new Error(_0x59d9fc(0x204));

                this[_0x59d9fc(0x467)](_0x238d39);
              }, _0x4dd469[_0x2fec74(0x267)][_0x2fec74(0x18e)] = function () {
                var _0x3f42a4 = _0x2fec74;
                this['readyState'] = _0x3f42a4(0x32e), this[_0x3f42a4(0x494)] = !0x0, this['emit'](_0x3f42a4(0x32e));
              }, _0x4dd469[_0x2fec74(0x267)]['onData'] = function (_0x555ace) {
                var _0x5b5347 = _0x2fec74,
                    _0x43f9e7 = _0x498deb[_0x5b5347(0x15e)](_0x555ace, this[_0x5b5347(0x154)]['binaryType']);

                this['onPacket'](_0x43f9e7);
              }, _0x4dd469['prototype']['onPacket'] = function (_0x4db593) {
                var _0x18aab6 = _0x2fec74;

                this[_0x18aab6(0x426)](_0x18aab6(0x43e), _0x4db593);
              }, _0x4dd469['prototype'][_0x2fec74(0x44c)] = function () {
                var _0x4ef049 = _0x2fec74;
                this['readyState'] = 'closed', this[_0x4ef049(0x426)](_0x4ef049(0x1b9));
              };
            },
            0xd18: function _(_0x5e55d0, _0x15da8b, _0x1f03b2) {
              var _0x34ad52 = a1_0x1adc,
                  _0x12a9ce = _0x1f03b2(0xad9),
                  _0x7da51e = _0x1f03b2(0xd58),
                  _0x150901 = _0x1f03b2(0x2639),
                  _0x5d700c = _0x1f03b2(0x115a);

              _0x15da8b[_0x34ad52(0x401)] = function (_0x5bbe66) {
                var _0x302377 = _0x34ad52,
                    _0x4b4642 = !0x1,
                    _0x1a2ebc = !0x1,
                    _0x416def = !0x1 !== _0x5bbe66['jsonp'];

                if ('undefined' != typeof location) {
                  var _0xc47d90 = _0x302377(0x24e) === location[_0x302377(0x280)],
                      _0x4d5513 = location[_0x302377(0x226)];

                  _0x4d5513 || (_0x4d5513 = _0xc47d90 ? 0x1bb : 0x50), _0x4b4642 = _0x5bbe66[_0x302377(0x21a)] !== location['hostname'] || _0x4d5513 !== _0x5bbe66[_0x302377(0x226)], _0x1a2ebc = _0x5bbe66[_0x302377(0x46e)] !== _0xc47d90;
                }

                if (_0x5bbe66[_0x302377(0x2a1)] = _0x4b4642, _0x5bbe66['xscheme'] = _0x1a2ebc, 'open' in new _0x12a9ce(_0x5bbe66) && !_0x5bbe66['forceJSONP']) return new _0x7da51e(_0x5bbe66);
                if (!_0x416def) throw new Error(_0x302377(0x4ad));
                return new _0x150901(_0x5bbe66);
              }, _0x15da8b[_0x34ad52(0x254)] = _0x5d700c;
            },
            0x2639: function _(_0x5da6e3, _0x8c775a, _0x15fbc9) {
              var _0x23035d = a1_0x1adc,
                  _0x30fdaf = _0x15fbc9(0x2337),
                  _0x3d0ff4 = _0x15fbc9(0xf15),
                  _0x4d16d4 = _0x15fbc9(0xddd);

              _0x5da6e3[_0x23035d(0x10f)] = _0x2286cf;

              var _0x321f6b,
                  _0x17e67a = /\n/g,
                  _0x36bdc0 = /\\n/g;

              function _0xa4e6f5() {}

              function _0x2286cf(_0x5f0eea) {
                var _0x4e79b5 = _0x23035d;
                _0x30fdaf[_0x4e79b5(0x20b)](this, _0x5f0eea), this['query'] = this['query'] || {}, _0x321f6b || (_0x321f6b = _0x4d16d4[_0x4e79b5(0x295)] = _0x4d16d4[_0x4e79b5(0x295)] || []), this['index'] = _0x321f6b['length'];

                var _0x339944 = this;

                _0x321f6b[_0x4e79b5(0x4c0)](function (_0x222aa0) {
                  var _0x176447 = _0x4e79b5;

                  _0x339944[_0x176447(0x1ef)](_0x222aa0);
                }), this[_0x4e79b5(0x174)]['j'] = this[_0x4e79b5(0x1b3)], _0x4e79b5(0x23a) == typeof addEventListener && addEventListener(_0x4e79b5(0x3e8), function () {
                  var _0x596c35 = _0x4e79b5;
                  _0x339944[_0x596c35(0x41f)] && (_0x339944[_0x596c35(0x41f)][_0x596c35(0x474)] = _0xa4e6f5);
                }, !0x1);
              }

              _0x3d0ff4(_0x2286cf, _0x30fdaf), _0x2286cf[_0x23035d(0x267)][_0x23035d(0x1e0)] = !0x1, _0x2286cf[_0x23035d(0x267)][_0x23035d(0x405)] = function () {
                var _0x1750a0 = _0x23035d;
                this[_0x1750a0(0x41f)] && (this[_0x1750a0(0x41f)][_0x1750a0(0x4ba)][_0x1750a0(0x2e9)](this[_0x1750a0(0x41f)]), this[_0x1750a0(0x41f)] = null), this['form'] && (this[_0x1750a0(0x3cb)][_0x1750a0(0x4ba)][_0x1750a0(0x2e9)](this[_0x1750a0(0x3cb)]), this['form'] = null, this[_0x1750a0(0x315)] = null), _0x30fdaf[_0x1750a0(0x267)]['doClose'][_0x1750a0(0x20b)](this);
              }, _0x2286cf[_0x23035d(0x267)]['doPoll'] = function () {
                var _0x13aa56 = _0x23035d,
                    _0x3d4cfe = this,
                    _0x3ace45 = document[_0x13aa56(0x3db)]('script');

                this['script'] && (this['script']['parentNode'][_0x13aa56(0x2e9)](this[_0x13aa56(0x41f)]), this[_0x13aa56(0x41f)] = null), _0x3ace45[_0x13aa56(0x1f9)] = !0x0, _0x3ace45['src'] = this[_0x13aa56(0x3d1)](), _0x3ace45[_0x13aa56(0x474)] = function (_0xff5b47) {
                  var _0x3f8b99 = _0x13aa56;

                  _0x3d4cfe[_0x3f8b99(0x16a)](_0x3f8b99(0x476), _0xff5b47);
                };

                var _0x3ea523 = document[_0x13aa56(0x1fc)]('script')[0x0];

                _0x3ea523 ? _0x3ea523['parentNode'][_0x13aa56(0x4cb)](_0x3ace45, _0x3ea523) : (document['head'] || document[_0x13aa56(0x469)])[_0x13aa56(0x337)](_0x3ace45), this['script'] = _0x3ace45, _0x13aa56(0x121) != typeof navigator && /gecko/i['test'](navigator[_0x13aa56(0x2a9)]) && setTimeout(function () {
                  var _0x1541a2 = _0x13aa56,
                      _0x2e8cf3 = document[_0x1541a2(0x3db)](_0x1541a2(0x315));

                  document[_0x1541a2(0x469)][_0x1541a2(0x337)](_0x2e8cf3), document[_0x1541a2(0x469)][_0x1541a2(0x2e9)](_0x2e8cf3);
                }, 0x64);
              }, _0x2286cf[_0x23035d(0x267)][_0x23035d(0x422)] = function (_0x55d4b3, _0x3af5e9) {
                var _0x57fe61 = _0x23035d,
                    _0x3336de = this;

                if (!this[_0x57fe61(0x3cb)]) {
                  var _0x3ef818,
                      _0x42d0e3 = document[_0x57fe61(0x3db)](_0x57fe61(0x3cb)),
                      _0xd5cfba = document[_0x57fe61(0x3db)](_0x57fe61(0x118)),
                      _0x55395a = this['iframeId'] = _0x57fe61(0x4a4) + this[_0x57fe61(0x1b3)];

                  _0x42d0e3['className'] = _0x57fe61(0x496), _0x42d0e3[_0x57fe61(0x326)]['position'] = _0x57fe61(0x1cf), _0x42d0e3[_0x57fe61(0x326)][_0x57fe61(0x45b)] = _0x57fe61(0x292), _0x42d0e3[_0x57fe61(0x326)][_0x57fe61(0x313)] = _0x57fe61(0x292), _0x42d0e3['target'] = _0x55395a, _0x42d0e3[_0x57fe61(0x329)] = _0x57fe61(0x14d), _0x42d0e3[_0x57fe61(0x49d)](_0x57fe61(0x287), 'utf-8'), _0xd5cfba[_0x57fe61(0x1fb)] = 'd', _0x42d0e3[_0x57fe61(0x337)](_0xd5cfba), document[_0x57fe61(0x469)]['appendChild'](_0x42d0e3), this[_0x57fe61(0x3cb)] = _0x42d0e3, this[_0x57fe61(0x2f7)] = _0xd5cfba;
                }

                function _0x416ac7() {
                  _0x271a5c(), _0x3af5e9();
                }

                function _0x271a5c() {
                  var _0x2c9b78 = _0x57fe61;
                  if (_0x3336de[_0x2c9b78(0x315)]) try {
                    _0x3336de['form'][_0x2c9b78(0x2e9)](_0x3336de[_0x2c9b78(0x315)]);
                  } catch (_0x2b58c4) {
                    _0x3336de[_0x2c9b78(0x16a)](_0x2c9b78(0x27e), _0x2b58c4);
                  }

                  try {
                    var _0x345e5b = '<iframe\x20src=\x22javascript:0\x22\x20name=\x22' + _0x3336de[_0x2c9b78(0x156)] + '\x22>';

                    _0x3ef818 = document['createElement'](_0x345e5b);
                  } catch (_0x2b418d) {
                    (_0x3ef818 = document[_0x2c9b78(0x3db)]('iframe'))['name'] = _0x3336de['iframeId'], _0x3ef818[_0x2c9b78(0x19d)] = _0x2c9b78(0x131);
                  }

                  _0x3ef818['id'] = _0x3336de[_0x2c9b78(0x156)], _0x3336de['form'][_0x2c9b78(0x337)](_0x3ef818), _0x3336de['iframe'] = _0x3ef818;
                }

                this[_0x57fe61(0x3cb)]['action'] = this[_0x57fe61(0x3d1)](), _0x271a5c(), _0x55d4b3 = _0x55d4b3[_0x57fe61(0x27c)](_0x36bdc0, '\x5c\x0a'), this[_0x57fe61(0x2f7)]['value'] = _0x55d4b3[_0x57fe61(0x27c)](_0x17e67a, '\x5cn');

                try {
                  this['form']['submit']();
                } catch (_0x254bd1) {}

                this[_0x57fe61(0x315)][_0x57fe61(0x347)] ? this[_0x57fe61(0x315)]['onreadystatechange'] = function () {
                  var _0x5c387b = _0x57fe61;
                  _0x5c387b(0x435) === _0x3336de[_0x5c387b(0x315)][_0x5c387b(0x3cd)] && _0x416ac7();
                } : this[_0x57fe61(0x315)][_0x57fe61(0x2ff)] = _0x416ac7;
              };
            },
            0xd58: function _(_0x4b25be, _0x553fab, _0x3e1d6c) {
              var _0x3155e8 = a1_0x1adc,
                  _0x19f67a = _0x3e1d6c(0xad9),
                  _0x40d8f1 = _0x3e1d6c(0x2337),
                  _0xa2a73a = _0x3e1d6c(0x223f),
                  _0x28d256 = _0x3e1d6c(0xf15),
                  _0x189e45 = _0x3e1d6c(0x4cb)('engine.io-client:polling-xhr'),
                  _0x2c6b9e = _0x3e1d6c(0xddd);

              function _0x496da4() {}

              function _0x172593(_0x392a62) {
                var _0x43582a = a1_0x1adc;

                if (_0x40d8f1['call'](this, _0x392a62), this[_0x43582a(0x1cb)] = _0x392a62[_0x43582a(0x1cb)], this['extraHeaders'] = _0x392a62[_0x43582a(0x2e3)], _0x43582a(0x121) != typeof location) {
                  var _0x2d13b2 = _0x43582a(0x24e) === location[_0x43582a(0x280)],
                      _0x2c004a = location[_0x43582a(0x226)];

                  _0x2c004a || (_0x2c004a = _0x2d13b2 ? 0x1bb : 0x50), this['xd'] = 'undefined' != typeof location && _0x392a62[_0x43582a(0x21a)] !== location[_0x43582a(0x21a)] || _0x2c004a !== _0x392a62[_0x43582a(0x226)], this['xs'] = _0x392a62[_0x43582a(0x46e)] !== _0x2d13b2;
                }
              }

              function _0x5e53b9(_0xb50b16) {
                var _0x33f651 = a1_0x1adc;
                this[_0x33f651(0x329)] = _0xb50b16[_0x33f651(0x329)] || _0x33f651(0x30d), this[_0x33f651(0x3d1)] = _0xb50b16[_0x33f651(0x3d1)], this['xd'] = !!_0xb50b16['xd'], this['xs'] = !!_0xb50b16['xs'], this[_0x33f651(0x1f9)] = !0x1 !== _0xb50b16[_0x33f651(0x1f9)], this[_0x33f651(0x28e)] = void 0x0 !== _0xb50b16['data'] ? _0xb50b16[_0x33f651(0x28e)] : null, this[_0x33f651(0x136)] = _0xb50b16[_0x33f651(0x136)], this[_0x33f651(0x327)] = _0xb50b16[_0x33f651(0x327)], this['supportsBinary'] = _0xb50b16[_0x33f651(0x1e0)], this[_0x33f651(0x110)] = _0xb50b16[_0x33f651(0x110)], this[_0x33f651(0x383)] = _0xb50b16[_0x33f651(0x383)], this['requestTimeout'] = _0xb50b16[_0x33f651(0x1cb)], this[_0x33f651(0x29d)] = _0xb50b16[_0x33f651(0x29d)], this[_0x33f651(0x308)] = _0xb50b16[_0x33f651(0x308)], this['passphrase'] = _0xb50b16[_0x33f651(0x45f)], this[_0x33f651(0x3f2)] = _0xb50b16[_0x33f651(0x3f2)], this['ca'] = _0xb50b16['ca'], this['ciphers'] = _0xb50b16[_0x33f651(0x166)], this['rejectUnauthorized'] = _0xb50b16[_0x33f651(0x2fa)], this['extraHeaders'] = _0xb50b16[_0x33f651(0x2e3)], this[_0x33f651(0x14b)]();
              }

              function _0x3223ef() {
                var _0x1b5fbd = a1_0x1adc;

                for (var _0x3dbc63 in _0x5e53b9[_0x1b5fbd(0x236)]) {
                  _0x5e53b9['requests']['hasOwnProperty'](_0x3dbc63) && _0x5e53b9[_0x1b5fbd(0x236)][_0x3dbc63]['abort']();
                }
              }

              _0x4b25be[_0x3155e8(0x10f)] = _0x172593, _0x4b25be['exports'][_0x3155e8(0x4c7)] = _0x5e53b9, _0x28d256(_0x172593, _0x40d8f1), _0x172593[_0x3155e8(0x267)]['supportsBinary'] = !0x0, _0x172593['prototype']['request'] = function (_0x3d0951) {
                var _0x39ddbd = _0x3155e8;
                return (_0x3d0951 = _0x3d0951 || {})[_0x39ddbd(0x3d1)] = this[_0x39ddbd(0x3d1)](), _0x3d0951['xd'] = this['xd'], _0x3d0951['xs'] = this['xs'], _0x3d0951['agent'] = this['agent'] || !0x1, _0x3d0951[_0x39ddbd(0x1e0)] = this['supportsBinary'], _0x3d0951[_0x39ddbd(0x110)] = this[_0x39ddbd(0x110)], _0x3d0951[_0x39ddbd(0x383)] = this['withCredentials'], _0x3d0951[_0x39ddbd(0x29d)] = this[_0x39ddbd(0x29d)], _0x3d0951[_0x39ddbd(0x308)] = this[_0x39ddbd(0x308)], _0x3d0951[_0x39ddbd(0x45f)] = this[_0x39ddbd(0x45f)], _0x3d0951['cert'] = this[_0x39ddbd(0x3f2)], _0x3d0951['ca'] = this['ca'], _0x3d0951[_0x39ddbd(0x166)] = this[_0x39ddbd(0x166)], _0x3d0951['rejectUnauthorized'] = this[_0x39ddbd(0x2fa)], _0x3d0951['requestTimeout'] = this['requestTimeout'], _0x3d0951[_0x39ddbd(0x2e3)] = this[_0x39ddbd(0x2e3)], new _0x5e53b9(_0x3d0951);
              }, _0x172593[_0x3155e8(0x267)][_0x3155e8(0x422)] = function (_0xce8d8e, _0x4d456f) {
                var _0x82a48b = _0x3155e8,
                    _0x53c9ca = _0x82a48b(0x2df) != typeof _0xce8d8e && void 0x0 !== _0xce8d8e,
                    _0x2eff12 = this['request']({
                  'method': _0x82a48b(0x14d),
                  'data': _0xce8d8e,
                  'isBinary': _0x53c9ca
                }),
                    _0x3ddd3f = this;

                _0x2eff12['on'](_0x82a48b(0x3fc), _0x4d456f), _0x2eff12['on']('error', function (_0x285e60) {
                  var _0x4196b5 = _0x82a48b;

                  _0x3ddd3f[_0x4196b5(0x16a)](_0x4196b5(0x25a), _0x285e60);
                }), this[_0x82a48b(0x2ca)] = _0x2eff12;
              }, _0x172593[_0x3155e8(0x267)][_0x3155e8(0x489)] = function () {
                var _0x4e7cab = _0x3155e8;

                _0x189e45(_0x4e7cab(0x41a));

                var _0x5b7b82 = this['request'](),
                    _0x5ff8ba = this;

                _0x5b7b82['on'](_0x4e7cab(0x28e), function (_0x54acf4) {
                  var _0x2648f3 = _0x4e7cab;

                  _0x5ff8ba[_0x2648f3(0x1ef)](_0x54acf4);
                }), _0x5b7b82['on'](_0x4e7cab(0x47c), function (_0x6bf095) {
                  var _0x23c228 = _0x4e7cab;

                  _0x5ff8ba[_0x23c228(0x16a)](_0x23c228(0x158), _0x6bf095);
                }), this[_0x4e7cab(0x11c)] = _0x5b7b82;
              }, _0xa2a73a(_0x5e53b9[_0x3155e8(0x267)]), _0x5e53b9[_0x3155e8(0x267)]['create'] = function () {
                var _0x46feac = _0x3155e8,
                    _0x4e61cd = {
                  'agent': this[_0x46feac(0x136)],
                  'xdomain': this['xd'],
                  'xscheme': this['xs'],
                  'enablesXDR': this[_0x46feac(0x110)]
                };
                _0x4e61cd[_0x46feac(0x29d)] = this[_0x46feac(0x29d)], _0x4e61cd[_0x46feac(0x308)] = this[_0x46feac(0x308)], _0x4e61cd[_0x46feac(0x45f)] = this['passphrase'], _0x4e61cd['cert'] = this[_0x46feac(0x3f2)], _0x4e61cd['ca'] = this['ca'], _0x4e61cd[_0x46feac(0x166)] = this[_0x46feac(0x166)], _0x4e61cd[_0x46feac(0x2fa)] = this[_0x46feac(0x2fa)];

                var _0x1199a5 = this['xhr'] = new _0x19f67a(_0x4e61cd),
                    _0x2ac5c1 = this;

                try {
                  _0x189e45(_0x46feac(0x19e), this[_0x46feac(0x329)], this[_0x46feac(0x3d1)]), _0x1199a5[_0x46feac(0x32e)](this[_0x46feac(0x329)], this[_0x46feac(0x3d1)], this['async']);

                  try {
                    if (this[_0x46feac(0x2e3)]) {
                      for (var _0x1f1d81 in _0x1199a5['setDisableHeaderCheck'] && _0x1199a5[_0x46feac(0x41b)](!0x0), this[_0x46feac(0x2e3)]) {
                        this[_0x46feac(0x2e3)][_0x46feac(0x19c)](_0x1f1d81) && _0x1199a5['setRequestHeader'](_0x1f1d81, this['extraHeaders'][_0x1f1d81]);
                      }
                    }
                  } catch (_0x488241) {}

                  if (_0x46feac(0x14d) === this['method']) try {
                    this['isBinary'] ? _0x1199a5[_0x46feac(0x3c8)]('Content-type', _0x46feac(0x3dc)) : _0x1199a5[_0x46feac(0x3c8)]('Content-type', _0x46feac(0x450));
                  } catch (_0x5a916e) {}

                  try {
                    _0x1199a5['setRequestHeader'](_0x46feac(0x3c2), _0x46feac(0x1f6));
                  } catch (_0x5babcc) {}

                  _0x46feac(0x383) in _0x1199a5 && (_0x1199a5[_0x46feac(0x383)] = this[_0x46feac(0x383)]), this[_0x46feac(0x1cb)] && (_0x1199a5['timeout'] = this[_0x46feac(0x1cb)]), this[_0x46feac(0x2e4)]() ? (_0x1199a5[_0x46feac(0x2ff)] = function () {
                    var _0x1d7039 = _0x46feac;

                    _0x2ac5c1[_0x1d7039(0x2ec)]();
                  }, _0x1199a5['onerror'] = function () {
                    var _0xbfe7ba = _0x46feac;

                    _0x2ac5c1[_0xbfe7ba(0x16a)](_0x1199a5[_0xbfe7ba(0x30a)]);
                  }) : _0x1199a5[_0x46feac(0x437)] = function () {
                    var _0x32a928 = _0x46feac;
                    if (0x2 === _0x1199a5[_0x32a928(0x3cd)]) try {
                      var _0x2ceb5c = _0x1199a5['getResponseHeader'](_0x32a928(0x12d));

                      (_0x2ac5c1[_0x32a928(0x1e0)] && _0x32a928(0x3dc) === _0x2ceb5c || 'application/octet-stream;\x20charset=UTF-8' === _0x2ceb5c) && (_0x1199a5[_0x32a928(0x2c8)] = _0x32a928(0x3d7));
                    } catch (_0x5f2edb) {}
                    0x4 === _0x1199a5['readyState'] && (0xc8 === _0x1199a5[_0x32a928(0x1d4)] || 0x4c7 === _0x1199a5[_0x32a928(0x1d4)] ? _0x2ac5c1['onLoad']() : setTimeout(function () {
                      var _0x51e8dc = _0x32a928;

                      _0x2ac5c1[_0x51e8dc(0x16a)](_0x51e8dc(0x35d) == typeof _0x1199a5[_0x51e8dc(0x1d4)] ? _0x1199a5[_0x51e8dc(0x1d4)] : 0x0);
                    }, 0x0));
                  }, _0x189e45(_0x46feac(0x2b8), this[_0x46feac(0x28e)]), _0x1199a5['send'](this['data']);
                } catch (_0x8ea2f8) {
                  return void setTimeout(function () {
                    _0x2ac5c1['onError'](_0x8ea2f8);
                  }, 0x0);
                }

                _0x46feac(0x121) != typeof document && (this[_0x46feac(0x1b3)] = _0x5e53b9[_0x46feac(0x3aa)]++, _0x5e53b9[_0x46feac(0x236)][this[_0x46feac(0x1b3)]] = this);
              }, _0x5e53b9['prototype'][_0x3155e8(0x324)] = function () {
                var _0x422b25 = _0x3155e8;
                this['emit'](_0x422b25(0x3fc)), this[_0x422b25(0x137)]();
              }, _0x5e53b9['prototype'][_0x3155e8(0x1ef)] = function (_0x305cd1) {
                var _0x27f117 = _0x3155e8;
                this['emit'](_0x27f117(0x28e), _0x305cd1), this[_0x27f117(0x324)]();
              }, _0x5e53b9[_0x3155e8(0x267)][_0x3155e8(0x16a)] = function (_0x246f97) {
                var _0x5965ea = _0x3155e8;
                this['emit'](_0x5965ea(0x47c), _0x246f97), this['cleanup'](!0x0);
              }, _0x5e53b9['prototype']['cleanup'] = function (_0x5dd4ad) {
                var _0x40f3c3 = _0x3155e8;

                if (void 0x0 !== this[_0x40f3c3(0x457)] && null !== this[_0x40f3c3(0x457)]) {
                  if (this[_0x40f3c3(0x2e4)]() ? this[_0x40f3c3(0x457)]['onload'] = this[_0x40f3c3(0x457)][_0x40f3c3(0x474)] = _0x496da4 : this[_0x40f3c3(0x457)][_0x40f3c3(0x437)] = _0x496da4, _0x5dd4ad) try {
                    this[_0x40f3c3(0x457)][_0x40f3c3(0x414)]();
                  } catch (_0x14d631) {}
                  _0x40f3c3(0x121) != typeof document && delete _0x5e53b9[_0x40f3c3(0x236)][this[_0x40f3c3(0x1b3)]], this['xhr'] = null;
                }
              }, _0x5e53b9[_0x3155e8(0x267)][_0x3155e8(0x2ec)] = function () {
                var _0x28c22c = _0x3155e8,
                    _0x86f40c;

                try {
                  var _0x2c49a4;

                  try {
                    _0x2c49a4 = this['xhr']['getResponseHeader'](_0x28c22c(0x12d));
                  } catch (_0x3775c2) {}

                  _0x86f40c = (_0x28c22c(0x3dc) === _0x2c49a4 || _0x28c22c(0x4d6) === _0x2c49a4) && this[_0x28c22c(0x457)][_0x28c22c(0x15a)] || this['xhr']['responseText'];
                } catch (_0x5b069f) {
                  this[_0x28c22c(0x16a)](_0x5b069f);
                }

                null != _0x86f40c && this['onData'](_0x86f40c);
              }, _0x5e53b9[_0x3155e8(0x267)]['hasXDR'] = function () {
                var _0x297664 = _0x3155e8;
                return _0x297664(0x121) != typeof XDomainRequest && !this['xs'] && this['enablesXDR'];
              }, _0x5e53b9[_0x3155e8(0x267)][_0x3155e8(0x414)] = function () {
                var _0x3ad1b7 = _0x3155e8;

                this[_0x3ad1b7(0x137)]();
              }, _0x5e53b9[_0x3155e8(0x3aa)] = 0x0, _0x5e53b9[_0x3155e8(0x236)] = {}, _0x3155e8(0x121) != typeof document && ('function' == typeof attachEvent ? attachEvent(_0x3155e8(0x22d), _0x3223ef) : _0x3155e8(0x23a) == typeof addEventListener && addEventListener(_0x3155e8(0x318) in _0x2c6b9e ? _0x3155e8(0x3eb) : _0x3155e8(0x1db), _0x3223ef, !0x1));
            },
            0x2337: function _(_0x577b9e, _0x481f15, _0x1df316) {
              var _0x3084cc = a1_0x1adc,
                  _0x5343fc = _0x1df316(0x1960),
                  _0x499c99 = _0x1df316(0x726),
                  _0x17867a = _0x1df316(0x1167),
                  _0x4e660d = _0x1df316(0xf15),
                  _0x485e05 = _0x1df316(0x8e9),
                  _0x1395f8 = _0x1df316(0x4cb)(_0x3084cc(0x359));

              _0x577b9e[_0x3084cc(0x10f)] = _0x1eac3f;

              var _0x5b99fd = null != new (_0x1df316(0xad9))({
                'xdomain': !0x1
              })['responseType'];

              function _0x1eac3f(_0x4dc49c) {
                var _0x28afe8 = _0x3084cc,
                    _0xba930b = _0x4dc49c && _0x4dc49c[_0x28afe8(0x259)];

                _0x5b99fd && !_0xba930b || (this[_0x28afe8(0x1e0)] = !0x1), _0x5343fc['call'](this, _0x4dc49c);
              }

              _0x4e660d(_0x1eac3f, _0x5343fc), _0x1eac3f[_0x3084cc(0x267)]['name'] = _0x3084cc(0x401), _0x1eac3f[_0x3084cc(0x267)]['doOpen'] = function () {
                var _0x3b3234 = _0x3084cc;

                this[_0x3b3234(0x192)]();
              }, _0x1eac3f[_0x3084cc(0x267)][_0x3084cc(0x3b3)] = function (_0x529cf9) {
                var _0x3d058a = _0x3084cc,
                    _0x52248b = this;

                function _0x3c4e45() {
                  var _0xe65135 = a1_0x1adc;
                  _0x1395f8('paused'), _0x52248b['readyState'] = _0xe65135(0x44a), _0x529cf9();
                }

                if (this[_0x3d058a(0x3cd)] = _0x3d058a(0x1aa), this['polling'] || !this[_0x3d058a(0x494)]) {
                  var _0x2b3caf = 0x0;
                  this[_0x3d058a(0x401)] && (_0x1395f8(_0x3d058a(0x2ba)), _0x2b3caf++, this[_0x3d058a(0x466)](_0x3d058a(0x119), function () {
                    var _0x16095a = _0x3d058a;
                    _0x1395f8(_0x16095a(0x227)), --_0x2b3caf || _0x3c4e45();
                  })), this[_0x3d058a(0x494)] || (_0x1395f8(_0x3d058a(0x343)), _0x2b3caf++, this[_0x3d058a(0x466)](_0x3d058a(0x3fb), function () {
                    var _0x281c3d = _0x3d058a;
                    _0x1395f8(_0x281c3d(0x3df)), --_0x2b3caf || _0x3c4e45();
                  }));
                } else _0x3c4e45();
              }, _0x1eac3f[_0x3084cc(0x267)][_0x3084cc(0x192)] = function () {
                var _0x199b80 = _0x3084cc;
                _0x1395f8(_0x199b80(0x401)), this['polling'] = !0x0, this[_0x199b80(0x489)](), this[_0x199b80(0x426)]('poll');
              }, _0x1eac3f[_0x3084cc(0x267)][_0x3084cc(0x1ef)] = function (_0x3340ad) {
                var _0x51440f = _0x3084cc,
                    _0x52a815 = this;

                _0x1395f8(_0x51440f(0x3f6), _0x3340ad), _0x17867a['decodePayload'](_0x3340ad, this[_0x51440f(0x154)][_0x51440f(0x2dc)], function (_0x415ffd, _0x5c8ca8, _0x2c9a5b) {
                  var _0x44769e = _0x51440f;
                  if ('opening' === _0x52a815[_0x44769e(0x3cd)] && _0x44769e(0x32e) === _0x415ffd[_0x44769e(0x1bd)] && _0x52a815[_0x44769e(0x18e)](), _0x44769e(0x1b9) === _0x415ffd[_0x44769e(0x1bd)]) return _0x52a815[_0x44769e(0x44c)](), !0x1;

                  _0x52a815['onPacket'](_0x415ffd);
                }), _0x51440f(0x189) !== this[_0x51440f(0x3cd)] && (this['polling'] = !0x1, this[_0x51440f(0x426)](_0x51440f(0x119)), _0x51440f(0x32e) === this[_0x51440f(0x3cd)] ? this[_0x51440f(0x192)]() : _0x1395f8('ignoring\x20poll\x20-\x20transport\x20state\x20\x22%s\x22', this[_0x51440f(0x3cd)]));
              }, _0x1eac3f[_0x3084cc(0x267)][_0x3084cc(0x405)] = function () {
                var _0x4934f0 = _0x3084cc,
                    _0x14cf3c = this;

                function _0x38c0b0() {
                  var _0x1dcaff = a1_0x1adc;
                  _0x1395f8('writing\x20close\x20packet'), _0x14cf3c['write']([{
                    'type': _0x1dcaff(0x1b9)
                  }]);
                }

                _0x4934f0(0x32e) === this[_0x4934f0(0x3cd)] ? (_0x1395f8(_0x4934f0(0x24f)), _0x38c0b0()) : (_0x1395f8('transport\x20not\x20open\x20-\x20deferring\x20close'), this[_0x4934f0(0x466)](_0x4934f0(0x32e), _0x38c0b0));
              }, _0x1eac3f[_0x3084cc(0x267)][_0x3084cc(0x467)] = function (_0x49bc41) {
                var _0x2ca744 = _0x3084cc,
                    _0x4b643b = this;

                this[_0x2ca744(0x494)] = !0x1;

                var _0x3f4f9d = function _0x3f4f9d() {
                  var _0x1104e0 = _0x2ca744;
                  _0x4b643b[_0x1104e0(0x494)] = !0x0, _0x4b643b['emit'](_0x1104e0(0x3fb));
                };

                _0x17867a[_0x2ca744(0x398)](_0x49bc41, this[_0x2ca744(0x1e0)], function (_0x52b30a) {
                  var _0x2b10b4 = _0x2ca744;

                  _0x4b643b[_0x2b10b4(0x422)](_0x52b30a, _0x3f4f9d);
                });
              }, _0x1eac3f[_0x3084cc(0x267)][_0x3084cc(0x3d1)] = function () {
                var _0x2d763e = _0x3084cc,
                    _0x10b8da = this['query'] || {},
                    _0x29db5e = this[_0x2d763e(0x46e)] ? 'https' : _0x2d763e(0x285),
                    _0x54a780 = '';

                return !0x1 !== this[_0x2d763e(0x443)] && (_0x10b8da[this[_0x2d763e(0x390)]] = _0x485e05()), this[_0x2d763e(0x1e0)] || _0x10b8da[_0x2d763e(0x3c7)] || (_0x10b8da['b64'] = 0x1), _0x10b8da = _0x499c99[_0x2d763e(0x2bf)](_0x10b8da), this[_0x2d763e(0x226)] && (_0x2d763e(0x1b7) === _0x29db5e && 0x1bb !== Number(this['port']) || _0x2d763e(0x285) === _0x29db5e && 0x50 !== Number(this['port'])) && (_0x54a780 = ':' + this[_0x2d763e(0x226)]), _0x10b8da[_0x2d763e(0x109)] && (_0x10b8da = '?' + _0x10b8da), _0x29db5e + _0x2d763e(0x34e) + (-0x1 !== this[_0x2d763e(0x21a)][_0x2d763e(0x458)](':') ? '[' + this['hostname'] + ']' : this[_0x2d763e(0x21a)]) + _0x54a780 + this[_0x2d763e(0x1c3)] + _0x10b8da;
              };
            },
            0x115a: function _(_0x1e0d59, _0x6bcff4, _0x193754) {
              var _0x3e7415 = a1_0x1adc,
                  _0x5d7a0e,
                  _0x3974a3,
                  _0x2037e8 = _0x193754(0x1960),
                  _0x3f7dad = _0x193754(0x1167),
                  _0x15268f = _0x193754(0x726),
                  _0x4d5f24 = _0x193754(0xf15),
                  _0x2490db = _0x193754(0x8e9),
                  _0x9458b3 = _0x193754(0x4cb)(_0x3e7415(0x35f));

              if (_0x3e7415(0x121) != typeof WebSocket ? _0x5d7a0e = WebSocket : _0x3e7415(0x121) != typeof self && (_0x5d7a0e = self[_0x3e7415(0x1c9)] || self[_0x3e7415(0x2aa)]), _0x3e7415(0x121) == typeof window) try {
                _0x3974a3 = _0x193754(0x1b6c);
              } catch (_0x391066) {}

              var _0x35df81 = _0x5d7a0e || _0x3974a3;

              function _0x2f1db0(_0x148372) {
                var _0x880826 = _0x3e7415;
                _0x148372 && _0x148372[_0x880826(0x259)] && (this[_0x880826(0x1e0)] = !0x1), this[_0x880826(0x208)] = _0x148372[_0x880826(0x208)], this['usingBrowserWebSocket'] = _0x5d7a0e && !_0x148372[_0x880826(0x28d)], this[_0x880826(0x1bb)] = _0x148372[_0x880826(0x1bb)], this[_0x880826(0x452)] || (_0x35df81 = _0x3974a3), _0x2037e8[_0x880826(0x20b)](this, _0x148372);
              }

              _0x1e0d59[_0x3e7415(0x10f)] = _0x2f1db0, _0x4d5f24(_0x2f1db0, _0x2037e8), _0x2f1db0[_0x3e7415(0x267)][_0x3e7415(0x1fb)] = _0x3e7415(0x254), _0x2f1db0['prototype'][_0x3e7415(0x1e0)] = !0x0, _0x2f1db0['prototype'][_0x3e7415(0x2cf)] = function () {
                var _0x3bc39c = _0x3e7415;

                if (this[_0x3bc39c(0x298)]()) {
                  var _0x4fc117 = this[_0x3bc39c(0x3d1)](),
                      _0xf95dbb = this[_0x3bc39c(0x1bb)],
                      _0x4d42d7 = {};

                  this[_0x3bc39c(0x4af)] || (_0x4d42d7[_0x3bc39c(0x136)] = this[_0x3bc39c(0x136)], _0x4d42d7[_0x3bc39c(0x208)] = this[_0x3bc39c(0x208)], _0x4d42d7['pfx'] = this[_0x3bc39c(0x29d)], _0x4d42d7[_0x3bc39c(0x308)] = this['key'], _0x4d42d7[_0x3bc39c(0x45f)] = this[_0x3bc39c(0x45f)], _0x4d42d7[_0x3bc39c(0x3f2)] = this[_0x3bc39c(0x3f2)], _0x4d42d7['ca'] = this['ca'], _0x4d42d7[_0x3bc39c(0x166)] = this[_0x3bc39c(0x166)], _0x4d42d7[_0x3bc39c(0x2fa)] = this[_0x3bc39c(0x2fa)]), this[_0x3bc39c(0x2e3)] && (_0x4d42d7['headers'] = this[_0x3bc39c(0x2e3)]), this[_0x3bc39c(0x271)] && (_0x4d42d7[_0x3bc39c(0x271)] = this[_0x3bc39c(0x271)]);

                  try {
                    this['ws'] = this[_0x3bc39c(0x452)] && !this['isReactNative'] ? _0xf95dbb ? new _0x35df81(_0x4fc117, _0xf95dbb) : new _0x35df81(_0x4fc117) : new _0x35df81(_0x4fc117, _0xf95dbb, _0x4d42d7);
                  } catch (_0x40082e) {
                    return this[_0x3bc39c(0x426)](_0x3bc39c(0x47c), _0x40082e);
                  }

                  void 0x0 === this['ws'][_0x3bc39c(0x2dc)] && (this['supportsBinary'] = !0x1), this['ws'][_0x3bc39c(0x3da)] && this['ws'][_0x3bc39c(0x3da)]['binary'] ? (this[_0x3bc39c(0x1e0)] = !0x0, this['ws'][_0x3bc39c(0x2dc)] = 'nodebuffer') : this['ws']['binaryType'] = _0x3bc39c(0x3d7), this['addEventListeners']();
                }
              }, _0x2f1db0['prototype'][_0x3e7415(0x293)] = function () {
                var _0x2067d5 = _0x3e7415,
                    _0x50426a = this;

                this['ws'][_0x2067d5(0x3c3)] = function () {
                  var _0x42ce41 = _0x2067d5;

                  _0x50426a[_0x42ce41(0x18e)]();
                }, this['ws']['onclose'] = function () {
                  var _0x3a5c4f = _0x2067d5;

                  _0x50426a[_0x3a5c4f(0x44c)]();
                }, this['ws'][_0x2067d5(0x491)] = function (_0x4f474c) {
                  var _0x53627a = _0x2067d5;

                  _0x50426a[_0x53627a(0x1ef)](_0x4f474c[_0x53627a(0x28e)]);
                }, this['ws'][_0x2067d5(0x474)] = function (_0x483b2e) {
                  var _0x1d6753 = _0x2067d5;

                  _0x50426a[_0x1d6753(0x16a)](_0x1d6753(0x4be), _0x483b2e);
                };
              }, _0x2f1db0[_0x3e7415(0x267)][_0x3e7415(0x467)] = function (_0x217d48) {
                var _0x2f4174 = _0x3e7415,
                    _0x566262 = this;

                this[_0x2f4174(0x494)] = !0x1;

                for (var _0x12a57e = _0x217d48[_0x2f4174(0x109)], _0x4a53be = 0x0, _0x5bf7e1 = _0x12a57e; _0x4a53be < _0x5bf7e1; _0x4a53be++) {
                  !function (_0x4ae46e) {
                    var _0x2adbad = _0x2f4174;

                    _0x3f7dad[_0x2adbad(0x25e)](_0x4ae46e, _0x566262[_0x2adbad(0x1e0)], function (_0x2b5dfa) {
                      var _0x5ca25d = _0x2adbad;

                      if (!_0x566262[_0x5ca25d(0x452)]) {
                        var _0x498622 = {};
                        _0x4ae46e['options'] && (_0x498622[_0x5ca25d(0x3d2)] = _0x4ae46e[_0x5ca25d(0x342)]['compress']), _0x566262[_0x5ca25d(0x208)] && (_0x5ca25d(0x2df) == typeof _0x2b5dfa ? Buffer[_0x5ca25d(0x3c9)](_0x2b5dfa) : _0x2b5dfa[_0x5ca25d(0x109)]) < _0x566262['perMessageDeflate'][_0x5ca25d(0x3bd)] && (_0x498622[_0x5ca25d(0x3d2)] = !0x1);
                      }

                      try {
                        _0x566262[_0x5ca25d(0x452)] ? _0x566262['ws']['send'](_0x2b5dfa) : _0x566262['ws']['send'](_0x2b5dfa, _0x498622);
                      } catch (_0x590801) {
                        _0x9458b3(_0x5ca25d(0x366));
                      }

                      --_0x12a57e || (_0x566262[_0x5ca25d(0x426)]('flush'), setTimeout(function () {
                        var _0x21abcd = _0x5ca25d;
                        _0x566262[_0x21abcd(0x494)] = !0x0, _0x566262['emit'](_0x21abcd(0x3fb));
                      }, 0x0));
                    });
                  }(_0x217d48[_0x4a53be]);
                }
              }, _0x2f1db0[_0x3e7415(0x267)][_0x3e7415(0x44c)] = function () {
                var _0x3490d = _0x3e7415;

                _0x2037e8[_0x3490d(0x267)][_0x3490d(0x44c)][_0x3490d(0x20b)](this);
              }, _0x2f1db0[_0x3e7415(0x267)][_0x3e7415(0x405)] = function () {
                void 0x0 !== this['ws'] && this['ws']['close']();
              }, _0x2f1db0[_0x3e7415(0x267)][_0x3e7415(0x3d1)] = function () {
                var _0x52e577 = _0x3e7415,
                    _0x37116b = this['query'] || {},
                    _0x15bff5 = this[_0x52e577(0x46e)] ? _0x52e577(0x4a6) : 'ws',
                    _0x4edf08 = '';

                return this['port'] && (_0x52e577(0x4a6) === _0x15bff5 && 0x1bb !== Number(this['port']) || 'ws' === _0x15bff5 && 0x50 !== Number(this[_0x52e577(0x226)])) && (_0x4edf08 = ':' + this[_0x52e577(0x226)]), this[_0x52e577(0x443)] && (_0x37116b[this['timestampParam']] = _0x2490db()), this[_0x52e577(0x1e0)] || (_0x37116b[_0x52e577(0x2da)] = 0x1), (_0x37116b = _0x15268f[_0x52e577(0x2bf)](_0x37116b))[_0x52e577(0x109)] && (_0x37116b = '?' + _0x37116b), _0x15bff5 + '://' + (-0x1 !== this['hostname'][_0x52e577(0x458)](':') ? '[' + this['hostname'] + ']' : this[_0x52e577(0x21a)]) + _0x4edf08 + this[_0x52e577(0x1c3)] + _0x37116b;
              }, _0x2f1db0['prototype']['check'] = function () {
                var _0x1fce55 = _0x3e7415;
                return !(!_0x35df81 || _0x1fce55(0x4b8) in _0x35df81 && this[_0x1fce55(0x1fb)] === _0x2f1db0[_0x1fce55(0x267)][_0x1fce55(0x1fb)]);
              };
            },
            0xad9: function _(_0x529e93, _0x4210c4, _0x1d407a) {
              var _0x211924 = a1_0x1adc,
                  _0x31961f = _0x1d407a(0x1f7a),
                  _0x33402e = _0x1d407a(0xddd);

              _0x529e93[_0x211924(0x10f)] = function (_0x71671b) {
                var _0x1fe22e = _0x211924,
                    _0x9ba2f3 = _0x71671b['xdomain'],
                    _0x2f31d3 = _0x71671b[_0x1fe22e(0x3e0)],
                    _0x2ec9c2 = _0x71671b[_0x1fe22e(0x110)];

                try {
                  if (_0x1fe22e(0x121) != typeof XMLHttpRequest && (!_0x9ba2f3 || _0x31961f)) return new XMLHttpRequest();
                } catch (_0xddd31d) {}

                try {
                  if (_0x1fe22e(0x121) != typeof XDomainRequest && !_0x2f31d3 && _0x2ec9c2) return new XDomainRequest();
                } catch (_0x8c7e95) {}

                if (!_0x9ba2f3) try {
                  return new _0x33402e[['Active']['concat'](_0x1fe22e(0x425))[_0x1fe22e(0x49b)]('X')](_0x1fe22e(0x146));
                } catch (_0x39f5ed) {}
              };
            },
            0x1167: function _(_0x416380, _0x2a5e01, _0x14a016) {
              var _0x3bf96a = a1_0x1adc,
                  _0x4e2aeb,
                  _0x4c0439 = _0x14a016(0x1f36),
                  _0x29f0b9 = _0x14a016(0xd8a),
                  _0x4aac30 = _0x14a016(0x25f6),
                  _0x17882d = _0x14a016(0x1afa),
                  _0x2b0f6d = _0x14a016(0xd56);

              _0x3bf96a(0x121) != typeof ArrayBuffer && (_0x4e2aeb = _0x14a016(0xe78));

              var _0x53678d = 'undefined' != typeof navigator && /Android/i[_0x3bf96a(0x4cc)](navigator[_0x3bf96a(0x2a9)]),
                  _0x3ed906 = _0x3bf96a(0x121) != typeof navigator && /PhantomJS/i[_0x3bf96a(0x4cc)](navigator['userAgent']),
                  _0x4e6ff5 = _0x53678d || _0x3ed906;

              _0x2a5e01[_0x3bf96a(0x280)] = 0x3;

              var _0x44fc07 = _0x2a5e01[_0x3bf96a(0x2e2)] = {
                'open': 0x0,
                'close': 0x1,
                'ping': 0x2,
                'pong': 0x3,
                'message': 0x4,
                'upgrade': 0x5,
                'noop': 0x6
              },
                  _0x31a5f2 = _0x4c0439(_0x44fc07),
                  _0x54f06b = {
                'type': 'error',
                'data': _0x3bf96a(0x2c1)
              },
                  _0x29cb2e = _0x14a016(0x15ac);

              function _0x50378d(_0x8f8ce8, _0x35d3b0, _0x5f1ebd) {
                var _0x1d6ad2 = _0x3bf96a;

                for (var _0x236adf = new Array(_0x8f8ce8[_0x1d6ad2(0x109)]), _0x235df6 = _0x17882d(_0x8f8ce8[_0x1d6ad2(0x109)], _0x5f1ebd), _0x444286 = function _0x444286(_0x99c47e, _0x57596d, _0x6968ef) {
                  _0x35d3b0(_0x57596d, function (_0x34dbe7, _0x51b7d4) {
                    _0x236adf[_0x99c47e] = _0x51b7d4, _0x6968ef(_0x34dbe7, _0x236adf);
                  });
                }, _0x125292 = 0x0; _0x125292 < _0x8f8ce8[_0x1d6ad2(0x109)]; _0x125292++) {
                  _0x444286(_0x125292, _0x8f8ce8[_0x125292], _0x235df6);
                }
              }

              _0x2a5e01[_0x3bf96a(0x25e)] = function (_0x5c166d, _0x21fe3e, _0x324f06, _0x5dafec) {
                var _0x376da3 = _0x3bf96a;
                _0x376da3(0x23a) == typeof _0x21fe3e && (_0x5dafec = _0x21fe3e, _0x21fe3e = !0x1), _0x376da3(0x23a) == typeof _0x324f06 && (_0x5dafec = _0x324f06, _0x324f06 = null);

                var _0x4ec7ba = void 0x0 === _0x5c166d[_0x376da3(0x28e)] ? void 0x0 : _0x5c166d['data'][_0x376da3(0x477)] || _0x5c166d[_0x376da3(0x28e)];

                if (_0x376da3(0x121) != typeof ArrayBuffer && _0x4ec7ba instanceof ArrayBuffer) return function (_0x284ba4, _0x4e781f, _0x10035a) {
                  var _0x6dcaa3 = _0x376da3;
                  if (!_0x4e781f) return _0x2a5e01[_0x6dcaa3(0x14a)](_0x284ba4, _0x10035a);

                  var _0x56622f = _0x284ba4[_0x6dcaa3(0x28e)],
                      _0x36a359 = new Uint8Array(_0x56622f),
                      _0x32ce5d = new Uint8Array(0x1 + _0x56622f[_0x6dcaa3(0x3c9)]);

                  _0x32ce5d[0x0] = _0x44fc07[_0x284ba4['type']];

                  for (var _0x321752 = 0x0; _0x321752 < _0x36a359[_0x6dcaa3(0x109)]; _0x321752++) {
                    _0x32ce5d[_0x321752 + 0x1] = _0x36a359[_0x321752];
                  }

                  return _0x10035a(_0x32ce5d[_0x6dcaa3(0x477)]);
                }(_0x5c166d, _0x21fe3e, _0x5dafec);
                if (void 0x0 !== _0x29cb2e && _0x4ec7ba instanceof _0x29cb2e) return function (_0x14db36, _0x1933af, _0x503160) {
                  var _0xcbc7b = _0x376da3;
                  if (!_0x1933af) return _0x2a5e01[_0xcbc7b(0x14a)](_0x14db36, _0x503160);
                  if (_0x4e6ff5) return function (_0x5ada3d, _0xf82c18, _0x5c62f7) {
                    var _0x55a055 = _0xcbc7b;
                    if (!_0xf82c18) return _0x2a5e01[_0x55a055(0x14a)](_0x5ada3d, _0x5c62f7);

                    var _0x48ec42 = new FileReader();

                    return _0x48ec42['onload'] = function () {
                      var _0x48e95b = _0x55a055;

                      _0x2a5e01[_0x48e95b(0x25e)]({
                        'type': _0x5ada3d[_0x48e95b(0x1bd)],
                        'data': _0x48ec42[_0x48e95b(0x249)]
                      }, _0xf82c18, !0x0, _0x5c62f7);
                    }, _0x48ec42[_0x55a055(0x31e)](_0x5ada3d[_0x55a055(0x28e)]);
                  }(_0x14db36, _0x1933af, _0x503160);

                  var _0x338908 = new Uint8Array(0x1);

                  return _0x338908[0x0] = _0x44fc07[_0x14db36[_0xcbc7b(0x1bd)]], _0x503160(new _0x29cb2e([_0x338908[_0xcbc7b(0x477)], _0x14db36['data']]));
                }(_0x5c166d, _0x21fe3e, _0x5dafec);
                if (_0x4ec7ba && _0x4ec7ba[_0x376da3(0x49c)]) return function (_0x233d42, _0x370300) {
                  var _0x3d5b2d = _0x376da3;
                  return _0x370300('b' + _0x2a5e01[_0x3d5b2d(0x2e2)][_0x233d42[_0x3d5b2d(0x1bd)]] + _0x233d42[_0x3d5b2d(0x28e)]['data']);
                }(_0x5c166d, _0x5dafec);
                var _0x33ef9f = _0x44fc07[_0x5c166d['type']];
                return void 0x0 !== _0x5c166d[_0x376da3(0x28e)] && (_0x33ef9f += _0x324f06 ? _0x2b0f6d['encode'](String(_0x5c166d[_0x376da3(0x28e)]), {
                  'strict': !0x1
                }) : String(_0x5c166d[_0x376da3(0x28e)])), _0x5dafec('' + _0x33ef9f);
              }, _0x2a5e01[_0x3bf96a(0x14a)] = function (_0x5a6424, _0x3fab0b) {
                var _0x1e396a = _0x3bf96a,
                    _0x24ee7b,
                    _0x4fe5a5 = 'b' + _0x2a5e01[_0x1e396a(0x2e2)][_0x5a6424[_0x1e396a(0x1bd)]];

                if (void 0x0 !== _0x29cb2e && _0x5a6424['data'] instanceof _0x29cb2e) {
                  var _0x10fd78 = new FileReader();

                  return _0x10fd78[_0x1e396a(0x2ff)] = function () {
                    var _0x208536 = _0x1e396a,
                        _0x45781f = _0x10fd78[_0x208536(0x249)]['split'](',')[0x1];

                    _0x3fab0b(_0x4fe5a5 + _0x45781f);
                  }, _0x10fd78[_0x1e396a(0x41e)](_0x5a6424['data']);
                }

                try {
                  _0x24ee7b = String[_0x1e396a(0x3a8)][_0x1e396a(0x148)](null, new Uint8Array(_0x5a6424[_0x1e396a(0x28e)]));
                } catch (_0x2c3222) {
                  for (var _0x1d3e5b = new Uint8Array(_0x5a6424[_0x1e396a(0x28e)]), _0x2beeee = new Array(_0x1d3e5b[_0x1e396a(0x109)]), _0x4e8b1d = 0x0; _0x4e8b1d < _0x1d3e5b[_0x1e396a(0x109)]; _0x4e8b1d++) {
                    _0x2beeee[_0x4e8b1d] = _0x1d3e5b[_0x4e8b1d];
                  }

                  _0x24ee7b = String[_0x1e396a(0x3a8)][_0x1e396a(0x148)](null, _0x2beeee);
                }

                return _0x4fe5a5 += btoa(_0x24ee7b), _0x3fab0b(_0x4fe5a5);
              }, _0x2a5e01[_0x3bf96a(0x15e)] = function (_0x2479c6, _0x5669dc, _0x4aa4c8) {
                var _0x22c3dd = _0x3bf96a;
                if (void 0x0 === _0x2479c6) return _0x54f06b;

                if (_0x22c3dd(0x2df) == typeof _0x2479c6) {
                  if ('b' === _0x2479c6[_0x22c3dd(0x382)](0x0)) return _0x2a5e01[_0x22c3dd(0x262)](_0x2479c6[_0x22c3dd(0x1ba)](0x1), _0x5669dc);
                  if (_0x4aa4c8 && !0x1 === (_0x2479c6 = function (_0x36ae10) {
                    var _0x221d47 = _0x22c3dd;

                    try {
                      _0x36ae10 = _0x2b0f6d[_0x221d47(0x2a8)](_0x36ae10, {
                        'strict': !0x1
                      });
                    } catch (_0x37c2fe) {
                      return !0x1;
                    }

                    return _0x36ae10;
                  }(_0x2479c6))) return _0x54f06b;

                  var _0x3ed72d = _0x2479c6[_0x22c3dd(0x382)](0x0);

                  return Number(_0x3ed72d) == _0x3ed72d && _0x31a5f2[_0x3ed72d] ? _0x2479c6[_0x22c3dd(0x109)] > 0x1 ? {
                    'type': _0x31a5f2[_0x3ed72d],
                    'data': _0x2479c6[_0x22c3dd(0x495)](0x1)
                  } : {
                    'type': _0x31a5f2[_0x3ed72d]
                  } : _0x54f06b;
                }

                _0x3ed72d = new Uint8Array(_0x2479c6)[0x0];

                var _0x31a45b = _0x4aac30(_0x2479c6, 0x1);

                return _0x29cb2e && _0x22c3dd(0x43a) === _0x5669dc && (_0x31a45b = new _0x29cb2e([_0x31a45b])), {
                  'type': _0x31a5f2[_0x3ed72d],
                  'data': _0x31a45b
                };
              }, _0x2a5e01['decodeBase64Packet'] = function (_0x110a57, _0x407d7f) {
                var _0x5209e9 = _0x3bf96a,
                    _0x13c165 = _0x31a5f2[_0x110a57['charAt'](0x0)];

                if (!_0x4e2aeb) return {
                  'type': _0x13c165,
                  'data': {
                    'base64': !0x0,
                    'data': _0x110a57[_0x5209e9(0x1ba)](0x1)
                  }
                };

                var _0x31ff46 = _0x4e2aeb[_0x5209e9(0x2a8)](_0x110a57[_0x5209e9(0x1ba)](0x1));

                return _0x5209e9(0x43a) === _0x407d7f && _0x29cb2e && (_0x31ff46 = new _0x29cb2e([_0x31ff46])), {
                  'type': _0x13c165,
                  'data': _0x31ff46
                };
              }, _0x2a5e01[_0x3bf96a(0x398)] = function (_0x5952fb, _0x3ae102, _0x425c5f) {
                var _0x30b57e = _0x3bf96a;
                _0x30b57e(0x23a) == typeof _0x3ae102 && (_0x425c5f = _0x3ae102, _0x3ae102 = null);

                var _0x468d76 = _0x29f0b9(_0x5952fb);

                return _0x3ae102 && _0x468d76 ? _0x29cb2e && !_0x4e6ff5 ? _0x2a5e01[_0x30b57e(0x2f5)](_0x5952fb, _0x425c5f) : _0x2a5e01['encodePayloadAsArrayBuffer'](_0x5952fb, _0x425c5f) : _0x5952fb[_0x30b57e(0x109)] ? void _0x50378d(_0x5952fb, function (_0x42423f, _0x5b768f) {
                  var _0x2a4b37 = _0x30b57e;

                  _0x2a5e01[_0x2a4b37(0x25e)](_0x42423f, !!_0x468d76 && _0x3ae102, !0x1, function (_0x8f1e8b) {
                    _0x5b768f(null, function (_0x2c135e) {
                      return _0x2c135e['length'] + ':' + _0x2c135e;
                    }(_0x8f1e8b));
                  });
                }, function (_0x21fc6f, _0x47d30b) {
                  return _0x425c5f(_0x47d30b['join'](''));
                }) : _0x425c5f('0:');
              }, _0x2a5e01[_0x3bf96a(0x41d)] = function (_0x3e3737, _0x4bd63e, _0x50aa0b) {
                var _0x93a3b5 = _0x3bf96a;
                if (_0x93a3b5(0x2df) != typeof _0x3e3737) return _0x2a5e01[_0x93a3b5(0x179)](_0x3e3737, _0x4bd63e, _0x50aa0b);

                var _0x22da1b;

                if (_0x93a3b5(0x23a) == typeof _0x4bd63e && (_0x50aa0b = _0x4bd63e, _0x4bd63e = null), '' === _0x3e3737) return _0x50aa0b(_0x54f06b, 0x0, 0x1);

                for (var _0x42329d, _0x1b4a07, _0xadb493 = '', _0x398a69 = 0x0, _0xe807b8 = _0x3e3737[_0x93a3b5(0x109)]; _0x398a69 < _0xe807b8; _0x398a69++) {
                  var _0x8909d0 = _0x3e3737[_0x93a3b5(0x382)](_0x398a69);

                  if (':' === _0x8909d0) {
                    if ('' === _0xadb493 || _0xadb493 != (_0x42329d = Number(_0xadb493))) return _0x50aa0b(_0x54f06b, 0x0, 0x1);
                    if (_0xadb493 != (_0x1b4a07 = _0x3e3737[_0x93a3b5(0x1ba)](_0x398a69 + 0x1, _0x42329d))[_0x93a3b5(0x109)]) return _0x50aa0b(_0x54f06b, 0x0, 0x1);

                    if (_0x1b4a07[_0x93a3b5(0x109)]) {
                      if (_0x22da1b = _0x2a5e01[_0x93a3b5(0x15e)](_0x1b4a07, _0x4bd63e, !0x1), _0x54f06b[_0x93a3b5(0x1bd)] === _0x22da1b['type'] && _0x54f06b[_0x93a3b5(0x28e)] === _0x22da1b[_0x93a3b5(0x28e)]) return _0x50aa0b(_0x54f06b, 0x0, 0x1);
                      if (!0x1 === _0x50aa0b(_0x22da1b, _0x398a69 + _0x42329d, _0xe807b8)) return;
                    }

                    _0x398a69 += _0x42329d, _0xadb493 = '';
                  } else _0xadb493 += _0x8909d0;
                }

                return '' !== _0xadb493 ? _0x50aa0b(_0x54f06b, 0x0, 0x1) : void 0x0;
              }, _0x2a5e01[_0x3bf96a(0x378)] = function (_0x21ca31, _0x3701a0) {
                var _0x918794 = _0x3bf96a;
                if (!_0x21ca31[_0x918794(0x109)]) return _0x3701a0(new ArrayBuffer(0x0));

                _0x50378d(_0x21ca31, function (_0x134b6b, _0x3b64ce) {
                  _0x2a5e01['encodePacket'](_0x134b6b, !0x0, !0x0, function (_0xffde18) {
                    return _0x3b64ce(null, _0xffde18);
                  });
                }, function (_0x9d7c4, _0x5dd6b3) {
                  var _0x2c89fa = _0x918794,
                      _0x506da1 = _0x5dd6b3[_0x2c89fa(0x1cc)](function (_0x53542b, _0x5cf1a0) {
                    var _0x29bbaa = _0x2c89fa,
                        _0x184d53;

                    return _0x53542b + (_0x184d53 = _0x29bbaa(0x2df) == typeof _0x5cf1a0 ? _0x5cf1a0[_0x29bbaa(0x109)] : _0x5cf1a0[_0x29bbaa(0x3c9)])[_0x29bbaa(0x1c8)]()[_0x29bbaa(0x109)] + _0x184d53 + 0x2;
                  }, 0x0),
                      _0x4f5064 = new Uint8Array(_0x506da1),
                      _0x5d5609 = 0x0;

                  return _0x5dd6b3[_0x2c89fa(0x37b)](function (_0x53b29e) {
                    var _0xc49bdf = _0x2c89fa,
                        _0x20446d = _0xc49bdf(0x2df) == typeof _0x53b29e,
                        _0x30f6bb = _0x53b29e;

                    if (_0x20446d) {
                      for (var _0x408dab = new Uint8Array(_0x53b29e[_0xc49bdf(0x109)]), _0x373ebd = 0x0; _0x373ebd < _0x53b29e[_0xc49bdf(0x109)]; _0x373ebd++) {
                        _0x408dab[_0x373ebd] = _0x53b29e[_0xc49bdf(0x3ca)](_0x373ebd);
                      }

                      _0x30f6bb = _0x408dab[_0xc49bdf(0x477)];
                    }

                    _0x4f5064[_0x5d5609++] = _0x20446d ? 0x0 : 0x1;

                    var _0x498acd = _0x30f6bb[_0xc49bdf(0x3c9)][_0xc49bdf(0x1c8)]();

                    for (_0x373ebd = 0x0; _0x373ebd < _0x498acd[_0xc49bdf(0x109)]; _0x373ebd++) {
                      _0x4f5064[_0x5d5609++] = parseInt(_0x498acd[_0x373ebd]);
                    }

                    for (_0x4f5064[_0x5d5609++] = 0xff, _0x408dab = new Uint8Array(_0x30f6bb), _0x373ebd = 0x0; _0x373ebd < _0x408dab[_0xc49bdf(0x109)]; _0x373ebd++) {
                      _0x4f5064[_0x5d5609++] = _0x408dab[_0x373ebd];
                    }
                  }), _0x3701a0(_0x4f5064['buffer']);
                });
              }, _0x2a5e01['encodePayloadAsBlob'] = function (_0x5c6123, _0x2fd7dd) {
                _0x50378d(_0x5c6123, function (_0x1e3def, _0x15993b) {
                  var _0x2c2530 = a1_0x1adc;

                  _0x2a5e01[_0x2c2530(0x25e)](_0x1e3def, !0x0, !0x0, function (_0x46e102) {
                    var _0x25f43e = _0x2c2530,
                        _0x291f81 = new Uint8Array(0x1);

                    if (_0x291f81[0x0] = 0x1, _0x25f43e(0x2df) == typeof _0x46e102) {
                      for (var _0x1a925b = new Uint8Array(_0x46e102[_0x25f43e(0x109)]), _0x11855f = 0x0; _0x11855f < _0x46e102[_0x25f43e(0x109)]; _0x11855f++) {
                        _0x1a925b[_0x11855f] = _0x46e102[_0x25f43e(0x3ca)](_0x11855f);
                      }

                      _0x46e102 = _0x1a925b[_0x25f43e(0x477)], _0x291f81[0x0] = 0x0;
                    }

                    var _0x575a6a = (_0x46e102 instanceof ArrayBuffer ? _0x46e102[_0x25f43e(0x3c9)] : _0x46e102[_0x25f43e(0x33a)])['toString'](),
                        _0x2423c1 = new Uint8Array(_0x575a6a['length'] + 0x1);

                    for (_0x11855f = 0x0; _0x11855f < _0x575a6a[_0x25f43e(0x109)]; _0x11855f++) {
                      _0x2423c1[_0x11855f] = parseInt(_0x575a6a[_0x11855f]);
                    }

                    if (_0x2423c1[_0x575a6a[_0x25f43e(0x109)]] = 0xff, _0x29cb2e) {
                      var _0x5a5203 = new _0x29cb2e([_0x291f81[_0x25f43e(0x477)], _0x2423c1[_0x25f43e(0x477)], _0x46e102]);

                      _0x15993b(null, _0x5a5203);
                    }
                  });
                }, function (_0x1d1e9f, _0x3841f5) {
                  return _0x2fd7dd(new _0x29cb2e(_0x3841f5));
                });
              }, _0x2a5e01[_0x3bf96a(0x179)] = function (_0x24e3d9, _0x5be655, _0x31e05c) {
                var _0x27fbc5 = _0x3bf96a;
                _0x27fbc5(0x23a) == typeof _0x5be655 && (_0x31e05c = _0x5be655, _0x5be655 = null);

                for (var _0x26e16b = _0x24e3d9, _0xda1cf = []; _0x26e16b[_0x27fbc5(0x3c9)] > 0x0;) {
                  for (var _0x21fb2e = new Uint8Array(_0x26e16b), _0x366722 = 0x0 === _0x21fb2e[0x0], _0x33a261 = '', _0x545090 = 0x1; 0xff !== _0x21fb2e[_0x545090]; _0x545090++) {
                    if (_0x33a261[_0x27fbc5(0x109)] > 0x136) return _0x31e05c(_0x54f06b, 0x0, 0x1);
                    _0x33a261 += _0x21fb2e[_0x545090];
                  }

                  _0x26e16b = _0x4aac30(_0x26e16b, 0x2 + _0x33a261[_0x27fbc5(0x109)]), _0x33a261 = parseInt(_0x33a261);

                  var _0x458faa = _0x4aac30(_0x26e16b, 0x0, _0x33a261);

                  if (_0x366722) try {
                    _0x458faa = String['fromCharCode']['apply'](null, new Uint8Array(_0x458faa));
                  } catch (_0x175cf1) {
                    var _0x832243 = new Uint8Array(_0x458faa);

                    for (_0x458faa = '', _0x545090 = 0x0; _0x545090 < _0x832243[_0x27fbc5(0x109)]; _0x545090++) {
                      _0x458faa += String[_0x27fbc5(0x3a8)](_0x832243[_0x545090]);
                    }
                  }
                  _0xda1cf[_0x27fbc5(0x4c0)](_0x458faa), _0x26e16b = _0x4aac30(_0x26e16b, _0x33a261);
                }

                var _0x2dbae6 = _0xda1cf[_0x27fbc5(0x109)];

                _0xda1cf[_0x27fbc5(0x37b)](function (_0xfeda9b, _0x274524) {
                  var _0x2e9ee9 = _0x27fbc5;

                  _0x31e05c(_0x2a5e01[_0x2e9ee9(0x15e)](_0xfeda9b, _0x5be655, !0x0), _0x274524, _0x2dbae6);
                });
              };
            },
            0x1f36: function _(_0x482080) {
              var _0x3d075a = a1_0x1adc;

              _0x482080[_0x3d075a(0x10f)] = Object['keys'] || function (_0x5dfd58) {
                var _0x155965 = _0x3d075a,
                    _0x50d27e = [],
                    _0x322e4e = Object[_0x155965(0x267)]['hasOwnProperty'];

                for (var _0x5da3dc in _0x5dfd58) {
                  _0x322e4e[_0x155965(0x20b)](_0x5dfd58, _0x5da3dc) && _0x50d27e[_0x155965(0x4c0)](_0x5da3dc);
                }

                return _0x50d27e;
              };
            },
            0xd56: function _(_0x14b478) {
              var _0x3d633d = a1_0x1adc,
                  _0x551c8b,
                  _0x13dd16,
                  _0x138a76,
                  _0x4a1a5d = String[_0x3d633d(0x3a8)];

              function _0x5cb6c4(_0x3c3721) {
                var _0x509189 = _0x3d633d;

                for (var _0x2ba599, _0x220ee1, _0x11bbcd = [], _0x3a88c2 = 0x0, _0x59e60a = _0x3c3721['length']; _0x3a88c2 < _0x59e60a;) {
                  (_0x2ba599 = _0x3c3721['charCodeAt'](_0x3a88c2++)) >= 0xd800 && _0x2ba599 <= 0xdbff && _0x3a88c2 < _0x59e60a ? 0xdc00 == (0xfc00 & (_0x220ee1 = _0x3c3721[_0x509189(0x3ca)](_0x3a88c2++))) ? _0x11bbcd[_0x509189(0x4c0)](((0x3ff & _0x2ba599) << 0xa) + (0x3ff & _0x220ee1) + 0x10000) : (_0x11bbcd[_0x509189(0x4c0)](_0x2ba599), _0x3a88c2--) : _0x11bbcd[_0x509189(0x4c0)](_0x2ba599);
                }

                return _0x11bbcd;
              }

              function _0x4a47a7(_0x57fe25, _0x3b9eac) {
                var _0x4bbb00 = _0x3d633d;

                if (_0x57fe25 >= 0xd800 && _0x57fe25 <= 0xdfff) {
                  if (_0x3b9eac) throw Error(_0x4bbb00(0x49e) + _0x57fe25[_0x4bbb00(0x1c8)](0x10)[_0x4bbb00(0x440)]() + '\x20is\x20not\x20a\x20scalar\x20value');
                  return !0x1;
                }

                return !0x0;
              }

              function _0x27b21f(_0x29df7a, _0x39e361) {
                return _0x4a1a5d(_0x29df7a >> _0x39e361 & 0x3f | 0x80);
              }

              function _0x36148d(_0x35fb12, _0x252bba) {
                if (0x0 == (0xffffff80 & _0x35fb12)) return _0x4a1a5d(_0x35fb12);
                var _0x38bc01 = '';
                return 0x0 == (0xfffff800 & _0x35fb12) ? _0x38bc01 = _0x4a1a5d(_0x35fb12 >> 0x6 & 0x1f | 0xc0) : 0x0 == (0xffff0000 & _0x35fb12) ? (_0x4a47a7(_0x35fb12, _0x252bba) || (_0x35fb12 = 0xfffd), _0x38bc01 = _0x4a1a5d(_0x35fb12 >> 0xc & 0xf | 0xe0), _0x38bc01 += _0x27b21f(_0x35fb12, 0x6)) : 0x0 == (0xffe00000 & _0x35fb12) && (_0x38bc01 = _0x4a1a5d(_0x35fb12 >> 0x12 & 0x7 | 0xf0), _0x38bc01 += _0x27b21f(_0x35fb12, 0xc), _0x38bc01 += _0x27b21f(_0x35fb12, 0x6)), _0x38bc01 + _0x4a1a5d(0x3f & _0x35fb12 | 0x80);
              }

              function _0x354104() {
                var _0x4f156b = _0x3d633d;
                if (_0x138a76 >= _0x13dd16) throw Error(_0x4f156b(0x116));

                var _0x2f31e1 = 0xff & _0x551c8b[_0x138a76];

                if (_0x138a76++, 0x80 == (0xc0 & _0x2f31e1)) return 0x3f & _0x2f31e1;
                throw Error(_0x4f156b(0x44f));
              }

              function _0x58075a(_0x587587) {
                var _0x5c4088 = _0x3d633d,
                    _0x4028ce,
                    _0x32171b;

                if (_0x138a76 > _0x13dd16) throw Error(_0x5c4088(0x116));
                if (_0x138a76 == _0x13dd16) return !0x1;
                if (_0x4028ce = 0xff & _0x551c8b[_0x138a76], _0x138a76++, 0x0 == (0x80 & _0x4028ce)) return _0x4028ce;

                if (0xc0 == (0xe0 & _0x4028ce)) {
                  if ((_0x32171b = (0x1f & _0x4028ce) << 0x6 | _0x354104()) >= 0x80) return _0x32171b;
                  throw Error(_0x5c4088(0x44f));
                }

                if (0xe0 == (0xf0 & _0x4028ce)) {
                  if ((_0x32171b = (0xf & _0x4028ce) << 0xc | _0x354104() << 0x6 | _0x354104()) >= 0x800) return _0x4a47a7(_0x32171b, _0x587587) ? _0x32171b : 0xfffd;
                  throw Error(_0x5c4088(0x44f));
                }

                if (0xf0 == (0xf8 & _0x4028ce) && (_0x32171b = (0x7 & _0x4028ce) << 0x12 | _0x354104() << 0xc | _0x354104() << 0x6 | _0x354104()) >= 0x10000 && _0x32171b <= 0x10ffff) return _0x32171b;
                throw Error(_0x5c4088(0x1a7));
              }

              _0x14b478['exports'] = {
                'version': _0x3d633d(0x331),
                'encode': function encode(_0x71df3b, _0x5b1c6d) {
                  for (var _0x343c54 = !0x1 !== (_0x5b1c6d = _0x5b1c6d || {})['strict'], _0x13e44a = _0x5cb6c4(_0x71df3b), _0x247cf2 = _0x13e44a['length'], _0x2690f0 = -0x1, _0x46c0ef = ''; ++_0x2690f0 < _0x247cf2;) {
                    _0x46c0ef += _0x36148d(_0x13e44a[_0x2690f0], _0x343c54);
                  }

                  return _0x46c0ef;
                },
                'decode': function decode(_0x22708f, _0x28ad90) {
                  var _0x5c6b05 = _0x3d633d,
                      _0x326d6d = !0x1 !== (_0x28ad90 = _0x28ad90 || {})[_0x5c6b05(0x19a)];

                  _0x551c8b = _0x5cb6c4(_0x22708f), _0x13dd16 = _0x551c8b[_0x5c6b05(0x109)], _0x138a76 = 0x0;

                  for (var _0x4ba8a2, _0x167c14 = []; !0x1 !== (_0x4ba8a2 = _0x58075a(_0x326d6d));) {
                    _0x167c14[_0x5c6b05(0x4c0)](_0x4ba8a2);
                  }

                  return function (_0x1860ea) {
                    var _0x12b352 = _0x5c6b05;

                    for (var _0x2dc9e9, _0x3645a3 = _0x1860ea[_0x12b352(0x109)], _0x1d2298 = -0x1, _0x437e1b = ''; ++_0x1d2298 < _0x3645a3;) {
                      (_0x2dc9e9 = _0x1860ea[_0x1d2298]) > 0xffff && (_0x437e1b += _0x4a1a5d((_0x2dc9e9 -= 0x10000) >>> 0xa & 0x3ff | 0xd800), _0x2dc9e9 = 0xdc00 | 0x3ff & _0x2dc9e9), _0x437e1b += _0x4a1a5d(_0x2dc9e9);
                    }

                    return _0x437e1b;
                  }(_0x167c14);
                }
              };
            },
            0x1c13: function _(_0x1db7f9) {
              var _0x35c1b0 = a1_0x1adc;

              var _0x58bbed,
                  _0x2118f1 = _0x35c1b0(0x26e) == typeof Reflect ? Reflect : null,
                  _0x43c4c7 = _0x2118f1 && _0x35c1b0(0x23a) == typeof _0x2118f1[_0x35c1b0(0x148)] ? _0x2118f1[_0x35c1b0(0x148)] : function (_0x1fe253, _0x2f03a2, _0x32b40e) {
                var _0x2b9fc6 = _0x35c1b0;
                return Function['prototype'][_0x2b9fc6(0x148)][_0x2b9fc6(0x20b)](_0x1fe253, _0x2f03a2, _0x32b40e);
              };

              _0x58bbed = _0x2118f1 && 'function' == typeof _0x2118f1[_0x35c1b0(0x23f)] ? _0x2118f1[_0x35c1b0(0x23f)] : Object[_0x35c1b0(0x10c)] ? function (_0x2fae0f) {
                var _0x1b089e = _0x35c1b0;
                return Object[_0x1b089e(0x34d)](_0x2fae0f)[_0x1b089e(0x46f)](Object['getOwnPropertySymbols'](_0x2fae0f));
              } : function (_0x3dce24) {
                var _0x468b81 = _0x35c1b0;
                return Object[_0x468b81(0x34d)](_0x3dce24);
              };

              var _0x1fb83f = Number[_0x35c1b0(0x3a6)] || function (_0x33ca17) {
                return _0x33ca17 != _0x33ca17;
              };

              function _0x580373() {
                _0x580373['init']['call'](this);
              }

              _0x1db7f9[_0x35c1b0(0x10f)] = _0x580373, _0x1db7f9[_0x35c1b0(0x10f)][_0x35c1b0(0x466)] = function (_0x94962, _0x1e9eba) {
                return new Promise(function (_0x1cb381, _0xcdcbc) {
                  function _0x16a29d(_0xb60cfa) {
                    var _0xb33662 = a1_0x1adc;
                    _0x94962[_0xb33662(0x126)](_0x1e9eba, _0xe680a2), _0xcdcbc(_0xb60cfa);
                  }

                  function _0xe680a2() {
                    var _0xd67595 = a1_0x1adc;
                    _0xd67595(0x23a) == typeof _0x94962['removeListener'] && _0x94962['removeListener']('error', _0x16a29d), _0x1cb381([][_0xd67595(0x167)][_0xd67595(0x20b)](arguments));
                  }

                  _0x195cda(_0x94962, _0x1e9eba, _0xe680a2, {
                    'once': !0x0
                  }), 'error' !== _0x1e9eba && function (_0x4f83f7, _0x4e1b17, _0x46c5f6) {
                    var _0x59228d = a1_0x1adc;
                    _0x59228d(0x23a) == typeof _0x4f83f7['on'] && _0x195cda(_0x4f83f7, 'error', _0x4e1b17, {
                      'once': !0x0
                    });
                  }(_0x94962, _0x16a29d);
                });
              }, _0x580373[_0x35c1b0(0x492)] = _0x580373, _0x580373[_0x35c1b0(0x267)][_0x35c1b0(0x392)] = void 0x0, _0x580373[_0x35c1b0(0x267)]['_eventsCount'] = 0x0, _0x580373[_0x35c1b0(0x267)]['_maxListeners'] = void 0x0;
              var _0x412d0a = 0xa;

              function _0x1eb3e6(_0x3e41bc) {
                if ('function' != typeof _0x3e41bc) throw new TypeError('The\x20\x22listener\x22\x20argument\x20must\x20be\x20of\x20type\x20Function.\x20Received\x20type\x20' + typeof _0x3e41bc);
              }

              function _0x475f4a(_0x1a0ec2) {
                var _0x4af607 = _0x35c1b0;
                return void 0x0 === _0x1a0ec2[_0x4af607(0x228)] ? _0x580373[_0x4af607(0x302)] : _0x1a0ec2[_0x4af607(0x228)];
              }

              function _0x12f062(_0x1cbd1d, _0x2d7a33, _0x229c49, _0x594135) {
                var _0x4d6e98 = _0x35c1b0,
                    _0x132f08,
                    _0x2d230b,
                    _0x45a682,
                    _0x52c6e9;

                if (_0x1eb3e6(_0x229c49), void 0x0 === (_0x2d230b = _0x1cbd1d[_0x4d6e98(0x392)]) ? (_0x2d230b = _0x1cbd1d[_0x4d6e98(0x392)] = Object[_0x4d6e98(0x14b)](null), _0x1cbd1d[_0x4d6e98(0x13b)] = 0x0) : (void 0x0 !== _0x2d230b[_0x4d6e98(0x129)] && (_0x1cbd1d[_0x4d6e98(0x426)](_0x4d6e98(0x129), _0x2d7a33, _0x229c49[_0x4d6e98(0x1e4)] ? _0x229c49[_0x4d6e98(0x1e4)] : _0x229c49), _0x2d230b = _0x1cbd1d[_0x4d6e98(0x392)]), _0x45a682 = _0x2d230b[_0x2d7a33]), void 0x0 === _0x45a682) _0x45a682 = _0x2d230b[_0x2d7a33] = _0x229c49, ++_0x1cbd1d[_0x4d6e98(0x13b)];else {
                  if (_0x4d6e98(0x23a) == typeof _0x45a682 ? _0x45a682 = _0x2d230b[_0x2d7a33] = _0x594135 ? [_0x229c49, _0x45a682] : [_0x45a682, _0x229c49] : _0x594135 ? _0x45a682[_0x4d6e98(0x2f6)](_0x229c49) : _0x45a682[_0x4d6e98(0x4c0)](_0x229c49), (_0x132f08 = _0x475f4a(_0x1cbd1d)) > 0x0 && _0x45a682[_0x4d6e98(0x109)] > _0x132f08 && !_0x45a682['warned']) {
                    _0x45a682[_0x4d6e98(0x2d8)] = !0x0;

                    var _0x370e4b = new Error('Possible\x20EventEmitter\x20memory\x20leak\x20detected.\x20' + _0x45a682[_0x4d6e98(0x109)] + '\x20' + String(_0x2d7a33) + _0x4d6e98(0x3c4));

                    _0x370e4b[_0x4d6e98(0x1fb)] = _0x4d6e98(0x21f), _0x370e4b['emitter'] = _0x1cbd1d, _0x370e4b[_0x4d6e98(0x1bd)] = _0x2d7a33, _0x370e4b['count'] = _0x45a682[_0x4d6e98(0x109)], _0x52c6e9 = _0x370e4b, console && console[_0x4d6e98(0x282)] && console[_0x4d6e98(0x282)](_0x52c6e9);
                  }
                }
                return _0x1cbd1d;
              }

              function _0x453b21() {
                var _0x593a1c = _0x35c1b0;
                if (!this[_0x593a1c(0x144)]) return this[_0x593a1c(0x1a3)][_0x593a1c(0x126)](this[_0x593a1c(0x1bd)], this[_0x593a1c(0x3f3)]), this[_0x593a1c(0x144)] = !0x0, 0x0 === arguments[_0x593a1c(0x109)] ? this[_0x593a1c(0x1e4)]['call'](this[_0x593a1c(0x1a3)]) : this['listener'][_0x593a1c(0x148)](this['target'], arguments);
              }

              function _0xbb6c6c(_0x2be20a, _0x323ff0, _0x10e557) {
                var _0x2ca590 = _0x35c1b0,
                    _0x529dd9 = {
                  'fired': !0x1,
                  'wrapFn': void 0x0,
                  'target': _0x2be20a,
                  'type': _0x323ff0,
                  'listener': _0x10e557
                },
                    _0x441989 = _0x453b21[_0x2ca590(0x42f)](_0x529dd9);

                return _0x441989[_0x2ca590(0x1e4)] = _0x10e557, _0x529dd9['wrapFn'] = _0x441989, _0x441989;
              }

              function _0x3c1b2a(_0x23b8b4, _0x1def78, _0xd7dad9) {
                var _0x4959b8 = _0x35c1b0,
                    _0x5efb9f = _0x23b8b4[_0x4959b8(0x392)];

                if (void 0x0 === _0x5efb9f) return [];
                var _0x4165c9 = _0x5efb9f[_0x1def78];
                return void 0x0 === _0x4165c9 ? [] : _0x4959b8(0x23a) == typeof _0x4165c9 ? _0xd7dad9 ? [_0x4165c9[_0x4959b8(0x1e4)] || _0x4165c9] : [_0x4165c9] : _0xd7dad9 ? function (_0x507061) {
                  var _0x3e16ab = _0x4959b8;

                  for (var _0x24f5ed = new Array(_0x507061['length']), _0x2a0578 = 0x0; _0x2a0578 < _0x24f5ed[_0x3e16ab(0x109)]; ++_0x2a0578) {
                    _0x24f5ed[_0x2a0578] = _0x507061[_0x2a0578][_0x3e16ab(0x1e4)] || _0x507061[_0x2a0578];
                  }

                  return _0x24f5ed;
                }(_0x4165c9) : _0x197c08(_0x4165c9, _0x4165c9[_0x4959b8(0x109)]);
              }

              function _0x1866d1(_0x474b43) {
                var _0x1336b9 = _0x35c1b0,
                    _0x480a82 = this[_0x1336b9(0x392)];

                if (void 0x0 !== _0x480a82) {
                  var _0x18aadc = _0x480a82[_0x474b43];
                  if (_0x1336b9(0x23a) == typeof _0x18aadc) return 0x1;
                  if (void 0x0 !== _0x18aadc) return _0x18aadc[_0x1336b9(0x109)];
                }

                return 0x0;
              }

              function _0x197c08(_0x5c63ce, _0x2fe47f) {
                for (var _0xb45e62 = new Array(_0x2fe47f), _0x5a6eab = 0x0; _0x5a6eab < _0x2fe47f; ++_0x5a6eab) {
                  _0xb45e62[_0x5a6eab] = _0x5c63ce[_0x5a6eab];
                }

                return _0xb45e62;
              }

              function _0x195cda(_0x1b8f00, _0x46ad67, _0x2bf280, _0x33c19b) {
                var _0x58893d = _0x35c1b0;
                if (_0x58893d(0x23a) == typeof _0x1b8f00['on']) _0x33c19b[_0x58893d(0x466)] ? _0x1b8f00['once'](_0x46ad67, _0x2bf280) : _0x1b8f00['on'](_0x46ad67, _0x2bf280);else {
                  if (_0x58893d(0x23a) != typeof _0x1b8f00[_0x58893d(0x3d9)]) throw new TypeError('The\x20\x22emitter\x22\x20argument\x20must\x20be\x20of\x20type\x20EventEmitter.\x20Received\x20type\x20' + typeof _0x1b8f00);

                  _0x1b8f00['addEventListener'](_0x46ad67, function _0x5a015d(_0xe4f0c6) {
                    var _0x872fa0 = _0x58893d;
                    _0x33c19b['once'] && _0x1b8f00[_0x872fa0(0x434)](_0x46ad67, _0x5a015d), _0x2bf280(_0xe4f0c6);
                  });
                }
              }

              Object['defineProperty'](_0x580373, _0x35c1b0(0x302), {
                'enumerable': !0x0,
                'get': function get() {
                  return _0x412d0a;
                },
                'set': function set(_0xc9753a) {
                  var _0x1b4a85 = _0x35c1b0;
                  if (_0x1b4a85(0x35d) != typeof _0xc9753a || _0xc9753a < 0x0 || _0x1fb83f(_0xc9753a)) throw new RangeError(_0x1b4a85(0x4c6) + _0xc9753a + '.');
                  _0x412d0a = _0xc9753a;
                }
              }), _0x580373['init'] = function () {
                var _0x5ef514 = _0x35c1b0;
                void 0x0 !== this[_0x5ef514(0x392)] && this['_events'] !== Object[_0x5ef514(0x4ab)](this)[_0x5ef514(0x392)] || (this[_0x5ef514(0x392)] = Object[_0x5ef514(0x14b)](null), this['_eventsCount'] = 0x0), this[_0x5ef514(0x228)] = this[_0x5ef514(0x228)] || void 0x0;
              }, _0x580373[_0x35c1b0(0x267)]['setMaxListeners'] = function (_0x3250fa) {
                var _0xa526ed = _0x35c1b0;
                if (_0xa526ed(0x35d) != typeof _0x3250fa || _0x3250fa < 0x0 || _0x1fb83f(_0x3250fa)) throw new RangeError(_0xa526ed(0x30c) + _0x3250fa + '.');
                return this[_0xa526ed(0x228)] = _0x3250fa, this;
              }, _0x580373[_0x35c1b0(0x267)][_0x35c1b0(0x410)] = function () {
                return _0x475f4a(this);
              }, _0x580373[_0x35c1b0(0x267)][_0x35c1b0(0x426)] = function (_0x59355f) {
                var _0x4c4acf = _0x35c1b0;

                for (var _0x5202c8 = [], _0x34a3d0 = 0x1; _0x34a3d0 < arguments[_0x4c4acf(0x109)]; _0x34a3d0++) {
                  _0x5202c8[_0x4c4acf(0x4c0)](arguments[_0x34a3d0]);
                }

                var _0x2faeea = _0x4c4acf(0x47c) === _0x59355f,
                    _0x348762 = this[_0x4c4acf(0x392)];

                if (void 0x0 !== _0x348762) _0x2faeea = _0x2faeea && void 0x0 === _0x348762['error'];else {
                  if (!_0x2faeea) return !0x1;
                }

                if (_0x2faeea) {
                  var _0x4d3271;

                  if (_0x5202c8[_0x4c4acf(0x109)] > 0x0 && (_0x4d3271 = _0x5202c8[0x0]), _0x4d3271 instanceof Error) throw _0x4d3271;

                  var _0xd6dd57 = new Error(_0x4c4acf(0x1d9) + (_0x4d3271 ? '\x20(' + _0x4d3271[_0x4c4acf(0x1cd)] + ')' : ''));

                  throw _0xd6dd57[_0x4c4acf(0x169)] = _0x4d3271, _0xd6dd57;
                }

                var _0x26b714 = _0x348762[_0x59355f];
                if (void 0x0 === _0x26b714) return !0x1;
                if (_0x4c4acf(0x23a) == typeof _0x26b714) _0x43c4c7(_0x26b714, this, _0x5202c8);else {
                  var _0x2e93fd = _0x26b714[_0x4c4acf(0x109)],
                      _0x33ea21 = _0x197c08(_0x26b714, _0x2e93fd);

                  for (_0x34a3d0 = 0x0; _0x34a3d0 < _0x2e93fd; ++_0x34a3d0) {
                    _0x43c4c7(_0x33ea21[_0x34a3d0], this, _0x5202c8);
                  }
                }
                return !0x0;
              }, _0x580373['prototype'][_0x35c1b0(0x360)] = function (_0x24d58a, _0x4ec750) {
                return _0x12f062(this, _0x24d58a, _0x4ec750, !0x1);
              }, _0x580373['prototype']['on'] = _0x580373[_0x35c1b0(0x267)][_0x35c1b0(0x360)], _0x580373['prototype']['prependListener'] = function (_0x3062c4, _0x2d1dfc) {
                return _0x12f062(this, _0x3062c4, _0x2d1dfc, !0x0);
              }, _0x580373['prototype'][_0x35c1b0(0x466)] = function (_0x1c02f6, _0x7b3923) {
                return _0x1eb3e6(_0x7b3923), this['on'](_0x1c02f6, _0xbb6c6c(this, _0x1c02f6, _0x7b3923)), this;
              }, _0x580373['prototype'][_0x35c1b0(0x442)] = function (_0x293318, _0x2e4245) {
                var _0x39508d = _0x35c1b0;
                return _0x1eb3e6(_0x2e4245), this[_0x39508d(0x205)](_0x293318, _0xbb6c6c(this, _0x293318, _0x2e4245)), this;
              }, _0x580373[_0x35c1b0(0x267)][_0x35c1b0(0x126)] = function (_0x2444f0, _0x1e4806) {
                var _0x6b79a2 = _0x35c1b0,
                    _0x8dad7a,
                    _0x41af7b,
                    _0x2353f4,
                    _0x4c76e0,
                    _0x18b901;

                if (_0x1eb3e6(_0x1e4806), void 0x0 === (_0x41af7b = this[_0x6b79a2(0x392)])) return this;
                if (void 0x0 === (_0x8dad7a = _0x41af7b[_0x2444f0])) return this;
                if (_0x8dad7a === _0x1e4806 || _0x8dad7a[_0x6b79a2(0x1e4)] === _0x1e4806) 0x0 == --this['_eventsCount'] ? this[_0x6b79a2(0x392)] = Object['create'](null) : (delete _0x41af7b[_0x2444f0], _0x41af7b[_0x6b79a2(0x126)] && this[_0x6b79a2(0x426)](_0x6b79a2(0x126), _0x2444f0, _0x8dad7a[_0x6b79a2(0x1e4)] || _0x1e4806));else {
                  if ('function' != typeof _0x8dad7a) {
                    for (_0x2353f4 = -0x1, _0x4c76e0 = _0x8dad7a[_0x6b79a2(0x109)] - 0x1; _0x4c76e0 >= 0x0; _0x4c76e0--) {
                      if (_0x8dad7a[_0x4c76e0] === _0x1e4806 || _0x8dad7a[_0x4c76e0][_0x6b79a2(0x1e4)] === _0x1e4806) {
                        _0x18b901 = _0x8dad7a[_0x4c76e0]['listener'], _0x2353f4 = _0x4c76e0;
                        break;
                      }
                    }

                    if (_0x2353f4 < 0x0) return this;
                    0x0 === _0x2353f4 ? _0x8dad7a[_0x6b79a2(0x44e)]() : function (_0x111605, _0x355324) {
                      var _0x53d919 = _0x6b79a2;

                      for (; _0x355324 + 0x1 < _0x111605[_0x53d919(0x109)]; _0x355324++) {
                        _0x111605[_0x355324] = _0x111605[_0x355324 + 0x1];
                      }

                      _0x111605[_0x53d919(0x40a)]();
                    }(_0x8dad7a, _0x2353f4), 0x1 === _0x8dad7a[_0x6b79a2(0x109)] && (_0x41af7b[_0x2444f0] = _0x8dad7a[0x0]), void 0x0 !== _0x41af7b[_0x6b79a2(0x126)] && this['emit'](_0x6b79a2(0x126), _0x2444f0, _0x18b901 || _0x1e4806);
                  }
                }
                return this;
              }, _0x580373[_0x35c1b0(0x267)][_0x35c1b0(0x441)] = _0x580373[_0x35c1b0(0x267)][_0x35c1b0(0x126)], _0x580373[_0x35c1b0(0x267)][_0x35c1b0(0x1b5)] = function (_0x5858a2) {
                var _0x44c625 = _0x35c1b0,
                    _0x2d7d54,
                    _0x5b2922,
                    _0x364957;

                if (void 0x0 === (_0x5b2922 = this[_0x44c625(0x392)])) return this;
                if (void 0x0 === _0x5b2922[_0x44c625(0x126)]) return 0x0 === arguments[_0x44c625(0x109)] ? (this[_0x44c625(0x392)] = Object[_0x44c625(0x14b)](null), this[_0x44c625(0x13b)] = 0x0) : void 0x0 !== _0x5b2922[_0x5858a2] && (0x0 == --this['_eventsCount'] ? this[_0x44c625(0x392)] = Object[_0x44c625(0x14b)](null) : delete _0x5b2922[_0x5858a2]), this;

                if (0x0 === arguments[_0x44c625(0x109)]) {
                  var _0x125b95,
                      _0x35c26e = Object[_0x44c625(0x3ef)](_0x5b2922);

                  for (_0x364957 = 0x0; _0x364957 < _0x35c26e[_0x44c625(0x109)]; ++_0x364957) {
                    'removeListener' !== (_0x125b95 = _0x35c26e[_0x364957]) && this['removeAllListeners'](_0x125b95);
                  }

                  return this[_0x44c625(0x1b5)](_0x44c625(0x126)), this[_0x44c625(0x392)] = Object[_0x44c625(0x14b)](null), this[_0x44c625(0x13b)] = 0x0, this;
                }

                if (_0x44c625(0x23a) == typeof (_0x2d7d54 = _0x5b2922[_0x5858a2])) this[_0x44c625(0x126)](_0x5858a2, _0x2d7d54);else {
                  if (void 0x0 !== _0x2d7d54) {
                    for (_0x364957 = _0x2d7d54[_0x44c625(0x109)] - 0x1; _0x364957 >= 0x0; _0x364957--) {
                      this['removeListener'](_0x5858a2, _0x2d7d54[_0x364957]);
                    }
                  }
                }
                return this;
              }, _0x580373[_0x35c1b0(0x267)]['listeners'] = function (_0x290f0f) {
                return _0x3c1b2a(this, _0x290f0f, !0x0);
              }, _0x580373['prototype'][_0x35c1b0(0x403)] = function (_0x16d5e6) {
                return _0x3c1b2a(this, _0x16d5e6, !0x1);
              }, _0x580373[_0x35c1b0(0x26b)] = function (_0x1def3b, _0x39f2d5) {
                var _0x3ce40f = _0x35c1b0;
                return _0x3ce40f(0x23a) == typeof _0x1def3b[_0x3ce40f(0x26b)] ? _0x1def3b[_0x3ce40f(0x26b)](_0x39f2d5) : _0x1866d1[_0x3ce40f(0x20b)](_0x1def3b, _0x39f2d5);
              }, _0x580373[_0x35c1b0(0x267)]['listenerCount'] = _0x1866d1, _0x580373['prototype'][_0x35c1b0(0x412)] = function () {
                var _0x13789d = _0x35c1b0;
                return this['_eventsCount'] > 0x0 ? _0x58bbed(this[_0x13789d(0x392)]) : [];
              };
            },
            0xd8a: function _(_0x64c1fc, _0x216c33, _0x966c46) {
              var _0x3b3765 = a1_0x1adc,
                  _0x407d23 = _0x966c46(0x16c2),
                  _0x57cdea = Object['prototype'][_0x3b3765(0x1c8)],
                  _0x699c8a = _0x3b3765(0x23a) == typeof Blob || _0x3b3765(0x121) != typeof Blob && '[object\x20BlobConstructor]' === _0x57cdea[_0x3b3765(0x20b)](Blob),
                  _0x3c538b = _0x3b3765(0x23a) == typeof File || 'undefined' != typeof File && _0x3b3765(0x195) === _0x57cdea[_0x3b3765(0x20b)](File);

              _0x64c1fc[_0x3b3765(0x10f)] = function _0x1bc6a6(_0x5e4d21) {
                var _0x27db9b = _0x3b3765;
                if (!_0x5e4d21 || 'object' != typeof _0x5e4d21) return !0x1;

                if (_0x407d23(_0x5e4d21)) {
                  for (var _0x2bf440 = 0x0, _0xec0d53 = _0x5e4d21[_0x27db9b(0x109)]; _0x2bf440 < _0xec0d53; _0x2bf440++) {
                    if (_0x1bc6a6(_0x5e4d21[_0x2bf440])) return !0x0;
                  }

                  return !0x1;
                }

                if ('function' == typeof Buffer && Buffer[_0x27db9b(0x161)] && Buffer['isBuffer'](_0x5e4d21) || 'function' == typeof ArrayBuffer && _0x5e4d21 instanceof ArrayBuffer || _0x699c8a && _0x5e4d21 instanceof Blob || _0x3c538b && _0x5e4d21 instanceof File) return !0x0;
                if (_0x5e4d21[_0x27db9b(0x1a6)] && _0x27db9b(0x23a) == typeof _0x5e4d21[_0x27db9b(0x1a6)] && 0x1 === arguments[_0x27db9b(0x109)]) return _0x1bc6a6(_0x5e4d21[_0x27db9b(0x1a6)](), !0x0);

                for (var _0x49e597 in _0x5e4d21) {
                  if (Object[_0x27db9b(0x267)][_0x27db9b(0x19c)][_0x27db9b(0x20b)](_0x5e4d21, _0x49e597) && _0x1bc6a6(_0x5e4d21[_0x49e597])) return !0x0;
                }

                return !0x1;
              };
            },
            0x1f7a: function _(_0x1a181d) {
              var _0x11db9c = a1_0x1adc;

              try {
                _0x1a181d['exports'] = _0x11db9c(0x121) != typeof XMLHttpRequest && _0x11db9c(0x383) in new XMLHttpRequest();
              } catch (_0x22f796) {
                _0x1a181d['exports'] = !0x1;
              }
            },
            0x28a: function _(_0x1b18bc, _0x4a96ef) {
              var _0x40d10a = a1_0x1adc,
                  _0x1b237c,
                  _0x111cf0;

              _0x1b237c = function _0x1b237c() {
                var _0x55bf49 = a1_0x1adc;

                function _0x184555(_0x18d3dd) {
                  var _0x395f4f = a1_0x1adc;

                  switch (this[_0x395f4f(0x2f8)](), arguments[_0x395f4f(0x109)]) {
                    case 0x0:
                      break;

                    case 0x1:
                      _0x395f4f(0x109) in _0x18d3dd ? _0x472e5b(this, Array[_0x395f4f(0x267)][_0x395f4f(0x46f)]['apply']([], _0x18d3dd)) : this[_0x395f4f(0x1af)](_0x18d3dd);
                      break;

                    default:
                      _0x472e5b(this, arguments);

                  }
                }

                var _0x3b0798 = _0x184555[_0x55bf49(0x267)] = {
                  'constructor': _0x184555,
                  'get': function get(_0x26a914) {
                    var _0x1a64f2 = _0x55bf49,
                        _0x2a5164 = this[_0x1a64f2(0x2dd)][this[_0x1a64f2(0x349)](_0x26a914)];

                    return _0x2a5164 && _0x2a5164[0x1];
                  },
                  'set': function set(_0x4e5bd8, _0x29fcd2) {
                    var _0x5c7747 = _0x55bf49,
                        _0x2c1d3 = this[_0x5c7747(0x349)](_0x4e5bd8);

                    _0x2c1d3 in this[_0x5c7747(0x2dd)] || this['size']++, this[_0x5c7747(0x2dd)][_0x2c1d3] = [_0x4e5bd8, _0x29fcd2];
                  },
                  'multi': function multi() {
                    _0x472e5b(this, arguments);
                  },
                  'copy': function copy(_0x5a7005) {
                    var _0x351a5e = _0x55bf49;

                    for (var _0x5a1c9d in _0x5a7005[_0x351a5e(0x2dd)]) {
                      _0x5a1c9d in this[_0x351a5e(0x2dd)] || this['size']++, this[_0x351a5e(0x2dd)][_0x5a1c9d] = _0x5a7005['_data'][_0x5a1c9d];
                    }
                  },
                  'has': function has(_0x2e5909) {
                    var _0x3b153e = _0x55bf49;
                    return this[_0x3b153e(0x349)](_0x2e5909) in this[_0x3b153e(0x2dd)];
                  },
                  'search': function search(_0x40a02c) {
                    var _0x4f9395 = _0x55bf49;

                    for (var _0x1a0d97 in this[_0x4f9395(0x2dd)]) {
                      if (this['_data'][_0x1a0d97][0x1] === _0x40a02c) return this[_0x4f9395(0x2dd)][_0x1a0d97][0x0];
                    }

                    return null;
                  },
                  'delete': function _delete(_0x558f3d) {
                    var _0x28933a = _0x55bf49,
                        _0x25141d = this[_0x28933a(0x349)](_0x558f3d);

                    _0x25141d in this[_0x28933a(0x2dd)] && (this['size']--, delete this[_0x28933a(0x2dd)][_0x25141d]);
                  },
                  'type': function type(_0x49ec2e) {
                    var _0x1f663e = _0x55bf49,
                        _0x2425ed = Object[_0x1f663e(0x267)]['toString']['call'](_0x49ec2e)['slice'](0x8, -0x1)[_0x1f663e(0x444)]();

                    return _0x49ec2e || 'domwindow' !== _0x2425ed && _0x1f663e(0x4ca) !== _0x2425ed ? _0x2425ed : _0x49ec2e + '';
                  },
                  'keys': function keys() {
                    var _0x27401f = [];
                    return this['forEach'](function (_0x5a7856, _0x4d5091) {
                      var _0x498b4a = a1_0x1adc;

                      _0x27401f[_0x498b4a(0x4c0)](_0x4d5091);
                    }), _0x27401f;
                  },
                  'values': function values() {
                    var _0x2eed72 = _0x55bf49,
                        _0x2c77f9 = [];
                    return this[_0x2eed72(0x37b)](function (_0x1a283d) {
                      var _0xb4f7d8 = _0x2eed72;

                      _0x2c77f9[_0xb4f7d8(0x4c0)](_0x1a283d);
                    }), _0x2c77f9;
                  },
                  'entries': function entries() {
                    var _0x143915 = _0x55bf49,
                        _0x45df43 = [];
                    return this[_0x143915(0x37b)](function (_0x3c1e04, _0xcb1172) {
                      var _0x4e82db = _0x143915;

                      _0x45df43[_0x4e82db(0x4c0)]([_0xcb1172, _0x3c1e04]);
                    }), _0x45df43;
                  },
                  'count': function count() {
                    return this['size'];
                  },
                  'clear': function clear() {
                    var _0x3796a8 = _0x55bf49;
                    this[_0x3796a8(0x2dd)] = {}, this[_0x3796a8(0x33a)] = 0x0;
                  },
                  'clone': function clone() {
                    return new _0x184555(this);
                  },
                  'hash': function hash(_0x24fdad) {
                    var _0x124e1f = _0x55bf49;

                    switch (this[_0x124e1f(0x1bd)](_0x24fdad)) {
                      case 'undefined':
                      case 'null':
                      case _0x124e1f(0x268):
                      case _0x124e1f(0x35d):
                      case 'regexp':
                        return _0x24fdad + '';

                      case _0x124e1f(0x27a):
                        return '♣' + _0x24fdad[_0x124e1f(0x348)]();

                      case _0x124e1f(0x2df):
                        return '♠' + _0x24fdad;

                      case _0x124e1f(0x3d8):
                        for (var _0x492191 = [], _0x704b32 = 0x0; _0x704b32 < _0x24fdad['length']; _0x704b32++) {
                          _0x492191[_0x704b32] = this[_0x124e1f(0x349)](_0x24fdad[_0x704b32]);
                        }

                        return '♥' + _0x492191[_0x124e1f(0x49b)]('⁞');

                      default:
                        return _0x24fdad['hasOwnProperty'](_0x124e1f(0x1f2)) || (_0x24fdad[_0x124e1f(0x1f2)] = ++_0x184555['uid'], _0x1c61db = _0x24fdad, _0x50774a = _0x124e1f(0x1f2), Object[_0x124e1f(0x42b)] && Object[_0x124e1f(0x42b)](_0x1c61db, _0x50774a, {
                          'enumerable': !0x1
                        })), '♦' + _0x24fdad[_0x124e1f(0x1f2)];
                    }

                    var _0x1c61db, _0x50774a;
                  },
                  'forEach': function forEach(_0x11f4d2, _0x538474) {
                    var _0x93f8f0 = _0x55bf49;

                    for (var _0x57d360 in this['_data']) {
                      var _0x3d793f = this['_data'][_0x57d360];

                      _0x11f4d2[_0x93f8f0(0x20b)](_0x538474 || this, _0x3d793f[0x1], _0x3d793f[0x0]);
                    }
                  }
                };

                function _0x472e5b(_0x109ffd, _0x591a2d) {
                  var _0x3f257d = _0x55bf49;

                  for (var _0x35e1e0 = 0x0; _0x35e1e0 < _0x591a2d[_0x3f257d(0x109)]; _0x35e1e0 += 0x2) {
                    _0x109ffd[_0x3f257d(0x176)](_0x591a2d[_0x35e1e0], _0x591a2d[_0x35e1e0 + 0x1]);
                  }
                }

                return _0x184555[_0x55bf49(0x175)] = 0x0, _0x55bf49(0x121) != typeof Symbol && void 0x0 !== Symbol[_0x55bf49(0x399)] && (_0x3b0798[Symbol[_0x55bf49(0x399)]] = function () {
                  var _0x5877ab = _0x55bf49,
                      _0x2b839d = this[_0x5877ab(0x1ec)](),
                      _0x3872ef = 0x0;

                  return {
                    'next': function next() {
                      var _0xa9394 = _0x5877ab;
                      if (_0x3872ef === _0x2b839d[_0xa9394(0x109)]) return {
                        'done': !0x0
                      };
                      var _0x520972 = _0x2b839d[_0x3872ef++];
                      return {
                        'value': {
                          'key': _0x520972[0x0],
                          'value': _0x520972[0x1]
                        },
                        'done': !0x1
                      };
                    }
                  };
                }), [_0x55bf49(0x176), _0x55bf49(0x3f0), _0x55bf49(0x1af), 'delete', _0x55bf49(0x2f8), _0x55bf49(0x37b)][_0x55bf49(0x37b)](function (_0x56a668) {
                  var _0x1c865f = _0x3b0798[_0x56a668];

                  _0x3b0798[_0x56a668] = function () {
                    var _0x129f2c = a1_0x1adc;
                    return _0x1c865f[_0x129f2c(0x148)](this, arguments), this;
                  };
                }), _0x184555[_0x55bf49(0x267)]['remove'] = _0x184555[_0x55bf49(0x267)]['delete'], _0x184555;
              }, void 0x0 === (_0x111cf0 = _0x1b237c[_0x40d10a(0x148)](_0x4a96ef, [])) || (_0x1b18bc[_0x40d10a(0x10f)] = _0x111cf0);
            },
            0x1cbb: function _(_0x59bd6f) {
              var _0x4aa7b5 = a1_0x1adc,
                  _0x36ccde = [][_0x4aa7b5(0x458)];

              _0x59bd6f[_0x4aa7b5(0x10f)] = function (_0x5c4eda, _0x124824) {
                var _0x1db5f1 = _0x4aa7b5;
                if (_0x36ccde) return _0x5c4eda[_0x1db5f1(0x458)](_0x124824);

                for (var _0x4ddc21 = 0x0; _0x4ddc21 < _0x5c4eda[_0x1db5f1(0x109)]; ++_0x4ddc21) {
                  if (_0x5c4eda[_0x4ddc21] === _0x124824) return _0x4ddc21;
                }

                return -0x1;
              };
            },
            0x16c2: function _(_0x2d2cc7) {
              var _0x1db7aa = a1_0x1adc,
                  _0x3ba7d8 = {}['toString'];

              _0x2d2cc7['exports'] = Array[_0x1db7aa(0x3cc)] || function (_0x19776e) {
                var _0x54bdf0 = _0x1db7aa;
                return _0x54bdf0(0x30b) == _0x3ba7d8[_0x54bdf0(0x20b)](_0x19776e);
              };
            },
            0x1e90: function _(_0x1e2c8c) {
              var _0x32dcf3 = 0x3e8,
                  _0x523713 = 0x3c * _0x32dcf3,
                  _0xc7337 = 0x3c * _0x523713,
                  _0x4c1788 = 0x18 * _0xc7337;

              function _0x4ffab7(_0x5ab3a4, _0x14eb6f, _0xc7274f) {
                var _0x7f2e13 = a1_0x1adc;
                if (!(_0x5ab3a4 < _0x14eb6f)) return _0x5ab3a4 < 1.5 * _0x14eb6f ? Math[_0x7f2e13(0x38b)](_0x5ab3a4 / _0x14eb6f) + '\x20' + _0xc7274f : Math[_0x7f2e13(0x447)](_0x5ab3a4 / _0x14eb6f) + '\x20' + _0xc7274f + 's';
              }

              _0x1e2c8c['exports'] = function (_0x5eab37, _0x2798b2) {
                var _0x56e19d = a1_0x1adc;
                _0x2798b2 = _0x2798b2 || {};

                var _0x22ab43,
                    _0x2f9bae = typeof _0x5eab37;

                if (_0x56e19d(0x2df) === _0x2f9bae && _0x5eab37['length'] > 0x0) return function (_0x227c8d) {
                  var _0x4f4501 = _0x56e19d;

                  if (!((_0x227c8d = String(_0x227c8d))[_0x4f4501(0x109)] > 0x64)) {
                    var _0x9c6804 = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i[_0x4f4501(0x199)](_0x227c8d);

                    if (_0x9c6804) {
                      var _0x259ec3 = parseFloat(_0x9c6804[0x1]);

                      switch ((_0x9c6804[0x2] || 'ms')[_0x4f4501(0x444)]()) {
                        case _0x4f4501(0x31d):
                        case _0x4f4501(0x3b4):
                        case _0x4f4501(0x309):
                        case 'yr':
                        case 'y':
                          return 0x758fac300 * _0x259ec3;

                        case _0x4f4501(0x351):
                        case 'day':
                        case 'd':
                          return _0x259ec3 * _0x4c1788;

                        case 'hours':
                        case _0x4f4501(0x2c4):
                        case _0x4f4501(0x416):
                        case 'hr':
                        case 'h':
                          return _0x259ec3 * _0xc7337;

                        case 'minutes':
                        case _0x4f4501(0x4d5):
                        case _0x4f4501(0x288):
                        case _0x4f4501(0x2d1):
                        case 'm':
                          return _0x259ec3 * _0x523713;

                        case 'seconds':
                        case _0x4f4501(0x37d):
                        case _0x4f4501(0x1bc):
                        case _0x4f4501(0x17c):
                        case 's':
                          return _0x259ec3 * _0x32dcf3;

                        case _0x4f4501(0x139):
                        case _0x4f4501(0x388):
                        case _0x4f4501(0x34c):
                        case _0x4f4501(0x1d5):
                        case 'ms':
                          return _0x259ec3;

                        default:
                          return;
                      }
                    }
                  }
                }(_0x5eab37);
                if (_0x56e19d(0x35d) === _0x2f9bae && !0x1 === isNaN(_0x5eab37)) return _0x2798b2['long'] ? _0x4ffab7(_0x22ab43 = _0x5eab37, _0x4c1788, 'day') || _0x4ffab7(_0x22ab43, _0xc7337, _0x56e19d(0x2c4)) || _0x4ffab7(_0x22ab43, _0x523713, _0x56e19d(0x4d5)) || _0x4ffab7(_0x22ab43, _0x32dcf3, 'second') || _0x22ab43 + _0x56e19d(0x2f2) : function (_0x3127aa) {
                  var _0x3d7c71 = _0x56e19d;
                  return _0x3127aa >= _0x4c1788 ? Math['round'](_0x3127aa / _0x4c1788) + 'd' : _0x3127aa >= _0xc7337 ? Math[_0x3d7c71(0x253)](_0x3127aa / _0xc7337) + 'h' : _0x3127aa >= _0x523713 ? Math[_0x3d7c71(0x253)](_0x3127aa / _0x523713) + 'm' : _0x3127aa >= _0x32dcf3 ? Math[_0x3d7c71(0x253)](_0x3127aa / _0x32dcf3) + 's' : _0x3127aa + 'ms';
                }(_0x5eab37);
                throw new Error(_0x56e19d(0x3d5) + JSON['stringify'](_0x5eab37));
              };
            },
            0x726: function _(_0x5c9853, _0x356fae) {
              _0x356fae['encode'] = function (_0x1eb3e9) {
                var _0x4e4127 = a1_0x1adc,
                    _0x3e953f = '';

                for (var _0x4797c9 in _0x1eb3e9) {
                  _0x1eb3e9['hasOwnProperty'](_0x4797c9) && (_0x3e953f[_0x4e4127(0x109)] && (_0x3e953f += '&'), _0x3e953f += encodeURIComponent(_0x4797c9) + '=' + encodeURIComponent(_0x1eb3e9[_0x4797c9]));
                }

                return _0x3e953f;
              }, _0x356fae['decode'] = function (_0x3babd3) {
                var _0x12372b = a1_0x1adc;

                for (var _0xc51bba = {}, _0x4b8e43 = _0x3babd3[_0x12372b(0x194)]('&'), _0x44eff8 = 0x0, _0x5bde45 = _0x4b8e43['length']; _0x44eff8 < _0x5bde45; _0x44eff8++) {
                  var _0x5c4171 = _0x4b8e43[_0x44eff8][_0x12372b(0x194)]('=');

                  _0xc51bba[decodeURIComponent(_0x5c4171[0x0])] = decodeURIComponent(_0x5c4171[0x1]);
                }

                return _0xc51bba;
              };
            },
            0x105b: function _(_0x3f67f2) {
              var _0x5176a3 = a1_0x1adc,
                  _0x589c5f = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                  _0x38da69 = [_0x5176a3(0x18b), _0x5176a3(0x280), _0x5176a3(0x193), 'userInfo', 'user', _0x5176a3(0x423), _0x5176a3(0x4a9), 'port', _0x5176a3(0x369), 'path', 'directory', _0x5176a3(0x123), _0x5176a3(0x174), 'anchor'];

              _0x3f67f2[_0x5176a3(0x10f)] = function (_0x3f8686) {
                var _0x599c12 = _0x5176a3,
                    _0x2a51b2,
                    _0x419075,
                    _0x3c5e02,
                    _0x54cf13 = _0x3f8686,
                    _0x525240 = _0x3f8686['indexOf']('['),
                    _0x5e859a = _0x3f8686[_0x599c12(0x458)](']');

                -0x1 != _0x525240 && -0x1 != _0x5e859a && (_0x3f8686 = _0x3f8686[_0x599c12(0x495)](0x0, _0x525240) + _0x3f8686[_0x599c12(0x495)](_0x525240, _0x5e859a)['replace'](/:/g, ';') + _0x3f8686['substring'](_0x5e859a, _0x3f8686[_0x599c12(0x109)]));

                for (var _0x2bfbf5, _0x56bfaf, _0xae25e1 = _0x589c5f[_0x599c12(0x199)](_0x3f8686 || ''), _0x2eec2b = {}, _0x3624d6 = 0xe; _0x3624d6--;) {
                  _0x2eec2b[_0x38da69[_0x3624d6]] = _0xae25e1[_0x3624d6] || '';
                }

                return -0x1 != _0x525240 && -0x1 != _0x5e859a && (_0x2eec2b[_0x599c12(0x18b)] = _0x54cf13, _0x2eec2b[_0x599c12(0x4a9)] = _0x2eec2b[_0x599c12(0x4a9)][_0x599c12(0x495)](0x1, _0x2eec2b[_0x599c12(0x4a9)][_0x599c12(0x109)] - 0x1)[_0x599c12(0x27c)](/;/g, ':'), _0x2eec2b[_0x599c12(0x193)] = _0x2eec2b[_0x599c12(0x193)][_0x599c12(0x27c)]('[', '')[_0x599c12(0x27c)](']', '')[_0x599c12(0x27c)](/;/g, ':'), _0x2eec2b[_0x599c12(0x247)] = !0x0), _0x2eec2b[_0x599c12(0x13e)] = (_0x419075 = /\/{2,9}/g, _0x3c5e02 = (_0x2a51b2 = _0x2eec2b['path'])[_0x599c12(0x27c)](_0x419075, '/')[_0x599c12(0x194)]('/'), '/' != _0x2a51b2[_0x599c12(0x1ba)](0x0, 0x1) && 0x0 !== _0x2a51b2[_0x599c12(0x109)] || _0x3c5e02['splice'](0x0, 0x1), '/' == _0x2a51b2[_0x599c12(0x1ba)](_0x2a51b2[_0x599c12(0x109)] - 0x1, 0x1) && _0x3c5e02[_0x599c12(0x35b)](_0x3c5e02[_0x599c12(0x109)] - 0x1, 0x1), _0x3c5e02), _0x2eec2b['queryKey'] = (_0x2bfbf5 = _0x2eec2b[_0x599c12(0x174)], _0x56bfaf = {}, _0x2bfbf5['replace'](/(?:^|&)([^&=]*)=?([^&]*)/g, function (_0x8d171a, _0xa7756a, _0x3df4cf) {
                  _0xa7756a && (_0x56bfaf[_0xa7756a] = _0x3df4cf);
                }), _0x56bfaf), _0x2eec2b;
              };
            },
            0x1a99: function _(_0x286b14, _0x1abacd, _0x1fec4d) {
              var _0x198cde = a1_0x1adc,
                  _0x1336f3 = _0x1fec4d(0xe5e),
                  _0xa8928d = _0x1fec4d(0x2399),
                  _0x57c721 = _0x1fec4d(0xab3),
                  _0x31b24a = _0x1fec4d(0x4cb)(_0x198cde(0x2a2));

              _0x286b14[_0x198cde(0x10f)] = _0x1abacd = _0x4d56f8;

              var _0x418578 = _0x1abacd[_0x198cde(0x381)] = {};

              function _0x4d56f8(_0x5ebb38, _0x48ed47) {
                var _0x472ab4 = _0x198cde;
                'object' == typeof _0x5ebb38 && (_0x48ed47 = _0x5ebb38, _0x5ebb38 = void 0x0), _0x48ed47 = _0x48ed47 || {};

                var _0x2ac89a,
                    _0x42808f = _0x1336f3(_0x5ebb38),
                    _0x40d0cd = _0x42808f[_0x472ab4(0x18b)],
                    _0x114a05 = _0x42808f['id'],
                    _0x415c94 = _0x42808f[_0x472ab4(0x1c3)],
                    _0x1d7e06 = _0x418578[_0x114a05] && _0x415c94 in _0x418578[_0x114a05]['nsps'];

                return _0x48ed47[_0x472ab4(0x3b2)] || _0x48ed47['force\x20new\x20connection'] || !0x1 === _0x48ed47['multiplex'] || _0x1d7e06 ? (_0x31b24a(_0x472ab4(0x28a), _0x40d0cd), _0x2ac89a = _0x57c721(_0x40d0cd, _0x48ed47)) : (_0x418578[_0x114a05] || (_0x31b24a(_0x472ab4(0x1f1), _0x40d0cd), _0x418578[_0x114a05] = _0x57c721(_0x40d0cd, _0x48ed47)), _0x2ac89a = _0x418578[_0x114a05]), _0x42808f[_0x472ab4(0x174)] && !_0x48ed47['query'] && (_0x48ed47[_0x472ab4(0x174)] = _0x42808f[_0x472ab4(0x174)]), _0x2ac89a[_0x472ab4(0x154)](_0x42808f[_0x472ab4(0x1c3)], _0x48ed47);
              }

              _0x1abacd[_0x198cde(0x280)] = _0xa8928d['protocol'], _0x1abacd[_0x198cde(0x150)] = _0x4d56f8, _0x1abacd['Manager'] = _0x1fec4d(0xab3), _0x1abacd[_0x198cde(0x468)] = _0x1fec4d(0x2188);
            },
            0xab3: function _(_0x51a1a0, _0x323331, _0x3f50f5) {
              var _0x8c1820 = a1_0x1adc,
                  _0x59ae97 = _0x3f50f5(0x175f),
                  _0x5e33a9 = _0x3f50f5(0x2188),
                  _0x3bdd2d = _0x3f50f5(0x223f),
                  _0x1d64b7 = _0x3f50f5(0x2399),
                  _0x3dde3b = _0x3f50f5(0x1558),
                  _0x1f298a = _0x3f50f5(0x17bd),
                  _0x5227b3 = _0x3f50f5(0x4cb)(_0x8c1820(0x12f)),
                  _0x252c34 = _0x3f50f5(0x1cbb),
                  _0xfd370f = _0x3f50f5(0xbc2),
                  _0x982470 = Object[_0x8c1820(0x267)]['hasOwnProperty'];

              function _0x4eb724(_0x5e1875, _0x31178e) {
                var _0x2150b7 = _0x8c1820;
                if (!(this instanceof _0x4eb724)) return new _0x4eb724(_0x5e1875, _0x31178e);
                _0x5e1875 && _0x2150b7(0x26e) == typeof _0x5e1875 && (_0x31178e = _0x5e1875, _0x5e1875 = void 0x0), (_0x31178e = _0x31178e || {})['path'] = _0x31178e['path'] || _0x2150b7(0x278), this[_0x2150b7(0x281)] = {}, this['subs'] = [], this[_0x2150b7(0x1c7)] = _0x31178e, this['reconnection'](!0x1 !== _0x31178e[_0x2150b7(0x219)]), this['reconnectionAttempts'](_0x31178e['reconnectionAttempts'] || 0x1 / 0x0), this[_0x2150b7(0x344)](_0x31178e[_0x2150b7(0x344)] || 0x3e8), this[_0x2150b7(0x256)](_0x31178e[_0x2150b7(0x256)] || 0x1388), this[_0x2150b7(0x47b)](_0x31178e['randomizationFactor'] || 0.5), this[_0x2150b7(0x44d)] = new _0xfd370f({
                  'min': this[_0x2150b7(0x344)](),
                  'max': this[_0x2150b7(0x256)](),
                  'jitter': this[_0x2150b7(0x47b)]()
                }), this[_0x2150b7(0x214)](null == _0x31178e[_0x2150b7(0x214)] ? 0x4e20 : _0x31178e[_0x2150b7(0x214)]), this['readyState'] = 'closed', this[_0x2150b7(0x3d1)] = _0x5e1875, this['connecting'] = [], this[_0x2150b7(0x35e)] = null, this['encoding'] = !0x1, this[_0x2150b7(0x4b9)] = [];

                var _0x18237a = _0x31178e[_0x2150b7(0x319)] || _0x1d64b7;

                this['encoder'] = new _0x18237a[_0x2150b7(0x15c)](), this[_0x2150b7(0x115)] = new _0x18237a[_0x2150b7(0x4b7)](), this[_0x2150b7(0x3ee)] = !0x1 !== _0x31178e[_0x2150b7(0x3ee)], this['autoConnect'] && this[_0x2150b7(0x32e)]();
              }

              _0x51a1a0[_0x8c1820(0x10f)] = _0x4eb724, _0x4eb724[_0x8c1820(0x267)][_0x8c1820(0x2f4)] = function () {
                var _0x2241f7 = _0x8c1820;

                for (var _0xd9ef42 in this['emit'][_0x2241f7(0x148)](this, arguments), this['nsps']) {
                  _0x982470[_0x2241f7(0x20b)](this[_0x2241f7(0x281)], _0xd9ef42) && this[_0x2241f7(0x281)][_0xd9ef42]['emit'][_0x2241f7(0x148)](this[_0x2241f7(0x281)][_0xd9ef42], arguments);
                }
              }, _0x4eb724[_0x8c1820(0x267)][_0x8c1820(0x3a7)] = function () {
                var _0x8bf358 = _0x8c1820;

                for (var _0x45535c in this[_0x8bf358(0x281)]) {
                  _0x982470['call'](this['nsps'], _0x45535c) && (this['nsps'][_0x45535c]['id'] = this['generateId'](_0x45535c));
                }
              }, _0x4eb724[_0x8c1820(0x267)]['generateId'] = function (_0x447760) {
                var _0x3e81aa = _0x8c1820;
                return ('/' === _0x447760 ? '' : _0x447760 + '#') + this[_0x3e81aa(0x3b0)]['id'];
              }, _0x3bdd2d(_0x4eb724[_0x8c1820(0x267)]), _0x4eb724[_0x8c1820(0x267)][_0x8c1820(0x219)] = function (_0x26b4b7) {
                var _0x22c290 = _0x8c1820;
                return arguments[_0x22c290(0x109)] ? (this['_reconnection'] = !!_0x26b4b7, this) : this['_reconnection'];
              }, _0x4eb724[_0x8c1820(0x267)][_0x8c1820(0x3ab)] = function (_0x302685) {
                var _0xfd8b6f = _0x8c1820;
                return arguments[_0xfd8b6f(0x109)] ? (this[_0xfd8b6f(0x45c)] = _0x302685, this) : this[_0xfd8b6f(0x45c)];
              }, _0x4eb724[_0x8c1820(0x267)][_0x8c1820(0x344)] = function (_0x531687) {
                var _0x174181 = _0x8c1820;
                return arguments[_0x174181(0x109)] ? (this[_0x174181(0x1a4)] = _0x531687, this[_0x174181(0x44d)] && this['backoff'][_0x174181(0x404)](_0x531687), this) : this[_0x174181(0x1a4)];
              }, _0x4eb724[_0x8c1820(0x267)][_0x8c1820(0x47b)] = function (_0x55d48d) {
                var _0x51f9eb = _0x8c1820;
                return arguments['length'] ? (this[_0x51f9eb(0x1c6)] = _0x55d48d, this[_0x51f9eb(0x44d)] && this[_0x51f9eb(0x44d)][_0x51f9eb(0x3b9)](_0x55d48d), this) : this[_0x51f9eb(0x1c6)];
              }, _0x4eb724[_0x8c1820(0x267)][_0x8c1820(0x256)] = function (_0x47d65b) {
                var _0x15771c = _0x8c1820;
                return arguments['length'] ? (this['_reconnectionDelayMax'] = _0x47d65b, this['backoff'] && this['backoff'][_0x15771c(0x365)](_0x47d65b), this) : this['_reconnectionDelayMax'];
              }, _0x4eb724['prototype'][_0x8c1820(0x214)] = function (_0x60d9ba) {
                var _0x47e53e = _0x8c1820;
                return arguments[_0x47e53e(0x109)] ? (this[_0x47e53e(0x471)] = _0x60d9ba, this) : this['_timeout'];
              }, _0x4eb724[_0x8c1820(0x267)][_0x8c1820(0x371)] = function () {
                var _0x76c090 = _0x8c1820;
                !this[_0x76c090(0x2b2)] && this[_0x76c090(0x353)] && 0x0 === this[_0x76c090(0x44d)][_0x76c090(0x3a4)] && this[_0x76c090(0x1d7)]();
              }, _0x4eb724[_0x8c1820(0x267)][_0x8c1820(0x32e)] = _0x4eb724[_0x8c1820(0x267)][_0x8c1820(0x150)] = function (_0x289e4c, _0x152ecc) {
                var _0x22928d = _0x8c1820;
                if (_0x5227b3('readyState\x20%s', this[_0x22928d(0x3cd)]), ~this[_0x22928d(0x3cd)][_0x22928d(0x458)]('open')) return this;
                _0x5227b3(_0x22928d(0x274), this[_0x22928d(0x3d1)]), this[_0x22928d(0x3b0)] = _0x59ae97(this[_0x22928d(0x3d1)], this[_0x22928d(0x1c7)]);

                var _0x292f95 = this[_0x22928d(0x3b0)],
                    _0x4e64bd = this;

                this['readyState'] = _0x22928d(0x2d3), this['skipReconnect'] = !0x1;

                var _0x2d1c68 = _0x3dde3b(_0x292f95, 'open', function () {
                  var _0xc01ff = _0x22928d;
                  _0x4e64bd[_0xc01ff(0x3c3)](), _0x289e4c && _0x289e4c();
                }),
                    _0x1bdb49 = _0x3dde3b(_0x292f95, _0x22928d(0x47c), function (_0x991d4a) {
                  var _0x100c3d = _0x22928d;

                  if (_0x5227b3('connect_error'), _0x4e64bd[_0x100c3d(0x137)](), _0x4e64bd[_0x100c3d(0x3cd)] = _0x100c3d(0x189), _0x4e64bd[_0x100c3d(0x2f4)](_0x100c3d(0x117), _0x991d4a), _0x289e4c) {
                    var _0x1f001 = new Error(_0x100c3d(0x235));

                    _0x1f001[_0x100c3d(0x28e)] = _0x991d4a, _0x289e4c(_0x1f001);
                  } else _0x4e64bd[_0x100c3d(0x371)]();
                });

                if (!0x1 !== this[_0x22928d(0x471)]) {
                  var _0x541484 = this['_timeout'];
                  _0x5227b3(_0x22928d(0x201), _0x541484), 0x0 === _0x541484 && _0x2d1c68[_0x22928d(0x125)]();

                  var _0x41ae23 = setTimeout(function () {
                    var _0x5c6ad3 = _0x22928d;
                    _0x5227b3('connect\x20attempt\x20timed\x20out\x20after\x20%d', _0x541484), _0x2d1c68[_0x5c6ad3(0x125)](), _0x292f95[_0x5c6ad3(0x1b9)](), _0x292f95['emit'](_0x5c6ad3(0x47c), _0x5c6ad3(0x214)), _0x4e64bd[_0x5c6ad3(0x2f4)](_0x5c6ad3(0x4ae), _0x541484);
                  }, _0x541484);

                  this[_0x22928d(0x2e1)]['push']({
                    'destroy': function destroy() {
                      clearTimeout(_0x41ae23);
                    }
                  });
                }

                return this['subs'][_0x22928d(0x4c0)](_0x2d1c68), this[_0x22928d(0x2e1)][_0x22928d(0x4c0)](_0x1bdb49), this;
              }, _0x4eb724[_0x8c1820(0x267)][_0x8c1820(0x3c3)] = function () {
                var _0x1766c2 = _0x8c1820;
                _0x5227b3(_0x1766c2(0x32e)), this[_0x1766c2(0x137)](), this['readyState'] = _0x1766c2(0x32e), this[_0x1766c2(0x426)]('open');

                var _0x112c4c = this[_0x1766c2(0x3b0)];

                this[_0x1766c2(0x2e1)]['push'](_0x3dde3b(_0x112c4c, _0x1766c2(0x28e), _0x1f298a(this, _0x1766c2(0x432)))), this[_0x1766c2(0x2e1)][_0x1766c2(0x4c0)](_0x3dde3b(_0x112c4c, 'ping', _0x1f298a(this, _0x1766c2(0x2ac)))), this[_0x1766c2(0x2e1)][_0x1766c2(0x4c0)](_0x3dde3b(_0x112c4c, _0x1766c2(0x3ed), _0x1f298a(this, _0x1766c2(0x338)))), this[_0x1766c2(0x2e1)][_0x1766c2(0x4c0)](_0x3dde3b(_0x112c4c, _0x1766c2(0x47c), _0x1f298a(this, _0x1766c2(0x474)))), this[_0x1766c2(0x2e1)][_0x1766c2(0x4c0)](_0x3dde3b(_0x112c4c, _0x1766c2(0x1b9), _0x1f298a(this, _0x1766c2(0x2d9)))), this['subs'][_0x1766c2(0x4c0)](_0x3dde3b(this[_0x1766c2(0x115)], 'decoded', _0x1f298a(this, _0x1766c2(0x3e4))));
              }, _0x4eb724[_0x8c1820(0x267)][_0x8c1820(0x2ac)] = function () {
                var _0x46e66e = _0x8c1820;
                this['lastPing'] = new Date(), this['emitAll'](_0x46e66e(0x3e5));
              }, _0x4eb724[_0x8c1820(0x267)]['onpong'] = function () {
                var _0x13c034 = _0x8c1820;

                this[_0x13c034(0x2f4)](_0x13c034(0x3ed), new Date() - this[_0x13c034(0x35e)]);
              }, _0x4eb724[_0x8c1820(0x267)][_0x8c1820(0x432)] = function (_0x82aa8f) {
                var _0x3a3ae4 = _0x8c1820;

                this[_0x3a3ae4(0x115)][_0x3a3ae4(0x1a2)](_0x82aa8f);
              }, _0x4eb724[_0x8c1820(0x267)][_0x8c1820(0x3e4)] = function (_0x27a8b8) {
                var _0x51df4d = _0x8c1820;

                this[_0x51df4d(0x426)](_0x51df4d(0x43e), _0x27a8b8);
              }, _0x4eb724[_0x8c1820(0x267)]['onerror'] = function (_0x1494f3) {
                var _0x4eb354 = _0x8c1820;
                _0x5227b3(_0x4eb354(0x47c), _0x1494f3), this['emitAll'](_0x4eb354(0x47c), _0x1494f3);
              }, _0x4eb724[_0x8c1820(0x267)][_0x8c1820(0x154)] = function (_0x1518df, _0x837a71) {
                var _0x1f3ddf = _0x8c1820,
                    _0x13ffb4 = this[_0x1f3ddf(0x281)][_0x1518df];

                if (!_0x13ffb4) {
                  _0x13ffb4 = new _0x5e33a9(this, _0x1518df, _0x837a71), this['nsps'][_0x1518df] = _0x13ffb4;

                  var _0x46094d = this;

                  _0x13ffb4['on']('connecting', _0x2fa7c3), _0x13ffb4['on'](_0x1f3ddf(0x150), function () {
                    var _0x2e00e5 = _0x1f3ddf;
                    _0x13ffb4['id'] = _0x46094d[_0x2e00e5(0x36e)](_0x1518df);
                  }), this['autoConnect'] && _0x2fa7c3();
                }

                function _0x2fa7c3() {
                  var _0x1d5ae1 = _0x1f3ddf;
                  ~_0x252c34(_0x46094d[_0x1d5ae1(0x1a5)], _0x13ffb4) || _0x46094d['connecting']['push'](_0x13ffb4);
                }

                return _0x13ffb4;
              }, _0x4eb724[_0x8c1820(0x267)][_0x8c1820(0x125)] = function (_0x13f6a4) {
                var _0x4d6943 = _0x8c1820,
                    _0xc88cc0 = _0x252c34(this[_0x4d6943(0x1a5)], _0x13f6a4);

                ~_0xc88cc0 && this[_0x4d6943(0x1a5)][_0x4d6943(0x35b)](_0xc88cc0, 0x1), this[_0x4d6943(0x1a5)][_0x4d6943(0x109)] || this[_0x4d6943(0x1b9)]();
              }, _0x4eb724[_0x8c1820(0x267)][_0x8c1820(0x43e)] = function (_0x1c5f18) {
                var _0x28d047 = _0x8c1820;

                _0x5227b3('writing\x20packet\x20%j', _0x1c5f18);

                var _0x19d821 = this;

                _0x1c5f18[_0x28d047(0x174)] && 0x0 === _0x1c5f18[_0x28d047(0x1bd)] && (_0x1c5f18['nsp'] += '?' + _0x1c5f18[_0x28d047(0x174)]), _0x19d821[_0x28d047(0x2bd)] ? _0x19d821[_0x28d047(0x4b9)][_0x28d047(0x4c0)](_0x1c5f18) : (_0x19d821['encoding'] = !0x0, this[_0x28d047(0x2ea)][_0x28d047(0x2bf)](_0x1c5f18, function (_0x1f111c) {
                  var _0x1050cf = _0x28d047;

                  for (var _0x508401 = 0x0; _0x508401 < _0x1f111c[_0x1050cf(0x109)]; _0x508401++) {
                    _0x19d821[_0x1050cf(0x3b0)]['write'](_0x1f111c[_0x508401], _0x1c5f18[_0x1050cf(0x342)]);
                  }

                  _0x19d821[_0x1050cf(0x2bd)] = !0x1, _0x19d821[_0x1050cf(0x307)]();
                }));
              }, _0x4eb724['prototype'][_0x8c1820(0x307)] = function () {
                var _0x5af8f2 = _0x8c1820;

                if (this[_0x5af8f2(0x4b9)][_0x5af8f2(0x109)] > 0x0 && !this[_0x5af8f2(0x2bd)]) {
                  var _0x1714d2 = this[_0x5af8f2(0x4b9)][_0x5af8f2(0x44e)]();

                  this['packet'](_0x1714d2);
                }
              }, _0x4eb724[_0x8c1820(0x267)][_0x8c1820(0x137)] = function () {
                var _0x37931f = _0x8c1820;

                _0x5227b3(_0x37931f(0x137));

                for (var _0x22aab0 = this[_0x37931f(0x2e1)][_0x37931f(0x109)], _0x14ce15 = 0x0; _0x14ce15 < _0x22aab0; _0x14ce15++) {
                  this[_0x37931f(0x2e1)][_0x37931f(0x44e)]()[_0x37931f(0x125)]();
                }

                this[_0x37931f(0x4b9)] = [], this[_0x37931f(0x2bd)] = !0x1, this[_0x37931f(0x35e)] = null, this[_0x37931f(0x115)]['destroy']();
              }, _0x4eb724[_0x8c1820(0x267)]['close'] = _0x4eb724['prototype']['disconnect'] = function () {
                var _0x25191f = _0x8c1820;
                _0x5227b3('disconnect'), this[_0x25191f(0x4c8)] = !0x0, this[_0x25191f(0x2b2)] = !0x1, _0x25191f(0x2d3) === this[_0x25191f(0x3cd)] && this['cleanup'](), this[_0x25191f(0x44d)][_0x25191f(0x3ea)](), this[_0x25191f(0x3cd)] = _0x25191f(0x189), this[_0x25191f(0x3b0)] && this[_0x25191f(0x3b0)][_0x25191f(0x1b9)]();
              }, _0x4eb724[_0x8c1820(0x267)]['onclose'] = function (_0x23796f) {
                var _0x2002db = _0x8c1820;
                _0x5227b3(_0x2002db(0x2d9)), this[_0x2002db(0x137)](), this[_0x2002db(0x44d)]['reset'](), this['readyState'] = _0x2002db(0x189), this[_0x2002db(0x426)]('close', _0x23796f), this[_0x2002db(0x353)] && !this[_0x2002db(0x4c8)] && this[_0x2002db(0x1d7)]();
              }, _0x4eb724['prototype'][_0x8c1820(0x1d7)] = function () {
                var _0x2ce44d = _0x8c1820;
                if (this[_0x2ce44d(0x2b2)] || this[_0x2ce44d(0x4c8)]) return this;

                var _0x4c6080 = this;

                if (this[_0x2ce44d(0x44d)]['attempts'] >= this['_reconnectionAttempts']) _0x5227b3(_0x2ce44d(0x276)), this[_0x2ce44d(0x44d)]['reset'](), this[_0x2ce44d(0x2f4)](_0x2ce44d(0x272)), this['reconnecting'] = !0x1;else {
                  var _0x213f4 = this[_0x2ce44d(0x44d)][_0x2ce44d(0x16e)]();

                  _0x5227b3(_0x2ce44d(0x39d), _0x213f4), this[_0x2ce44d(0x2b2)] = !0x0;

                  var _0x329f51 = setTimeout(function () {
                    var _0xa37bde = _0x2ce44d;
                    _0x4c6080['skipReconnect'] || (_0x5227b3('attempting\x20reconnect'), _0x4c6080[_0xa37bde(0x2f4)](_0xa37bde(0x3fe), _0x4c6080['backoff']['attempts']), _0x4c6080[_0xa37bde(0x2f4)](_0xa37bde(0x2b2), _0x4c6080[_0xa37bde(0x44d)][_0xa37bde(0x3a4)]), _0x4c6080[_0xa37bde(0x4c8)] || _0x4c6080['open'](function (_0x18dde7) {
                      var _0x350f74 = _0xa37bde;
                      _0x18dde7 ? (_0x5227b3(_0x350f74(0x40e)), _0x4c6080[_0x350f74(0x2b2)] = !0x1, _0x4c6080['reconnect'](), _0x4c6080[_0x350f74(0x2f4)]('reconnect_error', _0x18dde7[_0x350f74(0x28e)])) : (_0x5227b3(_0x350f74(0x2f3)), _0x4c6080[_0x350f74(0x2de)]());
                    }));
                  }, _0x213f4);

                  this['subs']['push']({
                    'destroy': function destroy() {
                      clearTimeout(_0x329f51);
                    }
                  });
                }
              }, _0x4eb724[_0x8c1820(0x267)]['onreconnect'] = function () {
                var _0x4deaf7 = _0x8c1820,
                    _0x37b28e = this[_0x4deaf7(0x44d)]['attempts'];

                this[_0x4deaf7(0x2b2)] = !0x1, this[_0x4deaf7(0x44d)][_0x4deaf7(0x3ea)](), this[_0x4deaf7(0x3a7)](), this[_0x4deaf7(0x2f4)](_0x4deaf7(0x1d7), _0x37b28e);
              };
            },
            0x1558: function _(_0x4eda9d) {
              var _0x33291c = a1_0x1adc;

              _0x4eda9d[_0x33291c(0x10f)] = function (_0x5361e8, _0x71cf34, _0xeda576) {
                return _0x5361e8['on'](_0x71cf34, _0xeda576), {
                  'destroy': function destroy() {
                    _0x5361e8['removeListener'](_0x71cf34, _0xeda576);
                  }
                };
              };
            },
            0x2188: function _(_0x5d07f6, _0x36a67c, _0x3987c6) {
              var _0x13d44d = a1_0x1adc,
                  _0x3fe434 = _0x3987c6(0x2399),
                  _0x50996a = _0x3987c6(0x223f),
                  _0x975a0f = _0x3987c6(0xfca),
                  _0x139387 = _0x3987c6(0x1558),
                  _0x2c970e = _0x3987c6(0x17bd),
                  _0x3ef945 = _0x3987c6(0x4cb)(_0x13d44d(0x172)),
                  _0x9ca317 = _0x3987c6(0x726),
                  _0x6a7d7c = _0x3987c6(0xd8a);

              _0x5d07f6[_0x13d44d(0x10f)] = _0x2eee5a;

              var _0x2bd7d2 = {
                'connect': 0x1,
                'connect_error': 0x1,
                'connect_timeout': 0x1,
                'connecting': 0x1,
                'disconnect': 0x1,
                'error': 0x1,
                'reconnect': 0x1,
                'reconnect_attempt': 0x1,
                'reconnect_failed': 0x1,
                'reconnect_error': 0x1,
                'reconnecting': 0x1,
                'ping': 0x1,
                'pong': 0x1
              },
                  _0x5138d4 = _0x50996a[_0x13d44d(0x267)][_0x13d44d(0x426)];

              function _0x2eee5a(_0x5caa6f, _0x1aaeea, _0x15789d) {
                var _0x4b6e87 = _0x13d44d;
                this['io'] = _0x5caa6f, this[_0x4b6e87(0x1c2)] = _0x1aaeea, this[_0x4b6e87(0x355)] = this, this[_0x4b6e87(0x2a4)] = 0x0, this[_0x4b6e87(0x312)] = {}, this[_0x4b6e87(0x374)] = [], this[_0x4b6e87(0x23b)] = [], this[_0x4b6e87(0x1d0)] = !0x1, this[_0x4b6e87(0x4a2)] = !0x0, this['flags'] = {}, _0x15789d && _0x15789d['query'] && (this[_0x4b6e87(0x174)] = _0x15789d[_0x4b6e87(0x174)]), this['io'][_0x4b6e87(0x3ee)] && this['open']();
              }

              _0x50996a(_0x2eee5a['prototype']), _0x2eee5a[_0x13d44d(0x267)][_0x13d44d(0x3a9)] = function () {
                var _0x3ddf93 = _0x13d44d;

                if (!this[_0x3ddf93(0x2e1)]) {
                  var _0x3ba531 = this['io'];
                  this[_0x3ddf93(0x2e1)] = [_0x139387(_0x3ba531, 'open', _0x2c970e(this, _0x3ddf93(0x3c3))), _0x139387(_0x3ba531, _0x3ddf93(0x43e), _0x2c970e(this, _0x3ddf93(0x145))), _0x139387(_0x3ba531, _0x3ddf93(0x1b9), _0x2c970e(this, _0x3ddf93(0x2d9)))];
                }
              }, _0x2eee5a[_0x13d44d(0x267)]['open'] = _0x2eee5a[_0x13d44d(0x267)][_0x13d44d(0x150)] = function () {
                var _0x425c8e = _0x13d44d;
                return this[_0x425c8e(0x1d0)] || (this['subEvents'](), this['io']['reconnecting'] || this['io']['open'](), _0x425c8e(0x32e) === this['io'][_0x425c8e(0x3cd)] && this[_0x425c8e(0x3c3)](), this[_0x425c8e(0x426)](_0x425c8e(0x1a5))), this;
              }, _0x2eee5a[_0x13d44d(0x267)][_0x13d44d(0x362)] = function () {
                var _0x496e70 = _0x13d44d,
                    _0x1267e3 = _0x975a0f(arguments);

                return _0x1267e3[_0x496e70(0x2f6)](_0x496e70(0x1cd)), this[_0x496e70(0x426)][_0x496e70(0x148)](this, _0x1267e3), this;
              }, _0x2eee5a[_0x13d44d(0x267)]['emit'] = function (_0x2b28ad) {
                var _0x2dde3f = _0x13d44d;
                if (_0x2bd7d2[_0x2dde3f(0x19c)](_0x2b28ad)) return _0x5138d4['apply'](this, arguments), this;

                var _0xdcd193 = _0x975a0f(arguments),
                    _0x438c2b = {
                  'type': (void 0x0 !== this['flags'][_0x2dde3f(0x173)] ? this[_0x2dde3f(0x16f)][_0x2dde3f(0x173)] : _0x6a7d7c(_0xdcd193)) ? _0x3fe434['BINARY_EVENT'] : _0x3fe434['EVENT'],
                  'data': _0xdcd193,
                  'options': {}
                };

                return _0x438c2b['options'][_0x2dde3f(0x3d2)] = !this['flags'] || !0x1 !== this[_0x2dde3f(0x16f)]['compress'], _0x2dde3f(0x23a) == typeof _0xdcd193[_0xdcd193[_0x2dde3f(0x109)] - 0x1] && (_0x3ef945('emitting\x20packet\x20with\x20ack\x20id\x20%d', this['ids']), this[_0x2dde3f(0x312)][this['ids']] = _0xdcd193[_0x2dde3f(0x40a)](), _0x438c2b['id'] = this[_0x2dde3f(0x2a4)]++), this[_0x2dde3f(0x1d0)] ? this[_0x2dde3f(0x43e)](_0x438c2b) : this[_0x2dde3f(0x23b)][_0x2dde3f(0x4c0)](_0x438c2b), this[_0x2dde3f(0x16f)] = {}, this;
              }, _0x2eee5a[_0x13d44d(0x267)][_0x13d44d(0x43e)] = function (_0x970380) {
                var _0x8955f = _0x13d44d;
                _0x970380['nsp'] = this[_0x8955f(0x1c2)], this['io'][_0x8955f(0x43e)](_0x970380);
              }, _0x2eee5a[_0x13d44d(0x267)][_0x13d44d(0x3c3)] = function () {
                var _0x825a21 = _0x13d44d;

                if (_0x3ef945(_0x825a21(0x225)), '/' !== this[_0x825a21(0x1c2)]) {
                  if (this[_0x825a21(0x174)]) {
                    var _0x21538a = _0x825a21(0x26e) == typeof this['query'] ? _0x9ca317[_0x825a21(0x2bf)](this[_0x825a21(0x174)]) : this['query'];

                    _0x3ef945('sending\x20connect\x20packet\x20with\x20query\x20%s', _0x21538a), this['packet']({
                      'type': _0x3fe434['CONNECT'],
                      'query': _0x21538a
                    });
                  } else this[_0x825a21(0x43e)]({
                    'type': _0x3fe434[_0x825a21(0x339)]
                  });
                }
              }, _0x2eee5a[_0x13d44d(0x267)][_0x13d44d(0x2d9)] = function (_0x171989) {
                var _0x1de7b4 = _0x13d44d;
                _0x3ef945(_0x1de7b4(0x237), _0x171989), this[_0x1de7b4(0x1d0)] = !0x1, this[_0x1de7b4(0x4a2)] = !0x0, delete this['id'], this['emit'](_0x1de7b4(0x2db), _0x171989);
              }, _0x2eee5a['prototype'][_0x13d44d(0x145)] = function (_0x472ab7) {
                var _0x123d28 = _0x13d44d,
                    _0x1bc487 = _0x472ab7[_0x123d28(0x1c2)] === this[_0x123d28(0x1c2)],
                    _0xef5c3b = _0x472ab7[_0x123d28(0x1bd)] === _0x3fe434[_0x123d28(0x28c)] && '/' === _0x472ab7['nsp'];

                if (_0x1bc487 || _0xef5c3b) switch (_0x472ab7[_0x123d28(0x1bd)]) {
                  case _0x3fe434[_0x123d28(0x339)]:
                    this['onconnect']();
                    break;

                  case _0x3fe434['EVENT']:
                  case _0x3fe434[_0x123d28(0x127)]:
                    this[_0x123d28(0x1c5)](_0x472ab7);

                    break;

                  case _0x3fe434[_0x123d28(0x186)]:
                  case _0x3fe434[_0x123d28(0x14f)]:
                    this['onack'](_0x472ab7);
                    break;

                  case _0x3fe434[_0x123d28(0x3c0)]:
                    this['ondisconnect']();
                    break;

                  case _0x3fe434[_0x123d28(0x28c)]:
                    this[_0x123d28(0x426)](_0x123d28(0x47c), _0x472ab7[_0x123d28(0x28e)]);

                }
              }, _0x2eee5a[_0x13d44d(0x267)][_0x13d44d(0x1c5)] = function (_0x554c9a) {
                var _0xee9a93 = _0x13d44d,
                    _0x2c5338 = _0x554c9a[_0xee9a93(0x28e)] || [];

                _0x3ef945(_0xee9a93(0x497), _0x2c5338), null != _0x554c9a['id'] && (_0x3ef945('attaching\x20ack\x20callback\x20to\x20event'), _0x2c5338['push'](this[_0xee9a93(0x304)](_0x554c9a['id']))), this[_0xee9a93(0x1d0)] ? _0x5138d4[_0xee9a93(0x148)](this, _0x2c5338) : this[_0xee9a93(0x374)][_0xee9a93(0x4c0)](_0x2c5338);
              }, _0x2eee5a[_0x13d44d(0x267)]['ack'] = function (_0x3b7ae9) {
                var _0x17aa23 = this,
                    _0x3072f4 = !0x1;

                return function () {
                  var _0x3a79a2 = a1_0x1adc;

                  if (!_0x3072f4) {
                    _0x3072f4 = !0x0;

                    var _0x2df1f8 = _0x975a0f(arguments);

                    _0x3ef945('sending\x20ack\x20%j', _0x2df1f8), _0x17aa23[_0x3a79a2(0x43e)]({
                      'type': _0x6a7d7c(_0x2df1f8) ? _0x3fe434[_0x3a79a2(0x14f)] : _0x3fe434['ACK'],
                      'id': _0x3b7ae9,
                      'data': _0x2df1f8
                    });
                  }
                };
              }, _0x2eee5a[_0x13d44d(0x267)][_0x13d44d(0x122)] = function (_0xaf3cd8) {
                var _0x2d2f4e = _0x13d44d,
                    _0x407cfb = this[_0x2d2f4e(0x312)][_0xaf3cd8['id']];

                _0x2d2f4e(0x23a) == typeof _0x407cfb ? (_0x3ef945(_0x2d2f4e(0x1e7), _0xaf3cd8['id'], _0xaf3cd8['data']), _0x407cfb['apply'](this, _0xaf3cd8[_0x2d2f4e(0x28e)]), delete this[_0x2d2f4e(0x312)][_0xaf3cd8['id']]) : _0x3ef945(_0x2d2f4e(0x1e5), _0xaf3cd8['id']);
              }, _0x2eee5a[_0x13d44d(0x267)]['onconnect'] = function () {
                var _0x10a155 = _0x13d44d;
                this['connected'] = !0x0, this[_0x10a155(0x4a2)] = !0x1, this[_0x10a155(0x1da)](), this[_0x10a155(0x426)]('connect');
              }, _0x2eee5a[_0x13d44d(0x267)]['emitBuffered'] = function () {
                var _0x578d6b = _0x13d44d,
                    _0x14413b;

                for (_0x14413b = 0x0; _0x14413b < this[_0x578d6b(0x374)][_0x578d6b(0x109)]; _0x14413b++) {
                  _0x5138d4[_0x578d6b(0x148)](this, this['receiveBuffer'][_0x14413b]);
                }

                for (this[_0x578d6b(0x374)] = [], _0x14413b = 0x0; _0x14413b < this['sendBuffer'][_0x578d6b(0x109)]; _0x14413b++) {
                  this[_0x578d6b(0x43e)](this[_0x578d6b(0x23b)][_0x14413b]);
                }

                this['sendBuffer'] = [];
              }, _0x2eee5a['prototype'][_0x13d44d(0x427)] = function () {
                var _0x4fa275 = _0x13d44d;
                _0x3ef945(_0x4fa275(0x1f4), this['nsp']), this[_0x4fa275(0x125)](), this[_0x4fa275(0x2d9)](_0x4fa275(0x3e2));
              }, _0x2eee5a['prototype'][_0x13d44d(0x125)] = function () {
                var _0xa0141 = _0x13d44d;

                if (this[_0xa0141(0x2e1)]) {
                  for (var _0x4890cb = 0x0; _0x4890cb < this[_0xa0141(0x2e1)][_0xa0141(0x109)]; _0x4890cb++) {
                    this['subs'][_0x4890cb][_0xa0141(0x125)]();
                  }

                  this[_0xa0141(0x2e1)] = null;
                }

                this['io']['destroy'](this);
              }, _0x2eee5a[_0x13d44d(0x267)][_0x13d44d(0x1b9)] = _0x2eee5a[_0x13d44d(0x267)][_0x13d44d(0x2db)] = function () {
                var _0x41b79b = _0x13d44d;
                return this[_0x41b79b(0x1d0)] && (_0x3ef945(_0x41b79b(0x449), this[_0x41b79b(0x1c2)]), this[_0x41b79b(0x43e)]({
                  'type': _0x3fe434[_0x41b79b(0x3c0)]
                })), this[_0x41b79b(0x125)](), this['connected'] && this[_0x41b79b(0x2d9)](_0x41b79b(0x4bc)), this;
              }, _0x2eee5a[_0x13d44d(0x267)][_0x13d44d(0x3d2)] = function (_0x305081) {
                return this['flags']['compress'] = _0x305081, this;
              }, _0x2eee5a[_0x13d44d(0x267)][_0x13d44d(0x173)] = function (_0x25d8a5) {
                var _0x11f4e0 = _0x13d44d;
                return this[_0x11f4e0(0x16f)]['binary'] = _0x25d8a5, this;
              };
            },
            0xe5e: function _(_0x152b6b, _0x233e28, _0x1ef729) {
              var _0x358d99 = a1_0x1adc,
                  _0x594b6d = _0x1ef729(0x105b),
                  _0x22ae44 = _0x1ef729(0x4cb)(_0x358d99(0x182));

              _0x152b6b[_0x358d99(0x10f)] = function (_0x3bfadc, _0x522ad8) {
                var _0x3694b1 = _0x358d99,
                    _0x590713 = _0x3bfadc;
                _0x522ad8 = _0x522ad8 || 'undefined' != typeof location && location, null == _0x3bfadc && (_0x3bfadc = _0x522ad8[_0x3694b1(0x280)] + '//' + _0x522ad8['host']), 'string' == typeof _0x3bfadc && ('/' === _0x3bfadc[_0x3694b1(0x382)](0x0) && (_0x3bfadc = '/' === _0x3bfadc[_0x3694b1(0x382)](0x1) ? _0x522ad8['protocol'] + _0x3bfadc : _0x522ad8[_0x3694b1(0x4a9)] + _0x3bfadc), /^(https?|wss?):\/\//[_0x3694b1(0x4cc)](_0x3bfadc) || (_0x22ae44(_0x3694b1(0x155), _0x3bfadc), _0x3bfadc = void 0x0 !== _0x522ad8 ? _0x522ad8[_0x3694b1(0x280)] + '//' + _0x3bfadc : _0x3694b1(0x480) + _0x3bfadc), _0x22ae44(_0x3694b1(0x2a6), _0x3bfadc), _0x590713 = _0x594b6d(_0x3bfadc)), _0x590713[_0x3694b1(0x226)] || (/^(http|ws)$/['test'](_0x590713[_0x3694b1(0x280)]) ? _0x590713['port'] = '80' : /^(http|ws)s$/[_0x3694b1(0x4cc)](_0x590713[_0x3694b1(0x280)]) && (_0x590713[_0x3694b1(0x226)] = '443')), _0x590713[_0x3694b1(0x1c3)] = _0x590713['path'] || '/';

                var _0x23611b = -0x1 !== _0x590713[_0x3694b1(0x4a9)]['indexOf'](':') ? '[' + _0x590713[_0x3694b1(0x4a9)] + ']' : _0x590713[_0x3694b1(0x4a9)];

                return _0x590713['id'] = _0x590713[_0x3694b1(0x280)] + _0x3694b1(0x34e) + _0x23611b + ':' + _0x590713[_0x3694b1(0x226)], _0x590713[_0x3694b1(0x198)] = _0x590713[_0x3694b1(0x280)] + _0x3694b1(0x34e) + _0x23611b + (_0x522ad8 && _0x522ad8[_0x3694b1(0x226)] === _0x590713[_0x3694b1(0x226)] ? '' : ':' + _0x590713[_0x3694b1(0x226)]), _0x590713;
              };
            },
            0x916: function _(_0x422ac5, _0x4fc5a5, _0x5e1ae9) {
              var _0x1c92f8 = a1_0x1adc,
                  _0x14dc52 = _0x5e1ae9(0x16c2),
                  _0x40a77c = _0x5e1ae9(0x17b2),
                  _0x520111 = Object[_0x1c92f8(0x267)]['toString'],
                  _0x333293 = _0x1c92f8(0x23a) == typeof Blob || 'undefined' != typeof Blob && _0x1c92f8(0x177) === _0x520111['call'](Blob),
                  _0x379551 = _0x1c92f8(0x23a) == typeof File || _0x1c92f8(0x121) != typeof File && _0x1c92f8(0x195) === _0x520111[_0x1c92f8(0x20b)](File);

              function _0x2eb70d(_0x5bd07c, _0x1f7b32) {
                var _0xfdf7a5 = _0x1c92f8;
                if (!_0x5bd07c) return _0x5bd07c;

                if (_0x40a77c(_0x5bd07c)) {
                  var _0xdb1e49 = {
                    '_placeholder': !0x0,
                    'num': _0x1f7b32['length']
                  };
                  return _0x1f7b32[_0xfdf7a5(0x4c0)](_0x5bd07c), _0xdb1e49;
                }

                if (_0x14dc52(_0x5bd07c)) {
                  for (var _0x372fa0 = new Array(_0x5bd07c[_0xfdf7a5(0x109)]), _0x4ce820 = 0x0; _0x4ce820 < _0x5bd07c[_0xfdf7a5(0x109)]; _0x4ce820++) {
                    _0x372fa0[_0x4ce820] = _0x2eb70d(_0x5bd07c[_0x4ce820], _0x1f7b32);
                  }

                  return _0x372fa0;
                }

                if (_0xfdf7a5(0x26e) == typeof _0x5bd07c && !(_0x5bd07c instanceof Date)) {
                  for (var _0x42bc57 in _0x372fa0 = {}, _0x5bd07c) {
                    _0x372fa0[_0x42bc57] = _0x2eb70d(_0x5bd07c[_0x42bc57], _0x1f7b32);
                  }

                  return _0x372fa0;
                }

                return _0x5bd07c;
              }

              function _0x1cd3e5(_0x1ab2d4, _0x5afa15) {
                var _0x39a058 = _0x1c92f8;
                if (!_0x1ab2d4) return _0x1ab2d4;
                if (_0x1ab2d4 && _0x1ab2d4[_0x39a058(0x29e)]) return _0x5afa15[_0x1ab2d4[_0x39a058(0x3d6)]];

                if (_0x14dc52(_0x1ab2d4)) {
                  for (var _0x43447b = 0x0; _0x43447b < _0x1ab2d4[_0x39a058(0x109)]; _0x43447b++) {
                    _0x1ab2d4[_0x43447b] = _0x1cd3e5(_0x1ab2d4[_0x43447b], _0x5afa15);
                  }
                } else {
                  if (_0x39a058(0x26e) == typeof _0x1ab2d4) {
                    for (var _0x3d7925 in _0x1ab2d4) {
                      _0x1ab2d4[_0x3d7925] = _0x1cd3e5(_0x1ab2d4[_0x3d7925], _0x5afa15);
                    }
                  }
                }

                return _0x1ab2d4;
              }

              _0x4fc5a5[_0x1c92f8(0x47d)] = function (_0xa8c03b) {
                var _0x4c828c = _0x1c92f8,
                    _0x1d1ea1 = [],
                    _0x6bea8d = _0xa8c03b[_0x4c828c(0x28e)],
                    _0x45645a = _0xa8c03b;

                return _0x45645a[_0x4c828c(0x28e)] = _0x2eb70d(_0x6bea8d, _0x1d1ea1), _0x45645a[_0x4c828c(0x2d0)] = _0x1d1ea1['length'], {
                  'packet': _0x45645a,
                  'buffers': _0x1d1ea1
                };
              }, _0x4fc5a5[_0x1c92f8(0x170)] = function (_0x24087f, _0x4a4b97) {
                var _0x4ab6d7 = _0x1c92f8;
                return _0x24087f[_0x4ab6d7(0x28e)] = _0x1cd3e5(_0x24087f['data'], _0x4a4b97), _0x24087f[_0x4ab6d7(0x2d0)] = void 0x0, _0x24087f;
              }, _0x4fc5a5[_0x1c92f8(0x3d4)] = function (_0x40c51f, _0x5b013d) {
                var _0x4512f0 = 0x0,
                    _0x222af9 = _0x40c51f;
                !function _0x4f0070(_0x2ee6d8, _0x54b449, _0x415040) {
                  var _0x55ff72 = a1_0x1adc;
                  if (!_0x2ee6d8) return _0x2ee6d8;

                  if (_0x333293 && _0x2ee6d8 instanceof Blob || _0x379551 && _0x2ee6d8 instanceof File) {
                    _0x4512f0++;

                    var _0xb50b43 = new FileReader();

                    _0xb50b43[_0x55ff72(0x2ff)] = function () {
                      var _0x5c4439 = _0x55ff72;
                      _0x415040 ? _0x415040[_0x54b449] = this[_0x5c4439(0x249)] : _0x222af9 = this['result'], --_0x4512f0 || _0x5b013d(_0x222af9);
                    }, _0xb50b43[_0x55ff72(0x31e)](_0x2ee6d8);
                  } else {
                    if (_0x14dc52(_0x2ee6d8)) {
                      for (var _0x551351 = 0x0; _0x551351 < _0x2ee6d8[_0x55ff72(0x109)]; _0x551351++) {
                        _0x4f0070(_0x2ee6d8[_0x551351], _0x551351, _0x2ee6d8);
                      }
                    } else {
                      if (_0x55ff72(0x26e) == typeof _0x2ee6d8 && !_0x40a77c(_0x2ee6d8)) {
                        for (var _0x21466 in _0x2ee6d8) {
                          _0x4f0070(_0x2ee6d8[_0x21466], _0x21466, _0x2ee6d8);
                        }
                      }
                    }
                  }
                }(_0x222af9), _0x4512f0 || _0x5b013d(_0x222af9);
              };
            },
            0x2399: function _(_0x1a4bd5, _0x1a3d8d, _0x198cb6) {
              var _0x533fd4 = a1_0x1adc,
                  _0x168972 = _0x198cb6(0x4cb)('socket.io-parser'),
                  _0x400537 = _0x198cb6(0x223f),
                  _0x2da54f = _0x198cb6(0x916),
                  _0x3105d5 = _0x198cb6(0x16c2),
                  _0x354716 = _0x198cb6(0x17b2);

              function _0x3eddb2() {}

              _0x1a3d8d['protocol'] = 0x4, _0x1a3d8d[_0x533fd4(0x128)] = [_0x533fd4(0x339), _0x533fd4(0x3c0), _0x533fd4(0x3b7), _0x533fd4(0x186), _0x533fd4(0x28c), _0x533fd4(0x127), _0x533fd4(0x14f)], _0x1a3d8d[_0x533fd4(0x339)] = 0x0, _0x1a3d8d[_0x533fd4(0x3c0)] = 0x1, _0x1a3d8d[_0x533fd4(0x3b7)] = 0x2, _0x1a3d8d[_0x533fd4(0x186)] = 0x3, _0x1a3d8d[_0x533fd4(0x28c)] = 0x4, _0x1a3d8d[_0x533fd4(0x127)] = 0x5, _0x1a3d8d[_0x533fd4(0x14f)] = 0x6, _0x1a3d8d[_0x533fd4(0x15c)] = _0x3eddb2, _0x1a3d8d[_0x533fd4(0x4b7)] = _0x4142fd;

              var _0x564f3e = _0x1a3d8d[_0x533fd4(0x28c)] + _0x533fd4(0x35c);

              function _0x1393d6(_0x2eb883) {
                var _0x40f971 = _0x533fd4,
                    _0x4c18c2 = '' + _0x2eb883[_0x40f971(0x1bd)];

                if (_0x1a3d8d['BINARY_EVENT'] !== _0x2eb883[_0x40f971(0x1bd)] && _0x1a3d8d[_0x40f971(0x14f)] !== _0x2eb883[_0x40f971(0x1bd)] || (_0x4c18c2 += _0x2eb883[_0x40f971(0x2d0)] + '-'), _0x2eb883[_0x40f971(0x1c2)] && '/' !== _0x2eb883['nsp'] && (_0x4c18c2 += _0x2eb883['nsp'] + ','), null != _0x2eb883['id'] && (_0x4c18c2 += _0x2eb883['id']), null != _0x2eb883['data']) {
                  var _0x4d3a30 = function (_0x5dd351) {
                    var _0x46aba8 = _0x40f971;

                    try {
                      return JSON[_0x46aba8(0x2eb)](_0x5dd351);
                    } catch (_0x56842b) {
                      return !0x1;
                    }
                  }(_0x2eb883[_0x40f971(0x28e)]);

                  if (!0x1 === _0x4d3a30) return _0x564f3e;
                  _0x4c18c2 += _0x4d3a30;
                }

                return _0x168972('encoded\x20%j\x20as\x20%s', _0x2eb883, _0x4c18c2), _0x4c18c2;
              }

              function _0x4142fd() {
                var _0x99d03a = _0x533fd4;
                this[_0x99d03a(0x3b5)] = null;
              }

              function _0x227a54(_0x49d68a) {
                var _0x1de7e0 = _0x533fd4;
                this['reconPack'] = _0x49d68a, this[_0x1de7e0(0x3b8)] = [];
              }

              function _0x470f0a(_0x290fa4) {
                var _0x58938f = _0x533fd4;
                return {
                  'type': _0x1a3d8d[_0x58938f(0x28c)],
                  'data': _0x58938f(0x3c1) + _0x290fa4
                };
              }

              _0x3eddb2[_0x533fd4(0x267)][_0x533fd4(0x2bf)] = function (_0x4a29f5, _0x3045cf) {
                var _0x5d5e1e = _0x533fd4;
                _0x168972(_0x5d5e1e(0x311), _0x4a29f5), _0x1a3d8d[_0x5d5e1e(0x127)] === _0x4a29f5[_0x5d5e1e(0x1bd)] || _0x1a3d8d[_0x5d5e1e(0x14f)] === _0x4a29f5[_0x5d5e1e(0x1bd)] ? function (_0x373ecd, _0x2a6fec) {
                  var _0x477edd = _0x5d5e1e;

                  _0x2da54f[_0x477edd(0x3d4)](_0x373ecd, function (_0x83d327) {
                    var _0x11fb89 = _0x477edd,
                        _0x5905ba = _0x2da54f[_0x11fb89(0x47d)](_0x83d327),
                        _0x33a637 = _0x1393d6(_0x5905ba[_0x11fb89(0x43e)]),
                        _0x2e9238 = _0x5905ba[_0x11fb89(0x3b8)];

                    _0x2e9238[_0x11fb89(0x2f6)](_0x33a637), _0x2a6fec(_0x2e9238);
                  });
                }(_0x4a29f5, _0x3045cf) : _0x3045cf([_0x1393d6(_0x4a29f5)]);
              }, _0x400537(_0x4142fd[_0x533fd4(0x267)]), _0x4142fd[_0x533fd4(0x267)][_0x533fd4(0x1a2)] = function (_0x220f8f) {
                var _0x511fb6 = _0x533fd4,
                    _0x4061e6;

                if ('string' == typeof _0x220f8f) _0x4061e6 = function (_0x33ca06) {
                  var _0x514bbb = a1_0x1adc,
                      _0x1d3e0b = 0x0,
                      _0x36f6b6 = {
                    'type': Number(_0x33ca06[_0x514bbb(0x382)](0x0))
                  };
                  if (null == _0x1a3d8d[_0x514bbb(0x128)][_0x36f6b6[_0x514bbb(0x1bd)]]) return _0x470f0a('unknown\x20packet\x20type\x20' + _0x36f6b6[_0x514bbb(0x1bd)]);

                  if (_0x1a3d8d[_0x514bbb(0x127)] === _0x36f6b6['type'] || _0x1a3d8d[_0x514bbb(0x14f)] === _0x36f6b6[_0x514bbb(0x1bd)]) {
                    for (var _0x37b0af = _0x1d3e0b + 0x1; '-' !== _0x33ca06['charAt'](++_0x1d3e0b) && _0x1d3e0b != _0x33ca06['length'];) {}

                    var _0x586d14 = _0x33ca06[_0x514bbb(0x495)](_0x37b0af, _0x1d3e0b);

                    if (_0x586d14 != Number(_0x586d14) || '-' !== _0x33ca06['charAt'](_0x1d3e0b)) throw new Error(_0x514bbb(0x409));
                    _0x36f6b6['attachments'] = Number(_0x586d14);
                  }

                  if ('/' === _0x33ca06[_0x514bbb(0x382)](_0x1d3e0b + 0x1)) {
                    for (_0x37b0af = _0x1d3e0b + 0x1; ++_0x1d3e0b && ',' !== (_0x1ff8fb = _0x33ca06['charAt'](_0x1d3e0b)) && _0x1d3e0b !== _0x33ca06[_0x514bbb(0x109)];) {}

                    _0x36f6b6[_0x514bbb(0x1c2)] = _0x33ca06[_0x514bbb(0x495)](_0x37b0af, _0x1d3e0b);
                  } else _0x36f6b6[_0x514bbb(0x1c2)] = '/';

                  var _0x5385cb = _0x33ca06[_0x514bbb(0x382)](_0x1d3e0b + 0x1);

                  if ('' !== _0x5385cb && Number(_0x5385cb) == _0x5385cb) {
                    for (_0x37b0af = _0x1d3e0b + 0x1; ++_0x1d3e0b;) {
                      var _0x1ff8fb;

                      if (null == (_0x1ff8fb = _0x33ca06['charAt'](_0x1d3e0b)) || Number(_0x1ff8fb) != _0x1ff8fb) {
                        --_0x1d3e0b;
                        break;
                      }

                      if (_0x1d3e0b === _0x33ca06[_0x514bbb(0x109)]) break;
                    }

                    _0x36f6b6['id'] = Number(_0x33ca06['substring'](_0x37b0af, _0x1d3e0b + 0x1));
                  }

                  if (_0x33ca06[_0x514bbb(0x382)](++_0x1d3e0b)) {
                    var _0x4b10f6 = function (_0x343c7d) {
                      var _0x436fab = _0x514bbb;

                      try {
                        return JSON[_0x436fab(0x41c)](_0x343c7d);
                      } catch (_0x1659ca) {
                        return !0x1;
                      }
                    }(_0x33ca06[_0x514bbb(0x1ba)](_0x1d3e0b));

                    if (!0x1 === _0x4b10f6 || _0x36f6b6[_0x514bbb(0x1bd)] !== _0x1a3d8d[_0x514bbb(0x28c)] && !_0x3105d5(_0x4b10f6)) return _0x470f0a('invalid\x20payload');
                    _0x36f6b6[_0x514bbb(0x28e)] = _0x4b10f6;
                  }

                  return _0x168972(_0x514bbb(0x26c), _0x33ca06, _0x36f6b6), _0x36f6b6;
                }(_0x220f8f), _0x1a3d8d['BINARY_EVENT'] === _0x4061e6['type'] || _0x1a3d8d[_0x511fb6(0x14f)] === _0x4061e6[_0x511fb6(0x1bd)] ? (this['reconstructor'] = new _0x227a54(_0x4061e6), 0x0 === this[_0x511fb6(0x3b5)]['reconPack'][_0x511fb6(0x2d0)] && this[_0x511fb6(0x426)](_0x511fb6(0x473), _0x4061e6)) : this[_0x511fb6(0x426)](_0x511fb6(0x473), _0x4061e6);else {
                  if (!_0x354716(_0x220f8f) && !_0x220f8f[_0x511fb6(0x49c)]) throw new Error('Unknown\x20type:\x20' + _0x220f8f);
                  if (!this['reconstructor']) throw new Error(_0x511fb6(0x356));
                  (_0x4061e6 = this['reconstructor']['takeBinaryData'](_0x220f8f)) && (this[_0x511fb6(0x3b5)] = null, this[_0x511fb6(0x426)](_0x511fb6(0x473), _0x4061e6));
                }
              }, _0x4142fd[_0x533fd4(0x267)][_0x533fd4(0x125)] = function () {
                var _0x548662 = _0x533fd4;
                this[_0x548662(0x3b5)] && this[_0x548662(0x3b5)]['finishedReconstruction']();
              }, _0x227a54[_0x533fd4(0x267)][_0x533fd4(0x2b9)] = function (_0x1874b2) {
                var _0x31e639 = _0x533fd4;

                if (this[_0x31e639(0x3b8)][_0x31e639(0x4c0)](_0x1874b2), this[_0x31e639(0x3b8)][_0x31e639(0x109)] === this[_0x31e639(0x11e)][_0x31e639(0x2d0)]) {
                  var _0x2aa5e5 = _0x2da54f[_0x31e639(0x170)](this[_0x31e639(0x11e)], this['buffers']);

                  return this[_0x31e639(0x37c)](), _0x2aa5e5;
                }

                return null;
              }, _0x227a54[_0x533fd4(0x267)][_0x533fd4(0x37c)] = function () {
                var _0x133557 = _0x533fd4;
                this[_0x133557(0x11e)] = null, this[_0x133557(0x3b8)] = [];
              };
            },
            0x17b2: function _(_0x1d4e79) {
              var _0x11afb5 = a1_0x1adc;

              _0x1d4e79[_0x11afb5(0x10f)] = function (_0x4204be) {
                return _0x5d2270 && Buffer['isBuffer'](_0x4204be) || _0x2f1553 && (_0x4204be instanceof ArrayBuffer || function (_0x255bd9) {
                  var _0x484425 = a1_0x1adc;
                  return 'function' == typeof ArrayBuffer[_0x484425(0x3af)] ? ArrayBuffer['isView'](_0x255bd9) : _0x255bd9['buffer'] instanceof ArrayBuffer;
                }(_0x4204be));
              };

              var _0x5d2270 = _0x11afb5(0x23a) == typeof Buffer && _0x11afb5(0x23a) == typeof Buffer[_0x11afb5(0x161)],
                  _0x2f1553 = _0x11afb5(0x23a) == typeof ArrayBuffer;
            },
            0xfca: function _(_0x3c9c3e) {
              var _0x129897 = a1_0x1adc;

              _0x3c9c3e[_0x129897(0x10f)] = function (_0x37b4c2, _0x16498f) {
                var _0x46fe3e = _0x129897;

                for (var _0x24182d = [], _0x12d9c8 = (_0x16498f = _0x16498f || 0x0) || 0x0; _0x12d9c8 < _0x37b4c2[_0x46fe3e(0x109)]; _0x12d9c8++) {
                  _0x24182d[_0x12d9c8 - _0x16498f] = _0x37b4c2[_0x12d9c8];
                }

                return _0x24182d;
              };
            },
            0x8e9: function _(_0x22d427) {
              var _0x195fe0 = a1_0x1adc;

              var _0x129e4d,
                  _0x5493fa = _0x195fe0(0x124)[_0x195fe0(0x194)](''),
                  _0xf3351e = {},
                  _0x1b9978 = 0x0,
                  _0x46357e = 0x0;

              function _0x498d75(_0x1eb8e4) {
                var _0x17d36b = _0x195fe0,
                    _0x49a2b3 = '';

                do {
                  _0x49a2b3 = _0x5493fa[_0x1eb8e4 % 0x40] + _0x49a2b3, _0x1eb8e4 = Math[_0x17d36b(0x38b)](_0x1eb8e4 / 0x40);
                } while (_0x1eb8e4 > 0x0);

                return _0x49a2b3;
              }

              function _0x136942() {
                var _0x2ef739 = _0x498d75(+new Date());

                return _0x2ef739 !== _0x129e4d ? (_0x1b9978 = 0x0, _0x129e4d = _0x2ef739) : _0x2ef739 + '.' + _0x498d75(_0x1b9978++);
              }

              for (; _0x46357e < 0x40; _0x46357e++) {
                _0xf3351e[_0x5493fa[_0x46357e]] = _0x46357e;
              }

              _0x136942[_0x195fe0(0x2bf)] = _0x498d75, _0x136942[_0x195fe0(0x2a8)] = function (_0x44990c) {
                var _0x2e7355 = _0x195fe0,
                    _0x38203e = 0x0;

                for (_0x46357e = 0x0; _0x46357e < _0x44990c[_0x2e7355(0x109)]; _0x46357e++) {
                  _0x38203e = 0x40 * _0x38203e + _0xf3351e[_0x44990c[_0x2e7355(0x382)](_0x46357e)];
                }

                return _0x38203e;
              }, _0x22d427['exports'] = _0x136942;
            },
            0x1b6c: function _() {}
          }, _0x41a2b3 = {}, function _0x16f948(_0x4a7bea) {
            var _0x374a12 = a1_0x1adc,
                _0x9c69f3 = _0x41a2b3[_0x4a7bea];
            if (void 0x0 !== _0x9c69f3) return _0x9c69f3[_0x374a12(0x10f)];

            var _0x42fc04 = _0x41a2b3[_0x4a7bea] = {
              'exports': {}
            };

            return _0x46691d[_0x4a7bea][_0x374a12(0x20b)](_0x42fc04[_0x374a12(0x10f)], _0x42fc04, _0x42fc04[_0x374a12(0x10f)], _0x16f948), _0x42fc04[_0x374a12(0x10f)];
          }(0x370);

          var _0x46691d, _0x41a2b3;
        }); // #endregion ORIGINAL CODE

        _cjsExports = exports('default', module.exports);
        module.exports.GameNetwork;
      }, {});
    }
  };
});

System.register("chunks:///_virtual/game-network.mjs_cjs=&original=.js", ['./game-network.js', './cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var __cjsMetaURL, loader;

  return {
    setters: [function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }, function (module) {
      loader = module.default;
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './game-network.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./game-network.js', module.meta.url);
      }

      loader.require(__cjsMetaURL);
    }
  };
});

System.register("chunks:///_virtual/index.js", ['./cjs-loader.mjs', './Map.js'], function (exports, module) {
  'use strict';

  var loader, __cjsMetaURL$1;

  return {
    setters: [function (module) {
      loader = module.default;
    }, function (module) {
      __cjsMetaURL$1 = module.__cjsMetaURL;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);

      loader.define(__cjsMetaURL, function (exports$1, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        var Map = require("./Map");

        module.exports = {};
        module.exports.Map = Map; // #endregion ORIGINAL CODE

        _cjsExports = exports('default', module.exports);
        module.exports.Map;
      }, function () {
        return {
          './Map': __cjsMetaURL$1
        };
      });
    }
  };
});

System.register("chunks:///_virtual/index.mjs_cjs=&original=.js", ['./index.js', './cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var __cjsMetaURL, loader;

  return {
    setters: [function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }, function (module) {
      loader = module.default;
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './index.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./index.js', module.meta.url);
      }

      loader.require(__cjsMetaURL);
    }
  };
});

System.register("chunks:///_virtual/Map.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);

      loader.define(__cjsMetaURL, function (exports$1, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        var MIN_TIME_SCALE = 1;
        var MAX_TIME_SCALE = 2;

        var Map = /*#__PURE__*/function () {
          function Map(config, fishInfo) {
            var _this = this;

            this._config = Object.assign(Object.create(null), config);
            var gridSizeX = config.gridSizeX,
                gridSizeY = config.gridSizeY,
                gridWidth = config.gridWidth,
                gridHeight = config.gridHeight,
                spawners = config.spawners,
                obstacles = config.obstacles,
                stopPoints = config.stopPoints;
            this.gridSizeX = gridSizeX;
            this.gridSizeY = gridSizeY;
            this.gridWidth = gridWidth;
            this.gridHeight = gridHeight;
            this._config.startX = this.startX = (gridSizeY - gridSizeX) / 2 * (gridWidth / 2);
            this._config.startY = this.startY = (gridSizeX + gridSizeY) / 2 * (gridHeight / 2);
            this._config.spawners = spawners || {};
            this._config.obstacles = obstacles || {};
            this._config.stopPoints = stopPoints || [];
            this._fishes = [];
            this._fishCount = 0;
            this.fishInfo = fishInfo;
            this.fishInfoList = Object.values(this.fishInfo);
            this._fishSize = 1;
            this.groupTypes = [[0, 1, 2, 3, 4, 5, 6, 7, 8]];
            this._directions = {
              "UP": -this.gridSizeX,
              "DOWN": this.gridSizeX,
              "LEFT": -1,
              "RIGHT": 1
            };
            this.topSpawners = [];
            this.leftSpawners = [];
            this.rightSpawners = [];
            window.map = this;
            this._stopPointCounters = {};

            this._config.stopPoints.forEach(function (id) {
              _this._stopPointCounters[id] = 0;
            });
          }

          var _proto = Map.prototype;

          _proto.addObstacle = function addObstacle(gridId) {
            this._config.obstacles[gridId] = 1;
          };

          _proto.addSpawner = function addSpawner(gridId) {
            this._config.spawners[gridId] = 0;
          };

          _proto.addStopPoint = function addStopPoint(gridId) {
            if (this.isOutScreen(gridId)) return;

            this._config.stopPoints.push(gridId);
          };

          _proto.getConfig = function getConfig() {
            return this._config;
          };

          _proto.clear = function clear() {
            this._config.spawners = {};
            this._config.obstacles = {};
            this._config.stopPoints = [];
          };

          _proto.positionToGrid = function positionToGrid(x, y) {
            var X = Math.floor((x - this.startX) / this.gridWidth + (this.startY - y) / this.gridHeight);
            var Y = Math.floor((this.startY - y) / this.gridHeight - (x - this.startX) / this.gridWidth);
            return {
              X: X,
              Y: Y
            };
          };

          _proto.gridToPosition = function gridToPosition(X, Y) {
            var x = this.startX + (X - Y) * this.gridWidth / 2;
            var y = this.startY - (X + Y) * this.gridHeight / 2;
            return {
              x: x,
              y: y
            };
          };

          _proto.gridCenterToPosition = function gridCenterToPosition(grid, Y) {
            var X = grid;

            if (Y === undefined) {
              X = grid.X;
              Y = grid.Y;
            }

            var x = this.startX + (X - Y) * this.gridWidth / 2;
            var y = this.startY - (X + Y + 1) * this.gridHeight / 2;
            return {
              x: x,
              y: y
            };
          };

          _proto.idToGrid = function idToGrid(gridId) {
            var X = gridId % this.gridSizeX;
            var Y = Math.floor(gridId / this.gridSizeX);
            return {
              X: X,
              Y: Y
            };
          };

          _proto.gridToId = function gridToId(grid, Y) {
            var X = grid;

            if (typeof grid === 'object') {
              X = grid.X;
              Y = grid.Y;
            }

            return Y * this.gridSizeX + X;
          };

          _proto.isObstacle = function isObstacle(point) {
            var gridId = typeof point === "number" ? point : this.gridToId(point);
            return this._config.obstacles[gridId];
          };

          _proto.isOutScreen = function isOutScreen(point, Y) {
            var grid, X;

            if (Y === undefined) {
              grid = typeof point === "number" ? this.idToGrid(point) : point;
              X = grid.X;
              Y = grid.Y;
            } else {
              X = point;
            }

            if (X + Y < this.gridSizeX / 2 - 1) return true;
            if (X + Y > this.gridSizeX * 3 / 2) return true;
            if (Y - X > this.gridSizeX / 2 + 1) return true;
            if (X - Y > this.gridSizeX / 2 + 1) return true;
            return false;
          };

          _proto._scanFishes = function _scanFishes() {
            this._fishMap = {};
            this._currentTime = Date.now();

            for (var index = this._fishes.length - 1; index >= 0; index--) {
              var fishData = this._fishes[index];
              var buildTick = fishData.buildTick,
                  timeToExpire = fishData.timeToExpire;

              if (this._currentTime > buildTick + timeToExpire * 1000) {
                this._fishes.splice(index, 1);
              }
            }
          };

          _proto._getCurrentGrid = function _getCurrentGrid(fishData) {};

          _proto.resumeFishes = function resumeFishes() {
            var currentFishes = this._fishes.map(function (fishData) {
              return Object.assign(Object.create(null), fishData);
            });

            currentFishes.forEach(function (fishData) {
              return fishData.isResume = true;
            });

            this._scanFishes();

            return this._fishes;
          };

          _proto.createFishes = function createFishes() {
            this._scanFishes();

            var fishList = [];

            for (var index = 0; index < 9; index++) {
              if (this._fishes.length >= 50) return fishList;
              var fishInfo = this.randomElement(this.fishInfoList);

              if (fishInfo.FishKind <= 3) {
                var fishes = this.createFishGroup(fishInfo);
                fishList = fishList.concat(fishes);
              } else {
                var fishData = this._createNewFish(fishInfo);

                var path = this._genPath(fishInfo.size);

                path = this._interpolatePathOnce(path);
                fishData.timeScale = this.randRange(MIN_TIME_SCALE, MAX_TIME_SCALE);

                this._decoPath(fishData, path);

                fishList.push(fishData);
              }
            }

            return fishList;
          };

          _proto._createNewFish = function _createNewFish(fishInfo) {
            fishInfo = fishInfo || this.randomElement(this.fishInfoList);
            var fishData = {};
            var _fishInfo = fishInfo,
                FishKind = _fishInfo.FishKind,
                timeStep = _fishInfo.timeStep,
                size = _fishInfo.size;
            fishData.FishKind = FishKind;
            fishData.timeStep = timeStep;
            fishData.size = size;
            fishData.FishID = ++this._fishCount;
            fishData.dx = this.randIntRange(-this.gridWidth / 2.5, this.gridWidth / 2.5);
            fishData.dy = this.randIntRange(-this.gridHeight / 2.5, this.gridHeight / 2.5);
            fishData.buildTick = Date.now();

            this._fishes.push(fishData);

            return fishData;
          };

          _proto._genPath = function _genPath(size, stopPointCount) {
            var _this2 = this;

            if (size === void 0) {
              size = 1;
            }

            if (stopPointCount === void 0) {
              stopPointCount = 2;
            }

            var spawners = this._config.spawners;
            var sortSpawners = this.shuffleArr(Object.keys(spawners)).sort(function (a, b) {
              return spawners[a] - spawners[b];
            });
            var startId = sortSpawners[0];
            var endId = sortSpawners[1];
            var stopIds = this.shuffleArr(this._config.stopPoints).sort(function (a, b) {
              return _this2._stopPointCounters[a] - _this2._stopPointCounters[b];
            }).slice(0, stopPointCount);
            var result = [];
            this._fishSize = size;
            this._currentDirection = 0;
            stopIds.unshift(Number(startId));
            stopIds.push(Number(endId));
            spawners[startId]++;
            spawners[endId]++;

            for (var index = 1; index < stopIds.length; index++) {
              var id1 = stopIds[index - 1];
              var id2 = stopIds[index];

              var path = this._findShortedPath(id1, id2, []);

              if (path) {
                result.pop();
                result = result.concat(path);
              }
            }

            if (result.length === 0) {
              debugger;
            }

            return this._getGridPath(result);
          };

          _proto._decoPath = function _decoPath(fishData, path) {
            var timeStep = fishData.timeStep,
                timeScale = fishData.timeScale;
            fishData.path = this._getGridPath(path);
            fishData.Position = this._getIdPath(path);
            fishData.timeToExpire = this._getDistance(fishData.path) * timeStep / timeScale;
          };

          _proto._getIdPath = function _getIdPath(path) {
            var _this3 = this;

            if (typeof path[0] === "number") return path;
            return path.map(function (grid) {
              return _this3.gridToId(grid);
            });
          };

          _proto._getGridPath = function _getGridPath(path) {
            var _this4 = this;

            if (typeof path[0] === "object") return path;
            return path.map(function (id) {
              return _this4.idToGrid(id);
            });
          };

          _proto._getDistance = function _getDistance(path) {
            var len = path.length;
            var distance = 0;

            for (var index = 1; index < len; index++) {
              var p1 = path[index - 1];
              var p2 = path[index];
              distance += Math.abs(p2.X - p1.X + p2.Y - p1.Y);
            }

            return distance;
          };

          _proto.createFishGroup = function createFishGroup(fishInfo) {
            var _this5 = this;

            var fishList = [];

            var path = this._genPath(3, 0);

            this.groupType = this.randomElement(this.groupTypes);

            var paths = this._interpolatePaths(this._getGridPath(path));

            fishInfo = fishInfo || this.randomElement(this.fishInfoList.slice(0, 6));
            paths.forEach(function (path) {
              var timeScale = _this5.randRange(7, 9);

              var fishData = _this5._createFishData({
                path: path,
                timeScale: timeScale,
                fishInfo: fishInfo
              });

              fishList.push(fishData);
              fishData = _this5._createFishData({
                path: path,
                timeScale: timeScale,
                fishInfo: fishInfo
              });
              fishList.push(fishData);
            });
            return fishList;
          };

          _proto._createFishData = function _createFishData(data) {
            var fishData = data.fishData,
                fishInfo = data.fishInfo,
                path = data.path,
                timeScale = data.timeScale,
                stopPointCount = data.stopPointCount;
            fishInfo = fishInfo || this.randomElement(this.fishInfoList);
            fishData = fishData || this._createNewFish(fishInfo);
            fishData.timeScale = timeScale || this.randRange(MIN_TIME_SCALE, MAX_TIME_SCALE);
            path = path || this._genPath(fishInfo.size, stopPointCount);

            this._decoPath(fishData, path);

            return fishData;
          };

          _proto._interpolatePaths = function _interpolatePaths(path) {
            var _this6 = this;

            var paths = [];

            var _loop = function _loop(offsetX) {
              var _loop2 = function _loop2(offsetY) {
                if (!_this6.groupType.includes(3 * (offsetY + 1) + (offsetX + 1))) return "continue";
                var newPath = [];
                path.forEach(function (_ref) {
                  var X = _ref.X,
                      Y = _ref.Y;
                  newPath.push({
                    X: X + offsetX,
                    Y: Y + offsetY
                  });
                });
                paths.push(newPath);
              };

              for (var offsetY = -1; offsetY <= 1; offsetY++) {
                var _ret = _loop2(offsetY);

                if (_ret === "continue") continue;
              }
            };

            for (var offsetX = -1; offsetX <= 1; offsetX++) {
              _loop(offsetX);
            }

            return paths;
          };

          _proto._interpolatePathOnce = function _interpolatePathOnce(path) {
            path = this._getGridPath(path);
            var newPath = [];
            var offsetX = this.randIntRange(-1, 1);
            var offsetY = this.randIntRange(-1, 1);
            path.forEach(function (_ref2) {
              var X = _ref2.X,
                  Y = _ref2.Y;
              newPath.push({
                X: X + offsetX,
                Y: Y + offsetY
              });
            });
            return newPath;
          };

          _proto.shuffleArr = function shuffleArr(arr) {
            return arr.slice().sort(function () {
              return Math.random() - 0.5;
            });
          };

          _proto._interpolate = function _interpolate(_ref3) {
            var X = _ref3.X,
                Y = _ref3.Y;
            if (this._fishSize === 3) return {
              X: X,
              Y: Y
            };
            return {
              X: this.randIntRange(X - 1, X + 1),
              Y: this.randIntRange(Y - 1, Y + 1)
            };
          };

          _proto._getDirection = function _getDirection(p1, p2) {
            if (p1.Y > p2.Y) return -this.gridSizeX;
            if (p1.Y < p2.Y) return this.gridSizeX;
            if (p1.X > p2.X) return -1;
            if (p1.X < p2.X) return 1;
          };

          _proto._validateLine = function _validateLine(p1, p2) {
            if (p1.X !== p2.X && p1.Y !== p2.Y) {
              debugger;
              return false;
            }

            var offset = (this._fishSize - 1) / 2;

            for (var X = Math.min(p1.X, p2.X) - offset; X <= Math.max(p1.X, p2.X) + offset; X++) {
              for (var Y = Math.min(p1.Y, p2.Y) - offset; Y <= Math.max(p1.Y, p2.Y) + offset; Y++) {
                var gridId = Y * this.gridSizeX + X;
                if (this.isObstacle(gridId)) return false;
              }
            }

            return true;
          };

          _proto._canMove = function _canMove(point) {
            var grid = typeof point === 'object' ? point : this.idToGrid(point);
            var X = grid.X,
                Y = grid.Y;
            var offset = (this._fishSize - 1) / 2;

            for (var x = X - offset; x <= X + offset; x++) {
              for (var y = Y - offset; y <= Y + offset; y++) {
                var id = this.gridToId(x, y);
                if (this.isObstacle(id)) return false;
                if (this.isOutScreen(id)) return false;
              }
            }

            return true;
          };

          _proto.randomElement = function randomElement(arr) {
            if (!arr) debugger;
            return arr[Math.floor(Math.random() * arr.length)];
          };

          _proto.randIntRange = function randIntRange(min, max) {
            return min + Math.round(Math.random() * (max - min));
          };

          _proto.randRange = function randRange(min, max) {
            return min + Math.random() * (max - min);
          };

          _proto.pickOutRandomElements = function pickOutRandomElements(arr, total) {
            if (arr.length < total) return console.error("invalid arr", arr, total);
            var results = [];

            for (var index = 0; index < total; index++) {
              var randomIndex = this.randIntRange(0, arr.length - 1);
              results.push(arr.splice(randomIndex, 1)[0]);
            }

            return results;
          };

          _proto.getTestFish = function getTestFish(p1, p2) {
            var spawners = this.shuffleArr(Object.keys(this._config.spawners));
            var id1 = p1 ? this.gridToId(p1) : 1 * spawners[0];
            var id2 = p2 ? this.gridToId(p2) : 1 * spawners[1];
            this._fishSize = 3;

            var path = this._findShortedPath(id1, id2, []);

            var fishData = this._createFishData({
              path: path
            });

            return fishData;
          };

          _proto._findShortedPath = function _findShortedPath(id1, id2, path) {
            if (path === void 0) {
              path = [];
            }

            if (!path.includes(id1)) {
              path.push(id1);
            }

            var directions = this._getAvailableDirections(id1, id2);

            for (var index = 0; index < directions.length; index++) {
              var direction = directions[index];
              var nextId = id1 + 3 * this._directions[direction];

              if (nextId === id2) {
                path.push(nextId);
                return path;
              }

              if (path.includes(nextId)) continue;
              if (!this._isCanMove(nextId)) continue;
              if (this._currentDirection + this._directions[direction] === 0) continue;
              this._currentDirection = this._directions[direction];

              var clonePath = this._findShortedPath(nextId, id2, path.slice());

              if (clonePath) return clonePath;
            }

            return null;
          };

          _proto._getAvailableDirections = function _getAvailableDirections(id1, id2) {
            var _this7 = this;

            var highOrderDirections = this._getPrioritizedDirection(id1, id2);

            this.shuffleArr(Object.keys(this._directions)).forEach(function (direction) {
              if (_this7._currentDirection + _this7._directions[direction] === 0) return; // no turn back

              if (!highOrderDirections.includes(direction)) {
                highOrderDirections.push(direction);
              }
            });
            return highOrderDirections;
          };

          _proto._getPrioritizedDirection = function _getPrioritizedDirection(id1, id2) {
            var p1 = this.idToGrid(id1);
            var p2 = this.idToGrid(id2);
            var directX = p2.X > p1.X ? "RIGHT" : "LEFT";
            var directY = p2.Y > p1.Y ? "DOWN" : "UP";
            if (p2.X === p1.X) return [directY];
            if (p2.Y === p1.Y) return [directX];
            return Math.abs(p2.X - p1.X) > Math.abs(p2.Y - p1.Y) ? [directX, directY] : [directY, directX];
          };

          _proto._isCanMove = function _isCanMove(gridId) {
            return this._config.spawners[gridId] !== void 0 || this._config.stopPoints.includes(gridId);
          };

          return Map;
        }();

        module.exports = Map;
        module.exports.Map = Map; // #endregion ORIGINAL CODE

        _cjsExports = exports('default', module.exports);
        module.exports.Map;
      }, {});
    }
  };
});

System.register("chunks:///_virtual/Map.mjs_cjs=&original=.js", ['./Map.js', './cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var __cjsMetaURL, loader;

  return {
    setters: [function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }, function (module) {
      loader = module.default;
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './Map.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./Map.js', module.meta.url);
      }

      loader.require(__cjsMetaURL);
    }
  };
});

System.register("chunks:///_virtual/rollupPluginModLoBabelHelpers.js", [], function (exports) {
  'use strict';

  return {
    execute: function () {
      exports({
        applyDecoratedDescriptor: _applyDecoratedDescriptor,
        assertThisInitialized: _assertThisInitialized,
        createClass: _createClass,
        extends: _extends,
        inheritsLoose: _inheritsLoose,
        initializerDefineProperty: _initializerDefineProperty,
        setPrototypeOf: _setPrototypeOf
      });

      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
          writable: false
        });
        return Constructor;
      }

      function _extends() {
        _extends = exports('extends', Object.assign ? Object.assign.bind() : function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        });
        return _extends.apply(this, arguments);
      }

      function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;

        _setPrototypeOf(subClass, superClass);
      }

      function _setPrototypeOf(o, p) {
        _setPrototypeOf = exports('setPrototypeOf', Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
          o.__proto__ = p;
          return o;
        });
        return _setPrototypeOf(o, p);
      }

      function _assertThisInitialized(self) {
        if (self === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return self;
      }

      function _initializerDefineProperty(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
          enumerable: descriptor.enumerable,
          configurable: descriptor.configurable,
          writable: descriptor.writable,
          value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
      }

      function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object.keys(descriptor).forEach(function (key) {
          desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
          desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
          return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
          desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
          desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
          Object.defineProperty(target, property, desc);
          desc = null;
        }

        return desc;
      }
    }
  };
});

System.register("chunks:///_virtual/state-machine.min.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);

      loader.define(__cjsMetaURL, function (exports$1, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        !function (t, n) {
          "object" == typeof exports$1 && "object" == typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define("StateMachine", [], n) : "object" == typeof exports$1 ? exports$1.StateMachine = n() : t.StateMachine = n();
        }(this, function () {
          return function (t) {
            function n(e) {
              if (i[e]) return i[e].exports;
              var s = i[e] = {
                i: e,
                l: !1,
                exports: {}
              };
              return t[e].call(s.exports, s, s.exports, n), s.l = !0, s.exports;
            }

            var i = {};
            return n.m = t, n.c = i, n.i = function (t) {
              return t;
            }, n.d = function (t, i, e) {
              n.o(t, i) || Object.defineProperty(t, i, {
                configurable: !1,
                enumerable: !0,
                get: e
              });
            }, n.n = function (t) {
              var i = t && t.__esModule ? function () {
                return t["default"];
              } : function () {
                return t;
              };
              return n.d(i, "a", i), i;
            }, n.o = function (t, n) {
              return Object.prototype.hasOwnProperty.call(t, n);
            }, n.p = "", n(n.s = 5);
          }([function (t, n, i) {
            t.exports = function (t, n) {
              var i, e, s;

              for (i = 1; i < arguments.length; i++) {
                e = arguments[i];

                for (s in e) {
                  e.hasOwnProperty(s) && (t[s] = e[s]);
                }
              }

              return t;
            };
          }, function (t, n, i) {
            var e = i(0);
            t.exports = {
              build: function build(t, n) {
                var i,
                    s,
                    r,
                    o = n.plugins;

                for (i = 0, s = o.length; i < s; i++) {
                  r = o[i], r.methods && e(t, r.methods), r.properties && Object.defineProperties(t, r.properties);
                }
              },
              hook: function hook(t, n, i) {
                var e,
                    s,
                    r,
                    o,
                    a = t.config.plugins,
                    f = [t.context];

                for (i && (f = f.concat(i)), e = 0, s = a.length; e < s; e++) {
                  o = a[e], (r = a[e][n]) && r.apply(o, f);
                }
              }
            };
          }, function (t, n, i) {
            function e(t) {
              if (0 === t.length) return t;
              var n,
                  i,
                  e = t.split(/[_-]/);
              if (1 === e.length && e[0][0].toLowerCase() === e[0][0]) return t;

              for (i = e[0].toLowerCase(), n = 1; n < e.length; n++) {
                i = i + e[n].charAt(0).toUpperCase() + e[n].substring(1).toLowerCase();
              }

              return i;
            }

            e.prepended = function (t, n) {
              return n = e(n), t + n[0].toUpperCase() + n.substring(1);
            }, t.exports = e;
          }, function (t, n, i) {
            function e(t, n) {
              t = t || {}, this.options = t, this.defaults = n.defaults, this.states = [], this.transitions = [], this.map = {}, this.lifecycle = this.configureLifecycle(), this.init = this.configureInitTransition(t.init), this.data = this.configureData(t.data), this.methods = this.configureMethods(t.methods), this.map[this.defaults.wildcard] = {}, this.configureTransitions(t.transitions || []), this.plugins = this.configurePlugins(t.plugins, n.plugin);
            }

            var s = i(0),
                r = i(2);
            s(e.prototype, {
              addState: function addState(t) {
                this.map[t] || (this.states.push(t), this.addStateLifecycleNames(t), this.map[t] = {});
              },
              addStateLifecycleNames: function addStateLifecycleNames(t) {
                this.lifecycle.onEnter[t] = r.prepended("onEnter", t), this.lifecycle.onLeave[t] = r.prepended("onLeave", t), this.lifecycle.on[t] = r.prepended("on", t);
              },
              addTransition: function addTransition(t) {
                this.transitions.indexOf(t) < 0 && (this.transitions.push(t), this.addTransitionLifecycleNames(t));
              },
              addTransitionLifecycleNames: function addTransitionLifecycleNames(t) {
                this.lifecycle.onBefore[t] = r.prepended("onBefore", t), this.lifecycle.onAfter[t] = r.prepended("onAfter", t), this.lifecycle.on[t] = r.prepended("on", t);
              },
              mapTransition: function mapTransition(t) {
                var n = t.name,
                    i = t.from,
                    e = t.to;
                return this.addState(i), "function" != typeof e && this.addState(e), this.addTransition(n), this.map[i][n] = t, t;
              },
              configureLifecycle: function configureLifecycle() {
                return {
                  onBefore: {
                    transition: "onBeforeTransition"
                  },
                  onAfter: {
                    transition: "onAfterTransition"
                  },
                  onEnter: {
                    state: "onEnterState"
                  },
                  onLeave: {
                    state: "onLeaveState"
                  },
                  on: {
                    transition: "onTransition"
                  }
                };
              },
              configureInitTransition: function configureInitTransition(t) {
                return "string" == typeof t ? this.mapTransition(s({}, this.defaults.init, {
                  to: t,
                  active: !0
                })) : "object" == typeof t ? this.mapTransition(s({}, this.defaults.init, t, {
                  active: !0
                })) : (this.addState(this.defaults.init.from), this.defaults.init);
              },
              configureData: function configureData(t) {
                return "function" == typeof t ? t : "object" == typeof t ? function () {
                  return t;
                } : function () {
                  return {};
                };
              },
              configureMethods: function configureMethods(t) {
                return t || {};
              },
              configurePlugins: function configurePlugins(t, n) {
                t = t || [];
                var i, e, s;

                for (i = 0, e = t.length; i < e; i++) {
                  s = t[i], "function" == typeof s && (t[i] = s = s()), s.configure && s.configure(this);
                }

                return t;
              },
              configureTransitions: function configureTransitions(t) {
                var n,
                    i,
                    e,
                    s,
                    r,
                    o = this.defaults.wildcard;

                for (i = 0; i < t.length; i++) {
                  for (e = t[i], s = Array.isArray(e.from) ? e.from : [e.from || o], r = e.to || o, n = 0; n < s.length; n++) {
                    this.mapTransition({
                      name: e.name,
                      from: s[n],
                      to: r
                    });
                  }
                }
              },
              transitionFor: function transitionFor(t, n) {
                var i = this.defaults.wildcard;
                return this.map[t][n] || this.map[i][n];
              },
              transitionsFor: function transitionsFor(t) {
                var n = this.defaults.wildcard;
                return Object.keys(this.map[t]).concat(Object.keys(this.map[n]));
              },
              allStates: function allStates() {
                return this.states;
              },
              allTransitions: function allTransitions() {
                return this.transitions;
              }
            }), t.exports = e;
          }, function (t, n, i) {
            function e(t, n) {
              this.context = t, this.config = n, this.state = n.init.from, this.observers = [t];
            }

            var s = i(0),
                r = i(6),
                o = i(1),
                a = [null, []];
            s(e.prototype, {
              init: function init(t) {
                if (s(this.context, this.config.data.apply(this.context, t)), o.hook(this, "init"), this.config.init.active) return this.fire(this.config.init.name, []);
              },
              is: function is(t) {
                return Array.isArray(t) ? t.indexOf(this.state) >= 0 : this.state === t;
              },
              isPending: function isPending() {
                return this.pending;
              },
              can: function can(t) {
                return !this.isPending() && !!this.seek(t);
              },
              cannot: function cannot(t) {
                return !this.can(t);
              },
              allStates: function allStates() {
                return this.config.allStates();
              },
              allTransitions: function allTransitions() {
                return this.config.allTransitions();
              },
              transitions: function transitions() {
                return this.config.transitionsFor(this.state);
              },
              seek: function seek(t, n) {
                var i = this.config.defaults.wildcard,
                    e = this.config.transitionFor(this.state, t),
                    s = e && e.to;
                return "function" == typeof s ? s.apply(this.context, n) : s === i ? this.state : s;
              },
              fire: function fire(t, n) {
                return this.transit(t, this.state, this.seek(t, n), n);
              },
              transit: function transit(t, n, i, e) {
                var s = this.config.lifecycle,
                    r = this.config.options.observeUnchangedState || n !== i;
                return i ? this.isPending() ? this.context.onPendingTransition(t, n, i) : (this.config.addState(i), this.beginTransit(), e.unshift({
                  transition: t,
                  from: n,
                  to: i,
                  fsm: this.context
                }), this.observeEvents([this.observersForEvent(s.onBefore.transition), this.observersForEvent(s.onBefore[t]), r ? this.observersForEvent(s.onLeave.state) : a, r ? this.observersForEvent(s.onLeave[n]) : a, this.observersForEvent(s.on.transition), r ? ["doTransit", [this]] : a, r ? this.observersForEvent(s.onEnter.state) : a, r ? this.observersForEvent(s.onEnter[i]) : a, r ? this.observersForEvent(s.on[i]) : a, this.observersForEvent(s.onAfter.transition), this.observersForEvent(s.onAfter[t]), this.observersForEvent(s.on[t])], e)) : this.context.onInvalidTransition(t, n, i);
              },
              beginTransit: function beginTransit() {
                this.pending = !0;
              },
              endTransit: function endTransit(t) {
                return this.pending = !1, t;
              },
              failTransit: function failTransit(t) {
                throw this.pending = !1, t;
              },
              doTransit: function doTransit(t) {
                this.state = t.to;
              },
              observe: function observe(t) {
                if (2 === t.length) {
                  var n = {};
                  n[t[0]] = t[1], this.observers.push(n);
                } else this.observers.push(t[0]);
              },
              observersForEvent: function observersForEvent(t) {
                for (var n, i = 0, e = this.observers.length, s = []; i < e; i++) {
                  n = this.observers[i], n[t] && s.push(n);
                }

                return [t, s, !0];
              },
              observeEvents: function observeEvents(t, n, i, e) {
                if (0 === t.length) return this.endTransit(void 0 === e || e);
                var s = t[0][0],
                    r = t[0][1],
                    a = t[0][2];
                if (n[0].event = s, s && a && s !== i && o.hook(this, "lifecycle", n), 0 === r.length) return t.shift(), this.observeEvents(t, n, s, e);
                var f = r.shift(),
                    c = f[s].apply(f, n);
                return c && "function" == typeof c.then ? c.then(this.observeEvents.bind(this, t, n, s))["catch"](this.failTransit.bind(this)) : !1 === c ? this.endTransit(!1) : this.observeEvents(t, n, s, c);
              },
              onInvalidTransition: function onInvalidTransition(t, n, i) {
                throw new r("transition is invalid in current state", t, n, i, this.state);
              },
              onPendingTransition: function onPendingTransition(t, n, i) {
                throw new r("transition is invalid while previous transition is still in progress", t, n, i, this.state);
              }
            }), t.exports = e;
          }, function (t, n, i) {
            function e(t) {
              return r(this || {}, t);
            }

            function s() {
              var t, n;
              "function" == typeof arguments[0] ? (t = arguments[0], n = arguments[1] || {}) : (t = function t() {
                this._fsm.apply(this, arguments);
              }, n = arguments[0] || {});
              var i = new u(n, e);
              return o(t.prototype, i), t.prototype._fsm.config = i, t;
            }

            function r(t, n) {
              return o(t, new u(n, e)), t._fsm(), t;
            }

            function o(t, n) {
              if ("object" != typeof t || Array.isArray(t)) throw Error("StateMachine can only be applied to objects");
              c.build(t, n), Object.defineProperties(t, d), a(t, l), a(t, n.methods), n.allTransitions().forEach(function (n) {
                t[f(n)] = function () {
                  return this._fsm.fire(n, [].slice.call(arguments));
                };
              }), t._fsm = function () {
                this._fsm = new h(this, n), this._fsm.init(arguments);
              };
            }

            var a = i(0),
                f = i(2),
                c = i(1),
                u = i(3),
                h = i(4),
                l = {
              is: function is(t) {
                return this._fsm.is(t);
              },
              can: function can(t) {
                return this._fsm.can(t);
              },
              cannot: function cannot(t) {
                return this._fsm.cannot(t);
              },
              observe: function observe() {
                return this._fsm.observe(arguments);
              },
              transitions: function transitions() {
                return this._fsm.transitions();
              },
              allTransitions: function allTransitions() {
                return this._fsm.allTransitions();
              },
              allStates: function allStates() {
                return this._fsm.allStates();
              },
              onInvalidTransition: function onInvalidTransition(t, n, i) {
                return this._fsm.onInvalidTransition(t, n, i);
              },
              onPendingTransition: function onPendingTransition(t, n, i) {
                return this._fsm.onPendingTransition(t, n, i);
              }
            },
                d = {
              state: {
                configurable: !1,
                enumerable: !0,
                get: function get() {
                  return this._fsm.state;
                },
                set: function set(t) {
                  throw Error("use transitions to change state");
                }
              }
            };
            e.version = "3.0.1", e.factory = s, e.apply = r, e.defaults = {
              wildcard: "*",
              init: {
                name: "init",
                from: "none"
              }
            }, t.exports = e;
          }, function (t, n, i) {
            t.exports = function (t, n, i, e, s) {
              this.message = t, this.transition = n, this.from = i, this.to = e, this.current = s;
            };
          }]);
        }); // #endregion ORIGINAL CODE

        _cjsExports = exports('default', module.exports);
        module.exports.StateMachine;
      }, {});
    }
  };
});

System.register("chunks:///_virtual/state-machine.min.mjs_cjs=&original=.js", ['./state-machine.min.js', './cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var __cjsMetaURL, loader;

  return {
    setters: [function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }, function (module) {
      loader = module.default;
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './state-machine.min.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./state-machine.min.js', module.meta.url);
      }

      loader.require(__cjsMetaURL);
    }
  };
});

System.register("chunks:///_virtual/UPNG.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);

      loader.define(__cjsMetaURL, function (exports$1, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        var UZIP = {};
        if (typeof module == "object") module.exports = UZIP;

        UZIP["parse"] = function (buf, onlyNames) // ArrayBuffer
        {
          var rUs = UZIP.bin.readUshort,
              rUi = UZIP.bin.readUint,
              o = 0,
              out = {};
          var data = new Uint8Array(buf);
          var eocd = data.length - 4;

          while (rUi(data, eocd) != 0x06054b50) {
            eocd--;
          }

          var o = eocd;
          o += 4; // sign  = 0x06054b50

          o += 4; // disks = 0;

          var cnu = rUs(data, o);
          o += 2;
          var cnt = rUs(data, o);
          o += 2;
          var csize = rUi(data, o);
          o += 4;
          var coffs = rUi(data, o);
          o += 4;
          o = coffs;

          for (var i = 0; i < cnu; i++) {
            var sign = rUi(data, o);
            o += 4;
            o += 4; // versions;

            o += 4; // flag + compr

            o += 4; // time

            var crc32 = rUi(data, o);
            o += 4;
            var csize = rUi(data, o);
            o += 4;
            var usize = rUi(data, o);
            o += 4;
            var nl = rUs(data, o),
                el = rUs(data, o + 2),
                cl = rUs(data, o + 4);
            o += 6; // name, extra, comment

            o += 8; // disk, attribs

            var roff = rUi(data, o);
            o += 4;
            o += nl + el + cl;

            UZIP._readLocal(data, roff, out, csize, usize, onlyNames);
          } //console.log(out);


          return out;
        };

        UZIP._readLocal = function (data, o, out, csize, usize, onlyNames) {
          var rUs = UZIP.bin.readUshort,
              rUi = UZIP.bin.readUint;
          var sign = rUi(data, o);
          o += 4;
          var ver = rUs(data, o);
          o += 2;
          var gpflg = rUs(data, o);
          o += 2; //if((gpflg&8)!=0) throw "unknown sizes";

          var cmpr = rUs(data, o);
          o += 2;
          var time = rUi(data, o);
          o += 4;
          var crc32 = rUi(data, o);
          o += 4; //var csize = rUi(data, o);  o+=4;
          //var usize = rUi(data, o);  o+=4;

          o += 8;
          var nlen = rUs(data, o);
          o += 2;
          var elen = rUs(data, o);
          o += 2;
          var name = UZIP.bin.readUTF8(data, o, nlen);
          o += nlen; //console.log(name);

          o += elen; //console.log(sign.toString(16), ver, gpflg, cmpr, crc32.toString(16), "csize, usize", csize, usize, nlen, elen, name, o);

          if (onlyNames) {
            out[name] = {
              size: usize,
              csize: csize
            };
            return;
          }

          var file = new Uint8Array(data.buffer, o);
          if (cmpr == 0) out[name] = new Uint8Array(file.buffer.slice(o, o + csize));else if (cmpr == 8) {
            var buf = new Uint8Array(usize);
            UZIP.inflateRaw(file, buf);
            /*var nbuf = pako["inflateRaw"](file);
            if(usize>8514000) {
            	//console.log(PUtils.readASCII(buf , 8514500, 500));
            	//console.log(PUtils.readASCII(nbuf, 8514500, 500));
            }
            for(var i=0; i<buf.length; i++) if(buf[i]!=nbuf[i]) {  console.log(buf.length, nbuf.length, usize, i);  throw "e";  }
            */

            out[name] = buf;
          } else throw "unknown compression method: " + cmpr;
        };

        UZIP.inflateRaw = function (file, buf) {
          return UZIP.F.inflate(file, buf);
        };

        UZIP.inflate = function (file, buf) {
          var CMF = file[0],
              FLG = file[1];
          return UZIP.inflateRaw(new Uint8Array(file.buffer, file.byteOffset + 2, file.length - 6), buf);
        };

        UZIP.deflate = function (data, opts
        /*, buf, off*/
        ) {
          if (opts == null) opts = {
            level: 6
          };
          var off = 0,
              buf = new Uint8Array(50 + Math.floor(data.length * 1.1));
          buf[off] = 120;
          buf[off + 1] = 156;
          off += 2;
          off = UZIP.F.deflateRaw(data, buf, off, opts.level);
          var crc = UZIP.adler(data, 0, data.length);
          buf[off + 0] = crc >>> 24 & 255;
          buf[off + 1] = crc >>> 16 & 255;
          buf[off + 2] = crc >>> 8 & 255;
          buf[off + 3] = crc >>> 0 & 255;
          return new Uint8Array(buf.buffer, 0, off + 4);
        };

        UZIP.deflateRaw = function (data, opts) {
          if (opts == null) opts = {
            level: 6
          };
          var buf = new Uint8Array(50 + Math.floor(data.length * 1.1));
          var off = UZIP.F.deflateRaw(data, buf, off, opts.level);
          return new Uint8Array(buf.buffer, 0, off);
        };

        UZIP.encode = function (obj, noCmpr) {
          if (noCmpr == null) noCmpr = false;
          var tot = 0,
              wUi = UZIP.bin.writeUint,
              wUs = UZIP.bin.writeUshort;
          var zpd = {};

          for (var p in obj) {
            var cpr = !UZIP._noNeed(p) && !noCmpr,
                buf = obj[p],
                crc = UZIP.crc.crc(buf, 0, buf.length);
            zpd[p] = {
              cpr: cpr,
              usize: buf.length,
              crc: crc,
              file: cpr ? UZIP.deflateRaw(buf) : buf
            };
          }

          for (var p in zpd) {
            tot += zpd[p].file.length + 30 + 46 + 2 * UZIP.bin.sizeUTF8(p);
          }

          tot += 22;
          var data = new Uint8Array(tot),
              o = 0;
          var fof = [];

          for (var p in zpd) {
            var file = zpd[p];
            fof.push(o);
            o = UZIP._writeHeader(data, o, p, file, 0);
          }

          var i = 0,
              ioff = o;

          for (var p in zpd) {
            var file = zpd[p];
            fof.push(o);
            o = UZIP._writeHeader(data, o, p, file, 1, fof[i++]);
          }

          var csize = o - ioff;
          wUi(data, o, 0x06054b50);
          o += 4;
          o += 4; // disks

          wUs(data, o, i);
          o += 2;
          wUs(data, o, i);
          o += 2; // number of c d records

          wUi(data, o, csize);
          o += 4;
          wUi(data, o, ioff);
          o += 4;
          o += 2;
          return data.buffer;
        }; // no need to compress .PNG, .ZIP, .JPEG ....


        UZIP._noNeed = function (fn) {
          var ext = fn.split(".").pop().toLowerCase();
          return "png,jpg,jpeg,zip".indexOf(ext) != -1;
        };

        UZIP._writeHeader = function (data, o, p, obj, t, roff) {
          var wUi = UZIP.bin.writeUint,
              wUs = UZIP.bin.writeUshort;
          var file = obj.file;
          wUi(data, o, t == 0 ? 0x04034b50 : 0x02014b50);
          o += 4; // sign

          if (t == 1) o += 2; // ver made by

          wUs(data, o, 20);
          o += 2; // ver

          wUs(data, o, 0);
          o += 2; // gflip

          wUs(data, o, obj.cpr ? 8 : 0);
          o += 2; // cmpr

          wUi(data, o, 0);
          o += 4; // time

          wUi(data, o, obj.crc);
          o += 4; // crc32

          wUi(data, o, file.length);
          o += 4; // csize

          wUi(data, o, obj.usize);
          o += 4; // usize

          wUs(data, o, UZIP.bin.sizeUTF8(p));
          o += 2; // nlen

          wUs(data, o, 0);
          o += 2; // elen

          if (t == 1) {
            o += 2; // comment length

            o += 2; // disk number

            o += 6; // attributes

            wUi(data, o, roff);
            o += 4; // usize
          }

          var nlen = UZIP.bin.writeUTF8(data, o, p);
          o += nlen;

          if (t == 0) {
            data.set(file, o);
            o += file.length;
          }

          return o;
        };

        UZIP.crc = {
          table: function () {
            var tab = new Uint32Array(256);

            for (var n = 0; n < 256; n++) {
              var c = n;

              for (var k = 0; k < 8; k++) {
                if (c & 1) c = 0xedb88320 ^ c >>> 1;else c = c >>> 1;
              }

              tab[n] = c;
            }

            return tab;
          }(),
          update: function update(c, buf, off, len) {
            for (var i = 0; i < len; i++) {
              c = UZIP.crc.table[(c ^ buf[off + i]) & 0xff] ^ c >>> 8;
            }

            return c;
          },
          crc: function crc(b, o, l) {
            return UZIP.crc.update(0xffffffff, b, o, l) ^ 0xffffffff;
          }
        };

        UZIP.adler = function (data, o, len) {
          var a = 1,
              b = 0;
          var off = o,
              end = o + len;

          while (off < end) {
            var eend = Math.min(off + 5552, end);

            while (off < eend) {
              a += data[off++];
              b += a;
            }

            a = a % 65521;
            b = b % 65521;
          }

          return b << 16 | a;
        };

        UZIP.bin = {
          readUshort: function readUshort(buff, p) {
            return buff[p] | buff[p + 1] << 8;
          },
          writeUshort: function writeUshort(buff, p, n) {
            buff[p] = n & 255;
            buff[p + 1] = n >> 8 & 255;
          },
          readUint: function readUint(buff, p) {
            return buff[p + 3] * (256 * 256 * 256) + (buff[p + 2] << 16 | buff[p + 1] << 8 | buff[p]);
          },
          writeUint: function writeUint(buff, p, n) {
            buff[p] = n & 255;
            buff[p + 1] = n >> 8 & 255;
            buff[p + 2] = n >> 16 & 255;
            buff[p + 3] = n >> 24 & 255;
          },
          readASCII: function readASCII(buff, p, l) {
            var s = "";

            for (var i = 0; i < l; i++) {
              s += String.fromCharCode(buff[p + i]);
            }

            return s;
          },
          writeASCII: function writeASCII(data, p, s) {
            for (var i = 0; i < s.length; i++) {
              data[p + i] = s.charCodeAt(i);
            }
          },
          pad: function pad(n) {
            return n.length < 2 ? "0" + n : n;
          },
          readUTF8: function readUTF8(buff, p, l) {
            var s = "",
                ns;

            for (var i = 0; i < l; i++) {
              s += "%" + UZIP.bin.pad(buff[p + i].toString(16));
            }

            try {
              ns = decodeURIComponent(s);
            } catch (e) {
              return UZIP.bin.readASCII(buff, p, l);
            }

            return ns;
          },
          writeUTF8: function writeUTF8(buff, p, str) {
            var strl = str.length,
                i = 0;

            for (var ci = 0; ci < strl; ci++) {
              var code = str.charCodeAt(ci);

              if ((code & 0xffffffff - (1 << 7) + 1) == 0) {
                buff[p + i] = code;
                i++;
              } else if ((code & 0xffffffff - (1 << 11) + 1) == 0) {
                buff[p + i] = 192 | code >> 6;
                buff[p + i + 1] = 128 | code >> 0 & 63;
                i += 2;
              } else if ((code & 0xffffffff - (1 << 16) + 1) == 0) {
                buff[p + i] = 224 | code >> 12;
                buff[p + i + 1] = 128 | code >> 6 & 63;
                buff[p + i + 2] = 128 | code >> 0 & 63;
                i += 3;
              } else if ((code & 0xffffffff - (1 << 21) + 1) == 0) {
                buff[p + i] = 240 | code >> 18;
                buff[p + i + 1] = 128 | code >> 12 & 63;
                buff[p + i + 2] = 128 | code >> 6 & 63;
                buff[p + i + 3] = 128 | code >> 0 & 63;
                i += 4;
              } else throw "e";
            }

            return i;
          },
          sizeUTF8: function sizeUTF8(str) {
            var strl = str.length,
                i = 0;

            for (var ci = 0; ci < strl; ci++) {
              var code = str.charCodeAt(ci);

              if ((code & 0xffffffff - (1 << 7) + 1) == 0) {
                i++;
              } else if ((code & 0xffffffff - (1 << 11) + 1) == 0) {
                i += 2;
              } else if ((code & 0xffffffff - (1 << 16) + 1) == 0) {
                i += 3;
              } else if ((code & 0xffffffff - (1 << 21) + 1) == 0) {
                i += 4;
              } else throw "e";
            }

            return i;
          }
        };
        UZIP.F = {};

        UZIP.F.deflateRaw = function (data, out, opos, lvl) {
          var opts = [
          /*
                     ush good_length; /* reduce lazy search above this match length
                     ush max_lazy;    /* do not perform lazy search above this match length
                     ush nice_length; /* quit search above this match length
                */

          /*      good lazy nice chain */

          /* 0 */
          [0, 0, 0, 0, 0],
          /* store only */

          /* 1 */
          [4, 4, 8, 4, 0],
          /* max speed, no lazy matches */

          /* 2 */
          [4, 5, 16, 8, 0],
          /* 3 */
          [4, 6, 16, 16, 0],
          /* 4 */
          [4, 10, 16, 32, 0],
          /* lazy matches */

          /* 5 */
          [8, 16, 32, 32, 0],
          /* 6 */
          [8, 16, 128, 128, 0],
          /* 7 */
          [8, 32, 128, 256, 0],
          /* 8 */
          [32, 128, 258, 1024, 1],
          /* 9 */
          [32, 258, 258, 4096, 1]];
          /* max compression */

          var opt = opts[lvl];
          var U = UZIP.F.U,
              goodIndex = UZIP.F._goodIndex,
              hash = UZIP.F._hash,
              putsE = UZIP.F._putsE;
          var i = 0,
              pos = opos << 3,
              cvrd = 0,
              dlen = data.length;

          if (lvl == 0) {
            while (i < dlen) {
              var len = Math.min(0xffff, dlen - i);
              putsE(out, pos, i + len == dlen ? 1 : 0);
              pos = UZIP.F._copyExact(data, i, len, out, pos + 8);
              i += len;
            }

            return pos >>> 3;
          }

          var lits = U.lits,
              strt = U.strt,
              prev = U.prev,
              li = 0,
              lc = 0,
              bs = 0,
              ebits = 0,
              c = 0,
              nc = 0; // last_item, literal_count, block_start

          if (dlen > 2) {
            nc = UZIP.F._hash(data, 0);
            strt[nc] = 0;
          }

          for (i = 0; i < dlen; i++) {
            c = nc; //*

            if (i + 1 < dlen - 2) {
              nc = UZIP.F._hash(data, i + 1);
              var ii = i + 1 & 0x7fff;
              prev[ii] = strt[nc];
              strt[nc] = ii;
            } //*/


            if (cvrd <= i) {
              if ((li > 14000 || lc > 26697) && dlen - i > 100) {
                if (cvrd < i) {
                  lits[li] = i - cvrd;
                  li += 2;
                  cvrd = i;
                }

                pos = UZIP.F._writeBlock(i == dlen - 1 || cvrd == dlen ? 1 : 0, lits, li, ebits, data, bs, i - bs, out, pos);
                li = lc = ebits = 0;
                bs = i;
              }

              var mch = 0; //if(nmci==i) mch= nmch;  else

              if (i < dlen - 2) mch = UZIP.F._bestMatch(data, i, prev, c, Math.min(opt[2], dlen - i), opt[3]);
              /*
              if(mch!=0 && opt[4]==1 && (mch>>>16)<opt[1] && i+1<dlen-2) {
              	nmch = UZIP.F._bestMatch(data, i+1, prev, nc, opt[2], opt[3]);  nmci=i+1;
              	//var mch2 = UZIP.F._bestMatch(data, i+2, prev, nnc);  //nmci=i+1;
              	if((nmch>>>16)>(mch>>>16)) mch=0;
              }//*/

              var len = mch >>> 16,
                  dst = mch & 0xffff; //if(i-dst<0) throw "e";

              if (mch != 0) {
                var len = mch >>> 16,
                    dst = mch & 0xffff; //if(i-dst<0) throw "e";

                var lgi = goodIndex(len, U.of0);
                U.lhst[257 + lgi]++;
                var dgi = goodIndex(dst, U.df0);
                U.dhst[dgi]++;
                ebits += U.exb[lgi] + U.dxb[dgi];
                lits[li] = len << 23 | i - cvrd;
                lits[li + 1] = dst << 16 | lgi << 8 | dgi;
                li += 2;
                cvrd = i + len;
              } else {
                U.lhst[data[i]]++;
              }

              lc++;
            }
          }

          if (bs != i || data.length == 0) {
            if (cvrd < i) {
              lits[li] = i - cvrd;
              li += 2;
              cvrd = i;
            }

            pos = UZIP.F._writeBlock(1, lits, li, ebits, data, bs, i - bs, out, pos);
            li = 0;
            lc = 0;
            li = lc = ebits = 0;
            bs = i;
          }

          while ((pos & 7) != 0) {
            pos++;
          }

          return pos >>> 3;
        };

        UZIP.F._bestMatch = function (data, i, prev, c, nice, chain) {
          var ci = i & 0x7fff,
              pi = prev[ci]; //console.log("----", i);

          var dif = ci - pi + (1 << 15) & 0x7fff;
          if (pi == ci || c != UZIP.F._hash(data, i - dif)) return 0;
          var tl = 0,
              td = 0; // top length, top distance

          var dlim = Math.min(0x7fff, i);

          while (dif <= dlim && --chain != 0 && pi != ci
          /*&& c==UZIP.F._hash(data,i-dif)*/
          ) {
            if (tl == 0 || data[i + tl] == data[i + tl - dif]) {
              var cl = UZIP.F._howLong(data, i, dif);

              if (cl > tl) {
                tl = cl;
                td = dif;
                if (tl >= nice) break; //*

                if (dif + 2 < cl) cl = dif + 2;
                var maxd = 0; // pi does not point to the start of the word

                for (var j = 0; j < cl - 2; j++) {
                  var ei = i - dif + j + (1 << 15) & 0x7fff;
                  var li = prev[ei];
                  var curd = ei - li + (1 << 15) & 0x7fff;

                  if (curd > maxd) {
                    maxd = curd;
                    pi = ei;
                  }
                } //*/

              }
            }

            ci = pi;
            pi = prev[ci];
            dif += ci - pi + (1 << 15) & 0x7fff;
          }

          return tl << 16 | td;
        };

        UZIP.F._howLong = function (data, i, dif) {
          if (data[i] != data[i - dif] || data[i + 1] != data[i + 1 - dif] || data[i + 2] != data[i + 2 - dif]) return 0;
          var oi = i,
              l = Math.min(data.length, i + 258);
          i += 3; //while(i+4<l && data[i]==data[i-dif] && data[i+1]==data[i+1-dif] && data[i+2]==data[i+2-dif] && data[i+3]==data[i+3-dif]) i+=4;

          while (i < l && data[i] == data[i - dif]) {
            i++;
          }

          return i - oi;
        };

        UZIP.F._hash = function (data, i) {
          return (data[i] << 8 | data[i + 1]) + (data[i + 2] << 4) & 0xffff; //var hash_shift = 0, hash_mask = 255;
          //var h = data[i+1] % 251;
          //h = (((h << 8) + data[i+2]) % 251);
          //h = (((h << 8) + data[i+2]) % 251);
          //h = ((h<<hash_shift) ^ (c) ) & hash_mask;
          //return h | (data[i]<<8);
          //return (data[i] | (data[i+1]<<8));
        }; //UZIP.___toth = 0;


        UZIP.saved = 0;

        UZIP.F._writeBlock = function (BFINAL, lits, li, ebits, data, o0, l0, out, pos) {
          var U = UZIP.F.U,
              putsF = UZIP.F._putsF,
              putsE = UZIP.F._putsE; //*

          var T, ML, MD, MH, numl, numd, numh, lset, dset;
          U.lhst[256]++;
          T = UZIP.F.getTrees();
          ML = T[0];
          MD = T[1];
          MH = T[2];
          numl = T[3];
          numd = T[4];
          numh = T[5];
          lset = T[6];
          dset = T[7];
          var cstSize = ((pos + 3 & 7) == 0 ? 0 : 8 - (pos + 3 & 7)) + 32 + (l0 << 3);
          var fxdSize = ebits + UZIP.F.contSize(U.fltree, U.lhst) + UZIP.F.contSize(U.fdtree, U.dhst);
          var dynSize = ebits + UZIP.F.contSize(U.ltree, U.lhst) + UZIP.F.contSize(U.dtree, U.dhst);
          dynSize += 14 + 3 * numh + UZIP.F.contSize(U.itree, U.ihst) + (U.ihst[16] * 2 + U.ihst[17] * 3 + U.ihst[18] * 7);

          for (var j = 0; j < 286; j++) {
            U.lhst[j] = 0;
          }

          for (var j = 0; j < 30; j++) {
            U.dhst[j] = 0;
          }

          for (var j = 0; j < 19; j++) {
            U.ihst[j] = 0;
          } //*/


          var BTYPE = cstSize < fxdSize && cstSize < dynSize ? 0 : fxdSize < dynSize ? 1 : 2;
          putsF(out, pos, BFINAL);
          putsF(out, pos + 1, BTYPE);
          pos += 3;

          if (BTYPE == 0) {
            while ((pos & 7) != 0) {
              pos++;
            }

            pos = UZIP.F._copyExact(data, o0, l0, out, pos);
          } else {
            var ltree, dtree;

            if (BTYPE == 1) {
              ltree = U.fltree;
              dtree = U.fdtree;
            }

            if (BTYPE == 2) {
              UZIP.F.makeCodes(U.ltree, ML);
              UZIP.F.revCodes(U.ltree, ML);
              UZIP.F.makeCodes(U.dtree, MD);
              UZIP.F.revCodes(U.dtree, MD);
              UZIP.F.makeCodes(U.itree, MH);
              UZIP.F.revCodes(U.itree, MH);
              ltree = U.ltree;
              dtree = U.dtree;
              putsE(out, pos, numl - 257);
              pos += 5; // 286

              putsE(out, pos, numd - 1);
              pos += 5; // 30

              putsE(out, pos, numh - 4);
              pos += 4; // 19

              for (var i = 0; i < numh; i++) {
                putsE(out, pos + i * 3, U.itree[(U.ordr[i] << 1) + 1]);
              }

              pos += 3 * numh;
              pos = UZIP.F._codeTiny(lset, U.itree, out, pos);
              pos = UZIP.F._codeTiny(dset, U.itree, out, pos);
            }

            var off = o0;

            for (var si = 0; si < li; si += 2) {
              var qb = lits[si],
                  len = qb >>> 23,
                  end = off + (qb & (1 << 23) - 1);

              while (off < end) {
                pos = UZIP.F._writeLit(data[off++], ltree, out, pos);
              }

              if (len != 0) {
                var qc = lits[si + 1],
                    dst = qc >> 16,
                    lgi = qc >> 8 & 255,
                    dgi = qc & 255;
                pos = UZIP.F._writeLit(257 + lgi, ltree, out, pos);
                putsE(out, pos, len - U.of0[lgi]);
                pos += U.exb[lgi];
                pos = UZIP.F._writeLit(dgi, dtree, out, pos);
                putsF(out, pos, dst - U.df0[dgi]);
                pos += U.dxb[dgi];
                off += len;
              }
            }

            pos = UZIP.F._writeLit(256, ltree, out, pos);
          } //console.log(pos-opos, fxdSize, dynSize, cstSize);


          return pos;
        };

        UZIP.F._copyExact = function (data, off, len, out, pos) {
          var p8 = pos >>> 3;
          out[p8] = len;
          out[p8 + 1] = len >>> 8;
          out[p8 + 2] = 255 - out[p8];
          out[p8 + 3] = 255 - out[p8 + 1];
          p8 += 4;
          out.set(new Uint8Array(data.buffer, off, len), p8); //for(var i=0; i<len; i++) out[p8+i]=data[off+i];

          return pos + (len + 4 << 3);
        };
        /*
        	Interesting facts:
        	- decompressed block can have bytes, which do not occur in a Huffman tree (copied from the previous block by reference)
        */


        UZIP.F.getTrees = function () {
          var U = UZIP.F.U;

          var ML = UZIP.F._hufTree(U.lhst, U.ltree, 15);

          var MD = UZIP.F._hufTree(U.dhst, U.dtree, 15);

          var lset = [],
              numl = UZIP.F._lenCodes(U.ltree, lset);

          var dset = [],
              numd = UZIP.F._lenCodes(U.dtree, dset);

          for (var i = 0; i < lset.length; i += 2) {
            U.ihst[lset[i]]++;
          }

          for (var i = 0; i < dset.length; i += 2) {
            U.ihst[dset[i]]++;
          }

          var MH = UZIP.F._hufTree(U.ihst, U.itree, 7);

          var numh = 19;

          while (numh > 4 && U.itree[(U.ordr[numh - 1] << 1) + 1] == 0) {
            numh--;
          }

          return [ML, MD, MH, numl, numd, numh, lset, dset];
        };

        UZIP.F.getSecond = function (a) {
          var b = [];

          for (var i = 0; i < a.length; i += 2) {
            b.push(a[i + 1]);
          }

          return b;
        };

        UZIP.F.nonZero = function (a) {
          var b = "";

          for (var i = 0; i < a.length; i += 2) {
            if (a[i + 1] != 0) b += (i >> 1) + ",";
          }

          return b;
        };

        UZIP.F.contSize = function (tree, hst) {
          var s = 0;

          for (var i = 0; i < hst.length; i++) {
            s += hst[i] * tree[(i << 1) + 1];
          }

          return s;
        };

        UZIP.F._codeTiny = function (set, tree, out, pos) {
          for (var i = 0; i < set.length; i += 2) {
            var l = set[i],
                rst = set[i + 1]; //console.log(l, pos, tree[(l<<1)+1]);

            pos = UZIP.F._writeLit(l, tree, out, pos);
            var rsl = l == 16 ? 2 : l == 17 ? 3 : 7;

            if (l > 15) {
              UZIP.F._putsE(out, pos, rst, rsl);

              pos += rsl;
            }
          }

          return pos;
        };

        UZIP.F._lenCodes = function (tree, set) {
          var len = tree.length;

          while (len != 2 && tree[len - 1] == 0) {
            len -= 2;
          } // when no distances, keep one code with length 0


          for (var i = 0; i < len; i += 2) {
            var l = tree[i + 1],
                nxt = i + 3 < len ? tree[i + 3] : -1,
                nnxt = i + 5 < len ? tree[i + 5] : -1,
                prv = i == 0 ? -1 : tree[i - 1];

            if (l == 0 && nxt == l && nnxt == l) {
              var lz = i + 5;

              while (lz + 2 < len && tree[lz + 2] == l) {
                lz += 2;
              }

              var zc = Math.min(lz + 1 - i >>> 1, 138);
              if (zc < 11) set.push(17, zc - 3);else set.push(18, zc - 11);
              i += zc * 2 - 2;
            } else if (l == prv && nxt == l && nnxt == l) {
              var lz = i + 5;

              while (lz + 2 < len && tree[lz + 2] == l) {
                lz += 2;
              }

              var zc = Math.min(lz + 1 - i >>> 1, 6);
              set.push(16, zc - 3);
              i += zc * 2 - 2;
            } else set.push(l, 0);
          }

          return len >>> 1;
        };

        UZIP.F._hufTree = function (hst, tree, MAXL) {
          var list = [],
              hl = hst.length,
              tl = tree.length,
              i = 0;

          for (i = 0; i < tl; i += 2) {
            tree[i] = 0;
            tree[i + 1] = 0;
          }

          for (i = 0; i < hl; i++) {
            if (hst[i] != 0) list.push({
              lit: i,
              f: hst[i]
            });
          }

          var end = list.length,
              l2 = list.slice(0);
          if (end == 0) return 0; // empty histogram (usually for dist)

          if (end == 1) {
            var lit = list[0].lit,
                l2 = lit == 0 ? 1 : 0;
            tree[(lit << 1) + 1] = 1;
            tree[(l2 << 1) + 1] = 1;
            return 1;
          }

          list.sort(function (a, b) {
            return a.f - b.f;
          });
          var a = list[0],
              b = list[1],
              i0 = 0,
              i1 = 1,
              i2 = 2;
          list[0] = {
            lit: -1,
            f: a.f + b.f,
            l: a,
            r: b,
            d: 0
          };

          while (i1 != end - 1) {
            if (i0 != i1 && (i2 == end || list[i0].f < list[i2].f)) {
              a = list[i0++];
            } else {
              a = list[i2++];
            }

            if (i0 != i1 && (i2 == end || list[i0].f < list[i2].f)) {
              b = list[i0++];
            } else {
              b = list[i2++];
            }

            list[i1++] = {
              lit: -1,
              f: a.f + b.f,
              l: a,
              r: b
            };
          }

          var maxl = UZIP.F.setDepth(list[i1 - 1], 0);

          if (maxl > MAXL) {
            UZIP.F.restrictDepth(l2, MAXL, maxl);
            maxl = MAXL;
          }

          for (i = 0; i < end; i++) {
            tree[(l2[i].lit << 1) + 1] = l2[i].d;
          }

          return maxl;
        };

        UZIP.F.setDepth = function (t, d) {
          if (t.lit != -1) {
            t.d = d;
            return d;
          }

          return Math.max(UZIP.F.setDepth(t.l, d + 1), UZIP.F.setDepth(t.r, d + 1));
        };

        UZIP.F.restrictDepth = function (dps, MD, maxl) {
          var i = 0,
              bCost = 1 << maxl - MD,
              dbt = 0;
          dps.sort(function (a, b) {
            return b.d == a.d ? a.f - b.f : b.d - a.d;
          });

          for (i = 0; i < dps.length; i++) {
            if (dps[i].d > MD) {
              var od = dps[i].d;
              dps[i].d = MD;
              dbt += bCost - (1 << maxl - od);
            } else break;
          }

          dbt = dbt >>> maxl - MD;

          while (dbt > 0) {
            var od = dps[i].d;

            if (od < MD) {
              dps[i].d++;
              dbt -= 1 << MD - od - 1;
            } else i++;
          }

          for (; i >= 0; i--) {
            if (dps[i].d == MD && dbt < 0) {
              dps[i].d--;
              dbt++;
            }
          }

          if (dbt != 0) console.log("debt left");
        };

        UZIP.F._goodIndex = function (v, arr) {
          var i = 0;
          if (arr[i | 16] <= v) i |= 16;
          if (arr[i | 8] <= v) i |= 8;
          if (arr[i | 4] <= v) i |= 4;
          if (arr[i | 2] <= v) i |= 2;
          if (arr[i | 1] <= v) i |= 1;
          return i;
        };

        UZIP.F._writeLit = function (ch, ltree, out, pos) {
          UZIP.F._putsF(out, pos, ltree[ch << 1]);

          return pos + ltree[(ch << 1) + 1];
        };

        UZIP.F.inflate = function (data, buf) {
          var u8 = Uint8Array;
          if (data[0] == 3 && data[1] == 0) return buf ? buf : new u8(0);
          var F = UZIP.F,
              bitsF = F._bitsF,
              bitsE = F._bitsE,
              decodeTiny = F._decodeTiny,
              makeCodes = F.makeCodes,
              codes2map = F.codes2map,
              get17 = F._get17;
          var U = F.U;
          var noBuf = buf == null;
          if (noBuf) buf = new u8(data.length >>> 2 << 3);
          var BFINAL = 0,
              BTYPE = 0,
              HLIT = 0,
              HDIST = 0,
              HCLEN = 0,
              ML = 0,
              MD = 0;
          var off = 0,
              pos = 0;
          var lmap, dmap;

          while (BFINAL == 0) {
            BFINAL = bitsF(data, pos, 1);
            BTYPE = bitsF(data, pos + 1, 2);
            pos += 3; //console.log(BFINAL, BTYPE);

            if (BTYPE == 0) {
              if ((pos & 7) != 0) pos += 8 - (pos & 7);
              var p8 = (pos >>> 3) + 4,
                  len = data[p8 - 4] | data[p8 - 3] << 8; //console.log(len);//bitsF(data, pos, 16),

              if (noBuf) buf = UZIP.F._check(buf, off + len);
              buf.set(new u8(data.buffer, data.byteOffset + p8, len), off); //for(var i=0; i<len; i++) buf[off+i] = data[p8+i];
              //for(var i=0; i<len; i++) if(buf[off+i] != data[p8+i]) throw "e";

              pos = p8 + len << 3;
              off += len;
              continue;
            }

            if (noBuf) buf = UZIP.F._check(buf, off + (1 << 17)); // really not enough in many cases (but PNG and ZIP provide buffer in advance)

            if (BTYPE == 1) {
              lmap = U.flmap;
              dmap = U.fdmap;
              ML = (1 << 9) - 1;
              MD = (1 << 5) - 1;
            }

            if (BTYPE == 2) {
              HLIT = bitsE(data, pos, 5) + 257;
              HDIST = bitsE(data, pos + 5, 5) + 1;
              HCLEN = bitsE(data, pos + 10, 4) + 4;
              pos += 14;

              for (var i = 0; i < 38; i += 2) {
                U.itree[i] = 0;
                U.itree[i + 1] = 0;
              }

              var tl = 1;

              for (var i = 0; i < HCLEN; i++) {
                var l = bitsE(data, pos + i * 3, 3);
                U.itree[(U.ordr[i] << 1) + 1] = l;
                if (l > tl) tl = l;
              }

              pos += 3 * HCLEN; //console.log(itree);

              makeCodes(U.itree, tl);
              codes2map(U.itree, tl, U.imap);
              lmap = U.lmap;
              dmap = U.dmap;
              pos = decodeTiny(U.imap, (1 << tl) - 1, HLIT + HDIST, data, pos, U.ttree);

              var mx0 = F._copyOut(U.ttree, 0, HLIT, U.ltree);

              ML = (1 << mx0) - 1;

              var mx1 = F._copyOut(U.ttree, HLIT, HDIST, U.dtree);

              MD = (1 << mx1) - 1; //var ml = decodeTiny(U.imap, (1<<tl)-1, HLIT , data, pos, U.ltree); ML = (1<<(ml>>>24))-1;  pos+=(ml&0xffffff);

              makeCodes(U.ltree, mx0);
              codes2map(U.ltree, mx0, lmap); //var md = decodeTiny(U.imap, (1<<tl)-1, HDIST, data, pos, U.dtree); MD = (1<<(md>>>24))-1;  pos+=(md&0xffffff);

              makeCodes(U.dtree, mx1);
              codes2map(U.dtree, mx1, dmap);
            } //var ooff=off, opos=pos;


            while (true) {
              var code = lmap[get17(data, pos) & ML];
              pos += code & 15;
              var lit = code >>> 4; //U.lhst[lit]++;

              if (lit >>> 8 == 0) {
                buf[off++] = lit;
              } else if (lit == 256) {
                break;
              } else {
                var end = off + lit - 254;

                if (lit > 264) {
                  var ebs = U.ldef[lit - 257];
                  end = off + (ebs >>> 3) + bitsE(data, pos, ebs & 7);
                  pos += ebs & 7;
                } //UZIP.F.dst[end-off]++;


                var dcode = dmap[get17(data, pos) & MD];
                pos += dcode & 15;
                var dlit = dcode >>> 4;
                var dbs = U.ddef[dlit],
                    dst = (dbs >>> 4) + bitsF(data, pos, dbs & 15);
                pos += dbs & 15; //var o0 = off-dst, stp = Math.min(end-off, dst);
                //if(stp>20) while(off<end) {  buf.copyWithin(off, o0, o0+stp);  off+=stp;  }  else
                //if(end-dst<=off) buf.copyWithin(off, off-dst, end-dst);  else
                //if(dst==1) buf.fill(buf[off-1], off, end);  else

                if (noBuf) buf = UZIP.F._check(buf, off + (1 << 17));

                while (off < end) {
                  buf[off] = buf[off++ - dst];
                  buf[off] = buf[off++ - dst];
                  buf[off] = buf[off++ - dst];
                  buf[off] = buf[off++ - dst];
                }

                off = end; //while(off!=end) {  buf[off]=buf[off++-dst];  }
              }
            } //console.log(off-ooff, (pos-opos)>>>3);

          } //console.log(UZIP.F.dst);
          //console.log(tlen, dlen, off-tlen+tcnt);


          return buf.length == off ? buf : buf.slice(0, off);
        };

        UZIP.F._check = function (buf, len) {
          var bl = buf.length;
          if (len <= bl) return buf;
          var nbuf = new Uint8Array(Math.max(bl << 1, len));
          nbuf.set(buf, 0); //for(var i=0; i<bl; i+=4) {  nbuf[i]=buf[i];  nbuf[i+1]=buf[i+1];  nbuf[i+2]=buf[i+2];  nbuf[i+3]=buf[i+3];  }

          return nbuf;
        };

        UZIP.F._decodeTiny = function (lmap, LL, len, data, pos, tree) {
          var bitsE = UZIP.F._bitsE,
              get17 = UZIP.F._get17;
          var i = 0;

          while (i < len) {
            var code = lmap[get17(data, pos) & LL];
            pos += code & 15;
            var lit = code >>> 4;

            if (lit <= 15) {
              tree[i] = lit;
              i++;
            } else {
              var ll = 0,
                  n = 0;

              if (lit == 16) {
                n = 3 + bitsE(data, pos, 2);
                pos += 2;
                ll = tree[i - 1];
              } else if (lit == 17) {
                n = 3 + bitsE(data, pos, 3);
                pos += 3;
              } else if (lit == 18) {
                n = 11 + bitsE(data, pos, 7);
                pos += 7;
              }

              var ni = i + n;

              while (i < ni) {
                tree[i] = ll;
                i++;
              }
            }
          }

          return pos;
        };

        UZIP.F._copyOut = function (src, off, len, tree) {
          var mx = 0,
              i = 0,
              tl = tree.length >>> 1;

          while (i < len) {
            var v = src[i + off];
            tree[i << 1] = 0;
            tree[(i << 1) + 1] = v;
            if (v > mx) mx = v;
            i++;
          }

          while (i < tl) {
            tree[i << 1] = 0;
            tree[(i << 1) + 1] = 0;
            i++;
          }

          return mx;
        };

        UZIP.F.makeCodes = function (tree, MAX_BITS) {
          // code, length
          var U = UZIP.F.U;
          var max_code = tree.length;
          var code, bits, n, i, len;
          var bl_count = U.bl_count;

          for (var i = 0; i <= MAX_BITS; i++) {
            bl_count[i] = 0;
          }

          for (i = 1; i < max_code; i += 2) {
            bl_count[tree[i]]++;
          }

          var next_code = U.next_code; // smallest code for each length

          code = 0;
          bl_count[0] = 0;

          for (bits = 1; bits <= MAX_BITS; bits++) {
            code = code + bl_count[bits - 1] << 1;
            next_code[bits] = code;
          }

          for (n = 0; n < max_code; n += 2) {
            len = tree[n + 1];

            if (len != 0) {
              tree[n] = next_code[len];
              next_code[len]++;
            }
          }
        };

        UZIP.F.codes2map = function (tree, MAX_BITS, map) {
          var max_code = tree.length;
          var U = UZIP.F.U,
              r15 = U.rev15;

          for (var i = 0; i < max_code; i += 2) {
            if (tree[i + 1] != 0) {
              var lit = i >> 1;
              var cl = tree[i + 1],
                  val = lit << 4 | cl; // :  (0x8000 | (U.of0[lit-257]<<7) | (U.exb[lit-257]<<4) | cl);

              var rest = MAX_BITS - cl,
                  i0 = tree[i] << rest,
                  i1 = i0 + (1 << rest); //tree[i]=r15[i0]>>>(15-MAX_BITS);

              while (i0 != i1) {
                var p0 = r15[i0] >>> 15 - MAX_BITS;
                map[p0] = val;
                i0++;
              }
            }
          }
        };

        UZIP.F.revCodes = function (tree, MAX_BITS) {
          var r15 = UZIP.F.U.rev15,
              imb = 15 - MAX_BITS;

          for (var i = 0; i < tree.length; i += 2) {
            var i0 = tree[i] << MAX_BITS - tree[i + 1];
            tree[i] = r15[i0] >>> imb;
          }
        }; // used only in deflate


        UZIP.F._putsE = function (dt, pos, val) {
          val = val << (pos & 7);
          var o = pos >>> 3;
          dt[o] |= val;
          dt[o + 1] |= val >>> 8;
        };

        UZIP.F._putsF = function (dt, pos, val) {
          val = val << (pos & 7);
          var o = pos >>> 3;
          dt[o] |= val;
          dt[o + 1] |= val >>> 8;
          dt[o + 2] |= val >>> 16;
        };

        UZIP.F._bitsE = function (dt, pos, length) {
          return (dt[pos >>> 3] | dt[(pos >>> 3) + 1] << 8) >>> (pos & 7) & (1 << length) - 1;
        };

        UZIP.F._bitsF = function (dt, pos, length) {
          return (dt[pos >>> 3] | dt[(pos >>> 3) + 1] << 8 | dt[(pos >>> 3) + 2] << 16) >>> (pos & 7) & (1 << length) - 1;
        };
        /*
        UZIP.F._get9 = function(dt, pos) {
        	return ((dt[pos>>>3] | (dt[(pos>>>3)+1]<<8))>>>(pos&7))&511;
        } */


        UZIP.F._get17 = function (dt, pos) {
          // return at least 17 meaningful bytes
          return (dt[pos >>> 3] | dt[(pos >>> 3) + 1] << 8 | dt[(pos >>> 3) + 2] << 16) >>> (pos & 7);
        };

        UZIP.F._get25 = function (dt, pos) {
          // return at least 17 meaningful bytes
          return (dt[pos >>> 3] | dt[(pos >>> 3) + 1] << 8 | dt[(pos >>> 3) + 2] << 16 | dt[(pos >>> 3) + 3] << 24) >>> (pos & 7);
        };

        UZIP.F.U = function () {
          var u16 = Uint16Array,
              u32 = Uint32Array;
          return {
            next_code: new u16(16),
            bl_count: new u16(16),
            ordr: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
            of0: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999],
            exb: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0],
            ldef: new u16(32),
            df0: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535],
            dxb: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0],
            ddef: new u32(32),
            flmap: new u16(512),
            fltree: [],
            fdmap: new u16(32),
            fdtree: [],
            lmap: new u16(32768),
            ltree: [],
            ttree: [],
            dmap: new u16(32768),
            dtree: [],
            imap: new u16(512),
            itree: [],
            //rev9 : new u16(  512)
            rev15: new u16(1 << 15),
            lhst: new u32(286),
            dhst: new u32(30),
            ihst: new u32(19),
            lits: new u32(15000),
            strt: new u16(1 << 16),
            prev: new u16(1 << 15)
          };
        }();

        (function () {
          var U = UZIP.F.U;
          var len = 1 << 15;

          for (var i = 0; i < len; i++) {
            var x = i;
            x = (x & 0xaaaaaaaa) >>> 1 | (x & 0x55555555) << 1;
            x = (x & 0xcccccccc) >>> 2 | (x & 0x33333333) << 2;
            x = (x & 0xf0f0f0f0) >>> 4 | (x & 0x0f0f0f0f) << 4;
            x = (x & 0xff00ff00) >>> 8 | (x & 0x00ff00ff) << 8;
            U.rev15[i] = (x >>> 16 | x << 16) >>> 17;
          }

          function pushV(tgt, n, sv) {
            while (n-- != 0) {
              tgt.push(0, sv);
            }
          }

          for (var i = 0; i < 32; i++) {
            U.ldef[i] = U.of0[i] << 3 | U.exb[i];
            U.ddef[i] = U.df0[i] << 4 | U.dxb[i];
          }

          pushV(U.fltree, 144, 8);
          pushV(U.fltree, 255 - 143, 9);
          pushV(U.fltree, 279 - 255, 7);
          pushV(U.fltree, 287 - 279, 8);
          /*
          var i = 0;
          for(; i<=143; i++) U.fltree.push(0,8);
          for(; i<=255; i++) U.fltree.push(0,9);
          for(; i<=279; i++) U.fltree.push(0,7);
          for(; i<=287; i++) U.fltree.push(0,8);
          */

          UZIP.F.makeCodes(U.fltree, 9);
          UZIP.F.codes2map(U.fltree, 9, U.flmap);
          UZIP.F.revCodes(U.fltree, 9);
          pushV(U.fdtree, 32, 5); //for(i=0;i<32; i++) U.fdtree.push(0,5);

          UZIP.F.makeCodes(U.fdtree, 5);
          UZIP.F.codes2map(U.fdtree, 5, U.fdmap);
          UZIP.F.revCodes(U.fdtree, 5);
          pushV(U.itree, 19, 0);
          pushV(U.ltree, 286, 0);
          pushV(U.dtree, 30, 0);
          pushV(U.ttree, 320, 0);
          /*
          for(var i=0; i< 19; i++) U.itree.push(0,0);
          for(var i=0; i<286; i++) U.ltree.push(0,0);
          for(var i=0; i< 30; i++) U.dtree.push(0,0);
          for(var i=0; i<320; i++) U.ttree.push(0,0);
          */
        })();

        var UPNG = {};

        UPNG.toRGBA8 = function (out) {
          var w = out.width,
              h = out.height;
          if (out.tabs.acTL == null) return [UPNG.toRGBA8.decodeImage(out.data, w, h, out).buffer];
          var frms = [];
          if (out.frames[0].data == null) out.frames[0].data = out.data;
          var len = w * h * 4,
              img = new Uint8Array(len),
              empty = new Uint8Array(len),
              prev = new Uint8Array(len);

          for (var i = 0; i < out.frames.length; i++) {
            var frm = out.frames[i];
            var fx = frm.rect.x,
                fy = frm.rect.y,
                fw = frm.rect.width,
                fh = frm.rect.height;
            var fdata = UPNG.toRGBA8.decodeImage(frm.data, fw, fh, out);
            if (i != 0) for (var j = 0; j < len; j++) {
              prev[j] = img[j];
            }
            if (frm.blend == 0) UPNG._copyTile(fdata, fw, fh, img, w, h, fx, fy, 0);else if (frm.blend == 1) UPNG._copyTile(fdata, fw, fh, img, w, h, fx, fy, 1);
            frms.push(img.buffer.slice(0));
            if (frm.dispose == 0) ;else if (frm.dispose == 1) UPNG._copyTile(empty, fw, fh, img, w, h, fx, fy, 0);else if (frm.dispose == 2) for (var j = 0; j < len; j++) {
              img[j] = prev[j];
            }
          }

          return frms;
        };

        UPNG.toRGBA8.decodeImage = function (data, w, h, out) {
          var area = w * h,
              bpp = UPNG.decode._getBPP(out);

          var bpl = Math.ceil(w * bpp / 8); // bytes per line

          var bf = new Uint8Array(area * 4),
              bf32 = new Uint32Array(bf.buffer);
          var ctype = out.ctype,
              depth = out.depth;
          var rs = UPNG._bin.readUshort; //console.log(ctype, depth);

          if (ctype == 6) {
            // RGB + alpha
            var qarea = area << 2;
            if (depth == 8) for (var i = 0; i < qarea; i += 4) {
              bf[i] = data[i];
              bf[i + 1] = data[i + 1];
              bf[i + 2] = data[i + 2];
              bf[i + 3] = data[i + 3];
            }
            if (depth == 16) for (var i = 0; i < qarea; i++) {
              bf[i] = data[i << 1];
            }
          } else if (ctype == 2) {
            // RGB
            var ts = out.tabs["tRNS"];

            if (ts == null) {
              if (depth == 8) for (var i = 0; i < area; i++) {
                var ti = i * 3;
                bf32[i] = 255 << 24 | data[ti + 2] << 16 | data[ti + 1] << 8 | data[ti];
              }
              if (depth == 16) for (var i = 0; i < area; i++) {
                var ti = i * 6;
                bf32[i] = 255 << 24 | data[ti + 4] << 16 | data[ti + 2] << 8 | data[ti];
              }
            } else {
              var tr = ts[0],
                  tg = ts[1],
                  tb = ts[2];
              if (depth == 8) for (var i = 0; i < area; i++) {
                var qi = i << 2,
                    ti = i * 3;
                bf32[i] = 255 << 24 | data[ti + 2] << 16 | data[ti + 1] << 8 | data[ti];
                if (data[ti] == tr && data[ti + 1] == tg && data[ti + 2] == tb) bf[qi + 3] = 0;
              }
              if (depth == 16) for (var i = 0; i < area; i++) {
                var qi = i << 2,
                    ti = i * 6;
                bf32[i] = 255 << 24 | data[ti + 4] << 16 | data[ti + 2] << 8 | data[ti];
                if (rs(data, ti) == tr && rs(data, ti + 2) == tg && rs(data, ti + 4) == tb) bf[qi + 3] = 0;
              }
            }
          } else if (ctype == 3) {
            // palette
            var p = out.tabs["PLTE"],
                ap = out.tabs["tRNS"],
                tl = ap ? ap.length : 0; //console.log(p, ap);

            if (depth == 1) for (var y = 0; y < h; y++) {
              var s0 = y * bpl,
                  t0 = y * w;

              for (var i = 0; i < w; i++) {
                var qi = t0 + i << 2,
                    j = data[s0 + (i >> 3)] >> 7 - ((i & 7) << 0) & 1,
                    cj = 3 * j;
                bf[qi] = p[cj];
                bf[qi + 1] = p[cj + 1];
                bf[qi + 2] = p[cj + 2];
                bf[qi + 3] = j < tl ? ap[j] : 255;
              }
            }
            if (depth == 2) for (var y = 0; y < h; y++) {
              var s0 = y * bpl,
                  t0 = y * w;

              for (var i = 0; i < w; i++) {
                var qi = t0 + i << 2,
                    j = data[s0 + (i >> 2)] >> 6 - ((i & 3) << 1) & 3,
                    cj = 3 * j;
                bf[qi] = p[cj];
                bf[qi + 1] = p[cj + 1];
                bf[qi + 2] = p[cj + 2];
                bf[qi + 3] = j < tl ? ap[j] : 255;
              }
            }
            if (depth == 4) for (var y = 0; y < h; y++) {
              var s0 = y * bpl,
                  t0 = y * w;

              for (var i = 0; i < w; i++) {
                var qi = t0 + i << 2,
                    j = data[s0 + (i >> 1)] >> 4 - ((i & 1) << 2) & 15,
                    cj = 3 * j;
                bf[qi] = p[cj];
                bf[qi + 1] = p[cj + 1];
                bf[qi + 2] = p[cj + 2];
                bf[qi + 3] = j < tl ? ap[j] : 255;
              }
            }
            if (depth == 8) for (var i = 0; i < area; i++) {
              var qi = i << 2,
                  j = data[i],
                  cj = 3 * j;
              bf[qi] = p[cj];
              bf[qi + 1] = p[cj + 1];
              bf[qi + 2] = p[cj + 2];
              bf[qi + 3] = j < tl ? ap[j] : 255;
            }
          } else if (ctype == 4) {
            // gray + alpha
            if (depth == 8) for (var i = 0; i < area; i++) {
              var qi = i << 2,
                  di = i << 1,
                  gr = data[di];
              bf[qi] = gr;
              bf[qi + 1] = gr;
              bf[qi + 2] = gr;
              bf[qi + 3] = data[di + 1];
            }
            if (depth == 16) for (var i = 0; i < area; i++) {
              var qi = i << 2,
                  di = i << 2,
                  gr = data[di];
              bf[qi] = gr;
              bf[qi + 1] = gr;
              bf[qi + 2] = gr;
              bf[qi + 3] = data[di + 2];
            }
          } else if (ctype == 0) {
            // gray
            var tr = out.tabs["tRNS"] ? out.tabs["tRNS"] : -1;

            for (var y = 0; y < h; y++) {
              var off = y * bpl,
                  to = y * w;
              if (depth == 1) for (var x = 0; x < w; x++) {
                var gr = 255 * (data[off + (x >>> 3)] >>> 7 - (x & 7) & 1),
                    al = gr == tr * 255 ? 0 : 255;
                bf32[to + x] = al << 24 | gr << 16 | gr << 8 | gr;
              } else if (depth == 2) for (var x = 0; x < w; x++) {
                var gr = 85 * (data[off + (x >>> 2)] >>> 6 - ((x & 3) << 1) & 3),
                    al = gr == tr * 85 ? 0 : 255;
                bf32[to + x] = al << 24 | gr << 16 | gr << 8 | gr;
              } else if (depth == 4) for (var x = 0; x < w; x++) {
                var gr = 17 * (data[off + (x >>> 1)] >>> 4 - ((x & 1) << 2) & 15),
                    al = gr == tr * 17 ? 0 : 255;
                bf32[to + x] = al << 24 | gr << 16 | gr << 8 | gr;
              } else if (depth == 8) for (var x = 0; x < w; x++) {
                var gr = data[off + x],
                    al = gr == tr ? 0 : 255;
                bf32[to + x] = al << 24 | gr << 16 | gr << 8 | gr;
              } else if (depth == 16) for (var x = 0; x < w; x++) {
                var gr = data[off + (x << 1)],
                    al = rs(data, off + (x << 1)) == tr ? 0 : 255;
                bf32[to + x] = al << 24 | gr << 16 | gr << 8 | gr;
              }
            }
          } //console.log(Date.now()-time);


          return bf;
        };

        UPNG.decode = function (buff) {
          var data = new Uint8Array(buff),
              offset = 8,
              bin = UPNG._bin,
              rUs = bin.readUshort,
              rUi = bin.readUint;
          var out = {
            tabs: {},
            frames: []
          };
          var dd = new Uint8Array(data.length),
              doff = 0; // put all IDAT data into it

          var fd,
              foff = 0; // frames

          var mgck = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

          for (var i = 0; i < 8; i++) {
            if (data[i] != mgck[i]) throw "The input is not a PNG file!";
          }

          while (offset < data.length) {
            var len = bin.readUint(data, offset);
            offset += 4;
            var type = bin.readASCII(data, offset, 4);
            offset += 4; //console.log(type,len);

            if (type == "IHDR") {
              UPNG.decode._IHDR(data, offset, out);
            } else if (type == "CgBI") {
              out.tabs[type] = data.slice(offset, offset + 4);
            } else if (type == "IDAT") {
              for (var i = 0; i < len; i++) {
                dd[doff + i] = data[offset + i];
              }

              doff += len;
            } else if (type == "acTL") {
              out.tabs[type] = {
                num_frames: rUi(data, offset),
                num_plays: rUi(data, offset + 4)
              };
              fd = new Uint8Array(data.length);
            } else if (type == "fcTL") {
              if (foff != 0) {
                var fr = out.frames[out.frames.length - 1];
                fr.data = UPNG.decode._decompress(out, fd.slice(0, foff), fr.rect.width, fr.rect.height);
                foff = 0;
              }

              var rct = {
                x: rUi(data, offset + 12),
                y: rUi(data, offset + 16),
                width: rUi(data, offset + 4),
                height: rUi(data, offset + 8)
              };
              var del = rUs(data, offset + 22);
              del = rUs(data, offset + 20) / (del == 0 ? 100 : del);
              var frm = {
                rect: rct,
                delay: Math.round(del * 1000),
                dispose: data[offset + 24],
                blend: data[offset + 25]
              }; //console.log(frm);

              out.frames.push(frm);
            } else if (type == "fdAT") {
              for (var i = 0; i < len - 4; i++) {
                fd[foff + i] = data[offset + i + 4];
              }

              foff += len - 4;
            } else if (type == "pHYs") {
              out.tabs[type] = [bin.readUint(data, offset), bin.readUint(data, offset + 4), data[offset + 8]];
            } else if (type == "cHRM") {
              out.tabs[type] = [];

              for (var i = 0; i < 8; i++) {
                out.tabs[type].push(bin.readUint(data, offset + i * 4));
              }
            } else if (type == "tEXt" || type == "zTXt") {
              if (out.tabs[type] == null) out.tabs[type] = {};
              var nz = bin.nextZero(data, offset);
              var keyw = bin.readASCII(data, offset, nz - offset);
              var text,
                  tl = offset + len - nz - 1;
              if (type == "tEXt") text = bin.readASCII(data, nz + 1, tl);else {
                var bfr = UPNG.decode._inflate(data.slice(nz + 2, nz + 2 + tl));

                text = bin.readUTF8(bfr, 0, bfr.length);
              }
              out.tabs[type][keyw] = text;
            } else if (type == "iTXt") {
              if (out.tabs[type] == null) out.tabs[type] = {};
              var nz = 0,
                  off = offset;
              nz = bin.nextZero(data, off);
              var keyw = bin.readASCII(data, off, nz - off);
              off = nz + 1;
              var cflag = data[off];
              off += 2;
              nz = bin.nextZero(data, off);
              var ltag = bin.readASCII(data, off, nz - off);
              off = nz + 1;
              nz = bin.nextZero(data, off);
              var tkeyw = bin.readUTF8(data, off, nz - off);
              off = nz + 1;
              var text,
                  tl = len - (off - offset);
              if (cflag == 0) text = bin.readUTF8(data, off, tl);else {
                var bfr = UPNG.decode._inflate(data.slice(off, off + tl));

                text = bin.readUTF8(bfr, 0, bfr.length);
              }
              out.tabs[type][keyw] = text;
            } else if (type == "PLTE") {
              out.tabs[type] = bin.readBytes(data, offset, len);
            } else if (type == "hIST") {
              var pl = out.tabs["PLTE"].length / 3;
              out.tabs[type] = [];

              for (var i = 0; i < pl; i++) {
                out.tabs[type].push(rUs(data, offset + i * 2));
              }
            } else if (type == "tRNS") {
              if (out.ctype == 3) out.tabs[type] = bin.readBytes(data, offset, len);else if (out.ctype == 0) out.tabs[type] = rUs(data, offset);else if (out.ctype == 2) out.tabs[type] = [rUs(data, offset), rUs(data, offset + 2), rUs(data, offset + 4)]; //else console.log("tRNS for unsupported color type",out.ctype, len);
            } else if (type == "gAMA") out.tabs[type] = bin.readUint(data, offset) / 100000;else if (type == "sRGB") out.tabs[type] = data[offset];else if (type == "bKGD") {
              if (out.ctype == 0 || out.ctype == 4) out.tabs[type] = [rUs(data, offset)];else if (out.ctype == 2 || out.ctype == 6) out.tabs[type] = [rUs(data, offset), rUs(data, offset + 2), rUs(data, offset + 4)];else if (out.ctype == 3) out.tabs[type] = data[offset];
            } else if (type == "IEND") {
              break;
            } //else {  console.log("unknown chunk type", type, len);  out.tabs[type]=data.slice(offset,offset+len);  }


            offset += len;
            var crc = bin.readUint(data, offset);
            offset += 4;
          }

          if (foff != 0) {
            var fr = out.frames[out.frames.length - 1];
            fr.data = UPNG.decode._decompress(out, fd.slice(0, foff), fr.rect.width, fr.rect.height);
          }

          out.data = UPNG.decode._decompress(out, dd, out.width, out.height);
          delete out.compress;
          delete out.interlace;
          delete out.filter;
          return out;
        };

        UPNG.decode._decompress = function (out, dd, w, h) {
          var bpp = UPNG.decode._getBPP(out),
              bpl = Math.ceil(w * bpp / 8),
              buff = new Uint8Array((bpl + 1 + out.interlace) * h);

          if (out.tabs["CgBI"]) dd = UPNG.inflateRaw(dd, buff);else dd = UPNG.decode._inflate(dd, buff); //console.log(dd.length, buff.length);

          if (out.interlace == 0) dd = UPNG.decode._filterZero(dd, out, 0, w, h);else if (out.interlace == 1) dd = UPNG.decode._readInterlace(dd, out); //console.log(Date.now()-time);

          return dd;
        };

        UPNG.decode._inflate = function (data, buff) {
          var out = UPNG["inflateRaw"](new Uint8Array(data.buffer, 2, data.length - 6), buff);
          return out;
        };

        UPNG.inflateRaw = function () {
          var H = {};
          H.H = {};

          H.H.N = function (N, W) {
            var R = Uint8Array,
                i = 0,
                m = 0,
                J = 0,
                h = 0,
                Q = 0,
                X = 0,
                u = 0,
                w = 0,
                d = 0,
                v,
                C;
            if (N[0] == 3 && N[1] == 0) return W ? W : new R(0);
            var V = H.H,
                n = V.b,
                A = V.e,
                l = V.R,
                M = V.n,
                I = V.A,
                e = V.Z,
                b = V.m,
                Z = W == null;
            if (Z) W = new R(N.length >>> 2 << 5);

            while (i == 0) {
              i = n(N, d, 1);
              m = n(N, d + 1, 2);
              d += 3;

              if (m == 0) {
                if ((d & 7) != 0) d += 8 - (d & 7);
                var D = (d >>> 3) + 4,
                    q = N[D - 4] | N[D - 3] << 8;
                if (Z) W = H.H.W(W, w + q);
                W.set(new R(N.buffer, N.byteOffset + D, q), w);
                d = D + q << 3;
                w += q;
                continue;
              }

              if (Z) W = H.H.W(W, w + (1 << 17));

              if (m == 1) {
                v = b.J;
                C = b.h;
                X = (1 << 9) - 1;
                u = (1 << 5) - 1;
              }

              if (m == 2) {
                J = A(N, d, 5) + 257;
                h = A(N, d + 5, 5) + 1;
                Q = A(N, d + 10, 4) + 4;
                d += 14;
                var j = 1;

                for (var c = 0; c < 38; c += 2) {
                  b.Q[c] = 0;
                  b.Q[c + 1] = 0;
                }

                for (var c = 0; c < Q; c++) {
                  var K = A(N, d + c * 3, 3);
                  b.Q[(b.X[c] << 1) + 1] = K;
                  if (K > j) j = K;
                }

                d += 3 * Q;
                M(b.Q, j);
                I(b.Q, j, b.u);
                v = b.w;
                C = b.d;
                d = l(b.u, (1 << j) - 1, J + h, N, d, b.v);
                var r = V.V(b.v, 0, J, b.C);
                X = (1 << r) - 1;
                var S = V.V(b.v, J, h, b.D);
                u = (1 << S) - 1;
                M(b.C, r);
                I(b.C, r, v);
                M(b.D, S);
                I(b.D, S, C);
              }

              while (!0) {
                var T = v[e(N, d) & X];
                d += T & 15;
                var p = T >>> 4;

                if (p >>> 8 == 0) {
                  W[w++] = p;
                } else if (p == 256) {
                  break;
                } else {
                  var z = w + p - 254;

                  if (p > 264) {
                    var _ = b.q[p - 257];
                    z = w + (_ >>> 3) + A(N, d, _ & 7);
                    d += _ & 7;
                  }

                  var $ = C[e(N, d) & u];
                  d += $ & 15;
                  var s = $ >>> 4,
                      Y = b.c[s],
                      a = (Y >>> 4) + n(N, d, Y & 15);
                  d += Y & 15;

                  while (w < z) {
                    W[w] = W[w++ - a];
                    W[w] = W[w++ - a];
                    W[w] = W[w++ - a];
                    W[w] = W[w++ - a];
                  }

                  w = z;
                }
              }
            }

            return W.length == w ? W : W.slice(0, w);
          };

          H.H.W = function (N, W) {
            var R = N.length;
            if (W <= R) return N;
            var V = new Uint8Array(R << 1);
            V.set(N, 0);
            return V;
          };

          H.H.R = function (N, W, R, V, n, A) {
            var l = H.H.e,
                M = H.H.Z,
                I = 0;

            while (I < R) {
              var e = N[M(V, n) & W];
              n += e & 15;
              var b = e >>> 4;

              if (b <= 15) {
                A[I] = b;
                I++;
              } else {
                var Z = 0,
                    m = 0;

                if (b == 16) {
                  m = 3 + l(V, n, 2);
                  n += 2;
                  Z = A[I - 1];
                } else if (b == 17) {
                  m = 3 + l(V, n, 3);
                  n += 3;
                } else if (b == 18) {
                  m = 11 + l(V, n, 7);
                  n += 7;
                }

                var J = I + m;

                while (I < J) {
                  A[I] = Z;
                  I++;
                }
              }
            }

            return n;
          };

          H.H.V = function (N, W, R, V) {
            var n = 0,
                A = 0,
                l = V.length >>> 1;

            while (A < R) {
              var M = N[A + W];
              V[A << 1] = 0;
              V[(A << 1) + 1] = M;
              if (M > n) n = M;
              A++;
            }

            while (A < l) {
              V[A << 1] = 0;
              V[(A << 1) + 1] = 0;
              A++;
            }

            return n;
          };

          H.H.n = function (N, W) {
            var R = H.H.m,
                V = N.length,
                n,
                A,
                l,
                M,
                I,
                e = R.j;

            for (var M = 0; M <= W; M++) {
              e[M] = 0;
            }

            for (M = 1; M < V; M += 2) {
              e[N[M]]++;
            }

            var b = R.K;
            n = 0;
            e[0] = 0;

            for (A = 1; A <= W; A++) {
              n = n + e[A - 1] << 1;
              b[A] = n;
            }

            for (l = 0; l < V; l += 2) {
              I = N[l + 1];

              if (I != 0) {
                N[l] = b[I];
                b[I]++;
              }
            }
          };

          H.H.A = function (N, W, R) {
            var V = N.length,
                n = H.H.m,
                A = n.r;

            for (var l = 0; l < V; l += 2) {
              if (N[l + 1] != 0) {
                var M = l >> 1,
                    I = N[l + 1],
                    e = M << 4 | I,
                    b = W - I,
                    Z = N[l] << b,
                    m = Z + (1 << b);

                while (Z != m) {
                  var J = A[Z] >>> 15 - W;
                  R[J] = e;
                  Z++;
                }
              }
            }
          };

          H.H.l = function (N, W) {
            var R = H.H.m.r,
                V = 15 - W;

            for (var n = 0; n < N.length; n += 2) {
              var A = N[n] << W - N[n + 1];
              N[n] = R[A] >>> V;
            }
          };

          H.H.M = function (N, W, R) {
            R = R << (W & 7);
            var V = W >>> 3;
            N[V] |= R;
            N[V + 1] |= R >>> 8;
          };

          H.H.I = function (N, W, R) {
            R = R << (W & 7);
            var V = W >>> 3;
            N[V] |= R;
            N[V + 1] |= R >>> 8;
            N[V + 2] |= R >>> 16;
          };

          H.H.e = function (N, W, R) {
            return (N[W >>> 3] | N[(W >>> 3) + 1] << 8) >>> (W & 7) & (1 << R) - 1;
          };

          H.H.b = function (N, W, R) {
            return (N[W >>> 3] | N[(W >>> 3) + 1] << 8 | N[(W >>> 3) + 2] << 16) >>> (W & 7) & (1 << R) - 1;
          };

          H.H.Z = function (N, W) {
            return (N[W >>> 3] | N[(W >>> 3) + 1] << 8 | N[(W >>> 3) + 2] << 16) >>> (W & 7);
          };

          H.H.i = function (N, W) {
            return (N[W >>> 3] | N[(W >>> 3) + 1] << 8 | N[(W >>> 3) + 2] << 16 | N[(W >>> 3) + 3] << 24) >>> (W & 7);
          };

          H.H.m = function () {
            var N = Uint16Array,
                W = Uint32Array;
            return {
              K: new N(16),
              j: new N(16),
              X: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
              S: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 999, 999, 999],
              T: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0],
              q: new N(32),
              p: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535],
              z: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0],
              c: new W(32),
              J: new N(512),
              _: [],
              h: new N(32),
              $: [],
              w: new N(32768),
              C: [],
              v: [],
              d: new N(32768),
              D: [],
              u: new N(512),
              Q: [],
              r: new N(1 << 15),
              s: new W(286),
              Y: new W(30),
              a: new W(19),
              t: new W(15e3),
              k: new N(1 << 16),
              g: new N(1 << 15)
            };
          }();

          (function () {
            var N = H.H.m,
                W = 1 << 15;

            for (var R = 0; R < W; R++) {
              var V = R;
              V = (V & 2863311530) >>> 1 | (V & 1431655765) << 1;
              V = (V & 3435973836) >>> 2 | (V & 858993459) << 2;
              V = (V & 4042322160) >>> 4 | (V & 252645135) << 4;
              V = (V & 4278255360) >>> 8 | (V & 16711935) << 8;
              N.r[R] = (V >>> 16 | V << 16) >>> 17;
            }

            function n(A, l, M) {
              while (l-- != 0) {
                A.push(0, M);
              }
            }

            for (var R = 0; R < 32; R++) {
              N.q[R] = N.S[R] << 3 | N.T[R];
              N.c[R] = N.p[R] << 4 | N.z[R];
            }

            n(N._, 144, 8);
            n(N._, 255 - 143, 9);
            n(N._, 279 - 255, 7);
            n(N._, 287 - 279, 8);
            H.H.n(N._, 9);
            H.H.A(N._, 9, N.J);
            H.H.l(N._, 9);
            n(N.$, 32, 5);
            H.H.n(N.$, 5);
            H.H.A(N.$, 5, N.h);
            H.H.l(N.$, 5);
            n(N.Q, 19, 0);
            n(N.C, 286, 0);
            n(N.D, 30, 0);
            n(N.v, 320, 0);
          })();

          return H.H.N;
        }();

        UPNG.decode._readInterlace = function (data, out) {
          var w = out.width,
              h = out.height;

          var bpp = UPNG.decode._getBPP(out),
              cbpp = bpp >> 3,
              bpl = Math.ceil(w * bpp / 8);

          var img = new Uint8Array(h * bpl);
          var di = 0;
          var starting_row = [0, 0, 4, 0, 2, 0, 1];
          var starting_col = [0, 4, 0, 2, 0, 1, 0];
          var row_increment = [8, 8, 8, 4, 4, 2, 2];
          var col_increment = [8, 8, 4, 4, 2, 2, 1];
          var pass = 0;

          while (pass < 7) {
            var ri = row_increment[pass],
                ci = col_increment[pass];
            var sw = 0,
                sh = 0;
            var cr = starting_row[pass];

            while (cr < h) {
              cr += ri;
              sh++;
            }

            var cc = starting_col[pass];

            while (cc < w) {
              cc += ci;
              sw++;
            }

            var bpll = Math.ceil(sw * bpp / 8);

            UPNG.decode._filterZero(data, out, di, sw, sh);

            var y = 0,
                row = starting_row[pass];

            while (row < h) {
              var col = starting_col[pass];
              var cdi = di + y * bpll << 3;

              while (col < w) {
                if (bpp == 1) {
                  var val = data[cdi >> 3];
                  val = val >> 7 - (cdi & 7) & 1;
                  img[row * bpl + (col >> 3)] |= val << 7 - ((col & 7) << 0);
                }

                if (bpp == 2) {
                  var val = data[cdi >> 3];
                  val = val >> 6 - (cdi & 7) & 3;
                  img[row * bpl + (col >> 2)] |= val << 6 - ((col & 3) << 1);
                }

                if (bpp == 4) {
                  var val = data[cdi >> 3];
                  val = val >> 4 - (cdi & 7) & 15;
                  img[row * bpl + (col >> 1)] |= val << 4 - ((col & 1) << 2);
                }

                if (bpp >= 8) {
                  var ii = row * bpl + col * cbpp;

                  for (var j = 0; j < cbpp; j++) {
                    img[ii + j] = data[(cdi >> 3) + j];
                  }
                }

                cdi += bpp;
                col += ci;
              }

              y++;
              row += ri;
            }

            if (sw * sh != 0) di += sh * (1 + bpll);
            pass = pass + 1;
          }

          return img;
        };

        UPNG.decode._getBPP = function (out) {
          var noc = [1, null, 3, 1, 2, null, 4][out.ctype];
          return noc * out.depth;
        };

        UPNG.decode._filterZero = function (data, out, off, w, h) {
          var bpp = UPNG.decode._getBPP(out),
              bpl = Math.ceil(w * bpp / 8),
              paeth = UPNG.decode._paeth;

          bpp = Math.ceil(bpp / 8);
          var i,
              di,
              type = data[off],
              x = 0;
          if (type > 1) data[off] = [0, 0, 1][type - 2];
          if (type == 3) for (x = bpp; x < bpl; x++) {
            data[x + 1] = data[x + 1] + (data[x + 1 - bpp] >>> 1) & 255;
          }

          for (var y = 0; y < h; y++) {
            i = off + y * bpl;
            di = i + y + 1;
            type = data[di - 1];
            x = 0;
            if (type == 0) for (; x < bpl; x++) {
              data[i + x] = data[di + x];
            } else if (type == 1) {
              for (; x < bpp; x++) {
                data[i + x] = data[di + x];
              }

              for (; x < bpl; x++) {
                data[i + x] = data[di + x] + data[i + x - bpp];
              }
            } else if (type == 2) {
              for (; x < bpl; x++) {
                data[i + x] = data[di + x] + data[i + x - bpl];
              }
            } else if (type == 3) {
              for (; x < bpp; x++) {
                data[i + x] = data[di + x] + (data[i + x - bpl] >>> 1);
              }

              for (; x < bpl; x++) {
                data[i + x] = data[di + x] + (data[i + x - bpl] + data[i + x - bpp] >>> 1);
              }
            } else {
              for (; x < bpp; x++) {
                data[i + x] = data[di + x] + paeth(0, data[i + x - bpl], 0);
              }

              for (; x < bpl; x++) {
                data[i + x] = data[di + x] + paeth(data[i + x - bpp], data[i + x - bpl], data[i + x - bpp - bpl]);
              }
            }
          }

          return data;
        };

        UPNG.decode._paeth = function (a, b, c) {
          var p = a + b - c,
              pa = p - a,
              pb = p - b,
              pc = p - c;
          if (pa * pa <= pb * pb && pa * pa <= pc * pc) return a;else if (pb * pb <= pc * pc) return b;
          return c;
        };

        UPNG.decode._IHDR = function (data, offset, out) {
          var bin = UPNG._bin;
          out.width = bin.readUint(data, offset);
          offset += 4;
          out.height = bin.readUint(data, offset);
          offset += 4;
          out.depth = data[offset];
          offset++;
          out.ctype = data[offset];
          offset++;
          out.compress = data[offset];
          offset++;
          out.filter = data[offset];
          offset++;
          out.interlace = data[offset];
          offset++;
        };

        UPNG._bin = {
          nextZero: function nextZero(data, p) {
            while (data[p] != 0) {
              p++;
            }

            return p;
          },
          readUshort: function readUshort(buff, p) {
            return buff[p] << 8 | buff[p + 1];
          },
          writeUshort: function writeUshort(buff, p, n) {
            buff[p] = n >> 8 & 255;
            buff[p + 1] = n & 255;
          },
          readUint: function readUint(buff, p) {
            return buff[p] * (256 * 256 * 256) + (buff[p + 1] << 16 | buff[p + 2] << 8 | buff[p + 3]);
          },
          writeUint: function writeUint(buff, p, n) {
            buff[p] = n >> 24 & 255;
            buff[p + 1] = n >> 16 & 255;
            buff[p + 2] = n >> 8 & 255;
            buff[p + 3] = n & 255;
          },
          readASCII: function readASCII(buff, p, l) {
            var s = "";

            for (var i = 0; i < l; i++) {
              s += String.fromCharCode(buff[p + i]);
            }

            return s;
          },
          writeASCII: function writeASCII(data, p, s) {
            for (var i = 0; i < s.length; i++) {
              data[p + i] = s.charCodeAt(i);
            }
          },
          readBytes: function readBytes(buff, p, l) {
            var arr = [];

            for (var i = 0; i < l; i++) {
              arr.push(buff[p + i]);
            }

            return arr;
          },
          pad: function pad(n) {
            return n.length < 2 ? "0" + n : n;
          },
          readUTF8: function readUTF8(buff, p, l) {
            var s = "",
                ns;

            for (var i = 0; i < l; i++) {
              s += "%" + UPNG._bin.pad(buff[p + i].toString(16));
            }

            try {
              ns = decodeURIComponent(s);
            } catch (e) {
              return UPNG._bin.readASCII(buff, p, l);
            }

            return ns;
          }
        };

        UPNG._copyTile = function (sb, sw, sh, tb, tw, th, xoff, yoff, mode) {
          var w = Math.min(sw, tw),
              h = Math.min(sh, th);
          var si = 0,
              ti = 0;

          for (var y = 0; y < h; y++) {
            for (var x = 0; x < w; x++) {
              if (xoff >= 0 && yoff >= 0) {
                si = y * sw + x << 2;
                ti = (yoff + y) * tw + xoff + x << 2;
              } else {
                si = (-yoff + y) * sw - xoff + x << 2;
                ti = y * tw + x << 2;
              }

              if (mode == 0) {
                tb[ti] = sb[si];
                tb[ti + 1] = sb[si + 1];
                tb[ti + 2] = sb[si + 2];
                tb[ti + 3] = sb[si + 3];
              } else if (mode == 1) {
                var fa = sb[si + 3] * (1 / 255),
                    fr = sb[si] * fa,
                    fg = sb[si + 1] * fa,
                    fb = sb[si + 2] * fa;
                var ba = tb[ti + 3] * (1 / 255),
                    br = tb[ti] * ba,
                    bg = tb[ti + 1] * ba,
                    bb = tb[ti + 2] * ba;
                var ifa = 1 - fa,
                    oa = fa + ba * ifa,
                    ioa = oa == 0 ? 0 : 1 / oa;
                tb[ti + 3] = 255 * oa;
                tb[ti + 0] = (fr + br * ifa) * ioa;
                tb[ti + 1] = (fg + bg * ifa) * ioa;
                tb[ti + 2] = (fb + bb * ifa) * ioa;
              } else if (mode == 2) {
                // copy only differences, otherwise zero
                var fa = sb[si + 3],
                    fr = sb[si],
                    fg = sb[si + 1],
                    fb = sb[si + 2];
                var ba = tb[ti + 3],
                    br = tb[ti],
                    bg = tb[ti + 1],
                    bb = tb[ti + 2];

                if (fa == ba && fr == br && fg == bg && fb == bb) {
                  tb[ti] = 0;
                  tb[ti + 1] = 0;
                  tb[ti + 2] = 0;
                  tb[ti + 3] = 0;
                } else {
                  tb[ti] = fr;
                  tb[ti + 1] = fg;
                  tb[ti + 2] = fb;
                  tb[ti + 3] = fa;
                }
              } else if (mode == 3) {
                // check if can be blended
                var fa = sb[si + 3],
                    fr = sb[si],
                    fg = sb[si + 1],
                    fb = sb[si + 2];
                var ba = tb[ti + 3],
                    br = tb[ti],
                    bg = tb[ti + 1],
                    bb = tb[ti + 2];
                if (fa == ba && fr == br && fg == bg && fb == bb) continue; //if(fa!=255 && ba!=0) return false;

                if (fa < 220 && ba > 20) return false;
              }
            }
          }

          return true;
        };

        UPNG.encode = function (bufs, w, h, ps, dels, tabs, forbidPlte) {
          if (ps == null) ps = 0;
          if (forbidPlte == null) forbidPlte = false;
          var nimg = UPNG.encode.compress(bufs, w, h, ps, [false, false, false, 0, forbidPlte, false]);
          UPNG.encode.compressPNG(nimg, -1);
          return UPNG.encode._main(nimg, w, h, dels, tabs);
        };

        UPNG.encodeLL = function (bufs, w, h, cc, ac, depth, dels, tabs) {
          var nimg = {
            ctype: 0 + (cc == 1 ? 0 : 2) + (ac == 0 ? 0 : 4),
            depth: depth,
            frames: []
          };
          var bipp = (cc + ac) * depth,
              bipl = bipp * w;

          for (var i = 0; i < bufs.length; i++) {
            nimg.frames.push({
              rect: {
                x: 0,
                y: 0,
                width: w,
                height: h
              },
              img: new Uint8Array(bufs[i]),
              blend: 0,
              dispose: 1,
              bpp: Math.ceil(bipp / 8),
              bpl: Math.ceil(bipl / 8)
            });
          }

          UPNG.encode.compressPNG(nimg, 0, true);

          var out = UPNG.encode._main(nimg, w, h, dels, tabs);

          return out;
        };

        UPNG.encode._main = function (nimg, w, h, dels, tabs) {
          if (tabs == null) tabs = {};
          var crc = UPNG.crc.crc,
              wUi = UPNG._bin.writeUint,
              wUs = UPNG._bin.writeUshort,
              wAs = UPNG._bin.writeASCII;
          var offset = 8,
              anim = nimg.frames.length > 1,
              pltAlpha = false;
          var leng = 8 + (16 + 5 + 4)
          /*+ (9+4)*/
          + (anim ? 20 : 0);
          if (tabs["sRGB"] != null) leng += 8 + 1 + 4;
          if (tabs["pHYs"] != null) leng += 8 + 9 + 4;

          if (nimg.ctype == 3) {
            var dl = nimg.plte.length;

            for (var i = 0; i < dl; i++) {
              if (nimg.plte[i] >>> 24 != 255) pltAlpha = true;
            }

            leng += 8 + dl * 3 + 4 + (pltAlpha ? 8 + dl * 1 + 4 : 0);
          }

          for (var j = 0; j < nimg.frames.length; j++) {
            var fr = nimg.frames[j];
            if (anim) leng += 38;
            leng += fr.cimg.length + 12;
            if (j != 0) leng += 4;
          }

          leng += 12;
          var data = new Uint8Array(leng);
          var wr = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

          for (var i = 0; i < 8; i++) {
            data[i] = wr[i];
          }

          wUi(data, offset, 13);
          offset += 4;
          wAs(data, offset, "IHDR");
          offset += 4;
          wUi(data, offset, w);
          offset += 4;
          wUi(data, offset, h);
          offset += 4;
          data[offset] = nimg.depth;
          offset++; // depth

          data[offset] = nimg.ctype;
          offset++; // ctype

          data[offset] = 0;
          offset++; // compress

          data[offset] = 0;
          offset++; // filter

          data[offset] = 0;
          offset++; // interlace

          wUi(data, offset, crc(data, offset - 17, 17));
          offset += 4; // crc
          // 13 bytes to say, that it is sRGB

          if (tabs["sRGB"] != null) {
            wUi(data, offset, 1);
            offset += 4;
            wAs(data, offset, "sRGB");
            offset += 4;
            data[offset] = tabs["sRGB"];
            offset++;
            wUi(data, offset, crc(data, offset - 5, 5));
            offset += 4; // crc
          }

          if (tabs["pHYs"] != null) {
            wUi(data, offset, 9);
            offset += 4;
            wAs(data, offset, "pHYs");
            offset += 4;
            wUi(data, offset, tabs["pHYs"][0]);
            offset += 4;
            wUi(data, offset, tabs["pHYs"][1]);
            offset += 4;
            data[offset] = tabs["pHYs"][2];
            offset++;
            wUi(data, offset, crc(data, offset - 13, 13));
            offset += 4; // crc
          }

          if (anim) {
            wUi(data, offset, 8);
            offset += 4;
            wAs(data, offset, "acTL");
            offset += 4;
            wUi(data, offset, nimg.frames.length);
            offset += 4;
            wUi(data, offset, tabs["loop"] != null ? tabs["loop"] : 0);
            offset += 4;
            wUi(data, offset, crc(data, offset - 12, 12));
            offset += 4; // crc
          }

          if (nimg.ctype == 3) {
            var dl = nimg.plte.length;
            wUi(data, offset, dl * 3);
            offset += 4;
            wAs(data, offset, "PLTE");
            offset += 4;

            for (var i = 0; i < dl; i++) {
              var ti = i * 3,
                  c = nimg.plte[i],
                  r = c & 255,
                  g = c >>> 8 & 255,
                  b = c >>> 16 & 255;
              data[offset + ti + 0] = r;
              data[offset + ti + 1] = g;
              data[offset + ti + 2] = b;
            }

            offset += dl * 3;
            wUi(data, offset, crc(data, offset - dl * 3 - 4, dl * 3 + 4));
            offset += 4; // crc

            if (pltAlpha) {
              wUi(data, offset, dl);
              offset += 4;
              wAs(data, offset, "tRNS");
              offset += 4;

              for (var i = 0; i < dl; i++) {
                data[offset + i] = nimg.plte[i] >>> 24 & 255;
              }

              offset += dl;
              wUi(data, offset, crc(data, offset - dl - 4, dl + 4));
              offset += 4; // crc
            }
          }

          var fi = 0;

          for (var j = 0; j < nimg.frames.length; j++) {
            var fr = nimg.frames[j];

            if (anim) {
              wUi(data, offset, 26);
              offset += 4;
              wAs(data, offset, "fcTL");
              offset += 4;
              wUi(data, offset, fi++);
              offset += 4;
              wUi(data, offset, fr.rect.width);
              offset += 4;
              wUi(data, offset, fr.rect.height);
              offset += 4;
              wUi(data, offset, fr.rect.x);
              offset += 4;
              wUi(data, offset, fr.rect.y);
              offset += 4;
              wUs(data, offset, dels[j]);
              offset += 2;
              wUs(data, offset, 1000);
              offset += 2;
              data[offset] = fr.dispose;
              offset++; // dispose

              data[offset] = fr.blend;
              offset++; // blend

              wUi(data, offset, crc(data, offset - 30, 30));
              offset += 4; // crc
            }

            var imgd = fr.cimg,
                dl = imgd.length;
            wUi(data, offset, dl + (j == 0 ? 0 : 4));
            offset += 4;
            var ioff = offset;
            wAs(data, offset, j == 0 ? "IDAT" : "fdAT");
            offset += 4;

            if (j != 0) {
              wUi(data, offset, fi++);
              offset += 4;
            }

            data.set(imgd, offset);
            offset += dl;
            wUi(data, offset, crc(data, ioff, offset - ioff));
            offset += 4; // crc
          }

          wUi(data, offset, 0);
          offset += 4;
          wAs(data, offset, "IEND");
          offset += 4;
          wUi(data, offset, crc(data, offset - 4, 4));
          offset += 4; // crc

          return data.buffer;
        };

        UPNG.encode.compressPNG = function (out, filter, levelZero) {
          for (var i = 0; i < out.frames.length; i++) {
            var frm = out.frames[i],
                nw = frm.rect.width,
                nh = frm.rect.height;
            var fdata = new Uint8Array(nh * frm.bpl + nh);
            frm.cimg = UPNG.encode._filterZero(frm.img, nh, frm.bpp, frm.bpl, fdata, filter, levelZero);
          }
        };

        UPNG.encode.compress = function (bufs, w, h, ps, prms) // prms:  onlyBlend, minBits, forbidPlte
        {
          //var time = Date.now();
          var onlyBlend = prms[0],
              evenCrd = prms[1],
              forbidPrev = prms[2],
              minBits = prms[3],
              forbidPlte = prms[4],
              dither = prms[5];
          var ctype = 6,
              depth = 8,
              alphaAnd = 255;

          for (var j = 0; j < bufs.length; j++) {
            // when not quantized, other frames can contain colors, that are not in an initial frame
            var img = new Uint8Array(bufs[j]),
                ilen = img.length;

            for (var i = 0; i < ilen; i += 4) {
              alphaAnd &= img[i + 3];
            }
          }

          var gotAlpha = alphaAnd != 255; //console.log("alpha check", Date.now()-time);  time = Date.now();
          //var brute = gotAlpha && forGIF;		// brute : frames can only be copied, not "blended"

          var frms = UPNG.encode.framize(bufs, w, h, onlyBlend, evenCrd, forbidPrev); //console.log("framize", Date.now()-time);  time = Date.now();

          var cmap = {},
              plte = [],
              inds = [];

          if (ps != 0) {
            var nbufs = [];

            for (var i = 0; i < frms.length; i++) {
              nbufs.push(frms[i].img.buffer);
            }

            var abuf = UPNG.encode.concatRGBA(nbufs),
                qres = UPNG.quantize(abuf, ps);

            for (var i = 0; i < qres.plte.length; i++) {
              plte.push(qres.plte[i].est.rgba);
            }

            var cof = 0;

            for (var i = 0; i < frms.length; i++) {
              var frm = frms[i],
                  bln = frm.img.length,
                  ind = new Uint8Array(qres.inds.buffer, cof >> 2, bln >> 2);
              inds.push(ind);
              var bb = new Uint8Array(qres.abuf, cof, bln); //console.log(frm.img, frm.width, frm.height);
              //var time = Date.now();

              if (dither) UPNG.encode.dither(frm.img, frm.rect.width, frm.rect.height, plte, bb, ind); //console.log(Date.now()-time);

              frm.img.set(bb);
              cof += bln;
            } //console.log("quantize", Date.now()-time);  time = Date.now();

          } else {
            // what if ps==0, but there are <=256 colors?  we still need to detect, if the palette could be used
            for (var j = 0; j < frms.length; j++) {
              // when not quantized, other frames can contain colors, that are not in an initial frame
              var frm = frms[j],
                  img32 = new Uint32Array(frm.img.buffer),
                  nw = frm.rect.width,
                  ilen = img32.length;
              var ind = new Uint8Array(ilen);
              inds.push(ind);

              for (var i = 0; i < ilen; i++) {
                var c = img32[i];
                if (i != 0 && c == img32[i - 1]) ind[i] = ind[i - 1];else if (i > nw && c == img32[i - nw]) ind[i] = ind[i - nw];else {
                  var cmc = cmap[c];

                  if (cmc == null) {
                    cmap[c] = cmc = plte.length;
                    plte.push(c);
                    if (plte.length >= 300) break;
                  }

                  ind[i] = cmc;
                }
              }
            } //console.log("make palette", Date.now()-time);  time = Date.now();

          }

          var cc = plte.length; //console.log("colors:",cc);

          if (cc <= 256 && forbidPlte == false) {
            if (cc <= 2) depth = 1;else if (cc <= 4) depth = 2;else if (cc <= 16) depth = 4;else depth = 8;
            depth = Math.max(depth, minBits);
          }

          for (var j = 0; j < frms.length; j++) {
            var frm = frms[j],
                nx = frm.rect.x,
                ny = frm.rect.y,
                nw = frm.rect.width,
                nh = frm.rect.height;
            var cimg = frm.img,
                cimg32 = new Uint32Array(cimg.buffer);
            var bpl = 4 * nw,
                bpp = 4;

            if (cc <= 256 && forbidPlte == false) {
              bpl = Math.ceil(depth * nw / 8);
              var nimg = new Uint8Array(bpl * nh);
              var inj = inds[j];

              for (var y = 0; y < nh; y++) {
                var i = y * bpl,
                    ii = y * nw;
                if (depth == 8) for (var x = 0; x < nw; x++) {
                  nimg[i + x] = inj[ii + x];
                } else if (depth == 4) for (var x = 0; x < nw; x++) {
                  nimg[i + (x >> 1)] |= inj[ii + x] << 4 - (x & 1) * 4;
                } else if (depth == 2) for (var x = 0; x < nw; x++) {
                  nimg[i + (x >> 2)] |= inj[ii + x] << 6 - (x & 3) * 2;
                } else if (depth == 1) for (var x = 0; x < nw; x++) {
                  nimg[i + (x >> 3)] |= inj[ii + x] << 7 - (x & 7) * 1;
                }
              }

              cimg = nimg;
              ctype = 3;
              bpp = 1;
            } else if (gotAlpha == false && frms.length == 1) {
              // some next "reduced" frames may contain alpha for blending
              var nimg = new Uint8Array(nw * nh * 3),
                  area = nw * nh;

              for (var i = 0; i < area; i++) {
                var ti = i * 3,
                    qi = i * 4;
                nimg[ti] = cimg[qi];
                nimg[ti + 1] = cimg[qi + 1];
                nimg[ti + 2] = cimg[qi + 2];
              }

              cimg = nimg;
              ctype = 2;
              bpp = 3;
              bpl = 3 * nw;
            }

            frm.img = cimg;
            frm.bpl = bpl;
            frm.bpp = bpp;
          } //console.log("colors => palette indices", Date.now()-time);  time = Date.now();


          return {
            ctype: ctype,
            depth: depth,
            plte: plte,
            frames: frms
          };
        };

        UPNG.encode.framize = function (bufs, w, h, alwaysBlend, evenCrd, forbidPrev) {
          /*  DISPOSE
              - 0 : no change
          	- 1 : clear to transparent
          	- 2 : retstore to content before rendering (previous frame disposed)
          	BLEND
          	- 0 : replace
          	- 1 : blend
          */
          var frms = [];

          for (var j = 0; j < bufs.length; j++) {
            var cimg = new Uint8Array(bufs[j]),
                cimg32 = new Uint32Array(cimg.buffer);
            var nimg;
            var nx = 0,
                ny = 0,
                nw = w,
                nh = h,
                blend = alwaysBlend ? 1 : 0;

            if (j != 0) {
              var tlim = forbidPrev || alwaysBlend || j == 1 || frms[j - 2].dispose != 0 ? 1 : 2,
                  tstp = 0,
                  tarea = 1e9;

              for (var it = 0; it < tlim; it++) {
                var pimg = new Uint8Array(bufs[j - 1 - it]),
                    p32 = new Uint32Array(bufs[j - 1 - it]);
                var mix = w,
                    miy = h,
                    max = -1,
                    may = -1;

                for (var y = 0; y < h; y++) {
                  for (var x = 0; x < w; x++) {
                    var i = y * w + x;

                    if (cimg32[i] != p32[i]) {
                      if (x < mix) mix = x;
                      if (x > max) max = x;
                      if (y < miy) miy = y;
                      if (y > may) may = y;
                    }
                  }
                }

                if (max == -1) mix = miy = max = may = 0;

                if (evenCrd) {
                  if ((mix & 1) == 1) mix--;
                  if ((miy & 1) == 1) miy--;
                }

                var sarea = (max - mix + 1) * (may - miy + 1);

                if (sarea < tarea) {
                  tarea = sarea;
                  tstp = it;
                  nx = mix;
                  ny = miy;
                  nw = max - mix + 1;
                  nh = may - miy + 1;
                }
              } // alwaysBlend: pokud zjistím, že blendit nelze, nastavím předchozímu snímku dispose=1. Zajistím, aby obsahoval můj obdélník.


              var pimg = new Uint8Array(bufs[j - 1 - tstp]);
              if (tstp == 1) frms[j - 1].dispose = 2;
              nimg = new Uint8Array(nw * nh * 4);

              UPNG._copyTile(pimg, w, h, nimg, nw, nh, -nx, -ny, 0);

              blend = UPNG._copyTile(cimg, w, h, nimg, nw, nh, -nx, -ny, 3) ? 1 : 0;
              if (blend == 1) UPNG.encode._prepareDiff(cimg, w, h, nimg, {
                x: nx,
                y: ny,
                width: nw,
                height: nh
              });else UPNG._copyTile(cimg, w, h, nimg, nw, nh, -nx, -ny, 0); //UPNG._copyTile(cimg,w,h, nimg,nw,nh, -nx,-ny, blend==1?2:0);
            } else nimg = cimg.slice(0); // img may be rewritten further ... don't rewrite input


            frms.push({
              rect: {
                x: nx,
                y: ny,
                width: nw,
                height: nh
              },
              img: nimg,
              blend: blend,
              dispose: 0
            });
          }

          if (alwaysBlend) for (var j = 0; j < frms.length; j++) {
            var frm = frms[j];
            if (frm.blend == 1) continue;
            var r0 = frm.rect,
                r1 = frms[j - 1].rect;
            var miX = Math.min(r0.x, r1.x),
                miY = Math.min(r0.y, r1.y);
            var maX = Math.max(r0.x + r0.width, r1.x + r1.width),
                maY = Math.max(r0.y + r0.height, r1.y + r1.height);
            var r = {
              x: miX,
              y: miY,
              width: maX - miX,
              height: maY - miY
            };
            frms[j - 1].dispose = 1;
            if (j - 1 != 0) UPNG.encode._updateFrame(bufs, w, h, frms, j - 1, r, evenCrd);

            UPNG.encode._updateFrame(bufs, w, h, frms, j, r, evenCrd);
          }
          var area = 0;
          if (bufs.length != 1) for (var i = 0; i < frms.length; i++) {
            var frm = frms[i];
            area += frm.rect.width * frm.rect.height; //if(i==0 || frm.blend!=1) continue;
            //var ob = new Uint8Array(
            //console.log(frm.blend, frm.dispose, frm.rect);
          } //if(area!=0) console.log(area);

          return frms;
        };

        UPNG.encode._updateFrame = function (bufs, w, h, frms, i, r, evenCrd) {
          var U8 = Uint8Array,
              U32 = Uint32Array;
          var pimg = new U8(bufs[i - 1]),
              pimg32 = new U32(bufs[i - 1]),
              nimg = i + 1 < bufs.length ? new U8(bufs[i + 1]) : null;
          var cimg = new U8(bufs[i]),
              cimg32 = new U32(cimg.buffer);
          var mix = w,
              miy = h,
              max = -1,
              may = -1;

          for (var y = 0; y < r.height; y++) {
            for (var x = 0; x < r.width; x++) {
              var cx = r.x + x,
                  cy = r.y + y;
              var j = cy * w + cx,
                  cc = cimg32[j]; // no need to draw transparency, or to dispose it. Or, if writing the same color and the next one does not need transparency.

              if (cc == 0 || frms[i - 1].dispose == 0 && pimg32[j] == cc && (nimg == null || nimg[j * 4 + 3] != 0)
              /**/
              ) ;else {
                if (cx < mix) mix = cx;
                if (cx > max) max = cx;
                if (cy < miy) miy = cy;
                if (cy > may) may = cy;
              }
            }
          }

          if (max == -1) mix = miy = max = may = 0;

          if (evenCrd) {
            if ((mix & 1) == 1) mix--;
            if ((miy & 1) == 1) miy--;
          }

          r = {
            x: mix,
            y: miy,
            width: max - mix + 1,
            height: may - miy + 1
          };
          var fr = frms[i];
          fr.rect = r;
          fr.blend = 1;
          fr.img = new Uint8Array(r.width * r.height * 4);

          if (frms[i - 1].dispose == 0) {
            UPNG._copyTile(pimg, w, h, fr.img, r.width, r.height, -r.x, -r.y, 0);

            UPNG.encode._prepareDiff(cimg, w, h, fr.img, r); //UPNG._copyTile(cimg,w,h, fr.img,r.width,r.height, -r.x,-r.y, 2);

          } else UPNG._copyTile(cimg, w, h, fr.img, r.width, r.height, -r.x, -r.y, 0);
        };

        UPNG.encode._prepareDiff = function (cimg, w, h, nimg, rec) {
          UPNG._copyTile(cimg, w, h, nimg, rec.width, rec.height, -rec.x, -rec.y, 2);
          /*
          var n32 = new Uint32Array(nimg.buffer);
          var og = new Uint8Array(rec.width*rec.height*4), o32 = new Uint32Array(og.buffer);
          UPNG._copyTile(cimg,w,h, og,rec.width,rec.height, -rec.x,-rec.y, 0);
          for(var i=4; i<nimg.length; i+=4) {
          	if(nimg[i-1]!=0 && nimg[i+3]==0 && o32[i>>>2]==o32[(i>>>2)-1]) {
          		n32[i>>>2]=o32[i>>>2];
          		//var j = i, c=p32[(i>>>2)-1];
          		//while(p32[j>>>2]==c) {  n32[j>>>2]=c;  j+=4;  }
          	}
          }
          for(var i=nimg.length-8; i>0; i-=4) {
          	if(nimg[i+7]!=0 && nimg[i+3]==0 && o32[i>>>2]==o32[(i>>>2)+1]) {
          		n32[i>>>2]=o32[i>>>2];
          		//var j = i, c=p32[(i>>>2)-1];
          		//while(p32[j>>>2]==c) {  n32[j>>>2]=c;  j+=4;  }
          	}
          }*/

        };

        UPNG.encode._filterZero = function (img, h, bpp, bpl, data, filter, levelZero) {
          var fls = [],
              ftry = [0, 1, 2, 3, 4];
          if (filter != -1) ftry = [filter];else if (h * bpl > 500000 || bpp == 1) ftry = [0];
          var opts;
          if (levelZero) opts = {
            level: 0
          };
          var CMPR = UZIP;

          for (var i = 0; i < ftry.length; i++) {
            for (var y = 0; y < h; y++) {
              UPNG.encode._filterLine(data, img, y, bpl, bpp, ftry[i]);
            } //var nimg = new Uint8Array(data.length);
            //var sz = UZIP.F.deflate(data, nimg);  fls.push(nimg.slice(0,sz));
            //var dfl = pako["deflate"](data), dl=dfl.length-4;
            //var crc = (dfl[dl+3]<<24)|(dfl[dl+2]<<16)|(dfl[dl+1]<<8)|(dfl[dl+0]<<0);
            //console.log(crc, UZIP.adler(data,2,data.length-6));


            fls.push(CMPR["deflate"](data, opts));
          }

          var ti,
              tsize = 1e9;

          for (var i = 0; i < fls.length; i++) {
            if (fls[i].length < tsize) {
              ti = i;
              tsize = fls[i].length;
            }
          }

          return fls[ti];
        };

        UPNG.encode._filterLine = function (data, img, y, bpl, bpp, type) {
          var i = y * bpl,
              di = i + y,
              paeth = UPNG.decode._paeth;
          data[di] = type;
          di++;

          if (type == 0) {
            if (bpl < 500) for (var x = 0; x < bpl; x++) {
              data[di + x] = img[i + x];
            } else data.set(new Uint8Array(img.buffer, i, bpl), di);
          } else if (type == 1) {
            for (var x = 0; x < bpp; x++) {
              data[di + x] = img[i + x];
            }

            for (var x = bpp; x < bpl; x++) {
              data[di + x] = img[i + x] - img[i + x - bpp] + 256 & 255;
            }
          } else if (y == 0) {
            for (var x = 0; x < bpp; x++) {
              data[di + x] = img[i + x];
            }

            if (type == 2) for (var x = bpp; x < bpl; x++) {
              data[di + x] = img[i + x];
            }
            if (type == 3) for (var x = bpp; x < bpl; x++) {
              data[di + x] = img[i + x] - (img[i + x - bpp] >> 1) + 256 & 255;
            }
            if (type == 4) for (var x = bpp; x < bpl; x++) {
              data[di + x] = img[i + x] - paeth(img[i + x - bpp], 0, 0) + 256 & 255;
            }
          } else {
            if (type == 2) {
              for (var x = 0; x < bpl; x++) {
                data[di + x] = img[i + x] + 256 - img[i + x - bpl] & 255;
              }
            }

            if (type == 3) {
              for (var x = 0; x < bpp; x++) {
                data[di + x] = img[i + x] + 256 - (img[i + x - bpl] >> 1) & 255;
              }

              for (var x = bpp; x < bpl; x++) {
                data[di + x] = img[i + x] + 256 - (img[i + x - bpl] + img[i + x - bpp] >> 1) & 255;
              }
            }

            if (type == 4) {
              for (var x = 0; x < bpp; x++) {
                data[di + x] = img[i + x] + 256 - paeth(0, img[i + x - bpl], 0) & 255;
              }

              for (var x = bpp; x < bpl; x++) {
                data[di + x] = img[i + x] + 256 - paeth(img[i + x - bpp], img[i + x - bpl], img[i + x - bpp - bpl]) & 255;
              }
            }
          }
        };

        UPNG.crc = {
          table: function () {
            var tab = new Uint32Array(256);

            for (var n = 0; n < 256; n++) {
              var c = n;

              for (var k = 0; k < 8; k++) {
                if (c & 1) c = 0xedb88320 ^ c >>> 1;else c = c >>> 1;
              }

              tab[n] = c;
            }

            return tab;
          }(),
          update: function update(c, buf, off, len) {
            for (var i = 0; i < len; i++) {
              c = UPNG.crc.table[(c ^ buf[off + i]) & 0xff] ^ c >>> 8;
            }

            return c;
          },
          crc: function crc(b, o, l) {
            return UPNG.crc.update(0xffffffff, b, o, l) ^ 0xffffffff;
          }
        };

        UPNG.quantize = function (abuf, ps) {
          var sb = new Uint8Array(abuf),
              tb = sb.slice(0),
              tb32 = new Uint32Array(tb.buffer);
          var KD = UPNG.quantize.getKDtree(tb, ps);
          var root = KD[0],
              leafs = KD[1];
          var planeDst = UPNG.quantize.planeDst;
          var len = sb.length;
          var inds = new Uint8Array(len >> 2),
              nd;
          if (sb.length < 20e6) // precise, but slow :(
            for (var i = 0; i < len; i += 4) {
              var r = sb[i] * (1 / 255),
                  g = sb[i + 1] * (1 / 255),
                  b = sb[i + 2] * (1 / 255),
                  a = sb[i + 3] * (1 / 255);
              nd = UPNG.quantize.getNearest(root, r, g, b, a);
              inds[i >> 2] = nd.ind;
              tb32[i >> 2] = nd.est.rgba;
            } else for (var i = 0; i < len; i += 4) {
            var r = sb[i] * (1 / 255),
                g = sb[i + 1] * (1 / 255),
                b = sb[i + 2] * (1 / 255),
                a = sb[i + 3] * (1 / 255);
            nd = root;

            while (nd.left) {
              nd = planeDst(nd.est, r, g, b, a) <= 0 ? nd.left : nd.right;
            }

            inds[i >> 2] = nd.ind;
            tb32[i >> 2] = nd.est.rgba;
          }
          return {
            abuf: tb.buffer,
            inds: inds,
            plte: leafs
          };
        };

        UPNG.quantize.getKDtree = function (nimg, ps, err) {
          if (err == null) err = 0.0001;
          var nimg32 = new Uint32Array(nimg.buffer);
          var root = {
            i0: 0,
            i1: nimg.length,
            bst: null,
            est: null,
            tdst: 0,
            left: null,
            right: null
          }; // basic statistic, extra statistic

          root.bst = UPNG.quantize.stats(nimg, root.i0, root.i1);
          root.est = UPNG.quantize.estats(root.bst);
          var leafs = [root];

          while (leafs.length < ps) {
            var maxL = 0,
                mi = 0;

            for (var i = 0; i < leafs.length; i++) {
              if (leafs[i].est.L > maxL) {
                maxL = leafs[i].est.L;
                mi = i;
              }
            }

            if (maxL < err) break;
            var node = leafs[mi];
            var s0 = UPNG.quantize.splitPixels(nimg, nimg32, node.i0, node.i1, node.est.e, node.est.eMq255);
            var s0wrong = node.i0 >= s0 || node.i1 <= s0; //console.log(maxL, leafs.length, mi);

            if (s0wrong) {
              node.est.L = 0;
              continue;
            }

            var ln = {
              i0: node.i0,
              i1: s0,
              bst: null,
              est: null,
              tdst: 0,
              left: null,
              right: null
            };
            ln.bst = UPNG.quantize.stats(nimg, ln.i0, ln.i1);
            ln.est = UPNG.quantize.estats(ln.bst);
            var rn = {
              i0: s0,
              i1: node.i1,
              bst: null,
              est: null,
              tdst: 0,
              left: null,
              right: null
            };
            rn.bst = {
              R: [],
              m: [],
              N: node.bst.N - ln.bst.N
            };

            for (var i = 0; i < 16; i++) {
              rn.bst.R[i] = node.bst.R[i] - ln.bst.R[i];
            }

            for (var i = 0; i < 4; i++) {
              rn.bst.m[i] = node.bst.m[i] - ln.bst.m[i];
            }

            rn.est = UPNG.quantize.estats(rn.bst);
            node.left = ln;
            node.right = rn;
            leafs[mi] = ln;
            leafs.push(rn);
          }

          leafs.sort(function (a, b) {
            return b.bst.N - a.bst.N;
          });

          for (var i = 0; i < leafs.length; i++) {
            leafs[i].ind = i;
          }

          return [root, leafs];
        };

        UPNG.quantize.getNearest = function (nd, r, g, b, a) {
          if (nd.left == null) {
            nd.tdst = UPNG.quantize.dist(nd.est.q, r, g, b, a);
            return nd;
          }

          var planeDst = UPNG.quantize.planeDst(nd.est, r, g, b, a);
          var node0 = nd.left,
              node1 = nd.right;

          if (planeDst > 0) {
            node0 = nd.right;
            node1 = nd.left;
          }

          var ln = UPNG.quantize.getNearest(node0, r, g, b, a);
          if (ln.tdst <= planeDst * planeDst) return ln;
          var rn = UPNG.quantize.getNearest(node1, r, g, b, a);
          return rn.tdst < ln.tdst ? rn : ln;
        };

        UPNG.quantize.planeDst = function (est, r, g, b, a) {
          var e = est.e;
          return e[0] * r + e[1] * g + e[2] * b + e[3] * a - est.eMq;
        };

        UPNG.quantize.dist = function (q, r, g, b, a) {
          var d0 = r - q[0],
              d1 = g - q[1],
              d2 = b - q[2],
              d3 = a - q[3];
          return d0 * d0 + d1 * d1 + d2 * d2 + d3 * d3;
        };

        UPNG.quantize.splitPixels = function (nimg, nimg32, i0, i1, e, eMq) {
          var vecDot = UPNG.quantize.vecDot;
          i1 -= 4;

          while (i0 < i1) {
            while (vecDot(nimg, i0, e) <= eMq) {
              i0 += 4;
            }

            while (vecDot(nimg, i1, e) > eMq) {
              i1 -= 4;
            }

            if (i0 >= i1) break;
            var t = nimg32[i0 >> 2];
            nimg32[i0 >> 2] = nimg32[i1 >> 2];
            nimg32[i1 >> 2] = t;
            i0 += 4;
            i1 -= 4;
          }

          while (vecDot(nimg, i0, e) > eMq) {
            i0 -= 4;
          }

          return i0 + 4;
        };

        UPNG.quantize.vecDot = function (nimg, i, e) {
          return nimg[i] * e[0] + nimg[i + 1] * e[1] + nimg[i + 2] * e[2] + nimg[i + 3] * e[3];
        };

        UPNG.quantize.stats = function (nimg, i0, i1) {
          var R = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          var m = [0, 0, 0, 0];
          var N = i1 - i0 >> 2;

          for (var i = i0; i < i1; i += 4) {
            var r = nimg[i] * (1 / 255),
                g = nimg[i + 1] * (1 / 255),
                b = nimg[i + 2] * (1 / 255),
                a = nimg[i + 3] * (1 / 255); //var r = nimg[i], g = nimg[i+1], b = nimg[i+2], a = nimg[i+3];

            m[0] += r;
            m[1] += g;
            m[2] += b;
            m[3] += a;
            R[0] += r * r;
            R[1] += r * g;
            R[2] += r * b;
            R[3] += r * a;
            R[5] += g * g;
            R[6] += g * b;
            R[7] += g * a;
            R[10] += b * b;
            R[11] += b * a;
            R[15] += a * a;
          }

          R[4] = R[1];
          R[8] = R[2];
          R[9] = R[6];
          R[12] = R[3];
          R[13] = R[7];
          R[14] = R[11];
          return {
            R: R,
            m: m,
            N: N
          };
        };

        UPNG.quantize.estats = function (stats) {
          var R = stats.R,
              m = stats.m,
              N = stats.N; // when all samples are equal, but N is large (millions), the Rj can be non-zero ( 0.0003.... - precission error)

          var m0 = m[0],
              m1 = m[1],
              m2 = m[2],
              m3 = m[3],
              iN = N == 0 ? 0 : 1 / N;
          var Rj = [R[0] - m0 * m0 * iN, R[1] - m0 * m1 * iN, R[2] - m0 * m2 * iN, R[3] - m0 * m3 * iN, R[4] - m1 * m0 * iN, R[5] - m1 * m1 * iN, R[6] - m1 * m2 * iN, R[7] - m1 * m3 * iN, R[8] - m2 * m0 * iN, R[9] - m2 * m1 * iN, R[10] - m2 * m2 * iN, R[11] - m2 * m3 * iN, R[12] - m3 * m0 * iN, R[13] - m3 * m1 * iN, R[14] - m3 * m2 * iN, R[15] - m3 * m3 * iN];
          var A = Rj,
              M = UPNG.M4;
          var b = [Math.random(), Math.random(), Math.random(), Math.random()],
              mi = 0,
              tmi = 0;
          if (N != 0) for (var i = 0; i < 16; i++) {
            b = M.multVec(A, b);
            tmi = Math.sqrt(M.dot(b, b));
            b = M.sml(1 / tmi, b);
            if (i != 0 && Math.abs(tmi - mi) < 1e-9) break;
            mi = tmi;
          } //b = [0,0,1,0];  mi=N;

          var q = [m0 * iN, m1 * iN, m2 * iN, m3 * iN];
          var eMq255 = M.dot(M.sml(255, q), b);
          return {
            Cov: Rj,
            q: q,
            e: b,
            L: mi,
            eMq255: eMq255,
            eMq: M.dot(b, q),
            rgba: (Math.round(255 * q[3]) << 24 | Math.round(255 * q[2]) << 16 | Math.round(255 * q[1]) << 8 | Math.round(255 * q[0]) << 0) >>> 0
          };
        };

        UPNG.M4 = {
          multVec: function multVec(m, v) {
            return [m[0] * v[0] + m[1] * v[1] + m[2] * v[2] + m[3] * v[3], m[4] * v[0] + m[5] * v[1] + m[6] * v[2] + m[7] * v[3], m[8] * v[0] + m[9] * v[1] + m[10] * v[2] + m[11] * v[3], m[12] * v[0] + m[13] * v[1] + m[14] * v[2] + m[15] * v[3]];
          },
          dot: function dot(x, y) {
            return x[0] * y[0] + x[1] * y[1] + x[2] * y[2] + x[3] * y[3];
          },
          sml: function sml(a, y) {
            return [a * y[0], a * y[1], a * y[2], a * y[3]];
          }
        };

        UPNG.encode.concatRGBA = function (bufs) {
          var tlen = 0;

          for (var i = 0; i < bufs.length; i++) {
            tlen += bufs[i].byteLength;
          }

          var nimg = new Uint8Array(tlen),
              noff = 0;

          for (var i = 0; i < bufs.length; i++) {
            var img = new Uint8Array(bufs[i]),
                il = img.length;

            for (var j = 0; j < il; j += 4) {
              var r = img[j],
                  g = img[j + 1],
                  b = img[j + 2],
                  a = img[j + 3];
              if (a == 0) r = g = b = 0;
              nimg[noff + j] = r;
              nimg[noff + j + 1] = g;
              nimg[noff + j + 2] = b;
              nimg[noff + j + 3] = a;
            }

            noff += il;
          }

          return nimg.buffer;
        };

        UPNG.encode.dither = function (sb, w, h, plte, tb, oind) {
          function addErr(er, tg, ti, f) {
            tg[ti] += er[0] * f >> 4;
            tg[ti + 1] += er[1] * f >> 4;
            tg[ti + 2] += er[2] * f >> 4;
            tg[ti + 3] += er[3] * f >> 4;
          }

          function N(x) {
            return Math.max(0, Math.min(255, x));
          }

          function D(a, b) {
            var dr = a[0] - b[0],
                dg = a[1] - b[1],
                db = a[2] - b[2],
                da = a[3] - b[3];
            return dr * dr + dg * dg + db * db + da * da;
          }

          var pc = plte.length,
              nplt = [],
              rads = [];

          for (var i = 0; i < pc; i++) {
            var c = plte[i];
            nplt.push([c >>> 0 & 255, c >>> 8 & 255, c >>> 16 & 255, c >>> 24 & 255]);
          }

          for (var i = 0; i < pc; i++) {
            var ne = 0xffffffff,
                ni = 0;

            for (var j = 0; j < pc; j++) {
              var ce = D(nplt[i], nplt[j]);

              if (j != i && ce < ne) {
                ne = ce;
                ni = j;
              }
            }

            var hd = Math.sqrt(ne) / 2;
            rads[i] = ~~(hd * hd);
          }

          var tb32 = new Uint32Array(tb.buffer);
          var err = new Int16Array(w * h * 4);

          for (var y = 0; y < h; y++) {
            for (var x = 0; x < w; x++) {
              var i = (y * w + x) * 4;
              var cc = [N(sb[i] + err[i]), N(sb[i + 1] + err[i + 1]), N(sb[i + 2] + err[i + 2]), N(sb[i + 3] + err[i + 3])];
              var ni = 0,
                  nd = 0xffffff;

              for (var j = 0; j < pc; j++) {
                var cd = D(cc, nplt[j]);

                if (cd < nd) {
                  nd = cd;
                  ni = j;
                }
              } //ni = oind[i>>2];


              var nc = nplt[ni];
              var er = [cc[0] - nc[0], cc[1] - nc[1], cc[2] - nc[2], cc[3] - nc[3]]; //addErr(er, err, i+4, 16);
              //*

              if (x != w - 1) addErr(er, err, i + 4, 7);

              if (y != h - 1) {
                if (x != 0) addErr(er, err, i + 4 * w - 4, 3);
                addErr(er, err, i + 4 * w, 5);
                if (x != w - 1) addErr(er, err, i + 4 * w + 4, 1); //*/
              }

              oind[i >> 2] = ni;
              tb32[i >> 2] = plte[ni];
            }
          }
        };

        module.exports = UPNG; // #endregion ORIGINAL CODE

        _cjsExports = exports('default', module.exports);
      }, {});
    }
  };
});

System.register("chunks:///_virtual/UPNG.mjs_cjs=&original=.js", ['./UPNG.js', './cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var __cjsMetaURL, loader;

  return {
    setters: [function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }, function (module) {
      loader = module.default;
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './UPNG.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./UPNG.js', module.meta.url);
      }

      loader.require(__cjsMetaURL);
    }
  };
});

System.register("chunks:///_virtual/utils.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      var _cjsExports;

      var __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);

      loader.define(__cjsMetaURL, function (exports$1, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        function randomElement(arr) {
          if (!arr) debugger;
          return arr[Math.floor(Math.random() * arr.length)];
        }

        function randIntRange(min, max) {
          return min + Math.round(Math.random() * (max - min));
        }

        function pickOutRandomElements(arr, total) {
          if (arr.length < total) return console.error("invalid arr", arr, total);
          var shuffleArr = arr.slice().sort(function () {
            return Math.random() - 0.5;
          });
          return shuffleArr.slice(0, total);
        }

        module.exports = {
          randomElement: randomElement,
          randIntRange: randIntRange,
          pickOutRandomElements: pickOutRandomElements
        }; // #endregion ORIGINAL CODE

        _cjsExports = exports('default', module.exports);
        module.exports.randomElement;
        module.exports.randIntRange;
        module.exports.pickOutRandomElements;
      }, {});
    }
  };
});

System.register("chunks:///_virtual/utils.mjs_cjs=&original=.js", ['./utils.js', './cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var __cjsMetaURL, loader;

  return {
    setters: [function (module) {
      __cjsMetaURL = module.__cjsMetaURL;
      var _setter = {};
      _setter.__cjsMetaURL = module.__cjsMetaURL;
      _setter.default = module.default;
      exports(_setter);
    }, function (module) {
      loader = module.default;
    }],
    execute: function () {
      // I am the facade module who provides access to the CommonJS module './utils.js'~
      if (!__cjsMetaURL) {
        loader.throwInvalidWrapper('./utils.js', module.meta.url);
      }

      loader.require(__cjsMetaURL);
    }
  };
});

} }; });