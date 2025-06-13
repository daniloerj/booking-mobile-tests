class RoomPage {
    
    /**
     * Botón de seleccionar habitación
     */
    get seeAvailableRoomButton() {
        return $('android=new UiSelector().className("android.view.ViewGroup").instance(8)');
    }

    /**
     * Botón de seleccionar habitación
     */
    get selectRoomButton() {
        return $('android=new UiSelector().resourceId("com.booking:id/rooms_item_select_text_view")');
    }

    async selectRoom() {
        await this.selectRoomButton.waitForDisplayed({ timeout: 10000 });
        await this.selectRoomButton.click();
    }

    async seeAvailableRoom() {
        await this.seeAvailableRoomButton.waitForDisplayed({ timeout: 10000 });
        await this.seeAvailableRoomButton.click();
    }

    /**
     * Label de precio habitación
     */
    get priceRoomLabel() {
        return $('android=new UiSelector().resourceId("com.booking:id/price_view_price")');
    }

    /**
     * Foot de precio habitación
     */
    get priceRoomFoot() {
        return $('android=new UiSelector().resourceId("com.booking:id/info_title")');
    }

    /**
     * Botón de reservar habitación
     */
    get bookButton() {
        return $$('android=new UiSelector().resourceId("com.booking:id/main_action")')[0];
    }

    async reserveRoom() {
        await this.bookButton.waitForDisplayed({ timeout: 10000 });
        await this.bookButton.click();
    }
}

export default new RoomPage();