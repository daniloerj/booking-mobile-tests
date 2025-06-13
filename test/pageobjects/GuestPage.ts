class GuestPage {
    /**
     * Campo para el nombre del huésped
     */
    get firstNameInput() {
        return $('android=new UiSelector().resourceId("com.booking:id/bui_input_container_background").instance(0)');
    }

    /**
     * Campo para el apellido del huésped
     */
    get lastNameInput() {
        return $('android=new UiSelector().resourceId("com.booking:id/bui_input_container_background").instance(1)');
    }

    /**
     * Campo para el email del huésped
     */
    get emailInput() {
        return $('android=new UiSelector().resourceId("com.booking:id/bui_input_container_background").instance(2)');
    }

    /**
     * Campo para el país
     */
    get countryInput() {
        return $('android=new UiSelector().resourceId("com.booking:id/bui_input_container_background").instance(3)');
    }

    /**
     * Campo para el teléfono
     */
    get phoneInput() {
        return $('android=new UiSelector().resourceId("com.booking:id/bui_input_container_background").instance(4)');
    }

    /**
     * Selector para motivo del viaje
     */
    get travelPurposeSelector() {
        return $('android=new UiSelector().resourceId("com.booking:id/business_purpose_leisure")');
    }

    /**
     * Opción de motivo del viaje (por texto)
     */
    travelPurposeOption(purpose: string) {
        return $(`android=new UiSelector().textContains("${purpose}")`);
    }

    /**
     * Botón para continuar o confirmar datos del huésped
     */
    get continueButton() {
        return $('android=new UiSelector().resourceId("com.booking:id/action_button")');
    }

    /**
     * Completa los datos del huésped y continúa
     */
    async fillGuestData(firstName: string, lastName: string, email: string, country: string, phone: string, purpose: string) {
        await this.firstNameInput.waitForDisplayed({ timeout: 10000 });
        await this.firstNameInput.setValue(firstName);
        await this.lastNameInput.setValue(lastName);
        await this.emailInput.setValue(email);
        await this.countryInput.setValue(country);
        await this.phoneInput.setValue(phone);

        await this.travelPurposeSelector.click();
        //await this.travelPurposeOption(purpose).click();

        await this.continueButton.click();
    }
}

export default new GuestPage();