/* @flow */

// TODO(akp): determine possibilites here

export type SJRect = {|
  _class: 'rect',
  constrainProportions: bool,
  x: number,
  y: number,
  width: number,
  height: number,
|};

type SJIDBase = {
  do_objectID: string
};

// Rect encoded as a string, ie {{0, 0}, {10, 30}}
export type SJStringRect = string;

export type SJColor = {|
  _class: 'color',
  red:   number,
  green: number,
  blue:  number,
  alpha: number,
|};

/*** Style  ***/

// You'll want to use values from sketch-constants for these.
// This just prevents some mistakes.
// $Values will make these unnecessary https://github.com/facebook/flow/issues/627
type BorderPositionEnum = 0 | 1 | 2 | 3;
type FillTypeEnum = 0 | 1 | 4 | 5;
type PatternFillTypeEnum = 0 | 1;
type BlendModeEnum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
type LineDecorationTypeEnum = 0 | 1 | 2 | 3;
type BooleanOperation = -1 | 0 | 1 | 2 | 3;
/*
const ResizingType = {
  Stretch: 0,
  PinToCorner: 1,
  ResizeObject: 2,
  FloatInPlace: 3
}
*/
type ResizingType = 0 | 1 | 2 | 3;

export type SJBorder = {|
  _class: 'border',
  isEnabled: bool,
  color: SJColor,
  fillType: FillTypeEnum,
  position: BorderPositionEnum,
  thickness: number,
|};

export type SJFill = {|
  _class: 'fill',
  isEnabled: bool,
  color: SJColor,
  fillType: FillTypeEnum,
  noiseIndex: number,
  noiseIntensity: number,
  patternFillType: PatternFillTypeEnum,
  patternTileScale: number,
|};

export type SJShadow = {|
  _class: 'shadow',
  isEnabled: bool,
  blurRadius: number,
  color: SJColor,
  contextSettings: {
    _class: 'graphicsContextSettings',
    blendMode: BlendModeEnum,
    opacity: number,
  },
  offsetX: number,
  offsetY: number,
  spread: number,
|};

export type SJStyle = {
  _class: 'style',
  borders?: SJBorder[],
  shadows?: SJShadow[],
  fills?: SJFill[],
  textStyle?: SJTextStyle,
  miterLimit: number,
  startDecorationType: LineDecorationTypeEnum,
  endDecorationType: LineDecorationTypeEnum,
}

export type SJTextStyle = {|
  _class: 'textStyle',
  encodedAttributes: {
    NSColor?: {
      _archive: EncodedBase64BinaryPlist,
    },
    MSAttributedStringFontAttribute?: {
      _archive: EncodedBase64BinaryPlist,
    },
    NSParagraphStyle?: {
      _archive: EncodedBase64BinaryPlist,
    },
    NSKern?: number
  }
|};

/*** Layers ***/

type _SJLayerBase = {
  name: string,
  nameIsFixed: bool,

  isFlippedHorizontal?: bool,
  isFlippedVertical?: bool,
  isLocked?: bool,
  isVisible: bool,
  // TODO: add enum here
  layerListExpandedType?: number ,

  layers?: SJLayer[],
  style?: SJStyle,
  // Rotation direction is backwards compared to Sketch UI
  rotation?: number,
  shouldBreakMaskChain?: bool,
  // TODO: add enum here
  resizingType?: ResizingType,
  hasClickThrough?: bool,
} & SJIDBase;

export type SJLayer = SJTextLayer | SJGroupLayer | SJShapeGroupLayer | SJShapeLayer;

type ExportOptions = {|
    _class: 'exportOptions',
    exportFormats: [],
    includedLayerIds: [],
    layerOptions: number,
    shouldTrim: bool
|};

export type SJTextLayer = {
  _class: 'text',
  attributedString: MSAttributedString,
  glyphBounds: SJStringRect,
} & _SJLayerBase;

export type SJGroupLayer = {
  _class: 'group',
} & _SJLayerBase;

// There are some restrictions on the nesting of shape groups and shapes

export type SJShapeGroupLayer = {
  _class: 'shapeGroup',
  //TODO(akp): find a way to restrict this to shape layers with blowing up
  //layers?: SJShapeLayer[],
  style: SJStyle,
} & _SJLayerBase;

export type SJShapeLayer = {
  // TODO(akp): split these into types
  _class: 'rectangle' | 'oval' | 'shapePath',
} & SJIDBase;

/*** Dumb key value coded types. Hopefully sketch will kill this off... **/

type EncodedBase64BinaryPlist = string;

export type MSAttributedString = {
  _class: 'MSAttributedString',
  archivedAttributedString: {
    // This is a base-64 encoded bplist, which is pretty dumb
    _archive: EncodedBase64BinaryPlist
  },
}
