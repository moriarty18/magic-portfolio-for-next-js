/**
 * @typedef {'0'|'1'|'2'|'4'|'8'|'12'|'16'|'20'|'24'|'32'|'40'|'48'|'56'|'64'|'80'|'104'|'128'|'160'} StaticSpacingToken
 * @description Defines a set of fixed, static spacing values based on a numeric scale.
 */
export type StaticSpacingToken = 
| '0'
| '1'
| '2'
| '4'
| '8'
| '12'
| '16'
| '20'
| '24'
| '32'
| '40'
| '48'
| '56'
| '64'
| '80'
| '104'
| '128'
| '160';

/**
 * @typedef {'xs'|'s'|'m'|'l'|'xl'} TShirtSizes
 * @description Defines a standard set of "t-shirt" sizes, used for various properties like spacing and shadows.
 */
export type TShirtSizes = 
| 'xs'
| 's'
| 'm'
| 'l'
| 'xl';

/**
 * @typedef {TShirtSizes} ResponsiveSpacingToken
 * @description Defines spacing tokens that are responsive and based on t-shirt sizes.
 */
export type ResponsiveSpacingToken = TShirtSizes;

/**
 * @typedef {TShirtSizes} ShadowSize
 * @description Defines the size of a shadow effect, based on t-shirt sizes.
 */
export type ShadowSize = TShirtSizes;

/**
 * @typedef {StaticSpacingToken | ResponsiveSpacingToken} SpacingToken
 * @description A composite type representing all possible spacing values, both static and responsive.
 */
export type SpacingToken = StaticSpacingToken | ResponsiveSpacingToken;

/**
 * @typedef {'neutral'|'brand'|'accent'|'info'|'danger'|'warning'|'success'} ColorScheme
 * @description Defines the available color schemes for the UI components.
 */
export type ColorScheme = 
| 'neutral'
| 'brand'
| 'accent'
| 'info'
| 'danger'
| 'warning'
| 'success';

/**
 * @typedef {'on-solid'|'on-background'} ColorCategory
 * @description Defines the context of a color, typically for text or icons placed on a specific background type.
 */
export type ColorCategory =
| 'on-solid'
| 'on-background';

/**
 * @typedef {'weak'|'medium'|'strong'} ColorWeight
 * @description Defines the intensity or weight of a color.
 */
export type ColorWeight = 
| 'weak'
| 'medium'
| 'strong';

/**
 * @typedef {TShirtSizes | 'full'} RadiusSize
 * @description Defines the size of a border radius, including standard sizes and a 'full' circle option.
 */
export type RadiusSize = TShirtSizes | 'full';

/**
 * @typedef {'4'|'8'} RadiusNest
 * @description Defines specific radius values for nested elements to create consistent corner radiuses.
 */
export type RadiusNest = 
| '4'
| '8';

/**
 * @typedef {'body'|'heading'|'display'|'label'|'code'} TextType
 * @description Defines the different semantic types of text.
 */
export type TextType = 
| 'body' 
| 'heading' 
| 'display' 
| 'label'
| 'code';

/**
 * @typedef {'default'|'strong'} TextWeight
 * @description Defines the weight of the text, typically mapping to `normal` or `bold`.
 */
export type TextWeight =
| 'default'
| 'strong';

/**
 * @typedef {TShirtSizes} TextSize
 * @description Defines the size of the text, based on t-shirt sizes.
 */
export type TextSize = TShirtSizes

/**
 * @typedef {`${TextType}-${TextWeight}-${TextSize}`} TextVariant
 * @description A template literal type that combines text type, weight, and size into a single, comprehensive text style variant.
 */
export type TextVariant = `${TextType}-${TextWeight}-${TextSize}`