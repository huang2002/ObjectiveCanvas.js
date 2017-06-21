# ObjectiveCanvas.js
> To use &lt;canvas&gt; in a more beautiful way.

## What's ObjectiveCanvas(OC).js ?
It contains some constructors which you can use to create some objects and draw them on &lt;canvas&gt;.

For example, if you want to draw a red circle at (100,100), you can write:
```
var ctx = document.getElementById("canvas").getContext("2d");
var x = 100, y = 100, r = 50;
var circle = new OC.Circle(x, y, r);
circle.setFillStyle("#FF0000");
circle.fill(ctx);
```
or:
```
var ctx = document.getElementById("canvas").getContext("2d");
OC.Circle.getInstance(100, 100, 50).setFillStyle("#FF0000").fill(ctx);
```
In a word, it aims to make you use &lt;canvas&gt; in a beautiful and objective way. 

## What's in it ?
Some constructors are under the main object(OC).
### Some constructors:
* Object
* Shape
* Rect
* RoundRect
* Circle
* Star
* Line
* Polygon
* Text
* ......

## What can I do with them ?
You can create objects and set properties of them. Then, draw them on &lt;canvas&gt;.
### Some properties:
* fillStyle
* lineCap
* lineJoin
* lineWidth
* offsetX
* offsetY
* opacity
* rotateDeg
* scaleX
* scaleY
* shadowBlur
* shadowColor
* shadowOffsetX
* shadowOffsetY
* strokeStyle
* x
* y
* ......

Also, you can set properties by methods, such as `setFillStyle(style)`. Besides, some properties can be set together by one method, for example, `setPos(x, y)`, `setShadow(offsetX, offsetY, blur, color)` and so on. What's more, some methods enable you to change properties instead of setting them:
```
Circle.offsetX; // 0
Circle.offsetY; // 0
Circle.translate(50, 50);
Circle.offsetX; // 50
Circle.offsetY; // 50
Circle.translate(100, -50);
Circle.offsetX; // 150
Circle.offsetY; // 0
```

## OC.parse(str)
Now, you can create an object by json string. For instance, you can get a red circle at (100, 100) by:
`'{ "type": "Circle", "x": 100, "y": 100, "r": 60, "fillStyle": "#FF0000" }'`.

## Advice
Last but not least, I suggest you have a look personally. This will let you know more about it.

## End
Thanks for your spending time looking at this document.
