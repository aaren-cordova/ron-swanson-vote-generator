import Storages from 'js-storage';

const storageNameSpaces = {'default-name': Storages};

export default function getStorage(name) {
    name = name || 'default-name';

    if (!storageNameSpaces[name]) {
        storageNameSpaces[name] = Storages.initNamespaceStorage(name);
    }

    const {sessionStorage, localStorage, cookieStorage} = storageNameSpaces[name];

    return sessionStorage || localStorage || cookieStorage || null;
}