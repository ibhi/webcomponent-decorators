import caseMap from '../utils/casemap';

export default function Input(target: any, key: string): void {
    const attrName = caseMap.camelToDashCase(key);

    // Setup static observedAttributes property getter
    // based on the Input decorators
    if(!target.constructor.observedAttributes) {
        // Private static property to store observedAttributes
        target.constructor.__observedAttributes = [];
        // Define static getter for observedAttributes
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
    // Push the current attrName (corresponding to the current property name)
    // to the private static property
    target.constructor.__observedAttributes.push(attrName);

    // Getter for the property
    const getter = function () {
        return this.__data[key] || '';
    }

    // Setter for the property
    const setter = function (value) {
        this.__data[key] = value;
        if(this.getAttribute(attrName) !== value) {
            // Reflect property changes to attribute
            this.setAttribute(attrName, value);
        }
        // Call the private propertiesChanged callback from the class
        // Here is where in your code you can update the DOM corresponding
        // to the property which is changed
        this.propertiesChanged(key, value);
    }

    // Delete the original property and define the getters and setters
    // instead of the original one in the prototype
    // Todo: Find a better way to define the property in the instance 
    // instead of in prototype, because target here refers to prototype
    if (delete target[key]) {
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }

}