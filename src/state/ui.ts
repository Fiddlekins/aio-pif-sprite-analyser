import {beginBatch, endBatch, observable, observe} from "@legendapp/state";
import {ObservablePersistLocalStorage} from "@legendapp/state/persist-plugins/local-storage";
import {synced} from "@legendapp/state/sync";
import {loadCatalog, resolveLocale} from "../i18n.ts";
import {getTheme} from "../themes/getTheme.ts";
import {parseMuiMediaQuery} from "../utils/parseMuiMediaQuery.ts";
import {settings$} from "./settings.ts";
import {emptyArray} from "./utils/emptyArray.ts";
import {isValidNumber} from "./utils/validation/isValidNumber.ts";
import {isValidString} from "./utils/validation/isValidString.ts";
import {validate} from "./utils/validation/validate.ts";

const isMobileQueryString = parseMuiMediaQuery(getTheme().breakpoints.down('md'));

const defaultHighlightColour = {r: 255, g: 0, b: 0, a: 1};

export const uiSettings$ = observable(synced({
    initial: {
      highlightMode: 'monotone',
      highlightColour: defaultHighlightColour,
      colourSpace: 'RGB',
    },
    persist: {
      name: 'apsa-ui-settings',
      plugin: ObservablePersistLocalStorage,
      transform: {
        load: (value) => {
          validate(value, 'highlightMode', isValidString({oneOf: ['monotone', 'negative', 'rotate']}));
          validate(value.highlightColour, 'r', isValidNumber({min: 0, max: 255}));
          validate(value.highlightColour, 'g', isValidNumber({min: 0, max: 255}));
          validate(value.highlightColour, 'b', isValidNumber({min: 0, max: 255}));
          validate(value.highlightColour, 'a', isValidNumber({min: 0, max: 1}));
          validate(value, 'colourSpace', isValidString({oneOf: ['RGB', 'HSV', 'HSL']}));
          return value;
        }
      }
    }
  }
));

export const ui$ = observable({
  locale: resolveLocale(settings$.locale.get()),
  isMobile: window.matchMedia(isMobileQueryString).matches,
  isImportModalOpen: true,
  isExportModalOpen: false,
  isSettingsModalOpen: false,
  isBackgroundModalOpen: false,
  highlight: {
    currentView: 'disabled',
    checkedColours: {
      disabled: [],
      backgroundColours: [],
      spriteColours: [],
    } as Record<string, number[]>,
    currentCheckedColours: () => {
      return ui$.highlight.checkedColours[ui$.highlight.currentView.get()];
    },
    hoveredColours: {
      disabled: [],
      backgroundColours: [],
      spriteColours: [],
    } as Record<string, number[]>,
    currentHoveredColours: () => {
      return ui$.highlight.hoveredColours[ui$.highlight.currentView.get()];
    },
    currentColours: () => {
      return [...new Set([
        ...ui$.highlight.currentCheckedColours.get(),
        ...ui$.highlight.currentHoveredColours.get(),
      ])];
    },
    addCheckedColourToCurrent: (colourKey: number) => {
      if (!ui$.highlight.currentCheckedColours.includes(colourKey)) {
        ui$.highlight.currentCheckedColours.push(colourKey);
      }
    },
    removeCheckedColourFromCurrent: (colourKey: number) => {
      ui$.highlight.currentCheckedColours.splice(ui$.highlight.currentCheckedColours.indexOf(colourKey), 1);
    },
    addHoveredColourToCurrent: (colourKey: number) => {
      if (!ui$.highlight.currentHoveredColours.includes(colourKey)) {
        ui$.highlight.currentHoveredColours.push(colourKey);
      }
    },
    removeHoveredColourFromCurrent: (colourKey: number) => {
      ui$.highlight.currentHoveredColours.splice(ui$.highlight.currentHoveredColours.indexOf(colourKey), 1);
    },
    clearColoursFromCurrent: () => {
      beginBatch();
      emptyArray(ui$.highlight.currentCheckedColours);
      emptyArray(ui$.highlight.currentHoveredColours);
      endBatch();
    },
    clearColours: () => {
      beginBatch();
      for (const colours of Object.values(ui$.highlight.checkedColours)) {
        emptyArray(colours);
      }
      for (const colours of Object.values(ui$.highlight.hoveredColours)) {
        emptyArray(colours);
      }
      endBatch();
    },
  },
});

const matchQuery = window.matchMedia(isMobileQueryString);
matchQuery.addEventListener('change', ({matches}) => {
  ui$.isMobile.set(matches);
});

observe(() => {
  const localeSetting = settings$.locale.get();
  ui$.locale.set(resolveLocale(localeSetting));
});

observe(() => {
  const locale = ui$.locale.get();
  console.log(locale)
  loadCatalog(locale).catch(console.error);
});
