/*
 * Login Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'Components.Search';

export default defineMessages({
  default: {
    id: `${scope}.default`,
    defaultMessage: 'Search...',
  },
  user: {
    id: `${scope}.user`,
    defaultMessage: 'Search User...',
  },
  product: {
    id: `${scope}.product`,
    defaultMessage: 'Search Product...',
  },
});
