// tslint:disable:max-line-length
export const window = {
  id: 167,
  height: 500,
  width: 500,
  name: 'nieto1_167',
  controls: [
    {
      id: 1130,
      name: 'div_1130',
      type: 'div',
      attributes: {
        style:
          'position:absolute;transform:translate3d(0,0,0);width:160px;height:70px;font-size:12px;text-align:left;font-family:Arial,Helvetica,sans-serif;font-style:normal;line-height:12px;color:rgb(0,0,0);background:rgb(255,255,255,0);border-width:1px;border-style:none;border-color:rgb(173,173,173);'
      },
      options: null,
      tag: 'div'
    },
    {
      id: 12,
      type: 'a',
      name: 'a_12',
      tag: 'a',
      attributes: {
        value: 'Google',
        style:
          'position:absolute;transform:translate3d(0,100px,0);width:160px;height:70px;font-size:12px;text-align:left;font-family:Arial,Helvetica,sans-serif;font-style:normal;line-height:12px;color:rgb(0,0,0);background:rgb(255,255,255,0);border-width:1px;border-style:none;border-color:rgb(173,173,173);',
        href: 'www.google.com'
      }
    },
    {
      id: 15,
      type: 'iframe',
      name: 'iframe_15',
      tag: 'iframe',
      attributes: {
        allow: 'autoplay;encrypted-media',
        scrolling: null,
        src: null,
        triggers: 'manual',
        style:
          'position:absolute;transform:translate3d(0,200px,0);width:400px;height:300px;font-size:12px;text-align:left;font-family:Arial,Helvetica,sans-serif;font-style:normal;line-height:12px;color:rgb(0,0,0);background:rgb(255,255,255,0);border-width:1px;border-style:none;border-color:rgb(173,173,173);'
      }
    },
    {
      id: 9,
      type: 'range',
      name: 'range_9',
      tag: 'input',
      attributes: {
        min: null,
        max: null,
        list: null,
        autocomplete: null,
        step: null,
        style:
          'position:absolute;transform:translate3d(0,200px,0);width:200px;height:50px;font-size:12px;text-align:left;font-family:Arial,Helvetica,sans-serif;font-style:normal;line-height:12px;color:rgb(0,0,0);background:rgb(255,255,255,0);border-width:1px;border-style:none;border-color:rgb(173,173,173);'
      }
    }
  ],
  attributes: {
    style:
      'background:linear-gradient(to bottom right, rgb(255,255,255), rgb(198,198,198));'
  },
  designId: 5,
  type: 'W'
};

export const controles = [
  {
    id: 1,
    type: 'div',
    description: 'Mensaje',
    image: 'fas fa-comment-alt',
    tag: 'div',
    attributes: {
      value: ' '
    }
  },
  {
    id: 2,
    type: 'text',
    description: 'Texto',
    image: 'fas fa-pen',
    tag: 'input',
    attributes: {
      minlength: null,
      maxlength: null,
      pattern: null,
      placeholder: null,
      value: null,
      list: null,
      required: null,
      autocomplete: null,
      readonly: null,
      size: null
    }
  },
  {
    id: 3,
    type: 'email',
    description: 'Email',
    image: 'fas fa-envelope',
    tag: 'input',
    attributes: {
      minlength: null,
      maxlength: null,
      pattern: null,
      placeholder: null,
      value: null,
      list: null,
      required: null,
      autocomplete: null,
      readonly: null,
      multiple: null,
      size: null
    }
  },
  {
    id: 4,
    type: 'password',
    description: 'Contraseña',
    image: 'fas fa-key',
    tag: 'input',
    attributes: {
      minlength: null,
      maxlength: null,
      pattern: null,
      placeholder: null,
      value: null,
      required: null,
      readonly: null,
      size: null
    }
  },
  {
    id: 5,
    type: 'number',
    description: 'Número',
    image: 'fas fa-sort-numeric-up',
    tag: 'input',
    attributes: {
      min: null,
      max: null,
      placeholder: null,
      value: null,
      list: null,
      autocomplete: null,
      readonly: null,
      step: null
    }
  },
  {
    id: 6,
    type: 'select',
    description: 'Combo',
    image: 'fas fa-caret-square-down',
    tag: 'select',
    attributes: {
      value: null
    }
  },
  {
    id: 7,
    type: 'radio',
    description: 'Radio',
    image: 'fas fa-check-circle',
    tag: 'input',
    attributes: {
      value: null,
      checked: null
    }
  },
  {
    id: 8,
    type: 'checkbox',
    description: 'Checkbox',
    image: 'fas fa-check-square',
    tag: 'input',
    attributes: {
      value: null,
      checked: null
    }
  },
  {
    id: 9,
    type: 'range',
    description: 'Rango',
    image: 'fas fa-sliders-h',
    tag: 'input',
    attributes: {
      min: null,
      max: null,
      list: null,
      autocomplete: null,
      step: null
    }
  },
  {
    id: 10,
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
    id: 11,
    type: 'textarea',
    description: 'Área de texto',
    image: 'fas fa-square',
    tag: 'textarea',
    attributes: {
      minlength: null,
      wrap: null,
      spellcheck: null,
      cols: null,
      maxlength: null,
      placeholder: null,
      value: null,
      required: null,
      autocomplete: null,
      rows: null
    }
  },
  {
    id: 12,
    type: 'a',
    description: 'Link',
    image: 'fas fa-link',
    tag: 'a',
    attributes: {
      value: null,
      href: null
    }
  },
  {
    id: 13,
    type: 'file',
    description: 'Archivo',
    image: 'fas fa-paperclip',
    tag: 'input',
    attributes: {
      files: null,
      accept: null,
      capture: null,
      value: null,
      required: null,
      multiple: null
    }
  },
  {
    id: 14,
    type: 'image',
    description: 'Imagen',
    image: 'fas fa-image',
    tag: 'img',
    attributes: {
      height: null,
      formaction: null,
      formnovalidate: null,
      alt: null,
      width: null,
      formmethod: null,
      formenctype: null,
      value: null,
      formtarget: null,
      src: null
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

export const tree = {
  id: 5,
  height: null,
  width: null,
  name: 'window_5',
  controls: null,
  attributes: null,
  designId: null,
  type: null,
  level: null,
  children: [
    {
      id: 95,
      height: null,
      width: null,
      name: 'hijo1_95',
      controls: null,
      attributes: null,
      designId: null,
      type: null,
      level: null,
      children: [
        {
          id: 167,
          height: null,
          width: null,
          name: 'nieto1_167',
          controls: null,
          attributes: null,
          designId: null,
          type: null,
          level: null,
          children: [
            {
              id: 177,
              height: null,
              width: null,
              name: 'bisnieto1_177',
              controls: null,
              attributes: null,
              designId: null,
              type: null,
              level: null,
              children: []
            }
          ]
        }
      ]
    }
  ],
  settings: {
    rightMenu: false,
    cssClasses: {
      expanded: 'nodeExpanded',
      collapsed: 'nodeCollapsed',
      leaf: 'nodeLeaf',
      empty: 'nodeEmpty'
    }
  }
};
