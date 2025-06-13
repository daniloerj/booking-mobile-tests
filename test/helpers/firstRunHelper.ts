export async function handleFirstRunPopups() {
    // Ejemplo: botón "Permitir" de permisos de Android
    try {
        const allowBtn = await $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")');
        await allowBtn.waitForDisplayed({ timeout: 5000 });
        if (await allowBtn.isDisplayed()) {
            await allowBtn.click();
        }
    } catch (e) {
        // Si no aparece, ignora el error
    }

    // Ejemplo: botón "X" de pantalla de login o bienvenida
    try {
        const closeBtn = await $('android=new UiSelector().description("Navigate up")');
        await closeBtn.waitForDisplayed({ timeout: 5000 });
        if (await closeBtn.isDisplayed()) {
            await closeBtn.click();
        }
    } catch (e) {}

    // Agrega aquí más popups según los detectes con Appium Inspector
}