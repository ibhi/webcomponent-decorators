import Input from '../decorators/input';
import Component from '../decorators/component';

@Component
export class GreetingComponent extends HTMLElement {
    @Input
    public greetingWord: string;

    @Input
    public say: string;

    private greetingElement: Element;
    private enableProperties: () => {};

    connectedCallback() {
        this.innerHTML = `
            <div class="container">
                <h1 class="greeting">Hello ${this.greetingWord} ${this.say}!</h1>
            </div>
        `;
        this.greetingElement = this.querySelector('.greeting');
        // From the @Component decorator
        this.enableProperties();
    }

    private propertiesChanged(propName: string, newVal: string) {
        switch(propName) {
            case 'greetingWord':
                this.updateGreeting();
                break;
            case 'say':
                this.updateSay();
        }
    }

    private updateGreeting(): void {
        this.greetingElement.innerHTML = `Hello ${this.greetingWord} ${this.say}!`;
    }

    private updateSay(): void {
        this.greetingElement.innerHTML = `Hello ${this.greetingWord} ${this.say}!`;
    }
}