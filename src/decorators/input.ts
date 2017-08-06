import caseMap from '../utils/casemap';

export default function Input(target: any, key: string): void {
    console.log('Input decorator');
    const attrName = caseMap.camelToDashCase(key);

    if(!target.constructor.observedAttributes) {
        console.log('Inside observed attr propert setup');
        target.constructor.__observedAttributes = [];
        Object.defineProperty(
            target.constructor, 
            'observedAttributes', 
            {
                get: function() {
                    return this.__observedAttributes;
                }
            }
        );
    }

    target.constructor.__observedAttributes.push(attrName);
    console.log(target.constructor.observedAttributes);

    const getter = function () {
        console.log('Get: ' + this.__data[key]);
        return this.__data[key] || '';
    }

    const setter = function (value) {
        console.log('Set: ' + value);
        this.__data[key] = value;
        if(this.getAttribute(attrName) !== value) {
            this.setAttribute(attrName, value);
        }
        this._propertiesChanged(key, value);
    }

    if (delete target[key]) {
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }

}