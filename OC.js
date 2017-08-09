(function() {

    if (window.OC) {
        return;
    }
    window.OC = {};

    // properties
    OC.defaultContext = null;

    // methods
    OC.setDefaultContext = function(ctx) {
        this.defaultContext = ctx;
    };

    // shapes
    OC.Object = function() {
        this.translateX = 0;
        this.translateY = 0;
        this.rotate = 0;
        this.shadowOffsetX = 0;
        this.shadowOffsetY = 0;
        this.shadowBlur = 0;
        this.shadowColor = 'rgba(0,0,0,0)';
        this.fillStyle = '#eee';
        this.strokeStyle = '#999';
        this.lineWidth = 1;
        this.lineJoin = 'miter';
        this.lineCap = 'butt';
        this.lineDashOffset = 0;
        this.opacity = 1;
    };
    OC.Object.prototype.setFillStyle = function(fillStyle) {
        this.fillStyle = fillStyle;
        return this;
    };
    OC.Object.prototype.setStrokeStyle = function(strokeStyle) {
        this.strokeStyle = strokeStyle;
        return this;
    };
    OC.Object.prototype.setLineWidth = function(lineWidth) {
        this.lineWidth = lineWidth;
        return this;
    };
    OC.Object.prototype.setLineJoin = function(lineJoin) {
        this.lineJoin = lineJoin;
        return this;
    };
    OC.Object.prototype.setLineCap = function(lineCap) {
        this.lineCap = lineCap;
        return this;
    };
    OC.Object.prototype.setScaleX = function(x) {
        this.scaleX = x;
        return this;
    };
    OC.Object.prototype.setScaleY = function(y) {
        this.scaleY = y;
        return this;
    };
    OC.Object.prototype.setTranslateX = function(x) {
        this.translateX = x;
        return this;
    };
    OC.Object.prototype.setTranslateY = function(y) {
        this.translateY = y;
        return this;
    };
    OC.Object.prototype.setRotate = function(rad) {
        this.rotate = rad;
        return this;
    };
    OC.Object.prototype.setRotateDeg = function(deg) {
        this.rotate = deg / 180 * Math.PI;
        return this;
    };
    OC.Object.prototype.setShadowOffsetX = function(x) {
        this.shadowOffsetX = x;
        return this;
    };
    OC.Object.prototype.setShadowOffsetY = function(y) {
        this.shadowOffsetY = y;
        return this;
    };
    OC.Object.prototype.setShadowOffset = function(x, y) {
        return this.setShadowOffsetX(x).setShadowOffsetY(y);
    };
    OC.Object.prototype.setShadowColor = function(color) {
        this.shadowColor = color;
        return this;
    };
    OC.Object.prototype.setShadowBlur = function(blur) {
        this.shadowBlur = blur;
        return this;
    };
    OC.Object.prototype.setOpacity = function(opacity) {
        this.opacity = opacity;
        return this;
    };
    OC.Object.prototype.setLineDashOffset = function(offset) {
        this.lineDashOffset = offset;
        return this;
    };
    OC.Object.prototype.setScale = function(x, y) {
        return this.setScaleX(x).setScaleY(y);
    };
    OC.Object.prototype.setTranslate = function(x, y) {
        return this.setTranslateX(x).setTranslateY(y);
    };
    OC.Object.prototype.setShadowOffset = function(x, y) {
        return this.setShadowOffsetX(x).setShadowOffsetY(y);
    };
    OC.Object.prototype.translate = function(x, y) {
        this.translateX += x;
        this.translateY += y;
        return this;
    };
    OC.Object.prototype.translateShadow = function(x, y) {
        this.shadowOffsetX += x;
        this.shadowOffsetY += y;
        return this;
    };
    OC.Object.prototype.rotate = function(rad) {
        this.rotate += rad;
        return this;
    };
    OC.Object.prototype.rotateDeg = function(deg) {
        this.rotate += deg / 180 * Math.PI;
        return this;
    };
    OC.Object.prototype.setShadow = function(x, y, blur, color) {
        return this.setShadowOffset(x, y).setShadowBlur(blur).setShadowColor(color);
    };
    OC.Object.prototype.fix = function(ctx, callback) {
        ctx = ctx || OC.defaultContext;
        ctx.save();
        ctx.beginPath();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.translateX, this.translateY);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.rotate(this.rotate);
        this.path(ctx);
        callback.call(this, ctx);
        ctx.restore();
        return this;
    };
    OC.Object.prototype.path = function(ctx) {
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 0);
    };
    OC.Object.prototype.fill = function(ctx) {
        this.fix(ctx, function(ctx) {
            ctx.fillStyle = this.fillStyle;
            ctx.shadowColor = this.shadowColor;
            ctx.shadowBlur = this.shadowBlur;
            ctx.shadowOffsetX = this.shadowOffsetX;
            ctx.shadowOffsetY = this.shadowOffsetY;
            ctx.fill();
        });
        return this;
    };
    OC.Object.prototype.stroke = function(ctx) {
        this.fix(ctx, function(ctx) {
            ctx.strokeStyle = this.strokeStyle;
            ctx.lineWidth = this.lineWidth;
            ctx.lineCap = this.lineCap;
            ctx.lineJoin = this.lineJoin;
            ctx.lineDashOffset = this.lineDashOffset;
            ctx.stroke();
        });
        return this;
    };
    OC.Object.prototype.draw = function(ctx) {
        return this.fill(ctx).stroke(ctx);
    };
    OC.Object.prototype.set = function(options) {
        for (var k in options) {
            if (k in this) {
                this[k] = options[k];
            }
        }
        return this;
    };
    OC.Object.prototype.isPointInPath = function(x, y) {
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');
        this.path(ctx);
        return ctx.isPointInPath(x - this.x - this.translateX, y - this.y - this.translateY);
    };

    OC.Shape = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        this.scaleX = 1;
        this.scaleY = 1;
    };
    OC.Shape.prototype = new OC.Object();
    OC.Shape.prototype.setX = function(x) {
        this.x = x;
        return this;
    };
    OC.Shape.prototype.setY = function(y) {
        this.y = y;
        return this;
    };
    OC.Shape.prototype.setPos = function(x, y) {
        return this.setX(x).setY(y);
    };
    OC.Shape.prototype.fix = function(ctx, callback) {
        ctx = ctx || OC.defaultContext;
        ctx.save();
        ctx.beginPath();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.translateX + this.x, this.translateY + this.y);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.rotate(this.rotate);
        this.path(ctx);
        callback.call(this, ctx);
        ctx.restore();
        return this;
    };

    OC.Rect = function(x, y, w, h) {
        OC.Shape.call(this, x, y);
        this.w = w || 0;
        this.h = h || 0;
    };
    OC.Rect.prototype = new OC.Shape();
    OC.Rect.prototype.setW = function(w) {
        this.w = w;
        return this;
    };
    OC.Rect.prototype.setH = function(h) {
        this.h = h;
        return this;
    };
    OC.Rect.prototype.path = function(ctx) {
        ctx.rect(0, 0, this.w, this.h);
    };

    OC.Circle = function(x, y, r) {
        OC.Shape.call(this, x, y);
        this.r = r || 0;
    };
    OC.Circle.prototype = new OC.Shape();
    OC.Circle.prototype.setR = function(r) {
        this.r = r;
        return this;
    };
    OC.Circle.prototype.path = function(ctx) {
        ctx.arc(0, 0, this.r, 0, Math.PI * 2);
    };

    OC.Arc = function(x, y, r, start, end, anticlockwise) {
        OC.Circle.call(this, x, y, r);
        this.start = start || 0;
        this.end = end || 0;
        this.anticlockwise = anticlockwise || false;
    };
    OC.Arc.prototype = new OC.Circle();
    OC.Arc.prototype.setStart = function(start) {
        this.start = start;
        return this;
    };
    OC.Arc.prototype.setEnd = function(end) {
        this.end = end;
        return this;
    };
    OC.Arc.prototype.setAnticlockwise = function(anticlockwise) {
        this.anticlockwise = anticlockwise;
        return this;
    };
    OC.Arc.prototype.path = function(ctx) {
        ctx.arc(0, 0, this.r, this.start, this.end, this.anticlockwise);
    };

    OC.RoundRect = function(x, y, w, h, r) {
        OC.Rect.call(this, x, y, w, h);
        this.r = r || 2;
    };
    OC.RoundRect.prototype = new OC.Rect();
    OC.RoundRect.prototype.setR = function(r) {
        this.r = r;
        return this;
    };
    OC.RoundRect.prototype.path = function(ctx) {
        var w = this.w,
            h = this.h,
            x = this.x,
            y = this.y,
            r = this.r,
            min = Math.min(w, h);
        if (Math.abs(r) > min) {
            r = r > 0 ? min : -min;
        }
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
    };

    OC.Star = function(x, y, innerRadius, outerRadius, count) {
        OC.Shape.call(this, x, y);
        this.innerRadius = innerRadius || 0;
        this.outerRadius = outerRadius || 0;
        this.count = count === undefined ? 5 : count;
    };
    OC.Star.prototype = new OC.Shape();
    OC.Star.prototype.setInnerRadius = function(innerRadius) {
        this.innerRadius = innerRadius;
        return this;
    };
    OC.Star.prototype.setOuterRadius = function(outerRadius) {
        this.outerRadius = outerRadius;
        return this;
    };
    OC.Star.prototype.setCount = function(count) {
        this.count = count;
        return this;
    };
    OC.Star.prototype.path = function(ctx) {
        var r = this.innerRadius;
        var R = this.outerRadius;
        var sin = Math.sin;
        var cos = Math.cos;
        var PI = Math.PI;
        var count = this.count;
        var angle = 360 / count;
        ctx.moveTo(0, -R);
        for (var i = 0; i < count; i++) {
            ctx.lineTo(r * sin((angle / 2 + i * angle) / 180 * PI), -r * cos((angle / 2 + i * angle) / 180 * PI));
            ctx.lineTo(R * sin((angle + i * angle) / 180 * PI), -R * cos((angle + i * angle) / 180 * PI));
        }
        ctx.lineTo(r * sin((360 - angle / 2) / 180 * PI), -r * cos((360 - angle / 2) / 180 * PI));
    };

    OC.Text = function(text, font, x, y, w, h, r) {
        OC.RoundRect.call(this, x, y, w, h, r);
        this.text = text || '';
        this.font = font || 'bold 50px 楷体';
        this.baseline = 'middle';
        this.align = 'center';
        this.textShadowOffsetX = 0;
        this.textShadowOffsetY = 0;
        this.textShadowBlur = 0;
        this.textShadowColor = 'rgba(0,0,0,0)';
        this.textFillStyle = '#eee';
        this.textStrokeStyle = '#999';
        this.textLineWidth = 1;
        this.textLineDashOffset = 0;
        this.textOpacity = 1;
        this.paddingTop = 0;
        this.paddingRight = 0;
        this.paddingBottom = 0;
        this.paddingLeft = 0;
    };
    OC.Text.prototype = new OC.RoundRect();
    OC.Text.prototype.setText = function(text) {
        this.text = text;
        return this;
    };
    OC.Text.prototype.setTextOpacity = function(opacity) {
        this.textOpacity = opacity;
        return this;
    };
    OC.Text.prototype.setFont = function(font) {
        this.font = font;
        return this;
    };
    OC.Text.prototype.setBaseline = function(baseline) {
        this.baseline = baseline;
        return this;
    };
    OC.Text.prototype.setAlign = function(align) {
        this.align = align;
        return this;
    };
    OC.Text.prototype.setTextFillStyle = function(textFillStyle) {
        this.textFillStyle = textFillStyle;
        return this;
    };
    OC.Text.prototype.setTextStrokeStyle = function(textStrokeStyle) {
        this.textStrokeStyle = textStrokeStyle;
        return this;
    };
    OC.Text.prototype.setTextLineWidth = function(textLineWidth) {
        this.textLineWidth = textLineWidth;
        return this;
    };
    OC.Text.prototype.setTextLineDashOffset = function(textLineDashOffset) {
        this.textLineDashOffset = textLineDashOffset;
        return this;
    };
    OC.Text.prototype.setTextShadowColor = function(color) {
        this.textShadowColor = color;
        return this;
    };
    OC.Text.prototype.setTextShadowBlur = function(blur) {
        this.textShadowBlur = blur;
        return this;
    };
    OC.Text.prototype.setTextShadowOffsetX = function(x) {
        this.textShadowOffsetX = x;
        return this;
    };
    OC.Text.prototype.setTextShadowOffsetY = function(y) {
        this.textShadowOffsetY = y;
        return this;
    };
    OC.Text.prototype.setTextShadowOffset = function(x, y) {
        return this.setTextShadowOffsetX(x).setTextShadowOffsetY(y);
    };
    OC.Text.prototype.setTextShadow = function(x, y, blur, color) {
        return this.setTextShadowOffset(x, y).setTextShadowBlur(blur).setTextShadowColor(color);
    };
    OC.Text.prototype.setPaddingTop = function(padding) {
        this.paddingTop = padding;
        return this;
    };
    OC.Text.prototype.setPaddingLeft = function(padding) {
        this.paddingLeft = padding;
        return this;
    };
    OC.Text.prototype.setPaddingBottom = function(padding) {
        this.paddingBottom = padding;
        return this;
    };
    OC.Text.prototype.setPaddingRight = function(padding) {
        this.paddingRight = padding;
        return this;
    };
    OC.Text.prototype.setPadding = function(top, right, bottom, left) {
        right = right || top;
        bottom = bottom || top;
        left = left || right;
        return this.setPaddingTop(top).setPaddingRight(right).setPaddingBottom(bottom).setPaddingLeft(left);
    };
    OC.Text.prototype.calc = function() {
        var x = this.w / 2,
            y = this.h / 2,
            align = this.align.toLowerCase(),
            baseline = this.baseline.toLowerCase();
        if (align === 'left') {
            x -= this.w / 2;
            x += this.paddingLeft;
        } else if (align === 'right') {
            x += this.w / 2;
            x -= this.paddingRight;
        }
        if (baseline === 'top') {
            y += this.h / 2;
            y += this.paddingBottom;
            baseline = 'bottom';
        } else if (baseline === 'bottom') {
            y -= this.h / 2;
            y -= this.paddingTop;
            baseline = 'top';
        }
        return {
            x: x,
            y: y,
            baseline: baseline
        };
    };
    OC.Text.prototype.fillText = function(ctx) {
        this.fix(ctx, function(ctx) {
            ctx.font = this.font;
            ctx.globalAlpha = this.textOpacity;
            ctx.fillStyle = this.textFillStyle;
            ctx.shadowColor = this.textShadowColor;
            ctx.shadowBlur = this.textShadowBlur;
            ctx.shadowOffsetX = this.textShadowOffsetX;
            ctx.shadowOffsetY = this.textShadowOffsetY;
            var calc = this.calc();
            ctx.textAlign = this.align;
            ctx.textBaseline = calc.baseline;
            ctx.fillText(this.text, calc.x, calc.y);
        });
        return this;
    };
    OC.Text.prototype.strokeText = function(ctx) {
        this.fix(ctx, function(ctx) {
            ctx.font = this.font;
            ctx.globalAlpha = this.textOpacity;
            ctx.strokeStyle = this.textStrokeStyle;
            ctx.lineWidth = this.textLineWidth;
            ctx.lineDashOffset = this.textLineDashOffset;
            var calc = this.calc();
            ctx.textAlign = this.align;
            ctx.textBaseline = calc.baseline;
            ctx.strokeText(this.text, calc.x, calc.y);
        });
        return this;
    };
    OC.Text.prototype.drawText = function(ctx) {
        return this.fillText(ctx).strokeText(ctx);
    };
    OC.Text.prototype.fill = function(ctx) {
        OC.RoundRect.prototype.fill.call(this, ctx);
        return this.fillText(ctx);
    };
    OC.Text.prototype.stroke = function(ctx) {
        OC.RoundRect.prototype.stroke.call(this, ctx);
        return this.strokeText(ctx);
    };
    OC.Text.prototype.draw = function(ctx) {
        OC.RoundRect.prototype.draw.call(this, ctx);
        return this.drawText(ctx);
    };

    OC.Polygon = function(points) {
        OC.Object.call(this);
        this.points = points || [];
    };
    OC.Polygon.prototype = new OC.Object();
    OC.Polygon.prototype.path = function(ctx) {
        [].forEach.call(this.points, function(p, i) {
            if (i === 0) {
                ctx.moveTo(p.x, p.y);
            } else {
                ctx.lineTo(p.x, p.y);
            }
        });
    };

    OC.Line = function(x1, y1, x2, y2) {
        OC.Object.call(this);
        this.x1 = x1 || 0;
        this.y1 = y1 || 0;
        this.x2 = x2 || 0;
        this.y2 = y2 || 0;
    };
    OC.Line.prototype = new OC.Object();
    OC.Line.prototype.setX1 = function(x) {
        this.x1 = x;
        return this;
    };
    OC.Line.prototype.setY1 = function(y) {
        this.y1 = y;
        return this;
    };
    OC.Line.prototype.setX2 = function(x) {
        this.x2 = x;
        return this;
    };
    OC.Line.prototype.setY2 = function(y) {
        this.y2 = y;
        return this;
    };
    OC.Line.prototype.setPoint1 = function(x, y) {
        return this.setX1(x).setY1(y);
    };
    OC.Line.prototype.setPoint2 = function(x, y) {
        return this.setX2(x).setY2(y);
    };
    OC.Line.prototype.path = function(ctx) {
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
    };

    OC.Sprit = function(src, x, y) {
        var ready = false;
        this.img = new Image();
        this.srcX = 0;
        this.srcY = 0;
        this.srcW = null;
        this.srcH = null;
        this.dstX = x || 0;
        this.dstY = y || 0;
        this.dstW = null;
        this.dstH = null;
        this.load = function(src, onfulfilled, onrejected) {
            onrejected = onrejected || function() {};
            ready = false;
            this.img.src = src;
            var _this = this;
            this.img.onload = function() {
                ready = true;
                if (onfulfilled) {
                    onfulfilled(_this);
                }
            };
            this.img.onerror = onrejected;
            this.img.onabort = onrejected;
        };
        this.draw = function(ctx) {
            ctx = ctx || OC.defaultContext;
            if (ready) {
                var srcW = this.srcW,
                    srcH = this.srcH,
                    dstW = this.dstW,
                    dstH = this.dstH;
                if (typeof srcW !== 'number') {
                    srcW = this.img.width;
                }
                if (typeof srcH !== 'number') {
                    srcH = this.img.height;
                }
                if (typeof ts.dstW !== 'number') {
                    dstW = this.img.width;
                }
                if (typeof dstH !== 'number') {
                    dstH = this.img.height;
                }
                ctx.drawImage(img, this.srcX, this.srcY, srcW, srcH, this.dstX, this.dstY, dstW, dstH);
            }
            return this;
        };
        Object.defineProperty(this, 'ready', {
            get: function() {
                return ready;
            }
        });
        Object.defineProperty(this, 'src', {
            set: function(val) {
                this.img.src = val;
            },
            get: function() {
                return this.img.src;
            }
        });
        if (src) {
            this.load(src);
        }
    };

    // parse from json string
    OC.parse = function(str) {
        try {
            var config = JSON.parse(str);
            if (!config.constructor) {
                return null;
            }
            var o = new OC[config.constructor];
            o.set(config);
            return o;
        } catch (err) {
            return null;
        }
    };

})();