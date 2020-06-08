
document.addEventListener('DOMContentLoaded', () => {

    var chart = document.getElementById("chart")
        chart.width = 500;
        chart.height = 500;
        ctx = chart.getContext('2d')
        let image = new Image();
        image.src = './photos/charts.png';
        image.onload = function () {
            ctx.clearRect(0, 0, chart.width, chart.height)
            ctx.drawImage(image, 0, 0)
        }
    });
    
    
    
    //https://raw.githubusercontent.com/gliffy/canvas2svg/master/canvas2svg.js
    /*!!
     *  Canvas 2 Svg v1.0.19
     *  A low level canvas to SVG converter. Uses a mock canvas context to build an SVG document.
     *
     *  Licensed under the MIT license:
     *  http://www.opensource.org/licenses/mit-license.php
     *
     *  Author:
     *  Kerry Liu
     *
     *  Copyright (c) 2014 Gliffy Inc.
     */
    
    ;(function () {
        "use strict";
    
        var STYLES, ctx, CanvasGradient, CanvasPattern, namedEntities;
    
        //helper function to format a string
        function format(str, args) {
            var keys = Object.keys(args), i;
            for (i = 0; i < keys.length; i++) {
                str = str.replace(new RegExp("\\{" + keys[i] + "\\}", "gi"), args[keys[i]]);
            }
            return str;
        }
    
        //helper function that generates a random string
        function randomString(holder) {
            var chars, randomstring, i;
            if (!holder) {
                throw new Error("cannot create a random attribute name for an undefined object");
            }
            chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
            randomstring = "";
            do {
                randomstring = "";
                for (i = 0; i < 12; i++) {
                    randomstring += chars[Math.floor(Math.random() * chars.length)];
                }
            } while (holder[randomstring]);
            return randomstring;
        }
    
        //helper function to map named to numbered entities
        function createNamedToNumberedLookup(items, radix) {
            var i, entity, lookup = {}, base10, base16;
            items = items.split(',');
            radix = radix || 10;
            // Map from named to numbered entities.
            for (i = 0; i < items.length; i += 2) {
                entity = '&' + items[i + 1] + ';';
                base10 = parseInt(items[i], radix);
                lookup[entity] = '&#' + base10 + ';';
            }
            //FF and IE need to create a regex from hex values ie &nbsp; == \xa0
            lookup["\\xa0"] = '&#160;';
            return lookup;
        }
    
        //helper function to map canvas-textAlign to svg-textAnchor
        function getTextAnchor(textAlign) {
            //TODO: support rtl languages
            var mapping = {"left": "start", "right": "end", "center": "middle", "start": "start", "end": "end"};
            return mapping[textAlign] || mapping.start;
        }
    
        //helper function to map canvas-textBaseline to svg-dominantBaseline
        function getDominantBaseline(textBaseline) {
            //INFO: not supported in all browsers
            var mapping = {
                "alphabetic": "alphabetic",
                "hanging": "hanging",
                "top": "text-before-edge",
                "bottom": "text-after-edge",
                "middle": "central"
            };
            return mapping[textBaseline] || mapping.alphabetic;
        }
    
        // Unpack entities lookup where the numbers are in radix 32 to reduce the size
        // entity mapping courtesy of tinymce
        namedEntities = createNamedToNumberedLookup(
            '50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,' +
            '5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,' +
            '5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,' +
            '5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,' +
            '68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,' +
            '6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,' +
            '6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,' +
            '75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,' +
            '7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,' +
            '7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,' +
            'sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,' +
            'st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,' +
            't9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,' +
            'tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,' +
            'u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,' +
            '81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,' +
            '8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,' +
            '8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,' +
            '8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,' +
            '8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,' +
            'nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,' +
            'rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,' +
            'Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,' +
            '80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,' +
            '811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro', 32);
    
    
        //Some basic mappings for attributes and default values.
        STYLES = {
            "strokeStyle": {
                svgAttr: "stroke", //corresponding svg attribute
                canvas: "#000000", //canvas default
                svg: "none",       //svg default
                apply: "stroke"    //apply on stroke() or fill()
            },
            "fillStyle": {
                svgAttr: "fill",
                canvas: "#000000",
                svg: null, //svg default is black, but we need to special case this to handle canvas stroke without fill
                apply: "fill"
            },
            "lineCap": {
                svgAttr: "stroke-linecap",
                canvas: "butt",
                svg: "butt",
                apply: "stroke"
            },
            "lineJoin": {
                svgAttr: "stroke-linejoin",
                canvas: "miter",
                svg: "miter",
                apply: "stroke"
            },
            "miterLimit": {
                svgAttr: "stroke-miterlimit",
                canvas: 10,
                svg: 4,
                apply: "stroke"
            },
            "lineWidth": {
                svgAttr: "stroke-width",
                canvas: 1,
                svg: 1,
                apply: "stroke"
            },
            "globalAlpha": {
                svgAttr: "opacity",
                canvas: 1,
                svg: 1,
                apply: "fill stroke"
            },
            "font": {
                //font converts to multiple svg attributes, there is custom logic for this
                canvas: "10px sans-serif"
            },
            "shadowColor": {
                canvas: "#000000"
            },
            "shadowOffsetX": {
                canvas: 0
            },
            "shadowOffsetY": {
                canvas: 0
            },
            "shadowBlur": {
                canvas: 0
            },
            "textAlign": {
                canvas: "start"
            },
            "textBaseline": {
                canvas: "alphabetic"
            },
            "lineDash": {
                svgAttr: "stroke-dasharray",
                canvas: [],
                svg: null,
                apply: "stroke"
            }
        };
    
        /**
         *
         * @param gradientNode - reference to the gradient
         * @constructor
         */
        CanvasGradient = function (gradientNode, ctx) {
            this.__root = gradientNode;
            this.__ctx = ctx;
        };
    
        /**
         * Adds a color stop to the gradient root
         */
        CanvasGradient.prototype.addColorStop = function (offset, color) {
            var stop = this.__ctx.__createElement("stop"), regex, matches;
            stop.setAttribute("offset", offset);
            if (color.indexOf("rgba") !== -1) {
                //separate alpha value, since webkit can't handle it
                regex = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d?\.?\d*)\s*\)/gi;
                matches = regex.exec(color);
                stop.setAttribute("stop-color", format("rgb({r},{g},{b})", {r: matches[1], g: matches[2], b: matches[3]}));
                stop.setAttribute("stop-opacity", matches[4]);
            } else {
                stop.setAttribute("stop-color", color);
            }
            this.__root.appendChild(stop);
        };
    
        CanvasPattern = function (pattern, ctx) {
            this.__root = pattern;
            this.__ctx = ctx;
        };
    
        /**
         * The mock canvas context
         * @param o - options include:
         * ctx - existing Context2D to wrap around
         * width - width of your canvas (defaults to 500)
         * height - height of your canvas (defaults to 500)
         * enableMirroring - enables canvas mirroring (get image data) (defaults to false)
         * document - the document object (defaults to the current document)
         */
        ctx = function (o) {
            var defaultOptions = {width: 500, height: 500, enableMirroring: false}, options;
    
            //keep support for this way of calling C2S: new C2S(width,height)
            if (arguments.length > 1) {
                options = defaultOptions;
                options.width = arguments[0];
                options.height = arguments[1];
            } else if (!o) {
                options = defaultOptions;
            } else {
                options = o;
            }
    
            if (!(this instanceof ctx)) {
                //did someone call this without new?
                return new ctx(options);
            }
    
            //setup options
            this.width = options.width || defaultOptions.width;
            this.height = options.height || defaultOptions.height;
            this.enableMirroring = options.enableMirroring !== undefined ? options.enableMirroring : defaultOptions.enableMirroring;
    
            this.canvas = this;   ///point back to this instance!
            this.__document = options.document || document;
    
            // allow passing in an existing context to wrap around
            // if a context is passed in, we know a canvas already exist
            if (options.ctx) {
                this.__ctx = options.ctx;
            } else {
                this.__canvas = this.__document.createElement("canvas");
                this.__ctx = this.__canvas.getContext("2d");
            }
    
            this.__setDefaultStyles();
            this.__stack = [this.__getStyleState()];
            this.__groupStack = [];
    
            //the root svg element
            this.__root = this.__document.createElementNS("http://www.w3.org/2000/svg", "svg");
            this.__root.setAttribute("version", 1.1);
            this.__root.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            this.__root.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
            this.__root.setAttribute("width", this.width);
            this.__root.setAttribute("height", this.height);
    
            //make sure we don't generate the same ids in defs
            this.__ids = {};
    
            //defs tag
            this.__defs = this.__document.createElementNS("http://www.w3.org/2000/svg", "defs");
            this.__root.appendChild(this.__defs);
    
            //also add a group child. the svg element can't use the transform attribute
            this.__currentElement = this.__document.createElementNS("http://www.w3.org/2000/svg", "g");
            this.__root.appendChild(this.__currentElement);
        };
    
    
        /**
         * Creates the specified svg element
         * @private
         */
        ctx.prototype.__createElement = function (elementName, properties, resetFill) {
            if (typeof properties === "undefined") {
                properties = {};
            }
    
            var element = this.__document.createElementNS("http://www.w3.org/2000/svg", elementName),
                keys = Object.keys(properties), i, key;
            if (resetFill) {
                //if fill or stroke is not specified, the svg element should not display. By default SVG's fill is black.
                element.setAttribute("fill", "none");
                element.setAttribute("stroke", "none");
            }
            for (i = 0; i < keys.length; i++) {
                key = keys[i];
                element.setAttribute(key, properties[key]);
            }
            return element;
        };
    
        /**
         * Applies default canvas styles to the context
         * @private
         */
        ctx.prototype.__setDefaultStyles = function () {
            //default 2d canvas context properties see:http://www.w3.org/TR/2dcontext/
            var keys = Object.keys(STYLES), i, key;
            for (i = 0; i < keys.length; i++) {
                key = keys[i];
                this[key] = STYLES[key].canvas;
            }
        };
    
        /**
         * Applies styles on restore
         * @param styleState
         * @private
         */
        ctx.prototype.__applyStyleState = function (styleState) {
            var keys = Object.keys(styleState), i, key;
            for (i = 0; i < keys.length; i++) {
                key = keys[i];
                this[key] = styleState[key];
            }
        };
    
        /**
         * Gets the current style state
         * @return {Object}
         * @private
         */
        ctx.prototype.__getStyleState = function () {
            var i, styleState = {}, keys = Object.keys(STYLES), key;
            for (i = 0; i < keys.length; i++) {
                key = keys[i];
                styleState[key] = this[key];
            }
            return styleState;
        };
    
        /**
         * Apples the current styles to the current SVG element. On "ctx.fill" or "ctx.stroke"
         * @param type
         * @private
         */
        ctx.prototype.__applyStyleToCurrentElement = function (type) {
            var currentElement = this.__currentElement;
            var currentStyleGroup = this.__currentElementsToStyle;
            if (currentStyleGroup) {
                currentElement.setAttribute(type, "");
                currentElement = currentStyleGroup.element;
                currentStyleGroup.children.forEach(function (node) {
                    node.setAttribute(type, "");
                })
            }
    
            var keys = Object.keys(STYLES), i, style, value, id, regex, matches;
            for (i = 0; i < keys.length; i++) {
                style = STYLES[keys[i]];
                value = this[keys[i]];
                if (style.apply) {
                    //is this a gradient or pattern?
                    if (value instanceof CanvasPattern) {
                        //pattern
                        if (value.__ctx) {
                            //copy over defs
                            while (value.__ctx.__defs.childNodes.length) {
                                id = value.__ctx.__defs.childNodes[0].getAttribute("id");
                                this.__ids[id] = id;
                                this.__defs.appendChild(value.__ctx.__defs.childNodes[0]);
                            }
                        }
                        currentElement.setAttribute(style.apply, format("url(#{id})", {id: value.__root.getAttribute("id")}));
                    } else if (value instanceof CanvasGradient) {
                        //gradient
                        currentElement.setAttribute(style.apply, format("url(#{id})", {id: value.__root.getAttribute("id")}));
                    } else if (style.apply.indexOf(type) !== -1 && style.svg !== value) {
                        if ((style.svgAttr === "stroke" || style.svgAttr === "fill") && value.indexOf("rgba") !== -1) {
                            //separate alpha value, since illustrator can't handle it
                            regex = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d?\.?\d*)\s*\)/gi;
                            matches = regex.exec(value);
                            currentElement.setAttribute(style.svgAttr, format("rgb({r},{g},{b})", {
                                r: matches[1],
                                g: matches[2],
                                b: matches[3]
                            }));
                            //should take globalAlpha here
                            var opacity = matches[4];
                            var globalAlpha = this.globalAlpha;
                            if (globalAlpha != null) {
                                opacity *= globalAlpha;
                            }
                            currentElement.setAttribute(style.svgAttr + "-opacity", opacity);
                        } else {
                            var attr = style.svgAttr;
                            if (keys[i] === 'globalAlpha') {
                                attr = type + '-' + style.svgAttr;
                                if (currentElement.getAttribute(attr)) {
                                    //fill-opacity or stroke-opacity has already been set by stroke or fill.
                                    continue;
                                }
                            }
                            //otherwise only update attribute if right type, and not svg default
                            currentElement.setAttribute(attr, value);
                        }
                    }
                }
            }
        };
    
        /**
         * Will return the closest group or svg node. May return the current element.
         * @private
         */
        ctx.prototype.__closestGroupOrSvg = function (node) {
            node = node || this.__currentElement;
            if (node.nodeName === "g" || node.nodeName === "svg") {
                return node;
            } else {
                return this.__closestGroupOrSvg(node.parentNode);
            }
        };
    
        /**
         * Returns the serialized value of the svg so far
         * @param fixNamedEntities - Standalone SVG doesn't support named entities, which document.createTextNode encodes.
         *                           If true, we attempt to find all named entities and encode it as a numeric entity.
         * @return serialized svg
         */
        ctx.prototype.getSerializedSvg = function (fixNamedEntities) {
            var serialized = new XMLSerializer().serializeToString(this.__root),
                keys, i, key, value, regexp, xmlns;
    
            //IE search for a duplicate xmnls because they didn't implement setAttributeNS correctly
            xmlns = /xmlns="http:\/\/www\.w3\.org\/2000\/svg".+xmlns="http:\/\/www\.w3\.org\/2000\/svg/gi;
            if (xmlns.test(serialized)) {
                serialized = serialized.replace('xmlns="http://www.w3.org/2000/svg', 'xmlns:xlink="http://www.w3.org/1999/xlink');
            }
    
            if (fixNamedEntities) {
                keys = Object.keys(namedEntities);
                //loop over each named entity and replace with the proper equivalent.
                for (i = 0; i < keys.length; i++) {
                    key = keys[i];
                    value = namedEntities[key];
                    regexp = new RegExp(key, "gi");
                    if (regexp.test(serialized)) {
                        serialized = serialized.replace(regexp, value);
                    }
                }
            }
    
            return serialized;
        };
    
    
        /**
         * Returns the root svg
         * @return
         */
        ctx.prototype.getSvg = function () {
            return this.__root;
        };
        /**
         * Will generate a group tag.
         */
        ctx.prototype.save = function () {
            var group = this.__createElement("g");
            var parent = this.__closestGroupOrSvg();
            this.__groupStack.push(parent);
            parent.appendChild(group);
            this.__currentElement = group;
            this.__stack.push(this.__getStyleState());
        };
        /**
         * Sets current element to parent, or just root if already root
         */
        ctx.prototype.restore = function () {
            this.__currentElement = this.__groupStack.pop();
            this.__currentElementsToStyle = null;
            //Clearing canvas will make the poped group invalid, currentElement is set to the root group node.
            if (!this.__currentElement) {
                this.__currentElement = this.__root.childNodes[1];
            }
            var state = this.__stack.pop();
            this.__applyStyleState(state);
        };
    
        /**
         * Helper method to add transform
         * @private
         */
        ctx.prototype.__addTransform = function (t) {
            //if the current element has siblings, add another group
            var parent = this.__closestGroupOrSvg();
            if (parent.childNodes.length > 0) {
                if (this.__currentElement.nodeName === "path") {
                    if (!this.__currentElementsToStyle) this.__currentElementsToStyle = {element: parent, children: []};
                    this.__currentElementsToStyle.children.push(this.__currentElement)
                    this.__applyCurrentDefaultPath();
                }
    
                var group = this.__createElement("g");
                parent.appendChild(group);
                this.__currentElement = group;
            }
    
            var transform = this.__currentElement.getAttribute("transform");
            if (transform) {
                transform += " ";
            } else {
                transform = "";
            }
            transform += t;
            this.__currentElement.setAttribute("transform", transform);
        };
    
        /**
         *  scales the current element
         */
        ctx.prototype.scale = function (x, y) {
            if (y === undefined) {
                y = x;
            }
            this.__addTransform(format("scale({x},{y})", {x: x, y: y}));
        };
    
        /**
         * rotates the current element
         */
        ctx.prototype.rotate = function (angle) {
            var degrees = (angle * 180 / Math.PI);
            this.__addTransform(format("rotate({angle},{cx},{cy})", {angle: degrees, cx: 0, cy: 0}));
        };
    
        /**
         * translates the current element
         */
        ctx.prototype.translate = function (x, y) {
            this.__addTransform(format("translate({x},{y})", {x: x, y: y}));
        };
    
        /**
         * applies a transform to the current element
         */
        ctx.prototype.transform = function (a, b, c, d, e, f) {
            this.__addTransform(format("matrix({a},{b},{c},{d},{e},{f})", {a: a, b: b, c: c, d: d, e: e, f: f}));
        };
    
        /**
         * Create a new Path Element
         */
        ctx.prototype.beginPath = function () {
            var path, parent;
    
            // Note that there is only one current default path, it is not part of the drawing state.
            // See also: https://html.spec.whatwg.org/multipage/scripting.html#current-default-path
            this.__currentDefaultPath = "";
            this.__currentPosition = {};
    
            path = this.__createElement("path", {}, true);
            parent = this.__closestGroupOrSvg();
            parent.appendChild(path);
            this.__currentElement = path;
        };
    
        /**
         * Helper function to apply currentDefaultPath to current path element
         * @private
         */
        ctx.prototype.__applyCurrentDefaultPath = function () {
            var currentElement = this.__currentElement;
            if (currentElement.nodeName === "path") {
                currentElement.setAttribute("d", this.__currentDefaultPath);
            } else {
                console.error("Attempted to apply path command to node", currentElement.nodeName);
            }
        };
    
        /**
         * Helper function to add path command
         * @private
         */
        ctx.prototype.__addPathCommand = function (command) {
            this.__currentDefaultPath += " ";
            this.__currentDefaultPath += command;
        };
    
        /**
         * Adds the move command to the current path element,
         * if the currentPathElement is not empty create a new path element
         */
        ctx.prototype.moveTo = function (x, y) {
            if (this.__currentElement.nodeName !== "path") {
                this.beginPath();
            }
    
            // creates a new subpath with the given point
            this.__currentPosition = {x: x, y: y};
            this.__addPathCommand(format("M {x} {y}", {x: x, y: y}));
        };
    
        /**
         * Closes the current path
         */
        ctx.prototype.closePath = function () {
            if (this.__currentDefaultPath) {
                this.__addPathCommand("Z");
            }
        };
    
        /**
         * Adds a line to command
         */
        ctx.prototype.lineTo = function (x, y) {
            this.__currentPosition = {x: x, y: y};
            if (this.__currentDefaultPath.indexOf('M') > -1) {
                this.__addPathCommand(format("L {x} {y}", {x: x, y: y}));
            } else {
                this.__addPathCommand(format("M {x} {y}", {x: x, y: y}));
            }
        };
    
        /**
         * Add a bezier command
         */
        ctx.prototype.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
            this.__currentPosition = {x: x, y: y};
            this.__addPathCommand(format("C {cp1x} {cp1y} {cp2x} {cp2y} {x} {y}",
                {cp1x: cp1x, cp1y: cp1y, cp2x: cp2x, cp2y: cp2y, x: x, y: y}));
        };
    
        /**
         * Adds a quadratic curve to command
         */
        ctx.prototype.quadraticCurveTo = function (cpx, cpy, x, y) {
            this.__currentPosition = {x: x, y: y};
            this.__addPathCommand(format("Q {cpx} {cpy} {x} {y}", {cpx: cpx, cpy: cpy, x: x, y: y}));
        };
    
    
        /**
         * Return a new normalized vector of given vector
         */
        var normalize = function (vector) {
            var len = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
            return [vector[0] / len, vector[1] / len];
        };
    
        /**
         * Adds the arcTo to the current path
         *
         * @see http://www.w3.org/TR/2015/WD-2dcontext-20150514/#dom-context-2d-arcto
         */
        ctx.prototype.arcTo = function (x1, y1, x2, y2, radius) {
            // Let the point (x0, y0) be the last point in the subpath.
            var x0 = this.__currentPosition && this.__currentPosition.x;
            var y0 = this.__currentPosition && this.__currentPosition.y;
    
            // First ensure there is a subpath for (x1, y1).
            if (typeof x0 == "undefined" || typeof y0 == "undefined") {
                return;
            }
    
            // Negative values for radius must cause the implementation to throw an IndexSizeError exception.
            if (radius < 0) {
                throw new Error("IndexSizeError: The radius provided (" + radius + ") is negative.");
            }
    
            // If the point (x0, y0) is equal to the point (x1, y1),
            // or if the point (x1, y1) is equal to the point (x2, y2),
            // or if the radius radius is zero,
            // then the method must add the point (x1, y1) to the subpath,
            // and connect that point to the previous point (x0, y0) by a straight line.
            if (((x0 === x1) && (y0 === y1))
                || ((x1 === x2) && (y1 === y2))
                || (radius === 0)) {
                this.lineTo(x1, y1);
                return;
            }
    
            // Otherwise, if the points (x0, y0), (x1, y1), and (x2, y2) all lie on a single straight line,
            // then the method must add the point (x1, y1) to the subpath,
            // and connect that point to the previous point (x0, y0) by a straight line.
            var unit_vec_p1_p0 = normalize([x0 - x1, y0 - y1]);
            var unit_vec_p1_p2 = normalize([x2 - x1, y2 - y1]);
            if (unit_vec_p1_p0[0] * unit_vec_p1_p2[1] === unit_vec_p1_p0[1] * unit_vec_p1_p2[0]) {
                this.lineTo(x1, y1);
                return;
            }
    
            // Otherwise, let The Arc be the shortest arc given by circumference of the circle that has radius radius,
            // and that has one point tangent to the half-infinite line that crosses the point (x0, y0) and ends at the point (x1, y1),
            // and that has a different point tangent to the half-infinite line that ends at the point (x1, y1), and crosses the point (x2, y2).
            // The points at which this circle touches these two lines are called the start and end tangent points respectively.
    
            // note that both vectors are unit vectors, so the length is 1
            var cos = (unit_vec_p1_p0[0] * unit_vec_p1_p2[0] + unit_vec_p1_p0[1] * unit_vec_p1_p2[1]);
            var theta = Math.acos(Math.abs(cos));
    
            // Calculate origin
            var unit_vec_p1_origin = normalize([
                unit_vec_p1_p0[0] + unit_vec_p1_p2[0],
                unit_vec_p1_p0[1] + unit_vec_p1_p2[1]
            ]);
            var len_p1_origin = radius / Math.sin(theta / 2);
            var x = x1 + len_p1_origin * unit_vec_p1_origin[0];
            var y = y1 + len_p1_origin * unit_vec_p1_origin[1];
    
            // Calculate start angle and end angle
            // rotate 90deg clockwise (note that y axis points to its down)
            var unit_vec_origin_start_tangent = [
                -unit_vec_p1_p0[1],
                unit_vec_p1_p0[0]
            ];
            // rotate 90deg counter clockwise (note that y axis points to its down)
            var unit_vec_origin_end_tangent = [
                unit_vec_p1_p2[1],
                -unit_vec_p1_p2[0]
            ];
            var getAngle = function (vector) {
                // get angle (clockwise) between vector and (1, 0)
                var x = vector[0];
                var y = vector[1];
                if (y >= 0) { // note that y axis points to its down
                    return Math.acos(x);
                } else {
                    return -Math.acos(x);
                }
            };
            var startAngle = getAngle(unit_vec_origin_start_tangent);
            var endAngle = getAngle(unit_vec_origin_end_tangent);
    
            // Connect the point (x0, y0) to the start tangent point by a straight line
            this.lineTo(x + unit_vec_origin_start_tangent[0] * radius,
                y + unit_vec_origin_start_tangent[1] * radius);
    
            // Connect the start tangent point to the end tangent point by arc
            // and adding the end tangent point to the subpath.
            this.arc(x, y, radius, startAngle, endAngle);
        };
    
        /**
         * Sets the stroke property on the current element
         */
        ctx.prototype.stroke = function () {
            if (this.__currentElement.nodeName === "path") {
                this.__currentElement.setAttribute("paint-order", "fill stroke markers");
            }
            this.__applyCurrentDefaultPath();
            this.__applyStyleToCurrentElement("stroke");
        };
    
        /**
         * Sets fill properties on the current element
         */
        ctx.prototype.fill = function () {
            if (this.__currentElement.nodeName === "path") {
                this.__currentElement.setAttribute("paint-order", "stroke fill markers");
            }
            this.__applyCurrentDefaultPath();
            this.__applyStyleToCurrentElement("fill");
        };
    
        /**
         *  Adds a rectangle to the path.
         */
        ctx.prototype.rect = function (x, y, width, height) {
            if (this.__currentElement.nodeName !== "path") {
                this.beginPath();
            }
            this.moveTo(x, y);
            this.lineTo(x + width, y);
            this.lineTo(x + width, y + height);
            this.lineTo(x, y + height);
            this.lineTo(x, y);
            this.closePath();
        };
    
    
        /**
         * adds a rectangle element
         */
        ctx.prototype.fillRect = function (x, y, width, height) {
            var rect, parent;
            rect = this.__createElement("rect", {
                x: x,
                y: y,
                width: width,
                height: height
            }, true);
            parent = this.__closestGroupOrSvg();
            parent.appendChild(rect);
            this.__currentElement = rect;
            this.__applyStyleToCurrentElement("fill");
        };
    
        /**
         * Draws a rectangle with no fill
         * @param x
         * @param y
         * @param width
         * @param height
         */
        ctx.prototype.strokeRect = function (x, y, width, height) {
            var rect, parent;
            rect = this.__createElement("rect", {
                x: x,
                y: y,
                width: width,
                height: height
            }, true);
            parent = this.__closestGroupOrSvg();
            parent.appendChild(rect);
            this.__currentElement = rect;
            this.__applyStyleToCurrentElement("stroke");
        };
    
    
        /**
         * Clear entire canvas:
         * 1. save current transforms
         * 2. remove all the childNodes of the root g element
         */
        ctx.prototype.__clearCanvas = function () {
            var current = this.__closestGroupOrSvg(),
                transform = current.getAttribute("transform");
            var rootGroup = this.__root.childNodes[1];
            var childNodes = rootGroup.childNodes;
            for (var i = childNodes.length - 1; i >= 0; i--) {
                if (childNodes[i]) {
                    rootGroup.removeChild(childNodes[i]);
                }
            }
            this.__currentElement = rootGroup;
            //reset __groupStack as all the child group nodes are all removed.
            this.__groupStack = [];
            if (transform) {
                this.__addTransform(transform);
            }
        };
    
        /**
         * "Clears" a canvas by just drawing a white rectangle in the current group.
         */
        ctx.prototype.clearRect = function (x, y, width, height) {
            //clear entire canvas
            if (x === 0 && y === 0 && width === this.width && height === this.height) {
                this.__clearCanvas();
                return;
            }
            var rect, parent = this.__closestGroupOrSvg();
            rect = this.__createElement("rect", {
                x: x,
                y: y,
                width: width,
                height: height,
                fill: "#FFFFFF"
            }, true);
            parent.appendChild(rect);
        };
    
        /**
         * Adds a linear gradient to a defs tag.
         * Returns a canvas gradient object that has a reference to it's parent def
         */
        ctx.prototype.createLinearGradient = function (x1, y1, x2, y2) {
            var grad = this.__createElement("linearGradient", {
                id: randomString(this.__ids),
                x1: x1 + "px",
                x2: x2 + "px",
                y1: y1 + "px",
                y2: y2 + "px",
                "gradientUnits": "userSpaceOnUse"
            }, false);
            this.__defs.appendChild(grad);
            return new CanvasGradient(grad, this);
        };
    
        /**
         * Adds a radial gradient to a defs tag.
         * Returns a canvas gradient object that has a reference to it's parent def
         */
        ctx.prototype.createRadialGradient = function (x0, y0, r0, x1, y1, r1) {
            var grad = this.__createElement("radialGradient", {
                id: randomString(this.__ids),
                cx: x1 + "px",
                cy: y1 + "px",
                r: r1 + "px",
                fx: x0 + "px",
                fy: y0 + "px",
                "gradientUnits": "userSpaceOnUse"
            }, false);
            this.__defs.appendChild(grad);
            return new CanvasGradient(grad, this);
    
        };
    
        /**
         * Parses the font string and returns svg mapping
         * @private
         */
        ctx.prototype.__parseFont = function () {
            var regex = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-,\'\"\sa-z0-9]+?)\s*$/i;
            var fontPart = regex.exec(this.font);
            var data = {
                style: fontPart[1] || 'normal',
                size: fontPart[4] || '10px',
                family: fontPart[6] || 'sans-serif',
                weight: fontPart[3] || 'normal',
                decoration: fontPart[2] || 'normal',
                href: null
            };
    
            //canvas doesn't support underline natively, but we can pass this attribute
            if (this.__fontUnderline === "underline") {
                data.decoration = "underline";
            }
    
            //canvas also doesn't support linking, but we can pass this as well
            if (this.__fontHref) {
                data.href = this.__fontHref;
            }
    
            return data;
        };
    
        /**
         * Helper to link text fragments
         * @param font
         * @param element
         * @return {*}
         * @private
         */
        ctx.prototype.__wrapTextLink = function (font, element) {
            if (font.href) {
                var a = this.__createElement("a");
                a.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", font.href);
                a.appendChild(element);
                return a;
            }
            return element;
        };
    
        /**
         * Fills or strokes text
         * @param text
         * @param x
         * @param y
         * @param action - stroke or fill
         * @private
         */
        ctx.prototype.__applyText = function (text, x, y, action) {
            var font = this.__parseFont(),
                parent = this.__closestGroupOrSvg(),
                textElement = this.__createElement("text", {
                    "font-family": font.family,
                    "font-size": font.size,
                    "font-style": font.style,
                    "font-weight": font.weight,
                    "text-decoration": font.decoration,
                    "x": x,
                    "y": y,
                    "text-anchor": getTextAnchor(this.textAlign),
                    "dominant-baseline": getDominantBaseline(this.textBaseline)
                }, true);
    
            textElement.appendChild(this.__document.createTextNode(text));
            this.__currentElement = textElement;
            this.__applyStyleToCurrentElement(action);
            parent.appendChild(this.__wrapTextLink(font, textElement));
        };
    
        /**
         * Creates a text element
         * @param text
         * @param x
         * @param y
         */
        ctx.prototype.fillText = function (text, x, y) {
            this.__applyText(text, x, y, "fill");
        };
    
        /**
         * Strokes text
         * @param text
         * @param x
         * @param y
         */
        ctx.prototype.strokeText = function (text, x, y) {
            this.__applyText(text, x, y, "stroke");
        };
    
        /**
         * No need to implement this for svg.
         * @param text
         * @return {TextMetrics}
         */
        ctx.prototype.measureText = function (text) {
            this.__ctx.font = this.font;
            return this.__ctx.measureText(text);
        };
    
        /**
         *  Arc command!
         */
        ctx.prototype.arc = function (x, y, radius, startAngle, endAngle, counterClockwise) {
            // in canvas no circle is drawn if no angle is provided.
            if (startAngle === endAngle) {
                return;
            }
            startAngle = startAngle % (2 * Math.PI);
            endAngle = endAngle % (2 * Math.PI);
            if (startAngle === endAngle) {
                //circle time! subtract some of the angle so svg is happy (svg elliptical arc can't draw a full circle)
                endAngle = ((endAngle + (2 * Math.PI)) - 0.001 * (counterClockwise ? -1 : 1)) % (2 * Math.PI);
            }
            var endX = x + radius * Math.cos(endAngle),
                endY = y + radius * Math.sin(endAngle),
                startX = x + radius * Math.cos(startAngle),
                startY = y + radius * Math.sin(startAngle),
                sweepFlag = counterClockwise ? 0 : 1,
                largeArcFlag = 0,
                diff = endAngle - startAngle;
    
            // https://github.com/gliffy/canvas2svg/issues/4
            if (diff < 0) {
                diff += 2 * Math.PI;
            }
    
            if (counterClockwise) {
                largeArcFlag = diff > Math.PI ? 0 : 1;
            } else {
                largeArcFlag = diff > Math.PI ? 1 : 0;
            }
    
            this.lineTo(startX, startY);
            this.__addPathCommand(format("A {rx} {ry} {xAxisRotation} {largeArcFlag} {sweepFlag} {endX} {endY}",
                {
                    rx: radius,
                    ry: radius,
                    xAxisRotation: 0,
                    largeArcFlag: largeArcFlag,
                    sweepFlag: sweepFlag,
                    endX: endX,
                    endY: endY
                }));
    
            this.__currentPosition = {x: endX, y: endY};
        };
    
        /**
         * Generates a ClipPath from the clip command.
         */
        ctx.prototype.clip = function () {
            var group = this.__closestGroupOrSvg(),
                clipPath = this.__createElement("clipPath"),
                id = randomString(this.__ids),
                newGroup = this.__createElement("g");
    
            this.__applyCurrentDefaultPath();
            group.removeChild(this.__currentElement);
            clipPath.setAttribute("id", id);
            clipPath.appendChild(this.__currentElement);
    
            this.__defs.appendChild(clipPath);
    
            //set the clip path to this group
            group.setAttribute("clip-path", format("url(#{id})", {id: id}));
    
            //clip paths can be scaled and transformed, we need to add another wrapper group to avoid later transformations
            // to this path
            group.appendChild(newGroup);
    
            this.__currentElement = newGroup;
    
        };
    
        /**
         * Draws a canvas, image or mock context to this canvas.
         * Note that all svg dom manipulation uses node.childNodes rather than node.children for IE support.
         * http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#dom-context-2d-drawimage
         */
        ctx.prototype.drawImage = function () {
            //convert arguments to a real array
            var args = Array.prototype.slice.call(arguments),
                image = args[0],
                dx, dy, dw, dh, sx = 0, sy = 0, sw, sh, parent, svg, defs, group,
                currentElement, svgImage, canvas, context, id;
    
            if (args.length === 3) {
                dx = args[1];
                dy = args[2];
                sw = image.width;
                sh = image.height;
                dw = sw;
                dh = sh;
            } else if (args.length === 5) {
                dx = args[1];
                dy = args[2];
                dw = args[3];
                dh = args[4];
                sw = image.width;
                sh = image.height;
            } else if (args.length === 9) {
                sx = args[1];
                sy = args[2];
                sw = args[3];
                sh = args[4];
                dx = args[5];
                dy = args[6];
                dw = args[7];
                dh = args[8];
            } else {
                throw new Error("Invalid number of arguments passed to drawImage: " + arguments.length);
            }
    
            parent = this.__closestGroupOrSvg();
            currentElement = this.__currentElement;
            var translateDirective = "translate(" + dx + ", " + dy + ")";
            if (image instanceof ctx) {
                //canvas2svg mock canvas context. In the future we may want to clone nodes instead.
                //also I'm currently ignoring dw, dh, sw, sh, sx, sy for a mock context.
                svg = image.getSvg().cloneNode(true);
                if (svg.childNodes && svg.childNodes.length > 1) {
                    defs = svg.childNodes[0];
                    while (defs.childNodes.length) {
                        id = defs.childNodes[0].getAttribute("id");
                        this.__ids[id] = id;
                        this.__defs.appendChild(defs.childNodes[0]);
                    }
                    group = svg.childNodes[1];
                    if (group) {
                        //save original transform
                        var originTransform = group.getAttribute("transform");
                        var transformDirective;
                        if (originTransform) {
                            transformDirective = originTransform + " " + translateDirective;
                        } else {
                            transformDirective = translateDirective;
                        }
                        group.setAttribute("transform", transformDirective);
                        parent.appendChild(group);
                    }
                }
            } else if (image.nodeName === "CANVAS" || image.nodeName === "IMG") {
                //canvas or image
                svgImage = this.__createElement("image");
                svgImage.setAttribute("width", dw);
                svgImage.setAttribute("height", dh);
                svgImage.setAttribute("preserveAspectRatio", "none");
    
                if (sx || sy || sw !== image.width || sh !== image.height) {
                    //crop the image using a temporary canvas
                    canvas = this.__document.createElement("canvas");
                    canvas.width = dw;
                    canvas.height = dh;
                    context = canvas.getContext("2d");
                    context.drawImage(image, sx, sy, sw, sh, 0, 0, dw, dh);
                    image = canvas;
                }
                svgImage.setAttribute("transform", translateDirective);
                svgImage.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
                    image.nodeName === "CANVAS" ? image.toDataURL() : image.getAttribute("src"));
                parent.appendChild(svgImage);
            }
        };
    
        /**
         * Generates a pattern tag
         */
        ctx.prototype.createPattern = function (image, repetition) {
            var pattern = this.__document.createElementNS("http://www.w3.org/2000/svg", "pattern"),
                id = randomString(this.__ids),
                img;
            pattern.setAttribute("id", id);
            pattern.setAttribute("width", image.width);
            pattern.setAttribute("height", image.height);
            if (image.nodeName === "CANVAS" || image.nodeName === "IMG") {
                img = this.__document.createElementNS("http://www.w3.org/2000/svg", "image");
                img.setAttribute("width", image.width);
                img.setAttribute("height", image.height);
                img.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
                    image.nodeName === "CANVAS" ? image.toDataURL() : image.getAttribute("src"));
                pattern.appendChild(img);
                this.__defs.appendChild(pattern);
            } else if (image instanceof ctx) {
                pattern.appendChild(image.__root.childNodes[1]);
                this.__defs.appendChild(pattern);
            }
            return new CanvasPattern(pattern, this);
        };
    
        ctx.prototype.setLineDash = function (dashArray) {
            if (dashArray && dashArray.length > 0) {
                this.lineDash = dashArray.join(",");
            } else {
                this.lineDash = null;
            }
        };
    
        /**
         * Not yet implemented
         */
        ctx.prototype.drawFocusRing = function () {
        };
        ctx.prototype.createImageData = function () {
        };
        ctx.prototype.getImageData = function () {
        };
        ctx.prototype.putImageData = function () {
        };
        ctx.prototype.globalCompositeOperation = function () {
        };
        ctx.prototype.setTransform = function () {
        };
    
        //add options for alternative namespace
        if (typeof window === "object") {
            window.C2S = ctx;
        }
    
        // CommonJS/Browserify
        if (typeof module === "object" && typeof module.exports === "object") {
            module.exports = ctx;
        }
    
    }());
    
    
    var obj = {
        svgFile: '',
        getSvgFile: function () {
            return this.svgFile;
        },
        setSvgFile: function (val) {
            this.svgFile = val;
        }
    }
    
    
    function gifLoader() {
        var chart = document.getElementById("chart")
        chart.width = 500;
        chart.height = 500;
        ctx = chart.getContext('2d')
        let image = new Image();
        image.src = './photos/d.gif';
        image.onload = function () {
            ctx.clearRect(0, 0, chart.width, chart.height)
            ctx.drawImage(image, 0, 0)
    
        }
    }
    
    function downloadCSV() {
        var csvFile = "an,numar de masini" + "\n"
        var cinci = document.getElementById("cinci").innerHTML
        csvFile = csvFile + cinci.replace(":", ",") + "\n"
        var sase = document.getElementById("sase").innerHTML
        csvFile = csvFile + sase.replace(":", ",") + "\n"
        var sapte = document.getElementById("sapte").innerHTML
        csvFile = csvFile + sapte.replace(":", ",") + "\n"
        var opt = document.getElementById("opt").innerHTML
        csvFile = csvFile + opt.replace(":", ",") + "\n"
        var noua = document.getElementById("noua").innerHTML
        csvFile = csvFile + noua.replace(":", ",") + "\n"
        var blob = new Blob([csvFile], {type: 'text/csv;charset=utf-8;'});
    
        const a = document.createElement("a")
        document.body.appendChild(a)
        a.href = URL.createObjectURL(blob)
        a.download = "chart.csv"
        a.click();
        document.body.removeChild(a)
    
    }
    
    
    function downloadSVG() {
    
    
        var blob = new Blob([obj.getSvgFile()], {type: 'text/svg;charset=utf-8;'});
    
        const a = document.createElement("a")
        document.body.appendChild(a)
        a.href = URL.createObjectURL(blob)
        a.download = "chart.svg"
        a.click();
        document.body.removeChild(a)
    
    
    }
    
    
    //https://www.youtube.com/watch?v=YoVJWZrS2WU
    function downloadWEBP() {
        console.log("webp")
        var canvas = document.getElementById("chart")
        const a = document.createElement("a")
        document.body.appendChild(a)
        a.href = canvas.toDataURL("image/webp")
        a.download = "chart.webp"
        a.click();
        document.body.removeChild(a)
    }
    
    
    function setLegend(n15, n16, n17, n18, n19) {
        console.log("legenda")
        var cinci = document.getElementById("cinci")
        cinci.innerHTML = "2015 : " + n15;
        var sase = document.getElementById("sase")
        sase.innerHTML = "2016 : " + n16;
        var sapte = document.getElementById("sapte")
        sapte.innerHTML = "2017 : " + n17;
        var opt = document.getElementById("opt")
        opt.innerHTML = "2018 : " + n18;
        var noua = document.getElementById("noua")
        noua.innerHTML = "2019 : " + n19;
    }
    
    
    function prepareInfo(info, tip) {
        info = JSON.parse(info)
        var q2015 = info.an2015;
        var q2016 = info.an2016;
        var q2017 = info.an2017;
        var q2018 = info.an2018;
        var q2019 = info.an2019;
    
        setLegend(q2015, q2016, q2017, q2018, q2019)
        while (q2015 > 400 && q2016 > 400 && q2017 > 400 && q2018 > 400 && q2019 > 400) {
            q2015 = q2015 / 10;
            q2016 = q2016 / 10;
            q2017 = q2017 / 10;
            q2018 = q2018 / 10;
            q2019 = q2019 / 10;
    
        }
        if (tip == "line") {
            info = "[{\"x\": 100, \"y\": " + q2015 +
                "}, { \"x\": 200, \"y\": " + q2016 +
                "}, { \"x\": 300, \"y\": " + q2017 +
                "}, { \"x\": 400, \"y\": " + q2018 +
                "}, { \"x\": 500, \"y\": " + q2019 + " }] "
        } else {
    
            info = "{ \"2015\" : " + q2015 +
                ",  \"2016\" : " + q2016 +
                ",  \"2017\" : " + q2017 +
                ",  \"2018\" : " + q2018 +
                ",  \"2019\" : " + q2019 + "}"
        }
        info = JSON.parse(info)
        console.log(info)
        return info;
    }
    
    function noData() {
        console.log("no data")
        var svg = "<svg width=\"500\" height=\"400\" xmlns=\"http://www.w3.org/2000/svg\">" +
            "<g>" +
            "<title>background</title>" +
            "<rect fill=\"#23a3a3\" id=\"canvas_background\" height=\"402\" width=\"502\" y=\"-1\" x=\"-1\"/>" +
            "<g display=\"none\" overflow=\"visible\" y=\"0\" x=\"0\" height=\"100%\" width=\"100%\" id=\"canvasGrid\">" +
            "<rect fill=\"url(#gridpattern)\" stroke-width=\"0\" y=\"0\" x=\"0\" height=\"100%\" width=\"100%\"/>" +
            "</g>" +
            "</g>" +
            "<g>" +
            "<title>Layer 1</title>" +
            "<text xml:space=\"preserve\" text-anchor=\"start\" font-family=\"Helvetica, Arial, sans-serif\" font-size=\"24\" id=\"svg_4\" y=\"165.453125\" x=\"45.5\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"0\" stroke=\"#000\" fill=\"#000000\">Ne pare rau,nu au fost gasite rezultate</text>" +
            "<text xml:space=\"preserve\" text-anchor=\"start\" font-family=\"Helvetica, Arial, sans-serif\" font-size=\"24\" id=\"svg_7\" y=\"199.453125\" x=\"66.5\" fill-opacity=\"null\" stroke-opacity=\"null\" stroke-width=\"0\" stroke=\"#000\" fill=\"#000000\">conform cautarilor dumneavoastra.</text>" +
            "</g>" +
            "</svg>";
        obj.setSvgFile(svg);
        reprezinta = document.getElementById("reprezinta")
        reprezinta.innerHTML = "Ne pare rau,nu au fost gasite rezultate conform cautarilor dumneavoastra."
        document.getElementById("cinci").innerText = "2015 : 0"
        document.getElementById("sase").innerText = "2016 : 0"
        document.getElementById("sapte").innerText = "2017 : 0"
        document.getElementById("opt").innerText = "2018 : 0"
        document.getElementById("noua").innerText = "2019 : 0"
        var chart = document.getElementById("chart")
        chart.width = 500;
        chart.height = 500;
        ctx = chart.getContext('2d')
    
        let image = new Image();
        image.src = './photos/sad.jpg';
        image.onload = function () {
            ctx.clearRect(0, 0, chart.width, chart.height)
            ctx.drawImage(image, 0, 0)
        }
    
    
    }
    
    function descriereChart(judet, marca, categorie, descriere) {
        var reprezinta = document.getElementById("reprezinta");
        var descrie = "Evoluția numărului de mașini";
        if (judet)
            descrie = descrie + " din județul " + judet;
        if (marca)
            descrie = descrie + " marca " + marca;
        if (categorie)
            descrie = descrie + " din categoria națională " + categorie;
        if (descriere)
            descrie = descrie + " cu descrierea comercială " + descriere;
        descrie = descrie + " din parcul auto din România în ultimii 5 ani."
        reprezinta.innerHTML = descrie;
    
    }
    
    function lineChartGet() {
        gifLoader();
        var tip = "line";
        var judet = document.getElementById("judet").value;
        var marca = document.getElementById("marca").value;
        var categorie = document.getElementById("categorie").value;
        var descriere = document.getElementById("descriere").value;
        if (window.XMLHttpRequest) {
    
            var xmlHttp = new XMLHttpRequest();
            var theUrl = "/statistici/?tip=" + tip + "&judet=" + judet + "&marca=" + marca + "&categorie=" + categorie + "&descriere=" + descriere;
            xmlHttp.open("GET", theUrl, true);
            xmlHttp.send();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
    
                    info = this.responseText
                    console.log("inf" + info);
                    info = prepareInfo(info, tip)
                    var chart = document.getElementById("chart")
                    var ctx = chart.getContext("2d")
                    lineChart(info, ctx, chart)
                    descriereChart(judet, marca, categorie, descriere);
    
                    let svgChart = document.createElement("canvas")
                    ctx = new C2S(500, 500);
                    document.body.appendChild(svgChart)
                    lineChart(info, ctx, svgChart)
                    obj.setSvgFile(ctx.getSerializedSvg(true));
                    console.log("svgfile" + this.svgFile)
                    document.body.removeChild(svgChart)
    
                }
    
    
                if ((xmlHttp.readyState == 4 && xmlHttp.status == 204)) {
                    noData();
    
                }
    
            }
        }
    }
    
    
    function barChartGet() {
        gifLoader();
        var tip = "bar";
        var judet = document.getElementById("judet").value;
        var marca = document.getElementById("marca").value;
        var categorie = document.getElementById("categorie").value;
        var descriere = document.getElementById("descriere").value;
        if (window.XMLHttpRequest) {
            var xmlHttp = new XMLHttpRequest();
            var theUrl = "/statistici/?tip=" + tip + "&judet=" + judet + "&marca=" + marca + "&categorie=" + categorie + "&descriere=" + descriere;
            xmlHttp.open("GET", theUrl, true);
            xmlHttp.send();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    info = this.responseText
                    console.log("inf" + info);
    
                    info = prepareInfo(info, tip)
                    var chart = document.getElementById("chart")
                    var ctx = chart.getContext("2d")
                    barChart(info, ctx, chart)
                    descriereChart(judet, marca, categorie, descriere);
                    let svgChart = document.createElement("canvas")
                    ctx = new C2S(500, 500);
                    document.body.appendChild(svgChart)
                    barChart(info, ctx, svgChart)
                    obj.setSvgFile(ctx.getSerializedSvg(true));
                    console.log("svgfile" + this.svgFile)
                    document.body.removeChild(svgChart)
                }
                if ((xmlHttp.readyState == 4 && xmlHttp.status == 204)) {
                    noData();
                }
            }
        }
    }
    
    
    function pieChartGet() {
        gifLoader();
        var tip = "pie";
        var judet = document.getElementById("judet").value;
        var marca = document.getElementById("marca").value;
        var categorie = document.getElementById("categorie").value;
        var descriere = document.getElementById("descriere").value;
        if (window.XMLHttpRequest) {
            var xmlHttp = new XMLHttpRequest();
            var theUrl = "/statistici/?tip=" + tip + "&judet=" + judet + "&marca=" + marca + "&categorie=" + categorie + "&descriere=" + descriere;
            xmlHttp.open("GET", theUrl, true);
            xmlHttp.send();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    info = this.responseText
                    console.log("inf" + info);
                    info = prepareInfo(info, tip)
                    let chart = document.getElementById("chart")
                    let ctx = chart.getContext("2d")
                    pieChart(info, ctx, chart)
                    descriereChart(judet, marca, categorie, descriere);
    
                    let svgChart = document.createElement("canvas")
                    ctx = new C2S(500, 500);
                    document.body.appendChild(svgChart)
                    pieChart(info, ctx, svgChart)
                    obj.setSvgFile(ctx.getSerializedSvg(true));
                    console.log("svgfile" + this.svgFile)
                    document.body.removeChild(svgChart)
    
                }
                if ((xmlHttp.readyState == 4 && xmlHttp.status == 204)) {
                    noData();
                }
            }
        }
    }
    
    document.addEventListener('DOMContentLoaded', () => {
    
        const themeStylesheet = document.getElementById('theme');
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            themeStylesheet.href = storedTheme;
        }
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => {
    
            if (themeStylesheet.href.includes('light')) {
                themeStylesheet.href = './css/dark.css';
            } else {
    
                themeStylesheet.href = './css/light.css';
            }
            localStorage.setItem('theme', themeStylesheet.href)
        })
    })
    
    
    //inspiratie:https://codeburst.io/creating-and-drawing-on-an-html5-canvas-using-javascript-93da75f001c1
    
    function createGrid(canvas, ctx) {
        const step = 50
        const stepX = 100
        const width = canvas.width
        const height = canvas.height
        ctx.save()
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'gray'
        ctx.fillStyle = 'black'
        ctx.font = '14px Monospace'
        ctx.lineWidth = 0.35
        var an = 2015
        for (let x = 0; x < height; x += stepX) {
            ctx.beginPath()
            ctx.moveTo(x, 0)
            ctx.lineTo(x, height)
            ctx.stroke()
            if (x > 0) {
                ctx.fillText(an, x - 30, height - 3)
                an = an + 1
            }
        }
        ctx.fillText(an, height - 30, height - 3)
        for (let y = 0; y < height; y += step) {
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(width, y)
            ctx.stroke()
        }
        ctx.restore()
    }
    
    function lineChart(coordonate, ctx, canvas) {
        canvas.width = 500;
        canvas.height = 500;
        colors = [{color: "#F1C40F"}, {color: "#a55ca5"}, {color: "#bccd7a"}, {color: "#eb9743"}, {color: "#67b6c7"}]
        createGrid(canvas, ctx)
        for (var i = 0; i < coordonate.length - 1; i++) {
            var obj = coordonate[i];
            drawLineL(ctx, coordonate[i].x, 480 - coordonate[i].y, coordonate[i + 1].x, 480 - coordonate[i + 1].y, colors[i].color, 4)
            drawPoint(ctx, coordonate[i].x, 480 - coordonate[i].y, colors[i].color)
        }
        drawPoint(ctx, (coordonate[4].x) - 4, 480 - coordonate[4].y, colors[4].color)
        ctx.save();
        ctx.font = 'bold 25px Roboto'
        ctx.textAlign = 'left'
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = "center";
        ctx.fillText("Numarul de masini", -250, 25);
        ctx.restore();
        drawLineL(ctx, 0, 0, 0, canvas.height, "black", 2)
        drawLineL(ctx, 0, canvas.height, canvas.width, canvas.height, "black", 2)
    }
    
    function drawLineL(ctx, startX, startY, endX, endY, color, lineWidth) {
        ctx.strokeStyle = color;
        if (lineWidth != null) ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.closePath();
    }
    
    function drawPoint(ctx, startX, startY, color) {
        ctx.fillStyle = color
        ctx.beginPath();
    
        ctx.arc(startX, startY, 5, 0, 2 * Math.PI, false) // full circle
        ctx.fill()
        ctx.closePath();
    }
    
    
    //sursa:https://code.tutsplus.com/tutorials/how-to-draw-bar-charts-using-javascript-and-html5-canvas--cms-28561
    
    function drawLine(ctx, startX, startY, endX, endY, color) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();
    }
    
    function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
        ctx.restore();
    }
    
    var Barchart = function (options) {
        this.options = options;
        this.canvas = options.canvas;
        this.ctx = options.ctx;
        this.colors = options.colors;
    
        this.draw = function () {
            var maxValue = 0;
            for (var categ in this.options.data) {
                maxValue = Math.max(maxValue, this.options.data[categ]);
            }
            var canvasActualHeight = this.canvas.height - this.options.padding * 2;
            var canvasActualWidth = this.canvas.width - this.options.padding * 2;
    
            var gridValue = 0;
            while (gridValue <= maxValue) {
                var gridY = canvasActualHeight * (1 - gridValue / maxValue) + this.options.padding;
                drawLine(this.ctx, 0, gridY, this.canvas.width, gridY, this.options.gridColor);
    
                this.ctx.save();
                this.ctx.fillStyle = this.options.gridColor;
                this.ctx.restore();
    
                gridValue += this.options.gridScale;
            }
    
            //drawing the bars
            var barIndex = 0;
            var numberOfBars = Object.keys(this.options.data).length;
            var barSize = (canvasActualWidth) / numberOfBars;
    
            for (categ in this.options.data) {
                var val = this.options.data[categ];
                var barHeight = Math.round(canvasActualHeight * val / maxValue);
                drawBar(this.ctx, this.options.padding + barIndex * barSize, this.canvas.height - barHeight - this.options.padding, barSize, barHeight, this.colors[barIndex % this.colors.length]);
                barIndex++;
            }
        }
    }
    
    function barChart(date, ctx, myCanvas) {
        myCanvas.width = 500;
        myCanvas.height = 500;
        var myBarchart = new Barchart(
            {
                canvas: chart,
                padding: 10,
                gridScale: 5,
                gridColor: "#eeeeee",
                ctx: ctx,
                data: date,
                colors: ["#F1C40F", "#a55ca5", "#bccd7a", "#eb9743", "#67b6c7"]
            }
        );
        myBarchart.draw();
    }
    
    
    //sursa:https://code.tutsplus.com/tutorials/how-to-draw-a-pie-chart-and-doughnut-chart-using-javascript-and-html5-canvas--cms-27197
    
    function drawLine(ctx, startX, startY, endX, endY) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
    
    function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle) {
        ctx.beginPath();
    
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.stroke();
    }
    
    function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
    
        ctx.fillStyle = color;
        ctx.beginPath();
        // this.svgPie=this.svgPie+"<path d=\" M "+"0"+" , "+"0"+"\n"
        ctx.moveTo(centerX, centerY);
        // this.svgPie=this.svgPie+"A "+ "1 " +"1"+" 0 "+ radius + " "+startAngle+ " "+ endAngle +  "\" stroke=\"black\" fill=\""+color+ "\"/>"
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
        ctx.stroke()
    }
    
    var Piechart = function (options) {
        this.options = options;
        this.canvas = options.canvas;
        this.ctx = options.ctx
        this.colors = options.colors;
    
        this.draw = function () {
            var total_value = 0;
            var color_index = 0;
            for (var categ in this.options.data) {
                var val = this.options.data[categ];
                total_value += val;
            }
    
            var start_angle = 0;
            for (categ in this.options.data) {
                val = this.options.data[categ];
                var slice_angle = 2 * Math.PI * val / total_value;
                var pieRadius = Math.min(this.canvas.width / 2, this.canvas.height / 2);
                var labelX = this.canvas.width / 2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
                var labelY = this.canvas.height / 2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);
                // let dasharray=val*360/total_value;
                // let procent=dasharray*100/360;
                // let x=500 * Math.cos( Math.PI * procent*3,6 / 180 );
                // let y=500 * Math.sin( Math.PI * procent*3,6 / 180 );
                // svgPie=svgPie+ "\n" +"<path d=\" M 0,0 L 250 , 0 A 250 ,250  0 1,1 " + x + "," + y +" Z \" fill=\""+ this.colors[color_index%this.colors.length]+  " \"  stroke=\"black\" />"
                // svgPie=svgPie+"\n <circle cx = "+"\""+"250"+"\" cy= \""+"250"+"\" r=\""+"250"+"\" stroke-dasharray = \""+ dasharray +" 360\" fill = \"transparent\" stroke=\""+ this.colors[color_index%this.colors.length] + "\"  transform=\"rotate(-90) translate(-20)\"/>"
                drawPieSlice(this.ctx, this.canvas.width / 2, this.canvas.height / 2, Math.min(this.canvas.width / 2, this.canvas.height / 2),
                    start_angle, start_angle + slice_angle, this.colors[color_index % this.colors.length]);
    
                var labelText = Math.round(100 * val / total_value);
                this.ctx.fillStyle = "black";
                this.ctx.font = " 20px Arial";
                this.ctx.fillText(labelText + "%", labelX, labelY);
    
                start_angle += slice_angle;
                color_index++;
            }
    
        }
        this.ctx.save();
    
    }
    
    function pieChart(date, ctx, myCanvas) {
        myCanvas.width = 500;
        myCanvas.height = 500;
    
        var myPiechart = new Piechart(
            {
                canvas: myCanvas,
                data: date,
                colors: ["#F1C40F", "#a55ca5", "#bccd7a", "#eb9743", "#67b6c7"],
                ctx: ctx,
            }
        );
        myPiechart.draw();
    }
    