# ObjectiveCanvas.js
To use &lt;canvas&gt; in a more beautiful way.

## What's ObjectiveCanvas(OC).js ?
It contains some constructors, such as "Rect", "Circle" and so on.

For example, if you want to draw a red circle, you can type like this:
```
var ctx = document.getElementById("canvas").getContext("2d"); // get context
var x = 100, y = 100, r = 50;
var circle = new OC.Circle(x, y, r); // create a circle ( equals "var circle = OC.Circle.createNew(x, y, r);". )
circle.setFillStyle("#f00").fill(ctx); // equals "circle.setFillStyle("#f00"); circle.fill(ctx);"
 ```

What's more, you can also set default context:
```
OC.setDefaultContext(ctx); // equals "OC.defaultContext = ctx;"
```

In this way, you can just type:
```
circle.fill();
```

If you put them together, you can write:
```
var ctx = document.getElementById("canvas").getContext("2d");
var x = 100, y = 100, r = 50;
OC.Circle.createNew(x, y, r).setFillStyle("#f00").fill(ctx);
// or: OC.setDefaultContext(ctx).Circle.createNew(x, y, r).setFillStyle("#f00").fill();
```

How about two ?
```
var ctx = document.getElementById("canvas").getContext("2d");
var x1 = 100, y1 = 100, r1 = 50,
    x2 = 150, y2 = 150, r2 = 60;
OC.Circle.createNew(x1, y1, r1).setFillStyle("#f00").fill(ctx).setPos(x2, y2, r2).fill(ctx);
// or: OC.setDefaultContext(ctx) ...
```

As you can see, it is very useful, especially when you want to draw one more shapes.

## Some constructors
* Shape ( basic constructor for shapes )
* Rect
* Circle
* ...

To see more, just see "ObjectiveCanvas.js"