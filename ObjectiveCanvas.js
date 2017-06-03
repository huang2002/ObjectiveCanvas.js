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

    // object
    OC.Object = function() {
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
        // shadow blur
        Object.defineProperty(this, "shadowBlur", {
            set: function(val) {
                if (typeof val === "number") {
                    if (val < 0) {
                        throw new ObjectiveCanvasIllegalValueError("shadowBlur");
                    } else {
                        this._shadowBlur = val;
                    }
                } else {
                    throw new ObjectiveCanvasTypeError("shadowBlur");
                }
            },
            get: function() {
                return this._shadowBlur || 0;
            }
        });
        // set shadow blur
        this.setShadowBlur = function(val) {
            this.shadowBlur = val;
            return this;
        };
        // shadow color
        this.shadowColor = "rgba(0, 0, 0, 0)";
        // set shadow color
        this.setShadowColor = function(val = "rgba(0, 0, 0, 0)") {
            this.shadowColor = val;
            return this;
        };
        // shadow offsetX
        Object.defineProperty(this, "shadowOffsetX", {
            set: function(val) {
                if (typeof val === "number") {
                    this._shadowOffsetX = val;
                } else {
                    throw new ObjectiveCanvasTypeError("shadowOffsetX");
                }
            },
            get: function() {
                return this._shadowOffsetX || 0;
            }
        });
        // set shadow offsetX
        this.setShadowOffsetX = function(val) {
            this.shadowOffsetX = val;
            return this;
        };
        // shadow offsetY
        Object.defineProperty(this, "shadowOffsetY", {
            set: function(val) {
                if (typeof val === "number") {
                    this._shadowOffsetY = val;
                } else {
                    throw new ObjectiveCanvasTypeError("shadowOffsetY");
                }
            },
            get: function() {
                return this._shadowOffsetY || 0;
            }
        });
        // set shadow offsetY
        this.setShadowOffsetY = function(val) {
            this.shadowOffsetY = val;
            return this;
        };
        // set shadow offset
        this.setShadowOffset = function(x, y = x) {
            return this.setShadowOffsetX(x).setShadowOffsetY(y);
        };
        // set shadow
        this.setShadow = function(offsetX, offsetY, blur, color) {
            return this.setShadowOffset(offsetX, offsetY).setShadowBlur(blur).setShadowColor(color);
        };
        // opacity
        Object.defineProperty(this, "opacity", {
            set: function(val) {
                if (typeof val === "number") {
                    if (val < 0 || val > 1) {
                        throw new ObjectiveCanvasIllegalValueError("opacity");
                    } else {
                        this._opacity = val;
                    }
                } else {
                    throw new ObjectiveCanvasTypeError("opacity");
                }
            },
            get: function() {
                return this._opacity;
            }
        });
        // set opacity
        this.setOpacity = function(val) {
            this.opacity = val;
            return this;
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
        // set offsetY
        this.setOffsetY = function(val) {
            this.offsetY = val;
            return this;
        };
        // set offset
        this.setOffset = function(x = 0, y = x) {
            return this.setOffsetX(x).setOffsetY(y);
        };
        // translate
        this.translate = function(x = 0, y = x) {
            this.offsetX += x;
            this.offsetY += y;
            return this;
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
                return this._scaleX || 1;
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
                return this._scaleY || 1;
            }
        });
        // set scaleY
        this.setScaleY = function(val) {
            this.scaleY = val;
            return this;
        };
        // set scale
        this.setScale = function(x = 1, y = x) {
            return this.setScaleX(x).setScaleY(y);
        };
        // scale
        this.scale = function(x = 1, y = x) {
            this.scaleX *= x;
            this.scaleY *= y;
            return this;
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
        // set rotateDeg
        this.setRotate = function(deg = 0) {
            this.rotateDeg = deg;
            return this;
        };
        // rotate
        this.rotate = function(deg = 0) {
            this.rotateDeg += deg;
            return this;
        };
        // path
        this.path = function(ctx = OC.defaultContext) {
            throw new ObjectiveCanvasUndefinedError("path");
        };
        // fixed path
        this.fixedPath = function(ctx = OC.defaultContext) {
            ctx.save();
            ctx.translate(this.offsetX, this.offsetY);
            ctx.scale(this.scaleX, this.scaleY);
            ctx.rotate(this.rotateDeg / 180 * Math.PI);
            this.path(ctx);
            ctx.restore();
            return this;
        };
        // fill shape
        this.fill = function(ctx = OC.defaultContext) {
            if (!ctx) {
                throw new ObjectiveCanvasUndefinedError("ctx");
            } else {
                ctx.save();
                this.fixedPath(ctx);
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.fillStyle;
                ctx.shadowBlur = this.shadowBlur;
                ctx.shadowColor = this.shadowColor;
                ctx.shadowOffsetX = this.shadowOffsetX;
                ctx.shadowOffsetY = this.shadowOffsetY;
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
                ctx.globalAlpha = this.opacity;
                ctx.strokeStyle = this.strokeStyle;
                ctx.lineWidth = this.lineWidth;
                ctx.lineCap = this.lineCap;
                ctx.lineJoin = this.lineJoin;
                ctx.stroke();
                ctx.restore();
                return this;
            }
        };
        // stroke shape
        this.strokeWithShadow = function(ctx = OC.defaultContext) {
            if (!ctx) {
                throw new ObjectiveCanvasUndefinedError("ctx");
            } else {
                ctx.save();
                this.fixedPath(ctx);
                ctx.globalAlpha = this.opacity;
                ctx.strokeStyle = this.strokeStyle;
                ctx.lineWidth = this.lineWidth;
                ctx.lineCap = this.lineCap;
                ctx.lineJoin = this.lineJoin;
                ctx.shadowBlur = this.shadowBlur;
                ctx.shadowColor = this.shadowColor;
                ctx.shadowOffsetX = this.shadowOffsetX;
                ctx.shadowOffsetY = this.shadowOffsetY;
                ctx.stroke();
                ctx.restore();
                return this;
            }
        };
        // draw shape
        this.draw = function(ctx = OC.defaultContext) {
            return this.fill(ctx).stroke(ctx);
        };
    };
    OC.Object.createNew = function() {
        return new this();
    };

    // shape
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
        // fixed path
        this.fixedPath = function(ctx = OC.defaultContext) {
            ctx.save();
            ctx.translate(this.x + this.offsetX, this.y + this.offsetY);
            ctx.scale(this.scaleX, this.scaleY);
            ctx.rotate(this.rotateDeg / 180 * Math.PI);
            this.path(ctx);
            ctx.restore();
            return this;
        };
        // init
        this.x = x;
        this.y = y;
    };
    OC.Shape.createNew = function(x = 0, y = 0) {
        return new this(x, y);
    };
    OC.Shape.prototype = new OC.Object();

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
            var x = this.x;
            var y = this.y;
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
    OC.Star = function(x = 0, y = 0, innerRadius = 0, outerRadius = 0, angleCount = 5) {
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
                return this._innerRadius || 0;
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
                return this._outerRadius || 0;
            }
        });
        // set outerRadius
        this.setOuterRadius = function(val) {
            this.outerRadius = val;
            return this;
        };
        // angle count
        Object.defineProperty(this, "angleCount", {
            set: function(val) {
                if (typeof val === "number") {
                    if (val < 2 || val % 1 !== 0) {
                        throw new ObjectiveCanvasIllegalValueError("angleCount");
                    } else {
                        this._angleCount = val;
                    }
                } else {
                    throw new ObjectiveCanvasTypeError("angleCount");
                }
            },
            get: function() {
                return this._angleCount || 5;
            }
        });
        // set angle count
        this.setAngleCount = function(val = 5) {
            this.angleCount = val;
            return this;
        };
        // set size
        this.setSize = function(innerRadius, outerRadius, angleCount = this.angleCount) {
            return this.setInnerRadius(innerRadius).setOuterRadius(outerRadius).setAngleCount(angleCount);
        };
        // path
        this.path = function(ctx = OC.defaultContext) {
            ctx.beginPath();
            var r = this.innerRadius;
            var R = this.outerRadius;
            var sin = Math.sin;
            var cos = Math.cos;
            var PI = Math.PI;
            var count = this.angleCount;
            var angle = 360 / count;
            ctx.moveTo(x, y - R);
            for (var i = 0; i < angleCount; i++) {
                ctx.lineTo(r * sin((angle / 2 + i * angle) / 180 * PI), -r * cos((angle / 2 + i * angle) / 180 * PI));
                ctx.lineTo(R * sin((angle + i * angle) / 180 * PI), -R * cos((angle + i * angle) / 180 * PI));
            }
            ctx.closePath();
            return this;
        };
        // init
        this.x = x;
        this.y = y;
        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
        this.angleCount = angleCount;
    };
    OC.Star.prototype = new OC.Shape();
    OC.Star.createNew = function(x = 0, y = 0, innerRadius = 0, outerRadius = 0, angleCount = 5) {
        return new this(x, y, innerRadius, outerRadius, angleCount);
    };

    // line
    OC.Line = function(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
        // x1, y1, x2, y2
        ["x1", "y1", "x2", "y2"].forEach(p => {
            Object.defineProperty(this, p, {
                set: function(val) {
                    this['_' + p] = val;
                },
                get: function() {
                    return this['_' + p];
                }
            });
        });
        // path
        this.path = function(ctx = OC.defaultContext) {
            ctx.moveTo(this.x1, this.y1);
            ctx.lineTo(this.x2, this.y2);
        };
        // init
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    };
    OC.Line.prototype = new OC.Object();
    OC.Line.createNew = function(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
        return new this(x1, y1, x2, y2);
    };

    // polygon
    OC.Polygon = function(...points) {
        // points
        Object.defineProperty(this, "points", {
            set: function(arr) {
                if (arr instanceof Array) {
                    arr.forEach(p => {
                        if (typeof p.x !== "number" || typeof p.y !== "number") {
                            throw new ObjectiveCanvasIllegalValueError("points");
                        }
                    });
                    this._points = p;
                } else {
                    throw new ObjectiveCanvasTypeError("points");
                }
            },
            get: function() {
                return this._points;
            }
        });
        // set point
        this.setPoint = function(index = this.points.length - 1, x = null, y = null) {
            if (typeof index === "number") {
                if (index >= 0 && index <= this.points.length) {
                    if (typeof x === "number") {
                        if (typeof y === "number") {
                            this.points[index].x = x;
                            this.points[index].y = y;
                        } else {
                            throw new ObjectiveCanvasUndefinedError("y");
                        }
                    } else {
                        this.removePoint(index);
                    }
                    return this;
                } else {
                    throw new ObjectiveCanvasIllegalValueError("index");
                }
            } else {
                throw new ObjectiveCanvasUndefinedError("index");
            }
        };
        // add point
        this.addPoint = function(x, y, index = this.points.length) {
            if (typeof x === "number") {
                if (typeof y === "number") {
                    if (typeof index === "number") {
                        var len = this.points.length;
                        if (index >= 0 && index <= len) {
                            if (index === len) {
                                this.points.push({ x, y });
                            } else {
                                this.points.splice(index, 0, { x, y });
                            }
                            return this;
                        } else {
                            throw new ObjectiveCanvasIllegalValueError("index");
                        }
                    } else {
                        throw new ObjectiveCanvasTypeError("index");
                    }
                } else {
                    throw new ObjectiveCanvasTypeError("y");
                }
            } else {
                throw new ObjectiveCanvasTypeError("x");
            }
        };
        // remove point
        this.removePoint = function(index = this.points.length - 1) {
            if (typeof index === "number") {
                if (index >= 0 && index < this.points.length) {
                    this.points.splice(index, 1);
                    return this;
                } else {
                    throw new ObjectiveCanvasIllegalValueError("index");
                }
            } else {
                throw new ObjectiveCanvasTypeError("index");
            }
        };
        // clear points
        this.clearPoints = function() {
            this.points.length = 0;
            return this;
        };
        // path
        this.path = function(ctx = OC.defaultContext) {
            ctx.beginPath();
            this.points.forEach((p, i) => {
                if (i === 0) {
                    ctx.moveTo(p.x, p.y);
                } else {
                    ctx.lineTo(p.x, p.y);
                }
            });
            ctx.closePath();
            return this;
        };
        // init
        points = points[0];
        if (points instanceof Array) {
            var p = new Array();
            var len = Math.floor(points.length / 2);
            for (var i = 0; i < len; i++) {
                let x = points[i * 2];
                let y = points[i * 2 + 1];
                if (typeof x === "number" || typeof y === "number") {
                    p.push({ x, y });
                } else {
                    throw new ObjectiveCanvasIllegalValueError("points");
                }
            }
            this.points = p;
        } else {
            throw new ObjectiveCanvasTypeError("points");
        }
    };
    OC.Polygon.prototype = new OC.Object();
    OC.Polygon.createNew = function(...points) {
        return new this(points);
    };

    // ------ //
    // export //
    // ------ //

    // export
    window.OC = OC;

})();