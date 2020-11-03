var systemTemplates = [{
  id: 1,
  settings: {
    displayName: 'Blank',
    description: 'Create your own form from scratch.',
    fields: [{
      _type: 'flInput',
      name: 'Question 1',
      label: 'Enter your first question'
    },
    {
      _type: 'flButtons',
      name: 'buttons',
      label: 'Form buttons',
      _submit: false
    }
    ]
  }
},
{
  id: 2,
  settings: {
    displayName: 'Enquiry',
    description: 'An easy way to track enquiries from your customers.',
    fields: [{
      _type: 'flInput',
      name: 'Name',
      label: 'Name'
    },
    {
      _type: 'flEmail',
      name: 'Email address',
      label: 'Email address'
    },
    {
      _type: 'flSelect',
      name: 'Enquiry type',
      label: 'What is your enquiry about?',
      options: [{
        id: 'Support'
      },
      {
        id: 'Feedback'
      }
      ]
    },
    {
      _type: 'flTextarea',
      name: 'Message',
      label: 'How can we help you today?'
    },
    {
      _type: 'flButtons',
      name: 'buttons',
      label: 'Form buttons',
      _submit: false
    }
    ]
  }
}
];

Fliplet.FormBuilder.templates = function() {
  var organizationId = Fliplet.Env.get('organizationId');

  var operation = Fliplet.Env.get('development') || !organizationId ?
    Promise.resolve([]) :
    Fliplet.API.request({
      url: [
        'v1/widget-instances',
        '?organizationId=' + organizationId,
        '&package=com.fliplet.form-builder',
        '&publishedOnly=true',
        '&where=' + encodeURIComponent(JSON.stringify({
          $contains: {
            template: true
          },
          name: {
            $ne: null
          }
        }))
      ].join('')
    }).then(function(response) {
      response.widgetInstances.forEach(function(instance) {
        instance.settings.displayName = instance.settings.name;
      });
      return Promise.resolve(response.widgetInstances);
    });

  return operation.then(function(organizationTemplates) {
    organizationTemplates.forEach(function(tpl) {
      tpl.app = tpl.pages.length && tpl.pages[0].app || {};
      tpl.createdDescription = (tpl.settings.createdBy && tpl.settings.createdBy.fullName) + ' in ' + tpl.app.name;
    });

    return Promise.resolve({
      system: systemTemplates,
      organization: organizationTemplates
    });
  });
};
