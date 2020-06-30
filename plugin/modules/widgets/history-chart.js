/*\
title: $:/plugins/sebastianovide/gsebd/modules/widgets/historyChart.js
type: application/javascript
module-type: widget

\*/
(function () {

    /*jslint node: true, browser: true */
    /*global $tw: false */
    "use strict";

    const Widget = require("$:/core/modules/widgets/widget.js").widget;

    const Chartist = require("$:/plugins/sebastianovide/gsebd/lib/chartist/chartist.min.js");
    const _ = require("$:/plugins/sebastianovide/gsebd/lib/lodash/lodash.min.js");

    const MyWidget = function (parseTreeNode, options) {
        this.initialise(parseTreeNode, options);
    };

    MyWidget.prototype = new Widget();

    MyWidget.prototype.render = function (parent, nextSibling) {
        this.parentDomNode = parent;
        this.computeAttributes();

        // add a div
        const parser = new DOMParser();
        const divString = `<div class="ct-chart ct-perfect-fourth"></div>`;
        const html = parser.parseFromString(divString, 'text/html');
        const divNode = html.body.firstChild;
        parent.insertBefore(divNode, nextSibling);
        this.domNodes.push(divNode);

        const values = this.getAttribute("values", "{}");
        const json = JSON.parse(values);
        const jsonValid = _.pickBy(json, (v, k) => _.toString(k).length === 8);

        const serie = _.map(jsonValid, (y, k) => {
            const year = k.substring(0, 4);
            const month = k.substring(4, 6);
            const day = k.substring(6, 8);
            const date = new Date(year, month, day);
            return { x: date, y };
        });
        const data = {
            series: [
                serie
            ]
        };
        const options = {
            lineSmooth: Chartist.Interpolation.cardinal({
                fillHoles: true,
            }),
            axisX: {
                type: Chartist.FixedScaleAxis,
                divisor: 6,
                labelInterpolationFnc: (value) => {
                    const date = new Date(value);
                    const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
                    const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(date)

                    return `${day}-${month}-${year}`;
                }
            }
        };

        new Chartist.Line(divNode, data, options);
    };


    MyWidget.prototype.refresh = function (changedTiddlers) {
        this.refreshSelf();
        return true;
    };

    exports.historyChart = MyWidget;

})();