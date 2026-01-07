export class A11yPage {
	constructor() {
		this.KEYS = {
			action: '{enter}'
		}
	}

	navigateToNextElement() {
		cy.window().then(win => {
			if (win.document.activeElement === win.document.body) {
				cy.get('body').tab()
			} else {
				cy.focused().tab()
			}
		})
		return this
	}

	navigateToPrevElement() {
		cy.focused().tab({ shift: true })
		return this
	}

	performAction() {
		cy.focused().type(this.KEYS.action)
		return this
	}

	assertFocusedElement(selector) {
		cy.get(selector).should('be.focused')
		return this
	}
}
