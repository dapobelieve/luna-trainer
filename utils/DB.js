import localForage from 'localforage';

const lunaDB = localForage.createInstance({
  name: 'lunaDb',
  driver: localForage.INDEXEDDB,
  version: 1.0,
  storeName: 'lunaStore',
});

export default lunaDB;