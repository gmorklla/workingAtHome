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
  options?: any;
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

export const windowData = {
  id: 582,
  height: 500,
  width: 500,
  name: 'window582',
  designId: 94,
  type: 'W',
  controls: [
    {
      id: 2492,
      name: 'email_2492',
      type: 'email',
      attributes: {
        style:
          'position:absolute;width:100px;height:100px;transform:translate3d(0,0,0);'
      },
      options: null,
      tag: 'input'
    },
    {
      id: 2493,
      name: 'range_2493',
      type: 'range',
      attributes: {
        style:
          'position:absolute;width:100px;height:100px;transform:translate3d(0,200px,0);'
      },
      options: null,
      tag: 'input'
    }
  ],
  attributes: {
    style: 'background-color:rgb(255,255,255);'
  }
};

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
    viewValue: '',
    value: ''
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

export const flow = {
  id: '94d37c1e-f3a9-4cff-9d37-34e3f4cae0f9',
  name: '40b58a97-26ae-4f49-82c1-116b20ee2f9c',
  initWindowId: 582,
  windowsIds: '582,583,615',
  windows: [
    {
      id: 582,
      height: 500,
      width: 500,
      name: 'window582',
      attributes: {
        style: 'background-color:rgb(255,255,255);'
      },
      controls: [
        {
          id: 2492,
          name: 'email_2492',
          type: 'email',
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
      ],
      designId: 94,
      type: 'W'
    },
    {
      id: 583,
      height: 500,
      width: 500,
      name: 'window tresSssz583',
      controls: [
        {
          id: 2501,
          name: 'button_2501',
          type: 'button',
          attributes: {
            style:
              'position:absolute;width:100px;height:100px;transform:translate3d(0,0,0);'
          },
          options: null,
          tag: 'input'
        }
      ],
      flowId: '94d37c1e-f3a9-4cff-9d37-34e3f4cae0f9'
    },
    {
      id: 615,
      height: 500,
      width: 500,
      name: 'Window doz615',
      controls: null,
      flowId: '94d37c1e-f3a9-4cff-9d37-34e3f4cae0f9'
    }
  ]
};

export const controles = [
  {
    id: 1,
    type: 'a',
    description: 'Link',
    image: 'fas fa-link',
    tag: 'a',
    attributes: {
      href: null,
      value: null
    }
  },
  {
    id: 2,
    type: 'button',
    description: 'Botón',
    image: 'fas fa-caret-square-right',
    tag: 'input',
    attributes: {
      placeholder: null,
      value: null
    }
  },
  {
    id: 3,
    type: 'checkbox',
    description: 'Checkbox',
    image: 'fas fa-check-square',
    tag: 'input',
    attributes: {
      checked: null,
      value: null
    }
  },
  {
    id: 4,
    type: 'div',
    description: 'Mensaje',
    image: 'fas fa-comment-alt',
    tag: 'div',
    attributes: {
      value: ' '
    }
  },
  {
    id: 5,
    type: 'email',
    description: 'Email',
    image: 'fas fa-envelope',
    tag: 'input',
    attributes: {
      minlength: null,
      readonly: null,
      size: null,
      autocomplete: null,
      maxlength: null,
      multiple: null,
      pattern: null,
      placeholder: null,
      list: null,
      value: null,
      required: null
    }
  },
  {
    id: 6,
    type: 'file',
    description: 'Archivo',
    image: 'fas fa-paperclip',
    tag: 'input',
    attributes: {
      multiple: null,
      capture: null,
      files: null,
      value: null,
      required: null,
      accept: null
    }
  },
  {
    id: 7,
    type: 'image',
    description: 'Imagen',
    image: 'fas fa-image',
    tag: 'img',
    attributes: {
      formaction: null,
      formenctype: null,
      src: null,
      formnovalidate: null,
      formmethod: null,
      alt: null,
      width: null,
      value: null,
      height: null,
      formtarget: null
    }
  },
  {
    id: 8,
    type: 'number',
    description: 'Número',
    image: 'fas fa-sort-numeric-up',
    tag: 'input',
    attributes: {
      min: null,
      readonly: null,
      max: null,
      autocomplete: null,
      step: null,
      placeholder: null,
      list: null,
      value: null
    }
  },
  {
    id: 9,
    type: 'password',
    description: 'Contraseña',
    image: 'fas fa-key',
    tag: 'input',
    attributes: {
      minlength: null,
      readonly: null,
      size: null,
      maxlength: null,
      pattern: null,
      placeholder: null,
      value: null,
      required: null
    }
  },
  {
    id: 10,
    type: 'radio',
    description: 'Radio',
    image: 'fas fa-check-circle',
    tag: 'input',
    attributes: {
      checked: null,
      value: null
    }
  },
  {
    id: 11,
    type: 'range',
    description: 'Rango',
    image: 'fas fa-sliders-h',
    tag: 'input',
    attributes: {
      min: null,
      max: null,
      autocomplete: null,
      step: null,
      list: null
    }
  },
  {
    id: 12,
    type: 'select',
    description: 'Combo',
    image: 'fas fa-caret-square-down',
    tag: 'select',
    attributes: {
      value: null
    }
  },
  {
    id: 13,
    type: 'text',
    description: 'Texto',
    image: 'fas fa-pen',
    tag: 'input',
    attributes: {
      minlength: null,
      readonly: null,
      size: null,
      autocomplete: null,
      maxlength: null,
      pattern: null,
      placeholder: null,
      list: null,
      value: null,
      required: null
    }
  },
  {
    id: 14,
    type: 'textarea',
    description: 'Área de texto',
    image: 'fas fa-square',
    tag: 'textarea',
    attributes: {
      minlength: null,
      autocomplete: null,
      maxlength: null,
      spellcheck: null,
      placeholder: null,
      rows: null,
      value: null,
      cols: null,
      wrap: null,
      required: null
    }
  },
  {
    id: 15,
    type: 'iframe',
    description: 'video',
    image: 'fas fa-file-video',
    tag: 'iframe',
    attributes: {
      allow: 'autoplay;encrypted-media',
      scrolling: null,
      src: null,
      triggers: 'manual'
    }
  }
];
