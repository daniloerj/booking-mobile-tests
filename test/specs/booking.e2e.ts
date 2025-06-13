import ResultsPage from '../pageobjects/ResultsPage';
import RoomPage from '../pageobjects/RoomPage';
import SearchPage from '../pageobjects/SearchPage';
import GuestPage from '../pageobjects/GuestPage';
import { handleFirstRunPopups } from '../helpers/firstRunHelper';


describe('Booking.com - Reserva de alojamiento', () => {
    it('Happy Path: Reserva completa en Cusco', async () => {
         await handleFirstRunPopups();
        
         // 1. Ingresar destino
        await SearchPage.setDestination('CUSCO');
        // 2. Seleccionar fechas
        await SearchPage.setDates('12 July 2025', '28 July 2025');
        // 3. Seleccionar ocupación
        await SearchPage.setOccupancies('1', '2', '1', '5 years old');
        
        // Verifica que el campo destino muestre "Cusco"
        await expect(SearchPage.destinationInput).toBeDisplayed();
        await expect(await SearchPage.destinationInput).toHaveText('Cusco');
        
        // Verifica que el campo fecha muestre las fechas seleccionadas
        await expect(SearchPage.dateInput).toBeDisplayed();
        await expect(await SearchPage.dateInput).toHaveText('Sat, Jul 12 - Mon, Jul 28');

        // Verifica que el campo ocupación muestre la ocupación seleccionada
        await expect(SearchPage.occupancyInput).toBeDisplayed();
        await expect(await SearchPage.occupancyInput).toHaveText('1 room · 2 adults · 1 child');

        // Verifica que el botón de búsqueda esté habilitado
        await expect(SearchPage.searchButton).toBeEnabled();
        // Verifica que el botón de búsqueda tenga el texto "Search"
        await expect(SearchPage.searchButton).toHaveText('Search');
        // Verifica que el botón de búsqueda tenga el color esperado
        // 4. Buscar alojamientos
        await expect(SearchPage.searchButton).toBeEnabled();
        await SearchPage.searchButton.click();

        //Selecciona el segundo resultado de la búsqueda
        await ResultsPage.selectResultByIndex(1); // Selecciona el segundo resultado

        await RoomPage.seeAvailableRoom(); 
        
        await RoomPage.selectRoom();      // Selecciona la primera habitación

        let priceRoom = await RoomPage.priceRoomLabel.getText(); // Obtiene el precio de la habitación seleccionada
        await expect(await RoomPage.priceRoomFoot.getText()).toContain(priceRoom);

        await RoomPage.reserveRoom();             // Reserva la habitación

        await GuestPage.fillGuestData('Danilo', 'Ramirez', 'daniloerj@hotmail.com', 'Perú','123456789','Leisure');

    });
});