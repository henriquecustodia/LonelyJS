'use strict';

import { Recorder } from './../core/recorders/component-recorder';
import { isFunction } from './../core/utils';

Recorder.register('@click', {
    
    selectors: '[\\@click]',

    dom(model, element) {
        let fn = element.getAttribute('@click');

        if (!fn || !/[\(](.*)[\)]/g.test(fn)) return;

        let [fnName, fnParams] = fn.split('(');

        if (!fnName || !fnParams) return;

        let params = (fnParams = fnParams.replace(' ', '')).substr(0, fnParams.length - 1).split(',');
        
        element.onclick = () => {
            let references = [];

            params.forEach(function (param) {
                references.push(model[param]);
            });

            isFunction(model[fnName]) && model[fnName].apply(model, references);
        };
    }
});