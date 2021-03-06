/**
 * OC.js
 * @author hhh
 * @see https://github.com/huang2002/ObjectiveCanvas.js
 */
(function () {

    if (window.OC) {
        return;
    }
    window.OC = {};

    // properties
    OC.defaultContext = null;

    // methods
    OC.setDefaultContext = function (ctx) {
        this.defaultContext = ctx;
    };

    // BoundingRect
    OC.BoundingRect = function (x, y, w, h) {
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 0;
        this.h = h || 0;
    };

    // shapes
    OC.Object = function () {
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
        this.lineDash = null;
        this.opacity = 1;
        this.clip = null;
        this.boundColor = '#f00';
    };
    OC.Object.prototype.setFillStyle = function (fillStyle) {
        this.fillStyle = fillStyle;
        return this;
    };
    OC.Object.prototype.setStrokeStyle = function (strokeStyle) {
        this.strokeStyle = strokeStyle;
        return this;
    };
    OC.Object.prototype.setLineWidth = function (lineWidth) {
        this.lineWidth = lineWidth;
        return this;
    };
    OC.Object.prototype.setLineJoin = function (lineJoin) {
        this.lineJoin = lineJoin;
        return this;
    };
    OC.Object.prototype.setLineCap = function (lineCap) {
        this.lineCap = lineCap;
        return this;
    };
    OC.Object.prototype.setScaleX = function (x) {
        this.scaleX = x;
        return this;
    };
    OC.Object.prototype.setScaleY = function (y) {
        this.scaleY = y;
        return this;
    };
    OC.Object.prototype.setTranslateX = function (x) {
        this.translateX = x;
        return this;
    };
    OC.Object.prototype.setTranslateY = function (y) {
        this.translateY = y;
        return this;
    };
    OC.Object.prototype.setRotate = function (rad) {
        this.rotate = rad;
        return this;
    };
    OC.Object.prototype.setRotateDeg = function (deg) {
        this.rotate = deg / 180 * Math.PI;
        return this;
    };
    OC.Object.prototype.setShadowOffsetX = function (x) {
        this.shadowOffsetX = x;
        return this;
    };
    OC.Object.prototype.setShadowOffsetY = function (y) {
        this.shadowOffsetY = y;
        return this;
    };
    OC.Object.prototype.setShadowOffset = function (x, y) {
        return this.setShadowOffsetX(x).setShadowOffsetY(y);
    };
    OC.Object.prototype.setShadowColor = function (color) {
        this.shadowColor = color;
        return this;
    };
    OC.Object.prototype.setShadowBlur = function (blur) {
        this.shadowBlur = blur;
        return this;
    };
    OC.Object.prototype.setOpacity = function (opacity) {
        this.opacity = opacity;
        return this;
    };
    OC.Object.prototype.setLineDash = function (offset) {
        this.lineDashOffset = offset;
        return this;
    };
    OC.Object.prototype.setClip = function (clip) {
        this.clip = clip;
        return this;
    };
    OC.Object.prototype.setScale = function (x, y) {
        return this.setScaleX(x).setScaleY(y);
    };
    OC.Object.prototype.setTranslate = function (x, y) {
        return this.setTranslateX(x).setTranslateY(y);
    };
    OC.Object.prototype.setShadowOffset = function (x, y) {
        return this.setShadowOffsetX(x).setShadowOffsetY(y);
    };
    OC.Object.prototype.translate = function (x, y) {
        this.translateX += x;
        this.translateY += y;
        return this;
    };
    OC.Object.prototype.translateShadow = function (x, y) {
        this.shadowOffsetX += x;
        this.shadowOffsetY += y;
        return this;
    };
    OC.Object.prototype.rotateRad = function (rad) {
        this.rotate += rad;
        return this;
    };
    OC.Object.prototype.rotateDeg = function (deg) {
        this.rotate += deg / 180 * Math.PI;
        return this;
    };
    OC.Object.prototype.setShadow = function (x, y, blur, color) {
        return this.setShadowOffset(x, y).setShadowBlur(blur).setShadowColor(color);
    };
    OC.Object.prototype.fix = function (ctx, callback) {
        ctx = ctx || OC.defaultContext;
        ctx.save();
        ctx.beginPath();
        if (this.clip) {
            ctx.globalAlpha = this.clip.opacity;
            var transX = this.clip.translateX + (this.clip.x || 0),
                transY = this.clip.translateY + (this.clip.y || 0);
            ctx.translate(transX, transY);
            ctx.scale(this.clip.scaleX, this.clip.scaleY);
            ctx.rotate(this.clip.rotate);
            this.clip.path(ctx);
            ctx.clip();
            ctx.beginPath();
            ctx.rotate(-this.clip.rotate);
            ctx.scale(1 / this.clip.scaleX, 1 / this.clip.scaleY);
            ctx.translate(-transX, -transY);
        }
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.translateX + (this.x || 0), this.translateY + (this.y || 0));
        ctx.scale(this.scaleX, this.scaleY);
        ctx.rotate(this.rotate);
        if (this.path) {
            this.path(ctx);
        }
        callback.call(this, ctx);
        ctx.restore();
        return this;
    };
    OC.Object.prototype.path = function (ctx) {
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 0);
    };
    OC.Object.prototype.fill = function (ctx) {
        this.fix(ctx, function (ctx) {
            ctx.fillStyle = this.fillStyle;
            if (this.shadowColor.toLowerCase() !== 'none') {
                ctx.shadowColor = this.shadowColor;
                ctx.shadowBlur = this.shadowBlur;
                ctx.shadowOffsetX = this.shadowOffsetX;
                ctx.shadowOffsetY = this.shadowOffsetY;
            }
            ctx.fill();
        });
        return this;
    };
    OC.Object.prototype.stroke = function (ctx) {
        this.fix(ctx, function (ctx) {
            ctx.strokeStyle = this.strokeStyle;
            ctx.lineWidth = this.lineWidth;
            ctx.lineCap = this.lineCap;
            ctx.lineJoin = this.lineJoin;
            if (this.lineDash) {
                ctx.setLineDash(this.lineDash);
            }
            ctx.stroke();
        });
        return this;
    };
    OC.Object.prototype.draw = function (ctx) {
        return this.fill(ctx).stroke(ctx);
    };
    OC.Object.prototype.set = function (options) {
        for (var k in options) {
            if (k in this) {
                this[k] = options[k];
            }
        }
        return this;
    };
    OC.Object.prototype.isPointInPath = function (x, y) {
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            rect = this.getBoundingRect(),
            fill = this.fillStyle,
            stroke = this.strokeStyle,
            opacity = this.opacity;
        canvas.width = rect.w;
        canvas.height = rect.h;
        ctx.translate(-rect.x, -rect.y);
        this.fillStyle = '#000';
        this.strokeStyle = '#000';
        this.opacity = 1;
        this.draw(ctx);
        this.fillStyle = fill;
        this.strokeStyle = stroke;
        this.opacity = opacity;
        return ctx.getImageData(x - rect.x, y - rect.y, 1, 1).data[3] > 0;
    };
    OC.Object.prototype.getBoundingRect = function () {
        return new OC.BoundingRect();
    };
    OC.Object.prototype.drawBoundingRect = function (ctx) {
        ctx = ctx || OC.defaultContext;
        var rect = this.getBoundingRect();
        ctx.save();
        ctx.strokeStyle = this.boundColor;
        ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
        ctx.restore();
        return this;
    };

    OC.Shape = function (x, y) {
        OC.Object.call(this);
        this.x = x || 0;
        this.y = y || 0;
        this.scaleX = 1;
        this.scaleY = 1;
    };
    OC.Shape.prototype = new OC.Object();
    OC.Shape.prototype.setX = function (x) {
        this.x = x;
        return this;
    };
    OC.Shape.prototype.setY = function (y) {
        this.y = y;
        return this;
    };
    OC.Shape.prototype.setPos = function (x, y) {
        return this.setX(x).setY(y);
    };

    OC.Rect = function (x, y, w, h) {
        OC.Shape.call(this, x, y);
        this.w = w || 0;
        this.h = h || 0;
    };
    OC.Rect.prototype = new OC.Shape();
    OC.Rect.prototype.setW = function (w) {
        this.w = w;
        return this;
    };
    OC.Rect.prototype.setH = function (h) {
        this.h = h;
        return this;
    };
    OC.Rect.prototype.path = function (ctx) {
        ctx.rect(0, 0, this.w, this.h);
    };
    OC.Rect.prototype.getBoundingRect = function () {
        var x = this.x,
            y = this.y,
            w = this.w,
            h = this.h,
            rtt = this.rotate;
        if (rtt % 360 !== 0) {
            var c = Math.sqrt(w * w + h * h),
                xArr = [
                    x,
                    x - h * Math.sin(rtt),
                    x + w * Math.cos(rtt),
                    x + c * Math.cos(rtt + Math.atan(h / w))
                ],
                x_min = Math.min.apply(Math, xArr),
                x_max = Math.max.apply(Math, xArr),
                yArr = [
                    y,
                    y + h * Math.cos(rtt),
                    y + w * Math.sin(rtt),
                    y + c * Math.sin(rtt + Math.atan(h / w))
                ],
                y_min = Math.min.apply(Math, yArr),
                y_max = Math.max.apply(Math, yArr);
            x = x_min;
            y = y_min;
            w = x_max - x_min;
            h = y_max - y_min;
        }
        return new OC.BoundingRect(x + this.translateX, y + this.translateY, w * this.scaleX, h * this.scaleY);
    };

    OC.Circle = function (x, y, r) {
        OC.Shape.call(this, x, y);
        this.r = r || 0;
    };
    OC.Circle.prototype = new OC.Shape();
    OC.Circle.prototype.setR = function (r) {
        this.r = r;
        return this;
    };
    OC.Circle.prototype.path = function (ctx) {
        ctx.arc(0, 0, this.r, 0, Math.PI * 2);
    };
    OC.Circle.prototype.getBoundingRect = function () {
        return new OC.BoundingRect(this.x + this.translateX - this.r * this.scaleX, this.y + this.translateY - this.r * this.scaleY, this.r * 2 * this.scaleX, this.r * 2 * this.scaleY);
    };

    OC.Arc = function (x, y, r, start, end, anticlockwise) {
        OC.Circle.call(this, x, y, r);
        this.start = start || 0;
        this.end = end || 0;
        this.anticlockwise = anticlockwise || false;
    };
    OC.Arc.prototype = new OC.Circle();
    OC.Arc.prototype.setStart = function (start) {
        this.start = start;
        return this;
    };
    OC.Arc.prototype.setEnd = function (end) {
        this.end = end;
        return this;
    };
    OC.Arc.prototype.setAnticlockwise = function (anticlockwise) {
        this.anticlockwise = anticlockwise;
        return this;
    };
    OC.Arc.prototype.path = function (ctx) {
        ctx.arc(0, 0, this.r, this.start, this.end, this.anticlockwise);
    };

    OC.RoundRect = function (x, y, w, h, r) {
        OC.Rect.call(this, x, y, w, h);
        this.r = r || 2;
    };
    OC.RoundRect.prototype = new OC.Rect();
    OC.RoundRect.prototype.setR = function (r) {
        this.r = r;
        return this;
    };
    OC.RoundRect.prototype.path = function (ctx) {
        var w = this.w,
            h = this.h,
            x = this.x,
            y = this.y,
            r = this.r,
            min = Math.min(w, h) / 2;
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

    OC.Star = function (x, y, innerRadius, outerRadius, count) {
        OC.Shape.call(this, x, y);
        this.innerRadius = innerRadius || 0;
        this.outerRadius = outerRadius || 0;
        this.count = count === undefined ? 5 : count;
    };
    OC.Star.prototype = new OC.Shape();
    OC.Star.prototype.setInnerRadius = function (innerRadius) {
        this.innerRadius = innerRadius;
        return this;
    };
    OC.Star.prototype.setOuterRadius = function (outerRadius) {
        this.outerRadius = outerRadius;
        return this;
    };
    OC.Star.prototype.setCount = function (count) {
        this.count = count;
        return this;
    };
    OC.Star.prototype.path = function (ctx) {
        var r = this.innerRadius,
            R = this.outerRadius,
            sin = Math.sin,
            cos = Math.cos,
            PI = Math.PI,
            count = this.count,
            angle = 360 / count;
        ctx.moveTo(0, -R);
        for (var i = 0; i < count; i++) {
            ctx.lineTo(r * sin((angle / 2 + i * angle) / 180 * PI), -r * cos((angle / 2 + i * angle) / 180 * PI));
            ctx.lineTo(R * sin((angle + i * angle) / 180 * PI), -R * cos((angle + i * angle) / 180 * PI));
        }
        ctx.lineTo(r * sin((360 - angle / 2) / 180 * PI), -r * cos((360 - angle / 2) / 180 * PI));
    };
    OC.Star.prototype.getBoundingRect = function () {
        return OC.Circle.prototype.getBoundingRect.call({
            x: this.x,
            y: this.y,
            scaleX: this.scaleX,
            scaleY: this.scaleY,
            translateX: this.translateX,
            translateY: this.translateY,
            r: this.outerRadius
        });
    };

    OC.Text = function (text, font, x, y, w, h, r) {
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
    OC.Text.prototype.setText = function (text) {
        this.text = text;
        return this;
    };
    OC.Text.prototype.setTextOpacity = function (opacity) {
        this.textOpacity = opacity;
        return this;
    };
    OC.Text.prototype.setFont = function (font) {
        this.font = font;
        return this;
    };
    OC.Text.prototype.setBaseline = function (baseline) {
        this.baseline = baseline;
        return this;
    };
    OC.Text.prototype.setAlign = function (align) {
        this.align = align;
        return this;
    };
    OC.Text.prototype.setTextFillStyle = function (textFillStyle) {
        this.textFillStyle = textFillStyle;
        return this;
    };
    OC.Text.prototype.setTextStrokeStyle = function (textStrokeStyle) {
        this.textStrokeStyle = textStrokeStyle;
        return this;
    };
    OC.Text.prototype.setTextLineWidth = function (textLineWidth) {
        this.textLineWidth = textLineWidth;
        return this;
    };
    OC.Text.prototype.setTextLineDashOffset = function (textLineDashOffset) {
        this.textLineDashOffset = textLineDashOffset;
        return this;
    };
    OC.Text.prototype.setTextShadowColor = function (color) {
        this.textShadowColor = color;
        return this;
    };
    OC.Text.prototype.setTextShadowBlur = function (blur) {
        this.textShadowBlur = blur;
        return this;
    };
    OC.Text.prototype.setTextShadowOffsetX = function (x) {
        this.textShadowOffsetX = x;
        return this;
    };
    OC.Text.prototype.setTextShadowOffsetY = function (y) {
        this.textShadowOffsetY = y;
        return this;
    };
    OC.Text.prototype.setTextShadowOffset = function (x, y) {
        return this.setTextShadowOffsetX(x).setTextShadowOffsetY(y);
    };
    OC.Text.prototype.setTextShadow = function (x, y, blur, color) {
        return this.setTextShadowOffset(x, y).setTextShadowBlur(blur).setTextShadowColor(color);
    };
    OC.Text.prototype.setPaddingTop = function (padding) {
        this.paddingTop = padding;
        return this;
    };
    OC.Text.prototype.setPaddingLeft = function (padding) {
        this.paddingLeft = padding;
        return this;
    };
    OC.Text.prototype.setPaddingBottom = function (padding) {
        this.paddingBottom = padding;
        return this;
    };
    OC.Text.prototype.setPaddingRight = function (padding) {
        this.paddingRight = padding;
        return this;
    };
    OC.Text.prototype.setPadding = function (top, right, bottom, left) {
        right = right || top;
        bottom = bottom || top;
        left = left || right;
        return this.setPaddingTop(top).setPaddingRight(right).setPaddingBottom(bottom).setPaddingLeft(left);
    };
    OC.Text.prototype.calc = function () {
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
    OC.Text.prototype.fillText = function (ctx) {
        this.fix(ctx, function (ctx) {
            ctx.font = this.font;
            ctx.globalAlpha = this.textOpacity;
            ctx.fillStyle = this.textFillStyle;
            if (this.textShadowColor.toLowerCase() !== 'none') {
                ctx.shadowColor = this.textShadowColor;
                ctx.shadowBlur = this.textShadowBlur;
                ctx.shadowOffsetX = this.textShadowOffsetX;
                ctx.shadowOffsetY = this.textShadowOffsetY;
            }
            var calc = this.calc();
            ctx.textAlign = this.align;
            ctx.textBaseline = calc.baseline;
            ctx.fillText(this.text, calc.x, calc.y);
        });
        return this;
    };
    OC.Text.prototype.strokeText = function (ctx) {
        this.fix(ctx, function (ctx) {
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
    OC.Text.prototype.drawText = function (ctx) {
        return this.fillText(ctx).strokeText(ctx);
    };
    OC.Text.prototype.fill = function (ctx) {
        OC.RoundRect.prototype.fill.call(this, ctx);
        return this.fillText(ctx);
    };
    OC.Text.prototype.stroke = function (ctx) {
        OC.RoundRect.prototype.stroke.call(this, ctx);
        return this.strokeText(ctx);
    };
    OC.Text.prototype.draw = function (ctx) {
        OC.RoundRect.prototype.draw.call(this, ctx);
        return this.drawText(ctx);
    };

    OC.Polygon = function (points) {
        OC.Object.call(this);
        this.points = points || [];
    };
    OC.Polygon.prototype = new OC.Object();
    OC.Polygon.prototype.path = function (ctx) {
        this.points.forEach(function (p, i) {
            if (i === 0) {
                ctx.moveTo(p.x, p.y);
            } else {
                ctx.lineTo(p.x, p.y);
            }
        });
    };
    OC.Polygon.prototype.getBoundingRect = function () {
        var x_max, x_min, y_max, y_min;
        this.points.forEach(function (p, i) {
            if (i === 0) {
                x = p.x;
                y = p.y;
            } else {
                x = Math.max(x, p.x);
                y = Math.max(y, p.y);
            }
        });
        return new OC.BoundingRect(x_min + this.translateX, y_min + this.translateY, (x_max - x_min) * this.scaleX, (y_max - y_min) * this.scaleY);
    };

    OC.Line = function (x1, y1, x2, y2) {
        OC.Object.call(this);
        this.x1 = x1 || 0;
        this.y1 = y1 || 0;
        this.x2 = x2 || 0;
        this.y2 = y2 || 0;
    };
    OC.Line.prototype = new OC.Object();
    OC.Line.prototype.setX1 = function (x) {
        this.x1 = x;
        return this;
    };
    OC.Line.prototype.setY1 = function (y) {
        this.y1 = y;
        return this;
    };
    OC.Line.prototype.setX2 = function (x) {
        this.x2 = x;
        return this;
    };
    OC.Line.prototype.setY2 = function (y) {
        this.y2 = y;
        return this;
    };
    OC.Line.prototype.setPoint1 = function (x, y) {
        return this.setX1(x).setY1(y);
    };
    OC.Line.prototype.setPoint2 = function (x, y) {
        return this.setX2(x).setY2(y);
    };
    OC.Line.prototype.path = function (ctx) {
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
    };
    OC.Line.prototype.getBoundingRect = function () {
        var x = Math.max(this.x1, this.x2),
            y = Math.max(this.y1, this.y2);
        return OC.Rect.prototype.getBoundingRect.call({
            x: x,
            y: y,
            w: x - Math.min(this.x1, this.x2),
            h: y - Math.min(this.y1, this.y2),
            scaleX: this.scaleX,
            scaleY: this.scaleY,
            translateX: this.translateX,
            translateY: this.translateY
        });
    };

    OC.Sprite = function (src, x, y) {
        OC.Object.call(this);
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
        this.load = function (src, onfulfilled, onrejected) {
            onrejected = onrejected || function () { };
            ready = false;
            this.img.src = src;
            var _this = this;
            this.img.onload = function () {
                ready = true;
                if (onfulfilled) {
                    onfulfilled(_this);
                }
            };
            this.img.onerror = onrejected;
            this.img.onabort = onrejected;
        };
        this.draw = function (ctx) {
            ctx = ctx || OC.defaultContext;
            if (ready) {
                var srcW = this.srcW,
                    srcH = this.srcH
                if (typeof srcW !== 'number') {
                    srcW = this.img.width;
                }
                if (typeof srcH !== 'number') {
                    srcH = this.img.height;
                }
                if (typeof dstW !== 'number') {
                    dstW = this.img.width;
                }
                if (typeof dstH !== 'number') {
                    dstH = this.img.height;
                }
                this.fix(ctx, function () {
                    ctx.drawImage(
                        this.img,
                        this.srcX, this.srcY, srcW, srcH,
                        0, 0, dstW, dstH
                    );
                });
            }
            return this;
        };
        Object.defineProperty(this, 'ready', {
            get: function () {
                return ready;
            }
        });
        Object.defineProperty(this, 'x', {
            set: function (val) {
                this.dstX = val;
            },
            get: function () {
                return this.dstX;
            }
        });
        Object.defineProperty(this, 'y', {
            set: function (val) {
                this.dstY = val;
            },
            get: function () {
                return this.dstY;
            }
        });
        Object.defineProperty(this, 'src', {
            set: function (val) {
                this.img.src = val;
            },
            get: function () {
                return this.img.src;
            }
        });
        if (src) {
            this.load(src);
        }
    };
    OC.Sprite.prototype = new OC.Object();
    OC.Sprite.prototype.center = function () {
        return this.translate(-(this.dstW || this.img.width) / 2, -(this.dstH || this.img.height) / 2);
    };
    OC.Sprite.prototype.getBoundingRect = function () {
        if (!this.ready) {
            return new OC.BoundingRect();
        }
        return new OC.BoundingRect(this.dstX, this.dstY, this.dstW || this.img.width, this.dstH || this.img.height);
    };

    OC.TextGroup = function (txtArr, font, x, y, w, h, r, lineHeight) {
        OC.RoundRect.call(this, x, y, w, h, r);
        this.texts = [];
        this.padding = 10;
        this.lineHeight = lineHeight || 30;
        this.initTexts.apply(this, arguments);
    };
    OC.TextGroup.prototype = new OC.RoundRect();
    OC.TextGroup.prototype.setLineHeight = function (lineHeight) {
        this.lineHeight = lineHeight;
        return this;
    };
    OC.TextGroup.prototype.setPadding = function (padding) {
        this.padding = padding;
        return this;
    };
    OC.TextGroup.prototype.initTexts = function (txtArr, font, x, y, w, h, r) {
        this.texts = txtArr.map(function (txt) {
            return new OC.Text(txt, font, x, y, w, h, r);
        });
        return this;
    };
    OC.TextGroup.prototype.setTexts = function (txtArr, font, x, y, w, h, r) {
        var texts = this.texts;
        Hi.each(txtArr, function (txt, i) {
            if (i < texts.length) {
                texts[i].text = txt;
            } else {
                texts[i].text = new OC.Text(txt, font, x, y, w, h, r);
            }
        }, this);
        return this;
    };
    OC.TextGroup.prototype.setEach = function (options) {
        this.texts.forEach(function (text) {
            text.set(options);
        });
        return this;
    };
    OC.TextGroup.prototype.fixTexts = function () {
        this.texts.forEach(function (text, i) {
            switch (text.align) {
                case 'left':
                    text.x = this.x + this.padding;
                    break;
                case 'right':
                    text.x = this.x + this.w - this.padding;
                    break;
                case 'center':
                    text.x = this.x + this.w / 2;
                    break;
            }
            text.y = this.y + (i + .5) * this.lineHeight + this.padding;
        }, this);
        return this;
    };
    OC.TextGroup.prototype.strokeTexts = function (ctx) {
        this.fixTexts();
        this.texts.forEach(function (text, i) {
            text.stroke(ctx);
        }, this);
        return this;
    };
    OC.TextGroup.prototype.fillTexts = function (ctx) {
        this.fixTexts();
        this.texts.forEach(function (text, i) {
            text.fill(ctx);
        }, this);
        return this;
    };
    OC.TextGroup.prototype.drawTexts = function (ctx) {
        this.fixTexts();
        this.texts.forEach(function (text, i) {
            text.draw(ctx);
        }, this);
        return this;
    };
    OC.TextGroup.prototype.draw = function (ctx) {
        OC.RoundRect.prototype.draw.call(this, ctx);
        this.drawTexts(ctx);
        return this;
    };

    // parse from json string
    OC.parse = function (str) {
        try {
            var config = JSON.parse(str);
            if (!config.constructor) {
                return undefined;
            }
            var o = new OC[config.constructor];
            o.set(config);
            return o;
        } catch (err) {
            return null;
        }
    };

})();