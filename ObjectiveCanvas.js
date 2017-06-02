/**
 * ObjectiveCanvas.js
 * By: hhh ( https://github.com/huang2002/ObjectiveCanvas.js )
 */
(function() {

    // load error
    if (window.OC) {
        // double load ?
        return;
    }

    // ------------ //
    // define error //
    // ------------ //

    // TypeError
    function ObjectiveCanvasTypeError(property) {
        this.message = "Error type for '" + property + "'!";
    }
    ObjectiveCanvasTypeError.prototype = new Error();

    // UndefinedError
    function ObjectiveCanvasUndefinedError(property) {
        this.message = property + " has not been defined!";
    }
    ObjectiveCanvasUndefinedError.prototype = new Error();

    // IllegalValueError
    function ObjectiveCanvasIllegalValueError(property) {
        this.message = "Illegal value for '" + property + "'!";
    }
    ObjectiveCanvasIllegalValueError.prototype = new Error();

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
    OC.setDefaultContext = function(ctx) {
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
                    if (val < 0) {
                        throw new ObjectiveCanvasIllegalValueError("lineWidth");
                    } else {
                        this._lineWidth = val;
                    }
                } else {
                    throw new ObjectiveCanvasTypeError("lineWidth");
                }
            },
            get: function() {
                return this._lineWidth || 1;
            }
        });
        // set lineWidth
        this.setLineWidth = function(val) {
            this.lineWidth = val;
            return this;
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
        // fixed path
        this.fixedPath = function(ctx = OC.defaultContext) {
            ctx.save();
            ctx.translate(this.x + this.offsetX, this.y + this.offsetY);
            ctx.scale(this.scaleX, this.scaleY);
            ctx.rotate(this.rotateDeg / 180 * Math.PI);
            this.path(ctx);
            ctx.restore();
        };
        // offsetX
        Object.defineProperty(this, "offsetX", {
            set: function(val) {
                if (typeof val === "number") {
                    this._offsetX = val;
                } else {
                    throw new ObjectiveCanvasTypeError("offsetX");
                }
            },
            get: function() {
                return this._offsetX || 0;
            }
        });
        // set offsetX
        this.setOffsetX = function(val) {
            this.offsetX = val;
            return this;
        };
        // offsetY
        Object.defineProperty(this, "offsetY", {
            set: function(val) {
                if (typeof val === "number") {
                    this._offsetY = val;
                } else {
                    throw new ObjectiveCanvasTypeError("offsetY");
                }
            },
            get: function() {
                return this._offsetY || 0;
            }
        });
        this.setOffsetY = function(val) {
            this.offsetY = val;
            return this;
        };
        // translate
        this.translate = function(x = 0, y = 0) {
            return this.setOffsetX(x).setOffsetY(y);
        };
        // scaleX
        Object.defineProperty(this, "scaleX", {
            set: function(val) {
                if (typeof val === "number") {
                    this._scaleX = val;
                } else {
                    throw new ObjectiveCanvasTypeError("scaleX");
                }
            },
            get: function() {
                return this._scaleX;
            }
        });
        // set scaleX
        this.setScaleX = function(val) {
            this.scaleX = val;
            return this;
        };
        // scaleY
        Object.defineProperty(this, "scaleY", {
            set: function(val) {
                if (typeof val === "number") {
                    this._scaleY = val;
                } else {
                    throw new ObjectiveCanvasTypeError("scaleY");
                }
            },
            get: function() {
                return this._scaleY;
            }
        });
        // set scaleY
        this.setScaleY = function(val) {
            this.scaleY = val;
            return this;
        };
        // scale
        this.scale = function(x = 1, y = x) {
            return this.setScaleX(x).setScaleY(y);
        };
        // rotateDeg
        Object.defineProperty(this, "rotateDeg", {
            set: function(val) {
                if (typeof val === "number") {
                    this._rotateDeg = val;
                } else {
                    throw new ObjectiveCanvasTypeError("rotateDeg");
                }
            },
            get: function() {
                return this._rotateDeg;
            }
        });
        // rotate
        this.rotate = function(deg) {
            this.rotateDeg = deg;
            return this;
        };
        // fill shape
        this.fill = function(ctx = OC.defaultContext) {
            if (!ctx) {
                throw new ObjectiveCanvasUndefinedError("ctx");
            } else {
                ctx.save();
                this.fixedPath(ctx);
                ctx.fillStyle = this.fillStyle;
                ctx.fill();
                ctx.restore();
                return this;
            }
        };
        // stroke shape
        this.stroke = function(ctx = OC.defaultContext) {
            if (!ctx) {
                throw new ObjectiveCanvasUndefinedError("ctx");
            } else {
                ctx.save();
                this.fixedPath(ctx);
                ctx.strokeStyle = this.strokeStyle;
                ctx.lineWidth = this.lineWidth;
                ctx.lineCap = this.lineCap;
                ctx.lineJoin = this.lineJoin;
                ctx.stroke();
                ctx.restore();
                return this;
            }
        };
        // draw shape
        this.draw = function(ctx = OC.defaultContext) {
            return this.fill(ctx).stroke(ctx);
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
                    if (val < 0) {
                        throw new ObjectiveCanvasIllegalValueError("w");
                    } else {
                        this._w = val;
                    }
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
                if (typeof val === "number") {
                    if (val < 0) {
                        throw new ObjectiveCanvasIllegalValueError("h");
                    } else {
                        this._h = val;
                    }
                } else {
                    throw new ObjectiveCanvasTypeError("h");
                }
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
        // path
        this.path = function(ctx = OC.defaultContext) {
            ctx.beginPath();
            ctx.rect(0, 0, this.w, this.h);
            ctx.closePath();
            return this;
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
                    if (val < 0) {
                        throw new ObjectiveCanvasIllegalValueError("r");
                    } else {
                        this._r = val;
                    }
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
        // set size
        this.setSize = function(w, h, r) {
            return this.setW(w).setH(h).setR(r);
        };
        // path
        this.path = function(ctx = OC.defaultContext) {
            var w = this.w;
            var h = this.h;
            var r = Math.max(Math.min(this.r, Math.min(w, h) / 2), 0);
            ctx.beginPath();
            ctx.moveTo(r, 0);
            ctx.lineTo(w - r, 0);
            ctx.arcTo(w, 0, w, r, r);
            ctx.lineTo(w, h - r);
            ctx.arcTo(w, h, w - r, h, r);
            ctx.lineTo(r, h);
            ctx.arcTo(0, h, 0, h - r, r);
            ctx.lineTo(0, r);
            ctx.arcTo(0, 0, r, 0, r);
            ctx.closePath();
            return this;
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
                    if (val < 0) {
                        throw new ObjectiveCanvasIllegalValueError("r");
                    } else {
                        this._r = val;
                    }
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
        // path
        this.path = function(ctx = OC.defaultContext) {
            ctx.beginPath();
            ctx.arc(0, 0, this.r, 0, Math.PI * 2);
            ctx.closePath();
            return this;
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

    // star 
    OC.Star = function(x = 0, y = 0, innerRadius = 0, outerRadius = 0) {
        // innerRadius
        Object.defineProperty(this, "innerRadius", {
            set: function(val) {
                if (typeof val === "number") {
                    if (val < 0) {
                        throw new ObjectiveCanvasIllegalValueError("innerRadius");
                    } else {
                        this._innerRadius = val;
                    }
                } else {
                    throw new ObjectiveCanvasTypeError("innerRadius");
                }
            },
            get: function() {
                return this._innerRadius;
            }
        });
        // set innerRadius
        this.setInnerRadius = function(val) {
            this.innerRadius = val;
            return this;
        };
        // outerRadius
        Object.defineProperty(this, "outerRadius", {
            set: function(val) {
                if (typeof val === "number") {
                    if (val < 0) {
                        throw new ObjectiveCanvasIllegalValueError("outerRadius");
                    } else {
                        this._outerRadius = val;
                    }
                } else {
                    throw new ObjectiveCanvasTypeError("outerRadius");
                }
            },
            get: function() {
                return this._outerRadius;
            }
        });
        // set outerRadius
        this.setOuterRadius = function(val) {
            this.outerRadius = val;
            return this;
        };
        // set size
        this.setSize = function(innerRadius, outerRadius) {
            return this.setInnerRadius(innerRadius).setOuterRadius(outerRadius);
        };
        // path
        this.path = function(ctx = OC.defaultContext) {
            ctx.beginPath();
            var r = this.innerRadius;
            var R = this.outerRadius;
            var sin = Math.sin;
            var cos = Math.cos;
            var PI = Math.PI;
            ctx.moveTo(0, -R);
            for (var i = 0; i < 5; i++) {
                ctx.lineTo(r * sin((36 + i * 72) / 180 * PI), -r * cos((36 + i * 72) / 180 * PI));
                ctx.lineTo(R * sin((72 + i * 72) / 180 * PI), -R * cos((72 + i * 72) / 180 * PI));
            }
            ctx.closePath();
            return this;
        };
        // init
        this.x = x;
        this.y = y;
        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
    };
    OC.Star.prototype = new OC.Shape();
    OC.Star.createNew = function(x = 0, y = 0, innerRadius = 0, outerRadius = 0) {
        return new this(x, y, innerRadius, outerRadius);
    };

    // ------ //
    // export //
    // ------ //

    // export
    window.OC = OC;

})();