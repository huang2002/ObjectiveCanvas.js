/**
 * ObjectiveCanvas.js
 * By: hhh ( https://github.com/huang2002/ObjectiveCanvas.js )
 */
(function() {

    // check
    if (window.OC !== undefined) {
        return;
    } else {
        window.OC = {};
    }

    // ------------------ //
    // properties definer //
    // ------------------ //

    // any
    function defineProperty(obj, property, checker = val => true, errMes = 'Illegal value for "' + property + '"!', value = 0) {
        Object.defineProperty(this, property, {
            set: function(val) {
                if (checker && !checker(val)) {
                    throw new Error(errMes);
                }
                obj[property] = val;
            },
            get: function() {
                return obj[property] !== undefined ? obj[property] : value;
            }
        });
        var up = property;
        up = up.split('');
        up[0] = up[0].toUpperCase();
        up = up.join('');
        this['set' + up] = function(val) {
            try {
                this[property] = val;
                return this;
            } catch (e) {
                throw new Error(e.message);
            }
        };
    }

    // number
    function defineProperty_num_any(obj, property, value = 0) {
        defineProperty.call(this, obj, property, val => typeof val === 'number', undefined, value);
    }

    // number !-
    function defineProperty_num_fixed(obj, property, value = 0) {
        defineProperty.call(this, obj, property, val => typeof val === 'number' && val >= 0, undefined, value);
    }

    // in
    function defineProperty_in(obj, property, arr, value = 0) {
        defineProperty.call(this, obj, property, val => arr.indexOf(val) !== -1, undefined, value);
    }

    // ------- //
    // promise //
    // ------- //

    // promise
    function Promise() {
        function run(arr, args) {
            arg = args;
            while (arr.length) {
                var fn = arr.shift();
                arg = fn(arg);
            }
            return arg;
        }
        var suc = [];
        var fail = [];
        var caught = [];
        var arg = null;
        this.success = function(fn) {
            if (!fn instanceof Function) {
                throw new Error('"fn" is not a function!');
            }
            suc.push(fn);
            return this;
        };
        this.failure = function(fn) {
            if (!fn instanceof Function) {
                throw new Error('"fn" is not a function!');
            }
            fail.push(fn);
            return this;
        };
        this.error = function(fn) {
            if (!fn instanceof Function) {
                throw new Error('"fn" is not a function!');
            }
            caught.push(fn);
            return this;
        };
        this.resolve = function(...args) {
            run(suc, arguments);
        };
        this.reject = function(...args) {
            run(fail, arguments);
        };
        this.caught = function(...args) {
            run(fail, arguments);
        };
    }

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
    OC.Object = function(x = 0, y = 0) {
        // private obj
        var self = {};
        // define properties
        defineProperty_num_any.call(this, self, "x");
        defineProperty_num_any.call(this, self, "y");
        defineProperty.call(this, self, "offsetX");
        defineProperty.call(this, self, "offsetY");
        defineProperty.call(this, self, "opacity", val => typeof val === 'number' && val >= 0 && val <= 1, undefined, 1);
        defineProperty_num_any.call(this, self, "scaleX", 1);
        defineProperty_num_any.call(this, self, "scaleY", 1);
        defineProperty.call(this, self, "rotateDeg");
        // set pos
        this.setPos = function(x, y) {
            try {
                return this.setX(x).setY(y);
            } catch (err) {
                throw new Error(err.message);
            }
        };
        // set offset
        this.setOffset = function(x = 0, y = x) {
            try {
                return this.setOffsetX(x).setOffsetY(y);
            } catch (err) {
                throw new Error(err.message);
            }
        };
        // translate
        this.translate = function(x = 0, y = x) {
            try {
                this.offsetX += x;
                this.offsetY += y;
                return this;
            } catch (err) {
                throw new Error(err.message);
            }
        };
        // set scale
        this.setScale = function(x = 1, y = x) {
            try {
                return this.setScaleX(x).setScaleY(y);
            } catch (err) {
                throw new Error(err.message);
            }
        };
        // scale
        this.scale = function(x = 1, y = x) {
            try {
                this.scaleX *= x;
                this.scaleY *= y;
                return this;
            } catch (err) {
                throw new Error(err.message);
            }
        };
        // rotate
        this.rotate = function(deg = 0) {
            try {
                this.rotateDeg += deg;
                return this;
            } catch (err) {
                throw new Error(err.message);
            }
        };
        // fix
        this.fix = function(ctx = OC.defaultContext, callback = function(ctx) {}) {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.translate(this.x + this.offsetX, this.y + this.offsetY);
            ctx.scale(this.scaleX, this.scaleY);
            ctx.rotate(this.rotateDeg / 180 * Math.PI);
            callback(ctx);
            ctx.restore();
        };
        // init
        try {
            this.x = x;
            this.y = y;
        } catch (err) {
            throw new Error(err.message);
        }
    };
    OC.Object.getInstance = function() {
        var obj = {};
        this.apply(obj, arguments);
        return obj;;
    };

    // shape
    OC.Shape = function(x = 0, y = 0) {
        // inherit
        try {
            OC.Object.call(this);
        } catch (err) {
            throw new Error(err.message);
        }
        // private obj
        var self = {};
        // define properties
        defineProperty.call(this, self, "fillStyle", undefined, undefined, "#000000");
        defineProperty.call(this, self, "strokeStyle", undefined, undefined, "#000000");
        defineProperty_num_fixed.call(this, self, "lineWidth", 1);
        defineProperty_num_fixed.call(this, self, "shadowBlur");
        defineProperty.call(this, self, "shadowOffsetX");
        defineProperty.call(this, self, "shadowOffsetY");
        // set shadow offset
        this.setShadowOffset = function(x, y = x) {
            try {
                return this.setShadowOffsetX(x).setShadowOffsetY(y);
            } catch (err) {
                throw new Error(err.message);
            }
        };
        // set shadow
        this.setShadow = function(offsetX, offsetY, blur, color) {
            try {
                return this.setShadowOffset(offsetX, offsetY).setShadowBlur(blur).setShadowColor(color);
            } catch (err) {
                throw new Error(err.message);
            }
        };
        // fixed path
        this.fixedPath = function(ctx = OC.defaultContext) {
            this.fix(ctx, () => this.path(ctx));
            return this;
        };
        // path
        this.path = function(ctx = OC.defaultContext) {
            throw Error('"path()" has not been defined!');
        };
        // fill shape
        this.fill = function(ctx = OC.defaultContext) {
            if (!ctx) {
                throw new Error('"ctx" has not been defined!');
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
                throw new Error('"ctx" has not been defined!');
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
                throw new Error('"ctx" has not been defined!');
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
        // point is in path
        this.pointIsInPath = function(x, y) {
            if (typeof x !== 'number') {
                throw new Error('Illegal value for "x"!');
            } else if (typeof y !== 'number') {
                throw new Error('Illegal value for "y"!');
            }
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            this.fixedPath(ctx);
            return ctx.isPointInPath(x, y);
        };
        // init
        try {
            this.x = x;
            this.y = y;
        } catch (err) {
            throw new Error(err.message);
        }
    };
    OC.Shape.getInstance = function(x = 0, y = 0) {
        var obj = {};
        this.apply(obj, arguments);
        return obj;;
    };

    // rect
    OC.Rect = function(x = 0, y = 0, w = 0, h = 0) {
        // inherit
        try {
            OC.Shape.call(this, x, y);
        } catch (err) {
            throw new Error(err.message);
        }
        // private obj
        var self = {};
        // define properties
        defineProperty_num_fixed.call(this, self, "w");
        defineProperty_num_fixed.call(this, self, "h");
        // set size
        this.setSize = function(w, h) {
            try {
                return this.setW(w).setH(h);
            } catch (err) {
                throw new Error(err.message);
            }
        };
        // path
        this.path = function(ctx = OC.defaultContext) {
            ctx.beginPath();
            ctx.rect(0, 0, this.w, this.h);
            ctx.closePath();
            return this;
        };
        try {
            this.w = w;
            this.h = h;
        } catch (err) {
            throw new Error(err.message);
        }
    };
    OC.Rect.getInstance = function(x = 0, y = 0, w = 0, h = 0) {
        var obj = {};
        this.apply(obj, arguments);
        return obj;;
    };

    // round rect
    OC.RoundRect = function(x = 0, y = 0, w = 0, h = 0, r = 0) {
        // inherit
        try {
            OC.Rect.call(this, x, y, w, h);
        } catch (err) {
            throw new Error(err.message);
        }
        // private obj
        var self = {};
        // define properties
        defineProperty_num_any.call(this, self, "r");
        // set size
        this.setSize = function(w, h, r) {
            try {
                return this.setW(w).setH(h).setR(r);
            } catch (err) {
                throw new Error(err.message);
            }
        };
        // path
        this.path = function(ctx = OC.defaultContext) {
            var x = this.x;
            var y = this.y;
            var w = this.w;
            var h = this.h;
            var r = this.r;
            var min = Math.min(w, h);
            if (Math.abs(r) > min) {
                r = r > 0 ? min : -min;
            }
            ctx.beginPath();
            if (r >= 0) {
                ctx.moveTo(r, 0);
                ctx.lineTo(w - r, 0);
                ctx.arcTo(w, 0, w, r, r);
                ctx.lineTo(w, h - r);
                ctx.arcTo(w, h, w - r, h, r);
                ctx.lineTo(r, h);
                ctx.arcTo(0, h, 0, h - r, r);
                ctx.lineTo(0, r);
                ctx.arcTo(0, 0, r, 0, r);
            } else {
                ctx.moveTo(-r, 0);
                ctx.lineTo(w + r, 0);
                ctx.arcTo(w + r, -r, w, -r, -r);
                ctx.lineTo(w, h + r);
                ctx.arcTo(w + r, h + r, w + r, h, -r);
                ctx.lineTo(-r, h);
                ctx.arcTo(-r, h + r, 0, h + r, -r);
                ctx.lineTo(0, -r);
                ctx.arcTo(-r, -r, -r, 0, -r);
            }
            ctx.closePath();
            return this;
        };
        // init
        try {
            this.r = r;
        } catch (err) {
            throw new Error(err.message);
        }
    };
    OC.RoundRect.getInstance = function(x = 0, y = 0, w = 0, h = 0, r = 0) {
        var obj = {};
        this.apply(obj, arguments);
        return obj;;
    };

    // circle
    OC.Circle = function(x = 0, y = 0, r = 0) {
        // inherit
        try {
            OC.Shape.call(this, x, y);
        } catch (err) {
            throw new Error(err.message);
        }
        // private obj
        var self = {};
        // define properties
        defineProperty_num_fixed.call(this, self, "r");
        // path
        this.path = function(ctx = OC.defaultContext) {
            ctx.beginPath();
            ctx.arc(0, 0, this.r, 0, Math.PI * 2);
            ctx.closePath();
            return this;
        };
        // init
        try {
            this.r = r;
        } catch (err) {
            throw new Error(err.message);
        }
    };
    OC.Circle.getInstance = function(x = 0, y = 0, r = 0) {
        var obj = {};
        this.apply(obj, arguments);
        return obj;;
    };

    // star 
    OC.Star = function(x = 0, y = 0, innerRadius = 0, outerRadius = 0, angleCount = 5) {
        // inherit
        try {
            OC.Shape.call(this, x, y);
        } catch (err) {
            throw new Error(err.message);
        }
        // private obj
        var self = {};
        // define properties
        defineProperty_num_fixed.call(this, self, "innerRadius");
        defineProperty_num_fixed.call(this, self, "outerRadius");
        defineProperty.call(this, self, "angleCount", val => typeof val === 'number' && val % 1 === 0 && val >= 2, undefined, 5);
        // set size
        this.setSize = function(innerRadius, outerRadius, angleCount = this.angleCount) {
            try {
                return this.setInnerRadius(innerRadius).setOuterRadius(outerRadius).setAngleCount(angleCount);
            } catch (err) {
                throw new Error(err.message);
            }
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
        try {
            this.innerRadius = innerRadius;
            this.outerRadius = outerRadius;
            this.angleCount = angleCount;
        } catch (err) {
            throw new Error(err.message);
        }
    };
    OC.Star.getInstance = function(x = 0, y = 0, innerRadius = 0, outerRadius = 0, angleCount = 5) {
        var obj = {};
        this.apply(obj, arguments);
        return obj;;
    };

    // line
    OC.Line = function(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
        // inherit
        try {
            OC.Shape.call(this);
        } catch (err) {
            throw new Error(err.message);
        }
        // private obj
        var self = {};
        // define properties
        defineProperty_num_any.call(this, self, "x1");
        defineProperty_num_any.call(this, self, "y1");
        defineProperty_num_any.call(this, self, "x2");
        defineProperty_num_any.call(this, self, "y2");
        defineProperty.call(this, self, "lineCap", undefined, undefined, "butt");
        defineProperty.call(this, self, "lineJoin", undefined, undefined, "miter");
        // path
        this.path = function(ctx = OC.defaultContext) {
            ctx.moveTo(this.x1, this.y1);
            ctx.lineTo(this.x2, this.y2);
        };
        // init
        try {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
        } catch (err) {
            throw new Error(err.message);
        }
    };
    OC.Line.getInstance = function(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
        var obj = {};
        this.apply(obj, arguments);
        return obj;;
    };

    // polygon
    OC.Polygon = function(...points) {
        // inherit
        try {
            OC.Shape.call(this);
        } catch (err) {
            throw new Error(err.message);
        }
        // private obj
        var self = {};
        // define properties
        defineProperty.call(this, self, "points", arr => {
            if (!arr instanceof Array) {
                return false;
            }
            try {
                arr.forEach(p => {
                    if (typeof p.x !== "number" || typeof p.y !== "number") {
                        throw new Error();
                    }
                });
            } catch (err) {
                return false;
            }
            return true;
        }, undefined, new Array());
        // set point
        this.setPoint = function(index = this.points.length - 1, x = null, y = x) {
            if (typeof index !== "number" || index < 0 || index > this.points.length) {
                throw new Error('Illegal value for "index"!');
            }
            if (x === undefined && y === undefined) {
                this.removePoint(index);
            } else {
                if (typeof x !== "number") {
                    throw new Error('Illegal value for "x"!');
                } else if (typeof y !== "number") {
                    throw new Error('Illegal value for "y"!');
                }
                this.points[index].y = y;
                this.points[index].x = x;
            }
            return this;
        };
        // add point
        this.addPoint = function(x, y, index = this.points.length) {
            if (typeof x !== "number") {
                throw new Error('Illegal value for "x"!');
            }
            if (typeof y !== "number") {
                throw new Error('Illegal value for "y"!');
            }
            var len = this.points.length;
            if (typeof index !== "number" || index < 0 || index > len) {
                throw new Error('Illegal value for "index"!');
            }
            if (index === len) {
                this.points.push({ x, y });
            } else {
                this.points.splice(index, 0, { x, y });
            }
            return this;
        };
        // remove point
        this.removePoint = function(index = this.points.length - 1) {
            if (typeof index === "number" || index < 0 || index >= this.points.length) {
                throw new Error('Illegal value for "index"!');
            }
            this.points.splice(index, 1);
            return this;
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
        if (!points instanceof Array) {
            throw new Error('Illegal value for "points"!');
        }
        var p = new Array();
        var len = Math.floor(points.length / 2);
        for (let i = 0; i < len; i++) {
            let x = points[i * 2];
            let y = points[i * 2 + 1];
            if (typeof x !== "number") {
                throw new Error('Illegal value for "x"!');
            }
            if (typeof y !== "number") {
                throw new Error('Illegal value for "y"!');
            }
            p.push({ x, y });
        }
        this.points = p;
    };
    OC.Polygon.getInstance = function(...points) {
        var obj = {};
        this.apply(obj, arguments);
        return obj;;
    };

    // text
    OC.Text = function(text = "", font = "25px Consolas", x = 0, y = 0, w = 0, h = 0, r = 0) {
        // inherit
        try {
            OC.RoundRect.call(this, x, y, w, h, r);
        } catch (err) {
            throw new Error(err.message);
        }
        // private obj
        var self = {};
        // define properties
        defineProperty.call(this, self, "text", undefined, undefined, text);
        defineProperty.call(this, self, "font", undefined, undefined, font);
        defineProperty.call(this, self, "textFillStyle", undefined, undefined, '#555555');
        defineProperty.call(this, self, "textStrokeStyle", undefined, undefined, '#000000');
        defineProperty_in.call(this, self, "align", ["center", "left", "right"], "center");
        defineProperty_in.call(this, self, "baseline", ["middle", "top", "bottom"], "middle");
        // set color
        this.setColor = function(fill, stroke) {
            return this.setTextFillStyle(fill).setTextStrokeStyle(stroke);
        };
        // set location
        this.setLocation = function(align, baseline) {
            try {
                return this.setAlign(align).setBaseline(baseline);
            } catch (err) {
                throw new Error(err.message);
            }
        };
        // fix pos
        fix = ctx => {
            var align = this.align.toLowerCase();
            var baseline = this.baseline.toLowerCase();
            ctx.textAlign = align;
            ctx.textBaseline = baseline;
            ctx.font = this.font;
            var x = 0;
            var y = 0;
            if (align === "center") {
                x += this.w / 2;
            } else if (align === "right") {
                x += this.w;
            }
            if (baseline === "middle") {
                y += this.h / 2;
            } else if (baseline === "bottom") {
                y += this.h;
            }
            return { x, y };
        };
        // stroke text
        this.strokeText = function(ctx = OC.defaultContext) {
            var self = this;
            this.fix(ctx, function(ctx) {
                ctx.strokeStyle = self.textStrokeStyle;
                var { x, y } = fix(ctx);
                ctx.strokeText(self.text, x, y);
            });
            return this;
        };
        // fill text
        this.fillText = function(ctx = OC.defaultContext) {
            var self = this;
            this.fix(ctx, function(ctx) {
                ctx.fillStyle = self.textFillStyle;
                var { x, y } = fix(ctx);
                ctx.fillText(self.text, x, y);
            });
            return this;
        };
        // get bg rect
        getBgRect = () => {
            return OC.RoundRect.getInstance(this.x, this.y, this.w, this.h, this.r).setOffset(this.offsetX, this.offsetY).setScale(this.scaleX, this.scaleY).setRotateDeg(this.rotateDeg).setOpacity(this.opacity);
        };
        // stroke
        this.stroke = function(ctx = OC.defaultContext) {
            getBgRect().setLineWidth(this.lineWidth).setStrokeStyle(this.strokeStyle).stroke(ctx);
            this.strokeText(ctx);
            return this;
        };
        // fill
        this.fill = function(ctx = OC.defaultContext) {
            getBgRect().setFillStyle(this.fillStyle).fill(ctx);
            this.fillText(ctx);
            return this;
        };
        // draw text
        this.drawText = function(ctx = OC.defaultContext) {
            this.fillText(ctx);
            this.strokeText(ctx);
            return this;
        };
        // draw
        this.draw = function(ctx = OC.defaultContext) {
            getBgRect().setLineWidth(this.lineWidth).setStrokeStyle(this.strokeStyle).setFillStyle(this.fillStyle).draw(ctx);
            this.drawText(ctx);
            return this;
        };
    };
    OC.Text.getInstance = function(text = "", font = "25px Consolas", x = 0, y = 0, w = 0, h = 0, r = 0) {
        var obj = {};
        this.apply(obj, arguments);
        return obj;;
    };

    // spirit
    OC.Spirit = function(url = false, x = 0, y = 0) {
        // private obj
        var self = {};
        var img = new Image();
        // inherit
        try {
            OC.Object.call(this, x, y);
        } catch (err) {
            throw new Error(err.message);
        }
        // src setter
        setSrc = url => {
            this.isLoaded = false;
            img.onload = () => {
                this.isLoaded = true;
            };
            img.src = url;
        };
        // define properties
        Object.defineProperty(this, 'src', {
            set: function(url) {
                setSrc(url);
            },
            get: function() {
                return img.src;
            }
        });
        defineProperty_in.call(this, self, 'isLoaded', [true, false], false);
        // set src
        this.setSrc = function(url) {
            setSrc(url);
            return this;
        };
        // draw
        this.fill = function(ctx = OC.defaultContext) {
            if (img.src == undefined) {
                throw new Error('"src" is not defined!');
            } else if (this.isLoaded === false) {
                throw new Error('Image has not been loaded!');
            }
            var self = this;
            this.fix(ctx, function(ctx) {
                ctx.drawImage(img, self.x, self.y);
            });
            return this;
        };
        // init
        if (url !== false) {
            this.src = url;
        }
    };
    OC.Spirit.getInstance = function(url, x = 0, y = 0) {
        var obj = {};
        this.apply(obj, arguments);
        return obj;
    };
    OC.Spirit.preload = function(...url) {
        function load(url, promise) {
            if (typeof url !== 'string') {
                throw new Error('"' + url + '" is not a url!');
            }
            var img = new Image();
            img.onload = function(e) {
                if (urls.length) {
                    load([].shift.call(urls), promise);
                } else {
                    promise.resolve();
                }
            };
            img.src = url;
        }
        var promise = new Promise();
        var urls = arguments;
        load([].shift.call(urls), promise);
        return promise;
    };

})();