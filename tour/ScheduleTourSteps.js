import { TourOption } from './Option'
export const scheduleTourSteps = (intro) => {
  return intro.setOptions({
    ...TourOption,
    steps: [{
      element: document.querySelector('#sync'),
      intro: 'This is your calendar. You can connect your Google calendar or use one of Luna’s virtual calendars.'
    },
    {
      element: document.querySelector('#monthly'),
      position: 'bottom',
      intro: 'Filter your calendar down by month, week, day, or in list view here.'
    },
    {
      element: document.querySelector('#plus'),
      position: 'bottom',
      intro: 'To schedule a new session click here.'
    }
      // {
      //   element: document.querySelector("#clients"),
      //   position: "bottom",
      //   intro:
      //     "By creating a new event, you can invite clients to the event. Make sure you quick add a client so they’re added to Luna",
      // },
      // {
      //   element: document.querySelector('#clientModalInvite'),
      //   position: "bottom",
      //   intro: 'Filter your calendar down by month, week, day, or in list view here.'
      // },
    ]
  })
}
