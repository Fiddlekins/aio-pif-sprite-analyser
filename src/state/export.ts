import {observable} from '@legendapp/state';
import {ObservablePersistLocalStorage} from "@legendapp/state/persist-plugins/local-storage"
import {synced} from "@legendapp/state/sync";
import {isValidBoolean} from "./utils/validation/isValidBoolean.ts";
import {validate} from "./utils/validation/validate.ts";

export const exportSettings$ = observable(synced({
    initial: {
      isSize96: false,
      isIndexed: false,
      isNormaliseTransparencyEnabled: true,
    },
    persist: {
      name: 'apsa-export-settings',
      plugin: ObservablePersistLocalStorage,
      transform: {
        load: (value) => {
          validate(value, 'isSize96', isValidBoolean());
          validate(value, 'isIndexed', isValidBoolean());
          validate(value, 'isNormaliseTransparencyEnabled', isValidBoolean());
          return value;
        }
      }
    }
  }
));
