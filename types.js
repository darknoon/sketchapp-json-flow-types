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

/*** Style & Misc. ***/

// You'll want to use values from sketch-constants for these.
// This just prevents some mistakes.
// $Values will make these unnecessary https://github.com/facebook/flow/issues/627
type BorderPositionEnum = 0 | 1 | 2 | 3;
type BorderLineCapStyle = 0 | 1 | 2;
type BorderLineJoinStyle = 0 | 1 | 2;
type FillTypeEnum = 0 | 1 | 4 | 5;
type PatternFillTypeEnum = 0 | 1 | 2 | 3;
type BlendModeEnum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
type LineDecorationTypeEnum = 0 | 1 | 2 | 3;
type BooleanOperation = -1 | 0 | 1 | 2 | 3;
type CurveMode = 0 | 1 | 2 | 3 | 4;
/*
const ResizingType = {
  Stretch: 0,
  PinToCorner: 1,
  ResizeObject: 2,
  FloatInPlace: 3
};
*/
type ResizingType = 0 | 1 | 2 | 3;
/*
const LayerListExpandedType = {
  Collapsed: 0,
  ExpandedTemp: 1,
  Expanded: 2,
};
*/
type LayerListExpandedType = 0 | 1 | 2;

export type SJBorder = {|
  _class: 'border',
  isEnabled: bool,
  color: SJColor,
  fillType: FillTypeEnum,
  position: BorderPositionEnum,
  thickness: number,
|};

export type SJBorderOptions = {|
  _class: 'borderOptions',
  isEnabled: bool,
  dashPattern: number[],
  lineCapStyle: BorderLineCapStyle,
  lineJoinStyle: BorderLineJoinStyle,
|};

export type SJFill = {|
  _class: 'fill',
  isEnabled: bool,
  color?: SJColor,
  fillType: FillTypeEnum,
  image?: SJImageDataReference,
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
  borderOptions?: SJBorderOptions,
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
    NSColor: KeyValueArchive,
    MSAttributedStringFontAttribute?: KeyValueArchive,
    NSParagraphStyle?: KeyValueArchive,
    NSKern: number
  }
|};

type ExportOptions = {|
    _class: 'exportOptions',
    exportFormats: [],
    includedLayerIds: [],
    layerOptions: number,
    shouldTrim: bool
|};

type RulerData = {|
  _class: 'rulerData',
  base: 0,
  guides: number[],
|};

export type SJImageDataReference = {|
  _class: 'MSJSONOriginalDataReference',
  _ref: string,
  _ref_class: 'MSImageData',
  data: {
    _data: string,
  },
  sha1: {
    _data: string,
  },
|};

// '{0, 1}'
type PointString = string;

type SJCurvePoint = {|
  _class: 'curvePoint',
  cornerRadius: number,
  curveFrom: PointString,
  curveMode: CurveMode,
  curveTo: PointString,
  hasCurveFrom: bool,
  hasCurveTo: bool,
  point: PointString,
|}

export type SJPath = {|
  _class: 'path',
  isClosed: bool,
  points: SJCurvePoint[],
|}

/*** Layers ***/

type _SJLayerBase = {
  // Layers have names; when they are not fixed, they are changed by the layer's string
  name: string,
  nameIsFixed: bool,

  // It's important to make sure your layers are visible by including visible: true
  isVisible: bool,
  isLocked?: bool,
  layerListExpandedType?: LayerListExpandedType,
  hasClickThrough?: bool,

  layers?: SJLayer[],
  style?: SJStyle,

  // Rotation direction is backwards compared to Sketch UI
  isFlippedHorizontal?: bool,
  isFlippedVertical?: bool,
  rotation?: number,
  shouldBreakMaskChain?: bool,
  resizingType?: ResizingType,
} & SJIDBase;

export type SJLayer = SJArtboardLayer | SJTextLayer | SJGroupLayer | SJShapeGroupLayer | SJShapeLayer;

export type SJArtboardLayer = {
  _class: 'artboard',
  frame: SJRect,
  backgroundColor: SJColor,
  hasBackgroundColor: bool,
  horizontalRulerData?: RulerData,
  verticalRulerData?: RulerData,
  includeBackgroundColorInExport?: bool,
  includeInCloudUpload?: bool,
} & _SJLayerBase;

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
  //TODO(akp): find a way to restrict this to shape layers with blowing up, i.e.
  //layers?: SJShapeLayer[],
  style: SJStyle,
  hasClippingMask: bool,
} & _SJLayerBase;

export type SJShapeLayer = {
  // TODO(akp): split these into types
  _class: 'rectangle' | 'oval' | 'shapePath',
} & SJIDBase;

/*** Dumb key value coded types. Hopefully sketch will kill this off at some point **/

    // This is a base-64 encoded bplist, which is pretty dumb
type EncodedBase64BinaryPlist = string;

type KeyValueArchive = {
  _archive: EncodedBase64BinaryPlist,
};

export type NSColorArchive = KeyValueArchive;

export type MSAttributedString = {
  _class: 'MSAttributedString',
  archivedAttributedString: KeyValueArchive,
}
