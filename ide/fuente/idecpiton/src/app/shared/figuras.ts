import * as go from 'gojs';
import { Injectable } from '@angular/core';

//Definiendo que esta clase va a ser inyectable para pasar esta instancia por medio de un constructor
@Injectable({providedIn: 'root'}) 
export class Figuras{    
    constructor(){
    
    }
    
//Este metodo se puede llamar para definir las figuras :p

definirFiguras(){
        //funciones necesarias para que ciertos poligonos funcionen
    var _CachedArrays = [];
    var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
    function tempArray() {
      var temp = _CachedArrays.pop();
      if (temp === undefined)
          return [];
      return temp;
    }
    function freeArray(a) {
      a.length = 0; // clear any references to objects
      _CachedArrays.push(a);
  }
    function createPolygon(sides) {
      // Point[] points = new Point[sides + 1];
      var points = tempArray();
      var radius = .5;
      var center = .5;
      var offsetAngle = Math.PI * 1.5;
      var angle = 0;
      // Loop through each side of the polygon
      for (var i = 0; i < sides; i++) {
          angle = 2 * Math.PI / sides * i + offsetAngle;
          points[i] = new go.Point((center + radius * Math.cos(angle)), (center + radius * Math.sin(angle)));
      }
      // Add the last line
      // points[points.length - 1] = points[0];
      points.push(points[0]);
      return points;
  }

    //aca se definen todas las custom shapes que se desean usar, se puede traer todo el archivo figures.js pero seria muy pesado
    go.Shape.defineFigureGenerator('Parallelogram1', function (shape, w, h) {
        var param1 = shape ? shape.parameter1 : NaN; // indent's percent distance
        if (isNaN(param1))
            param1 = 0.1;
        else if (param1 < -1)
            param1 = -1;
        else if (param1 > 1)
            param1 = 1;
        var indent = Math.abs(param1) * w;
        if (param1 === 0) {
            var geo = new go.Geometry(go.Geometry.Rectangle);
            geo.startX = 0;
            geo.startY = 0;
            geo.endX = w;
            geo.endY = h;
            return geo;
        }
        else {
            var geo = new go.Geometry();
            if (param1 > 0) {
                geo.add(new go.PathFigure(indent, 0)
                    .add(new go.PathSegment(go.PathSegment.Line, w, 0))
                    .add(new go.PathSegment(go.PathSegment.Line, w - indent, h))
                    .add(new go.PathSegment(go.PathSegment.Line, 0, h).close()));
            }
            else { // param1 < 0
                geo.add(new go.PathFigure(0, 0)
                    .add(new go.PathSegment(go.PathSegment.Line, w - indent, 0))
                    .add(new go.PathSegment(go.PathSegment.Line, w, h))
                    .add(new go.PathSegment(go.PathSegment.Line, indent, h).close()));
            }
            if (indent < w / 2) {
                geo.setSpots(indent / w, 0, (w - indent) / w, 1);
            }
            return geo;
        }
    });

    go.Shape.defineFigureGenerator('Hexagon', function (shape, w, h) {
      var points = createPolygon(6);
      var geo = new go.Geometry();
      var fig = new go.PathFigure(points[0].x * w, points[0].y * h, true);
      geo.add(fig);
      for (var i = 1; i < 6; i++) {
          fig.add(new go.PathSegment(go.PathSegment.Line, points[i].x * w, points[i].y * h));
      }
      fig.add(new go.PathSegment(go.PathSegment.Line, points[0].x * w, points[0].y * h).close());
      freeArray(points);
      geo.spot1 = new go.Spot(.07, .25);
      geo.spot2 = new go.Spot(.93, .75);
      return geo;
    });

    go.Shape.defineFigureGenerator('Heptagon', function (shape, w, h) {
      var points = createPolygon(7);
      var geo = new go.Geometry();
      var fig = new go.PathFigure(points[0].x * w, points[0].y * h, true);
      geo.add(fig);
      for (var i = 1; i < 7; i++) {
          fig.add(new go.PathSegment(go.PathSegment.Line, points[i].x * w, points[i].y * h));
      }
      fig.add(new go.PathSegment(go.PathSegment.Line, points[0].x * w, points[0].y * h).close());
      freeArray(points);
      geo.spot1 = new go.Spot(.2, .15);
      geo.spot2 = new go.Spot(.8, .85);
      return geo;
    });

    go.Shape.defineFigureGenerator('Pentagon', function (shape, w, h) {
      var points = createPolygon(5);
      var geo = new go.Geometry();
      var fig = new go.PathFigure(points[0].x * w, points[0].y * h, true);
      geo.add(fig);
      for (var i = 1; i < 5; i++) {
          fig.add(new go.PathSegment(go.PathSegment.Line, points[i].x * w, points[i].y * h));
      }
      fig.add(new go.PathSegment(go.PathSegment.Line, points[0].x * w, points[0].y * h).close());
      freeArray(points);
      geo.spot1 = new go.Spot(.2, .22);
      geo.spot2 = new go.Spot(.8, .9);
      return geo;
    });

    go.Shape.defineFigureGenerator('ManualInput', function (shape, w, h) {
      var geo = new go.Geometry();
      var fig = new go.PathFigure(w, 0, true);
      geo.add(fig);
      fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
      fig.add(new go.PathSegment(go.PathSegment.Line, 0, h));
      fig.add(new go.PathSegment(go.PathSegment.Line, 0, .25 * h).close());
      geo.spot1 = new go.Spot(0, .25);
      geo.spot2 = go.Spot.BottomRight;
      return geo;
    });

    go.Shape.defineFigureGenerator('Display', function (shape, w, h) {
      var geo = new go.Geometry();
      var fig = new go.PathFigure(.25 * w, 0, true);
      geo.add(fig);
      fig.add(new go.PathSegment(go.PathSegment.Line, .75 * w, 0));
      fig.add(new go.PathSegment(go.PathSegment.Bezier, .75 * w, h, w, 0, w, h));
      fig.add(new go.PathSegment(go.PathSegment.Line, .25 * w, h));
      fig.add(new go.PathSegment(go.PathSegment.Line, 0, .5 * h).close());
      geo.spot1 = new go.Spot(.25, 0);
      geo.spot2 = new go.Spot(.75, 1);
      return geo;
    });

    go.Shape.defineFigureGenerator('File', function (shape, w, h) {
      var geo = new go.Geometry();
      var fig = new go.PathFigure(0, 0, true); // starting point
      geo.add(fig);
      fig.add(new go.PathSegment(go.PathSegment.Line, .75 * w, 0));
      fig.add(new go.PathSegment(go.PathSegment.Line, w, .25 * h));
      fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
      fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
      var fig2 = new go.PathFigure(.75 * w, 0, false);
      geo.add(fig2);
      // The Fold
      fig2.add(new go.PathSegment(go.PathSegment.Line, .75 * w, .25 * h));
      fig2.add(new go.PathSegment(go.PathSegment.Line, w, .25 * h));
      geo.spot1 = new go.Spot(0, .25);
      geo.spot2 = go.Spot.BottomRight;
      return geo;
    });

    go.Shape.defineFigureGenerator('Junction', function (shape, w, h) {
      var geo = new go.Geometry();
      var dist = (1 / Math.SQRT2);
      var small = ((1 - 1 / Math.SQRT2) / 2);
      var cpOffset = KAPPA * .5;
      var radius = .5;
      var fig = new go.PathFigure(w, radius * h, true);
      geo.add(fig);
      // Circle
      fig.add(new go.PathSegment(go.PathSegment.Bezier, radius * w, h, w, (radius + cpOffset) * h, (radius + cpOffset) * w, h));
      fig.add(new go.PathSegment(go.PathSegment.Bezier, 0, radius * h, (radius - cpOffset) * w, h, 0, (radius + cpOffset) * h));
      fig.add(new go.PathSegment(go.PathSegment.Bezier, radius * w, 0, 0, (radius - cpOffset) * h, (radius - cpOffset) * w, 0));
      fig.add(new go.PathSegment(go.PathSegment.Bezier, w, radius * h, (radius + cpOffset) * w, 0, w, (radius - cpOffset) * h));
      var fig2 = new go.PathFigure((small + dist) * w, (small + dist) * h, false);
      geo.add(fig2);
      // X
      fig2.add(new go.PathSegment(go.PathSegment.Line, small * w, small * h));
      fig2.add(new go.PathSegment(go.PathSegment.Move, small * w, (small + dist) * h));
      fig2.add(new go.PathSegment(go.PathSegment.Line, (small + dist) * w, small * h));
      return geo;
    });

    go.Shape.defineFigureGenerator('TransmittalTape', function (shape, w, h) {
      var geo = new go.Geometry();
      var param1 = shape ? shape.parameter1 : NaN;
      if (isNaN(param1))
          param1 = .1; // Bottom line's distance from the point on the triangle
      var fig = new go.PathFigure(0, 0, true);
      geo.add(fig);
      fig.add(new go.PathSegment(go.PathSegment.Line, w, 0));
      fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
      fig.add(new go.PathSegment(go.PathSegment.Line, .75 * w, (1 - param1) * h));
      fig.add(new go.PathSegment(go.PathSegment.Line, 0, (1 - param1) * h).close());
      geo.spot1 = go.Spot.TopLeft;
      // ??? geo.spot2 = new go.Spot(1, 1 - param1);
      return geo;
    });

    go.Shape.defineFigureGenerator('Buffer', function (shape, w, h) {
      var geo = new go.Geometry();
      var fig = new go.PathFigure(0, 0, true);
      geo.add(fig);
      fig.add(new go.PathSegment(go.PathSegment.Line, w, .5 * h));
      fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
      geo.spot1 = new go.Spot(0, .25);
      geo.spot2 = new go.Spot(.5, .75);
      return geo;
    });
    }
    
    


}