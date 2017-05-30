/**
 * ObjectiveCanvas.js
 * By: hhh ( https://github.com/huang2002/ObjectiveCanvas.js )
 */
(function() {

    // load error
    if (window.ObjectiveCanvas) {
        console.warn("Double load?");
        return;
    }

    // ------------ //
    // define error //
    // ------------ //

    // TypeError
    function ObjectiveCanvasTypeError(type) {
        this.message = "Error type for '" + type + "'!";
    }
    ObjectiveCanvasTypeError.prototype = new Error();

    // UndefinedError
    function ObjectiveCanvasUndefinedError(method) {
        this.message = method + "() has not been defined!";
    }
    ObjectiveCanvasUndefinedError.prototype = new Error();

    // --------- //
    // container //
    // --------- //

    var OC = new Object();

    // ------------- //
    // define method //
    // ------------- //

    // default context
    OC.defaultContext = null;

    // set default context
    OC.setDefultContext = function(ctx) {
        this.defaultContext = ctx;
        return this;
    };

    // ------------------ //
    // define constructor //
    // ------------------ //

    // basic shape
    OC.Shape = function(x = 0, y = 0) {
        // x
        Object.defineProperty(this, 'x', {
            set: function(val) {
                if (typeof val === "number") {
                    this._x = val;
                } else {
                    throw new ObjectiveCanvasTypeError('x');
                }
            },
            get: function() {
                return this._x || 0;
            }
        });
        // set x
        this.setX = function(val) {
            this.x = val;
            return this;
        };
        // y
        Object.defineProperty(this, 'y', {
            set: function(val) {
                if (typeof val === "number") {
                    this._y = val;
                } else {
                    throw new ObjectiveCanvasTypeError('y');
                }
            },
            get: function() {
                return this._y || 0;
            }
        });
        // set y
        this.setY = function(val) {
            this.y = val;
            return this;
        };
        // set pos
        this.setPos = function(x, y) {
            return this.setX(x).setY(y);
        };
        // translate
        this.translate = function(x = 0, y = 0) {
            if (typeof x !== "number") {
                throw new ObjectiveCanvasTypeError("x");
            } else if (typeof y !== "number") {
                throw new ObjectiveCanvasTypeError("y");
            } else {
                this.x += x;
                this.y += y;
                return this;
            }
        };
        // fillStyle
        this.fillStyle = "#000000";
        // set fillStyle
        this.setFillStyle = function(val) {
            this.fillStyle = val;
            return this;
        };
        // strokeStyle
        this.strokeStyle = "#000000";
        // set strokeStyle
        this.setStrokeStyle = function(val) {
            this.strokeStyle = val;
            return this;
        };
        // lineWidth
        Object.defineProperty(this, "lineWidth", {
            set: function(val) {
                if (typeof val === "number") {
                    this._lineWidth = val;
                } else {
                    throw new ObjectiveCanvasTypeError("lineWidth");
                }
            },
            get: function() {
                return this._lineWidth;
            }
        });
        // set lineWidth
        this.setLineWidth = function(val) {
            this.lineWidth = val;
        };
        // lineCap
        this.lineCap = "butt";
        // set lineCap
        this.setLineCap = function(val) {
            this.lineCap = val;
            return this;
        };
        // lineJoin
        this.lineJoin = "miter";
        // set lineJoin
        this.setLineJoin = function(val) {
            this.lineJoin = val;
            return this;
        };
        // path
        this.path = function(ctx = OC.defaultContext) {
            throw new ObjectiveCanvasUndefinedError("path");
        };
        // fill shape
        this.fill = function(ctx = OC.defaultContext) {
            ctx.save();
            this.path(ctx);
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
            ctx.restore();
        };
        // stroke shape
        this.stroke = function(ctx = OC.defaultContext) {
            ctx.save();
            this.path(ctx);
            ctx.strokeStyle = this.strokeStyle;
            ctx.lineWidth = this.lineWidth;
            ctx.lineCap = this.lineCap;
            ctx.lineJoin = this.lineJoin;
            ctx.stroke();
            ctx.restore();
        };
        // draw shape
        this.draw = function(ctx = OC.defaultContext) {
            this.fill(ctx);
            this.stroke(ctx);
        };
        // init
        this.x = x;
        this.y = y;
    };
    OC.Shape.createNew = function() {
        return new this();
    };

    // rect
    OC.Rect = function(x = 0, y = 0, w = 0, h = 0) {
        // w
        Object.defineProperty(this, "w", {
            set: function(val) {
                if (typeof val === "number") {
                    this._w = val;
                } else {
                    throw new ObjectiveCanvasTypeError("w");
                }
            },
            get: function() {
                return this._w || 0;
            }
        });
        // set h
        this.setW = function(val) {
            this.w = val;
            return this;
        };
        // h
        Object.defineProperty(this, "h", {
            set: function(val) {
                this._h = val;
            },
            get: function() {
                return this._h || 0;
            }
        });
        // set h
        this.setH = function(val) {
            this.h = val;
            return this;
        };
        // set size
        this.setSize = function(w, h) {
            return this.setW(w).setH(h);
        };
        // scale
        this.scale = function(val) {
            if (typeof val == "number") {
                this.w *= val;
                this.h *= val;
                return this;
            } else {
                throw new ObjectiveCanvasTypeError("val");
            }
        };
        // path
        this.path = function(ctx = OC.defaultContext) {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.w, this.h);
            ctx.closePath();
        };
        // init
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    };
    OC.Rect.prototype = new OC.Shape();
    OC.Rect.createNew = function(x = 0, y = 0, w = 0, h = 0) {
        return new this(x, y, w, h);
    };

    // round rect
    OC.RoundRect = function(x = 0, y = 0, w = 0, h = 0, r = 0) {
        // r
        Object.defineProperty(this, "r", {
            set: function(val) {
                if (typeof val === "number") {
                    this._r = val;
                } else {
                    throw new ObjectiveCanvasTypeError("r");
                }
            },
            get: function() {
                return this._r || 0;
            }
        });
        // set r
        this.setR = function(val) {
            this.r = val;
            return this;
        };
        // scale
        _scale = this.scale;
        this.scale = function(val) {
            if (typeof val === "number") {
                _scale(val);
                this.r *= val;
                return this;
            } else {
                throw new ObjectiveCanvasTypeError("val");
            }
        };
        // set size
        _setSize = this.setSize;
        this.setSize = function(w, h, r) {
            return this.setW(w).setH(h).setR(r);
        };
        // path
        this.path = function(ctx = OC.defaultContext) {
            var x = this.x;
            var y = this.y;
            var w = this.w;
            var h = this.h;
            var r = this.r;
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w - r, y);
            ctx.arcTo(x + w, y, x + w, y + r, r);
            ctx.lineTo(x + w, y + h - r);
            ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
            ctx.lineTo(x + r, y + h);
            ctx.arcTo(x, y + h, x, y + h - r, r);
            ctx.lineTo(x, y + r);
            ctx.arcTo(x, y, x + r, y, r);
            ctx.closePath();
        };
        // init
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
    };
    OC.RoundRect.prototype = new OC.Rect();
    OC.RoundRect.createNew = function(x = 0, y = 0, w = 0, h = 0, r = 0) {
        return new this(x, y, w, h, r);
    };

    // circle
    OC.Circle = function(x = 0, y = 0, r = 0) {
        // r
        Object.defineProperty(this, "r", {
            set: function(val) {
                if (typeof r === "number") {
                    this._r = val;
                } else {
                    throw new ObjectiveCanvasTypeError('r');
                }
            },
            get: function() {
                return this._r;
            }
        });
        // set r
        this.setR = function(val) {
            this.r = val;
            return this;
        };
        // scale
        this.scale = function(val = 1) {
            if (typeof val === "number") {
                this.r *= val;
            } else {
                throw new ObjectiveCanvasTypeError("val");
            }
        };
        // path
        this.path = function(ctx = OC.defaultContext) {
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.closePath()
        };
        // init
        this.x = x;
        this.y = y;
        this.r = r;
    };
    OC.Circle.prototype = new OC.Shape();
    OC.Circle.createNew = function(x = 0, y = 0, r = 0) {
        return new this(x, y, r);
    };

    // ------ //
    // export //
    // ------ //

    // export
    window.ObjectiveCanvas = OC;

})();