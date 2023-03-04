import { PersonPicker } from './person-picker';
import { PersonItem } from './person-item';
import { PersonPickerDropdown } from './person-picker-dropdown';

export { PersonPicker, PersonItem as PersonPickerItem, PersonPickerDropdown };

declare global {
    interface HTMLElementTagNameMap {
        'person-picker': PersonPicker;
        'person-item': PersonItem;
        'person-picker-dropdown': PersonPickerDropdown;
    }
}