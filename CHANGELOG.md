## PROJECT CHANGELOG | Changes since Part 2: 10 September 2026

### v1.0.0 | 06 November 2026

### Added

#### Navigation & Routing |

- Integrated back-navigation routing to home and structured culinary content styling.

#### Menu & Dish Management |

- Added updateMenuItem function to edit existing dishes in state.
- Added deleteMenuItem function to remove dishes from state.
- Added remove photo capability to dish form, including a removePhoto handler with a confirmation alert and an action button (x) alongside the change photo overlay.
- Added decimal handling and normalization for price input.
- Added course filter chips (All, Starter, Main Course, Dessert) with instant filtering.
- Added inline SVG action buttons for dish editing and deletion.

#### UI Components & Features |

- Added state-managed dropdown expansion for Frequently Asked Questions and About Us sections in more.tsx.
- Implemented interactive accordion menu and layout alignment into more.tsx.
- Implemented live menu statistics and analytics overview, connecting stats.tsx to MenuContext for real-time item tracking and dynamic course/price calculations.
- Implemented spelling tolerance for search.
- Implemented empty and no-results feedback UI with filter reset functionality.
- Added search TextInput capped at 50 characters with auto-capitalization.
- Addition to image assets.

### Updated

#### UI, Layout & Styling |

- Refactored UI layout and search/filtering workflows.
- Removed course count cards from top section of home screen.
- Updated MenuContextType interface and Provider value.
- Updated TabBar onPress handler to safely evaluate optional navigation.emit before pushing routes.
- Aligned Expo SDK 58 dependencies and cleared bundler/TypeScript cache issues.
- Repositioned divider lines to render cleanly at the bottom of each accordion section.
- Aligned accordion titles to the right with expansion icons (x) positioned on the left.
- Implemented dynamic color-shifting on active accordion icons.
- Updated stats.tsx UI.
- Updated dishdetails.tsx default image background colour.
- Updated more.tsx about description.
- Connected edit and delete actions to global menu context, importing deleteMenuItem with confirmation alert and redirection, and updating handleEdit to navigate to add.tsx carrying current dish id for seamless form pre-filling.
- Redesigned menu item cards to a white background with rounded borders and stacked layout.
- Positioned dish price directly below dish name on the left side, and placed edit/delete action buttons vertically on the right.
- Increased font sizes and padding for dish titles and course labels to prevent text overflow.
- Moved utensils.png outside of the padded scroll view container to prevent clipping and disappearing bugs caused by negative margins.
- Cleared form state and reset inputs on new dish creation.
- Implemented pre-filled editing, form validations, navigation, and UX controls.

#### Documentation |

- Updated README.md to reflect current project setup, feature additions, and system workflows.

### Fixed

#### Component & Routing Fixes |

- Fixed incorrect relative import path for Expo router in TabBar component.
