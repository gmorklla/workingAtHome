export const sections = [
  { name: 'Login', icon: 'home', url: '/', submenu: [] },
  {
    name: 'Dashboard',
    icon: 'dashboard',
    url: '/dashboard',
    submenu: [
      { name: 'Gauge', icon: 'data_usage' },
      { name: 'Bar', icon: 'insert_chart' },
      { name: 'Number', icon: 'filter_1' },
      { name: 'Linear gauge', icon: 'linear_scale' },
      { name: 'Big gauge', icon: 'data_usage' },
      { name: 'Save', icon: 'save' },
      { name: 'Reset', icon: 'remove_circle' },
      { name: 'PDF', icon: 'picture_as_pdf' }
    ]
  },
  { name: 'Reports', icon: 'insert_chart', url: '/reports', submenu: [] },
  { name: 'Users', icon: 'account_box', url: '/users', submenu: [] },
  { name: 'Api', icon: 'code', url: '/api', submenu: [] }
];
// { name: 'Chat', icon: 'question_answer', url: '/chat', submenu: [] }

export const themes = [
  { name: 'Original', value: 1, color: '#303f9f' },
  { name: 'Alternate', value: 2, color: '#03a9f4' }
];

export const colsMap = new Map([
  ['xs', 1],
  ['sm', 4],
  ['md', 8],
  ['lg', 10],
  ['xl', 18]
]);

export const colsMapBig = new Map([
  ['xs', 1],
  ['sm', 4],
  ['md', 4],
  ['lg', 4],
  ['xl', 4]
]);

export const colsMapSml = new Map([
  ['xs', 1],
  ['sm', 2],
  ['md', 2],
  ['lg', 2],
  ['xl', 2]
]);

export const one = [
  {
    name: '10:30',
    value: 50
  }
];

export const num = [
  {
    name: 'R1',
    value: 24000
  }
];

export const single = [
  {
    name: '10:00',
    value: 25
  },
  {
    name: '10:15',
    value: 75
  },
  {
    name: '10:30',
    value: 55
  },
  {
    name: '10:45',
    value: 50
  },
  {
    name: '11:00',
    value: 65
  },
  {
    name: '11:15',
    value: 70
  },
  {
    name: '11:30',
    value: 25
  },
  {
    name: '11:45',
    value: 75
  },
  {
    name: '12:00',
    value: 55
  },
  {
    name: '12:15',
    value: 50
  },
  {
    name: '12:30',
    value: 65
  },
  {
    name: '12:45',
    value: 70
  },
  {
    name: '13:00',
    value: 25
  },
  {
    name: '13:15',
    value: 75
  },
  {
    name: '13:30',
    value: 55
  },
  {
    name: '13:45',
    value: 50
  },
  {
    name: '14:00',
    value: 65
  },
  {
    name: '14:15',
    value: 70
  },
  {
    name: '14:30',
    value: 25
  },
  {
    name: '14:45',
    value: 75
  },
  {
    name: '15:00',
    value: 55
  },
  {
    name: '15:15',
    value: 50
  },
  {
    name: '15:30',
    value: 65
  },
  {
    name: '15:45',
    value: 70
  }
];

export const multi = [
  {
    name: 'Kpi 1',
    series: [
      {
        name: '2010',
        value: 45
      },
      {
        name: '2011',
        value: 56
      }
    ]
  },

  {
    name: 'Kpi 2',
    series: [
      {
        name: '2010',
        value: 76
      },
      {
        name: '2011',
        value: 32
      }
    ]
  },

  {
    name: 'Kpi 3',
    series: [
      {
        name: '2010',
        value: 30
      },
      {
        name: '2011',
        value: 89
      }
    ]
  }
];
