"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron = require("electron");
const app = require("../dist/controllers/app/index");

electron.ipcMain.on('E2E_WALLET_EDIT', function (event, arg) {
    const walletId = arg[0];
    app.default.navTo(`/editwallet/${walletId}`);
});

function findItem(menuItems, labels) {
    var target = labels[0];
    var rest = labels.slice(1);
    var foundItem = menuItems.find(function (item) { return item.label === target; });
    if (rest.length === 0) {
        return foundItem;
    }
    return findItem(foundItem.submenu.items, rest);
}
electron.ipcMain.on('E2E_GET_MENU_ITEM', function (e, labels) {
    var menuItem = findItem(electron.Menu.getApplicationMenu().items, labels);
    if (menuItem) {
        e.returnValue = new electron.MenuItem({
            checked: menuItem.checked,
            enabled: menuItem.enabled,
            label: menuItem.label,
            visible: menuItem.visible
        });
    }
    else {
        e.returnValue = ({
            label: ''
        });
    }
});
electron.ipcMain.on('E2E_CLICK_MENU_ITEM', function (e, labels) {
    var item = findItem(electron.Menu.getApplicationMenu().items, labels);
    item.click();
});
