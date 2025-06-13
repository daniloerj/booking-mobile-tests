class ResultsPage {
    /**
     * Devuelve todos los contenedores de resultados de búsqueda
     */
    get resultItems() {
        return $$('android=new UiSelector().className("android.view.ViewGroup")');
    }

    /**
     * Selecciona el resultado por índice (0 = primero)
     */
    async selectResultByIndex(index: number) {
        const items = await this.resultItems;
        await browser.waitUntil(
            async () => (await items.length) > index,
            {
                timeout: 10000,
                timeoutMsg: `No hay suficientes resultados para seleccionar el índice ${index}`
            }
        );
        await items[index+30].click();
    }
}

export default new ResultsPage();