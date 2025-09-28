const device = await navigator.bluetooth.requestDevice({
    optionalServices: ["battery_service", "device_information"],
    acceptAllDevices: true,
  });

let deviceName = device.gatt.device.name;
const server = await device.gatt.connect();

const batteryService = await server.getPrimaryService("battery_service");
const infoService = await server.getPrimaryService("device_information");

const batteryLevelCharacteristic = await batteryService.getCharacteristic(
    "battery_level"
  );
  const batteryLevel = await batteryLevelCharacteristic.readValue();
  const batteryPercent = await batteryLevel.getUint8(0);


const infoCharacteristics = await infoService.getCharacteristics();
console.log(infoCharacteristics);
let infoValues = [];
const promise = new Promise((resolve, reject) => {
  infoCharacteristics.forEach(async (characteristic, index, array) => {
    const value = await characteristic.readValue();
    console.log(new TextDecoder().decode(value));
    infoValues.push(new TextDecoder().decode(value));
    if (index === array.length - 1) resolve();
  });
});