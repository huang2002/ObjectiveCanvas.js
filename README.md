# ObjectiveCanvas.js
> To use &lt;canvas> in an objective way.

## What's ObjectiveCanvas.js ?
It defines some constructors which you can use to create objects and draw them on &lt;canvas>.
### Some constructors:
* OC.Object
* OC.Shape
* OC.Rect
* OC.RoundRect
* OC.Circle
* OC.Arc
* OC.Star
* OC.Text
* OC.Line
* OC.Polygon
* OC.Spirit
* OC.TextGroup

## How to use them ?
1. Get an instance
2. Set properties (position, transform, color, shadow, clip...)
3. Draw it on &lt;canvas>
### Example:
```html
<!DOCTYPE html>
<html>

<head>
    <title>ObjectiveCanvas.js</title>
    <!-- Load OC(.min).js -->
    <script src="OC.min.js"></script>
</head>

<body>
    <canvas id="canvas"></canvas>
    <script>

        var canvas = document.querySelector('#canvas'),
            ctx = canvas.getContext('2d'),
            circle = new OC.Circle(); // create a circle

        /* set position */
        circle.setX(100);
        circle.setY(100);
        // equals to circle.setPos(100, 100);

        /* set color */
        circle.setFillStyle('#ff0');
        circle.setStrokeStyle('#f00');

        /* draw */
        circle.draw(ctx);
        // You can also set OC.defaultContext
        // and just write: xxx.draw();

    </script>
</body>

</html>
```

## OC.Object.prototype.set(obj)
You can use this method to set properties of an object by giving an object.
### Example:
```javascript
circle.set({
    lineWidth: 2,
    shadowColor: 'rgba(0,0,0,.5)',
    shadowBlur: 10
});
```

## OC.parse(str)
This method enable you to get canvas objects from json strings.
### Example:
```javascript
var rect = OC.parse('{ "constructor": "Rect", "x": 100, "y": 100, "w": 200, "h": 200, "fillStyle": "#00f" }');
```

Try it !