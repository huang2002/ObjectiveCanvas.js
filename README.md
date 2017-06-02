# ObjectiveCanvas.js
To use &lt;canvas&gt; in a more beautiful way.

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
OC.Circle.createNew(100, 100, 50).setFillStyle("#FF0000").fill(ctx);
```
In a word, it aims to make you use &lt;canvas&gt; in a beautiful and objective way. 

## What's in it ?
### Some constructors:
* Shape
* Rect
* RoundRect
* Circle
* Star
* ......
### Some methods:
* setLineCap(lineCap)
* setLineJoin(lineJoin)
* setLineWidth(width)
* setStrokeStyle(style)
* stroke(ctx?)
* setFillStyle(style)
* fill(ctx?)
* translate(x, y)
* scale(x, y)
* rotate(deg)

## Advice
Last but not least, I suggest you have a look personally.


## End
Thanks for your spending time looking at this document.
