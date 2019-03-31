export interface ControlesI {
  id: number;
  type: string;
  description: string;
  image: string;
  tag: string;
  name: string;
  options?: Array<any>;
  attributes: any;
}

export interface ControlI {
  id: number;
  name: string;
  type: string;
  attributes: { [key: string]: any };
  options?: Array<any>;
  tag: string;
}

export interface ControlRPostI {
  attributes: {};
  id: 0;
  name: string;
  options: {};
  tag: string;
  type: string;
}

export interface WidgetI {
  id: number;
  type: string;
  description: string;
  image: string;
  label: string;
  windowId: number;
}

export interface OpcionI {
  value: string;
  viewValue: string;
}

export interface FlujoI {
  id: string;
  name: string;
  initWindowId: number;
  windowsIds: any;
  windows: any;
}

export interface DesignI {
  id: number;
  status: string;
  initWindowId: number;
  windowsIds: any;
  windows: any;
}

export interface WindowI {
  id: number;
  height: number;
  width: number;
  name: string;
  controls: ControlI[] | null;
  designId: number;
  type: string;
  attributes?: { [key: string]: any };
}

export interface WindowChildRI {
  attributes: {};
  controls: any;
  designId: number;
  fatherId: number;
  height: number;
  id: 0;
  name: string;
  responseCode: string;
  type: string;
  width: number;
}

export class EModel {
  // public control: ControlesI;
  public estilos: any[]; // Los estilos en forma de objeto con propiedades separados por coma para ngStyle
  public attrs: any; // Es un array ilimitado de objetos, y cada obketo contiene llave valor de los atriburps
}

export const opcionesDefault = [
  {
    viewValue: 'View',
    value: 'value'
  }
];

export const commands = [
  {
    id: 1,
    cmd: 'copy'
  },
  {
    id: 2,
    cmd: 'paste'
  },
  {
    id: 3,
    cmd: 'delete'
  }
];

export const widgetT = [
  {
    id: 2492,
    name: 'button_2492',
    type: 'button',
    attributes: {
      style:
        'position:absolute;width:100px;height:100px;transform:translate3d(0,0,0);'
    },
    options: null,
    tag: 'input'
  },
  {
    id: 2493,
    name: 'button_2493',
    type: 'button',
    attributes: {
      style:
        'position:absolute;width:100px;height:100px;transform:translate3d(0,0,0);'
    },
    options: null,
    tag: 'input'
  }
];
