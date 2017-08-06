import Input from '../decorators/input';
import Component from '../decorators/component';

@Component
export class GreetingComponent extends HTMLElement {
    @Input
    public greetingWord: string;
    @Input
    public say: string;
    private greetingElement: Element;
    private _enableProperties: () => {};

    connectedCallback() {
        this.innerHTML = `
            <div class="container">
                <h1 class="greeting">Hello ${this.greetingWord}!</h1>
            </div>
        `;
        this.greetingElement = this.querySelector('.greeting');
        this._enableProperties();
    }

    _propertiesChanged(propName: string, newVal: string) {
        console.log('Properties changed', newVal);
        switch(propName) {
            case 'greetingWord':
                this.updateGreeting(newVal);
                break;
        }
    }

    private updateGreeting(greeting): void {
        this.greetingElement.innerHTML = `Hello ${greeting}!`;
    }
}