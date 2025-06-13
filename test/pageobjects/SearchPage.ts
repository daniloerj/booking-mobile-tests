
// SearchPage.ts
class SearchPage {
    /**
     * Localizador del campo de destino
     */
    get destinationInput() {
        return $$('android=new UiSelector().resourceId("com.booking:id/facet_search_box_basic_field_label")')[0];
        //return $('android=new UiSelector().resourceId("com.booking:id/facet_search_box_accommodation_destination")');
    }
    get searchDestinationInput() {
        return $('android=new UiSelector().resourceId("com.booking:id/facet_with_bui_free_search_booking_header_toolbar_content")');
    }
    get destinationSubtitleItem() {
        return $('android=new UiSelector().text("City in Cusco, Peru")');
    }

    /**
     * Localizador del campo de fechas
     */
    get dateInput() {
        return $$('android=new UiSelector().resourceId("com.booking:id/facet_search_box_basic_field_label")')[1];
        //return $('android=new UiSelector().resourceId("com.booking:id/facet_search_box_accommodation_dates")');
    }
    
    get dateConfirmButton() {
        return $('android=new UiSelector().resourceId("com.booking:id/facet_date_picker_confirm")');
    }
    
    /**
     * Localizador del campo de ocupación (adultos, niños, habitaciones)
     */
    get occupancyInput() {
        return $$('android=new UiSelector().resourceId("com.booking:id/facet_search_box_basic_field_label")')[2];
        //return $('android=new UiSelector().resourceId("com.booking:id/facet_search_box_accommodation_occupancy")');
    }
    get childrenAgeConfirmButton() {
        return $('android=new UiSelector().resourceId("android:id/button1")');
    }
    get ocupanciesConfirmButton() {
        return $('android=new UiSelector().resourceId("com.booking:id/group_config_apply_button")');
    }

    /**
     * Botón para ejecutar la búsqueda
     */
    get searchButton() {
        return $('android=new UiSelector().resourceId("com.booking:id/facet_search_box_cta")');
    }


    /**
     * Método para ingresar el destino
     * @param {string} location - Ejemplo: "Cusco"
     */
    async setDestination(location) {
        await this.destinationInput.waitForDisplayed({ timeout: 5000 });
        await this.destinationInput.click();
        await this.searchDestinationInput.waitForDisplayed({ timeout: 5000 });
        await this.searchDestinationInput.setValue(location);
        await this.destinationSubtitleItem.click();
    }

    /**
     * Método para abrir el selector de fechas
     */
    async openDateSelector() {
        await this.dateInput.waitForDisplayed({ timeout: 5000 });
        await this.dateInput.click();
    }

    /**
     * Método para seleccionar las fechas
     * @param {string} startDate - Ejemplo: "12 July 2025"
     * @param {string} endDate - Ejemplo: "28 July 2025"
     */
    async setDates(startDate, endDate) {
        await $('android=new UiSelector().description("'+startDate+'")').waitForDisplayed({ timeout: 5000 });
        await $('android=new UiSelector().description("'+startDate+'")').click();
        await $('android=new UiSelector().description("'+endDate+'")').waitForDisplayed({ timeout: 5000 });
        await $('android=new UiSelector().description("'+endDate+'")').click();
        await this.dateConfirmButton.click();
    }

    /**
     * Método para abrir el selector de ocupantes
     */
    async openOccupancySelector() {
        await this.occupancyInput.waitForDisplayed({ timeout: 5000 });
        await this.occupancyInput.click();
    }

    /**
     * Método para seleccionar ocupaciones (habitaciones, adultos, niños y edad de los niños)
     * @param {string} rooms - Ejemplo: "1"
     * @param {string} adults - Ejemplo: "2"
     * @param {string} children - Ejemplo: "1"
     * * @param {string} childrenAge - Ejemplo: "5 years old"
     */
    async setOccupancies(rooms, adults, children, childrenAge) {
        await this.openOccupancySelector();

        const items = await $$('android=new UiSelector().resourceId("com.booking:id/bui_input_stepper_value")');
        const more = await $$('android=new UiSelector().resourceId("com.booking:id/bui_input_stepper_add_button")');
        const less = await $$('android=new UiSelector().resourceId("com.booking:id/bui_input_stepper_remove_button")');

        const actualRooms =  await items[0].getText(); // Rooms
        if (actualRooms !== rooms) {
            if (parseInt(actualRooms) < parseInt(rooms)) {
                for (let i = 0; i < (parseInt(rooms) - parseInt(actualRooms)); i++) {
                    await more[0].click(); // Rooms
                }
            } else {
                for (let i = 0; i < (parseInt(actualRooms) - parseInt(rooms)); i++) {
                    await less[0].click(); // Rooms
                }
            }
        }
        const actualAdults =  await items[1].getText(); // Adults
        if (actualAdults !== adults) {
            if (parseInt(actualAdults) < parseInt(adults)) {
                for (let i = 0; i < (parseInt(adults) - parseInt(actualAdults)); i++) {
                    await more[1].click(); // Adults
                }
            } else {
                for (let i = 0; i < (parseInt(actualAdults) - parseInt(adults)); i++) {
                    await less[1].click(); // Adults
                }
            }
        }

        if (parseInt(children) > 0) {
            await more[2].click(); // Children
            const childAgeOption = await $('android=new UiSelector().resourceId("android:id/numberpicker_input")');
            await childAgeOption.waitForDisplayed({ timeout: 5000 });
            let actualAge; // Espera que el selector de edad de niños esté visible
            do {
                await driver.performActions([{
                    type: 'pointer',
                    id: 'finger1',
                    parameters: { pointerType: 'touch' },
                    actions: [
                        { type: 'pointerMove', duration: 0, x: 500, y: 1200 },
                        { type: 'pointerDown', button: 0 },
                        { type: 'pause', duration: 500 },
                        { type: 'pointerMove', duration: 500, x: 500, y: 550 },
                        { type: 'pointerUp', button: 0 }
                    ]
                }]);
                actualAge = await childAgeOption.getText();
            } while (actualAge !== childrenAge);
            
            await this.childrenAgeConfirmButton.click();
        }
        await this.ocupanciesConfirmButton.click();
    }


    /**
     * Método para ejecutar la búsqueda
     */
    async tapSearchButton() {
        await this.searchButton.waitForDisplayed({ timeout: 5000 });
        await this.searchButton.click();
    }
}

export default new SearchPage();
