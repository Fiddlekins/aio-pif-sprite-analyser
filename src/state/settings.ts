import {observable} from '@legendapp/state';
import {ObservablePersistLocalStorage} from "@legendapp/state/persist-plugins/local-storage"
import {synced} from "@legendapp/state/sync";
import {isValidBoolean} from "./utils/validation/isValidBoolean.ts";
import {isValidString} from "./utils/validation/isValidString.ts";
import {validate} from "./utils/validation/validate.ts";

export const settings$ = observable(synced({
    initial: {
      locale: 'autodetect',
      themeId: 'system',
      isCanvasAccelerationEnabled: true,
      isIgnoreColouredTransparencyEnabled: false,
      isExportCopyingEnabled: false,
    },
    persist: {
      name: 'apsa-settings',
      plugin: ObservablePersistLocalStorage,
      transform: {
        load: (value) => {
          validate(value, 'locale', isValidString());
          validate(value, 'themeId', isValidString({oneOf: ['system', 'light', 'dark']}));
          validate(value, 'isCanvasAccelerationEnabled', isValidBoolean());
          validate(value, 'isIgnoreColouredTransparencyEnabled', isValidBoolean());
          validate(value, 'isExportCopyingEnabled', isValidBoolean());
          return value;
        }
      }
    }
  }
));
