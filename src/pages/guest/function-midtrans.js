const midtransClient = require('midtrans-client');

export let coreApi;
export let snap;

export function createCoreApi() {
    coreApi = new midtransClient.CoreApi({
        isProduction: false,
        serverKey: "YOUR_SERVER_KEY",
        clientKey: "YOUR_CLIENT_KEY",
    });
}

export function createMidtransClient() {
    snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: "YOUR_SERVER_KEY",
        clientKey: "YOUR_CLIENT_KEY",
    });
}