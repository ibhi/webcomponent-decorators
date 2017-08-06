import caseMap from '../utils/casemap';

export default function Component<T extends { new(...args: any[]): any }>(target: T): T {
    return class extends target {
        private __data: {};
        private __propertiesEnabled: Boolean;

        attributeChangedCallback(attrName, oldVal, newVal) {
            if(super.attributeChangedCallback) {
                super.attributeChangedCallback();
            }
            // For the first time create this cache object
            if (!this.__data) {
                this.__data = {};
            }
            const propName = caseMap.dashToCamelCase(attrName);
            // Cache the attribute changed value
            this.__data[propName] = newVal;
            // this.__propertiesEnabled check is added to defer the changes to properties
            // after the connected callcback is triggered
            if (this[propName] !== newVal && this.__propertiesEnabled) {
                this[propName] = newVal;
            }
            
        }

        // Call this method inside connected callback to enable 
        // reflection of attribute changes to properties from cached object
        // It will update the properties from cached object so that attributes changed before
        // connected callback still gets reflected to properties
        enableProperties() {
            this.__propertiesEnabled = true;
            // Updating the properties from cache object
            Object.keys(this.__data).forEach((propName) => {
                this[propName] = this.__data[propName];
            })
        }
    }
}
