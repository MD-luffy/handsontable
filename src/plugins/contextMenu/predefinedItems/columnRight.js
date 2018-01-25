import {getValidSelection} from './../utils';
import * as C from './../../../i18n/constants';

export const KEY = 'col_right';

export default function columnRightItem() {
  return {
    key: KEY,
    name() {
      return this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_INSERT_RIGHT);
    },

    callback(key, selection) {
      this.alter('insert_col', selection[0].end.col + 1, 1, 'ContextMenu.columnRight');
    },
    disabled() {
      const selected = getValidSelection(this);

      if (!selected) {
        return true;
      }
      if (!this.isColumnModificationAllowed()) {
        return true;
      }
      if (selected.length > 1) {
        return true;
      }
      const [startRow, startColumn, endRow, endColumn] = selected[0];
      const entireRowSelection = [startRow, 0, endRow, this.countCols() - 1];
      const rowSelected = entireRowSelection.join(',') === selected.join(',');
      const onlyOneColumn = this.countCols() === 1;

      return startColumn < 0 || this.countCols() >= this.getSettings().maxCols || (!onlyOneColumn && rowSelected);
    },
    hidden() {
      return !this.getSettings().allowInsertColumn;
    }
  };
}
